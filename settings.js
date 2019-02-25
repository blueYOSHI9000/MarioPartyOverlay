var shortcutState = 0;
/*
* Variable shows the current state.
* 0 = Start game button
* 1 = Choose order
* 2 = Player's turn (all 4 players are in this state)
* 3 = Minigame
* 4 = Final 5
*/
var turnCurPlayer = 0;
var orderCurPlayer = 0;
/*
* 
*/
function startShortcut () {

	// +++++ DO NOT WORK ON THIS NOW! +++++ It's a huge mess right now, it will be fixed in a couple days
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	if (popout == true && statSynced == false) {
		sendMessage('statSync');
		statSynced = true;
	}


	console.log('state ' + shortcutState)
	document.getElementById('shortcutBattle').style.display = 'none'; //remove later
	switch (shortcutState) {
		case 0:
			shortcutState = 1;
			document.getElementById('shortcutTurn').style.display = 'none';
			playerOrder = [''];
			document.getElementById('shortcutSpan').innerHTML = '<span class="settingsTitle"> Choose order </span> <br> <span class="settingsText" id="chooseOrderText"> Which character is first? </span> <br> <span> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="chooseP1" onclick="chooseOrder(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="chooseP2" onclick="chooseOrder(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="chooseP3" onclick="chooseOrder(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="chooseP4" onclick="chooseOrder(4)"> <br> <button onclick="chooseOrder(0, true)">Reset Order</button> <br> <span id="chooseFirst" class="chooseImgOrder"> </span> <br> <span id="chooseSecond" class="chooseImgOrder"> </span> <br> <span id="chooseThird" class="chooseImgOrder"> </span> <br> <span id="chooseFourth" class="chooseImgOrder"> </span> <br> <button onclick="startShortcut()" id="chooseContinue" style="display:none;">Continue?</button> </span>';
				shortcutNotif('Choose the order of the players.');
			break;
		case 1:
			shortcutState = 2;
			turnCurPlayer = 1;
			document.getElementById('shortcutSpan').innerHTML = '';
			document.getElementById('shortcutTurn').style.display = '';
			document.getElementById('finishTurn').disabled = '';

			document.getElementById('turnPlayerName').innerHTML = getCharName(orderCurPlayer);
			document.getElementById('turnPlayerIcon').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[orderCurPlayer] + '.png';

			editInner('hexCharSelection', '<span class="settingsText"> Select the character that placed the hex: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" onclick="turnHex(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" onclick="turnHex(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" onclick="turnHex(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" onclick="turnHex(4)">');
			orderCurPlayer = playerOrder[turnCurPlayer];
			switch (orderCurPlayer) {
				case 1:
					document.getElementById('turnPlayerName').style.color = '#0000EB';
					break;
				case 2:
					document.getElementById('turnPlayerName').style.color = '#E60000';
					break;
				case 3:
					document.getElementById('turnPlayerName').style.color = '#00A705';
					break;
				case 4:
					document.getElementById('turnPlayerName').style.color = '#e0dc00';
					break;
			}
			console.log('test')
			break;
		case 2:
			shortcutState = 3;
			document.getElementById('shortcutTurn').style.display = 'none';
			document.getElementById('shortcutSpan').innerHTML = '<span class="settingsTitle"> Normal Minigame </span> <br> <span class="settingsText"> Who won? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="p1Minigame" onclick="startMinigame(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="p2Minigame" onclick="startMinigame(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="p3Minigame" onclick="startMinigame(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="p4Minigame" onclick="startMinigame(4)"> <br> <button onClick="startMinigame()">Done</button> <br> <br> <span class="settingsTitle"> Coin Minigame </span> <br> <span class="settingsText"> WIP, add coins manually for now. <br> Reminder that you can add 5 at once if you hold shift while 1 is selected. </span> <br> <button onclick="coinMinigame()">Done</button> <br> <br> <span class="settingsTitle"> Battle Minigame </span> <br> <button onclick="chooseMinigame(\'battle\')">Start Battle Minigame</button>';
			break;
		case 3:
			if (document.getElementById('curTurnText').innerText == document.getElementById('maxTurnText').innerText) {
				shortcutState = 0;
				document.getElementById('shortcutTurn').style.display = 'none';

				document.getElementById('shortcutSpan').innerHTML = '<span class="settingsText"> Game completed </span> <br> <button onclick="startShortcut()">Start game</button>';
				shortcutNotif('Start the game.');
				//game done
			} else {
				shortcutState = 1;
				execOnMain('counterButtons', [1, 'P', 1, 'curTurn']);
				if (document.getElementById('curTurnText').innerText == parseInt(document.getElementById('maxTurnText').innerText) - 4) {
					shortcutState = 4;
					editInner('shortcutSpan', '<span class="shortcutText"> Final 5 Turns! </span> <br> <br> <span id="finalFiveTie"></span> <span class="settingsText"> Select the event: </span> <select id="finalFiveEvent"> <option value="20coins">Get 20 Coins</option> <option value="30coins">Get 30 Coins</option> <option value="1star">Get 1 Star</option> <option value="charity">Get 10 Coins from others</option> <option value="cheapStars">Stars for 5 coins</option> <option value="100stars">Get 100 Stars</option> <option value="300stars">Get 300 Stars</option> </select> <br> <br> <button onclick="finalFive()">Continue</button>');
					var stars = [];
					for (var num = 1; num < 5; num++) {
						stars.push(parseInt(getInner('p' + num + 'StarsText')));
					}
					lastPlace = Array.min(stars);
					var arr = [];
					for (var num = 1; num < 5; num++) {
						if (lastPlace === stars[num - 1]) {
							arr.push(num);
						}
					}

					if (arr.length > 1) {
						stars = [];
						for (var num = 1; num < 5; num++) {
							stars.push(parseInt(getInner('p' + num + 'CoinsText')));
						}
						lastPlace = Array.min(stars);
						arr = [];
						for (var num = 1; num < 5; num++) {
							if (lastPlace === stars[num - 1]) {
								arr.push(num);
							}
						}
						if (arr.length > 1) {
							arr[0] = 0;
							editInner('finalFiveTie', '<span class="settingsText"> Select the last player: </span> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="finalFive(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="finalFive(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="finalFive(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="finalFive(4)"> <br> <br>');
						}
					}
					lastPlace = arr[0];
				}
				startShortcut();
				return;
			}
			break;
	}
}

