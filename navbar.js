var activeNv = null;
/*
* Gets called whenever a navbar dropdown is opened.
*
* @param {DOM element} elem The element it got called from.
*/
function showNavBar (elem) {
	if (elem.classList.contains('nvSelected')) {
		elem.classList.remove('nvSelected');

		if (elem.id === 'nvAssist') {
			getElem('nvAssistPin').classList.remove('nvAssistTitlebarIcons_selected');
		}

		closeNavbar(true);

		activeNv = null;
		return;
	}

	//if (activeNv != null && activeNv != undefined) {
		if (activeNv === 'navbarChars' && elem.classList[0] === 'nvChar') {} else {
			closeNavbar(true);
		}
	//}

	var elems = document.querySelectorAll('.nvSelected');
	for (let num = 0; num < elems.length; num++) {
		if (elems[num] != null) {
			if (elems[num].id != 'nvAssist' || (elems[num].id === 'nvAssist' && getElem('nvAssistPin').classList.contains('nvAssistTitlebarIcons_selected') != true)) {
				elems[num].classList.remove('nvSelected');
			}
		}
	}

	getElem('navbarChars').classList.remove('nvContentLeftTransition');
	if (elem.id != 'nvAction' && elem.id != 'nvAmount' && elem.id != 'nvCounters')
		elem.classList.add('nvSelected');

	switch (elem.classList[0]) {
		case 'nvChar':
			showNvChar(elem); //function might not be needed
			var nvElem = getElem('navbarChars');
			break;
		case 'nvGames':
			if (activeNv != 'navbarGames') {
				activeNv = 'navbarGames';
				getElem('navbarGames').style.height = getElem('navbarGames').scrollHeight + 'px';
			}
			getElem('navbarGames').style.left = elem.getBoundingClientRect().left + 'px';

			if (document.querySelector('.nvGamesSelected') != null)
				document.querySelector('.nvGamesSelected').classList.remove('nvGamesSelected');
			getElem('nv' + curGame).classList.add('nvGamesSelected');

			var nvElem = getElem('navbarGames');
			break;
		case 'nvCounters':
			openSettings();
			callOnBoth('showHideSettings', ['counter']);
			break;
		case 'nvAction':
			switchAction();
			switchAction(true);
			break;
		case 'nvAmount':
			switch (globalActions.ogAmount) {
				case 1:
					globalActions.ogAmount = 5;
					break;
				case 5:
					globalActions.ogAmount = 10;
					break;
				default:
					globalActions.ogAmount = 1;
			}
			updateAmount();
			break;
		case 'nvAssist':
			if (activeNv != 'navbarAssist') {
				activeNv = 'navbarAssist';
				getElem('navbarAssist').style.height = getElem('navbarAssist').scrollHeight + 'px';
			}
			getElem('navbarAssist').style.left = elem.getBoundingClientRect().left + 'px';

			var nvElem = getElem('navbarAssist');
			break;
		case 'nvSettings':
			if (shiftKeyVar === true) {
				elem.classList.remove('nvSelected');
				activeNv = null;
				textOutput(true);
			} //dont return in case both shift an ctrl are held
			if (ctrlKeyVar === true) {
				elem.classList.remove('nvSelected');
				activeNv = null;
				openSettings();
				return;
			}
			if (shiftKeyVar === true)
				return;

			if (activeNv != 'navbarSettings') {
				activeNv = 'navbarSettings';
				getElem('navbarSettings').style.height = getElem('navbarSettings').scrollHeight + 'px';
			}
			getElem('navbarSettings').style.left = elem.getBoundingClientRect().left + 'px';

			var nvElem = getElem('navbarSettings');
			break;
	}
	if (typeof nvElem === 'undefined')
		return;

	nvElem.style.overflow = '';

	var offWidth = nvElem.offsetWidth; //get width of squished element
	nvElem.style.width = 'max-content'; //use max-content so it expands to its supposed size

	var rect = nvElem.getBoundingClientRect(); //get height/width and position of element
	var finalWidth = nvElem.offsetWidth + 1; //get new width of its full size
	var winWidth = window.innerWidth;

	if (rect.right + 1 > winWidth) { //check if parts of the element is offscreen
		if (finalWidth > winWidth) { //when element is bigger than screen
			nvElem.style.left = 0;
			nvElem.style.overflow = 'auto hidden';
			nvElem.children[0].style.width = offWidth + 1 + 'px';
			nvElem.style.width = winWidth + 'px';

			nvElem.style.height = nvElem.children[0].offsetHeight + 12 + 'px';
		} else { //when element is just offscreen
			//following line is somehow fucked in firefox
			//one line in showNvChar() also has something to do with this (getElem('navbarChars').style.left = elem.getBoundingClientRect().left + 'px';)
			//firefox produces different results if either of those lines are stepped through
			//without stepping through character navbar dropdowns won't move to other players
			//chrome gives same results regardless if debugger or not
			nvElem.style.left = winWidth - finalWidth + 'px';
			nvElem.style.height = nvElem.children[0].offsetHeight + 'px';
		}
	}
	setTimeout(function () {nvElem.style.height = 'auto';}, 500);
}

