/*
* Updates the counters.
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
		counter = counter.charAt(0).toUpperCase() + counter.slice(1)
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
		
		if (result >= 999) {
			document.getElementById('p' + player + counter + 'Text').innerHTML = 999
		} else if (result <= 0) {
			document.getElementById('p' + player + counter + 'Text').innerHTML = 0
		} else {
			document.getElementById('p' + player + counter + 'Text').innerHTML = result
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

	} else if (document.getElementById('enableHighlight').checked == true && counter != 'coins') {
		highlight(counter)
	}

	if (document.getElementById('slowOnOff').checked == true) {
		slowHighlight()
	}
	if (document.getElementById('starsOnOff').checked == true && document.getElementById('inclBonusOnOff').checked == true) {
		updateStars()
	}
	if (document.getElementById('coinsOnOff').checked == true) {
		updateCoins(player)
	}
}

/*
* Calls counterButtons().
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
		amount = 1
	}

	if (counter == 'Stars') {
		updateStars(player, action, amount)
	} else {
		counterButtons(player, action, amount, counter)
	}
}

/*
* Updates the Star counter.
*
* @param {number} player Which player should be updated.
* @param {string} action What should be done.
* @param {string} amount The amount that should be changed.
*/
var bonusStars = ['', 0, 0, 0, 0]

function updateStars (player, action, amount) {
	if (document.getElementById('starsOnOff').checked == false && document.getElementById('inclBonusOnOff').checked == true) {
		document.getElementById('starsOnOff').checked = true
		displayOnOff('stars')
	}

	var activated = document.getElementById('inclBonusOnOff').checked
	var result = ['', document.getElementById('p1StarsText').innerHTML, document.getElementById('p2StarsText').innerHTML, document.getElementById('p3StarsText').innerHTML, document.getElementById('p4StarsText').innerHTML]

	for (let num = 1; num < 5; num++) {
		var resultSplit = result[num].split('')
		var resArr = []
		for (var num2 = 0; num2 < resultSplit.length; num2++) {
			if (resultSplit[num2] != ' ') {
				resArr.push(resultSplit[num2])
			} else {
				break;
			}
		}
		result[num] = resArr.join('')
	}

	if (action == 'P') {
		for (let num = 0; num < amount; num++) {
			result[player]++
		}
	} else if (action == 'M') {
		for (let num = 0; num < amount; num++) {
			result[player]--
		}
	}


	if (activated == false) {
		for (let num = 1; num < 5; num++) {
			if (result[num] >= 999) {
				result[num] = 999
			} else if (result[num] <= 0) {
				result[num] = 0
			}
			document.getElementById('p' + num + 'StarsText').innerHTML = result[num]
		}
	} else if (activated == true) {
		bonusStars = ['', 0, 0, 0, 0]
		callHighlight(false, false, true)

		if (document.getElementById('miniStarsOnOff').checked == true) {
			for (let num = 1; num < 5; num++) {
				bonusStars[num] = bonusStars[num] * 5
			}
		} else if (document.getElementById('bananasOnOff').checked == true) {
			for (let num = 1; num < 5; num++) {
				bonusStars[num] = bonusStars[num] * 10
			}
		}

		for (let num = 1; num < 5; num++) {
			if (result[num] >= 999) {
				result[num] = 999
			} else if (result[num] <= 0) {
				result[num] = 0
			}
			document.getElementById('p' + num + 'StarsText').innerHTML = result[num] + ' + ' + bonusStars[num]
		}
	}
}

/*
* Updates the Coin counter.
*
* @param {number} player Which player should be updated.
*/
function updateCoins (player) {
	var result = parseInt(document.getElementById('p' + player + 'CoinsText').innerHTML)
	var coinStar = parseInt(document.getElementById('coinStarText').innerHTML)
	console.log('Player:' + player + ', Result: ' + result + ', coinStar: ' + coinStar)

	if (result == coinStar) {
		if (document.getElementById('p' + player + 'CoinStarTie').checked == true) {} else {
			document.getElementById('p' + player + 'CoinStarTie').checked = true
		}
	} else if (result > coinStar) {
		document.getElementById('p1CoinStarTie').checked = false
		document.getElementById('p2CoinStarTie').checked = false
		document.getElementById('p3CoinStarTie').checked = false
		document.getElementById('p4CoinStarTie').checked = false
		document.getElementById('p' + player + 'CoinStarTie').checked = true
		document.getElementById('coinStarText').innerHTML = result
	}
	coinStarTie()
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

	if (action == 'P' && document.getElementById('autoSave').checked == true) {
		backup()
	} else if (action == 'M' && document.getElementById('autoSave').checked == true) {
		restore()
	}

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

	if (maxTurnVar <= 5) {
		maxTurnVar = 5
	} else if (maxTurnVar >= 95) {
		maxTurnVar = 95
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
	if (coinStarVar >= 999) {
		document.getElementById('coinStarText').innerHTML = 999
	} else if (coinStarVar <= 0) {
		document.getElementById('coinStarText').innerHTML = 0
	} else {
		document.getElementById('coinStarText').innerHTML = coinStarVar
	}
}

/*
* Updates the coin star characters.
* 
* @param {number} player Updates the coin star for that specific player
*/
function coinStarTie (player) {
	var icons = document.querySelector('input[name="icons"]:checked').value

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

	document.getElementById('coinStarDiv').style.marginLeft = '5px'
	document.getElementById('coinStarText').style.left = '9px'

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

	for (let num = 1; num < 6; num++) {
		document.getElementById('coinStarTie' + num).src = 'img/tie.png'
	}
	document.getElementById('coinStarCharacter').src = 'img/tie.png'

	if (document.getElementById('noTie').checked == true && tied.length != 1 || tied.length == 0) {
		document.getElementById('coinStarCharacter').src = 'img/question.png'

	} else if (tied.length == 1) {
		document.getElementById('coinStarCharacter').src = 'img/' + icons + '/' + tied[0] + '.png'

		if (icons == 'mpsrIcons') {
			document.getElementById('coinStarText').style.left = '8px'
		}
	} else if (tied.length == 2) {
		document.getElementById('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + icons + '/' + tied[1] + '.png'

		document.getElementById('coinStarTie1').style.height = '32px'
		document.getElementById('coinStarTie1').style.top = '-24px'
		document.getElementById('coinStarTie1').style.left = '48px'

		document.getElementById('coinStarTie4').style.height = '32px'
		document.getElementById('coinStarTie4').style.top = '-2px'
		document.getElementById('coinStarTie4').style.left = '-31px'

		if (icons == 'mpsrIcons') {
			document.getElementById('coinStarDiv').style.marginLeft = '0px'
			document.getElementById('coinStarText').style.left = '9px'
		} else {
			document.getElementById('coinStarDiv').style.marginLeft = '1px'
		}
	} else if (tied.length == 3) {
		document.getElementById('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + icons + '/' + tied[1] + '.png'
		document.getElementById('coinStarTie5').src = 'img/' + icons + '/' + tied[2] + '.png'

		if (icons == 'mpsrIcons') {
			document.getElementById('coinStarDiv').style.marginLeft = '3px'
		}
	} else if (tied.length == 4) {
		document.getElementById('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png'
		document.getElementById('coinStarTie2').src = 'img/' + icons + '/' + tied[1] + '.png'
		document.getElementById('coinStarTie3').src = 'img/' + icons + '/' + tied[2] + '.png'
		document.getElementById('coinStarTie4').src = 'img/' + icons + '/' + tied[3] + '.png'

		if (icons == 'mpsrIcons') {
			document.getElementById('coinStarDiv').style.marginLeft = '3px'
		}
	}
}