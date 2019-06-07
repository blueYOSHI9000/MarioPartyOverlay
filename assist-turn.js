/*
* Buys a star.
* 
* @param {string} star What kind of star, empty if normal one.
*/
function buyStar (star) {
	if (getValue('shortcutSimpleMode') === true) {
		if (getValue('mobileTypeMinus') === true) {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
			shortcutNotif(getCharName(orderCurPlayer) + ' lost a star.');
		} else {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
			shortcutNotif(getCharName(orderCurPlayer) + ' got a star.');
		}
		return;
	}
	var coinNum
	if (star) {
		switch (star) {
			case 'jarstar':
				var coinNum = 10;
				break;
			case 'jarcoins':
				if (getValue('mobileTypeMinus') === true) {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
					shortcutNotif('Undid opening a magic jar, gained 5 coins.');
				} else if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' lost 5 coins thanks to a magic jar.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				return;
			case 'jarfail':
				if (getValue('mobileTypeMinus') === true) {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 10, 'coins']);
					shortcutNotif('Undid opening a magic jar, gained 10 coins.');
				} else if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' lost 10 coins thanks to a magic jar.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				return;
			case 'bluenote':
				coinNum = 5;
				break;
			case 'greennote':
				coinNum = 10;
				break;
			case 'yellownote':
				coinNum = 15;
				break;
			case 'orangenote':
				coinNum = 20;
				break;
			case 'rednote':
				coinNum = 30;
				break;
			default:
		}
	} else {
		if (shortcutGame == 'smp') {
			if (starPrice != 0) {
				coinNum = starPrice;
			} else {
				coinNum = 10;
			}
		} else {
			if (finalFiveEvent == 'cheapStars') {
				coinNum = 5;
			} else {
				coinNum = 20;
			}
		}
	}
	if (starCost === 'double' && getValue('mobileTypeMinus') != true) {
		coinNum = (coinNum * 2);
	}

	if (getValue('mobileTypeMinus') === true) {
		if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) >= 1) {
			execOnMain('counterButtons', [orderCurPlayer, 'P', coinNum, 'coins']);
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
			shortcutNotif('Undid buying a star for ' + coinNum + ' coins.');
		} else {
			shortcutNotif('No stars to undo, release Ctrl to buy one.', true)
		}
	} else if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= coinNum) {
		execOnMain('counterButtons', [orderCurPlayer, 'M', coinNum, 'coins']);
		execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
		starCost = '';
		shortcutNotif(getCharName(orderCurPlayer) + ' got a star for ' + coinNum + ' coins.');
	} else {
		shortcutNotif('Not enough coins!', true);
	}
}

var stealOpen = false;
var stealFrom;
/*
* 
*/
function steal (attr) {
	if (attr) {
		if (isNaN(attr) === false) {
			var elems = document.getElementById('stealSpan').children;
			removeSelected(elems);
			elems[attr + 1].classList.add('selected');
			stealFrom = attr;
		} else {
			if (stealFrom) {
				if (getValue('stealStars') === true) {
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) > 29 && parseInt(getInner('p' + stealFrom + 'StarsText')) > 0) {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 30, 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
						execOnMain('counterButtons', [stealFrom, 'M', 1, 'stars']);
					} else {
						shortcutNotif('Either not enough coins or no stars to steal.', true);
						return;
					}
				} else {
					var coinNum = getValue('stealCoinsInput');
					if (parseInt(getInner('p' + stealFrom + 'CoinsText')) < coinNum) {
						coinNum = parseInt(getInner('p' + stealFrom + 'CoinsText'));
					}
					execOnMain('counterButtons', [orderCurPlayer, 'P', coinNum, 'coins']);
					execOnMain('counterButtons', [stealFrom, 'M', coinNum, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' stole ' + coinNum + ' coins from ' + getCharName(stealFrom) + '.');
				}
				editInner('stealSpan', '');
				document.getElementById('starPricesContainer').style.display = 'unset';
				stealOpen = false;
			} else {
				shortcutNotif('Select a character to steal from.', true);
			}
		}
	} else {
		if (stealOpen === true) {
			editInner('stealSpan', '');
			document.getElementById('starPricesContainer').style.display = 'unset';
			stealOpen = false;
		} else {
			editInner('stealSpan', '<span class="settingsText"> <input type="radio" name="stealInput" id="stealStars"> <label for="stealStars"> Stars </label> - <input type="radio" name="stealInput" id="stealCoins" checked> <label for="stealCoins"> <input type="number" onclick="editValue(\'stealCoins\', true)" style="width: 33px;" id="stealCoinsInput" min="1" max="99" value="7"> Coins </label> from: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="steal(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="steal(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="steal(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="steal(4)"> <button onclick="steal(\'done\')" style="position: relative; top: -15px;"> Steal! </button>');
			document.getElementById('starPricesContainer').style.display = 'none';
			stealFrom = 0;
			document.getElementById('stealSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			stealOpen = true;
		}
	}
}

