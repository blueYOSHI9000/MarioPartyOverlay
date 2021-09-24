/**	Adds all the event listeners needed for MPO to work.
 */
function listeners_addListeners () {
	//All pointer-related events (works for both mouse-cursor and touch-screen)
	document.addEventListener('pointerdown',   listeners_pointerDown  );
	document.addEventListener('pointermove',   listeners_pointerMove  );
	document.addEventListener('pointerup',     listeners_pointerUp    );
	document.addEventListener('pointercancel', listeners_pointerCancel);

	//Fires when the user leaves or re-opens the current browser tab or similar stuff
	document.addEventListener('visibilitychange', listeners_visibilitychange);
}

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
	//return it if it's not a left- or right-click
		//docs on this: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
	if (e.button !== 0 && e.button !== 2)
		return;

	//list of all modals that have been clicked on
	let foundModals = [];

	//iterate through every element that got clicked on
	for (const key in e.path) {
		const item = e.path[key];

		//execute code only if it's the first element
			//note that key is a string for whatever stupid ass reason
		if (key == 0) {

			//check if it's a drag handle
			if (item.classList.contains('interactie_dragHandle')) {
				//get the element that actually has to be moved
				const elemToModify = interactie_getElementFromHandle(item, 'interactie_draggable');

				//check if the element is valid and, if yes, start the drag
				if (elemToModify !== false) {
					interactie_startDrag(elemToModify, e.clientY, e.clientX);
				}
			}

			//check if it's a resize handle
			if (item.classList.contains('interactie_resizeHandle')) {

				//get the element that actually has to be resized
				const elemToModify = interactie_getElementFromHandle(item, 'interactie_resizeable');

				//check if the element is valid
				if (elemToModify !== false) {
					//get 'borderSide'
						//does not need to be validated since 'interactie_startResize()' already does that
					const borderSide = item.getAttribute('interactie_borderside');

					//and finally start the resize
					interactie_startResize(elemToModify, e.clientY, e.clientX, borderSide);
				}
			}
		}

		//check if a modal has been clicked on (but only if it's the first modal)
		if (foundModals.length === 0 && item.classList.contains('modal_container')) {

			//get modalID if it exists
			let modalID = item.getAttribute('modalid');
			if (modalID !== null) {

				//focus the modal
				modal_changeFocus(item.getAttribute('modalid'));

				//push this to the list of modals found
				foundModals.push(modalID);
			}
		}

		//break if it reached <html>
		if (item.tagName === 'HTML')
			break;
	}

	//auto-close all modals that should be auto-closed
		//don't have to check whether there's an item in the array because it will simply pass undefined if it's an empty array
	modal_autoCloseModals(foundModals[0]);
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
	//move all draggable elements to the new position
	interactie_moveElements(e.clientY, e.clientX);

	//resize all elements to how they should be
	interactie_resizeElements(e.clientY, e.clientX);
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
	//return it if it's not a left- or right-click
	if (e.button !== 0 && e.button !== 2)
		return;

	//move all elements to the final position and then stop dragging
	interactie_moveElements(e.clientY, e.clientX);
	interactie_stopDrag();

	//resize all elements to the final size and then stop resizing
	interactie_resizeElements(e.clientY, e.clientX);
	interactie_stopResize();
}

/** Gets executed each time the pointer is 'canceled'. See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/pointercancel_event
 *
 * 	Gets called on the 'pointercancel' event.
 * 	This will call other parts of the program (like the dragging bits).
 * 	This function should just be here to call other functions. It shouldn't do much itself.
 *
 * 	In addition to the above, this also gets called when the user changes the tab or similar using the 'visibilitychange' event.
 */
function listeners_pointerCancel () {
	//cancel dragging & resizing (resets the positions & sizes to where they were)
	interactie_cancelDrag();
	interactie_cancelResize();
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