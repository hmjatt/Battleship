import ship from "./ship";

const gameboard = {
  // width variable representing number of elements in a row in gameGrid() method
  width: 10,

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

  placeShips() {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * computerSquares.length -
          ship.directions[0].length * direction
      )
    );

    const isTaken = current.some((index) =>
      computerSquares[randomStart + index].classList.contains("taken")
    );
    const isAtRightEdge = current.some(
      (index) => (randomStart + index) % width === width - 1
    );
    const isAtLeftEdge = current.some(
      (index) => (randomStart + index) % width === 0
    );

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((index) =>
        computerSquares[randomStart + index].classList.add("taken", ship.name)
      );
    else generate(ship);
  },
};

module.exports = gameboard;
