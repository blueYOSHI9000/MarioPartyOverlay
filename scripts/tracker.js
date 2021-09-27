/**	=== IMPORTANT ===
 *
 * 	This entire documentation is an absolute, utter mess. It will be completely rewritten at some point so do yourself a favour and don't even bother with any of this.
 */









/**	=== THE COUNTER OBJECT ===
 * 	(sorry for the wall of text, you can also just look at the commented out variable below this, it has some comments in it)
 *
 * 	'tracker_counters' is the one variable that saves anything and everything related to counters.
 * 	This includes but isn't limited to tracking the stats, whether a counter is active or not or if it should be highlighted and how.
 *
 * 	First of all, the object is split into several pieces. Those include 'bonusStars', 'spaces', 'misc' and more in the future. 'misc' is everything that doesn't fit into the other categories, rest should be self-explanatory.
 * 	Each of those pieces list several counters. The 'bonusStars' piece for example lists all counters related to bonus stars.
 * 	But a simple system like that could get confusing since there's a bonus star for landing on the most ?-Spaces but then there's also a counter that tracks the space itself??
 * 	Well, let me introduce you to an even more confusing system!
 *
 * 	Each counter can use the 'sameAs' variable to indicate that it's the exact same as another counter (like the "Running Star" (player that walked the furthest) can link to the "Distance walked" counter).
 * 	But that link is one-sided. "Running Star" will link to "Distance walked" but not the other way around and this is important.
 * 	That's because when you activate the "Running Star" on the website then a counter will appear but that counter isn't "Running Star", it's "Distance walked".
 * 	You won't realize this as a user of course because both seem to be the same but it's important in the code-side of things because this way we avoid displaying two identical counters.
 * 	Of course there's also the "Slow Star" (player that walked the least) which also links to "Distance walked".
 * 	This means both "Running Star" and "Slow Star" can be displayed at the same time while only showing up as one counter (which would be "Distance walked").
 * 	You could also enable "Distance walked" manually alongside the other two, though it won't change anything as it's still the same counter.
 *
 *
 * 	Now, that should explains most things aside from the 'relations' object so let's talk about that.
 * 	The 'relations' object is not needed for counters that simply link to another ("Running Star" and "Slow Star" for example don't need it, "Distance walked" however does).
 * 	That's because 'relations' lists how the counter should work and neither "Running Star" nor "Slow Star" are an actual counter as they simply link to "Distance walked".
 *
 * 	But how is it called 'relations' when it's about how the counter works? That's because other counters affect how a counter works.
 * 	"Running Star" for example says that "Distance walked" should highlight the highest score while "Slow Star" says that it should highlight the lowest score (since they're earned by walked the furthest and least respectively).
 * 	That applies to everything inside 'relations', they're all based on what other counters want. That said, a counter can also affect itself on how it should display, those can simply be referenced by using '_this'.
 *
 * The 'highlightHighest' and 'highlightLowest' variables should be rather obvious now. "Distance walked" for example lists "Slow Star" inside 'highlightLowest' since "Slow Star" is about walking the least.
 *
 * 	The 'combinesCounters' is a bit more complicated though. It specifies if a counter is a collection of other counters.
 * 	Let's take "Unlucky Star" as an example which is awarded to the player that walked on the most "Red Spaces", "Bad Luck Spaces" and "Extra Bad Luck Spaces".
 * 	Each of those three spaces already has an own counter inside the 'spaces' piece.
 * 	This means "Unlucky Star" is simply a combination of those three counters and as such it lists those three spaces inside 'combinesCounters'.
 * 	'addToCombination' is on the other end of this. The three spaces would list "Unlucky Star" inside 'addToCombination'.
 *
 * 	Finally we're at 'displaysBecause'. This specifies if the counter should actually be displayed and which counter wants it to be displayed.
 * 	For example if "Running Star" is activated then "Distance walked" will be displayed because "Running Star" isn't an actual counter by itself. As such "Distance walked" would list "Running Star" inside 'displaysBecause'.
 * 	If "Distance walked" is enabled manually however it would simply list '_this'.
 * 	If multiple counters are listed (like "Running Star" and "Slow Star" together) then the counter will be displayed for as long as there's at least one counter listed.
 */

