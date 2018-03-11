// === INSERT BELOW THIS LINE ===



//Global Variables
var highlightColor = '#ff0000'

//Input Buttons
function counterButtons (player, button, counter) {
	if (button == 'P10') {
		for (let num = 0; num < 10; num++) {
			document.getElementById(player + counter + 'Input').value++
		}
	} else if (button == 'P6') {
		for (let num = 0; num < 6; num++) {
			document.getElementById(player + counter + 'Input').value++
		}
	} else if (button == 'P5') {
		for (let num = 0; num < 5; num++) {
			document.getElementById(player + counter + 'Input').value++
		}
	} else if (button == 'P') {
		document.getElementById(player + counter + 'Input').value++
	} else if (button == 'M') {
		document.getElementById(player + counter + 'Input').value--
	} else if (button == 'M5') {
		for (let num = 0; num < 5; num++) {
			document.getElementById(player + counter + 'Input').value--
		}
	} else if (button == 'M6') {
		for (let num = 0; num < 6; num++) {
			document.getElementById(player + counter + 'Input').value--
		}
	} else if (button == 'M10') {
		for (let num = 0; num < 10; num++) {
			document.getElementById(player + counter + 'Input').value--
		}
	}
	if (player == 'p1') {
	displayChange(1, counter)
	} else if (player == 'p2') {
	displayChange(2, counter)
	} else if (player == 'p3') {
	displayChange(3, counter)
	} else if (player == 'p4') {
	displayChange(4, counter)
	}

	if (counter == 'coinStar') {
		coinStar()
	} else if (counter == 'maxTurn' || counter == 'curTurn') {
		turns()
	} else if (document.getElementById('enableHighlight').checked == true) {
		highlight(counter, highlightColor)
	}

	if (document.getElementById('slowStarActivated').checked == true) {
		slowHighlight(highlightColor)
	}
}

//On/Off Buttons
function displayOnOff (counter, scounter, no10) {
	//var displayNone = document.getElementById('p1' + counter + 'Display').name
	var displayNone = parseInt(document.getElementById(scounter + 'Var').value);

	var playerNum = 1
	var visible = "display: none;"
	
	if (displayNone  == 1) {
		document.getElementById(scounter + 'Explanation').style = "display: none;"
		document.getElementById(scounter + 'Var').value=0
	} else if (displayNone == 0) {
		document.getElementById(scounter + 'Explanation').style = " "
		document.getElementById(scounter + 'Var').value=1
	}

	for (let num = 1; num < 5; num++) {
		if (num == 1) {
			playerNum = 1
		} else if (num == 2) {
			playerNum = 2
		} else if (num == 3) {
			playerNum = 3
		} else if (num == 4) {
			playerNum = 4
		}
		if (displayNone  == 1) {
			visible = "display: none;"
			document.getElementById('p1' + counter + 'Display').name=0
		} else if (displayNone == 0) {
			visible = " "
			document.getElementById('p1' + counter + 'Display').name=1
		}

		document.getElementById('p' + playerNum + counter + 'Display').style = visible
		document.getElementById('p' + playerNum + counter + 'Text').style = visible
		document.getElementById('p' + playerNum + counter + 'Break').style = visible

		document.getElementById('p' + playerNum + counter + 'InputTextBefore').style = visible
		document.getElementById('p' + playerNum + counter + 'Input').style = visible
		document.getElementById('p' + playerNum + counter + 'InputM').style = visible
		document.getElementById('p' + playerNum + counter + 'InputP').style = visible

		if (no10) {
		} else {
			document.getElementById('p' + playerNum + counter + 'InputM10').style = visible
			document.getElementById('p' + playerNum + counter + 'InputP10').style = visible
		}
		if (counter == 'Running' && visible == 'display: none;') {
			document.getElementById('p' + playerNum + counter + 'InputM6').style = 'display: none;'
			document.getElementById('p' + playerNum + counter + 'InputP6').style = 'display: none;'
			document.getElementById('slowStarActivated').checked = false
		} else if (counter == 'Running' && visible == '') {
			document.getElementById('p' + playerNum + counter + 'InputM6').style = ''
			document.getElementById('p' + playerNum + counter + 'InputP6').style = ''
		}
	}
}

