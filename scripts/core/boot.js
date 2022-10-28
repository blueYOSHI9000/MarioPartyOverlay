// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== JS CODE FORMATTING ===
 *
 * 	# FUNCTION COMMENTS
 *
 * 	Each function needs a short explanation of what it does and (if it's not enough) a full explanation that also explains HOW it does it.
 * 	This is important as it helps reduce errors when you always know exactly how the function does the thing.
 *
 * 	As for how it's formatted, it's inspired by Google's Python Docstring (https://github.com/google/styleguide/blob/gh-pages/pyguide.md#38-comments-and-docstrings).
 * 	That said, it's probably easier to simply scroll down and see how I did it. Especially considering it doesn't quite follow the guidelines exactly.
 * 	The important thing is probably the indentation. It starts with ' * ' followed by a tab (the space after the * can be skipped if you want to, it's mainly there because some code-editors automatically add one).
 *
 * 	Why this one is picked over the default '@param' style JS documentation is really just personal preference on my part.
 * 	But if you want the reason behind it, in my opinion it's easier to find exactly what you're looking for:
 * 		The argument name comes first (likely what you're looking for), followed immediately by the type. Chances are this is all you need, that's why they got their own line.
 * 		The lines after the name & argument give a detailed description if you need to know more, not limited to a single line! Instead it gets all the space it needs, each new line gets a new info.
 *
 *
 * 	# VARIABLE & FUNCTION CREATION/NAMING
 *
 * 	Each global function and global variable has to start with a prefix like 'boot_' or 'trackerCore_' (always based on the file name).
 * 	This is made so it's easy to spot to which part/file a function/variable belongs to and so variable names inside functions can be easily repeated without having to worry about it already existing elsewhere (though repeating names should be avoided anyway).
 * 	The prefixes are especially important for global variables so you immediately know when it's a global or local variable without having to double-check it.
 * 	The only exception to this rule is 'helpers.js' functions; functions that add little functionalities to help out that could just as well be standard JS functions.
 *
 * 	Variables should use 'let'/'const' wherever possible. As to which one should be used depends on whether the variable should be changed or not.
 * 	Note that this includes self-changing objects that can technically be changed even when using 'const'.
 * 	This is so you can check whether 'let' or 'const' is used and immediately know whether the variable should be changed or not.
 *
 * 		## PROTOTYPE FUNCTIONS
 *
 * 		Any function defined on a prototype (like 'Object.prototype') has to be defined with 'Object.defineProperty()' or any other way to make sure that the function is NOT enumerable.
 * 		That's because the prototype functions should not show up in 'for ... in' loops.
 *
 * 		## THE 'specifics' ARGUMENT
 *
 * 		Whenever a function takes a single object as an argument instead of scattering them over many arguments then that object has to be named 'specifics'.
 * 		'options' while being overall better should be avoided because it's reserved for stuff like "a list of options", like a <select> element with a list of options in it.
 *
 *
 * 	# INTERFACE
 *
 * 	The interface (anything HTML/CSS) should only be directly modified within the 'interface/' files.
 * 	This is to differentiate the actual core and the interface so the interface can easily be rewritten/updated without touching the core files much or at all.
 *
 */


/** === HOW THE BOOT PROCESS WORKS ===
 *
 *	The goal of the boot process is to reduce the initial load as much as possible (this is also why 'index.html' only includes the bare minimum).
 *	'index.html' is loaded first, inside it is a bit of JS that adds a new <script> with a 'onload' attribute.
 *	The <script> element loads 'helpers.js', once it finished loading it executes the 'onload' attribute which loads 'boot.js' through the 'loadScripts()' function (that's why 'helpers.js' is loaded first, because that function is needed).
 *	Once 'boot.js' finished loading it executes the 'onload' attribute of it's <script> element which calls 'boot_scriptLoaded()' which then finally calls 'boot_basicStartup()'.
 *	 'boot_basicStartup()' then loads all other JS and CSS files. Each JS file is loaded with a <script> element that has a 'onload' attribute that pushes the file name to 'boot_scriptsLoaded'.
 *	Once all script files are loaded it executes 'boot_finishStartup()'.
 *
 *
 *	Basically, this is how it looks:
 *		> index.html <script> element
 *			- load helpers.js
 *			> 'onload' attribute
 *				- load boot.js via loadScripts()
 * 				> 'onload' attribute > boot_scriptLoaded()
 *					> boot_basicStartup()
 *						- check if cookies are enabled
 *						- load database
 *						- load all other scripts
 *						- load all css files
 *						> 'onload' attributes of all new <script> elements > boot_scriptLoaded()
 *							- count the amount of script files loaded
 *							> once all are loaded (tracked inside 'boot_scriptsLoaded') > boot_finishStartup()
 * 								- setup the 'trackerCore_status' object
 *								- load localStorage (and update it so it works in case it was from an older version)
 *								> build the actual site (HTML only)
 *									- build navbar
 *									- build settings
 *									- build the tracker
 * 								- apply all settings
 * 								- update all trackers (visually, so the number actually represents what's saved)
 */

//all scripts that have to be loaded
const boot_scriptsToLoad = [
	//the actual database
		'database/mp-db.js',

	//interface files (anything that's related to the HTML side of things)

		//self-contained "libraries" of sort
			//(these files should only rely on 'helpers.js' and nothing else, they do nothing that's specific to MPO either so anyone can use it in their own project)
			'scripts/interface/inputfield.js', //this handles user-input, like creating a checkbox or a button
			'scripts/interface/interaction.js', //this handles dragging/resizing stuff (mainly modals)
			'scripts/interface/modal.js', //this creates modals, kinda like opening a new window but all done within the site itself with HTML

		//common/helper file
			//this is a common/helpers file of sorts that does things that are always needed in the other interface files
			//this includes stuff like creating a list of characters to choose from, that's a task that's needed all over the place and as such it's done in this file
			'scripts/interface/commonInterface.js',

		//builds the site
			//this builds the actual site (since 'index.html' is empty it's done in here instead)
			'scripts/interface/buildSite.js',

		//handling the interface
			//these handle the actual interface itself after it got built
			//(like, if a user presses a button to collapse a paragraph of text then that's handled in here since it has nothing to do with the actual tracker itself)
			'scripts/interface/handleNavbar.js', //handles anything related to the navbar interface
			'scripts/interface/handleSettings.js', //handles anything related to the settings interface
			'scripts/interface/trackerInterface.js', //handles anything related to the tracker interface

			'scripts/interface/listeners.js', //the odd one in here, any JS Event-listeners are made in here, this includes handling each pointer-click, keyboard press, etc

	//core files (the ones that make the actual site work)

		//database-parsing
			//this parses the database file (the actual database is located at 'database/mp-db.js')
			//it should be mentioned that this file is NOT self-contained!
			//this file is part of the actual codebase and can (and should) access various parts, like the current theme or current players, etc
			'scripts/core/dbparsing.js',

		//helper file
			//this is a completely self-contained file that does various basic tasks like creating a HTML element
			//this HAS to be 100% self-contained, it is not allowed to call a function from a different file (this is done so it can be copied to other projects)
			//'scripts/core/helpers.js', //already loaded

		//the boot process
			//this boots the actual site up, including calling the "build site" function for the interface
			//'scripts/core/boot.js', //already loaded

		//settings
			//this applies various settings to the tracker
			'scripts/core/applySettings.js',

		//the tracker itself
			'scripts/core/trackerCore.js',   //the tracker itself at its core, more low-level - 'updatesTracker.js' will likely be needed more than this
			'scripts/core/updatesTracker.js' //this contains all functions that update the tracker - like updating a stat, changing a character, etc
];

//all stylesheets that have to be loaded
	//remember to update it in prebuilt.html as well
const boot_stylesToLoad = [
	'styles/style.css',

	'styles/modal.css',

	'styles/navbar.css',
	'styles/settings.css',
	'styles/tracker.css',
	'styles/inputfield.css',
	'styles/interaction.css'
];



//counts all currently loaded script files
var boot_scriptsLoaded = ['helpers.js'];

//tracks the total amount of script files that have to be loaded
	//'boot_scriptsToLoad' + 2 for 'helpers.js' and 'boot.js'
var boot_totalScriptFiles = boot_scriptsToLoad.length + 2;

/** Keeps track of how many script files have been loaded so far.
 *
 *	Check comment at the beginning of this file for a full explanation.
 *
 * 	Args:
 * 		script [String]
 * 			The name of the script that's been loaded (with file extension, like 'boot.js' for this file).
 */
function boot_scriptLoaded (script) {
	boot_scriptsLoaded.push(script);

	//execute code once a certain file has been loaded
	switch (script) {
		case 'boot.js':
			boot_basicStartup();
			break;
	}

	//finish startup as soon as soon as all files are loaded
		//call it with a 0ms timeout to make sure it gets executed after everything else
	if (boot_scriptsLoaded.length === boot_totalScriptFiles) {
		setTimeout(boot_finishStartup, 0);
	}
}

/** Starts up the boot process.
 *
 * 	NOTE: This gets loaded when nothing besides 'helpers.js' and 'boot.js' are loaded!
 */
function boot_basicStartup () {
	//TODO: Check whether cookies are enabled

	//Load Scripts
		//use 'boot_scriptLoaded()' as a argument so it gets called whenever a file is being loaded
	let scriptElems = loadScripts(boot_scriptsToLoad, boot_scriptLoaded);

	//Load styles
	let styleElems = loadStyles(boot_stylesToLoad);
}

/**	Finishes the startup process.
 *
 * 	This is done once all script files have finished loading.
 *
 * 	This builds the site up completely and does basically everything that 'boot_basicStartup()' didn't do.
 */
function boot_finishStartup () {
	//place every single call in a setTimeout (TODO)

	//setup the 'trackerCore_status' object
	setTimeout(boot_setupCounterObject, 0);

	//load localStorage
	setTimeout(boot_loadLocalStorage, 0);

	//build the actual site
	setTimeout(buildSite_build, 0);

	//apply settings
	setTimeout(() => {applySettings_applyAll(true);}, 0);

	//update all counters
	setTimeout(trackerInterface_updateVisuals, 0);
}

/**	This loads the data saved in localStorage.
 *
 * 	This will only load the data and set the variables (like 'applySettings_settings' or 'trackerCore_status').
 * 	This does NOT properly apply them!
 * 	Mainly because this function is supposed to be called before the site is actually built.
 */
function boot_loadLocalStorage () {
	//get localStorage
	let ls = localStorage;

	//if the saved data is from the original MPO then clear it
		//TODO: Once the rewrite is far enough it has to take the original data and update it!

		//IMPORTANT: This stuff HAS to be done before everything else because stuff like stats will only take stats that are currently used, anything that's not used anymore is immediately thrown away
		//so if we want to reuse those stats and move them to a different counter then we have to do that right here before it's thrown away
	if (ls.lsVer <= 10) {
		console.warn('[MPO] Outdated localStorage. Will be cleared.');

		//clear localStorage and update the variable in here
		localStorage.clear();
		ls = localStorage;
	}

	//load savefiles if present
		//this does not need default behaviour as the defaults are already there
	if (ls.savefiles !== undefined) {
		//parse the data
		const parsedSavefiles = JSON.parse(ls.savefiles);

		//check if the data is an array and does contain at least 1 array item
		if (Array.isArray(parsedSavefiles) === true && parsedSavefiles?.length > 0) {

			//loop through all savefiles
			for (const item of parsedSavefiles) {

				//and add the savefile by letting 'trackerCore_Savefile()' handle the verifying
				trackerCore_status.savefiles.push(new trackerCore_Savefile({_premade: item, metadata_savefileless: false}));
			}
		} else {
			//complain and use default
			console.warn(`[MPO] Stored savefile in localStorage is either not an array or doesn't include any array items in it. Weird, isn't it? Array: "${parsedSavefiles}".`);
			trackerCore_status.savefiles.push(new trackerCore_Savefile());
		}

	//else create a default savefile
	} else {
		trackerCore_status.savefiles.push(new trackerCore_Savefile());
	}

	//if a "savefile-less" savefile is stored then use it
		//'trackerCore_Savefile()' handles all the verifying
	if (ls.savefileless !== undefined) {
		trackerCore_status.savefiles.savefileless = new trackerCore_Savefile({_premade: ls.savefileless, metadata_savefileless: true, metadata_settingsType: 'standalone'});

	//else create a default savefile
	} else {
		trackerCore_status.savefiles.savefileless = new trackerCore_Savefile({                           metadata_savefileless: true, metadata_settingsType: 'standalone'});
	}

	//check if the currently selected savefile is stored
		//note that we don't need a 'else' for this because the default (0) is already set
		//so if the stores value isn't valid we simply don't use the value and keep the default value
	if (ls.currentSavefileSlot !== undefined) {

		//convert it to a number
		let currentSavefileSlot = Number(ls.currentSavefileSlot);

		//select the savefile
			//we don't need to verify if it's correct since this function already does that
		updatesTracker_loadSavefile(currentSavefileSlot);
	}
}

/**	Sets up the 'trackerCore_status' object completely.
 *
 * 	See 'tracker.js' for full documentation on what the variable does.
*/
function boot_setupCounterObject () {
	//create the 'misc' counters
	const miscCounters = [
		'highestCoinCount',
		'totalCoinCount',
		'minigameWins',
		'minigameCoins',
		'distanceWalked',
		'coinsSpentInShop',
		'miniZtarsCollected',
		'balloonsCollected',
		'starBalloonsCollected',
		'allyAmount',
		'allyTimeSpent',
		'stompedOthers',
		'getStompedOn'
	];
	miscCounters.forEach(item => trackerCore_status['counters']['misc'][item] = new trackerCore_Counter('standalone'));


	//get all bonus stars
	const bonusStars = dbparsing_getBonusStarList('_all');

	//list of counters made
		//this is used to identify when "duplicate" counters are made so they can be linked
	let countersMade = [];

	//the names of the counters in 'countersMade'
	let countersMadeNames = [];

	//create the 'bonusStars' counters
	for (const key in bonusStars) {
		//skip if counter can't be tracked
		if (bonusStars[key]['cantBeTracked'] === true)
			continue;

		//get the current counter name
		let currentCounterName = 'bonusStars.' + key;

		//get details
		const details = bonusStars[key]['details'];

		//whether the counter should be inverted or not
		if (bonusStars[key]['invert'] === true) {
			var invert = true;
		} else {
			var invert = false;
		}

		//current bonus star type
		const bonusStarType = bonusStars[key]['bonusStarType'];

		//=== get which counters it should be combined/linked with ===

		//which counters it combines
		let combines = [];

		//this gets the counters it should be combined with based on which 'bonusStarType' it is
		switch (bonusStarType) {
			case 'space':
				//check if 'spacesAllowed' is set to all (which is the default value so it can either be undefined or null)
				if (typeof details['spacesAllowed'] === 'undefined' || typeof details['spacesAllowed'] === 'null') {
					//TODO: add all spaces to 'combines'
				} else {
					details['spacesAllowed'].forEach(item => combines.push('spaces.' + item));
				}
				break;

			case 'coin':
				//check which 'coinStarType' it is so the correct counter can be linked
				switch (details['coinStarType']) {
					case 'highest':
						combines.push('misc.highestCoinCount');
						break;
					case 'total':
						combines.push('misc.totalCoinCount');
						break;
				}
				break;

			case 'minigame':
				//check which 'minigameStarType' it is so the correct counter can be linked
				switch (details['minigameStarType']) {
					case 'win':
						combines.push('misc.minigameWins');
						break;
					case 'coin':
						combines.push('misc.minigameCoins');
						break;
				}
				//TODO: add support for 'details.whatCounts' (can be either 'onlyRegularMinigames', 'allMinigames', 'duelOnly')
				break;

			case 'distance':
				combines.push('misc.distanceWalked');
				break;

			case 'shop':
				combines.push('misc.coinsSpentInShop');
				break;

			case 'item':
				//check if 'itemsAllowed' is set to all (which is the default value so it can either be undefined or null)
				if (typeof details['itemsAllowed'] === 'undefined' || typeof details['itemsAllowed'] === 'null') {
					//TODO: add all items to 'combines'
				} else {
					details['itemsAllowed'].forEach(item => combines.push('item.' + item));
				}
				break;

			case 'collect':
				//check what should be collected so the correct counter can be linked
				switch (details['collectWhat']) {
					case 'miniZtar':
						combines.push('misc.miniZtarsCollected');
						break;
					case 'balloon':
						combines.push('misc.balloonsCollected');
						break;
					case 'starBalloon':
						combines.push('misc.starBalloonsCollected');
						break;
				}
				break;

			case 'ally':
				//check which 'allyStarType' it is so the correct counter can be linked
				switch (details['allyStarType']) {
					case 'most':
						combines.push('misc.allyAmount');
						break;
					case 'time':
						combines.push('misc.allyTimeSpent');
						break;
				}
				break;

			case 'stomp':
				//check which 'stompStarType' it is so the correct counter can be linked
				switch (details['stompStarType']) {
					case 'stompOthers':
						combines.push('misc.stompedOthers');
						break;
					case 'getStompedOn':
						combines.push('misc.getStompedOn');
						break;
				}
				break;
		}

		//=== check if this exact counter has already been made ===
			//if yes, then link it

		//the current counter thats being made
		const currentCounterMade = `${bonusStarType}-${combines.join('&')}`;

		//check if the counter has already been made
		const countersMadeIndex = countersMade.indexOf(currentCounterMade);
		if (countersMadeIndex !== -1) {

			//get the name of the duplicate counter so the current one can be linked to that one
			const duplicateCounter = `bonusStars.${countersMadeNames[countersMadeIndex]}`;
			combines = [duplicateCounter];
		}

		//=== check whether the counter should be a 'standalone', 'linked' or 'combined' and also do that ===

		//create a stand-alone counter if it shouldn't be combined with any
		if (combines.length <= 0) {
			trackerCore_status['counters']['bonusStars'][key] = new trackerCore_Counter('standalone');

			//push this to the list of counters made
			countersMade.push(currentCounterMade);
			countersMadeNames.push(key);

		//if the bonus star only tracks a single thing then simply link it to said counter by using 'linkTo'
		} else if (combines.length === 1) {
			//get the counter it's gonna be linked to
			const linkedCounter = trackerCore_getCounter(combines[0]);

			//check if the counter it links to even exists -- if not then don't link
			if (linkedCounter !== undefined) {
				//create the counter
				trackerCore_status['counters']['bonusStars'][key] = new trackerCore_Counter('linked', combines[0]);

				//add the bonus star to either 'highlightHighest' or 'highlightLowest'
				if (invert === true) {
					linkedCounter['status']['highlightLowest'] .push(currentCounterName);
				} else {
					linkedCounter['status']['highlightHighest'].push(currentCounterName);
				}
			} else {
				//if the linked counter can't be found then simply create a new, unique counter
				trackerCore_status['counters']['bonusStars'][key] = new trackerCore_Counter('standalone');
			}

		//list every counter that 'currentCounterName' combines
		} else if (combines.length > 1) {
			//create the counter
			trackerCore_status['counters']['bonusStars'][key] = new trackerCore_Counter('combination');

			//get the counter
			const currentCounter = trackerCore_getCounter(currentCounterName);

			for (const key in combines) {
				//get counter that should be combined
				const combinedCounter = trackerCore_getCounter(combines[key]);

				//skip if the combined counter doesn't exist
				if (combinedCounter === undefined) {
					continue;
				}

				//add the combined counter to the current
				currentCounter['relations']['combinesCounters'].push(combines[key]);

				//add current counter to the combined one
				combinedCounter['relations']['addToCombination'].push('bonusStars.' + key);
			}

			//push this to the list of counters made
			countersMade.push(currentCounterMade);
			countersMadeNames.push(key);
		}
	}
}