var starPrice = 0;
/*
* Changes the star price for Kameks board in SMP.
* 
* @param {number} amount What the price should be changed to.
*/
function starPrices (amount) {
	removeSelected(document.getElementById('starPricesSpan').children);
	if (starPrice === amount) {
		starPrice = 0;
	} else {
		document.getElementById('kamek' + amount).classList.add('selected');
		starPrice = amount;
	}
}

var diceCursor; // used in case multiple dices are used, shows which number should be updated
var diceRolls = [];
var selColor = '#f10000';
/*
* Uses a dice.
* 
* @param {number} num The number gotten.
*/
function turnDice (num) {
	num = num.substring(4);
	if (num.substring(0, 1) != '+' && num.substring(0, 1) != '-') { //getting coins in SMP uses - & + and are identified by being a string instead of a number
		num = parseInt(num);
	}

	var diceRollsTotal = 0;

	if (poisonSub != 0) {
		execOnMain('counterButtons', [orderCurPlayer, 'P', poisonSub, 'running']);
	}
	if (typeof diceRolls[0] == 'string' && diceRolls.length != 0 && diceRolls != undefined) { //undo the last action done so the new action can be added immediately
		if (diceRolls[0].startsWith('+') == true) {
			diceRollsTotal = diceRolls[0];
			execOnMain('counterButtons', [orderCurPlayer, 'M', parseInt(diceRolls[0].substring(1)), 'coins']);
		} else if (diceRolls[0].startsWith('-') == true) {
			diceRollsTotal = diceRolls[0];
			execOnMain('counterButtons', [orderCurPlayer, 'P', parseInt(diceRolls[0].substring(1)), 'coins']);
		}
	} else {
		if (diceRolls.length != 0 && diceRolls != undefined) {
			for (var num2 = 0; num2 < diceRolls.length; num2++) {
				diceRollsTotal = parseInt(diceRollsTotal) + parseInt(diceRolls[num2]);
			}
		}
		execOnMain('counterButtons', [orderCurPlayer, 'M', diceRollsTotal, 'running']);
	}

	if (diceRolls.length === 2) { //undo coin bonus for getting the same number multiple times
		if (diceRolls[0] === 7 && diceRolls[1] === 7) {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 30, 'coins']);
		} else if (diceRolls[0] == diceRolls[1]) {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
		}
	} else if (diceRolls.length === 3) {
		if (diceRolls[0] === 7 && diceRolls[1] === 7 && diceRolls[2] === 7) {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 50, 'coins']);
		} else if (diceRolls[0] === diceRolls[1] && diceRolls[0] === diceRolls[2]) {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
		}
	}

	switch (activeItem) { //checks active items in case nultiple dices should be used
		case 'Double':
		case 'Triple':

			switch (activeItem) {
				case 'Double':
					for (var num2 = 0; num2 < 5; num2++) {
						if (diceRolls.length < 2) {
							diceRolls.push(0);
						} else {
							break;
						}
					}

					if (diceRolls.length > 2) {
						diceRolls = [diceRolls[0], diceRolls[1]];
					}
					if (diceRolls > 1) {
						diceCursor = 0;
					}

					diceRolls[diceCursor] = num;

					diceCursor++;
					if (diceCursor > 1) {
						diceCursor = 0;
					}
					break;

				case 'Triple':
					for (var num2 = 0; num2 < 5; num2++) {
						if (diceRolls.length < 3) {
							diceRolls.push(0);
						} else {
							break;
						}
					}

					diceRolls[diceCursor] = num;

					diceCursor++;
					if (diceCursor > 2) {
						diceCursor = 0;
					}
					break;
			}

			var diceRollsText = 0;
			if (diceCursor != 0) {
				diceRollsText = diceRolls.concat();

				for (var num2 = 0; num2 < diceRollsText.length; num2++) {
					if (diceRollsText[num2] == 0) {
						diceRollsText[num2] = '??';
					}
				}

				diceRollsText[diceCursor] = '<span style="color: ' + selColor + ';">' + diceRollsText[diceCursor] + '</span>';
				editInner('turnCurDiceText', diceRollsText.join(' + '));

				if (diceRolls[diceCursor] == 0) {
					diceRollsText[diceCursor] = '??';
				} else {
					diceRollsText[diceCursor] = diceRolls[diceCursor];
				}

				diceRollsText[diceCursor] = '*' + diceRollsText[diceCursor] + '*';
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + diceRollsText.join(' + ') + '.');
			} else {
				for (var num2 = 0; num2 < diceRolls.length; num2++) {
					diceRollsText = diceRollsText + parseInt(diceRolls[num2]);
				}
				editInner('turnCurDiceText', diceRolls.join(' + '));
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled a ' + diceRollsText + '.');
			}
			break;

		default:
			diceCursor = 0;
			diceRolls = [num];
			editInner('turnCurDiceText', num);
			if (typeof num == 'string') {
				if (num.startsWith('+') == true) {
					diceRollsTotal = num;
					execOnMain('counterButtons', [orderCurPlayer, 'P', parseInt(num.substring(1)), 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' coins.');
					return;
				} else if (num.startsWith('-') == true) {
					diceRollsTotal = num;
					execOnMain('counterButtons', [orderCurPlayer, 'M', parseInt(num.substring(1)), 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' coins.');
					return;
				}
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' rolled a ' + num + '.');
	}
	diceRollsTotal = 0;
	for (var num2 = 0; num2 < diceRolls.length; num2++) {
		diceRollsTotal = parseInt(diceRollsTotal) + parseInt(diceRolls[num2]);
	}
	execOnMain('counterButtons', [orderCurPlayer, 'P', diceRollsTotal, 'running']);

	if (diceRolls.length === 2) { //coin bonus for getting the same number multiple times
		if (diceRolls[0] === 7 && diceRolls[1] === 7) {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 30, 'coins']);
		} else if (diceRolls[0] == diceRolls[1]) {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 10, 'coins']);
		}
	} else if (diceRolls.length === 3) {
		if (diceRolls[0] === 7 && diceRolls[1] === 7 && diceRolls[2] === 7) {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 50, 'coins']);
		} else if (diceRolls[0] === diceRolls[1] && diceRolls[0] === diceRolls[2]) {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 20, 'coins']);
		}
	}

	poisonSub = 0;
	for (var num2 = 0; num2 < statusEffects['p' + orderCurPlayer].length; num2++) {
		switch (statusEffects['p' + orderCurPlayer][num2]) {
			case 'poison':
				if (parseInt(getInner('p' + orderCurPlayer + 'RunningText')) < 2) {
					poisonSub = poisonSub + parseInt(getInner('p' + orderCurPlayer + 'RunningText'));
				} else {
					poisonSub = poisonSub + 2;
				}
				if (poisonSub > diceRollsTotal) {
					poisonSub = diceRollsTotal;
				}
				break;
		}
	}

	execOnMain('counterButtons', [orderCurPlayer, 'M', poisonSub, 'running']);
}

