// Copyright 2021 MarioPartyOverlay AUTHORS
// SPDX-License-Identifier: Apache-2.0

/**	Changes the action for the tracker.
 *
 * 	Simply loops through + > - > = > *repeat*.
 */
function handleNavbar_changeAction () {
	const curAmount = updatesTracker_getAmount();

	//get the current action and then simply set it to the next one in line ('add' > 'sub' > 'set' > repeat)
	switch (updatesTracker_getAction()) {

		case 'add':
			updatesTracker_setAction('sub');

			//null and 0 should only be used in 'set'
			if (curAmount === null || curAmount < 1) {
				updatesTracker_setAmount(1);
			}
			break;

		case 'sub':
			updatesTracker_setAction('set');
			updatesTracker_setAmount(null);
			break;

		case 'set':
			updatesTracker_setAction('add');

			if (curAmount === null || curAmount < 1) {
				updatesTracker_setAmount(1);
			}
			break;

		//failsafe
		default:
			console.error(`[MPO] handleNavbar_changeAction() found an invalid action "${updatesTracker_getAction()}".`);
			updatesTracker_setAction('add');

			if (curAmount === null || curAmount < 1) {
				updatesTracker_setAmount(1);
			}
			break;
	}
}

/**	Changes the amount for the tracker.
 *
 * 	Loops through 1 > 5 > 10 > *repeat*.
 * 	Or alternatively creates a modal to ask for the amount if 'action' is 'set'.
 */
function handleNavbar_changeAmount () {
	//if the action is 'set' then create a modal that asks the user what amount it should be
	if (updatesTracker_getAction() === 'set') {
		//ask about the amount in a modal
		handleNavbar_askForAmountModal((amount) => {updatesTracker_setAmount(amount);}, true);

	//otherwise simply loop around with 1 > 5 > 10 > repeat
	} else {
		switch (updatesTracker_getAmount()) {

			case 1:
				updatesTracker_setAmount(5);
				break;

			case 5:
				updatesTracker_setAmount(10);
				break;

			case 10:
				updatesTracker_setAmount(1);
				break;

			//failsafe
				//Just set it to next bigger number between 1, 5 or 10
				//or reset to 1 if it's bigger or something else entirely
			default:
				const curAmount = updatesTracker_getAmount();

				if (curAmount < 1) {
					updatesTracker_setAmount(1);

				} else if (curAmount < 5) {
					updatesTracker_setAmount(5);

				} else if (curAmount < 10) {
					updatesTracker_setAmount(10);

				} else {
					updatesTracker_setAmount(1);
				}
				break;

		}
	}
}

/** Creates a modal that asks the user to enter a specific amount.
 *
 * 	Args:
 * 		callback [Function]
 * 			This function will be called once the user clicks on "confirm".
 * 			Uses the result as an argument [Number/null]. null will only be possible if 'allowNull' is true.
 *
 * 		allowNull [Boolean] <false>
 * 			Whether null should be allowed as a value. If true it will create a seperate checkbox to ask for this.
 */
function handleNavbar_askForAmountModal (callback, allowNull=false) {
	var constructModal = function (elem) {
		//get the unique modalID
		const modalID = elem.parentNode.getAttribute('data-modalid');

		const numField = cElem('input', elem, {type: 'number', value: '1', min: '0', max: '999'});

		if (allowNull === true) {
			cElem('br', elem);
			cElem('span', elem)
				.innerText = 'Ask for every counter: ';

			//has to be var because fuck this language, if I access a property on this later it immediately crashes, can't even do a "if === undefined" or something on it without creating an extra 'if' and honestly, this is the best solution for a contender of the dumbest problem in human history
			var nullCheckbox = cElem('input', elem, {type: 'checkbox', value: false});
			nullCheckbox.onchange = () => {
					if (nullCheckbox.checked === true) {
						numField.disabled = true;
					} else {
						numField.disabled = false;
					}
				};
		}

		cElem('br', elem);
		const confirmButton = cElem('button', elem);
		confirmButton.innerText = 'Confirm';
		confirmButton.onclick = () => {
			modal_closeModal(modalID);

			if (nullCheckbox?.checked === true) {
				callback(null);
			} else {
				callback(parseInt(numField.value));
			}
		};
	}

	modal_createModal(constructModal);
}

/**	Updates the visuals of the "Action" display on the navbar.
 */
function handleNavbar_updateActionDisplay () {
	//set it to a symbol depending on what the action is
	switch (updatesTracker_getAction()) {

		case 'add':
			document.querySelector('.navbar_trackerAction').textContent = '+';
			break;

		case 'sub':
			document.querySelector('.navbar_trackerAction').textContent = '-';
			break;

		case 'set':
			document.querySelector('.navbar_trackerAction').textContent = '=';
			break;

		//failsafe
		default:
			console.error(`[MPO] handleNavbar_updateActionDisplay() found an invalid action "${updatesTracker_getAction()}".`);
			updatesTracker_setAction('add');
			break;
	}
}

