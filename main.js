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
	var result = 0

	if (amount == '') {
			amount = 1
		}

	if (counter != 'curTurn' && counter != 'maxTurn' && counter != 'coinStar') {
		result = parseInt(document.getElementById('p' + player + counter + 'Text').innerHTML)

		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				result++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				result--
			}
		}
		
		if (result >= 0) {
			document.getElementById('p' + player + counter + 'Text').innerHTML = result
			
		} else if (result <= 0) {
			document.getElementById('p' + player + counter + 'Text').innerHTML = 0
		}
	}

	if (counter == 'coinStar') {
		result = parseInt(document.getElementById('coinStarText').innerHTML)

		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				result++
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				result--
			}
		}
		coinStar(result)

	} else if (counter == 'curTurn' || counter == 'maxTurn') {
		turns(counter, amount, action)

	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight(counter)
	}

	if (document.getElementById('slowOnOff').checked == true) {
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
		if (counter == 'minigame' && document.getElementById('minigameWinsOnOff').checked == true) {
			document.getElementById('minigameWinsOnOff').checked = false

		} else if (counter == 'running' && document.getElementById('slowOnOff').checked == true) {
			document.getElementById('slowOnOff').checked = false
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
* @param {boolean} all If all counters should be called.
*/
function callHighlight (resetHighlights, all) {
	if (resetHighlights == true) {
		var originalHighlightColor = document.getElementById('highlightColor').value
		var textColor = document.getElementById('textColor').value
		document.getElementById('highlightColor').value = textColor

	}

	if (document.getElementById('enableHighlight').checked == true || resetHighlights) {
		if (document.getElementById('happeningOnOff').checked == true || all == true) {
			highlight('Happening')
		}
		if (document.getElementById('minigameOnOff').checked == true || all == true) {
			highlight('Minigame')
		}
		if (document.getElementById('redSpaceOnOff').checked == true || all == true) {
			highlight('RedSpace')
		}
		if (document.getElementById('runningOnOff').checked == true || all == true) {
			highlight('Running')
		}
		if (document.getElementById('shoppingOnOff').checked == true || all == true) {
			highlight('Shopping')
		}
		if (document.getElementById('orbOnOff').checked == true || all == true) {
			highlight('Orb')
		}
		if (document.getElementById('candyOnOff').checked == true || all == true) {
			highlight('Candy')
		}
		if (document.getElementById('itemOnOff').checked == true || all == true) {
			highlight('Item')
		}
		if (document.getElementById('friendSpaceOnOff').checked == true || all == true) {
			highlight('FriendSpace')
		}
		if (document.getElementById('hexOnOff').checked == true || all == true) {
			highlight('Hex')
		}
		if (document.getElementById('spinSpaceOnOff').checked == true || all == true) {
			highlight('SpinSpace')
		}
		if (document.getElementById('slowOnOff').checked == true) {
			slowHighlight()
		}
		if (document.getElementById('miniZtarOnOff').checked == true || all == true) {
			highlight('MiniZtar')
		}
		if (document.getElementById('specialDiceOnOff').checked == true || all == true) {
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
	if (document.getElementById('runningOnOff').checked == false && document.getElementById('slowOnOff').checked == true) {
		document.getElementById('runningOnOff').checked = true
		displayOnOff('running')
	}

	if (document.getElementById('slowOnOff').checked == true && document.getElementById('enableHighlight').checked == true) {
		slowHighlight()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight('Running')
	}
}

/*
* Highlights the slow star.
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
	var activated = document.getElementById('minigameWinsOnOff').checked
	var playerNum = 1
	var source = 'img/minigamewins.png'

	if (activated == true && document.getElementById('minigameOnOff').checked == false) {
		document.getElementById('minigameOnOff').checked = true
		displayOnOff('minigame')
	}

	if (activated == true) {
		source = 'img/minigamewins.png'
	} else {
		source = 'img/minigame.png'
	}
	
	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'MinigameDisplay').src = source
	}
}

/*
* Updates the characters.
* 
* @param {number} player Which player should be updated.
* @param {boolean} character What character should be used.
*/
function changeCharacters (player, character) {
	characters[player] = character
	document.getElementById(character + player).checked = true
	document.getElementById('p' + player + 'Img').src = "img/" + character + ".png"
	coinStarTie()
}

var characters = ['', 'mario', 'luigi', 'yoshi', 'peach']

/*
* Changes com status of a character.
* 
* @param {number} player Which player should be updated.
*/
function changeCom (player) {
	if (document.getElementById('com' + player).checked == true) {
		document.getElementById('p' + player + 'ComDisplay').style.visibility = 'visible'
	} else {
		document.getElementById('p' + player + 'ComDisplay').style.visibility = 'hidden'
	}
}

/*
* Show/Hide characters based on the selected game.
* 
* @param {string} game What game is currently used.
*/
function changeGame (game) {
	document.getElementById(game).checked = true
	curGame = game
	var showChars = []
	var hideChars = []

	hideChars.push(document.querySelectorAll('.warioSpan'))
	hideChars.push(document.querySelectorAll('.daisySpan'))
	hideChars.push(document.querySelectorAll('.rosalinaSpan'))
	hideChars.push(document.querySelectorAll('.toadSpan'))
	hideChars.push(document.querySelectorAll('.toadetteSpan'))
	hideChars.push(document.querySelectorAll('.waluigiSpan'))
	hideChars.push(document.querySelectorAll('.dkSpan'))
	hideChars.push(document.querySelectorAll('.diddySpan'))
	hideChars.push(document.querySelectorAll('.birdoSpan'))
	hideChars.push(document.querySelectorAll('.bowserSpan'))
	hideChars.push(document.querySelectorAll('.bowserjrSpan'))
	hideChars.push(document.querySelectorAll('.koopakidSpan'))
	hideChars.push(document.querySelectorAll('.pompomSpan'))
	hideChars.push(document.querySelectorAll('.goombaSpan'))
	hideChars.push(document.querySelectorAll('.koopaSpan'))
	hideChars.push(document.querySelectorAll('.drybonesSpan'))
	hideChars.push(document.querySelectorAll('.montySpan'))
	hideChars.push(document.querySelectorAll('.booSpan'))
	hideChars.push(document.querySelectorAll('.spikeSpan'))
	hideChars.push(document.querySelectorAll('.blooperSpan'))
	hideChars.push(document.querySelectorAll('.shyguySpan'))
	hideChars.push(document.querySelectorAll('.hammerbroSpan'))
	hideChars.push(document.querySelectorAll('.kamekSpan'))

	showChars.push(document.querySelectorAll('.marioSpan'))
	showChars.push(document.querySelectorAll('.luigiSpan'))
	showChars.push(document.querySelectorAll('.peachSpan'))
	showChars.push(document.querySelectorAll('.yoshiSpan'))
	if (game != 'mpa') {
		showChars.push(document.querySelectorAll('.warioSpan'))
	}

	if (game == 'mp1' || game == 'mp2' || game == 'mp3' || game == 'mp4' || game == 'mp4' || game == 'mp10' || game == 'mpsr' || game == 'smp' || game == 'all') {
		showChars.push(document.querySelectorAll('.dkSpan'))
	}
	if (game == 'mp3' || game == 'mp4' || game == 'mp5' || game == 'mp6' || game == 'mp7' || game == 'mp8' || game == 'mp9' || game == 'mp10' || game == 'mpds' || game == 'mpit' || game == 'mpsr' || game == 'mptt100' || game == 'smp' || game == 'all') {
		showChars.push(document.querySelectorAll('.waluigiSpan'))
		showChars.push(document.querySelectorAll('.daisySpan'))
	}
	if (game == 'mp6' || game == 'all') {
		showChars.push(document.querySelectorAll('.koopakidSpan'))
	}
	if (game == 'mp6' || game == 'mp7' || game == 'mp8') {
		showChars.push(document.querySelectorAll('.booSpan'))
		showChars.push(document.querySelectorAll('.toadetteSpan'))
	}
	if (game == 'mp6' || game == 'mp7' || game == 'mp8' || game == 'mp9' || game == 'mp10' || game == 'mpds' || game == 'mpit' || game == 'mpsr' || game == 'all')  {
		showChars.push(document.querySelectorAll('.toadSpan'))
	}
	if (game == 'mp7' || game == 'mp8' || game == 'all') {
		showChars.push(document.querySelectorAll('.birdoSpan'))
		showChars.push(document.querySelectorAll('.drybonesSpan'))
	}
	if (game == 'mp8') {
		showChars.push(document.querySelectorAll('.blooperSpan'))
		showChars.push(document.querySelectorAll('.hammerbroSpan'))
	}
	if (game == 'mp9') {
		showChars.push(document.querySelectorAll('.koopaSpan'))
		showChars.push(document.querySelectorAll('.shyguySpan'))
		showChars.push(document.querySelectorAll('.kamekSpan'))
		showChars.push(document.querySelectorAll('.birdoSpan'))
	}
	if (game == 'smp' || game ==  'all') {
		showChars.push(document.querySelectorAll('.koopaSpan'))
		showChars.push(document.querySelectorAll('.shyguySpan'))
	}
	if (game == 'mp10' || game == 'all') {
		showChars.push(document.querySelectorAll('.rosalinaSpan'))
		showChars.push(document.querySelectorAll('.spikeSpan'))
		showChars.push(document.querySelectorAll('.toadetteSpan'))
	}
	if (game == 'mp10' || game == 'all') {
		showChars.push(document.querySelectorAll('.rosalinaSpan'))
		showChars.push(document.querySelectorAll('.spikeSpan'))
		showChars.push(document.querySelectorAll('.toadetteSpan'))
	}
	if (game == 'mpit' || game == 'mpsr' || game == 'mptt100' || game == 'smp') {
		showChars.push(document.querySelectorAll('.rosalinaSpan'))
	}
	if (game == 'mpit') {
		showChars.push(document.querySelectorAll('.booSpan'))
		showChars.push(document.querySelectorAll('.bowserjrSpan'))
	}
	if (game == 'mpsr') {
		showChars.push(document.querySelectorAll('.toadetteSpan'))
		showChars.push(document.querySelectorAll('.diddySpan'))
	}
	if (game == 'smp' || game == 'all') {
		showChars.push(document.querySelectorAll('.bowserSpan'))
		showChars.push(document.querySelectorAll('.goombaSpan'))
		showChars.push(document.querySelectorAll('.montySpan'))
		showChars.push(document.querySelectorAll('.diddySpan'))
		showChars.push(document.querySelectorAll('.bowserjrSpan'))
		showChars.push(document.querySelectorAll('.booSpan'))
		showChars.push(document.querySelectorAll('.hammerbroSpan'))
		showChars.push(document.querySelectorAll('.drybonesSpan'))
		showChars.push(document.querySelectorAll('.pompomSpan'))
	}

	for (var num = 0; num < hideChars.length; num++) {
		for (var num2 = 0; num2 < hideChars[num].length; num2++) {
			//hideChars[num][num2] = hideChars[num][num2] + 'Span'
			hideChars[num][num2].style.display = 'none'
		}
	}

	for (var num = 0; num < showChars.length; num++) {
		for (var num2 = 0; num2 < showChars[num].length; num2++) {
			//showChars[num][num2] = showChars[num][num2] + 'Span'
			showChars[num][num2].style.display = ''
		}
	}
}
var curGame = 'all'
var pastResults = []

/*
* Gets a random number in a specified range and checks if it's a duplicate.
* 
* @param {number} max The max number.
*/
function randomCharFor (max) {
	var result = ''
	result = Math.floor(Math.random() * max) + 1

	for (var num = 0; num < pastResults.length; num++) {
		if (result == pastResults[num]) {
			result = Math.floor(Math.random() * max) + 1
			num = -1
		}
	}
	pastResults.push(result)
	return result;
}

/*
* Randomly selects characters based on games.
*/
function randomChar () {
	var result = ''
	pastResults = []
	var chars = ['']

	if (curGame == 'mp1' || curGame == 'mp2') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(6)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('wario')
					break;
				case 6:
					chars.push('dk')
					break;
			}
		}
	} else if (curGame == 'mp3' || curGame == 'mp4') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(8)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('wario')
					break;
				case 7:
					chars.push('waluigi')
					break;
				case 8:
					chars.push('dk')
					break;
			}
		}
	} else if (curGame == 'mp5') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(7)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('wario')
					break;
				case 7:
					chars.push('waluigi')
					break;
			}
		}
	} else if (curGame == 'mp6') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(11)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('toad')
					break;
				case 7:
					chars.push('toadette')
					break;
				case 8:
					chars.push('wario')
					break;
				case 9:
					chars.push('waluigi')
					break;
				case 10:
					chars.push('koopakid')
					break;
				case 11:
					chars.push('boo')
					break;
			}
		}
	} else if (curGame == 'mp7') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('toad')
					break;
				case 7:
					chars.push('toadette')
					break;
				case 8:
					chars.push('wario')
					break;
				case 9:
					chars.push('waluigi')
					break;
				case 10:
					chars.push('birdo')
					break;
				case 11:
					chars.push('drybones')
					break;
				case 12:
					chars.push('boo')
					break;
			}
		}
	} else if (curGame == 'mp8') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(14)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('toad')
					break;
				case 7:
					chars.push('toadette')
					break;
				case 8:
					chars.push('wario')
					break;
				case 9:
					chars.push('waluigi')
					break;
				case 10:
					chars.push('birdo')
					break;
				case 11:
					chars.push('drybones')
					break;
				case 12:
					chars.push('boo')
					break;
				case 13:
					chars.push('blooper')
					break;
				case 14:
					chars.push('hammerbro')
					break;
			}
		}
	} else if (curGame == 'mp9') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('toad')
					break;
				case 7:
					chars.push('wario')
					break;
				case 8:
					chars.push('waluigi')
					break;
				case 9:
					chars.push('birdo')
					break;
				case 10:
					chars.push('koopa')
					break;
				case 11:
					chars.push('shyguy')
					break;
				case 12:
					chars.push('kamek')
					break;
			}
		}
	} else if (curGame == 'mp10') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('rosalina')
					break;
				case 7:
					chars.push('toad')
					break;
				case 8:
					chars.push('toadette')
					break;
				case 9:
					chars.push('wario')
					break;
				case 10:
					chars.push('waluigi')
					break;
				case 11:
					chars.push('dk')
					break;
				case 12:
					chars.push('spike')
					break;
			}
		}
	} else if (curGame == 'mpa') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(4)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
			}
		}
	} else if (curGame == 'mpds') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(8)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('toad')
					break;
				case 7:
					chars.push('wario')
					break;
				case 8:
					chars.push('waluigi')
					break;
			}
		}
	} else if (curGame == 'mpit') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(10)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('toad')
					break;
				case 7:
					chars.push('wario')
					break;
				case 8:
					chars.push('waluigi')
					break;
				case 9:
					chars.push('boo')
					break;
				case 10:
					chars.push('bowserjr')
					break;
			}
		}
	} else if (curGame == 'mpsr') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('rosalina')
					break;
				case 7:
					chars.push('toad')
					break;
				case 8:
					chars.push('toadette')
					break;
				case 9:
					chars.push('wario')
					break;
				case 10:
					chars.push('waluigi')
					break;
				case 11:
					chars.push('dk')
					break;
				case 12:
					chars.push('diddy')
					break;
			}
		}
	} else if (curGame == 'mptt100') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(8)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('rosalina')
					break;
				case 7:
					chars.push('wario')
					break;
				case 8:
					chars.push('waluigi')
					break;
			}
		}
	} else if (curGame == 'smp') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(20)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('rosalina')
					break;
				case 7:
					chars.push('wario')
					break;
				case 8:
					chars.push('waluigi')
					break;
				case 9:
					chars.push('dk')
					break;
				case 10:
					chars.push('diddy')
					break;
				case 11:
					chars.push('bowser')
					break;
				case 12:
					chars.push('bowserjr')
					break;
				case 13:
					chars.push('pompom')
					break;
				case 14:
					chars.push('goomba')
					break;
				case 15:
					chars.push('koopa')
					break;
				case 16:
					chars.push('drybones')
					break;
				case 17:
					chars.push('monty')
					break;
				case 18:
					chars.push('boo')
					break;
				case 19:
					chars.push('shyguy')
					break;
				case 20:
					chars.push('hammerbro')
					break;
			}
		}
	} else if (curGame == 'all') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(27)

			switch (result) {
				case 1:
					chars.push('mario')
					break;
				case 2:
					chars.push('luigi')
					break;
				case 3:
					chars.push('yoshi')
					break;
				case 4:
					chars.push('peach')
					break;
				case 5:
					chars.push('daisy')
					break;
				case 6:
					chars.push('rosalina')
					break;
				case 7:
					chars.push('toad')
					break;
				case 8:
					chars.push('toadette')
					break;
				case 9:
					chars.push('wario')
					break;
				case 10:
					chars.push('waluigi')
					break;
				case 11:
					chars.push('dk')
					break;
				case 12:
					chars.push('diddy')
					break;
				case 13:
					chars.push('birdo')
					break;
				case 14:
					chars.push('bowser')
					break;
				case 15:
					chars.push('bowserjr')
					break;
				case 16:
					chars.push('koopakid')
					break;
				case 17:
					chars.push('pompom')
					break;
				case 18:
					chars.push('goomba')
					break;
				case 19:
					chars.push('koopa')
					break;
				case 20:
					chars.push('drybones')
					break;
				case 21:
					chars.push('monty')
					break;
				case 22:
					chars.push('boo')
					break;
				case 23:
					chars.push('spike')
					break;
				case 24:
					chars.push('blooper')
					break;
				case 25:
					chars.push('shyguy')
					break;
				case 26:
					chars.push('hammerbro')
					break;
				case 27:
					chars.push('kamek')
					break;
			}
		}
	}
	for (var num = 1; num < 5; num++) {
		document.getElementById(chars[num] + num).checked = true
		document.getElementById(chars[num] + num).scrollIntoView(true)
		changeCharacters(num, chars[num])
	}
}