/*
* 
*/
Array.min = function (array) {
    return Math.min.apply(Math, array);
}

var lastPlace;
var finalFiveEvent;
/*
* 
*/
function finalFive (player) {
	if (player) {
		var elems = document.getElementById('finalFiveTie').children;
		for (var num = 0; num < elems.length; num++) {
			elems[num].classList.remove('selected');
		}
		elems[player].classList.add('selected');
		lastPlace = player;
		return;
	}
	if (lastPlace == 0) {
		shortcutNotif('Select the character thats in the last place.', true);
		return;
	}

	finalFiveEvent = getValue('finalFiveEvent');

	switch (finalFiveEvent) {
		case '20coins':
			execOnMain('counterButtons', [lastPlace, 'P', 20, 'coins']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got 20 coins.');
			break;
		case '30coins':
			execOnMain('counterButtons', [lastPlace, 'P', 30, 'coins']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got 30 coins.');
			break;
		case '1star':
			execOnMain('counterButtons', [lastPlace, 'P', 1, 'stars']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got 1 star.');
			break;
		case 'charity':
			var charity = 0;
			for (var num = 1; num < 5; num++) {
				if (parseInt(getInner('p' + num + 'CoinsText')) < 10) {
					charity = charity + parseInt(getInner('p' + num + 'CoinsText'));
				} else {
					charity = charity + 10;
				}
				execOnMain('counterButtons', [num, 'M', 10, 'coins']);
			}
			execOnMain('counterButtons', [lastPlace, 'P', charity, 'coins']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got ' + charity + ' coins from others.');
			break;
		case 'cheapStar':
			finalFiveEvent = 'cheapStar';
			shortcutNotif('Final 5 Frenzy: Stars are now just 5 coins!');
			break;
		case '100stars':
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got something that shouldn\'t happen.');
			break;
		case '300stars':
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got something that shouldn\'t happen.');
			break;
	}
	shortcutState = 1;
	startShortcut();
}

var playerOrder;
/*
* 
*/
function chooseOrder (player, reset) {
	console.log('choose')
	if (shortcutState == 1) {
		if (reset == true) {
			playerOrder = [''];
			document.getElementById('chooseFirst').innerHTML = '';
			document.getElementById('chooseSecond').innerHTML = '';
			document.getElementById('chooseThird').innerHTML = '';
			document.getElementById('chooseFourth').innerHTML = '';
			document.getElementById('chooseContinue').style.display = 'none';

			for (var num = 1; num < 5; num++) {
				document.getElementById('chooseP' + num).setAttribute('onClick', 'chooseOrder(' + num + ')');
				document.getElementById('chooseP' + num).classList.add('chooseImg');
				document.getElementById('chooseP' + num).classList.remove('chooseImgSelected');
			}
			return;
		}

		playerOrder.push(player);
		document.getElementById('chooseP' + player).onclick = '';
		document.getElementById('chooseP' + player).classList.add('chooseImgSelected');
		document.getElementById('chooseP' + player).classList.remove('chooseImg');
		switch (playerOrder.length) {
			case 2:
				document.getElementById('chooseFirst').innerHTML = '<img src="img/1st.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">';
				break;
			case 3:
				document.getElementById('chooseSecond').innerHTML = '<img src="img/2nd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">';
				break;
			case 4:
				document.getElementById('chooseThird').innerHTML = '<img src="img/3rd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">';
				break;
			case 5:
				document.getElementById('chooseFourth').innerHTML = '<img src="img/4th.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">';
				document.getElementById('chooseContinue').style.display = 'block';
				break;
		}
	}
	orderCurPlayer = playerOrder[1];
}

var activeItem;
/*
* 
*/
function turnItem (item) {
	var elems = document.getElementById('turnItems').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	for (var num = 6; num < 11; num++) {
		document.getElementById('dice' + num).style.display = '';
	}
	item = item.substring(4);

	if (activeItem == item) {
		document.getElementById('itemImg').src = 'img/tie.png';
		document.getElementById('itemSpan').innerHTML = '';
		activeItem = '';
		document.getElementById('turnCurDice').src = 'img/shortcut/diceblock.png';
		if (diceRolls.length != 0) {
			document.getElementById('turnCurDiceText').innerHTML = diceRolls[0];
		} else {
			document.getElementById('turnCurDiceText').innerHTML = '??';
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
	document.getElementById('itemSpan').innerHTML = '';
	switch (item) {
		case 'Double':
			document.getElementById('turnCurDice').src = 'img/shortcut/double.png';
			document.getElementById('itemImg').src = 'img/shortcut/double.png';
			document.getElementById('item' + item).classList.add('selected');

			switch (diceRolls.length) {
				case 1:
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + <span style="color: ' + selColor + ';"> ?? </span>';
					diceCursor = 1;
					break;
				case 2:
				case 3:
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + diceRolls[1];
					diceCursor = 0;
					break;
				default:
					document.getElementById('turnCurDiceText').innerHTML = '?? + ??';
					diceCursor = 0;
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' used a double dice.');
			break;
		case 'Triple':
			document.getElementById('turnCurDice').src = 'img/shortcut/triple.png';
			document.getElementById('itemImg').src = 'img/shortcut/triple.png';
			document.getElementById('item' + item).classList.add('selected');

			switch (diceRolls.length) {
				case 1:
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + <span style="color: ' + selColor + ';"> ?? </span> + ??';
					diceCursor = 1;
					break;
				case 2:
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + diceRolls[1] + ' + <span style="color: ' + selColor + ';"> ?? </span>';
					diceCursor = 2;
					break;
				case 3:
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + diceRolls[1] + ' + ' + diceRolls[2];
					diceCursor = 0;
					break;
				default:
					document.getElementById('turnCurDiceText').innerHTML = '?? + ?? + ??';
					diceCursor = 0;
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' used a triple dice.');
			break;
		case 'Half':
			document.getElementById('turnCurDice').src = 'img/shortcut/half.png';
			document.getElementById('itemImg').src = 'img/shortcut/half.png';
			document.getElementById('item' + item).classList.add('selected');
			for (var num = 6; num < 11; num++) {
				document.getElementById('dice' + num).style.display = 'none';
			}
			if (diceRolls.length != 0) {
				document.getElementById('turnCurDiceText').innerHTML = diceRolls[0];
			} else {
				document.getElementById('turnCurDiceText').innerHTML = '??';
			}
			diceCursor = 0;
			shortcutNotif(getCharName(orderCurPlayer) + ' used a half dice.');
			break;
		case 'Hex':
			document.getElementById('turnCurDice').src = 'img/shortcut/diceblock.png';
			document.getElementById('itemImg').src = 'img/hex.png';
			document.getElementById('item' + item).classList.add('selected');
			shortcutNotif(getCharName(orderCurPlayer) + ' placed a hex.');
			break
		default:
			document.getElementById('turnCurDice').src = 'img/shortcut/diceblock.png';
			document.getElementById('itemImg').src = 'img/question.png';
			document.getElementById('item' + item).classList.add('selected');
			shortcutNotif(getCharName(orderCurPlayer) + ' used a misc item.');

			if (diceRolls.length != 0) {
				document.getElementById('turnCurDiceText').innerHTML = diceRolls[0];
			} else {
				document.getElementById('turnCurDiceText').innerHTML = '??';
			}
			diceCursor = 0;
	}
	if (activeItem == '' || activeItem == undefined) {
		if (item == 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'hex']);
		} else {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'item']);
		}
	}
	activeItem = item;
}

