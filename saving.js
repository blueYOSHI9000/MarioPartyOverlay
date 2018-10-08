var backuped = false

var coinStarVar = 10
var coinStarTie1 = false
var coinStarTie2 = false
var coinStarTie3 = false
var coinStarTie4 = false

var curTurn = 1

var hap = [0, 0, 0, 0]
var mini = [0, 0, 0, 0]
var red = [0, 0, 0, 0]
var run = [0, 0, 0, 0]
var shop = [0, 0, 0, 0]
var orb = [0, 0, 0, 0]
var candy = [0, 0, 0, 0]
var item = [0, 0, 0, 0]
var friend = [0, 0, 0, 0]
var hex = [0, 0, 0, 0]
var spin = [0, 0, 0, 0]
var minus = [0, 0, 0, 0]
var dice = [0, 0, 0, 0]
var ally = [0, 0, 0, 0]
var stompy = [0, 0, 0, 0]
var doormat = [0, 0, 0, 0]
var stars = [0, 0, 0, 0]
var coins = [0, 0, 0, 0]

var countersShort = ['hap', 'mini', 'red', 'run', 'shop', 'orb', 'candy', 'item', 'friend', 'hex', 'spin', 'minus', 'dice', 'ally', 'stompy', 'doormat', 'stars', 'coins']
var counters = ['happening', 'minigame', 'redSpace', 'running', 'shopping', 'orb', 'candy', 'item', 'friendSpace', 'hex', 'spinSpace', 'minus', 'specialDice', 'ally', 'stompy', 'doormat', 'stars', 'coins']
var countersUp = []
for (let num = 0; num < 17; num++) {
	countersUp.push(counters[num].charAt(0).toUpperCase() + counters[num].slice(1))
}

/*
* Resets the backup.
*/
function resetBackup() {
	document.getElementById('coinStarText').innerHTML = 10
	document.getElementById('p1CoinStarTie').checked = false
	document.getElementById('p2CoinStarTie').checked = false
	document.getElementById('p3CoinStarTie').checked = false
	document.getElementById('p4CoinStarTie').checked = false

	for (let num = 1; num < 5; num++) {
		for (let num2 = 0; num2 < 14; num2++) {
			document.getElementById('p' + num + countersUp[num2] + 'Text').innerHTML = 0
		}
	}

	turns('curTurn', 1, 'Set')
	coinStarTie()
	callHighlight(false, true)
}

/*
* Backups all counters.
*/
function backup() {
	document.getElementById('reloadButton').disabled = false
	backuped = true

	coinStarVar = document.getElementById('coinStarText').innerHTML
	coinStarTie1 = document.getElementById('p1CoinStarTie').checked
	coinStarTie2 = document.getElementById('p2CoinStarTie').checked
	coinStarTie3 = document.getElementById('p3CoinStarTie').checked
	coinStarTie4 = document.getElementById('p4CoinStarTie').checked

	curTurn = parseInt(document.getElementById('curTurnText').innerHTML)

	var num = 0
	for (let num2 = 0; num2 < 4; num2++) {
		num++
		hap[num2] = document.getElementById('p' + num + 'HappeningText').innerHTML
		mini[num2] = document.getElementById('p' + num + 'MinigameText').innerHTML
		red[num2] = document.getElementById('p' + num + 'RedSpaceText').innerHTML
		run[num2] = document.getElementById('p' + num + 'RunningText').innerHTML
		shop[num2] = document.getElementById('p' + num + 'ShoppingText').innerHTML
		orb[num2] = document.getElementById('p' + num + 'OrbText').innerHTML
		candy[num2] = document.getElementById('p' + num + 'CandyText').innerHTML
		item[num2] = document.getElementById('p' + num + 'ItemText').innerHTML
		friend[num2] = document.getElementById('p' + num + 'FriendSpaceText').innerHTML
		hex[num2] = document.getElementById('p' + num + 'HexText').innerHTML
		spin[num2] = document.getElementById('p' + num + 'SpinSpaceText').innerHTML
		minus[num2] = document.getElementById('p' + num + 'MinusText').innerHTML
		dice[num2] = document.getElementById('p' + num + 'SpecialDiceText').innerHTML
		spin[num2] = document.getElementById('p' + num + 'AllyText').innerHTML
		minus[num2] = document.getElementById('p' + num + 'StompyText').innerHTML
		dice[num2] = document.getElementById('p' + num + 'DoormatText').innerHTML
		stars[num2] = document.getElementById('p' + num + 'StarsText').innerHTML
		coins[num2] = document.getElementById('p' + num + 'CoinsText').innerHTML
	}

	if (document.getElementById('permSave').checked == true) {
		saveCounters()
	}
}

