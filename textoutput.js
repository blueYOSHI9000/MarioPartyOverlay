/*
* Returns the correct name of a character.
* 
* @param {string} character The shortened name of the character.
*/
function getCharName (character) {
	if (isNaN(character) == false) {
		character = characters[character];
	}

	switch (character) {
		case 'bowserjr':
			return 'Bowser Jr.';
			break;
		case 'dk':
			return 'Donkey Kong';
			break;
		case 'koopakid':
			return 'Koopa Kid';
			break;
		case 'pompom':
			return 'Pom Pom';
			break;
		case 'drybones':
			return 'Dry Bones';
			break;
		case 'dk':
			return 'Donkey Kong';
			break;
		case 'shyguy':
			return 'Shy Guy';
			break;
		case 'hammerbro':
			return 'Hammer Bro';
			break;
		default:
			return character.charAt(0).toUpperCase() + character.slice(1);
	}
}

/*
* Outputs all counters as text.
*/
function textOutput () {
	var playerName = ['', '', '', '', ''];

	//Checks if a custom name has been assigned, if not it uses the characters name
	for (let num = 1; num < 5; num++) {
		if (getValue('toP' + num + 'Name') == '') {
			playerName[num] = getCharName(characters[num]);
		} else {
			playerName[num] = getValue('toP' + num + 'Name');
		}
	}

	var joinString = getValue('toSeperation');

	if (getValue('toUseActive') == false) {
		var toCounters = getValue('toCounters').split(', ');
		var counterNames = getValue('toOutput').split(', ');
	} else {
		var toCounters = [];
		var counterNames = [];

		toCounters.push('turns');
		counterNames.push('Turns');

		if (getValue('coinStarOnOff') == true) {
			toCounters.push('coinstar');
			counterNames.push('Coin Star');
		}

		for (let num = 0; num < counters.length; num++) {
			if (getValue(counters[num] + 'OnOff') == true) {
				toCounters.push(countersUp[num]);

				switch (countersUp[num]) {
					case 'RedSpace':
						counterNames.push('Red Space');
					case 'FriendSpace':
						counterNames.push('Friendship');
					case 'SpinSpace':
						counterNames.push('Spin');
					case 'SpecialDice':
						counterNames.push('Dice Block');
					default:
						counterNames.push(countersUp[num]);
				}
			}
		}
	}

	var output = [];
	var forResult = [];

	for (let num = 0; num < toCounters.length; num++) {
		toCounters[num] = toCounters[num].replace(/\s/g, '');

		//Add all specified counters to output array
		switch (toCounters[num].toLowerCase()) {
			case 'turn':
			case 'turns':
				output[num] = counterNames[num] + ': ' + getInner('curTurnText') + '/' + getInner('maxTurnText');
				break;

			case 'coin':
			case 'coinstar':
				var coinStarP1 = getValue('p1CoinStarTie');
				var coinStarP2 = getValue('p2CoinStarTie');
				var coinStarP3 = getValue('p3CoinStarTie');
				var coinStarP4 = getValue('p4CoinStarTie');

				var coinStar = [];

				if (coinStarP1 == true) {
					coinStar.push(playerName[1]);
				}
				if (coinStarP2 == true) {
					coinStar.push(playerName[2]);
				}
				if (coinStarP3 == true) {
					coinStar.push(playerName[3]);
				}
				if (coinStarP4 == true) {
					coinStar.push(playerName[4]);
				}

				var coinStarString = coinStar.join(' & ');

				if (getValue('noTie') == true && (coinStar.length > 1 || coinStar.length == 0)) {
					coinStarString = 'multiple';
				} else if (coinStar.length == 4 || coinStar.length == 0) {
					if (getValue('toListAllCoin') == false) {
						coinStarString = 'everyone';
					} else {
						coinStar.push(playerName[1]);
						coinStar.push(playerName[2]);
						coinStar.push(playerName[3]);
						coinStar.push(playerName[4]);
						coinStarString = coinStar.join(' & ');
					}
				}

				output[num] = counterNames[num] + ': ' + getInner('coinStarText') + ' ' + coinStarString;
				break;

			default: //Add everything new to textOutputTest() too
				if (toCounters[num] == 'Friendship') {
					toCounters[num] = 'FriendSpace';
				}

				if (getValue('toBonusOnly') == true) {
					var result = [];
					var resultNum = [];

					var counterP1 = getInner('p1' + toCounters[num] + 'Text');
					var counterP2 = getInner('p2' + toCounters[num] + 'Text');
					var counterP3 = getInner('p3' + toCounters[num] + 'Text');
					var counterP4 = getInner('p4' + toCounters[num] + 'Text');

					var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4);

					if (counterP1 == counterP2 && counterP1 == counterP3 && counterP1 == counterP4 && getValue('toListAll') == false) {
						result.push('everyone');
						resultNum.push(getInner('p1' + toCounters[num] + 'Text'));
					} else {
						if (counterNum == counterP1) {
							result.push(playerName[1]);
							resultNum.push(getInner('p1' + toCounters[num] + 'Text'));
						}

						if (counterNum == counterP2) {
							result.push(playerName[2]);
							resultNum.push(getInner('p2' + toCounters[num] + 'Text'));
						}

						if (counterNum == counterP3) {
							result.push(playerName[3]);
							resultNum.push(getInner('p3' + toCounters[num] + 'Text'));
						}

						if (counterNum == counterP4) {
							result.push(playerName[4]);
							resultNum.push(getInner('p4' + toCounters[num] + 'Text'));
						}
					}


					if (getValue('toShowNum') == false) { //if a number should be displayed next to the player that got the bonus star
						var resultString = result.join(' & ');
						output[num] = counterNames[num] + ': ' + resultString;

					} else {
						switch (result.length) {
							case 1:
								forResult.push(counterNames[num] + ': ' + result[0] + ' ' + resultNum[0].replace(/ /g,''));
								break;
							case 2:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' ' + resultNum[0].replace(/ /g,''));
								break;
							case 3:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' ' + resultNum[0].replace(/ /g,''));
								break;
							case 4:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' & ' + result[3] + ' ' + resultNum[0].replace(/ /g,''));
								break;
						}
						

						output[num] = forResult.join('');
						forResult = [];
					}

				} else {
					output[num] = counterNames[num] + ': ' + playerName[1] + ' ' + getInner('p1' + toCounters[num] + 'Text').replace(/ /g,'') + ', ' + playerName[2] + ' ' + getInner('p2' + toCounters[num] + 'Text').replace(/ /g,'') + ', ' + playerName[3] + ' ' + getInner('p3' + toCounters[num] + 'Text').replace(/ /g,'') + ', ' + playerName[4] + ' ' + getInner('p4' + toCounters[num] + 'Text').replace(/ /g,'');
				}
		}
	}

	var outputString = output.join(joinString);

	var outputElement = document.getElementById('textOutput');
	outputElement.value = outputString;
	outputElement.select();
	outputElement.focus();
	document.execCommand("copy");

	console.log('[MPO Text Output] ' + outputString);

}

