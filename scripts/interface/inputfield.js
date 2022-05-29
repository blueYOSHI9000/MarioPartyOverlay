// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/*	=== HOW INPUT-FIELDS WORK ===

	Input-fields are an "easy" way to get user-input. "easy" depends on how you look at it...
	Input-fields are categorized in different types depending on what input you want.
	If you need the user to enter a number then you use the 'number' type, if you need them to make a selection then you use the 'radio' type.

	One goal of input-fields was to make full customization easy. You can change how an input-field looks by using a different variation.
	Variation are still very much a WIP. But basic support is there. There's a section on variations further down.

	Each input-field can have attributes that define how they work (not to be confused with HTML attributes!).
	Some attributes are exclusive to certain types (like the 'options' attribute being exclusive to 'radio' types).
	There's a section further down listing all attributes and another section on how to change attributes.


	To create a input-field you use 'inputfield_createField()'.
	Use Ctrl+F to search for the function in this file, there's some documentation right before it that explains which Arguments to use and all that.


	Some details to keep in mind:
		This entire system is designed to avoid memory leaks in any way possible.
		It's designed not to save ANYTHING without making sure it's deleted when an input-field is deleted.

		This does create a couple limitations however. Special care has to be used when moving input-fields into "hidden" spaces that outside the regular document (anything that 'document.querySelector()' can't find).
		Because if that happens then anything that depends on it won't be able to find it. In other words, functions like 'inputfield_getValue()' won't be able to get it's value with just an ID.


	=== INPUT FIELD TYPES & VARIATIONS ===

	Each type is listed here and each type will list all variations it has (which can be specified with the 'variation' attribute).

	form
		This is a special type as it doesn't really create an actual input-field (aside from an empty '<span>'), instead it can be used to combine several input-fields into a single form.
		When creating a new form you can use it's ID to add other input-fields to it. To add a input-field to a form you can use the ID of the form inside the 'forms' attribute.
		The form will have an object as it's value containing an entry for each input-field that's part of it.
		Each item has the 'tag' attribute as it's name that can be used to access the value inside the object.

		In detail:
			Forms are completely one-sided. Input-fields added to the form will link to the form but the form doesn't link each input-field.
			This means forms, by design, do not have a list of all it's children.
			When a input-field linked to a form gets updated it will simply update the form's value but nothing else. If during this the form can't be found then the form won't be updated which could cause some values to be missing/outdated. Because of this it's recommended that the form stays on the regular DOM tree at all times once it's been created (meaning no DocumentFragments or other "hidden" places that 'document.querySelector()' can't access).

		Variations:
			- regular <default>: A regular form.

	button
		A simple button. You press it, it does things.
		Does not store a value so it will simply return `null`. Will trigger the 'onchange' function specified in attributes when clicked on.
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

	color
		A way to select a custom color.
		Will store the selected color in hex form ('#ffffff' being white) as a string. [NOTE: currently, any form that's allowed by CSS is able to be stored in here -- this is subject to change]
		Variations:
			- regular <default>: A regular color selection. Basically the same as '<input type="color">'.


	=== FIELD ATTRIBUTES ===

	Each input-field has a set of attributes that can be specified when creating it.
	Attributes can be changed in one of the following three ways:
		- calling 'inputfield_changeAttribute()' (recommended)

		- setting the value via '<input-field>.fieldAttributes' (use the = operator here, using '.push()' on an array for example isn't gonna do anything)
		- setting the attribute directly on the HTML element (use lower-case for this -- only accepts string, though some attributes try to convert it)

	Note that some attributes are only available for some types.


	# core attributes:

		variation [String] <default variation>
			What variation this should be. See the list above for more info.
			Will take the default variable of the 'fieldType' if not specified.
			If a invalid variation is given then this WILL break, it won't automatically go back to the default. This includes specifying a variation when no variations exist.

		id [String] <optional>
			The ID of the input-field. Can be used to access the input-field.
			The ID can't consist of only numbers (so '123' is not allowed but '123a' is allowed).
			The ID should be unique. If the same ID is used multiple times it may result in unexpected behaviour.
			On default this will be a unique ID which represents the total amount of input-fields made (so the default IDs would be '1' -> '2' -> '3' etc.).

			More on what happens if the same ID is used multiple times:
				Whenever an input-field is fetched by an ID, it will always only use the first input-field it finds with that ID. It won't even bother scanning for a second one.
				And which one is found first can be dependant on various factors, all of them are due to how 'inputfield_getElement()' works.
				The function won't be able to find a element inside a DocumentFragment or other places unless specified.
				The function will also search for "related" elements first if a 'referenceElem' is given (see the documentation on the function).
				Both of these can affect which element is found first.
				This also isn't fixed in stone, this can change in any update (for better or worse). So it's recommended to avoid using the same ID multiple times as much as possible.


	# behaviour attributes:

		onchange [Function] <none>
			A function that gets executed each time the input-field is updated. Available for all input types.
			The first argument will be the current value of the input field.
			The second argument will be the field object inside 'inputfield_fields' (see the 'inputfield_FieldObject()' function for a documentation of this object).

		defaultValue [*any*] <optional>
			This defines the value the input-field will have after it's been created. Can't be `undefined`.
			The default value will only be applied if it's actually valid.
			If no default value is specified (or if it's invalid) then it will use the following (depending on which type it is):
				form:     *empty object*
				checkbox: false
				radio:    *the first 'option'*
				text:     '' (a blank string)
				number:   0
				button:   undefined
				color:    '#000000'
				file:     *N/A*

		tag [String] <ID>
			A tag-name is used to access the value inside a form.
			It's suggested that a tag should be unique within a form, but it's not required.
			If not specified then it will use it's ID as the tag. Due to this, it should be avoided to create tags that are only a number and nothing else.

			If multiple input-fields have the same tag then when a input-field is updated it will simply overwrite the value that's already there.
			This essentially allows you to have a form value that's simply the value of the most recently updated input-field.



		forms [Array/DOM Element/String] <none>
			A list of all forms the input-field should be a part of.
			Can also be a single form. Can be the <input-field> element of the form or it's ID.

			This is a definitive list of all forms that the input-field is part of. If this is changed to an empty array then it will no longer be part of any forms.
			If you simply want to add the input-field to a new form then use 'formsAdd'.

			Note: Don't add input-fields to procedually generated forms. Deleted forms are never removed from this attribute so be sure to either clear it or to only use forms that are deleted with this input-field/forms that are always available.

		formsAdd [Array/DOM Element/String] <none>
			A list of all forms the input-field should be added to.
			Can also be a single form. Can be the <input-field> element of the form or it's ID.

		formsRemove [Array/DOM Element/String] <none>
			A list of all forms the input-field should be removed from.
			Can also be a single form. Can be the <input-field> element of the form or it's ID.

	# host related attributes (any type can use these):

		host [String/null] <none>
			Specifying a host links the input-field to the specified host. Set it to `null` to remove the host.
			Every input-field linked to the host shares the exact same value at all times.
			In addition, they also share all "behaviour attributes" listed above (that includes the form attributes and the 'onchange' function).
			All of that will be hosted permanently (hence the name), even if all input-fields are deleted the host will still exist and new input-fields linked will take the host's values & attributes.

			Basically, since everything relating to an input-field is immediately deleted once the input-field is gone you can instead use hosts to store values permanently.
			Another use-case is that all input-fields with the same host share the same value, so if you want to display the same checkbox in different spots on your website then you can use a host to make sure they're always identical.

			Important: Be careful with DocumentFragments or other "hidden" spots that 'document.querySelector()' can't find. See below for more info.

			In more detail:
				If a attribute listed under "behaviour attributes" is changed on a input-field it will immediately overwrite the host's attribute. If an attribute isn't specified on a input-field's creation then it will take the attribute from the host instead.

				Once a host gets updated it immediately updates all input-fields linked to it. If a input-field can't be found it will be removed from the host.
				That can either happen when a input-field gets deleted or when a input-field is moved to a "hidden" spot that 'document.querySelector()' can't access.
				Once a input-field gets moved from a "hidden" spot back onto the regular DOM document then it will immediately overwrite all of it's own attributes & values from the host.
				That said, if a "hidden" input-field gets updated (attributes or value) then it will still affect the host and all of it's input-fields. This is because the host is always accessible.

				A host always updates it's children with a 'setTimeout()' of 0ms. This can cause a backlog if other functions use the same feature.

				If no 'tag' attribute is specified then the host and all input-fields will have different tags. They will only share a tag once one is specified (and from then on every input-field that joins the host will have the same tag).
				This does in theory not affect anything, but if a host is a part of a form and a input-field & it's host get seperated then both will individually be part of the same form. If they have a different 'tag' then they will both set a different property of the form but if they have the same 'tag' then they will both fight for it.

	# starting attributes (these only affect how the input-field is created, they're ignored afterwards):

		beforeText [String] <none>
			If present it will create a label before the input-field consisting of this text.
			Useful if you want a description before a checkbox.
			This won't be parsed as HTML, it will simply be inserted as-is.

		afterText [String] <none>
			Same as 'beforeText' except it will be created after the input-field.

		labels [Array/DOM Element] <optional>
			A DOM element (or an array of them) that should act as labels. Basically like a '<label>' element.

		HTMLAttributes [Object] <optional>
			A object of HTML attributes to add to the container. `{id: 'testo'}` would set 'testo' as the elements ID.
			If HTML attributes have to be changed after it's creation then you have to change them manually through 'Element.setAttribute()'.


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

			- Add a 'inputfield_label' class and a 'data-fieldlabelfor' attribute that saves the unique input-field ID.

			- Include the element in the 'labels' attribute when creating a input-field.

			- Call 'inputfield_convertToLabel()'. This way you get more options and more control. See the documentation on the function for more info.
				> You can also call '.inputfield_convertToLabel()' on a DOM element directly (again, see function for more info).



	=== CREATING CUSTOM VARIATIONS ===
		A better way to do this will be added later (and with that a better tutorial).
		For now, view the documentation on the 'inputfield_variations' variable further down.



	=== DATA ATTRIBUTES USED ===
		Input-fields use the following HTML attributes:
			- 'data-fieldid'
			- 'data-fieldlabelfor'
			- 'data-holdsvalue' (only used inside <input-field> elements)



	=== IMPORTANT FUNCTIONS ===

	inputfield_createField()
		Creates a new input-field.

	inputfield_getValue()
		Gets the value of a input-field.

	inputfield_setValue()
		Sets the input-field to a new value.

	inputfield_changeAttribute()
		Changes attributes of a input-field.


	inputfield_getFieldObject()
		Gets the object that stores all the data of the input-field.
		Treat it as read-only because changing a value in it won't actually apply the value!
		Should only really be used for debugging.



 	=== USING THIS ON ANOTHER PROJECT ===
		If you want to use this file on another project you gotta do the following things:

			- Load this file (obviously).
			- Load 'styles/inputfield.css'
			- Add a 'pointerdown' event that calls 'inputfield_executedAfterFieldChange(elem)' whenever the user clicks on a element with a 'inputfield_callUpdate' class ('elem' is the element being clicked on).
			- Add a 'pointerdown' event that calls 'inputfield_executedAfterLabelPress(elem)'  whenever the user clicks on a element with a 'inputfield_label'      class ('elem' is the element being clicked on).



	=== MAINTAINING THIS PROJECT ===
		A quick run-down of all import things to keep in mind if you plan on maintaining this project (whether it's because I abandoned it or because you want to add a new feature).
		The "Avoiding memory leaks" seems boring but it's the most important part. Please actually read it if you plan on maintaining this project.

		# Avoiding memory leaks
			This entire system is designed around NOT SAVING ANYTHING!   NOT! SAVING! ANYTHING!
			Everything that is saved, is saved in a 'WeakMap' which is a feature from browsers to "attach info" onto a DOM elements (or any object for that matter), if the DOM element is deleted then all the info attached is deleted as well.
			That's the concept of this entire system. You save anything that shouldn't be saved and whoops, you got a memory leak! Good luck trying to even notice that!

			This is such a big issue because input-fields can be created in a "pop-up" of sorts that displays settings for example, if the "pop-up" is closed then all the input-fields are deleted with it. If the "pop-up" is opened again then new input-fields will be created.
			That's why it's so important to always keep memory leaks in mind.

			This is usually avoided by always saving the IDs of input-fields and not the <input-field> DOM element. That said, endlessly saving IDs will still create a memory leak so we also gotta go back and check any arrays that save IDs to make sure that deleted/unavailable input-fields are removed from the array.

			But that could cause an issue if input-fields go unavailable (for example by being appended to a 'DocumentFragment') and then are available again.
			For this we usually have a "one-sided" connection. For example, input-fields link to a host but a host doesn't always link back.
			Whenever a new input-field is added to a host the host immediately removes all unavailable input-field from it's 'childList'.
			But when a removed input-field is appended back onto the regular document it immediately tries to "re-link" itself with the host.

			A similar problem exists for forms. A form has many children that are a part of it but each input-field can also be part of many forms.
			This means both sides have a technically unlimited list of potential fields to keep track of.
			This problem was solved by making forms "one-sided", a input-field always links to every form but the form doesn't save a single child.
			It's not an ideal solution. You can't see how many or which children a form has.
			In addition there's still a memory leak in here! Can you spot it?
			Input-fields still save every single form it's a part of without ever letting go of them.
			The input-field can't let go of unavailable forms because what if the form gets available again? There's no way to see the difference between a "deleted" and a "unavailable" element.
			This was "solved" by simply adding a note to the 'form' type documentation above to say "yeah, don't do this, lol".


		# Prefix
			Every global variable is prefixed with 'inputfield_' to create a simple name-space and also to differentiate global and local variables more.
			The prefixes are often emitted from documentation (so if 'createField()' is referenced then it likely means 'inputfield_createField()').


		# The Structure
			Input-fields are created within 'FieldObject()' and 'setupField()' (the latter is also used as'<input-field>.setup()').
			'FieldObject()' takes the input - that being all attributes - and verifies & applies them.
			'setupField()' calls 'FieldObject()' and then creates the "insides" of the <input-field> element (since before that function it's just an empty element).

			Note that everything about the <input-field> element itself runs through variations. Check the 'inputfield_variations' object out, you'll see how it works.

			From that point on, everything really just runs through 'applyNewValue()'. That function is called after a value is changed.
			It makes sure the value is applied to the actual <input-field> element itself, it updates the hosts (which in return call 'applyNewValue()' for all input-fields that are a part of the host), it calls the 'onchange' function and finally it also updates all forms that need to be updated (which you guessed it, 'applyNewValue()' is also used to update the forms!).

			Most of the host "magic" all happens in 'updateHostsChildren()'.

			This is probably most of what you need to know about the general structure. It's best to quickly read some of the documentations on each function and then just go through 'applyNewValue()' step-by-step, you'll see how most functions are used that way.

		# I want to create a new attribute!
			If you want to create a new attribute you gotta do the following things (hope I didn't miss anything!):
				- update the documentation above
				- verify and apply it inside the 'FieldObject()' function
					> note that if the attribute affects the <input-field> element directly then the attribute is likely applied inside each variations constructor (see 'content' and 'options')
				- add it to 'changeAttributes()' so it can be changed
				- add it to 'attributeObserverCallback()' so it can be changed via HTML attributes on the <input-field> element directly

				- if the attribute is a "behaviour attribute" that gets synced to the host, well, good luck! (the following is likely not everything)
					- add it to 'HostObject()'
						> also add it to it's arguments when calling the function and also to 'setupHost()'
						> it's best to Ctrl+F those two functions and add it everywhere those functions are called
					- add it to the part where the 'host' attribute gets verified inside 'FieldObject()'
					- add it to 'updateHostsChildren()'

			Note that even more work is needed if you want to create a property directly inside the 'FieldObject' or 'HostObject' (like 'belongsToForm').

			> Should my attribute be a "behaviour attribute"?
				If it's something that affects how the value or input-field itself behaves then no (see 'content' or 'options').
				If it's something that happens "outside" the input-field then yes (see 'onchange' or 'tag').

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

// This saves info about all hosts
let inputfield_hosts = new Map();

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
					var button = cElem('input', container, {type: 'button', autocomplete: 'off', onclick: `inputfield_executedAfterFieldChange('${fieldID}', null);`});

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
			}
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

		//create the 'fieldAttributes' property
			//a getter is used to avoid saving the <input-field> element or referencing the WeakMap entry (not sure if that would stop the Garbage Collector but don't wanna risk it)
			//no setter is used so the property can't be overwritten
		Object.defineProperty(this, 'fieldAttributes', {
			get: this.#getAttributes
		});

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
	//gets the 'attributes' property of a 'FieldObject'
		//needed inside the constructor for the '<input-field>.fieldAttributes' property
	#getAttributes () {
		//save this <input-field> element so the proxy can use it
			//important because `this` refers to the proxy handler inside the 'set' function
		const elem = this;

		//create and return a proxy
			//important so we can actually apply the new attributes
			//if we just returned the 'attributes' property directly changes made to it wouldn't be applied
		return new Proxy(inputfield_fields.get(elem).attributes, {
			set: function (target, property, newValue) {
				return inputfield_changeAttribute(elem, property, newValue);
			}
		});
	}

	/**	Gets called once an input-field is back on the regular DOM tree.
	 *
	 * 	If a <input-field> gets added to a DocumentFragment (or is created within that) then this will be called once it's appended back onto the regular DOM tree.
	 * 	Same applies to other "hidden" spaces.
	 *
	 *
	 * 	This function simply adds the element back onto the host since it was likely removed due to being outside of the regular DOM tree.
	 */
	connectedCallback () {

		//get the ID
		const fieldID = this.getAttribute('data-fieldid');

		//get the FieldObject
		let fieldObj = inputfield_getFieldObject(this);

		//return if the element or FieldObject still can't be found
		if (inputfield_getElement(fieldID) === null || fieldObj === null) {
			console.warn(`[MPO] InputFieldElement.connectedCallback() got called but input-field still seems to be unavailable. Element: `, this, ` - This got triggered since either 'inputfield_getElement()' couldn't find the ID "${fieldID}" or the FieldObject was null: `, fieldObj);
			return;
		}

		//check if this input-field is even part of a host
		if (fieldObj.belongsToHost !== null) {

			//get the HostObject
			let hostObj = inputfield_getHostObject(fieldObj.belongsToHost);

			//complain and return if the host couldn't be found
			if (hostObj === null) {
				console.warn(`[MPO] InputFieldElement.connectedCallback() couldn't find the HostObject for input-field "${fieldID}" with the following 'belongsToHost' property: `, fieldObj.belongsToHost);
				return;
			}

			//add the field to the host's 'childList' if it isn't already in there
			if (hostObj.childList.indexOf(fieldID) === -1) {
				hostObj.childList.push   (fieldID);
			}

			//and finally take all values from the host
				//this will take the value and attributes from the host and applies it immediately
			inputfield_updateHostsChildren(fieldObj.belongsToHost, {
				updateAttributes: true,
				updateSpecificFields: [fieldID],
				executeImmediately: true
			});
		}
	}

	/* //not needed currently
	disconnectedCallback () {
		//console.log(arguments);
	}
	*/

	adoptedCallback () {
		console.warn(`[MPO] NOTICE: Input-fields may cause issues when adopted to different documents as they weren't tested. Please contact me with a use-case so I can properly test and implement support for it.`);
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
 * 	This will also execute the attributes immediately if necessary (for example, if a 'host' is specified then it will immediately be added to the host).
 * 	Exceptions to this are attributes that affect the actual <input-field> element itself (like 'content' or 'options'). Those are instead done inside each variation's constructor.
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
 * 		fieldType [String]
 * 			The type of the field.
 *
 * 		variation [String]
 * 			The variation of the field.
 *
 * 		value [*any*]
 * 			The value of the field.
 * 			What type this is depends on the 'fieldType', see the documentation at the top of this file for more info.
 *
 * 		displayedValue [*any*]
 * 			The value that's actually being displayed.
 * 			This will likely always be the same as 'value' but when forcing a invalid value onto it then this will be different.
 * 			Example: If a string was forced onto a 'number' input-field then 'value' will be the string while 'displayedValue' will be 0 because the field will display 0.
 *
 * 		nullValue [*any*]
 * 			The value that's used as a fail-safe when the real value is invalid.
 * 			Mainly used when a value from the host is applied.
 *
 * 		attributes [Object]
 * 			All attributes of the field.
 * 			This isn't 1:1 the attributes that were given, these were verified and updated by this function.
 * 			Any attributes that were incorrect or empty have been deleted and will be `undefined`.
 *
 * 		belongsToHost [String / null]
 * 			This defines whether this input-field belongs to a host or not.
 * 			Will be the value of the host it belongs to or simply `null` if it doesn't belong to any host.
 *
 * 		tag [String]
 * 			The tag of the input-field. Only needed for input-fields that are part of a form.
 * 			If no tag was specified then this will be the ID of the input-field. This will always be a string.
 * 			If you specifically need the value from the user then use 'attributes.tag', that one will be `undefined` if nothing was specified.
 *
 * 		propertyChanged [String/undefined]
 * 			The name of the property that has been updated inside a form.
 * 			Will be an empty string if no value was updated (likely after the form's creation).
 * 			Will be `undefined` if it's not a form.
 *
 * 		belongsToForm [Array]
 * 			A list of all forms this belongs to. Is an array consisting of DOM elements.
 *
 * 		startingValue [*any*] <undefined>
 * 			The value the field should start out with.
 * 			WILL BE DELETED IMMEDIATELY AFTER 'inputfield_setupField()' IS CALLED. Use 'attributes.defaultValue' instead.
 * 			This is only exists since the starting-value and default-value differ when a host is used (specifically to make sure that fields with a 'defaultValue' take priority over other fields without one when added to a host).
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


	//IMPORTANT: To remove unused properties you have to delete them! Setting them to `undefined` is not enough because they will still show up in DevTools.



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
		console.error(`[MPO] inputfield_FieldObject() received a invalid 'fieldType' for input-field "${this.id}": "${specifics.fieldType}". Note that this type might've been split ('checkbox-regular' would be split to 'checkbox').`);
		return;
	}

	//get default variation if nothing is specified
	attributes.variation ??= inputfield_getDefaultVariation(specifics.fieldType);

	//complain and use default if the variation is invalid
	if (typeof inputfield_variations.variations[specifics.fieldType][attributes.variation] !== 'object') {
		console.warn(`[MPO] inputfield_FieldObject() received a invalid 'variation' for input-field "${this.id}": "${specifics.variation}".`);
		attributes.variation = inputfield_getDefaultVariation(specifics.fieldType);
	}



	// === ADD HTML ATTRIBUTES TO THE <input-field> ELEMENT

	//add 'type' and 'variation'
	specifics.elem.setAttribute('type', specifics.fieldType);
	specifics.elem.setAttribute('variation', attributes.variation);

	//add the ID to the element
	specifics.elem.setAttribute('data-fieldid', this.id);



	// === MUTATION OBSERVERS ===

	//create the object
	this.observers = {};

	//add the observer for attributes
		//we could use the 'attributeChangedCallback' property on the <input-field> class but there's a significant lack of documentation on MDN for it
		//and we'd have to manually specify every single attribute we want to observe which would be a pain to maintain
		//not to mention that there's way better error-handling this way (if a user misspells a attribute we can 'console.warn()' it for example)
	this.observers. attributeObserver = new MutationObserver(inputfield_attributeObserverCallback);
	this.observers. attributeObserver.observe(specifics.elem, {attributes: true});

	//add the observer for 'autoAddToForm'
		//but don't observe it yet
	this.observers.formObserver = new MutationObserver(inputfield_formObserverCallback);



	// === MODIFYING ATTRIBUTES ===
		//note that the following is more or less in order as the attributes are listed in the documentation
		//I say "more or less" because some attributes rely on another attribute already being verified
		//so it's not possible to have them completely in order


	// # 'variation'
		//verified at the start of this function


	// # 'id'
		//verified at the start of this function


	// # 'onchange'
		//has to be done before 'host'

	//complain and delete it if it's not a function
	if (attributes.onchange !== undefined && typeof attributes.onchange !== 'function') {
		console.warn(`[MPO] inputfield_FieldObject() received a non-function as 'onchange': `, attributes.onchange);
		delete attributes.onchange;
	}


	// # 'defaultValue' -----> verified right before 'host'


	// # 'tag'
		//has to be done before 'host'
		//has to be done before 'forms'

	//if the tag is neither a string nor `undefined` then complain and delete it
	if (typeof attributes.tag !== 'string' && attributes.tag !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'tag':`, specifics.tag);
		delete attributes.tag;
	}

	//define the 'tag' property
		//use a default tag if no tag has been specified
	if (typeof attributes.tag === 'string') {
		this.tag = attributes.tag;
	} else {
		this.tag = this.id;
	}


	// # 'autoAddToForm'

	//check if 'autoAddToForm' is true
	if (attributes.autoAddToForm === true) {

		//check if it's a form, if yes then add this field to the observer
		if (specifics.fieldType === 'form') {
			this.observers.formObserver.observe(specifics.elem, inputfield_formObserverOptions);

		//if it's not a form then complain about it and do nothing else
		} else {
			console.warn(`[MPO] inputfield_FieldObject() received \`true\` for 'autoAddToForm' despite the input-field not being a form. ID: "${this.id}"`);
		}

	//if it's not `true` then delete it
	} else {

		//if it's neither a boolean nor `undefined` then complain
			//note that we already checked if it's `true` before
		if (attributes.autoAddToForm !== false && attributes.autoAddToForm !== undefined) {
			console.warn(`[MPO] inputfield_FieldObject() received a non-boolean as 'autoAddToForm': `, autoAddToForm);
		}

		delete attributes.autoAddToForm;
	}


	// # 'content'
		//this has to be done before calling 'inputfield_getDefaultValue()' (done below for 'defaultValue')

	//if 'content' is neither a string nor undefined then complain and delete it
		//this attribute has to be a string but undefined is valid too (as undefined == "don't use this")
	if (typeof attributes.content !== 'string' && attributes.content !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'content': `, attributes.content);
		delete attributes.content;
	}


	// # 'checkboxValue'
		//this has to be done before calling 'inputfield_getDefaultValue()' (done below for 'defaultValue')

	//set 'checkboxValue' to true if it hasn't been specified
	attributes.checkboxValue ??= true;


	// # 'options'

	//complain and return if this is a 'radio' field with an invalid 'options' attribute
		//if it's not an array at all then return (doesn't matter if it's `undefined`, a 'radio' field still needs one)
		//if it's an array with 0 entries then return as well
	if (specifics.fieldType === 'radio' && (Array.isArray(attributes.options) !== true || attributes.options?.length < 1)) {
		console.warn(`[MPO] inputfield_FieldObject() requires a 'options' attribute for a input-field of type 'radio' (ID "${this.id}"): `, attributes.options, ` - Has to be an array with at least one entry.`);
		return;
	}

	//set 'options' to an empty array if it's undefined
	attributes.options ??= [];

	//if 'options' isn't an array then complain about it and set it to an empty array
	if (Array.isArray(attributes.options) !== true) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-array as 'options': `, attributes.options);
		attributes.options = [];
	}

	//loop through all options to make sure they're all valid
	for (const key in attributes.options) {
		const item = attributes.options[key];

		//delete the array item if it's not an object
		if (typeof item !== 'object') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't parse the 'options' array as item Nr. "${key}" wasn't a object: `, item);
			delete attributes.options[key];
			continue;
		}

		//set 'name' to 'Unknown' if it's not valid
		if (typeof item.name !== 'string') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't properly parse the 'options' array as item Nr. "${key}" had a non-string as 'name': `, item.name);
			item.name = 'Unknown';
		}

		//set 'src' to undefined if it's neither a string nor undefined
		if (item.src !== undefined && typeof item.src !== 'string') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't properly parse the 'options' array as item Nr. "${key}" had neither a string nor undefined as 'src': `, item.src);
			item.src = undefined;
		}

		//delete the array item if 'value' isn't valid
			//do this one last so all other warnings are also immediately printed
		if (typeof item.value !== 'string') {
			console.warn(`[MPO] inputfield_FieldObject() couldn't parse the 'options' array as item Nr. "${key}" had a non-string as 'value': `, item.value, ` - Option will now be removed.`);
			delete attributes.options[key];
			continue;
		}
	}

	//if it's an empty array then delete it to remove clutter
	if (attributes.options.length === 0) {

		//complain and return if it's a 'radio' field with an empty array
		if (specifics.fieldType === 'radio') {
			console.warn(`[MPO] inputfield_FieldObject() received a invalid 'options' array. There has to be at least one valid entry for a input-field of type 'radio' to work.`);
			return;
		}

		delete attributes.options;
	}


	// # 'defaultValue' (pre-host - 1/2)
		//this has to be done after verifying 'options' and 'checkboxValue' as those attributes are needed in here
		//has to be done before 'host'

	//replace 'defaultValue' with 'checkboxValue' if necessary
		//this will only apply if it's a checkbox and 'defaultValue' is `true`
	if (specifics.fieldType === 'checkbox' && attributes.defaultValue === true) {
		attributes.defaultValue = attributes.checkboxValue;
	}

	//check if 'defaultValue' is invalid
	if (attributes.defaultValue === undefined || inputfield_validateValue(attributes.defaultValue, {fieldType: specifics.fieldType, attributes: attributes}) !== true) {

		//complain about it if necessary
		if (attributes.defaultValue !== undefined) {
			console.warn(`[MPO] inputfield_FieldObject() received a invalid value as 'defaultValue' for input-field "${this.id}": `, attributes.defaultValue);
		}

		//and delete it
		delete attributes.defaultValue;
	}


	// # 'host'
		//has to be done after all "behaviour attributes"
		//has to be done before 'forms'

	//if 'host' is invalid...
	if (typeof attributes.host !== 'string') {

		//complain if necessary
		if (attributes.host !== undefined) {
			console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'host' for input-field "${this.id}": `, attributes.host);
		}

		//...then delete it (no host will be used)
		delete attributes.host;

	//if 'host' is valid then set it up
	} else {

		//get the HostObject
		let hostObj = inputfield_getHostObject(attributes.host);

		//if the host doesn't exist yet then create it
		if (hostObj === null) {
			//setup the host
			hostObj = inputfield_setupHost(attributes.host, {
				childList: []
			});
		}

		//add this input-field to the host - quick summary:
			//all "behaviour attributes" are synced
			//if an attribute in here is NOT specified then take the host's value
			//if an attribute in here is     specified then overwrite the host
			//attributes from this input-field take priority over the host's because this input-field is newer

		//add it to it's list
		hostObj.childList.push(this.id);

		//list of all "behaviour attributes"
		const behaviourAttributes     = ['defaultValue',  'onchange', 'tag', 'forms', 'formsAdd', 'formsRemove'];

		//track whether the form attributes got changed on the host because if they did we need to call 'verifyFormAttributes()' on them
		let formAttributesChanged = false;

		//track whether other attributes from the host got changed so we can call 'updateHostsChildren()'
		let hostAttributesChanged = false;

		//check for specified attributes
		for (const behaviourKey of behaviourAttributes) {

			//if it's specified here then overwrite the host
			if (attributes[behaviourKey] !== undefined) {
				hostObj.attributes[behaviourKey] = attributes[behaviourKey];

				//if a form attribute changed then update the variable
				if (['forms', 'formsAdd', 'formsRemove'].indexOf(behaviourKey) !== -1) {
					formAttributesChanged = true;

				//if not a form attributes then other host attribute have changed
				} else {
					hostAttributesChanged = true;

					//update 'tag' property if needed
					if (behaviourKey === 'tag') {
						hostObj.tag = attributes.tag;
					}
				}

			//if it's not specified then get it from it's host
				//if the host's value is also `undefined` then it doesn't matter because this value was already `undefined` anyway
			} else {
				attributes[behaviourKey] = hostObj.attributes[behaviourKey];
			}
		}

		//if the host's form attributes got changed then we need to apply them
		if (formAttributesChanged === true) {

			//this is called for the host, not the input-field
			hostObj.belongsToForm = inputfield_verifyFormAttributes({
				forms      : attributes.forms      ,
				formsAdd   : attributes.formsAdd   ,
				formsRemove: attributes.formsRemove,
				name       : attributes.host ,
				tag        :    hostObj.tag  ,
				value      :    hostObj.value,
				belongsToForm:  hostObj.belongsToForm,
				fieldOrHost: 'host'
			});

			//and also replace the attribute
			hostObj.attributes.forms = hostObj.belongsToForm;
		}

		//if other host attributes changed then we can call 'updateHostsChildren()'
		if (hostAttributesChanged === true) {
			inputfield_updateHostsChildren(attributes.host, {
				updateAttributes: true,
				executeImmediately: false
			});
		}
	}

	//set 'belongsToHost'
		//use `null` instead if no host is specified
	this.belongsToHost = attributes.host ?? null;


	// # 'defaultValue' (post-host - 2/2)

	//if 'defaultValue' still hasn't been set then get a default value
	if (attributes.defaultValue === undefined) {
		attributes.defaultValue = inputfield_getDefaultValue(specifics.fieldType, attributes);
	}

	//if 'startingValue' wasn't specified yet then set it to the 'defaultValue'
		//NOTE: Do NOT verify this! This can take a host's value which can be invalid for this field. That's how hosts work.
	if (this.startingValue === undefined) {
		this.startingValue = attributes.defaultValue;
	}


	// # 'forms'
	// # 'formsAdd'
	// # 'formsRemove'
		//has to be done after 'host' & 'tag'
		//has to be done after 'defaultValue' because the 'startingValue' property is needed

	//if a host isn't specified then verify and apply all form attributes
	if (this.belongsToHost === null) {
		attributes.forms = inputfield_verifyFormAttributes({
			forms      : attributes.forms      ,
			formsAdd   : attributes.formsAdd   ,
			formsRemove: attributes.formsRemove,
			name : this.id,
			tag  : this.tag,
			value: this.startingValue,
			belongsToForm: [],
			fieldOrHost: 'field'
		});

		//if 'forms' is an empty array then delete it
		if (attributes.forms.length === 0) {
			delete attributes.forms;
		}
	}

	//delete 'formsAdd' and 'formsRemove'
		//these attributes are "relative" attributes which means they should always be empty so a new form can be added or removed
	delete attributes.formsAdd   ;
	delete attributes.formsRemove;


	// # 'beforeText'

	//if 'beforeText' is neither a string nor undefined then complain and delete it
		//this attribute has to be a string but undefined is valid too (as undefined === "don't use this")
	if (typeof attributes.beforeText !== 'string' && attributes.beforeText !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'beforeText': "${attributes.beforeText}".`);
		delete attributes.beforeText;
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
		beforeTextNode.setAttribute('data-fieldlabelfor', this.id);
	}


	// # 'afterText'

	//if 'afterText' is neither a string nor undefined then complain and delete it
		//this attribute has to be a string but undefined is valid too (as undefined === "don't use this")
	if (typeof attributes.afterText !== 'string' && attributes.afterText !== undefined) {
		console.warn(`[MPO] inputfield_FieldObject() received a non-string as 'afterText': "${attributes.afterText}".`);
		delete attributes.afterText;
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
		afterTextNode.setAttribute('data-fieldlabelfor', this.id);
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
			item.setAttribute('data-fieldlabelfor', this.id);
			return false;
		}
	});

	//if it's an empty array then delete the property to remove clutter
	if (attributes.labels.length === 0) {
		delete attributes.labels;
	}


	// # 'HTMLAttributes'

	//set all 'HTMLAttributes'
	if (typeof attributes.HTMLAttributes === 'object') {
		for (key in attributes.HTMLAttributes) {

			//if it's an internally used attribute then complain about it but still apply it
				//mainly because we can't stop the user from applying a "forbidden" attribute afterwards (not without serious draw-backs at least)
				//so why not already allow it during the elements creation? this way we can at least warn them about it
			if (['data-fieldid', 'data-holdsvalue', 'data-fieldlabelfor'].indexOf(key) !== -1) {
				console.warn(`[MPO] inputfield_FieldObject() received a troubling value while parsing 'HTMLAttributes' for input-field "${this.id}". "${key}" is already used by input-field themselves, the value will still be applied but things may break.`);
			}

			//actually apply it to the element
			specifics.elem.setAttribute(key, attributes.HTMLAttributes[key]);
		}

	//if it's not an object then delete it
	} else {

		//complain if necessary
		if (attributes.HTMLAttributes !== undefined) {
			console.warn(`[MPO] inputfield_FieldObject() received a non-object as 'HTMLAttributes': `, attributes.HTMLAttributes);
		}

		delete attributes.HTMLAttributes;
	}



	// === SETTING THE ACTUAL PROPERTIES ===

	//if the function got this far then it has to be `true`
	this.setup = true;

	//set 'id'
		//already set at the beginning

	//set 'fieldType'
	this.fieldType = specifics.fieldType;

	//set 'variation'
		//if no variation has been specified then get the default one
	this.variation = attributes.variation;

	//set 'value'
		//if it's a form then set it to an empty object - otherwise set it to the value specified
	this.value = (specifics.fieldType === 'form') ? {} : attributes.value;

	//set 'displayedValue'
		//this will always be the same as 'value' when starting out
	this.displayedValue = this.value;

	//set 'nullValue'
	this.nullValue = inputfield_getDefaultValue(this.fieldType);

	//set 'attributes'
	this.attributes = attributes;

	//set 'belongsToHost'
		//has been defined alongside the 'host' and 'defaultValue' attributes

	//set 'tag'
		//has been defined during the 'tag' attribute

	//set 'propertyChanged' if it's a form
		//always defaults to an empty string
	if (this.fieldType === 'form') {
		this.propertyChanged = '';
	}

	//set 'belongsToForm'
		//if it's not an array then use an empty array
	if (Array.isArray(attributes.forms) === true) {
		this.belongsToForm = attributes.forms;
	} else {
		this.belongsToForm = [];
	}

	//set 'startingValue'
		//set alongside 'defaultValue'

	//set 'observers'
		//already set near the start of this function
}

