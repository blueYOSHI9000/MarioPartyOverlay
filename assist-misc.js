/*
* Edits the "notification" bar at the top.
* 
* @param {string} text Text it should be changed to.
* @param {boolean} error If true it prints it as a error.
*/
function shortcutNotif (text, error) {
	console.log('[MPO Shortcut] ' + text);
	editInner('shortcutNotif', text);
	if (error) {
		document.getElementById('shortcutNotif').classList.add('errorAni');
		setTimeout(removeError, 500);
	} else {
		document.getElementById('shortcutNotif').style.color = '';
	}
}

/*
* Removes the notification error class so it can be repeated.
*/
function removeError () {
	document.getElementById('shortcutNotif').classList.remove('errorAni');
}

/*
* Skips to the next shortcut screen.
*/
function shortcutSkip () {
	switch (shortcutState) {
		case 0:
		case 1:
		case 4:
			return;
		case 2:
			turnEnd();
			break;
		case 3:
			startShortcut();
			break;
	}
}

/*
* Goes to the last shortcut screen.
*/
function shortcutBack () {
	switch (shortcutState) {
		case 0:
			return;
		case 1:
			shortcutState = 0;
			editInner('shortcutSpan', defaultText);
			document.getElementById('skipButton').disabled = 'true';
			document.getElementById('backButton').disabled = 'true';
			break;
		case 2:
			if (turnCurPlayer === 1) {
				if ((getInner('curTurnText') == parseInt(getInner('maxTurnText')) - 4 && shortcutGame != 'smp') || (getInner('curTurnText') == parseInt(getInner('maxTurnText')) - 2 && shortcutGame === 'smp')) { //if final 5
					execOnMain('turns', ['curTurn', 1, 'M']);
					shortcutState = 3;
					document.getElementById('shortcutTurn').style.display = 'none';
					startShortcut();
					return;
				}
				if (getInner('curTurnText') == 1) {
					playerOrder = undefined;
					shortcutState = 0;
					document.getElementById('skipButton').disabled = 'true';
				} else {
					execOnMain('turns', ['curTurn', 1, 'M']);
					shortcutState = 2;
				}
				startShortcut();
			} else {
				turnCurPlayer = turnCurPlayer - 2;
				turnEnd();
			}
			break;
		case 3:
			turnCurPlayer = 3;
			shortcutState = 1;
			turnEnd();
			startShortcut();
			turnCurPlayer = 4;
			orderCurPlayer = playerOrder[turnCurPlayer];
			break;
		case 4:
			execOnMain('turns', ['curTurn', 1, 'M']);
			shortcutState = 2;
			document.getElementById('skipButton').disabled = '';
			startShortcut();
			break;
	}
}

/*
* Opens shortcut settings and updates all variables in it.
* 
* @param {boolean} close If it should be closed or not.
*/
function shortcutSettings (close) {
	if (close === true) {
		document.getElementById('settingsMain').style = '';
		document.getElementById('shortcutSettings').style = '';
		document.getElementById('settingsMain').onclick = '';
		document.getElementById('shortcutSettingsPopup').style.display = 'none';
		return;
	}
	if (shortcutState === 1 || playerOrder.length != 5) {
		editInner('shortcutOrder', '<span class="settingsText"> Player order is not decided yet. </span>');
	} else {
		var iconStyle = document.querySelector('input[name="icons"]:checked').value;
		editInner('shortcutOrder', '<img src="img/1st.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[1]] + '.png"> <img src="img/2nd.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[2]] + '.png"> <img src="img/3rd.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[3]] + '.png"> <img src="img/4th.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[4]] + '.png">');
	}
	var selVar = false;
	var elems = document.getElementById('finalFiveSelect').children;
	for (var num = 1; num < elems.length; num++) {
		if (finalFiveEvent == elems[num].value) {
			elems[num].selected = true;
			selVar = true;
		}
	}
	if (selVar != true) {
		elems[0].selected = true;
	}
	if (starCost === 'double') {
		document.getElementById('starCostSelect').children[1].selected = true;
	} else {
		document.getElementById('starCostSelect').children[0].selected = true;
	}
	editInner('shortcutCurGame', 'Current assist game: ' + shortcutGame.toUpperCase());

	editInner('shortcutDebug', '<span> shortcutState: ' + shortcutState + '<br> spaceEventState: ' + spaceEventState.join(', ') + '<br> itemEventState: ' + itemEventState.join(', ') + '<br> diceCursor: ' + diceCursor + ' - diceRolls: ' + diceRolls.join(', ') + '<br> <br> statusEffects: <br> - P1: ' + statusEffects['p1'].join(', ') + '<br> - P2: ' + statusEffects['p2'].join(', ') + '<br> - P3: ' + statusEffects['p3'].join(', ') + '<br> - P4: ' + statusEffects['p4'].join(', ') + '<br> <br> allies: <br> - P1: ' + allies['p1'].join(', ') + '<br> - P2: ' + allies['p2'].join(', ') + '<br> - P3: ' + allies['p3'].join(', ') + '<br> - P4: ' + allies['p4'].join(', ') + '<br> bobombAlly: ' + bobombAlly.join(', ') + '</span>');

	document.getElementById('settingsMain').style = '-webkit-filter: blur(5px); filter: blur(5px);';
	document.getElementById('shortcutSettings').style = 'pointer-events: none;'; //filter and pointer event need to be different as blur wouldn't be smooth with 'shortcutSettings' and pointer-event would remove onClick
	document.getElementById('shortcutSettingsPopup').style.display = 'initial';
	setTimeout(function () {document.getElementById('settingsMain').setAttribute('onclick','shortcutSettings(true)');}, 10); //required because chrome would immediately execute the function if it was changed directly
}

