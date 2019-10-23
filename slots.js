//empty slot templates, used on site-load and when creating empty slots
var defS = {
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
	almost: [0, 0, 0, 0],
	loner: [0, 0, 0, 0],
	duel: [0, 0, 0, 0],
	wanderer: [0, 0, 0, 0],
	ally: [0, 0, 0, 0],
	stompy: [0, 0, 0, 0],
	doormat: [0, 0, 0, 0]
};
var defC = {
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
	slowOnOff: false,
	shoppingOnOff: false,
	itemOnOff: false,
	unusedOnOff: false,
	friendSpaceOnOff: false,
	hexOnOff: false,
	balloonOnOff: false,
	spinSpaceOnOff: false,
	minusOnOff: false,
	almostOnOff: false,
	lonerOnOff: false,
	duelOnOff: false,
	wandererOnOff: false,
	allyOnOff: false,
	stompyOnOff: false,
	doormatOnOff: false,
	miniStarsOnOff: false,
	bananasOnOff: false,
	coinStarOnOff: true
};
var defA = {
	assistOn: false
};

var slots = {
	sel: 0,
	max: 0, //highest slot number, used to determine how many slots there are
	order: [0]
};
slots.s0 = copyVar(defS);
slots.c0 = copyVar(defC);
slots.a0 = copyVar(defA);


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

/*
* Copies variables without a reference.
*
* @param {any} v Variable that should be copies.
*/
function copyVar (v) {
	return JSON.parse(JSON.stringify(v));
}

var slotCooldown = false;
/*
* Called when a slot is selected, loaded/duplicated/deleted based on what is selected.
*
* @param {object/string} slot Object of the slots element/string of what should be done to slots
*/
function slotSel (slot) {
	if (typeof slot === 'object') { //get slot parameter from div when called from settings
		slot = parseInt(slot.slot);
	} else if (typeof slot === 'string') {
		switch (slot) {
			case 'duplicate':
				if (getValue('slotDuplicate') != true) {
					editValue('slotDuplicate', true);
					getElem('slotList').setAttribute('class', 'slotDuplicate');
				} else {
					editValue('slotLoad', true);
					getElem('slotList').setAttribute('class', '');
				}
				break;
			case 'delete':
				if (getValue('slotDelete') != true) {
					editValue('slotDelete', true);
					getElem('slotList').setAttribute('class', 'slotDelete');
				} else {
					editValue('slotLoad', true);
					getElem('slotList').setAttribute('class', '');
				}
				break;
		}
		return;
	}
	if (slotCooldown === true) {
		return;
	} else {
		slotCooldown = true;
		setTimeout(function () { slotCooldown = false; }, 150);
	}

	switch (document.querySelector('input[name="slotType"]:checked').id) {
		case 'slotDuplicate':
			execOnMain('createSlot', [slot]);
			break;
		case 'slotDelete':
			if (slot === slots.sel) {
				return;
			}
			execOnMain('deleteSlot', [slot]);
			break;
		default:
			if (popout === true) {
				sendMessage('backup');
				sendMessage('savePlayers');
				sendMessage('saveAssist');
			} else {
				backup();
				savePlayers();
				saveAssist();
			}
			if (slot === slots.sel) {
				return;
			}
			execOnMain('loadSlot', [slot]);
	}
}

/*
* Loads savefiles
*
* @param {number} slot Which slot to load.
*/
function loadSlot (slot) {
	slots.sel = slot;

	var sel = 's' + slot;

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

	var sel = 'c' + slot;

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
	editValue('unusedOnOff', slots[sel].unusedOnOff);
	editValue('miniStarsOnOff', slots[sel].miniStarsOnOff);
	editValue('bananasOnOff', slots[sel].bananasOnOff);
	editValue('coinStarOnOff', slots[sel].coinStarOnOff);

	if (slots[sel].miniStarsOnOff === true) {
		changeStars('miniStars');
	} else if (slots[sel].bananasOnOff === true) {
		changeStars('bananas');
	}

	var elems = document.getElementsByClassName('slotSelected');
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('slotSelected');
	}
	document.querySelectorAll('[slot="' + slot + '"]')[0].classList.add('slotSelected');

	changeGame(slots[sel].curGame);
	callHighlight(false, true);
	callDisplayOnOff();
	//backup();

	if (shortcutLoaded === true) {
		loadAssistSlot();
	}

	if (cookiesOn === false)
		return;
	localStorage.setItem('sel', slots.sel);
}

