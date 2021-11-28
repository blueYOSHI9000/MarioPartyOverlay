// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== THE "Modal Object" ===
 *
 * 	A "Modal Object" includes all info about the modal itself.
 * 	When creating a modal the following have to be provided: 'type', 'specifics', 'attributes' and 'group'.
 * 	The rest will be handled by the site itself and shouldn't be touched.
 * 	It consists of the following:
 *
 *		- type [String]
 *			- What the modal should have inside it. Can be one of the following:
 * 				- testo: Simply creates a box. Only really used for testing.
 *				- characterSelection: Allows the user to select which character they wanna use. [not implemented yet]
 *				- playerSelection: Allows the user to select one of the current players. Likely used to determine who got hit by an item. [not implemented yet]
 *
 *		- specifics [Object]
 * 			- An object consisting of specifics on how the content should be displayed (like when selecting a player, should they be able to select the current player as well?).
 * 			- Depends entirely on which 'type' is used:
 * 				- testo:
 * 					- No variables are needed. 'modalVariables' can simply be an empty object.
 *
 *		- attributes [Object]
 * 			- This defines how the modal itself works. These can't be changed once the modal has been created.
 *			- An object that consists of the following:
 *				- openOnTop [Boolean] <true>
 * 					- If the Modal should open on top, if true then it will immediately be the focus.
 * 					- If false it will open it at the very bottom.
 * 				- autoClose [Boolean] <true>
 * 					- If the modal should be auto-closed, meaning if a user clicks outside the modal then it gets closed automatically. Using false prevents this.
 *				- resizable [Boolean] <true>
 *					- If the modal can be resized.
 *
 *		- group [String]
 *			- To what part of the site it belongs to.
 * 			- This will be used to close modals whenever they're no longer needed. This will always include pinned modals as well.
 * 			- For example, a modal of the group 'currentAssistTurn' will be closed once the user advances to the next turn (as it's no longer needed).
 * 			- Can be one of the following:
 *				- navbar: Belongs to navbar. These will never be closed (aside form auto-close of course).
 *				- currentAssistTurn: Belongs to the current assist player. Will be closed once the turn is done.
 *
 * 		- id [Number]
 * 			- The ID of the modal. Will be added by the site automatically when a modal is being created.
 *
 * 		- status [Object]
 * 			- The status of the modal which includes info that's always changing like whether the modal is pinned or not. Will be added by the site automatically.
 * 			- Includes the following items:
 * 				- pinned [Boolean]
 * 					- Whether it's pinned or not.
 */

//lists all open Modals, each modal has the ID as it's name (so the modal with the ID 4 can be accessed via 'modal_openModals[4]')
	//and yes, this has to be an object so the name of each item will always be the same, even if an entry is deleted (which wouldn't be the case for arrays)
var modal_openModals = {};

//the order of modals, each item is a modal ID
	//the active modal comes first while the modal at the bottom comes last
var modal_focusOrder = [];

//the total of modals opened (not current modals, just total since the site loaded)
var modal_totalModalsMade = 0;

//the defaults for modal specifics
function modal_Specifics (type) {
	switch (type) {
		case 'testo':
			//testo doesn't anything
			break;
	}
}

//the defaults for modal attributes
function modal_Attributes () {
	this.openOnTop = true;
	this.autoClose = true;
	this.resizable = true;
}

//the defaults for modal status
function modal_Status () {
	this.pinned = false;
}

/** Creates a new modal window (or simply 'modal').
 *
 * 	Use this to create a test-window: "modal_createModal({type: 'testo', specifics: {}, attributes: {autoClose: false}, group: 'navbar'});"
 *
 * 	Args:
 * 		modalObj [Object]
 * 			A "Modal Object" that contains all info about the modal. See the top of this file for more info.
 *
 * 	Returns [Number]:
 * 		Returns the ID of the modal created.
 */
function modal_createModal (modalObj) {
	//increase the total of modals opened
	modal_totalModalsMade++;

	//get and set the modal ID
	const modalID = modal_totalModalsMade;
	modalObj.id = modalID;

	//add the specifics object
	modalObj.specifics = forceFillInObject(new modal_Specifics(modalObj.type), modalObj.specifics);

	//fill in the 'modalObj.attributes' object with defaults
	modalObj.attributes = forceFillInObject(new modal_Attributes(), modalObj.attributes);

	//add the status object
	modalObj.status = new modal_Status();

	//create the 'modal_openModals' entry
		//has to be made at the beginning of this function so it can be found via the ID in case something goes wrong because it can't be force-closed without it being accessible by ID
	modal_openModals[modalID] = modalObj;

	//get all CSS classes
	let cssClasses = ['modal_container', 'interaction_draggable', 'interaction_resizeable'];

		//push the type specific one
	cssClasses.push(`modalType-${modalObj.type}`);

	//create a document fragment to add all elements to
	const docFrag = new DocumentFragment();

	//create the actual DOM Element
	const container = cElem('span', docFrag, {
		class                  : cssClasses.join(' '),
		'data-modalid'         : modalObj.id,
		'data-modalcontenttype': modalObj.type,
		'data-modalgroup'      : modalObj.group
	});

	//create the menu bar
	const menuBar = cElem('span', container, {class: 'modal_menuBar'});

		//add the drag element to the menu bar
	const dragIcon = cElem('span', menuBar, {class: 'interaction_dragHandle'});
	dragIcon.textContent = 'MOVE ME!';

	//create the main body
	const main = cElem('span', container, {class: 'modal_main'});

	//make changes based on which type it is
	switch (modalObj.type) {
		case 'testo':
			//create the resizing "buttons"
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 7, style: 'padding-right: 9px;'}).textContent = '7';
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 8, style: 'padding-right: 9px;'}).textContent = '8';
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 9, style: 'padding-right: 9px;'}).textContent = '9';
			cElem('br'  , main);
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 4, style: 'padding-right: 9px;'}).textContent = '4';
			cElem('span', main, {    /* Not needed since 5 is not a valid 'borderSide' */    style: 'padding-right: 9px;'}).textContent = '5';
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 6, style: 'padding-right: 9px;'}).textContent = '6';
			cElem('br'  , main);
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 1, style: 'padding-right: 9px;'}).textContent = '1';
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 2, style: 'padding-right: 9px;'}).textContent = '2';
			cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 3, style: 'padding-right: 9px;'}).textContent = '3';
			break;

		case 'characterSelection':
			//create a form
			var form = inputfield_createField('form', main)


			//create all characters
			ui_createCharacterList(main);
			break;
	}

	//append the document fragment
	document.getElementById('modal_catchAllContainer').appendChild(docFrag);

	//and then set the actual modal to be that exact size
		//has to be 'offsetWidth' instead of 'getBoundingClientRect().width' because the latter includes modification made through the CSS 'transform' property which shouldn't happen
	container.style.width  = container.offsetWidth;
	container.style.height = container.offsetHeight;

	//add the new modal to the focus-order list and also focus it if needed
	modal_focusOrder.push(modalID);
	if (modalObj.attributes.openOnTop === true) {
		modal_changeFocus(modalID);
	}

	//update the focus order
	modal_updateFocusOrder();

	//return the modal ID
	return modalID;
}

