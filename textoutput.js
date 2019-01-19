/*
* Outputs all counters as text.
*/
function textOutput () {
	var playerName = ['', '', '', '', ''];

	//Checks if a custom name has been assigned, if not it uses the characters name
	for (let num = 1; num < 5; num++) {
		if (getValue('toP' + num + 'Name') == '') {
			switch (characters[num]) {
				case 'bowserjr':
					playerName[num] = 'Bowser Jr.';
					break;
				case 'dk':
					playerName[num] = 'Donkey Kong';
					break;
				case 'koopakid':
					playerName[num] = 'Koopa Kid';
					break;
				case 'pompom':
					playerName[num] = 'Pom Pom';
					break;
				case 'drybones':
					playerName[num] = 'Dry Bones';
					break;
				case 'dk':
					playerName[num] = 'Donkey Kong';
					break;
				case 'shyguy':
					playerName[num] = 'Shy Guy';
					break;
				case 'hammerbro':
					playerName[num] = 'Hammer Bro';
					break;
				default:
					playerName[num] = characters[num].charAt(0).toUpperCase() + characters[num].slice(1);
			}
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
				output[num] = counterNames[num] + ': ' + document.getElementById('curTurnText').innerHTML + '/' + document.getElementById('maxTurnText').innerHTML;
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

				output[num] = counterNames[num] + ': ' + document.getElementById('coinStarText').innerHTML + ' ' + coinStarString;
				break;

			default: //Add everything new to textOutputTest() too
				if (toCounters[num] == 'Friendship') {
					toCounters[num] = 'FriendSpace';
				}

				if (getValue('toBonusOnly') == true) {
					var result = [];
					var resultNum = [];

					var counterP1 = document.getElementById('p1' + toCounters[num] + 'Text').innerHTML;
					var counterP2 = document.getElementById('p2' + toCounters[num] + 'Text').innerHTML;
					var counterP3 = document.getElementById('p3' + toCounters[num] + 'Text').innerHTML;
					var counterP4 = document.getElementById('p4' + toCounters[num] + 'Text').innerHTML;

					var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4);

					if (counterP1 == counterP2 && counterP1 == counterP3 && counterP1 == counterP4 && getValue('toListAll') == false) {
						result.push('everyone');
						resultNum.push(document.getElementById('p1' + toCounters[num] + 'Text').innerHTML);
					} else {
						if (counterNum == counterP1) {
							result.push(playerName[1]);
							resultNum.push(document.getElementById('p1' + toCounters[num] + 'Input').innerHTML);
						}

						if (counterNum == counterP2) {
							result.push(playerName[2]);
							resultNum.push(document.getElementById('p2' + toCounters[num] + 'Text').innerHTML);
						}

						if (counterNum == counterP3) {
							result.push(playerName[3]);
							resultNum.push(document.getElementById('p3' + toCounters[num] + 'Text').innerHTML);
						}

						if (counterNum == counterP4) {
							result.push(playerName[4]);
							resultNum.push(document.getElementById('p4' + toCounters[num] + 'Text').innerHTML);
						}
					}


					if (getValue('toShowNum') == false) { //if a number should be displayed next to the player that got the bonus star
						var resultString = result.join(' & ');
						output[num] = counterNames[num] + ': ' + resultString;

					} else {
						//var forNum = toCounters.length++;
						
						//console.log('forResult: ' + forResult);

						switch (result.length) {
							case 1:
								forResult.push(counterNames[num] + ': ' + result[0] + ' ' + resultNum[0]);
								break;
							case 2:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' ' + resultNum[0]);
								break;
							case 3:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' ' + resultNum[0]);
								break;
							case 4:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' & ' + result[3] + ' ' + resultNum[0]);
								break;
						}
						

						output[num] = forResult.join('');
						forResult = [];
					}

				} else {
					output[num] = counterNames[num] + ': ' + playerName[1] + ' ' + document.getElementById('p1' + toCounters[num] + 'Text').innerHTML + ', ' + playerName[2] + ' ' + document.getElementById('p2' + toCounters[num] + 'Text').innerHTML + ', ' + playerName[3] + ' ' + document.getElementById('p3' + toCounters[num] + 'Text').innerHTML + ', ' + playerName[4] + ' ' + document.getElementById('p4' + toCounters[num] + 'Text').innerHTML;
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
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" isn\'t a valid counter.';
		document.getElementById('textOutputWarning').style = 'visibility: visible;';
	} else if (error.length > 1) {
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" aren\'t valid counters.';
		document.getElementById('textOutputWarning').style = 'visibility: visible;';
	} else if (toCounters.length > counterNames.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Counter name(s) missing.';
		document.getElementById('textOutputWarning').style = 'visibility: visible;';
	} else if (toCounters.length < counterNames.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Too many counter counterNames.';
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
		document.getElementById('counterNote').style.display = 'block';
		document.getElementById('counterDiv').style.display = 'block';
	} else {
		document.getElementById('counterNote').style.display = 'none';
		document.getElementById('counterDiv').style.display = 'none';
		editValue('toUseActive', true);
	}
}