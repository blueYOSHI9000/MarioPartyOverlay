var assistInfo = {
	state: 'intro',
	turn: 1,
	curGame: 'smp',
	order: ['']
}

/*
* Updates the assist state. Calls loadAssistState().
*/
function updateAssistState () {
	switch (assistInfo.state) {
		case 'intro':
			loadAssistState('chooseOrder');
			break;
		case 'chooseOrder':
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

	updateVisibility('assist' + capStr(state), null, true); //only show div for current state

	switch (state) {
		case 'chooseOrder':
			loadChooseOrder();
			break;
	}
}

/*
* Prepares/loads the 'chooseOrder' screen.
*/
function loadChooseOrder () {
	resetChooseOrder();

	for (let num = 1; num < 5; num++) {
		changeCharacterIcon('assistChooseP' + num, characters[num]);
	}
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

	changeCharacterIcon(getElem('choose' + currentChoosePlayerPosition).children[1], characters[player], true);
	updateVisibility('choose' + currentChoosePlayerPosition, 'show');
	currentChoosePlayerPosition++;

	getElem('assistChooseP' + player).classList.add('chooseImgSelected');

	if (currentChoosePlayerPosition >= 5) {
		currentChoosePlayerPosition = 4;
		updateVisibility('chooseContinue', 'show');
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
	updateVisibility('chooseContinue', 'hide');

	for (let num = 1; num < 5; num++) {
		getElem('assistChooseP' + num).classList.remove('chooseImgSelected');
		updateVisibility('choose' + num, 'hide');
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