const ship = {

	/**
	* A Ship is an array with all (x, y) coordinates of the ship:
	*
	* e.g.
	* [
	*	{'x':2, 'y':2},
	*	{'x':3, 'y':2},
	*	{'x':4, 'y':2}
	* ]
	*/

	

	/*create gameGrid() helper function that generates a grid
	* it is a array of 10 x 10 elements(100) filled with 0's
	* e.g.
	*	[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
	*	10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 
	*	20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
	*	30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 
	*	40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
	*	50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 
	*	60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 
	*	70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 
	*	80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 
	*	90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
	*/
	gameGrid() {

		let gridArray = [];

		for (let i = 0; i < 10 * 10; i++) {
			gridArray.push(i);
		}

		return gridArray;

	},

	// create a random ship size variable which includes 
	//array of objects with range of values [{2,2}, {3,2}, {4,2}]
	//
	// shipSize : [{2,2}, {3,2}, {4,2}],

	//////////////// test code from here /////////////

	//create placeShip() helper function that takes grid, size of ship
	// places a ship at a random position on grid, outputs ships co-ordinates
	// co-ordinates start at 00 end at 99
	placeShip(gridArray, shipSize) {

	}

	


	//////////// test code till here /////////////



	//create hit() helper function that takes a 
	// number and then marks that position as ‘hit’

	//create isSunk() helper function should be a function that calculates it 
	// based on their length and whether all of their positions are ‘hit’





	// REMEMBER you only have to test your object’s public interface. 
	// Only methods or properties that are used outside of your ‘ship’ 
	// object need unit tests.

	// Your 'ships' will be objects that include their length,
	// where they’ve been hit and whether or not they’ve been sunk.

	
	// ships() {

	// }

};

module.exports = ship;