/**	Creates a 'HostObject' that saves all info related to a host.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				host [String]
 * 					The host string.
 *
 * 				childList [Array] <optional>
 * 					A list of all DOM elements that belong to the host. Has to be DOM elements, not strings!
 * 					Defaults to creating an empty array.
 *
 * 				attributes [Object] <optional>
 * 					Includes the following attributes:
 *
 * 						defaultValue [*any*] <undefined>
 * 							The default value the host should have.
 * 							This will also be the value the host starts out with.
 *
 * 						tag [String] <'host'>
 * 							The tag of the host. See the 'tag' attribute for more info.
 * 							Uses the tag of the first child and then simply 'host' if no tag is specified.
 *
 * 						onchange [Function] <optional>
 * 							The function that gets executed when the value changes. Will default to not doing anything.
 *
 * 						forms [Array/DOM Element/String] <optional>
 * 							The form element it should be added to. Can be either the DOM element of the form or it's ID (can be in string-form, so 6 and '6' are both fine).
 * 							Use the DOM element if it's inside a DocumentFragment or other places that are "hidden".
 * 							Can also be an array consisting of multiple DOM elements/field-IDs.
 *
 * 						formsAdd [Array/DOM Element/String] <optional>
 * 							The 'formsAdd' attribute.
 *
 * 						formsRemove [Array/DOM Element/String] <optional>
 * 							The 'formsRemove' attribute.
 *
 * 	Constructs:
 * 		childList [Array]
 * 			A list of all input-field IDs that belong to the host.
 * 			All array entries are strings.
 *
 * 		value [*any*]
 * 			The value that it holds. Can be any type but will likely be a string.
 * 			See 'pendingUpdate' below for more info.
 *
 * 		pendingUpdate [Object]
 * 			The host won't update it's children with a new value immediately, instead it uses a 0ms 'setTimeout()' to update them as soon as everything else is done.
 * 			This is done in case the value is changed multiple times in quick succession to avoid updating every single child every time.
 * 			It's also needed when the website is created in case some of it's children are still in a DocumentFragment and can't be found until the site is fully loaded.
 *
 * 			This object contains the following properties:
 *
 * 				timeoutID [String]
 * 					The ID from a 'setTimeout()'.
 *
 * 				arguments [Object]
 * 					The arguments that are used to call 'updateHostsChildren()'.
 * 					Does not include the 'DOMTree' & 'executeImmediately' arguments.
 *
 * 		tag [String]
 * 			The tag of the input-field. Only needed for hosts that are part of a form.
 * 			If no tag was specified then this will be the host's name. This will always be a string.
 * 			If you specifically need the value from the user then use 'attributes.tag', that one will be `undefined` if nothing was specified.
 *
 * 		belongsToForm [Array]
 * 			A list of all forms this belongs to. Is an array consisting of DOM elements.
 *
 * 		attributes [Object]
 * 			A list of all attributes. All attributes are listed above under 'Args'.
 */
