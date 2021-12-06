// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== HOW MODALS WORK ===
 *
 * 	Modals are small windows created with plain HTML that "float" above the rest of the site.
 * 	Most regular programs would open a new smaller window to change settings, we have to use modals for that. Whenever a regular program would create a new window, we create a modal instead.
 * 	Modals can be moved around and resized just like regular windows. Modals can contain anything that's possible with HTML (and CSS/JS).
 *
 * 	To create a modal, simply call 'modal_createModal()' (see the documentation on the function for more details).
 *
 *
 * 	=== MODAL ATTRIBUTES ===
 *
 * 	When creating a modal you can provide it with some attributes to change how it functions. Here's a list of them:
 *
 * 	# Classification
 *
 * 		cssClass [String/Array] <none>
 * 			The CSS class the container should receive.
 * 			Note that the container receives the CSS class, not the main body itself. Use '.cssClass > .modal_main' to target the main body (replace 'cssClass' with your own).
 * 			Note that it will have other classes as well, not just the ones specified here.
 *
 * 		group [String] <'modal'>
 * 			The group the modal belongs to. Used to close all modals of a group (like, when settings are closed all modals in the group 'settings' will be closed).
 * 			Uses 'modal' as a default, though you should always provide a group yourself whenever possible.
 *
 * 	# Testing
 *
 * 		testModal [Boolean] <false>
 * 			If true it will automatically create a test modal.
 * 			If true the 'constructModal' function WILL be ignored.
 * 			If true it will automatically add the CSS class 'modalClass_testo'.
 *
 * 	# Embedding
 *
 * 		embedTo [DOM Element/null] <null>
 * 			Leave empty or set to null if you don't need this.
 * 			This will embed the modal into regular HTML without it being an embed at all but still having some of it's features like being collapsable.
 * 			Simply provide the DOM Element it should be appended to.
 *
 * 			If embedding it used then the 'openOnTop', 'autoPin', 'draggable' and 'resizeable' attributes will all be set to false.
 * 			Note that this is subject to change (a feature to un-embed and re-embed might be added at some point).
 *			The "subject to change" thing is especially important for 'resizeable' since it might be possible in the future to resize embedded modals (at least the bottom right edge).
 *
 * 	# Fine-tuning
 *
 * 		openOnTop [Boolean] <true>
 * 			If true the modal will open on top of all others.
 * 			If false it opens at the very bottom.
 *
 * 		autoPin [Boolean] <false>
 * 			If true the modal will be pinned automatically.
 * 			If false the modal won't be pinned automatically.
 * 			See 'pinned' in the 'status' section below.
 *
 * 		collapsable [Boolean] <true>
 * 			If true the modal can be collapsed.
 *
 * 		draggable [Boolean] <true>
 * 			If true the modal can be moved around by the user.
 * 			Note that the modal can always be moved manually, this only affects whether the user can move it by themselves.
 *
 * 		resizeable [Boolean] <true>
 * 			If true the modal can be resized by the user.
 * 			Note that the modal can always be resized manually, this only affects whether the user can resize it by themselves.
 *
 * 	=== MODAL STATUS ===
 *
 * 	The 'status' object of a modal lists some info about the current status of the modal like whether the modal is pinned or not.
 * 	This is all updated by the site itself and it's best not to modify the object manually.
 *	The following properties are found inside the 'status' object:
 *
 * 		pinned [Boolean]
 * 			Whether the modal is pinned or not.
 * 			On default a modal is always closed whenever the user clicks outside of the modal. However, if a modal is pinned then it won't be closed.
 */

//lists all open Modals, each modal has the ID as it's name (so the modal with the ID 4 can be accessed via 'modal_openModals[4]')
	//and yes, this has to be an object so the name of each item will always be the same, even if an entry is deleted (which wouldn't be the case for arrays)
var modal_openModals = {};

//the order of modals, each item is a modal ID
	//the active modal comes first while the modal at the bottom comes last
var modal_focusOrder = [];

//the total of modals opened (not current modals, just total since the site loaded)
var modal_totalModalsMade = 0;

