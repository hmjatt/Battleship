/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/gameLogic.js":
/*!**********************************!*\
  !*** ./src/modules/gameLogic.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameLogic": () => (/* binding */ gameLogic)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/modules/ships.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _public_images_ship_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../public/images/ship.svg */ "./src/public/images/ship.svg");
//Catche DOM



var gameLogic = {
  gameLogic: function gameLogic() {
    var userGrid = document.querySelector(".grid-user");
    var computerGrid = document.querySelector(".grid-computer");
    var displayGrid = document.querySelector(".grid-display");
    var ships = document.querySelectorAll(".ship");
    var rotateButton = document.querySelector("#rotate");
    var turnDisplay = document.querySelector("#whose-go");
    var infoDisplay = document.querySelector("#info");
    var setupButtons = document.getElementById("setup-buttons");
    var playAgain = document.getElementById("playAgain");
    var gameContainer = document.getElementById("gameContainer");
    var homePage = document.getElementById("homePage");
    var startGameBtn = document.getElementById("startGame");
    var shipImgEle = document.getElementById("imgHomePage");
    var autoPlaceShipsBtn = document.getElementById("autoplaceBtn");
    shipImgEle.src = _public_images_ship_svg__WEBPACK_IMPORTED_MODULE_2__;
    var destroyer = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships("destroyer");
    var submarine = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships("submarine");
    var cruiser = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships("cruiser");
    var battleship = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships("battleship");
    var carrier = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships("carrier");
    var userSquares = [];
    var computerSquares = [];
    var gameMode = "singlePlayer";
    var isHorizontal = true;
    var isGameOver = false;
    var currentPlayer = "user";
    var width = 10;
    var playerNum = 0;
    var ready = false;
    var enemyReady = false;
    var allShipsPlaced = false;
    var shotFired = -1; //startGame

    startGameBtn.addEventListener("click", startSinglePlayer); //Ships

    var shipArray = [{
      name: destroyer.getName(),
      directions: destroyer.getDirections()
    }, {
      name: submarine.getName(),
      directions: submarine.getDirections()
    }, {
      name: cruiser.getName(),
      directions: cruiser.getDirections()
    }, {
      name: battleship.getName(),
      directions: battleship.getDirections()
    }, {
      name: carrier.getName(),
      directions: carrier.getDirections()
    }];
    _gameboard__WEBPACK_IMPORTED_MODULE_1__.gameboard.gameGrid(userGrid, userSquares);
    _gameboard__WEBPACK_IMPORTED_MODULE_1__.gameboard.gameGrid(computerGrid, computerSquares); // Single Player

    function startSinglePlayer() {
      homePage.style.display = "none";
      gameContainer.style.display = "flex";
      generate(shipArray[0]);
      generate(shipArray[1]);
      generate(shipArray[2]);
      generate(shipArray[3]);
      generate(shipArray[4]);
      autoPlaceShipsBtn.addEventListener("click", function () {
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
    } //Draw the computers ships in random locations


    function generate(ship) {
      var randomDirection = Math.floor(Math.random() * ship.directions.length);
      var current = ship.directions[randomDirection];
      var direction;
      if (randomDirection === 0) direction = 1;
      if (randomDirection === 1) direction = 10;
      var randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - ship.directions[0].length * direction));
      var isTaken = current.some(function (index) {
        return computerSquares[randomStart + index].classList.contains("taken");
      });
      var isAtRightEdge = current.some(function (index) {
        return (randomStart + index) % width === width - 1;
      });
      var isAtLeftEdge = current.some(function (index) {
        return (randomStart + index) % width === 0;
      });
      if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(function (index) {
        return computerSquares[randomStart + index].classList.add("taken", ship.name);
      });else generate(ship);
    } //Rotate the ships


    function rotate() {
      if (isHorizontal) {
        destroyer.getElement().classList.toggle("destroyer-container-vertical");
        submarine.getElement().classList.toggle("submarine-container-vertical");
        cruiser.getElement().classList.toggle("cruiser-container-vertical");
        battleship.getElement().classList.toggle("battleship-container-vertical");
        carrier.getElement().classList.toggle("carrier-container-vertical");
        displayGrid.classList.toggle("isHorizontal");
        isHorizontal = false;
        return;
      }

      if (!isHorizontal) {
        destroyer.getElement().classList.toggle("destroyer-container-vertical");
        submarine.getElement().classList.toggle("submarine-container-vertical");
        cruiser.getElement().classList.toggle("cruiser-container-vertical");
        battleship.getElement().classList.toggle("battleship-container-vertical");
        carrier.getElement().classList.toggle("carrier-container-vertical");
        displayGrid.classList.toggle("isHorizontal");
        isHorizontal = true;
        return;
      }
    }

    rotateButton.addEventListener("click", rotate); //move around user ship

    ships.forEach(function (ship) {
      return ship.addEventListener("dragstart", dragStart);
    });
    userSquares.forEach(function (square) {
      return square.addEventListener("dragstart", dragStart);
    });
    userSquares.forEach(function (square) {
      return square.addEventListener("dragover", dragOver);
    });
    userSquares.forEach(function (square) {
      return square.addEventListener("dragenter", dragEnter);
    });
    userSquares.forEach(function (square) {
      return square.addEventListener("dragleave", dragLeave);
    });
    userSquares.forEach(function (square) {
      return square.addEventListener("drop", dragDrop);
    });
    userSquares.forEach(function (square) {
      return square.addEventListener("dragend", dragEnd);
    });
    var selectedShipNameWithIndex;
    var draggedShip;
    var draggedShipLength;
    ships.forEach(function (ship) {
      return ship.addEventListener("mousedown", function (e) {
        selectedShipNameWithIndex = e.target.id;
      });
    });

    function dragStart() {
      draggedShip = this;
      draggedShipLength = this.childNodes.length;

      for (var i = 0; i < draggedShip.childNodes.length; i++) {
        if (draggedShip.childNodes[i].nodeType === 3) {
          draggedShip.childNodes[i].parentNode.removeChild(draggedShip.childNodes[i]);
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
      var shipNameWithLastId = draggedShip.lastChild.id;
      var shipClass = shipNameWithLastId.slice(0, -2);
      var lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
      var shipLastId = lastShipIndex + parseInt(this.dataset.id);
      var notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93];
      var notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60];
      var newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex);
      var newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex);
      var selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));
      shipLastId = shipLastId - selectedShipIndex;

      if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
        for (var i = 0; i < draggedShipLength; i++) {
          var directionClass = void 0;
          if (i === 0) directionClass = "start";
          if (i === draggedShipLength - 1) directionClass = "end";
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add("taken", "horizontal", directionClass, shipClass);
        } //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
        //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.

      } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
        for (var _i = 0; _i < draggedShipLength; _i++) {
          var _directionClass = void 0;

          if (_i === 0) _directionClass = "start";
          if (_i === draggedShipLength - 1) _directionClass = "end";

          userSquares[parseInt(this.dataset.id) - selectedShipIndex + width * _i].classList.add("taken", "vertical", _directionClass, shipClass);
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

    function dragEnd() {// console.log('dragend')
    } //Draw the user's ships in random locations


    function generateUserShips(ship) {
      var randomDirection = Math.floor(Math.random() * ship.directions.length);
      var current = ship.directions[randomDirection];
      var direction;
      if (randomDirection === 0) direction = 1;
      if (randomDirection === 1) direction = 10;
      var randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - ship.directions[0].length * direction));
      var isTaken = current.some(function (index) {
        return userSquares[randomStart + index].classList.contains("taken");
      });
      var isAtRightEdge = current.some(function (index) {
        return (randomStart + index) % width === width - 1;
      });
      var isAtLeftEdge = current.some(function (index) {
        return (randomStart + index) % width === 0;
      });
      if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(function (index) {
        return userSquares[randomStart + index].classList.add("taken", ship.name);
      });else generateUserShips(ship);
    }

    function getShipsOnAutoGenerate() {
      var destroyerAuto = userGrid.getElementsByClassName("taken destroyer");
      var destroyerAutoFirstEle = parseInt(destroyerAuto[0].dataset.id);
      var destroyerAutoSecondEle = parseInt(destroyerAuto[1].dataset.id); // if difference between id is 1 direction = horizontal || if it's 10 direction = vertical

      if (destroyerAutoSecondEle - destroyerAutoFirstEle == 1) {
        destroyerAuto[0].classList = "taken horizontal start destroyer";
        destroyerAuto[1].classList = "taken horizontal end destroyer";
      } else if (destroyerAutoSecondEle - destroyerAutoFirstEle == 10) {
        destroyerAuto[0].classList = "taken vertical start destroyer";
        destroyerAuto[1].classList = "taken vertical end destroyer";
      }

      var cruiserAuto = userGrid.getElementsByClassName("taken cruiser");
      var cruiserAutoFirstEle = parseInt(cruiserAuto[0].dataset.id);
      var cruiserAutoSecondEle = parseInt(cruiserAuto[1].dataset.id);

      if (cruiserAutoSecondEle - cruiserAutoFirstEle == 1) {
        cruiserAuto[0].classList = "taken horizontal start cruiser";
        cruiserAuto[1].classList = "taken horizontal undefined cruiser";
        cruiserAuto[2].classList = "taken horizontal end cruiser";
      } else if (cruiserAutoSecondEle - cruiserAutoFirstEle == 10) {
        cruiserAuto[0].classList = "taken vertical start cruiser";
        cruiserAuto[1].classList = "taken vertical undefined cruiser";
        cruiserAuto[2].classList = "taken vertical end cruiser";
      }

      var submarineAuto = userGrid.getElementsByClassName("taken submarine");
      var submarineAutoFirstEle = parseInt(submarineAuto[0].dataset.id);
      var submarineAutoSecondEle = parseInt(submarineAuto[1].dataset.id);

      if (submarineAutoSecondEle - submarineAutoFirstEle == 1) {
        submarineAuto[0].classList = "taken horizontal start submarine";
        submarineAuto[1].classList = "taken horizontal undefined submarine";
        submarineAuto[2].classList = "taken horizontal end submarine";
      } else if (submarineAutoSecondEle - submarineAutoFirstEle == 10) {
        submarineAuto[0].classList = "taken vertical start submarine";
        submarineAuto[1].classList = "taken vertical undefined submarine";
        submarineAuto[2].classList = "taken vertical end submarine";
      }

      var battleshipAuto = userGrid.getElementsByClassName("taken battleship");
      var battleshipAutoFirstEle = parseInt(battleshipAuto[0].dataset.id);
      var battleshipAutoSecondEle = parseInt(battleshipAuto[1].dataset.id);

      if (battleshipAutoSecondEle - battleshipAutoFirstEle == 1) {
        battleshipAuto[0].classList = "taken horizontal start battleship";
        battleshipAuto[1].classList = "taken horizontal undefined battleship";
        battleshipAuto[2].classList = "taken horizontal undefined battleship";
        battleshipAuto[3].classList = "taken horizontal end battleship";
      } else if (battleshipAutoSecondEle - battleshipAutoFirstEle == 10) {
        battleshipAuto[0].classList = "taken vertical start battleship";
        battleshipAuto[1].classList = "taken vertical undefined battleship";
        battleshipAuto[2].classList = "taken vertical undefined battleship";
        battleshipAuto[3].classList = "taken vertical end battleship";
      }

      var carrierAuto = userGrid.getElementsByClassName("taken carrier");
      var carrierAutoFirstEle = parseInt(carrierAuto[0].dataset.id);
      var carrierAutoSecondEle = parseInt(carrierAuto[1].dataset.id);

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
    } // Game Logic for Single Player


    function playGameSingle() {
      if (isGameOver) return;

      if (currentPlayer === "user") {
        turnDisplay.innerHTML = "Your Turn";
        computerSquares.forEach(function (square) {
          return square.addEventListener("click", function (e) {
            shotFired = square.dataset.id;
            revealSquare(square.classList);
          });
        });
      }

      if (currentPlayer === "enemy") {
        turnDisplay.innerHTML = "Computer's Turn";
        setTimeout(enemyGo, 350);
      }
    }

    var destroyerCount = 0;
    var submarineCount = 0;
    var cruiserCount = 0;
    var battleshipCount = 0;
    var carrierCount = 0;

    function revealSquare(classList) {
      var enemySquare = computerGrid.querySelector("div[data-id='".concat(shotFired, "']"));
      var obj = Object.values(classList);

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

    var cpuDestroyerCount = 0;
    var cpuSubmarineCount = 0;
    var cpuCruiserCount = 0;
    var cpuBattleshipCount = 0;
    var cpuCarrierCount = 0;

    function enemyGo(square) {
      if (gameMode === "singlePlayer") square = Math.floor(Math.random() * userSquares.length);

      if (!userSquares[square].classList.contains("boom")) {
        if (userSquares[square].classList.contains("destroyer")) cpuDestroyerCount++;
        if (userSquares[square].classList.contains("submarine")) cpuSubmarineCount++;
        if (userSquares[square].classList.contains("cruiser")) cpuCruiserCount++;
        if (userSquares[square].classList.contains("battleship")) cpuBattleshipCount++;
        if (userSquares[square].classList.contains("carrier")) cpuCarrierCount++;
        checkForWins();
      }

      if (userSquares[square].classList.contains("boom") || userSquares[square].classList.contains("miss")) {
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
      var enemy = "computer";

      if (destroyerCount === 2) {
        infoDisplay.innerHTML = "You sunk the ".concat(enemy, "'s destroyer");
        destroyerCount = 10;
      }

      if (submarineCount === 3) {
        infoDisplay.innerHTML = "You sunk the ".concat(enemy, "'s submarine");
        submarineCount = 10;
      }

      if (cruiserCount === 3) {
        infoDisplay.innerHTML = "You sunk the ".concat(enemy, "'s cruiser");
        cruiserCount = 10;
      }

      if (battleshipCount === 4) {
        infoDisplay.innerHTML = "You sunk the ".concat(enemy, "'s battleship");
        battleshipCount = 10;
      }

      if (carrierCount === 5) {
        infoDisplay.innerHTML = "You sunk the ".concat(enemy, "'s carrier");
        carrierCount = 10;
      }

      if (cpuDestroyerCount === 2) {
        infoDisplay.innerHTML = "".concat(enemy, " sunk your destroyer");
        cpuDestroyerCount = 10;
      }

      if (cpuSubmarineCount === 3) {
        infoDisplay.innerHTML = "".concat(enemy, " sunk your submarine");
        cpuSubmarineCount = 10;
      }

      if (cpuCruiserCount === 3) {
        infoDisplay.innerHTML = "".concat(enemy, " sunk your cruiser");
        cpuCruiserCount = 10;
      }

      if (cpuBattleshipCount === 4) {
        infoDisplay.innerHTML = "".concat(enemy, " sunk your battleship");
        cpuBattleshipCount = 10;
      }

      if (cpuCarrierCount === 5) {
        infoDisplay.innerHTML = "".concat(enemy, " sunk your carrier");
        cpuCarrierCount = 10;
      }

      if (destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount === 50) {
        turnDisplay.remove();
        infoDisplay.innerHTML = "YOU WON";
        gameOver();
      }

      if (cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount === 50) {
        turnDisplay.remove();
        infoDisplay.innerHTML = "".concat(enemy.toUpperCase(), " WON");
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
  gameStart: function gameStart() {
    return this.gameLogic();
  }
};


/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameboard": () => (/* binding */ gameboard)
/* harmony export */ });
var gridArray = [];
var width = 10;
var gameboard = {
  // width variable representing number of elements in a row in gameGrid() method

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
  gameGrid: function gameGrid(grid, squares) {
    for (var i = 0; i < Math.pow(width, 2); i++) {
      var square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  },
  gridTest: function gridTest() {
    for (var i = 0; i < width * width; i++) {
      gridArray.push(i);
    }

    return gridArray;
  }
};


/***/ }),

