// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== NOTICE ===
 *
 * 	This file is only for the core of the tracker itself.
 * 	If you simply need to update a counter or change a character then view 'updatesTracker.js'.
 * 	That file has all the functions needed to work with the tracker.
 */

/**	=== THE TRACKER OBJECT ===

	The 'trackerCore_status' variable saves everything related to tracking. It saves the current game, a list of players and every single counter in use.
	The object is updated in real-time. Whenever a character is changed this will be updated. Whenever a counter is increased this will be updated.

	The following is a documentation of the object with every single property in it:

	> trackerCore_status [Object]
		Saves everything related to tracking like list of players, list of counters, etc.

		> controls [Object]
			Saves the controls of the tracker. Whether it should add or subtract, by how much and all that.

			- action [String]
				What action should be used when clicking on a counter. Can be one of the following:
					- add: Adds the value to the counter.
					- sub: Subtracts the value from the counter (can't go below 0).
					- set: Sets the counter to the specified value.

			- amount [Number]
				By how much the counter should be modified.

		> counters [Object]
			Lists everything related to counters.
			The only exception is which counters are activated, that's saved in 'savefiles' instead.

			> status [Object]
				This is information about the status of the counters, stuff that can be changed by the user. Whether the counter is active, whether it should be highlighted and all that.

				This redirects you to the 'perCounterStatus' object of the current savefile (see 'trackerCore_status' > 'savefiles' > '*array item*' > 'perCounterStatus' in this documentation).
				Will appear in 'for' loops. Is technically just a getter.

			> behaviour
				This takes information from the database to define how the counters should work. This is fixed information which will be set once MPO boots up and won't ever be changed again.

				> *category* [Object]
					Lists all the counters that are part of this category.
					Categories consist of 'bonusStars', 'spaces', 'misc'. More will be added in later.
					The 'misc' category is simply for everything that doesn't fit in any of the other categories while also not being big enough to warrant a new category being made for it.

					> *counter* [Counter Object]
						This is a counter. This can be a bonus star, a space or something else.
						Could be 'runningStar', 'blueSpace', 'distanceWalked' or any other counter.

						- counterRelationType [String]
							Defines how the counter works. Can be one of the following:
								- origin: The counter saves stats completely on its own, they originate from here.
								- collection: The counter is a collection of others. Stats are saved on here but changes on the other counters will also be applied here.
								- linked: The counter is linked to another. Stats are saved on both and will always be the same.

						> counterRelations [Object]
							The relations to other counters. Depends a lot on what 'counterRelationType' is.

							- linkedFrom [Array]
								A list of all counters that are linked to this.

							- linkTo [String/undefined]
								Only used if 'counterRelationType' is 'linked'. Will be undefined if it's a different type.

							- collectionChildren [Array/undefined]
								Only used if 'counterRelationType' is 'collection'. Will be undefined if it's a different type.
								A list of all counters that are part of this collection.
								The counter this one is linked to.

		> profiles [Object]
			This is a list of all profiles.
			This is kinda a "Pseudo Array" in the sense that each item can be accessed with a number, however they aren't in order (a 1 & 2 & 4 might exist but not a 3). A "for of" loop isn't possible and Array function don't exist either (use '.add()' and '.remove()' instead).

		|	- length [Number]
		|		How many profiles there are.
		|		Listed here because it's done by MPO manually.

		|	- profilesCreated [Number]
		|		How many profiles have been created.
		|		Is saved permanently in localStorage.
		|		Is not necessarily 100% accurate, mainly because it's just used to give profiles a unique ID, not as a statistic.

		|	- add [Function]
		|		Adds a new profile to the list. Mainly there to update the 'length' and 'profilesCreated' properties.
		|		Will not verify the actual profile itself!

		|		Arguments:
		|			obj [Object]
		|				The profile as an object. Won't be verified.
		|
		|			slot [Number] <auto>
		|				Which slot the profile should use. If left empty it will auto-generate a unique slot ID.
		|				NOTE: THIS SHOULD LIKELY NOT BE USED. If a profile already exists in this slot, it WILL be overwritten immediately.
		|				Value has to be a positive number that's below 9007199254740991. If the value is invalid it will simply be ignored without logging it.

		|	- remove [Function]
		|		Removes a profile.

		|		Arguments:
		|			profileSlot [Number/String]
		|				The slot number of the profile. The number can be in string form (so 123 and '123' are both fine).

		|	> globalProfile [Object]
		|		This is a unique profile that only stores settings. This profile is only used so other profiles/savefiles can inherit settings from this.
		|		This profile can't contain any savefiles, though ungrouped savefiles would inherit from this.
		|		It is not enumerable/does not appear in 'for' loops.

		|		> settings [Object]
		|			All settings for this profile.
		|			See 'settings' under  under 'savefiles' > '*array item*' below for more details.

		|		> perCounterStatus [Object]
		|			This includes options for each counter individually.
		|			See 'perCounterStatus' under  under 'savefiles' > '*array item*' below for more details.

		|	> *array item* [Object]
		|		This is one profile.

		|		> name [String]
		|			The name of the profile.

		|		> inheritanceTypes [Object]
		|			This contains info about how settings should be saved.

		|			- settingsType [String]
		|				Defines where the options are saved.
		|				Possible options are 'inherit', 'combination', 'standalone'. See 'settingsType' under 'savefiles' > '*array item*' > 'inheritanceTypes' below.

		|			- perCounterStatusType [String]
		|				Whether 'perCounterOptions' should be included in this savefile.
		|				Options are the same as 'settingsType' above.

		|		> settings [Object]
		|			All settings for this profile.
		|			See 'settings' under  under 'savefiles' > '*array item*' below for more details.

		|		> perCounterStatus [Object]
		|			This includes options for each counter individually.
		|			See 'perCounterStatus' under  under 'savefiles' > '*array item*' below for more details.

		> savefiles [Array of Objects]
			This is a list of all savefiles.
			This includes all info that each savefile saves like the current game, players, stats.

		|	- currentSlot [Number]
		|		The array index of the currently selected savefile.
		|		This is a unique property that's added to the array and it won't appear in any 'for' loops. Kinda like the 'length' property.

		|	> current [*Object*]
		|		This simply redirects to the currently selected array item. This is not a property on it's own and won't appear in any 'for' loops either.
		|		This is the best way to get the current savefile as it's always up-to-date (the current savefile is dynamically calulated the moment this property is used).

		|		To be more accurate, it's a getter/setter pair (setter does nothing).

		|	> *array item* [Object]
		|		This is one savefile.

		|		- profileParent [Number/null]
		|			The slot of the profile this savefile belongs to. Can be null if it doesn't belong to any profile (meaning the savefile is ungrouped).

		|		- game [String]
		|			The current game in the format of 'mp1', 'mp8', 'mptt100', etc. Can also be '_all' for "no game in particular".

		|		> players [Array of Objects]
		|			A list of all players. Saves everything related to those players.

		|			- playerAmount [Number]
		|				The amount of players present (includes COM).
		|				This is a non-enumerable array item.

		|			> *array item* [Object]
		|				Each array item is one player. Player 1 is [0], Player 2 is [1], etc.

		|				- name [String/null]
		|					The name of the player. Can be null in case no player name has been entered.

		|				- character [String]
		|					The character they're playing as. Has to be the same name that's used in the database.

		|				- com [Boolean]
		|					Whether they're a computer or not.

		|				> stats [Object]
		|					The stats of this player.

		|					> 'bonusStars'/'spaces'/'misc'/etc [Object]
		|						A counter category.

		|						- 'runningStar'/'blueSpace'/'distanceWalked'/etc [Number]
		|							The stat of this counter. Can be any number. If not present it's assumed the counter is at 0.

		|		> inheritanceTypes [Object]
		|			This contains info about how settings should be saved.
		|			Includes the following properties:

		|			- settingsType [String]
		|				Defines how the settings should be saved/used.
		|				Can be one of the following:
		|					- 'inherit': Settings are taken from and saved to the profile this belongs to. If there's no profile it will use the global settings instead.
							- 'combination': Settings are saved to this savefile but can be taken from this savefile AND the profile. If a setting is empty/undefined then it will simply grab it from the profile instead. Basically inheriting but giving priority to this savefile.
		|					- 'standalone': Settings are only taken from and saved to this savefile. No exceptions.

		|			- perCounterStatusType [String]
		|				Whether 'perCounterOptions' should be included in this savefile.
		|				Options are the same as 'settingsType' above.

		|		> settings [Object]
		|			All settings for this savefile. Depends heavily on 'inheritanceTypes.settingsType', sometimes this property may even be ignored.

		|		> perCounterStatus [Object]
		|			This includes options for each counter individually. Depends heavily on 'inheritanceTypes.perCounterStatusType', sometimes this property may even be ignored.

		|			> 'bonusStars'/'spaces'/'misc'/etc [Object]
		|				Lists all the counters that are part of this category.
		|				See below in 'counters' for a full explanation.

		|				> 'runningStar'/'blueSpace'/'distanceWalked'/etc [Object]
		|					A counter. This includes options targeted at this specific counter.

		|					- active [Boolean]
		|						Whether this counter is activated or not.

		|					- highlightHighest [Boolean]
		|						If the highest number should be highlighted.

		|					- highlightLowest [Boolean]
		|						If the lowest number should be highlighted.
 */