/*
* Checks if the counters inserted in the settings for the text output feature are correct, if not it removes them.
* 
* @param {boolean} nameonly If true it won't check if everything inside the counters textarea is correct.
*/
function textOutputTest (nameonly) {
	var toCounters = getValue('toCounters').split(', ');
	var counterNames = getValue('toOutput').split(', ');
	var error = [];

	if (nameonly != true) {
		for (let num = 0; num < toCounters.length; num++) {
			toCounters[num] = toCounters[num].replace(/\s/g, '');

			switch (toCounters[num].toLowerCase()) {
				case 'turn':
				case 'turns':
					break;
				case 'coin':
				case 'coinstar':
					break;
				default: //Add everything new to textOutput() too
					if (toCounters[num] == 'Friendship') {
						toCounters[num] = 'FriendSpace';
					}
					if (document.getElementById('p1' + toCounters[num] + 'Text')) {} else {
						error.push(toCounters[num]);
					}
					break;
			} 
		}
	}

	if (error.length == 1) {
		editInner('textOutputWarning', '"' + error.join(', ') + '" isn\'t a valid counter.');
		document.getElementById('textOutputWarning').style = 'visibility: visible;';
	} else if (error.length > 1) {
		editInner('textOutputWarning', '"' + error.join(', ') + '" aren\'t valid counters.');
		document.getElementById('textOutputWarning').style = 'visibility: visible;';
	} else if (toCounters.length > counterNames.length) {
		editInner('textOutputWarning', 'Counter name(s) missing.');
		document.getElementById('textOutputWarning').style = 'visibility: visible;';
	} else if (toCounters.length < counterNames.length) {
		editInner('textOutputWarning', 'Too many counter counterNames.');
		document.getElementById('textOutputWarning').style = 'visibility: visible;';
	} else {
		document.getElementById('textOutputWarning').style = 'visibility: hidden;';
	}
}

/*
* Hides and shows the counter input for the Text Output setti
*/
function updateCounterInput () {
	if (getValue('toUseActive') == false) {
		document.getElementById('customTOCounters').style.display = 'block';
	} else {
		document.getElementById('customTOCounters').style.display = 'none';
		editValue('toUseActive', true);
	}
}