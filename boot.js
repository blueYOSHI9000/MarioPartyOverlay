var charList = {
		mp1: ['mario', 'luigi', 'yoshi', 'peach', 'wario', 'dk'],
		mp2: ['mario', 'luigi', 'yoshi', 'peach', 'wario', 'dk'],
		mp3: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'wario', 'waluigi', 'dk'],
		mp4: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'wario', 'waluigi', 'dk'],
		mp5: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'wario', 'waluigi'],
		mp6: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'toadette', 'wario', 'waluigi', 'koopakid', 'boo'],
		mp7: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'toadette', 'wario', 'waluigi', 'birdo', 'drybones', 'boo'],
		mp8: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'toadette', 'wario', 'waluigi', 'birdo', 'drybones', 'boo', 'blooper', 'hammerbro'],
		mp9: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'wario', 'waluigi', 'birdo', 'koopa', 'shyguy', 'kamek'],
		mp10: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'spike'],
		mpa: ['mario', 'luigi', 'yoshi', 'peach'],
		mpds: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'wario', 'waluigi'],
		mpit: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'wario', 'waluigi', 'boo', 'bowserjr'],
		mpsr: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'diddy'],
		mptt100: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'wario', 'waluigi'],
		smp: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'wario', 'waluigi', 'dk', 'diddy', 'bowser', 'bowserjr', 'pompom', 'goomba', 'koopa', 'drybones', 'monty', 'boo', 'shyguy', 'hammerbro'],
		all: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'diddy', 'birdo', 'bowser', 'bowserjr', 'koopakid', 'pompom', 'goomba', 'koopa', 'drybones', 'monty', 'boo', 'spike', 'blooper', 'shyguy', 'hammerbro', 'kamek']
	}

var counterNameList = {
	mp1: {
		happening: 'Happening',
		minigame: 'Minigame',
		coinStar: 'Coin Star'
	},
	mp2: {
		happening: 'Happening',
		minigame: 'Minigame',
		coinStar: 'Coin Star'
	},
	mp3: {
		happening: 'Happening',
		minigame: 'Minigame',
		coinStar: 'Coin Star'
	},
	mp4: {
		happening: 'Happening',
		minigame: 'Minigame',
		coinStar: 'Coin Star'
	},
	mp5: {
		happening: 'Happening',
		minigame: 'Minigame',
		coinStar: 'Coin Star'
	},
	mp6: {
		happening: 'Event',
		minigame: 'Minigame',
		item: 'Orb'
	},
	mp7: {
		happening: 'Action',
		minigame: 'Minigame',
		redSpace: 'Red',
		running: 'Running',
		shopping: 'Shopping',
		item: 'Orb'
	},
	mp8: {
		happening: 'Green',
		minigame: 'Minigame',
		redSpace: 'Red',
		running: 'Running',
		shopping: 'Shopping',
		item: 'Candy'
	},
	mp9: {
		minigame: 'Minigame',
		running: 'Far',
		slow: 'Slow',
		item: 'Dice Block',
		spinSpace: 'Spin',
		minus: 'Minus',
	},
	mp10: {
		minigame: 'Minigame',
		running: 'Far',
		slow: 'Slow',
		minus: 'Minus',
	},
	mpds: {
		happening: 'Green',
		minigame: 'Minigame',
		running: 'Running',
		item: 'Item',
		friendSpace: 'Friendship',
		hex: 'Hex',
	},
	mpsr: {
		minigame: 'Champion',
		running: 'Sightseer',
		slow: 'Slowpoke',
		item: 'Item',
		unused: 'Anti-Item',
		balloon: 'Balloon',
		almost: 'Almost',
		loner: 'Loner',
		duel: 'Duel',
		wanderer: 'Wanderer',
	},
	mpsr: {
		minigame: 'Minigame',
		running: 'Running',
		slow: 'Easygoing',
		item: 'Item',
		unused: 'Unused',
		balloon: 'Balloon',
		almost: 'So-close',
	},
	smp: {
		happening: 'Eventful',
		minigame: 'Minigame',
		coinStar: 'Rich',
		redSpace: 'Unlucky',
		running: 'Sightseer',
		slow: 'Slowpoke',
		item: 'Item',
		ally: 'Ally',
		stompy: 'Stompy',
		doormat: 'Doormat',
	}
}

