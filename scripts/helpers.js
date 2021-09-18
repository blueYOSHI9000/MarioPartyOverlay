/**	Loads all stylesheets specified.
 *
 *	Creates one <link rel="stylesheet" href="[href]"> element for each item specified (with the appropriate 'href' of course).
 *
 *	Args:
 *		styles (array)
 *			An array of all stylesheets to be loaded.
 *			Each item is a string consisting of a relative path to the css file (like 'scripts/boot.js').
 *
 *	Returns (array):
 *		An array of all <link> elements created.
 */
function loadStyles (styles) {
	if (styles.length === 0) {
		console.warn('[MPO] loadStyles() received an empty array.');
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
 *		scripts (array)
 *			An array of all script files to be loaded.
 *			Each item is a string consisting of a relative path to the script file (like 'scripts/boot.js').
 *
 *	Returns (array):
 *		An array of all <script> elements created.
 */
function loadScripts (scripts) {
	if (scripts.length === 0) {
		console.warn('[MPO] loadScripts() received an empty array.');
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
 *		type [string]
 *			The type of element it should be. 'span' for <span> and so on.
 *
 *		parent [string/DOM Element]
 *			The element it should be created in.
 *			Can be either a DOM Element or the ID of the element as a string.
 *
 *		attributes [object]
 *			A list of attributes the element should have. {src: 'scripts/boot.js'} would give the element a 'src="scripts/boot.js"' attribute.
 *
 *	Returns [DOM Element]:
 *		The DOM Element that was created.
 */
function cElem (type, parent, attributes) {
	if (typeof parent === 'string') {
		parent = getElem(parent);
	}
	var elem = document.createElement(type);
	if (typeof attributes === 'object') {
		for (let key in attributes) {
			elem.setAttribute(key, attributes[key]);
		}
	}
	parent.appendChild(elem);
	return elem;
}