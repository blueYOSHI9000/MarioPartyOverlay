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
		mps: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'wario', 'waluigi', 'dk', 'birdo'],
		smpj: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'pauline', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'birdo', 'bowser', 'bowserjr', 'goomba', 'koopa', 'monty', 'boo', 'spike', 'shyguy', 'ninji'],
		all: ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'pauline', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'diddy', 'birdo', 'bowser', 'bowserjr', 'koopakid', 'pompom', 'goomba', 'koopa', 'drybones', 'monty', 'boo', 'spike', 'blooper', 'shyguy', 'ninji', 'hammerbro', 'kamek']
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
		minus: 'Minus'
	},
	mp10: {
		minigame: 'Minigame',
		running: 'Far',
		slow: 'Slow',
		minus: 'Minus'
	},
	mpa: {},
	mpds: {
		happening: 'Green',
		minigame: 'Minigame',
		running: 'Running',
		item: 'Item',
		friendSpace: 'Friendship',
		hex: 'Hex'
	},
	mpit: {},
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
		wanderer: 'Wanderer'
	},
	mptt100: {
		minigame: 'Minigame',
		running: 'Running',
		slow: 'Easygoing',
		item: 'Item',
		unused: 'Unused',
		balloon: 'Balloon',
		almost: 'So-close'
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
		doormat: 'Doormat'
	},
	mps: {
		happening: 'Eventful',
		minigame: 'Minigame',
		coinStar: 'Rich',
		redSpace: 'Unlucky',
		bowserSpace: 'Bowser Space',
		running: 'Sightseer',
		slow: 'Slowpoke',
		shopping: 'Shopping',
		item: 'Item'
	}
}

var assistVer = 0; //assist version for slots, increased if variables are added/changed etc

var counters = ['stars', 'coins', 'happening', 'minigame', 'redSpace', 'bowserSpace', 'running', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'loner', 'almost', 'duel', 'wanderer', 'ally', 'stompy', 'doormat'];
var countersUp = [];
for (let num = 0; num < counters.length; num++) {
	countersUp.push(counters[num].charAt(0).toUpperCase() + counters[num].slice(1));
}

var startup = true; //gets changed to false after MPO fully booted up

/*
* Loads various parts of the page.
*/
function loadHTML () {
	//load counters
	for (let num = 1; num < 5; num++) {
		var elem = cElem('div', 'playerContainer');
		elem.classList.add('player');

		var arr = [];

		arr.push('<div class="draggable characterDiv"> <div onclick="coinStarTie(' + num + ', true)"> <img src="img/com.png" class="comImg" id="p' + num + 'ComDisplay" onerror="comImgError(this)"> <img src="img/mpsrIcons/' + charList.all[num] + '.png" class="characterImg" id="p' + num + 'Img" onerror="changeCharacterIconError(this)"> </div> </div>');
		arr.push('<div style="position: relative;"> <div class="draggable stars starsBonus"> <span class="starsHitbox" onclick="mobileButtons(\'stars\', ' + num + ')"></span> <img class="counterDisplay" src="img/stars.png" id="p' + num + 'StarsDisplay" onerror="changeStarsError(this)"> <span class="counterText counterBelow100" id="p' + num + 'StarsBonusText">0</span> </div> <div class="draggable stars" style="position: static; visibility: hidden;"> <img class="counterDisplay" src="img/stars.png"> <span class="counterText counterBelow100" id="p' + num + 'StarsText">0</span> </div> </div>');

		for (let num2 = 1; num2 < counters.length; num2++) {
			arr.push('<div class="draggable ' + counters[num2] + '" onclick="mobileButtons(\'' + counters[num2] + '\', ' + num + ')"> <img class="counterDisplay" src="img/' + counters[num2] + '.png" id="p' + num + countersUp[num2] + 'Display" onerror="counterImgError(this)"> <span class="counterText counterBelow100" id="p' + num + countersUp[num2] + 'Text">0</span> </div>');
		}
		elem.innerHTML = arr.join(' ');

		editInner('p' + num + 'CoinsText', '10');
	}

	//load character list inside characters tab
	var arr = [];
	for (let num = 1; num < 5; num++) {
		for (let num2 = 0; num2 < charList.all.length; num2++) {
			arr.push('<span class="' + charList.all[num2] + 'Span"> <input type="radio" name="charSelectorInput' + num + '" id="' + charList.all[num2] + num + '" value="' + charList.all[num2] + '" newdesign="false" onchange="callOnBoth(\'changeCharacters\', [' + num + ', \'' + charList.all[num2] + '\'])"> <label class="charSelectorLabel" for="' + charList.all[num2] + num + '"> <img class="charSelectorLabelImg" src="img/mpsrIcons/' + charList.all[num2] + '.png" onerror="imgError(this)"> </label> <br> </span>');
		}
		editInner('charSelector' + num, arr.join(''));
		arr = [];
	}
	editValue('mario1', true);
	editValue('luigi2', true);
	editValue('yoshi3', true);
	editValue('peach4', true);

	//replace checkboxes with better design which uses labels
	var elems = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
	for (let num = 0; num < elems.length; num++) {
		if (elems[num].getAttribute('newdesign') != 'false' && !elems[num].classList.contains('counterOnOffInput')) {
			var elem = document.createElement("span");
			elem.classList.add('inputContainer');

			var arr = [];
			var attr = elems[num].attributes;
			for (let num2 = 0; num2 < attr.length; num2++) {
				switch (attr[num2].name) {
					case 'type':
					case 'name':
					case 'id':
					case 'value':
					case 'onchange':
						arr.push(attr[num2].name + '=\"' + attr[num2].value + '\"');
						break;
					default:
						elem.setAttribute(attr[num2].name, attr[num2].value);
				}
			}

			elem.innerHTML = '<input ' + arr.join(' ') + '> <label class="newdesign" for="' + attr.id.value + '"></label>';

			elems[num].parentNode.replaceChild(elem, elems[num]);
		}
	}

	//add attributes to link (a) elements that incl. an href attr.
	elems = document.querySelectorAll('a[href^="http"]');
	for (let num = 0; num < elems.length; num++) {
		elems[num].classList.add('settingsLink');
		elems[num].setAttribute('rel', 'noopener');
		elems[num].setAttribute('target', '_blank');
	}
}

