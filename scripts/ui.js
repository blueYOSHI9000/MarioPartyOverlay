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
function ui_createImgButton (parent, src, onclick) {
	//use a empty 'onclick' attribute if nothing is provided
	if (onclick === undefined) {
		onclick = '';
	}

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
	const elems = document.querySelectorAll(`.tracker_counter[counter="${counterName}"][player="${player}"] > .tracker_counterText`);

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
		let counterElem = cElem('span', parent, {class: 'tracker_counter', counter: counterName, player: player});

		//counter image
			//note that this uses the bonus star icon because there's currently no icons for 'misc' counters
		cElem('img', counterElem, {class: 'tracker_counterImg', src: dbparsing_getIcon(`bonusStars.${key}`, tracker_status['game'])});

		//counter text
		let counterText = cElem('span', counterElem, {class: 'tracker_counterText'});
		counterText.textContent = 0;
	}
}

/**	Creates a list of characters.
 *
 * 	This will create one image for each character of the specified game.
 *
 * 	Args:
 * 		parent [DOM Element/String]
 * 			The element that the character list should be created in.
 * 			Can also be the ID of the element.
 *
 * 		game [String] <current game>
 * 			The name of the game. Can also be '_all'.
 * 			Defaults to using the currently selected game.
 */
function ui_createCharacterList (parent, game) {
	//set game to the current game if it's not specified
	if (game === undefined) {
		game = tracker_status['game'];
	}

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
	inputfield_createField('radio-image', parent, {options: fieldOptions, onchange: (char) => {tracker_changeCharacter(1, char);}});
}