var allies = {
	p1: [],
	p2: [],
	p3: [],
	p4: []
};
var bobombAlly = ['', 0, 0, 0, 0];
var closeAlly = false;
/*
* Adds an ally to the current player.
* 
* @param {string} ally The Ally that should be added.
* @param {boolean} nobobomb If the bobombAlly array should be updated.
*/
function getAlly (ally, nobobomb) {
	if (ally) {
		if (ally === 'close') {
			document.getElementById('settingsMain').style = '';
			document.getElementById('shortcutSettings').style = '';
			document.getElementById('settingsMain').onclick = '';
			document.getElementById('allySelection').style.display = 'none';
			if (closeAlly === true) {
				closeAlly = false;
				turnEnd();
			}
			return;
		}

		if (ally === 'bobomb') {
			if (nobobomb != true) {
				if (allies['p' + orderCurPlayer].length > 3) {
					document.getElementById(allies['p' + orderCurPlayer][3] + 'Ally').classList.remove('allySelected');
					removeAlly(orderCurPlayer, 4);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'ally']);
				}
				bobombAlly[orderCurPlayer] = parseInt(getInner('curTurnText'));
			}
			editInner('allyDice4', '<img src="img/smp/bobomb.png" style="width: 30px;"> <span onclick="allyDice(4, 1)"> 0 </span> <span onclick="allyDice(4, 2)"> -1 </span>');
			if (allies['p' + orderCurPlayer].length > 3) {
				allies['p' + orderCurPlayer] = allies['p' + orderCurPlayer].slice(0, 3);
			}
			document.getElementById('allyDice4').style.visibility = 'visible';
			document.getElementById('removeAllySelection').children[3].src = 'img/smp/bobomb.png';
			document.getElementById('removeAllySelection').children[3].style.visibility = 'visible';

			if (closeAlly === true) {
				closeAlly = false;
				turnEnd();
			}
			getAlly('close');
			return;
		}
		loop1:
		for (var num = 1; num < 5; num++) {
			if (ally == characters[num]) {
				return;
			}
			for (var num2 = 0; num2 < allies['p' + num].length; num2++) { //check if someone else already uses this ally - if true, remove it
				if (ally == allies['p' + num][num2]) {
					for (var num3 = 1; num3 < 4; num3++) {
						if (document.getElementById('removeAllyChar' + num3).getAttribute('player') == num) {
							removeAlly(num3 + 1, num2 + 1);
							break loop1;
						}
					}
				}
			}
		}	
		if (allies['p' + orderCurPlayer].length > 2 && bobombAlly[orderCurPlayer] != 0) {
			bobombAlly[orderCurPlayer] = 0;
		}
		if (allies['p' + orderCurPlayer].length > 3) {
			document.getElementById(allies['p' + orderCurPlayer][3] + 'Ally').classList.remove('allySelected');
			allies['p' + orderCurPlayer] = [allies['p' + orderCurPlayer][0], allies['p' + orderCurPlayer][1], allies['p' + orderCurPlayer][2], ally];
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'ally']);
		} else {
			allies['p' + orderCurPlayer].push(ally);
		}
		var elems = document.getElementById('allyDiceSelection').children;

		for (var num = 2; num < allies['p' + orderCurPlayer].length + 2; num++) {
			elems[num].style.display = 'initial';
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num -2] + '.png';
			if (num === 5) {
				break;
			}
		}
		elems = document.getElementById('removeAllySelection').children;
		for (var num = 0; num < allies['p' + orderCurPlayer].length; num++) {
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
			elems[num].style.visibility = 'visible';
			document.getElementById('allyDice' + (num + 1)).style.visibility = 'visible';
			if ((num + 1) === 4) {
				editInner('allyDice' + (num + 1), '<img src="img/smp/' + allies['p' + orderCurPlayer][num] + '.png" style="width: 30px;"> <span onclick="allyDice(4, 1)"> 1 </span> <span onclick="allyDice(4, 2)"> 2 </span>');
			} else {
				document.getElementById('allyDice' + (num + 1)).children[0].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
			}
		}

		document.getElementById(ally + 'Ally').classList.add('allySelected');
		execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'ally']);
		shortcutNotif(getCharName(orderCurPlayer) + ' got ' + getCharName(ally) + ' as an ally.');
		if (closeAlly === true) {
			closeAlly = false;
			turnEnd();
		}
		getAlly('close');
		return;
	} else {
		document.getElementById('settingsMain').style = '-webkit-filter: blur(5px); filter: blur(5px);';
		document.getElementById('shortcutSettings').style = 'pointer-events: none;'; //filter and pointer event need to be different as blur wouldn't be smooth with 'shortcutSettings' and pointer-event would remove onClick
		document.getElementById('allySelection').style.display = 'initial';
		setTimeout(function () {document.getElementById('settingsMain').setAttribute('onclick','getAlly(\'close\')');}, 10); //required because chrome would immediately execute the function if it was changed directly
	}
}

