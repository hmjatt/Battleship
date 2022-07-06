const ship = require("../modules/ship");

test("outputs an array of objects which include ship name, direction and length", () => {
    expect(ship.ships()).toStrictEqual([
        {
            directions: [
                [0, 1],
                [0, 10],
            ],
            name: "destroyer",
        },
        {
            directions: [
                [0, 1, 2],
                [0, 10, 20],
            ],
            name: "submarine",
        },
        {
            directions: [
                [0, 1, 2],
                [0, 10, 20],
            ],
            name: "cruiser",
        },
        {
            directions: [
                [0, 1, 2, 3],
                [0, 10, 20, 30],
            ],
            name: "battleship",
        },
        {
            directions: [
                [0, 1, 2, 3, 4],
                [0, 10, 20, 30, 40],
            ],
            name: "carrier",
        },
    ]);
});
