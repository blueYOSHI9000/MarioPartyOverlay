/**	=== HOW DRAGGING WORKS ===
 *
 * 	- Simply have a HTML element with the class 'interaction_draggable'.
 * 	- Then, have an element inside of it (doesn't matter how deep) with the class 'interaction_dragHandle'.
 * 	- That's it. Enjoy.
 *
 * 	- It's worth noting that dragging works by changing the 'left' and 'top' CSS properties so something like 'position: absolute;' has to be used on 'interaction_draggable'.
 *
 *
 * 	=== IMPORTANT NOTICES ===
 * 	- It will NOT work properly if the 'transform' CSS property is applied on the element.
 * 	- It will NOT work properly when the size of the element is changing while it's being dragged/resized (aside from the size change caused by the user resizing it of course).
 */

/**	#####################
 * 	=== DRAGGING CODE ===
 * 	#####################
 */

//Lists every element that's currently being modified.
	//See 'interaction_InteractionObject()' at the bottom for a documentation on what each array entry is like
	//.drag   lists each element getting moved
	//.resize lists each element getting moved
var interaction_gettingModified = {
	drag: [],
	resize: []
};

/**	Starts dragging an element.
 *
 * 	Adds an element to 'interaction_gettingMoved' and everything related to adding it.
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
function interaction_startDrag (elem, cursorPosY, cursorPosX) {
	//create the object that's gonna be added to 'interaction_gettingMoved'
	let obj = new interaction_InteractionObject(elem, cursorPosY, cursorPosX);

	//finally, push it to the gettingModified object!
	interaction_gettingModified.drag.push(obj);

	//add the 'interaction_inProgress' class to the element to prevent the user from accidentally selecting stuff
	elem.classList.add('interaction_inProgress');
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
function interaction_moveElements (cursorPosY, cursorPosX) {
	//get screen size
	const screenWidth  = window.innerWidth ;
	const screenHeight = window.innerHeight;

	for (const item of interaction_gettingModified.drag) {
		//calculate how it should be moved so it actually moves alongside the pointer
			//if you just set it to the pointer position then the top-left side of the element would be set there
			//but the user didn't start dragging it from the top-left side, they started dragging it elsewhere and as such it should move that way
		let newPosY = cursorPosY + item.cursorOffsetY;
		let newPosX = cursorPosX + item.cursorOffsetX;

		//calculate the new bottom and right position
		const newOffsetBottom = newPosY + item.height;
		const newOffsetRight  = newPosX + item.width ;

		//calculate the previous bottom and right position
		const previousOffsetBottom = item.previousY + item.height;
		const previousOffsetRight  = item.previousX + item.width ;

		//check if element is off-screen on the top side
		if (newPosY < 0) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenTop === false) {
				newPosY = 0;

			//use previous position if new position goes even further off-screen
			} else if (newPosY < item.previousY) {
				newPosY = item.previousY;
			}

		//check if element is off-screen on the bottom side
		} else if (newOffsetBottom > screenHeight) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenBottom === false) {
				newPosY = screenHeight - item.height;

			//use previous position if new position goes even further off-screen
			} else if (newOffsetBottom > previousOffsetBottom) {
				newPosY = item.previousY;
			}

		//if neither are off-screen but still set as such then mark them as no longer off-screen
			//note that this has the edge-case of no longer being off-screen on the top side but still off-screen on the bottom side
			//but at that point the element would have to be too big for the screen so leaving them both marked as still off-screen would actually be better to the user can still move it around however they'd like to
		} else if (item.offScreenTop || item.offScreenBottom) {
			item.offScreenTop    = false;
			item.offScreenBottom = false;
		}

		//check if element is off-screen on the left side
		if (newPosX < 0) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenLeft === false) {
				newPosX = 0;

			//use previous position if new position goes even further off-screen
			} else if (newPosX < item.previousX) {
				newPosX = item.previousX;
			}

		//check if element is off-screen on the right side
		} else if (newOffsetRight > screenWidth) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenRight === false) {
				newPosX = screenWidth - item.width;

			//use previous position if new position goes even further off-screen
			} else if (newOffsetRight > previousOffsetRight) {
				newPosX = item.previousX;
			}

		//if neither are off-screen but still set as such then mark them as no longer off-screen
			//this has a edge-case, see above comment
		} else if (item.offScreenLeft || item.offScreenRight) {
			item.offScreenLeft    = false;
			item.offScreenRight = false;
		}

		//apply the new position
		item.elem.style.top  = `${newPosY}px`;
		item.elem.style.left = `${newPosX}px`;

		//save the new value as 'previous'
		item.previousY = newPosY;
		item.previousX = newPosX;

		//check if element is still off-screen
			//but only do it if it already is off-screen to keep performance at least somewhat decent
		if (item.currentlyOffScreen === true) {
			item.currentlyOffScreen = interaction_isElemOffScreen(item.elem);
		}
	}
}

/** Stops all dragging.
 */
