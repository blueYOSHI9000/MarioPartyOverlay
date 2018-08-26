var backuped = false

var coinStarVar = 10
var coinStarTie1 = false
var coinStarTie2 = false
var coinStarTie3 = false
var coinStarTie4 = false

var curTurn = 1

var hap1 = 0
var hap2 = 0
var hap3 = 0
var hap4 = 0
var mini1 = 0
var mini2 = 0
var mini3 = 0
var mini4 = 0
var red1 = 0
var red2 = 0
var red3 = 0
var red4 = 0
var run1 = 0
var run2 = 0
var run3 = 0
var run4 = 0
var shop1 = 0
var shop2 = 0
var shop3 = 0
var shop4 = 0
var orb1 = 0
var orb2 = 0
var orb3 = 0
var orb4 = 0
var candy1 = 0
var candy2 = 0
var candy3 = 0
var candy4 = 0
var spin1 = 0
var spin2 = 0
var spin3 = 0
var spin4 = 0
var ztar1 = 0
var ztar2 = 0
var ztar3 = 0
var ztar4 = 0
var dice1 = 0
var dice2 = 0
var dice3 = 0
var dice4 = 0

function resetBackup() {
	document.getElementById('coinStarInput').value = 10
	document.getElementById('p1CoinStarTie').checked = false
	document.getElementById('p2CoinStarTie').checked = false
	document.getElementById('p3CoinStarTie').checked = false
	document.getElementById('p4CoinStarTie').checked = false

	document.getElementById('curTurnInput').value = 1

	document.getElementById('p1HappeningInput').value = 0
	document.getElementById('p2HappeningInput').value = 0
	document.getElementById('p3HappeningInput').value = 0
	document.getElementById('p4HappeningInput').value = 0
	document.getElementById('p1MinigameInput').value = 0
	document.getElementById('p2MinigameInput').value = 0
	document.getElementById('p3MinigameInput').value = 0
	document.getElementById('p4MinigameInput').value = 0
	document.getElementById('p1RedSpaceInput').value = 0
	document.getElementById('p2RedSpaceInput').value = 0
	document.getElementById('p3RedSpaceInput').value = 0
	document.getElementById('p4RedSpaceInput').value = 0
	document.getElementById('p1RunningInput').value = 0
	document.getElementById('p2RunningInput').value = 0
	document.getElementById('p3RunningInput').value = 0
	document.getElementById('p4RunningInput').value = 0
	document.getElementById('p1ShoppingInput').value = 0
	document.getElementById('p2ShoppingInput').value = 0
	document.getElementById('p3ShoppingInput').value = 0
	document.getElementById('p4ShoppingInput').value = 0
	document.getElementById('p1OrbInput').value = 0
	document.getElementById('p2OrbInput').value = 0
	document.getElementById('p3OrbInput').value = 0
	document.getElementById('p4OrbInput').value = 0
	document.getElementById('p1CandyInput').value = 0
	document.getElementById('p2CandyInput').value = 0
	document.getElementById('p3CandyInput').value = 0
	document.getElementById('p4CandyInput').value = 0
	document.getElementById('p1SpinSpaceInput').value = 0
	document.getElementById('p2SpinSpaceInput').value = 0
	document.getElementById('p3SpinSpaceInput').value = 0
	document.getElementById('p4SpinSpaceInput').value = 0
	document.getElementById('p1MiniZtarInput').value = 0
	document.getElementById('p2MiniZtarInput').value = 0
	document.getElementById('p3MiniZtarInput').value = 0
	document.getElementById('p4MiniZtarInput').value = 0
	document.getElementById('p1SpecialDiceInput').value = 0
	document.getElementById('p2SpecialDiceInput').value = 0
	document.getElementById('p3SpecialDiceInput').value = 0
	document.getElementById('p4SpecialDiceInput').value = 0

	callDisplayChange()
	turns()
	coinStar()
	coinStarTie()
	callHighlight()
}

