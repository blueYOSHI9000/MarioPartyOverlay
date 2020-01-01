var backuped = false;

/*
* Saves assist
*/
function saveAssist () {
	var sel = 'a' + slots.sel;
	if (shortcutLoaded === false) {
		return;
	} else if (slots[sel].assistOn != true) {
		slots[sel] = copyVar(defA);
	} else {
		slots[sel].assistOn = true;
		slots[sel].assistVer = assistVer;

		slots[sel].shortcutState = shortcutState;
		slots[sel].setup = setup;
		slots[sel].turnCurPlayer = turnCurPlayer;
		slots[sel].orderCurPlayer = orderCurPlayer;
		slots[sel].shortcutGame = shortcutGame;
		slots[sel].minigameSpaces = minigameSpaces;
		slots[sel].finalFiveEvent = finalFiveEvent;
		slots[sel].playerOrder = playerOrder;
		slots[sel].statusEffects = statusEffects;
		slots[sel].allies = allies;
		slots[sel].bobombAlly = bobombAlly;
		slots[sel].diceUsed = diceUsed;
		slots[sel].starCost = starCost;
		slots[sel].starPrice = starPrice;
	}

	if (cookiesOn === false)
		return;
	localStorage.setItem(sel, JSON.stringify(slots[sel]));
}

/*
* Backups all counters.
*/
function backup () {
	getElem('nvSettingsReload').classList.remove('nvReloadDisabled');
	backuped = true;
	var sel = 's' + slots.sel;

	slots[sel].coinStar = getInner('coinStarText');
	slots[sel].coinStarTie1 = getValue('p1CoinStarTie');
	slots[sel].coinStarTie2 = getValue('p2CoinStarTie');
	slots[sel].coinStarTie3 = getValue('p3CoinStarTie');
	slots[sel].coinStarTie4 = getValue('p4CoinStarTie');

	slots[sel].curTurn = getInner('curTurnText');
	slots[sel].maxTurn = getInner('maxTurnText');

	var num = 0;
	for (let num2 = 0; num2 < 4; num2++) {
		num++;
		for (let num3 = 0; num3 < counters.length; num3++) {
			slots[sel][counters[num3]][num2] = getInner('p' + num + countersUp[num3] + 'Text');
		}
	}

	saveReloadAnimation('save');

	if (popout != true && popoutActivated === true) {
		sendMessage('updateS+' + JSON.stringify(slots[sel]));
	}

	createSlot(slots.sel, true);

	if (cookiesOn === false)
		return;
	localStorage.setItem(sel, JSON.stringify(slots[sel]));
}

/*
* Restores all saved counters.
*
* @param {boolean} forceRestore If the restore should be forced.
*/
function restore (forceRestore) {
	var sel = 's' + slots.sel;
	if (backuped == true || forceRestore == true) {
		editInner('coinStarText', slots[sel].coinStar);
		editValue('p1CoinStarTie', slots[sel].coinStarTie1);
		editValue('p2CoinStarTie', slots[sel].coinStarTie2);
		editValue('p3CoinStarTie', slots[sel].coinStarTie3);
		editValue('p4CoinStarTie', slots[sel].coinStarTie4);

		var num = 0;
		for (let num2 = 0; num2 < 4; num2++) {
			num++;
			for (let num3 = 0; num3 < counters.length; num3++) {
				editInner('p' + num + countersUp[num3] + 'Text', slots[sel][counters[num3]][num2]);
			}
		}

		turns('curTurn', slots[sel].curTurn, 'S');
		turns('maxTurn', slots[sel].maxTurn, 'S');
		coinStarTie();
		callHighlight();

		saveReloadAnimation('reload');
	}
}

/*
* Resets the backup.
*/
function resetBackup () {
	if (popout === false && popoutActivated === true) {
		sendMessage('resetBackup');
	}
	if (popout === true && shortcutLoaded != true) {
		return;
	}
	if (curGame === 'smp') {
		editInner('coinStarText', 5);
	} else {
		editInner('coinStarText', 10);
	}
	editValue('p1CoinStarTie', false);
	editValue('p2CoinStarTie', false);
	editValue('p3CoinStarTie', false);
	editValue('p4CoinStarTie', false);

	for (let num = 1; num < 5; num++) {
		for (let num2 = 0; num2 < counters.length; num2++) {
			editInner('p' + num + countersUp[num2] + 'Text', 0);
		}
		if (curGame === 'smp') {
			editInner('p' + num + 'CoinsText', 5);
		} else {
			editInner('p' + num + 'CoinsText', 10);
		}
	}

	turns('curTurn', 1, 'S');
	coinStarTie();
	callHighlight(false, true);

	saveReloadAnimation('reset');
}

