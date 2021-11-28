// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	Creates a button with a <img> element.
 *
 * 	Creates a <img> element with the 'imgButton' class, the specified 'src' and a 'onclick' Attribute with the string provided.
 *
 * 	Args:
 * 		parent [DOM Element/String]
 * 			The element that the button should be created in.
 * 			Can also be the ID of the element.
 *
 * 		src [String]
 * 			The source of the image.
 *
 * 		onclick [String]
 * 			The 'onclick' attribute. Has to be a string and not a function.
 *
 * 	Returns [DOM Element]:
 * 		Returns the <img> element created.
 */
function ui_createImgButton (parent, src, onclick='') {
	//create the element
	let button = cElem('img', parent, {class: 'imgButton', src: src, onclick: onclick});

	return button;
}

/**	Updates a counter on the interface.
 *
 * 	Only updates the HTML element to be the same as what's in 'tracker_status'.
 *
 * 	Args:
 * 		counterName [String]
 * 			The full counter name like 'misc.distanceWalked'.
 *
 * 		player [Number]
 * 			The player. Starts at 1.
 */
function ui_updateCounter (counterName, player) {
	//get the stat
	const stat = tracker_getStat(counterName, player);

	//get all elements of this counter and this player
	const elems = document.querySelectorAll(`.tracker_counter[data-counter="${counterName}"][data-player="${player}"] > .tracker_counterText`);

	//update them
	for (const item of elems) {
		item.textContent = stat;
	}
}

/**	Creates a list of counters.
 *
 * 	This will add one counter for each bonus star in the series. [TODO: change this so it can be defined which counters should be made]
 *
 * 	Args:
 * 		parent [DOM Element/String]
 * 			The element that the counterlist should be created in.
 * 			Can also be the ID of the element.
 *
 * 		player [Number]
 * 			The player that the counter belongs to.
 */
function ui_createCounterList (parent, player) {
	//get all bonus stars
	const bonusStars = tracker_status['counters']['bonusStars'];

	//list all counters that have been made
	let countersMade = [];

	//loop through all bonus stars
	for (const key in bonusStars) {
		let counterName;

		//get the full counter name
			//if the counter is linked then get the linked counter instead
		if (bonusStars[key]['counterRelation'] === 'linked') {
			counterName = bonusStars[key]['relations']['linkTo'];

			//if the linked counter has already been made then skip it
			if (countersMade.indexOf(counterName) !== -1) {
				continue;
			}
		} else {
			counterName = `bonusStars.${key}`;
		}

		//push the counter to the list of counters that have been made
		countersMade.push(counterName);

		//This contains one counter.
		let counterElem = cElem('span', parent, {class: 'tracker_counter', 'data-counter': counterName, 'data-player': player});

		//counter image
			//note that this uses the bonus star icon because there's currently no icons for 'misc' counters
		cElem('img', counterElem, {class: 'tracker_counterImg', src: dbparsing_getIcon(`bonusStars.${key}`, tracker_status['game'])});

		//counter text
		let counterText = cElem('span', counterElem, {class: 'tracker_counterText'});
		counterText.textContent = 0;
	}
}

/**	Creates a list of all characters for the user to select.
 *
 * 	This will create a 'radio' input-field which creates one image for each character.
 * 	The 'autoAddToForm' attribute for the input-field is set to true.
 *
 * 	Args:
 * 		parent [DOM Element]
 * 			The element that this should be created in.
 *
 * 		game [String] <current game>
 * 			The name of the game. Can also be '_all'.
 * 			Defaults to using the currently selected game.
 *
 * 	Returns [DOM Element]:
 * 		The DOM element of the input-field.
 * 		Use 'inputfield_getValue(elem)' with this element as it's argument to get the character selected.
 */
function ui_createCharacterList (parent, game=tracker_status['game']) {
	//get all characters
	const characters = dbparsing_getCharacterList(game);

	let fieldOptions = [];

	//loop through all characters
	for (const key in characters) {
		const item = characters[key];

		//get image source
		const imgSrc = dbparsing_getIcon(`characters.${key}`, game);

		//get character name
		const fullName = item['metadata']['fullName'];

		fieldOptions.push({
			name: fullName,
			value: key,
			src: imgSrc
		});
	}

	//create the character selection
	return inputfield_createField('radio-image', parent, {options: fieldOptions, autoAddToForm: true});
}

/**	Creates a player selection.
 *
 * 	This creates a 'radio' input-field with 4 images, one for each player.
 * 	The 'autoAddToForm' attribute for the input-field is set to true.
 *
 * 	Args:
 * 		parent [DOM Element]
 * 			The element that this should be created in.
 *
 * 	Returns [DOM Element]:
 * 		The DOM element of the input-field.
 * 		Use 'inputfield_getValue(elem)' with this element as it's argument to get the player selected.
 */
function ui_createPlayerSelection (parent) {
	return inputfield_createField('radio-image', parent, {
		options: [
			{
				name: 'Player 1',
				value: '1',
				src: 'images/icons/misc/old/mp9/p1.png'
			},
			{
				name: 'Player 2',
				value: '2',
				src: 'images/icons/misc/old/mp9/p2.png'
			},
			{
				name: 'Player 3',
				value: '3',
				src: 'images/icons/misc/old/mp9/p3.png'
			},
			{
				name: 'Player 4',
				value: '4',
				src: 'images/icons/misc/old/mp9/p4.png'
			}
		]
	},
	autoAddToForm: true
	);
}