var shortcutState = 0;
/*
* Variable shows the current state.
* 0 = Start game button
* 1 = Choose order
* 2 = Player's turn (all 4 players are in this state)
* 3 = Minigame
* 4 = Final 5
*/
var setup = false;
var turnCurPlayer = 0;
var shortcutGame = 'smp'; //Shortcut features use this instead of curGame as otherwise the player could change the game mid-shortcut which would break everything
var orderCurPlayer = 0;
/*
* Starts the shortcut feature or advances to the next state.
*/
function startShortcut () {
	if (popout == true && statSynced == false) { //if run in popout, sync all counters
		sendMessage('statSync');
		statSynced = true;
	}

	console.log('[MPO] Shortcut State: ' + shortcutState);
	document.getElementById('shortcutBattle').style.display = 'none'; //remove later - actually, nevermind

	switch (shortcutState) {
		case 0: // start "choose order"
			if (curGame != 'mpds' && curGame != 'smp') {
				shortcutNotif('The selected game is not supported.', true);
				return;
			}
			document.getElementById('backButton').disabled = '';

			shortcutState = 1;
			document.getElementById('shortcutTurn').style.display = 'none';
			playerOrder = [''];
			editInner('shortcutSpan', '<span class="settingsTitle"> Choose order </span> <br> <span class="settingsText" id="chooseOrderText"> Which character is first? </span> <br> <span> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="chooseP1" onclick="chooseOrder(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="chooseP2" onclick="chooseOrder(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="chooseP3" onclick="chooseOrder(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="chooseP4" onclick="chooseOrder(4)"> <br> <button onclick="chooseOrder(0, true)">Reset Order</button> <br> <span id="chooseFirst" class="chooseImgOrder"> </span> <br> <span id="chooseSecond" class="chooseImgOrder"> </span> <br> <span id="chooseThird" class="chooseImgOrder"> </span> <br> <span id="chooseFourth" class="chooseImgOrder"> </span> <br> <button onclick="startShortcut()" id="chooseContinue" style="display:none;">Continue?</button> </span>');
				shortcutNotif('Choose the order of the players.');
			break;

		case 1: // start "players turn"
			if (setup != true) {
				starPrice = 0;
				finalFiveEvent = '';
				prepareTurn();
				setup = true;
			}

			shortcutState = 2;
			turnCurPlayer = 1;
			editInner('shortcutSpan', '');
			document.getElementById('shortcutTurn').style.display = '';
			document.getElementById('skipButton').disabled = '';


			editInner('turnPlayerName', getCharName(orderCurPlayer));
			document.getElementById('turnPlayerIcon').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[orderCurPlayer] + '.png';

			editInner('turnHexCharSelection', '<span class="settingsText"> Select the character that placed the hex: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" onclick="turnHex(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" onclick="turnHex(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" onclick="turnHex(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" onclick="turnHex(4)">');
			orderCurPlayer = playerOrder[turnCurPlayer];
			switch (orderCurPlayer) {
				case 1:
					document.getElementById('turnPlayerName').style.color = '#0000EB';
					break;
				case 2:
					document.getElementById('turnPlayerName').style.color = '#E60000';
					break;
				case 3:
					document.getElementById('turnPlayerName').style.color = '#00A705';
					break;
				case 4:
					document.getElementById('turnPlayerName').style.color = '#e0dc00';
					break;
			}
			break;

		case 2: // start minigame
			shortcutState = 3;
			document.getElementById('shortcutTurn').style.display = 'none';
			if (shortcutGame === 'smp') {
				editInner('shortcutSpan', '<span class="settingsTitle"> Normal Minigame </span> <br> <span id="normalMinigame"> <span class="settingsText"> Select minigame type: </span> <br> <span class="shortcutText spanSelection"> <span onclick="startMinigame(\'4p\')"> 4-Player </span> <span onclick="startMinigame(\'2v2\')"> 2vs2 </span> <span onclick="startMinigame(\'1v3\')"> 1vs3 </span> </span> </span> <br> <br> <span class="settingsTitle"> Coin Minigame </span> <br> <span class="settingsText"> WIP, add coins manually for now. <br> Reminder that you can add 5 at once if you hold shift while 1 is selected. </span> <br> <button onclick="coinMinigame()">Done</button>');
			} else {
				editInner('shortcutSpan', '<span class="settingsTitle"> Normal Minigame </span> <br> <span id="normalMinigame"> <span class="settingsText"> Who won? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="p1Minigame" onclick="startMinigame(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="p2Minigame" onclick="startMinigame(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="p3Minigame" onclick="startMinigame(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="p4Minigame" onclick="startMinigame(4)"> <br> <button onClick="startMinigame()">Done</button> </span> <br> <br> <span class="settingsTitle"> Coin Minigame </span> <br> <span class="settingsText"> WIP, add coins manually for now. <br> Reminder that you can add 5 at once if you hold shift while 1 is selected. </span> <br> <button onclick="coinMinigame()">Done</button> <br> <br> <span class="settingsTitle"> Battle Minigame </span> <br> <button onclick="chooseMinigame(\'battle\')">Start Battle Minigame</button>');
			}
			break;

		case 3: // turn finished - start next turn/final 5/end game
			if (getInner('curTurnText') == getInner('maxTurnText')) {
				shortcutState = 0;
				document.getElementById('shortcutTurn').style.display = 'none';
				document.getElementById('skipButton').disabled = 'true';

				editInner('shortcutSpan', '<span class="settingsText" style="width: 100%; white-space: normal; line-height: 30px;"> Games currently supported: <img src="img/mpds.png" style="width: 40px;"> <img src="img/smp.png" style="width: 40px;"> <br> Only 4 players without Teams (this includes Partner Party) are currently supported. <br> <br> A lot of features depend on the coin counter, it\'s recommended to show it and keep it up to date. <br> This is currently in heavy development and some features might not work as intended. <br> <br> <button onclick="startShortcut()">Start game</button> <br> <br> <span class="settingsTitle"> Report Bugs </span> <br> In case something breaks or doesn\'t provide the expected output, please click on "Generate & Copy" and <a href="https://www.twitter.com/yoshisrc" class="settingsLink" rel="noopener" target="_blank">contact me</a> or <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/issues/new?template=bug_report.md" class="settingsLink" rel="noopener" target="_blank">open a Github issue</a> with a screenshot or copy-paste of your browsers console (Ctrl + Shift + I > "Console"). It shows the last actions done and potential errors. Thank you! <br> <br> <span class="settingsTitle"> Potential broken features </span> <br> Mario Party is hugely RNG based so some events are rare and as such hard to figure out how they work. <br> Be sure to check your coin count after some of these as it might not be correct anymore: <ul> 	<li>SMP Minigame tied rewards</li> 	<li>Battle Minigames (especially ties)</li> <li>Lucky/ Extra- Bad Luck Events (some might even be missing)</li> <li>VS space in SMP</li> <li>MPDS Duel space</li> </ul> </span>');
				//^^ remember to replace prepareShortcut() with startSHortcut() & add copy-paste it in shortcutBack()
				setup = false;
				shortcutNotif('Game completed! Start a new one?');
				//game done
			} else { // Final 5 turns
				shortcutState = 1;
				execOnMain('counterButtons', [1, 'P', 1, 'curTurn']);
				if ((getInner('curTurnText') == parseInt(getInner('maxTurnText')) - 4 && shortcutGame != 'smp') || (getInner('curTurnText') == parseInt(getInner('maxTurnText')) - 2 && shortcutGame === 'smp')) {
					shortcutState = 4;
					if (shortcutGame === 'smp') {
						finalFiveEvent = 'doubleSpaces';
						shortcutState = 1;
						shortcutNotif('Started Final 3 Turns.');
						startShortcut();
						return;
					} else {
						document.getElementById('skipButton').disabled = 'true';
						editInner('shortcutSpan', '<span class="shortcutText"> Final 5 Turns! </span> <br> <br> <span id="finalFiveTie"></span> <span class="settingsText"> Select the event: </span> <select id="finalFiveEvent"> <option value="20coins">Get 20 Coins</option> <option value="30coins">Get 30 Coins</option> <option value="1star">Get 1 Star</option> <option value="charity">Get 10 Coins from others</option> <option value="cheapStars">Stars for 5 coins</option> <option value="100stars">Get 100 Stars</option> <option value="300stars">Get 300 Stars</option> </select> <br> <br> <button onclick="finalFive()">Continue</button>');
					}

					lastPlace = getLastPlace();

					if (lastPlace.length > 1) {
						lastPlace[0] = 0;
						editInner('finalFiveTie', '<span class="settingsText"> Select the last player: </span> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="finalFive(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="finalFive(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="finalFive(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="finalFive(4)"> <br> <br>');
					} else if (shortcutGame === 'smp') {
						finalFive();
					}
					lastPlace = 0;
				}
				startShortcut();
				return;
			}
			break;
	}
}

/*
* Prepares the shortcut turn screen depending on the selected game.
*/
function prepareTurn () {
	shortcutGame = curGame;
	switch (shortcutGame) {
		case 'mpds':
			editInner('turnStars', 'Stars');
			editInner('turnStarsSelection', '<img src="img/stars.png" onclick="buyStar()"> <img src="img/shortcut/mpds/magicjarstars.png" style="margin-left: 50px;" onclick="buyStar(\'jarstar\')"> <img src="img/shortcut/mpds/magicjarcoins.png" onclick="buyStar(\'jarcoins\')"> <img src="img/shortcut/mpds/magicjarfail.png" onclick="buyStar(\'jarfail\')"> <br> <img src="img/shortcut/mpds/bluenote.png" onclick="buyStar(\'bluenote\')"> <img src="img/shortcut/mpds/greennote.png" onclick="buyStar(\'greennote\')"> <img src="img/shortcut/mpds/yellownote.png" onclick="buyStar(\'yellownote\')"> <img src="img/shortcut/mpds/orangenote.png" onclick="buyStar(\'orangenote\')"> <img src="img/shortcut/mpds/rednote.png" onclick="buyStar(\'rednote\')">');

			editInner('turnDiceTitle', 'Dice number rolled');
			editInner('turnDiceSelectionSpan', '<span id="turnDiceSelection" class="shortcutText spanSelection"> <span id="dice1" onclick="turnDice(this.id)">1</span> <span id="dice2" onclick="turnDice(this.id)">2</span> <span id="dice3" onclick="turnDice(this.id)">3</span> <span id="dice4" onclick="turnDice(this.id)">4</span> <span id="dice5" onclick="turnDice(this.id)">5</span> <span id="dice6" onclick="turnDice(this.id)">6</span> <span id="dice7" onclick="turnDice(this.id)">7</span> <span id="dice8" onclick="turnDice(this.id)">8</span> <span id="dice9" onclick="turnDice(this.id)">9</span> <span id="dice10" onclick="turnDice(this.id)">10</span> </span> <br> <img src="img/shortcut/mpds/diceblock.png" id="turnCurDice"> <span id="turnCurDiceText" class="shortcutText">??</span> <br> <br>');

			editInner('turnShoppingTitle', 'Shopping');
			editInner('turnShoppingSelection', '<span onclick="shopping(1)">1</span> <span onclick="shopping(2)">2</span> <span onclick="shopping(3)">3</span> <span onclick="shopping(7)">7</span> <br> <span onclick="shopping(8)">8</span> <span onclick="shopping(15)">15</span> <span onclick="shopping(20)">20</span> <span onclick="shopping(25)">25</span>');

			editInner('turnItemsTitle', 'Items used');
			editInner('turnItems', '<img src="img/shortcut/mpds/double.png" id="itemDouble" onclick="turnItem(this.id)"> <img src="img/shortcut/mpds/triple.png" id="itemTriple" onclick="turnItem(this.id)"> <img src="img/shortcut/mpds/half.png" id="itemHalf" onclick="turnItem(this.id)"> <img src="img/hex.png" id="itemHex" onclick="turnItem(this.id)"> <span class="shortcutText" id="itemOther" onclick="turnItem(this.id)">Other</span>');

			editInner('turnSpacesTitle', 'Space landed on');
			editInner('turnSpaces', '<img src="img/shortcut/mpds/bluespace.png" id="spaceBlue" onclick="turnSpace(this.id)"> <img src="img/shortcut/mpds/redspace.png" id="spaceRed" onclick="turnSpace(this.id)"> <img src="img/shortcut/mpds/happeningspace.png" id="spaceHappening" onclick="turnSpace(this.id)"> <img src="img/shortcut/mpds/friendspace.png" id="spaceFriend" onclick="turnSpace(this.id)"> <img src="img/shortcut/mpds/duelspace.png" id="spaceDuel" onclick="turnSpace(this.id)"> <img src="img/shortcut/mpds/bowserspace.png" id="spaceBowser" onclick="turnSpace(this.id)">');

			document.getElementById('hexColumn').style.display = '';
			editInner('turnHexTitle', 'Hex landed on');
			editInner('turnHexSelection', '<img src="img/shortcut/mpds/coinsm10.png" id="coinsm10" onclick="turnHex(this.id)"> <img src="img/shortcut/mpds/coinsm20.png" id="coinsm20" onclick="turnHex(this.id)"> <img src="img/shortcut/mpds/coinswap.png" id="coinswap" onclick="turnHex(this.id)"> <img src="img/shortcut/mpds/starm1.png" id="starm1" onclick="turnHex(this.id)"> <img src="img/shortcut/mpds/starm2.png" id="starm2" onclick="turnHex(this.id)"> <img src="img/shortcut/mpds/spaceswap.png" id="spaceswap" onclick="turnHex(this.id)"> <img src="img/shortcut/mpds/coinblock.png" id="coinblock" onclick="turnHex(this.id)"> <img src="img/shortcut/mpds/starblock.png" id="starblock" onclick="turnHex(this.id)">');
			break;
		case 'smp':
			editInner('turnStars', 'Stars');
			editInner('turnStarsSelection', '<img src="img/stars.png" onclick="buyStar()"> <img style="margin-left: 45px;" src="img/shortcut/smp/lakitu.png" onclick="steal()"> <img style="margin-left: 45px;" src="img/ally.png" onclick="getAlly()"> <br> <span id="stealSpan"> </span> <span id="starPricesContainer" class="imgSelection"> <span class="settingsNote"> <i> Only </i> select a star price when playing on <br> Kamek\'s Tantalizing Tower. </span> <br> <span id="starPricesSpan"> <img src="img/shortcut/smp/kamek5.png" id="kamek5" onclick="starPrices(5)"> <img src="img/shortcut/smp/kamek10.png" id="kamek10" onclick="starPrices(10)"> <img src="img/shortcut/smp/kamek15.png" id="kamek15" onclick="starPrices(15)"> </span> </span>');

			editInner('turnDiceTitle', 'Dice number rolled');
			editInner('turnDiceSelectionSpan', '<div style="width: 350px; position: relative;"> <span style="position: absolute; right: 0;"> <span id="allyDice1" class="spanSelection shortcutText"> <img src="img/smp/rosalina.png" style="width: 30px;"> <span onclick="allyDice(1, 1)"> 1 </span> <span onclick="allyDice(1, 2)"> 2 </span> </span> <br> <span id="allyDice2" class="spanSelection shortcutText"> <img src="img/smp/bowser.png" style="width: 30px;"> <span onclick="allyDice(2, 1)"> 1 </span> <span onclick="allyDice(2, 2)"> 2 </span> </span> <br> <span id="allyDice3" class="spanSelection shortcutText"> <img src="img/smp/yoshi.png" style="width: 30px;"> <span onclick="allyDice(3, 1)"> 1 </span> <span onclick="allyDice(3, 2)"> 2 </span> 	</span>  <br> <span id="allyDice4" class="spanSelection shortcutText"> <img src="img/smp/bowserjr.png" style="width: 30px;"> <span onclick="allyDice(4, 1)"> 1 </span> <span onclick="allyDice(4, 2)"> 2 </span> </span> </span><span id="allyDiceSelection" class="imgSelection"> <img src="img/shortcut/smp/defaultdice.png" class="selected" onclick="changeAllyDice(0)"> <img src="img/smp/daisy.png" onclick="changeAllyDice(1)"> <img src="img/smp/bowser.png" onclick="changeAllyDice(2)" style="display: none;"> <img src="img/smp/peach.png" onclick="changeAllyDice(3)" style="display: none;"> <img src="img/smp/drybones.png" onclick="changeAllyDice(4)" style="display: none;"> <img src="img/smp/bowserjr.png" onclick="changeAllyDice(5)" style="display: none;"> </span>  <br><span id="turnDiceSelection" class="shortcutText spanSelection"> <span id="dice1" onclick="turnDice(this.id)">1</span> <span id="dice2" onclick="turnDice(this.id)">2</span> <span id="dice3" onclick="turnDice(this.id)">3</span> <span id="dice4" onclick="turnDice(this.id)">4</span> <span id="dice5" onclick="turnDice(this.id)">5</span> <span id="dice6" onclick="turnDice(this.id)">6</span> </span> <br> <img src="img/shortcut/mpds/diceblock.png" id="turnCurDice"> <span id="turnCurDiceText" class="shortcutText">??</span> </div> <br>');

			editInner('turnShoppingTitle', 'Shopping');
			editInner('turnShoppingSelection', '<span onclick="shopping(3)">3</span> <span onclick="shopping(5)">5</span> <span onclick="shopping(6)">6</span> <span onclick="shopping(10)">10</span>');

			editInner('turnItemsTitle', 'Items used');
			editInner('turnItems', '<img src="img/shortcut/smp/mushroom.png" id="itemMushroom" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/goldmushroom.png" id="itemGoldMushroom" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/poisonmushroom.png" id="itemPoisonMushroom" onclick="turnItem(this.id)"> <br> <img src="img/shortcut/smp/coinado.png" id="itemCoinado" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/allyphone.png" id="itemAllyPhone" onclick="turnItem(this.id)"> <span class="shortcutText" id="itemOther" onclick="turnItem(this.id)">Other</span>');
			// if partner party == true
			//editInner('turnItems', '<img src="img/shortcut/smp/mushroom.png" id="itemMushroom" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/goldmushroom.png" id="itemGoldMushroom" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/poisonmushroom.png" id="itemPoisonMushroom" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/golddrink.png" id="itemGoldDrink" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/peepabell.png" id="itemPeepaBell" onclick="turnItem(this.id)"> <br> <img src="img/shortcut/smp/coinado.png" id="itemCoinado" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/duelglove.png" id="itemDuelGlove" onclick="turnItem(this.id)"> <img src="img/shortcut/smp/allyphone.png" id="itemAllyPhone" onclick="turnItem(this.id)"> <span class="shortcutText" id="itemOther" onclick="turnItem(this.id)">Other</span>');

			editInner('turnSpacesTitle', 'Space landed on');
			editInner('turnSpaces', '<img src="img/shortcut/smp/bluespace.png" id="spaceBlue" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/redspace.png" id="spaceRed" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/happeningspace.png" id="spaceHappening" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/allyspace.png" id="spaceAlly" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/itemspace.png" id="spaceItem" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/luckyspace.png" id="spaceLucky" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/badluckspace.png" id="spaceBadLuck" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/extrabadluckspace.png" id="spaceExtraBadLuck" onclick="turnSpace(this.id)"> <img src="img/shortcut/smp/vsspace.png" id="spaceVS" onclick="turnSpace(this.id)">');

			document.getElementById('hexColumn').style.display = 'none';

			document.getElementById('removeAllyChar1').children[0].src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[playerOrder[2]] + '.png';
			document.getElementById('removeAllyChar2').children[0].src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[playerOrder[3]] + '.png';
			document.getElementById('removeAllyChar3').children[0].src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[playerOrder[4]] + '.png';
			document.getElementById('allyDiceSelection').children[1].src = 'img/smp/' + characters[orderCurPlayer] + '.png';

			for (var num = 1; num < 5; num++) {
				document.getElementById(characters[num] + 'Ally').classList.add('allySelected');
			}			
			break;
	}
}