//Bonus star highlight
function resetHighlights () {
	if (document.getElementById('enableHighlight').checked == false) {
		startHighlight(true)
	} else {
		startHighlight()
	}
}

function startHighlight (resetHighlights) {
		var originalHighlightColor = highlightColor
	if (resetHighlights) {
		originalHighlightColor = highlightColor
		highlightColor = 'white'
	}

	if (document.getElementById('enableHighlight').checked == true || resetHighlights) {
		highlightOn = true
		resetHighlights = false
		if (document.getElementById('happeningVar').value == 1 ) {
			highlight('Happening', highlightColor)
		}
		if (document.getElementById('minigameVar').value == 1 ) {
			highlight('Minigame', highlightColor)
		}
		if (document.getElementById('redSpaceVar').value == 1 ) {
			highlight('RedSpace', highlightColor)
		}
		if (document.getElementById('runningVar').value == 1 && document.getElementById('slowStarActivated').checked == false ) {
			highlight('Running', highlightColor)
		} else if (document.getElementById('runningVar').value == 1 && document.getElementById('slowStarActivated').checked == true ) {
			slowHighlight(highlightColor)
		}
		if (document.getElementById('shoppingVar').value == 1 ) {
			highlight('Shopping', highlightColor)
		}
		if (document.getElementById('orbVar').value == 1 ) {
			highlight('Orb', highlightColor)
		}
		if (document.getElementById('candyVar').value == 1 ) {
			highlight('Candy', highlightColor)
		}
		if (document.getElementById('spinSpaceVar').value == 1 ) {
			highlight('SpinSpace', highlightColor)
		}
		if (slowStarActivated == true) {
			slowHighlight(highlightColor)
		}
		if (document.getElementById('miniZtarVar').value == 1 ) {
			highlight('MiniZtar', highlightColor)
		}
		if (document.getElementById('specialDiceVar').value == 1 ) {
			highlight('SpecialDice', highlightColor)
		}
	}
	highlightColor = originalHighlightColor
}

