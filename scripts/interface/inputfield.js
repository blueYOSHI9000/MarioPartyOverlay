// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/*	=== HOW INPUT-FIELDS WORK ===

	IMPORTANT: This "How input-fields work" section is quite outdated. It still works (probably) but it will only be updated once I'm done with all To-Do items on my list.


	Input-fields are a way to get user-input. Whether it's a button, a checkbox, a set of options to choose from or whatever.
	Basically a <input> element that looks better.

	You create a input-field with 'inputfield_createField()'.
	Said function then creates a <span> that contains the entire input-field. This <span> also has the 'inputfield_container' class and is called the "container".
	The container also stores the unique 'fieldID' inside it's 'data-fieldid' attribute.

	Input-fields entirely work through the container element and fieldIDs, if you want to do anything with a already-created input-field you need one of the two.

	In order to create a input-field you need to specify a type and variation (though variations are automatically set to a default if not specified).
	Types specify what kind of input the field should take. Each type has a different purpose.
	Variations on the other hand simply change the appearance of the input-field, they don't change the actual functionality. Any variation can be replaced with any other and it still works.
		(though variations are unique to each type)


	One important thing: The DOM elements that input-fields create should NOT be messed with. If any changes are made to the DOM element they might break. It's best to completely leave them alone.
	It should also be mentioned that input-fields rarely report errors, chances are they silently break with no one realizing.


	=== INPUT FIELD TYPES & VARIATIONS ===

	Each type is listed here and each type will list all variations it has (which can be specified with the 'variation' attribute).

	form
		This is a special type as it doesn't really create an actual input-field (aside from an empty '<span>'), instead it can be used to combine several input-fields into a single form.
		When creating a new form you can use it's ID to add other input-fields to it. To add a input-field to a form you can use the ID of the form inside the 'addToForm' attribute.
		The form will have an object as it's value containing an item for each input-field that's part of it.
		Each item has the 'tag' attribute as it's name that can be used to access the value inside the object.

		Variations:
			- regular <default>: A regular form.

	button
		A simple button. You press it, it does things.
		Does not store a value so it will simply return undefined. Will trigger the 'onchange' function specified in attributes when clicked on.
		Variations:
			- regular <default>: A regular button. Basically the same as '<button>'.
			- image: Creates a image that looks like a button. Not supported yet.

	checkbox
		A simple box that can be either checked or unchecked.
		Will store the values 'checked' and 'unchecked'.
		Varitions:
			- regular <default>: A regular simple checkbox.

	radio
		The user has to select one option of many. Multi-choice is not supported yet but will be.
		Will store one user-defined value which can be any string.
		Variations:
			- checkbox <default>: A set of checkboxes. Basically the same as '<input type="radio">'.
			- select: Opens a list of all options where the user can select one. Basically the same as '<select>'.
			- image: Creates a set of images that look like buttons and the user can select one of them.

	text
		A way to enter custom text.
		Will store whatever the user entered as it's value. Will always be a string.
		Variations:
			- small <default>: A small textfield intended for single-line values. Basically the same as '<input type="text">'.
			- area: A resizable text area intended for longer, multi-line values. Basically the same as '<textarea>'.

	number
		A way to enter any number (aside from Infinity and NaN). Can include negative values.
		Will store a number as a number. Note that it might be NaN if something broke.
		Variations:
			- text <default>: A text-field to enter a number manually with tiny buttons to increase/decrease. Does not allow text-input. Basically the same as '<input type="number">'
			- range: A slider that allows the user to select a number. Basically the same as '<input type="slider">'.
			- counter: A MPO-styled counter. Takes MPO's controls into account (+/- and how much). Not supported yet.

	color
		A way to select a custom color.
		Will store the selected color in hex form ('#ffffff' being white) as a string. [NOTE: currently, any form that's allowed by CSS is able to be stored in here -- this is subject to change]
		Variations:
			- regular <default>: A regular color selection. Basically the same as '<input type="color">'.

	file
		A way to upload a file. Not supported yet.
		How it's stored is still to be determined.
		Variations:
			- regular <default>: A regular file upload. Basically the same as '<input type="file">'.


	=== FIELD ATTRIBUTES ===

	Each input-field has a set of attributes that can be specified when creating it.
	Attributes can (currently) only be set when creating the input-field, they can not be changed afterwards.

	Note that some attributes are only available for some types.


	# general attributes (available for all types):

		variation [String] <default variation>
			What variation this should be. See the list above for more info.
			Will take the default variable of the 'fieldType' if not specified.
			If a invalid variation is given then this WILL break, it won't automatically go back to the default. This includes specifying a variation when no variations exist.

		id [String] <optional>
			The ID of the input-field. Can be used to access the input-field.
			The ID can't consist of only numbers (so '123' is not allowed but '123a' is allowed).
			The ID should be unique. If the same ID is used multiple times it may result in unexpected behaviour.
			On default this will be a unique ID which represents the total amount of input-fields made (so the default IDs would be '1' > '2' > '3' etc.).

			More on what happens if the same ID is used multiple times:
				Whenever an input-field is fetched by an ID, it will always only use the first input-field it finds with that ID. It won't even bother scanning for a second one.
				And which one is found first can be dependant on various factors, all of them are due to how 'inputfield_getElement()' works.
				The function won't be able to find a element inside a DocumentFragment or other places unless specifically specified.
				The function will also search for "related" elements first if a 'referenceElem' is given (see the documentation on the function).
				Both of these can affect which element is found first.
				This also isn't fixed in stone, this can change in any update (for better or worse). So it's recommended to avoid using the same ID multiple times as much as possible.

		defaultValue [*any*] <optional>
			This defines the value the input-field will have after it's been created.
			The default value will only be applied if it's actually valid.
			If no default value is specified (or if it's invalid) then it will use the following (depending on which type it is):
				form:     *N/A*
				checkbox: false
				radio:    *the first 'option'*
				text:     '' (a blank string)
				number:   0
				button:   *N/A*
				color:    '#000000'
				file:     *N/A*

		onchange [Function] <none>
			A function that gets executed each time the input-field is updated. Available for all input types.
			The first argument will be the current value of the input field.
			The second argument will be the field object inside 'inputfield_fields' (see the 'inputfield_FieldObject()' function for a documentation of this object).

		beforeText [String] <none>
			If present it will create a label before the input-field consisting of this text.
			Useful if you want a description before a checkbox.
			This won't be parsed as HTML, it will simply be inserted as-is.

		afterText [String] <none>
			Same as 'beforeText' except it will be created after the input-field.

		labels [Array/DOM Element] <optional>
			A DOM element (or an array of them) that should act as labels. Basically like a '<label>' element.

		cssClass [String/Array] <optional>
			Regular CSS classes that will be added to the container.

		HTMLAttributes [Object] <optional>
			A object of HTML attributes to add to the container. `{id: 'testo'}` would add 'testo' as the 'id' attribute.
			The following attributes will be ignored (mainly because they're needed internally/can be set through input-field attributes):
				'class', 'data-fieldid'


	# form related attributes (NOT just for 'form' types -- these are available to all types but are only needed when used inside a form):

		tag [String] <ID>
			A tag-name is used to access the value inside a form.
			It's suggested that a tag should be unique within a form, but it's not required.
			If not specified then it will use it's ID as the tag. Due to this, it should be avoided to create tags that are only a number and nothing else.

			If multiple input-fields have the same tag then when a input-field is updated it will simply overwrite the value that's already there.
			This essentially allows you to have a form value that's simply the value of the most recently updated input-field.

		addToForm [Array/DOM Element/String] <none>
			The form element it should be added to. Can be either the DOM element of the form or it's ID (can be in string-form, so 6 and '6' are both fine).
				If you use DocumentFragments then don't use the field-ID if the input-field is inside a DocumentFragment as it won't be able to find it.
			Can also be an array consisting of multiple DOM elements/field-IDs.
			Leave empty if it should not be added to a form.

	# host related attributes (available only to 'checkbox' types for now):

		host [DOM Element] <none>
			Specifying a "host" element (can be any DOM element - even a input-field) allows you to connect several input-fields with each other.
			To connect input-fields you simply use the same host element when creating the input-field and they're automatically connected with each other.
			Once input-fields are connected there can only be one checkbox that's checked. Basically a 'radio' replacement.

			The 'onchange' attribute will only be set on the host element (which will be triggered when the value changes) and not on the individual checkboxes.
			Setting a 'onchange' attribute when one has already been set then it will replace the existing one.
			It is not possible to set a 'onchange' function on a individual checkbox without it applying to the host as a whole.

			If no 'tag' is provided then it will attempt to take the tag of the first child, if not possible it uses 'host' instead as a tag.

	# 'form' type attributes

		autoAddToForm [Boolean] <false>
			If true the input-field will check the DOM Tree and will automatically add any descendants to the form.
			Basically, if a input-field is a descendant of a form then it will automatically be added to the form.

			Do note: Any descendant will be added automatically to the form but they will NOT be removed if the element is no longer a descendant.


	# 'button' type attributes

		content [String] <empty>
			The text inside the button.
			This won't be parsed as HTML, it will simply be inserted as-is.


	# 'checkbox' type attributes:

		checkboxValue [*any*] <true>
			The value the checkbox has when it's checked. Can be anything except null or undefined.
			Note that the value for it being unchecked will always be false.


	# 'radio' type attributes:

		options [Array]
			A list of options for radio input fields.
			Available for all radio input fields [exact list to follow]. Will be ignored for all others.
			Each array item is a object consisting of the following:
				- name [String]
					The name of the option as it's displayed to the user.
					This is also needed for images as a alt-text.
				- value [String]
					The value of the option, will be returned to the 'onchange' function.
				- src [String]
					The source of the image. Only needed if the 'fieldType' is 'radio-image'.

	=== USING LABELS ===
		Input-fields also have their own <label> alternative that's called... labels. I may like to over-complicate things but not even I would call them something else.

		There's multiple ways to create a label or convert an existing element to a label (any element can be a label):

			- Add a 'inputfield_label' class and a 'data-labelforfieldid' attribute that saves the unique input-field ID.

			- Include the element in the 'labels' attribute when creating a input-field.

			- Call 'inputfield_convertToLabel()'. This way you get more options and more control. See the documentation on the function for more info.
				> You can also call '.inputfield_convertToLabel()' on a DOM element directly (again, see function for more info).

	=== CREATING CUSTOM VARIATIONS ===
		A better way to do this will be added later (and with that a better tutorial).
		For now, view the documentation on the 'inputfield_variations' variable further down.



	=== IMPORTANT FUNCTIONS ===

	inputfield_createField()
		Creates a new input-field.

	inputfield_getValue()
		Gets the value of a input-field.

	inputfield_setValue()
		Sets the input-field to a new value.

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

//this saves each variation that exists
	//use the '.get()' function inside to get the "variation object" that's needed

	//if a new variation should be added then only this variable has to be edited, nothing else
	//this is a "variation object" (found inside 'inputfield_variations.variations[type]'):
	/*
			regular: {
				/**	This creates the HTML elements for the input-field to work.
				 *
				 * 	Note that the HTML elements created should also automatically call 'inputfield_executedAfterFieldChange(fieldID, newValue);' ('fieldID' being a string and 'newValue' depends on the field-type -- note that some values might need to be converted first).
				 *
				 * 	Args:
				 * 		container [DOM Element]
				 * 			The container of the input-field. Always a empty <span> element.
				 * 			The input-field should be created inside this.
				 *
				 * 		fieldObj [Object]
				 * 			The 'inputfield_FieldObject()' object.
				 *
				 * 		fieldID [String]
				 * 			The unique ID of the input-field.
				 *
				 * 		attributes [Object]
				 * 			All attributes of this input-field.
				 * /
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a checkbox <input> element
					cElem('input', container, {type: 'checkbox', onchange: `inputfield_executedAfterFieldChange('${fieldID}', this.checked);`});
				},
				/**	This gets the actual input element itself.
				 *
				 * 	Args:
				 * 		container [DOM Element]
				 * 			The container of the input-field. Always a empty <span> element.
				 * 			The input-field should be created inside this.
				 *
				 * 	Returns [DOM Element]:
				 * 		Returns the actual input element itself. This is likely the <input> element or an alternative to it.
				 * 		This is needed so '.click()' or '.focus()' can be executed on it.
				 * /
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				/**	This sets the value to the HTML elements.
				 *
				 * 	This is called whenever the value changes (both when the user changes it and when 'inputfield_setValue()' is called on it).
				 * 	This function has to make sure that the visuals represent the new value.
				 * 	A checkbox for example would have to make sure that the checkbox actually has a check inside it when the value is `true`.
				 *
				 * 	Args:
				 * 		container [DOM Element]
				 * 			The container of the input-field. Always a empty <span> element.
				 * 			The input-field should be created inside this.
				 *
				 * 		fieldObj [Object]
				 * 			The 'inputfield_FieldObject()' object.
				 *
				 * 		newValue [*any*]
				 * 			The new value. This value is already verified, so no need to make sure it's a boolean/number/whatever.
				 * 			Will always be a boolean for checkboxes, even if 'checkboxValue' is used.
				 * /
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).checked = newValue;

					return true;
				}
			}
	*/
var inputfield_variations = {
	/**	Gets the object for a specific variation.
	 *
	 * 	Args:
	 * 		fieldTypeAndVariation [String]
	 * 			'fieldType' and it's 'variation' in the form of 'checkbox-regular'.
	 *
	 * 	Returns [Object/null]:
	 * 		The object that's found inside 'inputfield_variations.variations[type][variation]'.
	 * 		Or `null` if it couldn't be found.
	 */
	get: function (path) {
		//split the path once so it's a two-item array
			//'checkbox-regular-test' will be split into this: `['checkbox', 'regular-test']`
		path = path.splitOnce('-');

		//complain and return if it couldn't find an entry for the field-type
		if (typeof this.variations[path[0]] !== 'object') {
			console.error(`[MPO] inputfield_variations.get() received a invalid 'path': "${path.join('-')}" (could not find a field-type for "${path[0]}").`);
			return null;
		}

		//complain and use the default if a variation couldn't be found
		if (typeof this.variations[path[0]][path[1]] !== 'object') {
			console.warn(`[MPO] inputfield_variations.get() couldn't find the variation "${path[1]}" for type "${path[0]}", falling back to the default variation.`);

			//get the default for this field-type
			path[1] = inputfield_getDefaultVariation(path[0]);
		}

		//return the object
		return this.variations[path[0]][path[1]];
	},
	variations: {
		form: {
			regular: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//forms only create a simple <span> element (the container) and nothing more
					return;
				},
				getActualInputElement: function (container) {
					//return the container since that's the whole input-field
					return container;
				},
				setRawValue: function (container, fieldObj, newValue) {
					//return true as there's no value to be applied here, so it's always successful
					return true;
				}
			}
		},
		button: {
			regular: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a button <input> element
					var button = cElem('input', container, {type: 'button', autocomplete: 'off', onclick: `inputfield_executedAfterFieldChange('${fieldID}');`});

					//add text to the button (if needed)
					if (attributes.content !== undefined) {
						button.setAttribute('value', attributes.content);
					}
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//return true as there's no value to be applied here, so it's always successful
					return true;
				}
			}
		},
		checkbox: {
			regular: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a checkbox <input> element
					cElem('input', container, {type: 'checkbox', autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', this.checked);`});
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).checked = newValue;

					return true;
				}
			}
		},
		radio: {
			checkbox: {
				constructor: function (container, fieldObj, fieldID, attributes) {
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
						cElem('input', container, {type: 'radio', autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', '${item.value}');`, 'data-holdsvalue': item.value});

						//create another label
						cElem('span', container)
							.inputfield_convertToLabel(container, {radioOption: item.value})
							.textContent = '|';
					}
				},
				getActualInputElement: function (container) {
					//this returns all children of the container that are an <input> element
					return container.querySelectorAll('input');
				},
				setRawValue: function (container, fieldObj, newValue) {
					//get the actual input elements
					const actualElems = this.getActualInputElement(container);

					//loop through them
					for (const item of actualElems) {

						//if it's value is the same as 'newValue' then check it
						if (item.getAttribute('data-holdsvalue') === newValue) {
							item.checked = true;

						//and if not then uncheck it
						} else {
							item.checked = false;
						}
					}

					return true;
				}
			},
			select: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create the <select> element
					let selectElem = cElem('select', container, {autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', this.value);`});

					//create a <option> inside the <select> for each option
					for (const item of attributes.options) {
						cElem('option', selectElem, {value: item.value}).textContent = item.name;
					}
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).value = newValue;

					return true;
				}
			},
			image: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a <img> for each option
					for (const item of attributes.options) {
						cElem('img', container, {class: 'inputfield_imgButton', autocomplete: 'off', onclick: `inputfield_executedAfterFieldChange('${fieldID}', '${item.value}')`, src: item.src, 'data-holdsvalue': item.value});
					}
				},
				getActualInputElement: function (container) {
					//this returns all children of the container since there's no other elements inside it
					return container.children;
				},
				setRawValue: function (container, fieldObj, newValue) {
					//get the actual input elements
					const actualElems = this.getActualInputElement(container);

					//loop through them
					for (const item of actualElems) {

						//if it's value is the same as 'newValue' then give it the 'inputfield_selected' class
						if (item.getAttribute('data-holdsvalue') === newValue) {
							item.classList.add('inputfield_selected');

						//and if not then remove the 'inputfield_selected' class
						} else {
							item.classList.remove('inputfield_selected');
						}
					}

					return true;
				}
			},
		},
		text: {
			small: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a text <input> element
					cElem('input', container, {type: 'text', autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', this.value);`});
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).value = newValue;

					return true;
				}
			},
			area: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a text <textarea> element
					cElem('textarea', container, {autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', this.value);`});
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).value = newValue;

					return true;
				}
			}
		},
		number: {
			text: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a number <input> element
					cElem('input', container, {type: 'number', autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', Number(this.value));`});
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).value = newValue;

					return true;
				}
			},
			range: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a range <input> element
					cElem('input', container, {type: 'range', autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', Number(this.value));`});
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).value = newValue;

					return true;
				}
			}
		},
		color: {
			regular: {
				constructor: function (container, fieldObj, fieldID, attributes) {
					//create a color <input> element
					cElem('input', container, {type: 'color', autocomplete: 'off', onchange: `inputfield_executedAfterFieldChange('${fieldID}', this.value);`});
				},
				getActualInputElement: function (container) {
					//return the first child of the container
					return container.children[0];
				},
				setRawValue: function (container, fieldObj, newValue) {
					//apply the value directly to the actual input element
					this.getActualInputElement(container).value = newValue;

					return true;
				}
			}
		},
		file: {}
	}
};

