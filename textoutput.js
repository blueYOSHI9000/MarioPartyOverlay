/*
* Outputs all counters as text.
*/
function textOutput () {
	var playerName = ['', '', '', '', '']

	//Checks if a custom name has been assigned, if not it uses the characters name
	for (let num = 1; num < 5; num++) {
		if (document.getElementById('toP' + num + 'Name').value == '') {
			switch (characters[num]) {
				case 'bowserjr':
					playerName[num] = 'Bowser Jr.'
					break;
				case 'dk':
					playerName[num] = 'Donkey Kong'
					break;
				case 'koopakid':
					playerName[num] = 'Koopa Kid'
					break;
				case 'pompom':
					playerName[num] = 'Pom Pom'
					break;
				case 'drybones':
					playerName[num] = 'Dry Bones'
					break;
				case 'dk':
					playerName[num] = 'Donkey Kong'
					break;
				case 'shyguy':
					playerName[num] = 'Shy Guy'
					break;
				case 'hammerbro':
					playerName[num] = 'Hammer Bro'
					break;
				default:
					playerName[num] = characters[num].charAt(0).toUpperCase() + characters[num].slice(1)
			}
		} else {
			playerName[num] = document.getElementById('toP' + num + 'Name').value
		}
	}

	var joinString = document.getElementById('toSeperation').value

	var counters = document.getElementById('toCounters').value.split(', ')
	var counterNames = document.getElementById('toOutput').value.split(', ')

	var output = []
	var forResult = []

	for (let num = 0; num < counters.length; num++) {
		counters[num] = counters[num].replace(/\s/g, '')

		//Add all specified counters to output array
		switch (counters[num].toLowerCase()) {
			case 'turn':
			case 'turns':
				output[num] = counterNames[num] + ': ' + document.getElementById('curTurnText').innerHTML + '/' + document.getElementById('maxTurnText').innerHTML
				break;

			case 'coin':
			case 'coinstar':
				var coinStarP1 = document.getElementById('p1CoinStarTie').checked
				var coinStarP2 = document.getElementById('p2CoinStarTie').checked
				var coinStarP3 = document.getElementById('p3CoinStarTie').checked
				var coinStarP4 = document.getElementById('p4CoinStarTie').checked

				var coinStar = []

				if (coinStarP1 == true) {
					coinStar.push(playerName[1])
				}
				if (coinStarP2 == true) {
					coinStar.push(playerName[2])
				}
				if (coinStarP3 == true) {
					coinStar.push(playerName[3])
				}
				if (coinStarP4 == true) {
					coinStar.push(playerName[4])
				}

				var coinStarString = coinStar.join(' & ')

				if (document.getElementById('noTie').checked == true && (coinStar.length > 1 || coinStar.length == 0)) {
					coinStarString = 'multiple'
				} else if (coinStar.length == 4 || coinStar.length == 0) {
					if (document.getElementById('toListAllCoin').checked == false) {
						coinStarString = 'everyone'
					} else {
						coinStar.push(playerName[1])
						coinStar.push(playerName[2])
						coinStar.push(playerName[3])
						coinStar.push(playerName[4])
						coinStarString = coinStar.join(' & ')
					}
				}

				output[num] = counterNames[num] + ': ' + document.getElementById('coinStarText').innerHTML + ' ' + coinStarString
				break;

			default: //Add everything new to textOutputTest() too
				if (counters[num] == 'Friendship') {
					counters[num] = 'FriendSpace'
				}

				if (document.getElementById('toBonusOnly').checked == true) {
					var result = []
					var resultNum = []

					var counterP1 = document.getElementById('p1' + counters[num] + 'Text').innerHTML
					var counterP2 = document.getElementById('p2' + counters[num] + 'Text').innerHTML
					var counterP3 = document.getElementById('p3' + counters[num] + 'Text').innerHTML
					var counterP4 = document.getElementById('p4' + counters[num] + 'Text').innerHTML

					var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

					if (counterP1 == counterP2 && counterP1 == counterP3 && counterP1 == counterP4 && document.getElementById('toListAll').checked == false) {
						result.push('everyone')
						resultNum.push(document.getElementById('p1' + counters[num] + 'Text').innerHTML)
					} else {
						if (counterNum == counterP1) {
							result.push(playerName[1])
							resultNum.push(document.getElementById('p1' + counters[num] + 'Input').innerHTML)
						}

						if (counterNum == counterP2) {
							result.push(playerName[2])
							resultNum.push(document.getElementById('p2' + counters[num] + 'Text').innerHTML)
						}

						if (counterNum == counterP3) {
							result.push(playerName[3])
							resultNum.push(document.getElementById('p3' + counters[num] + 'Text').innerHTML)
						}

						if (counterNum == counterP4) {
							result.push(playerName[4])
							resultNum.push(document.getElementById('p4' + counters[num] + 'Text').innerHTML)
						}
					}


					if (document.getElementById('toShowNum').checked == false) { //if a number should be displayed next to the player that got the bonus star
						var resultString = result.join(' & ')
						output[num] = counterNames[num] + ': ' + resultString

					} else {
						//var forNum = counters.length++
						
						//console.log('forResult: ' + forResult)

						switch (result.length) {
							case 1:
								forResult.push(counterNames[num] + ': ' + result[0] + ' ' + resultNum[0])
								break;
							case 2:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' ' + resultNum[0])
								break;
							case 3:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' ' + resultNum[0])
								break;
							case 4:
								forResult.push(counterNames[num] + ': ' + result[0] + ' & ' + result[1] + ' & ' + result[2] + ' & ' + result[3] + ' ' + resultNum[0])
								break;
						}
						

						output[num] = forResult.join('')
						forResult = []
					}

				} else {
					output[num] = counterNames[num] + ': ' + playerName[1] + ' ' + document.getElementById('p1' + counters[num] + 'Text').innerHTML + ', ' + playerName[2] + ' ' + document.getElementById('p2' + counters[num] + 'Text').innerHTML + ', ' + playerName[3] + ' ' + document.getElementById('p3' + counters[num] + 'Text').innerHTML + ', ' + playerName[4] + ' ' + document.getElementById('p4' + counters[num] + 'Text').innerHTML
				}
		}
	}

	var outputString = output.join(joinString)

	var outputElement = document.getElementById('textOutput')
	outputElement.value = outputString
	outputElement.select()
	outputElement.focus()
	document.execCommand("copy");

	console.log('[MPO Text Output] ' + outputString)

}

