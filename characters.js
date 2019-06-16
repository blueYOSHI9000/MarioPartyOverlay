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
				document.getElementById('p' + num + 'Img').src = 'img/' + curGame + '/' + characters[num].toLowerCase() + '.png';
			} else {
				document.getElementById('p' + num + 'Img').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[num].toLowerCase() + '.png';
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
			document.getElementById('p' + num + 'Img').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[num].toLowerCase() + '.png';
			if (player) {
				break;
			}
		}
	}
	coinStarTie();
}

/*
* Changes COM Image depending on selected game.
*/
function changeComImg () {
	for (let num = 1; num < 5; num++) {
		if (curGame != 'all') {
			document.getElementById('p' + num + 'ComDisplay').src = 'img/' + curGame + '/com.png';
		} else {
			document.getElementById('p' + num + 'ComDisplay').src = 'img/com.png';
		}
	}
}

/*
* Changes COM image back in case there's no custom one.
*/
function changeComImgError () {
	for (let num = 1; num < 5; num++) {
		document.getElementById('p' + num + 'ComDisplay').src = 'img/com.png';
	}
}

/*
* Changes character icon back in case there's no custom icon.
*/
function changeCharactersBackup (elem) {
	var id = elem.id;

	var player = id.split('');
	document.getElementById(id).src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/'  + characters[player[1]].toLowerCase() + '.png';
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
			document.getElementById('coinStar').src = 'img/' + curGame + '/coins.png';
		} else {
			document.getElementById('coinStar').src = 'img/coins.png';
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
			document.getElementById('coinStar').src = 'img/' + curGame + '/coins.png';
		} else {
			document.getElementById('coinStar').src = 'img/coins.png';
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
	document.getElementById(id).src = 'img/' + elem[1].toLowerCase()  + '.png';

	var elem2 = document.getElementById(elem[1] + 'OnOff');
	elem2 = elem2.parentNode;

	elem2.children[2].style = 'background-image: url(img/' + elem[1].toLowerCase()  + '.png);';
	if (elem[1] == 'coins') {
		elem2 = document.getElementById('coinStarOnOff');
		elem2 = elem2.parentNode;

		elem2.children[2].style = 'background-image: url(img/coins.png);';
	} else if (elem[1] == 'running') {
		elem2 = document.getElementById('slowOnOff');
		elem2 = elem2.parentNode;

		elem2.children[2].style = 'background-image: url(img/running.png);';
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
	for (let num = 0; num < characterList.length; num++) {
		if (document.getElementById(characterList[num] + '1').parentNode.style.display != 'none') {
			document.getElementById(characterList[num] + '1').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + characterList[num] + '.png';
			document.getElementById(characterList[num] + '2').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + characterList[num] + '.png';
			document.getElementById(characterList[num] + '3').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + characterList[num] + '.png';
			document.getElementById(characterList[num] + '4').parentNode.children[1].children[0].src = 'img/' + imgSrc + '/' + characterList[num] + '.png';
		}
	}
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
			document.getElementById('p' + player + 'ComDisplay').classList.add('visibleAnimation');
			document.getElementById('p' + player + 'ComDisplay').classList.remove('hiddenAnimation');
		} else {
			document.getElementById('p' + player + 'ComDisplay').style.opacity = '1';
		}
	} else {
		if (getValue('enableAnimation') == true && noAnimation != true) {
			document.getElementById('p' + player + 'ComDisplay').classList.remove('visibleAnimation');
			document.getElementById('p' + player + 'ComDisplay').classList.add('hiddenAnimation');
		} else {
			document.getElementById('p' + player + 'ComDisplay').style.opacity = '0';
		}
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

	hideChars.push(document.querySelectorAll('.warioSpan'));
	hideChars.push(document.querySelectorAll('.daisySpan'));
	hideChars.push(document.querySelectorAll('.rosalinaSpan'));
	hideChars.push(document.querySelectorAll('.toadSpan'));
	hideChars.push(document.querySelectorAll('.toadetteSpan'));
	hideChars.push(document.querySelectorAll('.waluigiSpan'));
	hideChars.push(document.querySelectorAll('.dkSpan'));
	hideChars.push(document.querySelectorAll('.diddySpan'));
	hideChars.push(document.querySelectorAll('.birdoSpan'));
	hideChars.push(document.querySelectorAll('.bowserSpan'));
	hideChars.push(document.querySelectorAll('.bowserjrSpan'));
	hideChars.push(document.querySelectorAll('.koopakidSpan'));
	hideChars.push(document.querySelectorAll('.pompomSpan'));
	hideChars.push(document.querySelectorAll('.goombaSpan'));
	hideChars.push(document.querySelectorAll('.koopaSpan'));
	hideChars.push(document.querySelectorAll('.drybonesSpan'));
	hideChars.push(document.querySelectorAll('.montySpan'));
	hideChars.push(document.querySelectorAll('.booSpan'));
	hideChars.push(document.querySelectorAll('.spikeSpan'));
	hideChars.push(document.querySelectorAll('.blooperSpan'));
	hideChars.push(document.querySelectorAll('.shyguySpan'));
	hideChars.push(document.querySelectorAll('.hammerbroSpan'));
	hideChars.push(document.querySelectorAll('.kamekSpan'));

	hideCounters.push(document.querySelectorAll('.mp6C'));
	hideCounters.push(document.querySelectorAll('.mp7C'));
	hideCounters.push(document.querySelectorAll('.mp8C'));
	hideCounters.push(document.querySelectorAll('.mp9C'));
	hideCounters.push(document.querySelectorAll('.mpDSC'));
	hideCounters.push(document.querySelectorAll('.mpsrC'));
	hideCounters.push(document.querySelectorAll('.smpC'));

	showChars.push(document.querySelectorAll('.marioSpan'));
	showChars.push(document.querySelectorAll('.luigiSpan'));
	showChars.push(document.querySelectorAll('.peachSpan'));
	showChars.push(document.querySelectorAll('.yoshiSpan'));
	if (game != 'mpa') {
		showChars.push(document.querySelectorAll('.warioSpan'));
	}

	if (game == 'mp1' || game == 'mp2' || game == 'mp3' || game == 'mp4' || game == 'mp4' || game == 'mp10' || game == 'mpsr' || game == 'smp' || game == 'all') {
		showChars.push(document.querySelectorAll('.dkSpan'));
	}
	if (game == 'mp3' || game == 'mp4' || game == 'mp5' || game == 'mp6' || game == 'mp7' || game == 'mp8' || game == 'mp9' || game == 'mp10' || game == 'mpds' || game == 'mpit' || game == 'mpsr' || game == 'mptt100' || game == 'smp' || game == 'all') {
		showChars.push(document.querySelectorAll('.waluigiSpan'));
		showChars.push(document.querySelectorAll('.daisySpan'));
	}
	if (game == 'mp6' || game == 'all') {
		showChars.push(document.querySelectorAll('.koopakidSpan'));
		showCounters.push(document.querySelectorAll('.mp6C'));
	}
	if (game == 'mp6' || game == 'mp7' || game == 'mp8') {
		showChars.push(document.querySelectorAll('.booSpan'));
		showChars.push(document.querySelectorAll('.toadetteSpan'));
	}
	if (game == 'mp6' || game == 'mp7' || game == 'mp8' || game == 'mp9' || game == 'mp10' || game == 'mpds' || game == 'mpit' || game == 'mpsr' || game == 'all')  {
		showChars.push(document.querySelectorAll('.toadSpan'));
	}
	if (game == 'mp7' || game == 'mp8' || game == 'all') {
		showChars.push(document.querySelectorAll('.birdoSpan'));
		showChars.push(document.querySelectorAll('.drybonesSpan'));
	}
	if (game == 'mp7' || game == 'all') {
		showCounters.push(document.querySelectorAll('.mp7C'))
	}
	if (game == 'mp8') {
		showChars.push(document.querySelectorAll('.blooperSpan'))
		showChars.push(document.querySelectorAll('.hammerbroSpan'))
		showCounters.push(document.querySelectorAll('.mp8C'))
	}
	if (game == 'mp9') {
		showChars.push(document.querySelectorAll('.koopaSpan'));
		showChars.push(document.querySelectorAll('.shyguySpan'));
		showChars.push(document.querySelectorAll('.kamekSpan'));
		showChars.push(document.querySelectorAll('.birdoSpan'));
		showCounters.push(document.querySelectorAll('.mp9C'));
	}
	if (game == 'mp9' || game == 'mp10' || game == 'mpsr' || game == 'mptt100') {
		hideCounters.push(document.querySelectorAll('.happeningC'));
	} else {
		showCounters.push(document.querySelectorAll('.happeningC'));
	}
	if (game == 'mp6' || game == 'mp7' || game == 'mp8' || game == 'mp9' || game == 'mp10' || game == 'mpds' || game == 'mpsr' || game == 'mptt100') {
		hideCounters.push(document.querySelectorAll('.coinStarC'));
	} else {
		showCounters.push(document.querySelectorAll('.coinStarC'));
	}
	if (game == 'smp' || game ==  'all') {
		showChars.push(document.querySelectorAll('.koopaSpan'));
		showChars.push(document.querySelectorAll('.shyguySpan'));
	}
	if (game == 'mp10' || game == 'all') {
		showChars.push(document.querySelectorAll('.rosalinaSpan'));
		showChars.push(document.querySelectorAll('.spikeSpan'));
		showChars.push(document.querySelectorAll('.toadetteSpan'));
	}
	if (game == 'mp10' || game == 'all') {
		showChars.push(document.querySelectorAll('.rosalinaSpan'));
		showChars.push(document.querySelectorAll('.spikeSpan'));
		showChars.push(document.querySelectorAll('.toadetteSpan'));
		showCounters.push(document.querySelectorAll('.mp10C'));
	}
	if (game == 'mpds' || game == 'all') {
		showCounters.push(document.querySelectorAll('.mpDSC'));
	}
	if (game == 'mpit' || game == 'mpsr' || game == 'mptt100' || game == 'smp') {
		showChars.push(document.querySelectorAll('.rosalinaSpan'));
	}
	if (game == 'mpit') {
		showChars.push(document.querySelectorAll('.booSpan'));
		showChars.push(document.querySelectorAll('.bowserjrSpan'));
	}
	if (game == 'mpsr') {
		showChars.push(document.querySelectorAll('.toadetteSpan'));
		showChars.push(document.querySelectorAll('.diddySpan'));
		showCounters.push(document.querySelectorAll('.mpsrC'));
	}
	if (game == 'mpsr' || game == 'mptt100') {
		hideCounters.push(document.querySelectorAll('.minigameC'));
	} else {
		showCounters.push(document.querySelectorAll('.minigameC'));
	}
	if (game == 'mptt100') {
		showCounters.push(document.querySelectorAll('.mpsrC'));
	}
	if (game == 'smp' || game == 'all') {
		showChars.push(document.querySelectorAll('.bowserSpan'));
		showChars.push(document.querySelectorAll('.goombaSpan'));
		showChars.push(document.querySelectorAll('.montySpan'));
		showChars.push(document.querySelectorAll('.diddySpan'));
		showChars.push(document.querySelectorAll('.bowserjrSpan'));
		showChars.push(document.querySelectorAll('.booSpan'));
		showChars.push(document.querySelectorAll('.hammerbroSpan'));
		showChars.push(document.querySelectorAll('.drybonesSpan'));
		showChars.push(document.querySelectorAll('.pompomSpan'));
		showCounters.push(document.querySelectorAll('.smpC'));
	}
	if (game == 'all') {
		showChars.push(document.querySelectorAll('.blooperSpan'));
		showChars.push(document.querySelectorAll('.kamekSpan'));
		showCounters.push(document.querySelectorAll('.mp8C'));
		showCounters.push(document.querySelectorAll('.mp9C'));
		showCounters.push(document.querySelectorAll('.mpsrC'));
	}

	if (game == 'mpa' || game == 'mpit') {
		showCounters.push(document.querySelectorAll('.mp6C'));
		showCounters.push(document.querySelectorAll('.mp7C'));
		showCounters.push(document.querySelectorAll('.mp8C'));
		showCounters.push(document.querySelectorAll('.mp9C'));
		showCounters.push(document.querySelectorAll('.mp10C'));
		showCounters.push(document.querySelectorAll('.mpDSC'));
		showCounters.push(document.querySelectorAll('.mpsrC'));
		showCounters.push(document.querySelectorAll('.smpC'));

		document.getElementById('counterError').style = '';
	} else {
		document.getElementById('counterError').style = 'display: none;';
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
	if (getValue('deactivateUnused') == true) {
		deactivateUnused();
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
			editInner('spinSpaceOnOffText', 'Spin:');
			editInner('minusOnOffText', 'Minus:');
			editInner('specialDiceOnOffText', 'Dice Block:');
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
		case 'mptt100':
			editInner('minigameOnOffText', 'Champion:');
			editInner('runningOnOffText', 'Sightseer:');
			editInner('slowOnOffText', 'Slowpoke:');
			editInner('itemOnOffText', 'Item:');
			editInner('balloonOnOffText', 'Balloon:');
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
			editInner('itemOnOffText', 'Item/Orb/Candy (6-8, DS-SMP):');
			editInner('friendSpaceOnOffText', 'Friendship (DS):');
			editInner('hexOnOffText', 'Hex (DS):');
			editInner('balloonOnOffText', 'Balloon (SR, TT100):');
			editInner('spinSpaceOnOffText', 'Spin (9):');
			editInner('minusOnOffText', 'Minus (9, 10):');
			editInner('specialDiceOnOffText', 'Dice Block (9, 10):');
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
		document.getElementById(counters[num] + 'OnOffText').style.color = 'unset';
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
		document.getElementById(cStats[num] + 'OnOffText').style.color = '#009f00';
		if (getComputedStyle(document.getElementById(cStats[num] + 'OnOffText'), null).visibility != 'visible') {
			cStatsHidden.push(cStats[num]);
		}
	}
	if (parseInt(getInner('coinStarText')) != 10) {
		if (getComputedStyle(document.getElementById('coinStarOnOffText'), null).visibility != 'visible') {
			cStatsHidden.push('coinStar');
		} else {
			document.getElementById('coinStarOnOffText').style.color = '#009f00';
		}
	} else {
		document.getElementById('coinStarOnOffText').style.color = 'unset';
	}

	if (cStatsHidden.length > 0) {
		for (var num = 0; num < cStatsHidden.length; num++) {
			var str = cStatsHidden[num];
			str = str.replace(/([A-Z])/g, ' $1');
			str = str.charAt(0).toUpperCase() + str.slice(1);
			cStatsHidden[num] = str;
		}
		editInner('hiddenCountersText', 'Counters from other games with stats: <span  style="color: #009f00;">' + cStatsHidden.join(', ') + '</span>');
	} else {
		editInner('hiddenCountersText', '');
	}
}

/*
* Deactivates all counters not used by the current game.
*/
function deactivateUnused () {
	var unused;
	switch (curGame) {
		case 'mp1':
		case 'mp2':
		case 'mp3':
		case 'mp4':
		case 'mp5':
			unused = ['redSpace', 'running', 'slow', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp6':
			unused = ['coinStar', 'redSpace', 'running', 'slow', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp7':
			unused = ['coinStar', 'slow', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp8':
			unused = ['coinStar', 'slow', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mp9':
			unused = ['coinStar', 'redSpace', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'ally', 'stompy', 'doormat'];
			break;
		case 'mp10':
			unused = ['coinStar', 'redSpace', 'shopping', 'item', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'ally', 'stompy', 'doormat', 'miniStars'];
			break;
		case 'mpds':
			unused = ['coinStar', 'redSpace', 'slow', 'shopping', 'balloon', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'mpsr':
		case 'mptt100':
			unused = ['coinStar', 'happening', 'minigame', 'redSpace', 'shopping', 'friendSpace', 'hex', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'miniStars', 'bananas'];
			break;
		case 'smp':
			unused = ['shopping', 'friendSpace', 'hex', 'balloon', 'spinSpace', 'minus', 'specialDice', 'miniStars', 'bananas'];
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
* Gets a random number in a specified range and checks if it's a duplicate.
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
			num = -1;
		}
	}
	pastResults.push(result);
	return result;
}

/*
* Randomly selects characters based on games.
*/
function randomChar () {
	var result = '';
	pastResults = [];
	var chars = [''];
	var rdmChars = [];

	if (curGame == 'mp1' || curGame == 'mp2') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(6);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'wario', 'dk'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mp3' || curGame == 'mp4') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(8);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'wario', 'waluigi', 'dk'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mp5') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(7);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'wario', 'waluigi'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mp6') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(11);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'toadette', 'wario', 'waluigi', 'koopakid', 'boo'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mp7') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'toadette', 'wario', 'waluigi', 'birdo', 'drybones', 'boo'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mp8') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(14);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'toadette', 'wario', 'waluigi', 'birdo', 'drybones', 'boo', 'blooper', 'hammerbro'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mp9') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'wario', 'waluigi', 'birdo', 'koopa', 'shyguy', 'kamek'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mp10') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'spike'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mpa') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(4);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mpds') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(8);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'wario', 'waluigi'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mpit') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(10);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'toad', 'wario', 'waluigi', 'boo', 'bowserjr'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mpsr') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(12);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'diddy'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'mptt100') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(8);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'wario', 'waluigi'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'smp') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(20);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'wario', 'waluigi', 'dk', 'diddy', 'bowser', 'bowserjr', 'pompom', 'goomba', 'koopa', 'drybones', 'monty', 'boo', 'shyguy', 'hammerbro'];
			chars.push(rdmChars[result]);
		}
	} else if (curGame == 'all') {
		for (var num = 1; num < 5; num++) {
			result = randomCharFor(27);
			rdmChars = ['mario', 'luigi', 'yoshi', 'peach', 'daisy', 'rosalina', 'toad', 'toadette', 'wario', 'waluigi', 'dk', 'diddy', 'birdo', 'bowser', 'bowserjr', 'koopakid', 'pompom', 'goomba', 'koopa', 'drybones', 'monty', 'boo', 'spike', 'blooper', 'shyguy', 'hammerbro', 'kamek'];
			chars.push(rdmChars[result]);
		}
	}
	for (var num = 1; num < 5; num++) {
		//console.log(chars + num);
		//editValue(chars[num] + num, true);
		document.getElementById(chars[num] + num).scrollIntoView(true);
		changeCharacters(num, chars[num]);
		if (popout === true) {
			changeSettings('changeCharacters', [num, chars[num]]);
		}
	}
}