/*
* Returns an array of all boards for a game.
*
* @param {string} game Which game, uses the current assist game if empty.
*/
function assist_getBoardList (game) {
	if (typeof game === 'undefined') {
		game = assistInfo.curGame;
	}
	return assistData[game].misc.boardList;
}

/*
* Returns an array with all stars available on the current board.
*
* @param {string} game Which game, uses the current assist game if empty.
* @param {string} board Which board, uses the current assist board if empty.
*/
function assist_getStarList (game, board) {
	if (typeof game === 'undefined') {
		game = assistInfo.curGame;
	}
	if (typeof board === 'undefined') {
		board = assistInfo.board;
	}

	var stars = [];
	var arr = assistData[game].misc.stars;
	if (Array.isArray(arr) != true) {
		arr = [arr];
	}
	for (var num = 0; num < arr.length; num++) {
		//check if stage is included - 'stages' not existing equals to all stages
		if (arr[num].stages === undefined || arr[num].stages.indexOf(board) != -1) {
			stars.push(arr[num]);
		}
	}
	return stars;
}

/*
* Returns a specific star based on the name given.
*
* @param {string} starname The name of the star.
* @param {string} game Which game, uses the current assist game if empty.
* @param {string} board Which board, uses the current assist board if empty.
*/
function assist_getStarInfo (starName, game, board) {
	if (typeof game === 'undefined') {
		game = assistInfo.curGame;
	}
	if (typeof board === 'undefined') {
		board = assistInfo.board;
	}

	var starList = assist_getStarList(game, board);

	for (var num = 0; num < starList.length; num++) {
		if (starList[num].name === starName) {
			return starList[num];
		}
	}
}