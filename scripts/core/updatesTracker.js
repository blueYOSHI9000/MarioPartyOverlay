// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/** === WORKING WITH THE TRACKER ===
 *
 * 	This file hosts all functions related to actually updating the tracker, including functions that get the current state of it.
 * 	Here's a list of them with categories:
 *
 * 	# STATS
 *
 * 		updatesTracker_updateCounter()
 * 			The go-to function for updating a counter.
 *
 * 		updatesTracker_getStat()
 * 			Get a stat of a player & counter.
 *
 * 	# PLAYERS
 *
 * 		updatesTracker_getCharacter()
 * 		updatesTracker_setCharacter()
 * 			Get and set a character of a player.
 *
 * 	# CONTROLS
 *
 * 		updatesTracker_getAction()
 * 		updatesTracker_setAction()
 * 			Get and set the default action ('add'/'sub'/'set' or +/-/= as used on the display).
 *
 * 		updatesTracker_getAmount()
 * 		updatesTracker_setAmount()
 * 			Get and set the default amount (likely 1/5/10 but can be pretty much anything).
 */

//this tracks the call-chain from 'updatesTracker_updateCounter()'
	//mostly because that functions calls itself to update all 'counterRelations.updateFollowing' counters
	//this is needed so it doesn't try and update the same counter multiple times - and also to stop it from doing an infinite loop
let updatesTracker_callChain = [];

/**	Updates a counter with new stats.
 *
 * 	Args:
 * 		counter [String]
 * 			The counter to be updated. Has to be the name as it's listed in the database.
 *
 * 		player [Number]
 * 			The player to be updated. Starts at 1.
 *
 * 		action [String] <current action>
 * 			The action that should be taken.
 * 			Can be one of the following:
 * 				- add: Adds stats.
 * 				- sub: Removes stats.
 * 				- set: Sets stats to a certain number.
 *			If not specified it simply takes the default action that's displayed in the navbar.
 *
 * 		amount [Number] <current amount>
 * 			The amount that should be added/subtracted or set to.
 * 			Negative numbers are handled as regular numbers. This means they invert the action, just like regular math (aside from 'set' which sees it as 0).
 *			If not specified it simply takes the default amount that's displayed in the navbar.
 */