/*
* Changes turns displays and input.
* Gets fired after updating turns. Checks if the number is 1 or more and that the current turn does not exceed the max turn, after that it updates the display.
* 
* @param {string} counter If current or max Turn should be changed.
* @param {number} amount The amount that should be changed.
* @param {string} action If it should be added, subtracted or set to the amount.
*/
function turns (counter, amount, action) {
	var curTurnVar = parseInt(document.getElementById('curTurnText').innerHTML)
	var maxTurnVar = parseInt(document.getElementById('maxTurnText').innerHTML)

	if (counter == 'curTurn') {
		var result = curTurnVar
	} else if (counter == 'maxTurn') {
		var result = maxTurnVar
	} else {
		return;
	}

	if (action == 'P') {
		for (let num = 0; num < amount; num++) {
			result++
		}
	} else if (action == 'M') {
		for (let num = 0; num < amount; num++) {
			result--
		}
	} else if (action == 'Set') {
		result = amount
	}

	if (counter == 'curTurn') {
		curTurnVar = result
	} else if (counter == 'maxTurn') {
		maxTurnVar = result
	}

	if (curTurnVar <= 1) {
		curTurnVar = 1
	} else if (+curTurnVar > +maxTurnVar) {
		curTurnVar = maxTurnVar
	}

	if (maxTurnVar <= 1) {
		maxTurnVar = 1
	}

	//console.log('Current:' + curTurnVar + ' Max:' + maxTurnVar)

	document.getElementById('curTurnText').innerHTML = curTurnVar
	document.getElementById('maxTurnText').innerHTML = maxTurnVar
}