/**	Updates the visuals of the "Amount" display on the navbar.
 */
function handleNavbar_updateAmount () {
	let amount = updatesTracker_getAmount();

	if (amount === null) {
		amount = '?';
	}

	document.querySelector('.navbar_trackerAmount').textContent = amount;
}

/**	Creates the modal for selecting a character.
 */
function handleNavbar_createCharacterModal () {
	//this will create the inside of the modal
	const constructModal = function (main) {
		//creates the "P1", "P2", etc
		commonInterface_createPlayerSelection(main);

		cElem('br', main);

		//create a character selection
		const charSelection = commonInterface_createCharacterSelection(main);
	}

	//create the actual modal
	modal_createModal(constructModal, {
		cssClass: 'modalClass_characterSelection',
		group: 'navbar'
	});
}

/**	Called when changing the character from the character-selection modal.
 *
 * 	Simply calls 'updatesTracker_setCharacter()'. Used to be more here, could probably be removed.
 *
 * 	Args:
 * 		char [String]
 * 			The name of the character as used in the database.
 */
function handleNavbar_changeCharacterFromModal (char) {
	//change the character
	updatesTracker_setCharacter(commonInterface_currentPlayerSelected, char);
}

//WIP - doesn't currently do anything
function handleNavbar_createGameModal () {
	var constructModal = function (elem) {
		//this is a object that contains all games from the database
		const games = dbparsing_getGameList();

		//loop through all games
		for (const key in games) {
			//TODO
		}
	}
}

/**	Opens the modal for managing savefiles.
 *
 * 	The functions for loading & deleting savefiles are called directly within the 'onclick' event.
 */
function handleNavbar_createSavefileModal () {
	//function to construct the modal
	var constructModal = function (elem) {

		//replace 'elem' with a new <span> that serves as a container for everything
			//also makes sure that scrolling works properly
			//the actual 'elem' can be replaced since this new <span> contains everything - the old one isn't needed
		elem = cElem('span', elem, {style: 'display: block; max-height: 500px; padding-right: 5px; overflow-y: auto;'});

		//create a button that automatically creates a new profile and closes this modal
		cElem('button', elem, {onclick: 'trackerCore_status.profiles.add(new trackerCore_Profile());modal_closeThisModal(this);'})
			.textContent = 'Create new profile';

		cElem('br', elem);

		//create a button that automatically creates a new savefile and closes this modal
		cElem('button', elem, {onclick: 'updatesTracker_createSavefile(null, true);modal_closeThisModal(this);'})
			.textContent = 'Create new savefile & select it';

		cElem('br', elem);

		cElem('br', elem);

		cElem('span', elem)
			.textContent = 'Select a savefile:';

		cElem('br', elem);
		cElem('br', elem);

		let profileContainerList = {};

		//loop through all profiles
			//the 'const' here is important because some fuck-ass replaces 'key' with 'class' (not a string, just the class object) - don't fucking ask me why because not once did a 'key = class' happen
		for (const key in trackerCore_status.profiles) {

			//the profile object
			const profileObj = trackerCore_status.profiles[key];

			//the DOM container for the profile
			const profileContainer = cElem('span', elem, {
				class: 'navbar_profileContainer',
				'data-profileslot': key,
				style: 'border-top: 2px black solid; border-bottom: 2px black solid; padding: 3px 0 3px 0; margin: 0 0 6px 0; display: block;'
			});

			//add it to the list
			profileContainerList[key] = profileContainer;

			//profile name
			cElem('input', profileContainer, {
				type: 'text',
				class: 'navbar_profileName',
				value: profileObj.name,
				onchange: (eventObj) => {trackerCore_status.profiles[key].name = eventObj.target.value;}
			});

			//add button to create a new savefile in this profile
			cElem('button', profileContainer, {onclick: `trackerCore_status.profiles.remove(${key});modal_closeThisModal(this);`, style: 'margin-left: 5px;'})
				.textContent = 'Delete profile';

			cElem('br', profileContainer);

			//add button to create a new savefile in this profile
			cElem('button', profileContainer, {onclick: `updatesTracker_createSavefile(${key}, true);modal_closeThisModal(this);`, style: 'margin-left: 5px;'})
				.textContent = 'Create savefile';

			cElem('br', profileContainer);
			cElem('br', profileContainer);
		}

		//loop through all savefiles
		for (const key in trackerCore_status.savefiles) {

			//the savefile object
			const savefileObj = trackerCore_status.savefiles[key];

			const profileElem = profileContainerList[savefileObj.profileParent];

			//the DOM container for the savefile
			if (isDOMElement(profileElem) === true) {
				var savefileContainer = cElem('span', profileElem, {class: 'navbar_savefileContainer', style: 'display: block; margin-left: 7px; padding-left: 3px; border-left: 2px solid black;'});
			} else {
				var savefileContainer = cElem('span', elem, {class: 'navbar_savefileContainer', style: 'display: block;'});
			}

			//list of characters used
			let characters = [];

			//loop through all players to add their characters to the character-list
			for (item of savefileObj.players) {
				characters.push(item.character);
			}

			//add the text that shows what savefile it is
			let text = cElem('span', savefileContainer, {class: 'navbar_savefileText', style: 'white-space: nowrap;'});
			text.textContent = `Game: ${savefileObj.game} | Characters: ${characters.join(' + ')}`;

			cElem('br', savefileContainer);

			//add a button to load the savefile
				//'onclick' loads the savefile and closes this modal
			let loadButton = cElem('button', savefileContainer, {onclick: `updatesTracker_loadSavefile(${key});modal_closeThisModal(this);`});
			loadButton.textContent = 'Load Savefile';

			//disable the load button if this savefile is already selected
			if (trackerCore_status.savefiles.currentSlot === Number(key)) {
				loadButton.setAttribute('onclick', '');
				loadButton.setAttribute('disabled', 'true');

				//and also make the text purple
				text.style.color = '#960ba7';
			}

			//add a button to delete the savefile
				//'onclick' deletes the savefile and closes this modal
			let delButton = cElem('button', savefileContainer, {onclick: `updatesTracker_deleteSavefile(${key});modal_closeThisModal(this);`});
			delButton.textContent = 'Delete Savefile';

			//disable the delete button if it's the only savefile left
			if (trackerCore_status.savefiles.length <= 1) {
				delButton.setAttribute('onclick', '');
				delButton.setAttribute('disabled', 'true');
			}

			//add some distance between each individual savefile
			cElem('br', savefileContainer);
			cElem('br', savefileContainer);
		}
	}

	//actually create the modal
	modal_createModal(constructModal);
}