//TODO: Replace this with a more dynamic approach
	//update: how so?
		//maybe the categories? ('bonusStars', 'spaces', etc.)
//TODO: Add some shortcuts in the form of getters for stuff like players
	//meaning, add a 'player' getter into the root object that accesses the savefile - finding the correct savefile is not something that has to be done every time
var trackerCore_status = {
	controls: {
		action: 'add',
		amount: 1
	},
	profiles : {},
	savefiles: [],
	counters: {
		behaviour: {
			bonusStars: {},
			spaces: {},
			misc: {}
		}
	}
};

//TODO: compile the following into a function to reduce duplicate code

//set the 'currentSlot' property for the 'savefiles' array
	//this has to be done this way if we don't want it to be iterable
Object.defineProperty(trackerCore_status.savefiles, 'currentSlot', {
	value: 0,
	enumerable: false,
	writable: true
});

//create the 'current' property which simply redirects to the current savefile
Object.defineProperty(trackerCore_status.savefiles, 'current', {
	enumerable: false,
	get () {
		return this[this.currentSlot];
	},
	set (value) {
		return;
	}
});

Object.defineProperty(trackerCore_status.profiles, 'length', {
	value: 0,
	enumerable: false,
	writable: true
});
Object.defineProperty(trackerCore_status.profiles, 'profilesCreated', {
	value: 0,
	enumerable: false,
	writable: true
});
Object.defineProperty(trackerCore_status.profiles, 'add', {
	value: function (obj, slot) {
		//if 'obj' isn't an object then complain and return
		if (typeof obj !== 'object') {
			console.warn(`[MPO] [MPO] trackerCore_status.profiles.add() received a non-object as 'obj': `, obj);
			return;
		}

		//used for the 'for' loop, chances are if it fails 20 times then 200 won't change much - most probably don't even have 20 profiles
		let maxAttempts = 20;

		//if a slot was given then put the profile in that slot without increasing 'profilesCreated'
		if (Number.isSafeInteger(slot) === true) {
			if (this[slot] !== undefined) {
				console.warn(`[MPO] trackerCore_status.profiles.add() found a profile already existing in the following slot: `, slot, ` - The already existing profile will be overwritten with the new one since the 'slot' was specifically given as an argument. Old profile that will be overwritten: `, this[slot]);
			}
			this[slot] = obj;

		//if no slot was given or it's invalid then get the slot from the 'profilesCreated' property
		} else {
			//check to make sure that 'profilesCreated' is actually valid and add a failsafe in case it "overflows"
				//'Number.isSafeInteger()' is used to make sure that the number isn't too big, the '+ 1' is used since the number will be increased before being used anyway, so the check wouldn't be accurate without this
				//NaN isn't considered to be "safe", so we don't need a seperate check for this
				//'typeof' is used to make sure it is a number, which '.isSafeInteger()' already does but if it's an object then '{} + 1' results in 1 which ain't good
				//and finally make sure the number isn't negative
				//half of this isn't even needed but not having overflow protection is stupid even if it's humanly impossible to reach it
				//also, these checks can't all be done at bootup because of the overflow protection - and if someones stupid enough to consider that then they're also stupid enough to create 3 checks even if 2 of them could be done at bootup

				//if the number is invalid then complain and reset it back to 0 (which will be increased to 1)
			if (typeof this.profilesCreated !== 'number' || Number.isSafeInteger(this.profilesCreated + 1) === false || this.profilesCreated < 0) {
				console.warn(`[MPO] trackerCore_status.profiles.add() got a invalid 'profilesCreated' number. Either something fucked up or you created 9007199254740992 profiles which is one too many. Will be replaced with 1. Value: `, this.profilesCreated);
				this.profilesCreated = 0;

				//since it overflowed back to one it should try up to 100 times because chances are that profiles with lower numbers already exist which would cause the risk of overwriting a profile
				maxAttempts = 100;
			}

			//try multiple times if a profile already exists with this key
			for (let attempt = 0; attempt < maxAttempts; attempt++) {

				//increase 'profilesCreated' by one and directly assign it's new value to 'key' for quick access
				const key = ++this.profilesCreated;

				//check to make sure an existing property isn't overwritten
					//then add the object, update 'length' and return since everythings done

					//if the property already exists then the loop will restart
				if (this[key] === undefined) {
					this[key] = obj;
					this.length++;
					return;
				}
			}
		}

		//if a profile couldn't be created then error and force it
		console.error(`[MPO] trackerCore_status.profiles.add() failed to add a profile ${maxAttempts} times. This likely happened because a property already existed with the same name (and that ${maxAttempts}x). Profile will be forcibly added. Name: `, this.profilesCreated, ` - Existing property that will be overwritten: `, this[this.profilesCreated]);

		this[this.profilesCreated] = obj;
	},
	enumerable: false,
	writable: false
});
Object.defineProperty(trackerCore_status.profiles, 'remove', {
	value: function (profileSlot) {
		//if 'profileSlot' is a string then convert it
		if (typeof profileSlot === 'string') {
			profileSlot = Number.parseInt(profileSlot, 10);

			//if it's NaN then complain and return
			if (Number.isNaN(profileSlot) !== false) {
				console.warn(`[MPO] trackerCore_status.profiles.remove() received a string that doesn't consist of just a number. (123 and '123' is allowed but 'hi123' isn't). Value: `, profileSlot);
				return;
			}

		//if it's neither a string nor a number then complain and return
		} else if (typeof profileSlot !== 'number') {
			console.warn(`[MPO] trackerCore_status.profiles.remove() received a non-number as 'profileSlot': `, profileSlot);
			return;
		}

		//if a profile already existed then decrease the 'length' property
		if (typeof this[profileSlot] === 'object') {
			this.length--;
		}

		//and delete it
			//if this property doesn't even exist then it can't be deleted but it not existing is already good, so no complaining
		delete this[profileSlot];
	},
	enumerable: false,
	writable: true
});