/*
* Skips to the next shortcut screen.
*/
function shortcutSkip () {
	switch (shortcutState) {
		case 0:
		case 1:
		case 4:
			return;
		case 2:
			turnEnd();
			break;
		case 3:
			startShortcut();
			break;
	}
}

/*
* Goes to the last shortcut screen.
*/
function shortcutBack () {
	switch (shortcutState) {
		case 0:
			return;
		case 1:
			shortcutState = 0;
			editInner('shortcutSpan', '<span class="settingsText" style="width: 100%; white-space: normal; line-height: 30px;"> Games currently supported: <img src="img/mpds.png" style="width: 40px;"> <img src="img/smp.png" style="width: 40px;"> <br> Only 4 players without Teams (this includes Partner Party) are currently supported. <br> <br> A lot of features depend on the coin counter, it\'s recommended to show it and keep it up to date. <br> This is currently in heavy development and some features might not work as intended. <br> <br> <button onclick="startShortcut()">Start game</button> <br> <br> <span class="settingsTitle"> Report Bugs </span> <br> In case something breaks or doesn\'t provide the expected output, please click on "Generate & Copy" and <a href="https://www.twitter.com/yoshisrc" class="settingsLink" rel="noopener" target="_blank">contact me</a> or <a href="https://github.com/blueYOSHI9000/MarioPartyOverlay/issues/new?template=bug_report.md" class="settingsLink" rel="noopener" target="_blank">open a Github issue</a> with a screenshot or copy-paste of your browsers console (Ctrl + Shift + I > "Console"). It shows the last actions done and potential errors. Thank you! <br> <br> <span class="settingsTitle"> Potential broken features </span> <br> Mario Party is hugely RNG based so some events are rare and as such hard to figure out how they work. <br> Be sure to check your coin count after some of these as it might not be correct anymore: <ul> 	<li>SMP Minigame tied rewards</li> 	<li>Battle Minigames (especially ties)</li> <li>Lucky/ Extra- Bad Luck Events (some might even be missing)</li> <li>VS space in SMP</li> <li>MPDS Duel space</li> </ul> </span>');
			document.getElementById('skipButton').disabled = 'true';
			document.getElementById('backButton').disabled = 'true';
			break;
		case 2:
			if (turnCurPlayer === 1) {
				if (getInner('curTurnText') == 1) {
					playerOrder = undefined;
					shortcutState = 0;
					document.getElementById('skipButton').disabled = 'true';
				} else {
					execOnMain('turns', ['curTurn', 1, 'M']);
					shortcutState = 2;
				}
				startShortcut();
			} else {
				turnCurPlayer = turnCurPlayer - 2;
				turnEnd();
			}
			break;
		case 3:
			turnCurPlayer = 3;
			shortcutState = 1;
			turnEnd();
			startShortcut();
			turnCurPlayer = 4;
			break;
		case 4:
			execOnMain('turns', ['curTurn', 1, 'M']);
			shortcutState = 2;
			document.getElementById('skipButton').disabled = '';
			startShortcut();
			break;
	}
}

/*
* 
*/
function shortcutSettings (close) {
	if (close === true) {
		document.getElementById('settingsMain').style = '';
		document.getElementById('shortcutSettings').style = '';
		document.getElementById('settingsMain').onclick = '';
		document.getElementById('shortcutSettingsPopup').style.display = 'none';
		return;
	}
	if (shortcutState === 1 || playerOrder.length != 5) {
		editInner('shortcutOrder', '<span class="settingsText"> Player order is not decided yet. </span>');
	} else {
		var iconStyle = document.querySelector('input[name="icons"]:checked').value;
		editInner('shortcutOrder', '<img src="img/1st.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[1]] + '.png"> <img src="img/2nd.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[2]] + '.png"> <img src="img/3rd.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[3]] + '.png"> <img src="img/4th.png"> <img src="img/' + iconStyle + '/' + characters[playerOrder[4]] + '.png">');
	}
	editInner('shortcutDebug', '<span> shortcutState: ' + shortcutState + '<br> spaceEventState: ' + spaceEventState.join(', ') + '<br> itemEventState: ' + itemEventState.join(', ') + '<br> diceCursor: ' + diceCursor + ' - diceRolls: ' + diceRolls.join(', ') + '<br> <br> statusEffects: <br> - P1: ' + statusEffects['p1'].join(', ') + '<br> - P2: ' + statusEffects['p2'].join(', ') + '<br> - P3: ' + statusEffects['p3'].join(', ') + '<br> - P4: ' + statusEffects['p4'].join(', ') + '<br> <br> allies: <br> - P1: ' + allies['p1'].join(', ') + '<br> - P2: ' + allies['p2'].join(', ') + '<br> - P3: ' + allies['p3'].join(', ') + '<br> - P4: ' + allies['p4'].join(', ') + '<br> bobombAlly: ' + bobombAlly.join(', ') + '</span>');

	document.getElementById('settingsMain').style = '-webkit-filter: blur(5px); filter: blur(5px);';
	document.getElementById('shortcutSettings').style = 'pointer-events: none;'; //filter and pointer event need to be different as blur wouldn't be smooth with 'shortcutSettings' and pointer-event would remove onClick
	document.getElementById('shortcutSettingsPopup').style.display = 'initial';
	setTimeout(function () {document.getElementById('settingsMain').setAttribute('onclick','shortcutSettings(true)');}, 10); //required because chrome would immediately execute the function if it was changed directly
}

/*
* Gets the last place player.
*/
function getLastPlace () {
	var stars = [];
	for (var num = 1; num < 5; num++) {
		stars.push(parseInt(getInner('p' + num + 'StarsText')));
	}
	var last = Array.min(stars);
	var arr = [];
	for (var num = 1; num < 5; num++) {
		if (last === stars[num - 1]) {
			arr.push(num);
		}
	}
	console.log(arr.join('+'))

	if (arr.length > 1) {
		stars = [];
		for (var num = 0; num < arr.length; num++) {
			stars.push(parseInt(getInner('p' + arr[num] + 'CoinsText')));
		}
		last = Array.min(stars);
		var arr2 = [];
		for (var num = 1; num < 5; num++) {
			if (last === stars[num - 1]) {
				arr2.push(arr[num - 1]);
			}
		}
		arr = arr2;
	}
	console.log(arr)
	console.log(arr2)
	return arr;
}

/*
* Required to calculate last place, there was just no better way.
*/
Array.min = function (array) {
	return Math.min.apply(Math, array);
}

/*
* Removes the first specified array item.
* 
* @param {array} arr The array that should be changed.
* @param {string/number/boolean} item The item that should be removed.
*/
function removeArrayItem (arr, item) {
	for (var num = 0; num < arr.length; num++) {
		if (arr[num] == item) {
			arr.splice(num, 1);
			break;
		}
	}
	return arr;
}

