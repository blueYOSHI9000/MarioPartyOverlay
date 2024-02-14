// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

//this stores default values for all settings
var applySettings_defaultSettings = {
	'tracker_counterTextColor': '#000000'
};

/**	=== ADDING A NEW SETTING ===

	To add a new setting, the following things have to be done:
		- Add the interface for it in 'buildSite_buildSettings()' (found in 'interface/buildSite.js').

			> If a input-field is used the following attributes should be used:
				- `onchange: applySettings_onChangeCall`: so it actually applies the value whenever the user changes it.
				- `tag: 'tracker_counterTextColor'`: this needs to be the name of the setting! Used to identify which setting actually got updated.
				- `HTMLAttributes: {'data-settingstag': 'tracker_counterTextColor'}`: again, needs to be the name of the setting. Used to find the setting whenever it has to be updated.

			> If something other than a input-field is used:
				- Make sure the 'onchange' event calls 'applySettings_onChangeCall()' with the correct arguments (current value first, name of setting second).
				- Add the new setting to the switch inside 'applySettings_updateSetting()' so the setting can be updated properly.

		- Add the new setting to 'applySettings_validateSetting()' so it can be validated properly (note that the function isn't allowed to access the DOM Element).
		- Add the default value in 'applySettings_defaultSettings' (right above this comment).
		- Create a function that applies the value (like, if the background should be changed then there has to be a function that actually changes the background).
			- And add this function to 'applySettings_applySetting()' inside the switch.

	=== OTHER INFO ===

	Settings should never use undefined as a intended value, undefined is strictly reserved for "no value" which allows the site to know when to inherit values (see 'settingsType').
 */

/**	Updates a setting to a new value.
 *
 * 	This will make sure the visuals are updated (so the checkbox shows up as checked when it should be checked).
 * 	This will update the correct savefile in 'trackerCore_status'.
 * 	This will also apply the actual value (if the text color has been changed to red then the color is changed in here).
 *
 * 	Args:
 * 		settingName [String]
 * 			The name of the setting that should be updated.
 *
 * 		newValue [*any*]
 * 			The new value it should be set to.
 *
 * 		specifics [Object] <optional>
 * 			Includes the following properties:
 *
 * 				skipValidating [Boolean] <false>
 * 					If validation should be skipped.
 * 					If 'true' it applies the value regardless of whether it's valid or not.
 *
 * 	Returns [Boolean]:
 * 		Returns 'true' if succesfully updated and 'false' if it couldn't be updated.
 * 		This will also return 'true' if the value specified is already set.
 */
function applySettings_updateSetting (settingName, newValue, specifics={}) {
	//complain and return if it's not a string
	if (typeof settingName !== 'string') {
		console.warn(`[MPO] applySettings_updateSetting() received a non-string for 'settingName': `, settingName);
		return false;
	}

	//complain and return if the value is invalid
		//but only if 'skipValidating' is false
	if (specifics.skipValidating !== true && applySettings_validateSetting(settingName, newValue) === false) {
		console.warn(`[MPO] applySettings_updateSetting() received a invalid value as 'newValue': `, newValue);
		return false;
	}
	if (applySettings_validateSetting(settingName, newValue) !== true) {
		console.warn(`[MPO] applySettings_updateSetting() received a invalid 'newValue' (as validated by 'applySettings_validateSetting()'): `, newValue, ` - setting: `, settingName);
		return false;
	}

	//use a switch case to determine how to set the value
		//if a setting ever uses something other than a input-field then place it in here so it can be set properly
	switch (settingName) {

		default:
			document.getElementById('tracker_counterTextColor').value = newValue;
	}

	//set the 'settings' object to the new value
	applySettings_setSettingValue(settingName, newValue);

	//apply the value
	applySettings_applySetting(settingName, newValue);

	//save it to localStorage
	trackerCore_saveSavefiles();
}

/**	Gets the value of a setting from the proper savefile.
 *
 * 	Uses the currently selected savefile and gets its setting. Takes the inheritance-type 'settingsType' into consideration.
 *
 * 	Args:
 * 		settingName [String]
 * 			The name of the setting that should be gotten.
 *
 * 	Returns [???/undefined]:
 * 		The value of the setting.
 * 		If a setting can't be found it gets the default value instead.
 * 		Returns 'undefined' if the setting couldn't be found at all. It's 'undefined' instead of 'null' since a setting could be using 'null' as an intended value.
 */