/**	This changes the focus to a different modal.
 *
 * 	Note that this function will only update the main focus, it can't change the 'modal_focusOrder' (mainly because it's not really needed).
 *
 * 	Args:
 * 		modalID [Number/String]
 * 			The ID of the Modal to be focused. Has to be a number but it can be in string-form (so '6' and 6 are both fine).
 */
function modal_changeFocus (modalID) {
	//convert it to an actual number (will do nothing if it already is a number)
	modalID = parseInt(modalID);

	//get index of ID and then remove it from 'modal_focusOrder'
	const index = modal_focusOrder.indexOf(modalID);
	if (index !== -1) {
		modal_focusOrder.splice(index, 1);
	}

	//then push the ID to the beginning of the array
	modal_focusOrder.unshift(modalID);

	//and finally update the focus order
	modal_updateFocusOrder();
}

/** Updates the focus-order of modals.
 *
 * 	Updates the z-index values and adds/removes the 'modal_focused' and 'modal_unfocused' CSS classes
 */
function modal_updateFocusOrder () {
	for (let key in modal_openModals) {
		//convert string to number
		key = parseInt(key);

		//get the DOM Element
		const elem = modal_getDOMElement(key);

		const index = modal_focusOrder.indexOf(key);

		//set the z-index CSS property
		if (index === -1) {
			//use 100 if it's not inside 'modal_focusOrder' since 100 is the lowest z-index value for modals
			elem.style.zIndex = 100;
		} else {
			//apply an increasing z-index for each modal starting at 101 (since 100 is reserved for unlisted modals)
				//let's say there's 10 modals open
				//then the first modal (the one on top) would have an index of 0
				//that means this is '100 + (10 - 0)' which is 110
				//the last modal would be the 10th item with an index of 9 (since the index starts at 0)
				//that means this would be '100 + (10 - 9)' which is 101
			elem.style.zIndex = 100 + (modal_focusOrder.length - index);
		}

		//update the classes
		if (index === 0) {
			elem.classList.add   ('modal_focused'  );
			elem.classList.remove('modal_unfocused');
		} else {
			elem.classList.remove('modal_focused'  );
			elem.classList.add   ('modal_unfocused');
		}
	}
}

