// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	=== HOW INPUT-FIELDS WORK ===
 *
 * 	Input-fields are a way to get user-input. Whether it's a button, a checkbox, a set of options to choose from or whatever.
 * 	Basically a <input> element that looks better.
 *
 * 	You create a input-field with 'inputfield_createField()'.
 * 	Said function then creates a <span> that contains the entire input-field. This <span> also has the 'inputfield_container' class and is called the "container".
 * 	The container also stores the unique 'fieldID' inside it's 'data-fieldid' attribute.
 *
 * 	Input-fields entirely work through the container element and fieldIDs, if you want to do anything with a already-created input-field you need one of the two.
 *
 * 	In order to create a input-field you need to specify a type and variation (though variations are automatically set to a default if not specified).
 * 	Types specify what kind of input the field should take. Each type has a different purpose.
 * 	Variations on the other hand simply change the appearance of the input-field, they don't change the actual functionality. Any variation can be replaced with any other and it still works.
 * 		(though variations are unique to each type)
 *
 *
 * 	One important thing: The DOM elements that input-fields create should NOT be messed with. If any changes are made to the DOM element they might break. It's best to completely leave them alone.
 * 	It should also be mentioned that input-fields rarely report errors, chances are they silently break with no one realizing.
 *
 *
 * 	=== INPUT FIELD TYPES & VARIATIONS ===
 *
 * 	Each type is listed here and each type will list all variations it has (which can be specified with the 'variation' attribute).
 *
 * 	form
 * 		This is a special type as it doesn't really create an actual input-field (aside from an empty '<span>'), instead it can be used to combine several input-fields into a single form.
 * 		When creating a new form you can use it's ID to add other input-fields to it. To add a input-field to a form you can use the ID of the form inside the 'addToForm' attribute.
 * 		The form will have an object as it's value containing an item for each input-field that's part of it.
 * 		Each item has the 'tag' attribute as it's name that can be used to access the value inside the object.
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
 * 		Will store the selected color in hex form ('#ffffff' being white) as a string. [NOTE: currently, any form that's allowed by CSS is able to be stored in here -- this is subject to change]
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
 * 		id [String] <optional>
 * 			The ID of the input-field. Can be used to access the input-field.
 * 			The ID can't consist of only numbers (so '123' is not allowed but '123a' is allowed).
 * 			The ID should be unique. If the same ID is used multiple times it may result in unexpected behaviour.
 * 			On default this will be a unique ID which represents the total amount of input-fields made (so the default IDs would be '1' > '2' > '3' etc.).
 *
 * 			More on what happens if the same ID is used multiple times:
 * 				Whenever an input-field is fetched by an ID, it will always only use the first input-field it finds with that ID. It won't even bother scanning for a second one.
 * 				And which one is found first can be dependant on various factors, all of them are due to how 'inputfield_getElement()' works.
 * 				The function won't be able to find a element inside a DocumentFragment or other places unless specifically specified.
 * 				The function will also search for "related" elements first if a 'referenceElem' is given (see the documentation on the function).
 * 				Both of these can affect which element is found first.
 * 				This also isn't fixed in stone, this can change in any update (for better or worse). So it's recommended to avoid using the same ID multiple times as much as possible.
 *
 * 		onchange [Function] <none>
 * 			A function that gets executed each time the input-field is updated. Available for all input types.
 * 			The first argument will be the current value of the input field.
 * 			The second argument will be the field object inside 'inputfield_fields' (see the 'inputfield_FieldObject()' function for a documentation of this object).
 *
 * 		defaultValue [*any*] <optional>
 * 			This defines the value the input-field will have after it's been created.
 * 			The default value will only be applied if it's actually valid.
 * 			If no default value is specified (or if it's invalid) then it will use the following (depending on which type it is):
 * 				form:     *N/A*
 * 				checkbox: false
 * 				radio:    *the first 'option'*
 * 				text:     '' (a blank string)
 * 				number:   0
 * 				button:   *N/A*
 * 				color:    '#000000'
 * 				file:     *N/A*
 *
 * 		labels [Array/DOM Element] <optional>
 * 			A DOM element (or an array of them) that should act as labels. Basically like a '<label>' element.
 *
 * 		cssClass [String/Array] <optional>
 * 			Regular CSS classes that will be added to the container.
 *
 * 		HTMLAttributes [Object] <optional>
 * 			A object of HTML attributes to add to the container. `{id: 'testo'}` would add 'testo' as the 'id' attribute.
 * 			The following attributes will be ignored (mainly because they're needed internally/can be set through input-field attributes):
 * 				'class', 'data-fieldid'
 *
 * 	# 'checkbox' type attributes:
 *
 * 		checkboxValue [*any*] <true>
 * 			The value the checkbox has when it's checked. Can be anything except null or undefined.
 * 			Note that the value for it being unchecked will always be false.
 *
 * 		host [DOM Element] <none>
 * 			Specifying a "host" element (can be any DOM element - even a input-field) allows you to connect several input-fields with each other.
 * 			To connect input-fields you simply use the same host element when creating the input-field and they're automatically connected with each other.
 * 			Once input-fields are connected there can only be one checkbox that's checked. Basically a 'radio' replacement.
 *
 * 			The 'onchange' attribute will only be set on the host element (which will be triggered when the value changes) and not on the individual checkboxes.
 * 			Setting a 'onchange' attribute when one has already been set then it will replace the existing one.
 * 			It is not possible to set a 'onchange' function on a individual checkbox without it applying to the host as a whole.
 *
 * 			If no 'tag' is provided then it will attempt to take the tag of the first child, if not possible it uses 'host' instead as a tag.
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
 * 		tag [String] <ID>
 * 			A tag-name is used to access the value inside a form.
 * 			It's suggested that a tag should be unique within a form, but it's not required.
 * 			If not specified then it will use it's ID as the tag. Due to this, it should be avoided to create tags that are only a number and nothing else.
 *
 * 			If multiple input-fields have the same tag then when a input-field is updated it will simply overwrite the value that's already there.
 * 			This essentially allows you to have a form value that's simply the value of the most recently updated input-field.
 *
 * 		addToForm [Array/DOM Element/String] <none>
 * 			The form element it should be added to. Can be either the DOM element of the form or it's ID (can be in string-form, so 6 and '6' are both fine).
 * 				If you use DocumentFragments then don't use the field-ID if the input-field is inside a DocumentFragment as it won't be able to find it.
 * 			Can also be an array consisting of multiple DOM elements/field-IDs.
 * 			Leave empty if it should not be added to a form.
 *
 * 		autoAddToForm [Boolean] <false>
 * 			If true any field that's a descendant of a form will automatically be added to the form.
 * 			The way this works is that it will go up the DOM tree and if it finds a form then it will be added to that form.
 * 			This only applies the moment the field is created. If the input-field is created and is afterwards appended to a form then it will NOT be added to the form.
 *
 * 	=== USING LABELS ===
 * 		Input-fields also have their own <label> alternative that's called... labels. I may like to over-complicate things but not even I would call them something else.
 *
 * 		There's multiple ways to create a label or convert an existing element to a label (any element can be a label):
 *
 * 			- Add a 'inputfield_label' class and a 'data-labelforfieldid' attribute that saves the unique input-field ID.
 *
 * 			- Include the element in the 'labels' attribute when creating a input-field.
 *
 * 			- Call 'inputfield_convertToLabel()'. This way you get more options and more control. See the documentation on the function for more info.
 * 				> You can also call '.inputfield_convertToLabel()' on a DOM element directly (again, see function for more info).
 *
 * 	=== IMPORTANT FUNCTIONS ===
 *
 * 	inputfield_createField()
 * 		Creates a new input-field.
 *
 * 	inputfield_getValue()
 * 		Gets the value of a input-field.
 *
 * 	inputfield_setValue()
 * 		Sets the input-field to a new value.
 *
 */

/**	=== USING THIS ON ANOTHER PROJECT ===
 * 	If you want to use this file on another project you gotta do the following things:
 *
 * 		- Load this file (obviously).
 * 		- Load 'styles/inputfield.css'
 * 		- Add a 'pointerdown' event that calls 'inputfield_executedAfterFieldChange(elem)' whenever the user clicks on a element with a 'inputfield_callUpdate' class ('elem' is the element being clicked on).
 * 		- Add a 'pointerdown' event that calls 'inputfield_executedAfterLabelPress(elem)'  whenever the user clicks on a element with a 'inputfield_label'      class ('elem' is the element being clicked on).
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

// This saves info about all hosts.
let inputfield_hosts = new WeakMap();

// This saves info about all labels
let inputfield_labels = new WeakMap();

/**	Creates and sets up the 'FieldObject' that saves all info related to the input-field.
 *
 * 	NOTE: To create a input-field, use 'inputfield_createField()' instead of this!
 *
 * 	This generates the unique ID and immediately applies it to the constructed object and to the linked DOM element.
 * 	This verifies and updates all attributes to be correct.
 * 	This sets up the host if needed.
 * 	This updates the host and all forms if needed.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				elem [DOM Element]
 * 					The input-field element.
 *
 * 				parent [DOM Element]
 * 					The parent of the newly created input-field.
 * 					Only needed for the 'autoAddToForm' attribute.
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
 * 		tag [String]
 * 			The tag of the input-field. Only needed for input-fields that are part of a form.
 *
 * 		propertyChanged [String]
 * 			The name of the property that has been updated.
 * 			Only needed for a form.
 * 			Will be an empty string if it doesn't apply.
 *
 * 		belongsToForm [Array]
 * 			A list of all forms this belongs to. Is an array consisting of DOM elements.
 *
 * 		formChildren [Array/null]
 * 			An array that lists all input-fields that are part of the form. Consists of DOM elements.
 * 			Will be null if this isn't a form.
 */
function inputfield_FieldObject (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_FieldObject() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	// === GET AND SET THE ID ===

	//increase the total of input-fields made (needed for unique IDs)
	inputfield_totalFieldsCreated++;

	//set ID
		//this checks if a custom ID was specified (and if yes, apply that)
			//this check works by making sure it's a string and then making sure that it's not just consisting of digits
			//so '0128' would return true -- '1ab037' would return false -- '12 ' would return false (due to the white-space)
			//arguably stuff like white-space should be removed first but I feel like we can trust the coder here
			//if someone puts white-space in a ID then either they know what they're doing or they'll find another 100 ways to break this
	if (typeof specifics.attributes.id === 'string' && /^\d+$/.test(specifics.attributes.id) !== true) {
		this.id = specifics.attributes.id;
	} else {
		this.id = String(inputfield_totalFieldsCreated);
	}

	//add the ID to the element
	if (specifics.elem.isDOMElement() === true) {
		specifics.elem.setAttribute('data-fieldid', this.id);
	}

	// === MODIFYING ATTRIBUTES ===

	//replace 'attributes' with a empty object if it isn't already an object
	if (typeof specifics.attributes !== 'object') {
		specifics.attributes = {};
	}

	//for quick access
	let attributes = specifics.attributes;

	//if no variation has been specified then try getting it from 'fieldType' (so 'radio-checkbox' is split into the fieldType 'radio' and variation 'checkbox')
	if (attributes.variation === undefined) {

		//check if it even has a dash in it
		if (specifics.fieldType.indexOf('-') !== -1) {

			//actually split it
			const fieldTypeSplit = specifics.fieldType.splitOnce('-');

			//apply the new strings
			specifics.fieldType = fieldTypeSplit[0];
			attributes.variation = fieldTypeSplit[1];
		}
	}

	//get default variation if no variation has been specified
	attributes.variation ??= inputfield_getDefaultVariation(specifics.fieldType);

	//set 'checkboxValue' to true if it hasn't been specified
		//this has to be done before calling 'inputfield_getDefaultValue()' since that would think a value of `undefined` is valid (when it isn't)
	attributes.checkboxValue ??= true;

	//check if 'defaultValue' is valid and if not, replace it with a default value
		//note that we pass 'attributes' here despite those still getting verified in here but that doesn't matter here since it only needs attribute properties that we don't modify here
	if (inputfield_validateValue(attributes.defaultValue, {fieldType: specifics.fieldType, attributes: attributes}) !== true) {
		attributes.defaultValue = inputfield_getDefaultValue(specifics.fieldType, attributes);
	}

	//if 'cssClass' is a string then add it to an empty array
	if (typeof attributes.cssClass === 'string') {
		attributes.cssClass = [attributes.cssClass];
	}

	//if 'cssClass' is an array then iterate through all of them
	if (Array.isArray(attributes.cssClass) === true) {
		for (const item of attributes.cssClass) {

			//if the array item is a string then add it to the element
			if (typeof item === 'string') {
				specifics.elem.classList.add(item);
			}
		}

	//if it's not an array then replace it with an empty array as a failsafe
	} else {
		attributes.cssClass = [];
	}

	//set all 'HTMLAttributes'
	if (typeof attributes.HTMLAttributes === 'object') {
		for (key in attributes.HTMLAttributes) {

			//if it's 'class' or 'data-fieldid' then delete the entry and continue with the next one
			if (key === 'class' || key === 'data-fieldid') {
				delete attributes.HTMLAttributes[key];
				continue;
			}

			//actually apply it to the element
			specifics.elem.setAttribute(key, attributes.HTMLAttributes[key]);
		}
	}

	//turn 'addToForm' into an empty array if nullish
	if (attributes.addToForm === undefined || attributes.addToForm === null) {
		attributes.addToForm = [];

	//add 'addToForm' to an empty array if it's not an array already
	} else if (Array.isArray(attributes.addToForm) !== true) {
		attributes.addToForm = [attributes.addToForm];
	}

	//if 'autoAddToForm' is true then automatically add this field to any form that can be found by going up the DOM Tree
	if (attributes.autoAddToForm === true) {

		//get the parent element of the current input-field (if available)
		let loopedElem = specifics.parent;

		if (Object.isDOMElement(loopedElem) !== true) {
			console.warn(`[MPO] Could not apply 'autoAddToForm' during the creation of a input-field (ID: ${this.id}) as the provided parent in 'inputfield_FieldObject()' is not a DOM Element (this is likely a internal error).`);
		}

		//only loop if it is actually a DOM element
		while (Object.isDOMElement(loopedElem) === true) {

			//if it's a form then add it to the 'addToForm' array
			if (inputfield_fields.get(loopedElem)?.fieldType === 'form') {
				attributes.addToForm.push(loopedElem);
			}

			//get the parent element
			loopedElem = loopedElem.parentNode;
		}
	}

	//'.removeEachIf()' executes this function for each array item and then removes the item if the function returns true
	attributes.addToForm.removeEachIf((item, index) => {

		//convert it to a DOM element if it only specified the fieldID
		if (typeof item === 'string') {
			item = inputfield_getElement(item, {referenceElem: specifics.elem});

			//complain if the element couldn't be found
			if (item === false) {
				console.warn(`[MPO] Could not find the input-field with the ID "${item}" while trying to scan the 'addToForm' attribute during the creation of input-field "${this.id}". This could be a cause of using DocumentFragments.`);
			}
		}

		//return a boolean on whether or not the array item should be deleted (true = delete)
			//if it's not a DOM element then delete it
			//if it's not the first instance of this exact value then delete it
		return (Object.isDOMElement(item) !== true || attributes.addToForm.indexOf(item) !== index);
	});

	//set the host object as undefined
		//has to be actually initialized later as the host object might not even exist yet
	let hostObj;

	//check if a host is (correctly) specified
	if (attributes.host?.isDOMElement() === true) {

		//if the host hasn't been setup yet then set it up now
		if (inputfield_hosts.get(attributes.host) === undefined) {
			inputfield_setupHost({
				hostElem: attributes.host,
				onchange: (typeof attributes.onchange !== 'function') ? (() => {return;}) : attributes.onchange
			});
		}

		//actually set the host object
		hostObj = inputfield_hosts.get(attributes.host);

		//add the newly created input-field to the hosts children
		hostObj.childList.push(specifics.elem);

		//overwrite the tag if one is specified
		if (attributes.tag !== undefined) {
			hostObj.tag = attributes.tag;
		}

		//overwrite the 'onchange' function if one is specified
		if (attributes.onchange !== undefined) {
			hostObj.onchange = attributes.onchange;
		}

		//note that 'addToForm' will be added to the host below

	//complain if a host has been specified but isn't a DOM Element
		//and also set it to undefined just to be sure
	} else if (attributes.host !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received an invalid 'host' attribute: "${attributes.host}"`);
		attributes.host = undefined;
	}

	//add this input-field to all forms it should be added to
	if (Array.isArray(attributes.addToForm) === true) {
		for (const item of attributes.addToForm) {
			const formChildren = inputfield_fields.get(item)?.formChildren;

			//skip if the field object doesn't exist
			if (formChildren === undefined) {
				continue;
			}

			//check if the element has already been added, if no then add it
				//note that we have to use the host element if it exists instead of this input-field
			if (formChildren.indexOf(attributes.host ?? specifics.elem) === -1) {
				formChildren.push(attributes.host ?? specifics.elem);
			}

			//push the forms to the host if there is a host
			if (hostObj !== undefined) {
				hostObj.belongsToForm.push(item);
			}
		}
	}

	//clear some attributes that are no longer needed if a host is used
	if (attributes.host !== undefined) {
		attributes.addToForm = [];
	}

	//get default tag if no tag has been specified
		//note that this has to be done after the previous stuff because one bit relies on whether a tag has been specified or not
	attributes.tag ??= String(this.id);

	//set the 'onchange' to a empty function if nothing is specified
		//note that this has to be done after the previous stuff because one bit relies on whether a onchange function has been specified or not
	attributes.onchange = (typeof attributes.onchange !== 'function' || attributes.host !== undefined) ? (() => {return;}) : attributes.onchange;

	//if 'labels' is undefined then convert it to an empty array
	if (attributes.labels === undefined) {
		attributes.labels = [];

	//if 'labels' isn't a array then put it inside an array
	} else if (Array.isArray(attributes.labels) !== true) {
		attributes.labels = [attributes.labels];
	}

	//apply the 'labels' attribute and remove all invalid array items
	attributes.labels.removeEachIf((item) => {
		//if it's not a DOM element then return true (which removes the array item)
		if (Object.isDOMElement(item) !== true) {
			return true;

		//if it's a DOM element then convert it to a basic label and return false (keep the array item)
		} else {
			item.classList.add('inputfield_label');
			item.setAttribute('data-labelforfieldid', this.id);
			return false;
		}
	})



	// === SETTING THE ACTUAL PROPERTIES ===

	//set value
		//if it's a form then set it to an empty object - otherwise set it to the value specified
	this.value = (specifics.fieldType === 'form') ? {} : specifics.value;

	//set type
	this.fieldType = specifics.fieldType;

	//set variation
		//if no variation has been specified then get the default one
	this.variation = specifics.attributes.variation;

	//create a string that combines fieldType and it's variation for use on switches
	this.fieldTypeAndVariation = `${this.fieldType}-${this.variation}`;

	//set attributes
	this.attributes = specifics.attributes;

	//set the onchange function
	this.onchange = specifics.attributes.onchange;

	//set whether this belongs to a host (and which one)
	this.belongsToHost = specifics.attributes.host ?? false;

	//set tag
	this.tag = specifics.attributes.tag;

	//set propertyChanged
		//always defaults to an empty string
	this.propertyChanged = '';

	//set belongsToForm
	this.belongsToForm = specifics.attributes.addToForm;

	//create a list of all input-fields this form contains (but only if it is a form)
	this.formChildren = (specifics.fieldType === 'form') ? [] : null;
}

/**	Creates a 'HostObject' that saves all info related to a host.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				childList [Array] <optional>
 * 					A list of all DOM elements that belong to the host. Defaults to creating an empty array.
 *
 * 				defaultValue [*any*] <undefined>
 * 					The default value it should have.
 *
 * 				tag [String] <'host'>
 * 					The tag of the host. See the 'tag' attribute for more info.
 * 					Uses the tag of the first child and then simply 'host' if no tag is specified.
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
 *
 * 		tag [String]
 * 			The tag of the input-field. Only needed for input-fields that are part of a form.
 *
 * 		belongsToForm [Array]
 * 			A list of all forms this belongs to. Is an array consisting of DOM elements.
 */
function inputfield_HostObject (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_HostObject() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//set the 'childList' to an empty array if it hasn't been defined yet
	specifics.childList ??= [];

	//set the list of children
		//use an empty array if no child has been defined
		//if it's not an array then wrap it in one first, otherwise use it as-is
	this.childList = (specifics.childList === undefined)           ? []
	               : (Array.isArray(specifics.childList) !== true) ? [specifics.childList]
	               : specifics.childList;

	//set the defaultValue
		//note that if it hasn't been specified then it'll be undefined which is what we need then anyway
	this.value = specifics.defaultValue;

	//set the 'onchange' function
		//use a empty function if it hasn't been defined
	this.onchange = (typeof specifics.onchange !== 'function') ? (() => {return;}) : specifics.onchange;

	//set tag
	this.tag = specifics.tag ?? inputfield_fields.get(this.childList[0])?.tag ?? 'host';

	//set belongsToForm
	this.belongsToForm = [];
}

/**	Creates a 'LabelObject' that saves all info related to a label.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				labelElem [DOM Element]
 * 					The element that should be converted to a label.
 *
 * 				fieldID [String/DOM Element]
 * 					The field ID of the input-field it should be linked to.
 * 					It can also be a DOM element in which case it will simply get the 'data-fieldid' attribute from it.
 *
 * 				action [String] <'click'>
 * 					What action should be done once the user clicks on it.
 * 					The default will be used if this is invalid.
 * 					Can be one of the following:
 * 						- click: Simulates a click on the element. Identical to an actual click done by the user. Uses `elem.click()`.
 * 						- focus: Simply focuses the element.
 * 						- copy: Copies the value of the input-field to the clipboard.
 * 						- setToValue: Sets the value of the field to the one specified (see 'value' below).
 *
 * 				radioOption [String/null] <null>
 * 					Only used if the input-field is of type 'radio'.
 * 					This defines if the label should only affect a single radio option (instead of the input-field as a whole) and which one.
 * 					If null the input-field as a whole will be targeted (like any other input-field).
 * 					Has to be the name of the targeted radio option (specified in the attributes of the input-field under 'radioOptions' -> 'value').
 *
 * 					If this variable is used the label will act the following way depending on what 'action' is:
 * 						- click: The specified option will be selected.
 * 						- focus: The specified option will be focused.
 * 						- copy: The value of the specified option will be copied (NOT the selected value - only the value of this option).
 * 						- setToValue: Nothing will happen.
 *
 * 				value [String] <undefined>
 * 					Only required if 'action' is 'setToValue'.
 * 					The value the input-field should be set to.
 * 					Has to be a string. The value will automatically be converted to a number or boolean for input-fields of type 'number' and 'checkbox' respectively ('true'/'True' > true).
 *
 * 	Constructs:
 * 		labelForFieldID [Number]
 * 			The unique input-field ID of the field this is linked to.
 *
 * 		action [String]
 * 			The action that should be taken once the user clicks on the label.
 * 			This action changes when 'radioOption' (see below) is used.
 * 			Can be one of the following:
 * 				- click: Simulates a click. Input-fields of type 'button' will be clicked on; 'checkbox' fields will be toggled; nothing happens to all other types.
 * 				         After the click all input-fields regardless of type will also be focused.
 * 				- focus: Simply focuses the element.
 * 				- copy: Copies the value of the input-field to the clipboard.
 * 				- setToValue: Sets the value of the field to the one specified (see 'value' below).
 *
 * 		radioOption [String/null]
 * 			This is used to target a specific option of a radio field (since radio-fields tend to have multiple elements).
 * 			If used this will be the value of the option.
 * 			If unused this will be `null` (which means the input-field as a whole is targeted, not any specific option).
 *
 * 			If used 'action' will behave slightly differently:
 * 				- click: The specified option will be selected.
 * 				- focus: The specified option will be focused.
 * 				- copy: The value of the specified option will be copied (NOT the selected value - only the value of this option).
 * 				- setToValue: Nothing will happen.
 *
 * 		value [*any*]
 * 			The value that should be used if 'action' is 'setToValue'.
 * 			Will likely be `undefined` otherwise.
 */
function inputfield_LabelObject (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_LabelObject() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//complain and return if 'labelElem' is not a DOM element
	if (Object.isDOMElement(specifics.labelElem) !== true) {
		console.warn(`[MPO] inputfield_convertToLabel() received a non-element as 'labelElem': "${specifics.labelElem}".`);
		return;
	}



	//=== VERIFY ALL ARGUMENTS ===

	//fetch the 'data-fieldid' attribute if a DOM element was given
	if (Object.isDOMElement(specifics.fieldID) === true) {
		specifics.fieldID = specifics.fieldID.getAttribute('data-fieldid');
	}

	//complain and return if 'fieldID' isn't a string
	if (typeof specifics.fieldID !== 'string') {
		console.warn(`[MPO] inputfield_LabelObject() received a non-string as 'fieldID': ${specifics.fieldID} (note that if a DOM element was given then this means it's 'data-fieldid' attribute was invalid).`);
		return;
	}

	//if 'action' isn't valid then set it to the default
	if (['click', 'focus', 'copy', 'setToValue'].indexOf(specifics.action) === -1) {

		//complain if it's invalid (and not just ignored on purpose)
		if (specifics.action !== undefined) {
			console.warn(`[MPO] inputfield_convertToLabel() received a invalid 'action' argument: "${specifics.action}".`);
		}

		//use the default
		specifics.action = 'click';
	}

	//verify 'radioOption'
	if (typeof specifics.radioOption !== 'string' && specifics.radioOption !== null) {

		//complain if 'radioOption' was invalid
			//but only if it hasn't been left out on purpose
		if (specifics.radioOption !== undefined) {
			console.warn(`[MPO] inputfield_LabelObject() received a non-string as 'radioOption': "${specifics.radioOption}".`);
		}

		//use default
		specifics.radioOption = null;
	}



	// === SETTING THE ACTUAL PROPERTIES ===

	//the ID of the field it's linked to
	this.labelForFieldID = specifics.fieldID;

	this.action = specifics.action;

	this.radioOption = specifics.radioOption;

	this.value = specifics.value;



	// === CONVERTING THE LABEL ELEMENT ===

	//add the class
	specifics.labelElem.classList.add('inputfield_label');

	//add the input-field it's linked to
	specifics.labelElem.setAttribute('data-labelforfieldid', this.labelForFieldID);
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
 * 		attributes [Object] <optional>
 *			See "attributes" in the documentation at the top of this file.
 *
 * 	Returns [DOM Element]:
 * 		The input-field DOM element.
 */
function inputfield_createField (fieldType, parent, attributes) {
	//create the document fragment
	let docFrag = new DocumentFragment();

	//this will contain the entire input field
	const container = cElem('span', docFrag, {
		class: 'inputfield_container'
	});

	//create the field object
	const fieldObj = new inputfield_FieldObject({
		elem:       container,
		parent:     parent,
		value:      undefined,
		fieldType:  fieldType,
		attributes: attributes
	});

	container.classList.add('fieldType-' + fieldObj.fieldType);
	container.classList.add('fieldVariation-' + fieldObj.variation);

	//add the field object to the list
	inputfield_fields.set(container, fieldObj);

	//get the ID of this input field
	const fieldID = fieldObj.id;

	//get the actual attributes (since 'inputfield_FieldObject()' verifies and updates them)
	attributes = fieldObj.attributes;

	//this will be the default value
	let value;

	//create the actual input fields depending on which type it is
	switch (fieldObj.fieldTypeAndVariation) {
		case 'form-regular':
			//forms only create a simple <span> element (the container) and nothing more as such that's the actual input element
			container.classList.add('inputfield_actualInputElement');
			break;

		case 'checkbox-regular':
			cElem('input', container, {type: 'checkbox', class: 'fieldType-checkbox inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this)', 'data-linktofieldid': fieldID});
			break;

		case 'radio-checkbox':
			//create a <input> radio checkbox for each option with | on each side to divide them
			for (const item of attributes.options) {
				//create the label
					//first, create a <span>
					//then convert it to a label
					//and lastly add the text
				cElem('span', container)
					.inputfield_convertToLabel(container, {radioOption: item.value})
					.textContent = `| ${item.name}: `;

				//create the actual checkbox
				cElem('input', container, {type: 'radio', name: `fieldID-${fieldID}`, class: 'fieldType-radioCheckbox inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this)', 'data-linktofieldid': fieldID, 'data-holdsvalue': item.value});

				//create another label
				cElem('span', container)
					.inputfield_convertToLabel(container, {radioOption: item.value})
					.textContent = '|';
			}
			break;

		case 'radio-select': {
			let selectElem = cElem('select', container, {class: 'fieldType-radioSelect inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-linktofieldid': fieldID});

			//create a <option> inside the <select> for each option
			for (const item of attributes.options) {
				cElem('option', selectElem, {value: item.value}).textContent = item.name;
			}
			break;
		}

		case 'radio-image':
			//create a <img> for each option
			for (const item of attributes.options) {
				cElem('img', container, {class: 'fieldType-imgButton inputfield_actualInputElement', autocomplete: 'off', onclick: 'inputfield_executedAfterFieldChange(this)', src: item.src, 'data-linktofieldid': fieldID, 'data-holdsvalue': item.value});
			}
			break;

		case 'text-small':
			cElem('input', container, {type: 'text', class: 'fieldType-text inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-linktofieldid': fieldID});
			break;

		case 'text-area':
			cElem('textarea', container, {class: 'fieldType-textarea inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-linktofieldid': fieldID})
			break;

		case 'number-text':
			cElem('input', container, {type: 'number', class: 'fieldType-numberText inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-linktofieldid': fieldID});
			break;

		case 'number-range':
			cElem('input', container, {type: 'range', class: 'fieldType-numberRange inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-linktofieldid': fieldID});
			break;

		case 'number-counter':
			console.warn('[MPO] Number-counters aint supported yet.');
			break;

		case 'button-regular':
			cElem('input', container, {type: 'button', class: 'fieldType-button inputfield_actualInputElement', autocomplete: 'off', onclick: 'inputfield_executedAfterFieldChange(this);', 'data-linktofieldid': fieldID});
			break;

		case 'button-image':
			console.warn('[MPO] Image buttons aint supported yet.');
			break;

		case 'color-regular':
			cElem('input', container, {type: 'color', class: 'fieldType-color inputfield_actualInputElement', autocomplete: 'off', onchange: 'inputfield_executedAfterFieldChange(this);', 'data-linktofieldid': fieldID});
			break;

		case 'file-regular':
			console.warn('[MPO] File inputs aint supported yet.');
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_createField()': "${fieldType}"`);
			break;
	}

	//set the default value (without triggering 'onchange')
		//and also ignore the host because this should apply to the individual input-field only
	inputfield_setValue(container, attributes.defaultValue, {
		skipOnchange: true,
		updateHost: false,
		DOMTree: docFrag
	});

	//append the document fragment to the actual parent
	parent.appendChild(docFrag);

	//return the input-field DOM element
	return container;
}

/**	Sets up a input-field host.
 *
 * 	Only really creates the WeakMap entry but that's all that's needed.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				hostElem [DOM Element]
 * 					The element that's supposed to be the host.
 *
 * 				onchange [Function] <optional>
 * 					The function that should be executed when the value changes. Defaults to doing nothing.
 */
function inputfield_setupHost (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] modal_ModalObject() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//return if the object is not a DOM Element
	if (Object.isDOMElement(specifics.hostElem) !== true) {
		console.warn('[MPO] inputfield_setupHost() received a non-element.');
		return;
	}

	//create the WeakMap entry
	inputfield_hosts.set(specifics.hostElem, new inputfield_HostObject({onchange: specifics.onchange}));
}

/**	Converts a DOM Element to a input-field label.
 *
 * 	Note: This function can also be called as a property by using 'elem.inputfield_convertToLabel(field, specifics)' (note that the 'elem' argument is not needed if called this way).
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The element that should be converted.
 * 			Note: If you call this function via 'variable.inputfield_convertToLabel()' then you can completely skip this argument.
 * 			      Don't even use `undefined` or `null` or something, just skip it completely.
 *
 * 		field [DOM Element/String]
 * 			The input-field. Can be the DOM element itself or it's input-field ID.
 * 			It will NOT be verified whether the input-field even exists or not.
 *
 * 		specifics [Object] <optional>
 * 			Contains the following properties:
 *
 * 				action [String] <'click'>
 * 					What action should be done once the user clicks on it.
 * 					The default will be used if this is invalid.
 * 					Can be one of the following:
 * 						- click: Simulates a click. Input-fields of type 'button' will be clicked on; 'checkbox' fields will be toggled; nothing happens to all other types.
 * 						         After the click all input-fields regardless of type will also be focused.
 * 						- focus: Simply focuses the element.
 * 						- copy: Copies the value of the input-field.
 * 						- setToValue: Sets the value of the field to the one specified (see 'value' below).
 *
 * 				radioOption [String] <none>
 * 					The value of the radio option this should apply to.
 * 					If no value is specified then this applies to the radio-field as a whole.
 * 					If a value is specified here then the following applies to that option:
 * 						- click: The specified option will be selected.
 * 						- focus: The specified option will be focused.
 * 						- copy: The value of the specified option will be copied (NOT the selected value - only the value of this option).
 * 						- setToValue: Nothing will happen.
 *
 * 				value [String] <undefined>
 * 					Only required if 'action' is 'setToValue'.
 * 					The value the input-field should be set to.
 * 					Has to be a string. The value will automatically be converted to a number or boolean for input-fields of type 'number' and 'checkbox' respectively ('true'/'True' > true).
 *
 * 	Returns [DOM Element/null]:
 * 		If it got converted succesfully it returns the converted DOM element.
 * 		If it failed to convert it returns null.
 */
function inputfield_convertToLabel (elem, field, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_convertToLabel() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//complain and return if 'elem' isn't a DOM element
		//but return the element anyway for good measure
	if (Object.isDOMElement(elem) !== true) {
		console.warn(`[MPO] inputfield_convertToLabel() received a non-element as 'elem': "${elem}".`);
		return elem;
	}

	//add these arguments to 'specifics'
	specifics.labelElem = elem;
	specifics.field = field;

	//create and push the 'LabelObject'
		//this also sets up the DOM element of the label
	inputfield_labels.set(elem, new inputfield_LabelObject(specifics));

	//return the element
	return elem;
}

//add the function to the Object prototype
Object.defineProperty(HTMLElement.prototype, 'inputfield_convertToLabel', {
	value: function (field, specifics) {
		return inputfield_convertToLabel(this, field, specifics);
	}
});

/**	Gets the value of a input-field.
 *
 * 	Args:
 * 		field [DOM Element/String]
 * 			The input-field. Can be the DOM element itself or it's input-field ID.
 *
 * 	Returns [String/null]:
 * 		The value of the input-field as a string.
 * 		Returns null if the input-field can't be found.
 */
function inputfield_getValue (field) {
	//get the element
	const elem = inputfield_getElement(field);

	//return null if element doesn't exist
	if (elem === null) {
		return null;
	}

	//get the field object
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
 * 	Note that this will NOT trigger the 'onchange' function if the value was already set.
 *
 * 	This can be called for a button. Simply use `null` (though it'll work with any value except `undefined`).
 *
 * 	Args:
 * 		field [DOM Element/String]
 * 			The input-field. Can be the DOM element itself or it's input-field ID.
 *
 * 		value [*any*]
 * 			The value the input-field should be set to.
 * 			Note that this will check whether it's valid or not. If not then it will simply not set it.
 *
 * 		specifics [Object] <optional>
 * 			Contains the following properties:
 *
 * 				skipOnchange [Boolean] <false>
 * 					If true it will skip calling the 'onchange' function of the input-field.
 *
 * 				updateHost [Boolean] <true>
 * 					If true it updates the host if there is a host (as it should).
 * 					If false it ignores the host and simply applies the value to the actual input-field itself.
 *
 * 				formProperty [String/Boolean] <false>
 * 					Which form property it should update.
 * 					This will automatically search for the input-field with this tag and update all that match.
 * 					If this is set to false it will simply overwrite the form as a whole.
 * 					Will be ignored for anything that's not a form.
 *
 * 				DOMTree [DOM Tree] <document>
 * 					Which DOM tree it should look for the input-field.
 * 					Chances are this is simply 'document', but it can also be a 'DocumentFragment' in which case that should be passed as a whole.
 *
 * 	Return [Boolean]:
 * 		Returns true if succesfully updated and false if it couldn't be updated.
 * 		This will also return true if the value specified is already set.
 */
function inputfield_setValue (field, value, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_setValue() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//get the container
		//we don't have to check if this is valid because the field object will simply not be found if this doesn't exist
	const containerElem = inputfield_getElement(field);

	//get the field object
	const fieldObj = inputfield_fields.get(containerElem);

	//return and complain if the 'fieldObj' could not be found
	if (fieldObj === undefined) {
		console.warn(`[MPO] inputfield_setValue() could not find the 'fieldObj' for the field "${field}".`);
		return false;
	}

	//get host object
	const hostObj = inputfield_hosts.get(fieldObj.belongsToHost);

	//check if the host should be updated and also check if the host even exists
	if (specifics.updateHost !== false && hostObj !== undefined) {

		//return if it's already set to the correct value
		if (hostObj.value === value) {
			return true;
		}

		//update the hosts value
		inputfield_updateHostsChildren(fieldObj.belongsToHost, value);

		return true;
	}

	//return if it's already set to the correct value
	if (fieldObj.value === value) {
		return true;
	}

	//this tracks whether the field has actually been updated or not
		//NOTICE: If this is set to true then at the end of the function the 'value' variable will be used to update 'fieldObj', which means 'value' has to be identical to the value actually used.
	let changed = false;

	//if this is set to true then at the end of the function it will call 'console.warn()' with the value and the fieldID in it
	let complain = false;

	//this is a list of the actual <input> elements (or an alternative to them)
	const actualElemList = inputfield_getActualInputElements(containerElem, specifics.DOMTree);

	//this is the first actual element (since usually only the first is needed)
	const actualElem = actualElemList[0];

	//complain and return if nothing was found
	if (Object.isDOMElement(actualElem) !== true) {
		console.warn(`[MPO] inputfield_setValue() couldn't find the actual input element for input-field "${fieldObj.id}".`);
		return false;
	}

	//combine fieldType and variation into a single string for the switch
	const fieldTypeAndVariation = fieldObj.fieldTypeAndVariation;

	switch (fieldTypeAndVariation) {
		case 'form-regular':
			//if a form property is provided then apply the value to the specified input-field
			if (typeof specifics.formProperty === 'string') {

				//loop through all form-children
				for (const item of fieldObj.formChildren) {

					//check if the tag of the field matches the 'formProperty'
					if (inputfield_fields.get(item).tag == specifics.formProperty) {

						//update the input-field with the matching tag instead
						inputfield_setValue(item, value, {skipOnchange: specifics.skipOnchange});

						//if the 'onchange' function should be executed then it's already been executed anyway by calling 'inputfield_setValue()' above
						specifics.skipOnchange = true;

						//just fucking return it
							//can't change 'changed' to true because that would overwrite the form but can't not do that either since it'll complain about it
							//the rest of the function isn't needed anyway
						return true;
					}
				}

			//else simply overwrite the form
			} else {
				//there's no actual form element that has to be updated so all it needs to do is update the field object which it does at the end of this function
				changed = true;
			}
			break;

		case 'checkbox-regular':
			switch (value) {
				//if the value is true then update 'value' to the one specified in 'checkboxValue' and then let it fall through to the next case
				case true:
					value = fieldObj.attributes.checkboxValue;

				//set it to true if it equals to the 'checkboxValue'
				case fieldObj.attributes.checkboxValue:
					actualElem.checked = true;
					changed = true;
					break;

				//if false, it's false
				case false:
					actualElem.checked = false;
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
			for (const item of actualElemList) {
				if (item.getAttribute('data-holdsvalue') === value) {
					item.checked = true;
					changed = true;
				}
			}
			break;

		case 'radio-select': {
			//loop through all possible options to see if the value is even possible
				//this should be done as plain <select> elements are not capable of holding values that aren't already part of it
				//I mean, I suppose you can create a non-selectable <option> just for this but that's a bit out-of-scope for now (one day though -- jk, I'll simply forget about adding this)
			for (const item of actualElem.options) {
				if (item.value === value) {
					actualElem.value = value;
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
			actualElem.value = value;
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
			if (isNaN(value) === true) {
				complain = true;

			} else {
				actualElem.value = value;
				changed = true;
			}
			break;

		case 'number-counter':
			console.warn('[MPO] Number-counters aint supported yet.');
			break;

		case 'button-regular':
			//pretend the button updated so the 'onchange' value gets executed
				//'value' should be set to `undefined` since buttons aren't supposed to have actual values
			value = undefined;
			changed = true;
			break;

		case 'button-image':
			console.warn('[MPO] Image buttons aint supported yet.');
			break;

		case 'color-regular':
			if (typeof value === 'string') {
				//first, get the initial value
				let initialValue = actualElem.value;

				//try to set it
				actualElem.value = value;

				//if it's not the value we set it to then it means it failed and so, we complain about it
					//note that it sets it to '#000000' automatically when it fails, that's why we put it back to the initial value because that's way better than a likely unwanted color
				if (actualElem.value !== value) {
					actualElem.value = initialValue;

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

	//WARNING: When editing anything here, make sure it still works properly when updating forms with the 'formProperty' specific since that returns immediately without even getting here

	//complain about it
	if (complain === true) {
		console.warn(`[MPO] inputfield_setValue() has received an invalid value: "${value}" for the input-field "${fieldObj.id}" of type/variation: "${fieldTypeAndVariation}".`);
	} else if (changed === false) {
		console.warn(`[MPO] inputfield_setValue() couldn't change the field but nothing complained about it. Value: "${value}" for the input-field "${fieldObj.id}" of type/variation: "${fieldTypeAndVariation}".`);
	}

	//if the value has been succesfully changed then update the value inside the 'fieldObj'
	if (changed === true) {
		inputfield_applyNewValue(containerElem, value, {skipOnchange: specifics.skipOnchange, updateHost: specifics.updateHost});
		return true;
	}
	return false;
}

/**	This will validate whether a given value is valid or not.
 *
 * 	Args:
 * 		value [*any*]
 * 			The value that should be validated.
 *
 * 		specifics [Object]
 * 			Contains the following:
 *
 * 				fieldType [String]
 * 					The fieldType that should be used to validate.
 *
 * 				attributes [Object]
 * 					The attributes of the input-field.
 * 					This is only really required to get the 'checkboxValue' and the 'options' for checkboxes and radio fields respectively but it's best to always pass it.
 *
 * 				field [Object/DOM Element] <optional>
 * 					A 'FieldObject' or the DOM Element of the input-field.
 * 					Can be used instead of 'fieldType' and 'attributes'.
 * 					Will automatically fetch 'fieldType' and 'attributes' if provided.
 *
 * 	Returns [Boolean]:
 * 		true if it's valid, false if not.
 */
function inputfield_validateValue (value, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_validateValue() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//check if the 'field' specific is used
	if (specifics.field !== undefined) {

		//if 'field' is a DOM Element then get the 'FieldObject' for it
		if (Object.isDOMElement(specifics.field) === true) {
			specifics.field = inputfield_fields.get(specifics.field);
		}

		//for quick access
		const field = specifics.field;

		//check if 'fieldType' and 'attributes' are actually present
		if (typeof field.fieldType === 'string' && typeof field.attributes === 'object') {

			//and then apply them
			specifics.fieldType  = field.fieldType ;
			specifics.attributes = field.attributes;

		//else complain
			//but don't return because the switch will do that anyway
		} else {
			console.warn(`[MPO] inputfield_validateValue() got a invalid 'field' argument: "${field}" (either 'field.fieldType' is not a string: "${field.fieldType}" or 'field.attributes' is not an object: "${field.attributes}").`);

			//apply them because one might be correct ¯\_(ツ)_/¯
			specifics.fieldType  = field.fieldType ;
			specifics.attributes = field.attributes;
		}
	}

	//for quick access
	const fieldType  = specifics.fieldType ;
	const attributes = specifics.attributes;

	//check which value is true based on which 'fieldType' it is
	switch (fieldType) {

		case 'form':
			if (typeof value === 'object') {
				return true;
			}
			return false;

		case 'checkbox':
			if (value === true || value === false || value === attributes.checkboxValue) {
				return true;
			}
			return false;

		case 'radio':
			//loop through all the options to see if they have the same value
			for (const item of attributes.options) {
				if (item.value === value) {
					return true;
				}
			}
			return false;

		case 'text':
			if (typeof value === 'string') {
				return true;
			}
			return false;

		case 'number':
			if (typeof value === 'number') {
				return true;
			}
			return false;

		case 'button':
			return true;

		case 'color':
			//with this the browser automatically checks whether the value is allowed for the 'color' CSS property
				//this means that anything from 'red' to '#ffffff' to 'rgba(0, 0, 0, 0)' will be true just like regular CSS
			return CSS.supports('color', value);

		case 'file':
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_validateValue()': "${fieldType}"`);
			break;
	}
	return false;
}

/**	Gets and returns the default value of a certain fieldType.
 *
 * 	Args:
 * 		fieldType [String]
 * 			The fieldType that should receive the default value.
 *
 * 		attributes [Object]
 * 			The attributes of the input-field.
 * 			This is only really required to get the 'options' for radio fields but it's best to always pass it.
 *
 * 	Returns [*any*]:
 * 		The default value.
 */
function inputfield_getDefaultValue (fieldType, attributes) {
	switch (fieldType) {

		case 'form':
			//in theory we should get each element that belongs to this form and then apply it but in practise that should be done automatically anyway when the individual input-fields are being created
				//now, this should still apply all values from every input-field but unfortunately I'm not doing that today (if ever), so I'll just mark this as a TODO:
			return {};

		case 'checkbox':
			return false;

		case 'radio':
			//get the value of the first 'option' specified
				//return false if it couldn't be found as a failsafe
			return attributes?.options[0]?.value ?? false;

		case 'text':
			return '';

		case 'number':
			return 0;

		case 'button':
			return undefined;

		case 'color':
			return '#000000';

		case 'file':
			return undefined;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_getDefaultValue()': "${fieldType}"`);
			break;
	}
	return undefined;
}

/**	Gets executed when a input field is changed.
 *
 * 	Gets the raw value of the input-field, then calls 'inputfield_applyNewValue()' so the new value is saved properly.
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The actual input element that got updated or in case of buttons, the element that got clicked on.
 */
function inputfield_executedAfterFieldChange (elem) {
	//get the field ID of the field it belongs to
	const fieldID = elem.getAttribute('data-linktofieldid');

	//get the container element
	const containerElem = inputfield_getElement(fieldID, {referenceElem: elem});

	//return if container can't be found
	if (containerElem === false) {
		console.error(`[MPO] Could not find container element with a 'fieldID' of "${fieldID}"`);
		return;
	}

	//get field object
	const fieldObj = inputfield_fields.get(containerElem);

	//get new value based on which 'fieldType' it is
		//note that this can't use 'inputfield_getValue()' because that function simply gets the 'fieldValue' attribute of the element
		//but we're currently in the process of setting said attribute so that function would only return the previous value
	let newValue;
	switch (fieldObj.fieldTypeAndVariation) {

		case 'checkbox-regular':
			//invert the value because checkboxes are weird and the new value will only be applied afterwards
			newValue = elem.checked;

			//get the actual value
			if (newValue === true) {
				newValue = fieldObj.attributes.checkboxValue;
			}
			break;

		case 'radio-checkbox':
			newValue = elem.getAttribute('data-holdsvalue');
			break;

		case 'radio-select':
			newValue = elem.value;
			break;

		case 'radio-image':
			newValue = elem.getAttribute('data-holdsvalue');
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
			newValue = undefined;
			break;

		case 'color-regular':
			newValue = elem.value;
			break;

		case 'file-regular':
			break;

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_executedAfterFieldChange()': "${fieldObj.fieldType}"`);
			break;
	}

	//update the field with the new value
	inputfield_applyNewValue(containerElem, newValue);
}

/**	Applies the new value to the input-field and executes the 'onchange' function of the field.
 *
 * 	Updates the 'value' property inside the field object, marks the new value as selected in case of radio fields and executes the 'onchange' function of the input field.
 *
 * 	Args:
 * 		containerElem [DOM Element]
 *			The element that contains the entire input field. Should have the class 'inputfield_container'.
 *
 * 		newValue [*any*]
 * 			The new value it should be updated to.
 * 			Note that this function doesn't check whether the value is even valid. So a number field could get a value of 'waluigi' if that's what you want.
 *
 * 		specifics [Object] <optional>
 * 			Includes the following optional properties:
 *
 * 				skipOnChange [Boolean] <false>
 * 					If true it skips executing the 'onchange' function.
 *
 * 				formProperty [String] <optional>
 * 					In case a form is being updated it will only update the property with this name instead of the whole object.
 * 					If this is not specified the form value will be completely replaced with 'newValue'.
 *
 * 				updateHost [Boolean] <true>
 * 					If true it updates the host if there is a host (as it should).
 * 					If false it ignores the host and simply applies the value to the actual input-field itself.
 */
function inputfield_applyNewValue (containerElem, newValue, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_applyNewValue() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//get the field object
	const fieldObj = inputfield_fields.get(containerElem);

	//complain and return if the field object couldn't be found
	if (fieldObj === undefined) {
		console.warn('[MPO] inputfield_applyNewValue() could not get the \'fieldObj\'.');
		return;
	}

	//get the host object
		//will be undefined if it doesn't exist
	const hostObj = inputfield_hosts.get(fieldObj.belongsToHost);

	//set the new value
		//check if 'formProperty' is defined, if yes then only set the property
	if (specifics.formProperty !== undefined) {
		fieldObj.value[specifics.formProperty] = newValue;

		//also set the 'propertyChanged' property
		fieldObj['propertyChanged'] = specifics.formProperty;
	} else {
		fieldObj.value = newValue;
	}

	//if this is a radio field then loop through all actual input elements to mark the correct ones as selected
	if (fieldObj.fieldType === 'radio') {

		//get the list of <input> elements (or an alternative to them)...
		const actualElemList = inputfield_getActualInputElements(containerElem);

		//...and loop through them
		for (const item of actualElemList) {

			//if this element holds the same value as the new one then mark it as selected
			if (item.getAttribute('data-holdsvalue') === newValue) {
				item.classList.add('inputfield_selected');

			//if not then make sure it's not marked as selected
			} else {
				item.classList.remove('inputfield_selected');
			}
		}
	}

	//update all other fields that belong to the host
		//but only if the host should be updated
		//and only if a host even exists
	if (specifics.updateHost !== false && hostObj !== undefined) {
		inputfield_updateHostsChildren(fieldObj.belongsToHost, newValue);
	}

	//execute the 'onchange' function (unless it should be skipped)
	if (specifics.skipOnchange !== true) {

		//get the 'onchange' function
			//if a host is used then get the 'onchange' function from that
		const onchangeFunction = (fieldObj.belongsToHost !== false) ? inputfield_hosts.get(fieldObj.belongsToHost).onchange : inputfield_fields.get(containerElem).onchange;

		//execute the 'onchange' function
			//use 'setTimeout()' with a delay of 0 so it gets it's own call-stack (it basically tells the browser "Hey, execute this bit as soon as everything else is done!")
		if (typeof onchangeFunction === 'function') {
			setTimeout(() => {onchangeFunction(fieldObj.value, fieldObj);}, 0);
		}
	}

	//get the 'belongsToForm' property
		//try to get it from the host if possible
	const belongsToForm = (hostObj !== undefined) ? hostObj.belongsToForm : fieldObj.belongsToForm;

	//apply the new value to all forms (if it even belongs to a form)
		//note that this HAS to be done after the 'onchange' bit because the 'onchange' function for the individual field should be executed before the 'onchange' function of the form
	if (belongsToForm.length > 0) {

		//get the tag that should be used inside the form (if host is present then take it from there)
		const formTag = (hostObj !== undefined) ? hostObj.tag : fieldObj.tag;

		//call 'inputfield_applyNewValue()' for each form
			//note that this HAS to use 'fieldObj.value' instead of 'newValue' so it takes the actual value itself
			//if this belongs to a form that also belongs to a form then the second form has to take the value of the first form, that's why we use 'fieldObj.value' for this
		for (const item of belongsToForm) {
			inputfield_applyNewValue(item, fieldObj.value, {skipOnchange: specifics.skipOnchange, formProperty: formTag});
		}
	}
}

/**	Gets executed when a label is clicked on.
 *
 * 	Args:
 * 		labelElem [DOM Element]
 * 			The DOM element of the label that got clicked on.
 */
function inputfield_executedAfterLabelPress (labelElem) {
	//complain and return if 'labelElem' isn't a DOM element
	if (Object.isDOMElement(labelElem) !== true) {
		console.warn(`[MPO] inputfield_executedAfterLabelPress() received a non-element as 'labelElem': "${labelElem}".`);
		return;
	}

	//get the 'LabelObject'
		//IMPORTANT: This may not exist! Label objects are optional!
	const labelObj = inputfield_labels.get(labelElem);

	//get the input-field it's linked to
	const fieldElem = inputfield_getElement(labelElem.getAttribute('data-labelforfieldid'));

	//get the field object
	const fieldObj = inputfield_fields.get(fieldElem);

	//return and complain if the field couldn't be found
	if (typeof fieldObj !== 'object') {
		console.warn(`[MPO] inputfield_executedAfterLabelPress() couldn't find the input-field "${labelElem.getAttribute('data-labelforfieldid')}" while processing a label event.`);
		return;
	}

	//get the field-type
	const fieldType = fieldObj.fieldType;

	//get the action
		//if no 'LabelObject' exists then use the default action
	const action = labelObj?.action ?? 'click';

	//get the list of actual input elements
	const actualElemList = inputfield_getActualInputElements(fieldElem);

	//the first actual input element
	const actualElem = actualElemList[0];

	//complain and return if the actual element couldn't be found
	if (Object.isDOMElement(actualElem) !== true) {
		console.warn(`[MPO] inputfield_executedAfterLabelPress() couldn't find the actual input element for input-field "${fieldObj.id}".`);
		return;
	}

	//do different things if it's a radio field AND 'radioOption' has been used
		//if those are true then the label affects a specific radio option, not the radio field as a whole
	if (fieldType === 'radio' && labelObj !== undefined && labelObj.radioOption !== null) {

		//this is used to check whether the element was actually found or not
		let foundElem = false;

		//...and loop through them
		for (const item of actualElemList) {

			//check whether this is the correct element
			if (item.getAttribute('data-holdsvalue') === labelObj.radioOption) {

				//the element was found! Hooray!
				foundElem = true;

				switch (action) {

					//simulate a click
					case 'click':
						item.click();
						break;

					//focus the item
					case 'focus':
						item.focus();
						break;

					//copy the value
					case 'copy':
						navigator.clipboard.writeText(labelObj.radioOption);
						break;

					//do nothing
					case 'setToValue':
						break;

					//complain and return if 'action' isn't valid
					default:
						console.warn(`[MPO] inputfield_executedAfterLabelPress() couldn't find the action ("${action}") for the label that's linked to the input-field: "${fieldElem.getAttribute('data-fieldid')}".`);
						return;
				}
			}
		}

		//complain if the element couldn't be found
		if (foundElem !== true) {
			console.warn(`[MPO] inputfield_executedAfterLabelPress() couldn't find the radio option "${specifics.radioOption}" for input-field "${fieldObj.id}".`);
		}

	//if not then the label affects the input-field as a whole
	} else {
		switch (action) {

			//simulate the click
			case 'click':
				actualElem.click();
				break;

			//focus the element
			case 'focus':
				actualElem.focus();
				break;

			//copy the value
				//the value will automatically be converted to a string
			case 'copy':
				navigator.clipboard.writeText(fieldObj.value);
				break;

			//set the value
			case 'setToValue':
				//get the new value from the 'LabelObject'
					//which has to exist since 'setToValue' couldn't be selected otherwise
				inputfield_setValue(fieldElem, labelObj.value);
				break;

			//complain and return if 'action' isn't valid
			default:
				console.warn(`[MPO] inputfield_executedAfterLabelPress() couldn't find the action ("${action}") for the label that's linked to the input-field: "${fieldElem.getAttribute('data-fieldid')}".`);
				return;
		}
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
	//get the host object
	const hostObj = inputfield_hosts.get(hostElem);

	//apply the new value
	hostObj.value = newValue;

	//return if the host object doesn't exist
	if (hostObj === undefined) {
		console.warn('[MPO] inputfield_updateHostsChildren() could not find the host entry inside the WeakMap.');
		return;
	}

	//get the list of children (array consisting of DOM Elements)
	const childList = hostObj.childList;

	for (const item of childList) {
		//get the field object
		const fieldObj = inputfield_fields.get(item);

		switch (fieldObj.fieldType) {
			case 'checkbox':
				//if the checkbox has the same value then check it
					//use 'skipOnchange' on both because the 'onchange' function of the individual input-fields shouldn't be activated
				if (fieldObj.attributes.checkboxValue === newValue) {
					inputfield_setValue(item, newValue, {skipOnchange: true, updateHost: false});

				//uncheck it otherwise
				} else {
					inputfield_setValue(item, false, {skipOnchange: true, updateHost: false});
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
		case 'form':
			return 'regular';

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
 * 		fieldID [String/DOM Element]
 * 			The field ID of the input-field.
 * 			It can also be a DOM element in which case it will simply return that.
 *
 * 		specifics [Object] <optional>
 * 			A object of optional specifics about how the input-field should be gotten.
 *
 * 			DOMTree [DOM Tree] <document>
 * 				Which DOM tree it should look for the input-field.
 * 				Chances are this is simply 'document', but it can also be a 'DocumentFragment' in which case that should be passed as a whole.
 *
 * 			referenceElem [DOM Element] <optional>
 * 				A optional reference element that can be used to speed-up the process of getting the element.
 * 				If a reference element is used then this function will simply go up the DOM tree and check if the input-field can be found.
 * 				Note that if the input-field can't be found with this reference element then it will simply fall back to the normal function.
 * 				This also double-checks to make sure that 'referenceElem' is an actual DOM element, so you can pass a string or anything and it will simply be ignored without breaking.
 *
 * 	Returns [DOM Element/Boolean]:
 * 		The DOM Element of the input-field if found.
 * 		Returns false if no field can be found.
 */
function inputfield_getElement (fieldID, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_getElement() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//check if 'fieldID' is a DOM element, if yes then return that.
	if (typeof fieldID === 'object' && fieldID.isDOMElement()) {
		return fieldID;

	//if a field ID has been specified, and if yes, find the input-field with that
	} else if (typeof fieldID === 'string') {

		if (Object.isDOMElement(specifics.referenceElem) === true) {
			let elem = specifics.referenceElem;
			while (true) {
				//check if it's the one
					//check if 'data-fieldid' is correct and if it includes the 'inputfield_container' class
				if (elem.getAttribute('data-fieldid') === fieldID && elem.classList.contains('inputfield_container')) {
					return elem;
				}

				//if it wasn't the one then set 'elem' to the parent node and continue with the loop
				elem = elem.parentNode;

				//if the element is no longer a DOM Element then break the loop
					//you could also simply check if it's <body> or <html> but then you'd need to make sure you don't do this for DocumentFragments -- all in all, I think simply doing this check is faster/better
				if (Object.isDOMElement(elem) !== true) {
					break;
				}
			}
		}

		//if the specified DOM Tree doesn't have the 'querySelector' function then use 'document' as the DOM tree
			//this will also trigger if no DOM tree has been specified
		if (typeof specifics.DOMTree?.querySelector !== 'function') {
			//complain if a DOM tree was specifed
			if (specifics.DOMTree !== undefined) {
				console.warn(`[MPO] The 'DOMTree' argument in 'inputfield_getElement()' is invalid. fieldID used: "${fieldID}" - DOMTree: "${specifics.DOMTree}"`);
			}

			//actually use 'document' now
			specifics.DOMTree = document;
		}

		//get the container element
		const containerElem = specifics.DOMTree.querySelector(`.inputfield_container[data-fieldid="${fieldID}"]`);

		//return the element if it exists, otherwise return false
		return containerElem ?? false;
	}

	//return false if 'fieldID' a different type
	return false;
}

/**	Gets the actual DOM elements of the <input> element. NOT the input-field container.
 *
 * 	Args:
 * 		field [DOM Element/String]
 * 			The input-field. Can be the DOM element itself or it's input-field ID.
 *
 * 		DOMTree [DOM Tree] <document>
 * 			Which DOM tree it should look for the input-field.
 * 			Chances are this is simply 'document', but it can also be a 'DocumentFragment' in which case that should be passed as a whole.
 *
 * 	Returns [Array]:
 * 		An array consisting of DOM elements. May be an empty array if nothing was found.
 */
function inputfield_getActualInputElements (field, DOMTree=document) {
	//check if a DOM element was provided
	if (Object.isDOMElement(field) === true) {

		//save the element and get it's field ID
		const fieldElem = field;
		const fieldID = field.getAttribute('data-fieldid');

		//get the root node of the element (which is likely either `document`, a 'DocumentFragment' or a 'ShadowRoot' (don't ask me on the last one))
		const root = fieldElem.getRootNode();

		let results = [];

		//if a root was found with a '.querySelectorAll()' function then execute it
		if (typeof root.querySelectorAll === 'function') {
			results = root     .querySelectorAll(`.inputfield_actualInputElement[data-linktofieldid="${fieldID}"], .inputfield_actualInputElement[data-fieldid="${fieldID}"]`);

		//otherwise try again by calling '.querySelectorAll()' on the input-field container
		} else {
			results = fieldElem.querySelectorAll(`.inputfield_actualInputElement[data-linktofieldid="${fieldID}"], .inputfield_actualInputElement[data-fieldid="${fieldID}"]`);
		}

		//if something was found then return it
			//otherwise fall back to the regular function
		if (results.length >= 1) {
			return results;
		}

		//make sure to set 'field' to the input-field ID
		field = fieldID;
	}

	//complain and return if 'DOMTree' is invalid
	if (typeof DOMTree.querySelectorAll !== 'function') {
		console.warn(`[MPO] inputfield_getActualInputElements() received a invalid 'DOMTree' value: "${DOMTree}" (it's considered invalid as it doesn't have a '.querySelectorAll' function).`);
		return [];
	}

	//get and return the elements
	return DOMTree.querySelectorAll(`.inputfield_actualInputElement[data-linktofieldid="${field}"], .inputfield_actualInputElement[data-fieldid="${field}"]`);
}