function applySettings_getSettingValue (settingName) {
	//complain and return if 'settingName' isn't a string
	if (typeof settingName !== 'string') {
		console.warn(`[MPO] applySettings_getSettingValue() received a non-string as 'settingName':`, settingName);
		return undefined;
	}

	//fetch the first file that stores settings
		//it automatically uses the current savefile
		//'followInheritanceChain()' is used so 'settingsType' is properly followed (if that's 'inherit' then we gotta go up to the profile)
	let currentFile = trackerCore_followInheritanceChain({
		inheritanceOption: 'settings',
		stopCriteria: 'primaryFile'
	});

	//loop no more than 3 times as a failsafe (since it never needs more than 3)
	for (let i = 0; i < 3; i++) {

		//if the setting exists then return that
		if (currentFile.settings[settingName] !== undefined) {
			return currentFile.settings[settingName];
		}

		//if the setting didn't exist then go to the next file
		currentFile = trackerCore_followInheritanceChain({
			slot: currentFile,
			inheritanceOption: 'settings',
			stopCriteria: 'nextFile'
		});
	}

	//complain if it got here since that shouldn't happen
	console.warn(`[MPO] applySettings_getSettingValue() reached the end of the function without finding a value for the setting "${settingName}". This likely happened if something went wrong with 'trackerCore_followInheritanceChain()'. Returning the default value now.`);

	//and return the default
		//if the setting doesn't exist at all then it's undefined which is intended
	return applySettings_defaultSettings[settingName];
}

/**	Sets a setting to a new value. The value won't be validated.
 *
 * 	This ONLY changes the value in 'trackerCore_status' in the correct savefile.
 * 	It does NOT update the visual checkbox/whatever.
 * 	It does NOT actually apply the value.
 *
 * 	Args:
 * 		settingName [String]
 * 			The name of the setting.
 *
 * 		newValue [*any*]
 * 			The value it should be set to.
 *
 * 	Returns [Boolean]:
 * 		'true' if it was successfully updated, 'false' if not.
 */
function applySettings_setSettingValue (settingName, newValue) {
	//complain and return if 'settingName' is not a string
	if (typeof settingName !== 'string') {
		console.warn(`[MPO] applySettings_setSettingValue() received a non-string as 'settingName': "${settingName}".`);
		return false;
	}

	//this takes the current savefile and automatically fetches the correct profile/savefile to save settings to (needs to have a inheritance-type of 'combined' or 'standalone')
	const file = trackerCore_followInheritanceChain({
		inheritanceOption: 'settings',
		stopCriteria: 'primaryFile'
	});

	file.settings[settingName] = newValue;
	return true;
}

/** Applies the value after the user changed settings.
 *
 * 	This will apply the actual value (if the text color has been changed to red then the color is changed in here).
 * 	This will update the apropriate value in 'trackerCore_status'.
 * 	This will NOT update the visuals (so it will not update the color-picker to display red - use 'applySettings_updateSetting()' for that).
 *
 * 	Args:
 * 		settingName [String/Object]
 * 			The name of the setting that has been updated.
 *
 * 		newValue [*any*]
 * 			The new value that should be used.
 */
function applySettings_applySetting (settingName, newValue) {
	//complain and return if it's not a string
	if (typeof settingName !== 'string') {
		console.warn(`[MPO] applySettings_applySetting() received a non-string for 'settingName': "${settingName}".`);
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
				throw `[MPO] applySettings_applySetting() received a unknown 'settingsName': "${settingName}".`;
				break;
		}

	//complain if something went wrong
		//and return since we don't want to save a value that couldn't be applied
		//TODO: add better error-reporting for the user to see (update: what better error-reporting?)
	} catch (e) {
		console.warn(`[MPO] applySettings_applySetting() could not apply the value "${newValue}" to the setting "${settingName}". Following error caused this:`);
		console.log(e);
		return;
	}

	//update 'trackerCore_status'
	applySettings_setSettingValue(settingName, newValue);
}

/**	This applies all settings.
 *
 * 	It simply calls 'applySetting()' on all settings entries.
 *
 * 	Args:
 * 		updateSetting [Boolean] <false>
 * 			If 'true' it calls 'updateSettings()' instead of 'applySetting()'.
 * 			Difference being, if this is 'true' it will also update the input-field (basically so the checkbox is actually checked if it should be).
 */
function applySettings_applyAll (updateSetting) {
	//loop through all settings that exist
	for (key in applySettings_defaultSettings) {

		//get the value for that setting
		let value = applySettings_getSettingValue(key);

		//if 'updateSetting' is true then update the value
		if (updateSetting === true) {
			applySettings_updateSetting(key, value);

		//else simply apply it
		} else {
			applySettings_applySetting(key, value);
		}
	}
}

