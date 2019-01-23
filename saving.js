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
var orb = [0, 0, 0, 0];
var candy = [0, 0, 0, 0];
var item = [0, 0, 0, 0];
var friend = [0, 0, 0, 0];
var hex = [0, 0, 0, 0];
var spin = [0, 0, 0, 0];
var minus = [0, 0, 0, 0];
var dice = [0, 0, 0, 0];
var ally = [0, 0, 0, 0];
var stompy = [0, 0, 0, 0];
var doormat = [0, 0, 0, 0];
var balloon = [0, 0, 0, 0];
var stars = [0, 0, 0, 0];
var coins = [0, 0, 0, 0];

var countersShort = ['stars', 'coins', 'hap', 'mini', 'red', 'run', 'shop', 'orb', 'candy', 'item', 'friend', 'hex', 'spin', 'minus', 'dice', 'ally', 'stompy', 'doormat', 'balloon'];
var counters = ['stars', 'coins', 'happening', 'minigame', 'redSpace', 'running', 'shopping', 'orb', 'candy', 'item', 'friendSpace', 'hex', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'balloon'];
var countersUp = [];
for (let num = 0; num < 19; num++) {
	countersUp.push(counters[num].charAt(0).toUpperCase() + counters[num].slice(1));
}

/*
* Resets the backup.
*/
function resetBackup () {
	document.getElementById('coinStarText').innerHTML = 10;
	editValue('p1CoinStarTie', false);
	editValue('p2CoinStarTie', false);
	editValue('p3CoinStarTie', false);
	editValue('p4CoinStarTie', false);

	for (let num = 1; num < 5; num++) {
		for (let num2 = 0; num2 < 14; num2++) {
			document.getElementById('p' + num + countersUp[num2] + 'Text').innerHTML = 0;
		}
	}

	turns('curTurn', 1, 'Set');
	coinStarTie();
	callHighlight(false, true);
}

