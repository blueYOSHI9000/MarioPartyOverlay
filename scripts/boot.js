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
 * 	Each global function and global variable has to start with a prefix like 'boot_' or 'tracker_' (always based on the file name).
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
	'database/mp-db.js',//the database

	'scripts/dbparsing.js',//parses the database
	'scripts/ui.js',//handles anything related to the interface itself (preferably anything that modifies the DOM tree should be kept inside 'ui.js' and 'boot.js', though this isn't a hard rule)
	'scripts/interaction.js',//handles everything related to dragging & resizing elements by the user (required mostly for modals)
	'scripts/modal.js',//handles anything related to modals
	'scripts/inputfield.js',//handles the creation of "input fields"

	'scripts/tracker.js',//handles the tracker itself
	'scripts/settings.js',//handles anything related to settings like applying settings

	'scripts/listeners.js' //handles all event listeners like keyboard inputs or mouseclicks
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
		//else it simply leaves the variable as is
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
	//performance.mark('buildSite_start'); //start performance check

	//create the document fragment
	let docFrag = new DocumentFragment();

	//setup the 'tracker_counters' object
	boot_setupCounterObject();

	//build the actual HTML site
	docFrag = boot_buildModalCatchAll(docFrag);
	docFrag = boot_buildNavbar(docFrag);
	docFrag = boot_buildSettings(docFrag);
	docFrag = boot_buildTracker(docFrag);

	//append the document fragment to <body>
	document.querySelector('body').appendChild(docFrag);

	//boot_applySettings();

	//add all eventListeners
		//has to be at the end so if an event listener relies on a feature built by another function in here then it works perfectly without breaking the site
	listeners_addListeners();

	//performance.mark('buildSite_end'); //end performance check
	//console.log(performance.measure('buildSite', 'buildSite_start', 'buildSite_end')); //actually measure the performance and log it
}

/**	Sets up the 'tracker_counters' object completely.
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
	miscCounters.forEach(item => tracker_status['counters']['misc'][item] = new tracker_Counter('standAlone'));


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
			tracker_status['counters']['bonusStars'][key] = new tracker_Counter('standAlone');

			//push this to the list of counters made
			countersMade.push(currentCounterMade);
			countersMadeNames.push(key);

		//if the bonus star only tracks a single thing then simply link it to said counter by using 'linkTo'
		} else if (combines.length === 1) {
			//get the counter it's gonna be linked to
			const linkedCounter = tracker_getCounter(combines[0]);

			//check if the counter it links to even exists -- if not then don't link
			if (linkedCounter !== undefined) {
				//create the counter
				tracker_status['counters']['bonusStars'][key] = new tracker_Counter('linked', combines[0]);

				//add the bonus star to either 'highlightHighest' or 'highlightLowest'
				if (invert === true) {
					linkedCounter['status']['highlightLowest'] .push(currentCounterName);
				} else {
					linkedCounter['status']['highlightHighest'].push(currentCounterName);
				}
			} else {
				//if the linked counter can't be found then simply create a new, unique counter
				tracker_status['counters']['bonusStars'][key] = new tracker_Counter('standAlone');
			}

		//list every counter that 'currentCounterName' combines
		} else if (combines.length > 1) {
			//create the counter
			tracker_status['counters']['bonusStars'][key] = new tracker_Counter('combination');

			//get the counter
			const currentCounter = tracker_getCounter(currentCounterName);

			for (const key in combines) {
				//get counter that should be combined
				const combinedCounter = tracker_getCounter(combines[key]);

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

/** Builds the general modal layout.
 *
 * 	This only really includes the '#modal_catchAllContainer' element, it doesn't create any actual modals.
 *
 * 	Args:
 * 		docFrag [DocumentFragment object]
 * 			The document fragment that the elements should be created in.
 *
 * 	Returns [DocumentFragment object]:
 * 		Returns the modified DocumentFragment.
 */
function boot_buildModalCatchAll (docFrag) {
	const modalCatchAll = cElem('span', docFrag, {id: 'modal_catchAllContainer'});

	return docFrag;
}