//create a redirect to the 'perCounterStatus' of the current savefile
	//and don't allow to overwrite this property
Object.defineProperty(trackerCore_status.counters, 'status', {
	enumerable: true,
	get () {
		return trackerCore_status.savefiles.current.perCounterStatus;
	},
	set (value) {}
});

//create the global profile
	//just a empty object for now, will be set-up properly in 'boot_loadLocalStorage()'
Object.defineProperty(trackerCore_status.profiles, 'globalProfile', {
	value: {},
	writable: true
});

// === FUNCTIONS ===

/**	Gets the specified counter from 'trackerCore_status.behaviour'.
 *
 * 	Args:
 * 		counterName [String]
 * 			The counter that should be gotten.
 * 			Is in the format of 'bonusStars.runningStar'.
 *
 * 	Returns [Object/null]:
 * 		The object from 'trackerCore_status' as a reference. Will not verify whether the counter is valid.
 * 		If the counter can't be found then it will simply return 'null'.
 */
function trackerCore_getCounterBehaviour (counterName) {
	//get and return the counter
	return trackerCore_status.counters.behaviour.fetchProperty(counterName);
}

/**	Gets a savefile. Can also be used to verify that a given 'savefileSlot' is valid.
 *
 * 	Args:
 * 		savefileSlot [Number/String] <current>
 * 			The savefile slot that should be used.
 * 			Will use the currently selected one on default.
 *
 * 	Returns [Object/null]:
 * 		The savefile object in 'trackerCore_status.savefiles[*slot*]'.
 * 		Or null if the savefile couldn't be found.
 */
function trackerCore_getSavefile (savefileSlot=trackerCore_status.savefiles.currentSlot) {
	//convert string to number
	if (typeof savefileSlot === 'string') {
		savefileSlot = Number(savefileSlot);
	}

	//complain and return if the slot is invalid
		//'.isFinite()' returns false for NaN, Infinity and any non-number (even '14')
	if (Number.isFinite(savefileSlot) === false || savefileSlot < 0) {
		console.warn(`[MPO] trackerCore_getSavefile() received a invalid value as 'savefileSlot' (has to be a regular, positive number): `, savefileSlot);
		return null;
	}

	//get the savefile
	let savefile = trackerCore_status.savefiles[savefileSlot];

	//only return the savefile if it is a valid savefile
	if (savefile instanceof trackerCore_Savefile) {
		return savefile;

	//complain and return if it's not a savefile
	} else {
		console.warn(`[MPO] trackerCore_getSavefile() noticed that the following savefile slot doesn't contain a valid savefile (not a 'trackerCore_Savefile' object): `, savefileSlot);
		return null;
	}
}

/**	Gets a profile. Can also be used to verify that a given 'profileSlot' is valid.
 *
 * 	Args:
 * 		profileSlot [Number/String] <current>
 * 			The profile slot that should be used.
 * 			Will use the profile the currently selected savefile belongs to.
 *
 * 		acceptGlobalProfile [Boolean] <true>
 * 			Whether the 'globalProfile' should be used.
 * 			If this is false and the result is 'globalProfile' then it simply returns null (does not get logged to the console).
 *
 * 	Returns [Object/null]:
 * 		The profile object in 'trackerCore_status.profiles[*slot*]'.
 * 		Or null if the profile couldn't be found.
 */
function trackerCore_getProfile (profileSlot=trackerCore_status.savefiles.current.profileParent, acceptGlobalProfile) {
	//convert string to number
	if (typeof profileSlot === 'string' && profileSlot !== 'globalProfile') {
		profileSlot = Number(profileSlot);
	}


	//check if the slot is null, which would be 'globalProfile'
	if (profileSlot === null) {
		profileSlot = 'globalProfile';
	}

	//check if it's 'globalProfile'
	if (profileSlot === 'globalProfile') {

		//if the 'globalProfile' isn't accepted then return null, otherwise return the 'globalProfile'
		if (acceptGlobalProfile === false) {
			return null;
		} else {
			return trackerCore_status.profiles.globalProfile;
		}

	//complain and return if the slot is invalid
		//'.isFinite()' returns false for NaN, Infinity and any non-number (even '14')
	} else if (Number.isFinite(profileSlot) === false || profileSlot < 0) {
		console.warn(`[MPO] trackerCore_getProfile() received a invalid value as 'profileSlot' (has to be a regular, positive number): `, profileSlot);
		return null;
	}

	//get the profile
	let profile = trackerCore_status.profiles[profileSlot];

	//only return the profile if it is a valid profile
	if (profile instanceof trackerCore_Profile) {
		return profile;

	//complain and return if it's not a profile
	} else {
		console.warn(`[MPO] trackerCore_getProfile() noticed that the following profile slot doesn't contain a valid profile (not a 'trackerCore_Profile' object): `, profileSlot);
		return null;
	}
}

/**	Follows the inheritance chain of profiles/savefiles.
 *
 * 	Arguments:
 * 		specifics [Object]
 * 			Consists of the following:
 *
 * 				profileOrSavefile [String]
 * 					Which one it is. Can be one of the following:
 * 						- 'profile'  / 'profiles'
 * 						- 'savefile' / 'savefiles'
 * 					Not needed if 'slot' is either empty or the profile/savefile object itself was given.
 *
 * 				slot [Number/String/Object] <current savefile>
 * 					Which slot the profile/savefile is in. Should be either a number (number being inside a string is allowed) or 'globalProfile'.
 * 					Alternatively just giving the actual profile/savefile object itself works as well (in which case 'profileOrSavefile' can be ignored).
 * 					If empty it will simply take the current savefile.
 *
 * 				inheritanceOption [String]
 * 					Which one it should follow. Can be one of the following:
 * 						- 'settings'
 * 						- 'perCounterOptions'
 *
 * 				stopCriteria [String] <'primaryFile'>
 * 					On which inheritance-type it should stop.
 * 					Files with type 'inherit' will never be returned by this function.
 * 					If the file in 'slot' given already fits the criteria then that one will be returned.
 * 					Can be one of the following:
 * 						- 'primaryFile': Stops at 'combination' & 'standalone'.
 * 						- 'nextFile': Goes to the next available 'combination', always stops at 'standalone'.
 * 						- 'lastFile': Skips 'combination', stops at 'standalone'.
 *
 * 	Returns [Object/null]:
 * 		The profile or savefile object.
 * 		null if it couldn't find anything (only happens with bad arguments).
 */
