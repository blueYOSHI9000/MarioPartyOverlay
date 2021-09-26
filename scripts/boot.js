/**	=== JS CODE FORMATTING ===
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
 * 	Lastly, each function and global variable has to start with a prefix like 'boot_' or 'tracker_'.
 * 	This is made so it's easy to spot to which part a function/variable belongs to and so names can be easily repeated without having to worry about it already existing elsewhere (though repeating names should be avoided anyway).
 * 	The prefixes are especially important for global variables so you immediately know when it's a global or local variable without having to double-check it.
 * 	The only exception to this rule is helpers functions. Functions that add little functionalities to help out that could just as well be standard JS functions.
 *
 *
 *  === HOW THE BOOT PROCESS WORKS ===
 *
 *	The goal of the boot process is to reduce the initial load as much as possible (this is also why 'index.html' only includes the bare minimum).
 *	'index.html' is loaded first, inside it is a bit of JS that adds a new <script> with a 'onLoad' attribute.
 *	The <script> element loads 'helpers.js', once it finished loading it executes the 'onLoad' attribute which loads 'boot.js' through the 'loadScripts()' function (that's why 'helpers.js' is loaded first, because that function is needed).
 *	Once 'boot.js' finished loading it executes the 'window.onload' function (which is right below this comment block) which executes 'boot_scriptLoaded()' which then finally executes 'boot_startup()'.
 *	 'boot_startup()' then loads all other JS and CSS files. Each JS file is loaded with a <script> element that has a 'onLoad' attribute that increases 'boot_currentScriptFiles'.
 *	Once all script files are loaded it executes 'boot_buildSite()'.
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
 *						- load additional scripts
 *						- load all css files
 *						> 'onLoad' attributes of all new <script> elements > boot_scriptLoaded()
 *							- count the amount of script files loaded
 *							> once all are loaded (tracked inside boot_scriptLoaded() )
 *								> boot_buildSite()
 *									> boot_buildNavbar()
 *										- build html trackers
 *										- load related images
 *									> boot_buildSettings()
 *										- build html settings
 *										- load related images
 *									> boot_buildTrackers()
 *										- build html trackers
 *										- load related images
 *									> boot_applySettings()
 *										- apply localStorage/settings
 */

//all scripts that have to be loaded
const boot_scriptsToLoad = [
	'database/mp-db.js',
	'scripts/helpers.js',
	'scripts/tracker.js',
	'scripts/settings.js',
	'scripts/modal.js',
	'scripts/listeners.js',
	'scripts/interactie.js'
];

//all stylesheets that have to be loaded
	//remember to update it in prebuilt.html as well
const boot_stylesToLoad = [
	'styles/navbar.css',
	'styles/settings.css',
	'styles/style.css',
	'styles/tracker.css',
	'styles/modal.css'
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
		boot_buildSite();
	}
}

/** Starts the site up.
 *
 *	Checks for cookies, loads localStorage, loads css files, loads js files (incl. database).
 *	See the list above to see what this function does.
 */
function boot_startup () {
	//TODO: Add cookie check (likely using Modernizr: https://github.com/Modernizr/Modernizr)

	//Load localStorage
	const ls = localStorage;

		//save settings to variable if present
	if (typeof ls.settings !== 'undefined') {
		settings_settings = JSON.parse(ls.settings);
	}

	//TODO: Update localStorage

	//Load Scripts
	let scriptElems = loadScripts(boot_scriptsToLoad);

	//Load styles
	let styleElems = loadStyles(boot_stylesToLoad);
}

/** Builds the actual site itself.
 *
 * 	For easy editing the final site can always be viewed inside 'prebuilt.html' for easy editing (be sure to update that file AND the functions in here for any changes).
 */
function boot_buildSite () {
	boot_setupCounterObject();

	boot_buildModalCatchAll();
	boot_buildNavbar();
	boot_buildSettings();
	boot_buildTracker();

	//boot_applySettings();

	//add all eventListeners
		//has to be at the end so if an event listener relies on a feature built by another function in here then it works perfectly without breaking the site
	listeners_addListeners();
}

