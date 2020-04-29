var assistInfo = {
	state: 'intro',
	curGame: 'smp',
	board: '',
	order: [''],
	curPlayer: 1, //which players turn it is

	simpleMode: false,
	noCoins: false,

	starPriceMultiplier: 1
}

/*
* Loads the next assist state. Calls loadAssistState().
*/
function updateAssistState () {
	switch (assistInfo.state) {
		case 'intro':
			assistInfo.curGame = curGame; //temporary
			loadAssistState('chooseOrder');
			break;
		case 'chooseOrder':
			assistInfo.board = getValue('assistStageSelect');
			loadAssistState('turn');
			break;
		case 'turn':
			//loadAssistState('minigame');
			break;
	}
}

/*
* Loads the specified assist state.
*
* @param {string} state The state - view updateAssistState() for all available states.
*/
function loadAssistState (state) {
	assistInfo.state = state;

	var elems = document.querySelectorAll('#assistSettings > div');
	updateVisibility(elems, 'hide', true); //hide all divs

	var elems = document.querySelectorAll('#nvAssistMain > div');
	updateVisibility(elems, 'hide', true); //hide all navbar divs

	updateVisibility(   'assist' + capStr(state), null, true); //only show div for current state
	updateVisibility('nv_assist' + capStr(state), null, true);

	switch (state) {
		case 'chooseOrder':
			loadChooseOrder();
			break;
		case 'turn':
			loadTurn();
			break;
	}
}

/*
* Prepares/loads the 'chooseOrder' screen.
*/
function loadChooseOrder () {
	resetChooseOrder();

	for (let num = 1; num < 5; num++) {
		changeCharacterIcon(   'assistChooseP' + num, characters[num]);
		changeCharacterIcon('nv_assistChooseP' + num, characters[num]);
	}

	var boards = copyVar(assist_getBoardList());
	for (let num = 0; num < boards.length; num++) {
		boards[num] = '<option value=' + boards[num] + '>' + boards[num] + '</option>';
	}
	editInner(   'assistStageSelect', boards.join());
	editInner('nv_assistStageSelect', boards.join());
}

var currentChoosePlayerPosition = 1;
/*
* Chooses a character on the 'chooseOrder' screen.
*
* @param {number} player The player that should be chosen.
*/
function chooseOrder (player) {
	if (assistInfo.order.indexOf(player) != -1) { //check if player was already added
		return;
	}

	assistInfo.order.push(player);

	changeCharacterIcon(getElem(   'choose' + currentChoosePlayerPosition).children[1], characters[player], true);
	changeCharacterIcon(getElem('nv_choose' + currentChoosePlayerPosition).children[0], characters[player], true);

	updateVisibility(   'choose' + currentChoosePlayerPosition, 'show');
	updateVisibility('nv_choose' + currentChoosePlayerPosition, 'show');

	currentChoosePlayerPosition++;

	getElem(   'assistChooseP' + player).classList.add('chooseImgSelected');
	getElem('nv_assistChooseP' + player).classList.add('chooseImgSelected');

	if (currentChoosePlayerPosition >= 5) {
		currentChoosePlayerPosition = 4;
		updateVisibility(   'chooseContinue', 'show');
		updateVisibility('nv_chooseContinue', 'show');
		return;
	}

	if (currentChoosePlayerPosition === 4) { //automatically select the last player
		for (let num = 1; num < 5; num++) {
			if (assistInfo.order.indexOf(num) === -1) {
				chooseOrder(num);
			}
		}
	}
}

/*
* Resets the currently chosen order on the 'chooseOrder' screen.
* Should not be used otherwise unless a new order can be selected.
*/
function resetChooseOrder () {
	assistInfo.order = [''];
	currentChoosePlayerPosition = 1;
	updateVisibility(   'chooseContinue', 'hide');
	updateVisibility('nv_chooseContinue', 'hide');

	for (let num = 1; num < 5; num++) {
		getElem(   'assistChooseP' + num).classList.remove('chooseImgSelected');
		getElem('nv_assistChooseP' + num).classList.remove('chooseImgSelected');

		updateVisibility(   'choose' + num, 'hide');
		updateVisibility('nv_choose' + num, 'hide');
	}
}

/*
* Updates the player order to the order chosen in assist mode.
*/
function updateOrder () {
	backup();

	var sel = 's' + slots.sel;
	var sBackup = copyVar(slots[sel]);
	for (var num = 0; num < counters.length; num++) {
		for (var num2 = 1; num2 < 5; num2++) {
			slots[sel][counters[num]][num2 - 1] = sBackup[counters[num]][assistInfo.order[num2] - 1];
		}
	}
	restore();

	var cBackup = copyVar(characters);
	changeCharacters(1, cBackup[assistInfo.order[1]]);
	changeCharacters(2, cBackup[assistInfo.order[2]]);
	changeCharacters(3, cBackup[assistInfo.order[3]]);
	changeCharacters(4, cBackup[assistInfo.order[4]]);

	playerOrder = ['', 1, 2, 3, 4];
	orderCurPlayer = playerOrder[1];
}