//the default attributes of modals that are used whenever no attributes were provided
const modal_defaultAttributes = {
	cssClass: [],
	group: 'modal',

	testModal:   false,

	embedTo:     null ,

	openOnTop:   true ,
	autoPin:     false,
	collapsable: true ,
	draggable:   true ,
	resizeable:  true
};

/**	Creates and sets up the 'ModalObject' that saves all info related to the modal.
 *
 * 	NOTE: To create a modal, use 'modal_createModal()' instead of this!
 *
 * 	This automatically creates and applies the unique ID.
 * 	This will NOT check whether attributes are even the correct type. If a string is provided for a attribute that requires a boolean then it WILL fail.
 * 	This will verify and update all attributes to be correct (with the above exception).
 *	This sets up the 'status' object according to the attributes used.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				attributes [Object] <default>
 * 					The attributes for the modal. See explanation at the beginning of the file for a list of attributes.
 * 					This will automatically use default values for any attribute that's not specified.
 *
 * 	Constructs:
 * 		id [Number]
 * 			The unique ID of the modal.
 *
 * 		group [String]
 * 			The group the modal belongs to.
 *
 * 		attributes [Object]
 * 			The attributes of this modal. See explanation at the beginning of the file for a list of attributes.
 *
 * 		status [Object]
 * 			The current status of the modal. See explanation at the beginning of the file for a list of all status properties.
 */
function modal_ModalObject (specifics) {
	// === GET AND SET THE ID ===

	//increase the total amount of modals made and use the new value as the ID
	this.id = ++modal_totalModalsMade;

	// === MODIFYING ATTRIBUTES ===

	//for quick access, use this instead of the 'specifics' one
	let attributes = specifics.attributes;

	//replace 'attributes' with a empty object if it isn't already an object
	if (typeof attributes !== 'object') {
		attributes = {};
	}

	//if the 'group' attribute isn't a string then delete it
		//this is done so the default gets re-added below
	if (attributes.group !== 'string') {
		delete attributes.group;
	}

	//set the default values for anything that isn't specified
		//this includes the previously deleted attributes
		//which were deleted so the defaults are all found in a single place (the 'modal_defaultAttributes' variable)
	attributes = attributes.fillIn(modal_defaultAttributes);

	//if 'cssClass' is a string then add it to an empty array
	if (typeof attributes.cssClass === 'string') {
		attributes.cssClass = [attributes.cssClass];

	//if it's not a string and also not an array then replace it with an empty array
	} else if (Array.isArray(attributes.cssClass) !== true) {
		attributes.cssClass = [];
	}

	//go through all 'cssClass' items in reverse and remove any items that aren't a string
	attributes.cssClass.removeEachIf((item, index) => {
		if (typeof item !== 'string') {
			console.warn(`[MPO] A 'cssClass' item in the modal is not a string. Array item ${index}: "${item}".`);

			//returning true means that the item will be removed
			return true;
		}
	});

	//disable some attributes if the modal should be embedded
	if (Object.isDOMElement(attributes.embedTo) === true) {
		attributes.openOnTop  = false;
		attributes.autoPin    = false;
		attributes.draggable  = false;
		attributes.resizeable = false;

	//if it shouldn't be embedded then make sure it's set to null
	} else {
		attributes.embedTo    = null ;
	}

	//convert all values to boolean values whenever needed (even if the output is somewhat unwanted then)
		//I could do a ternary operator to only convert to Boolean when necessary but it's just *barely* faster than this but looks SO much worse
		//so we just always convert to boolean, even when it already is a boolean

		//now, one might ask "but why not simply delete them like we did with 'group'?"
		//well, there's a simple answer to that: I'm lazy as fuck. And the code would also look ugly as hell.
	attributes.testModal   = Boolean(attributes.testModal  );

	attributes.openOnTop   = Boolean(attributes.openOnTop  );
	attributes.autoPin     = Boolean(attributes.autoPin    );
	attributes.collapsable = Boolean(attributes.collapsable);
	attributes.draggable   = Boolean(attributes.draggable  );
	attributes.resizeable  = Boolean(attributes.resizeable );

	//if it's a test-modal then add the class 'modalClass_testo'
	if (attributes.testModal === true) {
		attributes.cssClass.push('modalClass_testo');
	}

	//actually set the attributes
	this.attributes = attributes;

	//=== CREATING THE STATUS OBJECT ===

	//create the status object
	this.status = {};

	//for quick access
	let status = this.status;

	//create the 'pinned' status
		//but convert it to a boolean first just to be sure
	status.pinned = Boolean(attributes.autoPin);
}

