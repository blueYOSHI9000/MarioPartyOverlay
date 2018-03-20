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

function startHighlight (resetHighlights, changeColor) {
	var originalHighlightColor = highlightColor

	if (resetHighlights == true) {
		originalHighlightColor = highlightColor
		highlightColor = 'white'
	} else if (changeColor) {
		highlightColor = document.getElementById('highlightColor').value
		originalHighlightColor = highlightColor
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
	var character = document.getElementById('p' + playerNum + 'Select').value
	if (document.getElementById('p' + playerNum + 'Com').checked) {
		var finalImage = "img/" + "com/" + character + ".png"
	} else {
		var finalImage = "img/" + character + ".png"
	}
	document.getElementById('p' + playerNum + 'Img').src = finalImage
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

// === Twitch Settings ===

//Shows and hides the Twitch settings
function twitchShowHide () {
	var div = document.getElementById('twitchDiv').classList
	console.log(div)
	if (div == 'hidden') {
		document.getElementById('twitchDiv').classList.add('visible');
		document.getElementById('twitchDiv').classList.remove('hidden');
	} else {
		document.getElementById('twitchDiv').classList.remove('visible');
		document.getElementById('twitchDiv').classList.add('hidden');
	}
}

//Connects to Twitch (only executed once)
function connectTwitch (botName, oauth, channelName) {
	if (botName, oauth, channelName) {} else {
		var botName = document.getElementById('twitchNameInput').value
		var oauth = document.getElementById('twitchPasswordInput').value
		var channelName = document.getElementById('twitchChannelInput').value
	}

	TAPIC.setup(oauth, function (botName) {

		
		TAPIC.setRefreshRate(10); 

		TAPIC.joinChannel(channelName, function () {
		sendMsg('connected')
		TAPIC.listen('message', function (e) { newMessage(e.from, e.text, e.streamer, e.mod)})
			
		});
	});
}

//Receives new Twitch Messages and checks if it's a MPO command
function newMessage (user, text, streamer, mod) {
	text = text.toLowerCase()
	var lowerUser = user.toLowerCase()
	//console.log('Username: ' + lowerUser + ', text: ' + text)

	if (text.startsWith('!mpoa') && (arrCon(lowerUser, adminlist) || streamer == true || mod == true)) {
		var arrText = text.split(' ')
		editAdminMessage(arrText, lowerUser)
	} else if (text.startsWith('!mpoa')) {
		sendMsg('noPermission', user)
	} else if (text.startsWith('!mpo') && (arrCon(lowerUser, userWhitelist) || streamer == true || mod == true)) {
		var arrText = text.split(' ')
		editMessage(arrText, lowerUser)

	} else if (text.startsWith('!mpo')) {
		sendMsg('noPermission', user)
	}
}

//Checks the admin MPO commands
function editAdminMessage (text, user) {
	var action = 'nothing'
	var player = 1

	switch (text[1]) {
		case 'character':
		case 'char':
			action = 'character'
			break;
		case 'computer':
		case 'com':
			action = 'computer'
			break;
		case 'maxturn':
		case 'max':
			action = 'maxturn'
			break;
		case 'activate':
		case 'deactivate':
		case 'enable':
		case 'disable':
			action = 'activate'
			break;
		case 'highlightcolor':
		case 'highlight':
			action = 'highlight'
			break;
		case 'adduser':
			addWhitelist(text[2])
			sendMsg('completed', user)
			break;
		case 'addadmin':
			addAdmin(text[2])
			sendMsg('completed', user)
			break;
		case 'addboth':
		case 'adduseradmin':
		case 'addadminuser':
			addWhitelist(text[2])
			addAdmin(text[2])
			sendMsg('completed', user)
			break;
		default:
			sendMsg('invalid', user, text[2])
			return
			break;
	}

	if (action == 'character') {
		switch (text[2]) {
		case '1':
		case 'p1':
			player = 1
			break;
		case '2':
		case 'p2':
			player = 2
			break;
		case '3':
		case 'p3':
			player = 3
			break;
		case '4':
		case 'p4':
			player = 4
			break;
		default:
			sendMsg('invalid', user, text[2])
			return
			break;
		}
		var text4 = text[4]

		if (text4 == 'com' || text4 == 'c') {
			document.getElementById('p' + player + 'Com').checked = true
		} else if (text4 == 'nocom' || text4 == 'nc' || text4 == 'n') {
			document.getElementById('p' + player + 'Com').checked = false
		}

		document.getElementById('p' + player + 'Select').value = text[3]
		imgSelect(player)
		sendMsg('completed', user)
	}

	if (action == 'computer') {
		switch (text[2]) {
		case '1':
		case 'p1':
			player = 1
			break;
		case '2':
		case 'p2':
			player = 2
			break;
		case '3':
		case 'p3':
			player = 3
			break;
		case '4':
		case 'p4':
			player = 4
			break;
		default:
			sendMsg('invalid', user, text[2])
			return
			break;
		}

		if (document.getElementById('p' + player + 'Com').checked == false) {
			document.getElementById('p' + player + 'Com').checked = true
		} else if (document.getElementById('p' + player + 'Com').checked == true) {
			document.getElementById('p' + player + 'Com').checked = false
		}
		imgSelect(player)
		sendMsg('completed', user)
	}
	if (action == 'maxturn') {
		var number = text[2].slice(1)
		var addNum = number++
		
		if (text[2].startsWith('p') || text[2].startsWith('+')) {
			for (let num = 0; num < addNum; num++) {
				document.getElementById('maxTurnInput').value++
				turns()
				sendMsg('completed', user)
			}
		} else if (text[2].startsWith('m') || text[2].startsWith('-')) {
			for (let num = 0; num < addNum; num++) {
				document.getElementById('maxTurnInput').value--
				turns()
				sendMsg('completed', user)
			}
		} else if (isNaN(text[2]) == false) {
			document.getElementById('maxTurnInput').value = text[2]
			turns()
			sendMsg('completed', user)
		} else {
			sendMsg('invalid', user, text[2])
		}
	}

	if (action == 'activate') {
		switch (text[2]) {
		case 'happening':
		case 'hap':
			displayOnOff('Happening', 'happening', 'true')
			break;
		case 'minigame':
		case 'minigames':
		case 'mini':
			displayOnOff('Minigame', 'minigame')
			break;
		case 'minigamewin':
		case 'minigamewins':
		case 'miniwin':
		case 'miniwins':
			if (document.getElementById('minigameWinsActivated').checked == false) {
				document.getElementById('minigameWinsActivated').checked = true
			} else if (document.getElementById('minigameWinsActivated').checked == true) {
				document.getElementById('minigameWinsActivated').checked = false
			}
			minigameWins()
			break;
		case 'redspace':
		case 'redspaces':
		case 'red':
			displayOnOff('RedSpace', 'redSpace', 'true')
			break;
		case 'running':
		case 'run':
			displayOnOff('Running', 'running')
			break;
		case 'shopping':
		case 'shop':
			displayOnOff('Shopping', 'shopping')
			break;
		case 'orb':
		case 'orbs':
			displayOnOff('Orb', 'orb', 'true')
			break;
		case 'candy':
		case 'candies':
			displayOnOff('Candy', 'candy', 'true')
			break;
		case 'spinspace':
		case 'spinspaces':
		case 'spin':
			displayOnOff('SpinSpace', 'spinSpace', 'true')
			break;
		case 'minus':
		case 'miniztar':
		case 'miniztars':
		case 'ztars':
		case 'ztar':
			displayOnOff('MiniZtar', 'miniZtar')
			break;
		case 'specialdiceblock':
		case 'specialdice':
		case 'dice':
			displayOnOff('SpecialDice', 'specialDice', 'true')
			break;
		case 'slowstar':
		case 'slow':
			if (document.getElementById('slowStarActivated').checked == false) {
				document.getElementById('slowStarActivated').checked = true
			} else if (document.getElementById('slowStarActivated').checked == true) {
				document.getElementById('slowStarActivated').checked = false
			}
			slowStar()
			slowHighlight(highlightColor)
			break;
		default:
			sendMsg('invalid', user, text[2])
			return
			break;
		}
		sendMsg('completed', user)
	}

	if (action == 'highlight') {
		if (text[2] == 'on') {
			document.getElementById('enableHighlight').checked = true
			resetHighlights()
		} else if (text[2] == 'off') {
			document.getElementById('enableHighlight').checked = false
			resetHighlights()
		} else if (text[2] != null) {
				var color = text[2]
			//}
			document.getElementById('highlightColor').value = color
			highlightColor = color

			if (document.getElementById('enableHighlight').checked == true) {
				resetHighlights()
			}

			if (document.getElementById('slowStarActivated').checked == true) {
				slowHighlight(highlightColor)
			}
		} else {
			sendMsg('invalid', user, text[2])
		}
		sendMsg('completed', user)
	}
}

//Checks the normal MPO commands and updates the counters
function editMessage (text, user) {
	console.log('Array: ' + text)
	var player = 1
	var counter = 'Happening'

	switch (text[1]) {
		case '1':
		case 'p1':
			player = 1
			break;
		case '2':
		case 'p2':
			player = 2
			break;
		case '3':
		case 'p3':
			player = 3
			break;
		case '4':
		case 'p4':
			player = 4
			break;
		case 'turn':
		case 'turns':
			turnCoinMessage('turn', text)
			return
			break;
		case 'coin':
		case 'coins':
		case 'coinstar':
			turnCoinMessage('coin', text)
			return
			break;
		case 'command':
		case 'commands':
		case 'help':
			sendMsg('help', user)
			return
			break;
		default:
			sendMsg('invalid', user, text[1])
			return
			break;
	}
	switch (text[2]) {
		case 'happening':
		case 'hap':
			counter = 'Happening'
			break;
		case 'minigame':
		case 'minigames':
		case 'mini':
			counter = 'Minigame'
			break;
		case 'redspace':
		case 'redspaces':
		case 'red':
			counter = 'RedSpace'
			break;
		case 'running':
		case 'run':
			counter = 'Running'
			break;
		case 'shopping':
		case 'shop':
			counter = 'Shopping'
			break;
		case 'orb':
		case 'orbs':
			counter = 'Orb'
			break;
		case 'candy':
		case 'candies':
			counter = 'Candy'
			break;
		case 'spinspace':
		case 'spinspaces':
		case 'spin':
			counter = 'SpinSpace'
			break;
		case 'minus':
		case 'miniztar':
		case 'miniztars':
		case 'ztars':
		case 'ztar':
			counter = 'MiniZtar'
			break;
		case 'specialdiceblock':
		case 'specialdice':
		case 'dice':
			counter = 'SpecialDice'
			break;
		default:
			sendMsg('invalid', user, text[2])
			return
			break;
	}
	
	if (text[3]) {} else {
		sendMsg('lastMissing', user)
	}
	

	var number = text[3].slice(1)
	var addNum = number++
	var text3 = text[3]

	if (text[3].startsWith('p') || text[3].startsWith('+')) {
		for (let num = 0; num < addNum; num++) {
			document.getElementById('p' + player + counter + 'Input').value++
		}
	} else if (text[3].startsWith('m') || text[3].startsWith('-')) {
		for (let num = 0; num < addNum; num++) {
			document.getElementById('p' + player + counter + 'Input').value--
		}
	} else if (isNaN(text[3]) == false) {
		document.getElementById('p' + player + counter + 'Input').value = text[3]
	} else {
		sendMsg('invalid', user, text[2])
	}

	displayChange(player, counter)

	if (document.getElementById('enableHighlight').checked == true) {
		highlight(counter, highlightColor)
	}

	if (document.getElementById('slowStarActivated').checked == true) {
		slowHighlight(highlightColor)
	}
	sendMsg('completed', user)
}

//Checks the normal MPO commands if it's turn/coin star related
function turnCoinMessage (type, text) {
	var number = text[2].slice(1)

	var addNum = number++
	if (type == 'turn') {
		if (text[2].startsWith('p') || text[2].startsWith('+')) {
			for (let num = 0; num < addNum; num++) {
				document.getElementById('curTurnInput').value++
			}
		} else if (text[2].startsWith('m') || text[2].startsWith('-')) {
			for (let num = 0; num < addNum; num++) {
				document.getElementById('curTurnInput').value--
			}
		} else if (isNaN(text[2]) == false) {
			document.getElementById('curTurnInput').value = text[2]
		}
		turns()
	}

	if (type == 'coin') {
		if (text[2].startsWith('p') || text[2].startsWith('+')) {
			for (let num = 0; num < addNum; num++) {
				document.getElementById('coinStarInput').value++
			}
		} else if (text[2].startsWith('m') || text[2].startsWith('-')) {
			for (let num = 0; num < addNum; num++) {
				document.getElementById('coinStarInput').value--
			}
		} else if (isNaN(text[2]) == false) {
			document.getElementById('coinStarInput').value = text[2]
		}

		var test = text[3]
		if (test) {
			document.getElementById('coinStarCharSelect').value = text[3]
			coinStarCharImg()
		}
		coinStar()
	}
}

//Add temporary to whitelist
function addWhitelist (user) {
	if (user) {
		userWhitelist.push(user)
	} else {
		var newUser = document.getElementById('tempWhitelist').value
		userWhitelist.push(newUser)
	}
}

function addAdmin (admin) {
	if (admin) {
		adminlist.push(admin)
	} else {
		var newUser = document.getElementById('tempAdmin').value
		adminlist.push(newUser)
	}
}

//Array contains
function arrCon(needle, arrhaystack)
{
    return (arrhaystack.indexOf(needle) > -1);
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

//Get Variable in URL
function getUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
 	return(false);
}

//Calls functions that check the URL
window.onload = function() {
	noMP9()
};

//Deactivates MP9
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


