/**	=== THE "Modal Object" ===
 *
 * 	A "Modal Object" includes all info about the modal itself.
 * 	It consists of the following:
 *
 *		- class [String]
 *			- What the modal is about. Can be one of the following:
 * 				- testo: Simply creates a box. Only really used for testing.
 *				- characterSelection: Allows the user to select which character they wanna use.
 *				- playerSelection: Allows the user to select one of the current players. Likely used to determine who got hit by an item.
 *
 *		- variables [Object]
 *			- An object consisting of variables. Which variables can be used depend on what the 'modalClass' is:
 * 				- testo:
 * 					- No variables are needed. 'modalVariables' can simply be an empty object.
 *
 *		- specifics [Object]
 *			- An object that consists of the following:
 *				- resizable [Boolean] <true>
 *					- If the modal can be resized. Defaults to true.
 *				- openOnTop [Boolean] <true>
 * 					- If the Modal should open on top, if true then it will immediately be the focus. Defaults to true.
 * 					- If false it will open it at the very bottom.
 *
 *		- parent [String]
 *			- To what part of the site it belongs to.
 * 			- Will be used so the modals are closed whenever they're no longer needed (like when another navbar modal is opened all other navbar modals would be closed).
 * 			- Can be one of the following:
 *				- navbar: Belongs to navbar.
 *				- currentAssistTurn: Belongs to the current assist player. Will be closed once the turn is done.
 */

//lists all open Modals, each modal has the ID as it's name (so the modal with the ID 4 can be accessed via 'modal_openModals[4]')
	//and yes, this has to be an object so the name of each item will always be the same, even if an entry is deleted (which wouldn't be the case for arrays)
var modal_openModals = {};

//the order of modals, each item is a modal ID
	//the active modal comes first while the modal at the bottom comes last
var modal_focusOrder = [];

//the total of modals opened (not current modals, just total since the site loaded)
var modal_totalModalsMade = 0;

/** Creates a new modal window (or simply 'modal').
 *
 * 	Use this to create a test-window: "modal_createModal({class: 'testo', parent: 'navbar', specifics: {}, variables: {}});"
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

	//get the modal ID
	const modalID = modal_totalModalsMade;

	//set the modal ID
	modalObj.id = modalID;

	//fill in the 'modalObj.specifics' object with defaults
	modalObj.specifics = fillInObject(modalObj.specifics, {
		resizable: true,
		openOnTop: true
	});

	//create the 'modal_openModals' entry
		//has to be made at the beginning of this function so it can be found via the ID in case something goes wrong because it can't be force-closed without it being accessible by ID
	modal_openModals[modalID] = modalObj;

	//get all CSS classes
	let cssClasses = ['modal_container', 'drag_moveable'];

		//push the modalClass specific one
	cssClasses.push('modalClass-' + modalObj.class);

	//create the actual modal
	const container = cElem('span', 'modal_catchAllContainer', {
		class      : cssClasses.join(' '),
		modalID   : modalObj.id,
		modalClass : modalObj.class,
		modalParent: modalObj.parent
	});

	//create the menu bar
	const menuBar = cElem('span', container, {class: 'modal_menuBar'});

	//add elements to the menu bar
	const dragIcon = cElem('span', menuBar, {class: 'drag_handle'});
	dragIcon.innerText = 'MOVE ME, DUMBASS!';

	//create the main body
	const main = cElem('span', container, {class: 'modal_main'});

	//make changes based on which modalClass it is
	switch (modalObj.class) {
		case 'testo':
			break;
	}

	//get the exact width and height of the full modal
		//my senses say this shouldn't work since I feel like this element shouldn't have an actual height-width but it does and it works this way
		//so if it ever breaks, try creating another container within this element and use that instead
	const rect = container.getBoundingClientRect();

	//and then set the actual modal to be that exact size
	container.style.width  = rect.width;
	container.style.height = rect.height;

	//add the new modal to the focus-order list and also focus it if needed
	modal_focusOrder.push(modalID);
	if (modalObj.specifics.openOnTop === true) {
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

		//get element by using the custom 'modalid' attribute
		const elem = document.querySelector('[modalid="' + key + '"]');

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