/*
* Creates an animation inside the settings icon in the navbar.
*
* @param {string} type What type it should be, can be either 'save', 'reload', 'reset' or 'copy'.
*/
function saveReloadAnimation (type) {
	switch (type) {
		case 'save':
			getElem('nvSettingsImg').classList.add('nvSaveAni');
			getElem('nvSavedText').style.color = '#15d415';
			editInner('nvSavedText', 'Saved!');
			break;
		case 'reload':
			getElem('nvSettingsImg').classList.add('nvReloadAni');
			getElem('nvSavedText').style.color = '#dac40e';
			editInner('nvSavedText', 'Reload!');
			break;
		case 'reset':
			getElem('nvSettingsImg').classList.add('nvResetAni');
			getElem('nvSavedText').style.color = '#f13c3c';
			editInner('nvSavedText', 'Reset!');
			break;
		case 'copy':
			getElem('nvSettingsImg').classList.add('nvCopyAni');
			getElem('nvSavedText').style.color = '#26a6f7';
			editInner('nvSavedText', 'Copied!');
			break;
	}
			getElem('nvSavedText').classList.add('nvSavedTextAni');

	setTimeout(function(){
		getElem('nvSettingsImg').classList.remove('nvSaveAni');
		getElem('nvSettingsImg').classList.remove('nvReloadAni');
		getElem('nvSettingsImg').classList.remove('nvResetAni');
		getElem('nvSettingsImg').classList.remove('nvCopyAni');
			getElem('nvSavedText').classList.remove('nvSavedTextAni');
	}, 600);
}

/*
* Resets all counters.
*/
function resetCounters () {
	if (popoutActivated === false && popout === true) {
		sendMessage('resetCounters');
		return;
	}
	changeGame('all');

	resetBackup();
	updateStars();

	if (cookiesOn === false)
		return;
	localStorage.removeItem('s0');
	localStorage.removeItem('c0');
}

/*
* Saves all Characters.
*/
function savePlayers () {
	var sel = 'c' + slots.sel;

	slots[sel].char1 = characters[1];
	slots[sel].char2 = characters[2];
	slots[sel].char3 = characters[3];
	slots[sel].char4 = characters[4];
	slots[sel].com1 = getValue('com1');
	slots[sel].com2 = getValue('com2');
	slots[sel].com3 = getValue('com3');
	slots[sel].com4 = getValue('com4');

	for (let num = 0; num < counters.length; num++) {
		slots[sel][counters[num] + 'OnOff'] = getValue(counters[num] + 'OnOff');
	}
	slots[sel].slowOnOff = getValue('slowOnOff');
	slots[sel].unusedOnOff = getValue('unusedOnOff');
	slots[sel].miniStarsOnOff = getValue('miniStarsOnOff');
	slots[sel].bananasOnOff = getValue('bananasOnOff');
	slots[sel].coinStarOnOff = getValue('coinStarOnOff');

	slots[sel].curGame = curGame;

	createSlot(slots.sel, true);

	if (cookiesOn === false)
		return;
	localStorage.setItem(sel, JSON.stringify(slots[sel]));
}