function trackerCore_followInheritanceChain (specifics={}) {
	//complain and return if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] trackerCore_followInheritanceChain() received a non-object as 'specifics': `, specifics, ` - Returning 'globalProfile' as a failsafe.`);
		return trackerCore_getProfile('globalProfile');
	}

	//this stores the current profile/savefile used during the loop
	let currentFile;

	//validate the 'profileOrSavefile' and 'slot' arguments - and fill the other one in if necessary
	switch (typeof specifics.slot) {

		case 'object':
			//check if it's either a profile or a savefile and update 'profileOrSavefile' accordingly
			if (specifics.slot instanceof trackerCore_Profile) {
				profileOrSavefile = 'profile';
			} else if (specifics.slot instanceof trackerCore_Savefile) {
				profileOrSavefile = 'savefile';

			//if it's neither a profile nor a savefile then complain and return
			} else {
				console.warn(`[MPO] trackerCore_followInheritanceChain() received a invalid object as 'slot' (has to be a 'trackerCore_Profile' or 'trackerCore_Savefile' object - or a number of course): `, specifics.slot, ` - Returning 'globalProfile' as a failsafe.`);
				return trackerCore_getProfile('globalProfile');
			}

			//assign the profile/savefile
			currentFile = specifics.slot;
			break;

		//convert string to number, then fall-through to 'number'
		case 'string':
			Number(specifics.slot);

		//fetch the profile/savefile
		case 'number':
			switch (specifics.profileOrSavefile) {

				//get profile
				case 'profile':
					currentFile = trackerCore_getProfile(specifics.slot);

					//validate the object
					if (currentFile instanceof trackerCore_Profile) {
						break;
					} else {
						console.warn(`[MPO] trackerCore_followInheritanceChain() received a invalid number as 'slot' (either the conversion from string to number went wrong or there's no profile in this slot): `, specifics.slot, ` - Returning 'globalProfile' as a failsafe.`);
						return trackerCore_getProfile('globalProfile');
					}

				//get savefile
				case 'savefile':
					currentFile = trackerCore_getSavefile(specifics.slot);

					//validate the object
					if (currentFile instanceof trackerCore_Savefile) {
						break;
					} else {
						console.warn(`[MPO] trackerCore_followInheritanceChain() received a invalid number as 'slot' (either the conversion from string to number went wrong or there's no savefile in this slot): `, specifics.slot, ` - Returning 'globalProfile' as a failsafe.`);
						return trackerCore_getProfile('globalProfile');
					}

				//complain and return if 'profileOrSavefile' is invalid
				default:
					console.warn(`[MPO] trackerCore_followInheritanceChain() received a invalid 'profileOrSavefile' argument (has to be either 'profile' or 'savefile'): `, specifics.profileOrSavefile, ` - Returning 'globalProfile' as a failsafe.`);
					return trackerCore_getProfile('globalProfile');
			}
			break;

		//get the currently selected savefile
		default:

			//if it's not undefined then complain since chances are it's a mistake
			if (specifics.slot !== undefined) {
				console.warn(`[MPO] trackerCore_followInheritanceChain() received a invalid 'slot' argument (has to be either a number, string, a valid object or undefined): `, specifics.slot, ` - Using the currently selected savefile instead.`);
			}
			currentFile = trackerCore_getSavefile();
	}

	//if 'inheritanceOption' is invalid then complain and return
	if (['settings', 'perCounterStatus'].indexOf(specifics.inheritanceOption) === -1) {
		console.warn(`[MPO] trackerCore_followInheritanceChain() received a invalid 'inheritanceOption' argument (has to be either 'settings', 'perCounterStatus'): `, specifics.inheritanceOption, ` - Returning 'globalProfile' as a failsafe.`);
		return trackerCore_getProfile('globalProfile');
	}

	//if 'stopCriteria' is invalid then complain and return
	if (['primaryFile', 'nextFile', 'lastFile'].indexOf(specifics.stopCriteria) === -1) {
		console.warn(`[MPO] trackerCore_followInheritanceChain() received a invalid 'stopCriteria' argument (has to be either 'primaryFile', 'nextFile' or 'lastFile'): `, specifics.stopCriteria, ` - Returning 'globalProfile' as a failsafe.`);
		return trackerCore_getProfile('globalProfile');
	}

	//find the correct file
		//only looping 3 times since it doesn't need more (basically a failsafe)
	for (let i = 0; i < 3; i++) {
		switch (currentFile.inheritanceTypes[specifics.inheritanceOption + 'Type']) {

			//skip since 'inherit' is never needed here
			case 'inherit':
				break;

			case 'combined':
				//return file since 'primaryFile' is okay with 'combined'
				if (specifics.stopCriteria === 'primaryFile') {
					return currentFile;

				//if it's 'nextFile' and 'combined' then go to the next file on the first loop but return it after that
					//because 'nextFile' wants the next available file, so returning it on the first loop wouldn't be the next file at all (the exception to this being the 'standalone' type)
				} else if (specifics.stopCriteria === 'nextFile') {

					//skip on first loop
					if (i > 0) {
						break;

					//return on all subsequent loops
					} else {
						return currentFile;
					}

				//skip this file since 'lastFile' requires a 'standalone' type
				} else if (specifics.stopCriteria === 'lastFile') {
					break;
				}

				break; //failsafe

			//return if it's 'standalone' since that one is always the final stop
			case 'standalone':
				return currentFile;
		}

		//get the next file

		//if a 'profileParent' was specified then get that profile
		if (typeof currentFile.profileParent === 'number') {
			currentFile = trackerCore_getProfile(currentFile.profileParent);

			//if the profile couldn't be found then use the 'globalProfile'
			if ((currentFile instanceof trackerCore_Profile) === false) {
				console.warn(`[MPO] trackerCore_followInheritanceChain() found a invalid 'profileParent', continuing with 'globalProfile'.`);
				currentFile = trackerCore_getProfile('globalProfile');
			}

		//if not then use the 'globalProfile'
		} else {
			currentFile = trackerCore_getProfile('globalProfile');
		}
	}

	//complain and use 'globalProfile' since no file could be found
	console.warn(`[MPO] trackerCore_followInheritanceChain() reached the end of the function which shouldn't happen, continuing with 'globalProfile'.`);
	return trackerCore_getProfile('globalProfile');
}

/**	This saves the current stats to localStorage.
 *
 * 	Note: This is temporary, this does not consider a potentital character-limit to a single localStorage entry (if there is one) and it also does not save which counters are displayed.
 */
function trackerCore_saveSavefiles () {
	localStorage.setItem('profiles' , JSON.stringify(trackerCore_status.profiles ));
	localStorage.setItem('savefiles', JSON.stringify(trackerCore_status.savefiles));

	//set these properties manually since they're not enumerable
	localStorage.setItem('globalProfile'      , JSON.stringify(trackerCore_status.profiles.globalProfile  ));
	localStorage.setItem('profilesCreated'    , JSON.stringify(trackerCore_status.profiles.profilesCreated));
	localStorage.setItem('currentSavefileSlot', JSON.stringify(trackerCore_status.savefiles.currentSlot   ));
}

