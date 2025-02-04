/*
* Changes characters and their icons depending on the options selected.
*
* @param {number} player Which player should be changed (only used when changing characters).
* @param {string} character Which character should be used (only used when changing characters).
*/
function changeCharacters (player, character) {
	for (let num = 1; num < 5; num++) {
		if (player) {
			characters[player] = character;
			editValue(character + player, true);
			num = player;
		}
		changeCharacterIcon('p' + num + 'Img', characters[num]);
		if (player) {
			break;
		}
	}

	coinStarTie();
	updateNavbar(player);
	if (popout != true && startup === false) {
		slots['c' + slots.sel]['char' + player] = character;
		localStorage.setItem('c' + slots.sel, JSON.stringify(slots['c' + slots.sel]));
	}
}

/*
* Changes a character icon based on the currently selected game.
*
* @param {DOM Element/String} elem The element that should be changed or the ID for it.
* @param {string} character The character it should be changed to.
* @param {boolean} assist If true it uses the assist game instead of the normal one.
*/
function changeCharacterIcon (elem, character, assist) {
	if (assist === true) {
		var game = assistInfo.curGame;
	} else {
		var game = curGame;
	}

	if (typeof elem === 'string') {
		elem = getElem(elem);
	}

	if (game != 'all' && getValue('customGameIcons') === true) {
		elem.src = 'img/' + game + '/' + character.toLowerCase() + '.png';
	} else {
		elem.src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + character.toLowerCase() + '.png';
	}
}

/*
* Changes character icon back in case there's no custom icon.
*/
function changeCharacterIconError (elem) {
	var id = elem.id;

	var player = getNumberFromString(id);
	var src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/'  + characters[player].toLowerCase() + '.png';

	if (elem.getAttribute('src') != src) { //prevents an infinite loop when image doesn't exist
		elem.src = src;
	}
}

/*
* Loads a default image if a custom one doesn't exist. Called from onerror.
*
* @param {object} elem The element which couldn't load a image.
*/
function imgError (elem) {
	var v = elem.getAttribute('src').split('/');
	v[1] = document.querySelector('input[name="icons"]:checked').id;
	var src = v.join('/');

	if (elem.getAttribute('src') != src) { //prevents an infinite loop when image doesn't exist
		elem.src = src;
	}
}

/*
* Changes COM Image depending on selected game.
*/
function changeComImg () {
	for (let num = 1; num < 5; num++) {
		if (curGame != 'all') {
			getElem('p' + num + 'ComDisplay').src = 'img/' + curGame + '/com.png';
		} else {
			getElem('p' + num + 'ComDisplay').src = 'img/com.png';
		}
	}
}

/*
* Changes COM image back in case there's no custom one.
*/
function comImgError (elem) {
	if (elem && elem.getAttribute('src') != 'img/com.png') {
		elem.src = 'img/com.png';
	}
}