/*
* Resets all characters.
*
* @param {boolean} noLS If true localstorage won't get updated
*/
function resetPlayers (noLS) {
	editValue('happeningOnOff', true);
	editValue('minigameOnOff', true);
	editValue('redSpaceOnOff', false);
	editValue('runningOnOff', false);
	editValue('slowOnOff', false);
	editValue('shoppingOnOff', false);
	editValue('itemOnOff', false);
	editValue('unusedOnOff', false);
	editValue('friendSpaceOnOff', false);
	editValue('hexOnOff', false);
	editValue('spinSpaceOnOff', false);
	editValue('balloonOnOff', false);
	editValue('minusOnOff', false);
	editValue('almostOnOff', false);
	editValue('lonerOnOff', false);
	editValue('duelOnOff', false);
	editValue('wandererOnOff', false);
	editValue('allyOnOff', false);
	editValue('stompyOnOff', false);
	editValue('doormatOnOff', false);
	editValue('starsOnOff', false);
	editValue('miniStarsOnOff', false);
	editValue('bananasOnOff', false);
	editValue('coinsOnOff', false);
	editValue('coinStarOnOff', true);

	changeCharacters(1, 'mario');
	changeCharacters(2, 'luigi');
	changeCharacters(3, 'yoshi');
	changeCharacters(4, 'peach');
	for (let num = 1; num < 5; num++) {
		getElem('mario' + num).scrollIntoView(true);
	}

	editValue('com1', false);
	editValue('com2', false);
	editValue('com3', false);
	editValue('com4', false);
	changeCom(1);
	changeCom(2);
	changeCom(3);
	changeCom(4);

	changeGame('all');

	callDisplayOnOff();
	changeStars();

	var sel = 'c' + slots.sel;
	slots[sel].curGame = 'all';
	slots[sel].char1 = 'mario';
	slots[sel].char2 = 'luigi';
	slots[sel].char3 = 'yoshi';
	slots[sel].char4 = 'peach';
	slots[sel].com1 = false;
	slots[sel].com2 = false;
	slots[sel].com3 = false;
	slots[sel].com4 = false;
	slots[sel].happeningOnOff = true;
	slots[sel].minigameOnOff = true;
	slots[sel].redSpaceOnOff = false;
	slots[sel].runningOnOff = false;
	slots[sel].slowOnOff = false;
	slots[sel].shoppingOnOff = false;
	slots[sel].itemOnOff = false;
	slots[sel].unusedOnOff = false;
	slots[sel].friendSpaceOnOff = false;
	slots[sel].hexOnOff = false;
	slots[sel].balloonOnOff = false;
	slots[sel].spinSpaceOnOff = false;
	slots[sel].minusOnOff = false;
	slots[sel].almostOnOff = false;
	slots[sel].lonerOnOff = false;
	slots[sel].duelOnOff = false;
	slots[sel].wandererOnOff = false;
	slots[sel].allyOnOff = false;
	slots[sel].stompyOnOff = false;
	slots[sel].doormatOnOff = false;
	slots[sel].starsOnOff = false;
	slots[sel].miniStarsOnOff = false;
	slots[sel].bananasOnOff = false;
	slots[sel].coinsOnOff = false;
	slots[sel].coinStarOnOff = true;

	if (noLS != true && cookiesOn === true) {
		localStorage.removeItem('s0');
		localStorage.removeItem('c0');
	}
}

/*
* Saves all settings in local storage.
*
* @param {boolean} ret Returns a object with all settings instead of saving it.
*/
function saveSettings (ret) {
	var settings = copyVar(defSettings);

	for (var num = 0; num < replaceOnly.length; num++) {
		settings[replaceOnly[num]] = getValue(replaceOnly[num]);
	}

	settings.bonusStarAdd = document.querySelector('input[name="bonusStarAdd"]:checked').id;
	settings.theme = curTheme;
	settings.icons = document.querySelector('input[name="icons"]:checked').id;
	settings.layoutType = document.querySelector('input[name="layoutType"]:checked').id;

	if (ret === true)
		return settings;


	if (cookiesOn === false)
		return;
	localStorage.setItem('settings', JSON.stringify(settings));
}

/*
* Resets settings.
*
* @param {boolean} noLS If true, localStorage won't get reset
*/
function resetSettings (noLS) {
	loadSettings(defSettings);

	if (noLS != true && cookiesOn === true) {
		localStorage.removeItem('settings');
	}
}

/*
* Gets called on the main site when a popout is opened. Sends all the required info to properly sync it.
*/
function syncPopout () {
	if (popout == false && popoutActivated == true) {
		sendMessage('setSlots+' + JSON.stringify(slots));

		sendMessage('changeTheme+' + curTheme);
		sendMessage('changeGame+' + curGame);
		sendMessage('changeCharacters+' + 1 + '+' + characters[1]);
		sendMessage('changeCharacters+' + 2 + '+' + characters[2]);
		sendMessage('changeCharacters+' + 3 + '+' + characters[3]);
		sendMessage('changeCharacters+' + 4 + '+' + characters[4]);

		sendMessage('loadSettings+' + saveSettings(true));

		sendMessage('changeCom+' + 1);
		sendMessage('changeCom+' + 2);
		sendMessage('changeCom+' + 3);
		sendMessage('changeCom+' + 4);
		sendMessage('updateCounterInput');

		sendMessage('showHideSettings+' + openedSettings);

		console.log('[MPO] Popout synced');
	}
}

var statSynced = false;
/*
* Syncs all stats with popout.
*/
function statSync () {
	for (var num = 0; num < countersUp.length; num++) {
		for (var num2 = 1; num2 < 5; num2++) {
			sendMessage('counterButtons+' + num2 + '+S+' + getInner('p' + num2 + countersUp[num] + 'Text') + '+' + countersUp[num]);
		}
	}
	sendMessage('counterButtons+1+S+' + getInner('curTurnText') + '+curTurn');
	sendMessage('counterButtons+1+S+' + getInner('maxTurnText') + '+maxTurn');
	statSynced = true;
}