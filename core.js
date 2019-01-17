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
	var result = 0;

	if (amount == '') {
		amount = 1;
	}

	if (counter != 'curTurn' && counter != 'maxTurn' && counter != 'coinStar') {
		counter = counter.charAt(0).toUpperCase() + counter.slice(1);
		result = parseInt(document.getElementById('p' + player + counter + 'Text').innerHTML);

		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				result++;
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				result--;
			}
		}
		
		if (result >= 999) {
			updateCounter('p' + player + counter + 'Text', 999);
		} else if (result <= 0) {
			updateCounter('p' + player + counter + 'Text', 0);
		} else {
			updateCounter('p' + player + counter + 'Text', result);
		}
	}

	if (counter == 'coinStar') {
		result = parseInt(document.getElementById('coinStarText').innerHTML);

		if (action == 'P') {
			for (let num = 0; num < amount; num++) {
				result++;
			}
		} else if (action == 'M') {
			for (let num = 0; num < amount; num++) {
				result--;
			}
		}
		coinStar(result);

	} else if (counter == 'curTurn' || counter == 'maxTurn') {
		turns(counter, amount, action);

	} else if (getValue('enableHighlight') == true && counter != 'coins') {
		highlight(counter);
	}

	if (getValue('slowOnOff') == true) {
		slowHighlight();
	}
	if (getValue('starsOnOff') == true && getValue('inclBonusOnOff') == true) {
		updateStars();
	}
	if (getValue('coinsOnOff') == true) {
		updateCoins(player);
	}
}

/*
* Updates the counters and creates a small animation.
* 
* @param {string} id The ID that should be changed.
* @param {string} change What the element should be changed to.
* @param {boolean} noAnimation If the animation should be skipped.
*/
function updateCounter (id, change, noAnimation) {
	if (document.getElementById(id).innerHTML == change) {
		return;
	}
	document.getElementById(id).innerHTML = change;
	if (getValue('enableAnimation') == false && noAnimation != true) {
		return;
	}

	document.getElementById(id).classList.add('counterAnimation');

	var element = document.getElementById(id)
	element.addEventListener('webkitAnimationEnd', function(){
		this.classList.remove('counterAnimation');
		this.removeEventListener('webkitAnimationEnd', arguments.callee, false);
	}, false);
}

/*
* Calls counterButtons().
* 
* @param {string} counter Which counter should be updated.
* @param {player} player Which player should be updated.
*/
function mobileButtons (counter, player) {
	var action = '';
	var amount = 0;

	if (getValue('mobileTypeMinus') == true) {
		action = 'M';
	} else {
		action = 'P';
	}

	if (getValue('type5') == true) {
		amount = 5;
	} else if (getValue('type10') == true) {
		amount = 10;
	} else {
		amount = 1;
	}

	if (counter == 'Stars') {
		updateStars(player, action, amount);
	} else {
		counterButtons(player, action, amount, counter);
	}
}

/*
* Updates the Star counter.
*
* @param {number} player Which player should be updated.
* @param {string} action What should be done.
* @param {string} amount The amount that should be changed.
*/
var bonusStars = ['', 0, 0, 0, 0];