function updatesTracker_updateCounter (counterName, player, action=updatesTracker_getAction(), amount=updatesTracker_getAmount()) {
	//if this counter has already been called right now then don't update it a second time
	if (updatesTracker_callChain.indexOf(counterName) !== -1) {
		return;
	}

	if (typeof amount !== 'number') {

		//generate a more useful error since null can be an intended value
		if (amount === null) {
			console.warn(`[MPO] updatesTracker_updateCounter() received ${null} as a value, no counter will be updated as ${null} should never be given to this function, despite being an intended 'amount' value.`);
		}

		//generic warn as all other values are completely unintended
		console.warn(`[MPO] updatesTracker_updateCounter() received a non-number as 'amount': `, amount);
		return 0;
	}

	//if 'updatesTracker_callChain' is empty then the call-chain should be emptied again after this function
	const firstCall = (updatesTracker_callChain.length === 0) ? true : false;

	//get the counter behaviour
	let behaviour = trackerCore_getCounterBehaviour(counterName);

	//get original counter if it's linked
		//should still get added to the call chain since the call chain will be used to udpate all counters visually at the end
	if (behaviour?.counterRelationType === 'linked') {
		updatesTracker_callChain.push(counterName);
		counterName = behaviour.counterRelations?.linkTo;
		behaviour = trackerCore_getCounterBehaviour(behaviour.counterRelations?.linkTo);

		//if this counter has already been called right now then don't update it a second time
		if (updatesTracker_callChain.indexOf(counterName) !== -1) {
			return;
		}
	}

	//if the counter doesn't exist then complain
		//while we could return now, since this is a rather important function we might as well let it continue. Best case it magically still works, worst case the dev has more error reports to work with (and more information because of it)
		//also, if this happens then chances are 'behaviour' doesn't exist and trying to access its properties will crash
		//we could use the ?. feature to access properties but the time spent doing that probably isn't worth it for a issue that occurs this rarely (hopefully?) - again, see best/worst case
	if (behaviour instanceof trackerCore_CounterBehaviour === false) {
		console.error(`[MPO] updatesTracker_updateCounter() could not find the counter specified in 'counterName': `, counterName, ` - Will continue anyway, expect more errors. - player: `, player, ` | action: `, action, ` | amount: `, amount);
	}


	// === CALCULATE STAT ===

	//get current/old stat
		//if the 'updatesTracker_getStat' is falsy (NaN, null) then simply set it to 0 instead (note that 0 is also considered "falsy" but that doesn't matter here since we set it to 0 anyway)
	const oldStat = updatesTracker_getStat(counterName, player) || 0;

	//set new stat to 0 as a default
	let newStat = 0;

	//calculate the new stat
	switch (action) {
		case 'add':
			newStat = oldStat + amount;
			break;
		case 'sub':
			newStat = oldStat - amount;
			break;
		case 'set':
			newStat = amount;
			break;

		//log error if 'action' is an invalid argument
			//note that 'newStat' is already set to 0 so this doesn't have to do anything else
		default:
			console.error(`[MPO] updatesTracker_updateCounter() has gotten an invalid 'action' argument: `, action, ` - Will set counter to 0.`);
			break;
	}

	//round number down
	newStat = Math.floor(newStat);

	//check to make sure the new stat is valid
		//can't be below 0
		//can't be above 999
	if (newStat < 0) {
		newStat = 0;
	} else if (newStat > 999) {
		newStat = 999;

	//if 'newStat' is not in between 0 and 999 (inclusive) then it's invalid
		//this could be if it's Infinity, -Infinity, NaN or somehow not even of the type 'number'
	} else if (!(newStat >= 0 && newStat <= 999)) {
		console.error(`[MPO] updatesTracker_updateCounter() got an invalid 'newStat' of value "${newStat}". oldStat: "${oldStat}" | counterName: "${counterName}" | player: "${player}" | action: "${action}" | amount: ${amount}`);
		newStat = 0;
	}

	const difference = newStat - oldStat;


	// === UPDATE STAT ===

	//add this counter to the list
	updatesTracker_callChain.push(counterName);

	//set the new stat
	updatesTracker_setStat(counterName, player, newStat);


	// === UPDATE RELATED COUNTERS ===

	const updateFollowing = behaviour.counterRelations.updateFollowing;

	if (Array.isArray(updateFollowing) !== true) {
		console.warn(`[MPO] updatesTracker_updateCounter() found a invalid 'counterRelations.updateFollowing' for counter "${counterName}" (has to be an Array since it can't be a linked counter): `, updateFollowing);

	} else {

		//failsafe
		if (firstCall === true) {
			setTimeout(() => {updatesTracker_callChain = [];}, 0);
		}

		//update every related counter
			//but using the difference, which only makes a change when the counter is at 1 and a change of -5 is done, because the actual change done would just be -1 (since a counter can't go below 0), this way every counter is updated the same way
			//Note: the second time this is done it might change the amount since may, again, not fulfill the initial amount fully

		for (const name of updateFollowing) {
			updatesTracker_updateCounter(name, player, 'add', difference);
		}
	}

	//if this is the first call then update the visuals of every single counter used and empty the call-chain
	if (firstCall === true) {
		for (const name of updatesTracker_callChain) {
			//update the UI
			trackerInterface_updateCounter(name, player);
		}

		updatesTracker_callChain = [];
	}
}

/**	Gets the specified stat from a player.
 *
 * 	Args:
 * 		counterName [String]
 * 			The counter that should be gotten.
 * 			Is in the format of 'bonusStars.runningStar'.
 * 			Won't be checked whether this is valid or not.
 *
 * 		player [Number]
 * 			The player. Starts at 1.
 *
 * 	Returns [Number/null]:
 * 		The stat as a number.
 * 		If no stat for the counter has been entered yet then it will automatically return 0 (as intended).
 * 		If it can't even get far enough to check if the stat exists (say, the player or counter category doesn't exist) then it will return 'null'.
 */
function updatesTracker_getStat (counterName, player) {
	//complain and return if it's not a number
	if (typeof player !== 'number') {
		console.warn(`[MPO] updatesTracker_getStat() received a non-number as 'player': `, player);
		return 0;
	}

	//get the original counterName (if this is already the original then we'll get this one back anyway)
		//this is because linked counters don't store any stats
	counterName = trackerCore_findLinkedCounter(counterName);

	//get the player
	let playerObj = trackerCore_getSavefile().players[player];

	if (playerObj === undefined) {
		console.error(`[MPO] updatesTracker_getStat() received an invalid player number that doesn't exist: `, player, ` - counterName: `, counterName, ` - Errors after this are likely caused by this.`);
		return null;
	}

	//get the actual stat
	let stat = playerObj.stats.fetchProperty(counterName);

	//if stat doesn't exist yet then set it to 0
	stat ??= 0;

	//use a failsafe in case the stat isn't valid
	if (typeof stat !== 'number' && stat !== null) {
		console.error(`[MPO] updatesTracker_getStat() found a invalid stat for counter `, counterName, ` and player `, player, `: `, stat, ` - Errors after this are likely caused by this.`);
		return null;
	}

	return stat;
}

