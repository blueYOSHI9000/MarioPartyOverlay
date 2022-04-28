// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	Adds all the event listeners needed for MPO to work.
 */
function listeners_addListeners () {
	/**	Now, why the fuck is this such a huge mess?
	 * 	Well, these events all suck, that's why.
	 *
	 * 	First of all, the pointer events seem perfect at first until you realize that on mobile it's only there for simple clicks, not when you hold down your finger and move it around.
	 * 	For whatever reason 'pointermove' and 'pointerup' just stop firing if you hold your finger down and move it outside a small circle. Which means 'pointermove' and 'pointerup' are useless.
	 *
	 * 	Then there's 'mousedown' and 'touchstart' which are for mouse-cursors and touchscreens respectively.
	 * 	Yet, for whatever reason 'mousedown' fires even on touchscreen. "So, why not just use the mouse events?"
	 * 	Well, first of all the move events seem to only fire for their respective target ('mousemove' only fires for cursors, 'touchmove' only fires for touchscreens).
	 * 	Second of all, I couldn't trust these events less after this whole mess so I'd rather have both in to make sure they actually work instead of hoping that the browser fires the events even when it shouldn't.
	 *
	 * 	And to add to 'mousedown' and 'touchstart' firing both at the same time, that isn't even the end of it. If you simply touch the screen for a split-second on mobile the order is completely fucked up.
	 * 	One might think it'd be 'mousedown' > 'touchstart' > 'mouseup' > 'touchend' or something like that, right?
	 * 	No. It's 'mousedown' > 'mouseup' > 'touchstart' > 'touchend'. Great.
	 * 	I mean, it makes sense when you think about it. The browser/OS has to determine whether the touch was accidental (which is a feature apparently and it is nice that it exists).
	 * 	But that still makes it so I couldn't use both 'mousedown' and 'touchstart' at the same time and simply check whether the pointer is still down to prevent it from firing twice.
	 * 	Well, I could by using a 100ms timeout or something to prevent it from firing twice but that's a stupid workaround.
	 * 	Yes, my current solution is also stupid but arguably less stupid than using a 100ms timeout.
	 *
	 * 	So that's why I use this absolute mess.
	 *
	 * 	=== tl;dr ===
	 * 	Use 'pointerdown' instead of 'mousedown'/'touchstart' because they would both fire otherwise.
	 * 	Use 'mousemove' and 'touchmove' instead of 'pointermove' because 'pointermove' doesn't work correctly on mobile.
	 * 	Use 'mouseup' and 'touchend' instead of 'pointerup' because 'pointerup' doesn't work correctly on mobile.
	 */

	//all mouse related events
  //document.addEventListener('mousedown',   listeners_pointerDown  );
	document.addEventListener('mousemove',   listeners_pointerMove  );
	document.addEventListener('mouseup',     listeners_pointerUp    );

	//all touch related events
  //document.addEventListener('touchstart',  listeners_pointerDown  );
	document.addEventListener('touchmove',   listeners_pointerMove  );
	document.addEventListener('touchend',    listeners_pointerUp    );
	document.addEventListener('touchcancel', listeners_pointerCancel);

	//all pointer related events (mouse & touch combined)
	document.addEventListener('pointerdown',   listeners_pointerDown  );
  //document.addEventListener('pointermove',   listeners_pointerMove  );
  //document.addEventListener('pointerup',     listeners_pointerUp    );
  //document.addEventListener('pointercancel', listeners_pointerCancel);

	//fires when the user leaves or re-opens the current browser tab or similar stuff
	document.addEventListener('visibilitychange', listeners_visibilitychange);
}

//this tracks whether a pointer is held down
var listeners_activePointer = false;

/** Gets executed each time the user touches an element (whether it's on a phone or with an actual mousecursor).
 *
 * 	Gets called on the 'pointerdown' event.
 * 	This will call other parts of the program (like the dragging bits).
 * 	This function should just be here to call other functions. It shouldn't do much itself.
 *
 * 	One thing I'd like to add is that this will be executed for both left- AND right-click.
 * 	This is mainly in case a user changed the mouse-buttons and the site can't detect it, so left- and right-click will still always work.
 * 	In my testing on Windows, switching left- and right-click is detected by the site correctly but this is more a "just in case".
 * 	Especially because it still allows you to open the context-menu so this doesn't really cause any harm (aside from accidentally moving a draggable element a couple pixel when opening the context menu but that's a sacrifice I'm willing to make).
 *
 * 	Args:
 * 		e [Object]
 * 			The event object.
 */
