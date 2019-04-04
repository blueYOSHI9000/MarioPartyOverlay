var backuped = false;

var slots = {
	sel: 0,
	s0: {
		curTurn: 1,
		maxTurn: 20,
		coinStar: 10,
		coinStarTie1: false,
		coinStarTie2: false,
		coinStarTie3: false,
		coinStarTie4: false,
		stars: [0, 0, 0, 0],
		coins: [10, 10, 10, 10],
		happening: [0, 0, 0, 0],
		minigame: [0, 0, 0, 0],
		redSpace: [0, 0, 0, 0],
		running: [0, 0, 0, 0],
		shopping: [0, 0, 0, 0],
		item: [0, 0, 0, 0],
		friendSpace: [0, 0, 0, 0],
		hex: [0, 0, 0, 0],
		balloon: [0, 0, 0, 0],
		spinSpace: [0, 0, 0, 0],
		minus: [0, 0, 0, 0],
		specialDice: [0, 0, 0, 0],
		ally: [0, 0, 0, 0],
		stompy: [0, 0, 0, 0],
		doormat: [0, 0, 0, 0],
		//
		curGame: 'all',
		char1: 'mario',
		char2: 'luigi',
		char3: 'yoshi',
		char4: 'peach',
		com1: false,
		com2: false,
		com3: false,
		com4: false,
		starsOnOff: false,
		coinsOnOff: false,
		happeningOnOff: true,
		minigameOnOff: true,
		redSpaceOnOff: false,
		runningOnOff: false,
		shoppingOnOff: false,
		itemOnOff: false,
		friendSpaceOnOff: false,
		hexOnOff: false,
		balloonOnOff: false,
		spinSpaceOnOff: false,
		minusOnOff: false,
		specialDiceOnOff: false,
		allyOnOff: false,
		stompyOnOff: false,
		doormatOnOff: false,
		slowOnOff: false,
		miniStarsOnOff: false,
		bananasOnOff: false,
		inclBonusOnOff: false,
		coinStarOnOff: true
	}
}

