var activeSpace;
/*
* Activates spaces.
* 
* @param {string} space Space landed on.
*/
function turnSpace (space) {
	removeSelected(document.getElementById('turnSpaces').children);
	
	space = space.substring(5);

	if (activeSpace != '' && activeSpace != undefined) { //undo space if it's already selected or changed into a different one
		document.getElementById('turnPlayerName').style.color = '';
		switch (activeSpace) {
			case 'Blue':
				if (starPrice != 0) {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
					}
				} else {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'coins']);
					}
				}
				shortcutNotif('Undid the blue space.');
				break;
			case 'Red':
				if (starPrice != 0) {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 10, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
					}
				} else {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
					}
				}
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
				spaceEventState = [];
				shortcutNotif('Undid the friend space.');
				break;
			case 'Duel':
				if (spaceEventState[5]) {
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
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
						case 'equality':
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
					}
					spaceEventState = ['bowser', 'undo'];
				}
				shortcutNotif('Undid the bowser space.');
				break;
			case 'Ally':
				shortcutNotif('Undid Ally space. Allies gotten need to be removed manually.');
				break;
			case 'Lucky':
				if (spaceEventState[1] == 'done') {
					switch (spaceEventState[2]) {
						case 'coins':
							execOnMain('counterButtons', [orderCurPlayer, 'M', spaceEventState[3], 'coins']);
							break;
						case 'coinsrival':
							execOnMain('counterButtons', [orderCurPlayer, 'M', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [spaceEventState[4], 'P', spaceEventState[3], 'coins']);
							break;
						case 'stealally':
							break;
					}
					spaceEventState = ['badluck', 'undo'];
				}
				shortcutNotif('Undid the lucky space.');
				break;
			case 'BadLuck':
			case 'ExtraBadLuck':
				if (spaceEventState[1] == 'done') {
					switch (spaceEventState[2]) {
						case 'coins':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
							break;
						case 'coinsothers':
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
						case 'coinsrandom':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [spaceEventState[4], 'M', spaceEventState[3], 'coins']);
							break;
						case 'stars':
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
						case 'raisestarcost':
							break;
					}
					spaceEventState = ['badluck', 'undo'];
				}
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'redSpace']);
				shortcutNotif('Undid the bad luck space.');
				break;

			case 'VS':
				if (spaceEventState[1] === 'done') {
					execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
					execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
					execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
					execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
					spaceEventState = ['vsspace', 'undo'];
				}
				shortcutNotif('Undid the VS space.');
				break;
		}
	}

	if (activeSpace == space) { //stop function if the exact same space is selected
		document.getElementById('spaceEventImg').src = '';
		editInner('spaceEventsSpan', '');
		activeSpace = '';
		return;
	}
	editInner('spaceEventsSpan', '');
	switch (space) {
		case 'Blue':
			minigameSpaces[orderCurPlayer] = 'blue';
			document.getElementById('turnPlayerName').style.color = '#1859f4';
			break;
		case 'Red':
		case 'Bowser':
		case 'BadLuck':
		case 'ExtraBadLuck':
			minigameSpaces[orderCurPlayer] = 'red';
			document.getElementById('turnPlayerName').style.color = '#f43629';
			break;
		default:
			minigameSpaces[orderCurPlayer] = 'green';
			document.getElementById('turnPlayerName').style.color = '#1dc632';
			break;
	}

	switch (space) {
		case 'Blue':
			if (starPrice != 0) {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 10, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
				}
			} else {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
				}
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' got 3 coins from a blue space.');
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Red':
			if (starPrice != 0) {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
				}
			} else {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'coins']);
				}
			}
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'redSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' lost 3 coins from a red space.');
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Happening':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'happening']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a happening space, coins gotten in it need to be added manually.');
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Friend':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'friendSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a friend space, select a friend to give them 5 coins.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Who should get 5 coins? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [4])">');
			document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;
		case 'Duel':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a duel space, select a rival to fight.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select opponent and reward </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [4])"> <br> <select id="duelReward"> <option value="10coins">10 Coins</option> <option value="20coins">20 Coins</option> <option value="halfcoins">Half your coins</option> <option value="allcoins">All your coins</option> <option value="1star">1 Star</option> <option value="2stars">2 Stars</option> </select> <button style="margin-left: 13px;" onclick="spaceEvent(\'duel\', [\'start\'])">Start Duel</button>');
			document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;
		case 'Bowser':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a bowser space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the Bowser event: </span> <br> <select id="bowserEvent"> <option value="coins">Gimme Coins!</option> <option value="stars">Gimme Stars!</option> <option value="charity">Gimme Charity!</option> <option value="equality">Gimme Equality!</option> </select> <button onclick="spaceEvent(\'bowser\')">Start event!</button>');
			break;
		case 'Ally':
			if (getValue('shortcutAutoEnd') === true) {
				closeAlly = true;
			}
			getAlly();
			break;
		case 'Item':
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Lucky':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a lucky space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the event: </span> <br> <select id="luckyEvent"> <option value="stealally">Steal one ally from a rival.</option> <option value="3coins">Receive 3 coins.</option> <option value="5coins">Receive 5 coins.</option> <option value="5coinsrival">Make a rival lose 5 coins.</option> <option value="10coinsrival">Make a rival lose 10 coins.</option> <option value="items">Receive item(s).</option> </select> <button onclick="spaceEvent(\'lucky\')">Start event!</button>');
			break;
		case 'BadLuck':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'redSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a bad luck space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the event: </span> <br> <select id="badluckEvent"> <option value="5coins">Lose 5 coins.</option> <option value="10coins">Lose 10 coins.</option> <option value="3coinsothers">Give 3 coins to all other players.</option> <option value="5coinsothers">Give 5 coins to all other players.</option> <option value="5coinslast">Give 5 coins to the last-place player.</option> <option value="10coinslast">Give 10 coins to the last-place player.</option> <option value="5coinsrandom">Give 5 coins to a random player.</option> <option value="movestar">The Star moves.</option> <option value="raisestarcost">Raise the coin cost for a Star.</option> </select> <button onclick="spaceEvent(\'badluck\')">Start event!</button>');
			break;
		case 'ExtraBadLuck':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'redSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a extra bad luck space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the event: </span> <br> <select id="badluckEvent"> <option value="1star">Lose one Star.</option> <option value="5coins">Lose 5 coins.</option> <option value="10coins">Lose 10 coins.</option> <option value="20coins">Lose 20 coins.</option> <option value="halfcoins">Lose half your coins.</option> <option value="5coinsothers">Give 5 coins to all other players.</option> <option value="10coinsothers">Give 10 coins to all other players.</option> <option value="10coinslast">Give 10 coins to the last-place player.</option> </select> <button onclick="spaceEvent(\'badluck\')">Start event!</button>');
			break;
		case 'VS':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a VS space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Start VS Minigame for <select id="vsspaceSelect"> <option value="5">5 Coins</option> <option value="7">7 Coins</option> <option value="10" selected>10 Coins</option> <option value="15">15 Coins</option> <option value="20">20 Coins</option> <option value="25">25 Coins</option> <option value="30">30 Coins</option> </select> coins. </span> <br> <button onclick="spaceEvent(\'vsspace\')"> Start! </button>')
			break;
		default:
			document.getElementById('spaceEventImg').src = '';
			editInner('spaceEventsSpan', '');
			return;
	}
	document.getElementById('space' + space).classList.add('selected');
	document.getElementById('spaceEventImg').src = 'img/shortcut/' + shortcutGame + '/' + space.toLowerCase() + 'space.png';
	activeSpace = space;
}

