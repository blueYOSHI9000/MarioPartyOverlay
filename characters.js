/*
* Changes characters and their icons depending on the options selected.
*
* @param {number} player Which player should be changed (only used when changing characters).
* @param {string} character Which character should be used (only used when changing characters).
*/
function changeCharacters (player, character) {
	if (getValue('customGameIcons') == true) {
		for (let num = 1; num < 5; num++) {
			if (player) {
				characters[player] = character;
				editValue(character + player, true);
				num = player;
			}
			if (curGame != 'all') {
				getElem('p' + num + 'Img').src = 'img/' + curGame + '/' + characters[num].toLowerCase() + '.png';
			} else {
				getElem('p' + num + 'Img').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[num].toLowerCase() + '.png';
			}
			if (player) {
				break;
			}
		}
	} else {
		for (let num = 1; num < 5; num++) {
			if (player) {
				characters[player] = character;
				editValue(character + player, true);
				num = player;
			}
			getElem('p' + num + 'Img').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[num].toLowerCase() + '.png';
			if (player) {
				break;
			}
		}
	}
	coinStarTie();
	updateNavbar(player);
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
	if (elem) {
		elem.src = 'img/com.png';
	}
	for (let num = 1; num < 5; num++) {
		getElem('p' + num + 'ComDisplay').src = 'img/com.png';
	}
	getElem('nvComImg').src = 'img/com.png';
}

/*
* Changes character icon back in case there's no custom icon.
*/
function changeCharactersBackup (elem) {
	var id = elem.id;

	var player = id.split('');
	getElem(id).src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/'  + characters[player[1]].toLowerCase() + '.png';
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
		if (curGame != 'all') {
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
		if (curGame != 'all') {
			getElem('coinStar').src = 'img/' + curGame + '/coins.png';
		} else {
			getElem('coinStar').src = 'img/coins.png';
		}
	}
}

/*
* Changes counter icon back in case there's no custom icon.
*/
function counterImgError (elem) {
	var id = elem.id;
	elem = elem.parentNode;
	elem = elem.className.split(' ');
	getElem(id).src = 'img/' + elem[1].toLowerCase()  + '.png';

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
* Loads a default image if a custom one doesn't exist. Called from onerror.
*
* @param {object} elem The element which couldn't load a image.
*/
function imgError (elem) {
	var v = elem.getAttribute('src').split('/');
	v[1] = document.querySelector('input[name="icons"]:checked').id;
	elem.src = v.join('/');
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
			getElem(charList.all[num] + '1').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
			getElem(charList.all[num] + '2').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
			getElem(charList.all[num] + '3').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
			getElem(charList.all[num] + '4').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + charList.all[num] + '.png';
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

			hideCounters.push(document.querySelectorAll('.coinStarC'));
			hideCounters.push(document.querySelectorAll('.happeningC'));

			showCounters.push(document.querySelectorAll('.coinC'));
			break;
		case 'smp':
			showCounters.push(document.querySelectorAll('.smpC'));

			showCounters.push(document.querySelectorAll('.coinStarC'));
			showCounters.push(document.querySelectorAll('.happeningC'));
			showCounters.push(document.querySelectorAll('.coinC'));
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

	if (getValue('deactivateUnused') === true) {
		deactivateUnused();

		var ms = getElem('miniStarsOnOff');
		if (game === 'mp9' || game === 'mp10') {
			ms.checked = true;
			editValueOnBoth(ms.id, true);
			changeSettings('changeStars', ['miniStars']);
			changeSettings('updateStars');
		} else {
			ms.checked = false;
			editValueOnBoth(ms.id, false);
			changeSettings('changeStars', ['miniStars']);
			changeSettings('updateStars');
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
			editInner('itemOnOffText', 'Orbs used:');
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
		default:
			editInner('happeningOnOffText', 'Happening (1-8, DS, SMP):');
			editInner('minigameOnOffText', 'Minigame (1-10, DS, SMP):');
			editInner('coinStarOnOffText', 'Coin Star (1-5, SMP):');

			editInner('redSpaceOnOffText', 'Red (7, 8, SMP):');
			editInner('runningOnOffText', 'Running (7-10, DS-SMP):');
			editInner('slowOnOffText', 'Slow (9, 10, SR-SMP):');

			editInner('shoppingOnOffText', 'Shopping (7, 8):');
			editInner('itemOnOffText', 'Item (6-9, DS-SMP):');
			editInner('unusedOnOffText', 'Unused (SR & TT100):');

			editInner('friendSpaceOnOffText', 'Friendship (DS):');
			editInner('hexOnOffText', 'Hex (DS):');
			editInner('balloonOnOffText', 'Balloon (SR, TT100):');

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
}
var curGame = 'all';
var pastResults = [];

/*
* Checks what counters are empty, displays used counters in settings.
*/
function updateCounterList () {
	var cStats = [];
	var cStatsHidden = [];

	for (var num = 0; num < counters.length; num++) {
		getElem(counters[num] + 'OnOffText').style.color = 'unset';
	}

	for (var num = 0; num < counters.length; num++) {
		var arr = [];
		for (var num2 = 1; num2 < 5; num2++) {
			if (counters[num] === 'coins') {
				break;
			}
			if (parseInt(getInner('p' + num2 + countersUp[num] + 'Text')) === 0) {
				arr.push(0);
			}
			if (num2 === 4 && arr.length != 4) {
				cStats.push(counters[num]);
			}
		}
	}
	arr = [];
	for (var num2 = 1; num2 < 5; num2++) {
		if (parseInt(getInner('p' + num2 + 'CoinsText')) === 5 || parseInt(getInner('p' + num2 + 'CoinsText')) === 10) {
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
	if (parseInt(getInner('coinStarText')) != 10) {
		if (getComputedStyle(getElem('coinStarOnOffText'), null).visibility != 'visible') {
			cStatsHidden.push('coinStar');
		} else {
			getElem('coinStarOnOffText').style.color = '#0B6B13';
		}
	} else {
		getElem('coinStarOnOffText').style.color = 'unset';
	}

	if (cStatsHidden.length > 0) {
		for (var num = 0; num < cStatsHidden.length; num++) {
			var str = cStatsHidden[num];
			str = str.replace(/([A-Z])/g, ' $1');
			str = str.charAt(0).toUpperCase() + str.slice(1);
			cStatsHidden[num] = str;
		}
		editInner('hiddenCountersText', 'Counters from other games with stats: <span  style="color: #0B6B13;">' + cStatsHidden.join(', ') + '</span>');
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
	if (min) {} else {
		var min = 0;
	}

	var result = '';
	result = Math.floor(Math.random() * max) + min;

	for (var num = 0; num < pastResults.length; num++) {
		if (result == pastResults[num]) {
			result = Math.floor(Math.random() * max) + 0;
			num--;
		}
	}
	pastResults.push(result);
	return result;
}

/*
* Randomly selects characters based on games.
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

		getElem(chars[num2] + num).scrollIntoView(true);
		changeCharacters(num, chars[num2]);

		if (popout === true) {
			changeSettings('changeCharacters', [num, chars[num]]);
		}

		if (player)
			return;
	}
}