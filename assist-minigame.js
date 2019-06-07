var minigameMode;
var minigameRanks = {
	first: [],
	second: [],
	third: [],
	fourth: [],
	num: 1
};
var minigamePlayers = [];
/*
* Starts a normal minigame.
* 
* @param {number} player Which player should win.
*/
function startMinigame (player) {
	var high5 = false;
	if (player === '4p') {
		minigameMode = '4p';
		editInner('normalMinigame', '<button onclick="startMinigame(\'back\')">Select minigame mode</button> <br> <span class="settingsNote"> Reminder: If there are two 1st-places, the next player is 3rd, not 2nd; same applies to all ties. </span> <br> <span id="4pMinigame" class="settingsText"> Select place for Player 1 "' + getCharName(1) + '": </span> <br> <span> <img src="img/1st.png" class="battleImg" onclick="startMinigame(\'first\')"> <img src="img/2nd.png" class="battleImg" onclick="startMinigame(\'second\')"> <img src="img/3rd.png" class="battleImg" onclick="startMinigame(\'third\')"> <img src="img/4th.png" class="battleImg" onclick="startMinigame(\'fourth\')"> </span>');
		minigameRanks = {
			first: [],
			second: [],
			third: [],
			fourth: [],
			num: 1
		};
		return;
	} else if (player === '2v2') {
		minigameMode = '2v2';
		editInner('normalMinigame', '<button onclick="startMinigame(\'back\')">Select minigame mode</button> <br> <span class="settingsText"> Who won? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="p1Minigame" onclick="startMinigame(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="p2Minigame" onclick="startMinigame(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="p3Minigame" onclick="startMinigame(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="p4Minigame" onclick="startMinigame(4)"> <br> <button onClick="startMinigame()">Done</button> <button onClick="startMinigame(\'high5\')">High five</button> <span class="settingsNote"> High five gives the 1st-place team 2 additional coins. </span> <br> <button onclick="startMinigame(\'tie\')" style="margin-top: 5px;">Tie</button>');
		return;
	} else if (player === '1v3') {
		minigameMode = '1v3';
		editInner('normalMinigame', '<button onclick="startMinigame(\'back\')">Select minigame mode</button> <br> <span class="settingsText"> Who won? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="p1Minigame" onclick="startMinigame(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="p2Minigame" onclick="startMinigame(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="p3Minigame" onclick="startMinigame(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="p4Minigame" onclick="startMinigame(4)"> <br> <button onClick="startMinigame()">Done</button> <button onClick="startMinigame(\'high5\')">High five</button> <span class="settingsNote"> High five gives the 1st-place team 2 additional coins. </span> <br> <button onclick="startMinigame(\'tie\')" style="margin-top: 5px;">Tie</button>');
		return;
	} else if (player === 'back') {
		editInner('normalMinigame', '<span class="settingsText"> Select minigame type: </span> <br> <span class="shortcutText spanSelection"> <span onclick="startMinigame(\'4p\')"> 4-Player </span> <span onclick="startMinigame(\'2v2\')"> 2vs2 </span> <span onclick="startMinigame(\'1v3\')"> 1vs3 </span> </span>');
		minigamePlayers = [];
		return;
	} else if (player === 'high5') {
		high5 = true;
	}
	if (player && high5 != true) {
		if (minigameMode === '4p') {
			minigameRanks[player].push(minigameRanks.num);
			if (minigameRanks.num != 4) {
				minigameRanks.num++;
				editInner('4pMinigame', 'Select place for Player ' + minigameRanks.num + ' "' + getCharName(minigameRanks.num) + '":');
				return;
			}
		} else if (isNaN(player) === false) {
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
	}

	switch (shortcutGame) {
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
			for (var num = 0; num < minigamePlayers.length; num++) {
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 10, 'coins']);
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 1, 'minigame']);
				minigamePlayers[num] = getCharName(minigamePlayers[num]);
			}
			shortcutNotif(minigamePlayers.join(' & ') + ' won a minigame.');
		case 'smp':
			if (minigameRanks.first.length === 4 || minigameRanks.second.length === 4 || minigameRanks.third.length === 4 || minigameRanks.fourth.length === 4) {
				player = 'tie';
			}
			if (player === 'tie') {
				for (var num = 1; num < 5; num++) {
					execOnMain('counterButtons', [num, 'P', 5, 'coins']);
				}
				shortcutNotif('Tie, everyone got 5 coins.');
				break;
			}
			var minigamePlayersResult = [];
			switch (minigameMode) {
				case '4p':
					for (var num = 0; num < minigameRanks.first.length; num++) {
						execOnMain('counterButtons', [minigameRanks.first[num], 'P', 8, 'coins']);
						execOnMain('counterButtons', [minigameRanks.first[num], 'P', 1, 'minigame']);
						minigamePlayersResult.push(getCharName(minigameRanks.first[num]));
					}
					for (var num = 0; num < minigameRanks.second.length; num++) {
						execOnMain('counterButtons', [minigameRanks.second[num], 'P', 4, 'coins']);
					}
					for (var num = 0; num < minigameRanks.third.length; num++) {
						execOnMain('counterButtons', [minigameRanks.third[num], 'P', 2, 'coins']);
					}
					break;
				case '2v2':
				case '1v3':
					var inArr = false;
					for (var num = 1; num < 5; num++) {
						for (var num2 = 0; num2 < minigamePlayers.length; num2++) {
							if (minigamePlayers[num2] == num) {
								inArr = true;
								break;
							}
						}
						if (inArr === true) {
							execOnMain('counterButtons', [num, 'P', 8, 'coins']);
							execOnMain('counterButtons', [num, 'P', 1, 'minigame']);
							console.log(num2)
							minigamePlayersResult.push(getCharName(minigamePlayers[num2]));
						} else {
							execOnMain('counterButtons', [num, 'P', 2, 'coins']);
						}
						inArr = false;
					}
					if (high5 === true) {
						for (var num2 = 0; num2 < minigamePlayers.length; num2++) {
							execOnMain('counterButtons', [minigamePlayers[num2], 'P', 2, 'coins']);
						}
					}
					break;
			}
			shortcutNotif(minigamePlayersResult.join(' & ') + ' won a minigame.');
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
* Starts a coin minigame.
* 
* @param {number/string} player The player coins should be added to - if 'done', it ends the minigame instead
* @param {number} amount The amount of coins that should be added
* @param {string} action If it should be added or subtracted
*/
function coinMinigame (player, amount, action) {
	if (isNaN(player) === false) {
		if (action === 'M') {
			editValue('coinMinigame' + player, parseInt(getValue('coinMinigame' + player)) - amount);
			if (parseInt(getValue('coinMinigame' + player)) < 0) {
				editValue('coinMinigame' + player, 0);
			}
		} else {
			editValue('coinMinigame' + player, parseInt(getValue('coinMinigame' + player)) + amount);
		}
		return;
	}
	if (player === 'done') {
		for (var num = 1; num < 5; num++) {
			if (parseInt(getValue('coinMinigame' + num)) > 0) {
				execOnMain('counterButtons', [num, 'P', parseInt(getValue('coinMinigame' + num)), 'coins']);
				execOnMain('counterButtons', [num, 'P', 1, 'minigame']);
			}
		}
		shortcutNotif('Coins from coin minigame have been succesfully added.');
		startShortcut();
		return;
	}
}