//THE <input-field> ELEMENT

/**	Creates a input-field.
 *
 * 	A newly created <input-field> will always be empty at first (like a <span>).
 * 	In order to use it you have to set it up first.
 * 	The best way is to call '.setup()' on it (it's a function that each <input-field> element has -- see 'inputfield_setupField()' for documentation).
 * 	Alternatively you can also simply add a 'type' and a 'variation' attribute to it.
 *
 * 	<input-field> elements will automatically attempt to setup themselves either once code is done being executed (using a 'setTimeout()' of 0ms) or once it gets accessed (like by using 'inputfield_getValue()').
 * 	If by that point '.setup()' hasn't been called and no 'type' HTML attribute is present then the site might break.
 */
class InputFieldElement extends HTMLElement {
	constructor() {
		super();

		//attach a shadow-root
			//this has been commented out as it breaks input-fields
			//using this creates the issue of there being a "barrier" between the outside and inside of input-fields
			//<input-fields> can't access the inside using '.children' and elements inside can't access the outside using '.parentNode'
			//input-fields weren't created with this limitation in mind so it causes some issues
			//might be fixed at some point but at this point... is it really worth it?
			//the only real upside for Shadow-Roots is it being more idiot-proof when other people use it but that's not that big of an issue when it's created with only MPO in mind
			//also, worth noting that <input-field> elements can change when attributes get updated so a closed shadow-root wouldn't really work either without some work
		//const shadow = this.attachShadow({mode: 'open'});

		//create a FieldObject and add it to 'inputfield_fields'
		inputfield_fields.set(this, new inputfield_FieldObject({setup: false}));

		//add the '.setup()' function
		this.setup = inputfield_setupField;

		//setup the element automatically with a 0ms timeout
			//this is done for two primary reasons:
			// - it's easier to make a primitive prototype (simply create a <input-field> element with a 'type' attribute - without calling '.setup()' or anything)
			// - avoids an empty element being displayed before being replaced by the actual input-field which a end-user could notice
			//of course, there's an argument to be made for "trust the coder" but I'd say the chances that a coder doesn't want this are slim without there being other ways around this
			//(for example, you could use a empty <span> element and use '.replaceWith()' to replace it with a finished <input-field> if you don't want '.setup()' to be called on it)
		setTimeout(() => {this.setup()}, 0);
	}
}