var lastPlace;
var finalFiveEvent;
/*
* Does the selected final 5 turn event.
* 
* @param {number} player The player that should be selected (only used if there's a tie for the last place).
*/
function finalFive (player) {
	if (player) {
		var elems = document.getElementById('finalFiveTie').children;
		for (var num = 0; num < elems.length; num++) {
			elems[num].classList.remove('selected');
		}
		elems[player].classList.add('selected');
		lastPlace = player;
		return;
	}
	if (lastPlace == 0) {
		shortcutNotif('Select the character thats in the last place.', true);
		return;
	}
	finalFiveEvent = getValue('finalFiveEvent');

	switch (finalFiveEvent) {
		case '20coins':
			execOnMain('counterButtons', [lastPlace, 'P', 20, 'coins']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got 20 coins.');
			break;
		case '30coins':
			execOnMain('counterButtons', [lastPlace, 'P', 30, 'coins']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got 30 coins.');
			break;
		case '1star':
			execOnMain('counterButtons', [lastPlace, 'P', 1, 'stars']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got 1 star.');
			break;
		case 'charity':
			var charity = 0;
			for (var num = 1; num < 5; num++) {
				if (parseInt(getInner('p' + num + 'CoinsText')) < 10) {
					charity = charity + parseInt(getInner('p' + num + 'CoinsText'));
				} else {
					charity = charity + 10;
				}
				execOnMain('counterButtons', [num, 'M', 10, 'coins']);
			}
			execOnMain('counterButtons', [lastPlace, 'P', charity, 'coins']);
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got ' + charity + ' coins from others.');
			break;
		case 'cheapStar':
			finalFiveEvent = 'cheapStar';
			shortcutNotif('Final 5 Frenzy: Stars are now just 5 coins!');
			break;
		case '100stars':
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got something that shouldn\'t happen.');
			break;
		case '300stars':
			shortcutNotif('Final 5 Frenzy: ' + getCharName(lastPlace) + ' got something that shouldn\'t happen.');
			break;
	}
	document.getElementById('skipButton').disabled = '';
	shortcutState = 1;
	startShortcut();
}

var playerOrder;
/*
* Chooses the order used for many shortcut functions.
* 
* @param {number} player The player that should be selected.
* @param {boolean} reset If the order should be reset.
*/
function chooseOrder (player, reset) {
	if (shortcutState == 1) {
		if (reset == true) {
			playerOrder = [''];
			editInner('chooseFirst', '');
			editInner('chooseSecond', '');
			editInner('chooseThird', '');
			editInner('chooseFourth', '');
			document.getElementById('chooseContinue').style.display = 'none';

			for (var num = 1; num < 5; num++) {
				document.getElementById('chooseP' + num).setAttribute('onClick', 'chooseOrder(' + num + ')');
				document.getElementById('chooseP' + num).classList.add('chooseImg');
				document.getElementById('chooseP' + num).classList.remove('chooseImgSelected');
			}
			return;
		}

		playerOrder.push(player);
		document.getElementById('chooseP' + player).onclick = '';
		document.getElementById('chooseP' + player).classList.add('chooseImgSelected');
		document.getElementById('chooseP' + player).classList.remove('chooseImg');
		switch (playerOrder.length) {
			case 2:
				editInner('chooseFirst','<img src="img/1st.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">');
				break;
			case 3:
				editInner('chooseSecond', '<img src="img/2nd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">');
				break;
			case 4:
				editInner('chooseThird','<img src="img/3rd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">');
				break;
			case 5:
				editInner('chooseFourth', '<img src="img/4th.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[player] + '.png">');
				document.getElementById('chooseContinue').style.display = 'block';
				break;
		}
	orderCurPlayer = playerOrder[1];
	}
}

var poisonSub = 0; //how much has been subtracted thanks to the poison mushroom
var activeItem;
/*
* Activates an item.
* 
* @param {string} item The item should be used.
*/
function turnItem (item) {
	removeSelected(document.getElementById('turnItems').children);

	if (shortcutGame == 'mpds') {
		for (var num = 6; num < 11; num++) {
			document.getElementById('dice' + num).style.display = '';
		}
	}
	item = item.substring(4);

	if (activeItem == item || (activeItem != undefined && activeItem != '')) { //undo item if it's already selected or when changing it
		switch (activeItem) {
			case 'Mushroom':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'running']);
				break;
			case 'GoldMushroom':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'running']);
				break;
			case 'PoisonMushroom':
				var num3
				for (var num2 = 0; num2 < statusEffects['p' + orderCurPlayer].length; num2++) {
					switch (statusEffects['p' + orderCurPlayer][num2]) {
						case 'poison':
							num3++
							break;
					}
				}
				if (poisonSub > 2) {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 2, 'running']);
					poisonSub = poisonSub - 2;
					if (poisonSub < 0) {
						poisonSub = 0;
					}
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'P', poisonSub, 'running']);
					poisonSub = 0;
				}
				statusEffects['p' + orderCurPlayer] = removeArrayItem(statusEffects['p' + orderCurPlayer], 'poison');

				var elems = document.getElementById('statusEffects').children;
				for (var num2 = 0; num2 < elems.length; num2++) {
					if (elems[num2].getAttribute('src') === 'img/shortcut/smp/poisonmushroom.png') {
						elems[num2].parentElement.removeChild(elems[num2]);
					}
				}
				break;
			case 'Coinado':
				if (itemEventState[1] === 'done') {
					execOnMain('counterButtons', [orderCurPlayer, 'M', itemEventState[3], 'coins']);
					execOnMain('counterButtons', [itemEventState[2], 'P', itemEventState[3], 'coins']);
				}
				break;
		}
	}

	if (activeItem == item) { // undo the item if it's already selected
		document.getElementById('itemImg').src = 'img/tie.png';
		editInner('itemEventSpan', '');
		activeItem = '';
		document.getElementById('turnCurDice').src = 'img/shortcut/mpds/diceblock.png';

		if (diceRolls.length != 0) {
			editInner('turnCurDiceText', diceRolls[0]);
		} else {
			editInner('turnCurDiceText', '??');
		}
		diceCursor = 0;

		if (item == 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'hex']);
		} else {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'item']);
		}
		shortcutNotif('Undid item.');
		return;

	} else if (activeItem != undefined && activeItem != '') {
		if (activeItem == 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'hex']);
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'item']);
		} else if (item == 'Hex' && activeItem != 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'item']);
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'hex']);
		}
	}
	editInner('itemEventSpan', '');

	switch (item) {
		case 'Double':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/double.png';
			document.getElementById('itemImg').src = 'img/shortcut/mpds/double.png';

			switch (diceRolls.length) {
				case 1:
					editInner('turnCurDiceText', diceRolls[0] + ' + <span style="color: ' + selColor + ';"> ?? </span>');
					diceCursor = 1;
					break;
				case 2:
				case 3:
					editInner('turnCurDiceText', diceRolls[0] + ' + ' + diceRolls[1]);
					diceCursor = 0;
					break;
				default:
					editInner('turnCurDiceText', '?? + ??');
					diceCursor = 0;
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' used a double dice.');
			break;

		case 'Triple':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/triple.png';
			document.getElementById('itemImg').src = 'img/shortcut/mpds/triple.png';

			switch (diceRolls.length) {
				case 1:
					editInner('turnCurDiceText', diceRolls[0] + ' + <span style="color: ' + selColor + ';"> ?? </span> + ??');
					diceCursor = 1;
					break;
				case 2:
					editInner('turnCurDiceText', diceRolls[0] + ' + ' + diceRolls[1] + ' + <span style="color: ' + selColor + ';"> ?? </span>');
					diceCursor = 2;
					break;
				case 3:
					editInner('turnCurDiceText', diceRolls[0] + ' + ' + diceRolls[1] + ' + ' + diceRolls[2]);
					diceCursor = 0;
					break;
				default:
					editInner('turnCurDiceText', '?? + ?? + ??');
					diceCursor = 0;
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' used a triple dice.');
			break;

		case 'Half':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/half.png';
			document.getElementById('itemImg').src = 'img/shortcut/mpds/half.png';
			for (var num = 6; num < 11; num++) {
				document.getElementById('dice' + num).style.display = 'none';
			}
			if (diceRolls.length != 0) {
				editInner('turnCurDiceText', diceRolls[0]);
			} else {
				editInner('turnCurDiceText', '??');
			}
			diceCursor = 0;
			shortcutNotif(getCharName(orderCurPlayer) + ' used a half dice.');
			break;

		case 'Hex':
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/diceblock.png';
			document.getElementById('itemImg').src = 'img/hex.png';
			shortcutNotif(getCharName(orderCurPlayer) + ' placed a hex.');
			break;

		case 'Mushroom':
			document.getElementById('itemImg').src = 'img/shortcut/smp/mushroom.png';
			execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'running']);
			break;

		case 'GoldMushroom':
			document.getElementById('itemImg').src = 'img/shortcut/smp/goldmushroom.png';
			execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'running']);
			break;

		case 'PoisonMushroom':
			document.getElementById('itemImg').src = 'img/shortcut/smp/poisonmushroom.png';
			editInner('itemEventSpan', '<span class="settingsText"> Who should get the poison mushroom? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="itemEvent(\'poison\', [4])">');
			break;

		case 'GoldDrink':
			document.getElementById('itemImg').src = 'img/shortcut/smp/golddrink.png';
			break;

		case 'PeepaBell':
			document.getElementById('itemImg').src = 'img/shortcut/smp/peepabell.png';
			break;

		case 'Coinado':
			document.getElementById('itemImg').src = 'img/shortcut/smp/coinado.png';
			editInner('itemEventSpan', '<span class="settingsText"> Select the amount of coins: <select id="coinadoSelect"> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> </select> and your rival: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="itemEvent(\'coinado\', [4])"> <br> <button onclick="itemEvent(\'coinado\', [\'start\'])"> Start! </button>');
				document.getElementById('itemEventSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;

		case 'DuelGlove':
			document.getElementById('itemImg').src = 'img/shortcut/smp/duelglove.png';
			break;

		case 'AllyPhone':
			document.getElementById('itemImg').src = 'img/shortcut/smp/allyphone.png';
			getAlly();
			break;

		default:
			document.getElementById('turnCurDice').src = 'img/shortcut/mpds/diceblock.png';
			document.getElementById('itemImg').src = 'img/question.png';
			document.getElementById('item' + item).classList.add('selected');
			shortcutNotif(getCharName(orderCurPlayer) + ' used a misc item.');

			if (diceRolls.length != 0) {
				editInner('turnCurDiceText', diceRolls[0]);
			} else {
				editInner('turnCurDiceText', '??');
			}
			diceCursor = 0;
	}
		document.getElementById('item' + item).classList.add('selected');

	if (activeItem == '' || activeItem == undefined) {
		if (item == 'Hex') {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'hex']);
		} else {
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'item']);
		}
	}
	activeItem = item;
}

var statusEffects = {
	p1: [],
	p2: [],
	p3: [],
	p4: []
};
var itemEventState = [];
/*
* Events for items.
* 
* @param {string} item What item.
* @param {array} attr Required attributes to calculate stuff.
*/
function itemEvent (item, attr) {
	if (itemEventState[0] != item) {
		itemEventState = [];
	}
	itemEventState[0] = item;
	switch (item) {
		case 'poison':
			if (attr[0] === orderCurPlayer) {
				editInner('statusEffects', getInner('statusEffects') + '<img src="img/shortcut/smp/poisonmushroom.png">');
				statusEffects['p' + orderCurPlayer].push('poison');
				if (diceRolls[0] != undefined && diceRolls[0].length != 0) {
					poisonSub = poisonSub + 2
					if (poisonSub > diceRolls[0]) {
						execOnMain('counterButtons', [orderCurPlayer, 'M', (poisonSub - diceRolls[0]), 'running']);
						poisonSub = diceRolls[0];
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 2, 'running']);
					}
				}
			} else {
				statusEffects['p' + attr[0]].push('poison');
			}
			itemEventState = ['poison', attr[0]];
			editInner('itemEventSpan', '');
			break;
		case 'coinado':
			if (isNaN(attr[0]) === false) {
				var elems = document.getElementById('itemEventSpan').children;
				removeSelected(elems);
				elems[attr[0] + 1].classList.add('selected');
				itemEventState = ['coinado', attr[0]];
				return;
			} else {
				if (isNaN(itemEventState[1]) === true) {
					shortcutNotif('Select a character to use Coinado.', true);
				}
				var coinNum = getValue('coinadoSelect');
				if (parseInt(getInner('p' + itemEventState[1] + 'CoinsText')) < coinNum) {
					coinNum = parseInt(getInner('p' + itemEventState[1] + 'CoinsText'));
				}
				execOnMain('counterButtons', [itemEventState[1], 'M', coinNum, 'coins']);
				execOnMain('counterButtons', [orderCurPlayer, 'P', coinNum, 'coins']);
				itemEventState = ['coinado', 'done', itemEventState[1], coinNum];
				shortcutNotif(getCharName(orderCurPlayer) + ' used a Coinado and got ' + coinNum + ' coins from ' + getCharName(itemEventState[2]) + '.');
				editInner('itemEventSpan', '');
			}
			break;
	}
}

var diceCursor; // used in case multiple dices are used, shows which number should be updated
var diceRolls = [];
var selColor = '#f10000';
/*
* Uses a dice.
* 
* @param {number} num The number gotten.
*/
function turnDice (num) {
	num = num.substring(4);
	if (num.substring(0, 1) != '+' && num.substring(0, 1) != '-') { //getting coins in SMP uses - & + and are identified by being a string instead of a number
		num = parseInt(num);
	}

	var diceRollsTotal = 0;

	if (poisonSub != 0) {
		execOnMain('counterButtons', [orderCurPlayer, 'P', poisonSub, 'running']);
	}
	if (typeof diceRolls[0] == 'string' && diceRolls.length != 0 && diceRolls != undefined) { //undo the last action done so the new action can be added immediately
		if (diceRolls[0].startsWith('+') == true) {
			diceRollsTotal = diceRolls[0];
			execOnMain('counterButtons', [orderCurPlayer, 'M', parseInt(diceRolls[0].substring(1)), 'coins']);
		} else if (diceRolls[0].startsWith('-') == true) {
			diceRollsTotal = diceRolls[0];
			execOnMain('counterButtons', [orderCurPlayer, 'P', parseInt(diceRolls[0].substring(1)), 'coins']);
		}
	} else {
		if (diceRolls.length != 0 && diceRolls != undefined) {
			for (var num2 = 0; num2 < diceRolls.length; num2++) {
				diceRollsTotal = parseInt(diceRollsTotal) + parseInt(diceRolls[num2]);
			}
		}
		execOnMain('counterButtons', [orderCurPlayer, 'M', diceRollsTotal, 'running']);
	}

	switch (activeItem) { //checks active items in case nultiple dices should be used
		case 'Double':
		case 'Triple':

			switch (activeItem) {
				case 'Double':
					for (var num2 = 0; num2 < 5; num2++) {
						if (diceRolls.length < 2) {
							diceRolls.push(0);
						} else {
							break;
						}
					}

					if (diceRolls.length > 2) {
						diceRolls = [diceRolls[0], diceRolls[1]];
					}
					if (diceRolls > 1) {
						diceCursor = 0;
					}

					diceRolls[diceCursor] = num;

					diceCursor++;
					if (diceCursor > 1) {
						diceCursor = 0;
					}
					break;

				case 'Triple':
					for (var num2 = 0; num2 < 5; num2++) {
						if (diceRolls.length < 3) {
							diceRolls.push(0);
						} else {
							break;
						}
					}

					diceRolls[diceCursor] = num;

					diceCursor++;
					if (diceCursor > 2) {
						diceCursor = 0;
					}
					break;
			}

			var diceRollsText = 0;
			if (diceCursor != 0) {
				diceRollsText = diceRolls.concat();

				for (var num2 = 0; num2 < diceRollsText.length; num2++) {
					if (diceRollsText[num2] == 0) {
						diceRollsText[num2] = '??';
					}
				}

				diceRollsText[diceCursor] = '<span style="color: ' + selColor + ';">' + diceRollsText[diceCursor] + '</span>';
				editInner('turnCurDiceText', diceRollsText.join(' + '));

				if (diceRolls[diceCursor] == 0) {
					diceRollsText[diceCursor] = '??';
				} else {
					diceRollsText[diceCursor] = diceRolls[diceCursor];
				}

				diceRollsText[diceCursor] = '*' + diceRollsText[diceCursor] + '*';
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + diceRollsText.join(' + ') + '.');
			} else {
				for (var num2 = 0; num2 < diceRolls.length; num2++) {
					diceRollsText = diceRollsText + parseInt(diceRolls[num2]);
				}
				editInner('turnCurDiceText', diceRolls.join(' + '));
				shortcutNotif(getCharName(orderCurPlayer) + ' rolled a ' + diceRollsText + '.');
			}
			break;

		default:
			diceCursor = 0;
			diceRolls = [num];
			editInner('turnCurDiceText', num);
			if (typeof num == 'string') {
				if (num.startsWith('+') == true) {
					diceRollsTotal = num;
					execOnMain('counterButtons', [orderCurPlayer, 'P', parseInt(num.substring(1)), 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' coins.');
					return;
				} else if (num.startsWith('-') == true) {
					diceRollsTotal = num;
					execOnMain('counterButtons', [orderCurPlayer, 'M', parseInt(num.substring(1)), 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' rolled ' + num + ' coins.');
					return;
				}
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' rolled a ' + num + '.');
	}
	diceRollsTotal = 0;
	for (var num2 = 0; num2 < diceRolls.length; num2++) {
		diceRollsTotal = parseInt(diceRollsTotal) + parseInt(diceRolls[num2]);
	}
	execOnMain('counterButtons', [orderCurPlayer, 'P', diceRollsTotal, 'running']);

	poisonSub = 0;
	for (var num2 = 0; num2 < statusEffects['p' + orderCurPlayer].length; num2++) {
		switch (statusEffects['p' + orderCurPlayer][num2]) {
			case 'poison':
				if (parseInt(getInner('p' + orderCurPlayer + 'RunningText')) < 2) {
					poisonSub = poisonSub + parseInt(getInner('p' + orderCurPlayer + 'RunningText'));
				} else {
					poisonSub = poisonSub + 2;
				}
				if (poisonSub > diceRollsTotal) {
					poisonSub = diceRollsTotal;
				}
				break;
		}
	}
	execOnMain('counterButtons', [orderCurPlayer, 'M', poisonSub, 'running']);
}

var allies = {
	p1: [],
	p2: [],
	p3: [],
	p4: []
};
var bobombAlly = ['', 0, 0, 0, 0];
/*
* Adds an ally to the current player.
* 
* @param {string} ally The Ally that should be added.
* @param {boolean} nobobomb If the bobombAlly array should be updated.
*/
function getAlly (ally, nobobomb) {
	if (ally) {
		if (ally === 'close') {
			document.getElementById('settingsMain').style = '';
			document.getElementById('shortcutSettings').style = '';
			document.getElementById('settingsMain').onclick = '';
			document.getElementById('allySelection').style.display = 'none';
			if (closeAlly === true) {
				turnEnd();
			}
			return;
		}

		if (ally === 'bobomb') {
			if (nobobomb != true) {
				if (allies['p' + orderCurPlayer].length > 3) {
					document.getElementById(allies['p' + orderCurPlayer][3] + 'Ally').classList.remove('allySelected');
					removeAlly(orderCurPlayer, 4);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'ally']);
				}
				bobombAlly[orderCurPlayer] = parseInt(getInner('curTurnText'));
			}
			editInner('allyDice4', '<img src="img/smp/bobomb.png" style="width: 30px;"> <span onclick="allyDice(4, 1)"> 0 </span> <span onclick="allyDice(4, 2)"> -1 </span>');
			if (allies['p' + orderCurPlayer].length > 3) {
				allies['p' + orderCurPlayer] = allies['p' + orderCurPlayer].slice(0, 3);
			}
			document.getElementById('allyDice4').style.visibility = 'visible';
			document.getElementById('removeAllySelection').children[3].src = 'img/smp/bobomb.png';
			document.getElementById('removeAllySelection').children[3].style.visibility = 'visible';
			getAlly('close');
			return;
		}
		for (var num = 1; num < 5; num++) {
			if (ally == characters[num]) {
				return;
			}
			for (var num2 = 0; num2 < allies['p' + num].length; num2++) {
				if (ally == allies['p' + num][num2]) {
					return;
				}
			}
		}	
		if (allies['p' + orderCurPlayer].length > 2 && bobombAlly[orderCurPlayer] != 0) {
			bobombAlly[orderCurPlayer] = 0;
		}
		if (allies['p' + orderCurPlayer].length > 3) {
			document.getElementById(allies['p' + orderCurPlayer][3] + 'Ally').classList.remove('allySelected');
			allies['p' + orderCurPlayer] = [allies['p' + orderCurPlayer][0], allies['p' + orderCurPlayer][1], allies['p' + orderCurPlayer][2], ally];
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'ally']);
		} else {
			allies['p' + orderCurPlayer].push(ally);
		}
		var elems = document.getElementById('allyDiceSelection').children;

		for (var num = 2; num < allies['p' + orderCurPlayer].length + 2; num++) {
			elems[num].style.display = 'initial';
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num -2] + '.png';
			if (num === 5) {
				break;
			}
		}
		elems = document.getElementById('removeAllySelection').children;
		for (var num = 0; num < allies['p' + orderCurPlayer].length; num++) {
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
			elems[num].style.visibility = 'visible';
			document.getElementById('allyDice' + (num + 1)).style.visibility = 'visible';
			if ((num + 1) === 4) {
				editInner('allyDice' + (num + 1), '<img src="img/smp/' + allies['p' + orderCurPlayer][num] + '.png" style="width: 30px;"> <span onclick="allyDice(4, 1)"> 1 </span> <span onclick="allyDice(4, 2)"> 2 </span>');
			} else {
				document.getElementById('allyDice' + (num + 1)).children[0].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
			}
		}

		document.getElementById(ally + 'Ally').classList.add('allySelected');
		execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'ally']);
		shortcutNotif(getCharName(orderCurPlayer) + ' got ' + getCharName(ally) + ' as an ally.');
		if (closeAlly === true) {
			turnEnd();
		}
		getAlly('close');
		return;
	} else {
		closeAlly = false;
		document.getElementById('settingsMain').style = '-webkit-filter: blur(5px); filter: blur(5px);';
		document.getElementById('shortcutSettings').style = 'pointer-events: none;'; //filter and pointer event need to be different as blur wouldn't be smooth with 'shortcutSettings' and pointer-event would remove onClick
		document.getElementById('allySelection').style.display = 'initial';
		setTimeout(function () {document.getElementById('settingsMain').setAttribute('onclick','getAlly(\'close\')');}, 10); //required because chrome would immediately execute the function if it was changed directly
	}
}