/** Builds the navbar.
 *
 * 	Args:
 * 		docFrag [DocumentFragment object]
 * 			The document fragment that the elements should be created in.
 *
 * 	Returns [DocumentFragment object]:
 * 		Returns the modified DocumentFragment.
 *
 * 	Returns [DocumentFragment object]:
 * 		Returns the modified DocumentFragment.
 */
function boot_buildNavbar (docFrag) {
	//This is the ground piece that covers the entire navbar area.
	const navbarBase = cElem('span', docFrag, {id: 'navbar_base'});

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
	openSettingsButton.textContent = 'open/close settings &credits';

	return docFrag;
}

/** Builds settings.
 *
 * 	Args:
 * 		docFrag [DocumentFragment object]
 * 			The document fragment that the elements should be created in.
 *
 * 	Returns [DocumentFragment object]:
 * 		Returns the modified DocumentFragment.
 */
function boot_buildSettings (docFrag) {
	//The ground piece that spans and covers the entire screen. This is updated to show/hide settings.
	const container = cElem('span', docFrag, {id: 'settings_container'});

	//The base piece that moves header, main & footer into the correct place.
	const base = cElem('span', container, {id: 'settings_base'});

	//The pieces that contain all the content. Header & Footer are the area at the top-bottom while Main is the piece that changes based on what settings tab is selected.
	const header = cElem('span', base, {id: 'settings_header'});
	const main = cElem('span', base, {id: 'settings_main'});
	const footer = cElem('span', base, {id: 'settings_footer'});

	//Set header up
	cElem('span', header).textContent = 'yo';
	cElem('span', header, {class: 'settings_seperator'});

	//Set main up
		//TODO: replace this with actual settings

		//Add the copyright bits
	let copyrightBits = cElem('span', main);
	copyrightBits.innerHTML = 'Project is currently maintained by <a href="https://www.twitter.com/yoshisrc" rel="noopener" target="_blank">blueYOSHI</a> with contributions from <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/graphs/contributors" rel="noopener" target="_blank">others</a> <br> <br> Project is licensed under the GPLv3.0 and a file containing the license is included in the <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/blob/rewrite/LICENSE" rel="noopener" target="_blank">source code</a>. <br> <br> Initial development began in 2018. Latest activity can be tracked on the <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/tree/rewrite" rel="noopener" target="_blank">github page of this project</a>. <br> <br> <a href="https://www.freepremiumfonts.com/free-font/new-super-mario-font-mario-party-9.aspx" rel="noopener" target="_blank">Mario Party 9 Font</a> from <a href="www.freepremiumfonts.com" rel="noopener" target="_blank">www.freepremiumfonts.com</a> (modified) <br> <br> <b>All characters, products and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.<br>Mario Party is a registered trademark of Nintendo.</b><br><br>'

	//create a quick seperator
	let seperator = cElem('span', main);
	seperator.textContent = '====================================================';
	cElem('br', main);
	cElem('br', main);

	//create a temporary debug output to test stuff
	let output = cElem('span', main, {id: 'settings_debugOutput'})
		.innerText = '\n';
	cElem('br', main);

	//the function that will be called when each input field gets updated
		//the function simply logs the value to the element with the ID 'settings_debugOutput'
	let logToOutput = (value) => {document.getElementById('settings_debugOutput').innerText = `${typeof value}\n${ (typeof value === 'object') ? JSON.stringify(value) : value }`;};

	//create a checkbox
	cElem('br', main);
	let checkboxTest = cElem('span', main);
	checkboxTest.textContent = 'Checkbox:';
	inputfield_createField('checkbox', checkboxTest, {
		onchange: logToOutput
	});

	//create a checkbox but with a 'checkboxValue'
	cElem('br', main);
	let checkboxTest2 = cElem('span', main);
	checkboxTest2.textContent = 'Checkbox with checkboxValue:';
	inputfield_createField('checkbox', checkboxTest2, {
		onchange: logToOutput,
		checkboxValue: 'this is true'
	});

	//create a radio checkbox
	cElem('br', main);
	inputfield_createField('radio', main, {
		variation: 'checkbox',
		onchange: logToOutput,
		options: [
			{
				name: 'Option 1',
				value: 'one'
			},
			{
				name: 'Option 2',
				value: 'two'
			},
			{
				name: 'Option 3',
				value: 'three'
			}
		]
	});

	//create a input field
	cElem('br', main);
	inputfield_createField('radio', main, {
		variation: 'select',
		onchange: logToOutput,
		options: [
			{
				name: 'Mario',
				value: 'mario',
				src: 'images/icons/characters/starRushIcon/mario.png'
			},
			{
				name: 'Weegee',
				value: 'weegee',
				src: 'images/icons/characters/starRushIcon/luigi.png'
			},
			{
				name: 'Wario',
				value: 'wario',
				src: 'images/icons/characters/starRushIcon/wario.png'
			},
			{
				name: 'WAAAAAAAAAAAH',
				value: 'waaaaaaaaaaah',
				src: 'images/icons/characters/starRushIcon/waluigi.png'
			}
		]
	});

	//create a input field
	cElem('br', main);
	inputfield_createField('radio', main, {
		variation: 'image',
		onchange: logToOutput,
		options: [
			{
				name: 'Mario',
				value: 'mario',
				src: 'images/icons/characters/starRushIcon/mario.png'
			},
			{
				name: 'Weegee',
				value: 'weegee',
				src: 'images/icons/characters/starRushIcon/luigi.png'
			},
			{
				name: 'Wario',
				value: 'wario',
				src: 'images/icons/characters/starRushIcon/wario.png'
			},
			{
				name: 'WAAAAAAAAAAAH',
				value: 'waaaaaaaaaaah',
				src: 'images/icons/characters/starRushIcon/waluigi.png'
			}
		]
	});

	//create a text input
	cElem('br', main);
	inputfield_createField('text', main, {
		onchange: logToOutput
	});

	//create a textarea
	cElem('br', main);
	inputfield_createField('text', main, {
		variation: 'area',
		onchange: logToOutput
	});

	//create a number-text
	cElem('br', main);
	inputfield_createField('number', main, {
		onchange: logToOutput
	});

	//create a number range
	cElem('br', main);
	inputfield_createField('number', main, {
		variation: 'range',
		onchange: logToOutput
	});

	//create a button
	cElem('br', main);
	inputfield_createField('button', main, {
		onchange: logToOutput
	});

	//create a color input
	cElem('br', main);
	inputfield_createField('color', main, {
		onchange: logToOutput
	});

	//create a couple checkboxes with a host
	cElem('br', main);
	cElem('span', main)
		.textContent = '=== HOST ===';
	cElem('br', main);

	let testHost = cElem('span', main);

	cElem('span', testHost)
		.textContent = 'Mario: ';
	inputfield_createField('checkbox', testHost, {
		host: testHost,
		checkboxValue: 'mario',
		onchange: logToOutput
	});
	cElem('br', testHost);

	cElem('span', testHost)
		.textContent = 'Weegee: ';
	inputfield_createField('checkbox', testHost, {
		host: testHost,
		checkboxValue: 'weegee',
		onchange: logToOutput
	});
	cElem('br', testHost);

	cElem('span', testHost)
		.textContent = 'Wario: ';
	inputfield_createField('checkbox', testHost, {
		host: testHost,
		checkboxValue: 'wario',
		onchange: logToOutput
	});
	cElem('br', testHost);

	cElem('span', testHost)
		.textContent = 'WAAAAAAAAAAAH: ';
	inputfield_createField('checkbox', testHost, {
		host: testHost,
		checkboxValue: 'waaaaaaaaaaah',
		onchange: logToOutput
	});
	cElem('br', testHost);

	cElem('span', testHost)
		.textContent = 'Mario: ';
	inputfield_createField('checkbox', testHost, {
		host: testHost,
		checkboxValue: 'mario',
		onchange: logToOutput
	});
	cElem('br', testHost);




	//create a form
	cElem('br', main);
	cElem('span', main)
		.textContent = '=== FORM ===';
	cElem('br', main);

	//create a temporary debug output to test stuff
	let formOutput = cElem('span', main, {id: 'settings_debugFormOutput'})
		.innerText = '\n';
	cElem('br', main);

	//the function that will be called when each input field gets updated
		//the function simply logs the value to the element with the ID 'settings_debugFormOutput'
	let logToFormOutput = (value) => {document.getElementById('settings_debugFormOutput').innerText = `${typeof value}\n${ (typeof value === 'object') ? JSON.stringify(value) : value }`;};

	let formTest = inputfield_createField('form', main, {
		checkboxValue: 'mario',
		onchange: logToFormOutput
	});

	//create a input field
	cElem('br', formTest);
	inputfield_createField('radio', formTest, {
		variation: 'checkbox',
		onchange: logToOutput,
		addToForm: formTest,
		tag: 'radio',
		options: [
			{
				name: 'Mario',
				value: 'mario',
				src: 'images/icons/characters/starRushIcon/mario.png'
			},
			{
				name: 'Weegee',
				value: 'weegee',
				src: 'images/icons/characters/starRushIcon/luigi.png'
			},
			{
				name: 'Wario',
				value: 'wario',
				src: 'images/icons/characters/starRushIcon/wario.png'
			},
			{
				name: 'WAAAAAAAAAAAH',
				value: 'waaaaaaaaaaah',
				src: 'images/icons/characters/starRushIcon/waluigi.png'
			}
		]
	});

	//create a text input
	cElem('br', formTest);
	inputfield_createField('text', formTest, {
		onchange: logToOutput,
		addToForm: formTest,
		tag: 'text',
	});

	//create a host
	cElem('br', formTest);
	let testFormHost = cElem('span', formTest);

	cElem('span', testFormHost)
		.textContent = 'Mario: ';
	inputfield_createField('checkbox', testFormHost, {
		host: testFormHost,
		checkboxValue: 'mario',
		onchange: logToOutput,
		addToForm: formTest,
		tag: 'hostTag'
	});
	cElem('br', testFormHost);

	cElem('span', testFormHost)
		.textContent = 'Weegee: ';
	inputfield_createField('checkbox', testFormHost, {
		host: testFormHost,
		checkboxValue: 'weegee',
		onchange: logToOutput
	});
	cElem('br', testFormHost);

	cElem('span', testFormHost)
		.textContent = 'Wario: ';
	inputfield_createField('checkbox', testFormHost, {
		host: testFormHost,
		checkboxValue: 'wario',
		onchange: logToOutput
	});
	cElem('br', testFormHost);

	cElem('span', testFormHost)
		.textContent = 'WAAAAAAAAAAAH: ';
	inputfield_createField('checkbox', testFormHost, {
		host: testFormHost,
		checkboxValue: 'waaaaaaaaaaah',
		onchange: logToOutput
	});
	cElem('br', testFormHost);

	cElem('span', testFormHost)
		.textContent = 'Mario: ';
	inputfield_createField('checkbox', testFormHost, {
		host: testFormHost,
		checkboxValue: 'mario',
		onchange: logToOutput
	});
	cElem('br', testFormHost);

	//Set footer up
	cElem('span', footer, {class: 'settings_seperator'});
	cElem('span', footer).textContent = 'yo2';

	return docFrag;
}