/**	Sets up the 'tracker_counters' object completely.
 *
 * 	See 'tracker.js' for full documentation on what the variable does.
*/
function boot_setupCounterObject () {
	//the default counter object that's used on all actual counters
		//use JSON.parse(defaultCounterObject) to get it, has to be done this way so it doesn't get referenced
	const defaultCounterObject = JSON.stringify({
		stats: [0, 0, 0, 0],
		active: true,
		relations: {
			highlightHighest: [],
			highlightLowest:  [],
			combinesCounters: [],
			addToCombination: [],
			displaysBecause: []
		}
	});

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
	miscCounters.forEach(item => tracker_counters['misc'][item] = JSON.parse(defaultCounterObject));


	//get all bonus stars
	const bonusStars = mpdb['_all']['bonusStars'];

	//create the 'bonusStars' counters
	for (const name in bonusStars) {
		//skip '_index' since it isn't an actual bonus star
		if (name === '_index')
			continue;

		//skip if counter cant be tracked
		if (bonusStars[name]['cantBeTracked'] === true)
			continue;

		//create the object item for the bonus star
		tracker_counters['bonusStars'][name] = JSON.parse(defaultCounterObject);

		//get the current counter name
			//the actual object can be viewed with 'currentCounterObj' but I can't link it directly to a variable because it'd just be a reference and trying to update it would simply change the reference instead of the linked object
		let currentCounter = 'bonusStars.' + name;
		const currentCounterObj = tracker_getCounter(currentCounter);

		//get details
		const details = bonusStars[name]['details'];

		//whether the counter should be inverted or not
		if (bonusStars[name]['invert'] === true) {
			var invert = true;
		} else {
			var invert = false;
		}

		//which counters it combines
		let combines = [];

		//execute code based on which 'bonusStarType' it is to finish setting up the bonus star
		switch (bonusStars[name]['bonusStarType']) {
			case 'space':
				//check if 'spacesAllowed' is set to all (which is the default value so it can either be undefined or null)
				if (typeof details['spacesAllowed'] === 'undefined' || typeof details['spacesAllowed'] === 'null') {
					//TODO: add all spaces to 'combines'
				} else {
					details['spacesAllowed'].forEach(item => combines.push('spaces.' + item));
				}
				break;

			case 'coin':
				switch (details.coinStarType) {
					case 'highest':
						combines.push('misc.highestCoinCount');
						break;
					case 'total':
						combines.push('misc.totalCoinCount');
						break;
				}
				break;

			case 'minigame':
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

		//if the bonus star only tracks a single thing then simply redirect it to said counter by using 'sameAs'
		if (combines.length === 1) {
			//get the counter it's gonna be linked to
			const linkedCounter = tracker_getCounter(combines[0]);

			//check if the counter it links to even exists -- if not then don't link
			if (linkedCounter !== undefined) {
				//replace the current counter with a link
				tracker_counters['bonusStars'][name] = {
					sameAs: combines[0],
					active: true
				};

				//add the bonus star to either 'highlightHighest' or 'highlightLowest'
				if (invert === true) {
					linkedCounter['relations']['highlightLowest'] .push(currentCounter);
				} else {
					linkedCounter['relations']['highlightHighest'].push(currentCounter);
				}
			}
		}

		//list every counter that 'currentCounter' combines
		if (combines.length > 1) {
			for (const combinesIndex in combines) {
				//get counter that should be combined
				const combinedCounter = tracker_getCounter(combines[combinesIndex]);

				//skip if the combined counter doesn't exist
				if (combinedCounter === undefined) {
					continue;
				}

				//add the combined counter to the current
				tracker_getCounter(currentCounter)['relations']['combinesCounters'].push(combines[combinesIndex]);

				//add current counter to the combined one
				combinedCounter.relations.addToCombination.push('bonusStars.' + name);
			}
		}
	}
}

/** Builds the general modal layout.
 *
 * This only really includes the '#modal_catchAllContainer' element, it doesn't create any actual modals.
 */
function boot_buildModalCatchAll () {
	const modalCatchAll = cElem('span', document.querySelector('body'), {id: 'modal_catchAllContainer'});
}

/** Builds the navbar.
 */
function boot_buildNavbar () {
	//This is the ground piece that covers the entire navbar area.
	const navbarBase = cElem('span', document.querySelector('body'), {id: 'navbar_base'});

	//Create the 4 player selectors
	for (let playerNum = 1; playerNum <= 4; playerNum++) {
		let navbarPlayer = cElem('span', navbarBase, {class: 'navbar_player', player: playerNum});

		//pick a character icon -- TODO: replace this with something actually good
		switch (playerNum) {
			case 1:
				var characterIconSrc = 'images/icons/characters/starRushIcon/mario.png';
				break;
			case 2:
				var characterIconSrc = 'images/icons/characters/starRushIcon/luigi.png';
				break;
			case 3:
				var characterIconSrc = 'images/icons/characters/starRushIcon/yoshi.png';
				break;
			case 4:
				var characterIconSrc = 'images/icons/characters/starRushIcon/peach.png';
				break;
		}

		cElem('img', navbarPlayer, {class: 'navbar_icon', player: playerNum, src: characterIconSrc});
	}

	//create the shitty open settings button
	let openSettingsButton = cElem('span', navbarBase, {style: 'color: white;cursor: pointer;', onclick: 'settings_toggleSettings();'});
	openSettingsButton.innerText = 'open/close settings &credits';
}

/** Builds settings.
 */
function boot_buildSettings () {
	//The ground piece that spans and covers the entire screen. This is updated to show/hide settings.
	const container = cElem('span', document.querySelector('body'), {id: 'settings_container'});

	//The base piece that moves header, main & footer into the correct place.
	const base = cElem('span', container, {id: 'settings_base'});

	//The pieces that contain all the content. Header & Footer are the area at the top-bottom while Main is the piece that changes based on what settings tab is selected.
	const header = cElem('span', base, {id: 'settings_header'});
	const main = cElem('span', base, {id: 'settings_main'});
	const footer = cElem('span', base, {id: 'settings_footer'});

	//Set header up
	cElem('span', header).innerText = 'yo';
	cElem('span', header, {class: 'settings_seperator'});

	//Set main up
		//TODO: replace this with actual settings

		//Add the copyright bits
	let copyrightBits = cElem('span', main);
	copyrightBits.innerHTML = 'Project is currently maintained by <a href="https://www.twitter.com/yoshisrc" rel="noopener" target="_blank">blueYOSHI</a> with contributions from <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/graphs/contributors" rel="noopener" target="_blank">others</a> <br> <br> Project is licensed under the GPLv3.0 and a file containing the license is included in the <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/blob/rewrite/LICENSE" rel="noopener" target="_blank">source code</a>. <br> <br> Initial development began in 2018. Latest activity can be tracked on the <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/tree/rewrite" rel="noopener" target="_blank">github page of this project</a>. <br> <br> <a href="https://www.freepremiumfonts.com/free-font/new-super-mario-font-mario-party-9.aspx" rel="noopener" target="_blank">Mario Party 9 Font</a> from <a href="www.freepremiumfonts.com" rel="noopener" target="_blank">www.freepremiumfonts.com</a> (modified) <br> <br> <b>All characters, products and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.<br>Mario Party is a registered trademark of Nintendo.</b><br><br>'


		//add some shitty counters to test the verticality of it or something
	for (let num2 = 0; num2 < 9; num2++) {
		let counterList = cElem('span', main, {class: 'tracker_counterList'});

		for (let num = 0; num < 9; num++) {
			let counter = cElem('span', counterList, {class: 'tracker_counter'});
			cElem('img', counter, {class: 'tracker_counterImg', src: 'images/icons/bonusStars/old/smp/happeningStar.png'});
			let counterText = cElem('span', counter, {class: 'tracker_counterText'});
			counterText.innerText = 'x69';
		}
	}
	cElem('span', main).innerText = 'AY CARAMBA';

	//Set footer up
	cElem('span', footer, {class: 'settings_seperator'});
	cElem('span', footer).innerText = 'yo2';
}

/** Builds all trackers (counters & everything else related to them).
 */
function boot_buildTracker () {
	//This contains the entire main body (basically anything that's not navbar, settings or title-screen).
	const mainSiteContainer = cElem('span', document.querySelector('body'), {id: 'mainSiteContainer'});

	//This contains all players/teams (and also all counters deeper in).
	const playerList = cElem('span', mainSiteContainer, {id: 'tracker_playerList'});

	let counters = [];

	//Create 4 players.
	for (let playerNum = 1; playerNum <= 4; playerNum++) {
		//This contains everything related to this player.
		let tracker_player = cElem('span', playerList, {class: 'tracker_player', player: playerNum});

		//pick a character icon -- TODO: replace this with something actually good
		switch (playerNum) {
			case 1:
				var characterIconSrc = 'images/icons/characters/starRushIcon/mario.png';
				break;
			case 2:
				var characterIconSrc = 'images/icons/characters/starRushIcon/luigi.png';
				break;
			case 3:
				var characterIconSrc = 'images/icons/characters/starRushIcon/yoshi.png';
				break;
			case 4:
				var characterIconSrc = 'images/icons/characters/starRushIcon/peach.png';
				break;
		}

		//This contains the character icon for this player.
		let characterDisplay = cElem('span', tracker_player, {class: 'tracker_characterDisplay', player: playerNum});
		cElem('img', characterDisplay, {class: 'tracker_characterIcon', src: characterIconSrc});

		//This contains all counters for this player.
		let counterList = cElem('span', tracker_player, {class: 'tracker_counterList', player: playerNum});

		//Create every counter for this player.
		const bonusStars = mpdb['_all']['bonusStars']
		for (const item in bonusStars) {
			//skip '_index'
			if (item === '_index')
				continue;

			//This contains one counter.
			let counter = cElem('span', counterList, {class: 'tracker_counter'});

			//counter image
			cElem('img', counter, {class: 'tracker_counterImg', src: 'images/' + bonusStars[item].metadata.icon[0].filePath});
			//counter text
			let counterText = cElem('span', counter, {class: 'tracker_counterText'});
			counterText.innerText = 0;
		}
	}
}