var diceCursor;
var diceRolls = [];
var selColor = '#f10000';
/*
* 
*/
function turnDice (num) {
	num = num.substring(4);

	var diceRollsTotal = 0;
	if (diceRolls.length != 0 && diceRolls != undefined) {
		for (var num2 = 0; num2 < diceRolls.length; num2++) {
			diceRollsTotal = parseInt(diceRollsTotal) + parseInt(diceRolls[num2]);
		}
	}
	execOnMain('counterButtons', [orderCurPlayer, 'M', diceRollsTotal, 'running']);

	switch (activeItem) {
		case 'Double':
			if (diceRolls.length > 2) {
				diceRolls = [diceRolls[0], diceRolls[1]];
			}
			if (diceRolls.length == 0) {
				document.getElementById('turnCurDiceText').innerHTML = num + ' + <span style="color: ' + selColor + ';"> ?? </span>';
				diceRolls = [num];
				diceCursor = 1;
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' + *' + num + '* with a double dice.');
			} else if (diceRolls.length == 1) {
				document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + num;
				diceRolls.push(num);
				diceCursor = 0;
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + (parseInt(diceRolls[0]) +  parseInt(num)) + ' with a double dice.');
			} else {
				if (diceCursor == 1) {
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + num;
					diceRolls[1] = num;
					diceCursor = 0;
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + (parseInt(diceRolls[0]) +  parseInt(num)) + ' with a double dice.');
				} else {
					document.getElementById('turnCurDiceText').innerHTML = num + ' + <span style="color: ' + selColor + ';"> ' + diceRolls[1] + ' </span>';
					diceRolls[0] = num;
					diceCursor = 1;
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' + *' + diceRolls[1] + '* with a double dice.');
				}
			}
			break;
		case 'Triple':
			if (diceRolls.length == 0) {
				document.getElementById('turnCurDiceText').innerHTML = num + ' + <span style="color: ' + selColor + ';"> ?? </span> + ??';
				diceRolls = [num];
				diceCursor = 1;
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' + *??* + ?? with a triple dice.');
			} else if (diceRolls.length == 1) {
				document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + num + ' + <span style="color: ' + selColor + ';"> ?? </span>';
				diceRolls.push(num);
				diceCursor = 0;
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + diceRolls[0] + ' + ' + num + ' + *??* with a triple dice.');
			} else if (diceRolls.length == 2) {
				document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + diceRolls[1] + ' + ' + num;
				diceRolls.push(num);
				diceCursor = 0;
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + (parseInt(diceRolls[0]) + parseInt(diceRolls[1]) + parseInt(num)) + ' with a triple dice.');
			} else {
				if (diceCursor == 1) {
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + num + ' + <span style="color: ' + selColor + ';">' + diceRolls[2] + '</span>';
					diceRolls[1] = num;
					diceCursor = 2;
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + diceRolls[0] + ' + ' + num + ' + *' + diceRolls[2] + '* with a triple dice.');
				} else if (diceCursor == 2) {
					document.getElementById('turnCurDiceText').innerHTML = diceRolls[0] + ' + ' + diceRolls[1] + ' + ' + num;
					diceRolls[2] = num;
					diceCursor = 0;
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + (parseInt(diceRolls[0]) + parseInt(diceRolls[1]) + parseInt(num)) + ' with a triple dice.');
				} else {
					document.getElementById('turnCurDiceText').innerHTML = num + ' + <span style="color: ' + selColor + ';"> ' + diceRolls[1] + ' </span> + ' + diceRolls[2];
					diceRolls[0] = num;
					diceCursor = 1;
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' + *' + diceRolls[1] + '* + ' + diceRolls[2] + ' with a triple dice.');
				}
			}
			break;
		default:
			diceRolls = [num];
			document.getElementById('turnCurDiceText').innerText = num;
			shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + '.');
	}
	diceRollsTotal = 0;
	for (var num2 = 0; num2 < diceRolls.length; num2++) {
		diceRollsTotal = parseInt(diceRollsTotal) + parseInt(diceRolls[num2]);
	}
	execOnMain('counterButtons', [orderCurPlayer, 'P', diceRollsTotal, 'running']);
}

