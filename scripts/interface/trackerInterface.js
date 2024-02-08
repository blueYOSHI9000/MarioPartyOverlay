// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

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
function trackerInterface_updateCounter (counterName, player) {
	//get the stat
	const stat = updatesTracker_getStat(counterName, player);

	//get all elements of this counter and this player
	const elems = document.querySelectorAll(`.tracker_counter[data-counter="${counterName}"][data-player="${player}"] > .tracker_counterText`);

	//update them
	for (const item of elems) {
		item.textContent = stat;
	}
}

/**	Updates a character on the interface.
 *
 * 	Args:
 * 		player [Number]
 * 			The player. Starts at 1.
 */
function trackerInterface_updateCharacter (player) {
	//get character
	const charName = updatesTracker_getCharacter(player);

	//get all character icons of this player
	const characterIcons = document.querySelectorAll(`.tracker_characterDisplay[data-player="${player}"] .tracker_characterIcon`);

	//get icon source for this character
	const src = dbparsing_getIcon(`characters.${charName}`, updatesTracker_getGame());

	for (const item of characterIcons) {
		//replace the image source
		item.src = src;
	}
}

/**	This updates all visuals to be in-line with what is actually saved in 'trackerCore_status'.
 */
function trackerInterface_updateVisuals () {
	//get the current savefile
	const savefile = trackerCore_getSavefile();

	//this will be set to 'true' if a stat was found - mainly needed to error report if not a single counter can be found
		//this variable is dedicated to me wasting way too much time after updating the 'trackerCore_status' object and getting 0 errors despite nothing working
	let foundSomething = false;

	//the following loops through each stat for each player and then calls 'trackerInterface_updateCounter()' on each one

	//loop for each player
	for (playerKey in savefile.players) {

		//loop for each piece ('misc', 'bonusStars', etc.)
			//note that we loop through 'trackerCore_status.counters' because we need to loop through ALL AVAILABLE counters, not just the ones the player has stats for
			//though this only gets important on the next loop but it's best to use it here too
		for (pieceKey in trackerCore_status.counters.behaviour) {

			//loop for each stat ('distanceWalked', 'happeningStar', etc.)
			for (statKey in trackerCore_status.counters.behaviour[pieceKey]) {

				//update the counter
				trackerInterface_updateCounter(`${pieceKey}.${statKey}`, Number(playerKey));

				foundSomething = true;
			}
		}
	}

	//complain if nothing was found
		//but don't return yet, the rest of the function can still be useful (moreso than the previous bit anyway)
	if (foundSomething !== true) {
		console.error(`[MPO] trackerInterface_updateVisuals() could not find a single stat in 'trackerCore_status'.`);
	}

	//update all characters
	trackerInterface_updateCharacter(1);
	trackerInterface_updateCharacter(2);
	trackerInterface_updateCharacter(3);
	trackerInterface_updateCharacter(4);
}

/**	Change the color of the counter text.
 *
 * 	This will loop through every single item of class '.tracker_counterText' and apply the new color for each element.
 * 	If there's a better way to do this then please use that instead of this.
 *
 * 	Args:
 * 		newColor [String]
 * 			The new color in the format of '#FFFFFF' (that being white).
 * 			This function does NOT check whether this is valid or not. It simply applies it without thinking.
 */
function trackerInterface_changeCounterColor (newColor) {
	//get all elements that should be modified
	let elemList = document.querySelectorAll('.tracker_counterText');

	//loop through them all and replace the color
	for (item of elemList) {
		item.style.color = newColor;
	}
}

/** Handles a click on a counter by the user.
 *
 * 	Mostly because this logic would be too much for 'listeners_pointerDown'.
 * 	Really only needed to handle a null amount properly.
 *
 * 	Args:
 * 		counterName [String]
 * 			Name of the counter clicked on.
 *
 * 		player [Number/String]
 * 			Name of the player  clicked on. Can be a number in String form.
 */
function trackerInterface_clickOnCounter (counterName, player) {
	//convert to number
	player = +player;

	//if the amount is '?' (meaning, "ask the user")
	if (updatesTracker_getAmount() === null) {
		//ask about the amount in a modal (and disallow null)
		handleNavbar_askForAmountModal((amount) => {updatesTracker_updateCounter(counterName, player, updatesTracker_getAction(), amount);}, false);

	} else {
		//action and amount will be gotten by the function automatically
		updatesTracker_updateCounter(counterName, player)
	}
}