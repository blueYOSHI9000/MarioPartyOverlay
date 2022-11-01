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
		console.warn(`[MPO] applySettings_updateSetting() received a non-string for 'settingName': "${settingName}".`);
		return false;
	}

	//complain and return if the value is invalid
		//but only if 'skipValidating' is false
	if (specifics.skipValidating !== true && applySettings_validateSetting(settingName, newValue) === false) {
		console.warn(`[MPO] applySettings_updateSetting() received a invalid value as 'newValue': "${newValue}".`);
		return false;
	}

	//use a switch case to determine how to set the value
		//if a setting ever uses something other than a input-field then place it in here so it can be set properly
	switch (settingName) {

		//this is for updating a input-field
		default:
			//get the input-field
			const elem = applySettings_getElement(settingName);

			//update the input-field
			if (isDOMElement(elem) === true) {
				let fieldResult = inputfield_setValue(elem, newValue);

				//complain and return if it failed
				if (fieldResult === false) {
					console.warn(`[MPO] applySettings_updateSetting() couldn't update the setting "${settingName}" as 'inputfield_setValue()' failed.`);
					return false;
				}
			}
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

	//this saves on which savefile-slot we're currently iterating on
	let savefileSlot = trackerCore_status.savefiles.currentSlot;

	//the savefile we're currently iterating on
	let savefile = trackerCore_getSavefile(savefileSlot);

	//this creates a loop for each savefile
		//this will only loop multiple times for layered savefiles
	while (true) {

		//complain and return if it loops despite already using the 'settingsfile'
		if (savefile === trackerCore_status.savefiles.settingsfile) {
			console.warn(`[MPO] applySettings_getSettingValue() looped despite already using the 'settingsfile'. This was likely caused by 'settingsfile' using a 'settingsType' it shouldn't be using:`, trackerCore_status.savefiles.settingsfile._metadata.settingsType);
			return undefined;
		}

		//if the savefile-slot is below 0 or the savefile couldn't be found then use the 'settingsfile' savefile
		if (savefileSlot < 0 || typeof savefile !== 'object') {
			savefile = trackerCore_status.savefiles.settingsfile;
		}

		//get the value based on which 'settingsType' the current savefile is
		switch (savefile._metadata.settingsType) {

			//get the value from the 'settingsfile' savefile
			case 'noSettings':
				return trackerCore_status.savefiles.settingsfile.settings[settingName];
				break;

			//get the value from the savefile (or get defaults if not present)
			case 'standalone':
				//if no value is present for this setting then take defaults instead
				if (savefile.settings[settingName] === undefined) {
					return applySettings_defaultSettings[settingName];

				//else return the value from this savefile
				} else {
					return savefile.settings[settingName];
				}
				break;

			//get the value from the savefile if present, otherwise go to the next layer
			case 'layered':
				//if the value isn't present then do nothing (so it goes to the next layer)
				if (savefile.settings[settingName] === undefined) {
					break;

				//else return the found value
				} else {
					return savefile.settings[settingName];
				}
				break;

			//complain and return if the 'settingsType' is unknown
			default:
				console.warn(`[MPO] applySettings_getSettingValue() found an unknown 'settingsType' in savefileSlot "${savefileSlot}":`, savefile._metadata.settingsType);
				return undefined;
		}

		//go one savefile lower
		savefileSlot--;
		savefile = trackerCore_status.savefiles[savefileSlot];
	}

	//complain if it reached the end of the function
	console.warn(`[MPO] applySettings_getSettingValue() reached the end of the function, which shouldn't happen.`);
	return undefined;
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

	//get the current savefile
	let currentSavefile = trackerCore_getSavefile();

	//get the 'settings' object that should be modified
	let obj;
	switch (currentSavefile._metadata.settingsType) {

		//get it from the 'settingsfile' savefile
		case 'noSettings':
			obj = trackerCore_status.savefiles.settingsfile.settings;
			break;

		//get it from the currently selected savefile
		case 'standalone':
		case 'layered':
			obj = currentSavefile.settings;
			break;
	}

	//complain and return if the object couldn't be found
	if (typeof obj !== 'object') {
		console.warn(`[MPO] applySettings_setSettingValue() could not find the object to apply the setting in. Value found where the object should have been: "${obj}".`);
		return false;
	}

	//actually set the value
	obj[settingName] = newValue;
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
 * 	Note that this will set and apply ALL settings, regardless of whether a value got changed or not.
 *
 * 	This function will behave differently depending on what 'settingsType' the current savefile has.
 * 		- 'noSettings': The defaults will be applied to 'settingsfile'.
 * 		- 'standalone': The defaults will be applied to the current savefile.
 * 		- 'layered': All settings from the current savefile will be removed. This means it will now use values from the other layers/savefiles.
 *
 * 	Note that for 'layered' nothing will be done if 'force' is not true.
 *
 * 	Args:
 * 		force [Boolean] <true>
 * 			If true all current settings will be completely overwritten.
 * 			If false it simply fills in any that don't exist yet.
 *
 * 			Note that if this is true then it will reset the object completely which will also get rid of any left-over values.
 */
function applySettings_applyDefaults (force) {
	//this essentially converts 'force' to a Boolean where any non-boolean value will be converted to 'true'
		//true    -> true
		//false   -> false
		//1       -> true
		//'false' -> true
		//*       -> true
	force = (force !== false);

	//this will store the savefile where the defaults should be applied to
	let savefile;

	//get the savefile that should be modified
	switch (trackerCore_getSavefile()._metadata.settingsType) {

		//get the 'settingsfile' savefile
		case 'noSettings':
			savefile = trackerCore_status.savefiles.settingsfile;
			break;

		//get the current savefile
		case 'standalone':
		case 'layered':
			savefile = trackerCore_getSavefile();
			return;
	}

	//if 'force' is true then set the 'settings' object of the savefile to an empty object so there's no left-over properties
	if (force === true) {
		savefile.settings = {}
	}

	//if the savefile is a 'layered' type then apply the values and return now since values shouldn't be applied to it
	if (savefile._metadata.settingsType === 'layered') {
		applySettings_applyAll(true);
		return;
	}

	//fill in the object with default values
	savefile.settings.fillIn(applySettings_defaultSettings, {force: force});

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
			return inputfield_validateValue(value, {
				fieldType: 'color'
			});

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
function applySettings_onChangeCall (newValue, settingName) {
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