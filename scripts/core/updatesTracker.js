// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

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
 * 			Uses the default action specified in trackerCore_status['controls'].
 * 			Can be one of the following:
 * 				- add: Adds stats.
 * 				- sub: Removes stats.
 * 				- set: Sets stats to a certain number.
 *
 * 		value [Number] <current value>
 * 			The amount that should be added/subtracted or set to.
 * 			Uses the default value specified in trackerCore_status['controls'].
 */
function updatesTracker_updateCounter (counterName, player, action=trackerCore_status['controls']['action'], value=trackerCore_status['controls']['value']) {
	//get current/old stat
		//if the 'updatesTracker_getStat' is falsy then simply set it to 0 instead (note that 0 is also considered "falsy" but that doesn't matter here since we set it to 0 anyway)
	const oldStat = updatesTracker_getStat(counterName, player) || 0;

	//set new stat to 0 as a default
	let newStat = 0;

	//calculate the new stat
	switch (action) {
		case 'add':
			newStat = oldStat + value;
			break;
		case 'sub':
			newStat = oldStat - value;
			break;
		case 'set':
			newStat = value;
			break;

		//log error if 'action' is an invalid argument
			//note that 'newStat' is already set to 0 so this doesn't have to do anything else
		default:
			console.error(`[MPO] updatesTracker_updateCounter() has gotten an invalid 'action' argument: "${action}"`);
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
		console.error(`[MPO] updatesTracker_updateCounter() got an invalid 'newStat' of value "${newStat}". oldStat: "${oldStat}" | counterName: "${counterName}" | player: "${player}" | action: "${action}" | value: ${value}`);
		newStat = 0;
	}

	//set the new stat
	updatesTracker_setStat(counterName, player, newStat);

	//update the UI
	trackerInterface_updateCounter(counterName, player);
}

/**	Gets the specified stat from a player.
 *
 * 	Args:
 * 		counterName [String]
 * 			The counter that should be gotten.
 * 			Is in the format of 'bonusStars.runningStar'.
 *
 * 		player [Number]
 * 			The player. Starts at 1.
 *
 * 	Returns [Number/Boolean]:
 * 		The stat as a number.
 * 		If no stat for the counter has been entered yet then it will automatically return 0 (as intended).
 * 		If it however can't even get far enough to check if the stat exists (say, the player or counter category doesn't exist) then it will return false.
 */
function updatesTracker_getStat (counterName, player) {
	//get the actual stat
	let stat = trackerCore_getCounterFromNameInObj(counterName, trackerCore_status['players'][player - 1]['stats']);

	//if stat doesn't exist yet then set it to 0
	stat ??= 0;

	//use a failsafe in case the stat isn't valid
	if (typeof stat !== 'number' && stat !== false) {
		console.error(`[MPO] updatesTracker_getStat() found a invalid stat for counter "${counterName}" and player "${player}"`);
		stat = false;
	}

	return stat;
}

/**	Sets a stat for the specified counter & player to a new value.
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
 * 		true if it was succesfully updated.
 * 		false if something went wrong.
 */
function updatesTracker_setStat (counterName, player, value) {
	//return if the value isn't a number
	if (typeof value !== 'number') {
		return false;
	}

	//set the stat and save the response (Boolean of whether it was successful or not)
	let result = trackerCore_setCounterFromNameInObj(counterName, trackerCore_status['players'][player - 1]['stats'], value);

	return result;
}

/**	Gets the character used by a certain player.
 *
 * 	Args:
 * 		player [Number]
 * 			The player.
 *
 * 	Returns [String/Boolean]:
 * 		The name of character.
 * 		Will return false if the character couldn't be found.
 */
function updatesTracker_getCharacter (player) {
	if (typeof player !== 'number') {
		console.warn(`[MPO] updatesTracker_getCharacter() received a non-number as an argument: "${player}".`);
		return false;
	}

	//use 'player - 1' since it's an array starting at 0
		//if the character couldn't be found (is undefined) then it will simply return false
	return trackerCore_status.players[player - 1]?.character ?? false;
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
function updatesTracker_changeCharacter(player, charName) {
	//get all character icons of this player
	const characterIcons = document.querySelectorAll(`.tracker_characterDisplay[data-player="${player}"] .tracker_characterIcon`);

	//get icon source for this character
	const src = dbparsing_getIcon(`characters.${charName}`, trackerCore_status['game']);

	for (const item of characterIcons) {
		//replace the image source
		item.src = src;
	}

	//update 'trackerCore_status'
	trackerCore_status['players'][player - 1]['character'] = charName;
}