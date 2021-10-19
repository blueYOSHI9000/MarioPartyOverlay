/**	=== HOW INPUT-FIELDS WORK ===
 *
 * 	Input-fields are a way to get user-input. Whether it's a button, a checkbox, a set of options to choose from or whatever.
 * 	Basically a <input> element that looks better.
 *
 * 	You create a input-field with 'inputfield_createField()'.
 * 	Said function then creates a <span> that contains the entire input-field. This <span> also has the 'inputfield_container' class and is called the "container".
 * 	The container has several attributes that include 'fieldid', 'fieldtype' and 'fieldvalue'.
 * 		'fieldid' is a unique ID used to identify this particular input-field.
 * 		'fieldtype' is what type of input-field it is (checkbox/button/etc).
 * 		'fieldvalue' is the value it holds.
 * 	In addition the container also has a 'onchange' function associated with it that gets executed whenever the value changes. This is done manually inside this file.
 *
 * 	It should also be mentioned that input-fields can only save values as string, nothing else. If a non-string value has to be saved then 'JSON.stringify()' and 'JSON.parse()' should be used.
 *
 * 	Another thing to mention is that the input-fields are only saved in the containers HTML element and nowhere else.
 * 	There is no JS object that saves all input-fields or anything and that's done on purpose.
 * 	That's because there's no good way to detect when a input-field is removed and if they were saved in a JS object then that would create a memory leak.
 *
 * 		- Here's some more on why you can't detect when a input-field is removed (or only in a bad way at least):
 * 			Input-fields should be able to be removed at a moments notice.
 * 			Like when there's a input-field inside a modal then it should be possible to delete the entire modal without having to delete the input-field first.
 * 			And there's no way to detect when a HTML element is removed when you don't know where the tree is gonna get cut-off.
 * 			You can detect when a child of an element is added/removed through a 'MutationObserver' but that only detects decendants, it does NOT detect it if one of it's ancestors get deleted.
 * 			If you were to place a 'MutationObserver' on the input-fields parent but not the modals parent then it would only trigger when the input-field is removed, not when the entire modal is removed and that's the issue.
 * 			Of course, you could place a 'MutationObserver' on the <body> element to observe the entire document in it's entirety but at that point, is it even worth it?
 *
 * 			That's why everything is saved in the container element because that way everything is saved inside the HTML element itself, which of course gets removed when the element is deleted.
 * 			That's why there shouldn't be a JS object that saves all the input-fields because if there were one then we would have to detect when a input-field is removed.
 * 			But if we don't save them anywhere then we don't have to detect it.
 *
 *
 * 	=== INPUT FIELD TYPES ===
 *
 * 	Each 'inputType' is listed here and each 'inputType' will list all variations it has (which can be specified with the 'variation' attribute).
 *
 * 	checkbox
 * 		A simple box that can be either checked or unchecked.
 * 		Will store the values 'checked' and 'unchecked'.
 *		Varitions:
 * 			- regular <default>: A regular simple checkbox.
 *
 * 	radio
 * 		The user has to select one option of many. Multi-choice is not supported yet but will be.
 * 		Will store one user-defined value which can be any string.
 * 		Variations:
 * 			- checkbox <default>: A set of checkboxes. Basically the same as '<input type="radio">'.
 * 			- select: Opens a list of all options where the user can select one. Basically the same as '<select>'.
 * 			- image: Creates a set of images that look like buttons and the user can select one of them.
 *
 * 	text
 * 		A way to enter custom text.
 * 		Will store whatever the user entered as it's value. Will always be a string.
 * 		Variations:
 * 			- small <default>: A small textfield intended for single-line values. Basically the same as '<input type="text">'.
 * 			- area: A resizable text area intended for longer, multi-line values. Basically the same as '<textarea>'.
 *
 * 	number
 * 		A way to enter any number (aside from Infinity and NaN). Can include negative values.
 * 		Will store a number as a number. Note that it might be NaN if something broke.
 * 		Variations:
 * 			- text <default>: A text-field to enter a number manually with tiny buttons to increase/decrease. Does not allow text-input. Basically the same as '<input type="number">'
 * 			- range: A slider that allows the user to select a number. Basically the same as '<input type="slider">'.
 * 			- counter: A MPO-styled counter. Takes MPO's controls into account (+/- and how much). Not supported yet.
 *
 * 	button
 * 		A simple button. You press it, it does things.
 * 		Does not store a value so it will simply return undefined. Will trigger the 'onchange' function specified in attributes when clicked on.
 * 		Variations:
 * 			- regular <default>: A regular button. Basically the same as '<button>'.
 * 			- image: Creates a image that looks like a button. Not supported yet.
 *
 * 	color
 * 		A way to select a custom color.
 * 		Will store the selected color in hex form ('#ffffff' being white) as a string.
 * 		Variations:
 * 			- regular <default>: A regular color selection. Basically the same as '<input type="color">'.
 *
 * 	file
 * 		A way to upload a file. Not supported yet.
 * 		How it's stored is still to be determined.
 * 		Variations:
 * 			- regular <default>: A regular file upload. Basically the same as '<input type="file">'.
 */