/** Creates a new modal window (or simply 'modal').
 *
 * 	Use this to create a test-modal: "modal_createModal(null, {testModal: true, autoPin: true, group: 'testo'});"
 *
 * 	Note that this will NOT check whether attributes are the correct type. If a string is provided for a attribute that requires a boolean then it WILL fail.
 *
 * 	Args:
 * 		constructModal [Function]
 * 			A function that gets called in order to construct the modal. The DOM element of the modal is given as an argument.
 * 			It's suggested to avoid modifying the element provided aside from creating new elements inside of it as it might mess up the modal.
 *
 * 		attributes [Object] <default>
 * 			The attributes for the modal. See explanation at the beginning of the file for a list of attributes.
 * 			This will automatically use default values for any attribute that's not specified.
 *
 * 	Returns [Number]:
 * 		Returns the ID of the modal created.
 */
function modal_createModal (constructModal, attributes={}) {
	// === PREPARE THE MODAL === (create the 'ModalObject' and all that)

	//create the 'ModalObject'
	modalObj = new modal_ModalObject({attributes: attributes});

	//create the 'modal_openModals' entry
		//has to be made at the beginning of this function so it can be found via the ID in case something goes wrong because it can't be force-closed without it being accessible by ID
	modal_openModals[modalObj.id] = modalObj;

	//get the modalID
	const modalID = modalObj.id;

	//get the attributes object
	attributes = modalObj.attributes;



	// === BUILD THE ACTUAL MODAL ===

	//get all CSS classes
	let cssClasses = ['modal_container', 'interaction_draggable', 'interaction_resizeable', ...attributes.cssClass];

	//replace the first class with 'modal_embedContainer' if it's embedded
	if (attributes.embedTo !== null) {
		cssClasses[0] = 'modal_embedContainer';
	}

		//push the type specific one
	//cssClasses.push(`modalType-${modalObj.type}`); //commented because types no longer exist

	//create a document fragment to add all elements to
	const docFrag = new DocumentFragment();

	//create the actual DOM Element
	const container = cElem('span', docFrag, {
		class                  : cssClasses.join(' '),
		'data-modalid'         : modalObj.id,
		'data-modalgroup'      : modalObj.group
	});

	//create the menu bar
	const menuBar = cElem('span', container, {class: 'modal_menuBar'});

	//add the drag element to the menu bar if needed
	if (attributes.draggable === true) {
		cElem('span', menuBar, {class: 'interaction_dragHandle'})
			.textContent = 'MOVE ME!';
	}

	//add the collapse element to the menu bar if needed
	if (attributes.collapsable === true) {
		cElem('span', menuBar, {class: 'modal_collapseHandle', 'data-linkedtomodal': modalObj.id})
			.textContent = 'COLLAPSE ME!';
	}

	//create the main body
	const main = cElem('span', container, {class: 'modal_main'});



	// === CONSTRUCT THE MAIN BODY ===

	//if the 'testModal' attribute is true then create a test-modal
	if (attributes.testModal === true) {
		//create the resizing "buttons"
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 7, style: 'padding-right: 9px;'}).textContent = '7';
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 8, style: 'padding-right: 9px;'}).textContent = '8';
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 9, style: 'padding-right: 9px;'}).textContent = '9';
		cElem('br'  , main);
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 4, style: 'padding-right: 9px;'}).textContent = '4';
		cElem('span', main, {     /* Not needed since 5 is not a valid 'borderSide' */     style: 'padding-right: 9px;'}).textContent = '5';
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 6, style: 'padding-right: 9px;'}).textContent = '6';
		cElem('br'  , main);
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 1, style: 'padding-right: 9px;'}).textContent = '1';
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 2, style: 'padding-right: 9px;'}).textContent = '2';
		cElem('span', main, {class: 'interaction_resizeHandle', interaction_borderside: 3, style: 'padding-right: 9px;'}).textContent = '3';

		//complain if 'constructModal' was specified despite creating a test-modal
		if (typeof constructModal === 'function') {
			console.warn(`[MPO] A 'constructModal' function has been specified despite 'testModal' being set to true. As such 'constructModal' will be ignored.`);
		}

	//otherwise create the actual modal
	} else {
		//construct the main body of the site by executing 'constructModal()'
			//but only if it is actually a function, otherwise complain
		if (typeof constructModal === 'function') {
			constructModal(main);
		} else {
			//complain but don't return, an empty modal is still a modal that works
			console.warn(`[MPO] modal_createModal() received a 'constructModal' argument that's not a function: "${constructModal}".`);
		}
	}



	// === FINISHING TOUCHES === (calculate size, focus it and all that)

	//if the modal should be embedded then append it to the correct place
	if (Object.isDOMElement(attributes.embedTo) === true) {
		attributes.embedTo.appendChild(docFrag);

	//if the modal shouldn't be embedded then append it like any regular modal
	} else {
		document.getElementById('modal_catchAllContainer').appendChild(docFrag);
	}

	//and then set the actual modal to be that exact size
		//has to be 'offsetWidth' instead of 'getBoundingClientRect().width' because the latter includes modification made through the CSS 'transform' property which shouldn't happen
		//TODO: does this even do anything at all??
	//container.style.width  = container.offsetWidth;
	//container.style.height = container.offsetHeight;

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

	//get the DOM element
	const elem = modal_getDOMElement(modalID);

	//...and delete it (if it can even be found)
	if (elem.isDOMElement() === true) {
		elem.remove();
	}

	//and finally remove the 'modal_openModals' entry
	delete modal_openModals[modalID];

	if (updateFocus !== false) {
		modal_updateFocusOrder();
	}
}

