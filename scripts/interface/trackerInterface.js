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