// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	Changes the action for the tracker.
 *
 * 	Simply loops through + > - > = > *repeat*.
 */
function handleNavbar_changeAction () {
	//get the current action and then simply set it to the next one in line ('add' > 'sub' > 'set' > repeat)
	switch (updatesTracker_getAction()) {

		case 'add':
			updatesTracker_setAction('sub');
			break;

		case 'sub':
			updatesTracker_setAction('set');
			break;

		case 'set':
			updatesTracker_setAction('add');
			break;

		//failsafe
		default:
			updatesTracker_setAction('add');
			break;
	}
}

/**	Changes the amount for the tracker.
 *
 * 	Loops through 1 > 5 > 10 > *repeat*.
 * 	Or alternatively creates a modal to ask for the amount if 'action' is 'set'.
 */
function handleNavbar_changeAmount () {
	//if the action is 'set' then create a modal that asks the user what amount it should be
	if (updatesTracker_getAction() === 'set') {
		//this will create the actual modal
		var constructModal = function (elem) {
			//get the unique modalID
			const modalID = elem.parentNode.getAttribute('data-modalid');

			//create a input-field form
			const form = inputfield_createField('form', elem);

			//create a number input-field to store the new amount
			inputfield_createField('number', elem, {
				addToForm: form,
				tag: 'value'
			});

			//create a button that submits the value
			inputfield_createField('button', elem, {
				addToForm: form,
				onchange: (value, fieldObj) => {
					//this gets the actual value that's needed
						//it first gets the value of the form (which is a object)
						//it then gets the 'value' property of the object which is what the user entered
					const actualValue = inputfield_getValue(fieldObj.belongsToForm[0]).value;

					//set the amount
					updatesTracker_setAmount(actualValue);

					//and immediately close the modal
					modal_closeModal(modalID);
				}
			})
		}

		//actually create the modal
		modal_createModal(constructModal);

	//otherwise simply loop around with 1 > 5 > 10 > repeat
	} else {
		switch (updatesTracker_getAmount()) {

			case 1:
				updatesTracker_setAmount(5);
				break;

			case 5:
				updatesTracker_setAmount(10);
				break;

			case 10:
				updatesTracker_setAmount(1);
				break;

			//failsafe
			default:
				updatesTracker_setAmount(1);
				break;

		}
	}
}

/**	Updates the visuals of the "Action" display on the navbar.
 */
function handleNavbar_updateAction () {
	//set it to a symbol depending on what the action is
	switch (updatesTracker_getAction()) {

		case 'add':
			document.querySelector('.navbar_trackerAction').textContent = '+';
			break;

		case 'sub':
			document.querySelector('.navbar_trackerAction').textContent = '-';
			break;

		case 'set':
			document.querySelector('.navbar_trackerAction').textContent = '=';
			break;

		//failsafe
		default:
			document.querySelector('.navbar_trackerAction').textContent = '?';
			break;
	}
}

/**	Updates the visuals of the "Amount" display on the navbar.
 */
function handleNavbar_updateAmount () {
	//set it
	document.querySelector('.navbar_trackerAmount').textContent = updatesTracker_getAmount();
}

/**	Creates the modal for selecting a character.
 */
function handleNavbar_createCharacterModal () {
	//this will create the inside of the modal
	const constructModal = function (main) {
		//create a form
		var form = inputfield_createField('form', main, {
			onchange: handleNavbar_changeCharacterFromModal,
			autoAddToForm: true
		});

		//create a player selection
		commonInterface_createPlayerSelection(form);

		//line-break
		cElem('br', form);

		//create a character selection
		const charSelection = commonInterface_createCharacterSelection(form);

		inputfield_setValue(charSelection, updatesTracker_getCharacter(1));
	}

	//create the actual modal
	modal_createModal(constructModal, {
		cssClass: 'modalClass_characterSelection',
		group: 'navbar'
	});
}

/**	Called when changing the character from the character-selection modal.
 *
 * 	Should only be called by an input-field's 'onchange' function.
 *
 * 	Args:
 * 		value [*any*]
 * 			The value it gets from the input-field.
 *
 * 		fieldObj [Object]
 * 			The field-object.
 */
function handleNavbar_changeCharacterFromModal (value, fieldObj) {
	//return if 'player' has been updated
	if (fieldObj.propertyChanged === 'player') {
		return;
	}

	//change the character
	updatesTracker_setCharacter(Number(value.player), value.character);
}

function handleNavbar_createGameModal () {
	var constructModal = function (elem) {
		//this is a object that contains all games from the database
		const games = dbparsing_getGameList();

		//loop through all games
		for (const key in games) {
			//TODO
		}
	}
}

/**	Opens the modal for managing savefiles.
 *
 * 	The functions for loading & deleting savefiles are called directly within the 'onclick' event.
 */
function handleNavbar_createSavefileModal () {
	//function to construct the modal
	var constructModal = function (elem) {

		//create a button that automatically creates a new savefile and closes this modal
		cElem('button', elem, {onclick: 'updatesTracker_createSavefile();modal_closeThisModal(this);'})
			.textContent = 'Create new savefile';

		cElem('br', elem);

		cElem('br', elem);

		cElem('span', elem)
			.textContent = 'Select a savefile:';

		cElem('br', elem);
		cElem('br', elem);

		//loop through all savefiles
		for (key in trackerCore_status.savefiles) {

			//the DOM container for the savefile
			const savefileContainer = cElem('span', elem, {class: 'navbar_savefileContainer'});

			//the savefile object
			const savefileObj = trackerCore_status.savefiles[key];

			//list of characters used
			let characters = [];

			//loop through all players to add their characters to the character-list
			for (item of savefileObj.players) {
				characters.push(item.character);
			}

			//add the text that shows what savefile it is
			cElem('span', savefileContainer, {class: 'navbar_savefileText', style: 'white-space: nowrap;'})
				.textContent = `Game: ${savefileObj.game} | Characters: ${characters.join(' + ')}`;

			cElem('br', savefileContainer);

			//add a button to load the savefile
				//'onclick' loads the savefile and closes this modal
			cElem('button', savefileContainer, {onclick: `updatesTracker_loadSavefile(${key});modal_closeThisModal(this);`})
				.textContent = 'Load Savefile';

			//add a button to delete the savefile
				//'onclick' deletes the savefile and closes this modal
			let delButton = cElem('button', savefileContainer, {onclick: `updatesTracker_deleteSavefile(${key});modal_closeThisModal(this);`});
			delButton.textContent = 'Delete Savefile';

			if (trackerCore_status.savefiles.length <= 1) {
				delButton.setAttribute('onclick', '');
				delButton.setAttribute('disabled', 'true');
			}

			//add some distance between each individual savefile
			cElem('br', savefileContainer);
			cElem('br', savefileContainer);
		}
	}

	//actually create the modal
	modal_createModal(constructModal);
}