var assistVer = 0; //assist version for slots, increased if variables are added/changed etc

var counters = ['stars', 'coins', 'happening', 'minigame', 'redSpace', 'running', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'loner', 'almost', 'duel', 'wanderer', 'ally', 'stompy', 'doormat'];
var countersUp = [];
for (let num = 0; num < counters.length; num++) {
	countersUp.push(counters[num].charAt(0).toUpperCase() + counters[num].slice(1));
}

/*
* Loads various parts of the page.
*/
function loadHTML () {
	//load counters
	for (let num = 1; num < 5; num++) {
		var elem = cElem('div', 'playerContainer');
		elem.classList.add('player');

		var arr = [];

		arr.push('<div class="draggable characterDiv"> <div onclick="coinStarTie(' + num + ', true)"> <img src="img/com.png" class="comImg" id="p' + num + 'ComDisplay" onerror="comImgError()"> <img src="img/mpsrIcons/' + charList.all[num] + '.png" class="characterImg" id="p' + num + 'Img" onerror="changeCharactersBackup(this)"> </div> </div>');
		arr.push('<div style="position: relative;"> <div class="draggable stars starsBonus"> <span class="starsHitbox" onclick="mobileButtons(\'stars\', ' + num + ')"></span> <img class="counterDisplay" src="img/stars.png" id="p' + num + 'StarsDisplay" onerror="changeStarsError(this)"> <span class="counterText" id="p' + num + 'StarsBonusText">0</span> </div> <div class="draggable stars" style="position: static; visibility: hidden;"> <img class="counterDisplay" src="img/stars.png"> <span class="counterText" id="p' + num + 'StarsText">0</span> </div> </div>');

		for (let num2 = 1; num2 < counters.length; num2++) {
			arr.push('<div class="draggable ' + counters[num2] + '" onclick="mobileButtons(\'' + counters[num2] + '\', ' + num + ')"> <img class="counterDisplay" src="img/' + counters[num2] + '.png" id="p' + num + countersUp[num2] + 'Display" onerror="counterImgError(this)"> <span class="counterText" id="p' + num + countersUp[num2] + 'Text"> 0 </span> </div>');
		}
		elem.innerHTML = arr.join(' ');

		editInner('p' + num + 'CoinsText', '10');
	}

	//load character list inside characters tab
	var arr = [];
	for (let num = 1; num < 5; num++) {
		for (let num2 = 0; num2 < charList.all.length; num2++) {
			arr.push('<span class="' + charList.all[num2] + 'Span"> <input type="radio" name="charSelectorInput' + num + '" id="' + charList.all[num2] + num + '" value="' + charList.all[num2] + '" onchange="changeSettings(\'changeCharacters\', [' + num + ', \'' + charList.all[num2] + '\'])"> <label class="charSelectorLabel" for="' + charList.all[num2] + num + '"> <img class="charSelectorLabelImg" src="img/mpsrIcons/' + charList.all[num2] + '.png" onerror="imgError(this)"> </label> <br> </span>');
		}
		editInner('charSelector' + num, arr.join(''));
		arr = [];
	}
	editValue('mario1', true);
	editValue('luigi2', true);
	editValue('yoshi3', true);
	editValue('peach4', true);
}