/**	Finds and returns the linked counter.
 *
 * 	Arguments:
 * 		linkedCounter [String]
 * 			The counter it should find the origin of.
 * 			In the format of 'misc.distanceWalked'.
 *
 * 	Returns [String]:
 * 		The name of the original counter (would be either of type 'origin' or 'collection').
 * 		If a counter couldn't be found (or is invalid) then it will simply return either the last safe one or the 'linkedCounter' argument (even if it ends up being of type 'linked').
 */
function trackerCore_findLinkedCounter (linkedCounter) {
	//complain and return if it isn't a string
	if (typeof linkedCounter !== 'string') {
		console.warn(`[MPO] trackerCore_findLinkedCounter() received a non-string value as 'linkedCounter': `, linkedCounter, ` - Will return said value.`);
		return linkedCounter;
	}

	//will save the final counter
	let finalCounter = linkedCounter;

	//saves the counter that's currently being iterated over
	let counterName = linkedCounter;
	let behaviour = trackerCore_getCounterBehaviour(counterName);

	//if this one is already invalid/doesn't exist then complain and return
	if (behaviour instanceof trackerCore_CounterBehaviour === false) {
		console.warn(`[MPO] trackerCore_findLinkedCounter() found a invalid value where counter "${linkedCounter}" should be (has to be a trackerCore_CounterBehaviour object): `, behaviour);
		return linkedCounter;
	}

	//if type is 'linked' then find the next one, then do the same check again until it finds a counter that isn't 'linked'
	while (behaviour.counterRelationType === 'linked') {

		//get the name & behaviour of the linked counter
		counterName = behaviour.counterRelations?.linkTo;
		behaviour = trackerCore_getCounterBehaviour(counterName);

		//if the counter doesn't exist then complain and return the last valid one
		if (behaviour instanceof trackerCore_CounterBehaviour === false) {
			console.warn(`[MPO] trackerCore_findLinkedCounter() tried to find the linked counter for "${linkedCounter}" but found a invalid value where counter "${counterName}" should be (has to be a trackerCore_CounterBehaviour object): `, behaviour, ` - Continuing with the last valid counter.`);
			return finalCounter;
		}

		//save the current counter since that one is valid
			//after this the while loop checks again whether this one is 'linked' or not
		finalCounter = counterName;
	}

	//return the found counter
	return finalCounter;
}

// === CONSTRUCTORS ===

/**	This sets up a 'Profile' object which contains one profile. Big surprise. (See documentation under 'trackerCore_status' > 'profiles')
 *
 * 	Arguments:
 * 		specifics [Object]
 * 			If a property here doesn't have an explanation then see the documentation at the top of this file under 'trackerCore_status' > 'profiles' > '*array item*'.
 * 			If a invalid argument is given then (unless mentioned otherwise) it will simply use the specified defaults, without logging it to the console.
 *
 * 				_premade [Object/String] <none>
 * 					You can provide a pre-made 'trackerCore_Savefile' object in this and it will automatically fetch all values inside it.
 * 					This can also be a stringified JSON object, in which case it will automatically be parsed.
 * 					Other values specified WILL take priority over the values found in '_premade' (unless the value is null).
 * 					If this is invalid it will be ignored completely.
 *
 * 				_globalProfile [Boolean] <false>
 * 					If true it will create the 'globalProfile', which only has 'settings' and 'perCounterStatus' (which also means all other arguments will be ignored, aside from '_premade').
 *
 * 				name [String] <'Unnamed profile'>
 * 					*See documentation
 *
 * 				settingsType [String] <'inherit'>
 * 					*See documentation
 *
 * 				perCounterStatusType [String] <'standalone'>
 * 					*See documentation
 *
 * 				settings [Object] <none>
 * 					*See documentation
 *
 * 				perCounterStatus [Object] <¯\_(ツ)_/¯>
 * 					*See documentation
 *
 * 	Constructs:
 * 		*See documentation at the top of this file under 'trackerCore_status' > 'profiles' > '*array item*'.
 */
function trackerCore_Profile (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] trackerCore_Profile() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}



	//=== LOAD PREMADE OBJECT ===

	//parse the JSON string (if it is a string)
	if (typeof specifics._premade === 'string') {

		//put it in a 'try ... catch' because this WILL throw an error and break everything otherwise
		try {

			//actually parse the string
			specifics._premade = JSON.parse(specifics._premade);

		} catch (e) {
			//complain...
			console.warn(e);
			console.warn(`[MPO]	trackerCore_Savefile() could not parse the JSON string in '_premade' (following string is cut-off at 100 characters): `, specifics._premade.substring(0, 100));

			//...and pretend like this never happened
				//this is done so the rest of the function doesn't think there's an actual '_premade' object it should use
			specifics._premade = undefined;
		}
	}

	//apply the pre-made object (if there is one)
		//but only apply them if there isn't already a value for it
	if (typeof specifics._premade === 'object') {
		specifics.settingsType         ??= specifics._premade?.inheritanceTypes?.settingsType;
		specifics.perCounterStatusType ??= specifics._premade?.inheritanceTypes?.perCounterStatusType;

		specifics.name              ??= specifics._premade?.name;
		specifics.settings          ??= specifics._premade?.settings;
		specifics.perCounterStatus  ??= specifics._premade?.perCounterStatus;
	} else {
		//set it to undefined to make sure the rest of the function doesn't rely on a object that doesn't exist
			//more of a fail-safe than anything
		specifics._premade = undefined;
	}



	// === GLOBAL PROFILE ===

	if (specifics._globalProfile === true) {

		specifics.name = 'Global Profile';
		specifics.settingsType         = 'standalone';
		specifics.perCounterStatusType = 'standalone';
	}



	// === SET NAME ===

	//Get the name from 'specifics' if it exists or use a boring default name if not
	this.name = (typeof specifics.name === 'string') ? specifics.name : 'Unnamed Profile';



	// === SET INHERITANCE TYPES ===

	//create the object with defaults
	this.inheritanceTypes = {
		settingsType:         'inherit',
		perCounterStatusType: 'standalone'
	};

	//check if 'specifics' has a valid 'settingsType'...
	if (['inherit', 'combined', 'standalone'].indexOf(specifics.settingsType) !== -1) {
		this.inheritanceTypes.settingsType = specifics.settingsType;

	//...if not, then complain
	} else if (specifics.settingsType !== undefined) {
		console.warn(`[MPO] trackerCore_Profile() received a invalid value for 'settingsType' (check documentation in 'trackerCore.js'): `, specifics.settingsType);
	}

	//and the same with 'perCounterStatusType'
	if (['inherit', 'combined', 'standalone'].indexOf(specifics.perCounterStatusType) !== -1) {
		this.inheritanceTypes.perCounterStatusType = specifics.perCounterStatusType;

	} else if (specifics.perCounterStatusType !== undefined) {
		console.warn(`[MPO] trackerCore_Profile() received a invalid value for 'perCounterStatusType' (check documentation in 'trackerCore.js'): `, specifics.perCounterStatusType);
	}



	// === SET SETTINGS ===

	//set 'settings'
		//use the provided object if there is one (and then validate each value inside it -- all invalid values are removed)
		//otherwise simply use a empty object
	this.settings = (specifics.settings !== undefined) ? applySettings_validateAll(specifics.settings) : {};

	if (this.inheritanceTypes.settingsType === 'standalone') {
		this.settings.fillIn(applySettings_defaultSettings);
	}



	// === SET PER-COUNTER STATUS ===

	this.perCounterStatus = new trackerCore_PerCounterStatus(specifics.perCounterStatus);
}

