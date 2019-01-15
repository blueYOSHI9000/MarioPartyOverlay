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
		getValue('highlightColor', textColor);
	}

	var counters = ['happening', 'minigame', 'redSpace', 'running', 'shopping', 'orb', 'candy', 'item', 'friendSpace', 'hex', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'balloon'];

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

	var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML;
	var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML;
	var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML;
	var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML;

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
	var counterP1 = document.getElementById('p1RunningText').innerHTML;
	var counterP2 = document.getElementById('p2RunningText').innerHTML;
	var counterP3 = document.getElementById('p3RunningText').innerHTML;
	var counterP4 = document.getElementById('p4RunningText').innerHTML;

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
* Replaces minigame coins with minigame wins or mini-stars.
* 
* @param {string} type Which one should be used.
*/
function minigameWins (type) {
	if (type) {} else if (getValue('minigameWinsOnOff') == true) {
		var type = 'Wins';
	} else if (getValue('minigameMiniStarsOnOff') == true) {
		var type = 'MiniStars';
	} else {
		var type = '';
	}

	if (getValue('minigame' + type + 'OnOff') == true) {
		if (getValue('minigameOnOff') == false) {
			editValue('minigameOnOff', true);
			displayOnOff('minigame', false, true);
		}
		editValue('minigameWinsOnOff', false);
		editValue('minigameMiniStarsOnOff', false);
		editValue('minigame' + type + 'OnOff', true);
	} else {
		editValue('minigameWinsOnOff', false);
		editValue('minigameMiniStarsOnOff', false);
		type = '';
	}

	var source = 'img/minigame.png';
	if (type == 'MiniStars') {
		source = 'img/minigameministars.png';
	} else if (type == 'Wins') {
		source = 'img/minigamewins.png';
	}
	
	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'MinigameDisplay').src = source;
	}
}

/*
* Updates the star counter image.
* 
* @param {string} image Which image should be used.
*/
function changeStars (image) {
	var source = '';

	if ((getValue('miniStarsOnOff') == true || getValue('bananasOnOff') == true) && getValue('starsOnOff') == false) {
		editValue('starsOnOff', true);
		displayOnOff('stars', false, true);
	}

	if (image == 'miniStars' && getValue('miniStarsOnOff') == true) {
		editValue('bananasOnOff', false);
		source = 'img/ministar.png';
	} else if (image == 'bananas' && getValue('bananasOnOff') == true) {
		editValue('miniStarsOnOff', false);
		source = 'img/banana.png';
	} else {
		editValue('miniStarsOnOff', false);
		editValue('bananasOnOff', false);
		source = 'img/star.png';
	}

	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'StarsDisplay').src = source;
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

	var counterClass = document.querySelectorAll('.' + counter)

	if (getValue(counter + 'OnOff') == false) {
		var displayVar = 'none';
		if (counter == 'minigame' && (getValue('minigameWinsOnOff') == true || getValue('minigameMiniStarsOnOff') == true)) {
			editValue('minigameWinsOnOff', false);
			editValue('minigameMiniStarsOnOff', false);
		} else if (counter == 'running' && getValue('slowOnOff') == true) {
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
		if (counter == 'minigame') {
			minigameWins()
		}
		var displayVar = '';
	}

	for (var num = 0; num < counterClass.length; num++) {
		counterClass[num].style.display = displayVar;
	}

	if (start) {} else if (callSlowStar == true && counter == 'running') {
		slowStar();
		callSlowStar = false;
	}
	if ((getValue('starsOnOff') == true && getValue('inclBonusOnOff')== true) || counter == 'stars') {
		updateStars();
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
	displayOnOff('orb', true, true);
	displayOnOff('candy', true, true);
	displayOnOff('item', true, true);
	displayOnOff('friendSpace', true, true);
	displayOnOff('hex', true, true);
	displayOnOff('spinSpace', true, true);
	displayOnOff('minus', true, true);
	displayOnOff('specialDice', true, true);
	displayOnOff('ally', true, true);
	displayOnOff('stompy', true, true);
	displayOnOff('doormat', true, true);
	displayOnOff('balloon', true, true);
	displayOnOff('stars', true, true);
	displayOnOff('coins', true, true);
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

		if (div == 'hidden') {
			document.getElementById(ids[num]).classList.add('visible');
			document.getElementById(ids[num]).classList.remove('hidden');
		} else {
			document.getElementById(ids[num]).classList.remove('visible');
			document.getElementById(ids[num]).classList.add('hidden');
		}
	}
}

