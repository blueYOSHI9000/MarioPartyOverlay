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
 * 				- Not using a input-field also means having to add the setting to the switch in 'applySettings_set()'.
 * 		- Add the default in 'applySettings_defaultSettings'.
 * 		- Create a function that applies the value (like, if the background should be changed then there has to be a function that actually changes the background).
 * 		- Add the function to 'applySettings_apply()' inside the switch.
 */

/**
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
		}

	//complain if something went wrong
		//and return since we don't want to save a value that couldn't be applied
		//TODO: add better error-reporting for the user to see
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
			const elem = document.querySelector(`[data-settingstag=${settingName}]`);

			//update and return it
				//'inputfield_setValue()' already returns whether it could be updated or not
			if (Object.isDOMElement(elem) === true) {
				return inputfield_setValue(elem, newValue);
			}
	}
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