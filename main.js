/*
* Resets or starts the highlighting feature by calling callHighlight().
*/
function resetHighlights () {
	if (getValue('enableHighlight') == false) {
		callHighlight(true);
	} else {
		callHighlight();
	}
}

/*
* Calls highlight() for all counters to either reset/start the highlighting or to change the color of it.
*
* @param {boolean} resetHighlights If highlighting should be turned off.
* @param {boolean} all If all counters should be called.
* @param {boolean} stars If the bonus stars should be counted instead.
*/
function callHighlight (resetHighlights, all, stars) {
	if (resetHighlights === true) {
		var originalHighlightColor = getValue('highlightColor');
		var textColor = getValue('textColor');
		editValue('highlightColor', textColor);
	}

	if (getValue('enableHighlight') === true || resetHighlights === true || all === true || stars === true) {
		for (let num = 0; num < counters.length; num++) {
			if (getValue(counters[num] + 'OnOff') === true || all === true) {
				highlight(counters[num], stars);
			}
		}
		if (getValue('slowOnOff') === true) {
			slowHighlight(true);
		}
		if (getValue('unusedOnOff') === true) {
			slowHighlight(true, 'unused');
		}
	}

	if (resetHighlights === true) {
		editValue('highlightColor', originalHighlightColor);
	}
}

/*
* Updates the highlighting for a certain counter in case the bonus star(s) has changed.
*
* @param {string} counter Which counter should be updated.
* @param {string} stars If the bonus star counter should be updated instead.
*/
function highlight (counter, stars) {
	if (counter === 'Stars' || counter === 'Coins' || counter === 'stars' || counter === 'coins') {
		return;
	}
	counter = counter.charAt(0).toUpperCase() + counter.slice(1);

	var counterP1 = getInner('p1' + counter + 'Text');
	var counterP2 = getInner('p2' + counter + 'Text');
	var counterP3 = getInner('p3' + counter + 'Text');
	var counterP4 = getInner('p4' + counter + 'Text');

	if (counter === 'Almost' || counter === 'Loner' || counter === 'Wanderer') {
		var counterNum = Math.min(counterP1, counterP2, counterP3, counterP4);
	} else {
		var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4);
	}

	if (stars === true) {
		if (getValue(counter[0].toLowerCase() + counter.substring(1) + 'OnOff') != true)
			return;

		if (counterP1 == 0 && counterP2 == 0 && counterP3 == 0 && counterP4 == 0) {} else {
			if (counterNum == counterP1) {
				bonusStars[1]++;
			}
			if (counterNum == counterP2) {
				bonusStars[2]++;
			}
			if (counterNum == counterP3) {
				bonusStars[3]++;
			}
			if (counterNum == counterP4) {
				bonusStars[4]++;
			}
		}
	} else {
		var textColor = getValue('textColor');
		var highlightColor = getValue('highlightColor');

		if (counterP1 == 0 && counterP2 == 0 && counterP3 == 0 && counterP4 == 0) {
			getElem('p1' + counter + 'Text').style.color = textColor;
			getElem('p2' + counter + 'Text').style.color = textColor;
			getElem('p3' + counter + 'Text').style.color = textColor;
			getElem('p4' + counter + 'Text').style.color = textColor;
		} else {
			if (counterNum == counterP1) {
				getElem('p1' + counter + 'Text').style.color = highlightColor;
			} else {
				getElem('p1' + counter + 'Text').style.color = textColor;
			}

			if (counterNum == counterP2) {
				getElem('p2' + counter + 'Text').style.color = highlightColor;
			} else {
				getElem('p2' + counter + 'Text').style.color = textColor;
			}

			if (counterNum == counterP3) {
				getElem('p3' + counter + 'Text').style.color = highlightColor;
			} else {
				getElem('p3' + counter + 'Text').style.color = textColor;
			}

			if (counterNum == counterP4) {
				getElem('p4' + counter + 'Text').style.color = highlightColor;
			} else {
				getElem('p4' + counter + 'Text').style.color = textColor;
			}
		}
	}
}

/*
* Turns the slow star feature on or off.
*/
function slowStar () {
	if (getValue('runningOnOff') == false && getValue('slowOnOff') == true) {
		editValue('runningOnOff', true);
		displayOnOff('running', false, true);
	}

	if (getValue('slowOnOff') == true && getValue('enableHighlight') == true) {
		slowHighlight();
	} else if (getValue('enableHighlight') == true) {
		highlight('running');
	}
}

/*
* Turns the slow star feature on or off.
*/
function unusedStar () {
	if (getValue('itemOnOff') == false && getValue('unusedOnOff') == true) {
		editValue('itemOnOff', true);
		displayOnOff('item', false, true);
	}

	if (getValue('unusedOnOff') == true && getValue('enableHighlight') == true) {
		slowHighlight(false, 'unused');
	} else if (getValue('enableHighlight') == true) {
		highlight('item');
	}
}