/**	Sets a stat for the specified counter & player to a new value.
 *
 * 	Note that this DOES NOT update the visuals. Use 'updatesTracker_updateCounter()' for that.
 *
 * 	Args:
 * 		counterName [String]
 * 			The counter that should be gotten.
 * 			Is in the format of 'bonusStars.runningStar'.
 *
 * 		player [Number]
 * 			The player. Starts at 1.
 *
 * 		value [Number]
 * 			The value the stat should be set to.
 * 			This function only checks if it is a number but not if it's valid (anything that's not NaN or infinity).
 *
 * 	Returns [Boolean]:
 * 		'true' if it was succesfully updated.
 * 		'false' if something went wrong.
 */
function updatesTracker_setStat (counterName, player, value) {
	//return if the value isn't a number
	if (typeof value !== 'number') {
		return false;
	}

	//get the original counterName (if this is already the original then we'll get this one back anyway)
		//this is because linked counters don't store any stats
	counterName = trackerCore_findLinkedCounter(counterName);

	//set the stat and save the response (Boolean of whether it was successful or not)
	let result = trackerCore_getSavefile().players[player].stats.fetchProperty(counterName, {setTo: value});

	return result;
}

/**	Gets the character used by a certain player.
 *
 * 	Args:
 * 		player [Number]
 * 			The player.
 *
 * 	Returns [String/null]:
 * 		The name of character.
 * 		Will return 'null' if the character couldn't be found.
 */
function updatesTracker_getCharacter (player) {
	if (typeof player !== 'number') {
		console.warn(`[MPO] updatesTracker_getCharacter() received a non-number as an argument: "${player}".`);
		return null;
	}

	let playerObj = trackerCore_getSavefile().players[player];

	if (playerObj === undefined) {
		console.warn(`[MPO] updatesTracker_setCharacter() received an invalid player number: `, player);
		return null;
	}

	return playerObj.character ?? null;
}

/**	Change the character of a single player.
 *
 * 	Args:
 * 		player [Number]
 * 			The player that should be updated.
 *
 * 		charName [String]
 * 			The name of the character as listed in the database.
 */
function updatesTracker_setCharacter (player, charName) {
	let playerObj = trackerCore_getSavefile().players[player];

	if (playerObj === undefined) {
		console.warn(`[MPO] updatesTracker_setCharacter() received an invalid player number: `, player, ` - charName: `, charName);
		return;
	}
	playerObj.character = charName;

	//update the visual
	trackerInterface_updateCharacter(player);
}

/**	Gets the current game.
 *
 * 	Args:
 * 		savefileSlot [Number] <current>
 * 			The savefile it should get the current game from.
 * 			Will default to the currently selected savefile.
 *
 * 	Returns [String/null]:
 * 		The current game in the format of 'all', 'mp1', 'mp4', 'mptt100', etc.
 * 		Returns 'null' if it can't be found.
 */
function updatesTracker_getGame (savefileSlot) {
	return trackerCore_getSavefile(savefileSlot).game;
}

/**	Gets the current default action of the tracker.
 *
 * 	Returns [String]:
 * 		Simply returns the action of the tracker. Is either 'add', 'sub' (subtract) or 'set'.
 */
function updatesTracker_getAction () {
	return trackerCore_status['controls']['action'];
}

/**	Set the default action for the tracker.
 *
 * 	Args:
 * 		newAction [String]
 * 			The new action.
 * 			Can be either 'add', 'sub' (subtract) or 'set'.
 *
 * 	Returns [Boolean]:
 * 		'true' if it was successfully updated, 'false' if something went wrong.
 */
function updatesTracker_setAction (newAction) {
	//check to make sure 'newAction' is valid and then immediately set it
	switch (newAction) {
		case 'add':
			trackerCore_status['controls']['action'] = 'add';
			break;

		case 'sub':
			trackerCore_status['controls']['action'] = 'sub';
			break;

		case 'set':
			trackerCore_status['controls']['action'] = 'set';
			break;

		//complain and return if argument was invalid
		default:
			console.warn(`[MPO] updatedTracker_changeAction() received a invalid argument: "${newAction}".`);
			return false;
	}

	//update the navbar display
	handleNavbar_updateActionDisplay();

	return true;
}

/**	Gets the current default amount of the tracker.
 *
 * 	Returns [Number]:
 * 		The current default amount.
 */
function updatesTracker_getAmount () {
	return trackerCore_status['controls']['amount'];
}

/**	Sets the default amount for the tracker to use.
 *
 * 	Args:
 * 		newAmount [Number/null]
 * 			The new amount.
 * 			Has to be more than 0 and less than 1000 (anything from 1 to 999, including them, is good).
 * 			null is a unique value but allowed.
 *
 * 	Return [Boolean]:
 * 		'true' if it was successfully updated, 'false' if something went wrong.
 */