function inputfield_HostObject (specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_HostObject() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//return if the host isn't a string
	if (typeof specifics.host !== 'string') {
		console.warn(`[MPO] inputfield_HostObject() received a non-string as 'host': `, specifics.host);
		return;
	}

	//replace 'attributes' with a empty object if it isn't already an object
	if (typeof specifics.attributes !== 'object') {
		specifics.attributes = {};
	}


	//for quick access
	let attributes = specifics.attributes;



	// === VERIFY ATTRIBUTES ===


	// # 'tag'

	//if it's not a string then delete it
	if (typeof attributes.tag !== 'string') {

		//complain if necessary
		if (attributes.tag !== undefined) {
			console.warn(`[MPO] inputfield_HostObject() received a non-string as 'tag': `, attributes.tag);
		}

		delete attributes.tag;
	}

	//set the 'tag' property
		//use a default tag if no tag has been specified
	if (typeof attributes.tag === 'string') {
		this.tag = attributes.tag;
	} else {
		this.tag = specifics.host;
	}


	// # 'onchange'

	//complain and delete if it's not a function
	if (typeof attributes.onchange !== 'function' && attributes.onchange !== undefined) {
		console.warn(`[MPO] inputfield_HostObject() received a non-function as 'onchange': `, attributes.onchange);
		delete attributes.onchange;
	}


	// # 'defaultValue'

	//nothing has to be done here, any value is valid on a host
		//I guess `undefined` would be one "invalid" value but what are we gonna do about it? delete it? so it's undefined again?


	// # 'forms'
	// # 'formsAdd'
	// # 'formsRemove'
		//has to be done after 'defaultValue'

	//verify and apply it
	attributes.forms = inputfield_verifyFormAttributes({
		forms      : attributes.forms      ,
		formsAdd   : attributes.formsAdd   ,
		formsRemove: attributes.formsRemove,
		name : specifics.host        ,
		tag  :      this.tag         ,
		value: specifics.defaultValue,
		belongsToForm: [],
		fieldOrHost: 'host'
	});

	//delete if it's an empty array
	if (attributes.forms.length === 0) {
		delete attributes.forms;
	}

	//always delete 'formsAdd' and 'formsRemove' because they're "relative" attributes and are supposed to be empty
	delete attributes.formsAdd   ;
	delete attributes.formsRemove;



	// === VERIFY PROPERTIES ===


	// # 'childList'

	//set the 'childList' to an empty array if it hasn't been defined yet
	specifics.childList ??= [];

	//if it's not an array then make it one
	if (Array.isArray(specifics.childList) !== true) {
		specifics.childList = [specifics.childList];
	}

	//remove all invalid array entries and replace the <input-field> element with their IDs
		//see 'removeEachIf()' in 'helpers.js'
	specifics.childList.removeEachIf((item, index) => {

		//remove all entries that aren't an <input-field> element
		if (Object.isDOMElement(item) !== true || item.tagName !== 'INPUT-FIELD') {
			console.warn(`[MPO] inputfield_HostObject() found a non-<input-field> inside the 'childList' array (at index "${index}"): `, item);
			return true;
		}

		//get the FieldObject
		let fieldObj = inputfield_getFieldObject(item, {skipSetupCheck: true});

		//remove the entry if the FieldObject couldn't be found
		if (typeof fieldObj?.id !== 'string') {
			console.warn(`[MPO] inputfield_HostObject() found an invalid <input-field> element inside the 'childList' array (could not get it's ID - at index "${index}"): `, item);
			return true;
		}

		//set the array entry to it's ID
		item = fieldObj.id;
	});



	// === SETTING THE ACTUAL PROPERTIES ===

	//set the list of children
	this.childList = specifics.childList;

	//set the defaultValue
		//note that if it hasn't been specified then it'll be undefined which is what we need then anyway
	this.value = specifics.defaultValue;

	//set 'pendingUpdate'
		//use default arguments
	this.pendingUpdate = {
		timeoutID: '',
		arguments: {
			updateAttributes: false,
			updateSpecificFields: []
		}
	};

	//set attributes
	this.attributes = attributes;

	//set 'tag'
		//has been defined during the 'tag' attribute

	//set 'belongsToForm'
		//if it's not an array then use an empty array
	if (Array.isArray(attributes.forms) === true) {
		this.belongsToForm = attributes.forms;
	} else {
		this.belongsToForm = [];
	}
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
	specifics.labelElem.setAttribute('data-fieldlabelfor', this.labelForFieldID);
}

