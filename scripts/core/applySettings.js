// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

//this will store all settings with their current value
var applySettings_settings = {};

//this stores default values for all settings
var applySettings_defaultSettings = {
	'tracker_counterTextColor': '#000000'
};

/**	=== ADDING A NEW SETTING ===
 *
 * 	To add a new setting, the following things have to be done:
 * 		- Add the interface for it in 'buildSite_buildSettings()' in 'interface/buildSite.js'.
 * 			- Note that if a input-field is used then use the following attributes:
 * 				- `onchange: applySettings_apply`: so it actually applies the value whenever the user changes it.
 * 				- `tag: 'tracker_counterTextColor'`: this needs to be the name of the setting! Used to identify which setting actually got updated.
 * 				- `HTMLAttributes: {'data-settingstag': 'tracker_counterTextColor'}`: again, needs to be the name of the setting. Used to find the setting whenever it has to be updated.
 * 			- If something other than a input-field is used then all it needs to do is call 'applySettings_apply()' with the correct arguments.
 * 				- Not using a input-field also means having to add the setting to the switch in 'applySettings_set()' and 'applySettings_validate()'.
 * 		- Add the default in 'applySettings_defaultSettings'.
 * 		- Create a function that applies the value (like, if the background should be changed then there has to be a function that actually changes the background).
 * 		- Add the function to 'applySettings_apply()' inside the switch.
 */

/** Applies the value after the user changed settings.
 *
 * 	Note: This does NOT update the display in settings (like, it doesn't make sure that a checkbox is actually checked - it simply applies the value given to it, whether the checkbox in settings reflects that or not doesn't matter here).
 * 	Basically, don't call this function directly to change a setting, use 'applySettings_set()' for that.
 *
 * 	Args:
 * 		newValue [*any*]
 * 			The new value that should be used.
 *
 * 		settingName [String/Object]
 * 			The name of the setting that has been updated.
 * 			You can also pass the 'FieldObject' from an input-field and it will automatically get it's tag.
 *
 * 			Basically, if this is a string it uses that.
 * 			If it's a object it uses it's 'tag' property.
 */
function applySettings_apply (newValue, settingName) {
	//if 'settingName' is an object then replace it with it's own 'tag' property
		//basically, this gets the tag of a input-field if a 'FieldObject' is passed
	if (typeof settingName === 'object') {
		settingName = settingName.tag;
	}

	//complain and return if it's not a string
	if (typeof settingName !== 'string') {
		console.warn(`[MPO] applySettings_apply() received a non-string for 'settingName': "${settingName}".`);
		return;
	}

	//apply the actual value
		//try ... catch is used in case something goes wrong so the site doesn't break
		//the switch case then checks what function to call depending on which setting was changed
		//the function that's called then actually applies the value
	try {
		switch (settingName) {
			case 'tracker_counterTextColor':
				trackerInterface_changeCounterColor(newValue);
				break;

			//throw so the 'catch' block gets executed
			default:
				throw `[MPO] applySettings_apply() received a unknown 'settingsName': "${settingName}".`;
				break;
		}

	//complain if something went wrong
		//and return since we don't want to save a value that couldn't be applied
		//TODO: add better error-reporting for the user to see (update: what better error-reporting?)
	} catch (e) {
		console.warn(`[MPO] applySettings_apply() could not apply the value "${newValue}" to the setting "${settingName}". Following error caused this:`);
		console.log(e);
		return;
	}

	//set the 'settings' object to the new value
	applySettings_settings[settingName] = newValue;

	//save it to localStorage
	localStorage.setItem('settings', JSON.stringify(applySettings_settings));
}

/**	Sets a setting to a new value.
 *
 * 	Args:
 * 		newValue [*any*]
 * 			The new value it should be set to.
 *
 * 		settingName [String]
 * 			The name of the setting that should be updated.
 *
 * 	Returns [Boolean]:
 * 		Returns true if succesfully updated and false if it couldn't be updated.
 * 		This will also return true if the value specified is already set.
 */
function applySettings_set (newValue, settingName) {
	//complain and return if it's not a string
	if (typeof settingName !== 'string') {
		console.warn(`[MPO] applySettings_apply() received a non-string for 'settingName': "${settingName}".`);
		return;
	}

	//use a switch case to determine how to set the value
		//if a setting ever uses something other than a input-field then place it in here so it can be set properly
	switch (settingName) {

		//this is for updating a input-field
		default:
			//get the input-field
			const elem = applySettings_getElement(settingName);

			//update and return it
				//'inputfield_setValue()' already returns whether it could be updated or not
			if (Object.isDOMElement(elem) === true) {
				return inputfield_setValue(elem, newValue);
			}
	}
}

/**	Validates whether a given value can be used for a setting or not.
 *
 * 	Args:
 * 		value [*any*]
 * 			The value that should be verified.
 *
 * 		setting [String/DOM Element]
 * 			Either the name of the setting or the DOM element of it (the one with the 'data-settingstag' attribute).
 *
 * 	Returns [Boolean]:
 * 		Whether the value can be used with that setting or not.
 * 		Also returns false if it couldn't find the setting.
 */
