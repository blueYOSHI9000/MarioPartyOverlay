var globalActions = { //global actions
	action: 'p',
	amount: 1,
	ogAction: 'p',
	ogAmount: 1
};

/*
* Gets current stats for a specific counter.
*
* @param {string} counter The counter.
* @param {number} player The player - optional for coin star/turns.
* @param {boolean} returnElem Return element instead of stat.
*/
function getStat (counter, player, returnElem) {
	if (typeof player === 'undefined' || counter === 'curTurn' || counter === 'maxTurn' || counter === 'coinStar') {
		if (returnElem === true) {
			return getElem(capStr(counter, true) + 'Text');
		}
		return parseInt(getInner(capStr(counter, true) + 'Text'));
	}

	if (returnElem === true) {
		return getElem('p' + player + capStr(counter) + 'Text');
	}
	return parseInt(getInner('p' + player + capStr(counter) + 'Text')); //capStr() to make sure it's capitalized - reversed for first two uses
}

/*
* Updates the counters.
*
* @param {number} player Which player should be updated.
* @param {string} action What should be done - can be 'P' for addition, 'M' for subtraction or 'S' to replace the existing count.
* @param {string} amount The amount that should be changed.
* @param {string} counter Which counter should be updated.
*/
function counterButtons (player, action, amount, counter) {
	//console.log('[counterButtons] Player: ' + player + ', action: ' + action + ', amount: ' + amount + ', counter: ' + counter);
	var result = 0;

	amount = parseInt(amount);
	if (typeof amount != 'number') {
		amount = 1;
	}


	if (isNaN(getStat(counter, player)) === true) { //check if counter is NaN and set it to 0
		getStat(counter, player, true).innerHTML = 0;

		console.warn('[MPO] Counter was NaN, player: ' + player + ', counter: ' + counter);
		if (assistLoaded === true) {
			assistNotif('Error: ' + counter + ' for player ' + player + ' was NaN', true);
		}
	}

	//return if there's no change to avoid unnecessary animation
	if (action != 'S' && amount === 0) {
		return;
	}
	if (action === 'S' && amount === getStat(counter, player)) {
		return;
	}

	if (counter != 'curTurn' && counter != 'maxTurn' && counter != 'coinStar') { //regular counters only
		counter = capStr(counter);

		result = getStat(counter, player);

		if (action === 'P') {        //plus
			result += amount;
		} else if (action === 'M') { //minus
			result -= amount;
		} else if (action === 'S') { //set
			result = amount;
		}

		if (result >= 999) {
			result = 999;
		} else if (result <= 0) {
			result = 0;
		}

		if (result < 100 && getValue('xBelow100') === true) {
			getStat(counter, player, true).classList.add('counterBelow100');
		} else {
			getStat(counter, player, true).classList.remove('counterBelow100');
		}

		currentStats[capStr(counter, true)][player - 1] = result;
		saveCurrentStats();

		updateCounter('p' + player + counter + 'Text', result);
	}

	if (counter === 'coinStar') {
		result = getStat('coinStar');

		if (action === 'P') {
			result += amount;
		} else if (action === 'M') {
			result -= amount;
		} else if (action === 'S') {
			result = amount;
		}
		if (result >= 100 && getValue('xBelow100') === true) {
			getElem('coinStarText').classList.remove('counterBelow100');
		} else {
			getElem('coinStarText').classList.add('counterBelow100');
		}
		coinStar(result);

	} else if (counter === 'curTurn' || counter === 'maxTurn') {
		turns(counter, amount, action);

	} else if (getValue('enableHighlight') === true && counter != 'coins') { //part of 'else if' because coin star and turns don't need highlighting
		highlight(counter);
	}

	if (counter === 'Running' && getValue('slowOnOff') === true) {
		slowHighlight();

	} else if (counter === 'Item' && getValue('unusedOnOff') === true) {
		slowHighlight(false, 'unused');

	} else if (counter === 'Stars' || document.querySelector('input[name="bonusStarAdd"]:checked').id != 'bonusDont') {
		updateCounter('p' + player + 'StarsBonusText', getStat('stars', player)); //for the animation because updateStars() is somehow incapable of doing it
		updateStars();
	}
	if (counter === 'Coins' && getValue('coinsOnOff') === true) {
		updateCoins(player);
	}
}

/*
* Updates the counters and creates a small animation.
*
* @param {string} id The ID of the element that should be updated.
* @param {string} change What the element should be changed to.
* @param {boolean} noAnimation If the animation should be skipped.
*/
function updateCounter (id, change, noAnimation) {
	if (getInner(id) === change) {
		return;
	}
	editInner(id, change);
	if (getValue('enableAnimation') === false || noAnimation === true) {
		return;
	}

	getElem(id).classList.add('counterAnimation');

	var element = getElem(id)
	element.addEventListener('webkitAnimationEnd', function(){ //removes the animation class after the animation ended so it can be used again next time
		this.classList.remove('counterAnimation');
		this.removeEventListener('webkitAnimationEnd', arguments.callee, false);
	}, false);
}

