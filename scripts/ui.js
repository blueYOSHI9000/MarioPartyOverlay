/**	Creates a list of counters.
 *
 * 	This will add one counter for each bonus star in the series. [TODO: change this so it can be defined which counters should be made]
 *
 * 	Args:
 * 		parent [DOM Element/String]
 * 			The element that the counterlist should be created in.
 * 			Can also be the ID of the element.
 */
function ui_createCounterList (parent) {
	//get all bonus stars
	const bonusStars = dbparsing_getBonusStarList('_all');

	//loop through all bonus stars
	for (const item in bonusStars) {
		//This contains one counter.
		let counter = cElem('span', parent, {class: 'tracker_counter'});

		//counter image
		cElem('img', counter, {class: 'tracker_counterImg', src: `images/${bonusStars[item].metadata.icon[0].filePath}`});
		//counter text
		let counterText = cElem('span', counter, {class: 'tracker_counterText'});
		counterText.textContent = 0;
	}
}