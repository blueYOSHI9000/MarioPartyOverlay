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