/*
* Restores all saved counters.
* 
* @param {boolean} forceRestore If the restore should be forced.
*/
function restore(forceRestore) {
	if (backuped == true || forceRestore == true) {
		document.getElementById('coinStarText').innerHTML = coinStarVar
		document.getElementById('p1CoinStarTie').checked = coinStarTie1
		document.getElementById('p2CoinStarTie').checked = coinStarTie2
		document.getElementById('p3CoinStarTie').checked = coinStarTie3
		document.getElementById('p4CoinStarTie').checked = coinStarTie4

		var num = 0
		for (let num2 = 0; num2 < 4; num2++) {
			num++
			document.getElementById('p' + num + 'HappeningText').innerHTML = hap[num2]
			document.getElementById('p' + num + 'MinigameText').innerHTML = mini[num2]
			document.getElementById('p' + num + 'RedSpaceText').innerHTML = red[num2]
			document.getElementById('p' + num + 'RunningText').innerHTML = run[num2]
			document.getElementById('p' + num + 'ShoppingText').innerHTML = shop[num2]
			document.getElementById('p' + num + 'OrbText').innerHTML = orb[num2]
			document.getElementById('p' + num + 'CandyText').innerHTML = candy[num2]
			document.getElementById('p' + num + 'ItemText').innerHTML = item[num2]
			document.getElementById('p' + num + 'FriendSpaceText').innerHTML = friend[num2]
			document.getElementById('p' + num + 'HexText').innerHTML = hex[num2]
			document.getElementById('p' + num + 'SpinSpaceText').innerHTML = spin[num2]
			document.getElementById('p' + num + 'MinusText').innerHTML = minus[num2]
			document.getElementById('p' + num + 'SpecialDiceText').innerHTML = dice[num2]
			document.getElementById('p' + num + 'AllyText').innerHTML = ally[num2]
			document.getElementById('p' + num + 'StompyText').innerHTML = stompy[num2]
			document.getElementById('p' + num + 'DoormatText').innerHTML = doormat[num2]
			document.getElementById('p' + num + 'StarsText').innerHTML = stars[num2]
			document.getElementById('p' + num + 'CoinsText').innerHTML = coins[num2]
		}

		turns('curTurn', curTurn, 'Set')
		coinStarTie()
		callHighlight()
	}
}

/*
* Saves all Characters.
*
* @param {boolean} close If the settings should be closed after saving. True = should be closed.
*/
function savePlayers (close) {
	localStorage.setItem('savePlayers', true)

	localStorage.setItem('char1', characters[1])
	localStorage.setItem('char2', characters[2])
	localStorage.setItem('char3', characters[3])
	localStorage.setItem('char4', characters[4])
	localStorage.setItem('com1', document.getElementById('com1').checked)
	localStorage.setItem('com2', document.getElementById('com2').checked)
	localStorage.setItem('com3', document.getElementById('com3').checked)
	localStorage.setItem('com4', document.getElementById('com4').checked)

	for (let num = 0; num < 17; num++) {
		localStorage.setItem(counters[num], document.getElementById(counters[num] + 'OnOff').checked)
	}
	localStorage.setItem('minigameWins', document.getElementById('minigameWinsOnOff').checked)
	localStorage.setItem('minigameMiniStars', document.getElementById('minigameMiniStarsOnOff').checked)
	localStorage.setItem('slow', document.getElementById('slowOnOff').checked)
	localStorage.setItem('miniStars', document.getElementById('miniStarsOnOff').checked)
	localStorage.setItem('bananas', document.getElementById('bananasOnOff').checked)
	localStorage.setItem('inclBonus', document.getElementById('inclBonusOnOff').checked)

	localStorage.setItem('curGame', curGame)

	if (close == true) {
		showHideDiv(['mobileSettings'])
	}
}