/*
* Switches the action between addition and subtraction.
*
* @param {boolean} og Switch the og variable instead of the global one.
*/
function switchAction (og) {
	if (og === true) {
		og = 'ogAction';
	} else {
		og = 'action';
	}

	if (globalActions[og] === 'p') {
		globalActions[og] = 'm';
	} else {
		globalActions[og] = 'p';
	}

	if (og != true) {
		if (globalActions.action === 'm') {
			editInner('nvActionIcon', '-');
			editInner('nvActionText', 'Sub.');
		} else {
			editInner('nvActionIcon', '+');
			editInner('nvActionText', 'Add');
		}
	}
}

/*
* Changes the amount when shift is pressed;
*/
function updateAmount () {
	if (shiftKeyVar === true) {
		switch (globalActions.ogAmount) {
			case 1:
				globalActions.amount = 5;
				break;
			case 5:
				globalActions.amount = 1;
				break;
			case 10:
				globalActions.amount = 1;
				break;
		}
	} else {
		globalActions.amount = globalActions.ogAmount;
	}
	editInner('nvAmountText', globalActions.amount);
}

/*
* Closes the currently opened navbar dropdown.
*
* @param {boolean} force Runs the function regardless if theres an active navbar or not.
*/
function closeNavbar (force) {
	if (activeNv === null && force != true)
		return;

	var assistPin = getElem('nvAssistPin').classList.contains('nvAssistTitlebarIcons_selected'); //if true assist navbar is pinned

	//set height so it's not 'auto' anymore to use transitions
	getElem('navbarChars').style.height = getElem('navbarChars').children[0].offsetHeight + 'px';
	getElem('navbarGames').style.height = getElem('navbarGames').children[0].offsetHeight + 'px';
	getElem('navbarAssist').style.height = getElem('navbarAssist').children[0].offsetHeight + 'px';
	getElem('navbarSettings').style.height = getElem('navbarSettings').children[0].offsetHeight + 'px';

	//browsers are really weird and settings navbar wont close with a transition if this isn't here
	window.getComputedStyle(getElem('navbarSettings')).getPropertyValue('height');

	getElem('navbarChars').style.height = 0;
	getElem('navbarGames').style.height = 0;
	getElem('navbarSettings').style.height = 0;

	getElem('navbarChars').style.width = '';
	getElem('navbarChars').children[0].style.width = '';
	getElem('navbarGames').style.width = '';
	getElem('navbarSettings').style.width = '';

	//dont close assist if pinned
	if (assistPin != true) {
		getElem('navbarAssist').style.height = 0;
		getElem('navbarAssist').style.width = '';
	}

	getElem('nvSettingsConfirm').style.display = 'none';
	getElem('nvSettingsReset').style.display = 'block';

	var elems = document.querySelectorAll('.nvSelected');
	for (let num = 0; num < elems.length; num++) {
		if (elems[num] != null) {
			if (elems[num].id != 'nvAssist' || (elems[num].id === 'nvAssist' && getElem('nvAssistPin').classList.contains('nvAssistTitlebarIcons_selected') != true)) {
				elems[num].classList.remove('nvSelected');
			}
		}
	}

	//reset drag n drop position
	if (assistPin != true) {
		setTimeout(function () {
			var elems = document.querySelectorAll('.navbarDraggable');
			for (let num = 0; num < elems.length; num++) {
				elems[num].removeAttribute('data-x');
				elems[num].removeAttribute('data-y');
				elems[num].style.transform = 'unset';
			}
		}, 350);
	}

	//savePlayers(); //not needed anymore, everything auto-saves now

	activeNv = null;
}