// default settings
var defSettings = {
	hideAdvanced: true,
	settingsFullscreen: true,

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
	xBelow100: true,
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

	//shortcutSimpleMode: false,
	//shortcutAutoEnd: false,
}

/*
* Prepares all settings that were saved in local storage when the site gets loaded. Should be rewritten, good luck trying to find anything in here for now.
*/
var prepared = false; //if prepareMPO() could be finished (no errors)
var cookiesOn = false; //if cookies are on
var noInteract = false; //if Interact failed to load (true = interact.js failed to load - and likely other third parties too)
var popout = false; //if this is a settings popout
function prepareMPO () {
	loadHTML();

	//check if site is launched in popout mode
	if (getUrl('p') == 1) {
		mpoMain = window.opener;
		popout = true;
		openSettings(true);

		document.querySelector('body').style.overflow = 'hidden';
		getElem('popoutButton').innerText = 'Normal Settings';
		getElem('popoutButton').setAttribute('onclick', 'sendMessage(\'openSettings+true\');window.close();');
		getElem('noSettings').style.display = 'none';

		settingsFullscreen();

		getElem('settingsFullscreenPopoutReminder').style.display = 'block';
		getElem('settingsFullscreenBlurReminder').style.display = 'none';

		getElem('savefileCookieError').style.display = 'none';

		//clear parameters
		window.history.replaceState(null, null, window.location.pathname + '?p=1');

		sendMessage('syncPopout');
		localStorage.getItem('enableHighlight'); //If cookies are blocked, this will break the function immediately
		cookiesOn = true;
		prepared = true;

		return;
	}

	localStorage.getItem('settings'); //If cookies are blocked, this will break the function immediately
	cookiesOn = true;

	//parse the 'ls' part of a string, it would include a savefile in it though it's currently unused due to the string being too long
	//add a reminder in case cookies arent active since this wouldn't show up at all
	/*var str = getUrl('ls');
	if (str != false) {
		window.history.replaceState({}, document.title, "/" + location.host + location.pathname);
		parseFile(atob(str));
	}*/

	//load settings
	if (localStorage.getItem('settings') != null) {
		loadSettings(JSON.parse(localStorage.getItem('settings')));
	} else {
		resetSettings(true);
	}
	editValue('slotLoad', true);

	//removes outdated savefile parts (like MP9's Dice Block star which got replaced by the normal Item star)
	var num2 = parseInt(localStorage.getItem('sMax'));
	if (isNaN(num2) === true) { //failsafe in case there aren't any savefiles
		num2 = 0;
	}
	num2++;
	for (var num = 0; num < num2; num++) {
		if (localStorage.getItem('s' + num) === null)
			break;

		var lsSlot = JSON.parse(localStorage.getItem('s' + num));
		delete lsSlot.specialDice;
		localStorage.setItem('s' + num, JSON.stringify(lsSlot));
		var lsSlot = JSON.parse(localStorage.getItem('c' + num));
		delete lsSlot.specialDiceOnOff;
		localStorage.setItem('c' + num, JSON.stringify(lsSlot));
	}

	//loads savefiles
	if (localStorage.getItem('sMax') != null) {
		var num2 = parseInt(localStorage.getItem('sMax'));
		if (isNaN(num2) === true) { //failsafe in case there aren't any savefiles
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

	//load currentStats
	if (localStorage.getItem('currentStats') != null) {
		currentStats = JSON.parse(localStorage.getItem('currentStats'));

		//add all items to the slot that weren't there yet
			//mostly useful in case new counters get added in an update, this adds them all to previous savefiles that didn't have them yet
		for (name in defS) {
			if (currentStats[name] === undefined) {
				currentStats[name] = defS[name];
			}
		}

		editInner('curTurnText', currentStats.curTurn);
		editInner('maxTurnText', currentStats.maxTurn);

		editInner('coinStarText', currentStats.coinStar);
		editValue('p1CoinStarTie', currentStats.coinStarTie1);
		editValue('p2CoinStarTie', currentStats.coinStarTie2);
		editValue('p3CoinStarTie', currentStats.coinStarTie3);
		editValue('p4CoinStarTie', currentStats.coinStarTie4);

		var num = 0;
		for (let num2 = 0; num2 < 4; num2++) {
			num++;
			for (let num3 = 0; num3 < counters.length; num3++) {
				editInner('p' + num + countersUp[num3] + 'Text', currentStats[counters[num3]][num2]);
			}
		}
	} else {
		currentStats = slots['s' + slots.sel];
	}

	openSettings(true); //scrollIntoView doesn't work when the element is hidden so we have to show it first and then hide it again
	showHideSettings('player');
	for (var num = 1; num < 5; num++) {
		getElem(characters[num] + num).scrollIntoView({block: 'center'});
	}
	showHideSettings('generalMPO');
	closeSettings();

	//rules are added here as otherwise the transition would play each time the site is reloaded - timeout is needed as otherwise the rules already apply
	setTimeout(function  () {
		//Don't use window.document.styleSheets[0].sheet.insertRule() because Chrome cries about it locally, apparently some ""Security Issue"" or something, dunno.
		var cssElem = cElem('style', document.getElementsByTagName('HEAD')[0]);
		cssElem.innerHTML = '#settings {-webkit-transition: visibility .3s, opacity .3s; -moz-transition: visibility .3s, opacity .3s; transition: visibility .3s, opacity .3s;}';
	}, 50);

	getElem('savefileCookieError').style.display = 'none';

	//load the drag'n'drop positions
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

	//only gets executed on first visit when cookies are allowed
	if (localStorage.getItem('new') != '1') {
		openSettings();
		showHideSettings('tutorial');
		localStorage.setItem('new', '1');
	}

	//disabled drag'n'drop in case Interact.js couldn't be loaded
	if (noInteract === true) {
		editValue('enableInteract', false);
		getElem('enableInteract').setAttribute('disabled', true);
		getElem('saveInteract').setAttribute('disabled', true);
		getElem('resetInteract').setAttribute('disabled', true);
		getElem('noInteractError').style.display = 'unset';
	}

	if (getUrl('credits') == 1) { //should probably be a function
		openSettings();
		callOnBoth('showHideSettings', ['tutorial']);
		getElem('creditsBorder').scrollIntoView({block: 'start'});
		closeNavbar();
	}

	//load session storage stuff
	if (sessionStorage.getItem('settingsOpen') === 'true') {
		openSettings();
	}
	if (sessionStorage.getItem('settingsTab') != null) {
		showHideSettings(sessionStorage.getItem('settingsTab'));
	}
	/*if (sessionStorage.getItem('popoutActivated') === 'true') {
		mpoSettingsPopout();
	}*/ //cant do popups because browsers would block this immediately - only popups from buttonpresses are allowed

	//clear parameters
	window.history.replaceState(null, null, window.location.pathname);

	runSW();
	coinStarTie();
	callDisplayOnOff();

	updateNvGame();
	updateNvChar();
	updateNavbar(1);
	updateNavbar(2);
	updateNavbar(3);
	updateNavbar(4);

	resetHighlights();

	localStorage.setItem('lsVer', 10); //localStorage version, used to check how everything is stored

	prepared = true;
	startup = false;
}

/*
* In case prepareMPO() crashes, this will run instead and prepares MPO safely without using cookies/accessing localStorage.
*/
function prepareMPOBackup () {
	if (prepared != true) {
		console.warn('[MPO] Could not properly start MPO.');
		if (cookiesOn === false) {
			getElem('cookieError').style.display = 'block';
		} else {
			getElem('siteError').style.display = 'block';
		}
		updateNvGame();
		updateNvChar();
		updateNavbar(1);
		updateNavbar(2);
		updateNavbar(3);
		updateNavbar(4);

		//Don't use window.document.styleSheets[0].sheet.insertRule() because Chrome cries about it locally, apparently some ""Security Issue"" or something, dunno.
		var cssElem = cElem('style', document.getElementsByTagName('HEAD')[0]);
		cssElem.innerHTML = '#settings {-webkit-transition: visibility .3s, opacity .3s; -moz-transition: visibility .3s, opacity .3s; transition: visibility .3s, opacity .3s;}';

		if (popout != true) {
			callDisplayOnOff();
		}

		if (getUrl('credits') == 1) { //should probably be a function
			openSettings();
			callOnBoth('showHideSettings', ['tutorial']);
			getElem('creditsBorder').scrollIntoView({block: 'start'});
			closeNavbar();
		}

		//clear parameters
		window.history.replaceState(null, null, window.location.pathname);
	}
	startup = false;
}