/*
* Removes an ally from a player.
* 
* @param {number} player The player thats affected.
* @param {number} ally The ally that should be removed.
*/
function removeAlly (player, ally) {
	if (ally === 4 && bobombAlly[player] != 0) {
		document.getElementById('allyDice4').style.visibility = 'hidden';
		document.getElementById('removeAllySelection').children[3].style.visibility = 'hidden';
		bobombAlly[player] = 0;
		//getAlly('close');
		return;
	}
	if (player === 1) {
		var elems = document.getElementById('removeAllySelection').children;
		var elems2 = [document.getElementById('allyDice1'), document.getElementById('allyDice2'), document.getElementById('allyDice3'), document.getElementById('allyDice4')];
		elems[allies['p' + orderCurPlayer].length - 1].style.visibility = 'hidden';
		elems2[allies['p' + orderCurPlayer].length - 1].style.visibility = 'hidden';

		document.getElementById(allies['p' + orderCurPlayer][ally - 1] + 'Ally').classList.remove('allySelected');
		execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'ally']);
		shortcutNotif(getCharName(orderCurPlayer) + ' lost ' + getCharName(allies['p' + orderCurPlayer][ally - 1]) + ' as an ally.');

		allies['p' + orderCurPlayer].splice(ally - 1, 1);
		for (var num = 0; num < allies['p' + orderCurPlayer].length; num++) {
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
			elems2[num].children[0].src = 'img/smp/' + allies['p' + orderCurPlayer][num] + '.png';
		}

		elems = document.getElementById('allyDiceSelection').children;

		for (var num = 2; num < elems.length; num++) {
			if ((allies['p' + orderCurPlayer].length + 1) < num) {
				elems[num].style.display = 'none';
			}
		}

		for (var num = 2; num < allies['p' + orderCurPlayer].length + 2; num++) {
			elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num - 2] + '.png';
		}
	} else {
		var char = parseInt(document.getElementById('removeAllyChar' + (player - 1)).getAttribute('player'));
		var elems = document.getElementById('removeAllyChar' + (player - 1)).children;
		elems[allies['p' + char].length].style.visibility = 'hidden';

		execOnMain('counterButtons', [char, 'M', 1, 'ally']);
		shortcutNotif(getCharName(char) + ' lost ' + getCharName(allies['p' + char][ally - 1]) + ' as an ally.');

		document.getElementById(allies['p' + char][ally - 1] + 'Ally').classList.remove('allySelected');
		allies['p' + char].splice(ally - 1, 1);
		for (var num = 0; num < allies['p' + char].length; num++) {
			elems[num + 1].src = 'img/smp/' + allies['p' + char][num] + '.png';
		}
	}
	//getAlly('close');
}

/*
* Changes the dice numbers based on ally selected.
* 
* @param {number} ally Which dice it should be changed to.
*/
function changeAllyDice (ally) {
	var elems = document.getElementById('allyDiceSelection').children;
	removeSelected(elems);
	elems[ally].classList.add('selected');

	var dice = [];

	if (ally == 0) {
		dice = [1, 2, 3, 4, 5, 6];
	} else {
		switch (elems[ally].src.replace(/^.*[\\\/]/, '').slice(0, -4)) { //get the character name from elements src
			case 'mario':
				dice = [1, 3, 3, 3, 5, 6];
				break;
			case 'luigi':
				dice = [1, 1, 1, 5, 6, 7];
				break;
			case 'peach':
				dice = [0, 2, 4, 4, 4, 6];
				break;
			case 'daisy':
				dice = [3, 3, 3, 3, 4, 4];
				break;
			case 'wario':
				dice = ['-2', '-2', 6, 6, 6, 6];
				break;
			case 'waluigi':
				dice = ['-3', 1, 3, 5, 5, 7];
				break;
			case 'yoshi':
				dice = [0, 1, 3, 3, 5, 7];
				break;
			case 'rosalina':
				dice = ['+2', '+2', 2, 3, 4, 8];
				break;
			case 'dk':
				dice = ['+5', 0, 0, 0, 10, 10];
				break;
			case 'diddy':
				dice = ['+2', 0, 0, 7, 7, 7];
				break;
			case 'bowser':
				dice = ['-3', '-3', 1, 8, 9, 10];
				break;
			case 'goomba':
				dice = ['+2', '+2', 3, 4, 5, 6];
				break;
			case 'shyguy':
				dice = [0, 4, 4, 4, 4, 4];
				break;
			case 'koopa':
				dice = [1, 1, 2, 3, 3, 10];
				break;
			case 'monty':
				dice = ['+1', 2, 3, 4, 5, 6];
				break;
			case 'bowserjr':
				dice = [1, 1, 1, 4, 4, 9];
				break;
			case 'boo':
				dice = ['-2', '-2', 5, 5, 7, 7];
				break;
			case 'hammerbro':
				dice = ['+3', 1, 1, 5, 5, 5];
				break;
			case 'drybones':
				dice = [1, 1, 1, 6, 6, 6];
				break;
			case 'pompom':
				dice = [0, 3, 3, 3, 3, 8];
				break;
		}
	}
	for (var num = 0; num < dice.length; num++) {
		dice[num] = '<span id="dice' + dice[num] + '" onclick="turnDice(this.id)">' + dice[num] + '</span>'
	}

	editInner('turnDiceSelection', dice.join(' '));
}

var allyDiceRolls = ['', 0, 0, 0, 0];
/*
* 
*/
function allyDice (ally, dice) {
	var elems = document.getElementById('allyDice' + ally).children;
	elems[1].classList.remove('selected');
	elems[2].classList.remove('selected');
	if (allyDiceRolls[ally] === dice) {
		if (ally === 4 && bobombAlly[orderCurPlayer] != 0) {
			if (dice === 2) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
			}
		} else {
			if (allyDiceRolls[ally] === -1) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
			} else {
				execOnMain('counterButtons', [orderCurPlayer, 'M', allyDiceRolls[ally], 'running']);
			}
		}
		allyDiceRolls[ally] = 0;
		return;
	}

	elems[dice].classList.add('selected');

	if (ally === 4 && bobombAlly[orderCurPlayer] != 0) {
		if (dice === 2) {
			execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'running']);
		} else {
			if (allyDiceRolls[ally] === 2) {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
			}
		}
		allyDiceRolls[ally] = dice;
		elems[dice].classList.add('selected');
		return;
	}

	if (allyDiceRolls[ally] === -1) {
		execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'running']);
	} else {
		execOnMain('counterButtons', [orderCurPlayer, 'M', allyDiceRolls[ally], 'running']);
	}
	execOnMain('counterButtons', [orderCurPlayer, 'P', dice, 'running']);
	allyDiceRolls[ally] = dice;
	console.log(ally)
	shortcutNotif(getCharName(allies['p' + orderCurPlayer][ally - 1]) + ' rolled a ' + dice + ' for ' + getCharName(orderCurPlayer) + '.');
}