/*
* Checks if the counters inserted in the settings for the text output feature are correct, if not it removes them.
* 
* @param {boolean} nameonly If true it won't check if everything inside the counters textarea is correct.
*/
function textOutputTest (nameonly) {
	var counters = document.getElementById('toCounters').value.split(', ')
	var counterNames = document.getElementById('toOutput').value.split(', ')
	var error = []

	if (nameonly != true) {
		for (let num = 0; num < counters.length; num++) {
			counters[num] = counters[num].replace(/\s/g, '')

			switch (counters[num].toLowerCase()) {
				case 'turn':
				case 'turns':
					break;
				case 'coin':
				case 'coinstar':
					break;
				default: //Add everything new to textOutput() too
					if (counters[num] == 'Friendship') {
						counters[num] = 'FriendSpace'
					}
					if (document.getElementById('p1' + counters[num] + 'Text')) {} else {
						error.push(counters[num])
					}
					break;
			} 
		}
	}

	if (error.length == 1) {
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" isn\'t a valid counter.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (error.length > 1) {
		document.getElementById('textOutputWarning').innerHTML = '"' + error.join(', ') + '" aren\'t valid counters.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (counters.length > counterNames.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Counter name(s) missing.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else if (counters.length < counterNames.length) {
		document.getElementById('textOutputWarning').innerHTML = 'Too many counter counterNames.'
		document.getElementById('textOutputWarning').style = 'visibility: visible;'
	} else {
		document.getElementById('textOutputWarning').style = 'visibility: hidden;'
	}
}