//this is a list of 'onchange' functions to be executed
	//this has to be a 'WeakMap' because this way you can use a object as a variable name
	//this means you can essentially create a variable that uses a DOM element as it's name
	//and because it's a 'WeakMap' instead of a regular 'Map' said "variable" will be automatically removed once the DOM element is deleted
	//it is worth adding that the Garbage Collector doesn't remove the value immediately but only whenever it's needed so the value will still show up in DevTools
let inputfield_onchangeFunctions = new WeakMap();

//the total fields created
	//used to give each field a unique ID
let inputfield_totalFieldsCreated = 0;

/**	Creates a input field.
 *
 * 	Args:
 * 		fieldType [String]
 * 			The type of input field it should be. See the documentation at the top of this file for more info.
 *
 * 		parent [DOM Element/String]
 * 			The element that the button should be created in.
 * 			Can also be the ID of the element.
 *
 * 		attributes [Object]
 *			Additional attributes that slightly change the input field.
 * 			Different attributes are available depending on which 'fieldType' is used, some are also required.
 * 			Following properties can be used:
 *
 * 				- variation [String] <default variation>
 * 					What variation this should be. See the list above for more info.
 * 					Will take the default variable of the 'fieldType' if not specified.
 * 					If a invalid variation is given then this WILL break, it won't automatically go back to the default. This includes specifying a variation when no variations exist.
 *
 * 				- onchange [Function] <none>
 *					A function that gets executed each time the input-field is updated. The first argument is the current value of the input field.
 *					Available for all input types.
 *
 *				- src [String]
 *					The source of the image. Has to be the full file path just like a <img> 'src' attribute would require it.
 *					Available for all input types that require a image [exact list to follow]. Will be ignored for all others.
 *
 *				- altText [String]
 *					Alt-text for images.
 *					Available for all input types that require a image (see 'src' attribute above for list).
 *
 *				- options [Array]
 *					A list of options for radio input fields.
 *					Available for all radio input fields [exact list to follow]. Will be ignored for all others.
 *					Each array item is a object consisting of the following:
 *						- name [String]
 *							The name of the option as it's displayed to the user.
 * 							This is also needed for images as a alt-text.
 *						- value [String]
 *							The value of the option, will be returned to the 'onchange' function.
 *						- src [String]
 *							The source of the image. Only needed if the 'fieldType' is 'radio-image'.
 */
