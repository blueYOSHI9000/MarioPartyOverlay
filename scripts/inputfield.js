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
 * 	=== INPUT FIELD TYPES & VARIATIONS ===
 *
 * 	Each 'inputType' is listed here and each 'inputType' will list all variations it has (which can be specified with the 'variation' attribute).
 *
 * 	form
 * 		This is a special type as it doesn't really create an actual input-field (aside from an empty '<span>'), instead it can be used to combine several input-fields into a single form.
 * 		When creating a new form you can use it's ID to add other input-fields to it. To add a input-field to a form you can use the ID of the form inside the 'addToForm' attribute.
 * 		The form will have an object as it's value containing an item for each input-field that's part of it.
 * 		Each item has the 'name' attribute as it's name (or the field ID if a 'name' wasn't specified).
 *
 * 		Variations:
 * 			- regular <default>: A regular form.
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
 *
 *
 * 	=== FIELD ATTRIBUTES ===
 *
 * 	Each input-field has a set of attributes that can be specified when creating it.
 * 	Attributes can (currently) only be set when creating the input-field, they can not be changed afterwards.
 *
 * 	Note that some attributes are only available for some types.
 *
 * 	# general attributes (available for all types):
 *
 * 		variation [String] <default variation>
 * 			What variation this should be. See the list above for more info.
 * 			Will take the default variable of the 'fieldType' if not specified.
 * 			If a invalid variation is given then this WILL break, it won't automatically go back to the default. This includes specifying a variation when no variations exist.
 *
 * 		onchange [Function] <none>
 * 			A function that gets executed each time the input-field is updated. The first argument will be the current value of the input field.
 * 			Available for all input types.
 *
 * 	# 'checkbox' type attributes:
 *
 * 		checkboxValue [*any*] <true>
 * 			The value the checkbox has when it's checked.
 * 			Note that the value for it being unchecked will always be false.
 *
 * 		host [DOM Element] <none>
 * 			Specifying a "host" element (can be any DOM element - even a input-field) allows you to connect several input-fields with each other.
 * 			To connect input-fields you simply use the same host element when creating the input-field and they're automatically connected with each other.
 * 			Once input-fields are connected there can only be one checkbox that's checked. Basically a 'radio' replacement.
 *
 * 			The 'onchange' attribute will only be set on the host element (which will be triggered when the value changes) and not on the individual checkboxes.
 * 			Setting a 'onchange' attribute when one has already been set then it will replace the existing one.
 *
 * 	# 'radio' type attributes:
 *
 * 		options [Array]
 * 			A list of options for radio input fields.
 * 			Available for all radio input fields [exact list to follow]. Will be ignored for all others.
 * 			Each array item is a object consisting of the following:
 * 				- name [String]
 * 					The name of the option as it's displayed to the user.
 * 					This is also needed for images as a alt-text.
 * 				- value [String]
 * 					The value of the option, will be returned to the 'onchange' function.
 * 				- src [String]
 * 					The source of the image. Only needed if the 'fieldType' is 'radio-image'.
 *
 * 	# 'image' type attributes:
 *
 * 		src [String]
 * 			The source of the image. Has to be the full file path just like a <img> 'src' attribute would require it.
 * 			Available for all input types that require a image [exact list to follow]. Will be ignored for all others.
 *
 * 		altText [String] <none>
 * 			Alt-text for images.
 * 			Available for all input types that require a image (see 'src' attribute above for list).
 *
 * 	# form related attributes (available for all types but only needed if used inside a form):
 *
 * 		name [String] <ID>
 * 			The name of the input-field. Mainly used to access the value inside a form.
 * 			Has to be a unique name inside the form. If the same name is used multiple times then some values might get overwritten with another value.
 * 			If not specified then it will use it's ID as a name. This is also why the name should not be a number to avoid duplicate names.
 *
 * 		addToForm [Number] <none>
 * 			The ID of the form it should be added to. Leave empty if it should not be added to a form.
 *
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

