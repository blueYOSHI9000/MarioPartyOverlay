// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

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
		let newElemPosY = cursorPosY + item.cursorOffsetY;
		let newElemPosX = cursorPosX + item.cursorOffsetX;

		//calculate the new bottom and right position
		const newElemPosBottom = newElemPosY + item.initialElemHeight;
		const newElemPosRight  = newElemPosX + item.initialElemWidth ;

		//calculate the previous bottom and right position
		const prevElemPosBottom = item.prevElemPosY + item.prevElemHeight;
		const prevElemPosRight  = item.prevElemPosX + item.prevElemWidth ;

		//check if element is off-screen on the top side
		if (newElemPosY < 0) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenTop === false) {
				newElemPosY = 0;

			//use previous position if new position goes even further off-screen
			} else if (newElemPosY < item.prevElemPosY) {
				newElemPosY = item.prevElemPosY;
			}

		//check if element is off-screen on the bottom side
		} else if (newElemPosBottom > screenHeight) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenBottom === false) {
				newElemPosY = screenHeight - item.initialElemHeight;

			//use previous position if new position goes even further off-screen
			} else if (newElemPosBottom > prevElemPosBottom) {
				newElemPosY = item.prevElemPosY;
			}

		//if neither are off-screen but still set as such then mark them as no longer off-screen
			//note that this has the edge-case of no longer being off-screen on the top side but still off-screen on the bottom side
			//but at that point the element would have to be too big for the screen so leaving them both marked as still off-screen would actually be better to the user can still move it around however they'd like to
		} else if (item.offScreenTop || item.offScreenBottom) {
			item.offScreenTop    = false;
			item.offScreenBottom = false;
		}

		//check if element is off-screen on the left side
		if (newElemPosX < 0) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenLeft === false) {
				newElemPosX = 0;

			//use previous position if new position goes even further off-screen
			} else if (newPosX < item.prevElemPosX) {
				newElemPosX = item.prevElemPosX;
			}

		//check if element is off-screen on the right side
		} else if (newElemPosRight > screenWidth) {

			//if it hasn't already been off-screen then place it on the edge of the screen
			if (item.offScreenRight === false) {
				newElemPosX = screenWidth - item.initialElemWidth;

			//use previous position if new position goes even further off-screen
			} else if (newElemPosRight > prevElemPosRight) {
				newElemPosX = item.prevElemPosX;
			}

		//if neither are off-screen but still set as such then mark them as no longer off-screen
			//this has a edge-case, see above comment
		} else if (item.offScreenLeft || item.offScreenRight) {
			item.offScreenLeft  = false;
			item.offScreenRight = false;
		}

		//calculate the actual offset
		let newElemOffsetY = newElemPosY - item.initialElemOffsetY;
		let newElemOffsetX = newElemPosX - item.initialElemOffsetX;

		//apply the new position
		item.elem.style.setProperty('--interaction_elemY', `${newElemPosY}px`);
		item.elem.style.setProperty('--interaction_elemX', `${newElemPosX}px`);

		//save the new value as "previous"
		item.prevElemPosY = newElemPosY;
		item.prevElemPosX = newElemPosX;

		//if element is off-screen ('&&=') then check if it is still off-screen ('interaction_isElemOffScreen')
			//this only checks if the element is off-screen if it already is off-screen but that's intentional because we don't wanna spam the check when it's on-screen
		item.currentlyOffScreen &&= interaction_isElemOffScreen(item.elem);
	}
}

/** Stops all dragging.
 */