function interaction_stopDrag () {
	//remove the in-progress class as it's no longer needed
		//note that this created an edge-case that this might still be needed if only drag has been stopped but not resize
		//that said, I currently doubt it's worth it to add an exception just for this
	for (const item of interaction_gettingModified['resize']) {
		item.elem.classList.remove('interaction_inProgress');
	}

	//empty the array
	interaction_gettingModified['drag'].length = 0;
}

/** Cancels the drag by resetting all positions (to where the drag started) and stops all dragging.
 */
function interaction_cancelDrag () {
	for (const item of interaction_gettingModified.drag) {
		//reset the positions
		item.elem.style.top  = `${item.initialY}px`;
		item.elem.style.left = `${item.initialX}px`;
	}
	interaction_stopDrag();
}

/**	###################
 * 	=== RESIZE CODE ===
 * 	###################
 */

//An array of objects that list all elements that are currently being moved
var interaction_gettingResized = [];

/**	Starts resizing an element.
 *
 * 	Adds an element to 'interaction_gettingResized' and everything related to adding it.
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
function interaction_startResize (elem, cursorPosY, cursorPosX, borderSide) {
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

	//create the object that's gonna be added to 'interaction_gettingMoved'
	let obj = new interaction_InteractionObject(elem, cursorPosY, cursorPosX, borderSide);

	//finally, push it to the gettingModified object!
	interaction_gettingModified.resize.push(obj);

	//add the 'interaction_inProgress' class to the element to prevent the user from accidentally selecting stuff
	elem.classList.add('interaction_inProgress');
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
function interaction_resizeElements (cursorPosY, cursorPosX) {
	//get screen size
	const screenWidth  = window.innerWidth ;
	const screenHeight = window.innerHeight;

	for (const item of interaction_gettingModified.resize) {
		//this is the initial cursor position
		const initialCursorPosY = item.cursorY;
		const initialCursorPosX = item.cursorX;

		//these save the new position and size of the element
		let newPosY = item.initialY;
		let newPosX = item.initialX;
		let newHeight = item.height;
		let newWidth  = item.width ;

		//calculate the previous bottom and right position
		const previousOffsetBottom = item.previousY + item.previousHeight;
		const previousOffsetRight  = item.previousX + item.previousWidth ;

		//skip cycle if no 'borderSide' is specified
		if (item.borderSide === undefined)
			continue;

		//calculate the new positions & sizes
			//yes, the following needs two switch cases because you can't activate multiple cases (without fall-through that is)
		switch (item.borderSide) {
			//resize the top side
			case 7:
			case 8:
			case 9:
				//calculate new position and size
				newPosY   = newPosY   - (initialCursorPosY - cursorPosY);
				newHeight = newHeight - (cursorPosY - initialCursorPosY);

				//check if the new position is off-screen
					//note that height doesn't have to be checked because if height is off-screen then it has already been off-screen before this
				if (newPosY < 0) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenTop === false) {
						newHeight = newHeight + newPosY;
						newPosY = 0;

					//use previous position if new position goes even further off-screen
					} else if (newPosY < item.previousY) {
						newHeight = newHeight + (newPosY - item.previousY);
						newPosY = item.previousY;
					}
				}
				break;

			//resize the bottom side
			case 1:
			case 2:
			case 3:
				//calculate new size
				newHeight = newHeight - (initialCursorPosY - cursorPosY);

				//calculate the bottom position
				var newOffsetBottom = newPosY + newHeight;

				//check if the new position is off-screen
				if (newOffsetBottom > screenHeight) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenBottom === false) {
						newHeight = screenHeight - newPosY;

					//use previous position if new position goes even further off-screen
					} else if (newOffsetBottom > previousOffsetBottom) {
						newHeight = item.previousHeight;
					}
				}
				break;
		}

		switch (item.borderSide) {
			//resize the left side
			case 7:
			case 4:
			case 1:
				//calculate new position and size
				newPosX  = newPosX  - (initialCursorPosX - cursorPosX);
				newWidth = newWidth - (cursorPosX - initialCursorPosX);

				//check if the new position is off-screen
					//note that height doesn't have to be checked because if height is off-screen then it has already been off-screen before this
				if (newPosX < 0) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenRight === false) {
						newWidth = newWidth + newPosX;
						newPosX = 0;

					//use previous position if new position goes even further off-screen
					} else if (newPosX < item.previousX) {
						newWidth = newWidth + (newPosX - item.previousX);
						newPosX = item.previousX;
					}
				}
				break;

			//resize the right side
			case 9:
			case 6:
			case 3:
				//calculate new size
				newWidth = newWidth - (initialCursorPosX - cursorPosX);

				//calculate the right position
				var newOffsetRight = newPosX + newWidth;

				//check if the new position is off-screen
				if (newOffsetRight > screenWidth) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenRight === false) {
						newWidth = screenWidth - newPosX;

					//use previous position if new position goes even further off-screen
					} else if (newOffsetRight > previousOffsetRight) {
						newWidth = item.previousWidth;
					}
				}
				break;
		}

		//apply the new position and size
		item.elem.style.top    = `${newPosY  }px`;
		item.elem.style.left   = `${newPosX  }px`;
		item.elem.style.height = `${newHeight}px`;
		item.elem.style.width  = `${newWidth }px`;

		//apply the new sizes to the interaction object
		item.previousY = newPosY;
		item.previousX = newPosX;
		item.previousHeight = newHeight;
		item.previousWidth  = newWidth ;
	}
}

/** Stops all resizing.
 */