function listeners_pointerDown (e) {
	//return if there's already a pointer held down
	if (listeners_activePointer === true) {
		return;
	}

	//return it if it's not a left- or right-click
		//docs on this: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
		//also return on undefined since 'touchstart' doesn't have a 'button' variable
	if (e.button !== 0 && e.button !== 2 && e.button !== undefined) {
		return;
	}

	//console.log('DOWN');

	//set pointer as active/held down
	listeners_activePointer = true;

	let clientY;
	let clientX;

	if (e.type === 'mousedown' || e.type === 'pointerdown') {
		clientY = e.clientY;
		clientX = e.clientX;
	} else if (e.type === 'touchstart') {
		clientY = e.touches[0].clientY;
		clientX = e.touches[0].clientX;
	}

	//list of all modals that have been clicked on
	let foundModals = [];

	//element that got hit
	let elem = e.target;

	//if it's the first loop
	let firstLoop = true;

	//list of functions to execute
		//these will all be executed at the very end
		//this can be useful if you have to create a modal since any modals created normally would immediately be closed due to them being auto-closed
	let functionsToExecute = [];

	//iterate through every element that got clicked on
	while (true) {
		//break if it reached <html>
			//I know this makes it so it never loops through <html> but it doesn't need to (hell, it doesn't even need to go through <body>)
		if (elem.tagName === 'HTML') {
			break;
		}

		//commented since there's nothing in there currently
		/*
		//execute code only if it's the first element
			//note that key is a string for whatever stupid ass reason
		if (firstLoop === true) {

			//loop through all classes and check if something has to be executed depending on the class
			for (const item of elem.classList) {
				switch (item) {

				}
			}

			//it's no longer the first time
			firstLoop = false;
		}
		*/

		//loop through all classes and check if something has to be executed depending on the class
		for (const item of elem.classList) {
			switch (item) {

				//a drag handle
				case 'interaction_dragHandle':
					//get the element that actually has to be moved
					var elemToModify = interaction_getElementFromHandle(elem, 'interaction_draggable');

					//check if the element is valid and, if yes, start the drag
					if (elemToModify !== false) {
						interaction_startDrag(elemToModify, clientY, clientX);
					}
					break;

				//a resize handle
				case 'interaction_resizeHandle':
					//get the element that actually has to be resized
					var elemToModify = interaction_getElementFromHandle(elem, 'interaction_resizeable');

					//check if the element is valid
					if (elemToModify !== false) {
						//get 'borderSide'
							//does not need to be validated since 'interaction_startResize()' already does that
						const borderSide = elem.getAttribute('interaction_borderside');

						//and finally start the resize
						interaction_startResize(elemToModify, clientY, clientX, borderSide);
					}
					break;

				//a collapse handle
				case 'modal_collapseHandle':
					modal_toggleCollapse(elem.getAttribute('data-linkedtomodal'));
					break;

				//a modal
				case 'modal_floatingModal':
					//only execute this if it's the first modal found
					if (foundModals.length === 0) {

						//get modalID if it exists
						let modalID = elem.getAttribute('data-modalid');
						if (modalID !== null) {

							//focus the modal
							modal_changeFocus(elem.getAttribute('data-modalid'));

							//push this to the list of modals found
							foundModals.push(modalID);
						}
					}
					break;

				//a counter
				case 'tracker_counter':
					updatesTracker_updateCounter(elem.getAttribute('data-counter'), parseInt(elem.getAttribute('data-player')));
					break;

				//the navbar entry for updating players
				case 'navbar_player':
					functionsToExecute.push(handleNavbar_createCharacterModal);
					break;

				//the navbar entry for updating players
				case 'navbar_player':
					//functionsToExecute.push(handleNavbar_createGameModal);
					break;

				//the navbar entry for changing the action
				case 'navbar_trackerAction':
					functionsToExecute.push(handleNavbar_changeAction);
					break;

				//the navbar entry for changing the amount
				case 'navbar_trackerAmount':
					functionsToExecute.push(handleNavbar_changeAmount);
					break;

				//the navbar entry for saving the tracker stats
				case 'navbar_saveTracker':
					functionsToExecute.push(trackerCore_saveSavefiles);
					break;

				//the navbar entry for selecting the savefile
				case 'navbar_selectSavefile':
					functionsToExecute.push(handleNavbar_createSavefileModal);
					break;

				//any input field element that should be updated when clicked on
				case 'inputfield_callUpdate':
					inputfield_executedAfterFieldChange(elem);
					break;

				//input-field labels
				case 'inputfield_label':
					inputfield_executedAfterLabelPress(elem);
					break;
			}
		}

		//continue with the parent node
		elem = elem.parentNode;
	}

	//auto-close all modals except the one that has been clicked on
		//don't have to check whether there's an item in the array because it will simply pass undefined if it's an empty array
	modal_autoCloseModals(foundModals[0]);

	//go through the list of function to execute and execute them all
	for (const item of functionsToExecute) {

		//check if it's actually a function, if not complain
		if (typeof item === 'function') {
			item();
		} else {
			console.warn(`[MPO] A non-function has been added to the 'functionsToExecute' array inside 'listeners_pointerDown()': "${item}".`);
		}
	}
}

