var mobile = document.getElementById('mobileSettings') //Used to check if the mobile version of MPO is used

/*
* Updates Input elements of the counters.
* Is activated at each button press and updates the value from the Input elements.
*
* @param {number} player Which player should be updated.
* @param {string} action What should be done.
* @param {string} amount The amount that should be changed
* @param {string} counter Which counter should be updated.
*/
function counterButtons (player, action, amount, counter) {
	//console.log('Player: ' + player + ', action: ' + action + ', amount: ' + amount + ', counter: ' + counter)
	if (amount == '') {
			amount = 1
		}

	if (counter != 'curTurn' && counter != 'maxTurn' && counter != 'coinStar') {

		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				document.getElementById('p' + player + counter + 'Input').value++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				document.getElementById('p' + player + counter + 'Input').value--
			}
		}

		displayChange(player, counter)
	} else {
		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				document.getElementById(counter + 'Input').value++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				document.getElementById(counter + 'Input').value--
			}
		}
	}

	if (counter == 'coinStar') {
		coinStar()
	} else if (counter == 'maxTurn' || counter == 'curTurn') {
		turns()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight(counter)
	}

	if (document.getElementById('slowStarActivated').checked == true) {
		slowHighlight()
	}
}

/*
* Calls counterButtons() for the mobile site.
* 
* @param {string} counter Which counter should be updated.
* @param {player} player Which player should be updated.
*/
function mobileButtons (counter, player) {
	var action = ''
	var amount = 0

	if (document.getElementById('mobileTypeMinus').checked == true) {
		action = 'M'
	} else {
		action = 'P'
	}

	if (document.getElementById('type5').checked == true) {
		amount = 5
	} else if (document.getElementById('type6').checked == true) {
		amount = 6
	} else if (document.getElementById('type10').checked == true) {
		amount = 10
	} else {
		amount = ''
	}
	counterButtons(player, action, amount, counter)
}

/*
* Checks if Ctrl is pressed.
*/
function ctrlPressed (e) {
	if (mobile) {
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
		} else if (e.key == '6') {
			document.getElementById('type6').checked = true
		} else if (e.key == '0') {
			document.getElementById('type10').checked = true
		}
	}
}

/*
* Checks if Ctrl is released.
*/
function ctrlReleased (e) {
	if (mobile) {
		if (ctrlKeyVar == true) {
			ctrlKeyVar = false
			if (document.getElementById('mobileTypeMinus').checked == false) {
				document.getElementById('mobileTypeMinus').checked = true
			} else if (document.getElementById('mobileTypeMinus').checked == true) {
				document.getElementById('mobileTypeMinus').checked = false
			}
		}
	}
}

var ctrlKeyVar = false
window.onkeydown = ctrlPressed
window.onkeyup = ctrlReleased

/*
* Hides and shows counters after pressing the "on/off" buttons.
*
* @param {string} counter Which counter should be hidden/shown.
* @param {boolean} start Hide/show certain counters depending on what they should be (used when loading the site).
*/
var callSlowStar = true

