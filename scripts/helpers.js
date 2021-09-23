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
		scriptElem.setAttribute('onLoad', 'boot_scriptLoaded(\'' + fileName + '\');');

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