var closeAlly = false;
var activeSpace;
/*
* Activates spaces.
* 
* @param {string} space Space landed on.
*/
function turnSpace (space) {
	removeSelected(document.getElementById('turnSpaces').children);
	
	space = space.substring(5);

	if (activeSpace != '' && activeSpace != undefined) { //undo space if it's already selected or changed into a different one
		switch (activeSpace) {
			case 'Blue':
				if (starPrice != 0) {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
					}
				} else {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'coins']);
					}
				}
				shortcutNotif('Undid the blue space.');
				break;
			case 'Red':
				if (starPrice != 0) {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 10, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
					}
				} else {
					if (finalFiveEvent === 'doubleSpaces') {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
					}
				}
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'redSpace']);
				shortcutNotif('Undid the red space.');
				break;
			case 'Happening':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'happening']);
				shortcutNotif('Undid the happening space, coins gathered need to be removed manually.');
				break;
			case 'Friend':
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'friendSpace']);

				if (spaceEventState[0] == 'friend' && spaceEventState[1] != 0) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					execOnMain('counterButtons', [spaceEventState[1], 'M', 5, 'coins']);
				}
				spaceEventState = [];
				shortcutNotif('Undid the friend space.');
				break;
			case 'Duel':
				if (spaceEventState[5]) {
					if (spaceEventState[1] == 'done') {
						if (spaceEventState[5] == '1star' || spaceEventState[5] == '2stars') {
							execOnMain('counterButtons', [spaceEventState[6], 'M', spaceEventState[2], 'stars']);
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'stars']);
							execOnMain('counterButtons', [spaceEventState[7], 'P', spaceEventState[4], 'stars']);
						} else {
							execOnMain('counterButtons', [spaceEventState[6], 'M', spaceEventState[2], 'coins']);
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [spaceEventState[7], 'P', spaceEventState[4], 'coins']);
						}
					} else if (spaceEventState[0] == 'duel') {
						if (spaceEventState[2] == '1star' || spaceEventState[2] == '2stars') {
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'stars']);
							execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'stars']);
						} else {
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'coins']);
						}
					}
				}
				spaceEventState = ['duel', 'undo'];
				shortcutNotif('Undid the duel space.');
				break;
			case 'Bowser':
				if (spaceEventState[1] == 'done') {
					switch (spaceEventState[2]) {
						case 'coins':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
							break;
						case 'stars':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'stars']);
							break;
						case 'charity':
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
						case 'equality':
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
					}
					spaceEventState = ['bowser', 'undo'];
				}
				shortcutNotif('Undid the bowser space.');
				break;
			case 'Ally':
				//getAlly();
				break;
			case 'Lucky':
				if (spaceEventState[1] == 'done') {
					switch (spaceEventState[2]) {
						case 'coins':
							execOnMain('counterButtons', [orderCurPlayer, 'M', spaceEventState[3], 'coins']);
							break;
						case 'coinsrival':
							execOnMain('counterButtons', [orderCurPlayer, 'M', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [spaceEventState[4], 'P', spaceEventState[3], 'coins']);
							break;
						case 'stealally':
							break;
					}
					spaceEventState = ['badluck', 'undo'];
				}
				shortcutNotif('Undid the lucky space.');
				break;
			case 'BadLuck':
			case 'ExtraBadLuck':
				if (spaceEventState[1] == 'done') {
					switch (spaceEventState[2]) {
						case 'coins':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
							break;
						case 'coinsothers':
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
						case 'coinsrandom':
							execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [spaceEventState[4], 'M', spaceEventState[3], 'coins']);
							break;
						case 'stars':
							execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
							execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
							execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
							execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
							break;
						case 'raisestarcost':
							break;
					}
					spaceEventState = ['badluck', 'undo'];
				}
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'redSpace']);
				shortcutNotif('Undid the bad luck space.');
				break;

			case 'VS':
				if (spaceEventState[1] === 'done') {
					execOnMain('counterButtons', [1, 'S', spaceEventState[3], 'coins']);
					execOnMain('counterButtons', [2, 'S', spaceEventState[4], 'coins']);
					execOnMain('counterButtons', [3, 'S', spaceEventState[5], 'coins']);
					execOnMain('counterButtons', [4, 'S', spaceEventState[6], 'coins']);
					spaceEventState = ['vsspace', 'undo'];
				}
				shortcutNotif('Undid the VS space.');
				break;
		}
	}

	if (activeSpace == space) { //stop function if the exact same space is selected
		document.getElementById('spaceEventImg').src = '';
		editInner('spaceEventsSpan', '');
		activeSpace = '';
		return;
	}
	editInner('spaceEventsSpan', '');

	switch (space) {
		case 'Blue':
			if (starPrice != 0) {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 10, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
				}
			} else {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 6, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
				}
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' got 3 coins from a blue space.');
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Red':
			if (starPrice != 0) {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
				}
			} else {
				if (finalFiveEvent === 'doubleSpaces') {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 6, 'coins']);
				} else {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 3, 'coins']);
				}
			}
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'redSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' lost 3 coins from a red space.');
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Happening':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'happening']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a happening space, coins gotten in it need to be added manually.');
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Friend':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'friendSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a friend space, select a friend to give them 5 coins.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Who should get 5 coins? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'friend\', [4])">');
			document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;
		case 'Duel':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a duel space, select a rival to fight.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select opponent and reward </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [4])"> <br> <select id="duelReward"> <option value="10coins">10 Coins</option> <option value="20coins">20 Coins</option> <option value="halfcoins">Half your coins</option> <option value="allcoins">All your coins</option> <option value="1star">1 Star</option> <option value="2stars">2 Stars</option> </select> <button style="margin-left: 13px;" onclick="spaceEvent(\'duel\', [\'start\'])">Start Duel</button>');
			document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			break;
		case 'Bowser':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a bowser space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the Bowser event: </span> <br> <select id="bowserEvent"> <option value="coins">Gimme Coins!</option> <option value="stars">Gimme Stars!</option> <option value="charity">Gimme Charity!</option> <option value="equality">Gimme Equality!</option> </select> <br> <br> <button onclick="spaceEvent(\'bowser\')">Start event!</button>');
			break;
		case 'Ally':
			getAlly();
			closeAlly = true;
			break;
		case 'Item':
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
				return;
			}
			break;
		case 'Lucky':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a lucky space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the event: </span> <br> <select id="luckyEvent"> <option value="stealally">Steal one ally from a rival.</option> <option value="3coins">Receive 3 coins.</option> <option value="5coins">Receive 5 coins.</option> <option value="5coinsrival">Make a rival lose 5 coins.</option> <option value="10coinsrival">Make a rival lose 10 coins.</option> <option value="items">Receive item(s).</option> </select> <br> <br> <button onclick="spaceEvent(\'lucky\')">Start event!</button>');
			break;
		case 'BadLuck':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'redSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a bad luck space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the event: </span> <br> <select id="badluckEvent"> <option value="5coins">Lose 5 coins.</option> <option value="10coins">Lose 10 coins.</option> <option value="3coinsothers">Give 3 coins to all other players.</option> <option value="5coinsothers">Give 5 coins to all other players.</option> <option value="5coinslast">Give 5 coins to the last-place player.</option> <option value="10coinslast">Give 10 coins to the last-place player.</option> <option value="5coinsrandom">Give 5 coins to a random player.</option> <option value="movestar">The Star moves.</option> <option value="raisestarcost">Raise the coin cost for a Star.</option> </select> <br> <br> <button onclick="spaceEvent(\'badluck\')">Start event!</button>');
			break;
		case 'ExtraBadLuck':
			execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'redSpace']);
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a extra bad luck space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Select the event: </span> <br> <select id="badluckEvent"> <option value="1star">Lose one Star.</option> <option value="5coins">Lose 5 coins.</option> <option value="10coins">Lose 10 coins.</option> <option value="20coins">Lose 20 coins.</option> <option value="halfcoins">Lose half your coins.</option> <option value="5coinsothers">Give 5 coins to all other players.</option> <option value="10coinsothers">Give 10 coins to all other players.</option> <option value="10coinslast">Give 10 coins to the last-place player.</option> </select> <br> <br> <button onclick="spaceEvent(\'badluck\')">Start event!</button>');
			break;
		case 'VS':
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a VS space, select the event.');

			editInner('spaceEventsSpan', '<span class="settingsText"> Start VS Minigame for <select id="vsspaceSelect"> <option value="5">5 Coins</option> <option value="7">7 Coins</option> <option value="10" selected>10 Coins</option> <option value="15">15 Coins</option> <option value="20">20 Coins</option> <option value="25">25 Coins</option> <option value="30">30 Coins</option> </select> coins. </span> <br> <button onclick="spaceEvent(\'vsspace\')"> Start! </button>')
			break;
		default:
			document.getElementById('spaceEventImg').src = '';
			editInner('spaceEventsSpan', '');
			return;
	}
	document.getElementById('space' + space).classList.add('selected');
	document.getElementById('spaceEventImg').src = 'img/shortcut/' + shortcutGame + '/' + space.toLowerCase() + 'space.png';
	activeSpace = space;
}

