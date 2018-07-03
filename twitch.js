//Whitelist
var userWhitelist = []
var adminList = []

/*
* Creates a twitch user whitelist array from a string provided by the settings.
*/
function saveTwitchLists() {
	var userString = document.getElementById('userWhitelist').value
	var adminString = document.getElementById('adminList').value
	userString = userString.toLowerCase()
	adminString = adminString.toLowerCase()

	userWhitelist = userString.split(", ")
	adminList = adminString.split(", ")

	console.log('User: ' + userWhitelist + ', Admin: ' + adminList)
}

/*
* Connects to twitch. 
*
* @param {string} obsBotName Twitch bots name, only used for OBS.
* @param {string} obsBotOauth Twitch bot password, only used for OBS.
* @param {string} obsChannel Twitch channel to join, only used for OBS.
*/
function connectTwitch (obsBotName, obsBotOauth, obsChannel) {
	if (obsBotName, obsBotOauth, obsChannel) {
		var botName = obsBotName
		var oauth = obsBotOauth
		var channelName = obsChannel
	} else {
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

/*
* Gets variable from URL and returns it.
*/
function getUrl(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
 	return(false);
}

/*
* Auto-connects to Twitch via cookies or URL variables.
*/
function prepareTwitch() {
	var botName = getUrl('botName')
	var oauth = getUrl('botPass')
	var channel = getUrl('channel')
	if (channel != false) {
		var channelName = channel.toLowerCase()
	}
	var noCookies = getUrl('noCookies')

	if (localStorage.getItem('obsAutoConnect') == 'true') {
		botName = localStorage.getItem('botName')
		oauth = localStorage.getItem('botOauth')
		channelName = localStorage.getItem('twitchChannel')

		connectTwitch(botName, oauth, channelName)
		document.getElementById('hideInOBS').style = 'display: none;'
		document.getElementById('bodyElement').style.background = '#0000FF'
	} else if (botName != false && oauth != false && channelName != false) {
		connectTwitch(botName, oauth, channelName)
		document.getElementById('hideInOBS').style = 'display: none;'
		document.getElementById('bodyElement').style.background = '#0000FF'

		if (noCookies != 'true') {
			localStorage.setItem('botName', botName)
			localStorage.setItem('botOauth', oauth)
			localStorage.setItem('twitchChannel', channelName)
			localStorage.setItem('obsAutoConnect', 'true')
		}
	}

}

/*
* Receives twitch chat messages, checks if the user has the right to do something and calls the right function to handle it.
*
* @param {string} user User that sent the message.
* @param {string} text Message that was sent.
* @param {boolean} streamer If the user that sent the message was the streamer.
* @param {boolean} mod If the user that sent the message is a mod.
*/
function newMessage (user, text, streamer, mod) {
	text = text.toLowerCase()
	var lowerUser = user.toLowerCase()
	//console.log('Username: ' + lowerUser + ', text: ' + text)

	if (text.startsWith('!mpoa') && (arrCon(lowerUser, adminList) || streamer == true || mod == true)) {
		var arrText = text.split(' ')
		editAdminMessage(arrText, lowerUser)
	} else if (text.startsWith('!mpoa')) {
		sendMsg('noPermission', user)
	} else if (text.startsWith('!mpo') && arrCon(lowerUser, userWhitelist) || text.startsWith('!mpo') && arrCon(lowerUser, adminList) || streamer == true || mod == true) {
		var arrText = text.split(' ')
		editMessage(arrText, lowerUser)

	} else if (text.startsWith('!mpo')) {
		sendMsg('noPermission', user)
	}
}

/*
* Checks and executes admin commands.
*
* @param {string} text Message that was sent.
* @param {string} user User that sent the message.
*/
function editAdminMessage (text, user) {
	var action = 'nothing'
	var player = 1

//Checks what command the user used and writes it to a variable.
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
		case 'bgcolor':
		case 'backgroundcolor':
		case 'background':
		case 'bg':
			action = 'bgcolor'
			break;
		case 'adduser':
			userWhitelist.push(text[2])
			localStorage.setItem('userWhitelist', document.getElementById('userWhitelist').value)
			sendMsg('completed', user)
			break;
		case 'addadmin':
			userWhitelist.push(text[2])

			adminList.push(text[2])
			localStorage.setItem('userWhitelist', document.getElementById('userWhitelist').value)
			localStorage.setItem('adminList', document.getElementById('adminList').value)
			sendMsg('completed', user)
			break;
		case 'enablecmd':
		case 'disablecmd':
		case 'activatecmd':
		case 'deactivatecmd':
		case 'changecmd':
		case 'cmds':
		case 'cmd':
			action = 'enablecmd'
			break;
		case 'backup':
			backup()
			sendMsg('completed', user)
			break;
		case 'restore':
			restore()
			sendMsg('completed', user)
			break;
		case 'reset':
			resetBackup()
			restore(true)
		case 'notie':
		case 'changetie':
			action = 'changetie'
			break;
		case 'reloadmpo':
			window.location.reload()
			sendMsg('completed', user)
			break;
		default:
			sendMsg('invalid', user, text[2])
			return
			break;
	}

//Executes the command that was sent.

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

	if (action == 'bgcolor') {
		if (text[2].startsWith('#') && text[2].length == 7) {
			document.getElementById('bodyElement').style.background = text[2]
			sendMsg('completed', user)
		} else {
			sendMsg('invalid', user, text[2])
		}
	}

	if (action == 'enablecmd') {
		if (text[2] && text[3]) {} else {
			sendMsg('lastMissing', user)
			return;
		}

		if (text[3] == 'true' || text[3] == true || text[3] == 'on') {
			text[3] = true
		} else if (text[3] == 'false' || text[3] == false || text[3] == 'off') {
			text[3] = false
		} else {
			sendMsg('invalid', user, text[3])
		}

		switch (text[2]) {
			case 'all':
				document.getElementById('commandsEnabled').checked = text[3]
				sendMsg('completed', user)
				break;
			case 'connected':
				document.getElementById('enablecmdConnected').checked = text[3]
				sendMsg('completed', user)
				break;
			case 'help':
				document.getElementById('enablecmdHelp').checked = text[3]
				sendMsg('completed', user)
				break;
			case 'completed':
				document.getElementById('enablecmdCompleted').checked = text[3]
				sendMsg('completed', user)
				break;
			case 'error':
			case 'invalid':
				document.getElementById('enablecmdError').checked = text[3]
				sendMsg('completed', user)
				break;
			case 'missing':
			case 'lastmissing':
				document.getElementById('enablecmdMissing').checked = text[3]
				sendMsg('completed', user)
				break;
			case 'noperm':
			case 'nopermissions':
			case 'nopermission':
				document.getElementById('enablecmdNoPerm').checked = text[3]
				sendMsg('completed', user)
				break;
			default:
				sendMsg('invalid', user, text[2])
				break;
		}
	}

	if (action == 'changetie') {
		if (document.getElementById('noTie').checked == false) {
			document.getElementById('noTie').checked = true
		} else {
			document.getElementById('noTie').checked = false
		}

		coinStarTie()
		sendMsg('completed', user)
	}
}

/*
* Checks and executes normal commands.
*
* @param {string} text Message that was sent.
* @param {string} user User that sent the message.
*/
function editMessage (text, user) {
	console.log('Array: ' + text)
	var player = 1
	var counter = 'Happening'

//Checks what command the user used and writes it to a variable.

	switch (text[1]) {
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
		case 'coin':
		case 'coins':
		case 'coinstar':
			turnCoinMessage('coin', text, user)
			return
			break;
		case 'command':
		case 'commands':
		case 'help':
			sendMsg('help', user)
			return
			break;
		case 'turn':
		case 'turns':
		case 'curturn':
		case 'currentturn':
			turnCoinMessage('turn', text, user)
			return
			break;
		default:
			sendMsg('invalid', user, text[1])
			return
			break;
	}
//Executes the command that was sent.
	if (text[2]) {} else {
		sendMsg('lastMissing', user)
	}

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
	
	if (text[3]) {} else {
		sendMsg('lastMissing', user)
	}
	

	var number = text[3].slice(1)
	if (number) {} else {
		number = 1
	}
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

/*
* Executes normal commands that are turn/coin star related.
*
* @param {string} type If it's turn or coin star related.
* @param {string} text Message that was sent.
* @param {string} user The user that originaly executed the command.
*/
function turnCoinMessage (type, text, user) {
	var number = text[2].slice(1)
	if (number) {} else {
		number = 1
	}
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

		var char1 = text[3]
		var char2 = text[4]
		var char3 = text[5]
		var char4 = text[6]
		var charArray = []

		if (char1 && isNaN(char1) == false && char1 <= 4) {
			charArray.push(text[3])

			if (char2 && isNaN(char2) == false && char2 <= 4) {
				charArray.push(text[4])

				if (char3 && isNaN(char3) == false && char3 <= 4) {
					charArray.push(text[5])

					if (char4 && isNaN(char4) == false && char4 <= 4) {
						charArray.push(text[6])
					}
				}
			}
			document.getElementById('p1CoinStarTie').checked = false
			document.getElementById('p2CoinStarTie').checked = false
			document.getElementById('p3CoinStarTie').checked = false
			document.getElementById('p4CoinStarTie').checked = false

			if (charArray.length == 1) {
				document.getElementById('p' + char1 + 'CoinStarTie').checked = true

			} else if (charArray.length == 2) {
				document.getElementById('p' + char1 + 'CoinStarTie').checked = true
				document.getElementById('p' + char2 + 'CoinStarTie').checked = true

			} else if (charArray.length == 3) {
				document.getElementById('p' + char1 + 'CoinStarTie').checked = true
				document.getElementById('p' + char2 + 'CoinStarTie').checked = true
				document.getElementById('p' + char3 + 'CoinStarTie').checked = true

			} else if (charArray.length == 4) {
				document.getElementById('p' + char1 + 'CoinStarTie').checked = true
				document.getElementById('p' + char2 + 'CoinStarTie').checked = true
				document.getElementById('p' + char3 + 'CoinStarTie').checked = true
				document.getElementById('p' + char4 + 'CoinStarTie').checked = true
			}

			coinStarTie()
		}
		coinStar()
	}
	sendMsg('completed', user)
}

/*
* Send the messages to the twitch chat.
*
* @param {string} action What kind of message should be sent
* @param {string} user User that used original command.
* @param {string} error Error that was made by the user in case there was one.
*/
function sendMsg (action, user, error) {
	if (action == 'connected' && document.getElementById('enablecmdConnected').checked == true) {
		send(document.getElementById('cmdConnected').value)
	}
	if (document.getElementById('commandsEnabled').checked == true) {
		switch (action) {
			case 'help':
				if (document.getElementById('enablecmdHelp').checked == true) {
					send(document.getElementById('cmdHelp').value)
				}
				break;

			case 'completed':
				if (document.getElementById('enablecmdCompleted').checked == true) {
					send('@' + user + ', action completed.')
				}
				break;

			case 'lastMissing':
				if (document.getElementById('enablecmdMissing').checked == true) {
					send('@' + user + ', your last argument is missing, check "!mpo commands" for help.')
				}
				break;

			case 'invalid':
				if (document.getElementById('enablecmdError').checked == true) {
					send('@' + user + ', "' + error + '" is a invalid argument, check "!mpo commands" for help.')
				}
				break;

			case 'noPermission':
				if (document.getElementById('enablecmdNoPerm').checked == true)
					send('@' + user + ', you don\'t have the permission to use this command.')
				break;
		}
	}
}

/*
* Actually sends the message.
*/
function send (text) {
	TAPIC.sendChat(text)
}
window.onload = prepareTwitch()