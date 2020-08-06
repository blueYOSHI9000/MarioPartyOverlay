/*
* Calls counterButtons().
* Should be used for anything assist related so some counters can be blocked off for potential future options.
*
* @param {string} counter Which counter should be updated.
* @param {number} player Which player should be updated.
* @param {string} amount The amount that should be changed.
* @param {string} action What should be done - can be 'P' for addition, 'M' for subtraction or 'S' to replace the existing count.
*/
function assist_updateCounter (counter, player, amount, action) {
	if (counter === 'coins' && assistInfo.noCoins === true) {
		return false;
	}

	counterButtons(player, action, amount, counter);
}

/*
* Updates a counter while reducing the coin counter for a certain amount.
* If the player doesn't have enough coins it returns false without updating a counter.
*
* @param {string} counter Which counter should be updated.
* @param {number} player Which player should be updated.
* @param {string} amount The amount that should be changed.
* @param {string} action What should be done - can be 'P' for addition, 'M' for subtraction or 'S' to replace the existing count.
* @param {number} price The amount of coins that should be payed.
*/
function assist_buyStats (counter, player, amount, action, price) {
	if (assistInfo.noCoins === true) {
		assist_updateCounter(counter, player, amount, action);
	}

	//return false if player doesn't have enough coins
	var coins = getStat('coins', player);
	if (coins < price) {
		return false;
	}

	assist_updateCounter('coins', player, price, 'M');
	assist_updateCounter(counter, player, amount, action);
}

/*
* Calculates the amount of items that could be bought for a certain price.
*
* @param {number} player Which player should be updated.
* @param {number} price The amount of coins that should be payed.
*/
function assist_purchaseableItems (player, price) {
	var coins = getStat('coins', player);

	return Math.floor(coins / price);
}

/*
* Executes events.
* View MPO wiki or something and hope I already explained it there.
*
* @param {object/array} event The event to be executed or an array that contains them.
* @param {string} game Which game, uses the current assist game if empty.
* @param {string} board Which board, uses the current assist board if empty.
*/
function assist_execEvent (event, game, board) {
	if (typeof game === 'undefined') {
		game = assistInfo.curGame;
	}
	if (typeof board === 'undefined') {
		board = assistInfo.board;
	}

	//execute all events in an array if an array was given
	if (Array.isArray(event) === true) {
		for (let num = 0; num < event.length; num++) {
			assist_execEvent(event[num], game, board);
		}
		return;
	}

	var player = event.player;
	if (typeof player != 'number') {
		player = assistInfo.curPlayer;
	}

	//todo: add statistics and notification

	switch (event.type) {
		case 'addCoins':
			assist_updateCounter('coins', player, event.value, 'P');
			break;
		case 'removeCoins':
			assist_updateCounter('coins', player, event.value, 'M');
			break;
	}
}

/*
* Buys a star. Only to be activated via HTML onclick.
*
* @param {string} starName The star name.
* @param {string} game Which game, uses the current assist game if empty.
* @param {string} board Which board, uses the current assist board if empty.
*/
function assist_buyStar (starName, game, board) {
	if (typeof game === 'undefined') {
		game = assistInfo.curGame;
	}
	if (typeof board === 'undefined') {
		board = assistInfo.board;
	}

	var star = assist_getStar(starName, game, board);

	if (typeof star === 'undefined') {
		star = assistData.default.star; //default in case no matching star was available
	}

	var starElem = document.querySelector('[assistname="' + star.name + '"]');

	var starAmount = 1; //amount of stars to be bought
	if (star.buyMultiple === true) {
		starAmount = parseInt(starElem.parentNode.children[1].children[1].children[0].innerHTML);

		if (typeof starAmount != 'number') {
			starAmount = 1;
		}

		//reset buy multiple counter to 1
		assist_changeBuyMultipleStarAmount(starName, 'S', 1, game, board);
	}

	var starPrice = star.price;

	var starPriceMultiplier = assistInfo.starPriceMultiplier;
	if (starPriceMultiplier < 1) {
		starPriceMultiplier = 1;
	}

	//check if the amount of stars can even be bought
	var buyableAmount = assist_purchaseableItems(assistInfo.curPlayer, starAmount);
	if (buyableAmount < starAmount) {
		starAmount = buyableAmount;
	}

	var totalPrice = starAmount * starPrice * starPriceMultiplier;

	//return if no stars are bought. //todo: add a notif or something to alert the user of this
	if (starAmount < 1) {
		return;
	}

	var receivedStars = star.amount; //amount of stars gotten for each purchase
	if (typeof receivedStars != 'number') {
		receivedStars = 1; //use 1 when amount is unspecified
	}

	assist_buyStats('stars', assistInfo.curPlayer, starAmount * receivedStars, 'P', totalPrice);

	if (typeof star.event != 'undefined') {
		assist_execEvent(star.event, game, board);
	}

	//todo: add statistics
}

/*
* Changes the amount of stars on the buy multiple display for stars. Only usable when a star has buyMultiple set to true.
*
* @param {string} starName The name of the star.
* @param {string} action Can be either 'P' for addition, 'M' for subtraction or 'S' to set it to a certain number.
* @param {number} amount The amount that it should be changed by. Defaults to 1.
* @param {string} game Which game, uses the current assist game if empty.
* @param {string} board Which board, uses the current assist board if empty.
*/
function assist_changeBuyMultipleStarAmount (starName, action, amount, game, board) {
	var elem  = getAssistElem(starName)[0].parentNode.children[1].children[1].children[0];
	var elem2 = getAssistElem(starName)[1].parentNode.children[1].children[1].children[0];
	var result = 0;

	if (typeof amount != 'number') {
		amount = 1;
	}

	switch (action) {
		case 'P':
			result = parseInt(getInner(elem)) + amount;
			break;
		case 'M':
			result = parseInt(getInner(elem)) - amount;
			break;
		case 'S':
			result = amount;
			break;
	}

	if (result < 1) {
		result = 1;
	}
	if (result > 99) {
		result = 99;
	}

	//check if the amount of stars exceeds the amount that can be buyable with the amount of coins
	//dont check if action is 'S' since theres usually a reason its set higher
	if (action != 'S' && assistInfo.noCoins != true) {
		if (typeof game === 'undefined') {
			game = assistInfo.curGame;
		}
		if (typeof board === 'undefined') {
			board = assistInfo.board;
		}

		var coins = getStat('coins', assistInfo.curPlayer);
		var starPrice = assist_getStar(starName, game, board).price;

		if (starPrice * result > coins) {
			return;
		}
	}
	editInner(elem, result);
	editInner(elem2, result);
}