/**	This sets and applies all default settings to the current savefile.
 *
 * 	This function follows the inheritance-type of the current savefile, so depending on which one is used this may overwrite the settings of a profile or the 'globalProfile'.
 * 	Note that this will set and apply ALL settings, regardless of whether a value got changed or not.
 *
 * 	Args:
 * 		force [Boolean] <true>
 * 			If true all current settings will be completely overwritten.
 * 			If false it simply fills in any that don't exist yet.
 *
 * 			Note that if this is true then it will reset the object completely which will also get rid of any left-over values.
 */
function applySettings_applyDefaults (force) {
	//replace any value that isn't `false` with `true`
	force = (force !== false);

	//get the correct profile/savefile (uses the current savefile and automatically fetches the correct profile/savefile depending on what 'settingsType' is used)
	const file = trackerCore_followInheritanceChain({
		inheritanceOption: 'settings',
		stopCriteria: 'primaryFile'
	});

	//if 'force' is true then set the 'settings' object of the file to an empty object so there's no left-over properties
	if (force === true) {
		file.settings = {};
	}

	//fill in the object with default values
	file.settings.fillIn(applySettings_defaultSettings, {force: force});

	//set and apply them
	applySettings_applyAll(true);
}

/**	Validates whether a given value can be used for a setting or not.
 *
 * 	Args:
 * 		setting [String/DOM Element]
 * 			Either the name of the setting or the DOM element of it (the one with the 'data-settingstag' attribute).
 *
 * 		value [*any*]
 * 			The value that should be verified.
 *
 * 	Returns [Boolean]:
 * 		'true' if it's valid and 'false' if it's not valid.
 * 		Also returns 'false' if it couldn't find the setting.
 */
function applySettings_validateSetting (setting, value) {

	//IMPORTANT: This function is NOT allowed to access DOM because this function runs before the website is actually being constructed.
		//Basically, no DOM elements exist when this function gets called first.



	//get the name of the setting
		//if 'setting' is a DOM-Element then get it's 'data-settingstag' attribute
		//otherwise use 'setting' as-is
	let settingName = (isDOMElement(setting) === true) ? setting.getAttribute('data-settingstag')
	                : setting;

	//complain and return if 'settingName' isn't a string
	if (typeof settingName !== 'string') {

		//complain more accurately based on whether a DOM Element was given or something else
		if (isDOMElement(setting) === true) {
			console.warn(`[MPO] applySettings_validateSetting() received a DOM Element that doesn't have a valid 'data-settingstag' attribute: "${settingsTag}".`);
		} else {
			console.warn(`[MPO] applySettings_validateSetting() received neither a string nor a DOM Element as 'setting': "${setting}".`);
		}

		return false;
	}

	//validate the value based on which setting it is
	switch (settingName) {

		//validate a color value
		case 'tracker_counterTextColor':
			return CSS.supports('color', value);

		//complain and return if the setting doesn't exist
		default:
			console.warn(`[MPO] applySettings_validateSetting() received a unknown name as 'setting': "${settingName}".`);
			return false;
	}
}

/**	This removes all values that aren't valid in an object.
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
function applySettings_validateAll (objToVerify) {
	if (typeof objToVerify !== 'object') {
		console.warn(`[MPO] applySettings_validateAll() received a non-object as 'objToVerify': "${objToVerify}".`);
		return {};
	}

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
		if (applySettings_validateSetting(key, objToVerify[key]) === true) {

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
			if (applySettings_validateSetting(key, objToVerify[key]) === true) {

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
 * 		Returns 'null' if it couldn't be found.
 */
function applySettings_getElement (settingName) {
	//get the element
		//'.querySelector' automatically returns 'null' if it couldn't be found
	return document.querySelector(`[data-settingstag=${settingName}]`);
}

/**	Gets called whenever the user changes a setting.
 *
 * 	Only here to call 'applySettings_applySetting()' and 'trackerCore_saveSavefiles()'.
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
function applySettings_onChangeCall (eventObj) {
	const settingName = eventObj.target.getAttribute('data-settingstag');
	const newValue    = eventObj.target.value;

	//if 'settingName' is an object then replace it with it's own 'tag' property
		//basically, this gets the tag of a input-field if a 'FieldObject' is passed
	if (typeof settingName === 'object') {
		settingName = settingName.tag;
	}

	//complain and return if it's not a string
	if (typeof settingName !== 'string') {
		console.warn(`[MPO] applySettings_onChangeCall() received a non-string for 'settingName': "${settingName}".`);
		return;
	}

	//apply the value
	applySettings_applySetting(settingName, newValue);

	//save it permanently
	trackerCore_saveSavefiles();
}