customElements.define('input-field', InputFieldElement);

/**	Creates and sets up the 'FieldObject' that saves all info related to the input-field.
 *
 * 	NOTE: To create a input-field, use 'inputfield_createField()' instead of this!
 *
 * 	This generates the unique ID and immediately applies it to the constructed object and to the linked DOM element.
 * 	This verifies and updates all attributes to be correct.
 * 	This sets up the host if needed.
 * 	This updates the host and all forms if needed.
 *
 * 	This will also execute the attributes immediately if necessary (for example, if a 'host' is specified then it will immediately be added to the host) with the following exceptions:
 * 		- 'content'
 * 	These exceptions will all be executed in 'inputfield_createField()'. They are still verified within this function though.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				elem [DOM Element]
 * 					The input-field element.
 *
 * 				fieldType [String]
 * 					The type of the field.
 * 					This can also include the variation by seperating the two with a - (so 'radio-checkbox' would give a inputType of 'radio' with a variation of 'checkbox').
 *
 * 				attributes [Object]
 * 					A list of all attributes of the field.
 *
 * 				setup [Boolean] <true>
 * 					Whether the element has been setup already. Defaults to `true`.
 * 					If this is `false` then no other variables have to be provided.
 * 					Note that by using `false` here it means the function will return immediately without doing anything (this includes not generating a unique ID!).
 *
 * 	Constructs:
 * 		setup [Boolean]
 * 			Whether the field has been setup or not.
 * 			If this is `false` then the HTML element hasn't been built yet which means the field can't be used yet.
 *
 * 			IMPORTANT: IF THIS IS `false` THEN NO OTHER PROPERTIES WILL BE FOUND INSIDE THIS OBJECT!
 * 			Do note that by using 'inputfield_getFieldObject()' it will automatically setup the field so by using that function this will never be `false`.
 *
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
 * 			This isn't 1:1 the attributes that were given, these were verified and updated by this function.
 * 			Any attributes that were incorrect have been set to their defaults (likely `undefined`).
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



	//if the field isn't setup yet then set mark it as such and return immediately
	if (specifics.setup === false) {
		this.setup = false;
		return;
	}



	//complain and return if 'elem' isn't a DOM element
	if (Object.isDOMElement(specifics.elem) !== true) {
		console.error(`[MPO] inputfield_FieldObject() received a non-element as 'elem': "${specifics.elem}".`);
		return;
	}

	//replace 'attributes' with a empty object if it isn't already an object
	if (typeof specifics.attributes !== 'object') {
		specifics.attributes = {};
	}

	//for quick access
	let attributes = specifics.attributes;



	// === GET AND SET THE ID ===

	//increase the total of input-fields made (needed for unique IDs)
	inputfield_totalFieldsCreated++;

	//set ID
		//this checks if a custom ID was specified (and if yes, apply that)
			//this check works by making sure it's a string and then making sure that it's not just consisting of digits
			//so '0128' would return true -- '1ab037' would return false -- '12 ' would return false (due to the white-space)
			//arguably stuff like white-space should be removed first but I feel like we can trust the coder here
			//if someone puts white-space in a ID then either they know what they're doing or they'll find another 100 ways to break this
	if (typeof attributes.id === 'string' && /^\d+$/.test(attributes.id) !== true) {
		this.id = attributes.id;
	} else {
		this.id = String(inputfield_totalFieldsCreated);
	}



	// === VERIFY TYPE AND VARIATION ===

	//complain and return if no 'fieldType' was specified
	if (typeof specifics.fieldType !== 'string') {
		console.error(`[MPO] inputfield_FieldObject() received a non-string for 'fieldType': "${specifics.fieldType}".`);
		return;
	}

	//check if 'fieldType' has the variation included (would be 'checkbox-regular' for example).
	if (specifics.fieldType.indexOf('-') !== -1) {

		//actually split it
		const fieldTypeSplit = specifics.fieldType.splitOnce('-');

		//if no variation was specified in 'attributes' then apply this one
		if (typeof attributes.variation !== 'string') {
			attributes.variation = fieldTypeSplit[1];

		//complain if a variation was specified in 'attributes' because now we have two variations (the 'attributes' one takes priority)
			//the 'attributes' one takes priority because I'd say that one has a higher chance of being entered on purpose
		} else {
			console.warn(`[MPO] inputfield_FieldObject() received two variations. One in 'attributes.variation' ("${attributes.variation}" - this one will be used), the other one as 'fieldType': "${specifics.fieldType}" ("${fieldTypeSplit[1]}" being the variation). Do note that 'fieldType' accepts variations when including a dash (-) in them, so 'checkbox-regular' would be type 'checkbox' and variation 'regular'.`);
		}

		//apply the new type
		specifics.fieldType = fieldTypeSplit[0];
	}

	//complain and return if the fieldType is invalid
	if (typeof inputfield_variations.variations[specifics.fieldType] !== 'object') {
		console.error(`[MPO] inputfield_FieldObject() received a invalid 'fieldType': "${specifics.fieldType}". Note that this type might've been split ('checkbox-regular' would be split to 'checkbox').`);
		return;
	}

	//get default variation if no variation has been specified
	attributes.variation ??= inputfield_getDefaultVariation(specifics.fieldType);



	// === ADD HTML ATTRIBUTES TO THE <input-field> ELEMENT

	//add 'type' and 'variation'
	specifics.elem.setAttribute('type', specifics.fieldType);
	specifics.elem.setAttribute('variation', attributes.variation);

	//add the ID to the element
	specifics.elem.setAttribute('data-fieldid', this.id);



	// === MODIFYING ATTRIBUTES ===
		//note that the following is more or less in order as the attributes are listed in the documentation
		//I say "more or less" because some attributes rely on another attribute already being verified
		//so it's not possible to have them completely in order


	// # 'variation'
		//verified at the start of this function


	// # 'id'
		//verified at the start of this function


	// # 'checkboxValue'

	//set 'checkboxValue' to true if it hasn't been specified
		//this has to be done before calling 'inputfield_getDefaultValue()' (done below for 'defaultValue') since that would think a value of `undefined` is valid (when it isn't)
	attributes.checkboxValue ??= true;


	// # 'beforeText'

	//if 'beforeText' is neither a string nor undefined then complain and set it to undefined
		//this attribute has to be a string but undefined is valid too (as undefined == "don't use this")
	if (typeof attributes.beforeText !== 'string' && attributes.beforeText !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'beforeText': "${attributes.beforeText}".`);
		attributes.beforeText = undefined;
	}

	//create the 'beforeText' element
	if (typeof attributes.beforeText === 'string') {
		//create the element...
		let beforeTextNode = cElem('span', specifics.elem.parentNode);

		//...and insert it before the input-field
			//note that '.insertBefore()' needs to be called on the parent that contains both element
			//(at least I think you have to do it that way, this function is honestly a complete mess -- that or I'm stupid)
		specifics.elem.parentNode.insertBefore(beforeTextNode, specifics.elem);

		//add the correct text
			//note that this will not parse HTML (which is intended)
		beforeTextNode.textContent = attributes.beforeText;

		//make it a label
		beforeTextNode.classList.add('inputfield_label');
		beforeTextNode.setAttribute('data-labelforfieldid', this.id);
	}


	// # 'afterText'

	//if 'afterText' is neither a string nor undefined then complain and set it to undefined
		//this attribute has to be a string but undefined is valid too (as undefined == "don't use this")
	if (typeof attributes.afterText !== 'string' && attributes.afterText !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'afterText': "${attributes.afterText}".`);
		attributes.afterText = undefined;
	}

	//create the 'afterText' element
	if (typeof attributes.afterText === 'string') {
		//create the element...
		let afterTextNode = cElem('span', specifics.elem.parentNode);

		//...and insert it after the input-field
		specifics.elem.parentNode.insertBefore(afterTextNode, specifics.elem.nextSibling);
			//ok, let's explain this absolute nut-case of a mess (shoutouts to JS for sucking massive dick and shoutouts to StackOverflow for not sucking as much dick)
			//from what I can gather there's no 'insertAfter()' function or something. So, what do we have to do?
			//well, obviously we have to fetch the next element and then append it before that. Obviously. Why would there be a easier way?

			//ok, actual explanation here:
			//we fetch the parent that contains all of this via 'specifics.elem.parentNode' (which is likely a Document-Fragment)
			//then we call '.insertBefore()' on it ('.insertBefore()' needs to be called on a parent that contains both element -- at least I think it does, fuck knows what it needs)
			//then we specifify out text-node that we want to move
			//and finally we fetch the next sibling of the input-field ('specifics.elem'), this is basically the element that comes after the input-field
			//and that's how we insert our text-node after the input-field -- by inserting it before the element that comes after the input-field

			//now, what if there is no element after the input-field?
			//'specifics.elem.nextSibling' would return `null` in that case
			//but '.insertBefore()' inserts an element at the end of the list if you give it `null`

			//almost like they realized that people would have to do things this way, but why add a dedicated '.insertAfter()' function when you can simply expect people to use this?

		//add the correct text
			//note that this will not parse HTML (which is intended)
		afterTextNode.textContent = attributes.afterText;

		//make it a label
		afterTextNode.classList.add('inputfield_label');
		afterTextNode.setAttribute('data-labelforfieldid', this.id);
	}


	// # 'labels'

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
	});


	// # 'cssClass'

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


	// # 'HTMLAttributes'

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


	// # 'autoAddToForm'

	//check if 'autoAddToForm' is true
	if (attributes.autoAddToForm === true) {

		//check if it's a form, if yes then add this field to the observer
		if (specifics.fieldType === 'form') {
			inputfield_observer.observe(specifics.elem, {subtree: true, childList: true});

		//if it's not a form then complain about it and do nothing else
		} else {
			console.warn(`[MPO] inputfield_FieldObject() received \`true\` for 'autoAddToForm' despite the input-field not being a form. ID: "${this.id}"`);
		}
	}


	// # 'addToForm'

	//if 'addToForm' is nullish (null / undefined) then make it an array
	attributes.addToForm ??= [];

	//if 'addToForm' is not an array then add it inside an array
	if (Array.isArray(attributes.addToForm) !== true) {
		attributes.addToForm = [attributes.addToForm];
	}

	//loop through the array and add the input-field to all specified forms while removing any array entry that's not valid
		//'.removeEachIf()' loops through all array items in reverse and when returning `true` it removes said array item
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


	// # 'host'

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


	// # 'addToForm' ...again

	//add this input-field to all forms it should be added to
	if (Array.isArray(attributes.addToForm) === true) {
		for (const item of attributes.addToForm) {
			const formChildren = inputfield_getFieldObject(item)?.formChildren;

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


	// # 'tag'

	//get default tag if no tag has been specified
		//note that this has to be done after the host stuff because that part checks whether a 'tag' has been specified (and replaces the hosts tag with it if necessary)
	attributes.tag ??= String(this.id);


	// # 'onchange'

	//set the 'onchange' to a empty function if nothing is specified
		//note that this has to be done after the host stuff because that part checks whether a 'tag' has been specified (and replaces the hosts tag with it if necessary)
	attributes.onchange = (typeof attributes.onchange !== 'function' || attributes.host !== undefined) ? (() => {return;}) : attributes.onchange;


	// # 'content'

	//if 'content' is neither a string nor undefined then complain and set it to undefined
		//this attribute has to be a string but undefined is valid too (as undefined == "don't use this")
	if (typeof attributes.content !== 'string' && attributes.content !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'content': "${attributes.content}".`);
		attributes.content = undefined;
	}


	// # 'options'

	//set 'options' to an empty array if it's undefined
	attributes.options ??= [];

	//if 'options' isn't an array then complain about it and set it to an empty array
	if (Array.isArray(attributes.options) !== true) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-array as 'options': "${attributes.options}".`);
		attributes.options = [];
	}

	//loop through all options to make sure they're all valid
	for (const key in attributes.options) {
		const item = attributes.options[key];

		//delete the array item if it's not an object
		if (typeof item !== 'object') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't parse the 'options' array as item Nr. ${key} wasn't a object: "${item}".`);
			delete attributes.options[key];
			continue;
		}

		//set 'name' to 'Unknown' if it's not valid
		if (typeof item.name !== 'string') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't properly parse the 'options' array as item Nr. ${key} had a non-string as 'name': "${item.name}".`);
			item.name = 'Unknown';
		}

		//set 'src' to undefined if it's neither a string nor undefined
		if (attributes.src !== undefined && typeof attributes.src !== 'string') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't properly parse the 'options' array as item Nr. ${key} had neither a string nor undefined as 'src': "${item.src}".`);
			item.src = undefined;
		}

		//delete the array item if 'value' isn't valid
			//do this one last so all other warnings are also immediately printed
		if (typeof item.value !== 'string') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't parse the 'options' array as item Nr. ${key} had a non-string as 'value': "${item.value}". Option will now be removed.`);
			delete attributes.options[key];
			continue;
		}
	}


	// # 'defaultValue'

	//check if 'defaultValue' is valid and if not, replace it with a default value
		//this has to be done after verifying 'options' as that attribute is needed in here
	if (inputfield_validateValue(attributes.defaultValue, {fieldType: specifics.fieldType, attributes: attributes}) !== true) {
		attributes.defaultValue = inputfield_getDefaultValue(specifics.fieldType, attributes);
	}



	// === SETTING THE ACTUAL PROPERTIES ===

	//if the function got this far then it has to be `true`
	this.setup = true;

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
		//if no tag in 'specific.tag' has been specified then use the tag of the first child and if that isn't present then use 'host'
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
 * 				field [DOM Element/String]
 * 					The input-field. Can be the DOM element itself or it's input-field ID.
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
	if (Object.isDOMElement(specifics.field) === true) {
		specifics.field = specifics.field.getAttribute('data-fieldid');
	}

	//complain and return if 'field' isn't a string
	if (typeof specifics.field !== 'string') {
		console.warn(`[MPO] inputfield_LabelObject() received a non-string as 'field': "${specifics.field}" (note that if a DOM element was given then this means it's 'data-fieldid' attribute was invalid).`);
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
	this.labelForFieldID = specifics.field;

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
	const container = cElem('input-field', docFrag, {
		class: 'inputfield_container'
	});

	container.setup({
		fieldType: fieldType,
		variation: attributes.variation,
		attributes
	});

	//container.classList.add('fieldType-' + fieldObj.fieldType);
	//container.classList.add('fieldVariation-' + fieldObj.variation);

	//append the document fragment to the actual parent
	parent.appendChild(docFrag);

	//return the input-field DOM element
	return container;
}

/** Sets a <input-field> element up. SHOULD ONLY BE CALLED VIA '<input-field>.setup()'.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				fieldType [String] <optional>
 * 					The field-type it should use.
 * 					Will use the 'type' attribute on the <input-field> element if not present.
 *
 * 				variation [String] <optional>
 * 					The variation fo the field.
 * 					Will use the 'variation' attribute on the <inpu-field> element if not present. If that isn't present either then the default variation will be used.
 *
 * 				attributes [Object] <defaults>
 * 					The input-field attributes.
 * 					Will use the default attributes if not present.
 *
 * 	Returns [DOM Element]:
 * 		The <input-field> element.
 * 		The element will be returned regardless of if it was setup succesfully or not (be sure to check the console for warnings).
 */