/**	Verifies and applies the 'forms', 'formsAdd', 'formsRemove' attribute.
 *
 * 	Note that this also applies the attributes, meaning the element specified will get properly added to/removed from all forms.
 *
 * 	Args:
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				target [*any*]
 * 					The input-field or host.
 * 					Will be added to all forms automatically.
 * 					Can be ignored if the individual arguments are given (see below).
 *
 * 				fieldOrHost [String]
 * 					Whether it's a input-field or a host.
 * 					Can be either 'field' or 'host'.
 *
 * 				forms [Array/DOM Element/String]
 * 					A list of all forms it should be apart of.
 * 					This is a definitive list. If the input-field is part of froms that aren't included here then it will be removed from those.
 *
 * 					Can be either the DOM element of the form or it's ID.
 * 					Can also be an array consisting of those.
 *
 * 				formsAdd [Array/DOM Element/String]
 * 					A list of forms the input-field should be added to.
 * 					If the same form is specified in both 'formsAdd' and 'formsRemove' then nothing will happen, it will neither be added nor removed to the form.
 *
 * 				formsRemove [Array/DOM Element/String]
 * 					A list of forms the input-field should be removed from.
 * 					If the same form is specified in both 'formsAdd' and 'formsRemove' then nothing will happen, it will neither be added nor removed to the form.
 *
 *
 * 				// if 'target' is ignored then use the following properties instead:
 *
 * 				name [String] <optional>
 * 					Either an input-field's ID or a host's name.
 * 					If this isn't present it will be taken from the 'target' instead.
 *
 * 				tag [String] <optional>
 * 					The input-field's or host's tag.
 * 					If this isn't present it will be taken from the 'target' instead.
 *
 * 				value [*any*] <optional>
 * 					The input-field's or host's value.
 * 					If this isn't present it will be taken from the 'target' instead.
 *
 * 				belongsToForm [Array] <optional>
 * 					The already existing 'belongsToForm' property of the input-field/host.
 * 					If this isn't present it will be taken from the 'target' instead.
 *
 * 	Returns [Array]:
 * 		Will be an empty array if something went wrong (or if no entries were valid). See console for warnings.
 * 		Otherwise it will return an array that represents the 'forms' attribute.
 */