/*
* Removes an ally from a player.
* 
* @param {number} player The player thats affected.
* @param {number} ally The ally that should be removed.
*/
function removeAlly (player, ally) {
	if (ally === 4 && bobombAlly[player] != 0) {
		document.getElementById('allyDice4').style.visibility = 'hidden';
		document.getElementById('removeAllySelection').children[3].style.visibility = 'hidden';
		bobombAlly[player] = 0;
		//getAlly('close');
		return;
	}
	if (player === 1) {
		if (diceUsed[orderCurPlayer] === allies['p' + orderCurPlayer][ally - 1]) {
			changeAllyDice(0);
		}
		var elems = document.getElementById('removeAllySelection').children;
		var elems2 = [document.getElementById('allyDice1'), document.getElementById('allyDice2'), document.getElementById('allyDice3'), document.getElementById('allyDice4')];
		elems[allies['p' + orderCurPlayer].length - 1].style.visibility = 'hidden';
		elems2[allies['p' + orderCurPlayer].length - 1].style.visibility = 'hidden';

		document.getElementById(allies['p' + orderCurPlayer][ally - 1] + 'Ally').classList.remove('allySelected');
		execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'ally']);
		shortcutNotif(getCharName(orderCurPlayer) + ' lost ' + getCharName(allies['p' + orderCurPlayer][ally - 1]) + ' as an ally.');

		allies['p' + orderCurPlayer].splice(ally - 1, 1);
		for (var num = 0; num < allies['p' + orderCurPlayer].length; num++) {
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
			elems2[num].children[0].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
		}

		elems = document.getElementById('allyDiceSelection').children;

		for (var num = 2; num < elems.length; num++) {
			if ((allies['p' + orderCurPlayer].length + 1) < num) {
				elems[num].style.display = 'none';
			}
		}

		for (var num = 2; num < allies['p' + orderCurPlayer].length + 2; num++) {
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num - 2] + '.png';
		}

	} else {
		var char = parseInt(document.getElementById('removeAllyChar' + (player - 1)).getAttribute('player'));
		var elems = document.getElementById('removeAllyChar' + (player - 1)).children;
		elems[allies['p' + char].length].style.visibility = 'hidden';

		execOnMain('counterButtons', [char, 'M', 1, 'ally']);
		shortcutNotif(getCharName(char) + ' lost ' + getCharName(allies['p' + char][ally - 1]) + ' as an ally.');

		document.getElementById(allies['p' + char][ally - 1] + 'Ally').classList.remove('allySelected');
		allies['p' + char].splice(ally - 1, 1);
		for (var num = 0; num < allies['p' + char].length; num++) {
			elems[num + 1].src = 'img/smp/' + allies['p' + char][num] + '.png';
		}
	}
	//getAlly('close');
}