/**	This saves info about all hosts.
 *
 * 	See comment above on why this uses a WeakMap.
 */
let inputfield_hosts = new WeakMap();

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
 * 		fieldTypeAndVariation [String]
 * 			A simple string that combines the 'fieldType' and 'variation' with a dash ('-') in between.
 *
 * 		attributes [Object]
 * 			All attributes of the field.
 *
 * 		onchange [Function/undefined]
 * 			The 'onchange' function.
 * 			Will simply be undefined if not used.
 *
 * 		belongsToHost [DOM Element/Boolean]
 * 			This defines whether this input-field belongs to a host or not.
 * 			Will be the DOM element of the host it belongs to or simple false if it doesn't belong to any host.
 *
 * 		actualInputElement [DOM Element/Array]
 * 			The actual <input> element itself, or an alternative to it.
 * 			Is an array of DOM elements in case of radio buttons that use multiple elements.
 *
 * 		name [???]
 * 			[Our researchers are hard at work to document this, in a future update of course.]
 *
 * 		containedFields [???]
 * 			[Our researchers are hard at work to document this, in a future update of course.]
 */
function inputfield_FieldObject (options) {
	//set ID
	this.id = options.fieldID;

	//set value
		//if it's a form then set it to an empty object - otherwise set it to the value specified
	this.value = (options.fieldType === 'form') ? {} : options.value;

	//set type
	this.fieldType = options.fieldType;

	//set variation
		//if not specified in 'attributes' then get the default variation of the 'fieldType'
	this.variation = options.attributes.variation ?? inputfield_getDefaultVariation(options.fieldType);

	//create a string that combines fieldType and it's variation for use on switches
	this.fieldTypeAndVariation = `${this.fieldType}-${this.variation}`;

	//set name
		//if no name is specified then use it's ID as a name
	this.name = options.name ?? String(options.fieldID);

	//set whether this belongs to a host (and which one)
	this.belongsToHost = options.attributes.host ?? false;

	//set the onchange function
		//if not specified in 'attributes' then use a empty function
	this.onchange = (typeof options.attributes.onchange !== 'function' || this.belongsToHost !== false) ? (() => {return;}) : options.attributes.onchange;

	//set the actual input element
	this.actualInputElement = options.actualInputElement;

	//set attributes
	this.attributes = options.attributes;

	//create a list of all input-fields this form contains (but only if it is a form)
	if (options.fieldType === 'form') {
		this.containedFields = [];
	}
}

/**	Creates a 'HostObject' that saves all info related to a host.
 *
 * 	Args:
 * 		options [Object]
 * 			Includes the following properties:
 *
 * 				childList [Array] <optional>
 * 					A list of all DOM elements that belong to the host. Defaults to creating an empty array.
 *
 * 				defaultValue [*any*] <undefined>
 * 					The default value it should have.
 *
 * 				onchange [Function] <optional>
 * 					The function that gets executed when the value changes. Will default to not doing anything.
 *
 * 	Constructs:
 * 		childList [Array]
 * 			A list of all DOM elements that belong to the host.
 *
 * 		value [*any*]
 * 			The value that it holds. Can be any type but will likely be a string.
 *
 * 		onchange [Function]
 * 			The function that gets executed when the value changes.
 */
