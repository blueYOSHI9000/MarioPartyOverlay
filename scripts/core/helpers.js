// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== NOTE ABOUT HELPERS ===
 *
 * 	All functions in this file have to be self-contained. No calls to outside this file are allowed (preferably not even to other functions in this file).
 * 	This is because this file is loaded first, any calls to outside would break this.
 * 	Additionally, it should also be possible to simply take this file and move it to another project.
 *
 * 	Also, since most of these functions are likely called a lot it's prefered to keep them as compact as possible.
 * 	They still have to be readable and include a bare minimum of comments but generally they don't have to be too fancy.
 * 	This also means that a 'helper_' prefix is not needed on any functions (though still global variables).
 */

/**	Loads all stylesheets specified.
 *
 *	Creates one <link rel="stylesheet" href="[href]"> element for each item specified (with the appropriate 'href' of course).
 *
 *	Args:
 *		styles [Array]
 *			An array of all stylesheets to be loaded.
 *			Each item is a string consisting of a relative path to the css file (like 'scripts/boot.js').
 *
 *	Returns [Array]:
 *		An array of all <link> elements created.
 */
function loadStyles (styles) {
	if (styles.length === 0) {
		console.warn('[helpers.js] loadStyles() received an empty array.');
		return [];
	}
	let elemList = [];
	styles.forEach(element => {
		var styleElem = document.createElement('link');
		styleElem.rel = 'stylesheet';
		styleElem.href = element;
		elemList.push(document.getElementsByTagName('head')[0].appendChild(styleElem));
	});
	return elemList;
}

/**	Loads all scripts specified.
 *
 *	Creates one <script type="text/javascript" src="[src]" onLoad="boot_scriptLoaded()"> element for each item specified (with the appropriate 'src' of course).
 *	'boot_scriptLoaded()' keeps track of how many scripts have been loaded so far which is important so MPO can execute something once all scripts have been loaded.
 *
 *	Args:
 *		scripts [Array]
 *			An array of all script files to be loaded.
 *			Each item is a string consisting of a relative path to the script file (like 'scripts/boot.js').
 *
 * 		onload [Function/String] <none>
 * 			The function that should be applied to the 'onload' attribute.
 * 			If a function is provided it will be called with the file-name as it's first argument. If a string is provided it will simply be used as the 'onload' attribute as-is.
 *
 *	Returns [Array]:
 *		An array of all <script> elements created.
 */
function loadScripts (scripts, onload) {
	if (scripts.length === 0) {
		console.warn('[helpers.js] loadScripts() received an empty array.');
		return [];
	}
	let elemList = [];
	scripts.forEach(element => {
		//create a <script> element and add the necessary attributes to it
		var scriptElem = document.createElement('script');
		scriptElem.src = element;
		scriptElem.type = 'text/javascript';

		//get the actual file name (needed to keep track of which files have already been loaded)
		let fileName = element.split('/');
		fileName = fileName[fileName.length - 1];

		//set the 'onload' attribute as a simple string
		if (typeof onload === 'string') {
			scriptElem.setAttribute('onload', onload);

		//use a arrow-function so the argument can be passed
		} else if (typeof onload === 'function') {
			scriptElem.onload = () => {onload(fileName)};
		}

		//and finally, add it to 'elemList' which will then be returned
		elemList.push(document.getElementsByTagName('head')[0].appendChild(scriptElem));
	});
	return elemList;
}

/**	Creates an element and returns it.
 *
 *	Args:
 *		type [String]
 *			The type of element it should be. 'span' for <span> and so on.
 *
 *		parent [String/DOM Element/null]
 *			The element it should be created in.
 *			Can be either a DOM Element or the ID of the element as a string.
 * 			Will return false if the parent can't be found.
 *
 * 			Alternatively this can also be null, in which case the element won't be appended at all (it'll simply be created using 'document.createElement()' and nothing more).
 * 			This should only be used if the element will be appended manually afterwards.
 *
 *		attributes [Object]
 *			A list of attributes the element should have. {src: 'scripts/boot.js'} would give the element a 'src="scripts/boot.js"' attribute.
 *
 *	Returns [DOM Element/Boolean]:
 *		The DOM Element that was created.
 * 		If it couldn't be created due to the specified parent not existing then it'll simply return false.
 */