var starCost = '';
var spaceEventState = [];
/*
* Events for space (like duel or bowser).
* 
* @param {string} space What space.
* @param {array} attr Required attributes to calculate stuff.
*/
function spaceEvent (space, attr) {
	if (spaceEventState[0] != space) {
		spaceEventState = [];
	}
	spaceEventState[0] = space;
	switch (space) {
		case 'friend':
			var elems = spaceEventsSpan.children;
			for (var num = 2; num < elems.length; num++) {
				elems[num].classList.remove('selected');
			}
			if (spaceEventState[1] == attr[0]) {
				spaceEventState[1] = 0;
				execOnMain('counterButtons', [attr[0], 'M', 5, 'coins']);
				execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
				shortcutNotif('Undid the friend space.');
				return;
			}
			document.getElementById('spaceEventsSpan').children[attr[0] + 1].classList.add('selected');

			if (spaceEventState[1] != attr[0] && spaceEventState[1] != 0 && spaceEventState[1] != undefined) {
				execOnMain('counterButtons', [spaceEventState[1], 'M', 5, 'coins']);
			} else {
				execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
			}
			execOnMain('counterButtons', [attr[0], 'P', 5, 'coins']);
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
			}
			shortcutNotif(getCharName(orderCurPlayer) + ' landed on a friend space and got 5 coins together with ' + getCharName(attr[0]) + '.');
			spaceEventState[1] = attr[0];
			break;

		case 'duel':
			/*
			* spaceEventState for duel:
			* [1] = opponent
			* [2] = selected reward
			* [3] = available coins/stars
			* [4] = coins/stars given by current player
			* [5] = coins/stars given by opponent
			*/
			if (attr[0] == 'win') {
				if (spaceEventState[2] == '1star' || spaceEventState[2] == '2stars') {
					execOnMain('counterButtons', [attr[1], 'P', spaceEventState[3], 'stars']);
					shortcutNotif(getCharName(attr[1]) + ' won the duel and got ' + spaceEventState[3] + ' star(s).');
				} else {
					execOnMain('counterButtons', [attr[1], 'P', spaceEventState[3], 'coins']);
					shortcutNotif(getCharName(attr[1]) + ' won the duel and got ' + spaceEventState[3] + ' coins.');
				}
				editInner('spaceEventsSpan', '');
				spaceEventState = ['duel', 'done', spaceEventState[3], spaceEventState[4], spaceEventState[5], spaceEventState[2], attr[1], spaceEventState[1]];
				if (getValue('shortcutAutoEnd') === true) {
					turnEnd();
				}
				return;
			} else if (attr[0] == 'tie') {
				if (spaceEventState[2] == '1star' || spaceEventState[2] == '2stars') {
					execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'stars']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'stars']);
					shortcutNotif('The duel was a tie and both got their stars back.');
				} else {
					execOnMain('counterButtons', [spaceEventState[1], 'P', spaceEventState[5], 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', spaceEventState[4], 'coins']);
					shortcutNotif('The duel was a tie and both got their coins back.');
				}
				editInner('spaceEventsSpan', '');
				if (getValue('shortcutAutoEnd') === true) {
					turnEnd();
				}
				return;
			} else if (attr[0] == 'start') {
				if (spaceEventState[1] == undefined || spaceEventState[1] == 'undo') {
					shortcutNotif('Select a character to fight against.', true)
					return;
				}
				spaceEventState[2] = getValue('duelReward');
				switch (getValue('duelReward')) {
					case '10coins':
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							spaceEventState[4] = 10;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'CoinsText')) < 10) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'CoinsText'));
						} else {
							spaceEventState[5] = 10;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 10, 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 10 Coin duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case '20coins':
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							spaceEventState[4] = 20;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'CoinsText')) < 20) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'CoinsText'));
						} else {
							spaceEventState[5] = 20;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 20, 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 20 Coin duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case 'halfcoins':
						spaceEventState[4] = Math.floor(parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) / 2);
						spaceEventState[5] = Math.floor(parseInt(getInner('p' + spaceEventState[1] + 'CoinsText')) / 2);
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];

						execOnMain('counterButtons', [orderCurPlayer, 'M', spaceEventState[4], 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', spaceEventState[5], 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a duel for half coins with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case 'allcoins':
						spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'CoinsText'));
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];

						execOnMain('counterButtons', [orderCurPlayer, 'S', 0, 'coins']);
						execOnMain('counterButtons', [spaceEventState[1], 'S', 0, 'coins']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a duel for all coins with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case '1star':
						if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 1) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
						} else {
							spaceEventState[4] = 1;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'StarsText')) < 1) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'StarsText'));
						} else {
							spaceEventState[5] = 1;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 1, 'stars']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 1 Star duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
					case '2stars':
						if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 2) {
							spaceEventState[4] = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
						} else {
							spaceEventState[4] = 2;
						}
						if (parseInt(getInner('p' + spaceEventState[1] + 'StarsText')) < 2) {
							spaceEventState[5] = parseInt(getInner('p' + spaceEventState[1] + 'StarsText'));
						} else {
							spaceEventState[5] = 2;
						}
						spaceEventState[3] = spaceEventState[4] + spaceEventState[5];
						execOnMain('counterButtons', [orderCurPlayer, 'M', 2, 'stars']);
						execOnMain('counterButtons', [spaceEventState[1], 'M', 2, 'stars']);
						shortcutNotif(getCharName(orderCurPlayer) + ' started a 2 Star duel with ' + getCharName(spaceEventState[1]) + ', select the winner.');
						break;
				}
				editInner('spaceEventsSpan', '<span class="settingsText"> Select the winner </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[orderCurPlayer] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [\'win\', ' + orderCurPlayer + '])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[spaceEventState[1]] + '.png" class="chooseImg" onclick="spaceEvent(\'duel\', [\'win\', ' + spaceEventState[1] + '])"> <span class="shortcutText chooseImg" style="font-size: 30px;" onclick="spaceEvent(\'duel\', [\'tie\'])"> Tie </span>');
				return;
			}

			var elems = spaceEventsSpan.children;
			for (var num = 2; num < elems.length; num++) {
				elems[num].classList.remove('selected');
			}
			if (spaceEventState[1] == attr[0]) {
				spaceEventState[1] = 0;
				return;
			}
			document.getElementById('spaceEventsSpan').children[attr[0] + 1].classList.add('selected');
			spaceEventState[1] = attr[0];
			break;

		case 'bowser':
			switch (getValue('bowserEvent')) {
				case 'coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
							spaceEventState = ['bowser', 'done', getValue('bowserEvent'), parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
						} else {
							spaceEventState = ['bowser', 'done', getValue('bowserEvent'), 10];
						}
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
						shortcutNotif('Bowser Space "Gimme Coins!" - Took 10 coins from ' + getCharName(characters[orderCurPlayer]) + '.');
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
						spaceEventState = ['bowser', 'done', getValue('bowserEvent'), 20];
						shortcutNotif('Bowser Space "Gimme Coins!" - Took 20 coins from ' + getCharName(characters[orderCurPlayer]) + '.');
					}
					break;
				case 'stars':
					execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
					spaceEventState = ['bowser', 'done', getValue('bowserEvent'), 1];
					shortcutNotif('Bowser Space "Gimme Stars!" - Took 1 Star from ' + getCharName(characters[orderCurPlayer]) + '.');
					break;
				case 'charity':
					spaceEventState = ['bowser', 'done', getValue('bowserEvent'), getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 30) {
						var num2 = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						for (var num = 0; num < 5; num++) {
							if (num2 % 3 == 0) {
								break;
							}
							num2--
						}
						var num3 = Math.floor(num2 / 3);
						execOnMain('counterButtons', [1, 'P', num3, 'coins']);
						execOnMain('counterButtons', [2, 'P', num3, 'coins']);
						execOnMain('counterButtons', [3, 'P', num3, 'coins']);
						execOnMain('counterButtons', [4, 'P', num3, 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'M', num2 + num3, 'coins']);
						shortcutNotif('Bowser Space "Gimme Charity!" - Took ' + num2 + ' coins from ' + getCharName(characters[orderCurPlayer]) + ' and gave ' + num3 + ' coins to everyone else.');
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 40, 'coins']);
						execOnMain('counterButtons', [1, 'P', 10, 'coins']);
						execOnMain('counterButtons', [2, 'P', 10, 'coins']);
						execOnMain('counterButtons', [3, 'P', 10, 'coins']);
						execOnMain('counterButtons', [4, 'P', 10, 'coins']);
						shortcutNotif('Bowser Space "Gimme Charity!" - Took 30 coins from ' + getCharName(characters[orderCurPlayer]) + ' and gave 10 coins to everyone else.');
					}
					break;
				case 'equality':
					spaceEventState = ['bowser', 'done', getValue('bowserEvent'), getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];
					var coinNum = parseInt(getInner('p' + 1 + 'CoinsText')) + parseInt(getInner('p' + 2 + 'CoinsText'))+ parseInt(getInner('p' + 3 + 'CoinsText')) + parseInt(getInner('p' + 4 + 'CoinsText'));
					coinNum = Math.floor(coinNum / 4);
					execOnMain('counterButtons', [1, 'S', coinNum, 'coins']);
					execOnMain('counterButtons', [2, 'S', coinNum, 'coins']);
					execOnMain('counterButtons', [3, 'S', coinNum, 'coins']);
					execOnMain('counterButtons', [4, 'S', coinNum, 'coins']);
					shortcutNotif('Bowser Space "Gimme Equality!" - Set everyones coin count to ' + coinNum + '.');
					break;
			}
			if (getValue('shortcutAutoEnd') === true) {
				turnEnd();
			}
			editInner('spaceEventsSpan', '');
			break;

		case 'lucky':
			if (attr) {
				var switchVar = attr[0];
			} else {
				var switchVar = getValue('luckyEvent');
			}
			switch (switchVar) {
				case 'stealally':
					getAlly();
					break;
				case '3coins':
					spaceEventState = ['lucky', 'done', 'coins', 3];
					execOnMain('counterButtons', [orderCurPlayer, 'P', 3, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got 3 coins.');
					break;
				case '5coins':
					spaceEventState = ['lucky', 'done', 'coins', 5];
					execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got 5 coins.');
					break;
				case '5coinsrival':
					if (attr && isNaN(attr[1]) == false) {
						var random = attr[1];
					} else {
						editInner('spaceEventsSpan', '<span class="settingsText"> Select your rival: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					}

					var coins
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
						coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
					} else {
						coins = 5;
					}
					execOnMain('counterButtons', [orderCurPlayer, 'P', coins, 'coins']);
					execOnMain('counterButtons', [random, 'M', coins, 'coins']);
					spaceEventState = ['lucky', 'done', 'coinsrival', coins, random];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got ' + coins + ' coins from ' + getCharName(random) + '.');
					break;
				case '10coinsrival':
					if (attr && isNaN(attr[1]) == false) {
						var random = attr[1];
					} else {
						editInner('spaceEventsSpan', '<span class="settingsText"> Select your rival: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'lucky\', [\'5coinsrival\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					}

					var coins
					if (parseInt(getInner('p' + random + 'CoinsText')) < 10) {
						coins = parseInt(getInner('p' + random + 'CoinsText'));
					} else {
						coins = 10;
					}
					execOnMain('counterButtons', [orderCurPlayer, 'P', coins, 'coins']);
					execOnMain('counterButtons', [random, 'M', coins, 'coins']);
					spaceEventState = ['lucky', 'done', 'coinsrival', coins, random];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got ' + coins + ' coins from ' + getCharName(random) + '.');
					break;
				case 'items':
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Lucky Event: ' + getCharName(orderCurPlayer) + ' got Items.');
					break;
			}
			editInner('spaceEventsSpan', '');
			break;

		case 'badluck':
			if (attr) {
				var switchVar = attr[0];
			} else {
				var switchVar = getValue('badluckEvent');
			}
			switch (switchVar) {
				case '5coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
						spaceEventState = ['badluck', 'done', 'coins', parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
					} else {
						spaceEventState = ['badluck', 'done', 'coins', 5];
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 5 coins from ' + getCharName(orderCurPlayer) + '.');
					break;
				case '10coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
						spaceEventState = ['badluck', 'done', 'coins', parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
					} else {
						spaceEventState = ['badluck', 'done', 'coins', 10];
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 10 coins from ' + getCharName(orderCurPlayer) + '.');
					break;
				case '20coins':
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
						spaceEventState = ['badluck', 'done', 'coins', parseInt(getInner('p' + orderCurPlayer + 'CoinsText'))];
					} else {
						spaceEventState = ['badluck', 'done', 'coins', 20];
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 20 coins from ' + getCharName(orderCurPlayer) + '.');
					break;
				case 'halfcoins':
					var coinNum = Math.floor(parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) / 2);
					execOnMain('counterButtons', [orderCurPlayer, 'M', coinNum, 'coins']);
					spaceEventState = ['badluck', 'done', 'coins', coinNum];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took half the coins (' + coinNum + ') from ' + getCharName(orderCurPlayer) + '.');
					break;
				case '3coinsothers':
				case '5coinsothers':
				case '10coinsothers':
					spaceEventState = ['bowser', 'done', 'coinsothers', getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];
					switch (getValue('badluckEvent')) {
						case '3coinsothers':
							var coinNum = 3;
							break;
						case '5coinsothers':
							var coinNum = 5;
							break;
						case '10coinsothers':
							var coinNum = 10;
							break;
					}

					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < (coinNum * 3)) {
						var num2 = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						for (var num = 0; num < 5; num++) {
							if (num2 % 3 == 0) {
								break;
							}
							num2--
						}
						var num3 = Math.floor(num2 / 3);
						execOnMain('counterButtons', [1, 'P', num3, 'coins']);
						execOnMain('counterButtons', [2, 'P', num3, 'coins']);
						execOnMain('counterButtons', [3, 'P', num3, 'coins']);
						execOnMain('counterButtons', [4, 'P', num3, 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'M', num2 + num3, 'coins']);
						shortcutNotif('Bad Luck Event: Took ' + num2 + ' coins from ' + getCharName(orderCurPlayer) + ' and gave ' + num3 + ' coins to everyone else.');
					} else {
						execOnMain('counterButtons', [1, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [2, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [3, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [4, 'P', coinNum, 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'M', (coinNum * 3) + coinNum, 'coins']);
						shortcutNotif('Bad Luck Event: Took ' + coinNum + ' coins from ' + getCharName(orderCurPlayer) + ' and gave ' + coinNum + ' coins to everyone else.');
					}
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					break;
				case '5coinslast':
					if (attr && isNaN(attr[1]) == false) {
						lastPlace = [attr[1]];
					} else {
						lastPlace = getLastPlace();
					}

					if (lastPlace.length > 1 || lastPlace == orderCurPlayer) {
						lastPlace[0] = 0;
						editInner('spaceEventsSpan', '<span class="settingsText"> Select the last player: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinslast\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					} else {
						var coins
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
							coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							coins = 5;
						}
						execOnMain('counterButtons', [orderCurPlayer, 'M', coins, 'coins']);
						execOnMain('counterButtons', [lastPlace[0], 'P', coins, 'coins']);
						spaceEventState = ['badluck', 'done', 'coinsrandom', coins, lastPlace[0]];
						if (getValue('shortcutAutoEnd') === true) {
							turnEnd();
						}
						shortcutNotif('Bad Luck Event: ' + getCharName(orderCurPlayer) + ' gave ' + coins + ' coins to ' + getCharName(lastPlace[0]) + '.');
					}
					break;
				case '10coinslast':
					if (attr && isNaN(attr[1]) == false) {
						lastPlace = [attr[1]];
					} else {
						lastPlace = getLastPlace();
					}

					if (lastPlace.length > 1 || lastPlace == orderCurPlayer) {
						lastPlace[0] = 0;
						editInner('spaceEventsSpan', '<span class="settingsText"> Select the last player: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'10coinslast\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					} else {
						var coins
						if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
							coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
						} else {
							coins = 10;
						}
						execOnMain('counterButtons', [orderCurPlayer, 'M', coins, 'coins']);
						execOnMain('counterButtons', [lastPlace[0], 'P', coins, 'coins']);
						spaceEventState = ['badluck', 'done', 'coinsrandom', coins, lastPlace[0]];
						if (getValue('shortcutAutoEnd') === true) {
							turnEnd();
						}
						shortcutNotif('Bad Luck Event: ' + getCharName(orderCurPlayer) + ' gave ' + coins + ' coins to ' + getCharName(lastPlace[0]) + '.');
					}
					break;
				case '5coinsrandom':
					if (attr && isNaN(attr[1]) == false) {
						var random = attr[1];
					} else {
						editInner('spaceEventsSpan', '<span class="settingsText"> Select the player: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 1])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 2])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 3])"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="spaceEvent(\'badluck\', [\'5coinsrandom\', 4])"> <br> <br>');
						document.getElementById('spaceEventsSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
						return;
					}

					var coins
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 5) {
						coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
					} else {
						coins = 5;
					}
					execOnMain('counterButtons', [orderCurPlayer, 'M', coins, 'coins']);
					execOnMain('counterButtons', [random, 'P', coins, 'coins']);
					spaceEventState = ['badluck', 'done', 'coinsrandom', coins, random];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: ' + getCharName(orderCurPlayer) + ' gave ' + coins + ' coins to ' + getCharName(random) + '.');
					break;
				case '1star':
					execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
					spaceEventState = ['badluck', 'done', 'coinsrandom', 'stars', 1];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Took 1 star from ' + getCharName(orderCurPlayer) + '.');
					break;
				case 'movestar':
					spaceEventState = ['badluck', 'done', 'movestar'];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Moved the star.');
					break;
				case 'raisestarcost':
					var starCost = 'double';
					spaceEventState = ['badluck', 'done', 'raisestarcost'];
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}
					shortcutNotif('Bad Luck Event: Raised the star cost to 20 coins.');
					break;
			}
			editInner('spaceEventsSpan', '');
			break;

		case 'vsspace':
			if (attr) {
				battleRanks[attr[0]].push(battleCurPlayer);
				battleCurPlayer++;

				if (battleCurPlayer > 4) {
					var coinNum = spaceEventState[2];

					if (battleRanks.third.length > 0) {
						for (var num = 0; num < battleRanks.third.length; num++) {
							execOnMain('counterButtons', [battleRanks.third[num], 'P', ((10 / battleRanks.third.length) / 100) * coinNum, 'coins']);
						}
						if (battleRanks.second.length > 0) {
							for (var num = 0; num < battleRanks.second.length; num++) {
								execOnMain('counterButtons', [battleRanks.second[num], 'P', ((30 / battleRanks.second.length) / 100) * coinNum, 'coins']);
							}
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((60 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}
						} else {
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((90 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}
						}
					} else {
						if (battleRanks.second.length > 0) {
							for (var num = 0; num < battleRanks.second.length; num++) {
								execOnMain('counterButtons', [battleRanks.second[num], 'P', ((40 / battleRanks.second.length) / 100) * coinNum, 'coins']);
							}
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((60 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}
						} else {
							if (battleRanks.first.length > 0) {
								for (var num = 0; num < battleRanks.first.length; num++) {
									execOnMain('counterButtons', [battleRanks.first[num], 'P', ((100 / battleRanks.first.length) / 100) * coinNum, 'coins']);
								}
							}

						}
					}
					if (getValue('shortcutAutoEnd') === true) {
						turnEnd();
					}

					shortcutNotif('VS Space finished, leftover coins need to be added manually.');
					editInner('spaceEventsSpan', '');
					return;
				} else {
					editInner('vsspaceText', 'Select place for Player ' + battleCurPlayer + ' "' + getCharName(battleCurPlayer) + '":');
				}
			} else {
				var coinNum = parseInt(getValue('vsspaceSelect'));

				spaceEventState = ['vsspace', 'done', 0, getInner('p1CoinsText'), getInner('p2CoinsText'), getInner('p3CoinsText'), getInner('p4CoinsText')];

				for (var num = 1; num < 5; num++) {
					if (parseInt(getInner('p' + num + 'CoinsText')) < coinNum) {
						spaceEventState[2] = spaceEventState[2] + parseInt(getInner('p' + num + 'CoinsText'));
						execOnMain('counterButtons', [num, 'M', coinNum, 'coins']);
					} else {
						spaceEventState[2] = spaceEventState[2] + coinNum;
						execOnMain('counterButtons', [num, 'M', coinNum, 'coins']);
					}
				}
				editInner('spaceEventsSpan', '<span class="settingsNote"> Reminder: If there are two 1st-places, the next player is 3rd, not 2nd; same applies to all ties. </span> <br> <span class="settingsText"> Fighting for ' + spaceEventState[2] + ' coins. - </span> <span id="vsspaceText" class="settingsText"> Select place for Player 1 "' + getCharName(1) + '": </span> <br> <span> <img src="img/1st.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'first\'])"> <img src="img/2nd.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'second\'])"> <img src="img/3rd.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'third\'])"> <img src="img/4th.png" class="battleImg" onclick="spaceEvent(\'vsspace\', [\'fourth\'])"> </span>');

				battleCurPlayer = 1;
				battleRanks.first = [];
				battleRanks.second = [];
				battleRanks.third = [];
				battleRanks.fourth = [];
			}
			break;
	}
}

var activeHex;
var activeHexChar;
var hexCoins;
/*
* Activate hex.
* 
* @param {string/number} hex Number if player should be changed - string if hex should be executed.
*/
function turnHex (hex) {
	var coins;
	if (activeHex != '' && activeHex != undefined && activeHexChar != undefined) { //undo hex if a different or the same one is selected
		if (activeHexChar == orderCurPlayer) { //if player landed on own hex
			switch (hex) {
				case 'coinblock':
				case 'starblock':
					shortcutNotif('Undid own Hex.');
					break;
				default:
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					shortcutNotif('Undid own Hex.');
			}
		} else {
			switch (activeHex) {
				case 'coinsm10':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'coins']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'coins']);
					shortcutNotif('Undid the -10 Coin Hex.');
					break;
				case 'coinsm20':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'coins']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'coins']);
					shortcutNotif('Undid the -20 Coin Hex.');
					break;
				case 'coinswap':
					coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
					var coinSwap = parseInt(getInner('p' + activeHexChar + 'CoinsText'));
					execOnMain('counterButtons', [orderCurPlayer, 'S', coinSwap, 'coins']);
					execOnMain('counterButtons', [activeHexChar, 'S', coins, 'coins']);
					shortcutNotif('Undid the Coin Swap Hex.');
					break;
				case 'starm1':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'stars']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'stars']);
					shortcutNotif('Undid the -1 Star Hex.');
					break;
				case 'starm2':
					execOnMain('counterButtons', [orderCurPlayer, 'P', hexCoins, 'stars']);
					execOnMain('counterButtons', [activeHexChar, 'M', hexCoins, 'stars']);
					shortcutNotif('Undid the -2 Star Hex.');
					break;
				case 'spaceswap':
					shortcutNotif('Undid the Space Swap Hex.');
					break;
				case 'coinblock':
					shortcutNotif('Undid the Coin Block Hex.');
					break;
				case 'starblock':
					shortcutNotif('Undid the Star Block Hex.');
					break;
			}
		}
	}

	if (activeHex == hex) { //stop function if the same hex is selected
		document.getElementById(hex).classList.remove('selected');
		activeHex = undefined;
		return;
	}

	if (isNaN(hex) == false) {
		var elems = document.getElementById('turnHexCharSelection').children;
		for (var num = 2; num < elems.length; num++) {
			elems[num].setAttribute('onclick', 'turnHex(' + (num - 1) + ')');
			elems[num].classList.remove('selected');
		}
		elems[hex + 1].onclick = '';
		elems[hex + 1].classList.add('selected');
		activeHexChar = hex;
	} else {
		elems = document.getElementById('turnHexSelection').children;
		for (var num = 0; num < elems.length; num++) {
			elems[num].classList.remove('selected');
		}
		document.getElementById(hex).classList.add('selected');
		activeHex = hex;
	}

	if (activeHexChar == undefined || activeHex == undefined) { //end function if either player or hex is not specified
		return;
	} else if (isNaN(hex) == false) {
		hex = activeHex;
	}

	if (activeHexChar == orderCurPlayer) {
		switch (hex) { //if landed on own hex
			case 'coinblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on own Coin Block Hex (coins need to be added manually).');
				break;
			case 'starblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on own Star Block Hex (stars need to be added manually).');
				break;
			default:
				execOnMain('counterButtons', [orderCurPlayer, 'P', 5, 'coins']);
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on own hex and gained 5 coins.');
		}
	} else {
		switch (hex) {
			case 'coinsm10':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 10) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
				} else {
					coins = 10;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'coins']);
				shortcutNotif('Moved ' + coins + ' Coins from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -10 Coin Hex.');
				break;
			case 'coinsm20':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) < 20) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
				} else {
					coins = 20;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'coins']);
				shortcutNotif('Moved ' + coins + ' Coins from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -20 Coin Hex.');
				break;
			case 'coinswap':
				coins = parseInt(getInner('p' + orderCurPlayer + 'CoinsText'));
				var coinSwap = parseInt(getInner('p' + activeHexChar + 'CoinsText'));
				execOnMain('counterButtons', [orderCurPlayer, 'S', coinSwap, 'coins']);
				execOnMain('counterButtons', [activeHexChar, 'S', coins, 'coins']);
				shortcutNotif('Swapped coins from ' + getCharName(orderCurPlayer) + ' and ' + getCharName(activeHexChar) + ' due to a Coin Swap Hex.');
				break;
			case 'starm1':
				if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 1) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
				} else {
					coins = 1;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 1, 'stars']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'stars']);
				shortcutNotif('Moved ' + coins + ' Stars from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -1 Star Hex.');
				break;
			case 'starm2':
				if (parseInt(getInner('p' + orderCurPlayer + 'StarsText')) < 2) {
					coins = parseInt(getInner('p' + orderCurPlayer + 'StarsText'));
				} else {
					coins = 2;
				}
				hexCoins = coins;
				execOnMain('counterButtons', [orderCurPlayer, 'M', 2, 'stars']);
				execOnMain('counterButtons', [activeHexChar, 'P', coins, 'stars']);
				shortcutNotif('Moved ' + coins + ' Stars from ' + getCharName(orderCurPlayer) + ' to ' + getCharName(activeHexChar) + ' due to a -2 Star Hex.');
				break;
			case 'spaceswap':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on a Space Swap Hex from ' + getCharName(activeHexChar) + '.');
				break;
			case 'coinblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on a Coin Block Hex (coins need to be added manually).');
				break;
			case 'starblock':
				shortcutNotif(getCharName(orderCurPlayer) + ' landed on a Star Block Hex (stars need to be added manually).');
				break;
		}
	}
}

