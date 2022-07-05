const ship = {

	// width variable representing grid with and numbers of elements in gameGrid()
	// function ships need to spaced out
	width : 10,

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


	//////////////// test code from here /////////////

	

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

		for (let i = 0; i < this.width * this.width; i++) {
			gridArray.push(i);
		}

		return gridArray;

	},



	/* create shipArray which is array of objects including ship's name, 
	*	length and it's direction
	*	[{
	*		directions: [[0, 1], [0, 10]],
	*		name: "destroyer"
	*		}, {
	*		directions: [[0, 1, 2], [0, 10, 20]],
	*		name: "submarine"
	*		}, {
	*		directions: [[0, 1, 2], [0, 10, 20]],
	*		name: "cruiser"
	*		}, {
	*		directions: [[0, 1, 2, 3], [0, 10, 20, 30]],
	*		name: "battleship"
	*		}, {
	*		directions: [[0, 1, 2, 3, 4], [0, 10, 20, 30, 40]],
	*		name: "carrier"
	*	}]
	*/

	ships() {

		let shipArray = 

			[
				{
					name: 'destroyer',
					directions: [
						[0, 1],
						[0, this.width]
					]
				},
				{
					name: 'submarine',
					directions: [
						[0, 1, 2],
						[0, this.width, this.width * 2]
					]
				},
				{
					name: 'cruiser',
					directions: [
						[0, 1, 2],
						[0, this.width, this.width * 2]
					]
				},
				{
					name: 'battleship',
					directions: [
						[0, 1, 2, 3],
						[0, this.width, this.width * 2, this.width * 3]
					]
				},
				{
					name: 'carrier',
					directions: [
						[0, 1, 2, 3, 4],
						[0, this.width, this.width * 2, this.width * 3, this.width * 4]
					]
				},
			]

			return shipArray;

	},
	

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