/*
* Creates/duplicates savefiles
*
* @param {number/string} slot Which slot to load, if empty it used the current slot, if 'empty' it creates an empty slot
* @param {boolean} update If true, a savefile gets updated instead of created.
*
*/
function createSlot (slot, update, noorder) {
	if (typeof slot === 'undefined') {
		slot = slots.sel;
	}
	if (update != true) {
		slots.max++;
		selS = 's' + slots.max;
		selC = 'c' + slots.max;
		selA = 'a' + slots.max;

		if (slot === 'empty') {
			slots[selS] = copyVar(defS);
			slots[selC] = copyVar(defC);
			slots[selA] = copyVar(defA);
		} else {
			slots[selS] = copyVar(slots['s' + slot]);
			slots[selC] = copyVar(slots['c' + slot]);
			slots[selA] = copyVar(slots['a' + slot]);
		}
		selM = slots.max;
		if (noorder != true) {
			slots.order.push(slots.max);
		}
	} else {
		selS = 's' + slot;
		selC = 'c' + slot;
		selA = 'a' + slot;
		selM = slot;
	}

	if (update === true) {
		var elem = document.querySelectorAll('[slot="' + slot + '"]')[0];
	} else {
		var elem = document.createElement("div");
		getElem('slotList').appendChild(elem);
		elem.classList.add('slotDiv');
		elem.setAttribute('onclick', 'slotSel(this)');
		elem.slot = slots.max;
	}

	var game = slots[selC].curGame;
	elem.innerHTML = '<span style="position: relative;"> <span class="slotTurnText"> <span class="slotTurn"> ' + slots[selS].curTurn + '/' + slots[selS].maxTurn + ' </span> Turn </span> <span class="slotAllText" id="slotAll' + selM + '">All</span> <img src="img/' + game + '.png" class="slotImg" id="slotImg' + selM + '"> </span> <br> <img src="img/' + game + '/' + slots[selC].char1 + '.png" onerror="imgError(this)"> <img src="img/' + game + '/' + slots[selC].char2 + '.png" onerror="imgError(this)"> <img src="img/' + game + '/' + slots[selC].char3 + '.png" onerror="imgError(this)"> <img src="img/' + game + '/' + slots[selC].char4 + '.png" onerror="imgError(this)"> <br>';
	if (slots[selC].curGame === 'all') {
		getElem('slotImg' + selM).style.visibility = 'hidden';
		getElem('slotImg' + selM).src = 'img/smp.png';
	} else {
		getElem('slotAll' + selM).style.visibility = 'hidden';
	}

	if (slots.max > 20) {
		getElem('savefileError').style.display = 'unset';
	}

	if (cookiesOn === false)
		return;

	localStorage.setItem(selC, JSON.stringify(slots[selC]));
	localStorage.setItem(selS, JSON.stringify(slots[selS]));
	localStorage.setItem(selA, JSON.stringify(slots[selA]));
	if (noorder != true) {
		localStorage.setItem('sOrder', JSON.stringify(slots.order));
	}
	localStorage.setItem('sMax', slots.max);
}

/*
* Deletes savefiles
*
* @param {number} slot The slot that should get deleted
*/
function deleteSlot (slot) {
	if (slot === slots.sel) {
		return;
	}
	getElem('slotAll' + slot).id = 'xyzyx1';
	getElem('slotImg' + slot).id = 'xyzyx2'; //needs to be changed so it's previous ID can be used
	document.querySelectorAll('[slot="' + slot + '"]')[0].id = 'xyzyxdel';
	var num2;
	for (let num = slot + 1; num < slots.max + 1; num++) {
		num2 = num - 1;
		getElem('slotAll' + num).parentNode.parentNode.slot = num2;
		getElem('slotAll' + num).id = 'slotAll' + num2;
		getElem('slotImg' + num).id = 'slotImg' + num2;
		slots['s' + num2] = copyVar(slots['s' + num]);
		slots['c' + num2] = copyVar(slots['c' + num]);
		slots['a' + num2] = copyVar(slots['a' + num]);
	}
	var elem = getElem('xyzyxdel');
	elem.parentElement.removeChild(elem);
	delete slots['s' + slots.max];
	delete slots['c' + slots.max];
	delete slots['a' + slots.max];
	slots.max--;
	if (slots.sel > slot) {
		loadSlot(slots.sel - 1);
	}

	if (slots.max <= 20) {
		getElem('savefileError').style.display = 'none';
	}
	updateSlotOrder();

	if (cookiesOn === false)
		return;

	localStorage.removeItem('s' + slots.max + 1);
	localStorage.removeItem('c' + slots.max + 1);
	localStorage.removeItem('a' + slots.max + 1);
	for (let num = slot; num < slots.max + 1; num++) {
		localStorage.setItem('s' + num, JSON.stringify(slots['s' + num]));
		localStorage.setItem('c' + num, JSON.stringify(slots['c' + num]));
		localStorage.setItem('a' + num, JSON.stringify(slots['c' + num]));
	}
	localStorage.setItem('sMax', slots.max);
	localStorage.setItem('sOrder', JSON.stringify(slots.order));
}

/*
* Updates the slot order.
*/
function updateSlotOrder () {
	var elems = getElem('slotList').children;
	var arr = [];
	for (let num = 0; num < elems.length; num++) {
		arr.push(parseInt(elems[num].slot));
	}
	slots.order = arr;
	if (popout === true) {
		sendMessage('changeSlotOrder+' + JSON.stringify(slots.order));
	}

	if (cookiesOn === false)
		return;
	localStorage.setItem('sOrder', JSON.stringify(arr));
}

/*
* Changes the slot order.
*
* @param {array} so The order.
*/
function changeSlotOrder (so) {
	if (typeof so === 'string') {
		so = JSON.parse(so);
	}
	if (typeof so != 'object') {
		return;
	}
	for (var num = 0; num < so.length; num++) {
		var d = document.querySelectorAll('[slot="' + so[num] + '"]')[0];
		d.parentNode.appendChild(d);
	}
	slots.order = so;
}

/*
* Sets slots in popout.
*/
function setSlots (text) {
	var slots2 = JSON.parse(text);
	var arr = copyVar(slots2.order);

	var num2 = slots2.max;
	if (isNaN(num2) === true) {
		num2 = 0;
	}
	num2++;
	for (var num = 0; num < num2; num++) {
		slots['s' + num] = slots2['s' + num];
		slots['c' + num] = slots2['c' + num];
		slots['a' + num] = slots2['a' + num];
		if (num === 0) {
			createSlot(num, true);
		} else {
			createSlot(num);
		}
	}
	loadSlot(slots2.sel);
	changeSlotOrder(arr);
}

/*
* Forgot to write this, no idea what it does now...
*/
function updateS (text) {
	slots['s' + slots.sel] = JSON.parse(text);
	createSlot(slots.sel, true);
}