/*
* Highlights the slow star.
*
*
* @param {string} counter If Slow or Unused should be calculated.
*/
function slowHighlight (stars, counter) {
	if (counter === 'unused') {
		counter = 'Item';
	} else {
		counter = 'Running';
	}
	var counterP1 = getInner('p1' + counter + 'Text');
	var counterP2 = getInner('p2' + counter + 'Text');
	var counterP3 = getInner('p3' + counter + 'Text');
	var counterP4 = getInner('p4' + counter + 'Text');

	var counterNumMax = Math.max(counterP1, counterP2, counterP3, counterP4);
	var counterNumMin = Math.min(counterP1, counterP2, counterP3, counterP4);

	if (stars === true) {
		if (counterP1 == 0) {} else if (counterNumMin == counterP1) {
			bonusStars[1]++;
		}
		if (counterP2 == 0) {} else if (counterNumMin == counterP2) {
			bonusStars[2]++;
		}
		if (counterP3 == 0) {} else if (counterNumMin == counterP3) {
			bonusStars[3]++;
		}
		if (counterP4 == 0) {} else if (counterNumMin == counterP4) {
			bonusStars[4]++;
		}
	} else {
		var highlightColor = getValue('highlightColor');
		var textColor = getValue('textColor');

		if (counterP1 == 0) {
			getElem('p1' + counter + 'Text').style.color = textColor;
		} else if (counterNumMax == counterP1 || counterNumMin == counterP1) {
			getElem('p1' + counter + 'Text').style.color = highlightColor;
		} else {
			getElem('p1' + counter + 'Text').style.color = textColor;
		}

		if (counterP2 == 0) {
			getElem('p2' + counter + 'Text').style.color = textColor;
		} else if (counterNumMax == counterP2 || counterNumMin == counterP2) {
			getElem('p2' + counter + 'Text').style.color = highlightColor;
		} else {
			getElem('p2' + counter + 'Text').style.color = textColor;
		}

		if (counterP3 == 0) {
			getElem('p3' + counter + 'Text').style.color = textColor;
		} else if (counterNumMax == counterP3 || counterNumMin == counterP3) {
			getElem('p3' + counter + 'Text').style.color = highlightColor;
		} else {
			getElem('p3' + counter + 'Text').style.color = textColor;
		}

		if (counterP4 == 0) {
			getElem('p4' + counter + 'Text').style.color = textColor;
		} else if (counterNumMax == counterP4 || counterNumMin == counterP4) {
			getElem('p4' + counter + 'Text').style.color = highlightColor;
		} else {
			getElem('p4' + counter + 'Text').style.color = textColor;
		}
	}
}

/*
* Updates the star counter image.
*
* @param {string} image Which image should be used.
*/
function changeStars (image) {
	var source = '';

	if (image) {} else {
		if (curGame == 'mp10') {
			if (getValue('miniStarsOnOff') == true) {
				image = 'miniStars';
				editValue('bananasOnOff', false);
			} else {
				image = 'stars';
				editValue('bananasOnOff', false);
				editValue('miniStarsOnOff', false);
			}
		}
	}

	if ((getValue('miniStarsOnOff') == true || getValue('bananasOnOff') == true) && getValue('starsOnOff') == false) {
		editValue('starsOnOff', true);
		displayOnOff('stars', false, true);
	}

	if (image == 'miniStars' && getValue('miniStarsOnOff') == true) {
		editValue('bananasOnOff', false);
		source = 'ministar';
	} else if (image == 'bananas' && getValue('bananasOnOff') == true) {
		editValue('miniStarsOnOff', false);
		source = 'banana';
	} else {
		source = 'stars';
	}

	for (let num = 1; num < 5; num++) {
		if (curGame != 'all') {
			getElem('p' + num + 'StarsDisplay').src = 'img/' + curGame + '/' + source + '.png';
		} else {
			getElem('p' + num + 'StarsDisplay').src = 'img/' + source + '.png';
		}
	}
}

/*
* Uses default icon for star counter in case a custom one doesn't exist.
*/
function changeStarsError (elem) {
	var id = elem.id;
	if (getValue('miniStarsOnOff') == true) {
		getElem(id).src = 'img/ministar.png';
	} else if (getValue('bananasOnOff') == true) {
		getElem(id).src = 'img/banana.png';
	} else {
		getElem(id).src = 'img/stars.png';
	}
	for (let num = 0; num < 3; num++) {
		switch (num) {
			case 0:
				elem = 'ministar';
			case 1:
				elem = 'banana';
			case 2:
				elem = 'stars';
		}

	var elem2 = getElem('starsOnOff');
	elem2 = elem2.parentNode;

	elem2.children[2].style = 'background-image: url(img/stars.png);';
	}
}

/*
* Hides and shows counters after pressing the "on/off" buttons.
*
* @param {string} counter Which counter should be hidden/shown.
* @param {boolean} start Hide/show certain counters depending on what they should be (used when loading the site).
*/
var callSlowStar = true;
var callUnusedStar = true;
function displayOnOff (counter, start, force) {
	if (popout == false && popoutActivated == true && force != true) {
		if (getValue(counter + 'OnOff') == true) {
			editValue(counter + 'OnOff', false);
		} else {
			editValue(counter + 'OnOff', true);
		}
	}

	if (getValue(counter + 'OnOff') == false) {
		var displayVar = 'none';
		if (counter == 'running' && getValue('slowOnOff') == true) {
			editValue('slowOnOff', false);
			highlight('running');
		}
		if (counter === 'item' && getValue('unusedOnOff') === true) {
			editValue('unusedOnOff', false);
			highlight('item');
		}
		if (counter == 'stars' && getValue('miniStarsOnOff') == true) {
			editValue('miniStarsOnOff', false);
		} else if (counter == 'stars' && getValue('bananasOnOff') == true) {
			editValue('bananasOnOff', false);
		}

	} else {
		if (counter == 'coinStar') {
			var displayVar = '';
		} else {
			var displayVar = 'block';
		}
	}

	if (counter == 'coinStar') {
		getElem('coinStarFullDiv').style.display = displayVar;
		if (getValue('coinStarOnOff') == false) {
			editValue('p1CoinStarTie', false);
			editValue('p2CoinStarTie', false);
			editValue('p3CoinStarTie', false);
			editValue('p4CoinStarTie', false);
			coinStarTie();
		}
		return;
	}

	var counterClass = document.querySelectorAll('.' + counter);

	for (var num = 0; num < counterClass.length; num++) {
		counterClass[num].style.display = displayVar;
	}

	if (start) {} else if (callSlowStar === true && counter === 'running') {
		slowStar();
		callSlowStar = false;
	}
	if (start) {} else if (callUnusedStar === true && counter === 'item') {
		unusedStar();
		callUnusedStar = false;
	}
	if (getValue('starsOnOff') == true || counter == 'stars') {
		updateStars();
		changeStars();
	}
	if (popout != true && startup === false) {
		slots['c' + slots.sel][counter + 'OnOff'] = getValue(counter + 'OnOff');
		localStorage.setItem('c' + slots.sel, JSON.stringify(slots['c' + slots.sel]));
	}
}

