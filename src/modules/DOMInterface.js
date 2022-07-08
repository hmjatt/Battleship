//Catche DOM
import {shipModule} from "./ships";

console.log("it works before separating modules");

const DOMInterface = {
    gameLogic() {
        const userGrid = document.querySelector(".grid-user");
        const computerGrid = document.querySelector(".grid-computer");
        const displayGrid = document.querySelector(".grid-display");
        const ships = document.querySelectorAll(".ship");

		const destroyer = shipModule.ships('destroyer');
		const submarine = shipModule.ships('submarine');
		const cruiser = shipModule.ships('cruiser');
		const battleship = shipModule.ships('battleship');
		const carrier = shipModule.ships('carrier');
        const startButton = document.querySelector("#start");
        const rotateButton = document.querySelector("#rotate");
        const turnDisplay = document.querySelector("#whose-go");
        const infoDisplay = document.querySelector("#info");
        const setupButtons = document.getElementById("setup-buttons");
        const userSquares = [];
        const computerSquares = [];
        const gameMode = "singlePlayer";
        let isHorizontal = true;
        let isGameOver = false;
        let currentPlayer = "user";
        const width = 10;
        let playerNum = 0;
        let ready = false;
        let enemyReady = false;
        let allShipsPlaced = false;
        let shotFired = -1;
		// const shipArray = [];
        //Ships

		// console.log (ships.ships().getDirections)

		const shipArray = [
            {
                name: destroyer.getName(),
                directions: destroyer.getDirections(),
            },
            {
                name: submarine.getName(),
                directions: submarine.getDirections(),
            },
            {
                name: cruiser.getName(),
                directions: cruiser.getDirections(),
            },
            {
                name: battleship.getName(),
                directions: battleship.getDirections(),
            },
            {
                name: carrier.getName(),
                directions: carrier.getDirections(),
            },
        ];


        createBoard(userGrid, userSquares);
        createBoard(computerGrid, computerSquares);

        // Select Player Mode
        startSinglePlayer();

        // Single Player
        function startSinglePlayer() {
            generate(shipArray[0]);
            generate(shipArray[1]);
            generate(shipArray[2]);
            generate(shipArray[3]);
            generate(shipArray[4]);

            startButton.addEventListener("click", () => {
                setupButtons.style.display = "none";
                playGameSingle();
            });
        }

        //Create Board
        function createBoard(grid, squares) {
            for (let i = 0; i < width * width; i++) {
                const square = document.createElement("div");
                square.dataset.id = i;
                grid.appendChild(square);
                squares.push(square);
            }
        }

        //Draw the computers ships in random locations
        function generate(ship) {
            let randomDirection = Math.floor(
                Math.random() * ship.directions.length
            );
            let current = ship.directions[randomDirection];
			let direction;
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
                    computerSquares[randomStart + index].classList.add(
                        "taken",
                        ship.name
                    )
                );
            else generate(ship);
        }

        //Rotate the ships
        function rotate() {
            if (isHorizontal) {
				destroyer.getElement().classList.toggle('destroyer-container-vertical');
				submarine.getElement().classList.toggle('submarine-container-vertical');
				cruiser.getElement().classList.toggle('cruiser-container-vertical');
				battleship.getElement().classList.toggle('battleship-container-vertical');
				carrier.getElement().classList.toggle('carrier-container-vertical');
				displayGrid.classList.toggle('isHorizontal');
                isHorizontal = false;
                // console.log(isHorizontal)
                return;
            }
            if (!isHorizontal) {
				destroyer.getElement().classList.toggle('destroyer-container-vertical');
				submarine.getElement().classList.toggle('submarine-container-vertical');
				cruiser.getElement().classList.toggle('cruiser-container-vertical');
				battleship.getElement().classList.toggle('battleship-container-vertical');
				carrier.getElement().classList.toggle('carrier-container-vertical');
				displayGrid.classList.toggle('isHorizontal');
                isHorizontal = true;
                // console.log(isHorizontal)
                return;
            }
        }
        rotateButton.addEventListener("click", rotate);

        //move around user ship
        ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
        userSquares.forEach((square) =>
            square.addEventListener("dragstart", dragStart)
        );
        userSquares.forEach((square) =>
            square.addEventListener("dragover", dragOver)
        );
        userSquares.forEach((square) =>
            square.addEventListener("dragenter", dragEnter)
        );
        userSquares.forEach((square) =>
            square.addEventListener("dragleave", dragLeave)
        );
        userSquares.forEach((square) =>
            square.addEventListener("drop", dragDrop)
        );
        userSquares.forEach((square) =>
            square.addEventListener("dragend", dragEnd)
        );

        let selectedShipNameWithIndex;
        let draggedShip;
        let draggedShipLength;

        ships.forEach((ship) =>
            ship.addEventListener("mousedown", (e) => {
                selectedShipNameWithIndex = e.target.id;
                // console.log(selectedShipNameWithIndex)
            })
        );

        function dragStart() {
            draggedShip = this;
            draggedShipLength = this.childNodes.length;
            for (let i = 0; i < draggedShip.childNodes.length; i++) {
                if (draggedShip.childNodes[i].nodeType === 3) {
                    draggedShip.childNodes[i].parentNode.removeChild(
                        draggedShip.childNodes[i]
                    );
                }
            }
            // console.log(draggedShip.lastChild.id);
            draggedShipLength = draggedShip.childNodes.length;
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function dragEnter(e) {
            e.preventDefault();
        }

        function dragLeave() {
            // console.log('drag leave')
        }

        function dragDrop() {
            let shipNameWithLastId = draggedShip.lastChild.id;
            let shipClass = shipNameWithLastId.slice(0, -2);
            let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
            let shipLastId = lastShipIndex + parseInt(this.dataset.id);
            const notAllowedHorizontal = [
                0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51,
                61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23,
                33, 43, 53, 63, 73, 83, 93,
            ];
            const notAllowedVertical = [
                99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84,
                83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68,
                67, 66, 65, 64, 63, 62, 61, 60,
            ];

            let newNotAllowedHorizontal = notAllowedHorizontal.splice(
                0,
                10 * lastShipIndex
            );
            let newNotAllowedVertical = notAllowedVertical.splice(
                0,
                10 * lastShipIndex
            );

            let selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

            shipLastId = shipLastId - selectedShipIndex;
            // console.log(shipLastId)

            if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
                for (let i = 0; i < draggedShipLength; i++) {
                    let directionClass;
                    if (i === 0) directionClass = "start";
                    if (i === draggedShipLength - 1) directionClass = "end";
                    userSquares[
                        parseInt(this.dataset.id) - selectedShipIndex + i
                    ].classList.add(
                        "taken",
                        "horizontal",
                        directionClass,
                        shipClass
                    );
                }
                //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
                //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
            } else if (
                !isHorizontal &&
                !newNotAllowedVertical.includes(shipLastId)
            ) {
                for (let i = 0; i < draggedShipLength; i++) {
                    let directionClass;
                    if (i === 0) directionClass = "start";
                    if (i === draggedShipLength - 1) directionClass = "end";
                    userSquares[
                        parseInt(this.dataset.id) -
                            selectedShipIndex +
                            width * i
                    ].classList.add(
                        "taken",
                        "vertical",
                        directionClass,
                        shipClass
                    );
                }
            } else return;

            displayGrid.removeChild(draggedShip);
            if (!displayGrid.querySelector(".ship")) allShipsPlaced = true;
        }

        function dragEnd() {
            // console.log('dragend')
        }

        // Game Logic for Single Player
        function playGameSingle() {
            if (isGameOver) return;
            if (currentPlayer === "user") {
                turnDisplay.innerHTML = "Your Go";
                computerSquares.forEach((square) =>
                    square.addEventListener("click", function (e) {
                        shotFired = square.dataset.id;
                        revealSquare(square.classList);
						console.log(shotFired)
                    })
                );
            }
            if (currentPlayer === "enemy") {
                turnDisplay.innerHTML = "Computers Go";
                setTimeout(enemyGo, 200);
            }
        }

        let destroyerCount = 0;
        let submarineCount = 0;
        let cruiserCount = 0;
        let battleshipCount = 0;
        let carrierCount = 0;

        function revealSquare(classList) {
            const enemySquare = computerGrid.querySelector(
                `div[data-id='${shotFired}']`
            );
            const obj = Object.values(classList);
			// if (
            //     !enemySquare.classList.contains("boom") &&
            //     currentPlayer === "user" &&
            //     !isGameOver
            // ) {
            //     if (obj.includes("destroyer")) destroyerCount++;
            //     if (obj.includes("submarine")) submarineCount++;
            //     if (obj.includes("cruiser")) cruiserCount++;
            //     if (obj.includes("battleship")) battleshipCount++;
            //     if (obj.includes("carrier")) carrierCount++;
            //     checkForWins();
            // }
            if (
                !obj.includes("boom")
            ) {
                if (obj.includes("destroyer")) destroyerCount++;
                if (obj.includes("submarine")) submarineCount++;
                if (obj.includes("cruiser")) cruiserCount++;
                if (obj.includes("battleship")) battleshipCount++;
                if (obj.includes("carrier")) carrierCount++;
                checkForWins();
            }
            if (obj.includes("boom") || obj.includes("miss")) {
                return;
            } else {
                if (obj.includes("taken")) {
                    enemySquare.classList.add("boom");
                } else {
                    enemySquare.classList.add("miss");
                }
            }
            currentPlayer = "enemy";
            if (gameMode === "singlePlayer") playGameSingle();
        }

        let cpuDestroyerCount = 0;
        let cpuSubmarineCount = 0;
        let cpuCruiserCount = 0;
        let cpuBattleshipCount = 0;
        let cpuCarrierCount = 0;

        function enemyGo(square) {
            if (gameMode === "singlePlayer")
                square = Math.floor(Math.random() * userSquares.length);
            if (!userSquares[square].classList.contains("boom")) {
                // const hit = userSquares[square].classList.contains("taken");
                // userSquares[square].classList.add(hit ? "boom" : "miss");
                if (userSquares[square].classList.contains("destroyer"))
                    cpuDestroyerCount++;
                if (userSquares[square].classList.contains("submarine"))
                    cpuSubmarineCount++;
                if (userSquares[square].classList.contains("cruiser"))
                    cpuCruiserCount++;
                if (userSquares[square].classList.contains("battleship"))
                    cpuBattleshipCount++;
                if (userSquares[square].classList.contains("carrier"))
                    cpuCarrierCount++;
                checkForWins();
            } 
			// else if (gameMode === "singlePlayer") enemyGo();
			if (userSquares[square].classList.contains('boom') || userSquares[square].classList.contains('miss')) {
				enemyGo();
			  } else {
				if (userSquares[square].classList.contains('taken')) {
				//   const fondo = document.createElement('i');
				//   fondo.classList.add('fas', 'fa-circle');
				//   userSquares[square].appendChild(fondo);
				  userSquares[square].classList.add('boom');
				} else {
				//   const fondo = document.createElement('i');
				//   fondo.classList.add('fas', 'fa-circle');
				//   userSquares[square].appendChild(fondo);
				  userSquares[square].classList.add('miss');
				}
			  }
            currentPlayer = "user";
            turnDisplay.innerHTML = "Your Go";
        }

        function checkForWins() {
            let enemy = "computer";
            // if (gameMode === "multiPlayer") enemy = "enemy";
            if (destroyerCount === 2) {
                infoDisplay.innerHTML = `You sunk the ${enemy}'s destroyer`;
                destroyerCount = 10;
            }
            if (submarineCount === 3) {
                infoDisplay.innerHTML = `You sunk the ${enemy}'s submarine`;
                submarineCount = 10;
            }
            if (cruiserCount === 3) {
                infoDisplay.innerHTML = `You sunk the ${enemy}'s cruiser`;
                cruiserCount = 10;
            }
            if (battleshipCount === 4) {
                infoDisplay.innerHTML = `You sunk the ${enemy}'s battleship`;
                battleshipCount = 10;
            }
            if (carrierCount === 5) {
                infoDisplay.innerHTML = `You sunk the ${enemy}'s carrier`;
                carrierCount = 10;
            }
            if (cpuDestroyerCount === 2) {
                infoDisplay.innerHTML = `${enemy} sunk your destroyer`;
                cpuDestroyerCount = 10;
            }
            if (cpuSubmarineCount === 3) {
                infoDisplay.innerHTML = `${enemy} sunk your submarine`;
                cpuSubmarineCount = 10;
            }
            if (cpuCruiserCount === 3) {
                infoDisplay.innerHTML = `${enemy} sunk your cruiser`;
                cpuCruiserCount = 10;
            }
            if (cpuBattleshipCount === 4) {
                infoDisplay.innerHTML = `${enemy} sunk your battleship`;
                cpuBattleshipCount = 10;
            }
            if (cpuCarrierCount === 5) {
                infoDisplay.innerHTML = `${enemy} sunk your carrier`;
                cpuCarrierCount = 10;
            }

            if (
                destroyerCount +
                    submarineCount +
                    cruiserCount +
                    battleshipCount +
                    carrierCount ===
                50
            ) {
                turnDisplay.remove();
                infoDisplay.innerHTML = "YOU WON";
                gameOver();
            }
            if (
                cpuDestroyerCount +
                    cpuSubmarineCount +
                    cpuCruiserCount +
                    cpuBattleshipCount +
                    cpuCarrierCount ===
                50
            ) {
                turnDisplay.remove();
                infoDisplay.innerHTML = `${enemy.toUpperCase()} WON`;
                gameOver();
            }
        }

        function gameOver() {
            isGameOver = true;
            startButton.removeEventListener("click", playGameSingle);
        }
    },

    gameStart() {
        return this.gameLogic();
    },
};

export {DOMInterface};
