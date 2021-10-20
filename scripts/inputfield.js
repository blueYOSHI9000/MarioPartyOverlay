/**	=== HOW INPUT-FIELDS WORK ===
 *
 * 	Input-fields are a way to get user-input. Whether it's a button, a checkbox, a set of options to choose from or whatever.
 * 	Basically a <input> element that looks better.
 *
 * 	You create a input-field with 'inputfield_createField()'.
 * 	Said function then creates a <span> that contains the entire input-field. This <span> also has the 'inputfield_container' class and is called the "container".
 * 	The container also stores the unique input-field ID inside it's 'data-inputid' attribute.
 * 	In addition the container also has a 'onchange' function associated with it that gets executed whenever the value changes. This is done manually inside this file.
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

//the total fields created
	//used to give each field a unique ID
let inputfield_totalFieldsCreated = 0;

/**	This saves info about every currently open input-field
 *
 * 	Each item in this WeakMap is created by using the DOM Element of the input-field as it's key/name.
 * 	Each item is a 'inputfield_FieldObject()' object.
 */
let inputfield_fields = new WeakMap();
	// # EXPLANATION on why this uses a 'WeakMap'
	//
	//note that this is a 'WeakMap' which means you can't list all open input-fields - you can only access the info by using the DOM Element
	//that's because a 'WeakMap' uses objects as a variable name which means you can essentially assign a variable to a DOM Element
	//and said variable can only be accessed by using said DOM Element -- if the DOM Element is removed you can no longer access it
	//which sounds dumb but that's the entire reason why this approach is even used
	//because the info about a input-field should be deleted once a input-field is removed
	//and if we used a regular object we'd have to do that manually -- each time a input-field is removed we'd also have to delete the object entry
	//which sounds easy but remember that a input-field isn't always removed directly
	//meaning, if a modal includes a input-field then we'd likely remove the modal as a whole, not just the input-field
	//and there's sadly no good way to detect that (no 'MutationObserver' doesn't work in a efficient way)
	//aside from using a 'WeakMap' that is because 'WeakMap' entries are automatically removed once the associated object is gone
	//which means, if we create a 'WeakMap' item with a DOM Element as it's name then the item will automatically be deleted once the DOM Element is deleted through the garbage collector
	//note that this won't happen if another variable still has the DOM Element linkec in it -- that's just how the garbage collector works
	//it is worth adding that the garbage collector doesn't remove the value immediately but only whenever it's needed so the value will likely still show up in DevTools

/**	Creates a 'FieldObject' that saves all info related to the input-field.
 *
 * 	Args:
 * 		options [Object]
 * 			Includes the following properties:
 *
 * 				fieldID [Number]
 * 					The unique ID of the field.
 * 					This can also include the variation by seperating the two with a - (so 'radio-checkbox' would give a inputType of 'radio' with a variation of 'checkbox').
 *
 * 				value [*any*]
 * 					The current value of the field.
 *
 * 				fieldType [String]
 * 					The type of the field.
 *
 * 				attributes [Object]
 * 					A list of all attributes of the field.
 *
 * 	Constructs:
 * 		id [Number]
 * 			The unique ID of the field.
 *
 * 		value [*any*]
 * 			The value of the field.
 * 			What type this is depends on the 'fieldType', see the documentation at the top of this file for more info.
 *
 * 		fieldType [String]
 * 			The type of the field.
 *
 * 		variation [String]
 * 			The variation of the field.
 *
 * 		onchange [Function/undefined]
 * 			The 'onchange' function.
 * 			Will simply be undefined if not used.
 *
 * 		attributes [Object]
 * 			All attributes of the field.
 */
