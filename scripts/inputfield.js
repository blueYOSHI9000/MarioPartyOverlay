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
 * 			The type of input field it should be. Can be one of the following:
 * 				- checkbox: A simple checkbox that can be either true (checked) and false (unchecked).
 * 				- radio-checkbox: A set of checkboxes but only one can be selected.
 * 				- radio-select: Basically a <select> element.
 * 				- radio-image: A bunch of images that all work like buttons.
 * 				- text: A small field to input text, likely just a name.
 * 				- textarea: A bigger area to enter a lot of text, like the story of your life (though 'text' would be enough for that one).
 * 				- number-text: A simple text field but you can only input numbers. Also there's two tiny buttons to increase and decrease the number.
 * 				- number-range: A simple range slider that selects a number.
 * 				- number-counter: A simple counter to select a number.
 * 				- button: A simple button. You click it, it does things.
 * 				- color: A custom color in hex format can be selected.
 * 				- file: A file-upload with drag 'n' drop support.
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

	//this will contain the entire input field
	const container = cElem('span', parent, {
		class: `inputfield_container`,

		//add field-related info
		fieldid: fieldID,
		fieldtype: fieldType,
		fieldvalue: attributes.defaultValue,

		//convert 'attributes' to a string
			//note that this will remove all functions inside it but that's perfect since stuff like 'onchange' will be directly linked to the element anyway using 'elem.onclick = *function*'
			//it's currently commented out since it takes up a lot of space and is currently not needed anywhere
			//it's suggested that if it's ever needed to instead create a seperate HTML attribute that holds the informarmation instead of saving the entire 'attributes' object
		//fieldattributes: JSON.stringify(attributes)
	});

	//set the 'onchange' function
	if (typeof attributes.onchange === 'function') {
		inputfield_onchangeFunctions.set(container, attributes.onchange);
	}

	//This is a WIP so it's still commented for now
	//const fieldTypeAndVariation = (attributes.variation !== undefined) ? (fieldType + attributes.variation) : (fieldType);

	//create the actual input fields depending on which type it is
	switch (fieldType) {
		case 'checkbox':
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
			let selectElem = cElem('select', container, {class: 'fieldType-radioSelect', onchange: 'inputfield_onFieldChange(this);', fieldid: fieldID});

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

		case 'text':
			cElem('input', container, {type: 'text', class: 'fieldType-text', onchange: 'inputfield_onFieldChange(this);', fieldid: fieldID});
			break;

		case 'textarea':
			cElem('textarea', container, {class: 'fieldType-textarea', onchange: 'inputfield_onFieldChange(this);', fieldid: fieldID})
			break;

		case 'number-text':
			cElem('input', container, {type: 'number', class: 'fieldType-numberText', onchange: 'inputfield_onFieldChange(this);', fieldid: fieldID});
			break;

		case 'number-range':
			cElem('input', container, {type: 'range', class: 'fieldType-numberRange', onchange: 'inputfield_onFieldChange(this);', fieldid: fieldID});
			break;

		case 'number-counter':
			console.warn('[MPO] Number-counters aint supported yet.');
			break;

		case 'button':
			cElem('input', container, {type: 'button', class: 'fieldType-button', onchange: 'inputfield_onFieldChange(this);', fieldid: fieldID});
			break;

		case 'color':
			cElem('input', container, {type: 'color', class: 'fieldType-color', onchange: 'inputfield_onFieldChange(this);', fieldid: fieldID});
			break;

		case 'file':
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
	if (typeof onchangeFunction === 'function') {
		onchangeFunction(newValue);
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
function inputfield_onFieldChange (elem) {
	//get field ID
	const fieldID = elem.getAttribute('fieldid');

	//get the container element
	const containerElem = document.querySelector(`.inputfield_container[fieldid="${fieldID}"]`);

	//return if container can't be found
	if (containerElem === null) {
		console.error(`[MPO] Could not find container element with a 'fieldID' of "${fieldID}"`);
		return;
	}

	//get field type from field object
	const fieldType = containerElem.getAttribute('fieldtype');

	//get the new value
	let newValue;

	//get new value based on which 'fieldType' it is
	switch (fieldType) {

		case 'checkbox':
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

		case 'text':
			newValue = elem.value;
			break;

		case 'textarea':
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

		case 'button':
			newValue = elem.value;
			break;

		case 'color':
			newValue = elem.value;
			break;

		case 'file':
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_onFieldChange()': "${fieldType}"`);
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