/*
* Updates the navbar icons for a certain player.
*
* @param {number} player The player that should be updated.
*/
function updateNavbar (player) {
	if (player === undefined)
		return;

	var elem = getElem('nvChar' + player);
	elem.children[1].src = 'img/' + curGame + '/' + characters[player] + '.png';

	if (getValue('com' + player) != true) {
		getElem('nvCom' + player).style.opacity = 0;
	} else {
		getElem('nvCom' + player).style.opacity = 1;
	}
}

/*
* Updates the Navbar game.
*/
function updateNvGame () {
	if (curGame === 'all') {
		getElem('nvGameImg').style.display = 'none';
		getElem('nvGameAll').style.display = 'inline-block';
	} else {
		getElem('nvGameImg').style.backgroundImage = 'url(img/' + curGame + '.png)';
		getElem('nvGameImg').style.display = 'inline-block';
		getElem('nvGameAll').style.display = 'none';
	}
}

/*
* Shows the character navbar dropdown.
*
* @param {DOM element} elem The initial element that opened the fropdown.
*/
function showNvChar (elem) {
	var elems = document.querySelectorAll('.nvCharSelected');
	for (let num = 0; num < elems.length; num++) {
		elems[num].classList.remove('nvCharSelected');
	}

	getElem('nvCharPlayer1').style.display = 'none';
	getElem('nvCharPlayer2').style.display = 'none';
	getElem('nvCharPlayer3').style.display = 'none';
	getElem('nvCharPlayer4').style.display = 'none';

	setNvPlayer(1);
	setNvPlayer(2);
	setNvPlayer(3);
	setNvPlayer(4);

	if (activeNv != 'navbarChars') {
		activeNv = 'navbarChars';
		getElem('navbarChars').style.height = getElem('navbarChars').scrollHeight + 'px';
	} else {
		getElem('navbarChars').classList.add('nvContentLeftTransition');
	}

	getElem('navbarChars').style.left = elem.getBoundingClientRect().left + 'px'; //view comment at the end of showNavBar()

	var player = elem.id[elem.id.length - 1];
	getElem('navbarChars').setAttribute('player', player);
	getElem('nvPlayerImg').src = 'img/p' + player + '.png';

	if (getValue('com' + player) === true) {
		getElem('nvComImg').classList.add('nvComSelected');
	} else {
		getElem('nvComImg').classList.remove('nvComSelected');
	}
}

