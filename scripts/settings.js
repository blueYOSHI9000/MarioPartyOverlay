// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

var settings_settings = {};

var settings_open = false;

/**	Opens and closes the settings window.
 */
function settings_toggleSettings () {
	if (settings_open === false) {
		document.getElementById('settings_container').style.display = 'block';
		settings_open = true;
	} else {
		document.getElementById('settings_container').style.display = 'none';
		settings_open = false;
	}
}