function interaction_stopResize () {
	//remove the in-progress class as it's no longer needed
		//note that this created an edge-case that this might still be needed if only resize has been stopped but not drag
		//that said, I currently doubt it's worth it to add an exception just for this
	for (const item of interaction_gettingModified['resize']) {
		item.elem.classList.remove('interaction_inProgress');
	}

	//empty the array
	interaction_gettingModified['resize'].length = 0;
}

/** Cancels the drag by resetting all positions (to where the drag started) and stops all dragging.
 */
function interaction_cancelResize () {
	for (const item of interaction_gettingModified.drag) {
		//reset the positions //TODO: add size reset
		item.elem.style.top  = `${item.initialY}px`;
		item.elem.style.left = `${item.initialX}px`;
	}
	interaction_stopResize();
}

/**	####################
 * 	=== GENERAL CODE ===
 * 	####################
 */


/**	Creates a interaction object that's needed whenever an interaction like dragging or resizing starts.
 *
 * 	Should be called the following way: "new interaction_InteractionObject()" (with arguments of course).
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
 * 			See 'interaction_startResize()' on how this works. Defaults to undefined as it's not always applicable.
 *
 * 	Constructs:
 * 		An object that contains the following properties:
 *
 * 			- elem [DOM Element]
 * 				The original DOM element.
 *
 * 			- height [Number]
 * 				The height of the element in px.
 * 			- width  [Number]
 * 				The width  of the element in px.
 *
 * 			- previousHeight [Number]
 * 				The height of the DOM element on the previous frame.
 * 			- previousWidth [Number]
 * 				The width  of the DOM element on the previous frame.
 *
 * 			- initialY [Number]
 * 				The initial Y position of the DOM element.
 * 			- initialX [Number]
 * 				The initial X position of the DOM element.
 *
 * 			- previousY [Number]
 * 				The Y position of the DOM element on the previous frame.
 * 			- previousX [Number]
 * 				The X position of the DOM element on the previous frame.
 *
 * 			- cursorOffsetY [Number]
 * 				The vertical   difference between where the cursor is and where the top  side of the element is.
 * 			- cursorOffsetX [Number]
 * 				The horizontal difference between where the cursor is and where the left side of the element is.
 *
 * 			- borderSide [Number] <undefined>
 * 				See 'interaction_startResize()' on how this works. Defaults to undefined as it's not always applicable.
 *
 * 			- offScreenTop    [Boolean] <*automatically calculated*>
 * 			- offScreenRight  [Boolean] <*automatically calculated*>
 * 			- offScreenBottom [Boolean] <*automatically calculated*>
 * 			- offScreenLeft   [Boolean] <*automatically calculated*>
 * 				Whether the element is off-screen. Note that these will be true if even a single pixel is off-screen.
 */