function inputfield_verifyFormAttributes (specifics) {
	//complain and return if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_verifyFormAttributes() received a non-object as 'specifics': "${specifics}".`);
		return [];
	}

	//complain and return if 'fieldOrHost' is invalid
	if (['field', 'host'].indexOf(specifics.fieldOrHost) === -1) {
		console.warn(`[MPO] inputfield_verifyFormAttributes() received a invalid 'fieldOrHost': "${specifics.fieldOrHost}" (can either be 'field' or 'host').`);
		return [];
	}



	// === GET THE FieldObject OR HostObject ===


	//this will either be the FieldObject or the HostObject
	let targetObj;

	//if 'target' was provided then try to get the FieldObject or HostObject
	if (typeof specifics.target === 'string' || (Object.isDOMElement(specifics.target) && specifics.target.tagName === 'INPUT-FIELD')) {

		//get the FieldObject if it's a field
		if (specifics.fieldOrHost === 'field') {
			targetObj = inputfield_getFieldObject(specifics.target);

			//if the FieldObject could be found then look at it
			if (targetObj !== null) {

				//if it's part of a host then shift focus towards that instead
				if (typeof targetObj.belongsToHost === 'string') {
					specifics.fieldOrHost = 'host';
					specifics.target = targetObj.belongsToHost;

				//if it isn't part of a host then fill in any arguments that aren't already present
				} else {
					specifics.name          ??= targetObj.id           ;
					specifics.tag           ??= targetObj.tag          ;
					specifics.value         ??= targetObj.value        ;
					specifics.belongsToForm ??= targetObj.belongsToForm;
				}
			}

		}

		//get the HostObject if it's a host
			//note that this should NOT be a 'else if {}' because this can also apply if a input-field belonged to a host
		if (specifics.fieldOrHost === 'host') {
			targetObj = inputfield_getHostObject(specifics.target);

			//if the HostObject was found then fill in any arguments that aren't already present
			if (targetObj !== null) {
				specifics.name          ??= specifics.target       ;
				specifics.tag           ??= targetObj.tag          ;
				specifics.value         ??= targetObj.value        ;
				specifics.belongsToForm ??= targetObj.belongsToForm;
			}
		}
	}

	//complain and return if 'name' isn't a string
	if (typeof specifics.name !== 'string') {
		console.warn(`[MPO] inputfield_verifyFormAttributes() received a non-string as 'name': `, specifics.name, ` - It's possible this value was taken from the FieldObject/HostObject if it wasn't provided.`);
		return [];
	}

	//complain and return if 'tag' isn't a string
	if (typeof specifics.tag !== 'string') {
		console.warn(`[MPO] inputfield_verifyFormAttributes() received a non-string as 'tag': `, specifics.tag, ` - It's possible this value was taken from the FieldObject/HostObject if it wasn't provided.`);
		return [];
	}

	//complain and return if 'value' is undefined
		//but allow it if it's a host since hosts can have `undefined` as a value
	if (specifics.value === undefined && specifics.fieldOrHost !== 'host') {
		console.warn(`[MPO] inputfield_verifyFormAttributes() received a undefined 'value': `, specifics.value, ` - It's possible this value was taken from the FieldObject/HostObject if it wasn't provided.`);
		return [];
	}

	//complain and return if 'belongsToForm' isn't a string
	if (Array.isArray(specifics.belongsToForm) !== true) {
		console.warn(`[MPO] inputfield_verifyFormAttributes() received a non-array as 'belongsToForm': `, specifics.belongsToForm, ` - It's possible this value was taken from the FieldObject/HostObject if it wasn't provided.`);
		return [];
	}



	// === PARSE THE ATTRIBUTES ===

	//if 'formsAdd' is nullish then replace it with an array
	specifics.formsAdd ??= [];

	//if it's still not an array then add it to an empty array
	if (Array.isArray(specifics.formsAdd) !== true) {
		specifics.formsAdd = [specifics.formsAdd];
	}


	//if 'formsRemove' is nullish then replace it with an array
	specifics.formsRemove ??= [];

	//if it's still not an array then add it to an empty array
	if (Array.isArray(specifics.formsRemove) !== true) {
		specifics.formsRemove = [specifics.formsRemove];
	}


	//make sure 'forms' is an array (unless it's null or undefined)
	if (Array.isArray(specifics.forms) !== true) {

		//if it's undefined then replace it with an array...
		if (specifics.forms === undefined || specifics.forms === null) {
			specifics.forms = null;

		//...otherwise add it to an empty array
		} else {
			specifics.forms = [specifics.forms];
		}
	}


	//return if all of them are empty
		//but no complaining because the point of this function is to verify these attributes and, by all means, empty attributes are valid!
	if (specifics.formsAdd.length === 0 && specifics.formsRemove.length === 0 && specifics.forms === null) {
		return [];
	}



	// === APPLY THE ATTRIBUTES ===

	//get the 'belongsToForm' property
	let belongsToForm = [...new Set(specifics.belongsToForm)];

	//for quick access
		//convert it to a set and then back into an array
		//this removes all duplicate values
	let forms;
	let formsAdd    = [...new Set(specifics.formsAdd   )];
	let formsRemove = [...new Set(specifics.formsRemove)];

	//if no 'forms' attribute was specified then set it to the current 'forms' attribute (which is 'belongsToForm')
	if (specifics.forms === null) {
		forms = belongsToForm;

	//if 'forms' was specified then remove duplicates and then split it into 'formsRemove' & 'formsAdd'
	} else {
		forms = [...new Set(specifics.forms)];

		//add all entries to 'formsRemove' that are in 'belongsToForm' but not in the 'forms' argument
		for (const item of belongsToForm) {
			if (forms.indexOf(item) === -1) {
				formsRemove.push(item);
			}
		}

		//add all 'forms' entries to 'formsAdd'
		formsAdd = formsAdd.concat(forms);
	}


	//convert all IDs to DOM elements for 'formsAdd'
		//this has to be done now so 'formsRemove' can properly check against this to actually remove duplicates
	formsAdd.removeEachIf((item, index) => {
		if (typeof item === 'string' || item?.tagName === 'INPUT-FIELD') {
			item = inputfield_getElement(item);
		}
	});


	//apply 'formsRemove'
	formsRemove.removeEachIf((item, index) => {

		//convert the item to a DOM element
		if (typeof item === 'string' || item?.tagName === 'INPUT-FIELD') {
			item = inputfield_getElement(item);
		}

		//remove array item in both if it also exists in 'formsAdd'
		const indexOf = formsAdd.indexOf(item);
		if (indexOf !== -1) {
			formsAdd.splice(indexOf, 1);
			return true;
		}

		//get the FieldObject from the form...
		let formObj = inputfield_getFieldObject(item);

		//...and then check if it exists
			//if not, complain and remove the item
		if (formObj === null) {
			console.warn(`[MPO] inputfield_verifyFormAttributes() received a invalid input-field for 'formsRemove' (couldn't get the FieldObject - at index "${index}"): `, item, ` - Item could have been added from the 'forms' attribute.`);
			return true;
		}

		//remove this item from 'forms'
			//but only if it's actually there
		const formsIndex = forms.indexOf(item);
		if (formsIndex !== -1) {
			forms.splice(formsIndex, 1);
		}
	});

	//apply 'formsAdd'
	formsAdd.removeEachIf((item, index) => {

		//get the FieldObject from the form
		let formObj = inputfield_getFieldObject(item);

		//and then check if it exists
			//if not, complain and remove the item
		if (formObj === null) {
			console.warn(`[MPO] inputfield_verifyFormAttributes() received a invalid input-field for 'formsAdd' (couldn't get the FieldObject - at index "${index}"): `, item, ` - Item could have been added from the 'forms' attribute.`);
			return true;
		}

		//add this item to 'forms'
			//but only if it isn't already there
		const formsIndex = forms.indexOf(item);
		if (formsIndex === -1) {
			forms.push(item);
		}

		//add the value to the form
			//'onchange' and the host will be called by this which is intended as they might rely on the new property
		inputfield_applyNewValue(item, specifics.value, {formProperty: specifics.tag});
	});

	return forms;
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

	//setup the actual input-field (see 'inputfield_setupField()')
	container.setup({
		fieldType: fieldType,
		variation: attributes.variation,
		attributes: attributes
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
 * 				forceSetup [Boolean] <false>
 * 					Only needed if the input-field has to be remade.
 * 					If `true` the input-field will be setup again, even if it was already setup.
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
		console.warn(`[MPO] <input-field>.setup(): A FieldObject wasn't already made for the following input-field (this is likely an internal error):`);
		console.warn(this);

	//if the FieldObject does exist...
	} else {

		//...then check if it's already been setup; return if it's already setup
			//skip this if 'forceSetup' is true
		if (fieldObj.setup === true && specifics.forceSetup !== true) {
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

	//get fieldType
	let fieldType = specifics.fieldType;

	//if 'fieldType' is invalid then get it from the <input-field> element
	if (typeof fieldType !== 'string') {
		fieldType = this.getAttribute('type');
	}

	//complain and return if no 'fieldType' was specified
	if (typeof fieldType !== 'string') {
		console.error(`[MPO] <input-field>.setup() could not setup the following input-field as no type was specified (make sure to always setup a <input-field> element by calling '.setup()' on it or by using a 'type' HTML attribute): `, this);
		return this;
	}

	//this checks if a variation is present in the following order: 'specifics.variation' -> 'attributes.variation' -> '<input-field>.variation'
		//if one is not present then the next is applied

		//Why this order?
			//I'd say chances are highest that 'specifics.variation' has the highest chance of being entered on purpose.
			//'attributes' might just be copied over from a different field (hell, 'inputfield_changeAttribute()' does this)

	//use 'specifics.variation' if available
	if (typeof specifics.variation === 'string') {
		attributes.variation = specifics.variation;

	//else use 'attributes.variation'
	} else {

		//if 'attributes.variation' isn't valid either then use '<input-field>.variation'
		if (typeof attributes.variation !== 'string') {
			attributes.variation = this.getAttribute('variation');
		}
	}



	// === CONSTRUCT THE ELEMENT ===

	//delete all children of the element
		//important in case the input-field is "reset"
		//this technically replaces children but since we don't provide any arguments it simply deletes them instead
	this.replaceChildren();

	//create a FieldObject
		//note that technically one was already made but that one was made using `setup: false` which means it didn't do much so now we're overwriting that one
	fieldObj = new inputfield_FieldObject({
		elem: this,
		fieldType: fieldType,
		attributes: attributes
	});

	//if the FieldObject still isn't setup then something went wrong
	if (fieldObj.setup !== true) {
		console.warn(`[MPO] <input-field>.setup() couldn't setup the input-field "${fieldObj.id}" as something unexpected went wrong. Chances are more warnings got logged to the console. It can happen that more errors appear after this with high IDs, that's because it could be attempting to re-setup this input-field which causes it to get a new ID each time.`);
		return this;
	}

	//apply the new type & variation after it's been parsed by 'inputfield_FieldObject()'
	fieldType = fieldObj.fieldType;
	variation = fieldObj.variation;

	//and add the FieldObject to 'inputfield_fields'
	inputfield_fields.set(this, fieldObj);

	//construct the <input-field> element
	inputfield_variations.get(`${fieldType}-${variation}`).constructor(this, fieldObj, fieldObj.id, attributes);



	// === APPLY THE STARTING VALUE ===
	inputfield_setValue(this, fieldObj.startingValue, {skipOnchange: true, forceInvalidValue: true});

	//and delete the 'startingValue'
	delete fieldObj.startingValue;



	// === FINISHING TOUCHES ===

	//return the element
	return this;
}

/**	Sets up a input-field host.
 *
 * 	Only really creates the WeakMap entry but that's all that's needed.
 *
 * 	Args:
 *		host [*any*]
 * 			The host.
 *
 * 		specifics [Object]
 * 			Includes the following properties:
 *
 * 				childList [Array] <optional>
 * 					A list of all DOM elements that belong to the host. Has to be DOM elements, not strings!
 * 					Defaults to creating an empty array.
 *
 * 				tag [String] <'host'>
 * 					The tag of the host. See the 'tag' attribute for more info.
 * 					Uses the tag of the first child and then simply 'host' if no tag is specified.
 *
 * 				defaultValue [*any*] <undefined>
 * 					The default value the host should have.
 * 					This will also be the value the host starts out with.
 *
 * 				onchange [Function] <optional>
 * 					The function that gets executed when the value changes. Will default to not doing anything.
 *
 * 				forms [Array/DOM Element/String] <optional>
 * 					The form element it should be added to. Can be either the DOM element of the form or it's ID (can be in string-form, so 6 and '6' are both fine).
 * 					Use the DOM element if it's inside a DocumentFragment or other places that are "hidden".
 * 					Can also be an array consisting of multiple DOM elements/field-IDs.
 *
 * 				formsAdd [Array/DOM Element/String] <optional>
 * 					The 'formsAdd' attribute.
 *
 * 				formsRemove [Array/DOM Element/String] <optional>
 * 					The 'formsRemove' attribute.
 *
 * 	Returns [null / HostObject]:
 * 		The 'HostObject' object or `null` if something went wrong.
 */
function inputfield_setupHost (host, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] modal_ModalObject() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//if the host specified is nullish then complain and return
	if (typeof host !== 'string') {
		console.warn(`[MPO] inputfield_setupHost() received a non-string as 'host' (only strings are allowed): "${host}".`);
		return null;
	}

	//create the HostObject
	const hostObj = new inputfield_HostObject({
		host: host,
		childList: specifics.childList,
		attributes: {
			onchange: specifics.onchange,
			tag: specifics.tag,
			defaultValue: specifics.defaultValue,
			forms: specifics.forms,
			formsAdd: specifics.formsAdd,
			formsRemove: specifics.formsRemove
		}
	});

	//apply the HostObject to the Map
	inputfield_hosts.set(host, hostObj);

	return hostObj;
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
	if (hostElem !== null) {
		const hostObj = inputfield_getHostObject(hostElem);

		//return null if it can't be found
		if (hostObj === null) {
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
 * 				forceInvalidValue [Boolean] <false>
 * 					If `true` it will force an invalid value.
 * 					Note that the invalid value won't be displayed as that's impossible (if a string is force-applied to a number input-field then 0 will be displayed for example).
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

	//the value that should actually be displayed
		//usually the same as 'newValue'
	let displayedValue = newValue;

	//check if the value is even valid
	if (inputfield_validateValue(newValue, fieldObj) !== true) {

		//if an invalid value should be forced then set the displayed value to a 'nullValue' (usually 0, '', {} and that stuff)
		if (specifics.forceInvalidValue === true) {
			displayedValue = fieldObj.nullValue;
		} else {
			console.warn(`[MPO] inputfield_setValue() received an invalid value "${newValue}" for input-field "${fieldObj.id}".`);
			return false;
		}
	}

	//apply the new value
	inputfield_applyNewValue(containerElem, newValue, {
		skipOnchange: specifics.skipOnchange,
		updateHost: specifics.updateHost,
		displayedValue: displayedValue
	});

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

		//complain and return if it's not a 'FieldObject'
		if (specifics.field?.constructor !== inputfield_FieldObject) {
			console.warn(`[MPO] inputfield_validateValue() received a invalid 'field' argument. Returning \`false\`...`);
			return false;
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
			//this only checks whether it's an object or not for now, unsure if it should actually verify that each property is present
			if (typeof value === 'object') {
				return true;
			}
			return false;

		case 'checkbox':
			//if it's a Boolean or the 'checkboxValue' then it's correct
			if (typeof value === 'boolean' || value === attributes.checkboxValue) {
				return true;
			}
			return false;

		case 'radio':
			//loop through all the options to see if they have the same value
				//note that if it isn't iterable then the if block gets skipped and `false` is returned
			if (Object.isIterable(attributes.options) === true) {
				for (const item of attributes.options) {
					if (item.value === value) {
						return true;
					}
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
			//if it's `null` then it's correct
				//buttons should always be `null`
			if (value === null) {
				return true;
			}
			return false;

		case 'color':
			//with this the browser automatically checks whether the value is allowed for the 'color' CSS property
				//this means that anything from 'red' to '#ffffff' to 'rgba(0, 0, 0, 0)' will be true just like regular CSS
			return CSS.supports('color', value);

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
			if (Array.isArray(attributes?.options) === true) {
				return attributes.options[0]?.value ?? false;
			}
			return false;

		case 'text':
			return '';

		case 'number':
			return 0;

		case 'button':
			return null;

		case 'color':
			return '#000000';

		default:
			console.warn(`[MPO] Unknown 'fieldType' in 'inputfield_getDefaultValue()': "${fieldType}"`);
			break;
	}
	return null;
}

/**	Gets executed when a input field is changed.
 *
 * 	Gets the raw value of the input-field, then calls 'inputfield_applyNewValue()' so the new value is saved properly.
 * 	It's really just here to call 'inputfield_applyNewValue()' and nothing else
 *
 * 	Args:
 * 		fieldID [String/DOM Element]
 * 			The ID of the input-field or the <input-field> element.
 *
 * 		newValue [*any*]
 * 			The new value of the input-field.
 */
function inputfield_executedAfterFieldChange (fieldID, newValue) {
	//get the container element
	const containerElem = inputfield_getElement(fieldID);

	//return if container can't be found
	if (Object.isDOMElement(containerElem) !== true) {
		console.error(`[MPO] inputfield_executedAfterFieldChange(): Could not find container element with a 'fieldID' of "${fieldID}"`);
		return;
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
 * 				skipOnchange [Boolean] <false>
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
 *
 * 				displayedValue [*any*] <same as newValue>
 * 					The value that should actually be displayed.
 * 					Will be the same as 'newValue' on default.
 * 					Should not be used unless absolutely necessary.
 * 					If this is `undefined` then it'll be replaced by 'newValue'.
 */
function inputfield_applyNewValue (containerElem, newValue, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_applyNewValue() received a non-object as 'specifics': "${specifics}".`);
		specifics = {};
	}

	//complain and return if 'containerElem' isn't a <input-field> element
	if (containerElem.tagName !== 'INPUT-FIELD') {
		console.warn(`[MPO] inputfield_applyNewValue() received a invalid 'containerElem', it has to be a <input-field> element: `, containerElem);
		return;
	}

	//get the field object
	const fieldObj = inputfield_getFieldObject(containerElem);

	//complain and return if the field object couldn't be found
	if (fieldObj === null) {
		console.error('[MPO] inputfield_applyNewValue() could not get the \'FieldObject\' for this input-field (should be a <input-field> element): ', containerElem);
		return;
	}

	//get the host object
		//will be undefined if it doesn't exist
	const hostObj = inputfield_getHostObject(fieldObj.belongsToHost);



	//=== PARSE NEW VALUE & 'displayedValue' ===

	//parse 'checkboxValue' if it's a checkbox
	if (fieldObj.fieldType === 'checkbox') {

		//get 'checkboxValue'
		const checkboxValue = fieldObj.attributes.checkboxValue;

		//if the new value is `true` (or equal to 'checkboxValue') then update both 'newValue' and 'displayedValue' to be accurate
			//the new value has to be equal to 'checkboxValue'
			//while 'displayedValue' has to be a boolean
		if (newValue === true || newValue === checkboxValue) {
			newValue = checkboxValue;

			//if 'displayedValue' is equal to 'checkboxValue' then replace it with `true`
				//do the same if it's undefined
			if (specifics.displayedValue === checkboxValue || specifics.displayedValue === undefined) {
				specifics.displayedValue = true;
			}
		}
	}

	//use 'newValue' if 'displayedValue' isn't specified
	if (specifics.displayedValue === undefined) {
		specifics.displayedValue = newValue;
	}



	//=== SET NEW VALUE TO 'fieldObj' ===

	//if 'formProperty' is specified then only update the property
	if (specifics.formProperty !== undefined && typeof fieldObj.value === 'object') {

		//update the property
		fieldObj.value[specifics.formProperty] = newValue;

		//also set the 'propertyChanged' property
		fieldObj['propertyChanged'] = specifics.formProperty;

	//otherwise simply set the new value & the displayed value to the fieldObj directly
	} else {
		fieldObj.         value =                 newValue;
		fieldObj.displayedValue = specifics.displayedValue;
	}



	//=== UPDATE THE DISPLAY ===

	//set the raw value to make sure the correct value is actually displayed (especially important for radio-fields)
	if (specifics.skipSetRawValue !== true) {
		inputfield_variations.get(`${fieldObj.fieldType}-${fieldObj.variation}`).setRawValue(containerElem, fieldObj, specifics.displayedValue);
	}



	//=== UPDATE HOST ===

	//update all other fields that belong to the host
		//but only if the host should be updated
		//and only if a host even exists
	if (specifics.updateHost !== false && hostObj !== null) {

		//set the new value
			//'updateHostsChildren()' will always take this value, even if a pending update is already on it's way
		hostObj.value = newValue;

		//update all input-fields that belong to the host
		inputfield_updateHostsChildren(fieldObj.belongsToHost, {
			//DOMTree: containerElem.getRootNode(),
			executeImmediately: false
		});
	}



	//=== EXECUTE 'onchange' FUNCTION ===

	//execute the 'onchange' function (unless it should be skipped)
	if (specifics.skipOnchange !== true) {

		//get the 'onchange' function
			//if a host is used then get the 'onchange' function from that
		const onchangeFunction = (hostObj !== null) ? hostObj.attributes.onchange : fieldObj.attributes.onchange;

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
	const belongsToForm = (hostObj !== null) ? hostObj.belongsToForm : fieldObj.belongsToForm;

	//apply the new value to all forms (if it even belongs to a form)
		//note that this HAS to be done after the 'onchange' bit because the 'onchange' function for the individual field should be executed before the 'onchange' function of the form
	if (belongsToForm.length > 0) {

		//get the tag that should be used inside the form (if host is present then take it from there)
		const formTag = (hostObj !== null) ? hostObj.tag : fieldObj.tag;

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
	const fieldElem = inputfield_getElement(labelElem.getAttribute('data-fieldlabelfor'));

	//get the field object
	const fieldObj = inputfield_getFieldObject(fieldElem);

	//return and complain if the field couldn't be found
	if (typeof fieldObj !== 'object') {
		console.warn(`[MPO] inputfield_executedAfterLabelPress() couldn't find the input-field "${labelElem.getAttribute('data-fieldlabelfor')}" while processing a label event.`);
		return;
	}

	//get the field-type
	const fieldType = fieldObj.fieldType;

	//get a "type-variation" string (like 'checkbox-regular')
	const fieldTypeAndVariation = `${fieldType}-${fieldObj.variation}`;

	//get the action
		//if no 'LabelObject' exists then use the default action
	const action = labelObj?.action ?? 'click';

	//get the actual input element
	const actualElem = inputfield_variations.get(fieldTypeAndVariation).getActualInputElement(fieldElem);

	//do different things if it's a radio field AND 'radioOption' has been used
		//if those are true then the label affects a specific radio option, not the radio field as a whole
	if (fieldType === 'radio' && labelObj !== undefined && labelObj.radioOption !== null) {

		//check and see if the object is iterable
		if (Object.isIterable(actualElem) !== true) {
			console.warn(`[MPO] inputfield_executedAfterLabelPress(): Can't iterate over the value returned by 'inputfield_variations.get("${fieldTypeAndVariation}").getActualInputElement()' (likely because it's not an Array when it should be one) for input-field ID "${fieldObj.id}".`);
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

/**	This updates all of the host's children to be up-to-date with the host.
 *
 * 	This loops through all of the host's children and does the following to each:
 * 		- Removes the input-field from the host if it can't be found (it will automatically be re-added once it can be found again).
 * 		- Applies all "behaviour attributes" to the input-field.
 * 		- Applies the host's value to the input-field.
 *
 * 	This does NOT apply anything to the host! This simply takes the host's values & attributes and applies them to it's children.
 *
 * 	Args:
 * 		host [String]
 * 			The host.
 *
 * 		specifics [Object] <optional>
 * 			A object of optional specifics about how the input-field should be gotten.
 *
 * 				executeImmediately [Boolean] <true>
 * 					If `true` it will immediately update the host.
 * 					If `false` it will instead use a 0ms 'setTimeout()' to execute it.
 *
 * 				updateAttributes [Boolean] <true>
 * 					Whether attributes should be updated as well.
 *
 * 					The value will always be updated because it's quicker that way.
 *
 * 				updateSpecificFields [Array] <undefined>
 * 					If present it will only update these input-fields.
 * 					Has to be an array consisting of input-field IDs (not DOM elements!).
 * 					This array will not be verified in any way whatsoever. Any invalid entry will be ignored and if it's not an array then it's the same as `undefined`.
 * 					That said, it will always be checked whether an input-field is even a part of the host regardless of this argument.
 */
function inputfield_updateHostsChildren (host, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_updateHostsChildren() received a non-object as 'specifics': `, specifics);
		specifics = {};
	}

	//get the host object
	const hostObj = inputfield_getHostObject(host);

	//complain and return if it doesn't exist
	if (hostObj === null) {
		console.error(`[MPO] inputfield_updateHostsChildren() couldn't find the HostObject for the following host: `, host);
		return;
	}

	//complain and return if it's not an array
	if (Array.isArray(hostObj.childList) !== true) {
		console.error(`[MPO] inputfield_updateHostsChildren() found a non-array as 'childList' on the following HostObject: `, hostObj, ` - host: `, host);
		return;
	}

	//if 'updateSpecificFields' is a string then add it to an empty array
	if (typeof specifics.updateSpecificFields === 'string') {
		specifics.updateSpecificFields = [specifics.updateSpecificFields];
	}



	// === GET HOST'S ARGUMENTS ===
		//We have to respect both the arguments that this function got called with and the arguments specified in the host.
		//That means we have to combine the two and keep the "higher priority" values.
		//If one says that attributes have to be updated and the other says they shouldn't then we update the attributes.
		//Because more can go wrong by not updating attributes rather than updating them even if we don't have to.

	//for quick access
	let hostArguments = hostObj.pendingUpdate.arguments;

	//set the host's 'updateAttributes' to `true` if either one is `true`
	if (hostArguments.updateAttributes !== true) {
		hostArguments.updateAttributes = specifics.updateAttributes;
	}

	//if 'updateSpecificFields' is an array in both arguments then combine the two
		//if it's not an array in any of the two then that means all fields will be updated
	if (Array.isArray(hostArguments.updateSpecificFields) === true && Array.isArray(specifics.updateSpecificFields) === true) {
		hostArguments.updateSpecificFields = hostArguments.updateSpecificFields.concat(specifics.updateSpecificFields);
	}

	//if it shouldn't be executed immediately then create the 0ms timeout
		//note that the host's arguments have already been updated
	if (specifics.executeImmediately === false) {

		//clear any existing timeouts in case there is one
		clearTimeout(hostObj.pendingUpdate.timeoutID);

		//and set a new one
		hostObj.pendingUpdate.timeoutID = setTimeout(() => {inputfield_updateHostsChildren(host);}, 0);
		return;
	}

	//fetch values from host
	specifics.updateAttributes     = hostArguments.updateAttributes    ;
	specifics.updateSpecificFields = hostArguments.updateSpecificFields;

	//reset the host's arguments back to defaults
		//'updateSpecificFields' is an empty array so it can be combined with other arrays
		//because the check above only combines 'updateSpecificFields' if both are arrays
	hostArguments.updateAttributes     = false;
	hostArguments.updateSpecificFields = [];

	//clear the timeout in case there's still one running
	clearTimeout(hostObj.pendingUpdate.timeoutID);

	//and reset the 'timeoutID'
	hostObj.pendingUpdate.timeoutID

	//if 'updateSpecificFields' is an empty array then set it to `undefined`
	if (specifics.updateSpecificFields?.length === 0) {
		specifics.updateSpecificFields = undefined;
	}



	// === UPDATE HOSTS CHILDREN ===

	//get the new value
	const newValue = hostObj.value;

	//get the new attributes
	const newAttributes = hostObj.attributes;

	//loop through all children
	hostObj.childList.removeEachIf((item, index) => {

		//check 'updateSpecificFields' to see if we can skip this input-field -- if it's in the array then skip it
			//we only check if '.indexOf()' is a function because it's a sane enough check and it's all we need for this anyway
		if (typeof specifics.updateSpecificFields?.indexOf === 'function' && specifics.updateSpecificFields.indexOf(item) === -1) {
			return;
		}

		//get the <input-field>
		const containerElem = inputfield_getElement(item);

		//get the FieldObject
		const fieldObj = inputfield_getFieldObject(containerElem);

		//remove the input-field if it's no longer available
		if (fieldObj === null) {
			console.log(`[MPO] inputfield_updateHostsChildren() removed input-field "${item}" from the host "${host}" as it couldn't be found (likely because it's outside the regular DOM tree, see the detailed documentation for the 'host' attribute for details).`);
			return true;
		}

		//update the attributes if necessary
		if (specifics.updateAttributes === true) {

			//loop through all attributes
			for (const key in newAttributes) {

				//update the value
					//don't have to check whether the value is the same because it's just replacing a property so it's probably faster not to check
				fieldObj.attributes[key] = newAttributes[key];

				//if 'forms' is updated then also update the 'belongsToForm' property
				if (key === 'forms') {
					fieldObj.belongsToForm = newAttributes.forms;

				//if 'tag' is updated then also update the 'tag' property
				} else if (key === 'tag') {
					fieldObj.tag = newAttributes.tag;
				}
			}
		}

		//if the input-field doesn't have the same value then update that
		if (fieldObj.value !== newValue) {

			//check if the new value is valid; if it is then use the new value, otherwise use the 'nullValue' as the 'displayedValue'
			if (inputfield_validateValue(newValue, {field: fieldObj}) === true) {
				inputfield_applyNewValue(containerElem, newValue, {skipOnchange: true, updateHost: false});
			} else {
				//use 'nullValue' for the displayed value because if the current value isn't valid then it can't be displayed (like a string for a number-field)
				inputfield_applyNewValue(containerElem, newValue, {skipOnchange: true, updateHost: false, displayedValue: fieldObj.nullValue});
			}
		}
	});
}

/**	Changes and applies attributes for a input-field.
 *
 * 	Can be called as `changeAttribute(field, 'checkboxValue', true)` to change a single attribute.
 * 	Can be called as `changeAttribute(field, {checkboxValue: true})` to change multiple attributes.
 *
 * 	The 'host' attribute will always be checked before any other attribute.
 *
 * 	Args:
 * 		field [DOM Element/String]
 * 			The input-field. Can be the DOM element itself or it's input-field ID.
 *
 * 		attributes [Object/String]
 * 			An object containing all new attributes.
 *
 * 			Alternatively this can be the attribute name [String] and use 'newValue'.
 *
 * 		newValue [*any*] <optional>
 * 			The new value of the attribute. Only needed if 'attributes' is a string.
 *
 * 	Returns [Boolean]:
 * 		`true` if successful, `false` if not.
 */
function inputfield_changeAttribute (field, attributes, newValue) {
	//get the actual field element
	field = inputfield_getElement(field);

	//get field-object
	let fieldObj = inputfield_getFieldObject(field);

	//complain and return if the field-object couldn't be found
	if (fieldObj === null) {
		console.warn(`[MPO] inputfield_changeAttribute() received a invalid 'field': `, field);
		return false;
	}

	//if 'attributes' is a string then add it to an empty object
	if (typeof attributes === 'string') {
		//'Object.fromEntries()' creates a object from with an array of "key-value" pairs
			//the first array includes a full list of all properties that should be made (which is just 1 here)
			//the second array is the "key-value" pair; first entry is the property-name, second entry is the value it should have
		attributes = Object.fromEntries([[attributes, newValue]]);
	}



	// === PREPARE FOR HOST AND UPDATE & APPLY THE 'host' ATTRIBUTE ===
		//all of these variables should only be used if the attribute has to be changed on the host
		//because these variables will automatically point to either the input-field or the host depending on which one has to be updated

	//the target (either the input-field or the host)
	let target;

	//either a FieldObject or a HostObject
	let targetObj;

	//whether we're updating a input-field or a host
		//is either 'field' or 'host'
	let fieldOrHost = 'field';


	//change the host immediately if it was changed
	if (attributes.host !== undefined) {
		const newHost = attributes.host;

		//complain if it's invalid
		if (typeof newHost !== 'string' && newHost !== null) {
			console.warn(`[MPO] inputfield_changeAttribute() received a invalid value for 'host' (has to be either a string or undefined/null): `, newValue);

		//if it's valid then continue updating the attribute
		} else {

			//unlink the current host
				//but only if the input-field already belongs to a host and if the new host is a different host
			if (typeof fieldObj.belongsToHost === 'string' && fieldObj.belongsToHost !== newHost) {

				//get the HostObject
				let hostObj = inputfield_getHostObject(fieldObj.belongsToHost);

				//if the HostObject could be found...
				if (hostObj !== null) {

					//...then remove the input-field from the host's 'childList', but only if it's already in there
					const hostChildIndex = hostObj.childList.indexOf(fieldObj.id);
					if (hostChildIndex !== -1) {
						hostObj.childList.splice(hostChildIndex, 1);
					}
				}
			}

			//link the new host (if one was specified)
			if (typeof newHost === 'string') {

				//get the new HostObject
				let newHostObj = inputfield_getHostObject(newHost);

				//if the HostObject doesn't exist yet then create it
				if (newHostObj === null) {
					newHostObj = inputfield_setupHost(newHost, {
						childList   : [field],
						defaultValue: fieldObj.attributes.defaultValue,
						tag         : fieldObj.attributes.tag,
						onchange    : fieldObj.attributes.onchange,
						forms       : fieldObj.attributes.forms
					});

				//if a HostObject already exists then add it and take it's value & attributes
				} else {

					//add it to it's 'childList'
					newHostObj.childList.push(fieldObj.id);

					//get it's value & attributes
					inputfield_updateHostsChildren(newHost, {
						updateAttributes: true,
						updateSpecificFields: [fieldObj.id],
						executeImmediately: true
					});
				}

				//set the 'belongsToHost' property
				fieldObj.belongsToHost = newHost;

				//update these variables to be accurate
				target      = newHost;
				targetObj   = newHostObj;
				fieldOrHost = 'host'

			//if no new host was specified then that means it's no longer part of any host
			} else {

				//set the 'belongsToHost' property
				fieldObj.belongsToHost = null;

				//delete the attribute since it's no longer needed
				delete attributes.host;

				//update these variables to be accurate
				target      = field;
				targetObj   = fieldObj;
				fieldOrHost = 'field'
			}
		}

	//get the HostObject if a host is used
	} else if (fieldObj.belongsToHost !== null) {
		target      = fieldObj.belongsToHost;
		targetObj   = inputfield_getHostObject(target);
		fieldOrHost = 'host';

		//if the HostObject couldn't be found then revert back to just updating the input-field (better than nothing)
		if (targetObj === null) {
			console.warn(`[MPO] inputfield_changeAttribute() couldn't find the host for input-field "${fieldObj.id}": `, fieldObj.belongsToHost, ` - Continuing by only updating the attributes of the input-field.`);

			target      = field   ;
			targetObj   = fieldObj;
			fieldOrHost = 'field' ;
		}

	//if no host is used then continue by updating the input-field
	} else {
		target      = field   ;
		targetObj   = fieldObj;
		fieldOrHost = 'field' ;
	}

	//list of all "behaviour attributes"
	const behaviourAttributes = ['onchange', 'defaultValue', 'tag', 'forms', 'formsAdd', 'formsRemove'];



	// === UPDATE THE ACTUAL ATTRIBUTES ===

	//if this is `true` then the input-field will be setup again at the end of this function
	let setupFieldAgain = false;

	//set this to `true` if 'updateHostsChildren()' should be called at the end
	let updatedHost = false;

	//set this to `false` if an attribute couldn't be changed
		//this should be `false` if even a single attribute couldn't be changed
	let changedSuccessfully = true;

	//loop through all attributes
	for (const attributeName in attributes) {
		const newValue =          attributes[attributeName];
		const oldValue = fieldObj.attributes[attributeName];
		const behaviourAttributeIndex = behaviourAttributes.indexOf(attributeName);

		//skip this attribute if the value was already used
			//if it's not a "behaviour attribute" then check against the input-field
			//if it's     a "behaviour attribute" then it has to check against the host if there is one (see 'target' above)
		if (behaviourAttributeIndex === -1 && newValue === oldValue) {
			continue;
		} else if (behaviourAttributeIndex !== -1 && newValue === targetObj.attributes[attributeName]) {
			continue;
		}

		//change the attribute
			//IMPORTANT: If changes are done here then make sure to update 'inputfield_attributeObserverCallback()' as well! That function is responsible for allowing lower-cased attribute names and accepting input in string-form only (needed to support changing attributes through the <input-field> HTML attribute).
		switch (attributeName) {

			// # core attributes:

			case 'variation':
				//complain and return if the variation is invalid
					//this uses the 'inputfield_variations' variable to check if a variation with this name is present
				if (typeof inputfield_variations.variations[fieldObj.fieldType][newValue] !== 'object') {
					console.warn(`[MPO] inputfield_changeAttribute() received a invalid variation as 'newValue': "${newValue}".`);
					changedSuccessfully = false;
					continue;
				}

				//apply the new value
				fieldObj.variation = newValue;
				fieldObj.attributes.variation = newValue;

				//and setup the field again
				setupFieldAgain = true;
				break;

			//TODO: Update this with a better way
			case 'id':
				//complain and return if it's nullish
				if (newValue === undefined || newValue === null) {
					console.warn(`[MPO] inputfield_changeAttribute() received a invalid 'id' attribute (can't be undefined or null).`);
					changedSuccessfully = false;
					continue;
				}

				//apply the new value
				fieldObj.attributes.id = newValue;

				//and setup the field again
				setupFieldAgain = true;
				break;


			// # behaviour attributes:
				//NOTE: These should all update the host if a host is used. Use the 'target' variables.

			case 'onchange':
				//complain and return if it's not a function
				if (typeof newValue !== 'function' && newValue !== undefined) {
					console.warn(`[MPO] inputfield_changeAttribute() received a non-function for 'onchange': `, newValue);
					changedSuccessfully = false;
					continue;
				}

				//apply the value to the 'FieldObject'
				targetObj.attributes[attributeName] = newValue;

				//update the host
				updatedHost = true;
				break;

			case 'defaultValue':
				//no changes are needed aside from applying this
				targetObj.attributes.defaultValue = newValue;

				//update the host
				updatedHost = true;
				break;

			case 'tag':
				//complain and return if it's not a string
				if (typeof newValue !== 'string') {
					console.warn(`[MPO] inputfield_changeAttribute() received a non-string for 'tag': `, newValue);
					changedSuccessfully = false;
					continue;
				}

				//apply the value to the 'FieldObject'
				targetObj.attributes.tag = newValue;

				//loop through all forms this belongs to
				for (form of targetObj.belongsToForm) {

					//get the FieldObject of the form
					const formObj = inputfield_getFieldObject(form);

					//make sure this input-fields value is present under the new tag
						//TODO: shouldn't this call 'applyNewValue()'?
					formObj.value[newValue] = targetObj.value;
				}

				//update the host
				updatedHost = true;
				break;

			//TODO: there's no error reporting for the following attributes
			case 'forms':
			case 'formsAdd':
			case 'formsRemove':
				//the object that 'verifyFormAttributes()' will be called with
				let verifyFormArgument = {
					target: target,
					belongsToForm: [],
					fieldOrHost: fieldOrHost
				};

				//add the new value to it
					//has to be done this way if we want to combine all three form attributes into one switch case
				verifyFormArgument[attributeName] = newValue;

				//and finally call the function and apply it's new value
				targetObj.belongsToForm = inputfield_verifyFormAttributes(verifyFormArgument);
				targetObj.attributes.forms = targetObj.belongsToForm;

				//update the host
				updatedHost = true;
				break;


			// # host attributes:

			case 'host':
				//already done, so skip it
					//this case will never be reached anyway since if 'host' was specified then the property was already deleted by now
				continue;


			// # starting attributes:

			case 'beforeText':
			case 'afterText':
			case 'labels':
			case 'HTMLAttributes':
				console.warn(`[MPO] inputfield_changeAttribute() can not change the "${attributeName}" attribute as it's a "starting attributes" which can't be changed after the field's creation. Though you can always replicate it manually.`);
				changedSuccessfully = false;
				continue;


			// # type-dependent attributes:

			case 'autoAddToForm':
				if (typeof newValue !== 'boolean') {
					console.warn(`[MPO] inputfield_changeAttribute() received a non-boolean for 'autoAddToForm': `, newValue);
					changedSuccessfully = false;
					continue;
				}

				//apply the value to the 'FieldObject'
				fieldObj.attributes.autoAddToForm = newValue;

				//if `true` then setup the 'formObserver' to start observing
				if (newValue === true) {
					fieldObj.observers.formObserver.observe(field, inputfield_formObserverOptions);

				//if not then disconnect the observer
				} else {
					fieldObj.observers.formObserver.disconnect();
				}
				break;

			//TODO: Create a better way to update this alongside 'options' (same issue)
			case 'content':
				if (typeof newValue !== 'string') {
					console.warn(`[MPO] inputfield_changeAttribute() received a non-string for 'content': `, newValue);
					changedSuccessfully = false;
					continue;
				}

				//apply the new value
				fieldObj.attributes.content = newValue;

				//and setup the field again
				setupFieldAgain = true;
				break;

			case 'checkboxValue':
				//complain and return if it's invalid
				if (newValue === null || newValue === undefined) {
					console.warn("[MPO] inputfield_changeAttribute() received a invalid value for 'checkboxValue' (can't be null or undefined -- use `true` to reset it):", newValue);
					changedSuccessfully = false;
					continue;
				}

				//apply the value to the 'FieldObject'
				fieldObj.attributes.checkboxValue = newValue;

				//if it's a checkbox that's currently checked then update the value
					//hosts have to be updated
					//it's best to call the 'onchange' function as well since it might rely on having the new value
				if (fieldObj.fieldType === 'checkbox' && fieldObj.displayedValue === true) {
					inputfield_setValue(field, newValue);
				}
				break;

			//TODO: Create a better way to update this alongside 'content' (same issue)
				//TODO: Also actually verify this
			case 'options':
				//apply the new value
				fieldObj.attributes.options = newValue;

				//and setup the field again
				setupFieldAgain = true;
				break;

			default:
				console.warn(`[MPO] inputfield_changeAttribute() received a unknown 'attributeName' value: `, attributeName);
				return false;
		}
	}

	//setup the field again if necessary
	if (setupFieldAgain === true) {
		field.setup({
			fieldType: fieldObj.fieldType,
			attributes: fieldObj.attributes,
			forceSetup: true
		});
	}

	//if the host got updated then update all it's children
	if (fieldOrHost === 'host' && updatedHost === true) {
		inputfield_updateHostsChildren(target, {
			updateAttributes: true,
			executeImmediately: false
		});
	}

	return changedSuccessfully;
}

//the options for 'inputfield_formObserver'
const inputfield_formObserverOptions = {subtree: true, childList: true};

/**	Gets called after every form MutationObserver change. Do not call this manually.
 *
 * 	Adds any new elements to the form if 'autoAddToForm' is enabled.
 *
 * 	Args:
 * 		record [MutationRecord object]
 * 			The MutationRecord object that gets made after the MutationObserver callback.
 */
function inputfield_formObserverCallback (record) {
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
					console.warn(`[MPO] inputfield_formObserverCallback() received a 'autoAddToForm' change for the input-field "${targetObj.id}" despite it not being a form.`);
					continue;
				}

				//add the form
				elemObj.belongsToForm.push(recItem.target);

				//update the form to include the new value
				inputfield_applyNewValue(recItem.target, elemObj.value, {skipOnchange: true, formProperty: elemObj.tag});
			}
		}
	}
}

/**	Gets called after every attribute MutationObserver change. Do not call this manually.
 *
 * 	Calls 'inputfield_changeAttribute()' for every attribute that's updated.
 * 	This also "converts" the attribute changes so 'changeAttribute()' can actually use them, this includes:
 * 		- Changing all attribute-names from lower-case to the "regular" case ('checkboxvalue' -> 'checkboxValue').
 * 		- Converts some attributes from strings to whatever is needed, but also rejects some outright (like 'onchange', doesn't really work as a string).
 *
 * 	Args:
 * 		record [MutationRecord object]
 * 			The MutationRecord object that gets made after the MutationObserver callback.
 */
function inputfield_attributeObserverCallback (record) {
	//loop through all records
	for (const recItem of record) {

		//the attribute name
		let attributeName = recItem.attributeName;

		//make sure it's of type 'attributes'
		if (typeof attributeName !== 'string') {
			console.warn(`[MPO] inputfield_attributeObserverCallback() received a record with a non-string 'attributeName': "${attributeName}". Type: "${recItem.type}" - Target: `, recItem.target);
			continue;
		}

		//get the new value
		let newValue = recItem.target.getAttribute(attributeName);

		//if it's `null` then return
			//this happens if a value is deleted
			//which also happens at the end of this function, so this avoids accidentally calling 'changeAttribute()' again
			//but even aside from that, `null` can't really be used since most attributes reject both `undefined` and `null` and having to figure out a "default" for each attribute would mostly be a waste
		if (newValue === null) {
			return;
		}

		//convert the value from a string to whatever type is needed
			//IMPORTANT: all attribute names have to be lower-case because HTML attributes don't allow upper-case
			//note that it has to be 'checkboxvalue' and not 'checkbox-value', that's how vanilla HTML attributes tend to do things
		switch (attributeName) {

			// # core attributes:

			case 'variation':
				break;

			//this is the global ID attribute!
			case 'id':
				return;

			//this is the input-field ID we should watch for
			case 'data-fieldid':
				attributeName = 'id';
				break;


			// # behaviour attributes:

			//can't take a function and using 'eval()' would be a horrible idea
				//it might make sense with vanilla-HTML/JS but it really ain't good for anything else
			case 'onchange':
				console.warn(`[MPO] inputfield_attributeObserverCallback() can't change the attribute 'options' through HTML attributes. Use 'inputfield_changeAttribute()' or '<input-field>.fieldAttributes' instead.`);
				return;

			//I guess we'll just take it as a string?
			case 'defaultvalue':
				attributeName = 'defaultValue';
				break;

			case 'tag':
				break;

			case 'forms':
				//a space is used to seperate different IDs
					//by doing it this way it stays consistent with how vanilla-HTML works (see 'class' attribute)
				newValue = newValue.split(' ');
				break;

			case 'formsadd':
				attributeName = 'formsAdd';
				newValue = newValue.split(' ');

				break;
			case 'formsremove':
				attributeName = 'formsRemove';
				newValue = newValue.split(' ');
				break;


			// # host attributes:

			case 'host':
				break;


			// # starting attributes:

			case 'beforetext':
				attributeName = 'beforeText';
				break;

			case 'aftertext':
				attributeName = 'afterText';
				break;

			case 'labels':
				break;

			case 'htmlattributes':
				attributeName = 'HTMLAttributes';
				break;


			// # type-dependent attributes:

			case 'autoaddtoform':
				attributeName = 'autoAddToForm';
				break;

			//can't really take an array with objects in it - not unless using some weird-ass syntax or using JSON but at that point it's better to just expect the user to use another way
			case 'options':
				console.warn(`[MPO] inputfield_attributeObserverCallback() can't change the attribute 'options' through HTML attributes. Use 'inputfield_changeAttribute()' or '<input-field>.fieldAttributes' instead.`);
				return;

			case 'checkboxvalue':
				attributeName = 'checkboxValue';
				break;

			case 'options':
				console.warn(`[MPO] inputfield_attributeObserverCallback() can't change the attribute 'options' through HTML attributes. Use 'inputfield_changeAttribute()' or '<input-field>.fieldAttributes' instead.`);
				break;

			//don't want any other attributes to get caught up in this
				//this makes sure that various 'data-' or global HTML attributes won't land in 'changeAttribute()'
				//which is also why we won't 'console.warn()' it - this is normal, expected behaviour
			default:
				return;
		}

		//call 'changeAttribute()' to actually apply the new value
		inputfield_changeAttribute(recItem.target, attributeName, newValue);

		//remove the attribute from the element as long as it's not supposed to be there
			//note that this doesn't remove attributes that were cancelled with 'return;' above
			//that's intended so the user can still see the invalid attributes they entered which might help bug-fix it
		if (['data-fieldid', 'variation'].indexOf(recItem.attributeName) === -1) {
			recItem.target.removeAttribute(recItem.attributeName);
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
 * 				DOMTree [DOM Tree] <document>
 * 					Only needed if you only pass the input-field ID and the element isn't in the regular DOM tree.
 * 					Which DOM tree it should look for the input-field.
 * 					Chances are this is simply 'document', but it can also be a 'DocumentFragment' in which case that should be passed as a whole.
 *
 * 	Returns [FieldObject/null]:
 * 		Returns a FieldObject (see 'inputfield_FieldObject()').
 * 		Returns `null` if it couldn't be found.
 */
function inputfield_getFieldObject (field, specifics={}) {
	//complain and use defaults if 'specifics' is invalid
	if (typeof specifics !== 'object') {
		console.warn(`[MPO] inputfield_getFieldObject() received a non-object as 'specifics': `, specifics);
		specifics = {};
	}

	//complain and return if it's not a DOM element
	if (typeof field !== 'string' && Object.isDOMElement(field) !== true) {
		console.warn(`[MPO] inputfield_getFieldObject() received neither a string nor a DOM element as 'field': `, field);
		return null;
	}

	//get the DOM element if an ID was given
	if (typeof field === 'string') {
		field = inputfield_getElement(field, {DOMTree: specifics.DOMTree});

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
		console.warn(`[MPO] inputfield_getFieldObject() couldn't get the FieldObject for the following element: `, field);
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

/**	Gets the 'HostObject' for a host.
 *
 * 	Note: Does NOT log to the console if a host couldn't be found.
 *
 * 	Args:
 * 		host [String]
 * 			The host.
 * 			Can't be `undefined` or `null`.
 *
 * 	Returns [HostObject/null]:
 * 		The 'HostObject' for the host, or `null` if it couldn't be found.
 */
function inputfield_getHostObject (host) {
	//return if the host is not a string
	if (typeof host !== 'string') {
		return null;
	}

	//get the HostObject
	let hostObj = inputfield_hosts.get(host);

	//and return the HostObject, or `null` if it couldn't be found
	return hostObj ?? null;
}