/**	=== THE COUNTER OBJECT (rewritten explanation) ===
 *
 * 	'tracker_counters' is the one object that tracks all stats and generally everything related to trackers.
 * 	It should however be mentioned that the object should never be interacted with directly, there are functions in place that get and change values. (that said, they're not implemented yet)
 *
 * 	TODO: Add documentation here about the various functions that get and set values.
 *
 * 	=== 'tracker_counters' DOCUMENTATION ===
 *
 * 	The 'tracker_counters' object is split into several "categories", namely 'bonusStars', 'spaces', 'misc' and others.
 * 	The categories should be mostly self-explanatory. 'bonusStars' includes all stats related to bonus stars, 'spaces' has all spaces etc.
 * 	'misc' is simply for all categories that don't fit in anywhere else. This category will be re-defined later on though.
 *
 * 	Each category then has one property for each counter that it should have.
 *
 * 	## RELATIONS
 * 		An important part of the counter object explained below is the 'relations' object.
 * 		It exists mainly due to counters like "Running Star" and "Slow Star" which are awarded to the player that walked the furthest and the least respectively.
 * 		They're both the exact same essentially, they both track the distance walked by the player. That's why there's a counter called 'distanceWalked' listed inside the 'misc' category.
 *
 * 		Both "Running Star" and "Slow Star" aren't actually a counter themselves, they simply link towards 'distanceWalked'.
 * 		When you activate the "Running Star" counter, MPO actually activates the 'distanceWalked' counter. Same with "Slow Star".
 *
 * 		And that's where the 'relations' object comes in. The 'relations' object inside 'distanceWalked' is the key part in all of this.
 * 		It saves whether the counter should be displayed or not, if it should be highlighted, etc.
 * 		Other counters can affect those things (that's why it's called 'relations').
 * 		Each 'relations' property lists every counter that wants it to work that way.
 * 		'highlightHighest' for example defines whether the highest score should be highlighted or not.
 * 		As such if you check the 'highlightHighest' variable of 'distanceWalked' you will find 'runningStar' in it because that's awarded to the player with the highest score.
 *
 * 		Another thing to mention is that a counter can reference itself.
 * 		Finally, an empty array inside a 'relations' property means it shouldn't be done.
 *
 * 	## COUNTERS
 * 		Each counter includes the following properties:
 * 			- stats [Array]
 * 				- This tracks the actual stats for each player.
 * 				- stats[0] is player 1, stats[1] is player 2 and so on.
 * 				- This can technically have an infite amount of array items.
 *
 * 			- active [Boolean]
 * 				- Whether the counter is currently activated or not.
 *
 * 			- relations [Object]
 * 				- This lists all relations to this counter.
 * 				- Includes the following properties:
 * 					- highlightHighest [Array]
 * 						- Defines whether the highest score should be highlighted.
 * 					- highlightLowest [Array]
 * 						- Defines whether the lowest score should be highlighted.
 * 					- combinesCounters [Array]
 * 						- Defines whether this is a combination of several other counters.
 * 					- addToCombination [Array]
 * 						- Defines whether this is part of a combination.
 * 					- displaysBecause [Array]
 * 						- Defines whether this counter should be displayed.
 */

