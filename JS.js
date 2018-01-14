// === INSERT BELOW THIS LINE ===


//Create a if() for everything inside the interact.js funtion. Activate the if through a button press
//OR call the interact.jx function through a button press nd create a setInterval inside it.

//Input Buttons
function counterButtons (player, button, counter) {
	if (button == 'P10') {
		for (let num = 0; num < 10; num++) {
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
	} else if (button == 'M10') {
		for (let num = 0; num < 10; num++) {
			document.getElementById(player + counter + 'Input').value--
		}
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
		document.getElementById(scounter + 'Var').value=2
	} else if (displayNone == 2) {
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
			document.getElementById('p1' + counter + 'Display').name=2
		} else if (displayNone == 2) {
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
	}
}

//Changes Character Images
function p1ImgSelect() {
	var character = document.getElementById('p1Select').value
	if (document.getElementById('p1Com').checked) {
		var finalImage = "img/" + "com/" + character + ".png"
	} else {
		var finalImage = "img/" + character + ".png"
	}
	document.getElementById('p1Img').src = finalImage
}
function p2ImgSelect() {
	var character = document.getElementById('p2Select').value
	if (document.getElementById('p2Com').checked) {
		var finalImage = "img/" + "com/" + character + ".png"
	} else {
		var finalImage = "img/" + character + ".png"
	}
	document.getElementById('p2Img').src = finalImage
}
function p3ImgSelect() {
	var character = document.getElementById('p3Select').value
	if (document.getElementById('p3Com').checked) {
		var finalImage = "img/" + "com/" + character + ".png"
	} else {
		var finalImage = "img/" + character + ".png"
	}
	document.getElementById('p3Img').src = finalImage
}
function p4ImgSelect() {
	var character = document.getElementById('p4Select').value
	if (document.getElementById('p4Com').checked) {
		var finalImage = "img/" + "com/" + character + ".png"
	} else {
		var finalImage = "img/" + character + ".png"
	}
	document.getElementById('p4Img').src = finalImage
}

// Changes Happening Display & Input
function p1HappeningFun () {
	var num = document.getElementById('p1HappeningInput').value
	if (num && num >= 0) {
		document.getElementById("p1HappeningText").innerHTML=num;
	}
}
function p2HappeningFun () {
	var num = document.getElementById('p2HappeningInput').value
	if (num && num >= 0) {
		document.getElementById("p2HappeningText").innerHTML=num;
	}
}
function p3HappeningFun () {
	var num = document.getElementById('p3HappeningInput').value
	if (num && num >= 0) {
		document.getElementById("p3HappeningText").innerHTML=num;
	}
}
function p4HappeningFun () {
	var num = document.getElementById('p4HappeningInput').value
	if (num && num >= 0) {
		document.getElementById("p4HappeningText").innerHTML=num;
	}
}

//Changes the Minigame Display & Input
function p1Minigame () {
	var num = document.getElementById('p1MinigameInput').value
	if (num && num >= 0) {
		document.getElementById("p1MinigameText").innerHTML=num;
	}
}
function p2Minigame () {
	var num = document.getElementById('p2MinigameInput').value
	if (num && num >= 0) {
		document.getElementById("p2MinigameText").innerHTML=num;
	}
}
function p3Minigame () {
	var num = document.getElementById('p3MinigameInput').value
	if (num && num >= 0) {
		document.getElementById("p3MinigameText").innerHTML=num;
	}
}
function p4Minigame () {
	var num = document.getElementById('p4MinigameInput').value
	if (num && num >= 0) {
		document.getElementById("p4MinigameText").innerHTML=num;
	}
}

//Changes the Red Spaces Display & Input
function p1RedSpace () {
	var num = document.getElementById('p1RedSpaceInput').value
	if (num && num >= 0) {
		document.getElementById("p1RedSpaceText").innerHTML=num;
	}
}
function p2RedSpace () {
	var num = document.getElementById('p2RedSpaceInput').value
	if (num && num >= 0) {
		document.getElementById("p2RedSpaceText").innerHTML=num;
	}
}
function p3RedSpace () {
	var num = document.getElementById('p3RedSpaceInput').value
	if (num && num >= 0) {
		document.getElementById("p3RedSpaceText").innerHTML=num;
	}
}
function p4RedSpace () {
	var num = document.getElementById('p4RedSpaceInput').value
	if (num && num >= 0) {
		document.getElementById("p4RedSpaceText").innerHTML=num;
	}
}

//Changes the Running Display & Input
function p1Running () {
	var num = document.getElementById('p1RunningInput').value
	if (num && num >= 0) {
		document.getElementById("p1RunningText").innerHTML=num;
	}
}
function p2Running () {
	var num = document.getElementById('p2RunningInput').value
	if (num && num >= 0) {
		document.getElementById("p2RunningText").innerHTML=num;
	}
}
function p3Running () {
	var num = document.getElementById('p3RunningInput').value
	if (num && num >= 0) {
		document.getElementById("p3RunningText").innerHTML=num;
	}
}
function p4Running () {
	var num = document.getElementById('p4RunningInput').value
	if (num && num >= 0) {
		document.getElementById("p4RunningText").innerHTML=num;
	}
}

// Changes Shopping Display & Input
function p1ShoppingFun () {
	var num = document.getElementById('p1ShoppingInput').value
	if (num && num >= 0) {
		document.getElementById("p1ShoppingText").innerHTML=num;
	}
}
function p2ShoppingFun () {
	var num = document.getElementById('p2ShoppingInput').value
	if (num && num >= 0) {
		document.getElementById("p2ShoppingText").innerHTML=num;
	}
}
function p3ShoppingFun () {
	var num = document.getElementById('p3ShoppingInput').value
	if (num && num >= 0) {
		document.getElementById("p3ShoppingText").innerHTML=num;
	}
}
function p4ShoppingFun () {
	var num = document.getElementById('p4ShoppingInput').value
	if (num && num >= 0) {
		document.getElementById("p4ShoppingText").innerHTML=num;
	}
}

//Changes the Orb Display & Input
function p1Orb () {
	var num = document.getElementById('p1OrbInput').value
	if (num && num >= 0) {
		document.getElementById("p1OrbText").innerHTML=num;
	}
}
function p2Orb () {
	var num = document.getElementById('p2OrbInput').value
	if (num && num >= 0) {
		document.getElementById("p2OrbText").innerHTML=num;
	}
}
function p3Orb () {
	var num = document.getElementById('p3OrbInput').value
	if (num && num >= 0) {
		document.getElementById("p3OrbText").innerHTML=num;
	}
}
function p4Orb () {
	var num = document.getElementById('p4OrbInput').value
	if (num && num >= 0) {
		document.getElementById("p4OrbText").innerHTML=num;
	}
}

//Changes the Candy Display
function p1Candy () {
	var num = document.getElementById('p1CandyInput').value
	if (num && num >= 0) {
		document.getElementById("p1CandyText").innerHTML=num;
	}
}
function p2Candy () {
	var num = document.getElementById('p2CandyInput').value
	if (num && num >= 0) {
		document.getElementById("p2CandyText").innerHTML=num;
	}
}
function p3Candy () {
	var num = document.getElementById('p3CandyInput').value
	if (num && num >= 0) {
		document.getElementById("p3CandyText").innerHTML=num;
	}
}
function p4Candy () {
	var num = document.getElementById('p4CandyInput').value
	if (num && num >= 0) {
		document.getElementById("p4CandyText").innerHTML=num;
	}
}

//Changes the Turns Display & Input
function turns () {
	var curTurnVar = document.getElementById('curTurnInput').value
	var maxTurnVar = document.getElementById('maxTurnInput').value
	var maxTurnVarIf = +maxTurnVar + 1
	//console.log("Current:" + curTurnVar + " Max:" + maxTurnVar + " MaxIf:" + maxTurnVarIf)
	if (curTurnVar && curTurnVar >= 0 && maxTurnVar &&  curTurnVar != maxTurnVarIf &&  curTurnVar < maxTurnVarIf) {
		document.getElementById("curTurnText").innerHTML= curTurnVar + '/' + maxTurnVar;
	} else if (curTurnVar = maxTurnVarIf) {
		var num = document.getElementById('curTurnInput').value--
		//console.log("Current:" + curTurnVar + " Max:" + maxTurnVar + " MaxIf:" + maxTurnVarIf)
	}
}

//Changes the Coin Star Display
function coinStar () {
	var coinStarVar = document.getElementById('coinStarInput').value
	if (coinStarVar && coinStarVar >= 0) {
		document.getElementById("coinStarText").innerHTML=coinStarVar;
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

	if (running == 2 && shopping == 2 && orb == 2 && candy == 2) {
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
function showhide ()
{
	var div = document.getElementById("tutorial");
	if (div.style.display !== "none") {
		div.style.display = "none";
	}
	else {
		div.style.display = "block";
	}
}

//Background
function bgOnOff ()
{

	if (document.getElementById('invisible').value == 1) {
		document.getElementById('htmlTag').style = "background-image: url(img/background.jpg);"
		document.getElementById('invisible').value++
	} else {
		document.getElementById('htmlTag').style = "background: #0000ff;"
		document.getElementById('invisible').value--
	}
	console.log(document.getElementById('invisible').value)
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

// === CHANGE THE NUMBERS FOR FASTER/SLOWER UPDATE TIME === (1000 = 1 second)

setInterval(p1HappeningFun, 1000) //Player 1 Happening Counter
setInterval(p2HappeningFun, 1000) //Player 2 Happening Counter
setInterval(p3HappeningFun, 1000) //Player 3 Happening Counter
setInterval(p4HappeningFun, 1000) //Player 4 Happening Counter

setInterval(p1Minigame, 500)  //Player 1 Minigame Counter
setInterval(p2Minigame, 500)  //Player 2 Minigame Counter
setInterval(p3Minigame, 500)  //Player 3 Minigame Counter
setInterval(p4Minigame, 500)  //Player 4 Minigame Counter

setInterval(p1RedSpace, 1000)  //Player 1 Red Space Counter
setInterval(p2RedSpace, 1000)  //Player 2 Red Space Counter
setInterval(p3RedSpace, 1000)  //Player 3 Red Space Counter
setInterval(p4RedSpace, 1000)  //Player 4 Red Space Counter

setInterval(p1Running, 1000)  //Player 1 Running Counter
setInterval(p2Running, 1000)  //Player 2 Running Counter
setInterval(p3Running, 1000)  //Player 3 Running Counter
setInterval(p4Running, 1000)  //Player 4 Running Counter

setInterval(p1ShoppingFun, 1000)  //Player 1 Shopping Counter
setInterval(p2ShoppingFun, 1000)  //Player 2 Shopping Counter
setInterval(p3ShoppingFun, 1000)  //Player 3 Shopping Counter
setInterval(p4ShoppingFun, 1000)  //Player 4 Shopping Counter

setInterval(p1Orb, 1000) //Player 1 Orb Counter
setInterval(p2Orb, 1000) //Player 2 Orb Counter
setInterval(p3Orb, 1000) //Player 3 Orb Counter
setInterval(p4Orb, 1000) //Player 4 Orb Counter

setInterval(p1Candy, 1000) //Player 1 Candy Counter
setInterval(p2Candy, 1000) //Player 2 Candy Counter
setInterval(p3Candy, 1000) //Player 3 Candy Counter
setInterval(p4Candy, 1000) //Player 4 Candy Counter

setInterval(p1ImgSelect, 1500) //Player 1 Character Select
setInterval(p2ImgSelect, 1500) //Player 2 Character Select
setInterval(p3ImgSelect, 1500) //Player 3 Character Select
setInterval(p4ImgSelect, 1500) //Player 4 Character Select

setInterval(coinStar, 500) //Coin Star Counter
setInterval(coinStarCharImg, 1000) //Coin Star Character Select
setInterval(turns, 1000) //Turn Counter

//setInterval(changesMargin, 500) //fixes the distance between the 2 lines at the top

// === INSERT BELOW THIS LINE ===