/*
* Resets the current Shortcut game.
*/
function resetShortcut () {
	shortcutState = 3;
	var turn = getInner('curTurnText');
	counterButtons(1, 'S', parseInt(getInner('maxTurnText')), 'curTurn');
	startShortcut();
	counterButtons(1, 'S', turn, 'curTurn');
	shortcutSettings(true);
}

/*
* Loads the previously saved shortcut game.
*/
function loadShortcut () {
	var slots2 = JSON.parse(localStorage.getItem('a' + slots.sel));
	if (slots2.assistOn === true) {
		slots['a' + slots.sel] = slots2;
		loadAssistSlot();
		shortcutNotif('Loaded previously saved assist state.');
	} else {
		shortcutNotif('There was no previous assist save.', true);
	}
	shortcutSettings(true);
}

/*
* Loads Assist slot.
*/
function loadAssistSlot () {
	var sel = 'a' + slots.sel;
	if (slots[sel].assistOn != true) {
		editInner('shortcutSpan', defaultText);
		return;
	}
	shortcutState = slots[sel].shortcutState;
	setup = slots[sel].setup;
	turnCurPlayer = slots[sel].turnCurPlayer;
	orderCurPlayer = slots[sel].orderCurPlayer;
	shortcutGame = slots[sel].shortcutGame;
	minigameSpaces = slots[sel].minigameSpaces;
	finalFiveEvent = slots[sel].finalFiveEvent;
	playerOrder = slots[sel].playerOrder;
	statusEffects = slots[sel].statusEffects;
	allies = slots[sel].allies;
	bobombAlly = slots[sel].bobombAlly;
	diceUsed = slots[sel].diceUsed;
	starCost = slots[sel].starCost;
	starPrice = slots[sel].starPrice;

	document.getElementById('skipButton').disabled = '';
	document.getElementById('backButton').disabled = '';

	prepareTurn();

	switch (shortcutState) {
		case 0:
			editInner('shortcutSpan', defaultText);
			document.getElementById('skipButton').disabled = 'true';
			document.getElementById('backButton').disabled = 'true';
			return;
		case 1:
			shortcutState = 0;
			var curGameBackup = curGame;
			curGame = shortcutGame;
			startShortcut();
			curGame = curGameBackup;
			break;
		case 2:
			shortcutState = 1;
			var turnCurPlayerBackup = turnCurPlayer;
			var orderCurPlayerBackup = orderCurPlayer;
			startShortcut();

			turnCurPlayer = turnCurPlayerBackup;
			orderCurPlayer = orderCurPlayerBackup;
			if (turnCurPlayer != 1) {
				//turnEnd();
			}
			break;
		case 3:
			shortcutState = 2;
			startShortcut();
			break;
		case 4:
			startFinalFive();
			break;
	}
}

/*
* Gets the last place player.
*/
function getLastPlace () {
	var stars = [];
	for (var num = 1; num < 5; num++) {
		stars.push(parseInt(getInner('p' + num + 'StarsText')));
	}
	var last = Array.min(stars);
	var arr = [];
	for (var num = 1; num < 5; num++) {
		if (last === stars[num - 1]) {
			arr.push(num);
		}
	}
	console.log(arr.join('+'))

	if (arr.length > 1) {
		stars = [];
		for (var num = 0; num < arr.length; num++) {
			stars.push(parseInt(getInner('p' + arr[num] + 'CoinsText')));
		}
		last = Array.min(stars);
		var arr2 = [];
		for (var num = 1; num < 5; num++) {
			if (last === stars[num - 1]) {
				arr2.push(arr[num - 1]);
			}
		}
		arr = arr2;
	}
	console.log(arr)
	console.log(arr2)
	return arr;
}

/*
* Required to calculate last place, there was just no better way.
*/
Array.min = function (array) {
	return Math.min.apply(Math, array);
}

/*
* Removes the first specified array item.
* 
* @param {array} arr The array that should be changed.
* @param {string/number/boolean} item The item that should be removed.
*/
function removeArrayItem (arr, item) {
	for (var num = 0; num < arr.length; num++) {
		if (arr[num] == item) {
			arr.splice(num, 1);
			break;
		}
	}
	return arr;
}

/*
* Removes the selected class from elements.
* 
* @param {array} elems Elements that shouldn't have a selected class.
*/
function removeSelected (elems) {
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
}