/*
* Calls displayOnOff() when loading the page.
*/
function callDisplayOnOff () {
	for (let num = 0; num < counters.length; num++) {
		displayOnOff(counters[num], true, true);
	}
	displayOnOff('coinStar', true, true);
}

/*
* Show/Hide a certain element.
* Adds or removes the classes "hidden" and "visible" which respectively hides and shows a element based on a id given.
*
* @param {array} ids Which elements should be hidden or shown.
*/
function showHideDiv (ids) {
	for (let num = 0; num < ids.length; num++) {
		var div = getElem(ids[num]).classList;
		for (let num2 = 0; num2 < div.length; num2++) {
			if (div[num2] == 'hidden') {
				var cont = true;
				break;
			}
		}

		if (cont === true) {
			getElem(ids[num]).classList.add('visible');
			getElem(ids[num]).classList.remove('hidden');
		} else {
			getElem(ids[num]).classList.remove('visible');
			getElem(ids[num]).classList.add('hidden');
		}
	}
}

var openedSettings = 'generalMPO';
var scrollPos = {
	generalMPO: 0,
	slots: 0,
	shortcut: 0, // === assist settings arent closing when changing tabs before assist loaded
	player: 0,
	counter: 0,
	tutorial: 0
}
/*
* Show certain settings and hide all others, also updates the cursor.
*
* @param {string} id Which settings should be shown.
*/
function showHideSettings (id) {
	if (popout === true) {
		sendMessage('showHideSettings+' + id);
	}

	scrollPos[openedSettings] = getElem('settingsMain').scrollTop;
	openedSettings = id;

	var ids = ['generalMPO', 'slots', 'shortcut', 'player', 'counter', 'tutorial'];
	for (let num = 0; num < ids.length; num++) {
		getElem(ids[num] + 'Settings').classList.add('hidden');
		getElem(ids[num] + 'Settings').classList.remove('visible');
		getElem(ids[num] + 'Selector').classList.remove('settingsSelected');
		getElem(ids[num] + 'SelectorBreak').classList.remove('settingsSelected');
	}
	getElem(id + 'Settings').classList.add('visible');
	getElem(id + 'Settings').classList.remove('hidden');
	getElem(id + 'Selector').classList.add('settingsSelected');
	getElem(id + 'SelectorBreak').classList.add('settingsSelected');

	if (id == 'shortcut') {
		getElem('shortcutHeader').style.display = 'block';
		getElem('shortcutHeaderBorder').style.display = 'block';
		getElem('settingsMain').classList.add('scroll');
	} else {
		getElem('shortcutHeader').style.display = 'none';
		getElem('shortcutHeaderBorder').style.display = 'none';
		getElem('settingsMain').classList.remove('scroll');
	}

	if (shortcutLoaded === true) {
		getAlly('close');
	}
	shortcutSettings(true); //can be still be opened despite shortcuts not being loaded

	if (id === 'counter') {
		updateCounterList();
	}

	updateUnderline(id + 'Selector');

	getElem('settingsMain').scrollTop = scrollPos[openedSettings];
}

/*
* Updates the underline position that's below the settings tabs.
*
* @param {string} id The id of the tab.
*/
function updateUnderline (id) {
	var rect = getElem(id).getBoundingClientRect();
	var containerRect = getElem('settingsSelectionSpan').getBoundingClientRect();
	getElem('settingsSelectionUnderline').style.width = rect.width + 'px';
	getElem('settingsSelectionUnderline').style.left = rect.left - containerRect.left + 'px';
	//getElem('settingsSelectionUnderline').style.left = getElem(id).offsetLeft + 'px';
}

var test;
/*
* Closes the settings & navbar dropdown if the user doesn't click on the settings or navbar dropdown while they are opened.
*
* @param {string} event What event got fired.
*/
function windowOnClick (event) {
	if (event.target === getElem('settings')) {
		closeSettings();
		if (shortcutLoaded == true) {
			getAlly('close');
			shortcutSettings(true);
		}
	}
	test = event.target;
	if (event.target === getElem('navbar')) {
		closeNavbar();
	}
}