/** Builds all trackers (counters & everything else related to them).
 *
 * 	Args:
 * 		docFrag [DocumentFragment object]
 * 			The document fragment that the elements should be created in.
 *
 * 	Returns [DocumentFragment object]:
 * 		Returns the modified DocumentFragment.
 */
function boot_buildTracker (docFrag) {
	//This contains the entire main body (basically anything that's not navbar, settings or title-screen).
	const mainSiteContainer = cElem('span', docFrag, {id: 'mainSiteContainer'});

	//This contains all players/teams (and also all counters deeper in).
	const playerList = cElem('span', mainSiteContainer, {id: 'tracker_playerList'});

	let counters = [];

	//Create 4 players.
	for (let playerNum = 1; playerNum <= 4; playerNum++) {
		//This contains everything related to this player.
		let tracker_player = cElem('span', playerList, {class: 'tracker_player', 'data-player': playerNum});

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
		let characterDisplay = cElem('span', tracker_player, {class: 'tracker_characterDisplay', 'data-player': playerNum});
		cElem('img', characterDisplay, {class: 'tracker_characterIcon', src: characterIconSrc});

		//This contains all counters for this player.
		let counterList = cElem('span', tracker_player, {class: 'tracker_counterList', 'data-player': playerNum});

		//Create every counter for this player.
		ui_createCounterList(counterList, playerNum);
	}

	return docFrag;
}