function backup() {
	document.getElementById('reloadButton').disabled = false
	backuped = true

	coinStarVar = document.getElementById('coinStarInput').value
	coinStarTie1 = document.getElementById('p1CoinStarTie').checked
	coinStarTie2 = document.getElementById('p2CoinStarTie').checked
	coinStarTie3 = document.getElementById('p3CoinStarTie').checked
	coinStarTie4 = document.getElementById('p4CoinStarTie').checked

	curTurn = document.getElementById('curTurnInput').value

	hap1 = document.getElementById('p1HappeningInput').value
	hap2 = document.getElementById('p2HappeningInput').value
	hap3 = document.getElementById('p3HappeningInput').value
	hap4 = document.getElementById('p4HappeningInput').value
	mini1 = document.getElementById('p1MinigameInput').value
	mini2 = document.getElementById('p2MinigameInput').value
	mini3 = document.getElementById('p3MinigameInput').value
	mini4 = document.getElementById('p4MinigameInput').value
	red1 = document.getElementById('p1RedSpaceInput').value
	red2 = document.getElementById('p2RedSpaceInput').value
	red3 = document.getElementById('p3RedSpaceInput').value
	red4 = document.getElementById('p4RedSpaceInput').value
	run1 = document.getElementById('p1RunningInput').value
	run2 = document.getElementById('p2RunningInput').value
	run3 = document.getElementById('p3RunningInput').value
	run4 = document.getElementById('p4RunningInput').value
	shop1 = document.getElementById('p1ShoppingInput').value
	shop2 = document.getElementById('p2ShoppingInput').value
	shop3 = document.getElementById('p3ShoppingInput').value
	shop4 = document.getElementById('p4ShoppingInput').value
	orb1 = document.getElementById('p1OrbInput').value
	orb2 = document.getElementById('p2OrbInput').value
	orb3 = document.getElementById('p3OrbInput').value
	orb4 = document.getElementById('p4OrbInput').value
	candy1 = document.getElementById('p1CandyInput').value
	candy2 = document.getElementById('p2CandyInput').value
	candy3 = document.getElementById('p3CandyInput').value
	candy4 = document.getElementById('p4CandyInput').value
	spin1 = document.getElementById('p1SpinSpaceInput').value
	spin2 = document.getElementById('p2SpinSpaceInput').value
	spin3 = document.getElementById('p3SpinSpaceInput').value
	spin4 = document.getElementById('p4SpinSpaceInput').value
	ztar1 = document.getElementById('p1MiniZtarInput').value
	ztar2 = document.getElementById('p2MiniZtarInput').value
	ztar3 = document.getElementById('p3MiniZtarInput').value
	ztar4 = document.getElementById('p4MiniZtarInput').value
	dice1 = document.getElementById('p1SpecialDiceInput').value
	dice2 = document.getElementById('p2SpecialDiceInput').value
	dice3 = document.getElementById('p3SpecialDiceInput').value
	dice4 = document.getElementById('p4SpecialDiceInput').value
}

function restore(forceRestore) {
	if (backuped == true || forceRestore == true) {
		document.getElementById('coinStarInput').value = coinStarVar
		document.getElementById('p1CoinStarTie').checked = coinStarTie1
		document.getElementById('p2CoinStarTie').checked = coinStarTie2
		document.getElementById('p3CoinStarTie').checked = coinStarTie3
		document.getElementById('p4CoinStarTie').checked = coinStarTie4

		document.getElementById('curTurnInput').value = curTurn

		document.getElementById('p1HappeningInput').value = hap1
		document.getElementById('p2HappeningInput').value = hap2
		document.getElementById('p3HappeningInput').value = hap3
		document.getElementById('p4HappeningInput').value = hap4
		document.getElementById('p1MinigameInput').value = mini1
		document.getElementById('p2MinigameInput').value = mini2
		document.getElementById('p3MinigameInput').value = mini3
		document.getElementById('p4MinigameInput').value = mini4
		document.getElementById('p1RedSpaceInput').value = red1
		document.getElementById('p2RedSpaceInput').value = red2
		document.getElementById('p3RedSpaceInput').value = red3
		document.getElementById('p4RedSpaceInput').value = red4
		document.getElementById('p1RunningInput').value = run1
		document.getElementById('p2RunningInput').value = run2
		document.getElementById('p3RunningInput').value = run3
		document.getElementById('p4RunningInput').value = run4
		document.getElementById('p1ShoppingInput').value = shop1
		document.getElementById('p2ShoppingInput').value = shop2
		document.getElementById('p3ShoppingInput').value = shop3
		document.getElementById('p4ShoppingInput').value = shop4
		document.getElementById('p1OrbInput').value = orb1
		document.getElementById('p2OrbInput').value = orb2
		document.getElementById('p3OrbInput').value = orb3
		document.getElementById('p4OrbInput').value = orb4
		document.getElementById('p1CandyInput').value = candy1
		document.getElementById('p2CandyInput').value = candy2
		document.getElementById('p3CandyInput').value = candy3
		document.getElementById('p4CandyInput').value = candy4
		document.getElementById('p1SpinSpaceInput').value = spin1
		document.getElementById('p2SpinSpaceInput').value = spin2
		document.getElementById('p3SpinSpaceInput').value = spin3
		document.getElementById('p4SpinSpaceInput').value = spin4
		document.getElementById('p1MiniZtarInput').value = ztar1
		document.getElementById('p2MiniZtarInput').value = ztar2
		document.getElementById('p3MiniZtarInput').value = ztar3
		document.getElementById('p4MiniZtarInput').value = ztar4
		document.getElementById('p1SpecialDiceInput').value = dice1
		document.getElementById('p2SpecialDiceInput').value = dice2
		document.getElementById('p3SpecialDiceInput').value = dice3
		document.getElementById('p4SpecialDiceInput').value = dice4

		callDisplayChange()
		turns()
		coinStar()
		coinStarTie()
		callHighlight()
	}
}