/*
* Checks if Ctrl & Shift is pressed.
*/
function ctrlPressed (e, ctrl, shift, key) {
	if (getValue('useHotkeys') != true) {
		return;
	}
	if (ctrl || shift || key) {
		ctrl = stringToBoolean(ctrl);
		shift = stringToBoolean(shift);
	} else {
		ctrl = e.ctrlKey;
		shift = e.shiftKey;
		key = e.key;
	}
	if (popout == true && ((e.key == 'Control' && ctrlKeyVar === false) || (e.key == 'Shift' && shiftKeyVar === false))) {
		sendMessage('ctrlPressed+x+' + ctrl + '+' + shift + '+' + key);
	}
	if (ctrl && ctrlKeyVar == false) {
		ctrlKeyVar = true;
		getElem('nvCtrlHeld').style.display = 'inline-block';
		switchAction();
	} else if (shift && shiftKeyVar == false) {
		shiftKeyVar = true;
		getElem('nvShiftHeld').style.display = 'inline-block';
		updateAmount();
	} else {
		switch (key) {
			case '1':
				ga.ogAmount = 1;
				updateAmount();
				break;
			case '5':
				ga.ogAmount = 5;
				updateAmount();
				break;
			case '0':
				ga.ogAmount = 10;
				updateAmount();
				break;
			case 'Escape':
				if (popout != true) {
					closeSettings();
				}
				break;
		}
	}
}

/*
* Checks if Ctrl & Shift is released.
*
* @param {object} e Event.
* @param {string} key The key that got released, overrides event.
* @param {boolean} force Force runs it if true.
*/
function ctrlReleased (e, key, force) {
	if (getValue('useHotkeys') != true && force != true) {
		return;
	}
	if (key) {} else {
		key = e.key;
	}
	if (popout === true) {
		sendMessage('ctrlReleased+x+' + key + '+' + force);
	}
	if (key === 'Control' && ctrlKeyVar === true) {
		ctrlKeyVar = false;
		getElem('nvCtrlHeld').style.display = 'none';
		switchAction();
	} else if (key === 'Shift' && shiftKeyVar === true) {
		shiftKeyVar = false;
		getElem('nvShiftHeld').style.display = 'none';
		ga.amount = ga.ogAmount;
		editInner('nvAmountText', ga.amount);
	}
}

var ctrlKeyVar = false;
var shiftKeyVar = false;
window.onkeydown = ctrlPressed;
window.onkeyup = ctrlReleased;

var shortcutLoaded = false;
var shortcutLoadType = 0; //0 = continue/setup game | 1 = force setup start | 2 = quick start
/*
* Loads the assist files to start the shortcut feature.
*
* @param {number} type How it should be started, see shortcutLoadType var.
*/
function prepareShortcut (type) {
	if (shortcutLoaded === true) {
		startShortcut();
		return;
	}
	if (isNaN(type) === false) {
		shortcutLoadType = type;
	}
	var scripts = ['assist-misc.js', 'assist-minigame.js', 'assist-turn.js', 'assist-spaces.js', 'assist-core.js']; //Reminder that the browser finishes loading these in a seemingly random order, THEY ARE NOT LOADED IN THE ORDER HERE
	for (let num = 0; num < scripts.length; num++) {
		var script = document.createElement("script");

		script.src = scripts[num];
		//script.src = scripts[num] + '?' + (Date.now() % 10000); //create a unique filename because chrome fucking sucks and just loads a 10 year old version of the file

		shortcutLoaded = true;
		getElem('shortcutSettingsButton').disabled = '';

		document.head.appendChild(script);
	}
}

/*
* Opens normal settings or puts popout on top if it's activated.
*
* @param {boolean} force If true, opens settings on main regardless of the auto-popout option.
*/
function openSettings (force) {
	if (force === true || force === 'true') {
		getElem('settings').style.visibility = 'visible';
		getElem('settings').style.opacity = 1;
		getElem('settings').style.pointerEvents = 'unset';
		return;
	}
	if (popoutActivated == true) {
		window.open('', 'mpoSettings');
	} else if (getValue('autoPopout') == true) {
		mpoSettingsPopout();
	} else {
		getElem('settings').style.visibility = 'visible';
		getElem('settings').style.opacity = 1;
		getElem('settings').style.pointerEvents = 'unset';
	}
	newSettingsHint();

	if (getElem('counterSettings').classList.contains('visible')) {
		updateCounterList();
	}
}

//hint system is not actually visible currently due to lack of worthwile hints and issues with small screens not being able to fully display it.
var settingsHints = [	//'Hover over this to read the full tip.', //not implemented on tutorial version
						'Click on this text to get another tip.',
						'Click on the gear while holding <i>Ctrl</i> to open settings directly.',
						'Click on the gear while holding <i>Shift</i> to copy text output directly.',
						'Hold <i>Ctrl</i> to select a character that\'s already been selected.',
						'Hold <i>Ctrl</i> when randomizing to randomize all characters instead of just the current one.',
						'Click on a character while holding <i>Ctrl</i> to make them the only coin star holder.',
						'Press the <i>1</i>, <i>5</i> or <i>0</i> key to set the amount to add/subtract to that number.'];
/*
* Gets a new hint and displays it in settings.
*/
function newSettingsHint () {
	var str = settingsHints[randomCharFor(settingsHints.length)];
	editInner('settingsHints', str);
	editInner('tutorialHints', str);
	getElem('settingsHintsContainer').title = str;
}

/*
* Closes settings.
*/
function closeSettings () {
	if (popout === true) {
		return;
	}
	getElem('settings').style.visibility = 'hidden';
	getElem('settings').style.opacity = 0;
	getElem('settings').style.pointerEvents = 'none';

	if (shortcutLoaded == true) {
		getAlly('close');
		shortcutSettings(true);
	}

	saveSettings();
	savePlayers();
	saveAssist();
}