var activeSpace;
/*
* 
*/
function turnSpace (space) {
	var elems = document.getElementById('turnSpaces').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}

	space = space.substring(5);

	if (activeSpace != '' && activeSpace != undefined) {
		switch (activeSpace) {
			case 'Blue':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'coins']);
				shortcutNotif('Undid the blue space.');
				break;
			case 'Red':
				execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'redSpace']);
				shortcutNotif('Undid the red space.');
				break;
			case 'Happening':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'happening']);
				shortcutNotif('Undid the happening space, coins gathered need to be removed manually.');
				break;
			case 'Friend':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'friendSpace']);

				if (spaceEventState[0] == 'friend' && spaceEventState[1] != 0) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					execOnMain('counterButtons', [spaceEventState[1], 'M', 5, 'coins']);
				}
				shortcutNotif('Undid the friend space.');
				spaceEventState = [];
				break;
			case 'Duel':
				if (spaceEventState[1] == 'done') {
					if (spaceEventState[5] == '1star' || spaceEventState[5] == '2stars') {
						execOnMain('counterButtons', [spaceEventState[6], 'M', spaceEventState[2], 'stars']);
						execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'stars']);
						execOnMain('counterButtons', [spaceEventState[7], 'P', spaceEventState[4], 'stars']);
					} else {
						execOnMain('counterButtons', [spaceEventState[6], 'M', spaceEventState[2], 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
						execOnMain('counterButtons', [spaceEventState[7], 'P', spaceEventState[4], 'coins']);
					}
				} else if (spaceEventState[0] == 'duel') {
					if (spaceEventState[2] == '1star' || spaceEventState[2] == '2stars') {
						execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'stars']);
						execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'stars']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'coins']);
					}
				}
				spaceEventState = ['duel', 'undo'];
				shortcutNotif('Undid the duel space.');
				break;
			case 'Bowser':
				if (spaceEventState[1] == 'done') {
					switch (spaceEventState[2]) {
						case 'coins':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
							break;
						case 'stars':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'stars']);
							break;
						case 'charity':
							execOnMain('counterButtons', [1, 'set', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'set', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'set', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'set', spaceEventState[6], 'coins']);
							break;
						case 'equality':
							execOnMain('counterButtons', [1, 'set', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'set', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'set', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'set', spaceEventState[6], 'coins']);
							break;
					}
					spaceEventState = ['bowser', 'undo'];
				}
				shortcutNotif('Undid the bowser space.');
				break;
		}
	}

	if (activeSpace == space) {
		document.getElementById('spaceEventImg').src = '';
		document.getElementById('spaceEventsSpan').innerHTML = '';
		activeSpace = '';
		return;
	}
	document.getElementById('spaceEventsSpan').innerHTML = '';

	switch (space) {
		case 'Blue':
			document.getElementById('spaceEventImg').src = 'img/shortcut/bluespace.png';
			document.getElementById('space' + space).classList.add('selected');
			execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
			shortcutNotif(getCharName(orderCurPlayer) + ' got 3 coins from a blue space.');
			activeSpace = space;
			break;
		case 'Red':
			document.getElementById('spaceEventImg').src = 'img/shortcut/redspace.png';
			document.getElementById('space' + space).classList.add('selected');
			execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'coins']);
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'redSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' lost 3 coins from a red space.');
			activeSpace = space;
			break;
		case 'Happening':
			document.getElementById('spaceEventImg').src = 'img/shortcut/happening.png';
			document.getElementById('space' + space).classList.add('selected');
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'happening']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a happening space, coins gotten in it need to be added manually.');
			activeSpace = space;
			break;
		case 'Friend':
			document.getElementById('spaceEventImg').src = 'img/shortcut/friendspace.png';
			document.getElementById('space' + space).classList.add('selected');
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'friendSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a friend space, select a friend to give them 5 coins.');
			activeSpace = space;

			editInner('spaceEventsSpan', '<span class="settingsText"> Who should get 5 coins? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [4])">');
			document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;
		case 'Duel':
			document.getElementById('spaceEventImg').src = 'img/shortcut/duelspace.png';
			document.getElementById('space' + space).classList.add('selected');
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a duel space, select a rival to fight.');
			activeSpace = space;

			editInner('spaceEventsSpan', '<span class="settingsText"> Select opponent and reward </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [4])"> <br> <select id="duelReward"> <option value="10coins">10 Coins</option> <option value="20coins">20 Coins</option> <option value="halfcoins">Half your coins</option> <option value="allcoins">All your coins</option> <option value="1star">1 Star</option> <option value="2stars">2 Stars</option> </select> <button style="margin-left: 13px;" onclick="spaceEvent(\'duel\', [\'start\'])">Start Duel</button>');
			document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;
		case 'Bowser':
			document.getElementById('spaceEventImg').src = 'img/shortcut/bowserspace.png';
			document.getElementById('space' + space).classList.add('selected');
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a bowser space, select the event.');
			activeSpace = space;

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the Bowser event </span> <br> <select id="bowserEvent"> <option value="coins">Gimme Coins!</option> <option value="stars">Gimme Stars!</option> <option value="charity">Gimme Charity!</option> <option value="equality">Gimme Equality!</option> </select> <br> <br> <button onclick="spaceEvent(\'bowser\')">Start event!</button>')
			break;
		default:
			document.getElementById('spaceEventImg').src = '';
			document.getElementById('spaceEventsSpan').innerHTML = '';
	}
}