/*
* Calls counterButtons().
*
* @param {string} counter Which counter should be updated.
* @param {number} player Which player should be updated.
*/
function mobileButtons (counter, player) {
	if (getValue('enableInteract') === true) { //counters shouldn't be updated while drag'n'drop is on
		return;
	}

	var action = globalActions.action.toUpperCase();
	var amount = globalActions.amount;

	if (counter === 'Stars') {
		updateStars(player, action, amount);
	} else {
		if (popoutActivated === true && statSynced === true) {
			sendMessage('counterButtons+' + player + '+' + action + '+' + amount + '+' + counter);
		}
		counterButtons(player, action, amount, counter);
	}
}

/*
* Updates the Star counter, with bonus stars if needed.
* Apparently attributes are never used when calling this for some reason.
*
* @param {number} player Which player should be updated.
* @param {string} action What should be done.
* @param {string} amount The amount that should be changed.
*/
var bonusStars = ['', 0, 0, 0, 0];
function updateStars (player, action, amount) {
	if (document.querySelector('input[name="bonusStarAdd"]:checked').id === 'bonusDont') { //no bonus stars
		for (let num = 1; num < 5; num++) {
			var result = getStat('stars', num);
			updateCounter('p' + num + 'StarsBonusText', result, true);

			if (result >= 100 && getValue('xBelow100') === true) {
				getElem('p' + num + 'StarsBonusText').classList.remove('counterBelow100');
			} else {
				getElem('p' + num + 'StarsBonusText').classList.add('counterBelow100');
			}
		}
		return;
	}

	var result = ['', getInner('p1StarsText'), getInner('p2StarsText'), getInner('p3StarsText'), getInner('p4StarsText')];

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

	if (action === 'P') {
		for (let num = 0; num < amount; num++) {
			result[player]++;
		}
	} else if (action === 'M') {
		for (let num = 0; num < amount; num++) {
			result[player]--;
		}
	}


	bonusStars = ['', 0, 0, 0, 0];
	callHighlight(false, false, true);

	if (getValue('coinStarOnOff') === true) {
		for (let num = 1; num < 5; num++) {
			if (getValue('p' + num + 'CoinStarTie') === true) {
				bonusStars[num]++;
			}
		}
	}

	if (getValue('miniStarsOnOff') === true) {
		for (let num = 1; num < 5; num++) {
			bonusStars[num] = bonusStars[num] * 5;
		}
	} else if (getValue('bananasOnOff') === true) {
		for (let num = 1; num < 5; num++) {
			bonusStars[num] = bonusStars[num] * 10;
		}
	}

	for (let num = 1; num < 5; num++) {
		result[num] = parseInt(result[num]);
		if (result[num] >= 999) {
			result[num] = 999;
		} else if (result[num] <= 0) {
			result[num] = 0;
		}

		if (result[num] >= 100 && getValue('xBelow100') === true) {
			getElem('p' + num + 'StarsBonusText').classList.remove('counterBelow100');
		} else {
			getElem('p' + num + 'StarsBonusText').classList.add('counterBelow100');
		}

		if (document.querySelector('input[name="bonusStarAdd"]:checked').id === 'bonusSeperately') {
			updateCounter('p' + num + 'StarsBonusText', result[num] + ' + ' + bonusStars[num], true);
		} else {
			updateCounter('p' + num + 'StarsBonusText', parseInt(result[num]) + parseInt(bonusStars[num]), true);
		}
	}
}