/*
* Calls a function for the main site and the settings popout (if activated).
*
* @param {string} functionName The function that shoudl be called (without the '()').
* @param {array} attributes The attributes that the function should use.
*/
function callOnBoth (functionName, attributes) {
	//console.log('functionName: '  + functionName + ', attributes: ' + attributes);
	if (popout === true || popoutActivated === true) {
		if (attributes) {
			sendMessage(functionName + '+' + attributes.join('+'));
		} else {
			sendMessage(functionName);
		}
	}
	executeFunctionByName(functionName, attributes);
}

/*
* Changes browser settings. Called everytime an option gets changed.
*
* @param {string} id The id of the option.
*/
function changeSettings (id) {
	editValueOnBoth(id, getValue(id));

	switch (id) {
		case 'hideAdvanced':
			callOnBoth('hideAdvancedSettings', [id]);
			break;

		// FEATURES
		case 'settingsFullscreen':
			callOnBoth('settingsFullscreen');
			break;
		case 'useSW':
			callOnBoth('runSW');
			break;
		case 'enableHighlight':
			callOnBoth('resetHighlights');
			break;
		case 'highlightColor':
			callOnBoth('callHighlight', [false, true]);
			break;
		case 'deactivateUnused':
			callOnBoth('deactivateUnused');
			break;
		case 'bonusDont':
		case 'bonusCombine':
		case 'bonusSeperately':
			updateStars();
			break;
		case 'noTie':
			callOnBoth('coinStarTie');
			break;
		case 'useHotkeys':
			if (getValue('useHotkeys').checked === false) {
				ctrlReleased(null, 'Control', true);
				ctrlReleased(null, 'Shift', true);
			}
			break;

		// INTERFACE
		case 'bgColor':
			callOnBoth('changeBGColor', ['bgColor']);
			break;
		case 'greenscreen':
			callOnBoth('changeTheme');
			break;
		case 'textColor':
			callOnBoth('changeTextColor', ['textColor']);
			break;
		case 'mpsrIcons':
		case 'mk8Icons':
			callOnBoth('changeCharacters');
			callOnBoth('changeCharSelectionIcons');
			break;
		case 'customGameIcons':
			callOnBoth('changeCharacters');
			callOnBoth('changeCounterIcons');
			break;
		case 'xBelow100':
			callOnBoth('displayXBelow100');
			break;
		case 'layoutHorizontal':
		case 'layoutVertical':
			callOnBoth('changeLayout');
			break;

		// TEXT OUTPUT
		case 'toUseActive':
			callOnBoth('updateCounterInput');
			break;
		case 'toOutput':
			textOutputTest(true);
			break;
		case 'toCounters':
			textOutputTest();
			break;
	}
	saveSettings();
}

/*
* Changes Themes incl. greenscreen.
*
* @param {number} theme Which theme should be used.
*/
var bgColor = '#0000ff';
var curTheme = 'default';
function changeTheme (theme) {
	if (!theme) {
		theme = curTheme;
	} else {
		getElem('theme' + capStr(curTheme)).style = '';
		getElem('theme' + capStr(curTheme)).disabled = '';
		getElem('theme' + capStr(theme)).style = 'border-color: green;';
		getElem('theme' + capStr(theme)).disabled = 'true';
		curTheme = theme;
	}
	if (getValue('greenscreen') === true) {
		getElem('bodyElement').style.backgroundImage = 'unset';
		getElem('bodyElement').style.backgroundColor = bgColor;
	} else {
		getElem('bodyElement').style.backgroundImage = 'url("img/bgs/' + theme + '.jpg"), url("img/bgs/default.jpg")';
		getElem('bodyElement').style.backgroundColor = 'unset';
	}

	if (popout != true && startup === false) {
		saveSettings();
	}
}

/*
* Changes background color if greenscreen is used.
*
* @param {string} id Id of the input element that changed its value.
*/
function changeBGColor () {
	bgColor = getValue('bgColor');
	if (getValue('greenscreen') === true) {
		getElem('bodyElement').style.backgroundColor = bgColor;
		getElem('bodyElement').style.backgroundImage = 'unset';
	}
	editValue('bgColor', bgColor);
}


/*
* Resets the Greenscreen color.
*/
function resetBGColor () {
	editValue('bgColor', '#0000FF');
	changeBGColor('bgColor');
}

/*
* Changes text color for everything outside of settings.
*
* @param {string} id Id of the input element that changed its value.
*/
function changeTextColor (id) {
	var counterText = document.querySelectorAll('.counterText');
	var turns = document.querySelectorAll('.turns');

	var color = getValue(id);

	for (var num = 0; num < counterText.length; num++) {
		counterText[num].style.color = color;
	}
	for (var num = 0; num < turns.length; num++) {
		turns[num].style.color = color;
	}

	editValue('textColor', color);
	callHighlight();
}

/*
* Resets the Text color.
*/
function resetTextColor () {
	editValue('textColor', '#FFFFFF');
	changeTextColor('textColor');
}

/*
* Hides advanced settings in the "General" tab.
*/
function hideAdvancedSettings () {
	var advanced = document.querySelectorAll('.advanced');

	if (getValue('hideAdvanced') === true) {
		var disVar = 'none';
	} else {
		var disVar = 'unset';
	}

	for (var num = 0; num < advanced.length; num++) {
		advanced[num].style.display = disVar;
	}
}