/** Opens the modal for managing counters.
 */
function handleNavbar_createCounterModal () {
	//function to construct the modal
	var constructModal = function (elem) {

		//replace 'elem' with a new <span> that serves as a container for everything
			//also makes sure that scrolling works properly
			//the actual 'elem' can be replaced since this new <span> contains everything - the old one isn't needed
		elem = cElem('span', elem, {style: 'display: block; max-height: 500px; width: 400px; padding-right: 5px; overflow-y: auto;'});

		//loop through all categories
		for (const categoryKey in trackerCore_status.counters.behaviour) {

			//the DOM container for the category
			const categoryContainer = cElem('span', elem, {
				class: 'navbar_categoryContainer',
				style: 'border-top: 2px black solid; border-bottom: 2px black solid; padding: 3px 0 3px 0; margin: 0 0 6px 0; display: block;'
			});

			//add a category title
			cElem('span', categoryContainer, {style: "font-family: 'mp9'; font-size: 18px; border-bottom: 2px solid black; margin: 5px 0 5px 3px;"})
				.textContent = categoryKey;

			//loop through every counter and add it
			for (const counterKey in trackerCore_status.counters.behaviour[categoryKey]) {

				//get the 'CounterStatus' object
				const counterStatus = trackerCore_getSavefile().perCounterStatus[categoryKey][counterKey];

				//the DOM container for the counter
				const counterContainer = cElem('span', categoryContainer, {
					class: 'navbar_counterContainer',
					style: 'display: block; margin-left: 7px; margin-top: 4px; padding-left: 3px; border-left: 2px solid black;'
				});

				//add the counter image
				cElem('img', counterContainer, {src: dbparsing_getIcon(`${categoryKey}.${counterKey}`), style: 'height: 25px;'});

				//add the counter name
					//try and find a full name in the database - if it doesn't exist then just use the 'counterKey' for it
				cElem('span', counterContainer, {style: "font-family: 'mp9'; font-size: 15px; margin-left: 3px;"})
					.textContent = mpdb[updatesTracker_getGame()][categoryKey]?.[counterKey]?.metadata?.fullName ?? counterKey;

				cElem('br', counterContainer);

				//'active' checkbox

				let label = cElem('label', counterContainer);
				label.innerText = 'Active: ';

				cElem('input', label, {
					type: 'checkbox',
					onchange: () => {}//WIP
				})
					.checked = counterStatus.active;


				cElem('br', counterContainer);

				label = cElem('label', counterContainer);
				label.innerText = 'Highlight highest stat: ';

				cElem('input', label, {
					type: 'checkbox',
					onchange: () => {}//WIP
				})
					.checked = counterStatus.highlightHighest;

				cElem('br', counterContainer);

				label = cElem('label', counterContainer);
				label.innerText = 'Highlight lowest stat: ';

				cElem('input', label, {
					type: 'checkbox',
					onchange: () => {}//WIP
				})
					.checked = counterStatus.highlightLowest;
			}
		}
	}

	//actually create the modal
	modal_createModal(constructModal);
}