function inputfield_createField (fieldType, parent, attributes) {
	//increase the total of input fields made
	inputfield_totalFieldsCreated++;

	//get the ID of this input field
	const fieldID = inputfield_totalFieldsCreated;

	//get the variation
		//if no variation is specified then it will get the default variation -- otherwise it will use the variation specified in 'attributes'
	const fieldVariation = (attributes.variation === undefined) ? inputfield_getDefaultVariation(fieldType) : attributes.variation;

	//this will contain the entire input field
	const container = cElem('span', parent, {
		class: `inputfield_container`,

		//add field-related info
		fieldid: fieldID,
		fieldtype: fieldType,
		fieldvariation: fieldVariation,
		fieldvalue: attributes.defaultValue,

		//convert 'attributes' to a string
			//note that this will remove all functions inside it but that's perfect since stuff like 'onchange' will be directly linked to the element anyway using 'elem.onclick = *function*'
			//it's currently commented out since it takes up a lot of space and is currently not needed anywhere
			//it's suggested that if it's ever needed to instead create a seperate HTML attribute that holds the informarmation instead of saving the entire 'attributes' object
		//fieldattributes: JSON.stringify(attributes)
	});

	//set the 'fieldvariation' attribute of the container if a variation is specified
	container.setAttribute('fieldvariation', fieldVariation);

	//set the 'onchange' function
	if (typeof attributes.onchange === 'function') {
		inputfield_onchangeFunctions.set(container, attributes.onchange);
	}

	//create a string that includes both 'fieldType' and 'fieldVariation' for the switch.
	const fieldTypeAndVariation = `${fieldType}-${fieldVariation}`;

	//create the actual input fields depending on which type it is
	switch (fieldTypeAndVariation) {
		case 'checkbox-regular':
			cElem('input', container, {type: 'checkbox', class: 'inputfield_callUpdate fieldType-checkbox', fieldid: fieldID});
			break;

		case 'radio-checkbox':
			//create a <input> radio checkbox for each option
			for (const item of attributes.options) {
				cElem('span', container).textContent = `| ${item.name}: `;
				cElem('input', container, {type: 'radio', name: `fieldID-${fieldID}`, class: 'inputfield_callUpdate fieldType-radioCheckbox', fieldid: fieldID, fieldvalue: item.value});
				cElem('span', container).textContent = '|';
			}
			break;

		case 'radio-select': {
			let selectElem = cElem('select', container, {class: 'fieldType-radioSelect', onchange: 'inputfield_executedAfterFieldChange(this);', fieldid: fieldID});

			//create a <option> inside the <select> for each option
			for (const item of attributes.options) {
				cElem('option', selectElem, {value: item.value}).textContent = item.name;
			}
			break;
		}

		case 'radio-image':
			//create a <img> for each option
			for (const item of attributes.options) {
				cElem('img', container, {class: 'inputfield_callUpdate fieldType-imgButton', src: item.src, fieldid: fieldID, fieldvalue: item.value});
			}
			break;

		case 'text-small':
			cElem('input', container, {type: 'text', class: 'fieldType-text', onchange: 'inputfield_executedAfterFieldChange(this);', fieldid: fieldID});
			break;

		case 'text-area':
			cElem('textarea', container, {class: 'fieldType-textarea', onchange: 'inputfield_executedAfterFieldChange(this);', fieldid: fieldID})
			break;

		case 'number-text':
			cElem('input', container, {type: 'number', class: 'fieldType-numberText', onchange: 'inputfield_executedAfterFieldChange(this);', fieldid: fieldID});
			break;

		case 'number-range':
			cElem('input', container, {type: 'range', class: 'fieldType-numberRange', onchange: 'inputfield_executedAfterFieldChange(this);', fieldid: fieldID});
			break;

		case 'number-counter':
			console.warn('[MPO] Number-counters aint supported yet.');
			break;

		case 'button-regular':
			cElem('input', container, {type: 'button', class: 'fieldType-button', onchange: 'inputfield_executedAfterFieldChange(this);', fieldid: fieldID});
			break;

		case 'button-image':
			console.warn('[MPO] Image buttons aint supported yet.');
			break;

		case 'color-regular':
			cElem('input', container, {type: 'color', class: 'fieldType-color', onchange: 'inputfield_executedAfterFieldChange(this);', fieldid: fieldID});
			break;

		case 'file-regular':
			console.warn('[MPO] File inputs aint supported yet.');
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_createField()': "${fieldType}"`);
			break;
	}
}

/**	Gets the value of a input-field.
 *
 * 	Args:
 * 		fieldID [Number/String]
 * 			The ID of the input-field.
 * 			Can be in string-form (so '6' and 6 are both fine).
 *
 * 	Returns [String/null]:
 * 		The value of the input-field as a string.
 * 		Returns null if the input-field can't be found.
 */
function inputfield_getValue (fieldID) {
	//get the element
	const elem = document.querySelector(`.inputfield_container[fieldid="${fieldID}"]`);

	//return null if element doesn't exist
	if (elem === null) {
		return null;
	}

	//return the value
	return elem.getAttribute('fieldvalue');
}

/**	Applies the new value to the input-field.
 *
 * 	Updates the 'fieldvalue' attribute of the container, marks the new value as selected in case of radio fields and executes the 'onchange' function of the input field.
 *
 * 	Args:
 * 		containerElem [DOM Element]
 *			The element that contains the entire input field. Should have the class 'inputfield_container'.
 *
 * 		newValue [String / *any*]
 * 			The new value it should be updated to.
 * 			Note that the function doesn't check what type this is so it can technically be anything but HTML attributes will only save it as a string.
 * 			Another note that this function doesn't check whether the value is even valid. So a checkbox field could get a value of 'waluigi' if that's what you want.
 */