/*
* Resets all characters.
*/
function resetPlayers () {
	localStorage.setItem('savePlayers', false)

	localStorage.setItem('char1', 'mario')
	localStorage.setItem('char2', 'luigi')
	localStorage.setItem('char3', 'yoshi')
	localStorage.setItem('char4', 'peach')
	localStorage.setItem('com1', false)
	localStorage.setItem('com2', false)
	localStorage.setItem('com3', false)
	localStorage.setItem('com4', false)

	localStorage.setItem('happening', true)
	localStorage.setItem('minigame', true)
	localStorage.setItem('minigameWins', false)
	localStorage.setItem('minigameMiniStars', false)
	localStorage.setItem('redSpace', false)
	localStorage.setItem('running', false)
	localStorage.setItem('slow', false)
	localStorage.setItem('shopping', false)
	localStorage.setItem('orb', false)
	localStorage.setItem('candy', false)
	localStorage.setItem('item', false)
	localStorage.setItem('friendSpace', false)
	localStorage.setItem('hex', false)
	localStorage.setItem('spinSpace', false)
	localStorage.setItem('minus', false)
	localStorage.setItem('specialDice', false)
	localStorage.setItem('ally', false)
	localStorage.setItem('stompy', false)
	localStorage.setItem('doormat', false)
	localStorage.setItem('stars', false)
	localStorage.setItem('inclBonus', false)
	localStorage.setItem('miniStars', false)
	localStorage.setItem('bananas', false)
	localStorage.setItem('coins', false)

	document.getElementById('happeningOnOff').checked = true
	document.getElementById('minigameOnOff').checked = true
	document.getElementById('minigameWinsOnOff').checked = false
	document.getElementById('minigameMiniStarsOnOff').checked = false
	document.getElementById('redSpaceOnOff').checked = false
	document.getElementById('runningOnOff').checked = false
	document.getElementById('slowOnOff').checked = false
	document.getElementById('shoppingOnOff').checked = false
	document.getElementById('orbOnOff').checked = false
	document.getElementById('candyOnOff').checked = false
	document.getElementById('itemOnOff').checked = false
	document.getElementById('friendSpaceOnOff').checked = false
	document.getElementById('hexOnOff').checked = false
	document.getElementById('spinSpaceOnOff').checked = false
	document.getElementById('minusOnOff').checked = false
	document.getElementById('specialDiceOnOff').checked = false
	document.getElementById('allyOnOff').checked = false
	document.getElementById('stompyOnOff').checked = false
	document.getElementById('doormatOnOff').checked = false
	document.getElementById('starsOnOff').checked = false
	document.getElementById('inclBonusOnOff').checked = false
	document.getElementById('miniStarsOnOff').checked = false
	document.getElementById('bananasOnOff').checked = false
	document.getElementById('coinsOnOff').checked = false

	changeCharacters(1, 'mario')
	changeCharacters(2, 'luigi')
	changeCharacters(3, 'yoshi')
	changeCharacters(4, 'peach')

	document.getElementById('com1').checked = false
	document.getElementById('com2').checked = false
	document.getElementById('com3').checked = false
	document.getElementById('com4').checked = false
	changeCom(1)
	changeCom(2)
	changeCom(3)
	changeCom(4)

	changeGame('all')
	localStorage.setItem('curGame', 'all')

	callDisplayOnOff()
	changeStars()
}

/*
* Saves all counters.
*/
function saveCounters () {
	localStorage.setItem('saveCounters', true)

	localStorage.setItem('coinStarVar', document.getElementById('coinStarText').innerHTML)
	localStorage.setItem('coinStarTie1', document.getElementById('p1CoinStarTie').checked)
	localStorage.setItem('coinStarTie2', document.getElementById('p2CoinStarTie').checked)
	localStorage.setItem('coinStarTie3', document.getElementById('p3CoinStarTie').checked)
	localStorage.setItem('coinStarTie4', document.getElementById('p4CoinStarTie').checked)

	localStorage.setItem('curTurn', document.getElementById('curTurnText').innerHTML)
	localStorage.setItem('maxTurn', document.getElementById('maxTurnText').innerHTML)

	for (let num2 = 0; num2 < 17; num2++) {
		for (let num = 1; num < 5; num++) {
			localStorage.setItem(countersShort[num2] + num, document.getElementById('p' + num + countersUp[num2] + 'Text').innerHTML)
		}
	}

}

