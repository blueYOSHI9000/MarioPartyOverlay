/* Small note because I feel like I should clarify this, the file is called 'interactie.js' because 'interact.js' is already the name of a library and since I know the "Naming 101" rules of simply using the word in another language I took the Dutch word since the greek one sucked and the latin one was "Penitus".

tl;dr the filename for this is really just 'interact.js' but in Dutch.
*/

/**	=== HOW DRAGGING WORKS ===
 *
 * 	- Simply have a HTML element with the class 'interactie_draggable'.
 * 	- Then, have an element inside of it (doesn't matter how deep) with the class 'interactie_dragHandle'.
 * 	- That's it. Enjoy.
 *
 * 	- It's worth noting that dragging works by changing the 'left' and 'top' CSS properties so something like 'position: absolute;' has to be used on 'interactie_draggable'.
 */

/**	#####################
 * 	=== DRAGGING CODE ===
 * 	#####################
 */

//Lists every element that's currently being modified.
	//See 'interactie_InteractieObject()' at the bottom for a documentation on what each array entry is like
	//.drag   lists each element getting moved
	//.resize lists each element getting moved
var interactie_gettingModified = {
	drag: [],
	resize: []
};

/**	Starts dragging an element.
 *
 * 	Adds an element to 'interactie_gettingMoved' and everything related to adding it.
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The element to move.
 *
 * 		cursorPosY [Number]
 * 			The current Y-axis cursor position. Likely gotten through the 'clientY' property of an event object.
 *
 * 		cursorPosX [Number]
 * 			The current X-axis cursor position. Likely gotten through the 'clientX' property of an event object.
 */
function interactie_startDrag (elem, cursorPosY, cursorPosX) {
	//create the object that's gonna be added to 'interactie_gettingMoved'
	let obj = new interactie_InteractieObject(elem, cursorPosY, cursorPosX);

	//finally, push it to the gettingModified object!
	interactie_gettingModified.drag.push(obj);
}

/**	Moves all elements to the new position.
 *
 * 	Args:
 * 		cursorPosY [Number]
 * 			The current Y-axis cursor position. Likely gotten through the 'clientY' property of an event object.
 *
 * 		cursorPosX [Number]
 * 			The current X-axis cursor position. Likely gotten through the 'clientX' property of an event object.
 */
function interactie_moveElements (cursorPosY, cursorPosX) {
	//get screen size
	const screenWidth  = window.innerWidth ;
	const screenHeight = window.innerHeight;

	for (const item of interactie_gettingModified.drag) {
		//calculate how it should be moved so it actually moves alongside the pointer
			//if you just set it to the pointer position then the top-left side of the element would be set there
			//but the user didn't start dragging it from the top-left side, they started dragging it elsewhere and as such it should move that way
		let newCursorPosY = cursorPosY + item.cursorOffsetY;
		let newCursorPosX = cursorPosX + item.cursorOffsetX;

		//check to make sure it doesn't go off-screen
		if (newCursorPosY < 0) {
			newCursorPosY = 0;
		} else if (newCursorPosY + item.height > screenHeight) {
			newCursorPosY = screenHeight - item.height;
		}

		//check to make sure it doesn't go off-screen
		if (newCursorPosX < 0) {
			newCursorPosX = 0;
		} else if (newCursorPosX + item.width > screenWidth) {
			newCursorPosX = screenWidth - item.width;
		}

		//apply the new position
		item.elem.style.top  = `${newCursorPosY}px`;
		item.elem.style.left = `${newCursorPosX}px`;
	}
}

/** Stops all dragging.
 */
function interactie_stopDrag () {
	interactie_gettingModified.drag = [];
}

/** Cancels the drag by resetting all positions (to where the drag started) and stops all dragging.
 */
function interactie_cancelDrag () {
	for (const item of interactie_gettingModified.drag) {
		//reset the positions
		item.elem.style.top  = `${item.initialY}px`;
		item.elem.style.left = `${item.initialX}px`;
	}
	interactie_stopDrag();
}