/*
* Backups all counters.
*/
function backup () {
	document.getElementById('reloadButton').disabled = false;
	backuped = true;

	coinStarVar = document.getElementById('coinStarText').innerHTML;
	coinStarTie1 = getValue('p1CoinStarTie');
	coinStarTie2 = getValue('p2CoinStarTie');
	coinStarTie3 = getValue('p3CoinStarTie');
	coinStarTie4 = getValue('p4CoinStarTie');

	curTurn = parseInt(document.getElementById('curTurnText').innerHTML);

	var num = 0;
	for (let num2 = 0; num2 < 4; num2++) {
		num++;
		hap[num2] = document.getElementById('p' + num + 'HappeningText').innerHTML;
		mini[num2] = document.getElementById('p' + num + 'MinigameText').innerHTML;
		red[num2] = document.getElementById('p' + num + 'RedSpaceText').innerHTML;
		run[num2] = document.getElementById('p' + num + 'RunningText').innerHTML;
		shop[num2] = document.getElementById('p' + num + 'ShoppingText').innerHTML;
		orb[num2] = document.getElementById('p' + num + 'OrbText').innerHTML;
		candy[num2] = document.getElementById('p' + num + 'CandyText').innerHTML;
		item[num2] = document.getElementById('p' + num + 'ItemText').innerHTML;
		friend[num2] = document.getElementById('p' + num + 'FriendSpaceText').innerHTML;
		hex[num2] = document.getElementById('p' + num + 'HexText').innerHTML;
		spin[num2] = document.getElementById('p' + num + 'SpinSpaceText').innerHTML;
		minus[num2] = document.getElementById('p' + num + 'MinusText').innerHTML;
		dice[num2] = document.getElementById('p' + num + 'SpecialDiceText').innerHTML;
		spin[num2] = document.getElementById('p' + num + 'AllyText').innerHTML;
		minus[num2] = document.getElementById('p' + num + 'StompyText').innerHTML;
		dice[num2] = document.getElementById('p' + num + 'DoormatText').innerHTML;
		balloon[num2] = document.getElementById('p' + num + 'BalloonText').innerHTML;
		stars[num2] = document.getElementById('p' + num + 'StarsText').innerHTML;
		coins[num2] = document.getElementById('p' + num + 'CoinsText').innerHTML;
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
		document.getElementById('coinStarText').innerHTML = coinStarVar;
		editValue('p1CoinStarTie', coinStarTie1);
		editValue('p2CoinStarTie', coinStarTie2);
		editValue('p3CoinStarTie', coinStarTie3);
		editValue('p4CoinStarTie', coinStarTie4);

		var num = 0;
		for (let num2 = 0; num2 < 4; num2++) {
			num++;
			document.getElementById('p' + num + 'HappeningText').innerHTML = hap[num2];
			document.getElementById('p' + num + 'MinigameText').innerHTML = mini[num2];
			document.getElementById('p' + num + 'RedSpaceText').innerHTML = red[num2];
			document.getElementById('p' + num + 'RunningText').innerHTML = run[num2];
			document.getElementById('p' + num + 'ShoppingText').innerHTML = shop[num2];
			document.getElementById('p' + num + 'OrbText').innerHTML = orb[num2];
			document.getElementById('p' + num + 'CandyText').innerHTML = candy[num2];
			document.getElementById('p' + num + 'ItemText').innerHTML = item[num2];
			document.getElementById('p' + num + 'FriendSpaceText').innerHTML = friend[num2];
			document.getElementById('p' + num + 'HexText').innerHTML = hex[num2];
			document.getElementById('p' + num + 'SpinSpaceText').innerHTML = spin[num2];
			document.getElementById('p' + num + 'MinusText').innerHTML = minus[num2];
			document.getElementById('p' + num + 'SpecialDiceText').innerHTML = dice[num2];
			document.getElementById('p' + num + 'AllyText').innerHTML = ally[num2];
			document.getElementById('p' + num + 'StompyText').innerHTML = stompy[num2];
			document.getElementById('p' + num + 'DoormatText').innerHTML = doormat[num2];
			document.getElementById('p' + num + 'BalloonText').innerHTML = balloon[num2];
			document.getElementById('p' + num + 'StarsText').innerHTML = stars[num2];
			document.getElementById('p' + num + 'CoinsText').innerHTML = coins[num2];
		}

		turns('curTurn', curTurn, 'Set');
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

	for (let num = 0; num < 19; num++) {
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
	editValue('orbOnOff', false);
	editValue('candyOnOff', false);
	editValue('itemOnOff', false);
	editValue('friendSpaceOnOff', false);
	editValue('hexOnOff', false);
	editValue('spinSpaceOnOff', false);
	editValue('minusOnOff', false);
	editValue('specialDiceOnOff', false);
	editValue('allyOnOff', false);
	editValue('stompyOnOff', false);
	editValue('doormatOnOff', false);
	editValue('balloonOnOff', false);
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
	localStorage.setItem('orb', false)
	localStorage.setItem('candy', false);
	localStorage.setItem('item', false);
	localStorage.setItem('friendSpace', false);
	localStorage.setItem('hex', false)
	localStorage.setItem('spinSpace', false);
	localStorage.setItem('minus', false);
	localStorage.setItem('specialDice', false);
	localStorage.setItem('ally', false);
	localStorage.setItem('stompy', false);
	localStorage.setItem('doormat', false);
	localStorage.setItem('balloon', false);
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

	localStorage.setItem('coinStarVar', document.getElementById('coinStarText').innerHTML);
	localStorage.setItem('coinStarTie1', getValue('p1CoinStarTie'));
	localStorage.setItem('coinStarTie2', getValue('p2CoinStarTie'));
	localStorage.setItem('coinStarTie3', getValue('p3CoinStarTie'));
	localStorage.setItem('coinStarTie4', getValue('p4CoinStarTie'));

	localStorage.setItem('curTurn', document.getElementById('curTurnText').innerHTML);
	localStorage.setItem('maxTurn', document.getElementById('maxTurnText').innerHTML);

	for (let num2 = 0; num2 < 19; num2++) {
			console.log(countersShort[num2] + ', ' + num2)
		for (let num = 1; num < 5; num++) {
			localStorage.setItem(countersShort[num2] + num, document.getElementById('p' + num + countersUp[num2] + 'Text').innerHTML);
		}
	}

}

/*
* Resets all counters.
*/
function resetCounters () {
	document.getElementById('maxTurnText').innerHTML = 20;

	resetBackup();
	updateStars();

	for (let num = 1; num < 5; num++) {
		for (let num2 = 1; num2 < 19; num2++) {
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
	}
	
	localStorage.setItem('saving', 'true');

	localStorage.setItem('enableInteract', getValue('enableInteract'));
	localStorage.setItem('autoPopout', getValue('autoPopout'));
	localStorage.setItem('curTheme', curTheme);
	localStorage.setItem('iconStyle', document.querySelector('input[name="icons"]:checked'));
	localStorage.setItem('customCounterIcons', getValue('customCounterIcons'));
	localStorage.setItem('customCharacterIcons', getValue('customCharacterIcons'));
	localStorage.setItem('greenscreen', getValue('greenscreen'));
	localStorage.setItem('bgColor', getValue('bgColor'));
	localStorage.setItem('textColor', getValue('textColor'));
	localStorage.setItem('counterHighlight', getValue('enableHighlight'));
	localStorage.setItem('highlightColor', getValue('highlightColor'));
	localStorage.setItem('counterAnimation', getValue('enableAnimation'));
	localStorage.setItem('noTie', getValue('noTie'));
	localStorage.setItem('autoSave', getValue('autoSave'));
	localStorage.setItem('permSave', getValue('permSave'));

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

		document.getElementById('popoutButton').style.display = 'none';
		document.getElementById('settingsContent').classList.add('settingsContentPopout');
		document.getElementById('settingsContent').classList.remove('popupContent');
		document.getElementById('settingsContent').classList.remove('settingsPopup');
		document.getElementById('settingsContent').style.width = 'calc(100% - 40px)';
		document.getElementById('settingsContent').style.height = 'calc(100% - 40px)'; //-40px is required as otherwise there would be 40px offscreen which would destroy the whole layout
		document.getElementById('noSettings').style.display = 'none';

		sendMessage('syncPopout')
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
		
		editValue('customCounterIcons', localStorage.getItem('customCounterIcons'));
		editValue('customCharacterIcons', localStorage.getItem('customCharacterIcons'));
		changeCharacters();
		editValue('textColor', localStorage.getItem('textColor'));
		changeTextColor('textColor');

		editValue('enableHighlight', stringToBoolean(localStorage.getItem('counterHighlight')));
		editValue('highlightColor', localStorage.getItem('highlightColor'));
		editValue('enableAnimation', stringToBoolean(localStorage.getItem('counterAnimation')));

		editValue('noTie', stringToBoolean(localStorage.getItem('noTie')));
		editValue('autoSave', stringToBoolean(localStorage.getItem('autoSave')));
		editValue('permSave', stringToBoolean(localStorage.getItem('permSave')));

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

		for (let num2 = 0; num2 < 19; num2++) {
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
		document.getElementById('coinStarText').innerHTML = localStorage.getItem('coinStarVar');
		editValue('p1CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie1')));
		editValue('p2CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie2')));
		editValue('p3CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie3')));
		editValue('p4CoinStarTie', stringToBoolean(localStorage.getItem('coinStarTie4')));
	
		document.getElementById('curTurnText').innerHTML = localStorage.getItem('curTurn');
		document.getElementById('maxTurnText').innerHTML = localStorage.getItem('maxTurn');
	
		for (let num2 = 0; num2 < 19; num2++) {
			for (let num = 1; num < 5; num++) {
				document.getElementById('p' + num + countersUp[num2] + 'Text').innerHTML = localStorage.getItem(countersShort[num2] + num);
			}
		}

		callHighlight(false, true);
		backup();
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
		editValue('permSave', false);
		document.getElementById('permSave').disabled = true;
		document.getElementById('permSaveCounters').disabled = true;
		callDisplayOnOff();
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
		sendSettingsMsg('customCounterIcons', getValue('customCounterIcons'), true);
		sendSettingsMsg('customCharacterIcons', getValue('customCharacterIcons'), true);
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
		sendSettingsMsg('orbOnOff', getValue('orbOnOff'), true);
		sendSettingsMsg('candyOnOff', getValue('candyOnOff'), true);
		sendSettingsMsg('itemOnOff', getValue('itemOnOff'), true);
		sendSettingsMsg('friendSpaceOnOff', getValue('friendSpaceOnOff'), true);
		sendSettingsMsg('hexOnOff', getValue('hexOnOff'), true);
		sendSettingsMsg('spinSpaceOnOff', getValue('spinSpaceOnOff'), true);
		sendSettingsMsg('minusOnOff', getValue('minusOnOff'), true);
		sendSettingsMsg('specialDiceOnOff', getValue('specialDiceOnOff'), true);
		sendSettingsMsg('allyOnOff', getValue('allyOnOff'), true);
		sendSettingsMsg('stompyOnOff', getValue('stompyOnOff'), true);
		sendSettingsMsg('doormatOnOff', getValue('doormatOnOff'), true);
		sendSettingsMsg('balloonOnOff', getValue('balloonOnOff'), true);
		sendSettingsMsg('starsOnOff', getValue('starsOnOff'), true);
		sendSettingsMsg('inclBonusOnOff', getValue('inclBonusOnOff'), true);
		sendSettingsMsg('miniStarsOnOff', getValue('miniStarsOnOff'), true);
		sendSettingsMsg('bananasOnOff', getValue('bananasOnOff'), true);
		sendSettingsMsg('coinsOnOff', getValue('coinsOnOff'), true);

		sendMessage('changeCom+' + 1);
		sendMessage('changeCom+' + 2);
		sendMessage('changeCom+' + 3);
		sendMessage('changeCom+' + 4);
		sendMessage('updateCounterInput');

		console.log('[MPO] Popout synced');
	}
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
	}
}