/** Gets executed each time the user moves the cursor (or on touch devices moving the finger while touching the screen).
 *
 * 	Gets called on the 'pointermove' event.
 * 	This will call other parts of the program (like the dragging bits).
 * 	This function should just be here to call other functions. It shouldn't do much itself.
 *
 * 	Args:
 * 		e [Object]
 * 			The event object.
 */
function listeners_pointerMove (e) {
	//return if the pointer isn't held down
	if (listeners_activePointer === false)
		return;

	//console.log('MOVE');

	let clientY;
	let clientX;

	if (e.type === 'mousemove' || e.type === 'pointermove') {
		clientY = e.clientY;
		clientX = e.clientX;
	} else if (e.type === 'touchmove') {
		clientY = e.touches[0].clientY;
		clientX = e.touches[0].clientX;
	}

	//move all draggable elements to the new position
	interaction_moveElements(clientY, clientX);

	//resize all elements to how they should be
	interaction_resizeElements(clientY, clientX);
}

/** Gets executed each time the user releases the pointer (whether that's releasing the left mouse-button or releasing the finger that's touching the screen).
 *
 * 	Gets called on the 'pointerup' event.
 * 	This will call other parts of the program (like the dragging bits).
 * 	This function should just be here to call other functions. It shouldn't do much itself.
 *
 * 	Args:
 * 		e [Object]
 * 			The event object.
 */
function listeners_pointerUp (e) {
	//return if the pointer isn't held down
	if (listeners_activePointer === false)
		return;

	//return it if it's not a left- or right-click
		//and also if it's undefined since the 'touch' event doesn't have it
	if (e.button !== 0 && e.button !== 2 && e.button !== undefined)
		return;

	//console.log('UP');

	//set pointer as no longer active/held down
	listeners_activePointer = false;

	let clientY;
	let clientX;

	if (e.type === 'mouseup' || e.type === 'pointerup') {
		clientY = e.clientY;
		clientX = e.clientX;
	} else if (e.type === 'touchend') {
		//these don't have any coordinates anymore, don't ask me why, I have no fucking idea
	}

	//drag and resize them to the final coordinates
	if (clientY === undefined || clientX === undefined) {
		interaction_moveElements(clientY, clientX);
		interaction_resizeElements(clientY, clientX);
	}

	//stop dragging & resizing
	interaction_stopDrag();
	interaction_stopResize();
}

/** Gets executed each time the pointer is 'canceled'. See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/pointercancel_event
 *
 * 	Gets called when the tab goes out of focus through 'visibilitychange'. Does NOT get called on the 'pointercancel' event because that event is useless for what I'm trying to do.
 * 	This will call other parts of the program (like the dragging bits).
 * 	This function should just be here to call other functions. It shouldn't do much itself.
 *
 * 	In addition to the above, this also gets called when the user changes the tab or similar using the 'visibilitychange' event.
 */
function listeners_pointerCancel () {
	//console.log('CANCEL');

	//cancel dragging & resizing (resets the positions & sizes to where they were)
	interaction_cancelDrag();
	interaction_cancelResize();

	//set pointer as no longer active/held down
	listeners_activePointer = false;
}

/**	Gets executed when the user tabs out of the window, switches the current tab or similar. See: https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event
 *
 * 	Args:
 * 		e [Object]
 * 			The event object.
 */
function listeners_visibilitychange (e) {
	if (document.visibilityState === 'hidden') {
		listeners_pointerCancel();
	}
}