var diceUsed = ['', 0, 0, 0, 0];
/*
* Changes the dice numbers based on ally selected.
* 
* @param {number} ally Which dice it should be changed to.
*/
function changeAllyDice (ally) {
	var elems = document.getElementById('allyDiceSelection').children;
	removeSelected(elems);
	elems[ally].classList.add('selected');
	diceUsed[orderCurPlayer] = elems[ally].src.replace(/^.*[\\\/]/, '').slice(0, -4);

	var dice = [];

	if (ally == 0) {
		dice = [1, 2, 3, 4, 5, 6];
	} else {
		switch (elems[ally].src.replace(/^.*[\\\/]/, '').slice(0, -4)) { //get the character name from elements src
			case 'mario':
				dice = [1, 3, 3, 3, 5, 6];
				break;
			case 'luigi':
				dice = [1, 1, 1, 5, 6, 7];
				break;
			case 'peach':
				dice = [0, 2, 4, 4, 4, 6];
				break;
			case 'daisy':
				dice = [3, 3, 3, 3, 4, 4];
				break;
			case 'wario':
				dice = ['-2', '-2', 6, 6, 6, 6];
				break;
			case 'waluigi':
				dice = ['-3', 1, 3, 5, 5, 7];
				break;
			case 'yoshi':
				dice = [0, 1, 3, 3, 5, 7];
				break;
			case 'rosalina':
				dice = ['+2', '+2', 2, 3, 4, 8];
				break;
			case 'dk':
				dice = ['+5', 0, 0, 0, 10, 10];
				break;
			case 'diddy':
				dice = ['+2', 0, 0, 7, 7, 7];
				break;
			case 'bowser':
				dice = ['-3', '-3', 1, 8, 9, 10];
				break;
			case 'goomba':
				dice = ['+2', '+2', 3, 4, 5, 6];
				break;
			case 'shyguy':
				dice = [0, 4, 4, 4, 4, 4];
				break;
			case 'koopa':
				dice = [1, 1, 2, 3, 3, 10];
				break;
			case 'monty':
				dice = ['+1', 2, 3, 4, 5, 6];
				break;
			case 'bowserjr':
				dice = [1, 1, 1, 4, 4, 9];
				break;
			case 'boo':
				dice = ['-2', '-2', 5, 5, 7, 7];
				break;
			case 'hammerbro':
				dice = ['+3', 1, 1, 5, 5, 5];
				break;
			case 'drybones':
				dice = [1, 1, 1, 6, 6, 6];
				break;
			case 'pompom':
				dice = [0, 3, 3, 3, 3, 8];
				break;
			case 'bobomb': //failsafe
				dice = [0, 0, 0, 0, 0, 0];
				break;
		}
	}
	for (var num = 0; num < dice.length; num++) {
		dice[num] = '<span id="dice' + dice[num] + '" onclick="turnDice(this.id)">' + dice[num] + '</span>'
	}

	editInner('turnDiceSelection', dice.join(' '));
}

var allyDiceRolls = ['', 0, 0, 0, 0];
/*
* Rolls the small dice for allies.
* 
* @param {number} ally The ally.
* @param {number} dice The number that got rolled.
*/
function allyDice (ally, dice) {
	var elems = document.getElementById('allyDice' + ally).children;
	elems[1].classList.remove('selected');
	elems[2].classList.remove('selected');
	if (allyDiceRolls[ally] === dice) {
		if (ally === 4 && bobombAlly[orderCurPlayer] != 0) {
			if (dice === 2) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
			}
		} else {
			if (allyDiceRolls[ally] === -1) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
			} else {
				execOnMain('counterButtons', [orderCurPlayer, 'M', allyDiceRolls[ally], 'running']);
			}
		}
		allyDiceRolls[ally] = 0;
		return;
	}

	elems[dice].classList.add('selected');

	if (ally === 4 && bobombAlly[orderCurPlayer] != 0) {
		if (dice === 2) {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'running']);
		} else {
			if (allyDiceRolls[ally] === 2) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
			}
		}
		allyDiceRolls[ally] = dice;
		elems[dice].classList.add('selected');
		return;
	}

	if (allyDiceRolls[ally] === -1) {
		execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
	} else {
		execOnMain('counterButtons', [orderCurPlayer, 'M', allyDiceRolls[ally], 'running']);
	}
	execOnMain('counterButtons', [orderCurPlayer, 'P', dice, 'running']);
	allyDiceRolls[ally] = dice;
	console.log(ally)
	shortcutNotif(getCharName(allies['p' + orderCurPlayer][ally - 1]) + ' rolled a ' + dice + ' for ' + getCharName(orderCurPlayer) + '.');
}

/*
* Buys items.
* 
* @param {number} amount Amount of coins spent.
*/
function shopping (amount) {
	if (getValue('mobileTypeMinus') === true) {
		if (parseInt(getInner('p' + orderCurPlayer + 'ShoppingText')) >= amount) {
			execOnMain('counterButtons', [orderCurPlayer, 'P', amount, 'coins']);
			execOnMain('counterButtons', [orderCurPlayer, 'M', amount, 'shopping']);
			shortcutNotif('Undid shopping for ' + amount + ' coins.');
		} else {
			shortcutNotif('There\'s nothing to undo, release Ctrl to shop.', true);
		}
	} else if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= amount) {
		execOnMain('counterButtons', [orderCurPlayer, 'M', amount, 'coins']);
		execOnMain('counterButtons', [orderCurPlayer, 'P', amount, 'shopping']);
		shortcutNotif(getCharName(orderCurPlayer) + ' bought an item for ' + amount + ' coins.');
	} else {
		shortcutNotif('Not enough coins!', true);
	}
}