var starCost = '';
var spaceEventState = [];
/*
* Events for space (like duel or bowser).
* 
* @param {string} space What space.
* @param {array} attr Required attributes to calculate stuff.
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
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a friend space and got 5 coins together with ' + getCharName(attr[0]) + '.');
			spaceEventState[1] = attr[0];
			break;

		case 'duel':
			/*
			* spaceEventState for duel:
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
				if (getValue('shortcutAutoEnd') === true) {
					turnEnd();
				}
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
				editInner('spaceEventsSpan', '');
				if (getValue('shortcutAutoEnd') === true) {
					turnEnd();
				}
				return;
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

						execOnMain('counterButtons', [orderCurPlayer, 'S', 0, 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'S', 0, 'coins']);
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
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
							spaceEventState = ['bowser', 'done', getValue('bowserEvent'), parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
						} else {
							spaceEventState = ['bowser', 'done', getValue('bowserEvent'), 10];
						}
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
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
					execOnMain('counterButtons', [1, 'S', coinNum, 'coins']);
					execOnMain('counterButtons', [2, 'S', coinNum, 'coins']);
					execOnMain('counterButtons', [3, 'S', coinNum, 'coins']);
					execOnMain('counterButtons', [4, 'S', coinNum, 'coins']);
					shortcutNotif('Bowser Space "Gimme Equality!" - Set everyones coin count to ' + coinNum + '.');
					break;
			}
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
			}
			editInner('spaceEventsSpan', '');
			break;

		case 'lucky':
			if (attr) {
				var switchVar = attr[0];
			} else {
				var switchVar = getValue('luckyEvent');
			}
			switch (switchVar) {
				case 'stealally':
					getAlly();
					break;
				case '3coins':
					spaceEventState = ['lucky', 'done', 'coins', 3];
					execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got 3 coins.');
					break;
				case '5coins':
					spaceEventState = ['lucky', 'done', 'coins', 5];
					execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got 5 coins.');
					break;
				case '5coinsrival':
					if (attr && isNaN(attr[1]) == false) {
						var random = attr[1];
					} else {
						editInner('spaceEventsSpan', '<span class="settingsText"> Select your rival: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					}

					var coins
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
						coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
					} else {
						coins = 5;
					}
					execOnMain('counterButtons', [orderCurPlayer, 'P', coins, 'coins']);
					execOnMain('counterButtons', [random, 'M', coins, 'coins']);
					spaceEventState = ['lucky', 'done', 'coinsrival', coins, random];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got ' + coins + ' coins from ' + getCharName(random) + '.');
					break;
				case '10coinsrival':
					if (attr && isNaN(attr[1]) == false) {
						var random = attr[1];
					} else {
						editInner('spaceEventsSpan', '<span class="settingsText"> Select your rival: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					}

					var coins
					if (parseInt(getInner('p' + random + 'CoinsText')) < 10) {
						coins = parseInt(getInner('p' + random + 'CoinsText'));
					} else {
						coins = 10;
					}
					execOnMain('counterButtons', [orderCurPlayer, 'P', coins, 'coins']);
					execOnMain('counterButtons', [random, 'M', coins, 'coins']);
					spaceEventState = ['lucky', 'done', 'coinsrival', coins, random];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got ' + coins + ' coins from ' + getCharName(random) + '.');
					break;
				case 'items':
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got Items.');
					break;
			}
			editInner('spaceEventsSpan', '');
			break;

		case 'badluck':
			if (attr) {
				var switchVar = attr[0];
			} else {
				var switchVar = getValue('badluckEvent');
			}
			switch (switchVar) {
				case '5coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
						spaceEventState = ['badluck', 'done', 'coins', parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
					} else {
						spaceEventState = ['badluck', 'done', 'coins', 5];
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 5 coins from ' + getCharName(orderCurPlayer) + '.');
					break;
				case '10coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
						spaceEventState = ['badluck', 'done', 'coins', parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
					} else {
						spaceEventState = ['badluck', 'done', 'coins', 10];
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 10 coins from ' + getCharName(orderCurPlayer) + '.');
					break;
				case '20coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
						spaceEventState = ['badluck', 'done', 'coins', parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
					} else {
						spaceEventState = ['badluck', 'done', 'coins', 20];
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 20 coins from ' + getCharName(orderCurPlayer) + '.');
					break;
				case 'halfcoins':
					var coinNum = Math.floor(parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) / 2);
					execOnMain('counterButtons', [orderCurPlayer, 'M', coinNum, 'coins']);
					spaceEventState = ['badluck', 'done', 'coins', coinNum];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took half the coins (' + coinNum + ') from ' + getCharName(orderCurPlayer) + '.');
					break;
				case '3coinsothers':
				case '5coinsothers':
				case '10coinsothers':
					spaceEventState = ['bowser', 'done', 'coinsothers', getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];
					switch (getValue('badluckEvent')) {
						case '3coinsothers':
							var coinNum = 3;
							break;
						case '5coinsothers':
							var coinNum = 5;
							break;
						case '10coinsothers':
							var coinNum = 10;
							break;
					}

					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < (coinNum * 3)) {
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
						shortcutNotif('Bad Luck Event: Took ' + num2 + ' coins from ' + getCharName(orderCurPlayer) + ' and gave ' + num3 + ' coins to everyone else.');
					} else {
						execOnMain('counterButtons', [1, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [2, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [3, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [4, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'M', (coinNum * 3) + coinNum, 'coins']);
						shortcutNotif('Bad Luck Event: Took ' + coinNum + ' coins from ' + getCharName(orderCurPlayer) + ' and gave ' + coinNum + ' coins to everyone else.');
					}
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					break;
				case '5coinslast':
					if (attr && isNaN(attr[1]) == false) {
						lastPlace = [attr[1]];
					} else {
						lastPlace = getLastPlace();
					}

					if (lastPlace.length > 1 || lastPlace == orderCurPlayer) {
						lastPlace[0] = 0;
						editInner('spaceEventsSpan', '<span class="settingsText"> Select the last player: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					} else {
						var coins
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
							coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							coins = 5;
						}
						execOnMain('counterButtons', [orderCurPlayer, 'M', coins, 'coins']);
						execOnMain('counterButtons', [lastPlace[0], 'P', coins, 'coins']);
						spaceEventState = ['badluck', 'done', 'coinsrandom', coins, lastPlace[0]];
						if (getValue('shortcutAutoEnd') === true) {
							turnEnd();
						}
						shortcutNotif('Bad Luck Event: ' + getCharName(orderCurPlayer) + ' gave ' + coins + ' coins to ' + getCharName(lastPlace[0]) + '.');
					}
					break;
				case '10coinslast':
					if (attr && isNaN(attr[1]) == false) {
						lastPlace = [attr[1]];
					} else {
						lastPlace = getLastPlace();
					}

					if (lastPlace.length > 1 || lastPlace == orderCurPlayer) {
						lastPlace[0] = 0;
						editInner('spaceEventsSpan', '<span class="settingsText"> Select the last player: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					} else {
						var coins
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
							coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							coins = 10;
						}
						execOnMain('counterButtons', [orderCurPlayer, 'M', coins, 'coins']);
						execOnMain('counterButtons', [lastPlace[0], 'P', coins, 'coins']);
						spaceEventState = ['badluck', 'done', 'coinsrandom', coins, lastPlace[0]];
						if (getValue('shortcutAutoEnd') === true) {
							turnEnd();
						}
						shortcutNotif('Bad Luck Event: ' + getCharName(orderCurPlayer) + ' gave ' + coins + ' coins to ' + getCharName(lastPlace[0]) + '.');
					}
					break;
				case '5coinsrandom':
					if (attr && isNaN(attr[1]) == false) {
						var random = attr[1];
					} else {
						editInner('spaceEventsSpan', '<span class="settingsText"> Select the player: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					}

					var coins
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
						coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
					} else {
						coins = 5;
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', coins, 'coins']);
					execOnMain('counterButtons', [random, 'P', coins, 'coins']);
					spaceEventState = ['badluck', 'done', 'coinsrandom', coins, random];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: ' + getCharName(orderCurPlayer) + ' gave ' + coins + ' coins to ' + getCharName(random) + '.');
					break;
				case '1star':
					execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
					spaceEventState = ['badluck', 'done', 'coinsrandom', 'stars', 1];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 1 star from ' + getCharName(orderCurPlayer) + '.');
					break;
				case 'movestar':
					spaceEventState = ['badluck', 'done', 'movestar'];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Moved the star.');
					break;
				case 'raisestarcost':
					starCost = 'double';
					spaceEventState = ['badluck', 'done', 'raisestarcost'];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Raised the star cost to 20 coins.');
					break;
			}
			editInner('spaceEventsSpan', '');
			break;

		case 'vsspace':
			if (attr) {
				battleRanks[attr[0]].push(battleCurPlayer);
				battleCurPlayer++;

				if (battleCurPlayer > 4) {
					var coinNum = spaceEventState[2];

					if (battleRanks.third.length > 0) {
						for (var num = 0; num < battleRanks.third.length; num++) {
							execOnMain('counterButtons', [battleRanks.third[num], 'P', ((10 / battleRanks.third.length) / 100) * coinNum, 'coins']);
						}
						if (battleRanks.second.length > 0) {
							for (var num = 0; num < battleRanks.second.length; num++) {
								execOnMain('counterButtons', [battleRanks.second[num], 'P', ((30 / battleRanks.second.length) / 100) * coinNum, 'coins']);
							}
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((60 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}
						} else {
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((90 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}
						}
					} else {
						if (battleRanks.second.length > 0) {
							for (var num = 0; num < battleRanks.second.length; num++) {
								execOnMain('counterButtons', [battleRanks.second[num], 'P', ((40 / battleRanks.second.length) / 100) * coinNum, 'coins']);
							}
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((60 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}
						} else {
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((100 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}

						}
					}
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}

					shortcutNotif('VS Space finished, leftover coins need to be added manually.');
					console.log('[MPO Shortcut] End VS Space - First: ' + battleRanks.first + ' - Second: ' + battleRanks.second + ' - Third: ' + battleRanks.third + ' - Fourth: ' + battleRanks.fourth + ' - Coins: ' + getInner('p1CoinsText') + ' - ' + getInner('p2CoinsText') + ' - ' + getInner('p3CoinsText') + ' - ' + getInner('p4CoinsText'));
					editInner('spaceEventsSpan', '');
					return;
				} else {
					editInner('vsspaceText', 'Select place for Player ' + battleCurPlayer + ' "' + getCharName(battleCurPlayer) + '":');
				}
			} else {
				var coinNum = parseInt(getValue('vsspaceSelect'));
				console.log('[MPO Shortcut] Start VS Space - Requirement: ' + coinNum + ' - Coins: ' + getInner('p1CoinsText') + ' - ' + getInner('p2CoinsText') + ' - ' + getInner('p3CoinsText') + ' - ' + getInner('p4CoinsText'));

				spaceEventState = ['vsspace', 'done', 0, getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];

				for (var num = 1; num < 5; num++) {
					if (parseInt(getInner('p' + num + 'CoinsText')) < coinNum) {
						spaceEventState[2] = spaceEventState[2] + parseInt(getInner('p' + num + 'CoinsText'));
						execOnMain('counterButtons', [num, 'M', coinNum, 'coins']);
					} else {
						spaceEventState[2] = spaceEventState[2] + coinNum;
						execOnMain('counterButtons', [num, 'M', coinNum, 'coins']);
					}
				}
				editInner('spaceEventsSpan', '<span class="settingsNote"> Reminder: If there are two 1st-places, the next player is 3rd, not 2nd; same applies to all ties. </span> <br> <span class="settingsText"> Fighting for ' + spaceEventState[2] + ' coins. - </span> <span id="vsspaceText" class="settingsText"> Select place for Player 1 "' + getCharName(1) + '": </span> <br> <span> <img src="img/1st.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'first\'])"> <img src="img/2nd.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'second\'])"> <img src="img/3rd.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'third\'])"> <img src="img/4th.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'fourth\'])"> </span>');

				battleCurPlayer = 1;
				battleRanks.first = [];
				battleRanks.second = [];
				battleRanks.third = [];
				battleRanks.fourth = [];
			}
			break;
	}
}