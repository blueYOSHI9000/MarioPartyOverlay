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
		displayOnOff('running')
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
			displayOnOff('minigame')
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
		displayOnOff('stars')
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

function displayOnOff (counter, start) {
	var counterClass = document.querySelectorAll('.' + counter)

	if (document.getElementById(counter + 'OnOff').checked == false) {
		var displayVar = 'none'
		if (counter == 'minigame' && (document.getElementById('minigameWinsOnOff').checked == true || document.getElementById('minigameMiniStarsOnOff').checked == true)) {
			document.getElementById('minigameWinsOnOff').checked = false
			document.getElementById('minigameMiniStarsOnOff').checked = false
		} else if (counter == 'running' && document.getElementById('slowOnOff').checked == true) {
			document.getElementById('slowOnOff').checked = false
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
	displayOnOff('happening', true)
	displayOnOff('minigame', true)
	displayOnOff('redSpace', true)
	displayOnOff('running', true)
	displayOnOff('shopping', true)
	displayOnOff('orb', true)
	displayOnOff('candy', true)
	displayOnOff('item', true)
	displayOnOff('friendSpace', true)
	displayOnOff('hex', true)
	displayOnOff('spinSpace', true)
	displayOnOff('minus', true)
	displayOnOff('specialDice', true)
	displayOnOff('stars', true)
	displayOnOff('coins', true)
	displayOnOff('ally', true)
	displayOnOff('stompy', true)
	displayOnOff('doormat', true)
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
	switch (id) {
		case 'generalMPOSettings':
		case 'textOutputSettings':
			var id1 = 'generalMPOSettings'
			var id2 = 'textOutputSettings'
			break;
		case 'playerSettings':
		case 'counterSettings':
			var id1 = 'playerSettings'
			var id2 = 'counterSettings'
			break;
		case 'tutorialSettings':
		case 'linkSettings':
			var id1 = 'tutorialSettings'
			var id2 = 'linkSettings'
			break;
	}

	document.getElementById(id1).style.display = 'none'
	document.getElementById(id1 + 'Title').style.cursor = 'pointer'

	document.getElementById(id2).style.display = 'none'
	document.getElementById(id2 + 'Title').style.cursor = 'pointer'

	document.getElementById(id).style.display = 'inline'
	document.getElementById(id + 'Title').style.cursor = 'auto'
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
	var tutorial = document.querySelector("#tutorial")
	var mobileSettings = document.querySelector("#mobileSettings")
	var colorPickTest = document.querySelector('#colorPickTest')
	if (event.target === settings) {
		showHideDiv(['settings'])
	} else if (event.target === tutorial){
		showHideDiv(['tutorial'])
	} else if (event.target === mobileSettings){
		showHideDiv(['mobileSettings'])
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

window.onload = prepareMPO()
window.onload = changeBGColor('bgColor')

window.addEventListener("click", windowOnClick)

document.getElementById('type1').focus()