function inputfield_FieldObject (options) {
	this.id = options.fieldID;

	this.value = options.value;

	this.fieldType = options.fieldType;

	//set variation
		//if not specified in 'attributes' then get the default variation of the 'fieldType'
	this.variation = (options.attributes.variation === undefined) ? inputfield_getDefaultVariation(options.fieldType) : options.attributes.variation;

	//set the onchange function
		//if not specified in 'attributes' then use a empty function
	this.onchange = (typeof options.attributes.onchange !== 'function') ? (() => {return;}) : options.attributes.onchange;

	this.attributes = options.attributes;
}

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

	//get the actual fieldType by splitting it (so 'radio-checkbox' is split into the fieldType 'radio' and variation 'checkbox')
	if (fieldType.indexOf('-') !== -1) {

		//actually split it
		const fieldTypeSplit = fieldType.splitOnce('-');

		//apply the new strings
		fieldType = fieldTypeSplit[0];
		attributes.variation = fieldTypeSplit[1];
	}

	//get the variation
		//if no variation is specified then it will get the default variation -- otherwise it will use the variation specified in 'attributes'
	const fieldVariation = (attributes.variation === undefined) ? inputfield_getDefaultVariation(fieldType) : attributes.variation;

	//this will contain the entire input field
	const container = cElem('span', parent, {
		class: `inputfield_container`,

		//add field-related info
		'data-fieldid': fieldID
	});

	//create a string that includes both 'fieldType' and 'fieldVariation' for the switch.
	const fieldTypeAndVariation = `${fieldType}-${fieldVariation}`;

	//create the actual input fields depending on which type it is
	switch (fieldTypeAndVariation) {
		case 'checkbox-regular':
			cElem('input', container, {type: 'checkbox', class: 'inputfield_callUpdate fieldType-checkbox', 'data-fieldid': fieldID});
			break;

		case 'radio-checkbox':
			//create a <input> radio checkbox for each option
			for (const item of attributes.options) {
				cElem('span', container).textContent = `| ${item.name}: `;
				cElem('input', container, {type: 'radio', name: `fieldID-${fieldID}`, class: 'inputfield_callUpdate fieldType-radioCheckbox', 'data-fieldid': fieldID, 'data-fieldvalue': item.value});
				cElem('span', container).textContent = '|';
			}
			break;

		case 'radio-select': {
			let selectElem = cElem('select', container, {class: 'fieldType-radioSelect', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});

			//create a <option> inside the <select> for each option
			for (const item of attributes.options) {
				cElem('option', selectElem, {value: item.value}).textContent = item.name;
			}
			break;
		}

		case 'radio-image':
			//create a <img> for each option
			for (const item of attributes.options) {
				cElem('img', container, {class: 'inputfield_callUpdate fieldType-imgButton', src: item.src, 'data-fieldid': fieldID, 'data-fieldvalue': item.value});
			}
			break;

		case 'text-small':
			cElem('input', container, {type: 'text', class: 'fieldType-text', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'text-area':
			cElem('textarea', container, {class: 'fieldType-textarea', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID})
			break;

		case 'number-text':
			cElem('input', container, {type: 'number', class: 'fieldType-numberText', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'number-range':
			cElem('input', container, {type: 'range', class: 'fieldType-numberRange', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'number-counter':
			console.warn('[MPO] Number-counters aint supported yet.');
			break;

		case 'button-regular':
			cElem('input', container, {type: 'button', class: 'fieldType-button', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'button-image':
			console.warn('[MPO] Image buttons aint supported yet.');
			break;

		case 'color-regular':
			cElem('input', container, {type: 'color', class: 'fieldType-color', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'file-regular':
			console.warn('[MPO] File inputs aint supported yet.');
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_createField()': "${fieldType}"`);
			break;
	}

	//create the field object and add it to the list
	inputfield_fields.set(container, new inputfield_FieldObject({
		fieldID:    fieldID,
		value:      undefined,
		fieldType:  fieldType,
		attributes: attributes
	}));
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
	const elem = document.querySelector(`.inputfield_container[data-fieldid="${fieldID}"]`);

	//return null if element doesn't exist
	if (elem === null) {
		return null;
	}

	//return the value
	return inputfield_fields.get(elem)['value'];
}

/**	Applies the new value to the input-field and executes the 'onchange' function of the field.
 *
 * 	Updates the 'value' property inside 'inputfield_fields', marks the new value as selected in case of radio fields and executes the 'onchange' function of the input field.
 *
 * 	Args:
 * 		containerElem [DOM Element]
 *			The element that contains the entire input field. Should have the class 'inputfield_container'.
 *
 * 		newValue [*any*]
 * 			The new value it should be updated to.
 * 			Note that this function doesn't check whether the value is even valid. So a checkbox field could get a value of 'waluigi' if that's what you want.
 */
function inputfield_applyNewValue (containerElem, newValue) {
	//set the new value
	inputfield_fields.get(containerElem)['value'] = newValue;

	//TODO: mark radio fields as selected

	//get the 'onchange' function
	const onchangeFunction = inputfield_fields.get(containerElem)['onchange'];

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
 * 			The element that got updated or in case of buttons, the element that got clicked on.
 */
function inputfield_executedAfterFieldChange (elem) {
	//get field ID
	const fieldID = elem.getAttribute('data-fieldid');

	//get the container element
	const containerElem = document.querySelector(`.inputfield_container[data-fieldid="${fieldID}"]`);

	//return if container can't be found
	if (containerElem === null) {
		console.error(`[MPO] Could not find container element with a 'fieldID' of "${fieldID}"`);
		return;
	}

	//get field type from field element
	const fieldType = inputfield_fields.get(containerElem)['fieldType'];

	//get variation from field element
	const fieldVariation = inputfield_fields.get(containerElem)['variation'];

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
			newValue = elem.getAttribute('data-fieldvalue');
			break;

		case 'radio-select':
			newValue = elem.value;
			break;

		case 'radio-image':
			newValue = elem.getAttribute('data-fieldvalue');
			break;

		case 'text-small':
			newValue = elem.value;
			break;

		case 'text-area':
			newValue = elem.value;
			break;

		case 'number-text':
			newValue = elem.valueAsNumber;
			break;

		case 'number-range':
			newValue = elem.valueAsNumber;
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

	//update the field with the new value
	inputfield_applyNewValue(containerElem, newValue);
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