function updatesTracker_setAmount (newAmount) {
	//make sure 'newAmount' is valid
		//if it's not, complain and return
	if (newAmount !== null && (Number.isSafeInteger(newAmount) === false || newAmount < 0 || newAmount > 999)) {
		console.warn(`[MPO] updatesTracker_changeAmount() received a invalid argument: `, newAmount);
		return false;
	}

	//set the new amount
	trackerCore_status['controls']['amount'] = newAmount;

	//update navbar display
	handleNavbar_updateAmount();

	return true;
}

/**	Creates a new savefile.
 *
 * 	The newly created savefile will only have defaults (for now).
 *
 * 	Arguments:
 * 		profile [Number/null] <null>
 * 			Which profile it should be added to.
 * 			null means it won't get added to any profile and is basically ungrouped.
 *
 * 		autoSelect [Boolean] <false>
 * 			Whether the file should immediately be loaded after creation.
 */
function updatesTracker_createSavefile (profile, autoSelect) {
	trackerCore_status.savefiles.push(new trackerCore_Savefile({profileParent: profile}));

	//immediately load the savefile if 'autoSelect' is true
	if (autoSelect === true) {
		updatesTracker_loadSavefile(trackerCore_status.savefiles.length - 1);

		//'saveSavefiles()' is already called in 'loadSavefiles()' so no need to call it twice
		return;
	}

	trackerCore_saveSavefiles();
}

/**	Selects and loads a savefile.
 *
 * 	Args:
 * 		savefileSlot [Number]
 * 			The slot that should be loaded. Starts at 0.
 *
 * 	Returns [Boolean]:
 * 		'true' if the savefile got loaded, 'false' if not.
 */
function updatesTracker_loadSavefile (savefileSlot) {
	//complain and return if 'savefileSlot' is not a number
	if (typeof savefileSlot !== 'number') {
		console.warn(`[MPO] updatesTracker_loadSavefile() received a non-number as 'savefileSlot': "${savefileSlot}".`);
		return false;
	}

	//complain and return if the savefile couldn't be found
		//on one hand, this arguably isn't the best way to do it
		//on the other hand, this is arguably perfect because this function is always used when a savefile should be gotten so either it fails to grab it now or later
	if (trackerCore_getSavefile(savefileSlot) === null) {
		console.warn(`[MPO] updatesTracker_selectSavefile() received a invalid 'savefileSlot': "${savefileSlot}".`);
		return false;
	}

	//update the currently selected savefile
	trackerCore_status.savefiles.currentSlot = savefileSlot;

	//update all visuals
	trackerInterface_updateVisuals();

	//apply all settings
	applySettings_applyAll(true);

	//save to localStorage
	trackerCore_saveSavefiles();

	//return true as it's been successfully loaded
	return true;
}

/**	Deletes a savefile.
 *
 * 	Args:
 * 		savefileSlot [Number]
 * 			The savefile slot that should be deleted.
 *
 * 	Returns [Boolean]:
 * 		'true' if it got successfully deleted, 'false' if not.
 */
function updatesTracker_deleteSavefile (savefileSlot) {
	//complain and return if 'savefileSlot' is not a number
	if (typeof savefileSlot !== 'number') {
		console.warn(`[MPO] updatesTracker_deleteSavefile() received a non-number as 'savefileSlot': "${savefileSlot}.`);
		return false;
	}

	//make sure the savefile exists
	if (trackerCore_getSavefile(savefileSlot) === null) {
		console.warn(`[MPO] updatesTracker_deleteSavefile() couldn't find the savefile on slot "${savefileSlot}".`);
		return false;
	}

	//make sure we're not deleting the only available savefile
	if (trackerCore_status.savefiles.length <= 1) {
		console.warn(`[MPO] updatesTracker_deleteSavefile() can't delete the savefile because it's the last one.`);
		return false;
	}

	//get the currently selected savefile slot
	let currentSavefileSlot = trackerCore_status.savefiles.currentSlot

	//remove the specified savefile
		//note that we don't need to worry about the currently selected savefile being out-of-bounds since we immediately select savefile 0 afterwards
	trackerCore_status.savefiles.splice(savefileSlot, 1);

	//if the currently selected savefile was removed then select slot 0
	if (savefileSlot === currentSavefileSlot) {
		updatesTracker_loadSavefile(0);

	//if the savefile removed was higher than the currently selected savefile then decrease '[...].savefiles.currentSlot' by 1 so it's accurate again
		//we don't need to load the savefile since it's already loaded, we only need to update this variable to be accurate again since we removed a array item
	} else if (savefileSlot < currentSavefileSlot) {
		trackerCore_status.savefiles.currentSlot -= 1;
	}

	//and finally save it
	trackerCore_saveSavefiles();

	//and also return true since it was removed successfully
	return true;
}