/*
* Saves all settings as cookies.
*
* @param {boolean} close If the settings should be closed after saving. True = should be closed.
*/
function saveSettings (close) {
	localStorage.setItem('saving', 'true')

	localStorage.setItem('curTheme', curTheme)
	localStorage.setItem('greenscreen', document.getElementById('greenscreen').checked)
	localStorage.setItem('bgColor', document.getElementById('bgColor').value)
	localStorage.setItem('textColor', document.getElementById('textColor').value)
	localStorage.setItem('bonusName', document.getElementById('changeNames').checked)
	localStorage.setItem('counterHighlight', document.getElementById('enableHighlight').checked)
	localStorage.setItem('highlightColor', document.getElementById('highlightColor').value)
	localStorage.setItem('noTie', document.getElementById('noTie').checked)

	localStorage.setItem('botName', document.getElementById('twitchNameInput').value)
	localStorage.setItem('botOauth', document.getElementById('twitchPasswordInput').value)
	localStorage.setItem('twitchChannel', document.getElementById('twitchChannelInput').value)
	localStorage.setItem('autoconnect', document.getElementById('twitchAutoConnect').checked)
	localStorage.setItem('userWhitelist', document.getElementById('userWhitelist').value)
	localStorage.setItem('adminList', document.getElementById('adminList').value)

	localStorage.setItem('commandsEnabled', document.getElementById('commandsEnabled').checked)
	localStorage.setItem('enablecmdConnected', document.getElementById('enablecmdConnected').checked)
	localStorage.setItem('enablecmdHelp', document.getElementById('enablecmdHelp').checked)
	localStorage.setItem('enablecmdCompleted', document.getElementById('enablecmdCompleted').checked)
	localStorage.setItem('enablecmdError', document.getElementById('enablecmdError').checked)
	localStorage.setItem('enablecmdMissing', document.getElementById('enablecmdMissing').checked)
	localStorage.setItem('enablecmdNoPerm', document.getElementById('enablecmdNoPerm').checked)

	localStorage.setItem('cmdConnected', document.getElementById('cmdConnected').value)
	localStorage.setItem('cmdHelp', document.getElementById('cmdHelp').value)
	localStorage.setItem('cmdCompleted', document.getElementById('cmdCompleted').value)
	localStorage.setItem('cmdError', document.getElementById('cmdError').value)
	localStorage.setItem('cmdMissing', document.getElementById('cmdMissing').value)
	localStorage.setItem('cmdNoPerm', document.getElementById('cmdNoPerm').value)

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
		showHideDiv('settings')
	}
}