/*
* Switches from vertical layout to horizontal and back.
*/
function changeLayout () {
	if (getValue('layoutHorizontal') === true) {
		var elems = document.querySelectorAll('.player');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.display = 'flex';
			elems[num].style.height = '116px';
		}

		var elems = document.querySelectorAll('.characterDiv');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.top = '-6px';
		}

		var elems = document.querySelectorAll('.characterImg');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.marginRight = '0';
		}

		var elems = document.querySelectorAll('.player .draggable:nth-child(n+2)');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.width = '130px';
			elems[num].style.marginTop = '7px';
		}

		var elems = document.querySelectorAll('.starsHitbox');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.width = '130px';
		}

	} else {
		var elems = document.querySelectorAll('.player');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.display = '';
			elems[num].style.height = '';
			elems[num].style.marginLeft = '';
		}

		var elems = document.querySelectorAll('.characterDiv');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.position = '';
			elems[num].style.top = '';
		}

		var elems = document.querySelectorAll('.characterDiv div');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.left = '';
		}

		var elems = document.querySelectorAll('.characterImg');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.marginRight = '65px';
		}

		var elems = document.querySelectorAll('.player .draggable:nth-child(n+2)');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.width = '';
			elems[num].style.marginTop = '';
		}

		var elems = document.querySelectorAll('.starsHitbox');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.width = '190px';
		}
	}
}

/*
* Adds or removes the x before counters depending on the setting.
*/
function displayXBelow100 () {
	var activated = getValue('xBelow100');

	var elems = document.querySelectorAll('.counterText');
	for (var num = 0; num < elems.length; num++) {
		if (parseInt(elems[num].innerText) < 100 && activated === true) {
			elems[num].classList.add('counterBelow100');
		} else {
			elems[num].classList.remove('counterBelow100');
		}
	}
}

/*
* Displays settings in fullscreen if enabled.
*/
function settingsFullscreen () {
	if (getValue('settingsFullscreen') === true || popout === true) {
		getElem('settingsContent').classList.add('settingsContentPopout');
		getElem('settingsContent').classList.remove('popupContent');
		getElem('settingsContent').classList.remove('settingsPopup');
	} else {
		getElem('settingsContent').classList.remove('settingsContentPopout');
		getElem('settingsContent').classList.add('popupContent');
		getElem('settingsContent').classList.add('settingsPopup');
	}
	updateUnderline(document.querySelector('.settingsSelected').id);
}

/*
* Opens shortcut settings before shortcut is actually opened. This function gets overwritten by the one in assist-misc.js.
*
* @param {boolean} close If it should be closed or not.
*/
function shortcutSettings (close) {
	if (close === true) {
		getElem('settingsMain').style = '';
		getElem('shortcutSettings').style = '';
		getElem('settingsMain').onclick = '';
		getElem('shortcutSettingsPopup').style.pointerEvents = 'none';
		getElem('shortcutSettingsPopup').style.visibility = 'hidden';
		getElem('shortcutSettingsPopup').style.opacity = 0;
		return;
	}

	getElem('shortcutVariablesError').style.display = 'unset';
	getElem('shortcutVariables').style.display = 'none';

	getElem('settingsMain').style = '-webkit-filter: blur(5px); filter: blur(5px);';
	getElem('shortcutSettings').style = 'pointer-events: none;'; //filter and pointer event need to be different as blur wouldn't be smooth with 'shortcutSettings' and pointer-event would remove onClick
	getElem('shortcutSettingsPopup').style.pointerEvents = 'unset';
	getElem('shortcutSettingsPopup').style.visibility = 'visible';
	getElem('shortcutSettingsPopup').style.opacity = 1;
	setTimeout(function () {getElem('settingsMain').setAttribute('onclick','shortcutSettings(true)');}, 10); //required because chrome would immediately execute the function if it was changed directly
}

/*
* Capitalize a string.
*
* @param {string} str The string to capitalize.
* @param {boolean} reverse Convert first letter to lowercase instead.
*/
function capStr (str, reverse) {
	if (reverse)
		return str.charAt(0).toLowerCase() + str.slice(1);
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/*
* Gets the InnerHTML of an element
*
* @param {string} id The ID of the element that should be changed.
*/
function getInner (id) {
	try {
		return getElem(id).innerHTML;
	} catch (e) {
		console.error(e);
		console.error('[MPO] getInner() error, could not find: ' + id);
	}
}
/*
* Edits the InnerHTML of an element.
*
* @param {string} id The ID of the element that should be changed.
* @param {string/boolean} value The text that it should be changed to
*/
function editInner (id, value) {
	//console.log('id: ' + id + ', value: ' + value);
	try {
		getElem(id).innerHTML = value;
	} catch (e) {
		console.error(e);
		console.error('[MPO] editInner() error, could not find: ' + id);
	}
}


/*
* Edits the value of an input element. If element is a checkbox and no value is given it changes it to the opposite instead.
*
* @param {string} id The ID of the element that should be changed.
* @param {string/boolean} value The value that it should be changed to
*/
function editValue (id, value) {
	//console.log('id: ' + id + ', value: ' + value);
	try {
		if (getElem(id).type == 'checkbox' || getElem(id).type == 'radio') {
			if (typeof value === 'undefined') {
				if (getValue(id) === false){
					getElem(id).checked = true;
				} else {
					getElem(id).checked = false;
				}
			} else {
				if (typeof value === 'string')
					value = stringToBoolean(value);
				getElem(id).checked = value;
			}
		} else {
			getElem(id).value = value;
		}
	} catch (e) {
		console.error(e);
		console.error('[MPO] editValue() error, could not find: ' + id);
	}
}

/*
* Gets the value of an input element
*
* @param {string} id The ID of the element that should be changed.
*/
function getValue (id) {
	try {
		if (getElem(id).type == 'checkbox' || getElem(id).type == 'radio') {
			return getElem(id).checked;
		} else {
			return getElem(id).value;
		}
	} catch (e) {
		console.error(e);
		console.error('[MPO] getValue() error, could not find: ' + id);
	}
}

/*
* Returns DOM element.
*
* @param {string} id The ID of the element
*/
function getElem (id) {
	try {
		return document.getElementById(id);
	} catch (e) {
		console.error(e);
		console.error('[MPO] getElem() error, could not find: ' + id);
	}
}

/*
* Creates an element and returns it.
*
* @param {string} type The element type it should be.
* @param {string/DOM Element} parent The parent element, if an id is given it gets the DOM Element of it
*/
function cElem (type, parent) {
	if (typeof parent === 'string') {
		parent = getElem(parent);
	}
	var elem = document.createElement(type);
	parent.appendChild(elem);
	return elem;
}

/*
* Gets variable from URL and returns it.
*
* @param {string} variable The variable it should get.
*/
function getUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
 	return(false);
}