/*
* Updates the coin star display.
* Gets fired from displayChange() which gets fired after updating the coin star. Checks if the number is 0 or more, after that it updates the display.
* 
* @param {number} coinStarVar The new Coin Star value.
*/
function coinStar (coinStarVar) {
	if (coinStarVar && coinStarVar > 0) {
		document.getElementById('coinStarText').innerHTML = coinStarVar
	} else if (coinStarVar <= 0) {
		document.getElementById('coinStarText').innerHTML = 0
	}
}

/*
* Updates the coin star characters.
* 
* @param {number} player Updates the coin star for that specific player
*/
function coinStarTie (player) {
	if (player && document.getElementById('p' + player + 'CoinStarTie').checked == true) {
		document.getElementById('p' + player + 'CoinStarTie').checked = false
	} else if (player) {
		document.getElementById('p' + player + 'CoinStarTie').checked = true
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

	document.getElementById('coinStarDiv').style.marginLeft = '8px'

	var player1 = document.getElementById('p1CoinStarTie').checked
	var player2 = document.getElementById('p2CoinStarTie').checked
	var player3 = document.getElementById('p3CoinStarTie').checked
	var player4 = document.getElementById('p4CoinStarTie').checked

	var tied = []

	if (player1 == true) {
		tied.push(characters[1])
	}
	if (player2 == true) {
		tied.push(characters[2])
	}
	if (player3 == true) {
		tied.push(characters[3])
	}
	if (player4 == true) {
		tied.push(characters[4])

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

		document.getElementById('coinStarDiv').style.marginLeft = '0px'

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
		case 'creditSettings':
			var id1 = 'tutorialSettings'
			var id2 = 'linkSettings'
			var id3 = 'creditSettings'
			break;
	}

	document.getElementById(id1).style.display = 'none'
	document.getElementById(id1 + 'Title').style.cursor = 'pointer'

	document.getElementById(id2).style.display = 'none'
	document.getElementById(id2 + 'Title').style.cursor = 'pointer'
	if (id3) {
		document.getElementById(id3).style.display = 'none'
		document.getElementById(id3 + 'Title').style.cursor = 'pointer'
	}

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
* Outputs all counters as text.
*/
function textOutput () {
	var p1 = characters[1].charAt(0).toUpperCase() + characters[1].slice(1)
	var p2 = characters[2].charAt(0).toUpperCase() + characters[2].slice(1)
	var p3 = characters[3].charAt(0).toUpperCase() + characters[3].slice(1)
	var p4 = characters[4].charAt(0).toUpperCase() + characters[4].slice(1)

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
				output[num] = names[num] + ': ' + document.getElementById('curTurnText').innerHTML + '/' + document.getElementById('maxTurnText').innerHTML
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

				output[num] = names[num] + ': ' + document.getElementById('coinStarText').innerHTML + ' ' + coinStarString
				break;

			default: //Add everything new to textOutputTest() too
				if (counters[num] == 'MinusStar') {
					counters[num] = 'MiniZtar'
				} else if (counters[num] == 'Friendship') {
					counters[num] = 'FriendSpace'
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
						resultNum.push(document.getElementById('p1' + counters[num] + 'Text').innerHTML)
					} else {
						if (counterNum == counterP1) {
							result.push(p1)
							resultNum.push(document.getElementById('p1' + counters[num] + 'Input').innerHTML)
						}

						if (counterNum == counterP2) {
							result.push(p2)
							resultNum.push(document.getElementById('p2' + counters[num] + 'Text').innerHTML)
						}

						if (counterNum == counterP3) {
							result.push(p3)
							resultNum.push(document.getElementById('p3' + counters[num] + 'Text').innerHTML)
						}

						if (counterNum == counterP4) {
							result.push(p4)
							resultNum.push(document.getElementById('p4' + counters[num] + 'Text').innerHTML)
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
					output[num] = names[num] + ': ' + p1 + ' ' + document.getElementById('p1' + counters[num] + 'Text').innerHTML + ', ' + p2 + ' ' + document.getElementById('p2' + counters[num] + 'Text').innerHTML + ', ' + p3 + ' ' + document.getElementById('p3' + counters[num] + 'Text').innerHTML + ', ' + p4 + ' ' + document.getElementById('p4' + counters[num] + 'Text').innerHTML
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
					} else if (counters[num] == 'Friendship') {
						counters[num] = 'FriendSpace'
					}
					if (document.getElementById('p1' + counters[num] + 'Text')) {} else {
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
* @param {string} string Checks if this is included in the array.
* @param {array} array The array that should include something.
*/
function arrCon (string, array) {
    return (array.indexOf(string) > -1);
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

window.onload = prepareMPO()
window.onload = changeBGColor('bgColor')

document.getElementById('type1').focus()