function displayOnOff (counter, start) {
	var counterClass = document.querySelectorAll('.' + counter)
	if (start) {
		if (document.getElementById(counter + 'Visible').value == 'true') {
			var displayVar = ''
		} else {
			var displayVar = 'none'
		}
	} else {
		if (document.getElementById(counter + 'Visible').value == 'true') {
			var displayVar = 'none'
			document.getElementById(counter + 'Visible').value = 'false'
		} else {
			var displayVar = ''
			document.getElementById(counter + 'Visible').value = 'true'
		}
	}

	for (var num = 0; num < counterClass.length; num++) {
		counterClass[num].style.display = displayVar
	}

	if (start) {} else if (callSlowStar == true && counter == 'running') {
		slowStar()
		callSlowStar = false
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
	displayOnOff('spinSpace', true)
	displayOnOff('miniZtar', true)
	displayOnOff('specialDice', true)
}

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
* @param {boolean} changeColor If the highlight color should be changed.
*/
function callHighlight (resetHighlights, changeColor) {
	

	if (resetHighlights == true) {
		var originalHighlightColor = document.getElementById('highlightColor').value
		//var originalHighlightColor = highlightColor
		var textColor = document.getElementById('textColor').value
		document.getElementById('highlightColor').value = textColor

	} /*else if (changeColor) {
		highlightColor = document.getElementById('highlightColor').value
		originalHighlightColor = highlightColor
	}*/

	if (document.getElementById('enableHighlight').checked == true || resetHighlights) {
		if (document.getElementById('happeningVisible').value == 'true' ) {
			highlight('Happening')
		}
		if (document.getElementById('minigameVisible').value == 'true' ) {
			highlight('Minigame')
		}
		if (document.getElementById('redSpaceVisible').value == 'true' ) {
			highlight('RedSpace')
		}
		if (document.getElementById('runningVisible').value == 'true' && document.getElementById('slowStarActivated').checked == false ) {
			highlight('Running')
		} else if (document.getElementById('runningVisible').value == 'true' && document.getElementById('slowStarActivated').checked == true ) {
			slowHighlight()
		}
		if (document.getElementById('shoppingVisible').value == 'true' ) {
			highlight('Shopping')
		}
		if (document.getElementById('orbVisible').value == 'true' ) {
			highlight('Orb')
		}
		if (document.getElementById('candyVisible').value == 'true' ) {
			highlight('Candy')
		}
		if (document.getElementById('spinSpaceVisible').value == 'true' ) {
			highlight('SpinSpace')
		}
		if (slowStarActivated == true) {
			slowHighlight()
		}
		if (document.getElementById('miniZtarVisible').value == 'true' ) {
			highlight('MiniZtar')
		}
		if (document.getElementById('specialDiceVisible').value == 'true' ) {
			highlight('SpecialDice')
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
* @param {string} color Which color the highlight should have.
*/
function highlight (counter) {
	var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
	var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
	var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
	var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

	var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

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

/*
* Turns the slow star feature on or off.
*/
function slowStar () {
	if (document.getElementById('runningVisible').value == 'false') {
		displayOnOff('running')
	}

	if (mobile) {} else {
		for (let num = 1; num < 5; num++) {
			if (document.getElementById('slowStarActivated').checked == true) {
				document.getElementById('p' + num + 'RunningInputM10').style.display = 'none'
				document.getElementById('p' + num + 'RunningInputP10').style.display = 'none'
				document.getElementById('p' + num + 'RunningInputM6').style.display = ''
				document.getElementById('p' + num + 'RunningInputP6').style.display = ''
			} else {
				document.getElementById('p' + num + 'RunningInputM10').style.display = ''
				document.getElementById('p' + num + 'RunningInputP10').style.display = ''
				document.getElementById('p' + num + 'RunningInputM6').style.display = 'none'
				document.getElementById('p' + num + 'RunningInputP6').style.display = 'none'
			}
		}
	}
	if (document.getElementById('slowStarActivated').checked == true && document.getElementById('enableHighlight').checked == true) {
		slowHighlight()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight('Running')
	}
}

/*
* Highlights the slow star.
*
* @param {string} color Which color the highlight should have.
*/
function slowHighlight () {
		var counter = 'Running'

		var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
		var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
		var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
		var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

		var counterNumMax = Math.max(counterP1, counterP2, counterP3, counterP4)
		var counterNumMin = Math.min(counterP1, counterP2, counterP3, counterP4)

		var highlightColor = document.getElementById('highlightColor').value
		var textColor = document.getElementById('textColor').value

		if (counterP1 == 0) {
			document.getElementById('p1' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP1 || counterNumMin == counterP1) {
			document.getElementById('p1' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p1' + counter + 'Text').style.color = textColor
		}

		if (counterP2 == 0) {
			document.getElementById('p2' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP2 || counterNumMin == counterP2) {
			document.getElementById('p2' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p2' + counter + 'Text').style.color = textColor
		}

		if (counterP3 == 0) {
			document.getElementById('p3' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP3 || counterNumMin == counterP3) {
			document.getElementById('p3' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p3' + counter + 'Text').style.color = textColor
		}

		if (counterP4 == 0) {
			document.getElementById('p4' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP4 || counterNumMin == counterP4) {
			document.getElementById('p4' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p4' + counter + 'Text').style.color = textColor
		}
}

/*
* Replaces minigame coins with minigame wins.
*/
function minigameWins () {
	var activated = document.getElementById('minigameWinsActivated').checked
	var playerNum = 1
	var source = 'img/minigamewins.png'

	if (activated == true) {
		source = 'img/minigamewins.png'
		if (mobile) {} else if (document.getElementById('changeNames').checked == false) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Wins:'
		}
	} else {
		source = 'img/minigame.png'
		if (mobile) {} else if (document.getElementById('changeNames').checked == false) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Coins:'
		}
	}
	
	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'MinigameDisplay').src = source
	}
}

/*
* Changes Character Images.
*
* @param {number} playerNum Which player should be updated.
*/
function imgSelect (playerNum) {
	var character = document.getElementById('p' + playerNum + 'Select').value
	
	document.getElementById('p' + playerNum + 'Img').src = "img/" + character + ".png"
	
	if (document.getElementById('p' + playerNum + 'Com').checked == true) {
		document.getElementById('p' + playerNum + 'ComDisplay').style.visibility = 'visible'
	} else {
		document.getElementById('p' + playerNum + 'ComDisplay').style.visibility = 'hidden'
	}

	coinStarTie()
}

/*
* Changes counter displays and input.
* Gets fired from displayChange() which gets fired after updating a counter. Checks if the number is 0 or more, else sets it to 0, after that it updates the display.
*
* @param {number} playerNum Which player should get updated.
* @param {string} counter Which counter should get updated.
*/
function displayChange (playerNum, counter) {
	var num = document.getElementById('p' + playerNum + counter + 'Input').value

	if (num && num >= 0) {
		document.getElementById('p' + playerNum + counter + 'Text').innerHTML=num;
		
	} else if (num && num <= 0) {
		document.getElementById('p' + playerNum + counter + 'Input').value = 0
		document.getElementById('p' + playerNum + counter + 'Text').innerHTML= 0
	}
}

/*
* Calls displayChange() for every single counter and player.
*/
function callDisplayChange () {
	var counter = 'Happening'

	for (let num = 0; num < 10; num++) {
		if (num == 0) {
			counter  = 'Happening'
		} else if (num == 1) {
			counter = 'Minigame'
		} else if (num == 2) {
			counter = 'RedSpace'
		} else if (num == 3) {
			counter = 'Running'
		} else if (num == 4) {
			counter = 'Shopping'
		} else if (num == 5) {
			counter = 'Orb'
		} else if (num == 6) {
			counter = 'Candy'
		} else if (num == 7) {
			counter = 'SpinSpace'
		} else if (num == 8) {
			counter = 'MiniZtar'
		} else if (num == 9) {
			counter = 'SpecialDice'
		}

		for (let num = 1; num < 5; num++) {
			displayChange(num, counter)
		}
	}
}

/*
* Changes turns displays and input.
* Gets fired from displayChange() which gets fired after updating the turns. Checks if the number is 1 or more and that the current turn does not exceed the max turn, after that it updates the display.
*/
function turns () {
	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value

	if (curTurnVar <= 1) {
		document.getElementById('curTurnInput').value = 1
	} else if (+curTurnVar > +maxTurnVar) {
		document.getElementById('curTurnInput').value = maxTurnVar
	}

	if (maxTurnVar <= 5) {
		document.getElementById('maxTurnInput').value = 5
	}

	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value
	console.log('Current:' + curTurnVar + ' Max:' + maxTurnVar)

	document.getElementById('curTurnText').innerHTML= curTurnVar + '/' + maxTurnVar
}

/*
* Updates the coin star display.
* Gets fired from displayChange() which gets fired after updating the coin star. Checks if the number is 0 or more, after that it updates the display.
*/
function coinStar () {
	var coinStarVar = document.getElementById('coinStarInput').value
	if (coinStarVar && coinStarVar > 0) {
		document.getElementById('coinStarText').innerHTML = coinStarVar
	} else if (coinStarVar <= 0) {
		document.getElementById('coinStarInput').value = 0
		document.getElementById('coinStarText').innerHTML = document.getElementById('coinStarInput').value
	}
}

/*
* Updates the coin star display.
* 
* @param {number} player Updates the coin star for that specific player
*/
function coinStarTie (player) {
	if (player && mobile) {
		if (document.getElementById('p' + player + 'CoinStarTie').checked == true) {
			document.getElementById('p' + player + 'CoinStarTie').checked = false
		} else {
			document.getElementById('p' + player + 'CoinStarTie').checked = true
		}
	}

	if (document.getElementById('noTie').checked == true && player && document.getElementById('p' + player + 'CoinStarTie').checked == true) {
		switch (player) {
			case 1:
			document.getElementById('p2CoinStarTie').checked = false
			document.getElementById('p3CoinStarTie').checked = false
			document.getElementById('p4CoinStarTie').checked = false
				break;
			case 2:
			document.getElementById('p1CoinStarTie').checked = false
			document.getElementById('p3CoinStarTie').checked = false
			document.getElementById('p4CoinStarTie').checked = false
				break;
			case 3:
			document.getElementById('p1CoinStarTie').checked = false
			document.getElementById('p2CoinStarTie').checked = false
			document.getElementById('p4CoinStarTie').checked = false
				break;
			case 4:
			document.getElementById('p1CoinStarTie').checked = false
			document.getElementById('p2CoinStarTie').checked = false
			document.getElementById('p3CoinStarTie').checked = false
				break;
		}
	}

	document.getElementById('coinStarTie1').style.height = ''
	document.getElementById('coinStarTie1').style.top = ''
	document.getElementById('coinStarTie1').style.left = ''

	document.getElementById('coinStarTie4').style.height = ''
	document.getElementById('coinStarTie4').style.top = ''
	document.getElementById('coinStarTie4').style.left = ''

	var player1 = document.getElementById('p1CoinStarTie').checked
	var player2 = document.getElementById('p2CoinStarTie').checked
	var player3 = document.getElementById('p3CoinStarTie').checked
	var player4 = document.getElementById('p4CoinStarTie').checked

	var character1 = document.getElementById('p1Select').value
	var character2 = document.getElementById('p2Select').value
	var character3 = document.getElementById('p3Select').value
	var character4 = document.getElementById('p4Select').value

	var tied = []

	if (player1 == true) {
		tied.push(character1)
	}
	if (player2 == true) {
		tied.push(character2)
	}
	if (player3 == true) {
		tied.push(character3)
	}
	if (player4 == true) {
		tied.push(character4)
	}

	document.getElementById('coinStarTie1').src = 'img/tie.png'
	document.getElementById('coinStarTie2').src = 'img/tie.png'
	document.getElementById('coinStarTie3').src = 'img/tie.png'
	document.getElementById('coinStarTie4').src = 'img/tie.png'
	document.getElementById('coinStarTie5').src = 'img/tie.png'
	document.getElementById('coinStarCharacter').src = 'img/tie.png'

	if (document.getElementById('noTie').checked == true && tied.length != 1 || tied.length == 0) {
		document.getElementById('coinStarCharacter').src = 'img/question.png'

		} else if (tied.length == 1) {
		document.getElementById('coinStarCharacter').src = 'img/' + tied[0] + '.png'

		

	} else if (tied.length == 2) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + tied[1] + '.png'

		document.getElementById('coinStarTie1').style.height = '32px'
		document.getElementById('coinStarTie1').style.top = '-24px'
		document.getElementById('coinStarTie1').style.left = '42px'

		document.getElementById('coinStarTie4').style.height = '32px'
		document.getElementById('coinStarTie4').style.top = '-2px'
		document.getElementById('coinStarTie4').style.left = '-31px'

	} else if (tied.length == 3) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + tied[1] + '.png'
		document.getElementById('coinStarTie5').src = 'img/' + tied[2] + '.png'

	} else if (tied.length == 4) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + tied[1] + '.png'
		document.getElementById('coinStarTie3').src = 'img/' + tied[2] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + tied[3] + '.png'

	}
}

/*
* Show/Hide a certain element.
* Adds or removes the classes "hidden" and "visible" which respectively hides and shows a element based on a id given.
*
* @param {string} id Which element should be hidden or shown.
* @param {string} id2 A optional secondary id which should be hidden or shown.
*/
function showHideDiv (id, id2) {
	var div = document.getElementById(id).classList
	console.log(div)
	if (div == 'hidden') {
		document.getElementById(id).classList.add('visible');
		document.getElementById(id).classList.remove('hidden');
	} else {
		document.getElementById(id).classList.remove('visible');
		document.getElementById(id).classList.add('hidden');
	}
	if (id2) {
		var div = document.getElementById(id2).classList
		console.log(div)
		if (div == 'hidden') {
			document.getElementById(id2).classList.add('visible');
			document.getElementById(id2).classList.remove('hidden');
		} else {
			document.getElementById(id2).classList.remove('visible');
			document.getElementById(id2).classList.add('hidden');
		}
	}
}

/*
* Show certain settings and hide all others, also updates the cursor.
*
* @param {string} id Which settings should be shown.
*/
function showHideSettings (id) {
	document.getElementById('generalMPOSettings').style.display = 'none'
	document.getElementById('textOutputSettings').style.display = 'none'
	document.getElementById('twitchSettings').style.display = 'none'
	document.getElementById('commandSettings').style.display = 'none'

	document.getElementById('generalMPOSettingsTitle').style.cursor = 'pointer'
	document.getElementById('textOutputSettingsTitle').style.cursor = 'pointer'
	document.getElementById('twitchSettingsTitle').style.cursor = 'pointer'
	document.getElementById('commandSettingsTitle').style.cursor = 'pointer'

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
* Shows and hides the reset settings text.
*/
function showHideReset () {
	if (document.getElementById('resetSettingsDiv').style.visibility == 'hidden') {
		document.getElementById('resetSettingsDiv').style.visibility = 'visible'
		document.getElementById('resetSettingsButton').innerHTML = 'Don\'t reset'
	} else {
		document.getElementById('resetSettingsDiv').style.visibility = 'hidden'
		document.getElementById('resetSettingsButton').innerHTML = 'Reset Settings'
	}
}

/*
* Outputs all counters as text.
*/
function textOutput () {
	//Get character from select element
	var p1 = document.getElementById('p1Select').options[document.getElementById('p1Select').selectedIndex].text
	var p2 = document.getElementById('p2Select').options[document.getElementById('p2Select').selectedIndex].text
	var p3 = document.getElementById('p3Select').options[document.getElementById('p3Select').selectedIndex].text
	var p4 = document.getElementById('p4Select').options[document.getElementById('p4Select').selectedIndex].text


	//Use player name if specified instead of character
	if (document.getElementById('toP1Name').value != '') {
		p1 = document.getElementById('toP1Name').value
	}
	if (document.getElementById('toP2Name').value != '') {
		p2 = document.getElementById('toP2Name').value
	}
	if (document.getElementById('toP3Name').value != '') {
		p3 = document.getElementById('toP3Name').value
	}
	if (document.getElementById('toP4Name').value != '') {
		p4 = document.getElementById('toP4Name').value
	}

	var joinString = document.getElementById('toSeperation').value

	var counters = document.getElementById('toCounters').value.split(', ')
	var names = document.getElementById('toOutput').value.split(', ')

	var output = []
	var forResult = []

	for (let num = 0; num < counters.length; num++) {
		counters[num] = counters[num].replace(/\s/g, '')

		//Add all specified counters to output array
		switch (counters[num].toLowerCase()) {
			case 'turn':
			case 'turns':
				output[num] = names[num] + ': ' + document.getElementById('curTurnInput').value + '/' + document.getElementById('maxTurnInput').value
				break;

			case 'coin':
			case 'coinstar':
				var coinStarP1 = document.getElementById('p1CoinStarTie').checked
				var coinStarP2 = document.getElementById('p2CoinStarTie').checked
				var coinStarP3 = document.getElementById('p3CoinStarTie').checked
				var coinStarP4 = document.getElementById('p4CoinStarTie').checked

				var coinStar = []

				if (coinStarP1 == true) {
					coinStar.push(p1)
				}
				if (coinStarP2 == true) {
					coinStar.push(p2)
				}
				if (coinStarP3 == true) {
					coinStar.push(p3)
				}
				if (coinStarP4 == true) {
					coinStar.push(p4)
				}

				var coinStarString = coinStar.join(' & ')

				if (document.getElementById('noTie').checked == true && (coinStar.length > 1 || coinStar.length == 0)) {
					coinStarString = 'multiple'
				} else if (coinStar.length == 4 || coinStar.length == 0) {
					if (document.getElementById('toListAllCoin').checked == false) {
						coinStarString = 'everyone'
					} else {
						coinStar.push(p1)
						coinStar.push(p2)
						coinStar.push(p3)
						coinStar.push(p4)
						coinStarString = coinStar.join(' & ')
					}
				}

				output[num] = names[num] + ': ' + document.getElementById('coinStarInput').value + ' ' + coinStarString
				break;

			default: //Add everything new to textOutputTest() too
				if (counters[num] == 'MinusStar') {
					counters[num] = 'MiniZtar'
				}

				if (document.getElementById('toBonusOnly').checked == true) {
					var result = []
					var resultNum = []

					var counterP1 = document.getElementById('p1' + counters[num] + 'Text').innerHTML
					var counterP2 = document.getElementById('p2' + counters[num] + 'Text').innerHTML
					var counterP3 = document.getElementById('p3' + counters[num] + 'Text').innerHTML
					var counterP4 = document.getElementById('p4' + counters[num] + 'Text').innerHTML

					var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

					if (counterP1 == counterP2 && counterP1 == counterP3 && counterP1 == counterP4 && document.getElementById('toListAll').checked == false) {
						result.push('everyone')
						resultNum.push(document.getElementById('p1' + counters[num] + 'Input').value)
					} else {
						if (counterNum == counterP1) {
							result.push(p1)
							resultNum.push(document.getElementById('p1' + counters[num] + 'Input').value)
						}

						if (counterNum == counterP2) {
							result.push(p2)
							resultNum.push(document.getElementById('p2' + counters[num] + 'Input').value)
						}

						if (counterNum == counterP3) {
							result.push(p3)
							resultNum.push(document.getElementById('p3' + counters[num] + 'Input').value)
						}

						if (counterNum == counterP4) {
							result.push(p4)
							resultNum.push(document.getElementById('p4' + counters[num] + 'Input').value)
						}
					}


					if (document.getElementById('toShowNum').checked == false) { //if a number should be displayed next to the player that got the bonus star
						var resultString = result.join(' & ')
						output[num] = names[num] + ': ' + resultString

					} else {
						//var forNum = counters.length++
						
						console.log('forResult: ' + forResult)

						switch (result.length) {
							case 1:
								forResult.push(names[num] + ': ' + result[0] + ' ' + resultNum[0])
								break;
							case 2:
								forResult.push(names[num] + ': ' + result[0] + ' & ' + result[1] + ' ' + resultNum[0])
								break;
							case 3:
								forResult.push(names[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' ' + resultNum[0])
								break;
							case 4:
								forResult.push(names[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' & ' + result[3] + ' ' + resultNum[0])
								break;
						}
						

						output[num] = forResult.join('')
						forResult = []
					}

				} else {
					output[num] = names[num] + ': ' + p1 + ' ' + document.getElementById('p1' + counters[num] + 'Input').value + ', ' + p2 + ' ' + document.getElementById('p2' + counters[num] + 'Input').value + ', ' + p3 + ' ' + document.getElementById('p3' + counters[num] + 'Input').value + ', ' + p4 + ' ' + document.getElementById('p4' + counters[num] + 'Input').value
				}
		}
	}

	var outputString = output.join(joinString)

	var outputElement = document.getElementById('textOutput')
	outputElement.value = outputString
	outputElement.select()
	outputElement.focus()
	document.execCommand("copy");

	console.log(outputString)

}

/*
* Checks if the counters inserted in the settings for the text output feature are correct, if not it removes them.
* 
* @param {boolean} nameonly If true it won't check if everything inside the counters textarea is correct.
*/
function textOutputTest (nameonly) {
	var counters = document.getElementById('toCounters').value.split(', ')
	var names = document.getElementById('toOutput').value.split(', ')
	var error = []

	if (nameonly != true) {
		for (let num = 0; num < counters.length; num++) {
			counters[num] = counters[num].replace(/\s/g, '')

			switch (counters[num].toLowerCase()) {
				case 'turn':
				case 'turns':
					break;
				case 'coin':
				case 'coinstar':
					break;
				default: //Add everything new to textOutput() too
					if (counters[num] == 'MinusStar') {
						counters[num] = 'MiniZtar'
					}
					if (document.getElementById('p1' + counters[num] + 'Input')) {} else {
						error.push(counters[num])
					}
					break;
			} 
		}
	}

	if (error.length == 1) {
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" isn\'t a valid counter.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (error.length > 1) {
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" aren\'t valid counters.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (counters.length > names.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Counter name(s) missing.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (counters.length < names.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Too many counter names.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else {
		document.getElementById('textOutputWarning').style = 'visibility: hidden;'
	}
}

/*
* Changes names from a explanation to the bonus star names.
*/
function changeNames () {
	if (mobile) {} else {
		if (document.getElementById('changeNames').checked == true) {
			document.getElementById('happeningExplanation').innerHTML = 'Happening:'
			document.getElementById('minigameExplanation').innerHTML = 'Minigame:'
			document.getElementById('redSpaceExplanation').innerHTML = 'Red Space:'
			document.getElementById('runningExplanation').innerHTML = 'Running:'
			document.getElementById('shoppingExplanation').innerHTML = 'Shopping:'
			document.getElementById('orbExplanation').innerHTML = 'Orb:'
			document.getElementById('candyExplanation').innerHTML = 'Candy:'
			document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Space:'
			document.getElementById('miniZtarExplanation').innerHTML = 'Minus:'
			document.getElementById('specialDiceExplanation').innerHTML = 'Special Dice:'
		} else {
			document.getElementById('happeningExplanation').innerHTML = 'Happening:'
			if (document.getElementById('minigameWinsActivated').checked == true) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Wins:'
		} else {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Coins:'
		}
			document.getElementById('redSpaceExplanation').innerHTML = 'Red Spaces:'
			document.getElementById('runningExplanation').innerHTML = 'Total Dice Num.:'
			document.getElementById('shoppingExplanation').innerHTML = 'Total Coins spent:'
			document.getElementById('orbExplanation').innerHTML = 'Total Orbs used:'
			document.getElementById('candyExplanation').innerHTML = 'Total Candies used:'
			document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Spaces:'
			document.getElementById('miniZtarExplanation').innerHTML = 'Mini Ztars collected:'
			document.getElementById('specialDiceExplanation').innerHTML = 'Total Special Dices used:'
		}
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
		showHideDiv('settings')
	} else if (event.target === tutorial){
		showHideDiv('tutorial')
	} else if (event.target === mobileSettings){
		showHideDiv('mobileSettings')
	} else if (event.target === colorPickTest){
		showHideDiv('colorPickTest')
	}
}

/*
* Checks if something is included in a array.
*
* @param {string} needle Checks if this is included in the array.
* @param {array} arrhaystack The array that should include something.
*/
function arrCon (needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
}

/*
* Changes Themes incl. greenscreen.
* 
* @param {number} theme Which theme should be used.
*/
var bgColor = '#0000ff'
var curTheme = 1
function changeTheme (theme) {
	bgColor = document.getElementById('bgColor').value
	styleExtra = 'no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"'

	if (theme) {} else {
		theme = curTheme
	}

	if (document.getElementById('greenscreen').checked == true) {
		document.getElementById('bodyElement').style.background = bgColor
	} else {
		switch (theme) {
			case 2:
				document.getElementById('bodyElement').style = 'background: url(img/MP9-bg.jpg)' + styleExtra
				curTheme = 2
				break;
			case 3:
				document.getElementById('bodyElement').style = 'background: url(img/NSMBW-bg.jpg)' + styleExtra
				curTheme = 3
				break;
			default:
				document.getElementById('bodyElement').style = 'background: url(img/background.jpg)' + styleExtra
				curTheme = 1
				break;
		}
	}
	document.getElementById('themeB1').style = ''
	document.getElementById('themeB2').style = ''
	document.getElementById('themeB3').style = ''
	document.getElementById('themeB1').disabled = ''
	document.getElementById('themeB2').disabled = ''
	document.getElementById('themeB3').disabled = ''
	switch (theme) {
			case 2:
				document.getElementById('themeB2').style = 'border-color: green;'
				document.getElementById('themeB2').disabled = 'true'
				curTheme = 2
				break;
			case 3:
				document.getElementById('themeB3').style = 'border-color: green;'
				document.getElementById('themeB3').disabled = 'true'
				curTheme = 3
				break;
			default:
				document.getElementById('themeB1').style = 'border-color: green;'
				document.getElementById('themeB1').disabled = 'true'
				curTheme = 1
				break;
		}
}

/*
* Changes background color if greenscreen is used.
* 
* @param {string} id Id of the input element that changed its value.
*/
function changeBGColor (id) {
	bgColor = document.getElementById(id).value
	if (document.getElementById('greenscreen').checked == true) {
		document.getElementById('bodyElement').style.background = bgColor
	}
	document.getElementById('bgColor').value = bgColor
	document.getElementById('bgColorPick').value = bgColor

	document.getElementById('colorPickerBG').style = 'background-color: ' + bgColor + ';'
}


/*
* Resets the Greenscreen color.
*/
function resetBGColor () {
	document.getElementById('bgColor').value = '#0000FF'
	changeBGColor('bgColor')
}

/*
* Changes text color for everything outside of settings.
* 
* @param {string} id Id of the input element that changed its value.
*/
function changeTextColor (id) {
	var whiteText = document.querySelectorAll(".whiteText")
	var counterText = document.querySelectorAll(".counterText")
	var turns = document.querySelectorAll(".turns")
	var mobile = document.querySelectorAll(".mobileTypeLabel")
	var border = document.querySelectorAll(".changesBorder")

	var color = document.getElementById(id).value

	for (var num = 0; num < whiteText.length; num++) {
		whiteText[num].style.color = color
	}
	for (var num = 0; num < counterText.length; num++) {
		counterText[num].style.color = color
	}
	for (var num = 0; num < turns.length; num++) {
		turns[num].style.color = color
	}
	for (var num = 0; num < mobile.length; num++) {
		mobile[num].style.color = color
	}
	for (var num = 0; num < border.length; num++) {
		border[num].style.borderColor = color
	}

	document.getElementById('textColor').value = color
	document.getElementById('textColorTest').value = color
	callHighlight()
}

/*
* Resets the Text color.
*/
function resetTextColor () {
	document.getElementById('textColor').value = '#FFFFFF'
	changeTextColor('textColor')
}

window.addEventListener("click", windowOnClick)

/*
* Enables and disables the ability to drag 'n' drop counters.
*/
var enableInteractVar = false

function enableInteract () {
	if (enableInteractVar == false) {
		enableInteractVar = true
		document.getElementById('enableInteractButton').innerHTML = "Disable Drag 'n' Drop (reload to reset positions)"
	} else if (enableInteractVar == true) {
		enableInteractVar = false
		document.getElementById('enableInteractButton').innerHTML = "Enable Drag 'n' Drop (reload to reset positions)"
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
	if (enableInteractVar == true) {
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

window.onload = prepareMPO()
window.onload = changeBGColor('bgColor')

if (mobile) {
	document.getElementById('type1').focus()
=======
var mobile = document.getElementById('mobileSettings') //Used to check if the mobile version of MPO is used

/*
* Updates Input elements of the counters.
* Is activated at each button press and updates the value from the Input elements.
*
* @param {number} player Which player should be updated.
* @param {string} action What should be done.
* @param {string} amount The amount that should be changed
* @param {string} counter Which counter should be updated.
*/
function counterButtons (player, action, amount, counter) {
	//console.log('Player: ' + player + ', action: ' + action + ', amount: ' + amount + ', counter: ' + counter)
	if (amount == '') {
			amount = 1
		}

	if (counter != 'curTurn' && counter != 'maxTurn' && counter != 'coinStar') {

		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				document.getElementById('p' + player + counter + 'Input').value++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				document.getElementById('p' + player + counter + 'Input').value--
			}
		}

		displayChange(player, counter)
	} else {
		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				document.getElementById(counter + 'Input').value++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				document.getElementById(counter + 'Input').value--
			}
		}
	}

	if (counter == 'coinStar') {
		coinStar()
	} else if (counter == 'maxTurn' || counter == 'curTurn') {
		turns()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight(counter)
	}

	if (document.getElementById('slowStarActivated').checked == true) {
		slowHighlight()
	}
}

/*
* Calls counterButtons() for the mobile site.
* 
* @param {string} counter Which counter should be updated.
* @param {player} player Which player should be updated.
*/
function mobileButtons (counter, player) {
	var action = ''
	var amount = 0

	if (document.getElementById('mobileTypeMinus').checked == true) {
		action = 'M'
	} else {
		action = 'P'
	}

	if (document.getElementById('type5').checked == true) {
		amount = 5
	} else if (document.getElementById('type6').checked == true) {
		amount = 6
	} else if (document.getElementById('type10').checked == true) {
		amount = 10
	} else {
		amount = ''
	}
	counterButtons(player, action, amount, counter)
}

/*
* Checks if Ctrl is pressed.
*/
function ctrlPressed (e) {
	if (mobile) {
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
		} else if (e.key == '6') {
			document.getElementById('type6').checked = true
		} else if (e.key == '0') {
			document.getElementById('type10').checked = true
		}
	}
}

/*
* Checks if Ctrl is released.
*/
function ctrlReleased (e) {
	if (mobile) {
		if (ctrlKeyVar == true) {
			ctrlKeyVar = false
			if (document.getElementById('mobileTypeMinus').checked == false) {
				document.getElementById('mobileTypeMinus').checked = true
			} else if (document.getElementById('mobileTypeMinus').checked == true) {
				document.getElementById('mobileTypeMinus').checked = false
			}
		}
	}
}

var ctrlKeyVar = false
window.onkeydown = ctrlPressed
window.onkeyup = ctrlReleased

/*
* Hides and shows counters after pressing the "on/off" buttons.
*
* @param {string} counter Which counter should be hidden/shown.
* @param {boolean} start Hide/show certain counters depending on what they should be (used when loading the site).
*/
var callSlowStar = true

function displayOnOff (counter, start) {
	var counterClass = document.querySelectorAll('.' + counter)
	if (start) {
		if (document.getElementById(counter + 'Visible').value == 'true') {
			var displayVar = ''
		} else {
			var displayVar = 'none'
		}
	} else {
		if (document.getElementById(counter + 'Visible').value == 'true') {
			var displayVar = 'none'
			document.getElementById(counter + 'Visible').value = 'false'
		} else {
			var displayVar = ''
			document.getElementById(counter + 'Visible').value = 'true'
		}
	}

	for (var num = 0; num < counterClass.length; num++) {
		counterClass[num].style.display = displayVar
	}

	if (start) {} else if (callSlowStar == true && counter == 'running') {
		slowStar()
		callSlowStar = false
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
	displayOnOff('spinSpace', true)
	displayOnOff('miniZtar', true)
	displayOnOff('specialDice', true)
}

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
* @param {boolean} changeColor If the highlight color should be changed.
*/
function callHighlight (resetHighlights, changeColor) {
	

	if (resetHighlights == true) {
		var originalHighlightColor = document.getElementById('highlightColor').value
		//var originalHighlightColor = highlightColor
		var textColor = document.getElementById('textColor').value
		document.getElementById('highlightColor').value = textColor

	} /*else if (changeColor) {
		highlightColor = document.getElementById('highlightColor').value
		originalHighlightColor = highlightColor
	}*/

	if (document.getElementById('enableHighlight').checked == true || resetHighlights) {
		if (document.getElementById('happeningVisible').value == 'true' ) {
			highlight('Happening')
		}
		if (document.getElementById('minigameVisible').value == 'true' ) {
			highlight('Minigame')
		}
		if (document.getElementById('redSpaceVisible').value == 'true' ) {
			highlight('RedSpace')
		}
		if (document.getElementById('runningVisible').value == 'true' && document.getElementById('slowStarActivated').checked == false ) {
			highlight('Running')
		} else if (document.getElementById('runningVisible').value == 'true' && document.getElementById('slowStarActivated').checked == true ) {
			slowHighlight()
		}
		if (document.getElementById('shoppingVisible').value == 'true' ) {
			highlight('Shopping')
		}
		if (document.getElementById('orbVisible').value == 'true' ) {
			highlight('Orb')
		}
		if (document.getElementById('candyVisible').value == 'true' ) {
			highlight('Candy')
		}
		if (document.getElementById('spinSpaceVisible').value == 'true' ) {
			highlight('SpinSpace')
		}
		if (slowStarActivated == true) {
			slowHighlight()
		}
		if (document.getElementById('miniZtarVisible').value == 'true' ) {
			highlight('MiniZtar')
		}
		if (document.getElementById('specialDiceVisible').value == 'true' ) {
			highlight('SpecialDice')
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
* @param {string} color Which color the highlight should have.
*/
function highlight (counter) {
	var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
	var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
	var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
	var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

	var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

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

/*
* Turns the slow star feature on or off.
*/
function slowStar () {
	if (document.getElementById('runningVisible').value == 'false') {
		displayOnOff('running')
	}

	if (mobile) {} else {
		for (let num = 1; num < 5; num++) {
			if (document.getElementById('slowStarActivated').checked == true) {
				document.getElementById('p' + num + 'RunningInputM10').style.display = 'none'
				document.getElementById('p' + num + 'RunningInputP10').style.display = 'none'
				document.getElementById('p' + num + 'RunningInputM6').style.display = ''
				document.getElementById('p' + num + 'RunningInputP6').style.display = ''
			} else {
				document.getElementById('p' + num + 'RunningInputM10').style.display = ''
				document.getElementById('p' + num + 'RunningInputP10').style.display = ''
				document.getElementById('p' + num + 'RunningInputM6').style.display = 'none'
				document.getElementById('p' + num + 'RunningInputP6').style.display = 'none'
			}
		}
	}
	if (document.getElementById('slowStarActivated').checked == true && document.getElementById('enableHighlight').checked == true) {
		slowHighlight()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight('Running')
	}
}

/*
* Highlights the slow star.
*
* @param {string} color Which color the highlight should have.
*/
function slowHighlight () {
		var counter = 'Running'

		var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
		var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
		var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
		var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

		var counterNumMax = Math.max(counterP1, counterP2, counterP3, counterP4)
		var counterNumMin = Math.min(counterP1, counterP2, counterP3, counterP4)

		var highlightColor = document.getElementById('highlightColor').value
		var textColor = document.getElementById('textColor').value

		if (counterP1 == 0) {
			document.getElementById('p1' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP1 || counterNumMin == counterP1) {
			document.getElementById('p1' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p1' + counter + 'Text').style.color = textColor
		}

		if (counterP2 == 0) {
			document.getElementById('p2' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP2 || counterNumMin == counterP2) {
			document.getElementById('p2' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p2' + counter + 'Text').style.color = textColor
		}

		if (counterP3 == 0) {
			document.getElementById('p3' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP3 || counterNumMin == counterP3) {
			document.getElementById('p3' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p3' + counter + 'Text').style.color = textColor
		}

		if (counterP4 == 0) {
			document.getElementById('p4' + counter + 'Text').style.color = textColor
		} else if (counterNumMax == counterP4 || counterNumMin == counterP4) {
			document.getElementById('p4' + counter + 'Text').style.color = highlightColor
		} else {
			document.getElementById('p4' + counter + 'Text').style.color = textColor
		}
}

/*
* Replaces minigame coins with minigame wins.
*/
function minigameWins () {
	var activated = document.getElementById('minigameWinsActivated').checked
	var playerNum = 1
	var source = 'img/minigamewins.png'

	if (activated == true) {
		source = 'img/minigamewins.png'
		if (mobile) {} else if (document.getElementById('changeNames').checked == false) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Wins:'
		}
	} else {
		source = 'img/minigame.png'
		if (mobile) {} else if (document.getElementById('changeNames').checked == false) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Coins:'
		}
	}
	
	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'MinigameDisplay').src = source
	}
}

/*
* Changes Character Images.
*
* @param {number} playerNum Which player should be updated.
*/
function imgSelect (playerNum) {
	var character = document.getElementById('p' + playerNum + 'Select').value
	
	document.getElementById('p' + playerNum + 'Img').src = "img/" + character + ".png"
	
	if (document.getElementById('p' + playerNum + 'Com').checked == true) {
		document.getElementById('p' + playerNum + 'ComDisplay').style.visibility = 'visible'
	} else {
		document.getElementById('p' + playerNum + 'ComDisplay').style.visibility = 'hidden'
	}

	coinStarTie()
}

/*
* Changes counter displays and input.
* Gets fired from displayChange() which gets fired after updating a counter. Checks if the number is 0 or more, else sets it to 0, after that it updates the display.
*
* @param {number} playerNum Which player should get updated.
* @param {string} counter Which counter should get updated.
*/
function displayChange (playerNum, counter) {
	var num = document.getElementById('p' + playerNum + counter + 'Input').value

	if (num && num >= 0) {
		document.getElementById('p' + playerNum + counter + 'Text').innerHTML=num;
		
	} else if (num && num <= 0) {
		document.getElementById('p' + playerNum + counter + 'Input').value = 0
		document.getElementById('p' + playerNum + counter + 'Text').innerHTML= 0
	}
}

/*
* Calls displayChange() for every single counter and player.
*/
function callDisplayChange () {
	var counter = 'Happening'

	for (let num = 0; num < 10; num++) {
		if (num == 0) {
			counter  = 'Happening'
		} else if (num == 1) {
			counter = 'Minigame'
		} else if (num == 2) {
			counter = 'RedSpace'
		} else if (num == 3) {
			counter = 'Running'
		} else if (num == 4) {
			counter = 'Shopping'
		} else if (num == 5) {
			counter = 'Orb'
		} else if (num == 6) {
			counter = 'Candy'
		} else if (num == 7) {
			counter = 'SpinSpace'
		} else if (num == 8) {
			counter = 'MiniZtar'
		} else if (num == 9) {
			counter = 'SpecialDice'
		}

		for (let num = 1; num < 5; num++) {
			displayChange(num, counter)
		}
	}
}

/*
* Changes turns displays and input.
* Gets fired from displayChange() which gets fired after updating the turns. Checks if the number is 1 or more and that the current turn does not exceed the max turn, after that it updates the display.
*/
function turns () {
	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value

	if (curTurnVar <= 1) {
		document.getElementById('curTurnInput').value = 1
	} else if (+curTurnVar > +maxTurnVar) {
		document.getElementById('curTurnInput').value = maxTurnVar
	}

	if (maxTurnVar <= 5) {
		document.getElementById('maxTurnInput').value = 5
	}

	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value
	console.log('Current:' + curTurnVar + ' Max:' + maxTurnVar)

	document.getElementById('curTurnText').innerHTML= curTurnVar + '/' + maxTurnVar
}

/*
* Updates the coin star display.
* Gets fired from displayChange() which gets fired after updating the coin star. Checks if the number is 0 or more, after that it updates the display.
*/
function coinStar () {
	var coinStarVar = document.getElementById('coinStarInput').value
	if (coinStarVar && coinStarVar > 0) {
		document.getElementById('coinStarText').innerHTML = coinStarVar
	} else if (coinStarVar <= 0) {
		document.getElementById('coinStarInput').value = 0
		document.getElementById('coinStarText').innerHTML = document.getElementById('coinStarInput').value
	}
}

/*
* Updates the coin star display.
* 
* @param {number} player Updates the coin star for that specific player
*/
function coinStarTie (player) {
	if (player && mobile) {
		if (document.getElementById('p' + player + 'CoinStarTie').checked == true) {
			document.getElementById('p' + player + 'CoinStarTie').checked = false
		} else {
			document.getElementById('p' + player + 'CoinStarTie').checked = true
		}
	}

	if (document.getElementById('noTie').checked == true && player && document.getElementById('p' + player + 'CoinStarTie').checked == true) {
		switch (player) {
			case 1:
			document.getElementById('p2CoinStarTie').checked = false
			document.getElementById('p3CoinStarTie').checked = false
			document.getElementById('p4CoinStarTie').checked = false
				break;
			case 2:
			document.getElementById('p1CoinStarTie').checked = false
			document.getElementById('p3CoinStarTie').checked = false
			document.getElementById('p4CoinStarTie').checked = false
				break;
			case 3:
			document.getElementById('p1CoinStarTie').checked = false
			document.getElementById('p2CoinStarTie').checked = false
			document.getElementById('p4CoinStarTie').checked = false
				break;
			case 4:
			document.getElementById('p1CoinStarTie').checked = false
			document.getElementById('p2CoinStarTie').checked = false
			document.getElementById('p3CoinStarTie').checked = false
				break;
		}
	}

	document.getElementById('coinStarTie1').style.height = ''
	document.getElementById('coinStarTie1').style.top = ''
	document.getElementById('coinStarTie1').style.left = ''

	document.getElementById('coinStarTie4').style.height = ''
	document.getElementById('coinStarTie4').style.top = ''
	document.getElementById('coinStarTie4').style.left = ''

	var player1 = document.getElementById('p1CoinStarTie').checked
	var player2 = document.getElementById('p2CoinStarTie').checked
	var player3 = document.getElementById('p3CoinStarTie').checked
	var player4 = document.getElementById('p4CoinStarTie').checked

	var character1 = document.getElementById('p1Select').value
	var character2 = document.getElementById('p2Select').value
	var character3 = document.getElementById('p3Select').value
	var character4 = document.getElementById('p4Select').value

	var tied = []

	if (player1 == true) {
		tied.push(character1)
	}
	if (player2 == true) {
		tied.push(character2)
	}
	if (player3 == true) {
		tied.push(character3)
	}
	if (player4 == true) {
		tied.push(character4)
	}

	document.getElementById('coinStarTie1').src = 'img/tie.png'
	document.getElementById('coinStarTie2').src = 'img/tie.png'
	document.getElementById('coinStarTie3').src = 'img/tie.png'
	document.getElementById('coinStarTie4').src = 'img/tie.png'
	document.getElementById('coinStarTie5').src = 'img/tie.png'
	document.getElementById('coinStarCharacter').src = 'img/tie.png'

	if (document.getElementById('noTie').checked == true && tied.length != 1 || tied.length == 0) {
		document.getElementById('coinStarCharacter').src = 'img/question.png'

		} else if (tied.length == 1) {
		document.getElementById('coinStarCharacter').src = 'img/' + tied[0] + '.png'

		

	} else if (tied.length == 2) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + tied[1] + '.png'

		document.getElementById('coinStarTie1').style.height = '32px'
		document.getElementById('coinStarTie1').style.top = '-24px'
		document.getElementById('coinStarTie1').style.left = '42px'

		document.getElementById('coinStarTie4').style.height = '32px'
		document.getElementById('coinStarTie4').style.top = '-2px'
		document.getElementById('coinStarTie4').style.left = '-31px'

	} else if (tied.length == 3) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + tied[1] + '.png'
		document.getElementById('coinStarTie5').src = 'img/' + tied[2] + '.png'

	} else if (tied.length == 4) {
		document.getElementById('coinStarTie1').src = 'img/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + tied[1] + '.png'
		document.getElementById('coinStarTie3').src = 'img/' + tied[2] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + tied[3] + '.png'

	}
}

/*
* Show/Hide a certain element.
* Adds or removes the classes "hidden" and "visible" which respectively hides and shows a element based on a id given.
*
* @param {string} id Which element should be hidden or shown.
* @param {string} id2 A optional secondary id which should be hidden or shown.
*/
function showHideDiv (id, id2) {
	var div = document.getElementById(id).classList
	console.log(div)
	if (div == 'hidden') {
		document.getElementById(id).classList.add('visible');
		document.getElementById(id).classList.remove('hidden');
	} else {
		document.getElementById(id).classList.remove('visible');
		document.getElementById(id).classList.add('hidden');
	}
	if (id2) {
		var div = document.getElementById(id2).classList
		console.log(div)
		if (div == 'hidden') {
			document.getElementById(id2).classList.add('visible');
			document.getElementById(id2).classList.remove('hidden');
		} else {
			document.getElementById(id2).classList.remove('visible');
			document.getElementById(id2).classList.add('hidden');
		}
	}
}

/*
* Show certain settings and hide all others, also updates the cursor.
*
* @param {string} id Which settings should be shown.
*/
function showHideSettings (id) {
	document.getElementById('generalMPOSettings').style.display = 'none'
	document.getElementById('textOutputSettings').style.display = 'none'
	document.getElementById('twitchSettings').style.display = 'none'
	document.getElementById('commandSettings').style.display = 'none'

	document.getElementById('generalMPOSettingsTitle').style.cursor = 'pointer'
	document.getElementById('textOutputSettingsTitle').style.cursor = 'pointer'
	document.getElementById('twitchSettingsTitle').style.cursor = 'pointer'
	document.getElementById('commandSettingsTitle').style.cursor = 'pointer'

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
* Shows and hides the reset settings text.
*/
function showHideReset () {
	if (document.getElementById('resetSettingsDiv').style.visibility == 'hidden') {
		document.getElementById('resetSettingsDiv').style.visibility = 'visible'
		document.getElementById('resetSettingsButton').innerHTML = 'Don\'t reset'
	} else {
		document.getElementById('resetSettingsDiv').style.visibility = 'hidden'
		document.getElementById('resetSettingsButton').innerHTML = 'Reset Settings'
	}
}

/*
* Outputs all counters as text.
*/
function textOutput () {
	//Get character from select element
	var p1 = document.getElementById('p1Select').options[document.getElementById('p1Select').selectedIndex].text
	var p2 = document.getElementById('p2Select').options[document.getElementById('p2Select').selectedIndex].text
	var p3 = document.getElementById('p3Select').options[document.getElementById('p3Select').selectedIndex].text
	var p4 = document.getElementById('p4Select').options[document.getElementById('p4Select').selectedIndex].text


	//Use player name if specified instead of character
	if (document.getElementById('toP1Name').value != '') {
		p1 = document.getElementById('toP1Name').value
	}
	if (document.getElementById('toP2Name').value != '') {
		p2 = document.getElementById('toP2Name').value
	}
	if (document.getElementById('toP3Name').value != '') {
		p3 = document.getElementById('toP3Name').value
	}
	if (document.getElementById('toP4Name').value != '') {
		p4 = document.getElementById('toP4Name').value
	}

	var joinString = document.getElementById('toSeperation').value

	var counters = document.getElementById('toCounters').value.split(', ')
	var names = document.getElementById('toOutput').value.split(', ')

	var output = []
	var forResult = []

	for (let num = 0; num < counters.length; num++) {
		counters[num] = counters[num].replace(/\s/g, '')

		//Add all specified counters to output array
		switch (counters[num].toLowerCase()) {
			case 'turn':
			case 'turns':
				output[num] = names[num] + ': ' + document.getElementById('curTurnInput').value + '/' + document.getElementById('maxTurnInput').value
				break;

			case 'coin':
			case 'coinstar':
				var coinStarP1 = document.getElementById('p1CoinStarTie').checked
				var coinStarP2 = document.getElementById('p2CoinStarTie').checked
				var coinStarP3 = document.getElementById('p3CoinStarTie').checked
				var coinStarP4 = document.getElementById('p4CoinStarTie').checked

				var coinStar = []

				if (coinStarP1 == true) {
					coinStar.push(p1)
				}
				if (coinStarP2 == true) {
					coinStar.push(p2)
				}
				if (coinStarP3 == true) {
					coinStar.push(p3)
				}
				if (coinStarP4 == true) {
					coinStar.push(p4)
				}

				var coinStarString = coinStar.join(' & ')

				if (document.getElementById('noTie').checked == true && (coinStar.length > 1 || coinStar.length == 0)) {
					coinStarString = 'multiple'
				} else if (coinStar.length == 4 || coinStar.length == 0) {
					if (document.getElementById('toListAllCoin').checked == false) {
						coinStarString = 'everyone'
					} else {
						coinStar.push(p1)
						coinStar.push(p2)
						coinStar.push(p3)
						coinStar.push(p4)
						coinStarString = coinStar.join(' & ')
					}
				}

				output[num] = names[num] + ': ' + document.getElementById('coinStarInput').value + ' ' + coinStarString
				break;

			default: //Add everything new to textOutputTest() too
				if (counters[num] == 'MinusStar') {
					counters[num] = 'MiniZtar'
				}

				if (document.getElementById('toBonusOnly').checked == true) {
					var result = []
					var resultNum = []

					var counterP1 = document.getElementById('p1' + counters[num] + 'Text').innerHTML
					var counterP2 = document.getElementById('p2' + counters[num] + 'Text').innerHTML
					var counterP3 = document.getElementById('p3' + counters[num] + 'Text').innerHTML
					var counterP4 = document.getElementById('p4' + counters[num] + 'Text').innerHTML

					var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

					if (counterP1 == counterP2 && counterP1 == counterP3 && counterP1 == counterP4 && document.getElementById('toListAll').checked == false) {
						result.push('everyone')
						resultNum.push(document.getElementById('p1' + counters[num] + 'Input').value)
					} else {
						if (counterNum == counterP1) {
							result.push(p1)
							resultNum.push(document.getElementById('p1' + counters[num] + 'Input').value)
						}

						if (counterNum == counterP2) {
							result.push(p2)
							resultNum.push(document.getElementById('p2' + counters[num] + 'Input').value)
						}

						if (counterNum == counterP3) {
							result.push(p3)
							resultNum.push(document.getElementById('p3' + counters[num] + 'Input').value)
						}

						if (counterNum == counterP4) {
							result.push(p4)
							resultNum.push(document.getElementById('p4' + counters[num] + 'Input').value)
						}
					}


					if (document.getElementById('toShowNum').checked == false) { //if a number should be displayed next to the player that got the bonus star
						var resultString = result.join(' & ')
						output[num] = names[num] + ': ' + resultString

					} else {
						//var forNum = counters.length++
						
						console.log('forResult: ' + forResult)

						switch (result.length) {
							case 1:
								forResult.push(names[num] + ': ' + result[0] + ' ' + resultNum[0])
								break;
							case 2:
								forResult.push(names[num] + ': ' + result[0] + ' & ' + result[1] + ' ' + resultNum[0])
								break;
							case 3:
								forResult.push(names[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' ' + resultNum[0])
								break;
							case 4:
								forResult.push(names[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' & ' + result[3] + ' ' + resultNum[0])
								break;
						}
						

						output[num] = forResult.join('')
						forResult = []
					}

				} else {
					output[num] = names[num] + ': ' + p1 + ' ' + document.getElementById('p1' + counters[num] + 'Input').value + ', ' + p2 + ' ' + document.getElementById('p2' + counters[num] + 'Input').value + ', ' + p3 + ' ' + document.getElementById('p3' + counters[num] + 'Input').value + ', ' + p4 + ' ' + document.getElementById('p4' + counters[num] + 'Input').value
				}
		}
	}

	var outputString = output.join(joinString)

	var outputElement = document.getElementById('textOutput')
	outputElement.value = outputString
	outputElement.select()
	outputElement.focus()
	document.execCommand("copy");

	console.log(outputString)

}

/*
* Checks if the counters inserted in the settings for the text output feature are correct, if not it removes them.
* 
* @param {boolean} nameonly If true it won't check if everything inside the counters textarea is correct.
*/
function textOutputTest (nameonly) {
	var counters = document.getElementById('toCounters').value.split(', ')
	var names = document.getElementById('toOutput').value.split(', ')
	var error = []

	if (nameonly != true) {
		for (let num = 0; num < counters.length; num++) {
			counters[num] = counters[num].replace(/\s/g, '')

			switch (counters[num].toLowerCase()) {
				case 'turn':
				case 'turns':
					break;
				case 'coin':
				case 'coinstar':
					break;
				default: //Add everything new to textOutput() too
					if (counters[num] == 'MinusStar') {
						counters[num] = 'MiniZtar'
					}
					if (document.getElementById('p1' + counters[num] + 'Input')) {} else {
						error.push(counters[num])
					}
					break;
			} 
		}
	}

	if (error.length == 1) {
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" isn\'t a valid counter.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (error.length > 1) {
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" aren\'t valid counters.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (counters.length > names.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Counter name(s) missing.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (counters.length < names.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Too many counter names.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else {
		document.getElementById('textOutputWarning').style = 'visibility: hidden;'
	}
}

/*
* Changes names from a explanation to the bonus star names.
*/
function changeNames () {
	if (mobile) {} else {
		if (document.getElementById('changeNames').checked == true) {
			document.getElementById('happeningExplanation').innerHTML = 'Happening:'
			document.getElementById('minigameExplanation').innerHTML = 'Minigame:'
			document.getElementById('redSpaceExplanation').innerHTML = 'Red Space:'
			document.getElementById('runningExplanation').innerHTML = 'Running:'
			document.getElementById('shoppingExplanation').innerHTML = 'Shopping:'
			document.getElementById('orbExplanation').innerHTML = 'Orb:'
			document.getElementById('candyExplanation').innerHTML = 'Candy:'
			document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Space:'
			document.getElementById('miniZtarExplanation').innerHTML = 'Minus:'
			document.getElementById('specialDiceExplanation').innerHTML = 'Special Dice:'
		} else {
			document.getElementById('happeningExplanation').innerHTML = 'Happening:'
			if (document.getElementById('minigameWinsActivated').checked == true) {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Wins:'
		} else {
			document.getElementById('minigameExplanation').innerHTML = 'Minigame Coins:'
		}
			document.getElementById('redSpaceExplanation').innerHTML = 'Red Spaces:'
			document.getElementById('runningExplanation').innerHTML = 'Total Dice Num.:'
			document.getElementById('shoppingExplanation').innerHTML = 'Total Coins spent:'
			document.getElementById('orbExplanation').innerHTML = 'Total Orbs used:'
			document.getElementById('candyExplanation').innerHTML = 'Total Candies used:'
			document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Spaces:'
			document.getElementById('miniZtarExplanation').innerHTML = 'Mini Ztars collected:'
			document.getElementById('specialDiceExplanation').innerHTML = 'Total Special Dices used:'
		}
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
		showHideDiv('settings')
	} else if (event.target === tutorial){
		showHideDiv('tutorial')
	} else if (event.target === mobileSettings){
		showHideDiv('mobileSettings')
	} else if (event.target === colorPickTest){
		showHideDiv('colorPickTest')
	}
}

/*
* Checks if something is included in a array.
*
* @param {string} needle Checks if this is included in the array.
* @param {array} arrhaystack The array that should include something.
*/
function arrCon (needle, arrhaystack) {
    return (arrhaystack.indexOf(needle) > -1);
}

/*
* Changes Themes incl. greenscreen.
* 
* @param {number} theme Which theme should be used.
*/
var bgColor = '#0000ff'
var curTheme = 1
function changeTheme (theme) {
	bgColor = document.getElementById('bgColor').value
	styleExtra = 'no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"'

	if (theme) {} else {
		theme = curTheme
	}

	if (document.getElementById('greenscreen').checked == true) {
		document.getElementById('bodyElement').style.background = bgColor
	} else {
		switch (theme) {
			case 2:
				document.getElementById('bodyElement').style = 'background: url(img/MP9-bg.jpg)' + styleExtra
				curTheme = 2
				break;
			case 3:
				document.getElementById('bodyElement').style = 'background: url(img/NSMBW-bg.jpg)' + styleExtra
				curTheme = 3
				break;
			default:
				document.getElementById('bodyElement').style = 'background: url(img/background.jpg)' + styleExtra
				curTheme = 1
				break;
		}
	}
	document.getElementById('themeB1').style = ''
	document.getElementById('themeB2').style = ''
	document.getElementById('themeB3').style = ''
	document.getElementById('themeB1').disabled = ''
	document.getElementById('themeB2').disabled = ''
	document.getElementById('themeB3').disabled = ''
	switch (theme) {
			case 2:
				document.getElementById('themeB2').style = 'border-color: green;'
				document.getElementById('themeB2').disabled = 'true'
				curTheme = 2
				break;
			case 3:
				document.getElementById('themeB3').style = 'border-color: green;'
				document.getElementById('themeB3').disabled = 'true'
				curTheme = 3
				break;
			default:
				document.getElementById('themeB1').style = 'border-color: green;'
				document.getElementById('themeB1').disabled = 'true'
				curTheme = 1
				break;
		}
}

/*
* Changes background color if greenscreen is used.
* 
* @param {string} id Id of the input element that changed its value.
*/
function changeBGColor (id) {
	bgColor = document.getElementById(id).value
	if (document.getElementById('greenscreen').checked == true) {
		document.getElementById('bodyElement').style.background = bgColor
	}
	document.getElementById('bgColor').value = bgColor
	document.getElementById('bgColorPick').value = bgColor

	document.getElementById('colorPickerBG').style = 'background-color: ' + bgColor + ';'
}


/*
* Resets the Greenscreen color.
*/
function resetBGColor () {
	document.getElementById('bgColor').value = '#0000FF'
	changeBGColor('bgColor')
}

/*
* Changes text color for everything outside of settings.
* 
* @param {string} id Id of the input element that changed its value.
*/
function changeTextColor (id) {
	var whiteText = document.querySelectorAll(".whiteText")
	var counterText = document.querySelectorAll(".counterText")
	var turns = document.querySelectorAll(".turns")
	var mobile = document.querySelectorAll(".mobileTypeLabel")
	var border = document.querySelectorAll(".changesBorder")

	var color = document.getElementById(id).value

	for (var num = 0; num < whiteText.length; num++) {
		whiteText[num].style.color = color
	}
	for (var num = 0; num < counterText.length; num++) {
		counterText[num].style.color = color
	}
	for (var num = 0; num < turns.length; num++) {
		turns[num].style.color = color
	}
	for (var num = 0; num < mobile.length; num++) {
		mobile[num].style.color = color
	}
	for (var num = 0; num < border.length; num++) {
		border[num].style.borderColor = color
	}

	document.getElementById('textColor').value = color
	document.getElementById('textColorTest').value = color
	callHighlight()
}

/*
* Resets the Text color.
*/
function resetTextColor () {
	document.getElementById('textColor').value = '#FFFFFF'
	changeTextColor('textColor')
}

window.addEventListener("click", windowOnClick)

/*
* Enables and disables the ability to drag 'n' drop counters.
*/
var enableInteractVar = false

function enableInteract () {
	if (enableInteractVar == false) {
		enableInteractVar = true
		document.getElementById('enableInteractButton').innerHTML = "Disable Drag 'n' Drop (reload to reset positions)"
	} else if (enableInteractVar == true) {
		enableInteractVar = false
		document.getElementById('enableInteractButton').innerHTML = "Enable Drag 'n' Drop (reload to reset positions)"
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
	if (enableInteractVar == true) {
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

window.onload = prepareMPO()
window.onload = changeBGColor('bgColor')

if (mobile) {
	document.getElementById('type1').focus()
>>>>>>> 768b992fe1d35fc17098cc3ce6d3ea1b7f9b3576
}