/*
* Converts a string into a boolean.
*
* @param {string} boolean The string that should get coverted.
*/
function stringToBoolean (boolean) {
	if (boolean == 'true') {
		return true;
	} else if (boolean == 'false') {
		return false;
	} else {
		return boolean;
	}
}

/*
* Outputs a JSON file with localStorage in it.
*/
function downloadFile () {
	var data = JSON.stringify(localStorage);
	//data = data.replace(/\\/g, '\\');
	var filename = 'MPO Backup';
	var type = 'application/json';
	var file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

/*
* Shares all settings, savefiles etc as a link.
*/
function linkShare () {
	var data = JSON.stringify(localStorage);
	var url = location.protocol + '//' + location.host + location.pathname + '?ls=' + btoa(data);


	var outputElement = getElem('textShareOutput');
	outputElement.style.display = 'unset';
	outputElement.value = url;
	outputElement.select();
	outputElement.focus();
	document.execCommand("copy");
}

var newLS;
/*
* Checks an uploaded backup file if it's valid or not.
*/
function uploadFile () {
	var file = getElem('uploadFile').files[0];
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function () {
		parseFile(reader.result);

		 //reminder for popout - update: no idea what this is supposed to mean
	};
}

/*
* Parses an uploaded file or from link share and then loads it.
*
* @param {string} str Stringified localStorage that should be loaded.
*/
function parseFile (str) {
	newLS = parseJSON(str);
	var newC = parseJSON(newLS['c' + newLS.sel]);
	var newS = parseJSON(newLS['s' + newLS.sel]);
	getElem('savefileLoadReminder').style.display = 'unset';

	if (typeof newLS != 'object' || typeof parseInt(newLS.lsVer) != 'number' || typeof newC != 'object' || typeof newC.char2 != 'string' || typeof newS.coinStarTie3 != 'boolean') { //check if it's a valid file, kinda
		getElem('sflCorrect').style.display = 'none';
		getElem('sflError').style.display = 'unset';
		return;
	} else {
		getElem('sflCorrect').style.display = 'unset';
		getElem('sflError').style.display = 'none';
	}
	if (newC.curGame === 'all') {
		getElem('sflReminderAll').style.display = 'unset';
		getElem('sflReminderGame').style.display = 'none';
	} else {
		getElem('sflReminderAll').style.display = 'none';
		getElem('sflReminderGame').style.display = 'unset';
		getElem('sflReminderGame').src = 'img/' + newC.curGame + '.png';
	}
	editInner('sflReminderTurn', newS.curTurn + '/' + newS.maxTurn);
	var elems = getElem('sflReminderChars').children;
	elems[0].src = 'img/' + newC.curGame + '/' + newC.char1 + '.png';
	elems[1].src = 'img/' + newC.curGame + '/' + newC.char2 + '.png';
	elems[2].src = 'img/' + newC.curGame + '/' + newC.char3 + '.png';
	elems[3].src = 'img/' + newC.curGame + '/' + newC.char4 + '.png';
	if (newLS.sMax >= 1) {
		getElem('sflReminderMore').style.display = 'unset';
		editInner('sflReminderAmount', newLS.sMax);
	} else {
		getElem('sflReminderMore').style.display = 'none';
	}
}

/*
* Reloads the site.
*/
function reload () {
	location = location;
}

/*
* Parses JSON, returns false if it's not JSON.
*
* @param {string} str The JSON stringified string.
*/
function parseJSON (str) {
	try {
		str = JSON.parse(str);
	} catch (e) {
		return false;
	}
	return str;
}

/*
* Updates localStorage with new data.
*
* @param {object} o The data.
*/
function writeLocalStorage(o) {
	for (var property in o) {
		if (o.hasOwnProperty(property)) {
			localStorage.setItem(property, o[property]);
		}
	}
}

/*
* Checks if it's executed in the popout and calls sendMessage() if it is.
*
* @param {string} id The first attribute.
* @param {string} attribute Other attributes.
* @param {boolean} force Forces it to send the message if true.
*/
function editValueOnBoth (id, attribute, force) {
	if (popout == true || force == true) {
		sendMessage('editValue+' + id + '+' + attribute);
	}
}

/*
* Checks if it's executed in the popout and calls sendMessage() if it is.
*
* @param {string} id The first attribute.
* @param {array} attribute Other attributes.
*/
function execOnMain (func, attribute) {
	if (popout == true) {
		sendMessage(func + '+' + attribute.join('+'));
		executeFunctionByName(func, attribute);
	} else {
		executeFunctionByName(func, attribute);
	}
}

/*
* Sends a message to the settings-popout/main window with a funcion in it.
*
* @param {string} text String with a funtion pointer in it that will be executed when received.
*/
function sendMessage (text) {
	if (popoutActivated == true && popout == false) {
		mpoSettings.postMessage(text, '*');
	} else {
		mpoMain.postMessage(text, '*');
	}
	//console.log('[MPO] Message sent: ' + text);
}

/*
* Receives Message from Settings-popout/main window and executes the function in it.
*/
function receiveMessage (e) {
	console.log('[MPO] Message received: ' + e.data);
	popoutActivated = true;
	var args = e.data.split('+');

	for (let num = 0; num < args.length; num++) {
		if (isNaN(args[num]) == false) {
			args[num] = parseInt(args[num]);
		}
	}

	var functionName = args[0];
	args.splice(0, 1);

	if (args.length == 0) {
		executeFunctionByName(functionName);
	} else {
		executeFunctionByName(functionName, args);
	}
}

/*
* Executes a function from a string.
*
* @param {string} functionName The name of the function that should be executed.
* @param {array} args Arguments that should be used.
*/
function executeFunctionByName (functionName, args) {
	var context = window;
	//var args = Array.prototype.slice.call(arguments, 2);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	//console.log('executeFunctionByName: ' + func + ' - ' + args)
	return context[func].apply(context, args);
}

/*
* Marks the popout as closed.
*/
function popoutClosed () {
	popoutActivated = false;
	console.log('[MPO] Popout deactivated.');

	if (shortcutLoaded === true) {
		slots['a' + slots.sel] = JSON.parse(localStorage.getItem('a' + slots.sel));
		loadAssistSlot();
	}
}

/*
* Closes the popout
*/
function closePopout () {
	if (popout == true) {
		saveAssist();
		window.close();
	} else {
		sendMessage('closePopout');
	}
}

/*
* Creates a settings pop-out
*/
var mpoMain;
var mpoSettings;
var popoutActivated = false;
function mpoSettingsPopout () {
	if (popout != true) {
		closeSettings();
		//saveSettings();
		//savePlayers();

		if (popoutActivated == true) {
			window.open('', 'mpoSettings');
		} else {
			mpoSettings = window.open('index.html?p=1', 'mpoSettings', 'height=830px,width=1002px');
			console.log('[MPO] Popout activated.');
			if (shortcutLoaded == true) {
				getAlly('close');
				shortcutSettings(true);
			}
		}
		popoutActivated = true;
	}
}

/*
* Loads Service Worker for offline use.
*/
function startSW () {
	if (location.hostname === 'localhost' || location.origin === 'file://') {
		console.warn('[MPO] Service Workers can\'t be used with localhost or from a local file.');
		return;
	}
	navigator.serviceWorker && navigator.serviceWorker.register('./sw.js').then(function(registration) {
		console.log('[MPO] Service Worker added.');
	});
}

/*
* Removes all service workers and kindof but not really cleares cache (only actually clears after reload).
*/
function unloadSW () {
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
		for(let registration of registrations) {
			registration.unregister()
		}
	});
	caches.delete('mpo-cache').then(function(boolean) {});
}