function interaction_InteractionObject (elem, cursorPosY, cursorPosX, borderSide) {
	//get the window size
	const screenWidth  = window.innerWidth ;
	const screenHeight = window.innerHeight;

	//calculate and save all the 'offset' values now
		//not sure if JS calculates them from scratch each time you use the values but eh, too lazy to test it right now
	const offsetLeft   = elem.offsetLeft  ;
	const offsetTop    = elem.offsetTop   ;
	const offsetWidth  = elem.offsetWidth ;
	const offsetHeight = elem.offsetHeight;

	const offsetRight  = offsetLeft + offsetWidth ;
	const offsetBottom = offsetTop  + offsetHeight;

	//save the actual DOM Element
	this.elem = elem;

	//save the exact size
	this.width  = offsetWidth ;
	this.height = offsetHeight;

	//save the previous size of the element (which is currently the same as the initial)
	this.previousHeight = offsetHeight;
	this.previousWidth  = offsetWidth ;

	//save the initial position of the element
	this.initialY = offsetTop ;
	this.initialX = offsetLeft;

	//save the previous position of the element (which is currently the same as the initial)
	this.previousY = offsetTop ;
	this.previousX = offsetLeft;

	//save the initial cursor position
	this.cursorY = cursorPosY;
	this.cursorX = cursorPosX;

	//calculate the difference between where the mouse is right now and where the element to move is
		//this is later needed so the element that's gonna be moved also moves relative to where the mouse is
	this.cursorOffsetY = offsetTop  - cursorPosY;
	this.cursorOffsetX = offsetLeft - cursorPosX;

	//set borderSide
	this.borderSide = borderSide;

	//check whether the element is off-screen and set the according variables
	this.offScreenTop    = (offsetTop    < 0           );
	this.offScreenRight  = (offsetRight  > screenWidth );
	this.offScreenBottom = (offsetBottom > screenHeight);
	this.offScreenLeft   = (offsetLeft   < 0           );
}

/** Gets the draggable element from the handle.
 *
 * 	This searches for the element that has a class called 'interaction_moveable'.
 * 	If the current element doesn't have it, it checks it's parent.
 * 	It always grabs the next parent until it reaches <html> (at which point it returns false).
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The handle element (should have the class '.interaction_handle').
 *
 * 	Returns [DOM Element/Boolean]:
 * 		The element with the class 'draggable'.
 * 		If that element can't be found it returns false.
 */
function interaction_getElementFromHandle (elem, className) {
	while (true) {
		if (elem.classList.contains(className))
			break;

		//return if it reached <html>
		if (elem.tagName === 'HTML') {
			console.warn(`[MPO] Could not find the "${className}" element inside listeners_getElementFromHandle().`);
			return false;
		}

		//get parent
		elem = elem.parentNode;
	}

	return elem;
}