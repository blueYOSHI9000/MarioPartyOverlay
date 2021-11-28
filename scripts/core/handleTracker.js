// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	Gets the character used by a certain player.
 *
 * 	Args:
 * 		player [Number]
 * 			The player.
 *
 * 	Returns [String/Boolean]:
 * 		The name of character.
 * 		Will return false if the character couldn't be found.
 */
function handleTracker_getCharacter (player) {
	if (typeof player !== 'number') {
		console.warn(`[MPO] handleTracker_getCharacter() received a non-number as an argument: "${player}".`);
		return false;
	}

	//use 'player - 1' since it's an array starting at 0
		//if the character couldn't be found (is undefined) then it will simply return false
	return tracker_status.players[player - 1]?.character ?? false;
}

/**	Change the character of a single player.
 *
 * 	Args:
 * 		player [Number]
 * 			The player that should be updated.
 *
 * 		charName [String]
 * 			The name of the character as listed in the database.
 */
function handleTracker_changeCharacter(player, charName) {
	//get all character icons of this player
	const characterIcons = document.querySelectorAll(`.tracker_characterDisplay[data-player="${player}"] .tracker_characterIcon`);

	//get icon source for this character
	const src = dbparsing_getIcon(`characters.${charName}`, tracker_status['game']);

	for (const item of characterIcons) {
		//replace the image source
		item.src = src;
	}

	//update 'tracker_status'
	tracker_status['players'][player - 1]['character'] = charName;
}