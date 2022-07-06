const ship = {
    // width variable representing numbers of elements in gameboard
    // ships need to spaced out
    width: 10,

    /* create shipArray which is array of objects including ship's name,
     *	length and it's direction are X and Y co-ordinates respectively
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
        let shipArray = [
            {
                name: "destroyer",
                directions: [
                    [0, 1],
                    [0, this.width],
                ],
            },
            {
                name: "submarine",
                directions: [
                    [0, 1, 2],
                    [0, this.width, this.width * 2],
                ],
            },
            {
                name: "cruiser",
                directions: [
                    [0, 1, 2],
                    [0, this.width, this.width * 2],
                ],
            },
            {
                name: "battleship",
                directions: [
                    [0, 1, 2, 3],
                    [0, this.width, this.width * 2, this.width * 3],
                ],
            },
            {
                name: "carrier",
                directions: [
                    [0, 1, 2, 3, 4],
                    [
                        0,
                        this.width,
                        this.width * 2,
                        this.width * 3,
                        this.width * 4,
                    ],
                ],
            },
        ];
        return shipArray;
    },
};

module.exports = ship;