var spaceEventState = [];
/*
* 
* 
* @param {string} space
* @param {array} attr
*/
function spaceEvent (space, attr) {
	if (spaceEventState[0] != space) {
		spaceEventState = [];
	}
	spaceEventState[0] = space;
	switch (space) {
		case 'friend':
			var elems = spaceEventsSpan.children;
			for (var num = 2; num < elems.length; num++) {
				elems[num].classList.remove('selected');
			}
			if (spaceEventState[1] == attr[0]) {
				spaceEventState[1] = 0;
				execOnMain('counterButtons', [attr[0], 'M', 5, 'coins']);
				execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
				shortcutNotif('Undid the friend space.');
				return;
			}
			document.getElementById('spaceEventsSpan').children[attr[0] + 1].classList.add('selected');

			if (spaceEventState[1] != attr[0] && spaceEventState[1] != 0 && spaceEventState[1] != undefined) {
				execOnMain('counterButtons', [spaceEventState[1], 'M', 5, 'coins']);
			} else {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
			}
			execOnMain('counterButtons', [attr[0], 'P', 5, 'coins']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a friend space and got 5 coins together with ' + getCharName(attr[0]) + '.');
			spaceEventState[1] = attr[0];
			break;
		case 'duel':
			/*
			* spaceEventState:
			* [1] = opponent
			* [2] = selected reward
			* [3] = available coins/stars
			* [4] = coins/stars given by current player
			* [5] = coins/stars given by opponent
			*/
			if (attr[0] == 'win') {
				if (spaceEventState[2] == '1star' || spaceEventState[2] == '2stars') {
					execOnMain('counterButtons', [attr[1], 'P', spaceEventState[3], 'stars']);
					shortcutNotif(getCharName(attr[1]) + ' won the duel and got ' + spaceEventState[3] + ' star(s).');
				} else {
					execOnMain('counterButtons', [attr[1], 'P', spaceEventState[3], 'coins']);
					shortcutNotif(getCharName(attr[1]) + ' won the duel and got ' + spaceEventState[3] + ' coins.');
				}
				editInner('spaceEventsSpan', '');
				spaceEventState = ['duel', 'done', spaceEventState[3], spaceEventState[4], spaceEventState[5], spaceEventState[2], attr[1], spaceEventState[1]];
				return;
			} else if (attr[0] == 'tie') {
				if (spaceEventState[2] == '1star' || spaceEventState[2] == '2stars') {
					execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'stars']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'stars']);
					shortcutNotif('The duel was a tie and both got their stars back.');
				} else {
					execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'coins']);
					shortcutNotif('The duel was a tie and both got their coins back.');
				}
			} else if (attr[0] == 'start') {
				if (spaceEventState[1] == undefined || spaceEventState[1] == 'undo') {
					shortcutNotif('Select a character to fight against.', true)
					return;
				}
				spaceEventState[2] = getValue('duelReward');
				switch (getValue('duelReward')) {
					case '10coins':
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							spaceEventState[4] = 10;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'CoinsText')) < 10) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'CoinsText'));
						} else {
							spaceEventState[5] = 10;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 10, 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 10 Coin duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case '20coins':
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							spaceEventState[4] = 20;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'CoinsText')) < 20) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'CoinsText'));
						} else {
							spaceEventState[5] = 20;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 20, 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 20 Coin duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case 'halfcoins':
						spaceEventState[4] = Math.floor(parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) / 2);
						spaceEventState[5] = Math.floor(parseInt(getInner('p' + spaceEventState[1] + 'CoinsText')) / 2);
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];

						execOnMain('counterButtons', [orderCurPlayer, 'M', spaceEventState[4], 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', spaceEventState[5], 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a duel for half coins with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case 'allcoins':
						spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'CoinsText'));
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];

						execOnMain('counterButtons', [orderCurPlayer, 'set', 0, 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'set', 0, 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a duel for all coins with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case '1star':
						if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 1) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
						} else {
							spaceEventState[4] = 1;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'StarsText')) < 1) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'StarsText'));
						} else {
							spaceEventState[5] = 1;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 1, 'stars']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 1 Star duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case '2stars':
						if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 2) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
						} else {
							spaceEventState[4] = 2;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'StarsText')) < 2) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'StarsText'));
						} else {
							spaceEventState[5] = 2;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 2, 'stars']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 2, 'stars']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 2 Star duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
				}
				editInner('spaceEventsSpan', '<span class="settingsText"> Select the winner </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[orderCurPlayer] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [\'win\', ' + orderCurPlayer + '])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[spaceEventState[1]] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [\'win\', ' + spaceEventState[1] + '])"> <span class="shortcutText chooseImg" style="font-size: 30px;" onclick="spaceEvent(\'duel\', [\'tie\'])"> Tie </span>');
				return;
			}

			var elems = spaceEventsSpan.children;
			for (var num = 2; num < elems.length; num++) {
				elems[num].classList.remove('selected');
			}
			if (spaceEventState[1] == attr[0]) {
				spaceEventState[1] = 0;
				return;
			}
			document.getElementById('spaceEventsSpan').children[attr[0] + 1].classList.add('selected');
			spaceEventState[1] = attr[0];
			break;
		case 'bowser':
			switch (getValue('bowserEvent')) {
				case 'coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
						spaceEventState = ['bowser', 'done', getValue('bowserEvent'), 10];
						shortcutNotif('Bowser Space "Gimme Coins!" - Took 10 coins from ' + getCharName(characters[orderCurPlayer]) + '.');
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
						spaceEventState = ['bowser', 'done', getValue('bowserEvent'), 20];
						shortcutNotif('Bowser Space "Gimme Coins!" - Took 20 coins from ' + getCharName(characters[orderCurPlayer]) + '.');
					}
					break;
				case 'stars':
					execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
					spaceEventState = ['bowser', 'done', getValue('bowserEvent'), 1];
					shortcutNotif('Bowser Space "Gimme Stars!" - Took 1 Star from ' + getCharName(characters[orderCurPlayer]) + '.');
					break;
				case 'charity':
					spaceEventState = ['bowser', 'done', getValue('bowserEvent'), getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 30) {
						var num2 = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						for (var num = 0; num < 5; num++) {
							if (num2 % 3 == 0) {
								break;
							}
							num2--
						}
						var num3 = Math.floor(num2 / 3);
						execOnMain('counterButtons', [1, 'P', num3, 'coins']);
						execOnMain('counterButtons', [2, 'P', num3, 'coins']);
						execOnMain('counterButtons', [3, 'P', num3, 'coins']);
						execOnMain('counterButtons', [4, 'P', num3, 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'M', num2 + num3, 'coins']);
						shortcutNotif('Bowser Space "Gimme Charity!" - Took ' + num2 + ' coins from ' + getCharName(characters[orderCurPlayer]) + ' and gave ' + num3 + ' coins to everyone else.');
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 40, 'coins']);
						execOnMain('counterButtons', [1, 'P', 10, 'coins']);
						execOnMain('counterButtons', [2, 'P', 10, 'coins']);
						execOnMain('counterButtons', [3, 'P', 10, 'coins']);
						execOnMain('counterButtons', [4, 'P', 10, 'coins']);
						shortcutNotif('Bowser Space "Gimme Charity!" - Took 30 coins from ' + getCharName(characters[orderCurPlayer]) + ' and gave 10 coins to everyone else.');
					}
					break;
				case 'equality':
					spaceEventState = ['bowser', 'done', getValue('bowserEvent'), getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];
					var coinNum = parseInt(getInner('p' + 1 + 'CoinsText')) + parseInt(getInner('p' + 2 + 'CoinsText'))+ parseInt(getInner('p' + 3 + 'CoinsText')) + parseInt(getInner('p' + 4 + 'CoinsText'));
					coinNum = Math.floor(coinNum / 4);
					execOnMain('counterButtons', [1, 'set', coinNum, 'coins']);
					execOnMain('counterButtons', [2, 'set', coinNum, 'coins']);
					execOnMain('counterButtons', [3, 'set', coinNum, 'coins']);
					execOnMain('counterButtons', [4, 'set', coinNum, 'coins']);
					shortcutNotif('Bowser Space "Gimme Equality!" - Set everyones coin count to ' + coinNum + '.');
					break;
			}
			editInner('spaceEventsSpan', '');
			break;
	}
}