function updateStars (player, action, amount) {
	if (getValue('starsOnOff') == false && getValue('inclBonusOnOff') == true) {
		editValue('starsOnOff', true);
		displayOnOff('stars', false, true);
	}

	var activated = getValue('inclBonusOnOff');
	var result = ['', document.getElementById('p1StarsText').innerHTML, document.getElementById('p2StarsText').innerHTML, document.getElementById('p3StarsText').innerHTML, document.getElementById('p4StarsText').innerHTML];

	for (let num = 1; num < 5; num++) {
		var resultSplit = result[num].split('');
		var resArr = [];
		for (var num2 = 0; num2 < resultSplit.length; num2++) {
			if (resultSplit[num2] != ' ') {
				resArr.push(resultSplit[num2]);
			} else {
				break;
			}
		}
		result[num] = resArr.join('');
	}

	if (action == 'P') {
		for (let num = 0; num < amount; num++) {
			result[player]++;
		}
	} else if (action == 'M') {
		for (let num = 0; num < amount; num++) {
			result[player]--;
		}
	}


	if (activated == true) {
		bonusStars = ['', 0, 0, 0, 0];
		callHighlight(false, false, true);

		if (getValue('miniStarsOnOff') == true) {
			for (let num = 1; num < 5; num++) {
				bonusStars[num] = bonusStars[num] * 5;
			}
		} else if (getValue('bananasOnOff') == true) {
			for (let num = 1; num < 5; num++) {
				bonusStars[num] = bonusStars[num] * 10;
			}
		}

		for (let num = 1; num < 5; num++) {
			if (result[num] >= 999) {
				result[num] = 999;
			} else if (result[num] <= 0) {
				result[num] = 0;
			}
			updateCounter('p' + num + 'StarsText', result[num] + ' + ' + bonusStars[num]);
		}
	} else {
		for (let num = 1; num < 5; num++) {
			if (result[num] >= 999) {
				result[num] = 999;
			} else if (result[num] <= 0) {
				result[num] = 0;
			}
			updateCounter('p' + num + 'StarsText', result[num]);
		}
	}
}

/*
* Updates the Coin counter.
*
* @param {number} player Which player should be updated.
*/
function updateCoins (player) {
	var result = parseInt(document.getElementById('p' + player + 'CoinsText').innerHTML);
	var coinStar = parseInt(document.getElementById('coinStarText').innerHTML);

	if (result == coinStar) {
		if (getValue('p' + player + 'CoinStarTie') == true) {} else {
			editValue('p' + player + 'CoinStarTie', true);
		}
	} else if (result > coinStar) {
		editValue('p1CoinStarTie', false);
		editValue('p2CoinStarTie', false);
		editValue('p3CoinStarTie', false);
		editValue('p4CoinStarTie', false);
		editValue('p' + player + 'CoinStarTie', true);

		updateCounter('coinStarText', result);
	}
	coinStarTie();
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
	var curTurnVar = parseInt(document.getElementById('curTurnText').innerHTML);
	var maxTurnVar = parseInt(document.getElementById('maxTurnText').innerHTML);

	if (action == 'P' && getValue('autoSave') == true) {
		backup();
	} else if (action == 'M' && getValue('autoSave') == true) {
		restore();
	}

	if (counter == 'curTurn') {
		var result = curTurnVar;
	} else if (counter == 'maxTurn') {
		var result = maxTurnVar;
	} else {
		return;
	}

	if (action == 'P') {
		for (let num = 0; num < amount; num++) {
			result++;
		}
	} else if (action == 'M') {
		for (let num = 0; num < amount; num++) {
			result--;
		}
	} else if (action == 'Set') {
		result = amount;
	}

	if (counter == 'curTurn') {
		curTurnVar = result;
	} else if (counter == 'maxTurn') {
		maxTurnVar = result;
	}

	if (curTurnVar <= 1) {
		curTurnVar = 1;
	} else if (+curTurnVar > +maxTurnVar) {
		curTurnVar = maxTurnVar;
	}

	if (maxTurnVar <= 5) {
		maxTurnVar = 5;
	} else if (maxTurnVar >= 95) {
		maxTurnVar = 95;
	}

	//console.log('Current:' + curTurnVar + ' Max:' + maxTurnVar)
	document.getElementById('curTurnText').innerHTML = curTurnVar;
	document.getElementById('maxTurnText').innerHTML = maxTurnVar;
}

/*
* Updates the coin star display.
* Gets fired from displayChange() which gets fired after updating the coin star. Checks if the number is 0 or more, after that it updates the display.
* 
* @param {number} coinStarVar The new Coin Star value.
*/
function coinStar (coinStarVar) {
	if (coinStarVar >= 999) {
		updateCounter('coinStarText', 999);
	} else if (coinStarVar <= 0) {
		updateCounter('coinStarText', 0);
	} else {
		updateCounter('coinStarText', coinStarVar);
	}
}