/**	Collapses and expands the modal.
 *
 * 	Args:
 * 		modalID [Number/String]
 * 			The ID of the modal.
 *
 * 		action [String] <'toggle'>
 * 			What action should be done. Can be one of the following:
 * 				- 'collapse': Collapses the modal.
 * 				- 'expand': Expands the modal ('uncollapse' also works).
 * 				- 'toggle': Toggles the state of the modal. If it was expanded then it will be collapsed, if it was collapsed then it will be expanded.
 * 			On default or with a invalid 'action' argument it will simply pick 'toggle'.
 */
function modal_toggleCollapse (modalID, action='toggle') {
	//get the modal
	const elem = modal_getDOMElement(modalID);

	//return and complain if the modal could not be found
	if (elem.isDOMElement() !== true) {
		console.warn(`[MPO] modal_toggleCollapse() could not get the modal with ID "${modalID}".`);
		return;
	}

	//the collapsing and expanding is all done via pure CSS so all we have to do here is add/remove/toggle the class
	switch (action) {

		//collapse the modal
		case 'collapse':
			elem.classList.add('modal_collapsed');
			return;

		//expand the modal
		case 'expand':
		case 'uncollapse':
			elem.classList.remove('modal_collapsed');
			return;

		//toggle (if collapsed then expand -- if expanded then collapse)
		case 'toggle':
			//see below comment
			let nonDefault = true;
		default:
			//complain if it got in here on accident
			if (nonDefault !== true) {
				console.warn(`[MPO] modal_toggleCollapse() received a invalid 'action' argument: "${action}". It will default to using 'toggle'.`);
			}

			//actually toggle it
			elem.classList.toggle('modal_collapsed');
			return;
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

		//close modal if it isn't pinned
		if (item.status.pinned === false) {
			modal_closeModal(key);
		}
	}
}