function interaction_stopDrag () {
	//remove the in-progress class as it's no longer needed
		//note that this created an edge-case that this might still be needed if only drag has been stopped but not resize
		//that said, I currently doubt it's worth it to add an exception just for this
	for (const item of interaction_gettingModified['drag']) {
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
		item.elem.style.setProperty('--interaction_elemY'     , `${item.initialElemPosY}px`);
		item.elem.style.setProperty('--interaction_elemX'     , `${item.initialElemPosX}px`);
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

		//these save the new position and size of the element
		let newElemPosY = item.initialElemPosY;
		let newElemPosX = item.initialElemPosX;
		let newElemHeight = item.initialElemHeight;
		let newElemWidth  = item.initialElemWidth ;

		//calculate the previous bottom and right position
		const prevOffsetBottom = item.prevElemPosY + item.prevElemHeight;
		const prevOffsetRight  = item.prevElemPosX + item.prevElemWidth ;

		//skip cycle if no 'borderSide' is specified
		if (item.borderSide === undefined) {
			continue;
		}

		//calculate the new positions & sizes
			//yes, the following needs two switch cases because you can't activate multiple cases (without fall-through that is)
		switch (item.borderSide) {
			//resize the top side
			case 7:
			case 8:
			case 9:
				//calculate new position and size
				newElemPosY   = newElemPosY   - (item.initialCursorPosY - cursorPosY);
				newElemHeight = newElemHeight - (cursorPosY - item.initialCursorPosY);

				//check if the new position is off-screen
					//note that height doesn't have to be checked because if height is off-screen then it has already been off-screen before this
				if (newElemPosY < 0) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenTop === false) {
						newElemHeight = newElemHeight + newElemPosY;
						newElemPosY = 0;

					//use previous position if new position goes even further off-screen
					} else if (newElemPosY < item.prevElemPosY) {
						newElemHeight = newElemHeight + (newElemPosY - item.prevElemPosY);
						newElemPosY = item.prevElemPosY;
					}
				}
				break;

			//resize the bottom side
			case 1:
			case 2:
			case 3:
				//calculate new size
				newElemHeight = newElemHeight - (item.initialCursorPosY - cursorPosY);

				//calculate the bottom position
				var newOffsetBottom = newElemPosY + newElemHeight;

				//check if the new position is off-screen
				if (newOffsetBottom > screenHeight) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenBottom === false) {
						newElemHeight = screenHeight - newElemPosY;

					//use previous position if new position goes even further off-screen
					} else if (newOffsetBottom > prevOffsetBottom) {
						newElemHeight = item.prevElemHeight;
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
				newElemPosX  = newElemPosX  - (item.initialCursorPosX - cursorPosX);
				newElemWidth = newElemWidth - (cursorPosX - item.initialCursorPosX);

				//check if the new position is off-screen
					//note that height doesn't have to be checked because if height is off-screen then it has already been off-screen before this
				if (newElemPosX < 0) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenRight === false) {
						newElemWidth = newElemWidth + newElemPosX;
						newElemPosX = 0;

					//use previous position if new position goes even further off-screen
					} else if (newElemPosX < item.prevElemPosX) {
						newElemWidth = newElemWidth + (newElemPosX - item.prevElemPosX);
						newElemPosX = item.prevElemPosX;
					}
				}
				break;

			//resize the right side
			case 9:
			case 6:
			case 3:
				//calculate new size
				newElemWidth = newElemWidth - (item.initialCursorPosX - cursorPosX);

				//calculate the right position
				var newOffsetRight = newElemPosX + newElemWidth;

				//check if the new position is off-screen
				if (newOffsetRight > screenWidth) {

					//if it hasn't already been off-screen then place it on the edge of the screen
					if (item.offScreenRight === false) {
						newElemWidth = screenWidth - newElemPosX;

					//use previous position if new position goes even further off-screen
					} else if (newOffsetRight > prevOffsetRight) {
						newElemWidth = item.prevElemWidth;
					}
				}
				break;
		}

		//calculate the offset positions
		let newElemOffsetY      = newElemPosY   - item.initialOffsetY     ;
		let newElemOffsetX      = newElemPosX   - item.initialOffsetX     ;
		let newElemOffsetHeight = newElemHeight - item.initialOffsetHeight;
		let newElemOffsetWidth  = newElemWidth  - item.initialOffsetWidth ;

		//apply the new position and size
		item.elem.style.setProperty('--interaction_elemY'     , `${newElemPosY  }px`);
		item.elem.style.setProperty('--interaction_elemX'     , `${newElemPosX  }px`);
		item.elem.style.setProperty('--interaction_elemHeight', `${newElemHeight}px`);
		item.elem.style.setProperty('--interaction_elemWidth' , `${newElemWidth }px`);

		//apply the new sizes to the interaction object
		item.prevElemPosY     = newElemPosY  ;
		item.prevElemPosX     = newElemPosX  ;
		item.prevElemHeight   = newElemHeight;
		item.prevElemWidth    = newElemWidth ;
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
		//reset the positions
		item.elem.style.setProperty('--interaction_elemY'     , `${item.initialElemPosY}px`);
		item.elem.style.setProperty('--interaction_elemX'     , `${item.initialElemPosX}px`);

		//reset the size
		item.elem.style.setProperty('--interaction_elemHeight', `${item.initialElemHeight}px`);
		item.elem.style.setProperty('--interaction_elemWidth' , `${item.initialElemWidth }px`);
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
 * 			- initialElemHeight [Number]
 * 				The initial height of the element in px at the start of dragging/resizing.
 * 			- initialElemWidth  [Number]
 * 				The initial width  of the element in px at the start of dragging/resizing.
 *
 * 			- prevElemHeight [Number]
 * 				The height of the DOM element on the previous frame.
 * 			- prevElemWidth [Number]
 * 				The width  of the DOM element on the previous frame.
 *
 * 			- initialElemPosY [Number]
 * 				The initial Y position of the DOM element at the start of dragging/resizing.
 * 			- initialElemPosX [Number]
 * 				The initial X position of the DOM element at the start of dragging/resizing.
 *
 * 			- prevElemPosY [Number]
 * 				The Y position of the DOM element on the previous frame.
 * 			- prevElemPosX [Number]
 * 				The X position of the DOM element on the previous frame.
 *
 * 			- initialElemOffsetY [Number]
 * 				The initial Y position offset of the element at the start of dragging/resizing.
 * 			- initialElemOffsetX [Number]
 * 				The initial X position offset of the element at the start of dragging/resizing.
 *
 * 			- initialElemOffsetHeight [Number]
 * 				The initial height offset of the element at the start of dragging/resizing.
 * 			- initialElemOffsetWidth  [Number]
 * 				The initial width  offset of the element at the start of dragging/resizing.
 *
 * 			- initialCursorPosY [Number]
 * 				The initial Y position of the cursor at the start of dragging/resizing.
 * 			- initialCursorPosX [Number]
 * 				The initial X position of the cursor at the start of dragging/resizing.
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

	//get the CSS variables for the current offset
	let interaction_elemOffsetY      = elem.style.getPropertyValue('--interaction_elemOffsetY'     );
	let interaction_elemOffsetX      = elem.style.getPropertyValue('--interaction_elemOffsetX'     );
	let interaction_elemOffsetHeight = elem.style.getPropertyValue('--interaction_elemOffsetHeight');
	let interaction_elemOffsetWidth  = elem.style.getPropertyValue('--interaction_elemOffsetWidth' );

	//remove the 'px' from them (since they're variables they simply store a string, not a number in pixels)
		//and then convert it to a number
	interaction_elemOffsetY      = Number(interaction_elemOffsetY     .substring(0, interaction_elemOffsetY     .length - 2));
	interaction_elemOffsetX      = Number(interaction_elemOffsetX     .substring(0, interaction_elemOffsetX     .length - 2));
	interaction_elemOffsetHeight = Number(interaction_elemOffsetHeight.substring(0, interaction_elemOffsetHeight.length - 2));
	interaction_elemOffsetWidth  = Number(interaction_elemOffsetWidth .substring(0, interaction_elemOffsetWidth .length - 2));

	//set them to 0 if they're NaN
	if (Number.isNaN(interaction_elemOffsetY     ) === true) {
		interaction_elemOffsetY      = 0;
	}
	if (Number.isNaN(interaction_elemOffsetX     ) === true) {
		interaction_elemOffsetX      = 0;
	}
	if (Number.isNaN(interaction_elemOffsetHeight) === true) {
		interaction_elemOffsetHeight = 0;
	}
	if (Number.isNaN(interaction_elemOffsetWidth ) === true) {
		interaction_elemOffsetWidth  = 0;
	}

	//save the actual DOM Element
	this.elem = elem;

	//save the exact size
	this.initialElemHeight = offsetHeight;
	this.initialElemWidth  = offsetWidth ;

	//save the previous size of the element (which is currently the same as the initial)
	this.prevElemHeight = offsetHeight;
	this.prevElemWidth  = offsetWidth ;

	//save the initial position of the element
	this.initialElemPosY = offsetTop ;
	this.initialElemPosX = offsetLeft;

	//save the previous position of the element (which is currently the same as the initial)
	this.prevElemPosY = offsetTop ;
	this.prevElemPosX = offsetLeft;

	//set the initial offset positions
	this.initialElemOffsetY      = interaction_elemOffsetY     ;
	this.initialElemOffsetX      = interaction_elemOffsetX     ;
	this.initialElemOffsetHeight = interaction_elemOffsetHeight;
	this.initialElemOffsetWidth  = interaction_elemOffsetWidth ;

	//save the initial cursor position
	this.initialCursorPosY = cursorPosY;
	this.initialCursorPosX = cursorPosX;

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