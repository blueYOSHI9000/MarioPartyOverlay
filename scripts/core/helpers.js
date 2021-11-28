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
 *	Returns [Array]:
 *		An array of all <script> elements created.
 */
function loadScripts (scripts) {
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

		//use the 'onLoad' attribute to execute the boot_scriptLoaded() function
		scriptElem.setAttribute('onLoad', `boot_scriptLoaded('${fileName}');`);

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
 *		parent [String/DOM Element]
 *			The element it should be created in.
 *			Can be either a DOM Element or the ID of the element as a string.
 * 			Will return false if the parent can't be found.
 *
 *		attributes [Object]
 *			A list of attributes the element should have. {src: 'scripts/boot.js'} would give the element a 'src="scripts/boot.js"' attribute.
 *
 *	Returns [DOM Element/Boolean]:
 *		The DOM Element that was created.
 * 		If it couldn't be created due to the specified parent not existing then it'll simply return false.
 */
function cElem (type, parent, attributes) {
	//get parent by ID
	if (typeof parent === 'string') {
		parent = document.getElementById(parent);
	}

	//return if it's not an object
	if (typeof parent !== 'object') {
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

	//append element to parent
	parent.appendChild(elem);

	return elem;
}

/** Fills in a object with default values if a variable isn't present. Note: undefined is the same as a variable that isn't present.
 *
 * 	Iterates through all values of 'defaultObj' and checks if they're present inside 'obj'.
 * 	If a value isn't present in 'obj' then it's filled in with the value from 'defaultObj'.
 * 	If the value is present in 'obj' then it's skipped.
 *
 * 	Args:
 * 		obj [Object]
 * 			The object that's gonna be filled in.
 *
 * 		defaultObj [Object]
 * 			The object with the default values.
 *
 * 		replaceNull [Boolean] <false>
 * 			If true then null (not 'null', just null) will be replaced with a value from 'defaultObj' as well.
 *
 * 	Returns [Object]:
 * 		The filled-in object.
 */
function fillInObject (obj, defaultObj, replaceNull) {
	if (typeof obj !== 'object') {
		console.warn('[helpers.js] fillInObject() received a non-object for \'obj\'.');
	}
	if (typeof defaultObj !== 'object') {
		console.warn('[helpers.js] fillInObject() received a non-object for \'defaultObj\'.');
	}

	//iterate through all 'defaultObj' entries
	for (const key in defaultObj) {
		//check if type is either undefined
			//or alternatively if 'replaceNull' is true and the type is null (note: don't use 'typeof null' because that would return 'object', not 'null')
		if (typeof obj[key] === 'undefined' || (replaceNull === true && obj[key] === null)) {
			//apply the default value
			obj[key] = defaultObj[key];
		}
	}
	return obj;
}

/** Replaces every value in an object with the value from a different object.
 *
 * 	Iterates through all values of 'defaultObj' and replaces the values found in 'obj' with them.
 *
 * 	Args:
 * 		obj [Object]
 * 			The object that's gonna be filled in.
 *
 * 		defaultObj [Object]
 * 			The object with the default values.
 *
 * 	Returns [Object]:
 * 		The filled-in object.
 */
function forceFillInObject (obj, defaultObj) {
	if (typeof obj !== 'object') {
		console.warn('[helpers.js] forceFillInObject() received a non-object for \'obj\'.');
	}
	if (typeof defaultObj !== 'object') {
		console.warn('[helpers.js] forceFillInObject() received a non-object for \'defaultObj\'.');
	}

	//iterate through all 'defaultObj' entries
	for (const key in defaultObj) {
		//apply the default value
		obj[key] = defaultObj[key];
	}
	return obj;
}

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