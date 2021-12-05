// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== NOTICE ===
 *
 * 	This file is only for the core of the tracker itself.
 * 	If you simply need to update a counter or change a character then view 'updatesTracker.js'.
 * 	That file has all the functions needed to work with the tracker.
 */

/**	=== THE TRACKER OBJECT ===
 *
 * 	The 'trackerCore_status' variable saves everything related to tracking. It saves the current game, a list of players and every single counter in use.
 * 	The object is updated in real-time. Whenever a character is changed this will be updated. Whenever a counter is increased this will be updated.
 *
 * 	The following is a documentation of the object with every single property in it:
 *
 * 	> trackerCore_status [Object]
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
 * 			- amount [Number]
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
	//update: how so?
		//maybe the categories? ('bonusStars', 'spaces', etc.)
var trackerCore_status = {
	controls: {
		action: 'add',
		amount: 1
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

/**	This creates a 'trackerCore_Counter' object.
 *
 * 	This should be called like this: "var testo = new trackerCore_Counter();"
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
 * 		Constructs a 'trackerCore_Counter' object.
 */
function trackerCore_Counter (counterRelation, relation) {
	//check to make sure 'counterRelation' is valid
		//>if not, log it and convert the counter to a stand-alone
	switch (counterRelation) {
		case 'standAlone':
		case 'combination':
		case 'linked':
			break;
		default:
			console.error('[MPO] trackerCore_Counter received an invalid \'counterRelation\' argument. Converting counter to a stand-alone instead.');
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
				console.error('[MPO] trackerCore_Counter received an invalid \'relation\' argument. Converting counter to a stand-alone instead.');
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
				console.error('[MPO] trackerCore_Counter received an invalid \'relation\' argument. Converting counter to a stand-alone instead.');
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

/**	Gets the specified counter from 'trackerCore_status'.
 *
 * 	Args:
 * 		counterName [String]
 * 			The counter that should be gotten.
 * 			Is in the format of 'bonusStars.runningStar'.
 *
 * 	Returns [Object/Boolean]:
 * 		The object from 'trackerCore_status' as a reference.
 * 		If the counter can't be found then it will simply return false.
 */
function trackerCore_getCounter (counterName) {
	//get and return the counter
	return trackerCore_getCounterFromNameInObj(counterName, trackerCore_status['counters']);
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
function trackerCore_getCounterFromNameInObj (counterName, obj) {
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
		console.error(`[MPO] trackerCore_getCounterFromNameInObj() couldn\'t get the counter "${counterName}"`);
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
function trackerCore_setCounterFromNameInObj (counterName, obj, value) {
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
		console.error(`[MPO] trackerCore_setCounterFromNameInObj() failed in mysterious ways with the counter "${counterName}"`);
		return false;
	} catch (e) {
		console.error(`[MPO] trackerCore_setCounterFromNameInObj() couldn\'t get the counter "${counterName}"`);
		return false;
	}
}