var activeHex;
var activeHexChar;
var hexCoins;
/*
* 
*/
function turnHex (hex) {
	var coins;
	if (activeHex != '' && activeHex != undefined && activeHexChar != undefined) {
		if (activeHexChar == orderCurPlayer) {
			switch (hex) {
				case 'coinblock':
				case 'starblock':
					break;
				default:
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
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
					execOnMain('counterButtons', [orderCurPlayer, 'set', coinSwap, 'coins']);
					execOnMain('counterButtons', [activeHexChar, 'set', coins, 'coins']);
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

	if (activeHex == hex) {
		document.getElementById(hex).classList.remove('selected');
		activeHex = undefined;
		return;
	}

	if (isNaN(hex) == false) {
		var elems = document.getElementById('hexCharSelection').children;
		for (var num = 2; num < elems.length; num++) {
			elems[num].setAttribute('onclick', 'turnHex(' + (num - 1) + ')');
			elems[num].classList.remove('selected');
		}
		elems[hex + 1].onclick = '';
		elems[hex + 1].classList.add('selected');
		activeHexChar = hex;
	} else {
		elems = document.getElementById('hexSelection').children;
		for (var num = 0; num < elems.length; num++) {
			elems[num].classList.remove('selected');
		}
		document.getElementById(hex).classList.add('selected');
		activeHex = hex;
	}

	if (activeHexChar == undefined || activeHex == undefined) {
		return;
	} else if (isNaN(hex) == false) {
		hex = activeHex;
	}

	if (activeHexChar == orderCurPlayer) {
		switch (hex) {
			case 'coinblock':
			case 'starblock':
				break;
			default:
				execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
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
				execOnMain('counterButtons', [orderCurPlayer, 'set', coinSwap, 'coins']);
				execOnMain('counterButtons', [activeHexChar, 'set', coins, 'coins']);
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

/*
* 
*/
function shopping (amount) {
	if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= amount) {
		execOnMain('counterButtons', [orderCurPlayer, 'M', amount, 'coins']);
		execOnMain('counterButtons', [orderCurPlayer, 'P', amount, 'shopping']);
		shortcutNotif(getCharName(orderCurPlayer) + ' bought an item for ' + amount + ' coins.');
	} else {
		shortcutNotif('Not enough coins!', true);
	}
}

/*
* 
*/
function buyStar (star) {
	if (star) {
		switch (star) {
			case 'jarstar':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 10 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
			case 'jarcoins':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' lost 5 coins thanks to a magic jar.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
			case 'jarfail':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' lost 10 coins thanks to a magic jar.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
			case 'bluenote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 5) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 5 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
			case 'greennote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 10 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
			case 'yellownote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 15) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 15, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 15 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
			case 'orangenote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 20) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 20 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
			case 'rednote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 30) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 30, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 30 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
		}
	} else {
		if (finalFiveEvent == 'cheapStars') {
			if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 5) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
				execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
				shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 5 coins.');
			} else {
				shortcutNotif('Not enough coins!', true);
			}
		} else {
			if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 20) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
				execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
				shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 20 coins.');
			} else {
				shortcutNotif('Not enough coins!', true);
			}
		}
	}
}

/*
* 
*/
function turnEnd () {
	turnCurPlayer++;
	if (turnCurPlayer == 5) {
		turnCurPlayer = 1;
		document.getElementById('finishTurn').disabled = 'true';
		var done = true;
	}
	orderCurPlayer = playerOrder[turnCurPlayer];

	editInner('turnPlayerName', getCharName(orderCurPlayer));
	document.getElementById('turnPlayerIcon').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[orderCurPlayer] + '.png';
	switch (orderCurPlayer) {
		case 1:
			document.getElementById('turnPlayerName').style.color = '#0000EB';
			break;
		case 2:
			document.getElementById('turnPlayerName').style.color = '#E60000';
			break;
		case 3:
			document.getElementById('turnPlayerName').style.color = '#00A705';
			break;
		case 4:
			document.getElementById('turnPlayerName').style.color = '#e0dc00';
			break;
	}
	spaceEventState = [];
	activeSpace = undefined;
	document.getElementById('turnCurDice').src = 'img/shortcut/diceblock.png';
	document.getElementById('spaceEventImg').src = '';
	document.getElementById('spaceEventsSpan').innerHTML = '';
	battleResult = [];
	editInner('battleResult', '');
	document.getElementById('battleReset').style.display = 'none';
	activeHex = undefined;
	activeHexChar = undefined;
	hexCoins = undefined;
	var elems = document.getElementById('hexCharSelection').children;
	for (var num = 1; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	elems = document.getElementById('hexSelection').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	diceCursor = undefined;
	diceRolls = [];
	elems = document.getElementById('turnSpaces').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	document.getElementById('turnCurDiceText').innerHTML = '??';
	activeItem = undefined;
	document.getElementById('itemImg').src = 'img/tie.png';
	elems = document.getElementById('turnItems').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	for (var num = 6; num < 11; num++) {
		document.getElementById('dice' + num).style.display = '';
	}
	if (done && done == true) {
		startShortcut();
		return;
	}
}

/*
* 
*/
function shortcutNotif (text, error) {
	console.log('[MPO Shortcut] ' + text);
	editInner('shortcutNotif', text);
	if (error) {
		document.getElementById('shortcutNotif').classList.add('errorAni');
		setTimeout(removeError, 500)
	} else {
		document.getElementById('shortcutNotif').style.color = '';
	}
}

/*
* 
*/
function removeError () {
	document.getElementById('shortcutNotif').classList.remove('errorAni');
}

/*
* 
*/
function chooseMinigame (minigame) {
	switch (minigame) {
		case 'normal':
			break;
		case 'coin':
			break;
		case 'battle':
			document.getElementById('shortcutSpan').innerHTML = '';
			document.getElementById('shortcutBattle').style.display = '';
			break;
	}
}

var minigamePlayers = [];
/*
* 
*/
function startMinigame (player) {
	if (player) {
		for (var num = 0; num < minigamePlayers.length; num++) {
			if (minigamePlayers[num] == player) {
				document.getElementById('p' + minigamePlayers[num] + 'Minigame').classList.remove('selected');
				minigamePlayers.splice(num, 1);
				return;
			}
		}
		document.getElementById('p' + player + 'Minigame').classList.add('selected');
		minigamePlayers.push(player);
		return;
	}

	switch (curGame) {
		case 'mp1':
		case 'mp2':
		case 'mp3':
		case 'mp4':
		case 'mp5':
		case 'mp6':
		case 'mp7':
		case 'mp8':
			for (var num = 0; num < minigamePlayers.length; num++) {
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 10, 'coins']);
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 10, 'minigame']);
				minigamePlayers[num] = getCharName(minigamePlayers[num]);
			}
			shortcutNotif(minigamePlayers.join(' & ') + ' won a minigame.');
			break;
		case 'mp9':
		case 'mp10':
			break;
		case 'mpds':
		case 'smp':
			for (var num = 0; num < minigamePlayers.length; num++) {
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 10, 'coins']);
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 1, 'minigame']);
				minigamePlayers[num] = getCharName(minigamePlayers[num]);
			}
			shortcutNotif(minigamePlayers.join(' & ') + ' won a minigame.');
			break;
		case 'mpa':
		case 'mpit':
		case 'mpsr':
		case 'mptt100':
			break;
	}
	minigamePlayers = [];
	startShortcut();
}

