

/*
* Changes characters and their icons depending on the options selected.
* 
* @param {number} player Which player should be changed (only used when changing characters).
* @param {string} character Which character should be used (only used when changing characters).
*/
function changeCharacters (player, character) {
	if (getValue('customCharacterIcons') == true) {
		for (let num = 1; num < 5; num++) {
			if (player == num) {
				characters[num] = character;
				editValue(character + num, true);
			}
			if (curGame != 'all') {
				document.getElementById('p' + num + 'Img').src = 'img/' + curGame + '/' + characters[num].toLowerCase() + '.png';
			} else {
				document.getElementById('p' + num + 'Img').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[num].toLowerCase() + '.png';
			}
		}
	} else {
		for (let num = 1; num < 5; num++) {
			if (player == num) {
				characters[num] = character;
			}
			document.getElementById('p' + num + 'Img').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[num].toLowerCase() + '.png';
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
	if (getValue('customCounterIcons') == true) {
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
						elems2[num2].src = 'img/' + curGame + '/' + counters[num] + '.png';
					} else {
						elems2[num2].src = 'img/' + counters[num] + '.png';
					}
				}
			}
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
	changeCounterIcons();
	changeCharacters();
	changeComImg();
}
var curGame = 'all';
var pastResults = [];

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
		editValue(chars[num] + num, true);
		document.getElementById(chars[num] + num).scrollIntoView(true);
		changeCharacters(num, chars[num]);
	}
}