/***/ "./src/modules/ships.js":
/*!******************************!*\
  !*** ./src/modules/ships.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "shipModule": () => (/* binding */ shipModule)
/* harmony export */ });
var shipArray = [];
var shipModule = {
  ships: function ships(name) {
    var width = 10;
    var elementoHTML;
    var X;
    var Y; // let name = name;

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

    var getName = function getName() {
      return name;
    };

    var getElement = function getElement() {
      return elementoHTML;
    };

    var getDirections = function getDirections() {
      return [X, Y];
    };

    return {
      getName: getName,
      getElement: getElement,
      getDirections: getDirections
    };
  },
  //
  shipsTestMethod: function shipsTestMethod() {
    // width variable representing numbers of elements in gameboard
    // ships need to spaced out

    /* create shipArray which is array of objects including ship's name,
    length and it's direction are X and Y co-ordinates respectively
    [{
    directions: [[0, 1], [0, 10]],
    name: "destroyer"
    }, {
    directions: [[0, 1, 2], [0, 10, 20]],
    name: "submarine"
    }, {
    directions: [[0, 1, 2], [0, 10, 20]],
    name: "cruiser"
    }, {
    directions: [[0, 1, 2, 3], [0, 10, 20, 30]],
    name: "battleship"
    }, {
    directions: [[0, 1, 2, 3, 4], [0, 10, 20, 30, 40]],
    name: "carrier"
    }]
    */
    shipArray = [{
      directions: [[0, 1], [0, 10]],
      name: "destroyer"
    }, {
      directions: [[0, 1, 2], [0, 10, 20]],
      name: "submarine"
    }, {
      directions: [[0, 1, 2], [0, 10, 20]],
      name: "cruiser"
    }, {
      directions: [[0, 1, 2, 3], [0, 10, 20, 30]],
      name: "battleship"
    }, {
      directions: [[0, 1, 2, 3, 4], [0, 10, 20, 30, 40]],
      name: "carrier"
    }];
    return shipArray;
  }
};


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/public/style/styles.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/public/style/styles.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data:image/svg+xml,%3Csvg width=%2752%27 height=%2726%27 viewBox=%270 0 52 26%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23369af4%27 fill-opacity=%270.21%27%3E%3Cpath d=%27M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z%27 /%3E%3C/g%3E%3C/g%3E%3C/svg%3E */ "data:image/svg+xml,%3Csvg width=%2752%27 height=%2726%27 viewBox=%270 0 52 26%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23369af4%27 fill-opacity=%270.21%27%3E%3Cpath d=%27M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z%27 /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n\t--clr-bkgrnd: #deeefb;\r\n\t--clr-text-fleet: #e6e6e6;\r\n\t--clr-ship-bkgrnd: #474758;\r\n\t--clr-btn-bkgrnd: #b9b4ecd5;\r\n\t--clr-btn-bkgrnd-fcs: #9795aad5;\r\n\t--clr-miss-usergrid: #63a3fb;\r\n\t--clr-hit: #f44b18;\r\n\t--clr-miss: #dddddd;\r\n\t--clr-bg-div: #8ccec3;\r\n\t--clr-bg-computer: #384955;\r\n\t--clr-link-bg: #272626;\r\n\t--clr-link-hvr: #bde2dc;\r\n}\r\n\r\nhtml {\r\n\tscroll-behavior: smooth;\r\n\ttransition: all 0.5s ease;\r\n}\r\n\r\nbody {\r\n\tmargin: 0;\r\n\tpadding: 2%;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n\tbackground-color: var(--clr-bkgrnd);\r\n\tbackground-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n\toverflow-x: hidden;\r\n\ttransition: all 0.5s ease;\r\n}\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n\tfont-family: \"Roboto Mono\", monospace;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n#imgHomePage {\r\n\tmax-width: 40%;\r\n}\r\n\r\n\r\n.home {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-self: center;\r\n\tjustify-content: center;\r\n\theight: 60vh;\r\n\ttext-align: center;\r\n}\r\n\r\n\r\n#gameContainer {\r\n\tdisplay: none;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n}\r\n\r\n.splash-container {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\theight: 66vh;\r\n}\r\n\r\n.splash-title {\r\n\tfont-family: \"Roboto Mono\", monospace;\r\n\tfont-size: 10rem;\r\n}\r\n\r\n.splash-battleship-image {\r\n\tposition: absolute;\r\n\tbottom: 5vh;\r\n\tleft: 20vw;\r\n\twidth: 100%;\r\n\ttransform: rotateY(180deg);\r\n\tpointer-events: none;\r\n\topacity: 0.25;\r\n}\r\n\r\n.btn {\r\n\tfont-size: inherit;\r\n\tbackground-color: var(--clr-btn-bkgrnd);\r\n\tpadding: 0.5em 1em;\r\n\toutline: none;\r\n\tborder: none;\r\n\ttext-decoration: none;\r\n\tcursor: pointer;\r\n\tborder-radius: 0.2em;\r\n\tcolor: #333;\r\n}\r\n\r\n.btn:hover,\r\n.btn:focus {\r\n\tbackground-color: var(--clr-btn-bkgrnd-fcs);\r\n}\r\n\r\n.splash-btn {\r\n\tfont-size: 2rem;\r\n\tmargin-left: 2rem;\r\n}\r\n\r\n.splash-btn:first-child {\r\n\tmargin-left: 0;\r\n}\r\n\r\n.container {\r\n\tdisplay: flex;\r\n\tjustify-content: space-around;\r\n\twidth: 80%;\r\n\tpadding: 2%;\r\n\ttransition: all 0.5s ease;\r\n}\r\n\r\n#user,\r\n#computer {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n}\r\n\r\n#userFleet {\r\n\tmargin-left: 10%;\r\n\tpadding: 2%;\r\n\twidth: 50%;\r\n\tbackground-color: var(--clr-bg-div);\r\n\tborder-radius: 4px;\r\n\ttext-align: center;\r\n}\r\n\r\n#computerFleet {\r\n\tmargin-left: 10%;\r\n\tpadding: 2%;\r\n\twidth: 50%;\r\n\tbackground-color: var(--clr-bg-computer);\r\n\tborder-radius: 4px;\r\n\ttext-align: center;\r\n\tcolor: var(--clr-text-fleet);\r\n}\r\n\r\n.vertical-line {\r\n\tmargin: 2%;\r\n}\r\n\r\n.horizontal-line {\r\n\tdisplay: none;\r\n}\r\n\r\n.battleship-grid {\r\n\tdisplay: grid;\r\n\tbackground-color: var(--clr-bkgrnd);\r\n\tgrid-template-rows: repeat(10, 4vmin);\r\n\tgrid-template-columns: repeat(10, 4vmin);\r\n}\r\n\r\n/* GRID FOR USER */\r\n\r\n.A-user,\r\n.B-user,\r\n.C-user,\r\n.D-user,\r\n.E-user,\r\n.F-user,\r\n.G-user,\r\n.H-user,\r\n.I-user,\r\n.J-user,\r\n.user-1,\r\n.user-2,\r\n.user-3,\r\n.user-4,\r\n.user-5,\r\n.user-6,\r\n.user-7,\r\n.user-8,\r\n.user-9,\r\n.user-10 {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\tjustify-self: center;\r\n\tfont-weight: 900;\r\n\tfont-size: 1.3em;\r\n}\r\n\r\n.blank-user {\r\n\tgrid-area: blank-user;\r\n}\r\n\r\n.A-user {\r\n\tgrid-area: A-user;\r\n}\r\n\r\n.B-user {\r\n\tgrid-area: B-user;\r\n}\r\n\r\n.C-user {\r\n\tgrid-area: C-user;\r\n}\r\n\r\n.D-user {\r\n\tgrid-area: D-user;\r\n}\r\n\r\n.E-user {\r\n\tgrid-area: E-user;\r\n}\r\n\r\n.F-user {\r\n\tgrid-area: F-user;\r\n}\r\n\r\n.G-user {\r\n\tgrid-area: G-user;\r\n}\r\n\r\n.H-user {\r\n\tgrid-area: H-user;\r\n}\r\n\r\n.I-user {\r\n\tgrid-area: I-user;\r\n}\r\n\r\n.J-user {\r\n\tgrid-area: J-user;\r\n}\r\n\r\n.user-1 {\r\n\tgrid-area: user-1;\r\n}\r\n\r\n.user-2 {\r\n\tgrid-area: user-2;\r\n}\r\n\r\n.user-3 {\r\n\tgrid-area: user-3;\r\n}\r\n\r\n.user-4 {\r\n\tgrid-area: user-4;\r\n}\r\n\r\n.user-5 {\r\n\tgrid-area: user-5;\r\n}\r\n\r\n.user-6 {\r\n\tgrid-area: user-6;\r\n}\r\n\r\n.user-7 {\r\n\tgrid-area: user-7;\r\n}\r\n\r\n.user-8 {\r\n\tgrid-area: user-8;\r\n}\r\n\r\n.user-9 {\r\n\tgrid-area: user-9;\r\n}\r\n\r\n.user-10 {\r\n\tgrid-area: user-10;\r\n}\r\n\r\n.grid-user {\r\n\tgrid-area: user-grid;\r\n}\r\n\r\n.user-grid-labels {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: repeat(11, 4vmin);\r\n\tgrid-template-rows: repeat(11, 4vmin);\r\n\tgrid-template-areas:\r\n\t\t\"blank-user A-user B-user C-user D-user E-user F-user G-user H-user I-user J-user\"\r\n\t\t\"user-1 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-2 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-3 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-4 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-5 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-6 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-7 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-8 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-9 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-10 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\";\r\n}\r\n\r\n/* GRID FOR USER */\r\n\r\n/* GRID FOR COMPUTER */\r\n.A-computer,\r\n.B-computer,\r\n.C-computer,\r\n.D-computer,\r\n.E-computer,\r\n.F-computer,\r\n.G-computer,\r\n.H-computer,\r\n.I-computer,\r\n.J-computer,\r\n.computer-1,\r\n.computer-2,\r\n.computer-3,\r\n.computer-4,\r\n.computer-5,\r\n.computer-6,\r\n.computer-7,\r\n.computer-8,\r\n.computer-9,\r\n.computer-10 {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\tjustify-self: center;\r\n\tfont-weight: 900;\r\n\tfont-size: 1.3em;\r\n}\r\n\r\n.blank-computer {\r\n\tgrid-area: blank-computer;\r\n}\r\n\r\n.A-computer {\r\n\tgrid-area: A-computer;\r\n}\r\n\r\n.B-computer {\r\n\tgrid-area: B-computer;\r\n}\r\n\r\n.C-computer {\r\n\tgrid-area: C-computer;\r\n}\r\n\r\n.D-computer {\r\n\tgrid-area: D-computer;\r\n}\r\n\r\n.E-computer {\r\n\tgrid-area: E-computer;\r\n}\r\n\r\n.F-computer {\r\n\tgrid-area: F-computer;\r\n}\r\n\r\n.G-computer {\r\n\tgrid-area: G-computer;\r\n}\r\n\r\n.H-computer {\r\n\tgrid-area: H-computer;\r\n}\r\n\r\n.I-computer {\r\n\tgrid-area: I-computer;\r\n}\r\n\r\n.J-computer {\r\n\tgrid-area: J-computer;\r\n}\r\n\r\n.computer-1 {\r\n\tgrid-area: computer-1;\r\n}\r\n\r\n.computer-2 {\r\n\tgrid-area: computer-2;\r\n}\r\n\r\n.computer-3 {\r\n\tgrid-area: computer-3;\r\n}\r\n\r\n.computer-4 {\r\n\tgrid-area: computer-4;\r\n}\r\n\r\n.computer-5 {\r\n\tgrid-area: computer-5;\r\n}\r\n\r\n.computer-6 {\r\n\tgrid-area: computer-6;\r\n}\r\n\r\n.computer-7 {\r\n\tgrid-area: computer-7;\r\n}\r\n\r\n.computer-8 {\r\n\tgrid-area: computer-8;\r\n}\r\n\r\n.computer-9 {\r\n\tgrid-area: computer-9;\r\n}\r\n\r\n.computer-10 {\r\n\tgrid-area: computer-10;\r\n}\r\n\r\n.grid-computer {\r\n\tgrid-area: computer-grid;\r\n}\r\n\r\n.computer-grid-labels {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: repeat(11, 4vmin);\r\n\tgrid-template-rows: repeat(11, 4vmin);\r\n\tgrid-template-areas:\r\n\t\t\"blank-computer A-computer B-computer C-computer D-computer E-computer F-computer G-computer H-computer I-computer J-computer\"\r\n\t\t\"computer-1 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-2 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-3 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-4 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-5 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-6 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-7 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-8 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-9 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-10 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\";\r\n}\r\n\r\n/* GRID FOR COMPUTER */\r\n\r\n.grid-computer>.taken,\r\n.grid-computer>.boom {\r\n\tbackground-color: var(--clr-bg-computer);\r\n}\r\n\r\n.taken,\r\n.ship {\r\n\tposition: relative;\r\n\tbackground-color: var(--clr-ship-bkgrnd);\r\n}\r\n\r\n.taken.start.vertical,\r\n.taken.start.vertical::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-top-right-radius: 50%;\r\n}\r\n\r\n.taken.end.vertical,\r\n.taken.end.vertical::before {\r\n\tborder-bottom-left-radius: 25%;\r\n\tborder-bottom-right-radius: 25%;\r\n}\r\n\r\n.taken.start.horizontal,\r\n.taken.start.horizontal::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-bottom-left-radius: 50%;\r\n}\r\n\r\n.taken.end.horizontal,\r\n.taken.end.horizontal::before {\r\n\tborder-top-right-radius: 25%;\r\n\tborder-bottom-right-radius: 25%;\r\n}\r\n\r\n.taken.vertical::before,\r\n.taken.horizontal::before {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tborder: 0.3vmin solid var(--clr-ship-bkgrnd);\r\n\ttop: -1px;\r\n\tbottom: -1px;\r\n\tleft: -1px;\r\n\tright: -1px;\r\n}\r\n\r\n.taken.horizontal::before {\r\n\tanimation: ripplesY 3s linear infinite;\r\n\tborder-left: none;\r\n\tborder-right: none;\r\n}\r\n\r\n.taken.vertical::before {\r\n\tanimation: ripplesX 3s linear infinite;\r\n\tborder-top: none;\r\n\tborder-bottom: none;\r\n}\r\n\r\n.grid-user .taken {\r\n\tbackground-color: var(--clr-ship-bkgrnd);\r\n}\r\n\r\n@keyframes ripplesX {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleX(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleX(1.5);\r\n\t}\r\n}\r\n\r\n@keyframes ripplesY {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleY(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleY(1.5);\r\n\t}\r\n}\r\n\r\n.grid-display {\r\n\tdisplay: flex;\r\n}\r\n\r\n.ship>div {\r\n\twidth: 4.6vmin;\r\n\theight: 4.6vmin;\r\n}\r\n\r\n.ship {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tmargin: 1vmin;\r\n\twidth: calc(4.6vmin * var(--width, 1));\r\n\theight: calc(4.6vmin * var(--height, 1));\r\n\tborder-radius: 2.3vmin;\r\n\tborder-bottom-right-radius: 1vmin;\r\n\tborder-top-right-radius: 1vmin;\r\n}\r\n\r\n.destroyer-container-vertical,\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical,\r\n.battleship-container-vertical,\r\n.carrier-container-vertical {\r\n\tborder-radius: 2.3vmin;\r\n\tborder-bottom-right-radius: 1vmin;\r\n\tborder-bottom-left-radius: 1vmin;\r\n}\r\n\r\n.battleship-grid div {\r\n\tmargin: 1px;\r\n\tborder: 1px solid var(--clr-bg-div);\r\n\tbackground-color: var(--clr-bg-div);\r\n\tborder-radius: 5px;\r\n}\r\n\r\n.grid-computer div {\r\n\tmargin: 1px;\r\n\tborder: none;\r\n\tbackground-color: var(--clr-bg-computer);\r\n}\r\n\r\n.destroyer-container {\r\n\t--width: 2;\r\n}\r\n\r\n.destroyer-container-vertical {\r\n\t--height: 2;\r\n\t--width: 1;\r\n}\r\n\r\n.submarine-container,\r\n.cruiser-container {\r\n\t--width: 3;\r\n}\r\n\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical {\r\n\t--height: 3;\r\n\t--width: 1;\r\n}\r\n\r\n.battleship-container {\r\n\t--width: 4;\r\n}\r\n\r\n.battleship-container-vertical {\r\n\t--height: 4;\r\n\t--width: 1;\r\n}\r\n\r\n.carrier-container {\r\n\t--width: 5;\r\n}\r\n\r\n.carrier-container-vertical {\r\n\t--height: 5;\r\n\t--width: 1;\r\n}\r\n\r\n.hidden-info {\r\n\tfont-weight: 500;\r\n\tfont-size: 1.5rem;\r\n\talign-items: center;\r\n\tflex-direction: column;\r\n}\r\n\r\n.setup-btns {\r\n\tdisplay: flex;\r\n}\r\n\r\n.setup-buttons {\r\n\tdisplay: flex;\r\n}\r\n\r\n.hidden-info button {\r\n\tmargin: 2%;\r\n}\r\n\r\n.info-text {\r\n\ttext-align: center;\r\n\tmargin: 1rem;\r\n}\r\n\r\n.miss,\r\n.boom {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n}\r\n\r\n.boom::after,\r\n.miss::after {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tborder-radius: 100%;\r\n\twidth: 2vmin;\r\n\theight: 2vmin;\r\n}\r\n\r\n#user .miss::after {\r\n\tbackground-color: var(--clr-miss-usergrid);\r\n}\r\n\r\n.miss::after {\r\n\tbackground-color: var(--clr-miss);\r\n}\r\n\r\n.boom::after {\r\n\tbackground-color: var(--clr-hit);\r\n}\r\n\r\n.miss::before {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tanimation: hit 0.2s ease-out forwards;\r\n\tborder-radius: 100%;\r\n}\r\n\r\n.boom {\r\n\tanimation: boom 0.2s ease-out forwards;\r\n}\r\n\r\n@keyframes hit {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scale(0);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scale(4);\r\n\t}\r\n}\r\n\r\n@keyframes boom {\r\n\t0% {\r\n\t\tbackground-color: var(--clr-hit);\r\n\t}\r\n\r\n\t100% {\r\n\t\tbackground-color: var(--clr-ship-bkgrnd);\r\n\t}\r\n}\r\n\r\n#playAgain {\r\n\tdisplay: none;\r\n}\r\n\r\n.links {\r\n\twidth: 60%;\r\n\tfont-size: 1.5em;\r\n}\r\n\r\n.links ul {\r\n\tlist-style-type: none;\r\n\tdisplay: flex;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tjustify-content: space-around;\r\n}\r\n\r\nul li {\r\n\tmargin: 0 5% 0 5%;\r\n}\r\n\r\n.links a {\r\n\ttext-decoration: none;\r\n}\r\n\r\n.link-btn{\r\n\tpointer-events: auto;\r\n\tcursor: pointer;\r\n\tbackground: var(--clr-link-hvr);\r\n\tborder: none;\r\n\tpadding: 1.5rem 3rem;\r\n\tmargin: 0;\r\n\tfont-family: inherit;\r\n\tfont-size: inherit;\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.link-btn::before,\r\n.link-btn::after {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n\r\n\r\n.link-swipe {\r\n\ttext-transform: uppercase;\r\n\tletter-spacing: 0.05rem;\r\n\tfont-weight: 700;\r\n\tfont-size: 0.85rem;\r\n\tborder-radius: 0.5rem;\r\n\toverflow: hidden;\r\n\tcolor: rgb(255, 255, 255);\r\n\tbackground: var(--clr-link-hvr);\r\n}\r\n\r\n.link-swipe span {\r\n\tposition: relative;\r\n\tmix-blend-mode: difference;\r\n}\r\n\r\n.link-swipe::before {\r\n\tcontent: '';\r\n\tbackground: var(--clr-link-bg);\r\n\twidth: 130%;\r\n\tleft: -15%;\r\n\ttransform: skew(30deg);\r\n\ttransition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);\r\n}\r\n\r\n.link-swipe:hover::before {\r\n\ttransform: translate3d(100%,0,0);\r\n}\r\n\r\n@media screen and (max-width: 850px) {\r\n\thtml {\r\n\t\ttransition: all 1s ease;\r\n\t}\r\n\r\n\t.container {\r\n\t\tflex-direction: column;\r\n\t\twidth: 100%;\r\n\t\ttransition: all 1s ease;\r\n\t}\r\n\r\n\t.battleship-grid {\r\n\t\tgrid-template-rows: repeat(10, 6vmin);\r\n\t\tgrid-template-columns: repeat(10, 6vmin);\r\n\t}\r\n\r\n\t.user-grid-labels,\r\n\t.computer-grid-labels {\r\n\t\tgrid-template-columns: repeat(11, 6vmin);\r\n\t\tgrid-template-rows: repeat(11, 6vmin);\r\n\t}\r\n\r\n\t.ship {\r\n\t\twidth: calc(6vmin * var(--width, 1));\r\n\t\theight: calc(6vmin * var(--height, 1));\r\n\t\tborder-radius: 3vmin;\r\n\t\tborder-bottom-right-radius: 1vmin;\r\n\t\tborder-top-right-radius: 1vmin;\r\n\t}\r\n\r\n\t.vertical-line {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.horizontal-line {\r\n\t\tdisplay: flex;\r\n\t\tmargin: 4%;\r\n\t}\r\n\r\n\t.boom::after,\r\n\t.miss::after {\r\n\t\twidth: 4vmin;\r\n\t\theight: 4vmin;\r\n\t}\r\n\r\n\t.miss::before {\r\n\t\twidth: 1vmin;\r\n\t\theight: 1vmin;\r\n\t}\r\n\r\n\t#computerFleet,\r\n\t#userFleet {\r\n\t\tmargin-left: 7%;\r\n\t}\r\n\r\n\t.grid-display {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#start, #rotate {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.autoplace {\r\n\t\tmargin-left: 10%;\r\n\t}\r\n}\r\n\r\n@media screen and (max-width: 550px) {\r\n\t.battleship-grid {\r\n\t\tgrid-template-rows: repeat(10, 8vmin);\r\n\t\tgrid-template-columns: repeat(10, 8vmin);\r\n\t}\r\n\r\n\t.user-grid-labels,\r\n\t.computer-grid-labels {\r\n\t\tgrid-template-columns: repeat(11, 8vmin);\r\n\t\tgrid-template-rows: repeat(11, 8vmin);\r\n\t}\r\n\r\n\t.boom::after,\r\n\t.miss::after {\r\n\t\twidth: 4vmin;\r\n\t\theight: 4vmin;\r\n\t}\r\n\r\n\t#play\r\n\r\n\t.setup-buttons {\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t.setup-buttons button {\r\n\t\tmargin: 1%;\r\n\t}\r\n\r\n\t.links {\r\n\t\tmargin: 8%;\r\n\t}\r\n}", "",{"version":3,"sources":["webpack://./src/public/style/styles.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n\t--clr-bkgrnd: #deeefb;\r\n\t--clr-text-fleet: #e6e6e6;\r\n\t--clr-ship-bkgrnd: #474758;\r\n\t--clr-btn-bkgrnd: #b9b4ecd5;\r\n\t--clr-btn-bkgrnd-fcs: #9795aad5;\r\n\t--clr-miss-usergrid: #63a3fb;\r\n\t--clr-hit: #f44b18;\r\n\t--clr-miss: #dddddd;\r\n\t--clr-bg-div: #8ccec3;\r\n\t--clr-bg-computer: #384955;\r\n\t--clr-link-bg: #272626;\r\n\t--clr-link-hvr: #bde2dc;\r\n}\r\n\r\nhtml {\r\n\tscroll-behavior: smooth;\r\n\ttransition: all 0.5s ease;\r\n}\r\n\r\nbody {\r\n\tmargin: 0;\r\n\tpadding: 2%;\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n\tbackground-color: var(--clr-bkgrnd);\r\n\tbackground-image: url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23369af4' fill-opacity='0.21'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");\r\n\toverflow-x: hidden;\r\n\ttransition: all 0.5s ease;\r\n}\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n\tfont-family: \"Roboto Mono\", monospace;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n#imgHomePage {\r\n\tmax-width: 40%;\r\n}\r\n\r\n\r\n.home {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-self: center;\r\n\tjustify-content: center;\r\n\theight: 60vh;\r\n\ttext-align: center;\r\n}\r\n\r\n\r\n#gameContainer {\r\n\tdisplay: none;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n}\r\n\r\n.splash-container {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\theight: 66vh;\r\n}\r\n\r\n.splash-title {\r\n\tfont-family: \"Roboto Mono\", monospace;\r\n\tfont-size: 10rem;\r\n}\r\n\r\n.splash-battleship-image {\r\n\tposition: absolute;\r\n\tbottom: 5vh;\r\n\tleft: 20vw;\r\n\twidth: 100%;\r\n\ttransform: rotateY(180deg);\r\n\tpointer-events: none;\r\n\topacity: 0.25;\r\n}\r\n\r\n.btn {\r\n\tfont-size: inherit;\r\n\tbackground-color: var(--clr-btn-bkgrnd);\r\n\tpadding: 0.5em 1em;\r\n\toutline: none;\r\n\tborder: none;\r\n\ttext-decoration: none;\r\n\tcursor: pointer;\r\n\tborder-radius: 0.2em;\r\n\tcolor: #333;\r\n}\r\n\r\n.btn:hover,\r\n.btn:focus {\r\n\tbackground-color: var(--clr-btn-bkgrnd-fcs);\r\n}\r\n\r\n.splash-btn {\r\n\tfont-size: 2rem;\r\n\tmargin-left: 2rem;\r\n}\r\n\r\n.splash-btn:first-child {\r\n\tmargin-left: 0;\r\n}\r\n\r\n.container {\r\n\tdisplay: flex;\r\n\tjustify-content: space-around;\r\n\twidth: 80%;\r\n\tpadding: 2%;\r\n\ttransition: all 0.5s ease;\r\n}\r\n\r\n#user,\r\n#computer {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\talign-items: center;\r\n}\r\n\r\n#userFleet {\r\n\tmargin-left: 10%;\r\n\tpadding: 2%;\r\n\twidth: 50%;\r\n\tbackground-color: var(--clr-bg-div);\r\n\tborder-radius: 4px;\r\n\ttext-align: center;\r\n}\r\n\r\n#computerFleet {\r\n\tmargin-left: 10%;\r\n\tpadding: 2%;\r\n\twidth: 50%;\r\n\tbackground-color: var(--clr-bg-computer);\r\n\tborder-radius: 4px;\r\n\ttext-align: center;\r\n\tcolor: var(--clr-text-fleet);\r\n}\r\n\r\n.vertical-line {\r\n\tmargin: 2%;\r\n}\r\n\r\n.horizontal-line {\r\n\tdisplay: none;\r\n}\r\n\r\n.battleship-grid {\r\n\tdisplay: grid;\r\n\tbackground-color: var(--clr-bkgrnd);\r\n\tgrid-template-rows: repeat(10, 4vmin);\r\n\tgrid-template-columns: repeat(10, 4vmin);\r\n}\r\n\r\n/* GRID FOR USER */\r\n\r\n.A-user,\r\n.B-user,\r\n.C-user,\r\n.D-user,\r\n.E-user,\r\n.F-user,\r\n.G-user,\r\n.H-user,\r\n.I-user,\r\n.J-user,\r\n.user-1,\r\n.user-2,\r\n.user-3,\r\n.user-4,\r\n.user-5,\r\n.user-6,\r\n.user-7,\r\n.user-8,\r\n.user-9,\r\n.user-10 {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\tjustify-self: center;\r\n\tfont-weight: 900;\r\n\tfont-size: 1.3em;\r\n}\r\n\r\n.blank-user {\r\n\tgrid-area: blank-user;\r\n}\r\n\r\n.A-user {\r\n\tgrid-area: A-user;\r\n}\r\n\r\n.B-user {\r\n\tgrid-area: B-user;\r\n}\r\n\r\n.C-user {\r\n\tgrid-area: C-user;\r\n}\r\n\r\n.D-user {\r\n\tgrid-area: D-user;\r\n}\r\n\r\n.E-user {\r\n\tgrid-area: E-user;\r\n}\r\n\r\n.F-user {\r\n\tgrid-area: F-user;\r\n}\r\n\r\n.G-user {\r\n\tgrid-area: G-user;\r\n}\r\n\r\n.H-user {\r\n\tgrid-area: H-user;\r\n}\r\n\r\n.I-user {\r\n\tgrid-area: I-user;\r\n}\r\n\r\n.J-user {\r\n\tgrid-area: J-user;\r\n}\r\n\r\n.user-1 {\r\n\tgrid-area: user-1;\r\n}\r\n\r\n.user-2 {\r\n\tgrid-area: user-2;\r\n}\r\n\r\n.user-3 {\r\n\tgrid-area: user-3;\r\n}\r\n\r\n.user-4 {\r\n\tgrid-area: user-4;\r\n}\r\n\r\n.user-5 {\r\n\tgrid-area: user-5;\r\n}\r\n\r\n.user-6 {\r\n\tgrid-area: user-6;\r\n}\r\n\r\n.user-7 {\r\n\tgrid-area: user-7;\r\n}\r\n\r\n.user-8 {\r\n\tgrid-area: user-8;\r\n}\r\n\r\n.user-9 {\r\n\tgrid-area: user-9;\r\n}\r\n\r\n.user-10 {\r\n\tgrid-area: user-10;\r\n}\r\n\r\n.grid-user {\r\n\tgrid-area: user-grid;\r\n}\r\n\r\n.user-grid-labels {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: repeat(11, 4vmin);\r\n\tgrid-template-rows: repeat(11, 4vmin);\r\n\tgrid-template-areas:\r\n\t\t\"blank-user A-user B-user C-user D-user E-user F-user G-user H-user I-user J-user\"\r\n\t\t\"user-1 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-2 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-3 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-4 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-5 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-6 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-7 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-8 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-9 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\"\r\n\t\t\"user-10 user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid user-grid\";\r\n}\r\n\r\n/* GRID FOR USER */\r\n\r\n/* GRID FOR COMPUTER */\r\n.A-computer,\r\n.B-computer,\r\n.C-computer,\r\n.D-computer,\r\n.E-computer,\r\n.F-computer,\r\n.G-computer,\r\n.H-computer,\r\n.I-computer,\r\n.J-computer,\r\n.computer-1,\r\n.computer-2,\r\n.computer-3,\r\n.computer-4,\r\n.computer-5,\r\n.computer-6,\r\n.computer-7,\r\n.computer-8,\r\n.computer-9,\r\n.computer-10 {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\tjustify-self: center;\r\n\tfont-weight: 900;\r\n\tfont-size: 1.3em;\r\n}\r\n\r\n.blank-computer {\r\n\tgrid-area: blank-computer;\r\n}\r\n\r\n.A-computer {\r\n\tgrid-area: A-computer;\r\n}\r\n\r\n.B-computer {\r\n\tgrid-area: B-computer;\r\n}\r\n\r\n.C-computer {\r\n\tgrid-area: C-computer;\r\n}\r\n\r\n.D-computer {\r\n\tgrid-area: D-computer;\r\n}\r\n\r\n.E-computer {\r\n\tgrid-area: E-computer;\r\n}\r\n\r\n.F-computer {\r\n\tgrid-area: F-computer;\r\n}\r\n\r\n.G-computer {\r\n\tgrid-area: G-computer;\r\n}\r\n\r\n.H-computer {\r\n\tgrid-area: H-computer;\r\n}\r\n\r\n.I-computer {\r\n\tgrid-area: I-computer;\r\n}\r\n\r\n.J-computer {\r\n\tgrid-area: J-computer;\r\n}\r\n\r\n.computer-1 {\r\n\tgrid-area: computer-1;\r\n}\r\n\r\n.computer-2 {\r\n\tgrid-area: computer-2;\r\n}\r\n\r\n.computer-3 {\r\n\tgrid-area: computer-3;\r\n}\r\n\r\n.computer-4 {\r\n\tgrid-area: computer-4;\r\n}\r\n\r\n.computer-5 {\r\n\tgrid-area: computer-5;\r\n}\r\n\r\n.computer-6 {\r\n\tgrid-area: computer-6;\r\n}\r\n\r\n.computer-7 {\r\n\tgrid-area: computer-7;\r\n}\r\n\r\n.computer-8 {\r\n\tgrid-area: computer-8;\r\n}\r\n\r\n.computer-9 {\r\n\tgrid-area: computer-9;\r\n}\r\n\r\n.computer-10 {\r\n\tgrid-area: computer-10;\r\n}\r\n\r\n.grid-computer {\r\n\tgrid-area: computer-grid;\r\n}\r\n\r\n.computer-grid-labels {\r\n\tdisplay: grid;\r\n\tgrid-template-columns: repeat(11, 4vmin);\r\n\tgrid-template-rows: repeat(11, 4vmin);\r\n\tgrid-template-areas:\r\n\t\t\"blank-computer A-computer B-computer C-computer D-computer E-computer F-computer G-computer H-computer I-computer J-computer\"\r\n\t\t\"computer-1 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-2 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-3 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-4 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-5 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-6 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-7 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-8 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-9 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\"\r\n\t\t\"computer-10 computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid computer-grid\";\r\n}\r\n\r\n/* GRID FOR COMPUTER */\r\n\r\n.grid-computer>.taken,\r\n.grid-computer>.boom {\r\n\tbackground-color: var(--clr-bg-computer);\r\n}\r\n\r\n.taken,\r\n.ship {\r\n\tposition: relative;\r\n\tbackground-color: var(--clr-ship-bkgrnd);\r\n}\r\n\r\n.taken.start.vertical,\r\n.taken.start.vertical::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-top-right-radius: 50%;\r\n}\r\n\r\n.taken.end.vertical,\r\n.taken.end.vertical::before {\r\n\tborder-bottom-left-radius: 25%;\r\n\tborder-bottom-right-radius: 25%;\r\n}\r\n\r\n.taken.start.horizontal,\r\n.taken.start.horizontal::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-bottom-left-radius: 50%;\r\n}\r\n\r\n.taken.end.horizontal,\r\n.taken.end.horizontal::before {\r\n\tborder-top-right-radius: 25%;\r\n\tborder-bottom-right-radius: 25%;\r\n}\r\n\r\n.taken.vertical::before,\r\n.taken.horizontal::before {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tborder: 0.3vmin solid var(--clr-ship-bkgrnd);\r\n\ttop: -1px;\r\n\tbottom: -1px;\r\n\tleft: -1px;\r\n\tright: -1px;\r\n}\r\n\r\n.taken.horizontal::before {\r\n\tanimation: ripplesY 3s linear infinite;\r\n\tborder-left: none;\r\n\tborder-right: none;\r\n}\r\n\r\n.taken.vertical::before {\r\n\tanimation: ripplesX 3s linear infinite;\r\n\tborder-top: none;\r\n\tborder-bottom: none;\r\n}\r\n\r\n.grid-user .taken {\r\n\tbackground-color: var(--clr-ship-bkgrnd);\r\n}\r\n\r\n@keyframes ripplesX {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleX(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleX(1.5);\r\n\t}\r\n}\r\n\r\n@keyframes ripplesY {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleY(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleY(1.5);\r\n\t}\r\n}\r\n\r\n.grid-display {\r\n\tdisplay: flex;\r\n}\r\n\r\n.ship>div {\r\n\twidth: 4.6vmin;\r\n\theight: 4.6vmin;\r\n}\r\n\r\n.ship {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tmargin: 1vmin;\r\n\twidth: calc(4.6vmin * var(--width, 1));\r\n\theight: calc(4.6vmin * var(--height, 1));\r\n\tborder-radius: 2.3vmin;\r\n\tborder-bottom-right-radius: 1vmin;\r\n\tborder-top-right-radius: 1vmin;\r\n}\r\n\r\n.destroyer-container-vertical,\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical,\r\n.battleship-container-vertical,\r\n.carrier-container-vertical {\r\n\tborder-radius: 2.3vmin;\r\n\tborder-bottom-right-radius: 1vmin;\r\n\tborder-bottom-left-radius: 1vmin;\r\n}\r\n\r\n.battleship-grid div {\r\n\tmargin: 1px;\r\n\tborder: 1px solid var(--clr-bg-div);\r\n\tbackground-color: var(--clr-bg-div);\r\n\tborder-radius: 5px;\r\n}\r\n\r\n.grid-computer div {\r\n\tmargin: 1px;\r\n\tborder: none;\r\n\tbackground-color: var(--clr-bg-computer);\r\n}\r\n\r\n.destroyer-container {\r\n\t--width: 2;\r\n}\r\n\r\n.destroyer-container-vertical {\r\n\t--height: 2;\r\n\t--width: 1;\r\n}\r\n\r\n.submarine-container,\r\n.cruiser-container {\r\n\t--width: 3;\r\n}\r\n\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical {\r\n\t--height: 3;\r\n\t--width: 1;\r\n}\r\n\r\n.battleship-container {\r\n\t--width: 4;\r\n}\r\n\r\n.battleship-container-vertical {\r\n\t--height: 4;\r\n\t--width: 1;\r\n}\r\n\r\n.carrier-container {\r\n\t--width: 5;\r\n}\r\n\r\n.carrier-container-vertical {\r\n\t--height: 5;\r\n\t--width: 1;\r\n}\r\n\r\n.hidden-info {\r\n\tfont-weight: 500;\r\n\tfont-size: 1.5rem;\r\n\talign-items: center;\r\n\tflex-direction: column;\r\n}\r\n\r\n.setup-btns {\r\n\tdisplay: flex;\r\n}\r\n\r\n.setup-buttons {\r\n\tdisplay: flex;\r\n}\r\n\r\n.hidden-info button {\r\n\tmargin: 2%;\r\n}\r\n\r\n.info-text {\r\n\ttext-align: center;\r\n\tmargin: 1rem;\r\n}\r\n\r\n.miss,\r\n.boom {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n}\r\n\r\n.boom::after,\r\n.miss::after {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tborder-radius: 100%;\r\n\twidth: 2vmin;\r\n\theight: 2vmin;\r\n}\r\n\r\n#user .miss::after {\r\n\tbackground-color: var(--clr-miss-usergrid);\r\n}\r\n\r\n.miss::after {\r\n\tbackground-color: var(--clr-miss);\r\n}\r\n\r\n.boom::after {\r\n\tbackground-color: var(--clr-hit);\r\n}\r\n\r\n.miss::before {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tanimation: hit 0.2s ease-out forwards;\r\n\tborder-radius: 100%;\r\n}\r\n\r\n.boom {\r\n\tanimation: boom 0.2s ease-out forwards;\r\n}\r\n\r\n@keyframes hit {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scale(0);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scale(4);\r\n\t}\r\n}\r\n\r\n@keyframes boom {\r\n\t0% {\r\n\t\tbackground-color: var(--clr-hit);\r\n\t}\r\n\r\n\t100% {\r\n\t\tbackground-color: var(--clr-ship-bkgrnd);\r\n\t}\r\n}\r\n\r\n#playAgain {\r\n\tdisplay: none;\r\n}\r\n\r\n.links {\r\n\twidth: 60%;\r\n\tfont-size: 1.5em;\r\n}\r\n\r\n.links ul {\r\n\tlist-style-type: none;\r\n\tdisplay: flex;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tjustify-content: space-around;\r\n}\r\n\r\nul li {\r\n\tmargin: 0 5% 0 5%;\r\n}\r\n\r\n.links a {\r\n\ttext-decoration: none;\r\n}\r\n\r\n.link-btn{\r\n\tpointer-events: auto;\r\n\tcursor: pointer;\r\n\tbackground: var(--clr-link-hvr);\r\n\tborder: none;\r\n\tpadding: 1.5rem 3rem;\r\n\tmargin: 0;\r\n\tfont-family: inherit;\r\n\tfont-size: inherit;\r\n\tposition: relative;\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.link-btn::before,\r\n.link-btn::after {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n}\r\n\r\n\r\n.link-swipe {\r\n\ttext-transform: uppercase;\r\n\tletter-spacing: 0.05rem;\r\n\tfont-weight: 700;\r\n\tfont-size: 0.85rem;\r\n\tborder-radius: 0.5rem;\r\n\toverflow: hidden;\r\n\tcolor: rgb(255, 255, 255);\r\n\tbackground: var(--clr-link-hvr);\r\n}\r\n\r\n.link-swipe span {\r\n\tposition: relative;\r\n\tmix-blend-mode: difference;\r\n}\r\n\r\n.link-swipe::before {\r\n\tcontent: '';\r\n\tbackground: var(--clr-link-bg);\r\n\twidth: 130%;\r\n\tleft: -15%;\r\n\ttransform: skew(30deg);\r\n\ttransition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);\r\n}\r\n\r\n.link-swipe:hover::before {\r\n\ttransform: translate3d(100%,0,0);\r\n}\r\n\r\n@media screen and (max-width: 850px) {\r\n\thtml {\r\n\t\ttransition: all 1s ease;\r\n\t}\r\n\r\n\t.container {\r\n\t\tflex-direction: column;\r\n\t\twidth: 100%;\r\n\t\ttransition: all 1s ease;\r\n\t}\r\n\r\n\t.battleship-grid {\r\n\t\tgrid-template-rows: repeat(10, 6vmin);\r\n\t\tgrid-template-columns: repeat(10, 6vmin);\r\n\t}\r\n\r\n\t.user-grid-labels,\r\n\t.computer-grid-labels {\r\n\t\tgrid-template-columns: repeat(11, 6vmin);\r\n\t\tgrid-template-rows: repeat(11, 6vmin);\r\n\t}\r\n\r\n\t.ship {\r\n\t\twidth: calc(6vmin * var(--width, 1));\r\n\t\theight: calc(6vmin * var(--height, 1));\r\n\t\tborder-radius: 3vmin;\r\n\t\tborder-bottom-right-radius: 1vmin;\r\n\t\tborder-top-right-radius: 1vmin;\r\n\t}\r\n\r\n\t.vertical-line {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.horizontal-line {\r\n\t\tdisplay: flex;\r\n\t\tmargin: 4%;\r\n\t}\r\n\r\n\t.boom::after,\r\n\t.miss::after {\r\n\t\twidth: 4vmin;\r\n\t\theight: 4vmin;\r\n\t}\r\n\r\n\t.miss::before {\r\n\t\twidth: 1vmin;\r\n\t\theight: 1vmin;\r\n\t}\r\n\r\n\t#computerFleet,\r\n\t#userFleet {\r\n\t\tmargin-left: 7%;\r\n\t}\r\n\r\n\t.grid-display {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t#start, #rotate {\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.autoplace {\r\n\t\tmargin-left: 10%;\r\n\t}\r\n}\r\n\r\n@media screen and (max-width: 550px) {\r\n\t.battleship-grid {\r\n\t\tgrid-template-rows: repeat(10, 8vmin);\r\n\t\tgrid-template-columns: repeat(10, 8vmin);\r\n\t}\r\n\r\n\t.user-grid-labels,\r\n\t.computer-grid-labels {\r\n\t\tgrid-template-columns: repeat(11, 8vmin);\r\n\t\tgrid-template-rows: repeat(11, 8vmin);\r\n\t}\r\n\r\n\t.boom::after,\r\n\t.miss::after {\r\n\t\twidth: 4vmin;\r\n\t\theight: 4vmin;\r\n\t}\r\n\r\n\t#play\r\n\r\n\t.setup-buttons {\r\n\t\tflex-direction: column;\r\n\t}\r\n\r\n\t.setup-buttons button {\r\n\t\tmargin: 1%;\r\n\t}\r\n\r\n\t.links {\r\n\t\tmargin: 8%;\r\n\t}\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/public/style/styles.css":
/*!*************************************!*\
  !*** ./src/public/style/styles.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/public/style/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "data:image/svg+xml,%3Csvg width=%2752%27 height=%2726%27 viewBox=%270 0 52 26%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23369af4%27 fill-opacity=%270.21%27%3E%3Cpath d=%27M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z%27 /%3E%3C/g%3E%3C/g%3E%3C/svg%3E":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml,%3Csvg width=%2752%27 height=%2726%27 viewBox=%270 0 52 26%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23369af4%27 fill-opacity=%270.21%27%3E%3Cpath d=%27M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z%27 /%3E%3C/g%3E%3C/g%3E%3C/svg%3E ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3Csvg width=%2752%27 height=%2726%27 viewBox=%270 0 52 26%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23369af4%27 fill-opacity=%270.21%27%3E%3Cpath d=%27M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z%27 /%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

/***/ }),

/***/ "./src/public/images/ship.svg":
/*!************************************!*\
  !*** ./src/public/images/ship.svg ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ship.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/public/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/styles.css */ "./src/public/style/styles.css");
/* harmony import */ var _modules_gameLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/gameLogic */ "./src/modules/gameLogic.js");


document.addEventListener("DOMContentLoaded", _modules_gameLogic__WEBPACK_IMPORTED_MODULE_1__.gameLogic);
_modules_gameLogic__WEBPACK_IMPORTED_MODULE_1__.gameLogic.gameStart();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map