/*
* Resets all counters.
*/
function resetCounters () {
	localStorage.setItem('saveCounters', false)

	localStorage.setItem('coinStarVar', 10)
	localStorage.setItem('coinStarTie1', false)
	localStorage.setItem('coinStarTie2', false)
	localStorage.setItem('coinStarTie3', false)
	localStorage.setItem('coinStarTie4', false)

	localStorage.setItem('curTurn', 1)
	localStorage.setItem('maxTurn', 20)
	document.getElementById('maxTurnText').innerHTML = 20

	for (let num = 1; num2 < 5; num++) {
		for (let num2 = 1; num2 < 17; num2++) {
			localStorage.setItem(countersShort[num2] + num, 0)
		}
	}

	localStorage.setItem('coins1', 10)
	localStorage.setItem('coins2', 10)
	localStorage.setItem('coins3', 10)
	localStorage.setItem('coins4', 10)

	resetBackup()
	updateStars()
}

/*
* Saves all settings in local storage.
*
* @param {boolean} close If the settings should be closed after saving. True = should be closed.
*/
function saveSettings (close) {
	localStorage.setItem('saving', 'true')

	localStorage.setItem('enableInteract', document.getElementById('enableInteract').checked)
	localStorage.setItem('curTheme', curTheme)
	localStorage.setItem('iconStyle', document.querySelector('input[name="icons"]:checked').value)
	localStorage.setItem('greenscreen', document.getElementById('greenscreen').checked)
	localStorage.setItem('bgColor', document.getElementById('bgColor').value)
	localStorage.setItem('textColor', document.getElementById('textColor').value)
	localStorage.setItem('counterHighlight', document.getElementById('enableHighlight').checked)
	localStorage.setItem('highlightColor', document.getElementById('highlightColor').value)
	localStorage.setItem('noTie', document.getElementById('noTie').checked)
	localStorage.setItem('autoSave', document.getElementById('autoSave').checked)
	localStorage.setItem('permSave', document.getElementById('permSave').checked)

	localStorage.setItem('toP1Name', document.getElementById('toP1Name').value)
	localStorage.setItem('toP2Name', document.getElementById('toP2Name').value)
	localStorage.setItem('toP3Name', document.getElementById('toP3Name').value)
	localStorage.setItem('toP4Name', document.getElementById('toP4Name').value)
	localStorage.setItem('toSeperation', document.getElementById('toSeperation').value)
	localStorage.setItem('toCounters', document.getElementById('toCounters').value)
	localStorage.setItem('toOutput', document.getElementById('toOutput').value)
	localStorage.setItem('toBonusOnly', document.getElementById('toBonusOnly').checked)
	localStorage.setItem('toShowNum', document.getElementById('toShowNum').checked)
	localStorage.setItem('toListAll', document.getElementById('toListAll').checked)
	localStorage.setItem('toListAllCoin', document.getElementById('toListAllCoin').checked)

	if (close == true) {
		showHideDiv(['settings'])
	}
}