var defSettings = {
	hideAdvanced: true,
	autoPopout: false,
	enableHighlight: true,
	highlightColor: '#ff0000',
	deactivateUnused: true,
	bonusStarAdd: 'bonusDont',
	noTie: false,
	autoSave: false,
	useHotkeys: true,
	enableInteract: false,
	useSW: true,
	theme: 'default',
	icons: 'mpsrIcons',
	customGameIcons: true,
	layoutType: 'layoutVertical',
	greenscreen: false,
	bgColor: '#0000FF',
	textColor: '#ffffff',
	enableAnimation: true,
	toBonusOnly: false,
	toShowNum: true,
	toListAllCoin: false,
	toP1Name: '',
	toP2Name: '',
	toP3Name: '',
	toP4Name: '',
	toSeperation: ' | ',
	toUseActive: true,
	toCounters: 'Turns, Happening, Minigame, Red Space, Coin Star',
	toOutput: 'Turns, ?, MG, Red, Coin Star',
	shortcutSimpleMode: false,
	shortcutAutoEnd: false,
}

var replaceOnly = ['hideAdvanced', 'autoPopout', 'enableHighlight', 'highlightColor', 'deactivateUnused', 'noTie', 'autoSave', 'useHotkeys', 'enableInteract', 'useSW', 'customGameIcons', 'greenscreen', 'bgColor', 'textColor', 'enableAnimation', 'toBonusOnly', 'toShowNum', 'toListAllCoin', 'toP1Name', 'toP2Name', 'toP3Name', 'toP4Name', 'toSeperation', 'toUseActive', 'toCounters', 'toOutput', 'shortcutSimpleMode', 'shortcutAutoEnd'];
/*
* Loads settings from an object.
*
* @param {object/string} obj (Stringified) Object that incl. all settings.
*/
function loadSettings (obj) {
	if (typeof obj === 'string')
		obj = JSON.parse(obj);

	for (var num = 0; num < replaceOnly.length; num++) {
		editValue(replaceOnly[num], obj[replaceOnly[num]]);
	}
	editValue(obj.bonusStarAdd, true);
	changeTheme(obj.theme);
	editValue(obj.icons, true);
	editValue(obj.layoutType, true);

	hideAdvancedSettings();
	changeLayout();
	changeCharacters();
	updateCounterInput();
	callHighlight(false, true);
	resetHighlights();
}