var poisonSub = 0; //how much has been subtracted thanks to the poison mushroom
var activeItem;
/*
* Activates an item.
* 
* @param {string} item The item should be used.
*/
function turnItem (item) {
	removeSelected(document.getElementById('turnItems').children);

	if (shortcutGame == 'mpds') {
		for (var num = 6; num < 11; num++) {
			document.getElementById('dice' + num).style.display = '';
		}
	}
	item = item.substring(4);

	if (activeItem == item || (activeItem != undefined && activeItem != '')) { //undo item if it's already selected or when changing it
		switch (activeItem) {
			case 'Mushroom':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'running']);
				break;
			case 'GoldMushroom':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'running']);
				break;
			case 'PoisonMushroom':
				if (typeof statusEffects['p' + itemEventState[1]] === 'number') { //failsafe if array is empty
					statusEffects['p' + itemEventState[1]] = removeArrayItem(statusEffects['p' + itemEventState[1]], 'poison');
				}
				if (itemEventState[1] === orderCurPlayer) {
					if (poisonSub > 2) {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 2, 'running']);
						poisonSub = poisonSub - 2;
						if (poisonSub < 0) {
							poisonSub = 0;
						}
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'P', poisonSub, 'running']);
						poisonSub = 0;
					}
					statusEffects['p' + orderCurPlayer] = removeArrayItem(statusEffects['p' + orderCurPlayer], 'poison');

					var elems = document.getElementById('statusEffects').children;
					for (var num2 = 0; num2 < elems.length; num2++) {
						if (elems[num2].getAttribute('src') === 'img/shortcut/smp/poisonmushroom.png') {
							elems[num2].parentElement.removeChild(elems[num2]);
						}
					}
				}
				break;
			case 'Coinado':
				if (itemEventState[1] === 'done') {
					execOnMain('counterButtons', [orderCurPlayer, 'M', itemEventState[3], 'coins']);
					execOnMain('counterButtons', [itemEventState[2], 'P', itemEventState[3], 'coins']);
				}
				break;
		}
	}

	if (activeItem == item) { // undo the item if it's already selected
		document.getElementById('itemImg').src = 'img/tie.png';
		editInner('itemEventSpan', '');
		activeItem = '';
		document.getElementById('turnCurDice').src = 'img/shortcut/mpds/diceblock.png';

		if (diceRolls.length != 0) {
			editInner('turnCurDiceText', diceRolls[0]);
		} else {
			editInner('turnCurDiceText', '??');
		}
		diceCursor = 0;

		if (item == 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'hex']);
		} else {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'item']);
		}
		shortcutNotif('Undid item.');
		return;

	} else if (activeItem != undefined && activeItem != '') {
		if (activeItem == 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'hex']);
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'item']);
		} else if (item == 'Hex' && activeItem != 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'item']);
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'hex']);
		}
	}
	editInner('itemEventSpan', '');

	switch (item) {
		case 'Double':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/double.png';
			document.getElementById('itemImg').src = 'img/shortcut/mpds/double.png';

			switch (diceRolls.length) {
				case 1:
					editInner('turnCurDiceText', diceRolls[0] + ' + <span style="color: ' + selColor + ';"> ?? </span>');
					diceCursor = 1;
					break;
				case 2:
				case 3:
					editInner('turnCurDiceText', diceRolls[0] + ' + ' + diceRolls[1]);
					diceCursor = 0;
					break;
				default:
					editInner('turnCurDiceText', '?? + ??');
					diceCursor = 0;
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' used a double dice.');
			break;

		case 'Triple':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/triple.png';
			document.getElementById('itemImg').src = 'img/shortcut/mpds/triple.png';

			switch (diceRolls.length) {
				case 1:
					editInner('turnCurDiceText', diceRolls[0] + ' + <span style="color: ' + selColor + ';"> ?? </span> + ??');
					diceCursor = 1;
					break;
				case 2:
					editInner('turnCurDiceText', diceRolls[0] + ' + ' + diceRolls[1] + ' + <span style="color: ' + selColor + ';"> ?? </span>');
					diceCursor = 2;
					break;
				case 3:
					editInner('turnCurDiceText', diceRolls[0] + ' + ' + diceRolls[1] + ' + ' + diceRolls[2]);
					diceCursor = 0;
					break;
				default:
					editInner('turnCurDiceText', '?? + ?? + ??');
					diceCursor = 0;
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' used a triple dice.');
			break;

		case 'Half':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/half.png';
			document.getElementById('itemImg').src = 'img/shortcut/mpds/half.png';
			for (var num = 6; num < 11; num++) {
				document.getElementById('dice' + num).style.display = 'none';
			}
			if (diceRolls.length != 0) {
				editInner('turnCurDiceText', diceRolls[0]);
			} else {
				editInner('turnCurDiceText', '??');
			}
			diceCursor = 0;
			shortcutNotif(getCharName(orderCurPlayer) + ' used a half dice.');
			break;

		case 'Hex':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/diceblock.png';
			document.getElementById('itemImg').src = 'img/hex.png';
			shortcutNotif(getCharName(orderCurPlayer) + ' placed a hex.');
			break;

		case 'Mushroom':
			document.getElementById('itemImg').src = 'img/shortcut/smp/mushroom.png';
			execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'running']);
			break;

		case 'GoldMushroom':
			document.getElementById('itemImg').src = 'img/shortcut/smp/goldmushroom.png';
			execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'running']);
			break;

		case 'PoisonMushroom':
			document.getElementById('itemImg').src = 'img/shortcut/smp/poisonmushroom.png';
			editInner('itemEventSpan', '<span class="settingsText"> Who should get the poison mushroom? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [4])">');
			break;

		case 'GoldDrink':
			document.getElementById('itemImg').src = 'img/shortcut/smp/golddrink.png';
			break;

		case 'PeepaBell':
			document.getElementById('itemImg').src = 'img/shortcut/smp/peepabell.png';
			break;

		case 'Coinado':
			document.getElementById('itemImg').src = 'img/shortcut/smp/coinado.png';
			editInner('itemEventSpan', '<span class="settingsText"> Select the amount of coins: <select id="coinadoSelect"> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> and your rival: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [4])"> <button style="position: relative; top: -22px;" onclick="itemEvent(\'coinado\', [\'start\'])"> Start! </button>');
				document.getElementById('itemEventSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;

		case 'DuelGlove':
			document.getElementById('itemImg').src = 'img/shortcut/smp/duelglove.png';
			break;

		case 'AllyPhone':
			document.getElementById('itemImg').src = 'img/shortcut/smp/allyphone.png';
			getAlly();
			break;

		default:
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/diceblock.png';
			document.getElementById('itemImg').src = 'img/question.png';
			document.getElementById('item' + item).classList.add('selected');
			shortcutNotif(getCharName(orderCurPlayer) + ' used a misc item.');

			if (diceRolls.length != 0) {
				editInner('turnCurDiceText', diceRolls[0]);
			} else {
				editInner('turnCurDiceText', '??');
			}
			diceCursor = 0;
	}
		document.getElementById('item' + item).classList.add('selected');

	if (activeItem == '' || activeItem == undefined) {
		if (item == 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'hex']);
		} else {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'item']);
		}
	}
	activeItem = item;
}