function inputfield_HostObject (options={}) {
	//set the 'childList' to an empty array if it hasn't been defined yet
	options.childList ??= [];

	//set the list of children
		//if it's not an array then wrap it in one first, otherwise use it as-is
	this.childList = (Array.isArray(options.childList) !== true) ? [options.childList] : options.childList;

	//set the defaultValue
		//note that if it hasn't been specified then it'll be undefined which is what we need then anyway
	this.value = options.defaultValue;

	//set the 'onchange' function
		//use a empty function if it hasn't been defined
	this.onchange = (typeof options.onchange !== 'function') ? (() => {return;}) : options.onchange;

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
 *			See "attributes" in the documentation at the top of this file.
 *
 * 	Returns [DOM Element]:
 * 		The input-field DOM element.
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

	//if no variation is specified then set it to the default variation
	attributes.variation ??= inputfield_getDefaultVariation(fieldType);

	//set 'checkboxValue' to true if it hasn't been specified
		//note that this is unnecessary
	attributes.checkboxValue ??= true;

	//this will contain the entire input field
	const container = cElem('span', parent, {
		class: `inputfield_container`,

		//add field-related info
		'data-fieldid': fieldID
	});

	//this will save the actual <input> element itself (or whatever alternative there is)
		//in case of radio buttons this will be an array of all the <input> elements
	let actualInputElement = undefined;

	//create a string that includes both 'fieldType' and it's variation for the switch.
	const fieldTypeAndVariation = `${fieldType}-${attributes.variation}`;

	//create the actual input fields depending on which type it is
	switch (fieldTypeAndVariation) {
		case 'form-regular':
			break;

		case 'checkbox-regular':
			actualInputElement = cElem('input', container, {type: 'checkbox', class: 'inputfield_callUpdate fieldType-checkbox', 'data-fieldid': fieldID});
			break;

		case 'radio-checkbox':
			actualInputElement = [];

			//create a <input> radio checkbox for each option with | on each side to divide them
			for (const item of attributes.options) {
				cElem('span', container).textContent = `| ${item.name}: `;

				actualInputElement.push(cElem('input', container, {type: 'radio', name: `fieldID-${fieldID}`, class: 'inputfield_callUpdate fieldType-radioCheckbox', 'data-fieldid': fieldID, 'data-fieldvalue': item.value}));

				cElem('span', container).textContent = '|';
			}
			break;

		case 'radio-select': {
			actualInputElement = cElem('select', container, {class: 'fieldType-radioSelect', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});

			//create a <option> inside the <select> for each option
			for (const item of attributes.options) {
				cElem('option', actualInputElement, {value: item.value}).textContent = item.name;
			}
			break;
		}

		case 'radio-image':
			actualInputElement = [];

			//create a <img> for each option
			for (const item of attributes.options) {
				actualInputElement.push(cElem('img', container, {class: 'inputfield_callUpdate fieldType-imgButton', src: item.src, 'data-fieldid': fieldID, 'data-fieldvalue': item.value}));
			}
			break;

		case 'text-small':
			actualInputElement = cElem('input', container, {type: 'text', class: 'fieldType-text', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'text-area':
			actualInputElement = cElem('textarea', container, {class: 'fieldType-textarea', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID})
			break;

		case 'number-text':
			actualInputElement = cElem('input', container, {type: 'number', class: 'fieldType-numberText', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'number-range':
			actualInputElement = cElem('input', container, {type: 'range', class: 'fieldType-numberRange', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'number-counter':
			console.warn('[MPO] Number-counters aint supported yet.');
			break;

		case 'button-regular':
			actualInputElement = cElem('input', container, {type: 'button', class: 'fieldType-button', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'button-image':
			console.warn('[MPO] Image buttons aint supported yet.');
			break;

		case 'color-regular':
			actualInputElement = cElem('input', container, {type: 'color', class: 'fieldType-color', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-fieldid': fieldID});
			break;

		case 'file-regular':
			console.warn('[MPO] File inputs aint supported yet.');
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_createField()': "${fieldType}"`);
			break;
	}

	//check if a host is specified
	if (attributes.host !== undefined) {

		//if the host hasn't been setup yet then set it up now
		if (inputfield_hosts.get(attributes.host) === undefined) {
			inputfield_setupHost({
				hostElem: attributes.host,
				onchange: attributes.onchange
			});
		}

		//add the newly created input-field to the hosts children
		inputfield_hosts.get(attributes.host).childList.push(container);
	}

	//create the field object and add it to the list
	inputfield_fields.set(container, new inputfield_FieldObject({
		fieldID:    fieldID,
		value:      undefined,
		fieldType:  fieldType,
		attributes: attributes,
actualInputElement: actualInputElement
	}));

	return container;
}

/**	Sets up a input-field host.
 *
 * 	Only really creates the WeakMap entry but that's all that's needed.
 *
 * 	Args:
 * 		options [Object]
 * 			Includes the following properties:
 *
 * 				hostElem [DOM Element]
 * 					The element that's supposed to be the host.
 *
 * 				onchange [Function] <optional>
 * 					The function that should be executed when the value changes. Defaults to doing nothing.
 */
function inputfield_setupHost (options) {
	//return if the object is not a DOM Element
	if (options.hostElem.isDOMElement() !== true) {
		console.warn('[MPO] inputfield_setupHost() received a non-element.');
		return;
	}

	//create the WeakMap entry
	inputfield_hosts.set(options.hostElem, new inputfield_HostObject({onchange: options.onchange}));
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
	const elem = inputfield_getElement(fieldID);

	//return null if element doesn't exist
	if (elem === null) {
		return null;
	}

	//get the WeakMap entry
	const fieldObj = inputfield_fields.get(elem);

	//return null if it can't be found
	if (fieldObj === undefined) {
		return null;
	}

	let value;

	//get the host
	const hostElem = fieldObj.belongsToHost;

	//get the hostObject if there's a host specified
	if (hostElem !== false) {
		const hostObj = inputfield_hosts.get(hostElem);

		//return null if it can't be found
		if (hostObj === undefined) {
			return null;
		}

		//apply the value
		value = hostObj.value;

	//if no host is specified then get the value from the fieldObj
	} else {
		value = fieldObj.value;
	}

	//return the value
	return value;
}

/**	Sets a new value to a input-field.
 *
 * 	Args:
 * 		field [Number/String/DOM Element]
 * 			The unique ID of the input-field (can be in string-form, so 6 and '6' are both fine).
 * 			Or the actual container DOM element.
 *
 * 		value [*any*]
 * 			The value the input-field should be set to.
 * 			Note that this will check whether it's valid or not. If not then it will simply not set it.
 *
 * 		options [Object] <optional>
 * 			A object of optional options. Contains the following properties:
 *
 * 				skipOnchange [Boolean] <false>
 * 					If true it will skip calling the 'onchange' function of the input-field.
 *
 * 				ignoreHost [Boolean] <false>
 * 					If true it ignores the specified host and simply applies the value to the actual input-field itself.
 * 					If false it applies the value to the host instead.
 * 					[currently only supports true]
 *
 * 	Return [Boolean]:
 * 		Returns true if succesfully updated and false if it couldn't be updated.
 * 		This will also return true if the value specified is already set.
 */
function inputfield_setValue (field, value, options={}) {
	//get the container
		//we don't have to check if this is valid because the WeakMap entry will simply not be found if this doesn't exist
	const containerElem = inputfield_getElement(field);

	//get the WeakMap entry
	const fieldObj = inputfield_fields.get(containerElem);

	//return and complain if the 'fieldObj' could not be found
	if (fieldObj === undefined) {
		console.warn(`[MPO] inputfield_setValue() could not find the 'fieldObj' for the field "${field}".`);
		return;
	}

	//return if it's already set to the correct value
	if (fieldObj.value === value) {
		return;
	}

	//this tracks whether the field has actually been updated or not
		//NOTICE: If this is set to true then at the end of the function the 'value' variable will be used to update 'fieldObj', which means 'value' has to be identical to the value actually used.
	let changed = false;

	//if this is set to true then at the end of the function it will call 'console.warn()' with the value and the fieldID in it
	let complain = false;

	//this is the actual <input> element itself (or an alternative to it)
	const actElem = fieldObj.actualInputElement;

	//combine fieldType and variation into a single string for the switch
	const fieldTypeAndVariation = fieldObj.fieldTypeAndVariation;

	switch (fieldTypeAndVariation) {
		case 'form-regular':
			break;

		case 'checkbox-regular':
			switch (value) {
				//if the value is true then update 'value' to the one specified in 'checkboxValue' and then let it fall through to the next case
				case true:
					value = fieldObj.attributes.checkboxValue;

				//set it to true if it equals to the 'checkboxValue'
				case fieldObj.attributes.checkboxValue:
					actElem.checked = true;
					changed = true;
					break;

				//if false, it's false
				case false:
					actElem.checked = false;
					changed = true;
					break;

				//complain about it if it's something else
				default:
					complain = true;
					break;
			}
			break;

		case 'radio-checkbox':

			//loop through all radio buttons and see if any of them have the value it should be changed to, if yes then check it
			for (const item of fieldObj.actualInputElement) {
				if (item.getAttribute('data-fieldvalue') === value) {
					item.checked = true;
					changed = true;
				}
			}
			break;

		case 'radio-select': {
			//loop through all possible options to see if the value is even possible
				//this should be done as plain <select> elements are not capable of holding values that aren't already part of it
				//I mean, I suppose you can create a non-selectable <option> just for this but that's a bit out-of-scope for now (one day though -- jk, I'll simply forget about adding this)
			for (const item of actElem.options) {
				if (item.value === value) {
					actElem.value = value;
					changed = true;
				}
			}

			//complain if the value couldn't be found
			if (changed === false) {
				complain = true;
			}
			break;
		}

		case 'radio-image':
			//believe it or not, this is how it's supposed to be done. For now at least.
			fieldObj.value = value;
			changed = true;
			break;

		case 'text-small':
		case 'text-area':
			actElem.value = value;
			changed = true;
			break;

		case 'number-text':
		case 'number-range':
			//convert it to a number if it isn't already
			if (typeof value !== 'number') {
				value = Number(value);
			}

			//check first if the number is even valid
				//if not then complain about it
			if (value.isNaN() === true) {
				complain = true;

			} else {
				actElem.value = value;
				changed = true;
			}
			break;

		case 'number-counter':
			console.warn('[MPO] Number-counters aint supported yet.');
			break;

		case 'button-regular':
			//my dude, you just tried to set a value to a button.
			complain = true;
			break;

		case 'button-image':
			console.warn('[MPO] Image buttons aint supported yet.');
			break;

		case 'color-regular':
			if (typeof value === 'string') {
				//first, get the initial value
				let initialValue = actElem.value;

				//try to set it
				actElem.value = value;

				//if it's not the value we set it to then it means it failed and so, we complain about it
					//note that it sets it to '#000000' automatically when it fails, that's why we put it back to the initial value because that's way better than a likely unwanted color
				if (actElem.value !== value) {
					actElem.value = initialValue;

					complain = true;
				} else {
					changed = true;
				}
			}
			break;

		case 'file-regular':
			console.warn('[MPO] File inputs aint supported yet.');
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_createField()': "${fieldType}"`);
			break;
	}

	//complain about it
	if (complain === true) {
		console.warn(`[MPO] inputfield_setValue() has received an invalid value: "${value}" for the input-field "${fieldObj.id}" of type/variation: "${fieldTypeAndVariation}".`);
	} else if (changed === false) {
		console.warn(`[MPO] inputfield_setValue() couldn't change the field but nothing complained about it. Value: "${value}" for the input-field "${fieldObj.id}" of type/variation: "${fieldTypeAndVariation}".`);
	}

	//if the value has been succesfully changed then update the value inside the 'fieldObj'
	if (changed === true) {
		fieldObj.value = value;
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
	const containerElem = inputfield_getElement(fieldID);

	//return if container can't be found
	if (containerElem === null) {
		console.error(`[MPO] Could not find container element with a 'fieldID' of "${fieldID}"`);
		return;
	}

	//get WeakMap entry
	const fieldEntry = inputfield_fields.get(containerElem);

	//get field type from field element
	const fieldType = fieldEntry['fieldType'];

	//get variation from field element
	const fieldVariation = fieldEntry['variation'];

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

			//get the actual value
			if (newValue === true) {
				newValue = fieldEntry['attributes']['checkboxValue'];
			}
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
	//get the WeakMap entry
	fieldObj = inputfield_fields.get(containerElem);

	//set the new value
	fieldObj['value'] = newValue;

	//check if it belongs to a host and if it does then update all other fields that belong to the host
	if (fieldObj.belongsToHost !== false) {
		inputfield_updateHostsChildren(fieldObj.belongsToHost, newValue);
	}

	//TODO: mark radio fields as selected

	//get the 'onchange' function
		//if a host is used then get the 'onchange' function from that
	const onchangeFunction = (fieldObj.belongsToHost !== false) ? inputfield_hosts.get(fieldObj.belongsToHost).onchange : inputfield_fields.get(containerElem).onchange;

	//execute the 'onchange' function
		//use 'setTimeout()' with a delay of 0 so it gets it's own call-stack (it basically tells the browser "Hey, execute this bit as soon as everything else is done!")
	if (typeof onchangeFunction === 'function') {
		setTimeout(() => {onchangeFunction(newValue);}, 0);
	}
}

/**	This updates all input-fields that belong to a host.
 *
 * 	This loops through all input-fields that belong to the host and it checks any that have the same 'checkboxValue' as the 'newValue'.
 * 	This does NOT call the 'onchange' functions of the individual input-fields.
 *
 * 	Args:
 * 		hostElem [DOM Element]
 * 			The DOM element of the host.
 *
 * 		newValue [*any*]
 * 			The new value that should be applied.
 */
function inputfield_updateHostsChildren (hostElem, newValue) {
	//get the WeakMap entry
	const hostObj = inputfield_hosts.get(hostElem);

	//apply the new value
	hostObj.value = newValue;

	//return if the WeakMap entry doesn't exist
	if (hostObj === undefined) {
		console.warn('[MPO] inputfield_updateHostsChildren() could not find the WeakMap entry.');
		return;
	}

	//get the list of children (array consisting of DOM Elements)
	const childList = hostObj.childList;

	for (const item of childList) {
		//get the WeakMap entry
		const fieldObj = inputfield_fields.get(item);

		switch (fieldObj.fieldType) {
			case 'checkbox':
				//if the checkbox has the same value then check it
					//use 'skipOnchange' on both because the 'onchange' function of the individual input-fields shouldn't be activated
				if (fieldObj.attributes.checkboxValue === newValue) {
					inputfield_setValue(item, newValue, {skipOnchange: true});

				//uncheck it otherwise
				} else {
					inputfield_setValue(item, false, {skipOnchange: true});
				}
				break;
		}
	}
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

/**	Gets the actual DOM element of a input-field.
 *
 * 	Args:
 * 		fieldID [Number/String/DOM Element]
 * 			The field ID of the input-field, can be in string-form (6 and '6' are both fine).
 * 			It can also be a DOM element in which case it will simply return that.
 *
 * 	Returns [DOM Element/Boolean]:
 * 		The DOM Element of the input-field if found. Returns false if no field can be found.
 */
function inputfield_getElement (fieldID) {
	if (typeof fieldID === 'string' || typeof fieldID === 'number') {
		//get the container element
		const containerElem = document.querySelector(`.inputfield_container[data-fieldid="${fieldID}"]`);

		//return the element if it exists, otherwise return false
		return containerElem ?? false;

	//check if 'fieldID' is a DOM element, if yes then return that.
	} else if (typeof fieldID === 'object' && fieldID.isDOMElement()) {
		return fieldID;
	}

	//return false if 'fieldID' a different type
	return false;
}