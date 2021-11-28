// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== THE TRACKER OBJECT ===
 *
 * 	The 'tracker_status' variable saves everything related to tracking. It saves the current game, a list of players and every single counter in use.
 * 	The object is updated in real-time. Whenever a character is changed this will be updated. Whenever a counter is increased this will be updated.
 *
 * 	The following is a documentation of the object with every single property in it:
 *
 * 	> tracker_status [Object]
 * 		Saves everything related to tracking like list of players, list of counters, etc.
 *
 * 		> controls [Object]
 * 			Saves the controls of the tracker. Whether it should add or subtract, by how much and all that.
 *
 * 			- action [String]
 * 				What action should be used when clicking on a counter. Can be one of the following:
 * 					- add: Adds the value to the counter.
 * 					- sub: Subtracts the value from the counter (can't go below 0).
 *
 * 			- value [Number]
 * 				By how much the counter should be modified.
 *
 * 		- game [String]
 * 			The current game. Can also be '_all' for "no game in particular".
 *
 * 		- playerAmount [Number]
 * 			The amount of players present (includes COM).
 *
 * 		> players [Array]
 * 			A list of all players. Saves everything related to those players.
 *
 * 			> *array item* [Object]
 * 				Each array item is one player. Player 1 is [0], Player 2 is [1], etc.
 *
 * 				- name [String/null]
 * 					The name of the player. Can be null in case no player name has been entered.
 *
 * 				- character [String]
 * 					The character they're playing as. Has to be the same name that's used in the database.
 *
 * 				- com [Boolean]
 * 					Whether they're a computer or not.
 *
 * 				> stats [Object]
 * 					The stats of this player.
 *
 *						> 'bonusStars'/'spaces'/'misc'/etc [Object]
 * 							A counter category.
 *
 * 							- 'runningStar'/'blueSpace'/'distanceWalked'/etc [Number]
 * 								The stat of this counter. Can be any number. If not present it's assumed the counter is at 0.
 *
 * 		> counters [Object]
 * 			Lists everything related to counters.
 *
 * 			> 'bonusStars'/'spaces'/'misc'/etc [Object]
 * 				Lists all the counters that are part of this category.
 * 				Categories consist of 'bonusStars', 'spaces', 'misc'. More will be added in later.
 * 				The 'misc' category is simply for everything that doesn't fit in any of the other categories while also not being big enough to warrant a new category being made for it.
 *
 * 				> 'runningStar'/'blueSpace'/'distanceWalked'/etc [Counter Object]
 * 					This is a counter. This can be a bonus star, a space or something else.
 *
 * 					- active [Boolean]
 * 						Whether the counter is active or not
 *
 * 					- counterRelation [String]
 * 						Defines how the counter works. Can be one of the following:
 * 							- standAlone: The counter is a stand-alone counter, it's not dependant on any other counter.
 * 							- combination: This counter is a combination of others. The "Unlucky Star" for example is awarded to the person that landed on the most [...]
 * 							- linked: This counter is linked to another counter. This means this counter doesn't track stats on it's own, it simply links to another counter instead.
 *
 * 					> relations [Object]
 * 						The relations to other counters. Depends a lot on what 'counterRelation' is.
 *
 * 						- linkTo [String]
 * 							The counter it should be linked to. Only needed if 'counterRelation' is 'linked'.
 * 						- combinesCounters [Array]
 * 							List of counters this combines. Only needed if 'counterRelation' is 'combination'.
 * 						- addToCombination [Array]
 * 							List of counters this is part of.
 *
 * 					> status [Object]
 * 						Saves the status of the counter like whether it should be displayed or whether it should be highlighted or not.
 * 						Not needed if 'counterRelation' is set to 'linked'.
 *
 * 						- displayed [Array]
 * 							Defines whether this counter should be displayed.
 * 						- highlightHighest [Array]
 * 							Defines whether the highest score should be highlighted.
 * 						- highlightLowest [Array]
 * 							Defines whether the lowest score should be highlighted.
 */

//TODO: Replace this with a more dynamic approach
var tracker_status = {
	controls: {
		action: 'add',
		value: 1
	},
	game: '_all',
	playerAmount: 4,
	players: [
		{
			name: null,
			character: 'mario',
			com: true,
			stats: {
				bonusStars: {},
				spaces: {},
				misc: {}
			}
		},
		{
			name: null,
			character: 'luigi',
			com: false,
			stats: {
				bonusStars: {},
				spaces: {},
				misc: {}
			}
		},
		{
			name: null,
			character: 'yoshi',
			com: true,
			stats: {
				bonusStars: {},
				spaces: {},
				misc: {}
			}
		},
		{
			name: null,
			character: 'peach',
			com: true,
			stats: {
				bonusStars: {},
				spaces: {},
				misc: {}
			}
		}
	],
	counters: {
		bonusStars: {},
		spaces: {},
		misc: {}
	}
};

/**	This creates a 'tracker_Counter' object.
 *
 * 	This should be called like this: "var testo = new tracker_Counter();"
 *
 * 	Args:
 * 		counterRelation [String]
 * 			The 'counterRelation' of the counter. See "The Counter Object" documentation at the top of this file.
 *
 * 		relation [String/Array]
 * 			If 'counterRelation' is 'linked' then this should be counter it's linked to.
 * 			If 'counterRelation' is 'combination' then this should be an array of all counters it combines.
 * 			If 'counterRelation' is something else then this can be ignored.
 *
 * 	Constructs:
 * 		Constructs a 'tracker_Counter' object.
 */
function tracker_Counter (counterRelation, relation) {
	//check to make sure 'counterRelation' is valid
		//>if not, log it and convert the counter to a stand-alone
	switch (counterRelation) {
		case 'standAlone':
		case 'combination':
		case 'linked':
			break;
		default:
			console.error('[MPO] tracker_Counter received an invalid \'counterRelation\' argument. Converting counter to a stand-alone instead.');
			counterRelation = 'standAlone';
			break;
	}

	this.active = false;

	this.counterRelation = counterRelation;

	this.relations = {};
	switch (counterRelation) {
		case 'linked':
			//check if 'relation' is a string
				//> if yes, use it
				//> if no, log it and convert the counter to a stand-alone
			if (typeof relation === 'string') {
				this.relations.linkTo = relation;
			} else {
				console.error('[MPO] tracker_Counter received an invalid \'relation\' argument. Converting counter to a stand-alone instead.');
				this.counterRelation = 'standAlone';
			}
			break;
		case 'combination':
			//if 'relation' is an array then apply it, if 'relation' is undefined then use an empty array - otherwise convert the counter to stand-alone
			if (Array.isArray(relation)) {
				this.relations.combination = relation;
			} else if (relation === undefined) {
				this.relations.combination = [];
			} else {
				console.error('[MPO] tracker_Counter received an invalid \'relation\' argument. Converting counter to a stand-alone instead.');
				this.counterRelation = 'standAlone';
			}
			break;
	}
	this.relations.addToCombination = [];

	//only add the following if counter isn't linked
	if (counterRelation !== 'linked') {
		this.status = {
			displayed: [],
			highlightHighest: [],
			highlightLowest : []
		}
	}
}

/**	Gets the specified counter from 'tracker_counters'.
 *
 * 	Args:
 * 		counterName [String]
 * 			The counter that should be gotten.
 * 			Is in the format of 'bonusStars.runningStar'.
 *
 * 	Returns [Object/Boolean]:
 * 		The object from 'tracker_counters' as a reference.
 * 		If the counter can't be found then it will simply return false.
 */
function tracker_getCounter (counterName) {
	//get and return the counter
	return tracker_getCounterFromNameInObj(counterName, tracker_status['counters']);
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
function tracker_getStat (counterName, player) {
	//get the actual stat
	let stat = tracker_getCounterFromNameInObj(counterName, tracker_status['players'][player - 1]['stats']);

	//if stat doesn't exist yet then set it to 0
	stat ??= 0;

	//use a failsafe in case the stat isn't valid
	if (typeof stat !== 'number' && stat !== false) {
		console.error(`[MPO] tracker_getStat() found a invalid stat for counter "${counterName}" and player "${player}"`);
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
function tracker_setStat (counterName, player, value) {
	//return if the value isn't a number
	if (typeof value !== 'number') {
		return false;
	}

	//set the stat and save the response (Boolean of whether it was successful or not)
	let result = tracker_setCounterFromNameInObj(counterName, tracker_status['players'][player - 1]['stats'], value);

	return result;
}

/**	Gets the correct counter inside an object by it's name.
 *
 * 	Args:
 * 		counterName [String]
 * 			The name of the counter like 'misc.distanceWalked' or 'bonusStars.runningStar'.
 *
 * 		obj [Object]
 * 			The object the counter should be gotten from. Can be a reference or a unique object.
 *
 * 	Returns [*any* / Boolean]:
 * 		Returns the property found, no matter what type it is.
 * 		Returns false if it couldn't be found.
 */
function tracker_getCounterFromNameInObj (counterName, obj) {
	//split the string into array pieces ('misc.distanceWalked' > ['misc', 'distanceWalked'])
	const arr = counterName.split('.');

	//use a try catch in case the variable doesn't exist
	try {
		//get the correct item by looping through the array and going one property further in each time
		for (const item of arr) {
			obj = obj[item];
		}

		return obj;
	} catch (e) {
		console.error(`[MPO] tracker_tracker_getCounterFromNameInObj() couldn\'t get the counter "${counterName}"`);
		return false;
	}
}

/**	Sets the correct counter inside an object to something else.
 *
 * 	Args:
 * 		counterName [String]
 * 			The name of the counter like 'misc.distanceWalked' or 'bonusStars.runningStar'.
 *
 * 		obj [Object]
 * 			The object the counter should be gotten from. Can be a reference or a unique object.
 *
 * 		value [*any*]
 * 			The value it should be set to. Can be anything.
 *
 * 	Returns [Boolean]:
 * 		Returns true if it succesfully set the value.
 * 		Returns false if something went wrong.
 */
function tracker_setCounterFromNameInObj (counterName, obj, value) {
	//split the string into array pieces ('misc.distanceWalked' > ['misc', 'distanceWalked'])
	const arr = counterName.split('.');

	//get the last item in the array
	const lastItem = arr[arr.length - 1];

	//use a try catch in case the variable doesn't exist
	try {
		//get the correct item by looping through the array and going one property further in each time
		for (const item of arr) {
			//if it's the last item in the array then replace the value directly without assigning it to 'obj' first
			if (item === lastItem) {
				obj[item] = value;

				//and then return true
				return true;
			}

			obj = obj[item];
		}

		//return false since it shouldn't get here to begin with
		console.error(`[MPO] tracker_tracker_setCounterFromNameInObj() failed in mysterious ways with the counter "${counterName}"`);
		return false;
	} catch (e) {
		console.error(`[MPO] tracker_tracker_setCounterFromNameInObj() couldn\'t get the counter "${counterName}"`);
		return false;
	}
}

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
 * 			Uses the default action specified in tracker_status['controls'].
 * 			Can be one of the following:
 * 				- add: Adds stats.
 * 				- sub: Removes stats.
 * 				- set: Sets stats to a certain number.
 *
 * 		value [Number] <current value>
 * 			The amount that should be added/subtracted or set to.
 * 			Uses the default value specified in tracker_status['controls'].
 */
function tracker_updateCounter (counterName, player, action=tracker_status['controls']['action'], value=tracker_status['controls']['value']) {
	//get current/old stat
		//if the 'tracker_getStat' is falsy then simply set it to 0 instead (note that 0 is also considered "falsy" but that doesn't matter here since we set it to 0 anyway)
	const oldStat = tracker_getStat(counterName, player) || 0;

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
			console.error(`[MPO] tracker_updateCounter() has gotten an invalid 'action' argument: "${action}"`);
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
		console.error(`[MPO] tracker_updateCounter() got an invalid 'newStat' of value "${newStat}". oldStat: "${oldStat}" | counterName: "${counterName}" | player: "${player}" | action: "${action}" | value: ${value}`);
		newStat = 0;
	}

	//set the new stat
	tracker_setStat(counterName, player, newStat);

	//update the UI
	ui_updateCounter(counterName, player);
}