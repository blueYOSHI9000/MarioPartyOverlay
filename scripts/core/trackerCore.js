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

			- amount [Number]
				By how much the counter should be modified.

		> savefiles [Array]
			This is a list of all savefiles.
			This includes all info that each savefile saves like the current game, players, stats.

			- currentSlot [Number]
				The array index of the currently selected savefile.
				This is a unique property that's added to the array and it won't appear in any 'for' loops. Kinda like the 'length' property.

			> current [*Object*]
				This simply redirects to the currently selected array item. This is not a property on it's own.
				This is the best way to get the current savefile as it's always up-to-date (the current savefile is dynamically calulated the moment this property is used).

				To be more accurate, it's a getter/setter pair (setter does nothing).

			> savefileless [Object]
				This is a unique savefile that only stores settings.

				> settings [Object]
					See below for full explanation.

				> perCounterOptions [Object]
					See below for full explanation.

			> *array item* [Object]
				This is one savefile.

				> _metadata [Object]
					This contains info about the savefile itself.
					Includes the following properties:

					- settingsType [String]
						Whether settings should be included.
						Can be one of the following:
							- 'noSettings': Does not include settings so it will simply use the settings from 'savefileless' instead.
							- 'standalone': Includes settings completely on it's own.
							- 'layered': Includes settings but it will take settings from all previous savefiles for any that are not defined.

				- game [String]
					The current game. Can also be '_all' for "no game in particular".

				> players [Array]
					A list of all players. Saves everything related to those players.

					- playerAmount [Number]
						The amount of players present (includes COM).
						This is a non-enumerable array item.

					> *array item* [Object]
						Each array item is one player. Player 1 is [0], Player 2 is [1], etc.

						- name [String/null]
							The name of the player. Can be null in case no player name has been entered.

						- character [String]
							The character they're playing as. Has to be the same name that's used in the database.

						- com [Boolean]
							Whether they're a computer or not.

						> stats [Object]
							The stats of this player.

							> 'bonusStars'/'spaces'/'misc'/etc [Object]
								A counter category.

								- 'runningStar'/'blueSpace'/'distanceWalked'/etc [Number]
									The stat of this counter. Can be any number. If not present it's assumed the counter is at 0.

				> settings [Object]
					All settings for this savefile. Only needed if 'settingsType' is either 'standalone' or 'layered'.
					If 'settingsType' is 'noSettings' then this should be an object, whether it's empty or includes settings in it does not matter. It can still include left-over settings however if the user for example had this set to 'layered' and then set it back to 'noSettings'.
					Otherwise it simply includes all settings inside it, each setting being a own property with a value assigned to it.

				> perCounterOptions [Object]
					This includes options for each counter individually.

					> 'bonusStars'/'spaces'/'misc'/etc [Object]
						Lists all the counters that are part of this category.
						See below in 'counters' for a full explanation.

						> 'runningStar'/'blueSpace'/'distanceWalked'/etc [Object]
							A counter. This includes options targeted at this specific counter.

							- active [Boolean]
								Whether this counter is activated or not.

							- highlightHighest [Boolean]
								If the highest number should be highlighted.

							- highlightLowest [Boolean]
								If the lowest number should be highlighted.

		> counters [Object]
			Lists everything related to counters.
			The only exception is which counters are activated, that's saved in 'savefiles' instead.

			> 'bonusStars'/'spaces'/'misc'/etc [Object]
				Lists all the counters that are part of this category.
				Categories consist of 'bonusStars', 'spaces', 'misc'. More will be added in later.
				The 'misc' category is simply for everything that doesn't fit in any of the other categories while also not being big enough to warrant a new category being made for it.

				> 'runningStar'/'blueSpace'/'distanceWalked'/etc [Counter Object]
					This is a counter. This can be a bonus star, a space or something else.

					- active [Boolean]
						Whether the counter is active or not

					- counterRelation [String]
						Defines how the counter works. Can be one of the following:
							- standalone: The counter is a stand-alone counter, it's not dependant on any other counter.
							- combination: This counter is a combination of others. The "Unlucky Star" for example is awarded to the person that landed on the most red AND bowser spaces.
							- linked: This counter is linked to another counter. This means this counter doesn't track stats on it's own, it simply links to another counter instead.

					> relations [Object]
						The relations to other counters. Depends a lot on what 'counterRelation' is.

						- linkTo [String]
							The counter it should be linked to. Only needed if 'counterRelation' is 'linked'.
						- combinesCounters [Array]
							List of counters this combines. Only needed if 'counterRelation' is 'combination'.
						- addToCombination [Array]
							List of counters this is part of.

					> status [Object]
						Saves the status of the counter like whether it should be displayed or whether it should be highlighted or not.
						Not needed if 'counterRelation' is set to 'linked'.

						- displayed [Array]
							Defines whether this counter should be displayed.
						- highlightHighest [Array]
							Defines whether the highest score should be highlighted.
						- highlightLowest [Array]
							Defines whether the lowest score should be highlighted.
 */

