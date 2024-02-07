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
 *	Once 'boot.js' finished loading it executes the 'onload' attribute of it's <script> element which calls 'boot_scriptLoaded()' which then finally calls 'boot_preStartup()'.
 *	 'boot_preStartup()' then loads all other JS and CSS files. Each JS file is loaded with a <script> element that has a 'onload' attribute that pushes the file name to 'boot_scriptsLoaded'.
 *	Once all script files are loaded it executes 'boot_finishStartup()'.
 *
 *
 *	Basically, this is how it looks:
 *		> index.html <script> element
 *			- load helpers.js
 *			> 'onload' attribute
 *				- load boot.js via loadScripts()
 * 				> 'onload' attribute > boot_scriptLoaded()
 *					> boot_preStartup()
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
			//(these files should only rely on 'helpers.js' and each other, they do nothing that's specific to MPO either so anyone can use it in their own project)
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
			boot_preStartup();
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
function boot_preStartup () {
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
 * 	This builds the site up completely and does basically everything that 'boot_preStartup()' didn't do.
 */
function boot_finishStartup () {

	//fill in all listener events
	listeners_fillInPointerEventList();

	//fill in the 'trackerCore_status' object (with all the different bonus stars, spaces, etc)
	setTimeout(boot_fillInCounterObject, 0);

	//load localStorage
	setTimeout(boot_loadLocalStorage, 0);

	//build the actual site
	setTimeout(buildSite_build, 0);

	//apply settings
	setTimeout(() => {applySettings_applyAll(true);}, 0);

	//update all counters
	setTimeout(trackerInterface_updateVisuals, 0);

	//update the 2nd navbar player icon (on default the Luigi icon) because Chrome keeps shitting itself and just neither loads the correct icon (just displays a random one) or it just flickers sometimes. So until I figure out a better solution this will have to do ¯\_(ツ)_/¯
		//and yes, this has to have a 100ms delay! Or at least a 0ms delay doesn't work and why bother to figure out the exact number needed for a temporary hack?
	setTimeout(() => {document.querySelector('.navbar_icon[player="2"]').src = document.querySelector('.navbar_icon[player="2"]').src}, 100);
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



	// === PROFILES ===

	//if a 'globalProfile' exists then use it
	if (ls.globalProfile !== undefined) {
		//parse the data
		const parsedGlobalProfile = JSON.parse(ls.globalProfile);

		//make sure it's an object
		if (typeof parsedGlobalProfile === 'object') {

			//then add it
			trackerCore_status.profiles.globalProfile = new trackerCore_Profile({_premade: parsedGlobalProfile, _globalProfile: true});
		}

	//else create a default one
	} else {
		trackerCore_status.profiles.globalProfile = new trackerCore_Profile({_globalProfile: true});
	}

	//remembers whether a default profile had to be made
	let defaultProfileMade = false;

	//load profiles if present
	if (ls.profiles !== undefined) {
		//parse the data
		const parsedProfiles = JSON.parse(ls.profiles);

		//check if the data is an array and does contain at least 1 array item
			//Note that unlike savefiles, this is an object and NOT an array
		if (typeof parsedProfiles === 'object' && Object.keys(parsedProfiles).length > 0) {

			//loop through all profiles
			for (const key in parsedProfiles) {
				const item = parsedProfiles[key];

				//and add the profile by letting 'trackerCore_Profile()' handle the verifying
				trackerCore_status.profiles.add(new trackerCore_Profile({_premade: item}));
			}
		} else {
			//complain and use default
			console.warn(`[MPO] Stored profiles in localStorage is either not an object or doesn't include any properties in it. Weird, isn't it? Object: `, parsedProfiles);
			trackerCore_status.profiles.add(new trackerCore_Profile());
			defaultProfileMade = true;
		}

	//else create a default profile
	} else {
		trackerCore_status.profiles.add(new trackerCore_Profile());
		defaultProfileMade = true;
	}



	// === SAVEFILES ===

	//if a 'currentSavefileSlot' property exists then use it
	if (ls.currentSavefileSlot !== undefined) {
		//parse the data (since it's just a number a 'JSON.parse()' isn't needed)
		const parsedCurrentSavefileSlot = Number(ls.currentSlot);

		//if it's a proper number then apply it (an 'else' isn't needed since it's already at 0)
		if (Number.isSafeInteger(parsedCurrentSavefileSlot) === true) {
			trackerCore_status.savefiles.currentSlot = parsedCurrentSavefileSlot;
		}
	}

	//load savefiles if present
	if (ls.savefiles !== undefined) {
		//parse the data
		const parsedSavefiles = JSON.parse(ls.savefiles);

		//check if the data is an array and does contain at least 1 array item
		if (Array.isArray(parsedSavefiles) === true && parsedSavefiles?.length > 0) {

			//loop through all savefiles
			for (const item of parsedSavefiles) {

				//and add the savefile by letting 'trackerCore_Savefile()' handle the verifying
				trackerCore_status.savefiles.push(new trackerCore_Savefile({_premade: item}));
			}
		} else {
			//complain and use default
			console.warn(`[MPO] Stored savefiles in localStorage is either not an array or doesn't include any array items in it. Weird, isn't it? Array: `, parsedSavefiles);
			trackerCore_status.savefiles.push(new trackerCore_Savefile());
		}

	//else create a default savefile
	} else {

		//if a default profile was already made then add the new savefile to that (this makes sure users notice that profiles exist)

		//first, get a list of all profile slot numbers
		const profileList = Object.keys(trackerCore_status.profiles);
		let profileParent = undefined;

		//check if a default profile was made and that there's only one profile
			//then save the profile slot
		if (defaultProfileMade === true && profileList.length === 1) {
			profileParent = Number(profileList[0]);
		}

		//finally, create a savefile and use the profile slot so it's properly added
			//if a default profile wasn't made then it's simply undefined which works
		trackerCore_status.savefiles.push(new trackerCore_Savefile({profileParent: profileParent}));
	}
}

/**	Sets up the 'trackerCore_status.counters.behaviour' object completely.
 *
 * 	See 'core/trackerCore.js' for full documentation on what the variable does.
 */
function boot_fillInCounterObject () {
	//quick access
	const counterBehaviour = trackerCore_status.counters.behaviour;



	// === ADD MISC STATS ===

	//loop through all 'miscStats' entries in the database and add their names
	mpdb._all.miscStats._index.forEach(key => {counterBehaviour.misc[key] = new trackerCore_CounterBehaviour(`misc.${key}`, 'origin');});



	// === ADD BONUS STARS ===

	//get a list of all bonus stars
	const bonusStarList = dbparsing_getBonusStarList('_all');

	//this serves as a lookup table for which bonus star types require which counter
		//those with a second object inside them are based on the 'details' properties
	const linkToList = {
		coin: {
			coinStarType: {
				highest: 'misc.highestCoinCount',
				total: 'misc.totalCoinCount'
			}
		},
		minigame: {
			minigameStarType: {
				win: 'misc.minigameWins',
				coin: 'misc.minigameCoins'
			}
		},
		distance: 'misc.distanceWalked',
		shop: 'misc.coinsSpentInShop',
		collect: {
			collectWhat: {
				miniZtar: 'misc.miniZtarsCollected',
				balloon: 'misc.balloonsCollected',
				starBalloon: 'misc.starBalloonsCollected'
			}
		},
		ally: {
			allyStarType: {
				most: 'misc.allyAmount',
				time: 'misc.allyTimeSpent'
			}
		},
		stomp: {
			stompStarType: {
				stompOthers: 'misc.stompOthers',
				getStompedOn: 'misc.getStompedOn'
			}
		}
	}

	//loop through all bonus stars
	for (key in bonusStarList) {
		//quick access
		const item = bonusStarList[key];

		//cancel if it can't be tracked
		if (item.cantBeTracked === true) {
			continue;
		}

		//temporary variables for saving properties that 'trackerCore_CounterBehaviour();' requires
			//see said function for more info
		let counterRelationType;
		let counterRelations = {};

		//fill in 'counterRelations' and it's type
		switch (item.bonusStarType) {

			//COLLECTION
				//these will be a collection of various counters
				//meaning, we have to get a list of all counters it should have by checking the 'details' property
			case 'space':
			case 'item':
				counterRelationType = 'collection';
				counterRelations.collectionChildren = [];

				//The rest hasn't been finished yet since spaces and items haven't been added as counters
				//so we just stop here until it can be properly finished
				break;

				//get a list of all spaces/items
				const counterList = mpdb._all[item.bonusStarType + 's'];

				//get a list of all spaces/items allowed by checking the 'spacesAllowed'/'itemsAllowed' property
				const allowed = item.details[item.bonusStarType + 'sAllowed'];

				//add the counters it should be a collection of with a set of 'if ... else' blocks
					//TODO: Not added yet since space counters don't even exist yet

				//add all spaces
				if (allowed === 'all' || allowed === undefined) {
					//add all spaces - I think?

				//if it's a string then add just that
				} else if (typeof allowed === 'String') {
					//add this single space
						//could also put it in an array first and let the next if block handle it
						//but that wouldn't exactly be efficient
						//also, the database is not allowed to be edited so there's also that I guess

				//if it's an array then add everything mentioned
				} else if (Array.isArray(allowed) === true) {
					//add all spaces specified

				//if it's none of these then complain and set the counter to 'origin' so it at least still works
				} else {
					console.warn(`[MPO] boot_setupCounterObject() found a invalid '${item.bonusStarType + 'sAllowed'}' object: `, allowed, ` - setting the counter to 'origin' - bonus star object: `, item);
					counterRelationType = 'origin';
				}
				break;

			// LINKED BASED ON DETAILS
				//these will be linked to a single counter, but which one it is depends on the 'details' property
			case 'coin':
			case 'minigame':
			case 'collect':
			case 'ally':
			case 'stomp':
				counterRelationType = 'linked';

				//get the 'linkToList' entry of the bonusStar
				const itemListEntry = linkToList[item.bonusStarType];

				//get the name of the 'details' property
				const detailName = Object.keys(itemListEntry)[0];

				//get the counter that the bonus star should use based on what 'details' value was found
				counterRelations.linkTo = itemListEntry[detailName][ item.details[detailName] ];
				break;

			//LINKED
				//these bonus star types always use the same counter
			case 'distance':
			case 'shop':
				counterRelationType = 'linked';

				//get the counter based on the bonus star
					//there's no variations of these bonus stars so we don't have to check the 'details' property
				counterRelations.linkTo = linkToList[item.bonusStarType];
				break;

			default:
				break;
		}

		//add the counter
		counterBehaviour.bonusStars[key] = new trackerCore_CounterBehaviour(`bonusStars.${key}`, counterRelationType, counterRelations);
	}



	// === ADD SPACES ===

	//TODO: Add spaces
}