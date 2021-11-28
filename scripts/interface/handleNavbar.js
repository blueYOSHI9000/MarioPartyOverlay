// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

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

		inputfield_setValue(charSelection, handleTracker_getCharacter(1));
	}

	//create the actual modal
	modal_createModal({
		constructModal: constructModal,
		attributes: {
			cssClass: 'modalClass_characterSelection',
			group: 'navbar'
		}
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
		inputfield_setValue(fieldObj.id, handleTracker_getCharacter(Number(value.player)), {formProperty: 'character', skipOnchange: true});
		return;
	}

	//debugger;
	//change the character
	handleTracker_changeCharacter(value.player, value.character);
}