/*
* Updates the coin star characters.
* 
* @param {number} player Updates the coin star for that specific player
*/
function coinStarTie (player) {
	var icons = document.querySelector('input[name="icons"]:checked').value;

	if (player && getValue('p' + player + 'CoinStarTie') == true) {
		editValue('p' + player + 'CoinStarTie', false);
	} else if (player) {
		editValue('p' + player + 'CoinStarTie', true);
	}

	if (getValue('noTie') == true && player && getValue('p' + player + 'CoinStarTie') == true) {
		switch (player) {
			case 1:
			editValue('p2CoinStarTie', false);
			editValue('p3CoinStarTie', false);
			editValue('p4CoinStarTie', false);
				break;
			case 2:
			editValue('p1CoinStarTie', false);
			editValue('p3CoinStarTie', false);
			editValue('p4CoinStarTie', false);
				break;
			case 3:
			editValue('p1CoinStarTie', false);
			editValue('p2CoinStarTie', false);
			editValue('p4CoinStarTie', false);
				break;
			case 4:
			editValue('p1CoinStarTie', false);
			editValue('p2CoinStarTie', false);
			editValue('p3CoinStarTie', false);
				break;
		}
	}

	document.getElementById('coinStarTie1').style.height = '';
	document.getElementById('coinStarTie1').style.top = '';
	document.getElementById('coinStarTie1').style.left = '';

	document.getElementById('coinStarTie4').style.height = '';
	document.getElementById('coinStarTie4').style.top = '';
	document.getElementById('coinStarTie4').style.left = '';

	document.getElementById('coinStarDiv').style.marginLeft = '5px';
	document.getElementById('coinStarText').style.left = '5px';

	var player1 = getValue('p1CoinStarTie');
	var player2 = getValue('p2CoinStarTie');
	var player3 = getValue('p3CoinStarTie');
	var player4 = getValue('p4CoinStarTie');

	var tied = [];

	if (player1 == true) {
		tied.push(characters[1]);
	}
	if (player2 == true) {
		tied.push(characters[2]);
	}
	if (player3 == true) {
		tied.push(characters[3]);
	}
	if (player4 == true) {
		tied.push(characters[4]);

	}

	for (let num = 1; num < 6; num++) {
		document.getElementById('coinStarTie' + num).src = 'img/tie.png';
	}
	document.getElementById('coinStarCharacter').src = 'img/tie.png';

	if (getValue('noTie') == true && tied.length != 1 || tied.length == 0) {
		document.getElementById('coinStarCharacter').src = 'img/question.png';

	} else if (tied.length == 1) {
		document.getElementById('coinStarCharacter').src = 'img/' + icons + '/' + tied[0] + '.png';

		if (icons == 'mpsrIcons') {
			document.getElementById('coinStarText').style.left = '4px';
		}
	} else if (tied.length == 2) {
		document.getElementById('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png';
		document.getElementById('coinStarTie4').src = 'img/' + icons + '/' + tied[1] + '.png';

		document.getElementById('coinStarTie1').style.height = '34px';
		document.getElementById('coinStarTie1').style.top = '-35px';
		document.getElementById('coinStarTie1').style.left = '-98px';

		document.getElementById('coinStarTie4').style.height = '34px';
		document.getElementById('coinStarTie4').style.top = '-14px';
		document.getElementById('coinStarTie4').style.left = '-69px';

		if (icons == 'mpsrIcons') {
			document.getElementById('coinStarText').style.left = '5px';
		}
	} else if (tied.length == 3) {
		document.getElementById('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png';
		document.getElementById('coinStarTie2').src = 'img/' + icons + '/' + tied[1] + '.png';
		document.getElementById('coinStarTie5').src = 'img/' + icons + '/' + tied[2] + '.png';
	} else if (tied.length == 4) {
		document.getElementById('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png';
		document.getElementById('coinStarTie2').src = 'img/' + icons + '/' + tied[1] + '.png';
		document.getElementById('coinStarTie3').src = 'img/' + icons + '/' + tied[2] + '.png';
		document.getElementById('coinStarTie4').src = 'img/' + icons + '/' + tied[3] + '.png';
	}
}