// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

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
function commonInterface_createCounterList (parent, player) {
	//get all bonus stars
	const bonusStars = trackerCore_status.counters.behaviour.bonusStars;

	//complain and return if it's not an object
	if (typeof bonusStars !== 'object') {
		console.error(`[MPO] commonInterface_createCounterList() could not find a 'bonusStars' object inside 'trackerCore_status.counters.behaviour': "${bonusStars}".`);
		return;
	}

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
		cElem('img', counterElem, {class: 'tracker_counterImg', src: dbparsing_getIcon(`bonusStars.${key}`, updatesTracker_getGame())});

		//counter text
		let counterText = cElem('span', counterElem, {class: 'tracker_counterText'});
		counterText.textContent = 0;
	}
}

/**	Creates a list of all characters for the user to select.
 *
 * 	This will create a 'radio' input-field which creates one image for each character.
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
function commonInterface_createCharacterSelection (parent, game=updatesTracker_getGame()) {
	parent = cElem('span', parent, {
		class: 'commonInterface_highlightCurrentPlayer'
	});

	//get all characters
	const characters = dbparsing_getCharacterList(game);

	for (const name in characters) {

		const imgSrc = dbparsing_getIcon(`characters.${name}`, game);

		const fullName = characters[name].metadata.fullName;

		cElem('img', parent, {
			src: imgSrc,
			class: 'charSelectButton imgButton',
			title: fullName,
			'data-charname': name
		});
	}

	const playerList = trackerCore_getSavefile().players;

	for (const playerNum in playerList) {
		let targetElem = parent.querySelector(`[data-charname="${playerList[playerNum].character}"]`);

		if (targetElem instanceof HTMLElement) {
			targetElem.classList.add(`player${playerNum}`);
		}
	}

	commonInterface_updatePlayerSelection(null, parent);
}

/**	Creates a player selection.
 *
 * 	This creates a 'radio' input-field with 4 images, one for each player.
 *
 * 	Args:
 * 		parent [DOM Element]
 * 			The element that this should be created in.
 *
 * 	Returns [DOM Element]:
 * 		The DOM element of the input-field.
 * 		Use 'inputfield_getValue(elem)' with this element as it's argument to get the player selected.
 */
function commonInterface_createPlayerSelection (parent) {
	parent = cElem('span', parent, {
		class: 'commonInterface_highlightCurrentPlayer'
	});

	const playerList = trackerCore_getSavefile().players;

	for (const playerNum in playerList) {

		cElem('img', parent, {
			src: `images/icons/misc/old/mp9/p${playerNum}.png`,
			class: `playerSelectButton player${playerNum} imgButton`,
			title: playerList[playerNum].name ?? `Player ${playerNum}`,
			'data-player': playerNum
		});
	}

	commonInterface_updatePlayerSelection(null, parent);
}

//needed for 'commonInterface_updatePlayerSelection()'
let commonInterface_currentPlayerSelected = 1;

/**	Highlights the currently selected player on various selections like the character select modal.
 *
 * 	Loops through all HTML elements with the 'commonInterface_highlightCurrentPlayer' CSS class (on all that can be found via 'document.querySelector()' anyway), unless specified otherwise.
 * 	Adds the 'imgButtonSelected' class on all elements that have the corresponding 'player#' CSS class (as in 'player1', 'player2', etc).
 * 	This will update ALL elements with the CSS class, meaning they will always be synchronized.
 *
 * 	Note that "currently selected player" means the player you want to update currently, see the character modal for reference. The tracker at its core doesn't have a "currently selected player".
 *
 * 	Args:
 * 		playerNum [Number/String/null] <last player selected>
 * 			The player that should be selected.
 * 			If this is null or undefined then it will simply use the player last selected (stored in 'commonInterface_currentPlayerSelected').
 *
 * 		specifics [Object]
 * 			Consists of the following:
 *
 * 				onlyElem [HTMLElement] <all with class 'commonInterface_highlightCurrentPlayer'>
 * 					If used, the function will only update this element.
 */
function commonInterface_updatePlayerSelection (playerNum=commonInterface_currentPlayerSelected, onlyElem) {
	if (typeof playerNum === 'string') {
		playerNum = Number(playerNum);
	}

	if (Number.isSafeInteger(playerNum) === true) {
		commonInterface_currentPlayerSelected = playerNum;
	} else {
		if (playerNum !== null) {
			console.warn(`[MPO] commonInterface_updatePlayerSelection() received an invalid 'playerNum' (has to be either a number or null): `, playerNum);
		}
		playerNum = commonInterface_currentPlayerSelected;
	}

	//create a list of all elements to loop through
		//if 'onlyElem' was specified (and is valid) then create an array with just that
		//otherwise actually fetch a list of all elements needed
	let list = (onlyElem instanceof HTMLElement) ? [onlyElem] : document.querySelectorAll('.commonInterface_highlightCurrentPlayer');

	for (const container of list) {
		container.setAttribute('data-currentplayer', playerNum);

		//remove 'imgButtonSelected'
		for (const imgElem of container.querySelectorAll('.imgButtonSelected')) {
			imgElem.classList.remove('imgButtonSelected');
		}

		//add 'imgButtonSelected'
		for (const imgElem of container.querySelectorAll(`.player${playerNum}`)) {
			imgElem.classList.add('imgButtonSelected');
		}
	}
}