/*
* Starts or unloads service workers depending on if the option is on or not.
*/
function runSW () {
	if (popout === true) {
		return;
	}
	if (getValue('useSW') === true) {
		startSW();
	} else {
		unloadSW();
	}
}

/*
* Saves all drag 'n' drop locations.
*/
function interactSave () {
	var elems = document.getElementsByClassName('draggable');
	var arrX = [];
	var arrY = [];
	for (var num = 0; num < elems.length; num++) {
		arrX.push(elems[num].getAttribute('data-x'));
		arrY.push(elems[num].getAttribute('data-y'));
	}
	localStorage.setItem('datax', arrX);
	localStorage.setItem('datay', arrY);
}

/*
* Resets all drag 'n' drop locations.
*/
function interactReset () {
	localStorage.removeItem('datax');
	localStorage.removeItem('datay');
	var elems = document.getElementsByClassName('draggable');
	for (var num = 0; num < elems.length; num++) {
		elems[num].style.transform = 'none';
		elems[num].setAttribute('data-x', 0);
		elems[num].setAttribute('data-y', 0);
	}
}

// === INTERACT.JS ===
// target elements with the "draggable" class
interact('.draggable')
	.draggable({
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		/* restrict: {
			restriction: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},*/
		// enable autoScroll
		autoScroll: true,

		// call this function on every dragmove event
		onmove: dragMoveListener,
		// call this function on every dragend event
		onend: function (event) {
		var textEl = event.target.querySelector('p');

		textEl && (textEl.textContent =
			'moved a distance of '
			+ (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
				Math.pow(event.pageY - event.y0, 2) | 0))
				.toFixed(2) + 'px');
	}
});

function dragMoveListener (event) {
	if (getElem('enableInteract').checked == true) {
		var target = event.target,
			// keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform =
		target.style.transform =
			'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}
}
// === INTERACT.JS END ===

window.addEventListener("click", windowOnClick);
window.addEventListener("message", receiveMessage, false);

window.onbeforeunload = function(){
	if (popout == true) {
		saveSettings();
		savePlayers();
		saveAssist();
		sendMessage('popoutClosed');
	} else {
		closePopout();
	}
}

new Sortable(getElem('slotList'), {
	animation: 150,
	onUpdate: function (evt) {
		updateSlotOrder();
	}
});

window.onload = prepareMPO();
window.onload = changeBGColor('bgColor');