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