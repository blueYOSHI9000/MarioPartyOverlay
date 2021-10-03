/**	Gets a list of bonus stars in object form.
 *
 * 	Simply gets the 'bonusStars' object from the database.
 * 	The '_array' property will be removed as the keys can be gotten via "for ... in".
 *
 * 	Args:
 * 		game [String]
 * 			The name of the game. Can also be '_all'.
 *
 * 	Returns [Object]:
 * 		Returns the 'bonusStars' object of the specified game from the database.
 */
function dbparsing_getBonusStarList (game) {
	//use try catch in case game doesn't have a list of bonus stars
	try {
		//get bonus star list
		var obj = mpdb[game]['bonusStars'];

		//remove '_index'
		delete obj['_index'];
	} catch (e) {
		return {};
	}
	return obj;
}

/**	Gets a list of characters in object form.
 *
 * 	Simple gets the 'characters' object from the database.
 * 	The '_array' property will be removed as the keys can be gotten via "for ... in".
 *
 * 	Args:
 * 		game [String]
 * 			The name of the game. Can also be '_all'.
 *
 * 	Returns [Object]:
 * 		Returns the 'characters' object of the specified game from the database.
 */
function dbparsing_getCharacterList (game) {
	//use try catch in case game doesn't have a list of characters
	try {
		//get character list
		var obj = mpdb[game]['characters'];

		//remove '_index'
		delete obj['_index'];
	} catch (e) {
		return {};
	}
	return obj;
}

/**	Gets the correct icon from the database.
 *
 * 	Args:
 * 		path [String]
 * 			The path to the correct object inside the database starting from inside the game.
 * 			To get the character icon for Mario you'd use 'characters.mario' (note: do not include 'mp1.' or '_all.' since that gets added automatically).
 *
 * 		game [String]
 * 			The name of the game. Can also be '_all'.
 *
 * 		check_all [Boolean] <true>
 * 			If '_all' should be checked. It won't check it twice if 'game' already is '_all'.
 * 			This is useful for something like character icons since '_all' might have different icons than the game.
 *
 * 	Returns [String]:
 * 		The full file-path to the image so it can be used as a 'src' attribute on an image.
 */
function dbparsing_getIcon (path, game, check_all) {
	//split 'path' into an array
	path = path.split('.');

	//make sure '_all' isn't checked twice
	if (game === '_all') {
		check_all = false;
	}

	//list of icons found
		//this will be the object that's found inside 'item' arrays in the database
		//this means these will be objects with the properties 'filePath' and 'iconTheme'
	let icons = [];

	//=== get the actual list of possible icons ===

	//these mark if the specified game has been checked and if '_all' has been checked
	let gameChecked = false;
	let allChecked  = false;

	while (allChecked === false) {
		//used to access the database
		let obj = mpdb[game];

		//wrap everything in a try catch in case a object doesn't exist
		try {
			//go the next object specified in 'path'
			for (const item of path) {
				obj = obj[item];
			}

			//get the actual 'icon' array
			obj = obj['metadata']['icon'];

			//add all the icons found to the array
			for (const item of obj) {
				icons.push(item);
			}
		} catch (e) {
			console.warn(`[MPO] dbparsing_getIcon() couldn't find an object. path: "${path.join('.')}" - game: "${game}"`);
		}

		//if game hasn't been checked yet then mark it as checked
		if (gameChecked === false) {
			gameChecked = true;

			//check if '_all' has to be checked as well
				//if yes then replace the game with '_all'
				//if no then break the loop since everything has been checked
			if (check_all !== false) {
				game = '_all';
			} else {
				break;
			}

		//if the game has already been checked then this is the 2nd loop which means everything has been checked.
		} else {
			break;
		}
	}

	//=== go through the found icons and check which theme should be used ===

	//return a image of boo if no icon could be found
		//TODO: replace this with an actual 404 image
	if (icons.length < 1) {
		return 'images/icons/characters/starRushIcon/boo.png'
	}

	//just return the first one because we don't even have a theme system
	return 'images/' + icons[0].filePath;
}