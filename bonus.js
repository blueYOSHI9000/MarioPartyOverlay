/*
* Shows/hides relevant bonus stars depending on game,
*
* @param {string} game The game.
* @param {boolean} keepHash If true the URL hash (location.hash) will not be removed. Hash will always be kept if it's not one of the bonus stars.
*/
function changeGame (game, keepHash) {
	getElem('noBonusError').style.visibility = 'hidden';

	if (game != 'all') {
		var hideGames = document.querySelectorAll('.bonusStarContainer');
		for (let num = 0; num < hideGames.length; num++) {
			hideGames[num].style.display = 'none';
		}
	}
	var showGames = [];

	switch (game) {
		case 'mp1':
		case 'mp2':
		case 'mp3':
		case 'mp4':
		case 'mp5':
			showGames.push('happening');
			showGames.push('minigame');
			showGames.push('coin');
			break;
		case 'mp6':
			showGames.push('happening');
			showGames.push('minigame');
			showGames.push('item');
			break;
		case 'mp7':
		case 'mp8':
			showGames.push('happening');
			showGames.push('minigame');
			showGames.push('red');
			showGames.push('running');
			showGames.push('shopping');
			showGames.push('item');
			break;
		case 'mp9':
			showGames.push('item');
			showGames.push('spin');
		case 'mp10':
			showGames.push('minigame');
			showGames.push('running');
			showGames.push('slow');
			showGames.push('minus');
			break;
		case 'mpds':
			showGames.push('happening');
			showGames.push('minigame');
			showGames.push('running');
			showGames.push('item');
			showGames.push('friendship');
			showGames.push('hex');
			break;
		case 'mpsr':
			showGames.push('loner');
			showGames.push('duel');
			showGames.push('wanderer');
			showGames.push('buddy');
		case 'mptt100':
			showGames.push('minigame');
			showGames.push('running');
			showGames.push('slow');
			showGames.push('item');
			showGames.push('unused');
			showGames.push('balloon');
			showGames.push('almost');
			break;
		case 'smp':
			showGames.push('happening');
			showGames.push('minigame');
			showGames.push('coin');
			showGames.push('red');
			showGames.push('running');
			showGames.push('slow');
			showGames.push('item');
			showGames.push('buddy');
			showGames.push('ally');
			showGames.push('stompy');
			showGames.push('doormat');
			break;
		case 'mpa':
		case 'mpit':
			getElem('noBonusError').style.visibility = 'visible';
			break;
		case 'mps':
		case 'smpj':
			showGames.push('happening');
			showGames.push('minigame');
			showGames.push('coin');
			showGames.push('red');
			showGames.push('running');
			showGames.push('slow');
			showGames.push('shopping');
			showGames.push('item');
			showGames.push('bowser');
			break;
		default:
			nodelist = document.querySelectorAll('.bonusStarContainer');
			for (let num = 0; num < nodelist.length; num++) {
				showGames.push(nodelist[num].id);
			}
	}

	if (keepHash === true || location.hash === '#explanation' || location.hash === '#bonusStars' || location.hash === '#credits') {
		history.replaceState(null, document.title, '?game=' + game + location.hash);
	} else {
		history.replaceState(null, document.title, '?game=' + game);
	}

	for (let num = 0; num < showGames.length; num++) {
		getElem(showGames[num]).style.display = 'block';

		var def = document.querySelector('#' + showGames[num] + ' .sub-' + game);
		if (def === null)
			var def = document.querySelector('#' + showGames[num] + ' .sub-all');
		var title = document.querySelector('#' + showGames[num] + ' .sub-title');

		if (title != null && def != null) {
			title.title = def.title;
			title.innerHTML = def.innerHTML.substring(2);

			var elems = title.parentNode.children[1].children;
			for (let num2 = 0; num2 < elems.length; num2++) {
				elems[num2].style.display = 'inline';
			}
			def.style.display = 'none';
		}
	}
}

/*
* Changes Themes incl. greenscreen.
*
* @param {string} theme Which theme should be used.
* @param {string} theme What color should be used.
* @param {boolean} greenscreen If greenscreen should be used.
*/
function changeTheme (theme, color, greenscreen) {
	if (greenscreen === true) {
		document.querySelector('html').style.backgroundImage = 'unset';
		document.querySelector('html').style.backgroundColor = color;
	} else {
		document.querySelector('html').style.backgroundImage = 'url("img/bgs/' + theme + '.jpg"), url("img/bgs/default.jpg")';
		document.querySelector('html').style.backgroundColor = 'unset';
	}
}

/*
* Checks if Ctrl & Shift is pressed.
*/
function keyPressed (e) {
	if (e.key === 'Enter') {
		var focused = document.activeElement;
		if (focused.tagName === 'LABEL') {
			var elem = getElem(focused.getAttribute('for'));
			editValue(elem.id, true);
			eval(elem.getAttribute('onchange'));
		}
	}
}

window.onkeydown = keyPressed;

/*
* Checks if the URL specifies a specific game or if a theme should be used.
*/
function startup () {
	var game = getUrl('game');
	if (game != false) {
		try {
			changeGame(game, true);
			editValue(game, true);
		} catch {
			changeGame('all');
			editValue('all', true);
		}
	}

	if (location.hash != '') {
		getElem(location.hash.substring(1)).scrollIntoView();
	}

	try {
		var settings = JSON.parse(localStorage.getItem('settings'));
		var theme = settings.theme;
		changeTheme(settings.theme, settings.bgColor, settings.greenscreen)
	} catch {}
}

window.onload = startup();