/*
* 
*/
function coinMinigame () {
	for (var num = 1; num < 5; num++) {
		execOnMain('counterButtons', [num, 'P', 1, 'minigame']);
	}
	startShortcut();
}

var battleCurPlayer;
var battleRanks = {};
var battleCoins;
/*
* 
*/
function startBattle () {
	var coinReq = parseInt(getValue('battleCoins'));
	battleCoins = 0;
	for (var num = 1; num < 5; num++) {
		if (parseInt(document.getElementById('p' + num + 'CoinsText').innerText) < coinReq) {
			battleCoins = battleCoins + parseInt(document.getElementById('p' + num + 'CoinsText').innerText);
			execOnMain('counterButtons', [num, 'M', coinReq, 'coins']);
		} else {
			battleCoins = battleCoins + coinReq;
			execOnMain('counterButtons', [num, 'M', coinReq, 'coins']);
		}
	}
	battleCurPlayer = 1;
	battleRanks.first = [];
	battleRanks.second = [];
	battleRanks.third = [];
	battleRanks.fourth = [];
	document.getElementById('battleTextCoins').innerHTML = 'Fighting for ' + battleCoins + ' coins.';
	document.getElementById('battleText').innerHTML = 'Select place for Player 1 "' + getCharName(characters[1]) + '".'
	document.getElementById('battleStart').style.display = 'none';
	document.getElementById('battlePlayers').style.display = 'block';
	document.getElementById('battleReset').style.display = '';
	shortcutNotif('Started a Battle Minigame for ' + coinReq + ' coins.');
}

