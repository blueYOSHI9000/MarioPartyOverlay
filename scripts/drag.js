/**	=== HOW DRAGGING WORKS ===
 *
 * 	- Simply have a HTML element with the class 'drag_moveable'.
 * 	- Then, have an element inside of it (doesn't matter how deep) with the class 'drag_handle'.
 * 	- That's it. Enjoy.
 *
 * 	- It's worth noting that dragging works by changing the 'left' and 'top' CSS properties so something like 'position: absolute;' has to be used on 'drag_moveable'.
 */

//An array of objects that list all elements that are currently being moved
var drag_gettingMoved = [];

/**	Starts dragging an element.
 *
 * 	Adds an element to 'drag_gettingMoved' and everything related to adding it.
 *
 * 	Args:
 * 		elemToMove [DOM Element]
 * 			The element to move.
 *
 * 		posY [Number]
 * 			The current Y-axis cursor position. Likely gotten through the 'clientY' property of an event object.
 *
 * 		posX [Number]
 * 			The current X-axis cursor position. Likely gotten through the 'clientX' property of an event object.
 */
function drag_startDrag (elemToMove, posY, posX) {
	//create the object that's gonna be added to 'drag_gettingMoved'
	let obj = {};

	obj.elemToMove = elemToMove;

	//get the exact size and position of the element
	const rect = elemToMove.getBoundingClientRect();

	//save the exact size
	obj.width  = rect.width ;
	obj.height = rect.height;

	//save the initial position
	obj.initialY = rect.top ;
	obj.initialX = rect.left;

	//calculate the difference between where the mouse is right now and where the element to move is
		//this is later needed so the element that's gonna be moved also moves relative to where the mouse is
	obj.offsetY = rect.top  - posY;
	obj.offsetX = rect.left - posX;

	//finally, push it to the gettingMoved object!
	drag_gettingMoved.push(obj);
}

/**	Moves all elements to the a new position.
 *
 * 	Args:
 * 		posY [Number]
 * 			The new Y-axis position. Likely gotten through the 'clientY' property of an event object.
 *
 * 		posX [Number]
 * 			The new X-axis position. Likely gotten through the 'clientX' property of an event object.
 */
function drag_moveElements (posY, posX) {
	//get screen size
	const screenWidth  = window.innerWidth ;
	const screenHeight = window.innerHeight;

	for (const item of drag_gettingMoved) {
		//calculate how it should be moved so it actually moves alongside the pointer
			//if you just set it to the pointer position then the top-left side of the element would be set there
			//but the user didn't start dragging it from the top-left side, they started dragging it elsewhere and as such it should move that way
		let newPosY = posY + item.offsetY;
		let newPosX = posX + item.offsetX;

		//check to make sure it doesn't go off-screen
		if (newPosY < 0) {
			newPosY = 0;
		} else if (newPosY + item.height > screenHeight) {
			newPosY = screenHeight - item.height;
		}

		//check to make sure it doesn't go off-screen
		if (newPosX < 0) {
			newPosX = 0;
		} else if (newPosX + item.width > screenWidth) {
			newPosX = screenWidth - item.width;
		}

		//apply the new position
		item.elemToMove.style.top  = newPosY + 'px';
		item.elemToMove.style.left = newPosX + 'px';
	}
}

/** Stops all dragging.
 */
function drag_stopDrag () {
	drag_gettingMoved = [];
}

/** Cancels the drag by resetting all positions (to where the drag started) and stops all dragging.
 */
function drag_cancelDrag () {
	for (const item of drag_gettingMoved) {
		//reset the positions
		item.elemToMove.style.top  = item.initialY + 'px';
		item.elemToMove.style.left = item.initialX + 'px';
	}
	drag_stopDrag();
}

/** Gets the draggable element from the handle.
 *
 * 	This searches for the element that has a class called 'drag_moveable'.
 * 	If the current element doesn't have it, it checks it's parent.
 * 	It always grabs the next parent until it reaches <html> (at which point it returns false).
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The handle element (should have the class '.drag_handle').
 *
 * 	Returns [DOM Element/Boolean]:
 * 		The element with the class 'draggable'.
 * 		If that element can't be found it returns false.
 */
function drag_getDraggableElementFromHandle (elem) {
	while (true) {
		if (elem.classList.contains('drag_moveable'))
			break;

		//return if it reached <html>
		if (elem.tagName === 'HTML') {
			console.warn('[MPO] Could not find the draggable element inside listeners_getDraggableElementFromHandle().');
			return false;
		}

		//get parent
		elem = elem.parentNode;
	}

	return elem;
}