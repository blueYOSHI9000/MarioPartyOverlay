/*
* Resets or starts the highlighting feature by calling callHighlight().
*/
function resetHighlights () {
	if (document.getElementById('enableHighlight').checked == false) {
		callHighlight(true)
	} else {
		callHighlight()
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
		var originalHighlightColor = document.getElementById('highlightColor').value
		var textColor = document.getElementById('textColor').value
		document.getElementById('highlightColor').value = textColor
	}

	var counters = ['happening', 'minigame', 'redSpace', 'running', 'shopping', 'orb', 'candy', 'item', 'friendSpace', 'hex', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat']

	if (document.getElementById('enableHighlight').checked == true || resetHighlights == true || all == true || stars == true) {
		for (let num = 0; num < counters.length; num++) {
			if (document.getElementById(counters[num] + 'OnOff').checked == true || all == true) {
				highlight(counters[num], stars)
			}
		}
		if (document.getElementById('slowOnOff').checked == true) {
			slowHighlight(true)
		}
	}

	if (resetHighlights == true) {
		document.getElementById('highlightColor').value = originalHighlightColor
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
	counter = counter.charAt(0).toUpperCase() + counter.slice(1)

	var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
	var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
	var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
	var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

	var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

	if (stars == true) {
		if (counterP1 == 0 && counterP2 == 0 && counterP3 == 0 && counterP4 == 0) {} else {
			if (counterNum == counterP1) {
				bonusStars[1]++
			}
			if (counterNum == counterP2) {
				bonusStars[2]++
			}
			if (counterNum == counterP3) {
				bonusStars[3]++
			}
			if (counterNum == counterP4) {
				bonusStars[4]++
			}
		}
	} else {
		var textColor = document.getElementById('textColor').value
		var highlightColor = document.getElementById('highlightColor').value

		if (counterP1 == 0 && counterP2 == 0 && counterP3 == 0 && counterP4 == 0) {
			document.getElementById('p1' + counter + 'Text').style.color = textColor
			document.getElementById('p2' + counter + 'Text').style.color = textColor
			document.getElementById('p3' + counter + 'Text').style.color = textColor
			document.getElementById('p4' + counter + 'Text').style.color = textColor
		} else {
			if (counterNum == counterP1) {
				document.getElementById('p1' + counter + 'Text').style.color = highlightColor
			} else {
				document.getElementById('p1' + counter + 'Text').style.color = textColor
			}

			if (counterNum == counterP2) {
				document.getElementById('p2' + counter + 'Text').style.color = highlightColor
			} else {
				document.getElementById('p2' + counter + 'Text').style.color = textColor
			}

			if (counterNum == counterP3) {
				document.getElementById('p3' + counter + 'Text').style.color = highlightColor
			} else {
				document.getElementById('p3' + counter + 'Text').style.color = textColor
			}

			if (counterNum == counterP4) {
				document.getElementById('p4' + counter + 'Text').style.color = highlightColor
			} else {
				document.getElementById('p4' + counter + 'Text').style.color = textColor
			}
		}
	}
}

/*
* Turns the slow star feature on or off.
*/
function slowStar () {
	if (document.getElementById('runningOnOff').checked == false && document.getElementById('slowOnOff').checked == true) {
		document.getElementById('runningOnOff').checked = true
		displayOnOff('running', false, true)
	}

	if (document.getElementById('slowOnOff').checked == true && document.getElementById('enableHighlight').checked == true) {
		slowHighlight()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight('running')
	}
}

/*
* Highlights the slow star.
*/
function slowHighlight (stars) {
	var counterP1 = document.getElementById('p1RunningText').innerHTML
	var counterP2 = document.getElementById('p2RunningText').innerHTML
	var counterP3 = document.getElementById('p3RunningText').innerHTML
	var counterP4 = document.getElementById('p4RunningText').innerHTML

	var counterNumMax = Math.max(counterP1, counterP2, counterP3, counterP4)
	var counterNumMin = Math.min(counterP1, counterP2, counterP3, counterP4)

	if (stars == true) {
		if (counterP1 == 0) {} else if (counterNumMin == counterP1) {
			bonusStars[1]++
		}
		if (counterP2 == 0) {} else if (counterNumMin == counterP2) {
			bonusStars[2]++
		}
		if (counterP3 == 0) {} else if (counterNumMin == counterP3) {
			bonusStars[3]++
		}
		if (counterP4 == 0) {} else if (counterNumMin == counterP4) {
			bonusStars[4]++
		}
	} else {
		var highlightColor = document.getElementById('highlightColor').value
		var textColor = document.getElementById('textColor').value

		if (counterP1 == 0) {
			document.getElementById('p1RunningText').style.color = textColor
		} else if (counterNumMax == counterP1 || counterNumMin == counterP1) {
			document.getElementById('p1RunningText').style.color = highlightColor
		} else {
			document.getElementById('p1RunningText').style.color = textColor
		}

		if (counterP2 == 0) {
			document.getElementById('p2RunningText').style.color = textColor
		} else if (counterNumMax == counterP2 || counterNumMin == counterP2) {
			document.getElementById('p2RunningText').style.color = highlightColor
		} else {
			document.getElementById('p2RunningText').style.color = textColor
		}

		if (counterP3 == 0) {
			document.getElementById('p3RunningText').style.color = textColor
		} else if (counterNumMax == counterP3 || counterNumMin == counterP3) {
			document.getElementById('p3RunningText').style.color = highlightColor
		} else {
			document.getElementById('p3RunningText').style.color = textColor
		}

		if (counterP4 == 0) {
			document.getElementById('p4RunningText').style.color = textColor
		} else if (counterNumMax == counterP4 || counterNumMin == counterP4) {
			document.getElementById('p4RunningText').style.color = highlightColor
		} else {
			document.getElementById('p4RunningText').style.color = textColor
		}
	}
}

/*
* Replaces minigame coins with minigame wins or mini-stars.
* 
* @param {string} type Which one should be used.
*/
function minigameWins (type) {
	if (type) {} else if (document.getElementById('minigameWinsOnOff').checked == true) {
		var type = 'Wins'
	} else if (document.getElementById('minigameMiniStarsOnOff').checked == true) {
		var type = 'MiniStars'
	} else {
		var type = ''
	}

	if (document.getElementById('minigame' + type + 'OnOff').checked == true) {
		if (document.getElementById('minigameOnOff').checked == false) {
			document.getElementById('minigameOnOff').checked = true
			displayOnOff('minigame', false, true)
		}
		document.getElementById('minigameWinsOnOff').checked = false
		document.getElementById('minigameMiniStarsOnOff').checked = false
		document.getElementById('minigame' + type + 'OnOff').checked = true
	} else {
		document.getElementById('minigameWinsOnOff').checked = false
		document.getElementById('minigameMiniStarsOnOff').checked = false
		type = ''
	}

	var source = 'img/minigame.png'
	if (type == 'MiniStars') {
		source = 'img/minigameministars.png'
	} else if (type == 'Wins') {
		source = 'img/minigamewins.png'
	}
	
	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'MinigameDisplay').src = source
	}
}