/* *
//this variable is simply here as an example
var tracker_counters = {
	//specify all counters that are used right now
	_countersUsed: ['bonusStars.unluckyStar', 'bonusStars.runningStar', 'bonusStars.slowStar'],
	bonusStars: {
		unluckyStar: {
			//stats for each player, there can technically be an unlimited amount of players
			stats: [0, 0, 0, 0],
			//whether the counter is active or not
			active: true,
			//all relations to this counter (note that empty arrays in here are essentially the same as it being false)
			relations: {
				//if the highest score should be highlighted (and which counters want it to be highlighted)
				highlightHighest: [],
				//if the lowest  score should be highlighted (and which counters want it to be highlighted)
				highlightLowest:  [],
				//if this is a combination of several counters
					//for example the 'unluckyStar' is gotten by the player that landed on the most "Red Spaces", "Bad Luck Spaces" and "Extra Bad Luck" spaces
					//as such the 'unluckyStar' is a combination of those three spaces
				combinesCounters: ['spaces.redSpace', 'spaces.badLuckSpace', 'spaces.extraBadLuckSpace'],
				//if this counter is part of a combination (the above three spaces would have to link 'unluckyStar' since they're part of it)
				addToCombination: [],
				//if the counter should be displayed (and which counters want it to be displayed)
				displaysBecause: []
			}
		},
		runningStar: {
			//'runningStar' is literally 1:1 the exact same as 'misc.distanceWalked'
				//this means 'runningStar' can't actually be displayed, the only thing that can happen is that 'misc.distanceWalked' is displayed instead
				//if 'sameAs' is used then 'stats' and 'relation' can be left out as it will simply take them from the linked counter (in this case 'misc.distanceWalked')
			sameAs: 'misc.distanceWalked',
			//whether the counter is active or not
				//despite not being displayed this is still important as it might impact highlighting
			active: true
		},
		slowStar: {
			sameAs: 'misc.distanceWalked',
			active: true
		}
	},
	spaces: {
		redSpace: {
			stats: [0, 0, 0, 0],
			displayed: [],
			relations: {
				highlightHighest: [],
				highlightLowest:  [],
				combinesCounters: [],
				//any stats added on this counter will be added to 'bonusStars.unluckyStar' as well
				addToCombination: ['bonusStars.unluckyStar']
			}
		},
		badLuckSpace: {
			stats: [0, 0, 0, 0],
			displayed: [],
			relations: {
				highlightHighest: [],
				highlightLowest:  [],
				combinesCounters: [],
				addToCombination: ['bonusStars.unluckyStar']
			}
		},
		extraBadLuckSpace: {
			stats: [0, 0, 0, 0],
			displayed: [],
			relations: {
				highlightHighest: [],
				highlightLowest:  [],
				combinesCounters: [],
				addToCombination: ['bonusStars.unluckyStar']
			}
		}
	},
	misc: {
		distanceWalked: {
			stats: [0, 0, 0, 0],
			displayed: true,
			relations: {
				//the highest score will be highlighted if 'runningStar' is active
				highlightHighest: ['bonusStars.runningStar'],
				//the lowest  score will be highlighted if    'slowStar' is active (both can be highlighted at once)
				highlightLowest:  ['bonusStars.slowStar'],
				combinesCounters: [],
				addToCombination: []
			}
		}
	}
};
*/

var tracker_counters = {
	bonusStars: {},
	spaces: {},
	misc: {}
};

/**	This creates a 'Counter' object.
 *
 * 	This should be called like this: "var testo = new Counter();"
 *
 * 	Args:
 * 		sameAs [String] <optional>
 * 			If the counter should be linked to a different counter. If yes, use the full name (like 'bonusStars.runningStar').
 *
 * 	Returns [Counter object]:
 * 		Returns a counter object.
 */
function Counter (sameAs) {
	if (sameAs !== undefined) {
		this.sameAs = sameAs;
		this.active = false;
	} else {
		this.stats = [0, 0, 0, 0];
		this.active = false;
		this.relations = {
			highlightHighest: [],
			highlightLowest : [],
			combinesCounters: [],
			addToCombination: [],
			displaysBecause : []
		};
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
		eval(`var counter = tracker_counters${arr.join('')}`);
		return counter;
	} catch (e) {
		return false;
	}
}