function inputfield_applyNewValue (containerElem, newValue) {
	//set the new value
	containerElem.setAttribute('fieldvalue', newValue);

	//TODO: mark radio fields as selected

	//get the 'onchange' function
	const onchangeFunction = inputfield_onchangeFunctions.get(containerElem);

	//execute the 'onchange' function
		//use 'setTimeout()' with a delay of 0 so it gets it's own call-stack (it basically tells the browser "Hey, execute this bit as soon as everything else is done!")
	if (typeof onchangeFunction === 'function') {
		setTimeout(() => {onchangeFunction(newValue);}, 0);
	}
}

/**	Gets executed when a input field is changed.
 *
 * 	Mainly here to execute 'inputfield_applyNewValue()' and nothing else.
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The element that got clicked on.
 */
function inputfield_executedAfterFieldChange (elem) {
	//get field ID
	const fieldID = elem.getAttribute('fieldid');

	//get the container element
	const containerElem = document.querySelector(`.inputfield_container[fieldid="${fieldID}"]`);

	//return if container can't be found
	if (containerElem === null) {
		console.error(`[MPO] Could not find container element with a 'fieldID' of "${fieldID}"`);
		return;
	}

	//get field type from field element
	const fieldType = containerElem.getAttribute('fieldtype');

	//get variation from field element
	const fieldVariation = containerElem.getAttribute('fieldvariation');

	//create a string that includes both 'fieldType' and 'fieldVariation' for the switch.
	const fieldTypeAndVariation = `${fieldType}-${fieldVariation}`;


	//get new value based on which 'fieldType' it is
		//note that this can't use 'inputfield_getValue()' because that function simply gets the 'fieldValue' attribute of the element
		//but we're currently in the process of setting said attribute so that function would only return the previous value
	let newValue;
	switch (fieldTypeAndVariation) {

		case 'checkbox-regular':
			//invert the value because checkboxes are weird and the new value will only be applied afterwards
			newValue = !elem.checked;
			break;

		case 'radio-checkbox':
			newValue = elem.getAttribute('fieldvalue');
			break;

		case 'radio-select':
			newValue = elem.value;
			break;

		case 'radio-image':
			newValue = elem.getAttribute('fieldvalue');
			break;

		case 'text-small':
			newValue = elem.value;
			break;

		case 'text-area':
			newValue = elem.value;
			break;

		case 'number-text':
			newValue = elem.value;
			break;

		case 'number-range':
			newValue = elem.value;
			break;

		case 'number-counter':
			break;

		case 'button-regular':
			newValue = elem.value;
			break;

		case 'color-regular':
			newValue = elem.value;
			break;

		case 'file-regular':
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_executedAfterFieldChange()': "${fieldType}"`);
			break;
	}

	//convert boolean to string so it's either 'checked' or 'unchecked'
		//this is done because values can only be strings and 'true' and 'false' would be confusing
	if (newValue === true) {
		newValue = 'checked';
	} else if (newValue === false) {
		newValue = 'unchecked';
	}

	//update the field with the new value
	inputfield_applyNewValue(containerElem, newValue);
}

/**	Deletes a input field. Does NOT remove the DOM Elements associated to it.
 *
 * 	Args:
 * 		fieldID [Number/String]
 * 			The unique ID of the input field.
 * 			Can be in string form (so 6 and '6' are both fine).
 */
function inputfield_removeField (fieldID) {
	delete inputfield_activeFields[fieldID];
}

/**	Gets the default variation for the specified 'fieldType'.
 *
 * 	Args:
 * 		fieldType [String]
 * 			The 'fieldType'. See documentation at the top of this file.
 *
 * 	Returns [String]:
 * 		The variation as a string.
 */
function inputfield_getDefaultVariation (fieldType) {
	//get default variation depending on which 'fieldType' it is
	switch (fieldType) {
		case 'checkbox':
			return 'regular';

		case 'radio':
			return 'checkbox';

		case 'text':
			return 'small';

		case 'number':
			return 'text';

		case 'button':
			return 'regular';

		case 'color':
			return 'regular';

		case 'file':
			return 'regular';
	}

	//log error and return empty string if no variation could be found
	console.error(`[MPO] inputfield_getDefaultVariation() could not get a default variation for 'fieldType' "${fieldType}"`);
	return '';
}