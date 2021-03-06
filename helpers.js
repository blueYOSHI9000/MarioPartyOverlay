//helpers.js consists of several independent functions that can be shared between projects - functions specific for this project should be in another file

/*
* Capitalize a string.
*
* @param {string} str The string to capitalize.
* @param {boolean} reverse Convert first letter to lowercase instead.
*/
function capStr (str, reverse) {
	if (reverse) {
		return str.charAt(0).toLowerCase() + str.slice(1);
	}
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/*
* Gets the InnerHTML of an element
*
* @param {string/DOM Element} elem The ID or node of the element that should be changed.
*/
function getInner (elem) {
	try {
		if (typeof elem === 'string') {
			elem = getElem(elem);
		}
		return elem.innerHTML;
	} catch (e) {
		console.error(e);
		console.error('[MPO] getInner() error, could not find: ' + id);
	}
}
/*
* Edits the InnerHTML of an element.
*
* @param {string/DOM Element} elem The ID or node of the element that should be changed.
* @param {string/boolean} value The text that it should be changed to
*/
function editInner (elem, value) {
	//console.log('id: ' + id + ', value: ' + value);
	try {
		if (typeof elem === 'string') {
			elem = getElem(elem);
		}
		elem.innerHTML = value;
	} catch (e) {
		console.error(e);
		console.error('[MPO] editInner() error, could not find: ' + id);
	}
}


/*
* Edits the value of an input element. If element is a checkbox and no value is given it changes it to the opposite instead.
*
* @param {string/DOM Element} elem The ID or node of the element that should be changed.
* @param {string/boolean} value The value that it should be changed to
*/
function editValue (elem, value) {
	//console.log('id: ' + id + ', value: ' + value);
	try {
		if (typeof elem === 'string') {
			elem = getElem(elem);
		}

		if (elem.type == 'checkbox' || elem.type == 'radio') {
			if (typeof value === 'undefined') {
				if (getValue(elem) === false){
					elem.checked = true;
				} else {
					elem.checked = false;
				}
			} else {
				if (typeof value === 'string')
					value = stringToBoolean(value);
				elem.checked = value;
			}
		} else {
			elem.value = value;
		}
	} catch (e) {
		console.error(e);
		console.error('[MPO] editValue() error, could not find: ' + id);
	}
}

/*
* Gets the value of an input element
*
* @param {string/DOM Element} elem The ID or node of the element that should be changed.
*/
function getValue (elem) {
	try {
		if (typeof elem === 'string') {
			elem = getElem(elem);
		}

		if (elem.type == 'checkbox' || elem.type == 'radio') {
			return elem.checked;
		} else {
			return elem.value;
		}
	} catch (e) {
		console.error(e);
		console.error('[MPO] getValue() error, could not find: ' + id);
	}
}

/*
* Returns DOM element.
*
* @param {string} id The ID of the element
*/
function getElem (id) {
	try {
		return document.getElementById(id);
	} catch (e) {
		console.error(e);
		console.error('[MPO] getElem() error, could not find: ' + id);
	}
}

/*
* Creates an element and returns it.
*
* @param {string} type The element type it should be.
* @param {string/DOM Element} parent The parent element, if an id is given it gets the DOM Element of it
*/
function cElem (type, parent) {
	if (typeof parent === 'string') {
		parent = getElem(parent);
	}
	var elem = document.createElement(type);
	parent.appendChild(elem);
	return elem;
}

/*
* Gets variable from URL and returns it.
*
* @param {string} variable The variable it should get.
*/
function getUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
 	return(false);
}

/*
* Converts a string into a boolean.
* Returns null if it's not a boolean.
*
* @param {string} boolean The string that should get coverted.
*/
function stringToBoolean (boolean) {
	if (boolean === 'true') {
		return true;
	} else if (boolean === 'false') {
		return false;
	} else {
		return null;
	}
}

/*
* Executes a function from a string.
*
* @param {string} functionName The name of the function that should be executed.
* @param {array} args Arguments that should be used.
*/
function executeFunctionByName (functionName, args) {
	var context = window;
	//var args = Array.prototype.slice.call(arguments, 2);
	var namespaces = functionName.split(".");
	var func = namespaces.pop();
	for (var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	//console.log('executeFunctionByName: ' + func + ' - ' + args)
	return context[func].apply(context, args);
}

/*
* Reloads the site.
*/
function reload () {
	location = location;
}

/*
* Returns the first number found in a string.
*
* @param {string} str The string.
*/
function getNumberFromString (str) {
	return str.match(/\d+/)[0];
}