/*
* Prepares all settings that were saved in local storage when the site gets loaded.
*/
function prepareMPO () {
	document.getElementById('error').style = 'display: inline;'
	if (localStorage.getItem('saving') == 'true') {

		document.getElementById('enableInteract').checked = stringToBoolean(localStorage.getItem('enableInteract'))
		curTheme = parseInt(localStorage.getItem('curTheme'))
		document.getElementById('greenscreen').checked = stringToBoolean(localStorage.getItem('greenscreen'))
		document.getElementById('bgColor').value = localStorage.getItem('bgColor')
		changeTheme(curTheme)

		if (localStorage.getItem('iconStyle') == 'mk8Icons') {
			document.getElementById('mk8Icons').checked = true
			changeIcons('icons')
		} else {
			document.getElementById('mpsrIcons').checked = true
			document.getElementById('mpsrIcons2').checked = true
		}

		document.getElementById('textColor').value = localStorage.getItem('textColor')
		changeTextColor('textColor')

		document.getElementById('enableHighlight').checked = stringToBoolean(localStorage.getItem('counterHighlight'))
		document.getElementById('highlightColor').value = localStorage.getItem('highlightColor')

		document.getElementById('noTie').checked = stringToBoolean(localStorage.getItem('noTie'))
		document.getElementById('autoSave').checked = stringToBoolean(localStorage.getItem('autoSave'))
		document.getElementById('permSave').checked = stringToBoolean(localStorage.getItem('permSave'))

		document.getElementById('toP1Name').value = localStorage.getItem('toP1Name')
		document.getElementById('toP2Name').value = localStorage.getItem('toP2Name')
		document.getElementById('toP3Name').value = localStorage.getItem('toP3Name')
		document.getElementById('toP4Name').value = localStorage.getItem('toP4Name')
		document.getElementById('toSeperation').value = localStorage.getItem('toSeperation')
		document.getElementById('toCounters').value = localStorage.getItem('toCounters')
		document.getElementById('toOutput').value = localStorage.getItem('toOutput')
		document.getElementById('toBonusOnly').checked = stringToBoolean(localStorage.getItem('toBonusOnly'))
		document.getElementById('toShowNum').checked = stringToBoolean(localStorage.getItem('toShowNum'))
		document.getElementById('toListAll').checked = stringToBoolean(localStorage.getItem('toListAll'))
		document.getElementById('toListAllCoin').checked = stringToBoolean(localStorage.getItem('toListAllCoin'))
	}

	if (localStorage.getItem('savePlayers') == 'true') {
		changeCharacters(1, localStorage.getItem('char1'))
		changeCharacters(2, localStorage.getItem('char2'))
		changeCharacters(3, localStorage.getItem('char3'))
		changeCharacters(4, localStorage.getItem('char4'))

		document.getElementById('com1').checked = stringToBoolean(localStorage.getItem('com1'))
		document.getElementById('com2').checked = stringToBoolean(localStorage.getItem('com2'))
		document.getElementById('com3').checked = stringToBoolean(localStorage.getItem('com3'))
		document.getElementById('com4').checked = stringToBoolean(localStorage.getItem('com4'))

		changeCom(1)
		changeCom(2)
		changeCom(3)
		changeCom(4)

		for (let num2 = 0; num2 < 17; num2++) {
			document.getElementById(counters[num2] + 'OnOff').checked = stringToBoolean(localStorage.getItem(counters[num2]))
		}
		
		document.getElementById('minigameWinsOnOff').checked = stringToBoolean(localStorage.getItem('minigameWins'))
		document.getElementById('minigameMiniStarsOnOff').checked = stringToBoolean(localStorage.getItem('minigameMiniStars'))
		document.getElementById('slowOnOff').checked = stringToBoolean(localStorage.getItem('slow'))
		document.getElementById('inclBonusOnOff').checked = stringToBoolean(localStorage.getItem('inclBonus'))
		document.getElementById('miniStarsOnOff').checked = stringToBoolean(localStorage.getItem('miniStars'))
		document.getElementById('bananasOnOff').checked = stringToBoolean(localStorage.getItem('bananas'))

		if (localStorage.getItem('miniStars') == 'true') {
			changeStars('miniStars')
		} else if (localStorage.getItem('bananas') == 'true') {
			changeStars('bananas')
		}

		if (document.getElementById('minigameWinsOnOff').checked == true) {
			minigameWins('Wins')
		} else if (document.getElementById('minigameMiniStarsOnOff').checked == true) {
			minigameWins('MiniStars')
		}

		changeGame(localStorage.getItem('curGame'))
	}
	if (localStorage.getItem('saveCounters') == 'true') {
		document.getElementById('coinStarText').innerHTML = localStorage.getItem('coinStarVar')
		document.getElementById('p1CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie1'))
		document.getElementById('p2CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie2'))
		document.getElementById('p3CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie3'))
		document.getElementById('p4CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie4'))
	
		document.getElementById('curTurnText').innerHTML = localStorage.getItem('curTurn')
		document.getElementById('maxTurnText').innerHTML = localStorage.getItem('maxTurn')
	
		for (let num2 = 0; num2 < 17; num2++) {
			for (let num = 1; num < 5; num++) {
				document.getElementById('p' + num + countersUp[num2] + 'Text').innerHTML = localStorage.getItem(countersShort[num2] + num)
			}
		}

		callHighlight(false, true)
		backup()
	}

	coinStarTie()
	callDisplayOnOff()

	document.getElementById('error').style.display = 'none'
}