var statusEffects = {
	p1: [],
	p2: [],
	p3: [],
	p4: []
};
var itemEventState = [];
/*
* Events for items.
* 
* @param {string} item What item.
* @param {array} attr Required attributes to calculate stuff.
*/
function itemEvent (item, attr) {
	if (itemEventState[0] != item) {
		itemEventState = [];
	}
	itemEventState[0] = item;
	switch (item) {
		case 'poison':
			if (attr[0] === orderCurPlayer) {
				editInner('statusEffects', getInner('statusEffects') + '<img src="img/shortcut/smp/poisonmushroom.png">');
				statusEffects['p' + orderCurPlayer].push('poison');
				if (diceRolls[0] != undefined && diceRolls[0].length != 0) {
					poisonSub = poisonSub + 2
					if (poisonSub > diceRolls[0]) {
						execOnMain('counterButtons', [orderCurPlayer, 'M', (poisonSub - diceRolls[0]), 'running']);
						poisonSub = diceRolls[0];
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 2, 'running']);
					}
				}
			} else {
				statusEffects['p' + attr[0]].push('poison');
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' used a poison mushroom on ' + getCharName(attr[0]));
			itemEventState = ['poison', attr[0]];
			editInner('itemEventSpan', '');
			break;
		case 'coinado':
			if (isNaN(attr[0]) === false) {
				var elems = document.getElementById('itemEventSpan').children;
				removeSelected(elems);
				elems[attr[0] + 1].classList.add('selected');
				itemEventState = ['coinado', attr[0]];
				return;
			} else {
				if (isNaN(itemEventState[1]) === true) {
					shortcutNotif('Select a character to use Coinado.', true);
				}
				var coinNum = getValue('coinadoSelect');
				if (parseInt(getInner('p' + itemEventState[1] + 'CoinsText')) < coinNum) {
					coinNum = parseInt(getInner('p' + itemEventState[1] + 'CoinsText'));
				}
				execOnMain('counterButtons', [itemEventState[1], 'M', coinNum, 'coins']);
				execOnMain('counterButtons', [orderCurPlayer, 'P', coinNum, 'coins']);
				itemEventState = ['coinado', 'done', itemEventState[1], coinNum];
				shortcutNotif(getCharName(orderCurPlayer) + ' used a Coinado and got ' + coinNum + ' coins from ' + getCharName(itemEventState[2]) + '.');
				editInner('itemEventSpan', '');
			}
			break;
	}
}