/**	This sets up a 'Savefile' object which contains everything a single savefile needs.
 *
 * 	Args:
 * 		specifics [Object] <defaults>
 * 			If a property here doesn't have an explanation then see the documentation at the top of this file under 'trackerCore_status' > 'savefiles' > '*array item*'.
 * 			If a invalid argument is given then (unless mentioned otherwise) it will simply use the specified defaults, without logging it to the console.
 *
 * 			Contains the following properties:
 *
 * 				_premade [Object/String] <none>
 * 					You can provide a pre-made 'trackerCore_Savefile' object in this and it will automatically fetch all values inside it.
 * 					This can also be a stringified JSON object, in which case it will automatically be parsed.
 * 					Other values specified WILL take priority over the values found in '_premade' (unless the value is null).
 * 					If this is invalid it will be ignored completely.
 *
 * 				settingsType [String] <'inherit'>
 * 					*See xx > 'inheritanceTypes' > 'settingsType' in the documentation.
 *
 * 				perCounterStatus [String] <'inherit'>
 * 					*See xx > 'inheritanceTypes' > 'perCounterStatus' in the documentation.
 *
 * 				profileParent [Number] <null>
 * 					To which profile it belongs to.
 * 					Can be null in which case it's just listed at the bottom without a profile.
 *
 * 				players [Array] <4 players; P1 is human, rest computers; characters are 'mario', 'luigi', 'yoshi', 'peach' in that order; all players are unnamed>
 *					A list of all players.
 * 					Array consists of objects. See the arguments of 'trackerCore_Player()' to see what each object should contain.
 *
 * 				game [String] <'_all'>
 * 					*See documentation
 *
 * 				settings [Object] <nothing>
 * 					*See documentation
 *
 * 				perCounterStatus [Object] <none>
 * 					*See documentation
 *
 * 	Constructs:
 * 		*See documentation at the top of this file under 'trackerCore_status' > 'savefiles' > '*array item*'.
 */
function trackerCore_Savefile (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] trackerCore_Savefile() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}



	//=== LOAD PREMADE OBJECT ===

	//parse the JSON string (if it is a string)
	if (typeof specifics._premade === 'string') {

		//put it in a 'try ... catch' because this WILL throw an error and break everything otherwise
		try {

			//actually parse the string
			specifics._premade = JSON.parse(specifics._premade);

		} catch (e) {
			//complain...
			console.warn(e);
			console.warn(`[MPO]	trackerCore_Savefile() could not parse the JSON string in '_premade' (following string is cut-off at 100 characters): `, specifics._premade.substring(0, 100));

			//...and pretend like this never happened
				//this is done so the rest of the function doesn't think there's an actual '_premade' object it should use
			specifics._premade = undefined;
		}
	}

	//apply the pre-made object (if there is one)
		//but only apply them if there isn't already a value for it
	if (typeof specifics._premade === 'object') {
		specifics.settingsType         ??= specifics._premade?.inheritanceTypes?.settingsType;
		specifics.perCounterStatusType ??= specifics._premade?.inheritanceTypes?.perCounterStatusType;

		specifics.profileParent     ??= specifics._premade?.profileParent;
		specifics.game              ??= specifics._premade?.game;
		specifics.players           ??= specifics._premade?.players;
		specifics.settings          ??= specifics._premade?.settings;
		specifics.perCounterStatus  ??= specifics._premade?.perCounterStatus;
	} else {
		//set it to undefined to make sure the rest of the function doesn't rely on a object that doesn't exist
			//more of a fail-safe than anything
		specifics._premade = undefined;
	}



	//=== SET INHERITANCE TYPES ===

	//create the object with defaults
	this.inheritanceTypes = {
		settingsType:         'inherit',
		perCounterStatusType: 'inherit'
	};

	//check if 'specifics' has a valid 'settingsType'...
	if (['inherit', 'combined', 'standalone'].indexOf(specifics.settingsType) !== -1) {
		this.inheritanceTypes.settingsType = specifics.settingsType;

	//...if not, then complain
	} else if (specifics.settingsType !== undefined) {
		console.warn(`[MPO] trackerCore_Profile() received a invalid value for 'settingsType' (check documentation in 'trackerCore.js'): `, specifics.settingsType);
	}

	//and the same with 'perCounterStatusType'
	if (['inherit', 'combined', 'standalone'].indexOf(specifics.perCounterStatusType) !== -1) {
		this.inheritanceTypes.perCounterStatusType = specifics.perCounterStatusType;

	} else if (specifics.perCounterStatusType !== undefined) {
		console.warn(`[MPO] trackerCore_Profile() received a invalid value for 'perCounterStatusType' (check documentation in 'trackerCore.js'): `, specifics.perCounterStatusType);
	}



	//=== SET PROFILE PARENT ===

	//if it's null then use that
	if (specifics.profileParent === null) {
		this.profileParent = null;

	//if it's something else then verify the value
	} else {

		//convert to number just to be safe
		specifics.profileParent = Number(specifics.profileParent);

		//if it's a valid number then use it, otherwise use null
		if (Number.isSafeInteger(specifics.profileParent) === true) {
			this.profileParent = specifics.profileParent;
		} else {
			this.profileParent = null;
		}
	}



	//=== SET GAME & PLAYERS ===

	//set the game but only if it's valid
		//get a list of all game abbreviations and then check if 'specifics.game' is one of them
	this.game = (dbparsing_getAllGameAbbreviations().indexOf(specifics.game) !== -1) ? specifics.game : '_all';


	//create an empty array which will then be filled in
	this.players = [];

	//set the 'playerAmount' property of the array
	Object.defineProperty(this.players, 'playerAmount', {

		//it shouldn't show up in for loops
		enumerable: false,

		//return the length of the array
		get: () => {return this.players.length},

		//refuse to edit the value
			//TODO: this should automatically create a new player (or remove one) whenever someone tries to set it
			//or you create a dedicated function for that which is probably better since that can take arguments
		set: (newValue) => {return;}
	});

	//if players are specified then create a 'trackerCore_Player()' object for each player specified (everything is handled inside that function so no need to get our hands dirty here)
	if (Array.isArray(specifics.players) === true) {
		for (const item of specifics.players) {
			this.players.push(new trackerCore_Player(item));
		}

	//else, if no players are specified then use the defaults
	} else {
		this.players.push(new trackerCore_Player({
			character: 'mario',
			com: false
		}));
		this.players.push(new trackerCore_Player({
			character: 'luigi',
			com: true
		}));
		this.players.push(new trackerCore_Player({
			character: 'yoshi',
			com: true
		}));
		this.players.push(new trackerCore_Player({
			character: 'peach',
			com: true
		}));
	}


	//=== SET SETTINGS ===

	//set 'settings'
		//use the provided object if there is one (and then validate each value inside it -- all invalid values are removed)
		//otherwise simply use a empty object
	this.settings = (specifics.settings !== undefined) ? applySettings_validateAll(specifics.settings) : {};

	if (this.inheritanceTypes.settingsType === 'standalone') {
		this.settings.fillIn(applySettings_defaultSettings);
	}



	//=== SET PER-COUNTER STATUS ===

	this.perCounterStatus = new trackerCore_PerCounterStatus(specifics.perCounterStatus);
}

