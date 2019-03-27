var backuped = false;

var coinStarVar = 10;
var coinStarTie1 = false;
var coinStarTie2 = false;
var coinStarTie3 = false;
var coinStarTie4 = false;

var curTurn = 1;

var hap = [0, 0, 0, 0];
var mini = [0, 0, 0, 0];
var red = [0, 0, 0, 0];
var run = [0, 0, 0, 0];
var shop = [0, 0, 0, 0];
var item = [0, 0, 0, 0];
var friend = [0, 0, 0, 0];
var hex = [0, 0, 0, 0];
var balloon = [0, 0, 0, 0];
var spin = [0, 0, 0, 0];
var minus = [0, 0, 0, 0];
var dice = [0, 0, 0, 0];
var ally = [0, 0, 0, 0];
var stompy = [0, 0, 0, 0];
var doormat = [0, 0, 0, 0];
var stars = [0, 0, 0, 0];
var coins = [0, 0, 0, 0];

var countersShort = ['stars', 'coins', 'hap', 'mini', 'red', 'run', 'shop', 'item', 'friend', 'hex', 'balloon', 'spin', 'minus', 'dice', 'ally', 'stompy', 'doormat'];
var counters = ['stars', 'coins', 'happening', 'minigame', 'redSpace', 'running', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat'];
var countersUp = [];
for (let num = 0; num < counters.length; num++) {
	countersUp.push(counters[num].charAt(0).toUpperCase() + counters[num].slice(1));
}

/*
* Resets the backup.
*/
function resetBackup () {
	editInner('coinStarText', 10);
	editValue('p1CoinStarTie', false);
	editValue('p2CoinStarTie', false);
	editValue('p3CoinStarTie', false);
	editValue('p4CoinStarTie', false);

	for (let num = 1; num < 5; num++) {
		for (let num2 = 0; num2 < counters.length; num2++) {
			editInner('p' + num + countersUp[num2] + 'Text', 0);
		}
		editInner('p' + num + 'CoinsText', 10);
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

	coinStarVar = getInner('coinStarText');
	coinStarTie1 = getValue('p1CoinStarTie');
	coinStarTie2 = getValue('p2CoinStarTie');
	coinStarTie3 = getValue('p3CoinStarTie');
	coinStarTie4 = getValue('p4CoinStarTie');

	curTurn = parseInt(getInner('curTurnText'));

	var num = 0
	for (let num2 = 0; num2 < 4; num2++) {
		num++
		hap[num2] = getInner('p' + num + 'HappeningText');
		mini[num2] = getInner('p' + num + 'MinigameText');
		red[num2] = getInner('p' + num + 'RedSpaceText');
		run[num2] = getInner('p' + num + 'RunningText');
		shop[num2] = getInner('p' + num + 'ShoppingText');
		item[num2] = getInner('p' + num + 'ItemText');
		friend[num2] = getInner('p' + num + 'FriendSpaceText');
		hex[num2] = getInner('p' + num + 'HexText');
		balloon[num2] = getInner('p' + num + 'BalloonText');
		spin[num2] = getInner('p' + num + 'SpinSpaceText');
		minus[num2] = getInner('p' + num + 'MinusText');
		dice[num2] = getInner('p' + num + 'SpecialDiceText');
		spin[num2] = getInner('p' + num + 'AllyText');
		minus[num2] = getInner('p' + num + 'StompyText');
		dice[num2] = getInner('p' + num + 'DoormatText');
		stars[num2] = getInner('p' + num + 'StarsText');
		coins[num2] = getInner('p' + num + 'CoinsText');
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
	if (backuped == true || forceRestore == true) {
		editInner('coinStarText', coinStarVar);
		editValue('p1CoinStarTie', coinStarTie1);
		editValue('p2CoinStarTie', coinStarTie2);
		editValue('p3CoinStarTie', coinStarTie3);
		editValue('p4CoinStarTie', coinStarTie4);

		var num = 0
		for (let num2 = 0; num2 < 4; num2++) {
			num++
			editInner('p' + num + 'HappeningText', hap[num2]);
			editInner('p' + num + 'MinigameText', mini[num2]);
			editInner('p' + num + 'RedSpaceText', red[num2]);
			editInner('p' + num + 'RunningText', run[num2]);
			editInner('p' + num + 'ShoppingText', shop[num2]);
			editInner('p' + num + 'ItemText', item[num2]);
			editInner('p' + num + 'FriendSpaceText', friend[num2]);
			editInner('p' + num + 'HexText', hex[num2]);
			editInner('p' + num + 'BalloonText', balloon[num2]);
			editInner('p' + num + 'SpinSpaceText', spin[num2]);
			editInner('p' + num + 'MinusText', minus[num2]);
			editInner('p' + num + 'SpecialDiceText', dice[num2]);
			editInner('p' + num + 'AllyText', ally[num2]);
			editInner('p' + num + 'StompyText', stompy[num2]);
			editInner('p' + num + 'DoormatText', doormat[num2]);
			editInner('p' + num + 'StarsText', stars[num2]);
			editInner('p' + num + 'CoinsText', coins[num2]);
		}

		turns('curTurn', curTurn, 'S');
		coinStarTie();
		callHighlight();
	}
}

/*
* Saves all Characters.
*
* @param {boolean} close If the settings should be closed after saving. True = should be closed.
*/
function savePlayers (close) {
	localStorage.setItem('savePlayers', true);

	localStorage.setItem('char1', characters[1]);
	localStorage.setItem('char2', characters[2]);
	localStorage.setItem('char3', characters[3]);
	localStorage.setItem('char4', characters[4]);
	localStorage.setItem('com1', getValue('com1'));
	localStorage.setItem('com2', getValue('com2'));
	localStorage.setItem('com3', getValue('com3'));
	localStorage.setItem('com4', getValue('com4'));

	for (let num = 0; num < counters.length; num++) {
		localStorage.setItem(counters[num], getValue(counters[num] + 'OnOff'));
	}
	localStorage.setItem('slow', getValue('slowOnOff'));
	localStorage.setItem('miniStars', getValue('miniStarsOnOff'));
	localStorage.setItem('bananas', getValue('bananasOnOff'));
	localStorage.setItem('inclBonus', getValue('inclBonusOnOff'));
	localStorage.setItem('coinstar', getValue('coinStarOnOff'));

	localStorage.setItem('curGame', curGame);

	if (close == true && popout != true) {
		showHideDiv(['settings']);
	}
}

/*
* Resets all characters.
*/
function resetPlayers () {
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

	localStorage.setItem('curGame', 'all');

	localStorage.setItem('savePlayers', false);

	localStorage.setItem('char1', 'mario');
	localStorage.setItem('char2', 'luigi');
	localStorage.setItem('char3', 'yoshi');
	localStorage.setItem('char4', 'peach');
	localStorage.setItem('com1', false);
	localStorage.setItem('com2', false);
	localStorage.setItem('com3', false);
	localStorage.setItem('com4', false);

	localStorage.setItem('happening', true);
	localStorage.setItem('minigame', true);
	localStorage.setItem('redSpace', false);
	localStorage.setItem('running', false);
	localStorage.setItem('slow', false);
	localStorage.setItem('shopping', false);
	localStorage.setItem('item', false);
	localStorage.setItem('friendSpace', false);
	localStorage.setItem('hex', false);
	localStorage.setItem('balloon', false);
	localStorage.setItem('spinSpace', false);
	localStorage.setItem('minus', false);
	localStorage.setItem('specialDice', false);
	localStorage.setItem('ally', false);
	localStorage.setItem('stompy', false);
	localStorage.setItem('doormat', false);
	localStorage.setItem('stars', false);
	localStorage.setItem('inclBonus', false);
	localStorage.setItem('miniStars', false);
	localStorage.setItem('bananas', false);
	localStorage.setItem('coins', false);
	localStorage.setItem('coinstar', true);
}

/*
* Saves all counters.
*/
function saveCounters () {
	localStorage.setItem('saveCounters', true);

	localStorage.setItem('coinStarVar', getInner('coinStarText'));
	localStorage.setItem('coinStarTie1', getValue('p1CoinStarTie'));
	localStorage.setItem('coinStarTie2', getValue('p2CoinStarTie'));
	localStorage.setItem('coinStarTie3', getValue('p3CoinStarTie'));
	localStorage.setItem('coinStarTie4', getValue('p4CoinStarTie'));

	localStorage.setItem('curTurn', getInner('curTurnText'));
	localStorage.setItem('maxTurn', getInner('maxTurnText'));

	for (let num2 = 0; num2 < counters.length; num2++) {
		for (let num = 1; num < 5; num++) {
			localStorage.setItem(countersShort[num2] + num, getInner('p' + num + countersUp[num2] + 'Text'));
		}
	}

}

/*
* Resets all counters.
*/
function resetCounters () {
	if (shortcutLoaded === true && popoutActivated === true && popout === false) {
		sendMessage('resetCounters');
	}

	editInner('maxTurnText', 20);

	resetBackup();
	updateStars();

	for (let num = 1; num < 5; num++) {
		for (let num2 = 1; num2 < counters.length; num2++) {
			localStorage.setItem(countersShort[num2] + num, 0);
		}
	}

	localStorage.setItem('coins1', 10);
	localStorage.setItem('coins2', 10);
	localStorage.setItem('coins3', 10);
	localStorage.setItem('coins4', 10);
	
	localStorage.setItem('saveCounters', false);

	localStorage.setItem('coinStarVar', 10);
	localStorage.setItem('coinStarTie1', false);
	localStorage.setItem('coinStarTie2', false);
	localStorage.setItem('coinStarTie3', false);
	localStorage.setItem('coinStarTie4', false);

	localStorage.setItem('curTurn', 1);
	localStorage.setItem('maxTurn', 20);
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
	if (localStorage.getItem('saving') == 'true') {

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
		resetSettings();
	}

	if (localStorage.getItem('savePlayers') == 'true') {
		changeCharacters(1, localStorage.getItem('char1'));
		changeCharacters(2, localStorage.getItem('char2'));
		changeCharacters(3, localStorage.getItem('char3'));
		changeCharacters(4, localStorage.getItem('char4'));

		editValue('com1', stringToBoolean(localStorage.getItem('com1')));
		editValue('com2', stringToBoolean(localStorage.getItem('com2')));
		editValue('com3', stringToBoolean(localStorage.getItem('com3')));
		editValue('com4', stringToBoolean(localStorage.getItem('com4')));

		changeCom(1, true);
		changeCom(2, true);
		changeCom(3, true);
		changeCom(4, true);

		for (let num2 = 0; num2 < counters.length; num2++) {
			editValue(counters[num2] + 'OnOff', stringToBoolean(localStorage.getItem(counters[num2])));
		}
		
		editValue('slowOnOff', stringToBoolean(localStorage.getItem('slow')));
		editValue('inclBonusOnOff', stringToBoolean(localStorage.getItem('inclBonus')));
		editValue('miniStarsOnOff', stringToBoolean(localStorage.getItem('miniStars')));
		editValue('bananasOnOff', stringToBoolean(localStorage.getItem('bananas')));
		editValue('coinStarOnOff', stringToBoolean(localStorage.getItem('coinstar')));

		if (localStorage.getItem('miniStars') == 'true') {
			changeStars('miniStars');
		} else if (localStorage.getItem('bananas') == 'true') {
			changeStars('bananas');
		}

		changeGame(localStorage.getItem('curGame'));
	} else {
		var resetPlayersVar = true;
	}

	if (localStorage.getItem('saveCounters') == 'true') {
		editInner('coinStarText', localStorage.getItem('coinStarVar'));
		editValue('p1CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie1')));
		editValue('p2CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie2')));
		editValue('p3CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie3')));
		editValue('p4CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie4')));
	
		editInner('curTurnText', localStorage.getItem('curTurn'));
		editInner('maxTurnText', localStorage.getItem('maxTurn'));
	
		for (let num2 = 0; num2 < counters.length; num2++) {
			for (let num = 1; num < 5; num++) {
				editInner('p' + num + countersUp[num2] + 'Text', localStorage.getItem(countersShort[num2] + num));
			}
		}

		callHighlight(false, true);
		backup();
	}
	if (localStorage.getItem('datax')) {
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
*/
function resetSettings () {
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
	changeGame('all')
	
	editValue('shortcutAutoEnd', false);

	editValue('greenscreen', false);
	settingsMode();
	changeTheme(1);
	changeCharacters()
	changeTextColor('textColor');
	updateCounterInput()

	callHighlight(false, true);
	resetHighlights();

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