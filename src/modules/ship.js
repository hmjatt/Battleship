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

	

	/*create gameGrid() helper function that generates a grid(array of arrays)
	* it is a 2 dimensional array of 10 x 10 filled with 0's
	* e.g.
	* [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
	* [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
	*/
	gameGrid() {

		let gridArray = [];

		for (let i = 0; i < 10; i++) {
			gridArray.push(new Array(10).fill(0));
		  }

		return gridArray;

	},

	// create a random ship size variable which includes 
	//array of objects with range of values [{2,2}, {3,2}, {4,2}]
	//
	shipSize : [{2,2}, {3,2}, {4,2}],

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