/*
* Prepares all settings that were saved as cookies when the site gets loaded.
*/
function prepareMPO () {
	document.getElementById('error').style = 'display: inline;'
	if (localStorage.getItem('saving') == 'true') {

		curTheme = parseInt(localStorage.getItem('curTheme'))

		document.getElementById('greenscreen').checked = stringToBoolean(localStorage.getItem('greenscreen'))
		document.getElementById('bgColor').value = localStorage.getItem('bgColor')
		changeTheme(curTheme)

		document.getElementById('textColor').value = localStorage.getItem('textColor')
		changeTextColor('textColor')

		document.getElementById('changeNames').checked = stringToBoolean(localStorage.getItem('bonusName'))
		if (document.getElementById('changeNames').checked == true) {
		 	changeNames()
		}

		document.getElementById('enableHighlight').checked = stringToBoolean(localStorage.getItem('counterHighlight'))
		document.getElementById('highlightColor').value = localStorage.getItem('highlightColor')
		/*if (document.getElementById('enableHighlight').checked == true) {
		 	callHighlight(false, true)
		}*/

		document.getElementById('noTie').checked = stringToBoolean(localStorage.getItem('noTie'))


		document.getElementById('twitchNameInput').value = localStorage.getItem('botName')
		document.getElementById('twitchPasswordInput').value = localStorage.getItem('botOauth')
		document.getElementById('twitchChannelInput').value = localStorage.getItem('twitchChannel')
		document.getElementById('twitchAutoConnect').checked = stringToBoolean(localStorage.getItem('autoconnect'))

		document.getElementById('userWhitelist').value = localStorage.getItem('userWhitelist')
		document.getElementById('adminList').value = localStorage.getItem('adminList')
		saveTwitchLists()

		document.getElementById('commandsEnabled').checked = stringToBoolean(localStorage.getItem('commandsEnabled'))
		document.getElementById('enablecmdConnected').checked = stringToBoolean(localStorage.getItem('enablecmdConnected'))
		document.getElementById('enablecmdHelp').checked = stringToBoolean(localStorage.getItem('enablecmdHelp'))
		document.getElementById('enablecmdCompleted').checked = stringToBoolean(localStorage.getItem('enablecmdCompleted'))
		document.getElementById('enablecmdError').checked = stringToBoolean(localStorage.getItem('enablecmdError'))
		document.getElementById('enablecmdMissing').checked = stringToBoolean(localStorage.getItem('enablecmdMissing'))
		document.getElementById('enablecmdNoPerm').checked = stringToBoolean(localStorage.getItem('enablecmdNoPerm'))

		document.getElementById('cmdConnected').value = localStorage.getItem('cmdConnected')
		document.getElementById('cmdHelp').value = localStorage.getItem('cmdHelp')
		document.getElementById('cmdCompleted').value = localStorage.getItem('cmdCompleted')
		document.getElementById('cmdError').value = localStorage.getItem('cmdError')
		document.getElementById('cmdMissing').value = localStorage.getItem('cmdMissing')
		document.getElementById('cmdNoPerm').value = localStorage.getItem('cmdNoPerm')

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

		if (document.getElementById('twitchAutoConnect').checked == true) {
		 	connectTwitch()
		}
	}

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
* Resets settings and clears cookies.
*/
function resetSettings () {
	localStorage.clear()

	document.getElementById('greenscreen').checked = false
	document.getElementById('bgColor').value = '#0000FF'
	document.getElementById('changeNames').checked = false
	document.getElementById('enableHighlight').checked = true
	document.getElementById('highlightColor').value = '#ff0000'
	document.getElementById('noTie').checked = false

	document.getElementById('twitchNameInput').value = ''
	document.getElementById('twitchPasswordInput').value = ''
	document.getElementById('twitchChannelInput').value = ''
	document.getElementById('twitchAutoConnect').checked = false

	document.getElementById('commandsEnabled').checked = true
	document.getElementById('enablecmdConnected').checked = true
	document.getElementById('enablecmdHelp').checked = true
	document.getElementById('enablecmdCompleted').checked = ''
	document.getElementById('enablecmdError').checked = true
	document.getElementById('enablecmdMissing').checked = true
	document.getElementById('enablecmdNoPerm').checked = true
	document.getElementById('cmdConnected').value = 'MPO has succesfully connected to Twitch.'
	document.getElementById('cmdHelp').value = 'Correct usage: "!mpo *counter* *player* *action*"; "!mpo happening 3 +1", more info avaible at: https://github.com/blueYOSHI9000/MarioPartyOverlay/wiki/Twitch-Commands-Summary'
	document.getElementById('cmdCompleted').value = '@user, action completed.'
	document.getElementById('cmdError').value = '@user, "*wrong argument entered by user*" is a invalid argument, check "!mpo commands" for help.'
	document.getElementById('cmdMissing').value = '@user, your last argument is missing, check "!mpo commands" for help.'
	document.getElementById('cmdNoPerm').value = '@user, you don\'t have the permission to use this command.'

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

	showHideReset()

	document.getElementById('greenscreen').checked = false
	changeTheme(1)

	if (document.getElementById('changeNames').checked == false) {
		changeNames()
	}

	callHighlight(false, true)
	resetHighlights()
}