/*
* Resets settings.
*/
function resetSettings () {
	editValue('enableInteract', false);
	editValue('autoPopout', false);
	editValue('mpsrIcons', true);
	editValue('customCounterIcons', false);
	editValue('customCharacterIcons', false);
	editValue('greenscreen', false);
	editValue('bgColor', '#0000FF');
	editValue('textColor', '#ffffff');
	editValue('enableHighlight', true);
	editValue('highlightColor', '#ff0000');
	editValue('enableAnimation', true);
	editValue('noTie', false);
	editValue('autoSave', false);
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

	editValue('greenscreen', false);
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
	localStorage.setItem('customCounterIcons', getValue('customCounterIcons'));
	localStorage.setItem('customCharacterIcons', getValue('customCharacterIcons'));
	localStorage.setItem('greenscreen', getValue('greenscreen'));
	localStorage.setItem('bgColor', getValue('bgColor'));
	localStorage.setItem('textColor', getValue('textColor'));
	localStorage.setItem('counterHighlight', getValue('enableHighlight'));
	localStorage.setItem('highlightColor', getValue('highlightColor'));
	localStorage.setItem('noTie', getValue('noTie'));
	localStorage.setItem('autoSave', getValue('autoSave'));
	localStorage.setItem('permSave', getValue('permSave'));

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
}