function applySettings_validate (value, setting) {
	//if it's a string then get the DOM element for the setting
	if (typeof setting === 'string') {
		//create variable for the name and the element
		var settingName = setting;
		var settingElem = applySettings_getElement();

		//complain and return if the element couldn't be found
		if (settingElem === null) {
			console.warn(`[MPO] applySettings_validate() could not find the setting with the name "${setting}".`);
			return false;
		}

	//else, if 'setting' isn't a string
	} else {

		//complain and return if it's not a DOM Element either
		if (Object.isDOMElement(setting) !== true) {
			console.warn(`[MPO] applySettings_validate() received a value for 'setting' that's neither a string nor a DOM Element: "${setting}"`);
			return false;
		}

		//create variable for the name and the element
		var settingElem = setting;
		var settingName = setting.getAttribute('data-settingstag');

		//complain and return if the element isn't a settings element (identified by it's 'data-settingstag' attribute)
		if (settingName === null) {
			console.warn(`[MPO] applySettings_validate() received a DOM element as 'setting' but it doesn't have a 'data-settingstag' attribute:`);
			console.warn(setting);
			return false;
		}
	}

	//validate the value based on which setting it is
	switch (settingName) {

		//this simply validates a input-field
		default:
			return inputfield_validateValue(value, {
				field: settingElem
			});
	}
}

/**	This removes all values in an object that aren't valid.
 *
 * 	This will get rid of all properties that aren't a setting (by checking whether it exists in 'applySettings_defaultSettings' or not).
 * 	This will also get rid of all values that are undefined.
 *
 * 	Any removal will be logged to the console using 'console.warn()'.
 *
 * 	Args:
 * 		objToVerify [Object]
 * 			The object to verify where each property has the name and value of a setting.
 * 			The function will validate all properties within this object.
 *
 * 	Returns [Object]:
 * 		The object provided in 'objToVerify' except all values that aren't valid are removed.
 * 		Returns an empty object if a non-object is given to it.
 */
function applySettings_validateAll (objToVerify, specifics={}) {
	//the finished object with all validated values
	let finishedObj = {};

	//loop through the object to verify
	for (const key in objToVerify) {

		//complain and skip if the value isn't used
		if (applySettings_defaultSettings[key] === undefined) {
			console.warn(`[MPO] applySettings_validateAll() found an unused value of the name "${key}" that will be removed: "${objToVerify[key]}".`);
			continue;
		}

		//check if the value is valid
		if (applySettings_validate(objToVerify[key], key) === true) {

			//and then add it to the verified/finished object
			finishedObj[key] = objToVerify[key];
		} else {
			console.warn(`[MPO] applySettings_validateAll() found an invalid value of the name "${key}": "${objToVerify[key]}".`);
		}
	}

	//loop through all setting names found in 'applySettings_defaultSettings'
		//we loop through this one instead of 'objToVerify' to make sure it only contains properties of settings that are actually needed
	for (const key in applySettings_defaultSettings) {

		//make sure the value even exists
			//this is to save time so we don't have to validate values that aren't even used
		if (objToVerify[key] !== undefined) {

			//and finally, check if the value is valid...
			if (applySettings_validate(objToVerify[key], key) === true) {

				//...and then apply it
				finishedObj[key] = objToVerify[key];
			}
		}
	}

	//return the fully verified object
	return finishedObj;
}

/**	Gets the DOM element of a setting, that likely being the input-field.
 *
 * 	Returns [DOM Element/null]:
 * 		The DOM element of the setting, that likely being the input-field.
 * 		Returns null if it couldn't be found.
 */
function applySettings_getElement (settingName) {
	//get the element
		//'.querySelector' automatically returns null if it couldn't be found
	return document.querySelector(`[data-settingstag=${settingName}]`);
}

/**	This applies all settings.
 *
 * 	It simply calls 'applySettings_apply()' on all 'applySettings_settings' entries.
 *
 * 	Args:
 * 		setValues [Boolean] <false>
 * 			If true it calls 'applySettings_set()' on all entries as well using the value found in 'applySettings_settings'.
 * 			This will be done before applying them.
 */
function applySettings_applyAll (setValues) {
	//loop through all settings saved and apply them with their current value.
	for (key in applySettings_settings) {
		//set the value if needed
		if (setValues === true) {
			applySettings_set(applySettings_settings[key], key);
		}

		//apply the value
		applySettings_apply(applySettings_settings[key], key);
	}
}

/**	This sets and applies all default settings.
 *
 * 	Note that this will set and apply ALL settings, regardless of whether a value got changed or not.
 *
 * 	Args:
 * 		force [Boolean] <true>
 * 			If true all current settings will be completely overwritten.
 * 			If false it simply fills in any that don't exist in 'applySettings_settings'.
 *
 * 			Note that if this is true then it will reset the object completely which will also get rid of any left-over values.
 */
function applySettings_applyDefaults (force=true) {
	//if true then set it to a empty object so there's no left-over properties
	if (force === true) {
		applySettings_settings = {}
	}

	//fill in the object
	applySettings_settings.fillIn(applySettings_defaultSettings, {force: Boolean(force)});

	//set and apply them
	applySettings_applyAll(true);
}