var activeHex;
var activeHexChar;
var hexCoins;
/*
* Activate hex.
* 
* @param {string/number} hex Number if player should be changed - string if hex should be executed.
*/
function turnHex (hex) {
	var coins;
	if (activeHex != '' && activeHex != undefined && activeHexChar != undefined) { //undo hex if a different or the same one is selected
		if (activeHexChar == orderCurPlayer) { //if player landed on own hex
			switch (hex) {
				case 'coinblock':
				case 'starblock':
					shortcutNotif('Undid own Hex.');
					break;
				default:
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					shortcutNotif('Undid own Hex.');
			}
		} else {
			switch (activeHex) {
				case 'coinsm10':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'coins']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'coins']);
					shortcutNotif('Undid the -10 Coin Hex.');
					break;
				case 'coinsm20':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'coins']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'coins']);
					shortcutNotif('Undid the -20 Coin Hex.');
					break;
				case 'coinswap':
					coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
					var coinSwap = parseInt(getInner('p' + activeHexChar + 'CoinsText'));
					execOnMain('counterButtons', [orderCurPlayer, 'S', coinSwap, 'coins']);
					execOnMain('counterButtons', [activeHexChar, 'S', coins, 'coins']);
					shortcutNotif('Undid the Coin Swap Hex.');
					break;
				case 'starm1':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'stars']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'stars']);
					shortcutNotif('Undid the -1 Star Hex.');
					break;
				case 'starm2':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'stars']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'stars']);
					shortcutNotif('Undid the -2 Star Hex.');
					break;
				case 'spaceswap':
					shortcutNotif('Undid the Space Swap Hex.');
					break;
				case 'coinblock':
					shortcutNotif('Undid the Coin Block Hex.');
					break;
				case 'starblock':
					shortcutNotif('Undid the Star Block Hex.');
					break;
			}
		}
	}

	if (activeHex == hex) { //stop function if the same hex is selected
		document.getElementById(hex).classList.remove('selected');
		activeHex = undefined;
		return;
	}

	if (isNaN(hex) == false) {
		var elems = document.getElementById('turnHexCharSelection').children;
		for (var num = 2; num < elems.length; num++) {
			elems[num].setAttribute('onclick', 'turnHex(' + (num - 1) + ')');
			elems[num].classList.remove('selected');
		}
		elems[hex + 1].onclick = '';
		elems[hex + 1].classList.add('selected');
		activeHexChar = hex;
	} else {
		elems = document.getElementById('turnHexSelection').children;
		for (var num = 0; num < elems.length; num++) {
			elems[num].classList.remove('selected');
		}
		document.getElementById(hex).classList.add('selected');
		activeHex = hex;
	}

	if (activeHexChar == undefined || activeHex == undefined) { //end function if either player or hex is not specified
		return;
	} else if (isNaN(hex) == false) {
		hex = activeHex;
	}

	if (activeHexChar == orderCurPlayer) {
		switch (hex) { //if landed on own hex
			case 'coinblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on own Coin Block Hex (coins need to be added manually).');
				break;
			case 'starblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on own Star Block Hex (stars need to be added manually).');
				break;
			default:
				execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on own hex and gained 5 coins.');
		}
	} else {
		switch (hex) {
			case 'coinsm10':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
				} else {
					coins = 10;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'coins']);
				shortcutNotif('Moved ' + coins + ' Coins from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -10 Coin Hex.');
				break;
			case 'coinsm20':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
				} else {
					coins = 20;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'coins']);
				shortcutNotif('Moved ' + coins + ' Coins from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -20 Coin Hex.');
				break;
			case 'coinswap':
				coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
				var coinSwap = parseInt(getInner('p' + activeHexChar + 'CoinsText'));
				execOnMain('counterButtons', [orderCurPlayer, 'S', coinSwap, 'coins']);
				execOnMain('counterButtons', [activeHexChar, 'S', coins, 'coins']);
				shortcutNotif('Swapped coins from ' + getCharName(orderCurPlayer) + ' and ' + getCharName(activeHexChar) + ' due to a Coin Swap Hex.');
				break;
			case 'starm1':
				if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 1) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
				} else {
					coins = 1;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'stars']);
				shortcutNotif('Moved ' + coins + ' Stars from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -1 Star Hex.');
				break;
			case 'starm2':
				if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 2) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
				} else {
					coins = 2;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 2, 'stars']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'stars']);
				shortcutNotif('Moved ' + coins + ' Stars from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -2 Star Hex.');
				break;
			case 'spaceswap':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on a Space Swap Hex from ' + getCharName(activeHexChar) + '.');
				break;
			case 'coinblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on a Coin Block Hex (coins need to be added manually).');
				break;
			case 'starblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on a Star Block Hex (stars need to be added manually).');
				break;
		}
	}
}