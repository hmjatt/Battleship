//Catche DOM
import { shipModule } from "./ships";
import { gameboard } from "./gameboard";
import shipImg from "../public/images/ship.svg";

const gameLogic = {
    gameLogic() {
        const userGrid = document.querySelector(".grid-user");
        const computerGrid = document.querySelector(".grid-computer");
        const displayGrid = document.querySelector(".grid-display");
        const ships = document.querySelectorAll(".ship");
        const rotateButton = document.querySelector("#rotate");
        const turnDisplay = document.querySelector("#whose-go");
        const infoDisplay = document.querySelector("#info");
        const setupButtons = document.getElementById("setup-buttons");
        const playAgain = document.getElementById("playAgain");
        const gameContainer = document.getElementById("gameContainer");
        const homePage = document.getElementById("homePage");
        const startGameBtn = document.getElementById("startGame");
        const shipImgEle = document.getElementById("imgHomePage");
        const autoPlaceShipsBtn = document.getElementById("autoplaceBtn");

        shipImgEle.src = shipImg;

        const destroyer = shipModule.ships("destroyer");
        const submarine = shipModule.ships("submarine");
        const cruiser = shipModule.ships("cruiser");
        const battleship = shipModule.ships("battleship");
        const carrier = shipModule.ships("carrier");

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

        //startGame
        startGameBtn.addEventListener("click", startSinglePlayer);

        //Ships
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

        gameboard.gameGrid(userGrid, userSquares);
        gameboard.gameGrid(computerGrid, computerSquares);

        // Single Player
        function startSinglePlayer() {
            homePage.style.display = "none";
            gameContainer.style.display = "flex";

            generate(shipArray[0]);
            generate(shipArray[1]);
            generate(shipArray[2]);
            generate(shipArray[3]);
            generate(shipArray[4]);

            autoPlaceShipsBtn.addEventListener("click", () => {
                generateUserShips(shipArray[0]);
                generateUserShips(shipArray[1]);
                generateUserShips(shipArray[2]);
                generateUserShips(shipArray[3]);
                generateUserShips(shipArray[4]);
                setupButtons.style.display = "none";
                displayGrid.style.display = "none";
                autoPlaceShipsBtn.style.display = "none";
                getShipsOnAutoGenerate();
                playGameSingle();
            });
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
                destroyer
                    .getElement()
                    .classList.toggle("destroyer-container-vertical");
                submarine
                    .getElement()
                    .classList.toggle("submarine-container-vertical");
                cruiser
                    .getElement()
                    .classList.toggle("cruiser-container-vertical");
                battleship
                    .getElement()
                    .classList.toggle("battleship-container-vertical");
                carrier
                    .getElement()
                    .classList.toggle("carrier-container-vertical");
                displayGrid.classList.toggle("isHorizontal");
                isHorizontal = false;
                return;
            }
            if (!isHorizontal) {
                destroyer
                    .getElement()
                    .classList.toggle("destroyer-container-vertical");
                submarine
                    .getElement()
                    .classList.toggle("submarine-container-vertical");
                cruiser
                    .getElement()
                    .classList.toggle("cruiser-container-vertical");
                battleship
                    .getElement()
                    .classList.toggle("battleship-container-vertical");
                carrier
                    .getElement()
                    .classList.toggle("carrier-container-vertical");
                displayGrid.classList.toggle("isHorizontal");
                isHorizontal = true;
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
            autoPlaceShipsBtn.style.display = "none";
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

            let selectedShipIndex = parseInt(
                selectedShipNameWithIndex.substr(-1)
            );

            shipLastId = shipLastId - selectedShipIndex;

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

            if (allShipsPlaced === true) {
                rotateButton.style.display = "none";
                autoPlaceShipsBtn.style.display = "none";
                playGameSingle();
            }
        }

        function dragEnd() {
            // console.log('dragend')
        }

        //Draw the user's ships in random locations
        function generateUserShips(ship) {
            let randomDirection = Math.floor(
                Math.random() * ship.directions.length
            );
            let current = ship.directions[randomDirection];
            let direction;
            if (randomDirection === 0) direction = 1;
            if (randomDirection === 1) direction = 10;
            let randomStart = Math.abs(
                Math.floor(
                    Math.random() * userSquares.length -
                        ship.directions[0].length * direction
                )
            );

            const isTaken = current.some((index) =>
                userSquares[randomStart + index].classList.contains("taken")
            );
            const isAtRightEdge = current.some(
                (index) => (randomStart + index) % width === width - 1
            );
            const isAtLeftEdge = current.some(
                (index) => (randomStart + index) % width === 0
            );

            if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
                current.forEach((index) =>
                    userSquares[randomStart + index].classList.add(
                        "taken",
                        ship.name
                    )
                );
            else generateUserShips(ship);
        }

        function getShipsOnAutoGenerate() {
            const destroyerAuto =
                userGrid.getElementsByClassName("taken destroyer");
            let destroyerAutoFirstEle = parseInt(destroyerAuto[0].dataset.id);
            let destroyerAutoSecondEle = parseInt(destroyerAuto[1].dataset.id);
            // if difference between id is 1 direction = horizontal || if it's 10 direction = vertical
            if (destroyerAutoSecondEle - destroyerAutoFirstEle == 1) {
                destroyerAuto[0].classList = "taken horizontal start destroyer";
                destroyerAuto[1].classList = "taken horizontal end destroyer";
            } else if (destroyerAutoSecondEle - destroyerAutoFirstEle == 10) {
                destroyerAuto[0].classList = "taken vertical start destroyer";
                destroyerAuto[1].classList = "taken vertical end destroyer";
            }

            const cruiserAuto =
                userGrid.getElementsByClassName("taken cruiser");
            let cruiserAutoFirstEle = parseInt(cruiserAuto[0].dataset.id);
            let cruiserAutoSecondEle = parseInt(cruiserAuto[1].dataset.id);
            if (cruiserAutoSecondEle - cruiserAutoFirstEle == 1) {
                cruiserAuto[0].classList = "taken horizontal start cruiser";
                cruiserAuto[1].classList = "taken horizontal undefined cruiser";
                cruiserAuto[2].classList = "taken horizontal end cruiser";
            } else if (cruiserAutoSecondEle - cruiserAutoFirstEle == 10) {
                cruiserAuto[0].classList = "taken vertical start cruiser";
                cruiserAuto[1].classList = "taken vertical undefined cruiser";
                cruiserAuto[2].classList = "taken vertical end cruiser";
            }

            const submarineAuto =
                userGrid.getElementsByClassName("taken submarine");
            let submarineAutoFirstEle = parseInt(submarineAuto[0].dataset.id);
            let submarineAutoSecondEle = parseInt(submarineAuto[1].dataset.id);
            if (submarineAutoSecondEle - submarineAutoFirstEle == 1) {
                submarineAuto[0].classList = "taken horizontal start submarine";
                submarineAuto[1].classList =
                    "taken horizontal undefined submarine";
                submarineAuto[2].classList = "taken horizontal end submarine";
            } else if (submarineAutoSecondEle - submarineAutoFirstEle == 10) {
                submarineAuto[0].classList = "taken vertical start submarine";
                submarineAuto[1].classList =
                    "taken vertical undefined submarine";
                submarineAuto[2].classList = "taken vertical end submarine";
            }

            const battleshipAuto =
                userGrid.getElementsByClassName("taken battleship");
            let battleshipAutoFirstEle = parseInt(battleshipAuto[0].dataset.id);
            let battleshipAutoSecondEle = parseInt(
                battleshipAuto[1].dataset.id
            );
            if (battleshipAutoSecondEle - battleshipAutoFirstEle == 1) {
                battleshipAuto[0].classList =
                    "taken horizontal start battleship";
                battleshipAuto[1].classList =
                    "taken horizontal undefined battleship";
                battleshipAuto[2].classList =
                    "taken horizontal undefined battleship";
                battleshipAuto[3].classList = "taken horizontal end battleship";
            } else if (battleshipAutoSecondEle - battleshipAutoFirstEle == 10) {
                battleshipAuto[0].classList = "taken vertical start battleship";
                battleshipAuto[1].classList =
                    "taken vertical undefined battleship";
                battleshipAuto[2].classList =
                    "taken vertical undefined battleship";
                battleshipAuto[3].classList = "taken vertical end battleship";
            }

            const carrierAuto =
                userGrid.getElementsByClassName("taken carrier");
            let carrierAutoFirstEle = parseInt(carrierAuto[0].dataset.id);
            let carrierAutoSecondEle = parseInt(carrierAuto[1].dataset.id);
            if (carrierAutoSecondEle - carrierAutoFirstEle == 1) {
                carrierAuto[0].classList = "taken horizontal start carrier";
                carrierAuto[1].classList = "taken horizontal undefined carrier";
                carrierAuto[2].classList = "taken horizontal undefined carrier";
                carrierAuto[3].classList = "taken horizontal undefined carrier";
                carrierAuto[4].classList = "taken horizontal end carrier";
            } else if (carrierAutoSecondEle - carrierAutoFirstEle == 10) {
                carrierAuto[0].classList = "taken vertical start carrier";
                carrierAuto[1].classList = "taken vertical undefined carrier";
                carrierAuto[2].classList = "taken vertical undefined carrier";
                carrierAuto[3].classList = "taken vertical undefined carrier";
                carrierAuto[4].classList = "taken vertical end carrier";
            }
        }

        // Game Logic for Single Player
        function playGameSingle() {
            if (isGameOver) return;
            if (currentPlayer === "user") {
                turnDisplay.innerHTML = "Your Turn";
                computerSquares.forEach((square) =>
                    square.addEventListener("click", function (e) {
                        shotFired = square.dataset.id;
                        revealSquare(square.classList);
                    })
                );
            }
            if (currentPlayer === "enemy") {
                turnDisplay.innerHTML = "Computer's Turn";
                setTimeout(enemyGo, 350);
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

            if (!obj.includes("boom")) {
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
            if (
                userSquares[square].classList.contains("boom") ||
                userSquares[square].classList.contains("miss")
            ) {
                enemyGo();
            } else {
                if (userSquares[square].classList.contains("taken")) {
                    userSquares[square].classList.add("boom");
                } else {
                    userSquares[square].classList.add("miss");
                }
            }
            currentPlayer = "user";
            turnDisplay.innerHTML = "Your Turn";
        }

        function checkForWins() {
            let enemy = "computer";
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
            playAgain.style.display = "flex";
        }

        playAgain.addEventListener("click", playAgainFxn);

        function playAgainFxn() {
            playAgain.style.display = "none";
            gameContainer.style.display = "none";
            homePage.style.display = "flex";
        }
    },

    gameStart() {
        return this.gameLogic();
    },
};

export { gameLogic };