function inputfield_setupField (specifics={}) {
	//complain and return if it didn't get called on a DOM element
	if (Object.isDOMElement(this) !== true) {
		//use 'inputfield_setupField()' instead of '<input-field>.setup()' since this will likely only get triggered if called directly
		console.warn(`[MPO] inputfield_setupField() didn't get called on a DOM element.`);
		return this;
	}

	//complain and return if it didn't get called on a <input-field> element
	if (this.tagName !== 'INPUT-FIELD') {
		console.warn(`[MPO] <input-field>.setup() didn't get called on a <input-field> element.`);
		return this;
	}

	//complain and return if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] <input-field>.setup() received a non-object as 'specifics': "${specifics}".`);
		return this;
	}



	// === CHECK IF IT'S ALREADY BEEN SETUP ===
	let fieldObj = inputfield_getFieldObject(this, {skipSetupCheck: true});

	//complain if a FieldObject doesn't already exist
	if (fieldObj === null) {
		console.warn(`[MPO] inputfield_setupField(): A FieldObject wasn't already made for the following input-field (this is likely an internal error):`);
		console.warn(this);

	//if the FieldObject does exist...
	} else {

		//...then check if it's already been setup; if it was already setup then return
		if (fieldObj.setup === true) {
			return this;
		}
	}



	// === GET FIELD-TYPE, VARIATION & ATTRIBUTES ===
	//all of this really just takes the type and variation from 'specifics' if specified and if those aren't present then from the <input-field> element

	//if 'attributes' isn't specified then use an empty object
	let attributes = specifics.attributes;
	if (typeof attributes !== 'object') {
		attributes = {};
	}

	//if no type is specified then fetch it from the <input-field> element
	let fieldType;
	if (typeof specifics.fieldType !== 'string') {
		fieldType = this.getAttribute('type');
	} else {
		fieldType = specifics.fieldType;
	}

	//complain and return if no 'fieldType' was specified
	if (typeof fieldType !== 'string') {
		console.error(`[MPO] inputfield_setupField() could not setup the following input-field as no type was specified (make sure to always setup a <input-field> element by calling '.setup()' on it or by using a 'type' HTML attribute):`);
		console.error(this);
		return this;
	}

	//this checks if a variation is present in the following order: 'attributes.variation' -> 'specifics.variation' -> '<input-field>.variation'
		//if one is not present then the next is applied
	if (typeof attributes.variation !== 'string') {
		if (typeof specifics.variation !== 'string') {
			attributes.variation = this.getAttribute('variation');
		} else {
			attributes.variation = specifics.variation;
		}
	}



	// === CONSTRUCT THE ELEMENT ===

	//create a FieldObject
		//note that technically one was already made but that one was made using `setup: false` which means it didn't do much so now we're overwriting that one
	fieldObj = new inputfield_FieldObject({
		elem: this,
		fieldType: fieldType,
		attributes: attributes
	});

	//apply the new type & variation after it's been parsed by 'inputfield_FieldObject()'
	fieldType = fieldObj.fieldType;
	variation = fieldObj.variation;

	//and add the FieldObject to 'inputfield_fields'
	inputfield_fields.set(this, fieldObj);

	//construct the <input-field> element
	inputfield_variations.get(`${fieldType}-${variation}`).constructor(this, fieldObj, fieldObj.id, attributes);



	// === APPLY THE STARTING VALUE ===
	inputfield_setValue(this, attributes.defaultValue, {skipOnchange: true});

	//return the element
	return this;
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
	const fieldObj = inputfield_getFieldObject(elem);

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
 * 	Return [Boolean]:
 * 		Returns true if succesfully updated and false if it couldn't be updated.
 * 		This will also return true if the value specified is already set.
 */
