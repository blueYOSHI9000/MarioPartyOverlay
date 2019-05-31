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
	if (resetHighlights == true) {
		var originalHighlightColor = getValue('highlightColor');
		var textColor = getValue('textColor');
		editValue('highlightColor', textColor);
	}

	var counters = ['happening', 'minigame', 'redSpace', 'running', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat'];

	if (getValue('enableHighlight') == true || resetHighlights == true || all == true || stars == true) {
		for (let num = 0; num < counters.length; num++) {
			if (getValue(counters[num] + 'OnOff') == true || all == true) {
				highlight(counters[num], stars);
			}
		}
		if (getValue('slowOnOff') == true) {
			slowHighlight(true);
		}
	}

	if (resetHighlights == true) {
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
	if (counter == 'Stars' || counter == 'Coins') {
		return;
	}
	counter = counter.charAt(0).toUpperCase() + counter.slice(1);

	var counterP1 = getInner('p1' + counter + 'Text');
	var counterP2 = getInner('p2' + counter + 'Text');
	var counterP3 = getInner('p3' + counter + 'Text');
	var counterP4 = getInner('p4' + counter + 'Text');

	var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4);

	if (stars == true) {
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
			document.getElementById('p1' + counter + 'Text').style.color = textColor;
			document.getElementById('p2' + counter + 'Text').style.color = textColor;
			document.getElementById('p3' + counter + 'Text').style.color = textColor;
			document.getElementById('p4' + counter + 'Text').style.color = textColor;
		} else {
			if (counterNum == counterP1) {
				document.getElementById('p1' + counter + 'Text').style.color = highlightColor;
			} else {
				document.getElementById('p1' + counter + 'Text').style.color = textColor;
			}

			if (counterNum == counterP2) {
				document.getElementById('p2' + counter + 'Text').style.color = highlightColor;
			} else {
				document.getElementById('p2' + counter + 'Text').style.color = textColor;
			}

			if (counterNum == counterP3) {
				document.getElementById('p3' + counter + 'Text').style.color = highlightColor;
			} else {
				document.getElementById('p3' + counter + 'Text').style.color = textColor;
			}

			if (counterNum == counterP4) {
				document.getElementById('p4' + counter + 'Text').style.color = highlightColor;
			} else {
				document.getElementById('p4' + counter + 'Text').style.color = textColor;
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
* Highlights the slow star.
*/
function slowHighlight (stars) {
	var counterP1 = getInner('p1RunningText');
	var counterP2 = getInner('p2RunningText');
	var counterP3 = getInner('p3RunningText');
	var counterP4 = getInner('p4RunningText');

	var counterNumMax = Math.max(counterP1, counterP2, counterP3, counterP4);
	var counterNumMin = Math.min(counterP1, counterP2, counterP3, counterP4);

	if (stars == true) {
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
			document.getElementById('p1RunningText').style.color = textColor;
		} else if (counterNumMax == counterP1 || counterNumMin == counterP1) {
			document.getElementById('p1RunningText').style.color = highlightColor;
		} else {
			document.getElementById('p1RunningText').style.color = textColor;
		}

		if (counterP2 == 0) {
			document.getElementById('p2RunningText').style.color = textColor;
		} else if (counterNumMax == counterP2 || counterNumMin == counterP2) {
			document.getElementById('p2RunningText').style.color = highlightColor;
		} else {
			document.getElementById('p2RunningText').style.color = textColor;
		}

		if (counterP3 == 0) {
			document.getElementById('p3RunningText').style.color = textColor;
		} else if (counterNumMax == counterP3 || counterNumMin == counterP3) {
			document.getElementById('p3RunningText').style.color = highlightColor;
		} else {
			document.getElementById('p3RunningText').style.color = textColor;
		}

		if (counterP4 == 0) {
			document.getElementById('p4RunningText').style.color = textColor;
		} else if (counterNumMax == counterP4 || counterNumMin == counterP4) {
			document.getElementById('p4RunningText').style.color = highlightColor;
		} else {
			document.getElementById('p4RunningText').style.color = textColor;
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
			document.getElementById('p' + num + 'StarsDisplay').src = 'img/' + curGame + '/' + source + '.png';
		} else {
			document.getElementById('p' + num + 'StarsDisplay').src = 'img/' + source + '.png';
		}
	}
}

/*
* Uses default icon for star counter in case a custom one doesn't exist.
*/
function changeStarsError (elem) {
	var id = elem.id;
	if (getValue('miniStarsOnOff') == true) {
		document.getElementById(id).src = 'img/ministar.png';
	} else if (getValue('bananasOnOff') == true) {
		document.getElementById(id).src = 'img/banana.png';
	} else {
		document.getElementById(id).src = 'img/stars.png';
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

	var elem2 = document.getElementById('starsOnOff');
	elem2 = elem2.parentNode;

	elem2.children[2].style = 'background-image: url(img/stars.png);';

	elem2 = document.getElementById('inclBonusOnOff');
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
var callSlowStar = true
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
		} else if (counter == 'stars' && getValue('inclBonusOnOff') == true) {
			editValue('inclBonusOnOff', false);
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
		document.getElementById('coinStarFullDiv').style.display = displayVar;
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

	if (start) {} else if (callSlowStar == true && counter == 'running') {
		slowStar();
		callSlowStar = false;
	}
	if ((getValue('starsOnOff') == true && getValue('inclBonusOnOff')== true) || counter == 'stars') {
		updateStars();
		changeStars();
	}
}

/*
* Calls displayOnOff() when loading the page.
*/
function callDisplayOnOff () {
	displayOnOff('happening', true, true);
	displayOnOff('minigame', true, true);
	displayOnOff('redSpace', true, true);
	displayOnOff('running', true, true);
	displayOnOff('shopping', true, true);
	displayOnOff('item', true, true);
	displayOnOff('friendSpace', true, true);
	displayOnOff('hex', true, true);
	displayOnOff('balloon', true, true);
	displayOnOff('spinSpace', true, true);
	displayOnOff('minus', true, true);
	displayOnOff('specialDice', true, true);
	displayOnOff('ally', true, true);
	displayOnOff('stompy', true, true);
	displayOnOff('doormat', true, true);
	displayOnOff('stars', true, true);
	displayOnOff('coins', true, true);
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
		var div = document.getElementById(ids[num]).classList;
		for (let num2 = 0; num2 < div.length; num2++) {
			if (div[num2] == 'hidden') {
				var cont = true;
				break;
			}
		}

		if (cont === true) {
			document.getElementById(ids[num]).classList.add('visible');
			document.getElementById(ids[num]).classList.remove('hidden');
		} else {
			document.getElementById(ids[num]).classList.remove('visible');
			document.getElementById(ids[num]).classList.add('hidden');
		}
	}
}

var openedSettings = 'generalMPO';
/*
* Show certain settings and hide all others, also updates the cursor.
*
* @param {string} id Which settings should be shown.
*/
function showHideSettings (id) {
	if (popout === true) {
		sendMessage('showHideSettings+' + id);
	}
	openedSettings = id;
	var ids = ['generalMPO', 'slots', 'shortcut', 'player', 'counter', 'tutorial'];
	for (let num = 0; num < ids.length; num++) {
		document.getElementById(ids[num] + 'Settings').classList.add('hidden');
		document.getElementById(ids[num] + 'Settings').classList.remove('visible');
		document.getElementById(ids[num] + 'Selector').classList.remove('settingsSelected');
		document.getElementById(ids[num] + 'SelectorBreak').classList.remove('settingsSelected');
	}
	document.getElementById(id + 'Settings').classList.add('visible');
	document.getElementById(id + 'Settings').classList.remove('hidden');
	document.getElementById(id + 'Selector').classList.add('settingsSelected');
	document.getElementById(id + 'SelectorBreak').classList.add('settingsSelected');

	if (id == 'shortcut') {
		document.getElementById('shortcutHeader').style.display = 'block';
	} else {
		document.getElementById('shortcutHeader').style.display = 'none';
	}

	if (shortcutLoaded === true) {
		getAlly('close');
		shortcutSettings(true);
	}
}

/*
* Closes the settings if the user doesn't click on the settings while they are opened.
*
* @param {string} event What event got fired.
*/
function windowOnClick (event) {
	var settings = document.querySelector("#settings");
	if (event.target === settings) {
		showHideDiv(['settings']);
		if (shortcutLoaded == true) {
			getAlly('close');
			shortcutSettings(true);
		}
	}
}

/*
* Checks if Ctrl & Shift is pressed.
*/
function ctrlPressed (e, ctrl, shift, key) {
	if (ctrl || shift || key) {
		ctrl = stringToBoolean(ctrl);
		shift = stringToBoolean(shift);
	} else {
		ctrl = e.ctrlKey;
		shift = e.shiftKey;
		key = e.key;
	}
	if (popout == true) {
		sendMessage('ctrlPressed+x+' + ctrl + '+' + shift + '+' + key);
	}
	if (ctrl && ctrlKeyVar == false) {
		ctrlKeyVar = true;
		if (getValue('mobileTypeMinus') == false) {
			editValue('mobileTypeMinus', true);
		} else if (getValue('mobileTypeMinus') == true) {
			editValue('mobileTypeMinus', false);
		}
	} else if (shift && shiftKeyVar == false) {
		if (getValue('type1') == true) {
			shiftKeyVar = true;
			editValue('type5', true);
		} else if (getValue('type5') == true) {
			shiftKeyVar = true;
			editValue('type1', true);
		}
	} else if (key == '1') {
		editValue('type1', true);
	} else if (key == '5') {
		editValue('type5', true);
	} else if (key == '0') {
		editValue('type10', true);
	}
}

/*
* Checks if Ctrl & Shift is released.
*/
function ctrlReleased (e, key) {
	if (key) {} else {
		key = e.key;
	}
	if (popout == true) {
		sendMessage('ctrlReleased+x+' + key);
	}
	if (key == 'Control' && ctrlKeyVar == true) {
		ctrlKeyVar = false
		if (getValue('mobileTypeMinus') == false) {
			editValue('mobileTypeMinus', true);
		} else if (getValue('mobileTypeMinus') == true) {
			editValue('mobileTypeMinus', false);
		}
	} else if (key == 'Shift' && shiftKeyVar == true) {
		shiftKeyVar = false;
		if (getValue('type5') == true) {
			editValue('type1', true);
		} else if (getValue('type1') == true) {
			editValue('type5', true);
		}
	}
}

var ctrlKeyVar = false;
var shiftKeyVar = false;
window.onkeydown = ctrlPressed;
window.onkeyup = ctrlReleased;

var shortcutLoaded = false;
/*
* Loads settings.js to start the shortcut feature.
*/
function prepareShortcut () {
	if (shortcutLoaded === true) {
		startShortcut();
		return;
	}
	var script = document.createElement("script");
	script.src = 'settings.js';
	shortcutLoaded = true;
	document.getElementById('shortcutSettingsButton').disabled = '';

	document.head.appendChild(script);
}

/*
* Opens normal settings or puts popout on top if it's activated.
* 
* @param {boolean} force If true, opens settings on main regardless of the auto-popout option.
*/
function openSettings (force) {
	if (force === true || force === 'true') {
		showHideDiv(['settings']);
		return;
	}
	if (popoutActivated == true) {
		window.open('', 'mpoSettings');
	} else if (getValue('autoPopout') == true) {
		mpoSettingsPopout();
	} else {
		showHideDiv(['settings']);
	}
}

/*
* Calls a function for the main site and the settings popout (if activated).
* 
* @param {string} functionName The function that shoudl be called (without the '()').
* @param {array} attributes The attributes that the function should use.
*/
function changeSettings (functionName, attributes) {
	//console.log('functionName: '  + functionName + ', attributes: ' + attributes)
	if (popout == true) {
		if (attributes) {
			sendMessage(functionName + '+' + attributes.join('+'));
		} else {
			sendMessage(functionName);
		}
	}
	executeFunctionByName(functionName, attributes);
}

/*
* Changes Themes incl. greenscreen.
* 
* @param {number} theme Which theme should be used.
*/
var bgColor = '#0000ff';
var curTheme = 1;
function changeTheme (theme) {
	bgColor = getValue('bgColor');
	styleExtra = 'no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"';

	if (theme) {} else {
		theme = curTheme;
	}

	if (getValue('greenscreen') == true) {
		document.getElementById('bodyElement').style.background = bgColor;
	} else {
		switch (theme) {
			case 2:
				document.getElementById('bodyElement').style = 'background: url(img/MP9-bg.jpg)' + styleExtra;
				curTheme = 2
				break;
			case 3:
				document.getElementById('bodyElement').style = 'background: url(img/NSMBW-bg.jpg)' + styleExtra;
				curTheme = 3
				break;
			case 4:
				document.getElementById('bodyElement').style = 'background: url(img/MK8-bg.jpg)' + styleExtra;
				curTheme = 4
				break;
			default:
				document.getElementById('bodyElement').style = 'background: url(img/background.jpg)' + styleExtra;
				curTheme = 1
				break;
		}
	}
	document.getElementById('themeB1').style = '';
	document.getElementById('themeB2').style = '';
	document.getElementById('themeB3').style = '';
	document.getElementById('themeB4').style = '';
	document.getElementById('themeB1').disabled = '';
	document.getElementById('themeB2').disabled = '';
	document.getElementById('themeB3').disabled = '';
	document.getElementById('themeB4').disabled = '';
	switch (theme) {
		case 2:
			document.getElementById('themeB2').style = 'border-color: green;';
			document.getElementById('themeB2').disabled = 'true';
			curTheme = 2;
			break;
		case 3:
			document.getElementById('themeB3').style = 'border-color: green;';
			document.getElementById('themeB3').disabled = 'true';
			curTheme = 3;
			break;
		case 4:
			document.getElementById('themeB4').style = 'border-color: green;';
			document.getElementById('themeB4').disabled = 'true';
			curTheme = 4;
			break;
		default:
			document.getElementById('themeB1').style = 'border-color: green;';
			document.getElementById('themeB1').disabled = 'true';
			curTheme = 1;
			break;
	}
}

/*
* Changes background color if greenscreen is used.
* 
* @param {string} id Id of the input element that changed its value.
*/
function changeBGColor (id) {
	bgColor = getValue(id);
	if (getValue('greenscreen') == true) {
		document.getElementById('bodyElement').style.background = bgColor;
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
	var whiteText = document.querySelectorAll(".whiteText");
	var counterText = document.querySelectorAll(".counterText");
	var turns = document.querySelectorAll(".turns");
	var mobile = document.querySelectorAll(".mobileTypeLabel");

	var color = getValue(id);

	for (var num = 0; num < whiteText.length; num++) {
		whiteText[num].style.color = color;
	}
	for (var num = 0; num < counterText.length; num++) {
		counterText[num].style.color = color;
	}
	for (var num = 0; num < turns.length; num++) {
		turns[num].style.color = color;
	}
	for (var num = 0; num < mobile.length; num++) {
		mobile[num].style.color = color;
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

var darkTheme = false;
/*
* Switches from light to dark mode and back by un- & loading darkstyle.css.
*/
function settingsTheme () {
	if (darkTheme === true) {
		darkTheme = false;
		editInner('lightDarkButton', 'Dark mode');
	} else {
		darkTheme = true;
		editInner('lightDarkButton', 'Light mode');
	}

	var filetype = 'css';
	var filename = 'darkstyle.css';
	if (darkTheme === true) {
		var headID = document.getElementsByTagName("head")[0];
		var cssNode = document.createElement('link');
		cssNode.type = 'text/css';
		cssNode.rel = 'stylesheet';
		cssNode.href = 'darkstyle.css';
		cssNode.media = 'screen';
		headID.appendChild(cssNode);
	} else {
		var targetElement = "link"; 
		var targetAttr = "href"; 

		var allCtrl = document.getElementsByTagName(targetElement);
		for (var i=allCtrl.length; i>=0; i--)  { //search backwards within nodelist for matching elements to remove
			if (allCtrl[i] && allCtrl[i].getAttribute(targetAttr)!=null && allCtrl[i].getAttribute(targetAttr).indexOf(filename)!=-1) {
				allCtrl[i].parentNode.removeChild(allCtrl[i]);
			}
		}
	}
}

/*
* Gets the InnerHTML of an element
* 
* @param {string} id The ID of the element that should be changed.
*/
function getInner (id) {
	return document.getElementById(id).innerHTML;
}
/*
* Edits the InnerHTML of an element.
* 
* @param {string} id The ID of the element that should be changed.
* @param {string/boolean} value The text that it should be changed to
*/
function editInner (id, value) {
	//console.log('id: ' + id + ', value: ' + value);
	document.getElementById(id).innerHTML = value;
}


/*
* Edits the value of an input element. If element is a checkbox and no value is given it changes it to the opposite instead.
* 
* @param {string} id The ID of the element that should be changed.
* @param {string/boolean} value The value that it should be changed to
*/
function editValue (id, value) {
	//console.log('id: ' + id + ', value: ' + value);
	if (document.getElementById(id).type == 'checkbox' || document.getElementById(id).type == 'radio') {
		if (value != true && value != false) { value = stringToBoolean(value); }
		document.getElementById(id).checked = value;
	} else {
		document.getElementById(id).value = value;
	}
}

/*
* Gets the value of an input element
* 
* @param {string} id The ID of the element that should be changed.
*/
function getValue (id) {
	if (document.getElementById(id).type == 'checkbox' || document.getElementById(id).type == 'radio') {
		return document.getElementById(id).checked;
	} else {
		return document.getElementById(id).value;
	}
}

/*
* Checks if it's executed in the popout and calls sendMessage() if it is.
* 
* @param {string} id The first attribute.
* @param {string} attribute Other attributes.
* @param {boolean} force Forces it to send the message if true.
*/
function sendSettingsMsg (id, attribute, force) {
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
		document.getElementById('settings').classList.remove('visible');
		document.getElementById('settings').classList.add('hidden');
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
	if (document.getElementById('enableInteract').checked == true) {
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
		saveAssist();
		sendMessage('popoutClosed');
	} else {
		closePopout();
	}
}

document.getElementById('type1').focus();

window.onload = prepareMPO();
window.onload = changeBGColor('bgColor');