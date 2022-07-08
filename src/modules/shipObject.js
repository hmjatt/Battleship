const shipObject = {
    // width variable representing numbers of elements in gameboard
    // ships need to spaced out

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

    ships(name) {
        const width = 10;
        let elementoHTML;
        let X;
        let Y;
        switch (name) {
            case "destroyer":
                elementoHTML = document.querySelector(".destroyer-container");
                X = [0, 1];
                Y = [0, width];
                break;
            case "submarine":
                elementoHTML = document.querySelector(".submarine-container");
                X = [0, 1, 2];
                Y = [0, width, width * 2];
                break;
            case "cruiser":
                elementoHTML = document.querySelector(".cruiser-container");
                X = [0, 1, 2];
                Y = [0, width, width * 2];
                break;
            case "battleship":
                elementoHTML = document.querySelector(".battleship-container");
                X = [0, 1, 2, 3];
                Y = [0, width, width * 2, width * 3];
                break;
            case "carrier":
                elementoHTML = document.querySelector(".carrier-container");
                X = [0, 1, 2, 3, 4];
                Y = [0, width, width * 2, width * 3, width * 4];
                break;
        }

        const getName = () => name;
        const getElement = () => elementoHTML;
        const getDirections = () => {
            return [X, Y];
        };

        return { getName, getElement, getDirections };
    },
};

export {shipObject};