/*
* Converts a string into a boolean.
*
* @param {string} boolean The string that should get coverted.
*/
function stringToBoolean(boolean) {
	if (boolean == 'true') {
		return true;
	} else if (boolean == 'false') {
		return false;
	}
}

/*
* Resets settings.
*/
function resetSettings () {
	document.getElementById('enableInteract').checked = false
	document.getElementById('mpsrIcons').checked = true
	document.getElementById('greenscreen').checked = false
	document.getElementById('bgColor').value = '#0000FF'
	document.getElementById('textColor').value = '#ffffff'
	document.getElementById('enableHighlight').checked = true
	document.getElementById('highlightColor').value = '#ff0000'
	document.getElementById('noTie').checked = false
	document.getElementById('autoSave').checked = false
	document.getElementById('permSave').checked = false

	document.getElementById('toP1Name').value = ''
	document.getElementById('toP2Name').value = ''
	document.getElementById('toP3Name').value = ''
	document.getElementById('toP4Name').value = ''
	document.getElementById('toSeperation').value = ' | '
	document.getElementById('toCounters').value = 'Turns, Happening, Minigame, Red Space, Coin Star'
	document.getElementById('toOutput').value = 'Turns, ?, MG, Red, Coin Star'
	document.getElementById('toBonusOnly').checked = false
	document.getElementById('toShowNum').checked = true
	document.getElementById('toListAll').checked = false
	document.getElementById('toListAllCoin').checked = false

	localStorage.setItem('saving', 'false')

	localStorage.setItem('enableInteract', document.getElementById('enableInteract').checked)
	localStorage.setItem('curTheme', curTheme)
	localStorage.setItem('iconStyle', document.querySelector('input[name="icons"]:checked').value)
	localStorage.setItem('greenscreen', document.getElementById('greenscreen').checked)
	localStorage.setItem('bgColor', document.getElementById('bgColor').value)
	localStorage.setItem('textColor', document.getElementById('textColor').value)
	localStorage.setItem('counterHighlight', document.getElementById('enableHighlight').checked)
	localStorage.setItem('highlightColor', document.getElementById('highlightColor').value)
	localStorage.setItem('noTie', document.getElementById('noTie').checked)
	localStorage.setItem('autoSave', document.getElementById('autoSave').checked)
	localStorage.setItem('permSave', document.getElementById('permSave').checked)

	localStorage.setItem('toP1Name', document.getElementById('toP1Name').value)
	localStorage.setItem('toP2Name', document.getElementById('toP2Name').value)
	localStorage.setItem('toP3Name', document.getElementById('toP3Name').value)
	localStorage.setItem('toP4Name', document.getElementById('toP4Name').value)
	localStorage.setItem('toSeperation', document.getElementById('toSeperation').value)
	localStorage.setItem('toCounters', document.getElementById('toCounters').value)
	localStorage.setItem('toOutput', document.getElementById('toOutput').value)
	localStorage.setItem('toBonusOnly', document.getElementById('toBonusOnly').checked)
	localStorage.setItem('toShowNum', document.getElementById('toShowNum').checked)
	localStorage.setItem('toListAll', document.getElementById('toListAll').checked)
	localStorage.setItem('toListAllCoin', document.getElementById('toListAllCoin').checked)

	document.getElementById('greenscreen').checked = false
	changeTheme(1)
	changeIcons('icons')
	changeTextColor('textColor')

	callHighlight(false, true)
	resetHighlights()
}