/*
* Replaces counter icons with custom icons depending on the selected game.
*/
var characters = ['', 'mario', 'luigi', 'yoshi', 'peach'];
function changeCounterIcons () {
	if (getValue('customGameIcons') == true) {
		for (let num = 0; num < counters.length; num++) {
			var elems = document.getElementsByClassName(counters[num]);

			var onOffElems = document.getElementsByClassName(counters[num] + 'OnOff');
			for (let num1 = 0; num1 < onOffElems.length; num1++) {
				if (curGame != 'all') {
					onOffElems[num1].style.backgroundImage = 'url(img/' + curGame + '/' + counters[num].toLowerCase() + '.png)';
				} else {
					onOffElems[num1].style.backgroundImage = 'url(img/' + counters[num].toLowerCase()  + '.png)';
				}
			}

			for (let num1 = 0; num1 < elems.length; num1++) {
				elems[num1] = elems[num1].childNodes;
				var elems2 = elems[num1].getElementsByTagName('img');

				for (let num2 = 0; num2 < elems2.length; num2++) {
					if (curGame != 'all') {
						elems2[num2].src = 'img/' + curGame + '/' + counters[num].toLowerCase() + '.png';
					} else {
						elems2[num2].src = 'img/' + counters[num].toLowerCase() + '.png';
					}
				}
			}
		}
		if (curGame === 'mptt100') {
			getElem('coinStar').src = 'img/' + curGame + '/rich.png';
			document.querySelector('.coinStarC .coinsOnOff').style.backgroundImage = 'url(img/mptt100/rich.png)';
		} else if (curGame != 'all') {
			getElem('coinStar').src = 'img/' + curGame + '/coins.png';
		} else {
			getElem('coinStar').src = 'img/coins.png';
		}
	} else {
		for (let num = 0; num < counters.length; num++) {
			var elems = document.getElementsByClassName(counters[num]);

			var onOffElems = document.getElementsByClassName(counters[num] + 'OnOff');
			for (let num1 = 0; num1 < onOffElems.length; num1++) {
				onOffElems[num1].style.backgroundImage = 'url(img/' + counters[num].toLowerCase()  + '.png)';
			}

			for (let num1 = 0; num1 < elems.length; num1++) {
				elems[num1] = elems[num1].childNodes;
				var elems2 = elems[num1].getElementsByTagName('img');

				for (let num2 = 0; num2 < elems2.length; num2++) {
					elems2[num2].src = 'img/' + counters[num].toLowerCase()  + '.png';
				}
			}
		}

		getElem('coinStar').src = 'img/coins.png';
	}
}

/*
* Changes counter icon back in case there's no custom icon.
*/
function counterImgError (elem) {
	var id = elem.id;
	elem = elem.parentNode;
	elem = elem.className.split(' '); //dont ask me why I didnt create a new variable, no idea and I'm too lazy to change it now
	var src = 'img/' + elem[1].toLowerCase()  + '.png';

	if (getElem(id).getAttribute('src') === src) { //prevents an infinite loop when image doesn't exist
		return;
	}
	getElem(id).src = src;

	var elem2 = getElem(elem[1] + 'OnOff');
	elem2 = elem2.parentNode;

	elem2.children[2].style = 'background-image: url(img/' + elem[1].toLowerCase()  + '.png);';
	if (elem[1] == 'coins') {
		elem2 = getElem('coinStarOnOff');
		elem2 = elem2.parentNode;

		elem2.children[2].style = 'background-image: url(img/coins.png);';
	} else if (elem[1] == 'running') {
		elem2 = getElem('slowOnOff');
		elem2 = elem2.parentNode;

		elem2.children[2].style = 'background-image: url(img/running.png);';
	} else if (elem[1] == 'item') {
		elem2 = getElem('unusedOnOff');
		elem2 = elem2.parentNode;

		elem2.children[2].style = 'background-image: url(img/item.png);';
	}
}

/*
* Changes the icons for the characters tab in settings.
*/
function changeCharSelectionIcons () {
	var imgSrc = curGame;
	if (curGame === 'all') {
		imgSrc = document.querySelector('input[name="icons"]:checked').id;
	}
	for (let num = 0; num < charList.all.length; num++) {
		if (getElem(charList.all[num] + '1').parentNode.style.display != 'none') {
			getElem(charList.all[num] + '1').parentNode.parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
			getElem(charList.all[num] + '2').parentNode.parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
			getElem(charList.all[num] + '3').parentNode.parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
			getElem(charList.all[num] + '4').parentNode.parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
		}
	}
	updateNavbar(1);
	updateNavbar(2);
	updateNavbar(3);
	updateNavbar(4);
	updateNvChar();
}