var battleCurPlayer;
var battleRanks = {};
var battleCoins;
/*
* Starts a battle minigame.
*/
function startBattle () {
	var coinReq = parseInt(getValue('battleCoins'));
	console.log('[MPO Shortcut] Start Battle Minigame - Requirement: ' + coinReq + ' - Coins: ' + getInner('p1CoinsText') + ' - ' + getInner('p2CoinsText') + ' - ' + getInner('p3CoinsText') + ' - ' + getInner('p4CoinsText'));
	battleCoins = 0;
	for (var num = 1; num < 5; num++) {
		if (parseInt(getInner('p' + num + 'CoinsText')) < coinReq) {
			battleCoins = battleCoins + parseInt(getInner('p' + num + 'CoinsText'));
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
	editInner('battleTextCoins', 'Fighting for ' + battleCoins + ' coins.');
	editInner('battleText', 'Select place for Player 1 "' + getCharName(characters[1]) + '".');
	document.getElementById('battleStart').style.display = 'none';
	document.getElementById('battlePlayers').style.display = 'block';
	document.getElementById('battleReset').style.display = '';
	shortcutNotif('Started a Battle Minigame for ' + coinReq + ' coins.');
}

var battleResult = [];
/*
* Calculates the battle result.
* 
* @param {number} What place the said character is.
*/
function calcBattle (place) {
	if (place == 'undo') {
		battleResult = [];
		editInner('battleResult', '');
		battleCurPlayer = 1;
		editInner('battleText', 'Select place for Player 1 "' + getCharName(characters[1]) + '".');
		return;
	}

	switch (battleCurPlayer) {
		case 1:
			battleCurPlayer = 2;
			editInner('battleText', 'Select place for Player 2 "' + getCharName(characters[2]) + '".');
			break;
		case 2:
			battleCurPlayer = 3;
			editInner('battleText', 'Select place for Player 3 "' + getCharName(characters[3]) + '".');
			break;
		case 3:
			battleCurPlayer = 4;
			editInner('battleText', 'Select place for Player 4 "' + getCharName(characters[4]) + '".');
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
		switch (shortcutGame) {
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
				console.log('[MPO Shortcut] End Battle Minigame - First: ' + battleRanks.first + ' - Second: ' + battleRanks.second + ' - Third: ' + battleRanks.third + ' - Fourth: ' + battleRanks.fourth + ' - Coins: ' + getInner('p1CoinsText') + ' - ' + getInner('p2CoinsText') + ' - ' + getInner('p3CoinsText') + ' - ' + getInner('p4CoinsText'));
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
					console.log('[MPO Shortcut] End Battle Minigame - First: ' + battleRanks.first + ' - Second: ' + battleRanks.second + ' - Third: ' + battleRanks.third + ' - Fourth: ' + battleRanks.fourth + ' - Coins: ' + getInner('p1CoinsText') + ' - ' + getInner('p2CoinsText') + ' - ' + getInner('p3CoinsText') + ' - ' + getInner('p4CoinsText'));
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
				console.log('[MPO Shortcut] End Battle Minigame - First: ' + battleRanks.first + ' - Second: ' + battleRanks.second + ' - Third: ' + battleRanks.third + ' - Fourth: ' + battleRanks.fourth + ' - Coins: ' + getInner('p1CoinsText') + ' - ' + getInner('p2CoinsText') + ' - ' + getInner('p3CoinsText') + ' - ' + getInner('p4CoinsText'));
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