/*
* Buys items.
* 
* @param {number} amount Amount of coins spent.
*/
function shopping (amount) {
	if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= amount) {
		execOnMain('counterButtons', [orderCurPlayer, 'M', amount, 'coins']);
		execOnMain('counterButtons', [orderCurPlayer, 'P', amount, 'shopping']);
		shortcutNotif(getCharName(orderCurPlayer) + ' bought an item for ' + amount + ' coins.');
	} else {
		shortcutNotif('Not enough coins!', true);
	}
}

var starPrice = 0;
/*
* Changes the star price for Kameks board in SMP.
* 
* @param {number} amount What the price should be changed to.
*/
function starPrices (amount) {
	removeSelected(document.getElementById('starPricesSpan').children);
	if (starPrice === amount) {
		starPrice = 0;
	} else {
		document.getElementById('kamek' + amount).classList.add('selected');
		starPrice = amount;
	}
}

/*
* Buys a star.
* 
* @param {string} star What kind of star, empty if normal one.
*/
function buyStar (star) {
	if (star) {
		switch (star) {
			case 'jarstar':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 10 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;

			case 'jarcoins':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' lost 5 coins thanks to a magic jar.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;

			case 'jarfail':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' lost 10 coins thanks to a magic jar.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;

			case 'bluenote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 5) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 5 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;

			case 'greennote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 10 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;

			case 'yellownote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 15) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 15, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 15 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;

			case 'orangenote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 20) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 20 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;

			case 'rednote':
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 30) {
					execOnMain('counterButtons', [orderCurPlayer, 'M', 30, 'coins']);
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 30 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
				break;
		}
	} else {
		if (shortcutGame == 'smp') {
			if (starCost == 'double') {
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 20) {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					if (starPrice != 0) {
						execOnMain('counterButtons', [orderCurPlayer, 'M', (starPrice * 2), 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
					}
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 20 coins.');
					starCost = '';
				} else {
					shortcutNotif('Not enough coins!', true);
				}
			} else {
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 10) {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					if (starPrice != 0) {
						execOnMain('counterButtons', [orderCurPlayer, 'M', starPrice, 'coins']);
					} else {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 10, 'coins']);
					}
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 10 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
			}
		} else {
			if (finalFiveEvent == 'cheapStars') {
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 5) {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					execOnMain('counterButtons', [orderCurPlayer, 'M', 5, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 5 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
			} else {
				if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) >= 20) {
					execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
					execOnMain('counterButtons', [orderCurPlayer, 'M', 20, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' got a star for 20 coins.');
				} else {
					shortcutNotif('Not enough coins!', true);
				}
			}
		}
	}
}

var stealOpen = false;
var stealFrom;
/*
* 
*/
function steal (attr) {
	if (attr) {
		if (isNaN(attr) === false) {
			var elems = document.getElementById('stealSpan').children;
			removeSelected(elems);
			elems[attr + 1].classList.add('selected');
			stealFrom = attr;
		} else {
			if (stealFrom) {
				if (getValue('stealStars') === true) {
					if (parseInt(getInner('p' + orderCurPlayer + 'CoinsText')) > 29 && parseInt(getInner('p' + stealFrom + 'StarsText')) > 0) {
						execOnMain('counterButtons', [orderCurPlayer, 'M', 30, 'coins']);
						execOnMain('counterButtons', [orderCurPlayer, 'P', 1, 'stars']);
						execOnMain('counterButtons', [stealFrom, 'M', 1, 'stars']);
					} else {
						shortcutNotif('Either not enough coins or no stars to steal.', true);
						return;
					}
				} else {
					var coinNum = getValue('stealCoinsInput');
					if (parseInt(getInner('p' + stealFrom + 'CoinsText')) < coinNum) {
						coinNum = parseInt(getInner('p' + stealFrom + 'CoinsText'));
					}
					execOnMain('counterButtons', [orderCurPlayer, 'P', coinNum, 'coins']);
					execOnMain('counterButtons', [stealFrom, 'M', coinNum, 'coins']);
					shortcutNotif(getCharName(orderCurPlayer) + ' stole ' + coinNum + ' coins from ' + getCharName(stealFrom) + '.');
				}
				editInner('stealSpan', '');
				document.getElementById('starPricesContainer').style.display = 'unset';
				stealOpen = false;
			} else {
				shortcutNotif('Select a character to steal from.', true);
			}
		}
	} else {
		if (stealOpen === true) {
			editInner('stealSpan', '');
			document.getElementById('starPricesContainer').style.display = 'unset';
			stealOpen = false;
		} else {
			editInner('stealSpan', '<span class="settingsText"> <input type="radio" name="stealInput" id="stealStars"> <label for="stealStars"> Stars </label> - <input type="radio" name="stealInput" id="stealCoins" checked> <label for="stealCoins"> <input type="number" onclick="editValue(\'stealCoins\', true)" style="width: 33px;" id="stealCoinsInput" min="1" max="99" value="7"> Coins </label> from: </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" onclick="steal(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" onclick="steal(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" onclick="steal(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" onclick="steal(4)"> <button onclick="steal(\'done\')"> Steal! </button>');
			document.getElementById('starPricesContainer').style.display = 'none';
			stealFrom = 0;
			document.getElementById('stealSpan').children[orderCurPlayer + 1].style.visibility = 'hidden';
			stealOpen = true;
		}
	}
}

/*
* Ends the turn, empties all variables used in a turn.img/shortcut/smp/poisonmushroom.png"
*/
function turnEnd () {
	statusEffects['p' + orderCurPlayer] = [];
	turnCurPlayer++;
	if (turnCurPlayer == 5) {
		turnCurPlayer = 1;
		var done = true;
	}
	orderCurPlayer = playerOrder[turnCurPlayer];

	editInner('turnPlayerName', getCharName(orderCurPlayer));
	document.getElementById('turnPlayerIcon').src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[orderCurPlayer] + '.png';
	switch (orderCurPlayer) {
		case 1:
			document.getElementById('turnPlayerName').style.color = '#0000EB';
			break;
		case 2:
			document.getElementById('turnPlayerName').style.color = '#E60000';
			break;
		case 3:
			document.getElementById('turnPlayerName').style.color = '#00A705';
			break;
		case 4:
			document.getElementById('turnPlayerName').style.color = '#e0dc00';
			break;
	}
	spaceEventState = [];
	activeSpace = undefined;
	document.getElementById('turnCurDice').src = 'img/shortcut/mpds/diceblock.png';
	document.getElementById('spaceEventImg').src = '';
	editInner('spaceEventsSpan', '');
	battleResult = [];
	editInner('battleResult', '');
	document.getElementById('battleReset').style.display = 'none';
	activeHex = undefined;
	activeHexChar = undefined;
	hexCoins = undefined;
	var elems = document.getElementById('turnHexCharSelection').children;
	for (var num = 1; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	elems = document.getElementById('turnHexSelection').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	allyDiceRolls = ['', 0, 0, 0];
	diceCursor = undefined;
	diceRolls = [];
	elems = document.getElementById('turnSpaces').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	editInner('turnCurDiceText', '??');
	activeItem = undefined;
	poisonSub = 0;
	itemEventState = [];
	document.getElementById('itemImg').src = 'img/tie.png';
	elems = document.getElementById('turnItems').children;
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
	switch (shortcutGame) {
		case 'mpds':
			for (var num = 6; num < 11; num++) {
				document.getElementById('dice' + num).style.display = '';
			}
			break;
		case 'smp':
			elems = document.getElementById('allyDiceSelection').children;
			for (var num = 0; num < elems.length; num++) {
				elems[num].classList.remove('selected');
			}
			changeAllyDice(0);
			elems = document.getElementById('allyDiceSelection').children;
			var elems2 = document.getElementById('removeAllySelection').children;
			elems[1].src = 'img/smp/' + characters[orderCurPlayer] + '.png';

			for (var num = 2; num < 6; num++) {
				if (allies['p' + orderCurPlayer][num - 2]) {
					elems[num].src = 'img/smp/' + allies['p' + orderCurPlayer][num - 2] + '.png';
					elems[num].style.display = 'initial';
					if ((num - 1) === 4) {
						if (bobombAlly[orderCurPlayer] != 0) {
							editInner('allyDice4', '<img src="img/smp/bobomb.png" style="width: 30px;"> <span onclick="allyDice(4, 1)"> 0 </span> <span onclick="allyDice(4, 2)"> -1 </span>');
						} else {
							editInner('allyDice4', '<img src="img/smp/' + allies['p' + orderCurPlayer][3] + '.png" style="width: 30px;"> <span onclick="allyDice(4, 1)"> 1 </span> <span onclick="allyDice(4, 2)"> 2 </span>');
						}
					} else {
						document.getElementById('allyDice' + (num - 1)).children[0].src = 'img/smp/' + allies['p' + orderCurPlayer][num - 2] + '.png';
					}
					document.getElementById('allyDice' + (num - 1)).style.visibility = 'visible';
				} else {
					elems[num].style.display = 'none';
					document.getElementById('allyDice' + (num - 1)).style.visibility = 'hidden';
				}
				document.getElementById('allyDice' + (num - 1)).children[1].classList.remove('selected');
				document.getElementById('allyDice' + (num - 1)).children[2].classList.remove('selected');
			}
			var num3 = 1;
			for (var num = 1; num < 5; num++) {
				if (num === orderCurPlayer) {
					for (var num2 = 0; num2 < 4; num2++) {
						if (allies['p' + num][num2]) {
							document.getElementById('removeAllySelection').children[num2].src = 'img/smp/' + allies['p' + num][num2] + '.png';
							document.getElementById('removeAllySelection').children[num2].style.visibility = 'visible';
						} else {
							document.getElementById('removeAllySelection').children[num2].style.visibility = 'hidden';
						}
					}
				} else {
					for (var num2 = 0; num2 < 4; num2++) {
						if (allies['p' + num][num2]) {
							document.getElementById('removeAllyChar' + num3).children[num2 + 1].src = 'img/smp/' + allies['p' + num][num2] + '.png';
							document.getElementById('removeAllyChar' + num3).children[num2 + 1].style.visibility = 'visible';
						} else {
							document.getElementById('removeAllyChar' + num3).children[num2 + 1].style.visibility = 'hidden';
						}
					}
					document.getElementById('removeAllyChar' + num3).children[0].src = 'img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[num] + '.png';
					document.getElementById('removeAllyChar' + num3).setAttribute('player', num);
					num3++;
				}
			}
			if (bobombAlly[orderCurPlayer] != 0 && parseInt(getInner('curTurnText')) < (bobombAlly[orderCurPlayer] + 3)) {
				getAlly('bobomb', true);
			} else if (bobombAlly[orderCurPlayer] != 0) {
				removeAlly(orderCurPlayer, 4);
				bobombAlly[orderCurPlayer] = 0;
				shortcutNotif(getCharName(orderCurPlayer) + '\'s Bob-Omb exploded.');
			}
			break;
	}
	editInner('statusEffects', '');
	for (var num2 = 0; num2 < statusEffects['p' + orderCurPlayer].length; num2++) {
		switch (statusEffects['p' + orderCurPlayer][num2]) {
			case 'poison':
				editInner('statusEffects', getInner('statusEffects') + '<img src="img/shortcut/smp/poisonmushroom.png">');
				break;
		}
	}
	getAlly('close');
	shortcutSettings(true);

	if (done && done == true) {
		startShortcut();
		return;
	}
}
var allies = {
	p1: [],
	p2: [],
	p3: [],
	p4: []
};

/*
* Edits the "notification" bar at the top.
* 
* @param {string} text Text it should be changed to.
* @param {boolean} error If true it prints it as a error.
*/
function shortcutNotif (text, error) {
	console.log('[MPO Shortcut] ' + text);
	editInner('shortcutNotif', text);
	if (error) {
		document.getElementById('shortcutNotif').classList.add('errorAni');
		setTimeout(removeError, 500);
	} else {
		document.getElementById('shortcutNotif').style.color = '';
	}
}

/*
* Removes the notification error class so it can be repeated.
*/
function removeError () {
	document.getElementById('shortcutNotif').classList.remove('errorAni');
}

/*
* Choose a minigame type.
* 
* @param {string} minigame The minigame type that should be used
*/
function chooseMinigame (minigame) {
	switch (minigame) {
		case 'normal':
			break;
		case 'coin':
			break;
		case 'battle':
			editInner('shortcutSpan', '');
			document.getElementById('shortcutBattle').style.display = '';
			break;
	}
}

var minigameMode;
var minigameRanks = {
	first: [],
	second: [],
	third: [],
	fourth: [],
	num: 1
};
var minigamePlayers = [];
/*
* Starts a normal minigame.
* 
* @param {number} player Which player should win.
*/
function startMinigame (player) {
	var high5 = false;
	if (player === '4p') {
		minigameMode = '4p';
		editInner('normalMinigame', '<span class="settingsNote"> Reminder: If there are two 1st-places, the next player is 3rd, not 2nd; same applies to all ties. </span> <br> <span id="4pMinigame" class="settingsText"> Select place for Player 1 "' + getCharName(1) + '": </span> <br> <span> <img src="img/1st.png" class="battleImg" onclick="startMinigame(\'first\')"> <img src="img/2nd.png" class="battleImg" onclick="startMinigame(\'second\')"> <img src="img/3rd.png" class="battleImg" onclick="startMinigame(\'third\')"> <img src="img/4th.png" class="battleImg" onclick="startMinigame(\'fourth\')"> </span>');
		minigameRanks = {
			first: [],
			second: [],
			third: [],
			fourth: [],
			num: 1
		};
		return;
	} else if (player === '2v2') {
		minigameMode = '2v2';
		editInner('normalMinigame', '<span class="settingsText"> Who won? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="p1Minigame" onclick="startMinigame(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="p2Minigame" onclick="startMinigame(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="p3Minigame" onclick="startMinigame(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="p4Minigame" onclick="startMinigame(4)"> <br> <button onClick="startMinigame()">Done</button> <button onClick="startMinigame(\'high5\')">High five</button> <span class="settingsNote"> High five gives the 1st-place team 2 additional coins. </span> <br> <button onclick="startMinigame(\'tie\')" style="margin-top: 5px;">Tie</button>');
		return;
	} else if (player === '1v3') {
		minigameMode = '1v3';
		editInner('normalMinigame', '<span class="settingsText"> Who won? </span> <br> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[1] + '.png" class="chooseImg" id="p1Minigame" onclick="startMinigame(1)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[2] + '.png" class="chooseImg" id="p2Minigame" onclick="startMinigame(2)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[3] + '.png" class="chooseImg" id="p3Minigame" onclick="startMinigame(3)"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[4] + '.png" class="chooseImg" id="p4Minigame" onclick="startMinigame(4)"> <br> <button onClick="startMinigame()">Done</button> <button onClick="startMinigame(\'high5\')">High five</button> <span class="settingsNote"> High five gives the 1st-place team 2 additional coins. </span> <br> <button onclick="startMinigame(\'tie\')" style="margin-top: 5px;">Tie</button>');
		return;
	} else if (player === 'high5') {
		high5 = true;
	}
	if (player && high5 != true) {
		if (minigameMode === '4p') {
			minigameRanks[player].push(minigameRanks.num);
			if (minigameRanks.num != 4) {
				minigameRanks.num++;
				editInner('4pMinigame', 'Select place for Player ' + minigameRanks.num + ' "' + getCharName(minigameRanks.num) + '":');
				return;
			}
		} else if (isNaN(player) === false) {
			for (var num = 0; num < minigamePlayers.length; num++) {
				if (minigamePlayers[num] == player) {
					document.getElementById('p' + minigamePlayers[num] + 'Minigame').classList.remove('selected');
					minigamePlayers.splice(num, 1);
					return;
				}
			}
			document.getElementById('p' + player + 'Minigame').classList.add('selected');
			minigamePlayers.push(player);
			return;
		}
	}

	switch (shortcutGame) {
		case 'mp1':
		case 'mp2':
		case 'mp3':
		case 'mp4':
		case 'mp5':
		case 'mp6':
		case 'mp7':
		case 'mp8':
			for (var num = 0; num < minigamePlayers.length; num++) {
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 10, 'coins']);
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 10, 'minigame']);
				minigamePlayers[num] = getCharName(minigamePlayers[num]);
			}
			shortcutNotif(minigamePlayers.join(' & ') + ' won a minigame.');
			break;
		case 'mp9':
		case 'mp10':
			break;
		case 'mpds':
			for (var num = 0; num < minigamePlayers.length; num++) {
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 10, 'coins']);
				execOnMain('counterButtons', [minigamePlayers[num], 'P', 1, 'minigame']);
				minigamePlayers[num] = getCharName(minigamePlayers[num]);
			}
			shortcutNotif(minigamePlayers.join(' & ') + ' won a minigame.');
		case 'smp':
			if (player === 'tie') {
				for (var num = 1; num < 5; num++) {
					execOnMain('counterButtons', [num, 'P', 5, 'coins']);
				}
				shortcutNotif('Tie, everyone got 5 coins.');
				break;
			}
			var minigamePlayersResult = [];
			switch (minigameMode) {
				case '4p':
					for (var num = 0; num < minigameRanks.first.length; num++) {
						execOnMain('counterButtons', [minigameRanks.first[num], 'P', 8, 'coins']);
						execOnMain('counterButtons', [minigameRanks.first[num], 'P', 1, 'minigame']);
						minigamePlayersResult.push(getCharName(minigameRanks.first[num]));
					}
					for (var num = 0; num < minigameRanks.second.length; num++) {
						execOnMain('counterButtons', [minigameRanks.second[num], 'P', 4, 'coins']);
					}
					for (var num = 0; num < minigameRanks.third.length; num++) {
						execOnMain('counterButtons', [minigameRanks.third[num], 'P', 2, 'coins']);
					}
					break;
				case '2v2':
				case '1v3':
					var inArr = false;
					for (var num = 1; num < 5; num++) {
						for (var num2 = 0; num2 < minigamePlayers.length; num2++) {
							if (minigamePlayers[num2] == num) {
								inArr = true;
								break;
							}
						}
						if (inArr === true) {
							execOnMain('counterButtons', [num, 'P', 8, 'coins']);
							execOnMain('counterButtons', [num, 'P', 1, 'minigame']);
							console.log(num2)
							minigamePlayersResult.push(getCharName(minigamePlayers[num2]));
						} else {
							execOnMain('counterButtons', [num, 'P', 2, 'coins']);
						}
						inArr = false;
					}
					if (high5 === true) {
						for (var num2 = 0; num2 < minigamePlayers.length; num2++) {
							execOnMain('counterButtons', [minigamePlayers[num2], 'P', 2, 'coins']);
						}
					}
					break;
			}
			shortcutNotif(minigamePlayersResult.join(' & ') + ' won a minigame.');
			break;
		case 'mpa':
		case 'mpit':
		case 'mpsr':
		case 'mptt100':
			break;
	}
	minigamePlayers = [];
	startShortcut();
}

