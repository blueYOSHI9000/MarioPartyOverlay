// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

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
			onchange: handleNavbar_changeCharacterFromModal
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
 * 	Should only be called by an input-field 'onchange' function.
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
		//change the currently selected character to the one the player uses
		inputfield_setValue(fieldObj.id, updatesTracker_getCharacter(Number(value.player)), {formProperty: 'character', skipOnchange: true});
		return;
	}

	//debugger;
	//change the character
	updatesTracker_setCharacter(value.player, value.character);
}