/** This sets up a 'PerCounterStatus' object which contains a status for every single counter (like whether it should be displayed, highlighted, etc).
 *
 * 	Arguments:
 * 		premade [Object] <defaults>
 * 			An entire 'PerCounterStatus' object. If present it will take the values from this.
 * 			If this doesn't exist then it will simply use default values - see 'trackerCore_CounterStatus()'.
 *
 * 	Constructs:
 * 		*See documentation at the top of this file under 'trackerCore_status' > 'savefiles' > '*array item*' > 'perCounterStatus'.
 */
function trackerCore_PerCounterStatus (premade={}) {
	//check if a pre-made object has been given - if not then create an empty object
	if (typeof premade !== 'object') {
		console.warn(`[MPO] trackerCore_PerCounterStatus() received a non-object as 'premade':`, premade);
		premade = {};
	}

	//the following for loop goes through all counters specified in 'trackerCore_status.counters.behaviour' and adds them all to the 'perCounterStatus' property
		//two 'for' loops are needed because all counters are categorized into various categories so it has to loop through all categories so it can THEN loop through all counters

	//loop through all available categories
	for (const categoryKey in trackerCore_status.counters.behaviour) {
		//for quick access
		const categoryItem = trackerCore_status.counters.behaviour[categoryKey];

		//create the category
		this[categoryKey] = {};

		//the following loops through all counters
			//first, check if this category was already specified in 'premade'
			//then create a 'trackerCore_CounterStatus()' object for every counter - if the category did exist in 'premade' then take values from there, if not then use defaults

			//duplicate code because the alternative is to put the 'if' inside the 'for' loop which means it would get called for every single last counter, which is slow
			//arguably slow enough to warrant a tiny bit of duplicate code

		//check if the category we're on was specified
		if (typeof premade[categoryKey] === 'object') {

			//loop through all counters...
			for (const counterKey1 in categoryItem) {
				//for quick access
				//const counterItem1 = categoryItem[counterKey1];

				//...and set the counter by calling 'trackerCore_CounterStatus()' with the values given in 'premade' (whether the values inside exist or not doesn't matter)
				this[categoryKey][counterKey1] = new trackerCore_CounterStatus(premade[categoryKey][counterKey1]);
			}

		//else, if the category wasn't specified
		} else {

			//loop through all counters...
			for (const counterKey2 in categoryItem) {
				//for quick access
				//const counterItem2 = categoryItem[counterKey2];

				//...and set the counter by calling 'trackerCore_CounterStatus()' without providing any arguments (so it'll simply use defaults)
				this[categoryKey][counterKey2] = new trackerCore_CounterStatus();
			}
		}
	}
}

/**	This creates a object for saving per-counter status (so one of these is needed for every single counter - for each savefile).
 *
 * 	Note: Invalid values won't be logged to the console, they'll just be quietly replaced with default values.
 *
 * 	Arguments:
 * 		specifics [Object]
 * 			Contains the following properties:
 *
 * 				active [Boolean] <true>
 * 					Whether the counter is enabled or not.
 *
 * 				highlightHighest [Boolean] <true>
 * 					Whether the highest stat should be highlighted.
 *
 * 				highlightLowest [Boolean] <false>
 * 					Whether the lowest stat should be highlighted.
 *
 * 	Constructs:
 * 		active [Boolean]
 * 			Whether the counter is enabled or not.
 *
 * 		highlightHighest [Boolean]
 * 			Whether the highest stat should be highlighted.
 *
 * 		highlightLowest [Boolean]
 * 			Whether the lowest stat should be highlighted.
 */
function trackerCore_CounterStatus (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] trackerCore_CounterStatus() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//set 'active'
		//use the provided value if available, otherwise true
	this.active = (typeof specifics.active === 'boolean') ? specifics.active : true;

	//set 'highlightHighest'
	this.highlightHighest = (typeof specifics.highlightHighest === 'boolean') ? specifics.highlightHighest : true;

	//set 'highlightLowest'
	this.highlightLowest  = (typeof specifics.highlightLowest  === 'boolean') ? specifics.highlightLowest  : false;
}

/**	This creates a player object for 'trackerCore_status'.
 *
 * 	Args:
 * 		specifics [Object] <optional>
 * 			Includes the following properties:
 *
 * 				name [String/null] <null>
 * 					The name of the player.
 * 					Use null if the player shouldn't have a name.
 *
 * 				character [String] <mario>
 * 					Which character the player plays as.
 *
 * 				com [Boolean] <false>
 * 					Whether the player is a computer or not.
 *
 * 				stats [Object] <all 0>
 * 					The current stats of the players.
 * 					Will only take the stats that are actually valid.
 * 					Consists of the following:
 *
 * 					> 'bonusStars'/'spaces'/'misc'/etc [Object] <all 0>
 * 						The category of the counters.
 * 						Includes the following:
 *
 * 							> 'runningStar'/'blueSpace'/'distanceWalked'/etc [Number/undefined] <0>
 * 								The stat of this specific counter.
 * 								If not present the stat is 0.
 *
 * 	Constructs:
 * 		name [String/null]
 * 			The name of the player.
 * 			Is null if the player doesn't have a name.
 *
 * 		character [String]
 * 			Which character the player plays as.
 *
 * 		com [Boolean]
 * 			Whether the player is a computer or not.
 *
 * 		stats [Object]
 * 			The current stats of the player.
 * 			Consists of the following:
 *
 * 				> 'bonusStars'/'spaces'/'misc'/etc [Object]
 * 					The category of the counters.
 * 					Includes the following:
 *
 * 						> 'runningStar'/'blueSpace'/'distanceWalked'/etc [Number/undefined]
 * 							The stat of this specific counter.
 * 							If not present the stat is 0.
 */
function trackerCore_Player (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] trackerCore_Player() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//set name but only use the provided one if it's a string, otherwise use null
	this.name = (typeof specifics.name === 'string') ? specifics.name : null;

	//set character but only use the provided one if it's valid, otherwise use Mario
	this.character = (dbparsing_getAllCharacterNames().indexOf(specifics.character) !== -1) ? specifics.character : 'mario';

	//set COM and use false as default
	this.com = (typeof specifics.com === 'boolean') ? specifics.com : false;

	//set stats to be an empty object...
	this.stats = {};

	//loop through all available counter categories
	for (const categoryKey in trackerCore_status.counters.behaviour) {

		this.stats[categoryKey] = {}

		//check if stats for this category have already been provided
		if (typeof specifics.stats === 'object' && typeof specifics.stats[categoryKey] === 'object') {

			//loop through all stats provided for this category
			for (const statKey in specifics.stats[categoryKey]) {

				//check if this counter actually exists and if a valid stat has been provided (valid being any number)
				if (typeof trackerCore_status.counters.behaviour[categoryKey][statKey] === 'object' && typeof specifics.stats[categoryKey][statKey] === 'number') {

					//and finally add the stat
					this.stats[categoryKey][statKey] = specifics.stats[categoryKey][statKey];
				}
			}
		}
	}
}