/**	Closes all modals that belong to a certain group.
 *
 * 	Args:
 * 		group [String]
 * 			The name of the group that should get all it's modals destroyed.
 */
function modal_closeAllModalsOfGroup (group) {
	for (let key in modal_openModals) {
		//convert string to number
		key = parseInt(key);

		//check if it has the group specified, if yes then close it
		if (modal_openModals[key].group === group) {
			modal_closeModal(key, false);
		}
	}
	//and finally update the focus order
	modal_updateFocusOrder();
}

/**	Closes a modal completely.
 *
 * 	Removes it from 'modal_openModals' and 'modal_focusOrder' and deletes the DOM Element.
 *
 * 	Args:
 * 		modalID [Number/String]
 * 			The ID of the modal.
 *
 * 		updateFocus [Boolean] <true>
 * 			Whether 'modalupdateFocusOrder()' should be called or not.
 * 			Only set this to false if this is called in a bigger function that's gonna call it later anyway.
 */
function modal_closeModal (modalID, updateFocus) {
	//convert string to number
	modalID = parseInt(modalID);

	//remove it from the 'modal_focusOrder' array
	const index = modal_focusOrder.indexOf(modalID);
	if (index !== -1) {
		modal_focusOrder.splice(index, 1);
	}

	//remove the HTML Element
	modal_getDOMElement(modalID).remove();

	//and finally remove the 'modal_openModals' entry
	delete modal_openModals[modalID];

	if (updateFocus !== false) {
		modal_updateFocusOrder();
	}
}

/**	Gets the HTML element of the modal.
 *
 * 	Args:
 * 		modalID [Number/String]
 * 			The ID of the Modal to be focused. Has to be a number but it can be in string-form (so '6' and 6 are both fine).
 *
 * 	Returns [DOM Element/Boolean]:
 * 		Returns the DOM Element of the modal.
 * 		Returns false if the element can't be found.
 */
function modal_getDOMElement (modalID) {
	//convert string to number
	modalID = parseInt(modalID);

	//get element by using the custom 'modalid' attribute
	const elem = document.querySelector(`[data-modalid="${modalID}"]`);

	//return false if element doesn't exist, otherwise simply return the DOM Element
	return elem ?? false;
}

/**	Auto-close all modals that didn't get clicked on.
 *
 * 	This function was only really made with the intention of being called through a 'pointerdown' event listener.
 *
 * 	Args:
 * 		exception [Number/String/undefined] <none>
 * 			The modal ID of the modal that shouldn't be closed. Defaults to no exceptions.
 * 			Can be any type, it will convert string to number. Anything else will be handled like there shouldn't be an exception.
 */
function modal_autoCloseModals (exception) {
	//the currently active modal
	activeModalID = modal_focusOrder[0];

	//convert exception to Number
	if (typeof exception === 'string') {
		exception = parseInt(exception);
	}

	for (let key in modal_openModals) {
		//convert string to number
		key = parseInt(key);

		//skip modal if it's the currently active one
		if (key === exception)
			continue;

		//get current modal
		const item = modal_openModals[key];

		//close modal if it is can be auto-closed and if it isn't pinned
		if (item.attributes.autoClose === true && item.status.pinned === false) {
			modal_closeModal(key);
		}
	}
}