//TODO: Replace this with a more dynamic approach
	//update: how so?
		//maybe the categories? ('bonusStars', 'spaces', etc.)
	//update 2: I think I already did this?
var trackerCore_status = {
	controls: {
		action: 'add',
		amount: 1
	},
	savefiles: [],
	counters: {
		bonusStars: {},
		spaces: {},
		misc: {}
	}
};

//set the 'currentSlot' property for the 'savefiles' array
	//this has to be done this way if we don't want it to be iterable
Object.defineProperty(trackerCore_status.savefiles, 'currentSlot', {
	value: 0,
	writable: true
});

//create the 'current' property which simply redirects to the current savefile
Object.defineProperty(trackerCore_status.savefiles, 'current', {
	get () {
		return this[this.currentSlot];
	},
	set (value) {
		return;
	}
})

//create the "savefile-less" property
	//just a empty object for now
	//this will be set-up properly in 'boot_loadLocalStorage()'
Object.defineProperty(trackerCore_status.savefiles, 'savefileless', {
	value: {},
	writable: true
});

/**	This sets up a 'Savefile' object which contains everything a single savefile needs.
 *
 * 	Args:
 * 		specifics [Object] <defaults>
 * 			Most of the listed properties in here are explained in the documentation at the top of this file under 'trackerCore_status' > 'savefiles' > '*array item*'.
 * 			Unless mentioned otherwise you can find a exact explanation in there.
 * 			In addition, unless mentioned otherwise it will always fall back to the default whenever a argument is invalid. This won't be reported to the console (with few exceptions).
 * 			Contains the following properties:
 *
 * 				_premade [Object/String] <none>
 * 					You can provide a pre-made 'trackerCore_Savefile' object in this and it will automatically fetch all values inside it.
 * 					This can also be a stringified JSON object, in which case it will automatically be parsed.
 * 					Other values specified WILL take priority over the values found in '_premade' (unless the value is null).
 * 					If this is invalid it will be ignored completely.
 *
 * 				metadata_savefileless [Boolean] <false>
 * 					If true this is a special "savefile-less" savefile that only stores settings.
 *
 * 				metadata_settingsType [String] <'noSettings'>
 * 					See '_metadata' > 'settingsType' in the documentation.
 *
 * 				game [String] <'_all'>
 *
 * 				players [Array] <4 players; P1 is human, rest computers; characters are 'mario', 'luigi', 'yoshi', 'peach' in that order; all players are unnamed>
 *					A list of all players.
 * 					Array consists of objects. See the arguments of 'trackerCore_Player()' to see what each object should contain.
 *
 * 				settings [Object] <nothing>
 *
 * 				perCounterOptions [Object] <none>
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
			console.warn(`[MPO]	trackerCore_Savefile() could not parse the JSON string in '_premade' (following string is cut-off at 100 characters): "${specifics._premade.substring(0, 100)}".`);

			//...and pretend like this never happened
				//this is done so the rest of the function doesn't think there's an actual '_premade' object it should use
			specifics._premade = undefined;
		}
	}

	//apply the pre-made object (if there is one)
		//but only apply them if there isn't already a value for it
	if (typeof specifics._premade === 'object') {
		specifics.metadata_settingsType ??= specifics._premade?.metadata?.settingsType;
		specifics.metadata_savefileless ??= specifics._premade?.metadata?.savefileless;

		specifics.game              ??= specifics._premade?.game;
		specifics.players           ??= specifics._premade?.players;
		specifics.settings          ??= specifics._premade?.settings;
		specifics.perCounterOptions ??= specifics._premade?.perCounterOptions;
	} else {
		//set it to undefined to make sure the rest of the function doesn't rely on a object that doesn't exist
			//more of a fail-safe than anything
		specifics._premade = undefined;
	}



	//=== SET METADATA ===

	//create a empty object to fill-in afterwards
	this._metadata = {};

	//set 'settingsType'
		//use 'standalone' if it's a "savefile-less" savefile
		//otherwise use the one specified in 'specifics' but only if it's valid (if it's one of the strings in the array)
		//otherwise use 'noSettings'
	this._metadata.settingsType = (specifics.metadata_savefileless === true) ? 'standalone'
	                            : (['noSettings', 'standalone', 'layered'].indexOf(specifics.metadata_settingsType) !== -1) ? specifics.metadata_settingsType
	                            : 'noSettings';



	//=== SET GAME & PLAYERS ===

	//don't set the game & players if it's a "savefile-less" savefile
	if (specifics.metadata_savefileless !== true) {

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
	}


	//=== SET SETTINGS ===

	//set 'settings'
		//use the provided object if there is one (and then validate each value inside it -- all invalid values are removed)
		//otherwise simply use a empty object
	this.settings = (specifics.settings !== undefined) ? applySettings_validateAll(specifics.settings) : {};

	if (this._metadata.settingsType === 'standalone') {
		this.settings.fillIn(applySettings_defaultSettings);
	}



	//=== SET PER-COUNTER OPTIONS ===

	//create an empty object to be filled in afterwards
	this.perCounterOptions = {};

	//if the 'perCounterOptions' specific isn't an object then replace it with an empty one
		//this is done because we need to check properties of this object so it's best to make sure that it is actually an object
	if (typeof specifics.perCounterOptions !== 'object') {
		specifics.perCounterOptions = {};
	}

	//the following for loop goes through all counters specified in 'trackerCore_status.counters' and adds them all to the 'perCounterOptions' property
		//two for loops are needed because all counters are categorized into various categories so it has to loop through all categories so it can THEN loop through all counters

	//loop through all available categories
	for (const categoryKey in trackerCore_status.counters) {
		//for quick access
		const categoryItem = trackerCore_status.counters[categoryKey];

		//create the category in 'perCounterOptions'
		this.perCounterOptions[categoryKey] = {};

		//the following loops through all counters
			//it simply loops through all available counters in 'trackerCore_status.counters[categoryKey]'
			//it first checks whether the current category was specified in 'specifics.perCounterOptions'
			//if yes then create a 'trackerCore_CounterOptions()' object while providing the counter specified in 'specifics.perCounterOptions', if not then 'trackerCore_CounterOptions()' is called without providing anything

			//this is split into two identical loops because we can't provide the counters in 'specifics.perCounterOptions' without a if check
			//but doing that for every single counter is redundant and wasteful (since there might be a fuck-ton of counters at some point)
			//so we instead do a single 'if ... else' that checks whether the category was specified and then we simply pass it the counter
			//whether the counter was specified as well or not does not matter as 'trackerCore_CounterOptions()' sorts that out

		//check if the category we're on was specified
		if (typeof specifics.perCounterOptions[categoryKey] === 'object') {

			//loop through all counters...
			for (const counterKey1 in categoryItem) {
				//for quick access
				//const counterItem1 = categoryItem[counterKey1];

				//...and set the counter by calling 'trackerCore_CounterOptions()' while providing the specified counter (whether one was specified or not doesn't matter)
				this.perCounterOptions[categoryKey][counterKey1] = new trackerCore_CounterOptions(specifics.perCounterOptions[categoryKey][counterKey1]);
			}

		//else, if the category wasn't specified
		} else {

			//loop through all counters...
			for (const counterKey2 in categoryItem) {
				//for quick access
				//const counterItem2 = categoryItem[counterKey2];

				//...and set the counter by calling 'trackerCore_CounterOptions()' without providing any arguments (so it'll simply use defaults)
				this.perCounterOptions[categoryKey][counterKey2] = new trackerCore_CounterOptions();
			}
		}
	}
}

/**	This creates a object for saving per-counter options (so one of these is needed for every single counter - for each savefile).
 *
 * 	Args:
 * 		active [Boolean] <true>
 * 			Whether the counter is enabled or not.
 *
 * 		highlightHighest [Boolean] <true>
 * 			Whether the highest stat should be highlighted.
 *
 * 		highlightLowest [Boolean] <false>
 * 			Whether the lowest stat should be highlighted.
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
function trackerCore_CounterOptions (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] trackerCore_CounterOptions() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//set 'active'
		//use the provided value if available, otherwise true
	this.active = (typeof specifics.active === 'boolean') ? specifics.active : true;

	//set 'highlightHighest'
	this.highlightHighest = (typeof specifics.highlightHighest === 'boolean') ? specifics.active : true;

	//set 'highlightLowest'
	this.highlightLowest = (typeof specifics.highlightLowest === 'boolean') ? specifics.active : false;
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
	for (const categoryKey in trackerCore_status.counters) {

		this.stats[categoryKey] = {}

		//check if stats for this category have already been provided
		if (typeof specifics.stats === 'object' && typeof specifics.stats[categoryKey] === 'object') {

			//loop through all stats provided for this category
			for (const statKey in specifics.stats[categoryKey]) {

				//check if this counter actually exists and if a valid stat has been provided (valid being any number)
				if (typeof trackerCore_status.counters[categoryKey][statKey] === 'object' && typeof specifics.stats[categoryKey][statKey] === 'number') {

					//and finally add the stat
					this.stats[categoryKey][statKey] = specifics.stats[categoryKey][statKey];
				}
			}
		}
	}
}

/**	This creates a 'trackerCore_Counter' object.
 *
 * 	This should be called like this: "var testo = new trackerCore_Counter();"
 *
 * 	Args:
 * 		counterRelation [String] <'standalone'>
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
		case 'standalone':
		case 'combination':
		case 'linked':
			break;
		default:
			console.error('[MPO] trackerCore_Counter received an invalid \'counterRelation\' argument. Converting counter to a stand-alone instead.');
			counterRelation = 'standalone';
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
				this.counterRelation = 'standalone';
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
				this.counterRelation = 'standalone';
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
	return trackerCore_status['counters'].fetchProperty(counterName);
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

	//complain and return if not a number
	if (typeof savefileSlot !== 'number') {
		console.warn(`[MPO] trackerCore_getSavefile() received a non-number as 'savefileSlot' (might've been converted from a string): "${savefileSlot}".`);
		return null;
	}

	//complain and return if the slot is invalid
	if (savefileSlot === NaN || savefileSlot === Infinity || savefileSlot === -Infinity || savefileSlot < 0) {
		console.warn(`[MPO] trackerCore_getSavefile() received a invalid number as 'savefileSlot': "${savefileSlot}".`);
		return null;
	}

	//get the savefile
	let savefile = trackerCore_status.savefiles[savefileSlot];

	//complain and return if not an object
	if (typeof savefile !== 'object') {
		console.warn(`[MPO] trackerCore_getSavefile() found a non-object in savefile slot "${savefileSlot}".`);
		return null;
	}

	return savefile;
}

/**	This saves the current stats to localStorage.
 *
 * 	Note: This is temporary, this does not consider a potentital character-limit to a single localStorage entry (if there is one) and it also does not save which counters are displayed.
 */
function trackerCore_saveSavefiles () {
	localStorage.setItem('savefiles', JSON.stringify(trackerCore_status.savefiles));

	//set these properties manually since they're not enumerable
	localStorage.setItem('savefileless', JSON.stringify(trackerCore_status.savefiles.savefileless));
	localStorage.setItem('currentSavefileSlot', trackerCore_status.savefiles.currentSlot);
}