/*
* Updates the star counter image.
* 
* @param {string} image Which image should be used.
*/
function changeStars (image) {
	var source = ''

	if ((document.getElementById('miniStarsOnOff').checked == true || document.getElementById('bananasOnOff').checked == true) && document.getElementById('starsOnOff').checked == false) {
		document.getElementById('starsOnOff').checked = true
		displayOnOff('stars', false, true)
	}

	if (image == 'miniStars' && document.getElementById('miniStarsOnOff').checked == true) {
		document.getElementById('bananasOnOff').checked = false
		source = 'img/ministar.png'
	} else if (image == 'bananas' && document.getElementById('bananasOnOff').checked == true) {
		document.getElementById('miniStarsOnOff').checked = false
		source = 'img/banana.png'
	} else {
		document.getElementById('miniStarsOnOff').checked = false
		document.getElementById('bananasOnOff').checked = false
		source = 'img/star.png'
	}

	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'StarsDisplay').src = source
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
		if (document.getElementById(counter + 'OnOff').checked == true) {
			document.getElementById(counter + 'OnOff').checked = false
		} else {
			document.getElementById(counter + 'OnOff').checked = true
		}
	}

	var counterClass = document.querySelectorAll('.' + counter)

	if (document.getElementById(counter + 'OnOff').checked == false) {
		var displayVar = 'none'
		if (counter == 'minigame' && (document.getElementById('minigameWinsOnOff').checked == true || document.getElementById('minigameMiniStarsOnOff').checked == true)) {
			document.getElementById('minigameWinsOnOff').checked = false
			document.getElementById('minigameMiniStarsOnOff').checked = false
		} else if (counter == 'running' && document.getElementById('slowOnOff').checked == true) {
			document.getElementById('slowOnOff').checked = false
			highlight('running')
		} else if (counter == 'stars' && document.getElementById('inclBonusOnOff').checked == true) {
			document.getElementById('inclBonusOnOff').checked = false
		}
		if (counter == 'stars' && document.getElementById('miniStarsOnOff').checked == true) {
			document.getElementById('miniStarsOnOff').checked = false
		} else if (counter == 'stars' && document.getElementById('bananasOnOff').checked == true) {
			document.getElementById('bananasOnOff').checked = false
		}

	} else {
		var displayVar = ''
	}

	for (var num = 0; num < counterClass.length; num++) {
		counterClass[num].style.display = displayVar
	}

	if (start) {} else if (callSlowStar == true && counter == 'running') {
		slowStar()
		callSlowStar = false
	}
	if (counter == 'minigame') {
		minigameWins()
	}
	if ((document.getElementById('starsOnOff').checked == true && document.getElementById('inclBonusOnOff').checked == true) || counter == 'stars') {
		updateStars()
	}
}

