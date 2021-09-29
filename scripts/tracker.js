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
 * 		- game [String]
 * 			The current game. Can also be '_all' for "no game in particular".
 *
 * 		> playersInfo [Object]
 * 			This lists everything related to the players.
 *
 * 			- amount [Number]
 * 				The amount of players present.
 *
 * 			> playerList [Array]
 * 				A list of all players.
 *
 * 				> *array item* [Object]
 * 					Each array item is one player.
 *
 * 					- name [String/null]
 * 						The name of the player. Can be null in case no player name has been entered.
 *
 * 					- character [String]
 * 						The character they're playing as. Has to be the same name that's used in the database.
 *
 * 					- com [Boolean]
 * 						Whether they're a computer or not.
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
 * 					> stats [Array]
 * 						Tracks the stats.
 *
 * 						- *array item* [Number]
 * 							Each array item is a simple number that's the amount for each player (array item 0 is player 1, array item 1 is player 2, etc).
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
	game: '_all',
	playerInfo: {
		amount: 4,
		playerList: [
			{
				name: null,
				character: 'mario',
				com: true
			},
			{
				name: null,
				character: 'luigi',
				com: false
			},
			{
				name: null,
				character: 'yoshi',
				com: true
			},
			{
				name: null,
				character: 'peach',
				com: true
			}
		]
	},
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
		this.stats = [0, 0, 0, 0];

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
 * 		string [String]
 * 			The counter that should be gotten.
 * 			Is in the format of 'bonusStars.runningStar'.
 *
 * 	Returns [Object/Boolean]:
 * 		The object from 'tracker_counters' as a reference.
 * 		If the counter can't be found then it will simply return false.
 */
function tracker_getCounter (string) {
	const arr = string.split('.');

	for (const arrIndex in arr) {
		arr[arrIndex] = `['${arr[arrIndex]}']`;
	}

	try {
		eval(`var counter = tracker_status.counters${arr.join('')}`);
		return counter;
	} catch (e) {
		console.error(`[MPO] tracker_getCounter() couldn\'t get the counter "${string}"`);
		return false;
	}
}