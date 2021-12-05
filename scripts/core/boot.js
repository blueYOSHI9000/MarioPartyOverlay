// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== JS CODE FORMATTING ===
 *
 * 	# FUNCTION COMMENTS
 *
 * 	Each function needs a short explanation of what it does and (if it's not enough) a full explanation that also explains HOW it does it.
 * 	This is important as it helps reduce errors when you always know how exactly the function does the thing.
 *
 * 	As for how it's formatted, it's inspired by Google's Python Docstring (https://github.com/google/styleguide/blob/gh-pages/pyguide.md#38-comments-and-docstrings).
 * 	That said, it's probably easier to simply scroll down and see how I did it. Especially considering it doesn't quite follow the guidelines exactly.
 * 	The important thing is probably the indentation. It starts with " * " followed by a tab (the space after the * can be skipped if you want to, it's mainly there because some code-editors automatically add one).
 *
 * 	Why this one is picked over the default '@param' style JS documentation is really just personal preference on my part.
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
 * 		## THE 'specififcs' ARGUMENT
 *
 * 		Whenever a function takes a single object as a rgument instead of scattering them over many arguments then that object has to be named 'specifics'.
 * 		"Why not 'options'?" Good question, 'options' would be better but that name is reserved for stuff like "a list of options", like a <select> element with a list of options in it.
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
 *	Once 'boot.js' finished loading it executes the 'onload' attribute of it's <script> element which calls 'boot_scriptLoaded()' which then finally calls 'boot_startup()'.
 *	 'boot_startup()' then loads all other JS and CSS files. Each JS file is loaded with a <script> element that has a 'onLoad' attribute that pushes the file-name to 'boot_scriptsLoaded'.
 *	Once all script files are loaded it executes 'boot_setupCounterObject()' and 'buildSite_build()'.
 *
 *
 *	Basically, this is how it looks:
 *		> index.html <script> element
 *			- load helpers.js
 *			> 'onLoad' attribute
 *				- load boot.js via loadScripts()
 * 				> 'onLoad' attribute > boot_scriptLoaded()
 *					> boot_startup()
 *						- check if cookies are enabled
 *						- load localStorage
 *						- update localStorage
 *						- load database
 *						- load all other scripts
 *						- load all css files
 *						> 'onLoad' attributes of all new <script> elements > boot_scriptLoaded()
 *							- count the amount of script files loaded
 *							> once all are loaded (tracked inside 'boot_scriptsLoaded')
 * 								- boot_setupCounterObject()
 *								> buildSite_build()
 *									> buildSite_buildNavbar()
 *										- build html trackers
 *										- load related images
 *									> buildSite_buildSettings()
 *										- build html settings
 *										- load related images
 *									> buildSite_buildTrackers()
 *										- build html trackers
 *										- load related images
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
	'styles/inputfield.css'
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
			boot_startup();
			break;
	}

	//execute code once all script files have been loaded
	if (boot_scriptsLoaded.length === boot_totalScriptFiles) {

		//setup the 'trackerCore_status' object
		boot_setupCounterObject();

		//build the actual site
		buildSite_build();
	}
}

/** Starts the site up.
 *
 * 	NOTE: This gets loaded when nothing besides 'helpers.js' and 'boot.js' are loaded!
 *
 *	Checks for cookies, loads localStorage, loads css files, loads js files (incl. database).
 *	See the list above to see what this function does.
 */
function boot_startup () {
	//TODO: Add cookie check (likely using Modernizr: https://github.com/Modernizr/Modernizr)

	//Load localStorage
	const ls = localStorage;

	//save settings to variable if present
		//else it simply leaves the variable as is
	if (typeof ls.settings !== 'undefined') {
		settings_settings = JSON.parse(ls.settings);
	}

	//TODO: Update localStorage

	//Load Scripts
		//use 'boot_scriptLoaded()' as a argument so it gets called whenever a file is being loaded
	let scriptElems = loadScripts(boot_scriptsToLoad, boot_scriptLoaded);

	//Load styles
	let styleElems = loadStyles(boot_stylesToLoad);
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
	miscCounters.forEach(item => trackerCore_status['counters']['misc'][item] = new trackerCore_Counter('standAlone'));


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

		//=== check whether the counter should be a 'standAlone', 'linked' or 'combined' and also do that ===

		//create a stand-alone counter if it shouldn't be combined with any
		if (combines.length <= 0) {
			trackerCore_status['counters']['bonusStars'][key] = new trackerCore_Counter('standAlone');

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
				trackerCore_status['counters']['bonusStars'][key] = new trackerCore_Counter('standAlone');
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