/** Builds the actual site itself.
 *
 * 	NOTE: This only gets executed once every file has been loaded.
 *
 * 	For easy editing the final site can always be viewed inside 'prebuilt.html' for easy editing (be sure to update that file AND the functions in here for any changes).
 */
function buildSite_build () {
	//performance.mark('buildSite_start'); //start performance check

	//create the document fragment
	let docFrag = new DocumentFragment();

	//build the actual HTML site
	docFrag = buildSite_buildModalCatchAll(docFrag);
	docFrag = buildSite_buildNavbar(docFrag);
	docFrag = buildSite_buildSettings(docFrag);
	docFrag = buildSite_buildTracker(docFrag);

	//append the document fragment to <body>
	document.querySelector('body').appendChild(docFrag);

	//boot_applySettings();

	//add all eventListeners
		//has to be at the end so if an event listener relies on a feature built by another function in here then it works perfectly without breaking the site
	listeners_addListeners();

	//performance.mark('buildSite_end'); //end performance check
	//console.log(performance.measure('buildSite', 'buildSite_start', 'buildSite_end')); //actually measure the performance and log it
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
function buildSite_buildModalCatchAll (docFrag) {
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
function buildSite_buildNavbar (docFrag) {
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
function buildSite_buildSettings (docFrag) {
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
	let copyrightBits = cElem('span', main)
		.innerHTML = `MarioPartyOverlay (MPO) is an open project and was made by <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/graphs/contributors" rel="noopener" target="_blank">it's contributors</a>. <br> The projects current maintainer is <a href="https://www.twitter.com/yoshisrc" rel="noopener" target="_blank">blueYOSHI</a>. <br> <br> The project as a whole is licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0.html" rel="noopener" target="_blank">Apache-2.0 license</a> while the database and all images are licensed under the <a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC-BY-4.0 (Creative Commons Attribution 4.0 International) license</a>. <br> This means anyone is free to use the any part of this project for their own purposes (commercial or not, open-source or not) as long as changes are stated (and a few other small restrictions, see the full licenses for more detail). <br> <br> <a href="https://www.freepremiumfonts.com/free-font/new-super-mario-font-mario-party-9.aspx" rel="noopener" target="_blank">Mario Party 9 Font</a> from <a href="http://www.freepremiumfonts.com" rel="noopener" target="_blank">www.freepremiumfonts.com</a> (modified) <br> <br> <b>All characters, products and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.<br>Mario Party is a registered trademark of Nintendo.</b> <br> <br> Copyright 2021 MarioPartyOverlay AUTHORS <br> <br>`;

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

	//create a checkbox with the same tag as the form below
	cElem('br', formTest);
	cElem('span', formTest)
		.textContent = 'Checkbox with same tag as below form: ';
	inputfield_createField('checkbox', formTest, {
		onchange: logToOutput,
		addToForm: formTest,
		tag: 'formOrCheck',
		checkboxValue: 'This should overwrite the form'
	});

	//create a form in a form
	cElem('br', formTest);
	cElem('span', formTest)
		.textContent = '=== FORM IN FORM ===';
	let formInFormTest = inputfield_createField('form', formTest, {
		addToForm: formTest,
		onchange: logToOutput,
		tag: 'formOrCheck'
	});

	//create a text input inside the new form
	cElem('br', formInFormTest);
	inputfield_createField('text', formInFormTest, {
		onchange: logToOutput,
		addToForm: [formInFormTest, formTest],
		tag: 'texto',
	});

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
function buildSite_buildTracker (docFrag) {
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