/*
* Show certain settings and hide all others, also updates the cursor.
*
* @param {string} id Which settings should be shown.
*/
function showHideSettings (id) {
	var ids = ['generalMPO', 'textOutput', 'player', 'counter', 'tutorial'];
	for (let num = 0; num < 5; num++) {
		document.getElementById(ids[num] + 'Settings').classList.add('hidden');
		document.getElementById(ids[num] + 'Settings').classList.remove('visible');
		document.getElementById(ids[num] + 'Selector').classList.remove('settingsSelected');
	}
	document.getElementById(id + 'Settings').classList.add('visible');
	document.getElementById(id + 'Settings').classList.remove('hidden');
	document.getElementById(id + 'Selector').classList.add('settingsSelected');

}

/*
* Changes visibility from visible to hidden and vice versa.
* 
* @param {string} id Which element should be changed
*/
function changeVisibility (id) {
	if (document.getElementById(id).style.visibility == 'hidden') {
		document.getElementById(id).style.visibility = 'visible';
	} else if (document.getElementById(id).style.visibility == 'visible') {
		document.getElementById(id).style.visibility = 'hidden';
	}
}

/*
* Closes the settings if the user doesn't click on the settings while they are opened.
*
* @param {string} event What event got fired.
*/
function windowOnClick (event) {
	var settings = document.querySelector("#settings");
	var colorPickTest = document.querySelector('#colorPickTest');
	if (event.target === settings) {
		showHideDiv(['settings']);
	} else if (event.target === colorPickTest){
		showHideDiv(['colorPickTest']);
	}
}

/*
* Checks if Ctrl is pressed.
*/
function ctrlPressed (e) {
	if (e.ctrlKey && ctrlKeyVar == false) {
		ctrlKeyVar = true;
		if (getValue('mobileTypeMinus') == false) {
			editValue('mobileTypeMinus', true);
		} else if (getValue('mobileTypeMinus') == true) {
			editValue('mobileTypeMinus', false);
		}
	} else if (e.key == '1') {
		editValue('type1', true);
	} else if (e.key == '5') {
		editValue('type5', true);
	} else if (e.key == '0') {
		editValue('type10', true);
	}
}

/*
* Checks if Ctrl is released.
*/
function ctrlReleased (e) {
	if (ctrlKeyVar == true) {
		ctrlKeyVar = false
		if (getValue('mobileTypeMinus') == false) {
			editValue('mobileTypeMinus', true);
		} else if (getValue('mobileTypeMinus') == true) {
			editValue('mobileTypeMinus', false);
		}
	}
}

var ctrlKeyVar = false;
window.onkeydown = ctrlPressed;
window.onkeyup = ctrlReleased;

/*
* Checks if something is included in a array.
*
* @param {string} string Checks if this is included in the array.
* @param {array} array The array that should include something.
*/
function arrCon (string, array) {
	return (array.indexOf(string) > -1);
}

/*
* Opens normal settings or puts popout on top if it's activated.
*/
function openSettings () {
	if (popoutActivated == true) {
		window.open('', 'mpoSettings');
	} else if (getValue('autoPopout') == true) {
		mpoSettingsPopout();
	} else {
		showHideDiv(['settings']);
	}
}

/*
* Opens the greenscreen test on the main window.
*/
function openGreenscreenTest () {
	if (popout == true) {
		sendMessage('openGreenscreenTest');
	} else {
		document.getElementById('settings').classList.remove('visible');
		document.getElementById('settings').classList.add('hidden');
		showHideDiv(['colorPickTest']);
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
*/
function sendSettingsMsg (id, attribute) {
	if (popout == true) {
		sendMessage('editValue+' + id + '+' + attribute);
	}
}

/*
* Sends a message to the settings-popout/main window with a funcion in it.
* 
* @param {string} text String with a funtion pointer in it that will be executed when received.
*/
function sendMessage (text) {
	if (popoutActivated == true) {
		mpoSettings.postMessage(text, '*');
	} else {
		mpoMain.postMessage(text, '*');
	}
	console.log('[MPO] Message sent: ' + text);
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
function executeFunctionByName(functionName, args) {
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
}

/*
* Closes the popout
*/
function closePopout () {
	if (popout == true) {
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
		saveSettings();
		savePlayers();

		if (popoutActivated == true) {
			window.open('', 'mpoSettings');
		} else {
			mpoSettings = window.open('index.html?p=1', 'mpoSettings', 'height=830px,width=1002px');
			console.log('[MPO] Popout activated.');
		}
		popoutActivated = true;
	}
}

window.addEventListener("click", windowOnClick);
window.addEventListener("message", receiveMessage, false);

window.onbeforeunload = function(){
	if (popout == true) {
		sendMessage('popoutClosed');
	} else {
		closePopout();
	}
}

document.getElementById('type1').focus();

window.onload = prepareMPO();
window.onload = changeBGColor('bgColor');