function cElem (type, parent, attributes) {
	//if the element should be appended to it's parent
		//if 'parent' is null then it should be skipped
	const appendElem = (parent === null) ? false : true;

	//get parent by ID
	if (typeof parent === 'string') {
		parent = document.getElementById(parent);
	}

	//return if 'parent' isn't valid
		//but only return if the element has to be appended (if it doesn't have to be appended then 'parent' isn't needed anyway)

		//note that we only check whether '.appendChild()' exists because that's all we need it for
	if (typeof parent.appendChild !== 'function' && appendElem === true) {
		console.warn('[helpers.js] cElem couldn\'t get parent.');
		return false;
	}

	//create the element
	var elem = document.createElement(type);

	//apply all attributes
	if (typeof attributes === 'object') {
		for (let key in attributes) {
			elem.setAttribute(key, attributes[key]);
		}
	}

	//append element to parent if needed
	if (appendElem === true) {
		parent.appendChild(elem);
	}

	return elem;
}

/**	Fetches a specific item inside a object.
 *
 * 	Provide a name like 'misc.distanceWalked' and it will fetch the item found in 'misc' > 'distanceWalked' in the object you called this on.
 *
 * 	Args:
 * 		path [String]
 * 			The path it should go through in the form of 'misc.distanceWalked'.
 *
 * 		specifics [Object] <optional>
 * 			Includes the following properties:
 *
 * 				setTo [*any*] <none>
 * 					If present it will set the property found to this value.
 * 					If not present it will simply fetch the value as normal.
 *
 * 				setToUndefined [Boolean] <false>
 * 					If present it will set the value found to undefined. 'setTo' will be ignored if this is true.
 */
Object.defineProperty(Object.prototype, 'fetchProperty', {value: function (path, specifics={}) {
	//complain and return if 'specifics' isn't an object
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] Object.fetchProperty() received a non-object as 'specifics': "${specifics}".`);
	}

	//complain and return undefined if 'path' isn't a string
	if (typeof path !== 'string') {
		console.warn(`[MPO] Object.fetchProperty() received a non-string for 'path': "${path}".`);
		return undefined;
	}

	//the item that will be searched in
	let item = this;

	//split the 'path' into an array
	const pathItems = path.split('.');

	//the index of 'pathItems'
	let index = 0;

	//loop through all property names specified in 'path'
	for (key of pathItems) {

		//complain and return undefined if it couldn't finish looping through
		if (typeof item !== 'object') {
			console.warn(`[MPO] Object.fetchProperty() couldn't finish looping through the 'path' specified as it found a non-object with name "${key}": "${obj}".`);
			return undefined;
		}

		//check if it's the last item
		if (index++ === pathItems.length - 1) {
			//if it should be set to undefined then set it to undefined and return
			if (specifics.setToUndefined === true) {
				item[key] = undefined;
				return true;

			//if it should be set to something else then do that
			} else if (specifics.setTo !== undefined) {
				item[key] = specifics.setTo;
				return true;
			}
		}

		//replace 'item' with the next property in line
		item = item[key];
	}

	//complain and return false if it couldn't be set
	if (specifics.setToUndefined === true || specifics.setTo !== undefined) {
		console.warn(`[MPO] Object.fetchProperty() could not set the value. Path specified: "${path}".`);
		return false;
	}

	//return the found item
	return item;
}});