function highlight (counter, color) {
	var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
	var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
	var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
	var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

	var counterNum = Math.max(counterP1, counterP2, counterP3, counterP4)

	if (counterP1 == 0 && counterP2 == 0 && counterP3 == 0 && counterP4 == 0) {
		document.getElementById('p1' + counter + 'Text').style.color = 'white'
		document.getElementById('p2' + counter + 'Text').style.color = 'white'
		document.getElementById('p3' + counter + 'Text').style.color = 'white'
		document.getElementById('p4' + counter + 'Text').style.color = 'white'
	} else {
		if (counterNum == counterP1) {
			document.getElementById('p1' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p1' + counter + 'Text').style.color = 'white'
		}

		if (counterNum == counterP2) {
			document.getElementById('p2' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p2' + counter + 'Text').style.color = 'white'
		}

		if (counterNum == counterP3) {
			document.getElementById('p3' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p3' + counter + 'Text').style.color = 'white'
		}

		if (counterNum == counterP4) {
			document.getElementById('p4' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p4' + counter + 'Text').style.color = 'white'
		}
	}
}

//Slow Star Display On/Off
function slowStar () {
	if (document.getElementById('runningVar').value == 0) {
		displayOnOff('Running', 'running')
	}

	var playerNum = 1

	for (let num = 1; num < 5; num++) {
		if (num == 1) {
			playerNum = 1
		} else if (num == 2) {
			playerNum = 2
		} else if (num == 3) {
			playerNum = 3
		} else if (num == 4) {
			playerNum = 4
		}

		if (document.getElementById('slowStarActivated').checked == true) {
			document.getElementById('p' + playerNum + 'RunningInputM10').style = 'display: none;'
			document.getElementById('p' + playerNum + 'RunningInputP10').style = 'display: none;'
			document.getElementById('p' + playerNum + 'RunningInputM6').style = ''
			document.getElementById('p' + playerNum + 'RunningInputP6').style = ''
		} else {
			document.getElementById('p' + playerNum + 'RunningInputM10').style = ''
			document.getElementById('p' + playerNum + 'RunningInputP10').style = ''
			document.getElementById('p' + playerNum + 'RunningInputM6').style = 'display: none;'
			document.getElementById('p' + playerNum + 'RunningInputP6').style = 'display: none;'
		}
	}
}

//Highlighting Slow & Running Star
function slowHighlight (color) {
		var counter = 'Running'

		var counterP1 = document.getElementById('p1' + counter + 'Text').innerHTML
		var counterP2 = document.getElementById('p2' + counter + 'Text').innerHTML
		var counterP3 = document.getElementById('p3' + counter + 'Text').innerHTML
		var counterP4 = document.getElementById('p4' + counter + 'Text').innerHTML

		var counterNumMax = Math.max(counterP1, counterP2, counterP3, counterP4)
		var counterNumMin = Math.min(counterP1, counterP2, counterP3, counterP4)


		if (counterP1 == 0) {
			document.getElementById('p1' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP1 || counterNumMin == counterP1) {
			document.getElementById('p1' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p1' + counter + 'Text').style.color = 'white'
		}

		if (counterP2 == 0) {
			document.getElementById('p2' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP2 || counterNumMin == counterP2) {
			document.getElementById('p2' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p2' + counter + 'Text').style.color = 'white'
		}

		if (counterP3 == 0) {
			document.getElementById('p3' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP3 || counterNumMin == counterP3) {
			document.getElementById('p3' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p3' + counter + 'Text').style.color = 'white'
		}

		if (counterP4 == 0) {
			document.getElementById('p4' + counter + 'Text').style.color = 'white'
		} else if (counterNumMax == counterP4 || counterNumMin == counterP4) {
			document.getElementById('p4' + counter + 'Text').style.color = color
		} else {
			document.getElementById('p4' + counter + 'Text').style.color = 'white'
		}
}

//Replaces Minigame Coins with Minigame Wins
function minigameWins () {
	var activated = document.getElementById('minigameWinsActivated').checked
	var playerNum = 1
	var source = 'img/minigamewins.png'

	if (activated == true) {
		source = 'img/minigamewins.png'
	} else {
		source = 'img/minigame.png'
	}
	
	for (let num = 1; num < 5; num++) {
		if (num == 1) {
			playerNum = 1
		} else if (num == 2) {
			playerNum = 2
		} else if (num == 3) {
			playerNum = 3
		} else if (num == 4) {
			playerNum = 4
		}
		document.getElementById('p' + playerNum + 'MinigameDisplay').src = source
	}
}

//Changes Character Images
function imgSelect(playerNum) {
	var character = document.getElementById(playerNum + 'Select').value
	if (document.getElementById(playerNum + 'Com').checked) {
		var finalImage = "img/" + "com/" + character + ".png"
	} else {
		var finalImage = "img/" + character + ".png"
	}
	document.getElementById(playerNum + 'Img').src = finalImage
}

//Changes Displays & Input
function displayChange (playerNum, counter) {
	var num = document.getElementById('p' + playerNum + counter + 'Input').value
	if (num && num >= 0) {
		document.getElementById('p' + playerNum + counter + 'Text').innerHTML=num;
	} else if (num && num <= 0) {
		document.getElementById('p' + playerNum + counter + 'Input').value = 0
	}
}

//Calls displayChange()
function callDisplayChange () {
	var counter = 'Happening'
	var playerNum = 1

	for (let num = 0; num < 10; num++) {
		if (num == 0) {
			counter  = 'Happening'
		} else if (num == 1) {
			counter = 'Minigame'
		} else if (num == 2) {
			counter = 'RedSpace'
		} else if (num == 3) {
			counter = 'Running'
		} else if (num == 4) {
			counter = 'Shopping'
		} else if (num == 5) {
			counter = 'Orb'
		} else if (num == 6) {
			counter = 'Candy'
		} else if (num == 7) {
			counter = 'SpinSpace'
		} else if (num == 8) {
			counter = 'MiniZtar'
		} else if (num == 9) {
			counter = 'SpecialDice'
		}

		for (let num = 1; num < 5; num++) {
			if (num == 1) {
				playerNum = 1
			} else if (num == 2) {
				playerNum = 2
			} else if (num == 3) {
				playerNum = 3
			} else if (num == 4) {
				playerNum = 4
			}
			displayChange(playerNum, counter)
		}
	}
}

//Changes the Turns Display & Input
function turns () {
	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value

	if (curTurnVar <= 0) {
		document.getElementById('curTurnInput').value = 0
	} else if (+curTurnVar > +maxTurnVar) {
		document.getElementById('curTurnInput').value = maxTurnVar
	}
	if (+maxTurnVar < 1) {
		document.getElementById('maxTurnInput').value = 0
	}
	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value
	console.log('Current:' + curTurnVar + ' Max:' + maxTurnVar)

	document.getElementById('curTurnText').innerHTML= curTurnVar + '/' + maxTurnVar
}

//Changes the Coin Star Display
function coinStar () {
	var coinStarVar = document.getElementById('coinStarInput').value
	if (coinStarVar && coinStarVar >= 0) {
		document.getElementById("coinStarText").innerHTML=coinStarVar
	} else if (coinStarVar < 0) {
		document.getElementById('coinStarInput').value = 0
	}
}

//Changes Coin Star Image
function coinStarCharImg() {
	var character = document.getElementById('coinStarCharSelect').value
	var finalImage = "img/" + character + ".png"
	document.getElementById('coinStarCharacter').src = finalImage
}

//Mario Party Changes Margin when nothing is there
function changesMargin () {
	var running = document.getElementById('runningVar').value
	var shopping = document.getElementById('shoppingVar').value
	var orb = document.getElementById('orbVar').value
	var candy = document.getElementById('candyVar').value

	if (running == 0 && shopping == 0 && orb == 0 && candy == 0) {
		var p = document.getElementById('player4');
		var newElement = document.createElement('div');
		newElement.setAttribute('sizeChangeDiv', 'sizeChangeDiv');
		//newElement.innerHTML = html;
		p.appendChild(newElement);

	} else if (running == 1 || shopping == 1 || orb == 1 || candy == 1) {
		var node = document.getElementById("sizeChangeDiv");
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}
}

//Show/Hide Tutorial
function showhide () {
	var div = document.getElementById("tutorial");
	if (div.style.display !== "none") {
		div.style.display = "none";
	}
	else {
		div.style.display = "block";
	}
}

function showHideTutorial (id) {
	var div = document.getElementById(id).classList
	console.log(div)
	if (div == 'hidden') {
		document.getElementById(id).classList.add('visible');
		document.getElementById(id).classList.remove('hidden');
	} else {
		document.getElementById(id).classList.remove('visible');
		document.getElementById(id).classList.add('hidden');
	}
}

//Change names
function changeNames () {
	if (document.getElementById('changeNames').checked == true) {
		document.getElementById('happeningExplanation').innerHTML = 'Happening:'
		document.getElementById('minigameExplanation').innerHTML = 'Minigame:'
		document.getElementById('redSpaceExplanation').innerHTML = 'Red Space:'
		document.getElementById('runningExplanation').innerHTML = 'Running:'
		document.getElementById('shoppingExplanation').innerHTML = 'Shopping:'
		document.getElementById('orbExplanation').innerHTML = 'Orb:'
		document.getElementById('candyExplanation').innerHTML = 'Candy:'
		document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Space:'
		document.getElementById('miniZtarExplanation').innerHTML = 'Minus:'
		document.getElementById('specialDiceExplanation').innerHTML = 'Special Dice:'
	} else {
		document.getElementById('happeningExplanation').innerHTML = 'Happening:'
		document.getElementById('minigameExplanation').innerHTML = 'Minigame Coins:'
		document.getElementById('redSpaceExplanation').innerHTML = 'Red Spaces:'
		document.getElementById('runningExplanation').innerHTML = 'Total Dice Num.:'
		document.getElementById('shoppingExplanation').innerHTML = 'Total Coins spent:'
		document.getElementById('orbExplanation').innerHTML = 'Total Orbs used:'
		document.getElementById('candyExplanation').innerHTML = 'Total Candies used:'
		document.getElementById('spinSpaceExplanation').innerHTML = 'Spin Spaces:'
		document.getElementById('miniZtarExplanation').innerHTML = 'Mini Ztars collected:'
		document.getElementById('specialDiceExplanation').innerHTML = 'Total Special Dices used:'
	}
}

//Background
var bgImgOn = 1
function bgOnOff ()
{

	if (bgImgOn == 1) {
		document.getElementById('htmlTag').style = "background: #0000ff;"
		bgImgOn = 0
	} else {
		document.getElementById('htmlTag').style = "background: url(img/background.jpg) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"
		bgImgOn = 1
	}
}

//Deactivate MP9
function getUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
 	return(false);
}

window.onload = function() {
	noMP9()
};

function noMP9 () {
	var playerNum = 1

	if (getUrl('no9') == 1) {
		for (let num = 1; num < 6; num++) {
			if (num == 1) {
				playerNum = 1
			} else if (num == 2) {
				playerNum = 2
			} else if (num == 3) {
				playerNum = 3
			} else if (num == 4) {
				playerNum = 4
			} else if (num == 5) {
				playerNum = 5
			}

			var charSelect = document.getElementById('p' + playerNum + 'Select')
			if (playerNum == 5) {
				charSelect = document.getElementById('coinStarCharSelect')
			}
			for (var i=0; i<charSelect.length; i++){
				var opt = charSelect.options[i].value
				if (opt == 'shyguy' || opt == 'kamek' || opt == 'koopa' || opt == 'rosalina' || opt == 'spike' )
				charSelect.remove(i);
			}
		}
		for (let num = 1; num < 8; num++) {
			if (num == 1) {
				delethis = document.getElementById('spinSpaceButton')
			} else if (num == 2) {
				delethis = document.getElementById('miniZtarButton')
			} else if (num == 3) {
				delethis = document.getElementById('specialDiceButton')
			} else if (num == 4) {
				delethis = document.getElementById('slowStarActivated')
			} else if (num == 5) {
				delethis = document.getElementById('minigameWinsActivated')
			} else if (num == 6) {
				delethis = document.getElementById('slowStarActivatedText')
			} else if (num == 7) {
				delethis = document.getElementById('minigameWinsActivatedText')
			}

			delethis.style = 'display: none;'

			document.getElementById('runningButton').innerHTML = ' Running (MP 7 & 8 & DS) on/off '
		}
	}
}

//Enable Interact.js
var enableInteractVar = false

function enableInteract () {
	if (enableInteractVar == false) {
		enableInteractVar = true
		document.getElementById('enableInteractButton').innerHTML = "Disable Drag 'n' Drop (reload to reset positions)"
	} else if (enableInteractVar == true) {
		enableInteractVar = false
		document.getElementById('enableInteractButton').innerHTML = "Enable Drag 'n' Drop (reload to reset positions)"
	}
}

// === INTERACT.JS - DONT CHANGE ANYTHING ===
// target elements with the "draggable" class
interact('.draggable')
	.draggable({
		// enable inertial throwing
		inertia: true,
		// keep the element within the area of it's parent
		/* restrict: {
			restriction: "parent",
			endOnly: true,
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		},*/ 
		// enable autoScroll
		autoScroll: true,

		// call this function on every dragmove event
		onmove: dragMoveListener,
		// call this function on every dragend event
		onend: function (event) {
		var textEl = event.target.querySelector('p');

		textEl && (textEl.textContent =
			'moved a distance of '
			+ (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
				Math.pow(event.pageY - event.y0, 2) | 0))
				.toFixed(2) + 'px');
	}
});

	function dragMoveListener (event) {
	if (enableInteractVar == true) {
		var target = event.target,
			// keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.webkitTransform =
		target.style.transform =
			'translate(' + x + 'px, ' + y + 'px)';

		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);
	}
}
// === INTERACT.JS END ===

// === INSERT BELOW THIS LINE ===


