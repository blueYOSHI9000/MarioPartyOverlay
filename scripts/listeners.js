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

	//get the first element that got hit
		//e.path is an array consisting of every element that got hit with the highest one first and the lowest one (<html>, #document and finally Window) last
	const hitElem = e.path[0];

	//check if element should be draggable (by checking if it has a class called 'draggable')
	if (hitElem.classList.contains('drag_handle')) {
		const elemToMove = drag_getDraggableElementFromHandle(hitElem);

		//start the drag but only if the element to drag could be found
		if (elemToMove !== false) {
			drag_startDrag(elemToMove, e.clientY, e.clientX);
		}
	}

	//iterate through every element that got clicked on
	let foundModal = false;
	for (const item of e.path) {
		//check if a modal has been clicked on
			//if yes then focus that modal
			//but only the first modal that got clicked on, that's what 'foundModal' is for to prevent focusing two modals at once
		if (foundModal === false && item.classList.contains('modal_container')) {
			foundModal = true;
			modal_changeFocus(item.getAttribute('modalid'));
		}

		//break if it reached the last element (#document and Window aren't needed)
		if (item.tagName === 'HTML')
			break;
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
	//move all draggable elements to the new position
	drag_moveElements(e.clientY, e.clientX);
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

	//move all element to the final position and then stop dragging
	drag_moveElements(e.clientY, e.clientX);
	drag_stopDrag();
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
	//cancel dragging (resets the positions to where they were)
	drag_cancelDrag();
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