var battleResult = [];
/*
* 
*/
function calcBattle (place) {
	if (place == 'undo') {
		battleResult = [];
		editInner('battleResult', '');
		battleCurPlayer = 1;
		document.getElementById('battleText').innerHTML = 'Select place for Player 1 "' + getCharName(characters[1]) + '".';
		return;
	}

	switch (battleCurPlayer) {
		case 1:
			battleCurPlayer = 2;
			document.getElementById('battleText').innerHTML = 'Select place for Player 2 "' + getCharName(characters[2]) + '".';
			break;
		case 2:
			battleCurPlayer = 3;
			document.getElementById('battleText').innerHTML = 'Select place for Player 3 "' + getCharName(characters[3]) + '".';
			break;
		case 3:
			battleCurPlayer = 4;
			document.getElementById('battleText').innerHTML = 'Select place for Player 4 "' + getCharName(characters[4]) + '".';
			break;
		case 4:
			battleCurPlayer = 5;
			startShortcut();
			break;
	}
	switch (place) {
		case 1:
			battleRanks.first.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/1st.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
		case 2:
			battleRanks.second.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/2nd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
		case 3:
			battleRanks.third.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/3rd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
		case 4:
			battleRanks.fourth.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/4th.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
	}
	editInner('battleResult', battleResult.join(' <br> '));
	if (battleCurPlayer == 5) {
		var counter;
		switch (curGame) {
			case 'mp1':
			case 'mp2':
			case 'mp3':
			case 'mp4':
			case 'mp5':
				if (battleRanks.first.length == 1) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((70 / 100) * battleCoins), 'coins']);
					if (battleRanks.second.length == 1) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((30 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.second.length == 2) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.second.length == 3) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[2], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
					}
				} else if (battleRanks.first.length == 2) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((50 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((50 / 100) * battleCoins), 'coins']);
				} else if (battleRanks.first.length == 3) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
				} else if (battleRanks.first.length == 4) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[3], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
				}
				if (battleCoins % 10 != 0) {
					shortcutNotif('One coin was left and was given to a random player, needs to be added manually.');
				} else {
					shortcutNotif('Coins from battle minigame succesfully given to the players.');
				}
				editInner('battleText', '');
				editInner('battleTextCoins', '');
				document.getElementById('battleStart').style.display = 'block';
				document.getElementById('battlePlayers').style.display = 'none';
				break;
			case 'mp6':
			case 'mp7':
			case 'mp8':
				for (var num = 0; num < 2; num++) {
						counter = 'minigame';
					if (num == 1) {
						counter = 'coins';
					}

					if (battleRanks.first.length == 1) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((70 / 100) * battleCoins), 'coins']);

						if (battleRanks.second.length == 1) {
							execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);

							if (battleRanks.third.length == 1) {
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
							} else if (battleRanks.third.length == 2) {
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
							} else if (battleRanks.third.length == 3) {
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
							}

						} else if (battleRanks.second.length == 2) {
							execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
						} else if (battleRanks.second.length == 3) {
							execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.second[2], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
						}
					} else if (battleRanks.first.length == 2) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);
						if (battleRanks.third.length == 1) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
						}
					} else if (battleRanks.first.length == 3) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.first.length == 4) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[3], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					}
					if (battleCoins % 10 != 0) {
						shortcutNotif('One coin was left and was given to a random player, needs to be added manually.');
					} else {
						shortcutNotif('Coins from battle minigame succesfully given to the players.');
					}
					editInner('battleText', '');
					editInner('battleTextCoins', '');
					document.getElementById('battleStart').style.display = 'block';
					document.getElementById('battlePlayers').style.display = 'none';
				}
				break;
			case 'mp9':
				break;
			case 'mp10': //doesn't have battles
			case 'mpa':
				break;
			case 'mpds':
				if (battleRanks.first.length == 1) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((65 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					if (battleRanks.second.length == 1) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((30 / 100) * battleCoins), 'coins']);

						if (battleRanks.third.length == 1) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
						} else if (battleRanks.third.length == 2) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
						} else if (battleRanks.third.length == 3) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
						}

					} else if (battleRanks.second.length == 2) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((17.5 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((17.5 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.second.length == 3) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor(((35 / 3) / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor(((35 / 3) / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[2], 'P', Math.floor(((35 / 3) / 100) * battleCoins), 'coins']);
					}
				} else if (battleRanks.first.length == 2) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', 1, 'minigame']);

					if (battleRanks.third.length == 1) {
						execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
					}
				} else if (battleRanks.first.length == 3) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', 1, 'minigame']);
				} else if (battleRanks.first.length == 4) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[3], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[3], 'P', 1, 'minigame']);
				}
				if (battleCoins % 10 != 0) {
					shortcutNotif('One coin was left and was given to a random player, needs to be added manually.');
				} else {
					shortcutNotif('Coins from battle minigame succesfully given to the players.');
				}
				editInner('battleText', '');
				editInner('battleTextCoins', '');
				document.getElementById('battleStart').style.display = 'block';
				document.getElementById('battlePlayers').style.display = 'none';
				break;
			case 'mpit':
			case 'mpsr':
			case 'mptt100':
			case 'smp':
			default:
		}
	}
}

startShortcut();
console.log('[MPO] settings.js is loaded.')