/*
* Prepares all settings that were saved in local storage when the site gets loaded.
*/
var prepared = false;
var cookiesOn = false;
var popout = false;
function prepareMPO () {
	loadHTML();

	if (getUrl('p') == 1) {
		mpoMain = window.opener;
		popout = true;
		openSettings(true);

		document.querySelector('body').style.overflow = 'hidden';
		getElem('popoutButton').innerText = 'Normal Settings';
		getElem('popoutButton').setAttribute('onclick', 'sendMessage(\'openSettings+true\');window.close();');
		getElem('settingsContent').classList.add('settingsContentPopout');
		getElem('settingsContent').classList.remove('popupContent');
		getElem('settingsContent').classList.remove('settingsPopup');
		getElem('settingsContent').style.width = 'calc(100% - 40px)';
		getElem('settingsContent').style.height = 'calc(100% - 40px)'; //-40px is required as otherwise there would be 40px offscreen which would destroy the whole layout
		getElem('settingsContent').style.minWidth = 'unset';
		getElem('noSettings').style.display = 'none';

		getElem('savefileCookieError').style.display = 'none';

		sendMessage('syncPopout');
		localStorage.getItem('enableHighlight'); //If cookies are blocked, this will break the function immediately
		cookiesOn = true;
		prepared = true;
		return;
	}
	var str = getUrl('ls');
	if (str != false) {
		window.history.replaceState({}, document.title, "/" + location.host + location.pathname);
		parseFile(atob(str));
	}

	localStorage.getItem('settings'); //If cookies are blocked, this will break the function immediately
	cookiesOn = true;
	if (localStorage.getItem('settings') != null) {
		loadSettings(JSON.parse(localStorage.getItem('settings')));
	} else {
		resetSettings(true);
	}
	editValue('slotLoad', true);

	var num2 = parseInt(localStorage.getItem('sMax'));
	if (isNaN(num2) === true) {
		num2 = 0;
	}
	num2++;
	for (var num = 0; num < num2; num++) {
		if (localStorage.getItem('s' + num) === null)
			break;

		var lsSlot = JSON.parse(localStorage.getItem('s' + num));
		lsSlot.almost = [0, 0, 0, 0];
		lsSlot.loner = [0, 0, 0, 0];
		lsSlot.duel = [0, 0, 0, 0];
		lsSlot.wanderer = [0, 0, 0, 0];
		delete lsSlot.specialDice;
		localStorage.setItem('s' + num, JSON.stringify(lsSlot));
		var lsSlot = JSON.parse(localStorage.getItem('c' + num));
		lsSlot.almostOnOff = false;
		lsSlot.lonerOnOff = false;
		lsSlot.duelOnOff = false;
		lsSlot.wandererOnOff = false;
		delete lsSlot.specialDiceOnOff;
		localStorage.setItem('c' + num, JSON.stringify(lsSlot));
	}

	if (localStorage.getItem('sMax') != null) {
		var num2 = parseInt(localStorage.getItem('sMax'));
		if (isNaN(num2) === true) {
			num2 = 0;
		}
		num2++;
		for (var num = 0; num < num2; num++) {
			slots['s' + num] = JSON.parse(localStorage.getItem('s' + num));
			slots['c' + num] = JSON.parse(localStorage.getItem('c' + num));
			if (localStorage.getItem('a' + num) != null) {
				slots['a' + num] = JSON.parse(localStorage.getItem('a' + num));
			} else {
				slots['a' + num] = copyVar(defA);
			}
			if (num === 0) {
				createSlot(num, true, true);
			} else {
				createSlot(num, false, true);
			}
		}
		if (localStorage.getItem('sel') === null) {
			localStorage.setItem('sel', 0);
		}
		loadSlot(parseInt(localStorage.getItem('sel')));

		var arr = JSON.parse(localStorage.getItem('sOrder'));
		if (typeof arr != 'object') {
			arr = [0];
		}
		changeSlotOrder(arr);

		for (var num = 0; num < slots.max + 1; num++) {
			delete slots['c' + num].inclBonusOnOff;
			localStorage.setItem('c' + num, JSON.stringify(slots['c' + num]));
		}
	}

	openSettings(true);
	showHideSettings('player');
	for (var num = 1; num < 5; num++) {
		getElem(characters[num] + num).scrollIntoView(true); // Scrollintoview doesn't work when the element is hidden so we have to show it first and then hide it again
	}
	showHideSettings('generalMPO');
	closeSettings();

	setTimeout(function  () {var sheet = window.document.styleSheets[0];
		sheet.insertRule('#settings {-webkit-transition: visibility .3s, opacity .3s; -moz-transition: visibility .3s, opacity .3s; transition: visibility .3s, opacity .3s;}', sheet.cssRules.length);
	}, 50);
	//rules are added here as otherwise the transition would play each time the site is reloaded - timeout is needed as otherwise the rules already apply

	getElem('savefileCookieError').style.display = 'none';

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
	if (localStorage.getItem('new') != '1') {
		openSettings();
		showHideSettings('tutorial');
		localStorage.setItem('new', '1');
	}

	runSW();
	coinStarTie();
	callDisplayOnOff();

	updateNvGame();
	updateNvChar();
	updateNavbar(1);
	updateNavbar(2);
	updateNavbar(3);
	updateNavbar(4);

	localStorage.setItem('lsVer', 10); //localStorage version, used to check how everything is stored

	prepared = true;
}

/*
* In case prepareMPO() crashes, this will run instead and prepares MPO safely.
*/
function prepareMPOBackup () {
	if (prepared != true) {
		console.warn('[MPO] Could not properly start MPO.');
		if (cookiesOn === false) {
			getElem('cookieError').style.display = 'block';
		} else {
			getElem('siteError').style.display = 'block';
		}
		if (popout != true) {
			callDisplayOnOff();
		}
	}
}