/*
* Updates the character navbar dropdown.
*/
function updateNvChar () { //actually use this now
	editInner('nvCharList', '');

	getElem('nvComImg').src = 'img/' + curGame + '/com.png';

	switch (curGame) {
		case 'mp1':
		case 'mp2':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			cElem('br', 'nvCharList');
			addNvChar('yoshi');
			addNvChar('wario');
			addNvChar('dk');
			break;
		case 'mp3':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('daisy');
			cElem('br', 'nvCharList');
			addNvChar('yoshi');
			addNvChar('wario');
			addNvChar('dk');
			addNvChar('waluigi');
			break;
		case 'mp4':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('yoshi');
			cElem('br', 'nvCharList');
			addNvChar('wario');
			addNvChar('dk');
			addNvChar('daisy');
			addNvChar('waluigi');
			break;
		case 'mp5':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('yoshi');
			addNvChar('peach');
			cElem('br', 'nvCharList');
			var brElem = cElem('span', 'nvCharList'); //to move the bottom row to the center
			brElem.style.display = 'inline-block';
			brElem.style.width = '39.5px';
			addNvChar('wario');
			addNvChar('daisy');
			addNvChar('waluigi');
			break;
		case 'mp6':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('yoshi');
			cElem('br', 'nvCharList');
			var brElem = cElem('span', 'nvCharList'); //to move the bottom row to the center
			brElem.style.display = 'inline-block';
			brElem.style.width = '39.5px';
			addNvChar('wario');
			addNvChar('daisy');
			addNvChar('waluigi');
			cElem('br', 'nvCharList');
			addNvChar('toad');
			addNvChar('boo');
			addNvChar('koopakid');
			addNvChar('toadette');
			break;
		case 'mp7':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('yoshi');
			cElem('br', 'nvCharList');
			addNvChar('wario');
			addNvChar('daisy');
			addNvChar('waluigi');
			addNvChar('toad');
			cElem('br', 'nvCharList');
			addNvChar('boo');
			addNvChar('toadette');
			addNvChar('birdo');
			addNvChar('drybones');
			break;
		case 'mp8':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('yoshi');
			addNvChar('wario');
			addNvChar('daisy');
			addNvChar('waluigi');
			cElem('br', 'nvCharList');
			addNvChar('toad');
			addNvChar('boo');
			addNvChar('toadette');
			addNvChar('birdo');
			addNvChar('drybones');
			addNvChar('blooper');
			addNvChar('hammerbro');
			break;
		case 'mp9':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('daisy');
			addNvChar('wario');
			cElem('br', 'nvCharList');
			addNvChar('waluigi');
			addNvChar('yoshi');
			addNvChar('birdo');
			addNvChar('toad');
			addNvChar('koopa');
			break;
		case 'mp10':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('toad');
			addNvChar('yoshi');
			addNvChar('toadette');
			addNvChar('spike');
			cElem('br', 'nvCharList');
			addNvChar('wario');
			addNvChar('waluigi');
			addNvChar('daisy');
			addNvChar('rosalina');
			addNvChar('dk');
			break;
		case 'mpa':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('yoshi');
			break;
		case 'mpds':
			addNvChar('mario');
			addNvChar('peach');
			cElem('br', 'nvCharList');
			addNvChar('luigi');
			addNvChar('daisy');
			cElem('br', 'nvCharList');
			addNvChar('wario');
			addNvChar('waluigi');
			cElem('br', 'nvCharList');
			addNvChar('yoshi');
			addNvChar('toad');
			break;
		case 'mpit':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('daisy');
			addNvChar('wario');
			cElem('br', 'nvCharList');
			addNvChar('waluigi');
			addNvChar('yoshi');
			addNvChar('boo');
			addNvChar('toad');
			addNvChar('bowserjr');
			break;
		case 'mpsr':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('daisy');
			addNvChar('wario');
			addNvChar('waluigi');
			cElem('br', 'nvCharList');
			addNvChar('yoshi');
			addNvChar('toad');
			addNvChar('toadette');
			addNvChar('rosalina');
			addNvChar('dk');
			addNvChar('diddy');
			break;
		case 'mptt100':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('daisy');
			cElem('br', 'nvCharList');
			addNvChar('wario');
			addNvChar('waluigi');
			addNvChar('yoshi');
			addNvChar('rosalina');
			break;
		case 'smp':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('peach');
			addNvChar('daisy');
			addNvChar('wario');
			addNvChar('waluigi');
			addNvChar('yoshi');
			addNvChar('rosalina');
			addNvChar('dk');
			addNvChar('diddy');
			cElem('br', 'nvCharList');
			addNvChar('bowser');
			addNvChar('goomba');
			addNvChar('shyguy');
			addNvChar('koopa');
			addNvChar('monty');
			addNvChar('bowserjr');
			addNvChar('boo');
			addNvChar('hammerbro');
			addNvChar('drybones');
			addNvChar('pompom');
			break;
		case 'all':
			addNvChar('mario');
			addNvChar('luigi');
			addNvChar('yoshi');
			addNvChar('peach');
			addNvChar('daisy');
			addNvChar('rosalina');
			cElem('br', 'nvCharList');
			addNvChar('toad');
			addNvChar('toadette');
			addNvChar('wario');
			addNvChar('waluigi');
			addNvChar('dk');
			addNvChar('diddy');
			addNvChar('birdo');
			cElem('br', 'nvCharList');
			cElem('br', 'nvCharList');
			cElem('br', 'nvCharList');
			addNvChar('bowser');
			addNvChar('bowserjr');
			addNvChar('koopakid');
			addNvChar('pompom');
			addNvChar('goomba');
			addNvChar('koopa');
			addNvChar('drybones');
			cElem('br', 'nvCharList');
			addNvChar('monty');
			addNvChar('boo');
			addNvChar('spike');
			addNvChar('blooper');
			addNvChar('shyguy');
			addNvChar('hammerbro');
			addNvChar('kamek');
			break;
	}
}