/*
* Calls displayOnOff() when loading the page.
*/
function callDisplayOnOff () {
	displayOnOff('happening', true, true)
	displayOnOff('minigame', true, true)
	displayOnOff('redSpace', true, true)
	displayOnOff('running', true, true)
	displayOnOff('shopping', true, true)
	displayOnOff('orb', true, true)
	displayOnOff('candy', true, true)
	displayOnOff('item', true, true)
	displayOnOff('friendSpace', true, true)
	displayOnOff('hex', true, true)
	displayOnOff('spinSpace', true, true)
	displayOnOff('minus', true, true)
	displayOnOff('specialDice', true, true)
	displayOnOff('stars', true, true)
	displayOnOff('coins', true, true)
	displayOnOff('ally', true, true)
	displayOnOff('stompy', true, true)
	displayOnOff('doormat', true, true)
}

/*
* Show/Hide a certain element.
* Adds or removes the classes "hidden" and "visible" which respectively hides and shows a element based on a id given.
*
* @param {array} ids Which elements should be hidden or shown.
*/
function showHideDiv (ids) {
	for (let num = 0; num < ids.length; num++) {
		var div = document.getElementById(ids[num]).classList

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
	var ids = ['generalMPO', 'textOutput', 'player', 'counter', 'tutorial']
	for (let num = 0; num < 5; num++) {
		document.getElementById(ids[num] + 'Settings').classList.add('hidden')
		document.getElementById(ids[num] + 'Settings').classList.remove('visible')
		document.getElementById(ids[num] + 'Selector').classList.remove('settingsSelected')
	}
	document.getElementById(id + 'Settings').classList.add('visible')
	document.getElementById(id + 'Settings').classList.remove('hidden')
	document.getElementById(id + 'Selector').classList.add('settingsSelected')

}

/*
* Changes visibility from visible to hidden and vice versa.
* 
* @param {string} id Which element should be changed
*/
function changeVisibility (id) {
	if (document.getElementById(id).style.visibility == 'hidden') {
		document.getElementById(id).style.visibility = 'visible'
	} else if (document.getElementById(id).style.visibility == 'visible') {
		document.getElementById(id).style.visibility = 'hidden'
	}
}

/*
* Closes the settings if the user doesn't click on the settings while they are opened.
*
* @param {string} event What event got fired.
*/
function windowOnClick (event) {
	var settings = document.querySelector("#settings")
	var colorPickTest = document.querySelector('#colorPickTest')
	if (event.target === settings) {
		showHideDiv(['settings'])
	} else if (event.target === colorPickTest){
		showHideDiv(['colorPickTest'])
	}
}

/*
* Checks if Ctrl is pressed.
*/
function ctrlPressed (e) {
	if (e.ctrlKey && ctrlKeyVar == false) {
		ctrlKeyVar = true
		if (document.getElementById('mobileTypeMinus').checked == false) {
			document.getElementById('mobileTypeMinus').checked = true
		} else if (document.getElementById('mobileTypeMinus').checked == true) {
			document.getElementById('mobileTypeMinus').checked = false
		}
	} else if (e.key == '1') {
		document.getElementById('type1').checked = true
	} else if (e.key == '5') {
		document.getElementById('type5').checked = true
	} else if (e.key == '0') {
		document.getElementById('type10').checked = true
	}
}

/*
* Checks if Ctrl is released.
*/
function ctrlReleased (e) {
	if (ctrlKeyVar == true) {
		ctrlKeyVar = false
		if (document.getElementById('mobileTypeMinus').checked == false) {
			document.getElementById('mobileTypeMinus').checked = true
		} else if (document.getElementById('mobileTypeMinus').checked == true) {
			document.getElementById('mobileTypeMinus').checked = false
		}
	}
}

var ctrlKeyVar = false
window.onkeydown = ctrlPressed
window.onkeyup = ctrlReleased

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
		window.open('', 'mpoSettings')
	} else if (document.getElementById('autoPopout').checked == true) {
		mpoSettingsPopout()
	} else {
		showHideDiv(['settings'])
	}
}