/**	This creates a 'trackerCore_CounterBehaviour' object.
 *
 * 	Args:
 * 		counterRelationType [String] <'origin'>
 * 			What kinda relation it should have with the other counters. See "The Counter Object" documentation at the top of this file.
 *
 * 		counterRelations [Object] <none>
 * 			Which counters it has a relation to (can be ignored when 'counterRelationType' is 'origin').
 * 			Can have the following properties:
 *
 * 				collectionChildren [Array] <none>
 * 					Only used if the type is 'collection'.
 * 					List of all counters this contains.
 *
 * 				linkTo [String]
 * 					The counter it should be linked to. Has to exist if type is 'linked' but can be ignored for anything else.
 *
 * 	Constructs:
 * 		Constructs a 'trackerCore_CounterBehaviour' object.
 */
function trackerCore_CounterBehaviour (newCounterName, counterRelationType='origin', counterRelations={collectionChildren: []}) {
	//make sure the name is valid
		//since we can't do much without a name we just setup the bare minimum so the site doesn't break completely
	if (typeof newCounterName !== 'string') {
		console.error(`[MPO] trackerCore_CounterBehaviour() received a non-string value as 'newCounterName': `, newCounterName, ` - Setting up a dummy counter now.`);
		this.counterRelationType = 'origin';
		this.counterRelations = {linkedFrom: []};
		return;
	}

	//make sure 'counterRelationType' is valid
	if (['origin', 'collection', 'linked'].indexOf(counterRelationType) === -1) {
		console.warn(`[MPO] trackerCore_CounterBehaviour() tried setting up "${newCounterName}" but received a invalid value as 'counterRelationType': `, counterRelationType, ` - Has to be 'origin', 'collection' or 'linked'. Continuing with 'origin'`);
		counterRelationType = 'origin';
	}

	//make sure 'counterRelations' is valid
	if (typeof counterRelations !== 'object') {
		console.warn(`[MPO] trackerCore_CounterBehaviour() tried setting up "${newCounterName}" but received a non-object as 'counterRelations': `, counterRelations, ` - Continuing with zero relations, there may be more error logs because of this.`);
		counterRelations = {};
	}

	//set a default 'counterRelations' to be filled in later
	this.counterRelations = {
		linkedFrom: []
	};


	//verify 'collectionChildren'
	if (counterRelationType === 'collection') {
		this.counterRelations.collectionChildren = [];

		//if it's not an array then complain and switch to 'origin'
		if (Array.isArray(counterRelations.collectionChildren) === false) {
			console.warn(`[MPO] trackerCore_CounterBehaviour() tried setting up "${newCounterName}" but received a invalid value as 'counterRelations.collectionChildren (has to be an array': `, counterRelations.collectionChildren, ` - Counter will be switched to 'origin'.`);
			counterRelationType = 'origin';

		//if it's an array:
		} else {

			//quick access
			const children = counterRelations.collectionChildren;

			//go through all of them to make sure they're good
			for (const childKey of children) {

				//skip this if it's not a string
				if (typeof childKey !== 'string') {
					console.warn(`[MPO] trackerCore_CounterBehaviour() tried setting up "${newCounterName}" but found a non-string while validating 'counterRelations.collectionChildren' (will be ignored): `, childKey, ` - If all entered counters are correct, check all counters linked to them. This function automatically checks all counters linked to the ones entered in 'collectionChildren' and adds them to said array.`);
					continue;
				}

				//get the original counter it links to
					//this will find either a 'origin' or a 'collection', since we can't link it to a 'linked' counter
				const originKey = trackerCore_findLinkedCounter(childKey);
				const originCounter = trackerCore_getCounterBehaviour(originKey);

				//skip this if it's not valid
				if (originCounter instanceof trackerCore_CounterBehaviour === false) {
					console.warn(`[MPO] trackerCore_CounterBehaviour() tried setting up "${newCounterName}" but found a invalid counter while validating 'counterRelations.collectionChildren' (will be ignored): `, originCounter, ` (name: "${originKey}") - If all entered counters are correct, check all counters linked to them. This function automatically checks all counters linked to the ones entered in 'collectionChildren' and adds them to said array.`);
					continue;
				}

				//if the counter is another collection then validate all of its children by pushing it to this for loop
					//basically, this for loop iterates over 'collectionChildren' in order to check whether the given counters are valid or not
					//so if we find new counters that have to be validated we just push it to 'collectionChildren'
					//JS doesn't care if the array it's iterating over changes, it just keeps going until it reached the end so new elements will still be iterated over
				switch (originCounter.counterRelationType) {

					//apply the 'origin' counter since that's the end point
					case 'origin':
						this.counterRelations.collectionChildren.push(originKey);
						originCounter.counterRelations.linkedFrom.push(newCounterName);
						break;

					//if it's linked to another counter then add that one (if it wasn't already added)
					case 'linked':
						if (children.indexOf(originCounter.counterRelations.linkTo) === -1) {
							children.push(originCounter.counterRelations.linkTo);
						}
						break;

					//if it's a collection then add all of it's children
					case 'collection':
						//loop through it's children and add all of them to the array to iterate over
						for (const item of originCounter.counterRelations.collectionChildren) {

							//but only if it wasn't already added
							if (children.indexOf(originCounter.counterRelations.linkTo) === -1) {
								children.push(item);
							}
						}
						break;
				}
			}
		}
	}

	//verify 'linkTo'
	if (counterRelationType === 'linked') {

		//if it's not a string then complain and switch to 'origin'
		if (typeof counterRelations.linkTo !== 'string') {
			console.warn(`[MPO] trackerCore_CounterBehaviour() tried setting up "${newCounterName}" but received a invalid value as 'counterRelations.linkTo' (has to be a string): `, counterRelations.linkTo, ` - Counter will be switched to 'origin'.`);
			counterRelationType = 'origin';

		//if it's a string:
		} else {
			//get the original counter it links to
				//this will find either a 'origin' or a 'collection', since we can't link it to a 'linked' counter
			const originKey = trackerCore_findLinkedCounter(counterRelations.linkTo);
			const originCounter = trackerCore_getCounterBehaviour(originKey);

			//if the counter actually exists and is a valid Counter object then use it
			if (originCounter instanceof trackerCore_CounterBehaviour) {
				this.counterRelations.linkTo = originKey;
				originCounter.counterRelations.linkedFrom.push(newCounterName);

			//if the counter is invalid then complain and switch to 'origin'
			} else {
				console.warn(`[MPO] trackerCore_CounterBehaviour() tried setting up "${newCounterName}" but could not find the origin of the argument 'counterRelations.linkTo': `, counterRelations.linkTo, ` - Following origin was found (which is invalid): `, originKey, ` - Will switch to 'origin'.`);
				counterRelationType = 'origin';
			}
		}
	}

	//set type
	this.counterRelationType = counterRelationType;
}