/*
* Prepares/loads the 'turn' screen.
*/
function loadTurn () {
	getElem('nvAssistStateIndicator').style.height = '45px';
	getElem('nvAssistTurnIndicator').style.height = '35px';

	loadTurn_Misc();
}

/*
* Loads the star/misc module on the turn screen.
*/
function loadTurn_Misc () {
	var stars = assist_getStarList();
	for (var num = 0; num < stars.length; num++) {
		if (stars[num].buyMultiple === true) {
			for (var num2 = 0; num2 < 2; num2++) {
				if (num2 === 0) {
					var elemWrapper = cElem('span',    'assistMisc');
				} else {
					var elemWrapper = cElem('span', 'nv_assistMisc');
				}
				elemWrapper.classList.add('assistMultipleStarWrapper');

				var mainImg = createAssistButton(stars[num].src, elemWrapper, stars[num].name, 'assist_buyStar("' + stars[num].name + '")', 50);

				var secondWrapper = cElem('span', elemWrapper);
				secondWrapper.classList.add('assistMultipleStarSelectionWrapper');

				var elem = cElem('img', secondWrapper);
				elem.src = 'img/arrow.png';
				elem.classList.add('chooseImg');
				elem.setAttribute('onclick', 'assist_changeBuyMultipleStarAmount(\'' + stars[num].name + '\', \'M\', 1)');

				var textWrapper = cElem('span', secondWrapper);
				var elem = cElem('span', textWrapper);
				editInner(elem, '1');

				var elem = cElem('img', secondWrapper);
				elem.src = 'img/arrow.png';
				elem.classList.add('chooseImg');
				elem.setAttribute('onclick', 'assist_changeBuyMultipleStarAmount(\'' + stars[num].name + '\', \'P\', 1)');
			}
		} else {
			var elem = createAssistButton(stars[num].src,    'assistMisc', stars[num].name, 'assist_buyStar("' + stars[num].name + '")', 50);
			var elem = createAssistButton(stars[num].src, 'nv_assistMisc', stars[num].name, 'assist_buyStar("' + stars[num].name + '")', 50); //navbar
		}
	}
}

/*
* Creates a assist button with the .chooseImg class.
*
* @param {string} src The image source.
* @param {string} parent The parentnode id that should append it.
* @param {string} id The id of the new element.
* @param {string} onclick What the onclick attribute should be.
* @param {number} size The size of the image (will be set to width as px) - optional.
*/
function createAssistButton (src, parent, id, onclick, size) {
	if (typeof parent === 'string') {
		parent = getElem(parent);
	}

	var elem = document.createElement('img');
	parent.appendChild(elem);

	elem.classList.add('chooseImg');
	elem.src = src;
	elem.setAttribute('assistName', id);
	elem.setAttribute('onclick', onclick);
	if (typeof size === 'number') {
		elem.style.width = size + 'px';
	}
}


/*
* Toggles visibility of a assist module (stars, dice, shopping etc)
*
* @elem {DOM Element} elem First child of the module that should be toggled.
*/
function toggleModuleVisibility (elem) {
	elem = elem.parentNode.parentNode.children[1]; //get actual element to toggle

	if (elem.parentNode.getAttribute('customHidden') === 'true') { //named customHidden because "hidden" is already a used attribute and I couldn't come up with something better
		var contents = elem.children[0];
		elem.style.height = contents.clientHeight + "px";

		elem.parentNode.setAttribute('customHidden', 'false'); //.parentNode is required so CSS can change the titles border-radius depending on this attribute
	} else {
		elem.style.height = 0;

		elem.parentNode.setAttribute('customHidden', 'true');
	}
}
//just get it from the navbar

function chromesucks () {
	elem = document.querySelector('.currentPlayer');
	elem.children[0].style.width = 0;
	elem.classList.remove('currentPlayer');
	elem = document.querySelector('.assistCurrentPlayerTextWrapper');
	elem.style.width = 0;


	elem = document.querySelector('#assistPlayerList').children[1];
	elem.classList.add('currentPlayer');

	var contents = document.querySelectorAll('.assistCurrentPlayerTextWrapper')[1];
	contents.style.width = 'auto';
	elem.children[0].style.width = contents.clientWidth + 65 + 21 + "px"; //text width + img width + padding (7 on both sides and seemingly 7 between image and text)
}

/*
* Returns Array of all elements with a certain assistName.
*
* @param {string} id The name of the element
*/
function getAssistElem (id) {
	try {
		return document.querySelectorAll('[assistName="' + id + '"]');
	} catch (e) {
		console.error(e);
		console.error('[MPO] getAssistElem() error, could not find: ' + id);
	}
}