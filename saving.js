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
var item1 = 0
var item2 = 0
var item3 = 0
var item4 = 0
var friend1 = 0
var friend2 = 0
var friend3 = 0
var friend4 = 0
var hex1 = 0
var hex2 = 0
var hex3 = 0
var hex4 = 0
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
var stars1 = 0
var stars2 = 0
var stars3 = 0
var stars4 = 0
var coins1 = 0
var coins2 = 0
var coins3 = 0
var coins4 = 0

/*
* Resets the backup.
*/
function resetBackup() {
	document.getElementById('coinStarText').innerHTML = 10
	document.getElementById('p1CoinStarTie').checked = false
	document.getElementById('p2CoinStarTie').checked = false
	document.getElementById('p3CoinStarTie').checked = false
	document.getElementById('p4CoinStarTie').checked = false

	document.getElementById('p1HappeningText').innerHTML = 0
	document.getElementById('p2HappeningText').innerHTML = 0
	document.getElementById('p3HappeningText').innerHTML = 0
	document.getElementById('p4HappeningText').innerHTML = 0
	document.getElementById('p1MinigameText').innerHTML = 0
	document.getElementById('p2MinigameText').innerHTML = 0
	document.getElementById('p3MinigameText').innerHTML = 0
	document.getElementById('p4MinigameText').innerHTML = 0
	document.getElementById('p1RedSpaceText').innerHTML = 0
	document.getElementById('p2RedSpaceText').innerHTML = 0
	document.getElementById('p3RedSpaceText').innerHTML = 0
	document.getElementById('p4RedSpaceText').innerHTML = 0
	document.getElementById('p1RunningText').innerHTML = 0
	document.getElementById('p2RunningText').innerHTML = 0
	document.getElementById('p3RunningText').innerHTML = 0
	document.getElementById('p4RunningText').innerHTML = 0
	document.getElementById('p1ShoppingText').innerHTML = 0
	document.getElementById('p2ShoppingText').innerHTML = 0
	document.getElementById('p3ShoppingText').innerHTML = 0
	document.getElementById('p4ShoppingText').innerHTML = 0
	document.getElementById('p1OrbText').innerHTML = 0
	document.getElementById('p2OrbText').innerHTML = 0
	document.getElementById('p3OrbText').innerHTML = 0
	document.getElementById('p4OrbText').innerHTML = 0
	document.getElementById('p1CandyText').innerHTML = 0
	document.getElementById('p2CandyText').innerHTML = 0
	document.getElementById('p3CandyText').innerHTML = 0
	document.getElementById('p4CandyText').innerHTML = 0
	document.getElementById('p1ItemText').innerHTML = 0
	document.getElementById('p2ItemText').innerHTML = 0
	document.getElementById('p3ItemText').innerHTML = 0
	document.getElementById('p4ItemText').innerHTML = 0
	document.getElementById('p1FriendSpaceText').innerHTML = 0
	document.getElementById('p2FriendSpaceText').innerHTML = 0
	document.getElementById('p3FriendSpaceText').innerHTML = 0
	document.getElementById('p4FriendSpaceText').innerHTML = 0
	document.getElementById('p1HexText').innerHTML = 0
	document.getElementById('p2HexText').innerHTML = 0
	document.getElementById('p3HexText').innerHTML = 0
	document.getElementById('p4HexText').innerHTML = 0
	document.getElementById('p1SpinSpaceText').innerHTML = 0
	document.getElementById('p2SpinSpaceText').innerHTML = 0
	document.getElementById('p3SpinSpaceText').innerHTML = 0
	document.getElementById('p4SpinSpaceText').innerHTML = 0
	document.getElementById('p1MiniZtarText').innerHTML = 0
	document.getElementById('p2MiniZtarText').innerHTML = 0
	document.getElementById('p3MiniZtarText').innerHTML = 0
	document.getElementById('p4MiniZtarText').innerHTML = 0
	document.getElementById('p1SpecialDiceText').innerHTML = 0
	document.getElementById('p2SpecialDiceText').innerHTML = 0
	document.getElementById('p3SpecialDiceText').innerHTML = 0
	document.getElementById('p4SpecialDiceText').innerHTML = 0
	document.getElementById('p1StarsText').innerHTML = 0
	document.getElementById('p2StarsText').innerHTML = 0
	document.getElementById('p3StarsText').innerHTML = 0
	document.getElementById('p4StarsText').innerHTML = 0
	document.getElementById('p1CoinsText').innerHTML = 0
	document.getElementById('p2CoinsText').innerHTML = 0
	document.getElementById('p3CoinsText').innerHTML = 0
	document.getElementById('p4CoinsText').innerHTML = 0

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

	hap1 = document.getElementById('p1HappeningText').innerHTML
	hap2 = document.getElementById('p2HappeningText').innerHTML
	hap3 = document.getElementById('p3HappeningText').innerHTML
	hap4 = document.getElementById('p4HappeningText').innerHTML
	mini1 = document.getElementById('p1MinigameText').innerHTML
	mini2 = document.getElementById('p2MinigameText').innerHTML
	mini3 = document.getElementById('p3MinigameText').innerHTML
	mini4 = document.getElementById('p4MinigameText').innerHTML
	red1 = document.getElementById('p1RedSpaceText').innerHTML
	red2 = document.getElementById('p2RedSpaceText').innerHTML
	red3 = document.getElementById('p3RedSpaceText').innerHTML
	red4 = document.getElementById('p4RedSpaceText').innerHTML
	run1 = document.getElementById('p1RunningText').innerHTML
	run2 = document.getElementById('p2RunningText').innerHTML
	run3 = document.getElementById('p3RunningText').innerHTML
	run4 = document.getElementById('p4RunningText').innerHTML
	shop1 = document.getElementById('p1ShoppingText').innerHTML
	shop2 = document.getElementById('p2ShoppingText').innerHTML
	shop3 = document.getElementById('p3ShoppingText').innerHTML
	shop4 = document.getElementById('p4ShoppingText').innerHTML
	orb1 = document.getElementById('p1OrbText').innerHTML
	orb2 = document.getElementById('p2OrbText').innerHTML
	orb3 = document.getElementById('p3OrbText').innerHTML
	orb4 = document.getElementById('p4OrbText').innerHTML
	candy1 = document.getElementById('p1CandyText').innerHTML
	candy2 = document.getElementById('p2CandyText').innerHTML
	candy3 = document.getElementById('p3CandyText').innerHTML
	candy4 = document.getElementById('p4CandyText').innerHTML
	item1 = document.getElementById('p1ItemText').innerHTML
	item2 = document.getElementById('p2ItemText').innerHTML
	item3 = document.getElementById('p3ItemText').innerHTML
	item4 = document.getElementById('p4ItemText').innerHTML
	friend1 = document.getElementById('p1FriendSpaceText').innerHTML
	friend2 = document.getElementById('p2FriendSpaceText').innerHTML
	friend3 = document.getElementById('p3FriendSpaceText').innerHTML
	friend4 = document.getElementById('p4FriendSpaceText').innerHTML
	hex1 = document.getElementById('p1HexText').innerHTML
	hex2 = document.getElementById('p2HexText').innerHTML
	hex3 = document.getElementById('p3HexText').innerHTML
	hex4 = document.getElementById('p4HexText').innerHTML
	spin1 = document.getElementById('p1SpinSpaceText').innerHTML
	spin2 = document.getElementById('p2SpinSpaceText').innerHTML
	spin3 = document.getElementById('p3SpinSpaceText').innerHTML
	spin4 = document.getElementById('p4SpinSpaceText').innerHTML
	ztar1 = document.getElementById('p1MiniZtarText').innerHTML
	ztar2 = document.getElementById('p2MiniZtarText').innerHTML
	ztar3 = document.getElementById('p3MiniZtarText').innerHTML
	ztar4 = document.getElementById('p4MiniZtarText').innerHTML
	dice1 = document.getElementById('p1SpecialDiceText').innerHTML
	dice2 = document.getElementById('p2SpecialDiceText').innerHTML
	dice3 = document.getElementById('p3SpecialDiceText').innerHTML
	dice4 = document.getElementById('p4SpecialDiceText').innerHTML
	stars1 = document.getElementById('p1StarsText').innerHTML
	stars2 = document.getElementById('p2StarsText').innerHTML
	stars3 = document.getElementById('p3StarsText').innerHTML
	stars4 = document.getElementById('p4StarsText').innerHTML
	coins1 = document.getElementById('p1CoinsText').innerHTML
	coins2 = document.getElementById('p2CoinsText').innerHTML
	coins3 = document.getElementById('p3CoinsText').innerHTML
	coins4 = document.getElementById('p4CoinsText').innerHTML
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

		document.getElementById('p1HappeningText').innerHTML = hap1
		document.getElementById('p2HappeningText').innerHTML = hap2
		document.getElementById('p3HappeningText').innerHTML = hap3
		document.getElementById('p4HappeningText').innerHTML = hap4
		document.getElementById('p1MinigameText').innerHTML = mini1
		document.getElementById('p2MinigameText').innerHTML = mini2
		document.getElementById('p3MinigameText').innerHTML = mini3
		document.getElementById('p4MinigameText').innerHTML = mini4
		document.getElementById('p1RedSpaceText').innerHTML = red1
		document.getElementById('p2RedSpaceText').innerHTML = red2
		document.getElementById('p3RedSpaceText').innerHTML = red3
		document.getElementById('p4RedSpaceText').innerHTML = red4
		document.getElementById('p1RunningText').innerHTML = run1
		document.getElementById('p2RunningText').innerHTML = run2
		document.getElementById('p3RunningText').innerHTML = run3
		document.getElementById('p4RunningText').innerHTML = run4
		document.getElementById('p1ShoppingText').innerHTML = shop1
		document.getElementById('p2ShoppingText').innerHTML = shop2
		document.getElementById('p3ShoppingText').innerHTML = shop3
		document.getElementById('p4ShoppingText').innerHTML = shop4
		document.getElementById('p1OrbText').innerHTML = orb1
		document.getElementById('p2OrbText').innerHTML = orb2
		document.getElementById('p3OrbText').innerHTML = orb3
		document.getElementById('p4OrbText').innerHTML = orb4
		document.getElementById('p1CandyText').innerHTML = candy1
		document.getElementById('p2CandyText').innerHTML = candy2
		document.getElementById('p3CandyText').innerHTML = candy3
		document.getElementById('p4CandyText').innerHTML = candy4
		document.getElementById('p1ItemText').innerHTML = item1
		document.getElementById('p2ItemText').innerHTML = item2
		document.getElementById('p3ItemText').innerHTML = item3
		document.getElementById('p4ItemText').innerHTML = item4
		document.getElementById('p1FriendSpaceText').innerHTML = friend1
		document.getElementById('p2FriendSpaceText').innerHTML = friend2
		document.getElementById('p3FriendSpaceText').innerHTML = friend3
		document.getElementById('p4FriendSpaceText').innerHTML = friend4
		document.getElementById('p1HexText').innerHTML = hex1
		document.getElementById('p2HexText').innerHTML = hex2
		document.getElementById('p3HexText').innerHTML = hex3
		document.getElementById('p4HexText').innerHTML = hex4
		document.getElementById('p1SpinSpaceText').innerHTML = spin1
		document.getElementById('p2SpinSpaceText').innerHTML = spin2
		document.getElementById('p3SpinSpaceText').innerHTML = spin3
		document.getElementById('p4SpinSpaceText').innerHTML = spin4
		document.getElementById('p1MiniZtarText').innerHTML = ztar1
		document.getElementById('p2MiniZtarText').innerHTML = ztar2
		document.getElementById('p3MiniZtarText').innerHTML = ztar3
		document.getElementById('p4MiniZtarText').innerHTML = ztar4
		document.getElementById('p1SpecialDiceText').innerHTML = dice1
		document.getElementById('p2SpecialDiceText').innerHTML = dice2
		document.getElementById('p3SpecialDiceText').innerHTML = dice3
		document.getElementById('p4SpecialDiceText').innerHTML = dice4

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

	localStorage.setItem('happening', document.getElementById('happeningOnOff').checked)
	localStorage.setItem('minigame', document.getElementById('minigameOnOff').checked)
	localStorage.setItem('minigameWins', document.getElementById('minigameWinsOnOff').checked)
	localStorage.setItem('redSpace', document.getElementById('redSpaceOnOff').checked)
	localStorage.setItem('running', document.getElementById('runningOnOff').checked)
	localStorage.setItem('slow', document.getElementById('slowOnOff').checked)
	localStorage.setItem('shopping', document.getElementById('shoppingOnOff').checked)
	localStorage.setItem('orb', document.getElementById('orbOnOff').checked)
	localStorage.setItem('candy', document.getElementById('candyOnOff').checked)
	localStorage.setItem('item', document.getElementById('itemOnOff').checked)
	localStorage.setItem('friendSpace', document.getElementById('friendSpaceOnOff').checked)
	localStorage.setItem('hex', document.getElementById('hexOnOff').checked)
	localStorage.setItem('spinSpace', document.getElementById('spinSpaceOnOff').checked)
	localStorage.setItem('miniZtar', document.getElementById('miniZtarOnOff').checked)
	localStorage.setItem('specialDice', document.getElementById('specialDiceOnOff').checked)
	localStorage.setItem('stars', document.getElementById('starsOnOff').checked)
	localStorage.setItem('inclBonus', document.getElementById('inclBonusOnOff').checked)
	localStorage.setItem('miniStars', document.getElementById('miniStarsOnOff').checked)
	localStorage.setItem('bananas', document.getElementById('bananasOnOff').checked)
	localStorage.setItem('coins', document.getElementById('coinsOnOff').checked)

	if (close == true) {
		showHideDiv('mobileSettings')
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
	localStorage.setItem('miniZtar', false)
	localStorage.setItem('specialDice', false)
	localStorage.setItem('stars', false)
	localStorage.setItem('inclBonus', false)
	localStorage.setItem('miniStars', false)
	localStorage.setItem('bananas', false)
	localStorage.setItem('coins', false)

	document.getElementById('happeningOnOff').checked = true
	document.getElementById('minigameOnOff').checked = true
	document.getElementById('minigameWinsOnOff').checked = false
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
	document.getElementById('miniZtarOnOff').checked = false
	document.getElementById('specialDiceOnOff').checked = false
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

	localStorage.setItem('hap1', document.getElementById('p1HappeningText').innerHTML)
	localStorage.setItem('hap2', document.getElementById('p2HappeningText').innerHTML)
	localStorage.setItem('hap3', document.getElementById('p3HappeningText').innerHTML)
	localStorage.setItem('hap4', document.getElementById('p4HappeningText').innerHTML)
	localStorage.setItem('mini1', document.getElementById('p1MinigameText').innerHTML)
	localStorage.setItem('mini2', document.getElementById('p2MinigameText').innerHTML)
	localStorage.setItem('mini3', document.getElementById('p3MinigameText').innerHTML)
	localStorage.setItem('mini4', document.getElementById('p4MinigameText').innerHTML)
	localStorage.setItem('red1', document.getElementById('p1RedSpaceText').innerHTML)
	localStorage.setItem('red2', document.getElementById('p2RedSpaceText').innerHTML)
	localStorage.setItem('red3', document.getElementById('p3RedSpaceText').innerHTML)
	localStorage.setItem('red4', document.getElementById('p4RedSpaceText').innerHTML)
	localStorage.setItem('run1', document.getElementById('p1RunningText').innerHTML)
	localStorage.setItem('run2', document.getElementById('p2RunningText').innerHTML)
	localStorage.setItem('run3', document.getElementById('p3RunningText').innerHTML)
	localStorage.setItem('run4', document.getElementById('p4RunningText').innerHTML)
	localStorage.setItem('shop1', document.getElementById('p1ShoppingText').innerHTML)
	localStorage.setItem('shop2', document.getElementById('p2ShoppingText').innerHTML)
	localStorage.setItem('shop3', document.getElementById('p3ShoppingText').innerHTML)
	localStorage.setItem('shop4', document.getElementById('p4ShoppingText').innerHTML)
	localStorage.setItem('orb1', document.getElementById('p1OrbText').innerHTML)
	localStorage.setItem('orb2', document.getElementById('p2OrbText').innerHTML)
	localStorage.setItem('orb3', document.getElementById('p3OrbText').innerHTML)
	localStorage.setItem('orb4', document.getElementById('p4OrbText').innerHTML)
	localStorage.setItem('candy1', document.getElementById('p1CandyText').innerHTML)
	localStorage.setItem('candy2', document.getElementById('p2CandyText').innerHTML)
	localStorage.setItem('candy3', document.getElementById('p3CandyText').innerHTML)
	localStorage.setItem('candy4', document.getElementById('p4CandyText').innerHTML)
	localStorage.setItem('item1', document.getElementById('p1ItemText').innerHTML)
	localStorage.setItem('item2', document.getElementById('p2ItemText').innerHTML)
	localStorage.setItem('item3', document.getElementById('p3ItemText').innerHTML)
	localStorage.setItem('item4', document.getElementById('p4ItemText').innerHTML)
	localStorage.setItem('friend1', document.getElementById('p1FriendSpaceText').innerHTML)
	localStorage.setItem('friend2', document.getElementById('p2FriendSpaceText').innerHTML)
	localStorage.setItem('friend3', document.getElementById('p3FriendSpaceText').innerHTML)
	localStorage.setItem('friend4', document.getElementById('p4FriendSpaceText').innerHTML)
	localStorage.setItem('hex1', document.getElementById('p1HexText').innerHTML)
	localStorage.setItem('hex2', document.getElementById('p2HexText').innerHTML)
	localStorage.setItem('hex3', document.getElementById('p3HexText').innerHTML)
	localStorage.setItem('hex4', document.getElementById('p4HexText').innerHTML)
	localStorage.setItem('spin1', document.getElementById('p1SpinSpaceText').innerHTML)
	localStorage.setItem('spin2', document.getElementById('p2SpinSpaceText').innerHTML)
	localStorage.setItem('spin3', document.getElementById('p3SpinSpaceText').innerHTML)
	localStorage.setItem('spin4', document.getElementById('p4SpinSpaceText').innerHTML)
	localStorage.setItem('ztar1', document.getElementById('p1MiniZtarText').innerHTML)
	localStorage.setItem('ztar2', document.getElementById('p2MiniZtarText').innerHTML)
	localStorage.setItem('ztar3', document.getElementById('p3MiniZtarText').innerHTML)
	localStorage.setItem('ztar4', document.getElementById('p4MiniZtarText').innerHTML)
	localStorage.setItem('dice1', document.getElementById('p1SpecialDiceText').innerHTML)
	localStorage.setItem('dice2', document.getElementById('p2SpecialDiceText').innerHTML)
	localStorage.setItem('dice3', document.getElementById('p3SpecialDiceText').innerHTML)
	localStorage.setItem('dice4', document.getElementById('p4SpecialDiceText').innerHTML)
	localStorage.setItem('stars1', document.getElementById('p1StarsText').innerHTML)
	localStorage.setItem('stars2', document.getElementById('p2StarsText').innerHTML)
	localStorage.setItem('stars3', document.getElementById('p3StarsText').innerHTML)
	localStorage.setItem('stars4', document.getElementById('p4StarsText').innerHTML)
	localStorage.setItem('coins1', document.getElementById('p1CoinsText').innerHTML)
	localStorage.setItem('coins2', document.getElementById('p2CoinsText').innerHTML)
	localStorage.setItem('coins3', document.getElementById('p3CoinsText').innerHTML)
	localStorage.setItem('coins4', document.getElementById('p4CoinsText').innerHTML)
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
	document.getElementById('maxTurnText').innerHTML = 30

	localStorage.setItem('hap1', 0)
	localStorage.setItem('hap2', 0)
	localStorage.setItem('hap3', 0)
	localStorage.setItem('hap4', 0)
	localStorage.setItem('mini1', 0)
	localStorage.setItem('mini2', 0)
	localStorage.setItem('mini3', 0)
	localStorage.setItem('mini4', 0)
	localStorage.setItem('red1', 0)
	localStorage.setItem('red2', 0)
	localStorage.setItem('red3', 0)
	localStorage.setItem('red4', 0)
	localStorage.setItem('run1', 0)
	localStorage.setItem('run2', 0)
	localStorage.setItem('run3', 0)
	localStorage.setItem('run4', 0)
	localStorage.setItem('shop1', 0)
	localStorage.setItem('shop2', 0)
	localStorage.setItem('shop3', 0)
	localStorage.setItem('shop4', 0)
	localStorage.setItem('orb1', 0)
	localStorage.setItem('orb2', 0)
	localStorage.setItem('orb3', 0)
	localStorage.setItem('orb4', 0)
	localStorage.setItem('candy1', 0)
	localStorage.setItem('candy2', 0)
	localStorage.setItem('candy3', 0)
	localStorage.setItem('candy4', 0)
	localStorage.setItem('item1', 0)
	localStorage.setItem('item2', 0)
	localStorage.setItem('item3', 0)
	localStorage.setItem('item4', 0)
	localStorage.setItem('friend1', 0)
	localStorage.setItem('friend2', 0)
	localStorage.setItem('friend3', 0)
	localStorage.setItem('friend4', 0)
	localStorage.setItem('hex1', 0)
	localStorage.setItem('hex2', 0)
	localStorage.setItem('hex3', 0)
	localStorage.setItem('hex4', 0)
	localStorage.setItem('spin1', 0)
	localStorage.setItem('spin2', 0)
	localStorage.setItem('spin3', 0)
	localStorage.setItem('spin4', 0)
	localStorage.setItem('ztar1', 0)
	localStorage.setItem('ztar2', 0)
	localStorage.setItem('ztar3', 0)
	localStorage.setItem('ztar4', 0)
	localStorage.setItem('dice1', 0)
	localStorage.setItem('dice2', 0)
	localStorage.setItem('dice3', 0)
	localStorage.setItem('dice4', 0)
	localStorage.setItem('stars1', 0)
	localStorage.setItem('stars2', 0)
	localStorage.setItem('stars3', 0)
	localStorage.setItem('stars4', 0)
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

		document.getElementById('happeningOnOff').checked = stringToBoolean(localStorage.getItem('happening'))
		document.getElementById('minigameOnOff').checked = stringToBoolean(localStorage.getItem('minigame'))
		document.getElementById('minigameWinsOnOff').checked = stringToBoolean(localStorage.getItem('minigameWins'))
		document.getElementById('redSpaceOnOff').checked = stringToBoolean(localStorage.getItem('redSpace'))
		document.getElementById('runningOnOff').checked = stringToBoolean(localStorage.getItem('running'))
		document.getElementById('slowOnOff').checked = stringToBoolean(localStorage.getItem('slow'))
		document.getElementById('shoppingOnOff').checked = stringToBoolean(localStorage.getItem('shopping'))
		document.getElementById('orbOnOff').checked = stringToBoolean(localStorage.getItem('orb'))
		document.getElementById('candyOnOff').checked = stringToBoolean(localStorage.getItem('candy'))
		document.getElementById('itemOnOff').checked = stringToBoolean(localStorage.getItem('item'))
		document.getElementById('friendSpaceOnOff').checked = stringToBoolean(localStorage.getItem('friendSpace'))
		document.getElementById('hexOnOff').checked = stringToBoolean(localStorage.getItem('hex'))
		document.getElementById('spinSpaceOnOff').checked = stringToBoolean(localStorage.getItem('spinSpace'))
		document.getElementById('miniZtarOnOff').checked = stringToBoolean(localStorage.getItem('miniZtar'))
		document.getElementById('specialDiceOnOff').checked = stringToBoolean(localStorage.getItem('specialDice'))
		document.getElementById('starsOnOff').checked = stringToBoolean(localStorage.getItem('stars'))
		document.getElementById('inclBonusOnOff').checked = stringToBoolean(localStorage.getItem('inclBonus'))
		document.getElementById('miniStarsOnOff').checked = stringToBoolean(localStorage.getItem('miniStars'))
		document.getElementById('bananasOnOff').checked = stringToBoolean(localStorage.getItem('bananas'))
		document.getElementById('coinsOnOff').checked = stringToBoolean(localStorage.getItem('coins'))

		if (localStorage.getItem('miniStars') == 'true') {
			changeStars('miniStars')
		} else if (localStorage.getItem('bananas') == 'true') {
			changeStars('bananas')
		}

		if (document.getElementById('minigameWinsOnOff').checked == true) {
			minigameWins()
		}
	}
	if (localStorage.getItem('saveCounters') == 'true') {
		document.getElementById('coinStarText').innerHTML = localStorage.getItem('coinStarVar')
		document.getElementById('p1CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie1'))
		document.getElementById('p2CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie2'))
		document.getElementById('p3CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie3'))
		document.getElementById('p4CoinStarTie').checked = stringToBoolean(localStorage.getItem('coinStarTie4'))
	
		document.getElementById('curTurnText').innerHTML = localStorage.getItem('curTurn')
		document.getElementById('maxTurnText').innerHTML = localStorage.getItem('maxTurn')
	
		document.getElementById('p1HappeningText').innerHTML = localStorage.getItem('hap1')
		document.getElementById('p2HappeningText').innerHTML = localStorage.getItem('hap2')
		document.getElementById('p3HappeningText').innerHTML = localStorage.getItem('hap3')
		document.getElementById('p4HappeningText').innerHTML = localStorage.getItem('hap4')
		document.getElementById('p1MinigameText').innerHTML = localStorage.getItem('mini1')
		document.getElementById('p2MinigameText').innerHTML = localStorage.getItem('mini2')
		document.getElementById('p3MinigameText').innerHTML = localStorage.getItem('mini3')
		document.getElementById('p4MinigameText').innerHTML = localStorage.getItem('mini4')
		document.getElementById('p1RedSpaceText').innerHTML = localStorage.getItem('red1')
		document.getElementById('p2RedSpaceText').innerHTML = localStorage.getItem('red2')
		document.getElementById('p3RedSpaceText').innerHTML = localStorage.getItem('red3')
		document.getElementById('p4RedSpaceText').innerHTML = localStorage.getItem('red4')
		document.getElementById('p1RunningText').innerHTML = localStorage.getItem('run1')
		document.getElementById('p2RunningText').innerHTML = localStorage.getItem('run2')
		document.getElementById('p3RunningText').innerHTML = localStorage.getItem('run3')
		document.getElementById('p4RunningText').innerHTML = localStorage.getItem('run4')
		document.getElementById('p1ShoppingText').innerHTML = localStorage.getItem('shop1')
		document.getElementById('p2ShoppingText').innerHTML = localStorage.getItem('shop2')
		document.getElementById('p3ShoppingText').innerHTML = localStorage.getItem('shop3')
		document.getElementById('p4ShoppingText').innerHTML = localStorage.getItem('shop4')
		document.getElementById('p1OrbText').innerHTML = localStorage.getItem('orb1')
		document.getElementById('p2OrbText').innerHTML = localStorage.getItem('orb2')
		document.getElementById('p3OrbText').innerHTML = localStorage.getItem('orb3')
		document.getElementById('p4OrbText').innerHTML = localStorage.getItem('orb4')
		document.getElementById('p1CandyText').innerHTML = localStorage.getItem('candy1')
		document.getElementById('p2CandyText').innerHTML = localStorage.getItem('candy2')
		document.getElementById('p3CandyText').innerHTML = localStorage.getItem('candy3')
		document.getElementById('p4CandyText').innerHTML = localStorage.getItem('candy4')
		document.getElementById('p1ItemText').innerHTML = localStorage.getItem('item1')
		document.getElementById('p2ItemText').innerHTML = localStorage.getItem('item2')
		document.getElementById('p3ItemText').innerHTML = localStorage.getItem('item3')
		document.getElementById('p4ItemText').innerHTML = localStorage.getItem('item4')
		document.getElementById('p1FriendSpaceText').innerHTML = localStorage.getItem('friend1')
		document.getElementById('p2FriendSpaceText').innerHTML = localStorage.getItem('friend2')
		document.getElementById('p3FriendSpaceText').innerHTML = localStorage.getItem('friend3')
		document.getElementById('p4FriendSpaceText').innerHTML = localStorage.getItem('friend4')
		document.getElementById('p1HexText').innerHTML = localStorage.getItem('hex1')
		document.getElementById('p2HexText').innerHTML = localStorage.getItem('hex2')
		document.getElementById('p3HexText').innerHTML = localStorage.getItem('hex3')
		document.getElementById('p4HexText').innerHTML = localStorage.getItem('hex4')
		document.getElementById('p1SpinSpaceText').innerHTML = localStorage.getItem('spin1')
		document.getElementById('p2SpinSpaceText').innerHTML = localStorage.getItem('spin2')
		document.getElementById('p3SpinSpaceText').innerHTML = localStorage.getItem('spin3')
		document.getElementById('p4SpinSpaceText').innerHTML = localStorage.getItem('spin4')
		document.getElementById('p1MiniZtarText').innerHTML = localStorage.getItem('ztar1')
		document.getElementById('p2MiniZtarText').innerHTML = localStorage.getItem('ztar2')
		document.getElementById('p3MiniZtarText').innerHTML = localStorage.getItem('ztar3')
		document.getElementById('p4MiniZtarText').innerHTML = localStorage.getItem('ztar4')
		document.getElementById('p1SpecialDiceText').innerHTML = localStorage.getItem('dice1')
		document.getElementById('p2SpecialDiceText').innerHTML = localStorage.getItem('dice2')
		document.getElementById('p3SpecialDiceText').innerHTML = localStorage.getItem('dice3')
		document.getElementById('p4SpecialDiceText').innerHTML = localStorage.getItem('dice4')

		callHighlight(false, true)
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
	document.getElementById('greenscreen').checked = false
	document.getElementById('bgColor').value = '#0000FF'
	document.getElementById('textColor').value = '#ffffff'
	document.getElementById('enableHighlight').checked = true
	document.getElementById('highlightColor').value = '#ff0000'
	document.getElementById('noTie').checked = false

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
	localStorage.setItem('greenscreen', document.getElementById('greenscreen').checked)
	localStorage.setItem('bgColor', document.getElementById('bgColor').value)
	localStorage.setItem('textColor', document.getElementById('textColor').value)
	localStorage.setItem('counterHighlight', document.getElementById('enableHighlight').checked)
	localStorage.setItem('highlightColor', document.getElementById('highlightColor').value)
	localStorage.setItem('noTie', document.getElementById('noTie').checked)

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
	changeTextColor('textColor')

	callHighlight(false, true)
	resetHighlights()
}