/**	###################
 * 	=== RESIZE CODE ===
 * 	###################
 */

//An array of objects that list all elements that are currently being moved
var interactie_gettingResized = [];

/**	Starts resizing an element.
 *
 * 	Adds an element to 'interactie_gettingResized' and everything related to adding it.
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The element to resize.
 *
 * 		cursorPosY [Number]
 * 			The current Y-axis cursor position. Likely gotten through the 'clientY' property of an event object.
 *
 * 		cursorPosX [Number]
 * 			The current X-axis cursor position. Likely gotten through the 'clientX' property of an event object.
 *
 * 		borderSide [Number/String]
 * 			At which side the border was grabbed. Type can be anything, it will properly check to make sure it's valid. Strings will also be properly converted into Numbers.
 * 			Following numbers can be used:
 * 				7 8 9
 * 				4   6
 * 				1 2 3
 * 			7 is top-left, 8 is top center, etc.
 * 			Top/Bottom/Left/Right can only resize in one direction while the diagonals can resize in two directions (it works the same way resizing regular windows from the OS works).
 *
 * 	Returns [Boolean/undefined]:
 * 		Returns false if 'borderSide' is invalid. Otherwise it returns nothing (which is undefined).
 */
function interactie_startResize (elem, cursorPosY, cursorPosX, borderSide) {
	//convert string to number
	borderSide = parseInt(borderSide);

	//check to make sure 'borderSide' is valid
	switch (borderSide) {
		case 1:
		case 2:
		case 3:
		case 4:
		//case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			break;
		default:
			return false;
	}

	//create the object that's gonna be added to 'interactie_gettingMoved'
	let obj = new interactie_InteractieObject(elem, cursorPosY, cursorPosX, borderSide);

	//finally, push it to the gettingModified object!
	interactie_gettingModified.resize.push(obj);
}

/**	Resizes all elements to the new size.
 *
 * 	Args:
 * 		cursorPosY [Number]
 * 			The current Y-axis cursor position. Likely gotten through the 'clientY' property of an event object.
 *
 * 		cursorPosX [Number]
 * 			The current X-axis cursor position. Likely gotten through the 'clientX' property of an event object.
 */
function interactie_resizeElements (cursorPosY, cursorPosX) {
	for (const item of interactie_gettingModified.resize) {
		//this is the initial cursor position
		const initialCursorPosY = item.cursorY;
		const initialCursorPosX = item.cursorX;

		//these save the new position and size of the element
		let elemPosY = item.initialY;
		let elemPosX = item.initialX;
		let elemHeight = item.height;
		let elemWidth  = item.width ;

		//skip cycle if no 'borderSide' is specified
		if (item.borderSide === undefined)
			continue;

		//yes, the following needs two switch cases because you can't activate multiple cases (without fall-through that is)

		switch (item.borderSide) {
			//resize the top side
			case 7:
			case 8:
			case 9:
				elemPosY = elemPosY - (initialCursorPosY - cursorPosY);
				elemHeight = elemHeight - (cursorPosY - initialCursorPosY);
				break;
			//resize the bottom side
			case 1:
			case 2:
			case 3:
				elemHeight = elemHeight - (initialCursorPosY - cursorPosY);
				break;
		}

		switch (item.borderSide) {
			//resize the right side
			case 9:
			case 6:
			case 3:
				elemWidth = elemWidth - (initialCursorPosX - cursorPosX);
				break;

			//resize the left side
			case 7:
			case 4:
			case 1:
				elemPosX = elemPosX - (initialCursorPosX - cursorPosX);
				elemWidth = elemWidth - (cursorPosX - initialCursorPosX);
				break;
		}

		//apply the new position and size
		item.elem.style.top    = `${elemPosY  }px`;
		item.elem.style.left   = `${elemPosX  }px`;
		item.elem.style.height = `${elemHeight}px`;
		item.elem.style.width  = `${elemWidth }px`;
	}
}