/*
* Starts a coin minigame. -WIP-
*/
function coinMinigame () {
	for (var num = 1; num < 5; num++) {
		execOnMain('counterButtons', [num, 'P', 1, 'minigame']);
	}
	startShortcut();
}

var battleCurPlayer;
var battleRanks = {};
var battleCoins;
/*
* Starts a battle minigame.
*/
function startBattle () {
	var coinReq = parseInt(getValue('battleCoins'));
	battleCoins = 0;
	for (var num = 1; num < 5; num++) {
		if (parseInt(getInner('p' + num + 'CoinsText')) < coinReq) {
			battleCoins = battleCoins + parseInt(getInner('p' + num + 'CoinsText'));
			execOnMain('counterButtons', [num, 'M', coinReq, 'coins']);
		} else {
			battleCoins = battleCoins + coinReq;
			execOnMain('counterButtons', [num, 'M', coinReq, 'coins']);
		}
	}
	battleCurPlayer = 1;
	battleRanks.first = [];
	battleRanks.second = [];
	battleRanks.third = [];
	battleRanks.fourth = [];
	editInner('battleTextCoins', 'Fighting for ' + battleCoins + ' coins.');
	editInner('battleText', 'Select place for Player 1 "' + getCharName(characters[1]) + '".');
	document.getElementById('battleStart').style.display = 'none';
	document.getElementById('battlePlayers').style.display = 'block';
	document.getElementById('battleReset').style.display = '';
	shortcutNotif('Started a Battle Minigame for ' + coinReq + ' coins.');
}

var battleResult = [];
/*
* Calculates the battle result.
* 
* @param {number} What place the said character is.
*/
function calcBattle (place) {
	if (place == 'undo') {
		battleResult = [];
		editInner('battleResult', '');
		battleCurPlayer = 1;
		editInner('battleText', 'Select place for Player 1 "' + getCharName(characters[1]) + '".');
		return;
	}

	switch (battleCurPlayer) {
		case 1:
			battleCurPlayer = 2;
			editInner('battleText', 'Select place for Player 2 "' + getCharName(characters[2]) + '".');
			break;
		case 2:
			battleCurPlayer = 3;
			editInner('battleText', 'Select place for Player 3 "' + getCharName(characters[3]) + '".');
			break;
		case 3:
			battleCurPlayer = 4;
			editInner('battleText', 'Select place for Player 4 "' + getCharName(characters[4]) + '".');
			break;
		case 4:
			battleCurPlayer = 5;
			startShortcut();
			break;
	}

	switch (place) {
		case 1:
			battleRanks.first.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/1st.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
		case 2:
			battleRanks.second.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/2nd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
		case 3:
			battleRanks.third.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/3rd.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
		case 4:
			battleRanks.fourth.push(battleCurPlayer - 1);
			battleResult.push('<img src="img/4th.png"> <img src="img/' + document.querySelector('input[name="icons"]:checked').id + '/' + characters[battleCurPlayer - 1] + '.png">');
			break;
	}

	editInner('battleResult', battleResult.join(' <br> '));

	if (battleCurPlayer == 5) {
		var counter;
		switch (shortcutGame) {
			case 'mp1':
			case 'mp2':
			case 'mp3':
			case 'mp4':
			case 'mp5':
				if (battleRanks.first.length == 1) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((70 / 100) * battleCoins), 'coins']);
					if (battleRanks.second.length == 1) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((30 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.second.length == 2) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.second.length == 3) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[2], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
					}
				} else if (battleRanks.first.length == 2) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((50 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((50 / 100) * battleCoins), 'coins']);
				} else if (battleRanks.first.length == 3) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
				} else if (battleRanks.first.length == 4) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[3], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
				}
				if (battleCoins % 10 != 0) {
					shortcutNotif('One coin was left and was given to a random player, needs to be added manually.');
				} else {
					shortcutNotif('Coins from battle minigame succesfully given to the players.');
				}
				editInner('battleText', '');
				editInner('battleTextCoins', '');
				document.getElementById('battleStart').style.display = 'block';
				document.getElementById('battlePlayers').style.display = 'none';
				break;
			case 'mp6':
			case 'mp7':
			case 'mp8':
				for (var num = 0; num < 2; num++) {
						counter = 'minigame';
					if (num == 1) {
						counter = 'coins';
					}

					if (battleRanks.first.length == 1) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((70 / 100) * battleCoins), 'coins']);

						if (battleRanks.second.length == 1) {
							execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);

							if (battleRanks.third.length == 1) {
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
							} else if (battleRanks.third.length == 2) {
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
							} else if (battleRanks.third.length == 3) {
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
								execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
							}

						} else if (battleRanks.second.length == 2) {
							execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((15 / 100) * battleCoins), 'coins']);
						} else if (battleRanks.second.length == 3) {
							execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.second[2], 'P', Math.floor((10 / 100) * battleCoins), 'coins']);
						}
					} else if (battleRanks.first.length == 2) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);
						if (battleRanks.third.length == 1) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
						}
					} else if (battleRanks.first.length == 3) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.first.length == 4) {
						execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.first[3], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					}
					if (battleCoins % 10 != 0) {
						shortcutNotif('One coin was left and was given to a random player, needs to be added manually.');
					} else {
						shortcutNotif('Coins from battle minigame succesfully given to the players.');
					}
					editInner('battleText', '');
					editInner('battleTextCoins', '');
					document.getElementById('battleStart').style.display = 'block';
					document.getElementById('battlePlayers').style.display = 'none';
				}
				break;
			case 'mp9':
				break;
			case 'mp10': //doesn't have battles
			case 'mpa':
				break;
			case 'mpds':
				if (battleRanks.first.length == 1) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((65 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					if (battleRanks.second.length == 1) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((30 / 100) * battleCoins), 'coins']);

						if (battleRanks.third.length == 1) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
						} else if (battleRanks.third.length == 2) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((2.5 / 100) * battleCoins), 'coins']);
						} else if (battleRanks.third.length == 3) {
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
							execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor(((5 / 3) / 100) * battleCoins), 'coins']);
						}

					} else if (battleRanks.second.length == 2) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor((17.5 / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor((17.5 / 100) * battleCoins), 'coins']);
					} else if (battleRanks.second.length == 3) {
						execOnMain('counterButtons', [battleRanks.second[0], 'P', Math.floor(((35 / 3) / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[1], 'P', Math.floor(((35 / 3) / 100) * battleCoins), 'coins']);
						execOnMain('counterButtons', [battleRanks.second[2], 'P', Math.floor(((35 / 3) / 100) * battleCoins), 'coins']);
					}
				} else if (battleRanks.first.length == 2) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((47.5 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', 1, 'minigame']);

					if (battleRanks.third.length == 1) {
						execOnMain('counterButtons', [battleRanks.third[0], 'P', Math.floor((5 / 100) * battleCoins), 'coins']);
					}
				} else if (battleRanks.first.length == 3) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((33 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', 1, 'minigame']);
				} else if (battleRanks.first.length == 4) {
					execOnMain('counterButtons', [battleRanks.first[0], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);
					execOnMain('counterButtons', [battleRanks.first[3], 'P', Math.floor((25 / 100) * battleCoins), 'coins']);

					execOnMain('counterButtons', [battleRanks.first[0], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[1], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[2], 'P', 1, 'minigame']);
					execOnMain('counterButtons', [battleRanks.first[3], 'P', 1, 'minigame']);
				}
				if (battleCoins % 10 != 0) {
					shortcutNotif('One coin was left and was given to a random player, needs to be added manually.');
				} else {
					shortcutNotif('Coins from battle minigame succesfully given to the players.');
				}
				editInner('battleText', '');
				editInner('battleTextCoins', '');
				document.getElementById('battleStart').style.display = 'block';
				document.getElementById('battlePlayers').style.display = 'none';
				break;
			case 'mpit':
			case 'mpsr':
			case 'mptt100':
			case 'smp':
			default:
		}
	}
}

/*
* Removes the selected class from elements.
* 
* @param {array} elems Elements that shouldn't have a selected class.
*/
function removeSelected (elems) {
	for (var num = 0; num < elems.length; num++) {
		elems[num].classList.remove('selected');
	}
}

console.log('[MPO] settings.js is loaded.');
startShortcut();