function inputfield_setValue (field, newValue, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_setValue() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//get the container
		//we don't have to check if this is valid because the field object will simply not be found if this doesn't exist
	const containerElem = inputfield_getElement(field);

	//get the field object
	const fieldObj = inputfield_getFieldObject(containerElem);

	//return and complain if the 'fieldObj' could not be found
	if (fieldObj === undefined) {
		console.warn(`[MPO] inputfield_setValue() could not find the 'FieldObject' for the field "${field}".`);
		return false;
	}

	//get host object
	const hostObj = inputfield_hosts.get(fieldObj.belongsToHost);

	//complain and return if the value isn't valid
	if (inputfield_validateValue(newValue, fieldObj) !== true) {
		console.warn(`[MPO] inputfield_setValue() received an invalid value "${newValue}" for input-field "${fieldObj.id}".`);
		return false;
	}

	//apply the new value
	inputfield_applyNewValue(containerElem, newValue, {skipOnchange: specifics.skipOnchange, updateHost: specifics.updateHost});

	//and return true
	return true;
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
			specifics.field = inputfield_getFieldObject(specifics.field);
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
			if (Object.isIterable(attributes.options) === true) {
				for (const item of attributes.options) {
					if (item.value === value) {
						return true;
					}
				}
			} else {
				//
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
 * 	It's really just here to call 'inputfield_applyNewValue()' and nothing else
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The actual input element that got updated or in case of buttons, the element that got clicked on.
 */
function inputfield_executedAfterFieldChange (fieldID, newValue) {
	//get the container element
	const containerElem = inputfield_getElement(fieldID);

	//return if container can't be found
	if (containerElem === false) {
		console.error(`[MPO] inputfield_executedAfterFieldChange(): Could not find container element with a 'fieldID' of "${fieldID}"`);
		return;
	}

	//get field object
	const fieldObj = inputfield_getFieldObject(containerElem);

	//apply 'checkboxValue' to the new value if it's a checkbox and the value is `true`
	if (fieldObj.fieldType === 'checkbox' && newValue === true) {
		newValue = fieldObj.attributes.checkboxValue;
	}

	//update the field with the new value
	inputfield_applyNewValue(containerElem, newValue);
}

/**	Applies the new value to the input-field and executes the 'onchange' function of the field.
 *
 * 	Does NOT verify if the value given is valid, the new value will be applied regardless.
 * 	Updates the 'value' property inside the FieldObject.
 * 	Updates the visuals (so a checkbox actually has the check when it's checked).
 * 	Updates the host.
 * 	Executes the 'onchange' function.
 * 	Updates the form.
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
 * 				skipSetRawValue [Boolean] <false>
 * 					If true it skips executing the 'inputfield_variations.get().setRawValue()' function.
 * 					Should only be used if it's already been executed.
 *
 * 				formProperty [String] <optional>
 * 					In case a form is being updated it will only update the property with this name instead of the whole object.
 * 					If this is not specified then the form value will be completely replaced with 'newValue'.
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
	const fieldObj = inputfield_getFieldObject(containerElem);

	//complain and return if the field object couldn't be found
	if (fieldObj === undefined) {
		console.warn('[MPO] inputfield_applyNewValue() could not get the \'fieldObj\'.');
		return;
	}

	//get the host object
		//will be undefined if it doesn't exist
	const hostObj = inputfield_hosts.get(fieldObj.belongsToHost);



	//=== SET NEW VALUE TO 'fieldObj' ===

	//if 'formProperty' is specified then only update the property
	if (specifics.formProperty !== undefined) {

		//update the property
		fieldObj.value[specifics.formProperty] = newValue;

		//also set the 'propertyChanged' property
		fieldObj['propertyChanged'] = specifics.formProperty;

	//otherwise simply set the new value to the fieldObj directly
	} else {
		fieldObj.value = newValue;
	}



	//=== SET RAW VALUE ===

	//set the raw value to make sure the correct value is actually displayed (especially important for radio-fields)
	if (specifics.skipSetRawValue !== true) {
		inputfield_variations.get(fieldObj.fieldTypeAndVariation).setRawValue(containerElem, fieldObj, newValue);
	}



	//=== UPDATE HOST ===

	//update all other fields that belong to the host
		//but only if the host should be updated
		//and only if a host even exists
	if (specifics.updateHost !== false && hostObj !== undefined) {
		inputfield_updateHostsChildren(fieldObj.belongsToHost, newValue);
	}



	//=== EXECUTE 'onchange' FUNCTION ===

	//execute the 'onchange' function (unless it should be skipped)
	if (specifics.skipOnchange !== true) {

		//get the 'onchange' function
			//if a host is used then get the 'onchange' function from that
		const onchangeFunction = (fieldObj.belongsToHost !== false) ? inputfield_hosts.get(fieldObj.belongsToHost).onchange : inputfield_getFieldObject(containerElem).onchange;

		//execute the 'onchange' function
			//use 'setTimeout()' with a delay of 0 so it gets it's own call-stack (it basically tells the browser "Hey, execute this bit as soon as everything else is done!")
				//update on this: It doesn't even work this way - it still keeps the call-stack. That said, it still feels wrong to remove this so it'll stay this way.
		if (typeof onchangeFunction === 'function') {
			setTimeout(() => {onchangeFunction(fieldObj.value, fieldObj);}, 0);
		}
	}



	//=== UPDATE THE FORM ===

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
	const fieldObj = inputfield_getFieldObject(fieldElem);

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

	//get the actual input element
	const actualElem = inputfield_variations.get(fieldObj.fieldTypeAndVariation).getActualInputElement(fieldElem);

	//do different things if it's a radio field AND 'radioOption' has been used
		//if those are true then the label affects a specific radio option, not the radio field as a whole
	if (fieldType === 'radio' && labelObj !== undefined && labelObj.radioOption !== null) {

		//check and see if the object is iterable
		if (Object.isIterable(actualElem) !== true) {
			console.warn(`[MPO] inputfield_executedAfterLabelPress(): Can't iterate over the value returned by 'inputfield_variations.get(${fieldObj.fieldTypeAndVariation}).getActualInputElement()' (likely because it's not an Array when it should be one) for input-field ID "${fieldObj.id}".`);
			return;
		}

		//this is used to check whether the element was actually found or not
		let foundElem = false;

		//...and loop through them
		for (const item of actualElem) {

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

		//complain and return if 'actualElem' isn't valid
		if (Object.isDOMElement(actualElem) !== true) {
			console.warn(`[MPO] inputfield_executedAfterLabelPress() couldn't find the actual input element for input-field "${fieldObj.id}".`);
			return;
		}
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
		const fieldObj = inputfield_getFieldObject(item);

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

//this is used for 'autoAddToForm', it will track any element that's added to a input-field with 'autoAddToForm' enabled
let inputfield_observer = new MutationObserver(inputfield_observerCallback);

/**	Gets called after every observer change.
 *
 * 	Adds any new elements to the form if 'autoAddToForm' is enabled.
 *
 * 	Args:
 * 		record [MutationRecord object]
 * 			The MutationRecord object that gets made after the MutationObserver callback.
 */
function inputfield_observerCallback (record) {
	//loop through all records
	for (const recItem of record) {

		//loop through all elements added
		for (const elem of recItem.addedNodes) {

			//continue loop if it's not a <input-field> element
			if (elem.tagName !== 'INPUT-FIELD') {
				continue;
			}

			//double-check to make sure the input-field is actually a descendant of the form...
				//...and then add the new input-field to the form
			if (recItem.target.contains(elem) === true) {

				//get the 'FieldObject' for both
				const targetObj = inputfield_getFieldObject(recItem.target);
				const elemObj   = inputfield_getFieldObject(elem);

				//complain and skip if it's not a form
				if (targetObj.fieldType !== 'form') {
					console.warn(`[MPO] inputfield_observerCallback() received a 'autoAddToForm' change for the input-field "${targetObj.id}" despite it not being a form.`);
					continue;
				}

				//add both fields to each other
				targetObj.formChildren .push(elem);
				elemObj  .belongsToForm.push(recItem.target);

				//update the form to include the new value
				inputfield_applyNewValue(recItem.target, elemObj.value, {skipOnchange: true, formProperty: elemObj.tag});
			}
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
 * 				DOMTree [DOM Tree] <document>
 * 					Which DOM tree it should look for the input-field.
 * 					Chances are this is simply 'document', but it can also be a 'DocumentFragment' in which case that should be passed as a whole.
 *
 * 				referenceElem [DOM Element] <optional>
 * 					A optional reference element that can be used to speed-up the process of getting the element.
 * 					If a reference element is used then this function will simply go up the DOM tree and check if the input-field can be found.
 * 					Note that if the input-field can't be found with this reference element then it will simply fall back to the normal function.
 * 					This also double-checks to make sure that 'referenceElem' is an actual DOM element, so you can pass a string or anything and it will simply be ignored without breaking.
 *
 * 	Returns [DOM Element/null]:
 * 		The DOM Element of the input-field if found.
 * 		Returns `null` if no input-field can be found.
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
	}

	//complain and return if 'fieldID' isn't a string
	if (typeof fieldID !== 'string') {
		console.warn(`[MPO] inputfield_getElement() received a non-string as 'fieldID': "${fieldID}".`);
		return null;
	}

	//if a reference-element was specified then use that to try and get the element
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

	if (Object.isDOMElement(containerElem) !== true) {
		console.warn(`[MPO] inputfield_getElement() couldn't find a DOM element with the ID: "${fieldID}".`);
		return null;
	}

	//return the element
	return containerElem;
}

/**	Gets the FieldObject for a input-field.
 *
 * 	Gets the object that's found inside the 'inputfield_fields' variable.
 * 	Will also setup a input-field if it hasn't already.
 *
 * 	Args:
 * 		field [DOM Element/String]
 * 			The input-field. Can be the DOM element itself or it's input-field ID.
 *
 * 		specifics [Object] <optional>
 * 			Includes the following (optional) properties:
 *
 * 				skipSetupCheck [Boolean] <false>
 * 					If `true` it won't check whether the FieldObject has been setup or not.
 *
 * 	Returns [FieldObject/null]:
 * 		Returns a FieldObject (see 'inputfield_FieldObject()').
 * 		Returns `null` if it couldn't be found.
 */
function inputfield_getFieldObject (field, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_getFieldObject() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//complain and return if it's not a DOM element
	if (typeof field !== 'string' && Object.isDOMElement(field) !== true) {
		console.warn(`[MPO] inputfield_getFieldObject() received neither a string nor a DOM element as 'field': "${field}".`);
		return null;
	}

	//get the DOM element if an ID was given
	if (typeof field === 'string') {
		field = inputfield_getElement(field);

		//complain and return if it's not a DOM element
		if (Object.isDOMElement(field) !== true) {
			console.warn(`[MPO] inputfield_getFieldObject() couldn't find the input-field specified in 'field'.`);
			return null;
		}
	}

	//get the FieldObject
	let fieldObj = inputfield_fields.get(field);

	//complain and return if it couldn't be found
	if (fieldObj === undefined) {
		console.warn(`[MPO] inputfield_getFieldObject() couldn't get the FieldObject for the following element:`);
		console.warn(field);
		return null;
	}

	//check if the field has been setup and, if not, set it up
		//but only if 'skipSetupCheck' isn't `true`
	if (fieldObj.setup !== true && specifics.skipSetupCheck !== true) {
		field.setup();

		//and assign the new FieldObject so we can return the newly created one
		fieldObj = inputfield_fields.get(field);
	}

	//return it!
	return fieldObj;
}
