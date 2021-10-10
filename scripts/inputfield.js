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

//the total fields created
	//used to give each field a unique ID
let inputfield_totalFieldsCreated = 0;

/**	Creates a input field.
 *
 * 	Args:
 * 		fieldType [String]
 * 			The type of input field it should be. Can be one of the following:
 * 				- checkbox: A simple checkbox that can be either true (checked) and false (unchecked).
 * 				- radio-checkbox: [to be defined]
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
		class: `inputfield_container fieldType-${fieldType}`,

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

	//set the onchange
		//note that this will only be set if it is actually a function, otherwise it automatically replaces it with null
	container.onchange = attributes.onchange;

	//create the actual input fields depending on which type it is
	switch (fieldType) {
		case 'radio-image':
			for (const item of attributes.options) {
				cElem('img', container, {class: 'inputfield_callUpdate fieldType-imgButton', src: item.src, fieldid: fieldID, fieldvalue: item.value});
			}
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

/**	Updates a input field if it's value changed.
 *
 * 	Updates the value in 'inputfield_activeFields', marks the new value as selected in case of radio fields and executed the 'onchange' function of the input field.
 *
 * 	Args:
 * 		containerElem [DOM Element]
 *			The element that contains the entire input field. Should have the class 'inputfield_container'.
 *
 * 		newValue [String / *any*]
 * 			The new value it should be updated to.
 * 			Note that the function doesn't check what type this is so it can technically be anything but HTML attributes will only save it as a string.
 */
function inputfield_updateField (containerElem, newValue) {
	//set the new value
	containerElem.setAttribute('fieldvalue', newValue);

	//TODO: mark radio fields as selected

	//execute the 'onchange' function
	if (typeof containerElem.onchange === 'function') {
		containerElem.onchange(newValue);
	}
}

/**	Gets executed when a input field is clicked on.
 *
 * 	Mainly here to execute 'inputfield_updateField()' and nothing else.
 *
 * 	Args:
 * 		elem [DOM Element]
 * 			The element that got clicked on.
 */
function inputfield_onFieldClicked (elem) {
	//get field ID
	const fieldID = elem.getAttribute('fieldid');

	//get the container element
	const containerElem = document.querySelector(`.inputfield_container[fieldid="${fieldID}"]`);

	//get field type from field object
	const fieldType = containerElem.getAttribute('fieldtype');

	//get the new value
	let newValue;

	//get new value based on which 'fieldType' it is
	switch (fieldType) {

		case 'radio-image':
			newValue = elem.getAttribute('fieldvalue');
			break;
	}

	//update the field with the new value
	inputfield_updateField(containerElem, newValue);
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