/**	Fills an object in with default values.
 *
 * 	This will replace any undefined property with a property from 'defaultObj'.
 *
 * 	This can be called on an object like 'obj.fillIn()' where 'obj' is a variable.
 * 	Any value with undefined will be overwritten (even if it was set to undefined on purpose).
 * 	This will only take values from 'defaultObj' that are enumerable.
 *
 * 	Args:
 * 		defaultObj [Object]
 * 			The object with the default values. These will be used to overwrite the other object.
 *
 * 		specifics [Object] <optional>
 * 			Includes the following properties:
 *
 * 				force [Boolean] <false>
 *					If true all values from 'defaultObj' will be applied, regardless of whether a value already exists.
 * 					If false it will only take the values from 'defaultObj' that don't exist yet.
 *
 * 				ignoreKeys [Array] <none>
 * 					A list of keys that should be ignored.
 * 					If `['_index']` is given then any property with the name '_index' will be ignored completely (meaning it won't get filled in).
 *
 * 				replaceNull [Boolean] <false>
 * 					If true it will also overwrite values that are null.
 * 					Will be ignored if 'force' is set to true.
 *
 * 				objToOverwrite [Object] <optional>
 * 					If this is present it will take this over the object it has been called on.
 * 					Use this if you want to call this function via 'Object.defineProperty()'.
 *
 * 	Returns [Object]:
 * 		The modified object.
 * 		This will be the original object that the function was called on/the object specified in 'objToOverwrite'.
 */