/*
* Updates the Coin counter.
*
* @param {number} player Which player should be updated.
*/
function updateCoins (player) {
	var result = getStat('coins', player);
	var coinStar = getStat('coinStar');

	if (getValue('coinStarOnOff') == true) {
		if (result == coinStar) {
			if (getValue('p' + player + 'CoinStarTie') == true) {} else {
				editValue('p' + player + 'CoinStarTie', true);
				if (getValue('noTie') === true) {
					editValue('p1CoinStarTie', false);
					editValue('p2CoinStarTie', false);
					editValue('p3CoinStarTie', false);
					editValue('p4CoinStarTie', false);
				}
			}
		} else if (result > coinStar) {
			editValue('p1CoinStarTie', false);
			editValue('p2CoinStarTie', false);
			editValue('p3CoinStarTie', false);
			editValue('p4CoinStarTie', false);
			editValue('p' + player + 'CoinStarTie', true);

			updateCounter('coinStarText', result);
		}
		coinStarTie(player);
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
	var curTurnVar = getStat('curTurn');
	var maxTurnVar = getStat('maxTurn');

	if (action === 'P' && getValue('autoSave') === true && counter === 'curTurn') {
		backup();
	} else if (action === 'M' && getValue('autoSave') === true && counter === 'curTurn') {
		restore();
	}

	if (counter === 'curTurn') {
		var result = curTurnVar;
	} else if (counter === 'maxTurn') {
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
	} else if (action == 'S') {
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

	if (getStat(counter) != eval(counter + 'Var')) {
		getElem(counter + 'Text').classList.add('counterAnimation');
		setTimeout(function () {
			getElem(counter + 'Text').classList.remove('counterAnimation');
		}, 190);
	}

	currentStats.curTurn = curTurnVar;
	currentStats.maxTurn = maxTurnVar;
	saveCurrentStats();

	//console.log('Current:' + curTurnVar + ' Max:' + maxTurnVar)
	editInner('curTurnText', curTurnVar);
	editInner('maxTurnText', maxTurnVar);
}

/*
* Updates the coin star display.
* Gets fired from displayChange() which gets fired after updating the coin star. Checks if the number is 0 or more, after that it updates the display.
*
* @param {number} result The new Coin Star value.
*/
function coinStar (result) {
	currentStats.coinStar = result;
	saveCurrentStats();

	if (result >= 999) {
		updateCounter('coinStarText', 999);
	} else if (result <= 0) {
		updateCounter('coinStarText', 0);
	} else {
		updateCounter('coinStarText', result);
	}
}

/*
* Updates the coin star characters.
*
* @param {number} player Updates the coin star for that specific player
* @param {boolean} direct If the function has been called directly from an onclick attribute
*/
function coinStarTie (player, direct) {
	var icons = document.querySelector('input[name="icons"]:checked').value;

	if (direct === true) {
		if (ctrlKeyVar === true) {
			editValue('p1CoinStarTie', false);
			editValue('p2CoinStarTie', false);
			editValue('p3CoinStarTie', false);
			editValue('p4CoinStarTie', false);
		}

		if (player && getValue('p' + player + 'CoinStarTie') == true) {
			editValue('p' + player + 'CoinStarTie', false);
		} else if (player) {
			editValue('p' + player + 'CoinStarTie', true);
		}
	}

	if (getValue('noTie') == true && player && getValue('p' + player + 'CoinStarTie') == true) {
		editValue('p1CoinStarTie', false);
		editValue('p2CoinStarTie', false);
		editValue('p3CoinStarTie', false);
		editValue('p4CoinStarTie', false);

		editValue('p' + player + 'CoinStarTie', true);
	} else if (getValue('noTie') == true && direct === true) {
		editValue('p1CoinStarTie', false);
		editValue('p2CoinStarTie', false);
		editValue('p3CoinStarTie', false);
		editValue('p4CoinStarTie', false);
	}

	getElem('coinStarTie1').style.height = '';
	getElem('coinStarTie1').style.top = '';
	getElem('coinStarTie1').style.left = '';

	getElem('coinStarTie4').style.height = '';
	getElem('coinStarTie4').style.top = '';
	getElem('coinStarTie4').style.left = '';

	getElem('coinStarDiv').style.marginLeft = '5px';
	getElem('coinStarText').style.left = '10px';

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
		getElem('coinStarTie' + num).src = 'img/tie.png';
	}
	getElem('coinStarCharacter').src = 'img/tie.png';

	if (getValue('noTie') == true && tied.length != 1 || tied.length == 0) {
		getElem('coinStarCharacter').src = 'img/question.png';

	} else if (tied.length == 1) {
		getElem('coinStarCharacter').src = 'img/' + icons + '/' + tied[0] + '.png';

		if (icons == 'mpsrIcons') {
			getElem('coinStarText').style.left = '10px';
		}
	} else if (tied.length == 2) {
		getElem('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png';
		getElem('coinStarTie4').src = 'img/' + icons + '/' + tied[1] + '.png';

		getElem('coinStarTie1').style.height = '34px';
		getElem('coinStarTie1').style.top = '-35px';
		getElem('coinStarTie1').style.left = '-98px';

		getElem('coinStarTie4').style.height = '34px';
		getElem('coinStarTie4').style.top = '-14px';
		getElem('coinStarTie4').style.left = '-69px';

		if (icons == 'mpsrIcons') {
			getElem('coinStarText').style.left = '10px';
		}
	} else if (tied.length == 3) {
		getElem('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png';
		getElem('coinStarTie2').src = 'img/' + icons + '/' + tied[1] + '.png';
		getElem('coinStarTie5').src = 'img/' + icons + '/' + tied[2] + '.png';
	} else if (tied.length == 4) {
		getElem('coinStarTie1').src = 'img/' + icons + '/' + tied[0] + '.png';
		getElem('coinStarTie2').src = 'img/' + icons + '/' + tied[1] + '.png';
		getElem('coinStarTie3').src = 'img/' + icons + '/' + tied[2] + '.png';
		getElem('coinStarTie4').src = 'img/' + icons + '/' + tied[3] + '.png';
	}

	currentStats.coinStarTie1 = getValue('p1CoinStarTie');
	currentStats.coinStarTie2 = getValue('p2CoinStarTie');
	currentStats.coinStarTie3 = getValue('p3CoinStarTie');
	currentStats.coinStarTie4 = getValue('p4CoinStarTie');
	saveCurrentStats();

	updateStars();
}