/*
* Opens the greenscreen test on the main window.
*/
function openGreenscreenTest () {
	if (popout == true) {
		sendMessage('openGreenscreenTest')
	} else {
		document.getElementById('settings').classList.remove('visible')
		document.getElementById('settings').classList.add('hidden')
		showHideDiv(['colorPickTest'])
	}
}

/*
* Changes the checked attribute of an element
* 
* @param {string} id The ID of the element that should be changed.
* @param {boolean} checkedVar If it should be checked or unchecked. If not specified it just changes the attribute.
*/
function editCheckbox (id, checkedVar) {
	if (checkedVar || (checkedVar != 'true' && checkedVar != 'false')) {} else {
		if (document.getElementById(id).checked == true) {
			checkedVar = false
		} else {
			checkedVar = true
		}
	}
	document.getElementById(id).checked = stringToBoolean(checkedVar)
}

/*
* Changes the value of an ID.
* 
* @param {string} id The ID of the element that should be changed.
* @param {boolean} checkedVar The value it should be changed to.
*/
function editValue (id, valueVar) {
	document.getElementById(id).value = valueVar
}

/*
* Changes the InnerHTML value of an ID.
* 
* @param {string} id The ID of the element that should be changed.
* @param {boolean} checkedVar The InnerHTML value it should be changed to.
*/
function editInnerHTML (id, innerHTMLVar) {
	document.getElementById(id).value = innerHTMLVar
}

/*
* Checks if it's executed in the popout and calls sendMessage() if it is.
* 
* @param {string} functionName The function that should be called in the main window.
* @param {string} id The first attribute.
* @param {string} attribute Other attributes.
*/
function sendSettingsMsg (functionName, id, attribute) {
	if (popout == true) {
		sendMessage(functionName + ',' + id + ',' + attribute)
	}
}

/*
* Sends a message to the settings-popout/main window with a funcion in it.
* 
* @param {string} text String with a funtion pointer in it that will be executed when received.
*/
function sendMessage (text) {
	if (popoutActivated == true) {
		mpoSettings.postMessage(text, '*')
	} else {
		mpoMain.postMessage(text, '*')
	}
	console.log('[MPO] Message sent: ' + text)
}

/*
* Receives Message from Settings-popout/main window and executes the function in it.
*/
function receiveMessage (e) {
	console.log('[MPO] Message received: ' + e.data)
	popoutActivated = true
	var args = e.data.split(',')

	for (let num = 0; num < args.length; num++) {
		if (isNaN(args[num]) == false) {
			args[num] = parseInt(args[num])
		}
	}

	var functionName = args[0]
	args.splice(0, 1)

	if (args.length == 0) {
		executeFunctionByName(functionName)
	} else {
		executeFunctionByName(functionName, args)
	}
}

/*
* Executes a function from a string.
* 
* @param {string} functionName The name of the function that should be executed.
* @param {array} args Arguments that should be used.
*/
function executeFunctionByName(functionName, args) {
	var context = window
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
	popoutActivated = false
	console.log('[MPO] Popout deactivated.')
}

/*
* Closes the popout
*/
function closePopout () {
	if (popout == true) {
		window.close()
	} else {
		sendMessage('closePopout')
	}
}

/*
* Creates a settings pop-out
*/
var mpoMain
var mpoSettings
var popoutActivated = false
function mpoSettingsPopout () {
	if (popout != true) {
		document.getElementById('settings').classList.remove('visible')
		document.getElementById('settings').classList.add('hidden')
		saveSettings()
		savePlayers()

		if (popoutActivated == true) {
			window.open('', 'mpoSettings')
		} else {
			mpoSettings = window.open('index.html?p=1', 'mpoSettings', 'height=800px,width=930px')
			console.log('[MPO] Popout activated.')
		}
		popoutActivated = true
	}
}


window.onload = prepareMPO()
window.onload = changeBGColor('bgColor')

window.addEventListener("click", windowOnClick)
window.addEventListener("message", receiveMessage, false)

window.onbeforeunload = function(){
	if (popout == true) {
		sendMessage('popoutClosed')
	} else {
		closePopout()
	}
}

document.getElementById('type1').focus()