Object.defineProperty(Object.prototype, 'fillIn', {value: function (defaultObj, specifics={}) {
	//complain and return if 'specifics' isn't an object
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] Object.fillIn() received a non-object as 'specifics': "${specifics}".`);
	}

	//get 'objToOverwrite' if it's an object, otherwise use 'this'
	let obj = (typeof specifics.objToOverwrite === 'object') ? specifics.objToOverwrite : this;

	//complain and return if it's not a object
	if (typeof obj !== 'object') {
		//complain differently depending on whether 'objToOverwrite' was used or not
		console.warn(`[MPO] Object.fillIn() ${(specifics.objToOverwrite !== undefined) ? "received a non-object as the 'objToOverwrite' argument:" : "was called on a non-object without a valid 'objToOverwrite' argument:"} "${obj}".`);
		return;
	}

	//complain and return if 'defaultObj' is not a object
	if (typeof defaultObj !== 'object') {
		console.warn(`[MPO] Object.fillIn() received a non-object as the 'defaultObj': "${defaultObj}".`);
		return;
	}

	//=== ACTUAL FUNCTION ===

	//the 'if' and 'else' blocks are both identical with the exception that the 'if' block checks for 'ignoreKeys'
		//this is done so it doesn't have to check 'ignoreKeys' every single loop when it's not even used
	if (Array.isArray(specifics.ignoreKeys) === true) {

		//loop through 'defaultObj'
		for (const key in defaultObj) {

			//if the key is present in 'ignoreKeys' then ignore it
			if (specifics.ignoreKeys.indexOf(key) !== -1) {
				continue;
			}

			//check whether the value should be replaced or not
				//replace if 'force' is true
				//replace if the property is undefined in 'obj'
				//replace if 'replaceNull' is true and the property in 'obj' is null
			if ((specifics.force === true) || (obj[key] === undefined || (specifics.replaceNull === true && obj[key] === null))) {
				obj[key] = defaultObj[key];
			}
		}

	} else {

		//complain if 'ignoreKeys' was specified but not valid
		if (specifics.ignoreKeys !== undefined) {
			console.warn(`[MPO] Object.fillIn() received a non-array as 'ignoreKeys': "${specifics.ignoreKeys}".`);
		}

		//loop through 'defaultObj'
		for (const key in defaultObj) {

			//check whether the value should be replaced or not
				//replace if 'force' is true
				//replace if the property is undefined in 'obj'
				//replace if 'replaceNull' is true and the property in 'obj' is null
			if ((specifics.force === true) || (obj[key] === undefined || (specifics.replaceNull === true && obj[key] === null))) {
				obj[key] = defaultObj[key];
			}
		}
	}

	//return it
	return obj;
}});


/**	Removes array items that matches a expression.
 *
 * 	Args:
 * 		expr [Function]
 * 			The function that gets called for each array item. The array item is passed as the first argument.
 * 			If the function returns true then the array item will be removed.
 *
 * 	Returns [Array]:
 * 		The array with all matching items removed from it.
 */
Object.defineProperty(Array.prototype, 'removeEachIf', {value: function (expr) {
	//return and complain if 'expr' isn't a function
	if (typeof expr !== 'function') {
		console.warn(`[MPO] Array.removeItemIf() received a non-function for 'expr': "${expr}".`);
		return;
	}

	//loop through the array backward
	for (let i = this.length - 1; i >= 0; i--) {

		//call 'expr' with the current array item and if it returns true then remove the array item
		if (expr(this[i], i) === true) {
			this.splice(i, 1);
		}
	}

	return this;
}});

/**	Splits a string into two pieces.
 *
 * 	Essentially the same as '.split()' except this only splits on the first instance and then returns the rest.
 * 	This might sound similar to '.split("...", 2)' but said would only return two array items that have been fully split while this returns the first split and then *the entire rest*.
 *
 * 	Args:
 * 		seperator [String]
 * 			The seperator that's used to split the string.
 * 			Note that the variable is automatically converted to a string.
 *
 * 	Returns [Array]:
 * 		The string split inside two array items. Note: If no match was found then it will simply return the string as-is inside the first array item.
 */
Object.defineProperty(String.prototype, 'splitOnce', {value: function (seperator) {
	//get the index of the seperator
		//note that this automatically converts the 'seperator' to a string
	var index = this.indexOf(seperator);

	//if the seperator is present then slice the string into two pieces
	if (index !== -1) {
		return [this.slice(0, index), this.slice(index + 1)]
	}

	//'.slice()' has to be used because otherwise it returns the string as a prototype or something (could likely also use another way to convert it)
		//also return it in an array to match regular '.split()' behaviour
	return [this.slice()];
}});

/**	Checks if a object is a DOM Element.
 *
 * 	Stack-overflow copy: https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
 * 	Note that this has to be defined using 'Object.defineProperty()' so the function isn't enumerable.
 *
 * 	Args:
 * 		element [*any*] <optional>
 * 			The variable it should check for.
 * 			Useful for calling this variable via 'Object.isDOMElement(*variable*)'.
 * 			If not present it will simply use the variable this got called on.
 *
 * 	Returns [Boolean]:
 * 		true if DOM Element, false if not.
 */
Object.defineProperty(Object.prototype, 'isDOMElement', {value: function (element) {
	//if 'element' hasn't been specified then use the variable this has been called on (that being 'this')
	if (element === undefined) {
		element = this;
	}

	try {
		//Using W3 DOM2 (works for FF, Opera and Chrome)
		return element instanceof HTMLElement;
	}
	catch (e) {
		//Browsers not supporting W3 DOM2 don't have HTMLElement and
		//an exception is thrown and we end up here. Testing some
		//properties that all elements have (works on IE7)
		return (typeof element === 'object') && (element.nodeType === 1) && (typeof element.style === 'object') && (typeof element.ownerDocument === 'object');
	}
}});

/**	=== PERFORMANCE TESTING ===
 *
 * 	These two function automatically check performance of a piece of code.
 * 	'measureTest()' consists of the bit of code that's being tested.
 * 	'realMeasureTest()' is the bit that executes 'measureTest()' many times over and automatically logs the duration to the console (or rather the performance object).
 *
 * 	Performance is being checked by the browser itself (See: https://developer.mozilla.org/en-US/docs/Web/API/Performance)
 * 	I think Chrome is actually better in this because it times the duration more accurately than Firefox does.
 *
 * 	Also, only execute the function once then reload the page. Especially if you modify the DOM tree (because the more elements there are the longer it's gonna take to do things).
 * 	I'm pretty sure all other active programs affect the performance too. Like, I just stopped playing music in the background and suddenly it got a lot faster.
 * 	Because of this (and just generally) it's probably best to run this function like 5x per test.
 */

/* *
function measureTest () {
	//insert code to test here
	//don't forget to change the amount of loops inside 'realMeasureTest()' since having too many loops will essentially freeze your computer for time-intensive tests
	return undefined;
}

function realMeasureTest () {
	performance.mark('begin');
	for (let i = 0; i < 1000000; i++) {
	    measureTest();
	}
	performance.mark('end');
	console.log(performance.measure('testo', 'begin', 'end'));
}
/* */