/*
* Changes com status of a character.
*
* @param {number} player Which player should be updated.
* @param {boolean} noAnimation Skips animation if true.
*/
function changeCom (player, noAnimation) {
	if (getValue('com' + player) == true) {
		if (getValue('enableAnimation') == true && noAnimation != true) {
			getElem('p' + player + 'ComDisplay').classList.add('visibleAnimation');
			getElem('p' + player + 'ComDisplay').classList.remove('hiddenAnimation');
		} else {
			getElem('p' + player + 'ComDisplay').style.opacity = '1';
		}
	} else {
		if (getValue('enableAnimation') == true && noAnimation != true) {
			getElem('p' + player + 'ComDisplay').classList.remove('visibleAnimation');
			getElem('p' + player + 'ComDisplay').classList.add('hiddenAnimation');
		} else {
			getElem('p' + player + 'ComDisplay').style.opacity = '0';
		}
	}
	updateNavbar(player);

	if (popout != true && startup === false) {
		slots['c' + slots.sel]['com' + player] = getValue('com' + player);
		localStorage.setItem('c' + slots.sel, JSON.stringify(slots['c' + slots.sel]));
	}
}

/*
* Show/Hide characters based on the selected game.
*
* @param {string} game What game is currently used.
*/
function changeGame (game) {
	editValue(game, true);
	curGame = game;
	var showChars = [];
	var hideChars = [];
	var showCounters = [];
	var hideCounters = [];

	for (let num = 0; num < charList.all.length; num++) {
		hideChars.push(document.querySelectorAll('.' + charList.all[num] + 'Span'));
	}

	hideCounters.push(document.querySelectorAll('.mp6C'));
	hideCounters.push(document.querySelectorAll('.mp7C'));
	hideCounters.push(document.querySelectorAll('.mp8C'));
	hideCounters.push(document.querySelectorAll('.mp9C'));
	hideCounters.push(document.querySelectorAll('.mpDSC'));
	hideCounters.push(document.querySelectorAll('.mpsrC'));
	hideCounters.push(document.querySelectorAll('.mptt100C'));
	hideCounters.push(document.querySelectorAll('.smpC'));
	hideCounters.push(document.querySelectorAll('.mpsC'));
	hideCounters.push(document.querySelectorAll('.smpjC'));

	for (let num = 0; num < charList[game].length; num++) {
		showChars.push(document.querySelectorAll('.' + charList[game][num] + 'Span'));
	}

	switch (game) {
		case 'mp6':
			showCounters.push(document.querySelectorAll('.mp6C'));

			hideCounters.push(document.querySelectorAll('.coinStarC'));

			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mp7':
			showCounters.push(document.querySelectorAll('.mp7C'));

			hideCounters.push(document.querySelectorAll('.coinStarC'));

			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mp8':
			showCounters.push(document.querySelectorAll('.mp8C'));

			hideCounters.push(document.querySelectorAll('.coinStarC'));

			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mp9':
			showCounters.push(document.querySelectorAll('.mp9C'));

			hideCounters.push(document.querySelectorAll('.coinStarC'));
			hideCounters.push(document.querySelectorAll('.happeningC'));
			hideCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mp10':
			showCounters.push(document.querySelectorAll('.mp10C'));

			hideCounters.push(document.querySelectorAll('.coinStarC'));
			hideCounters.push(document.querySelectorAll('.happeningC'));
			hideCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mpds':
			showCounters.push(document.querySelectorAll('.mpDSC'));

			hideCounters.push(document.querySelectorAll('.coinStarC'));

			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mpsr':
			showCounters.push(document.querySelectorAll('.mpsrC'));

			hideCounters.push(document.querySelectorAll('.coinStarC'));
			hideCounters.push(document.querySelectorAll('.happeningC'));

			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mptt100':
			showCounters.push(document.querySelectorAll('.mptt100C'));

			showCounters.push(document.querySelectorAll('.coinStarC'));
			hideCounters.push(document.querySelectorAll('.happeningC'));

			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'smp':
			showCounters.push(document.querySelectorAll('.smpC'));

			showCounters.push(document.querySelectorAll('.coinStarC'));
			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'mps':
		case 'smpj':
			showCounters.push(document.querySelectorAll('.mpsC'));
			showCounters.push(document.querySelectorAll('.smpjC'));
			break;
		case 'mpa':
		case 'mpit':
		case 'all':
			showCounters.push(document.querySelectorAll('.mp6C'));
			showCounters.push(document.querySelectorAll('.mp7C'));
			showCounters.push(document.querySelectorAll('.mp8C'));
			showCounters.push(document.querySelectorAll('.mp9C'));
			showCounters.push(document.querySelectorAll('.mp10C'));
			showCounters.push(document.querySelectorAll('.mpDSC'));
			showCounters.push(document.querySelectorAll('.mpsrC'));
			showCounters.push(document.querySelectorAll('.smpC'));
			showCounters.push(document.querySelectorAll('.mpsC'));
			showCounters.push(document.querySelectorAll('.smpjC'));

			showCounters.push(document.querySelectorAll('.coinStarC'));
			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		default:
			showCounters.push(document.querySelectorAll('.coinStarC'));
			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
	}
	if (game === 'mpa' || game === 'mpit') {
		getElem('counterError').style = '';
	} else {
		getElem('counterError').style = 'display: none;';
	}

	for (var num = 0; num < hideChars.length; num++) {
		for (var num2 = 0; num2 < hideChars[num].length; num2++) {
			//hideChars[num][num2] = hideChars[num][num2] + 'Span';
			hideChars[num][num2].style.display = 'none';
		}
	}

	for (var num = 0; num < showChars.length; num++) {
		for (var num2 = 0; num2 < showChars[num].length; num2++) {
			//showChars[num][num2] = showChars[num][num2] + 'Span';
			showChars[num][num2].style.display = '';
		}
	}

	for (var num = 0; num < hideCounters.length; num++) {
		for (var num2 = 0; num2 < hideCounters[num].length; num2++) {
			hideCounters[num][num2].style.visibility = 'hidden';
		}
	}

	for (var num = 0; num < showCounters.length; num++) {
		for (var num2 = 0; num2 < showCounters[num].length; num2++) {
			showCounters[num][num2].style.visibility = 'visible';
		}
	}
	changeCharSelectionIcons();
	changeCounterIcons();
	changeCharacters();
	changeComImg();

	updateNvGame();
	//updateNvChar(); //already called in changeCharSelectionIcons()
	updateNavbar(1);
	updateNavbar(2);
	updateNavbar(3);
	updateNavbar(4);
	getElem('bonusStarListLink').setAttribute('href', 'bonus.html?game=' + game);

	if (getValue('deactivateUnused') === true) {
		deactivateUnused();

		var ms = getElem('miniStarsOnOff');
		if (game === 'mp9' || game === 'mp10') {
			ms.checked = true;
			editValueOnBoth(ms.id, true);
			callOnBoth('changeStars', ['miniStars']);
			callOnBoth('updateStars');
		} else {
			ms.checked = false;
			editValueOnBoth(ms.id, false);
			callOnBoth('changeStars', ['miniStars']);
			callOnBoth('updateStars');
		}
	}

	switch (curGame) {
		case 'mp1':
		case 'mp2':
		case 'mp3':
		case 'mp4':
		case 'mp5':
			editInner('happeningOnOffText', 'Happening:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('coinStarOnOffText', 'Coin Star:');
			break;
		case 'mp6':
			editInner('happeningOnOffText', 'Event:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('itemOnOffText', 'Orb:');
			break;
		case 'mp7':
			editInner('happeningOnOffText', 'Action:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('redSpaceOnOffText', 'Red:');
			editInner('runningOnOffText', 'Running:');
			editInner('shoppingOnOffText', 'Shopping:');
			editInner('itemOnOffText', 'Orb:');
			break;
		case 'mp8':
			editInner('happeningOnOffText', 'Green:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('runningOnOffText', 'Running:');
			editInner('redSpaceOnOffText', 'Red:');
			editInner('shoppingOnOffText', 'Shopping:');
			editInner('itemOnOffText', 'Candy:');
			break;
		case 'mp9':
		case 'mp10':
			editInner('minigameOnOffText', 'Minigame:');
			editInner('runningOnOffText', 'Far:');
			editInner('slowOnOffText', 'Slow:');
			editInner('itemOnOffText', 'Dice Block:');
			editInner('spinSpaceOnOffText', 'Spin:');
			editInner('minusOnOffText', 'Minus:');
			editInner('miniStarsOnOffText', 'Mini-stars:');
			editInner('bananasOnOffText', 'Bananas:');
			break;
		case 'mpds':
			editInner('happeningOnOffText', 'Green:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('runningOnOffText', 'Running:');
			editInner('itemOnOffText', 'Item:');
			editInner('friendSpaceOnOffText', 'Friendship:');
			editInner('hexOnOffText', 'Hex:');
			break;
		case 'mpsr':
			editInner('minigameOnOffText', 'Champion:');
			editInner('runningOnOffText', 'Sightseer:');
			editInner('slowOnOffText', 'Slowpoke:');
			editInner('unusedOnOffText', 'Anti-Items:');
			editInner('balloonOnOffText', 'Balloon:');
			editInner('almostOnOffText', 'Almost:');
			editInner('lonerOnOffText', 'Loner:');
			editInner('duelOnOffText', 'Duel:');
			editInner('wandererOnOffText', 'Wanderer:');
			break;
		case 'mptt100':
			editInner('coinStarOnOffText', 'Rich:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('runningOnOffText', 'Running:');
			editInner('slowOnOffText', 'Easygoing:');
			editInner('itemOnOffText', 'Item:');
			editInner('unusedOnOffText', 'Unused:');
			editInner('balloonOnOffText', 'Balloon:');
			editInner('almostOnOffText', 'So-close:');
			break;
		case 'smp':
			editInner('happeningOnOffText', 'Eventful:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('coinStarOnOffText', 'Rich:');
			editInner('redSpaceOnOffText', 'Unlucky:');
			editInner('runningOnOffText', 'Sightseer:');
			editInner('slowOnOffText', 'Slowpoke:');
			editInner('itemOnOffText', 'Item:');
			editInner('allyOnOffText', 'Ally:');
			editInner('stompyOnOffText', 'Stompy:');
			editInner('doormatOnOffText', 'Doormat:');
			break;
		case 'mps':
			editInner('happeningOnOffText', 'Eventful:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('coinStarOnOffText', 'Rich:');

			editInner('redSpaceOnOffText', 'Unlucky:');
			editInner('bowserSpaceOnOffText', 'Bowser Space:');
			editInner('runningOnOffText', 'Sightseer:');
			editInner('slowOnOffText', 'Slowpoke:');

			editInner('shoppingOnOffText', 'Shopping:');
			editInner('itemOnOffText', 'Item:');

			editInner('starsOnOffText', 'Stars:');
			editInner('coinsOnOffText', 'Coins:');
			break;
		case 'smpj':
			editInner('happeningOnOffText', 'Eventful:');
			editInner('minigameOnOffText', 'Minigame:');
			editInner('coinStarOnOffText', 'Rich:');

			editInner('redSpaceOnOffText', 'Misfortune:');
			editInner('bowserSpaceOnOffText', 'Bowser Space:');
			editInner('runningOnOffText', 'Sightseer:');
			editInner('slowOnOffText', 'Slowpoke:');

			editInner('shoppingOnOffText', 'Shopping:');
			editInner('itemOnOffText', 'Item:');

			editInner('starsOnOffText', 'Stars:');
			editInner('coinsOnOffText', 'Coins:');
			break;
		default:
			editInner('happeningOnOffText', 'Happening (1-8, DS, SMP-SMPJ):');
			editInner('minigameOnOffText', 'Minigame (1-10, DS, SMP-SMPJ):');
			editInner('coinStarOnOffText', 'Coin Star (1-5, SMP-SMPJ):');

			editInner('redSpaceOnOffText', 'Red (7, 8, SMP-SMPJ):');
			editInner('bowserSpaceOnOffText', 'Bowser Space (MPS & SMPJ):');
			editInner('runningOnOffText', 'Running (7-10, DS-SMPJ):');
			editInner('slowOnOffText', 'Slow (9, 10, SR-SMPJ):');

			editInner('shoppingOnOffText', 'Shopping (7, 8, MPS, SMPJ):');
			editInner('itemOnOffText', 'Item (6-8, DS-SMPJ):');
			editInner('unusedOnOffText', 'Unused (SR & TT100):');

			editInner('friendSpaceOnOffText', 'Friendship (DS):');
			editInner('hexOnOffText', 'Hex (DS):');
			editInner('balloonOnOffText', 'Balloon (SR & TT100):');

			editInner('spinSpaceOnOffText', 'Spin (9):');
			editInner('minusOnOffText', 'Minus (9, 10):');
			editInner('almostOnOffText', 'Almost (SR & TT100):');

			editInner('lonerOnOffText', 'Loner (SR):');
			editInner('duelOnOffText', 'Duel (SR):');
			editInner('wandererOnOffText', 'Wanderer (SR):');

			editInner('allyOnOffText', 'Ally (SMP):');
			editInner('stompyOnOffText', 'Stompy (SMP):');
			editInner('doormatOnOffText', 'Doormat (SMP):');

			editInner('starsOnOffText', 'Stars:');
			editInner('miniStarsOnOffText', 'Mini-stars (9 & 10):');
			editInner('bananasOnOffText', 'Bananas (9):');
			editInner('coinsOnOffText', 'Coins:');
	}
	updateCounterList();
	if (popout != true && startup === false) {
		slots['c' + slots.sel].curGame = game;
		localStorage.setItem('c' + slots.sel, JSON.stringify(slots['c' + slots.sel]));
	}
}
var curGame = 'all';
var pastResults = [];

var cStatsHidden = [];
/*
* Checks what counters are empty, displays used counters in settings.
*/
function updateCounterList () {
	var cStats = [];
	cStatsHidden = [];

	for (var num = 0; num < counters.length; num++) {
		getElem(counters[num] + 'OnOffText').style.color = 'unset';
	}

	for (var num = 0; num < counters.length; num++) {
		var arr = [];
		for (var num2 = 1; num2 < 5; num2++) {
			if (counters[num] === 'coins') {
				break;
			}
			if (getStat(countersUp[num], num2) === 0) {
				arr.push(0);
			}
			if (num2 === 4 && arr.length != 4) {
				cStats.push(counters[num]);
			}
		}
	}
	arr = [];
	for (var num2 = 1; num2 < 5; num2++) {
		if (getStat('coins', num2) === 5 || getStat('coins', num2) === 10) {
			arr.push(0);
		}
		if (num2 === 4 && arr.length != 4) {
			cStats.push('coins');
		}
	}
	for (var num = 0; num < cStats.length; num++) {
		getElem(cStats[num] + 'OnOffText').style.color = '#0B6B13';
		if (getComputedStyle(getElem(cStats[num] + 'OnOffText'), null).visibility != 'visible') {
			cStatsHidden.push(cStats[num]);
		}
	}
	if (getStat('coinStar') != 10) {
		if (getComputedStyle(getElem('coinStarOnOffText'), null).visibility != 'visible') {
			cStatsHidden.push('coinStar');
		} else {
			getElem('coinStarOnOffText').style.color = '#0B6B13';
		}
	} else {
		getElem('coinStarOnOffText').style.color = 'unset';
	}
	showHiddenStats();
}

/*
* Lists unused counters with stats in the Counters tab in settings.
*
* @param {string} show A counter which should be made visible.
*/
function showHiddenStats (show) {
	var arr = [];
	if (show) {
		cStatsHidden.splice(cStatsHidden.indexOf(show), 1);

	}

	if (cStatsHidden.length > 0) {
		for (var num = 0; num < cStatsHidden.length; num++) {
			var str = cStatsHidden[num];
			str = str.replace(/([A-Z])/g, ' $1');
			str = str.charAt(0).toUpperCase() + str.slice(1);
			arr.push('<span  style="color: #0B6B13;" onclick="//showHiddenStats(\'' + cStatsHidden[num] + '\')">' + str + '</span>');
		}
		editInner('hiddenCountersText', 'Counters from other games with stats: ' + arr.join(', '));
	} else {
		editInner('hiddenCountersText', '');
	}
}

/*
* Deactivates all counters not used by the current game.
*/
function deactivateUnused () {
	var unused;
	//all: unused = ['coinStar', 'happening', 'minigame', 'redSpace', 'running', 'slow', 'shopping', 'item', 'unused', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'almost', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
	switch (curGame) { //list the unused counters, not the ones used
		case 'mp1':
		case 'mp2':
		case 'mp3':
		case 'mp4':
		case 'mp5':
			unused = ['redSpace', 'running', 'slow', 'shopping', 'item', 'unused', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'almost', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp6':
			unused = ['coinStar', 'redSpace', 'running', 'slow', 'shopping', 'item', 'unused', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'almost', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp7':
			unused = ['coinStar', 'slow', 'item', 'unused', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'almost', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp8':
			unused = ['coinStar', 'slow', 'unused', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'almost', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp9':
			unused = ['coinStar', 'redSpace', 'shopping', 'unused', 'friendSpace', 'hex', 'balloon', 'almost', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat'];
			break;
		case 'mp10':
			unused = ['coinStar', 'redSpace', 'shopping', 'unused', 'friendSpace', 'hex', 'balloon', 'almost', 'loner', 'duel', 'wanderer', 'spinSpace', 'ally', 'stompy', 'doormat', 'miniStars'];
			break;
		case 'mpds':
			unused = ['coinStar', 'redSpace', 'slow', 'shopping', 'unused', 'balloon', 'spinSpace', 'minus', 'almost', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mpsr':
			unused = ['coinStar', 'happening', 'redSpace', 'shopping', 'item', 'friendSpace', 'hex', 'spinSpace', 'minus', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mptt100':
			unused = ['happening', 'redSpace', 'shopping', 'friendSpace', 'hex', 'spinSpace', 'minus', 'loner', 'duel', 'wanderer', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'smp':
			unused = ['shopping', 'unused', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'almost', 'loner', 'duel', 'wanderer', 'miniStars', 'bananas'];
			break;
		default:
			return;
	}
	for (var num = 0; num < unused.length; num++) {
		editValue(unused[num] + 'OnOff', false);
	}
	callDisplayOnOff();
	changeStars();

}

/*
* Gets a random number in a specified range and checks if it's a duplicate in pastResults.
*
* @param {number} max The max number.
*/
function randomCharFor (max, min) {
	if (typeof min === 'undefined')
		min = 0;

	var result = '';
	result = Math.floor(Math.random() * max) + min;
	var failsafe = 0;

	for (var num = 0; num < pastResults.length; num++) {
		if (result === pastResults[num]) {
			result = Math.floor(Math.random() * max) + 0;
			num = -1;
			failsafe++;
		}
		if (failsafe > 30)
			break;
	}
	pastResults.push(result);
	return result;
}

/*
* Randomly selects characters based on games.
* I have absolutely no idea how this works. Apparently only made for the Randomize button in the Characters tab and nothing else. - check nvRando() in navbar.js for a better version
*
* @param {number} player Only randomizes the specified player.
*/
function randomChar (player) {
	pastResults = [];
	var chars = [''];
	var rdmChars = charList[curGame];

	if (player) {
		for (var num = 1; num < 5; num++) {
			if (num === player)
				num++;

			pastResults.push(rdmChars.indexOf(characters[num]));
		}
	}

	for (var num = 1; num < 5; num++) {
		if (player)
			num = player;

		chars.push(rdmChars[randomCharFor(rdmChars.length)]);

		var num2 = num;
		if (player)
			num2 = 1;

		getElem(chars[num2] + num).scrollIntoView({block: 'center'}); //behavious: 'smooth' only works on one column at a time, all others won't even try to scroll in chrome so it's better without
		changeCharacters(num, chars[num2]);

		if (popout === true) {
			callOnBoth('changeCharacters', [num, chars[num]]);
		}

		if (player)
			return;
	}

	var elems = document.querySelectorAll('.nvCharSelected');
	for (let num = 0; num < elems.length; num++) {
		elems[num].classList.remove('nvCharSelected');
	}
	setNvPlayer(1);
	setNvPlayer(2);
	setNvPlayer(3);
	setNvPlayer(4);
}