function handleNavbar_createCharacterModal () {
	//this will create the inside of the modal
	var constructModal = function (main) {
		//create a form
		var form = inputfield_createField('form', main);

		//create all characters
		ui_createCharacterList(main);
	}

	//create the actual modal
	modal_createModal({
		constructModal: constructModal,
		attributes: {
			cssClass: 'modalClass_characterSelection',
			group: 'navbar'
		}
	});
}