/*
* Sets the player icons for the character dropdown.
*
* @param {number} player Which player.
* @param {string} character Which character.
*/
function setNvPlayer (player, character) {
	if (typeof character === 'undefined')
		character = characters[player];

	var elem = document.querySelector('#nvCharList img[character=' + character + ']');

	if (elem === null)
		return;

	elem.classList.add('nvCharSelected');

	getElem('nvCharPlayer' + player).style.display = 'inline-block';

	switch (player) {
		case 1:
			getElem('nvCharPlayer1').style.left = elem.offsetLeft + 'px';
			getElem('nvCharPlayer1').style.top = elem.offsetTop + 'px';
			return;
		case 2:
			getElem('nvCharPlayer2').style.left = 'calc(' + elem.offsetLeft + 'px + 70px - 36.66px)';
			getElem('nvCharPlayer2').style.top = elem.offsetTop + 'px';
			return;
		case 3:
			getElem('nvCharPlayer3').style.left = elem.offsetLeft + 'px';
			getElem('nvCharPlayer3').style.top = elem.offsetTop + 50 + 'px';
			return;
		case 4:
			getElem('nvCharPlayer4').style.left = 'calc(' + elem.offsetLeft + 'px + 70px - 36.66px)'; //calc() is required since it doesn't work if we calculate it in JS
			getElem('nvCharPlayer4').style.top = elem.offsetTop + 50 + 'px';
			return;
	}
}

/*
* Adds a character to the character dropdown.
*
* @param {string} char The character.
*/
function addNvChar (char) {
	var elem = cElem('img', 'nvCharList');
	elem.src = 'img/' + curGame + '/' + char + '.png';
	elem.setAttribute('character', char);
	elem.setAttribute('onclick', 'nvChangeChar(this)');
	elem.setAttribute('onerror', 'imgError(this)');
}

/*
* Changes the character when activated through the navbar dropdown.
*
* @param {DOM element} elem The element it got called from.
*/
function nvChangeChar (elem) {
	var char = elem.getAttribute('character');
	for (let num = 1; num < 5; num++) {
		if (char === characters[num] && ctrlKeyVar != true)
			return;
	}
	callOnBoth('changeCharacters', [parseInt(getElem('navbarChars').getAttribute('player')), char]);
	closeNavbar();
}

/*
* Changes the COM status of a player.
*
* @param {number} player The player, not needed when activated through the dropdown.
*/
function nvChangeCom (player) {
	if (player) {} else {
		player = getElem('navbarChars').getAttribute('player');
	}
	callOnBoth('editValue', ['com' + player]);
	callOnBoth('changeCom', [player]);

	getElem('nvComImg').classList.toggle('nvComSelected');
}

/*
* Randomizes character for current player.
*
* @param {number} player The player, not needed when activated through the dropdown.
*/
function nvRando (player) {
	if (ctrlKeyVar === true) {
		randomChar();
		return;
	}
	if (typeof player === 'undefined')
		player = parseInt(getElem('navbarChars').getAttribute('player'));

	//fills pastResults with the current characters position from charList[curGame] and then draws a random character from that same list
	pastResults = [charList[curGame].indexOf(characters[1]), charList[curGame].indexOf(characters[2]), charList[curGame].indexOf(characters[3]), charList[curGame].indexOf(characters[4])];
	var character = charList[curGame][randomCharFor(charList[curGame].length)];
	changeCharacters(player, character);

	getElem(character + player).scrollIntoView({block: 'center'});

	var elems = document.querySelectorAll('.nvCharSelected');
	for (let num = 0; num < elems.length; num++) {
		elems[num].classList.remove('nvCharSelected');
	}

	setNvPlayer(1);
	setNvPlayer(2);
	setNvPlayer(3);
	setNvPlayer(4);
}

/*
* Changes the game.
*
* @param {string} game The game.
*/
function nvChangeGame (game) {
	if (game === curGame)
		return;

	callOnBoth('changeGame', [game]);
	closeNavbar();
}

/*
* Toggles the .nvAssistTitlebarIcons_selected class of an element.
*
* @param {DOM Element} elem The element.
*/
function nvAssistPin (elem) {
	elem.classList.toggle('nvAssistTitlebarIcons_selected');
}