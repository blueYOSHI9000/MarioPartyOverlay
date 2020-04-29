/*
*/
function assist_buyStar (starName, game, board) {
	if (typeof game === 'undefined') {
		game = assistInfo.curGame;
	}
	if (typeof board === 'undefined') {
		board = assistInfo.board;
	}

	var starList = assistData[game].misc.stars;
	var star;

	for (var num = 0; num < starList.length; num++) {
		//get first star that equals the name
		//no board check since that happens when the star button gets added
		if (starList[num].name === starName) {
			star = starList[num];
			break;
		}
	}

	if (typeof star === 'undefined') {
		star = assistData.default.star; //default in case no matching star was available
	}
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