/**	Gets a list of bonus stars (in object form).
 *
 * 	Simply gets the 'bonusStars' object from the database.
 * 	The '_array' property will be removed as the keys can be gotten via "for ... in".
 *
 * 	Args:
 * 		game [String]
 * 			The name of the game. Can also be '_all'.
 *
 * 	Returns [Object]:
 * 		Returns the 'bonusStars' object of the specified game from the database.
 */
function dbparsing_getBonusStarList (game) {
	//use try catch in case game doesn't have a list of bonus stars
	try {
		//get bonus star list
		var obj = mpdb[game]['bonusStars'];

		//remove '_index'
		delete obj['_index'];
	} catch (e) {
		return {};
	}
	return obj;
}