/** Stops all resizing.
 */
function interactie_stopResize () {
	interactie_gettingModified.resize = [];
}

/** Cancels the drag by resetting all positions (to where the drag started) and stops all dragging.
 */
function interactie_cancelResize () {
	for (const item of interactie_gettingModified.drag) {
		//reset the positions //TODO: add size reset
		item.elem.style.top  = `${item.initialY}px`;
		item.elem.style.left = `${item.initialX}px`;
	}
	interactie_stopResize();
}

/**	####################
 * 	=== GENERAL CODE ===
 * 	####################
 */


/**	Creates a interactie object that's needed whenever an interaction like dragging or resizing starts.
 *
 * 	Should be called the following way: "new interactie_InteractieObject()" (with arguments of course).
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The DOM element that's gonna be modified.
 *
 * 		cursorPosY [Number]
 * 			The initial Y-axis cursor position. Likely gotten through the 'clientY' property of an event object.
 *
 * 		cursorPosX [Number]
 * 			The initial X-axis cursor position. Likely gotten through the 'clientX' property of an event object.
 *
 * 		borderSide [Number] <undefined>
 * 			See 'interactie_startResize()' on how this works. Defaults to undefined as it's not always applicable.
 *
 * 	Constructs:
 * 		An object that contains the following properties:
 * 			- elem [DOM Element]
 * 				- The original DOM element.
 * 			- height [Number]
 * 				- The height of the element in px.
 * 			- width  [Number]
 * 				- The width  of the element in px.
 * 			- initialY [Number]
 * 				- The initial Y position of the DOM element.
 * 			- initialX [Number]
 * 				- The initial X position of the DOM element.
 * 			- cursorOffsetY [Number]
 * 				- The vertical   difference between where the cursor is and where the top  side of the element is.
 * 			- cursorOffsetX [Number]
 * 				- The horizontal difference between where the cursor is and where the left side of the element is.
 * 			- borderSide [Number] <undefined>
 * 				- See 'interactie_startResize()' on how this works. Defaults to undefined as it's not always applicable.
 */
function interactie_InteractieObject (elem, cursorPosY, cursorPosX, borderSide) {
	//save the actual DOM Element
	this.elem = elem;

	//get the exact size and position of the element
	const rect = elem.getBoundingClientRect();

	//save the exact size
	this.width  = rect.width ;
	this.height = rect.height;

	//save the initial position of the element
	this.initialY = rect.top ;
	this.initialX = rect.left;

	//save the initial cursor position
	this.cursorY = cursorPosY;
	this.cursorX = cursorPosX;

	//calculate the difference between where the mouse is right now and where the element to move is
		//this is later needed so the element that's gonna be moved also moves relative to where the mouse is
	this.cursorOffsetY = rect.top  - cursorPosY;
	this.cursorOffsetX = rect.left - cursorPosX;

	//set borderSide
	this.borderSide = borderSide;
}

/** Gets the draggable element from the handle.
 *
 * 	This searches for the element that has a class called 'interactie_moveable'.
 * 	If the current element doesn't have it, it checks it's parent.
 * 	It always grabs the next parent until it reaches <html> (at which point it returns false).
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The handle element (should have the class '.interactie_handle').
 *
 * 	Returns [DOM Element/Boolean]:
 * 		The element with the class 'draggable'.
 * 		If that element can't be found it returns false.
 */
function interactie_getElementFromHandle (elem, className) {
	while (true) {
		if (elem.classList.contains(className))
			break;

		//return if it reached <html>
		if (elem.tagName === 'HTML') {
			console.warn(`[interactie.js] Could not find the "${className}" element inside listeners_getElementFromHandle().`);
			return false;
		}

		//get parent
		elem = elem.parentNode;
	}

	return elem;
}