var counters = ['stars', 'coins', 'happening', 'minigame', 'redSpace', 'running', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat'];
var countersUp = [];
for (let num = 0; num < counters.length; num++) {
	countersUp.push(counters[num].charAt(0).toUpperCase() + counters[num].slice(1));
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
}

/*
* Backups all counters.
*/
function backup () {
	document.getElementById('reloadButton').disabled = false;
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

	if (getValue('permSave') == true) {
		saveCounters();
	}
}

/*
* Restores all saved counters.
* 
* @param {boolean} forceRestore If the restore should be forced.
*/
function restore (forceRestore) {
	var sel = 's' + slots.sel;
	if (backuped == true || forceRestore == true) {
		editInner('coinStarText', slots[sel][coinStar]);
		editValue('p1CoinStarTie', slots[sel][coinStarTie1]);
		editValue('p2CoinStarTie', slots[sel][coinStarTie2]);
		editValue('p3CoinStarTie', slots[sel][coinStarTie3]);
		editValue('p4CoinStarTie', slots[sel][coinStarTie4]);

		var num = 0;
		for (let num2 = 0; num2 < 4; num2++) {
			num++;
			for (let num3 = 0; num3 < counters.length; num3++) {
				editInner('p' + num + countersUp[num3] + 'Text', slots[sel][counters[num3]][num2]);
			}
		}

		turns('curTurn', slots[sel][curTurn], 'S');
		turns('maxTurn', slots[sel][maxTurn], 'S');
		coinStarTie();
		callHighlight();
	}
}

/*
* 
*/
function loadSlot () {
	var sel = 's' + slots.sel;

	editInner('curTurnText', slots[sel].curTurn);
	editInner('maxTurnText', slots[sel].maxTurn);

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

	changeCharacters(1, slots[sel].char1);
	changeCharacters(2, slots[sel].char2);
	changeCharacters(3, slots[sel].char3);
	changeCharacters(4, slots[sel].char4);

	editValue('com1', slots[sel].com1);
	editValue('com2', slots[sel].com2);
	editValue('com3', slots[sel].com3);
	editValue('com4', slots[sel].com4);

	changeCom(1, true);
	changeCom(2, true);
	changeCom(3, true);
	changeCom(4, true);

	for (let num2 = 0; num2 < counters.length; num2++) {
		editValue(counters[num2] + 'OnOff', slots[sel][counters[num2] + 'OnOff']);
	}
	
	editValue('slowOnOff', slots[sel].slowOnOff);
	editValue('inclBonusOnOff', slots[sel].inclBonusOnOff);
	editValue('miniStarsOnOff', slots[sel].miniStarsOnOff);
	editValue('bananasOnOff', slots[sel].bananasOnOff);
	editValue('coinStarOnOff', slots[sel].coinStarOnOff);

	if (slots[sel].miniStarsOnOff === true) {
		changeStars('miniStars');
	} else if (slots[sel].bananasOnOff === true) {
		changeStars('bananas');
	}

	changeGame(slots[sel].curGame);
	changeGame(slots[sel].curGame);
	callHighlight(false, true);
	backup();
}

/*
* Saves all counters.
*/
function saveCounters () {
	localStorage.setItem('slots', JSON.stringify(slots));
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

	localStorage.removeItem('slots');
}

/*
* Saves all Characters.
*
* @param {boolean} close If the settings should be closed after saving. True = should be closed.
*/
function savePlayers (close) {
	var sel = 's' + slots.sel;

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
	slots[sel].miniStarsOnOff = getValue('miniStarsOnOff');
	slots[sel].bananasOnOff = getValue('bananasOnOff');
	slots[sel].inclBonusOnOff = getValue('inclBonusOnOff');
	slots[sel].coinStarOnOff = getValue('coinStarOnOff');

	slots[sel].curGame = curGame;

	localStorage.setItem('slots', JSON.stringify(slots));
	if (close == true && popout != true) {
		showHideDiv(['settings']);
	}
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
	editValue('friendSpaceOnOff', false);
	editValue('hexOnOff', false);
	editValue('spinSpaceOnOff', false);
	editValue('balloonOnOff', false);
	editValue('minusOnOff', false);
	editValue('specialDiceOnOff', false);
	editValue('allyOnOff', false);
	editValue('stompyOnOff', false);
	editValue('doormatOnOff', false);
	editValue('starsOnOff', false);
	editValue('inclBonusOnOff', false);
	editValue('miniStarsOnOff', false);
	editValue('bananasOnOff', false);
	editValue('coinsOnOff', false);
	editValue('coinStarOnOff', true);

	changeCharacters(1, 'mario');
	changeCharacters(2, 'luigi');
	changeCharacters(3, 'yoshi');
	changeCharacters(4, 'peach');
	for (let num = 1; num < 5; num++) {
		document.getElementById('mario' + num).scrollIntoView(true);
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

	var sel = 's' + slots.sel;
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
	slots[sel].friendSpaceOnOff = false;
	slots[sel].hexOnOff = false;
	slots[sel].balloonOnOff = false;
	slots[sel].spinSpaceOnOff = false;
	slots[sel].minusOnOff = false;
	slots[sel].specialDiceOnOff = false;
	slots[sel].allyOnOff = false;
	slots[sel].stompyOnOff = false;
	slots[sel].doormatOnOff = false;
	slots[sel].starsOnOff = false;
	slots[sel].inclBonusOnOff = false;
	slots[sel].miniStarsOnOff = false;
	slots[sel].bananasOnOff = false;
	slots[sel].coinsOnOff = false;
	slots[sel].coinStarOnOff = true;

	if (noLS != true) {
		localStorage.removeItem('slots');
	}
}

/*
* Saves all settings in local storage.
*
* @param {boolean} close If the settings should be closed after saving. True = should be closed.
*/
function saveSettings (close) {
	if (close == true && popout != true) {
		showHideDiv(['settings']);
		if (shortcutLoaded == true) {
			getAlly('close');
			shortcutSettings(true);
		}
	}
	
	localStorage.setItem('saving', 'true');

	localStorage.setItem('enableInteract', getValue('enableInteract'));
	localStorage.setItem('autoPopout', getValue('autoPopout'));
	localStorage.setItem('curTheme', curTheme);
	localStorage.setItem('iconStyle', document.querySelector('input[name="icons"]:checked').id);
	localStorage.setItem('customGameIcons', getValue('customGameIcons'));
	localStorage.setItem('settingsMode', document.querySelector('input[name="settingsMode"]:checked').id);
	localStorage.setItem('greenscreen', getValue('greenscreen'));
	localStorage.setItem('bgColor', getValue('bgColor'));
	localStorage.setItem('textColor', getValue('textColor'));
	localStorage.setItem('counterHighlight', getValue('enableHighlight'));
	localStorage.setItem('highlightColor', getValue('highlightColor'));
	localStorage.setItem('counterAnimation', getValue('enableAnimation'));
	localStorage.setItem('noTie', getValue('noTie'));
	localStorage.setItem('autoSave', getValue('autoSave'));
	localStorage.setItem('permSave', getValue('permSave'));
	localStorage.setItem('deactivateUnused', getValue('deactivateUnused'));

	localStorage.setItem('toP1Name', getValue('toP1Name'));
	localStorage.setItem('toP2Name', getValue('toP2Name'));
	localStorage.setItem('toP3Name', getValue('toP3Name'));
	localStorage.setItem('toP4Name', getValue('toP4Name'));
	localStorage.setItem('toSeperation', getValue('toSeperation'));
	localStorage.setItem('toUseActive', getValue('toUseActive'));
	localStorage.setItem('toCounters', getValue('toCounters'));
	localStorage.setItem('toOutput', getValue('toOutput'));
	localStorage.setItem('toBonusOnly', getValue('toBonusOnly'));
	localStorage.setItem('toShowNum', getValue('toShowNum'));
	localStorage.setItem('toListAll', getValue('toListAll'));
	localStorage.setItem('toListAllCoin', getValue('toListAllCoin'));

	localStorage.setItem('shortcutAutoEnd', getValue('shortcutAutoEnd'));
}

/*
* Gets variable from URL and returns it.
* 
* @param {string} variable The variable it should get.
*/
function getUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
 	return(false);
}

/*
* Prepares all settings that were saved in local storage when the site gets loaded.
*/
var prepared = false;
var popout = false;
function prepareMPO () {
	if (getUrl('p') == 1) {
		mpoMain = window.opener;
		popout = true;
		showHideDiv(['settings']);

		document.getElementById('popoutButton').innerText = 'Normal Settings';
		document.getElementById('popoutButton').setAttribute('onclick', 'sendMessage(\'openSettings+true\');window.close();');
		document.getElementById('settingsContent').classList.add('settingsContentPopout');
		document.getElementById('settingsContent').classList.remove('popupContent');
		document.getElementById('settingsContent').classList.remove('settingsPopup');
		document.getElementById('settingsContent').style.width = 'calc(100% - 40px)';
		document.getElementById('settingsContent').style.height = 'calc(100% - 40px)'; //-40px is required as otherwise there would be 40px offscreen which would destroy the whole layout
		document.getElementById('noSettings').style.display = 'none';

		sendMessage('syncPopout');
		localStorage.getItem('enableHighlight'); //If cookies are blocked, this will break the function immediately
		prepared = true;
		return;
	}

	localStorage.getItem('enableHighlight'); //If cookies are blocked, this will break the function immediately
	if (localStorage.getItem('saving') === 'true') {

		editValue('enableInteract', stringToBoolean(localStorage.getItem('enableInteract')));
		editValue('autoPopout', stringToBoolean(localStorage.getItem('autoPopout')));
		curTheme = parseInt(localStorage.getItem('curTheme'));
		editValue('greenscreen', stringToBoolean(localStorage.getItem('greenscreen')));
		editValue('bgColor', localStorage.getItem('bgColor'));
		changeTheme(curTheme)

		if (localStorage.getItem('iconStyle') == 'mk8Icons') {
			editValue('mk8Icons', true);
		} else {
			editValue('mpsr', true);
		}
		
		editValue('customGameIcons', localStorage.getItem('customGameIcons'));
		changeCharacters();
		editValue('textColor', localStorage.getItem('textColor'));
		changeTextColor('textColor');

		if (localStorage.getItem('settingsMode') == 'settingsDark') {
			editValue('settingsDark', true);
		} else {
			editValue('settingsLight', true);
		}
		settingsMode();

		editValue('enableHighlight', stringToBoolean(localStorage.getItem('counterHighlight')));
		editValue('highlightColor', localStorage.getItem('highlightColor'));
		editValue('enableAnimation', stringToBoolean(localStorage.getItem('counterAnimation')));

		editValue('noTie', stringToBoolean(localStorage.getItem('noTie')));
		editValue('autoSave', stringToBoolean(localStorage.getItem('autoSave')));
		editValue('permSave', stringToBoolean(localStorage.getItem('permSave')));
		editValue('deactivateUnused', stringToBoolean(localStorage.getItem('deactivateUnused')));

		editValue('toP1Name', localStorage.getItem('toP1Name'));
		editValue('toP2Name', localStorage.getItem('toP2Name'));
		editValue('toP3Name', localStorage.getItem('toP3Name'));
		editValue('toP4Name', localStorage.getItem('toP4Name'));
		editValue('toSeperation', localStorage.getItem('toSeperation'));
		editValue('toUseActive', localStorage.getItem('toUseActive'));
		editValue('toCounters', localStorage.getItem('toCounters'));
		editValue('toOutput', localStorage.getItem('toOutput'));
		editValue('toBonusOnly', stringToBoolean(localStorage.getItem('toBonusOnly')));
		editValue('toShowNum', stringToBoolean(localStorage.getItem('toShowNum')));
		editValue('toListAll', stringToBoolean(localStorage.getItem('toListAll')));
		editValue('toListAllCoin', stringToBoolean(localStorage.getItem('toListAllCoin')));

		editValue('shortcutAutoEnd', localStorage.getItem('shortcutAutoEnd'));

		updateCounterInput();
	} else {
		resetSettings(true);
	}

	if (localStorage.getItem('slots') != null) {
		slots = JSON.parse(localStorage.getItem('slots'));
		loadSlot(slots.sel);
	} else {
		if (curGame === 'smp') {
			editInner('coinStarText', 5);
			slots['s' + slots.sel][coinStar] = 5;
			for (let num = 1; num < 5; num++) {
				editInner('p' + num + 'CoinsText', 5);
				slots['s' + slots.sel][coins][num - 1] = 5;
			}
		}
		resetPlayers(true);
	}
	if (localStorage.getItem('datax') != null) {
		var arrX = localStorage.getItem('datax').split(',');
		var arrY = localStorage.getItem('datay').split(',');
		var elems = document.getElementsByClassName('draggable');
		for (var num = 0; num < elems.length; num++) {
			elems[num].style.transform = 'translate(' + arrX[num] + 'px, ' + arrY[num] + 'px)';
			elems[num].setAttribute('data-x', arrX[num]);
			elems[num].setAttribute('data-y', arrY[num]);
		}
	}

	coinStarTie();
	callDisplayOnOff();
	localStorage.setItem('lsVer', 1); //localStorage version, used to check how everything is stored

	prepared = true;
}

/*
* In case prepareMPO() crashes, this will run instead and prepares MPO safely.
*/
function prepareMPOBackup () {
	if (prepared != true) {
		console.warn('[MPO] Could not properly start MPO.');
		document.getElementById('siteError').style.display = 'block';
		if (popout != true) {
			callDisplayOnOff();
		}
	}
}

/*
* Gets called on the main site when a popout is opened. Sends all the required info to properly sync it.
*/
function syncPopout () {
	if (popout == false && popoutActivated == true) {
		sendMessage('changeTheme+' + curTheme);
		sendMessage('changeGame+' + curGame);
		sendMessage('changeCharacters+' + 1 + '+' + characters[1]);
		sendMessage('changeCharacters+' + 2 + '+' + characters[2]);
		sendMessage('changeCharacters+' + 3 + '+' + characters[3]);
		sendMessage('changeCharacters+' + 4 + '+' + characters[4]);

		sendSettingsMsg('enableInteract', getValue('enableInteract'), true);
		sendSettingsMsg('autoPopout', getValue('autoPopout'), true);
		sendSettingsMsg('mpsrIcons', getValue('mpsrIcons'), true);
		sendSettingsMsg('mk8Icons', getValue('mk8Icons'), true);
		sendSettingsMsg('settingsLight', getValue('settingsLight'), true);
		sendSettingsMsg('settingsDark', getValue('settingsDark'), true);
		sendSettingsMsg('customGameIcons', getValue('customGameIcons'), true);
		sendSettingsMsg('greenscreen', getValue('greenscreen'), true);
		sendSettingsMsg('bgColor', getValue('bgColor'), true);
		sendSettingsMsg('textColor', getValue('textColor'), true);
		sendSettingsMsg('enableHighlight', getValue('enableHighlight'), true);
		sendSettingsMsg('highlightColor', getValue('highlightColor'), true);
		sendSettingsMsg('enableAnimation', getValue('enableAnimation'), true);
		sendSettingsMsg('noTie', getValue('noTie'), true);
		sendSettingsMsg('autoSave', getValue('autoSave'), true);
		sendSettingsMsg('autoSave', getValue('autoSave'), true);
		sendSettingsMsg('toBonusOnly', getValue('toBonusOnly'), true);
		sendSettingsMsg('toShowNum', getValue('toShowNum'), true);
		sendSettingsMsg('toListAll', getValue('toListAll'), true);
		sendSettingsMsg('toListAllCoin', getValue('toListAllCoin'), true);
		if (getValue('toP1Name') != '') {
			sendSettingsMsg('toP1Name', getValue('toP1Name'), true);
		}
		if (getValue('toP2Name') != '') {
			sendSettingsMsg('toP2Name', getValue('toP2Name'), true);
		}
		if (getValue('toP3Name') != '') {
			sendSettingsMsg('toP3Name', getValue('toP3Name'), true);
		}
		if (getValue('toP4Name') != '') {
			sendSettingsMsg('toP4Name', getValue('toP4Name'), true);
		}
		sendSettingsMsg('toSeperation', getValue('toSeperation'), true);
		sendSettingsMsg('toUseActive', getValue('toUseActive'), true);
		sendSettingsMsg('toCounters', getValue('toCounters'), true);
		sendSettingsMsg('toOutput', getValue('toOutput'), true);
		sendSettingsMsg('com1', getValue('com1'), true);
		sendSettingsMsg('com2', getValue('com2'), true);
		sendSettingsMsg('com3', getValue('com3'), true);
		sendSettingsMsg('com4', getValue('com4'), true);
		sendSettingsMsg('happeningOnOff', getValue('happeningOnOff'), true);
		sendSettingsMsg('minigameOnOff', getValue('minigameOnOff'), true);
		sendSettingsMsg('redSpaceOnOff', getValue('redSpaceOnOff'), true);
		sendSettingsMsg('runningOnOff', getValue('runningOnOff'), true);
		sendSettingsMsg('slowOnOff', getValue('slowOnOff'), true);
		sendSettingsMsg('shoppingOnOff', getValue('shoppingOnOff'), true);
		sendSettingsMsg('itemOnOff', getValue('itemOnOff'), true);
		sendSettingsMsg('friendSpaceOnOff', getValue('friendSpaceOnOff'), true);
		sendSettingsMsg('hexOnOff', getValue('hexOnOff'), true);
		sendSettingsMsg('balloonOnOff', getValue('balloonOnOff'), true);
		sendSettingsMsg('spinSpaceOnOff', getValue('spinSpaceOnOff'), true);
		sendSettingsMsg('minusOnOff', getValue('minusOnOff'), true);
		sendSettingsMsg('specialDiceOnOff', getValue('specialDiceOnOff'), true);
		sendSettingsMsg('allyOnOff', getValue('allyOnOff'), true);
		sendSettingsMsg('stompyOnOff', getValue('stompyOnOff'), true);
		sendSettingsMsg('doormatOnOff', getValue('doormatOnOff'), true);
		sendSettingsMsg('starsOnOff', getValue('starsOnOff'), true);
		sendSettingsMsg('inclBonusOnOff', getValue('inclBonusOnOff'), true);
		sendSettingsMsg('miniStarsOnOff', getValue('miniStarsOnOff'), true);
		sendSettingsMsg('bananasOnOff', getValue('bananasOnOff'), true);
		sendSettingsMsg('coinsOnOff', getValue('coinsOnOff'), true);

		sendSettingsMsg('shortcutAutoEnd', getValue('shortcutAutoEnd'), true);

		sendMessage('changeCom+' + 1);
		sendMessage('changeCom+' + 2);
		sendMessage('changeCom+' + 3);
		sendMessage('changeCom+' + 4);
		sendMessage('updateCounterInput');
		sendMessage('settingsMode');

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

/*
* Converts a string into a boolean.
*
* @param {string} boolean The string that should get coverted.
*/
function stringToBoolean (boolean) {
	if (boolean == 'true') {
		return true;
	} else if (boolean == 'false') {
		return false;
	} else {
		return boolean;
	}
}

/*
* Resets settings.
* 
* @param {boolean} noLS If true, localStorage won't get reset
*/
function resetSettings (noLS) {
	editValue('enableInteract', false);
	editValue('autoPopout', false);
	editValue('mpsrIcons', true);
	editValue('settingsLight', true);
	editValue('customGameIcons', true);
	editValue('greenscreen', false);
	editValue('bgColor', '#0000FF');
	editValue('textColor', '#ffffff');
	editValue('enableHighlight', true);
	editValue('highlightColor', '#ff0000');
	editValue('enableAnimation', true);
	editValue('noTie', false);
	editValue('autoSave', false);
	editValue('deactivateUnused', true);
	if (prepared != true) {} else {
		editValue('permSave', true);
	}

	editValue('toP1Name', '');
	editValue('toP2Name', '');
	editValue('toP3Name', '');
	editValue('toP4Name', '');
	editValue('toSeperation', ' | ');
	editValue('toUseActive', true);
	editValue('toCounters', 'Turns, Happening, Minigame, Red Space, Coin Star');
	editValue('toOutput', 'Turns, ?, MG, Red, Coin Star');
	editValue('toBonusOnly', false);
	editValue('toShowNum', true);
	editValue('toListAll', false);
	editValue('toListAllCoin', false);
	
	editValue('shortcutAutoEnd', false);

	editValue('greenscreen', false);
	settingsMode();
	changeTheme(1);
	changeCharacters()
	changeTextColor('textColor');
	updateCounterInput()

	callHighlight(false, true);
	resetHighlights();

	if (noLS != true) {
		localStorage.setItem('saving', 'false');

		localStorage.setItem('enableInteract', getValue('enableInteract'));
		localStorage.setItem('autoPopout', getValue('autoPopout'));
		localStorage.setItem('curTheme', curTheme);
		localStorage.setItem('iconStyle', document.querySelector('input[name="icons"]:checked'));
		localStorage.setItem('customGameIcons', getValue('customGameIcons'));
		localStorage.setItem('settingsMode', document.querySelector('input[name="settingsMode"]:checked'));
		localStorage.setItem('greenscreen', getValue('greenscreen'));
		localStorage.setItem('bgColor', getValue('bgColor'));
		localStorage.setItem('textColor', getValue('textColor'));
		localStorage.setItem('counterHighlight', getValue('enableHighlight'));
		localStorage.setItem('highlightColor', getValue('highlightColor'));
		localStorage.setItem('noTie', getValue('noTie'));
		localStorage.setItem('autoSave', getValue('autoSave'));
		localStorage.setItem('permSave', getValue('permSave'));
		localStorage.setItem('deactivateUnused', getValue('deactivateUnused'));

		localStorage.setItem('toP1Name', getValue('toP1Name'));
		localStorage.setItem('toP2Name', getValue('toP2Name'));
		localStorage.setItem('toP3Name', getValue('toP3Name'));
		localStorage.setItem('toP4Name', getValue('toP4Name'));
		localStorage.setItem('toSeperation', getValue('toSeperation'));
		localStorage.setItem('toCounters', getValue('toCounters'));
		localStorage.setItem('toOutput', getValue('toOutput'));
		localStorage.setItem('toBonusOnly', getValue('toBonusOnly'));
		localStorage.setItem('toShowNum', getValue('toShowNum'));
		localStorage.setItem('toListAll', getValue('toListAll'));
		localStorage.setItem('toListAllCoin', getValue('toListAllCoin'));

		localStorage.setItem('shortcutAutoEnd', getValue('shortcutAutoEnd'));
	}
}