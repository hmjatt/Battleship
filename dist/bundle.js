/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOMInterface.js":
/*!*************************************!*\
  !*** ./src/modules/DOMInterface.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMInterface": () => (/* binding */ DOMInterface)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/modules/ships.js");
//Catche DOM

console.log("it works before separating modules");
var DOMInterface = {
  gameLogic: function gameLogic() {
    var userGrid = document.querySelector(".grid-user");
    var computerGrid = document.querySelector(".grid-computer");
    var displayGrid = document.querySelector(".grid-display");
    var ships = document.querySelectorAll(".ship"); // const destroyer = document.querySelector(".destroyer-container");
    // const submarine = document.querySelector(".submarine-container");
    // const cruiser = document.querySelector(".cruiser-container");
    // const battleship = document.querySelector(".battleship-container");
    // const carrier = document.querySelector(".carrier-container");

    var destroyer = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships('destroyer');
    var submarine = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships('submarine');
    var cruiser = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships('cruiser');
    var battleship = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships('battleship');
    var carrier = _ships__WEBPACK_IMPORTED_MODULE_0__.shipModule.ships('carrier');
    var startButton = document.querySelector("#start");
    var rotateButton = document.querySelector("#rotate");
    var turnDisplay = document.querySelector("#whose-go");
    var infoDisplay = document.querySelector("#info");
    var setupButtons = document.getElementById("setup-buttons");
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
    var shotFired = -1; // const shipArray = [];
    //Ships
    // console.log (ships.ships().getDirections)

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
    createBoard(userGrid, userSquares);
    createBoard(computerGrid, computerSquares); // Select Player Mode

    startSinglePlayer(); // Single Player

    function startSinglePlayer() {
      generate(shipArray[0]);
      generate(shipArray[1]);
      generate(shipArray[2]);
      generate(shipArray[3]);
      generate(shipArray[4]);
      startButton.addEventListener("click", function () {
        setupButtons.style.display = "none";
        playGameSingle();
      });
    } //Create Board


    function createBoard(grid, squares) {
      for (var i = 0; i < width * width; i++) {
        var square = document.createElement("div");
        square.dataset.id = i;
        grid.appendChild(square);
        squares.push(square);
      }
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
        destroyer.getElement().classList.toggle('destroyer-container-vertical');
        submarine.getElement().classList.toggle('submarine-container-vertical');
        cruiser.getElement().classList.toggle('cruiser-container-vertical');
        battleship.getElement().classList.toggle('battleship-container-vertical');
        carrier.getElement().classList.toggle('carrier-container-vertical');
        displayGrid.classList.toggle('isHorizontal');
        isHorizontal = false; // console.log(isHorizontal)

        return;
      }

      if (!isHorizontal) {
        destroyer.getElement().classList.toggle('destroyer-container-vertical');
        submarine.getElement().classList.toggle('submarine-container-vertical');
        cruiser.getElement().classList.toggle('cruiser-container-vertical');
        battleship.getElement().classList.toggle('battleship-container-vertical');
        carrier.getElement().classList.toggle('carrier-container-vertical');
        displayGrid.classList.toggle('isHorizontal');
        isHorizontal = true; // console.log(isHorizontal)

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
        selectedShipNameWithIndex = e.target.id; // console.log(selectedShipNameWithIndex)
      });
    });

    function dragStart() {
      draggedShip = this;
      draggedShipLength = this.childNodes.length;

      for (var i = 0; i < draggedShip.childNodes.length; i++) {
        if (draggedShip.childNodes[i].nodeType === 3) {
          draggedShip.childNodes[i].parentNode.removeChild(draggedShip.childNodes[i]);
        }
      } // console.log(draggedShip.lastChild.id);


      draggedShipLength = draggedShip.childNodes.length;
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function dragEnter(e) {
      e.preventDefault();
    }

    function dragLeave() {// console.log('drag leave')
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
      shipLastId = shipLastId - selectedShipIndex; // console.log(shipLastId)

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
    }

    function dragEnd() {// console.log('dragend')
    } // Game Logic for Single Player


    function playGameSingle() {
      if (isGameOver) return;

      if (currentPlayer === "user") {
        turnDisplay.innerHTML = "Your Go";
        computerSquares.forEach(function (square) {
          return square.addEventListener("click", function (e) {
            shotFired = square.dataset.id;
            revealSquare(square.classList);
            console.log(shotFired);
          });
        });
      }

      if (currentPlayer === "enemy") {
        turnDisplay.innerHTML = "Computers Go";
        setTimeout(enemyGo, 200);
      }
    }

    var destroyerCount = 0;
    var submarineCount = 0;
    var cruiserCount = 0;
    var battleshipCount = 0;
    var carrierCount = 0;

    function revealSquare(classList) {
      var enemySquare = computerGrid.querySelector("div[data-id='".concat(shotFired, "']"));
      var obj = Object.values(classList); // if (
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
        // const hit = userSquares[square].classList.contains("taken");
        // userSquares[square].classList.add(hit ? "boom" : "miss");
        if (userSquares[square].classList.contains("destroyer")) cpuDestroyerCount++;
        if (userSquares[square].classList.contains("submarine")) cpuSubmarineCount++;
        if (userSquares[square].classList.contains("cruiser")) cpuCruiserCount++;
        if (userSquares[square].classList.contains("battleship")) cpuBattleshipCount++;
        if (userSquares[square].classList.contains("carrier")) cpuCarrierCount++;
        checkForWins();
      } // else if (gameMode === "singlePlayer") enemyGo();


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
      var enemy = "computer"; // if (gameMode === "multiPlayer") enemy = "enemy";

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
      startButton.removeEventListener("click", playGameSingle);
    }
  },
  gameStart: function gameStart() {
    return this.gameLogic();
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
  shipsTestObject: function shipsTestObject() {
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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\r\n    margin: 0;\r\n    background-color: #f3f3f3;\r\n    overflow-x: hidden;\r\n}\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n    font-family: 'Roboto Mono', monospace;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.splash-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height: 66vh;\r\n}\r\n\r\n.splash-title {\r\n    font-family: 'Roboto Mono', monospace;\r\n    font-size: 10rem;\r\n}\r\n\r\n.splash-battleship-image {\r\n    position: absolute;\r\n    bottom: 5vh;\r\n    left: 20vw;\r\n    width: 100%;\r\n    transform: rotateY(180deg);\r\n    pointer-events: none;\r\n    opacity: 0.25;\r\n}\r\n\r\n.btn {\r\n    font-size: inherit;\r\n    background-color: hsl(30, 100%, 50%);\r\n    padding: 0.5em 1em;\r\n    outline: none;\r\n    border: none;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n    border-radius: 0.2em;\r\n    color: #333;\r\n}\r\n\r\n.btn:hover,\r\n.btn:focus {\r\n    background-color: hsl(30, 100%, 40%);\r\n}\r\n\r\n.splash-btn {\r\n    font-size: 2rem;\r\n    margin-left: 2rem;\r\n}\r\n\r\n.splash-btn:first-child {\r\n    margin-left: 0;\r\n}\r\n\r\n.container {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 100%;\r\n}\r\n\r\n.battleship-grid {\r\n    margin: 2vmin;\r\n    display: grid;\r\n    background-color: hsl(200, 100%, 50%);\r\n    grid-template-rows: repeat(10, 4.6vmin);\r\n    grid-template-columns: repeat(10, 4.6vmin);\r\n}\r\n\r\n.grid-computer > .taken,\r\n.grid-computer > .boom {\r\n    background-color: hsl(200, 100%, 50%) !important;\r\n    border-radius: 0 !important;\r\n}\r\n\r\n.taken,\r\n.ship {\r\n    position: relative;\r\n    background-color: hsl(0, 0%, 80%);\r\n}\r\n\r\n.taken.start.vertical,\r\n.taken.start.vertical::before {\r\n    border-top-left-radius: 50%;\r\n    border-top-right-radius: 50%;\r\n}\r\n\r\n.taken.end.vertical,\r\n.taken.end.vertical::before {\r\n    border-bottom-left-radius: 50%;\r\n    border-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.start.horizontal,\r\n.taken.start.horizontal::before {\r\n    border-top-left-radius: 50%;\r\n    border-bottom-left-radius: 50%;\r\n}\r\n\r\n.taken.end.horizontal,\r\n.taken.end.horizontal::before {\r\n    border-top-right-radius: 50%;\r\n    border-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.vertical::before,\r\n.taken.horizontal::before {\r\n    content: \"\";\r\n    position: absolute;\r\n    border: 0.3vmin solid white;\r\n    top: -1px;\r\n    bottom: -1px;\r\n    left: -1px;\r\n    right: -1px;\r\n}\r\n\r\n.taken.horizontal::before {\r\n    animation: ripplesY 3s linear infinite;\r\n    border-left: none;\r\n    border-right: none;\r\n}\r\n\r\n.taken.vertical::before {\r\n    animation: ripplesX 3s linear infinite;\r\n    border-top: none;\r\n    border-bottom: none;\r\n}\r\n\r\n@keyframes ripplesX {\r\n    0% {\r\n        opacity: 1;\r\n        transform: scaleX(1);\r\n    }\r\n\r\n    100% {\r\n        opacity: 0;\r\n        transform: scaleX(1.5);\r\n    }\r\n}\r\n\r\n@keyframes ripplesY {\r\n    0% {\r\n        opacity: 1;\r\n        transform: scaleY(1);\r\n    }\r\n\r\n    100% {\r\n        opacity: 0;\r\n        transform: scaleY(1.5);\r\n    }\r\n}\r\n\r\n.grid-display {\r\n    display: flex;\r\n}\r\n\r\n.ship > div {\r\n    width: 4.6vmin;\r\n    height: 4.6vmin;\r\n}\r\n\r\n.ship {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    margin: 1vmin;\r\n    width: calc(4.6vmin * var(--width, 1));\r\n    height: calc(4.6vmin * var(--height, 1));\r\n    border-radius: 2.3vmin;\r\n}\r\n\r\n.battleship-grid div {\r\n    border: 1px solid hsla(0, 0%, 100%, 0.2);\r\n}\r\n\r\n.destroyer-container {\r\n    --width: 2;\r\n}\r\n\r\n.destroyer-container-vertical {\r\n    --height: 2;\r\n    --width: 1;\r\n}\r\n\r\n.submarine-container,\r\n.cruiser-container {\r\n    --width: 3;\r\n}\r\n\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical {\r\n    --height: 3;\r\n    --width: 1;\r\n}\r\n\r\n.battleship-container {\r\n    --width: 4;\r\n}\r\n\r\n.battleship-container-vertical {\r\n    --height: 4;\r\n    --width: 1;\r\n}\r\n\r\n.carrier-container {\r\n    --width: 5;\r\n}\r\n\r\n.carrier-container-vertical {\r\n    --height: 5;\r\n    --width: 1;\r\n}\r\n\r\n.hidden-info {\r\n    font-size: 1.5rem;\r\n    align-items: center;\r\n    flex-direction: column;\r\n}\r\n\r\n.info-text {\r\n    margin: 1rem;\r\n}\r\n\r\n.miss,\r\n.boom {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.boom::after,\r\n.miss::after {\r\n    content: \"\";\r\n    position: absolute;\r\n    border-radius: 100%;\r\n    width: 2vmin;\r\n    height: 2vmin;\r\n}\r\n\r\n.miss::after {\r\n    background-color: white;\r\n}\r\n\r\n.boom::after {\r\n    background-color: red;\r\n}\r\n\r\n.miss::before {\r\n    content: \"\";\r\n    position: absolute;\r\n    animation: hit 0.2s ease-out forwards;\r\n    border: 1vmin solid white;\r\n    border-radius: 100%;\r\n    width: 2vmin;\r\n    height: 2vmin;\r\n}\r\n\r\n.boom {\r\n    animation: boom 0.2s ease-out forwards;\r\n}\r\n\r\n@keyframes hit {\r\n    0% {\r\n        opacity: 1;\r\n        transform: scale(0);\r\n    }\r\n\r\n    100% {\r\n        opacity: 0;\r\n        transform: scale(4);\r\n    }\r\n}\r\n\r\n@keyframes boom {\r\n    0% {\r\n        background-color: red;\r\n    }\r\n\r\n    100% {\r\n        background-color: hsl(0, 0%, 80%);\r\n    }\r\n}\r\n\r\n.player {\r\n    margin: 2vmin;\r\n}\r\n\r\n.connected,\r\n.ready {\r\n    font-weight: normal;\r\n    opacity: 0.25;\r\n    text-decoration: line-through;\r\n}\r\n\r\n.connected.active,\r\n.ready.active {\r\n    opacity: 1;\r\n    text-decoration: none;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/public/style/styles.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,yBAAyB;IACzB,kBAAkB;AACtB;;AAEA;;;IAGI,qCAAqC;IACrC,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;AAChB;;AAEA;IACI,qCAAqC;IACrC,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,WAAW;IACX,UAAU;IACV,WAAW;IACX,0BAA0B;IAC1B,oBAAoB;IACpB,aAAa;AACjB;;AAEA;IACI,kBAAkB;IAClB,oCAAoC;IACpC,kBAAkB;IAClB,aAAa;IACb,YAAY;IACZ,qBAAqB;IACrB,eAAe;IACf,oBAAoB;IACpB,WAAW;AACf;;AAEA;;IAEI,oCAAoC;AACxC;;AAEA;IACI,eAAe;IACf,iBAAiB;AACrB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,WAAW;AACf;;AAEA;IACI,aAAa;IACb,aAAa;IACb,qCAAqC;IACrC,uCAAuC;IACvC,0CAA0C;AAC9C;;AAEA;;IAEI,gDAAgD;IAChD,2BAA2B;AAC/B;;AAEA;;IAEI,kBAAkB;IAClB,iCAAiC;AACrC;;AAEA;;IAEI,2BAA2B;IAC3B,4BAA4B;AAChC;;AAEA;;IAEI,8BAA8B;IAC9B,+BAA+B;AACnC;;AAEA;;IAEI,2BAA2B;IAC3B,8BAA8B;AAClC;;AAEA;;IAEI,4BAA4B;IAC5B,+BAA+B;AACnC;;AAEA;;IAEI,WAAW;IACX,kBAAkB;IAClB,2BAA2B;IAC3B,SAAS;IACT,YAAY;IACZ,UAAU;IACV,WAAW;AACf;;AAEA;IACI,sCAAsC;IACtC,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,sCAAsC;IACtC,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI;QACI,UAAU;QACV,oBAAoB;IACxB;;IAEA;QACI,UAAU;QACV,sBAAsB;IAC1B;AACJ;;AAEA;IACI;QACI,UAAU;QACV,oBAAoB;IACxB;;IAEA;QACI,UAAU;QACV,sBAAsB;IAC1B;AACJ;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,cAAc;IACd,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,eAAe;IACf,aAAa;IACb,sCAAsC;IACtC,wCAAwC;IACxC,sBAAsB;AAC1B;;AAEA;IACI,wCAAwC;AAC5C;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,WAAW;IACX,UAAU;AACd;;AAEA;;IAEI,UAAU;AACd;;AAEA;;IAEI,WAAW;IACX,UAAU;AACd;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,WAAW;IACX,UAAU;AACd;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,WAAW;IACX,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;IACI,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;;IAEI,WAAW;IACX,kBAAkB;IAClB,mBAAmB;IACnB,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,uBAAuB;AAC3B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,WAAW;IACX,kBAAkB;IAClB,qCAAqC;IACrC,yBAAyB;IACzB,mBAAmB;IACnB,YAAY;IACZ,aAAa;AACjB;;AAEA;IACI,sCAAsC;AAC1C;;AAEA;IACI;QACI,UAAU;QACV,mBAAmB;IACvB;;IAEA;QACI,UAAU;QACV,mBAAmB;IACvB;AACJ;;AAEA;IACI;QACI,qBAAqB;IACzB;;IAEA;QACI,iCAAiC;IACrC;AACJ;;AAEA;IACI,aAAa;AACjB;;AAEA;;IAEI,mBAAmB;IACnB,aAAa;IACb,6BAA6B;AACjC;;AAEA;;IAEI,UAAU;IACV,qBAAqB;AACzB","sourcesContent":["body {\r\n    margin: 0;\r\n    background-color: #f3f3f3;\r\n    overflow-x: hidden;\r\n}\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n    font-family: 'Roboto Mono', monospace;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.splash-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height: 66vh;\r\n}\r\n\r\n.splash-title {\r\n    font-family: 'Roboto Mono', monospace;\r\n    font-size: 10rem;\r\n}\r\n\r\n.splash-battleship-image {\r\n    position: absolute;\r\n    bottom: 5vh;\r\n    left: 20vw;\r\n    width: 100%;\r\n    transform: rotateY(180deg);\r\n    pointer-events: none;\r\n    opacity: 0.25;\r\n}\r\n\r\n.btn {\r\n    font-size: inherit;\r\n    background-color: hsl(30, 100%, 50%);\r\n    padding: 0.5em 1em;\r\n    outline: none;\r\n    border: none;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n    border-radius: 0.2em;\r\n    color: #333;\r\n}\r\n\r\n.btn:hover,\r\n.btn:focus {\r\n    background-color: hsl(30, 100%, 40%);\r\n}\r\n\r\n.splash-btn {\r\n    font-size: 2rem;\r\n    margin-left: 2rem;\r\n}\r\n\r\n.splash-btn:first-child {\r\n    margin-left: 0;\r\n}\r\n\r\n.container {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 100%;\r\n}\r\n\r\n.battleship-grid {\r\n    margin: 2vmin;\r\n    display: grid;\r\n    background-color: hsl(200, 100%, 50%);\r\n    grid-template-rows: repeat(10, 4.6vmin);\r\n    grid-template-columns: repeat(10, 4.6vmin);\r\n}\r\n\r\n.grid-computer > .taken,\r\n.grid-computer > .boom {\r\n    background-color: hsl(200, 100%, 50%) !important;\r\n    border-radius: 0 !important;\r\n}\r\n\r\n.taken,\r\n.ship {\r\n    position: relative;\r\n    background-color: hsl(0, 0%, 80%);\r\n}\r\n\r\n.taken.start.vertical,\r\n.taken.start.vertical::before {\r\n    border-top-left-radius: 50%;\r\n    border-top-right-radius: 50%;\r\n}\r\n\r\n.taken.end.vertical,\r\n.taken.end.vertical::before {\r\n    border-bottom-left-radius: 50%;\r\n    border-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.start.horizontal,\r\n.taken.start.horizontal::before {\r\n    border-top-left-radius: 50%;\r\n    border-bottom-left-radius: 50%;\r\n}\r\n\r\n.taken.end.horizontal,\r\n.taken.end.horizontal::before {\r\n    border-top-right-radius: 50%;\r\n    border-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.vertical::before,\r\n.taken.horizontal::before {\r\n    content: \"\";\r\n    position: absolute;\r\n    border: 0.3vmin solid white;\r\n    top: -1px;\r\n    bottom: -1px;\r\n    left: -1px;\r\n    right: -1px;\r\n}\r\n\r\n.taken.horizontal::before {\r\n    animation: ripplesY 3s linear infinite;\r\n    border-left: none;\r\n    border-right: none;\r\n}\r\n\r\n.taken.vertical::before {\r\n    animation: ripplesX 3s linear infinite;\r\n    border-top: none;\r\n    border-bottom: none;\r\n}\r\n\r\n@keyframes ripplesX {\r\n    0% {\r\n        opacity: 1;\r\n        transform: scaleX(1);\r\n    }\r\n\r\n    100% {\r\n        opacity: 0;\r\n        transform: scaleX(1.5);\r\n    }\r\n}\r\n\r\n@keyframes ripplesY {\r\n    0% {\r\n        opacity: 1;\r\n        transform: scaleY(1);\r\n    }\r\n\r\n    100% {\r\n        opacity: 0;\r\n        transform: scaleY(1.5);\r\n    }\r\n}\r\n\r\n.grid-display {\r\n    display: flex;\r\n}\r\n\r\n.ship > div {\r\n    width: 4.6vmin;\r\n    height: 4.6vmin;\r\n}\r\n\r\n.ship {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    margin: 1vmin;\r\n    width: calc(4.6vmin * var(--width, 1));\r\n    height: calc(4.6vmin * var(--height, 1));\r\n    border-radius: 2.3vmin;\r\n}\r\n\r\n.battleship-grid div {\r\n    border: 1px solid hsla(0, 0%, 100%, 0.2);\r\n}\r\n\r\n.destroyer-container {\r\n    --width: 2;\r\n}\r\n\r\n.destroyer-container-vertical {\r\n    --height: 2;\r\n    --width: 1;\r\n}\r\n\r\n.submarine-container,\r\n.cruiser-container {\r\n    --width: 3;\r\n}\r\n\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical {\r\n    --height: 3;\r\n    --width: 1;\r\n}\r\n\r\n.battleship-container {\r\n    --width: 4;\r\n}\r\n\r\n.battleship-container-vertical {\r\n    --height: 4;\r\n    --width: 1;\r\n}\r\n\r\n.carrier-container {\r\n    --width: 5;\r\n}\r\n\r\n.carrier-container-vertical {\r\n    --height: 5;\r\n    --width: 1;\r\n}\r\n\r\n.hidden-info {\r\n    font-size: 1.5rem;\r\n    align-items: center;\r\n    flex-direction: column;\r\n}\r\n\r\n.info-text {\r\n    margin: 1rem;\r\n}\r\n\r\n.miss,\r\n.boom {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\n.boom::after,\r\n.miss::after {\r\n    content: \"\";\r\n    position: absolute;\r\n    border-radius: 100%;\r\n    width: 2vmin;\r\n    height: 2vmin;\r\n}\r\n\r\n.miss::after {\r\n    background-color: white;\r\n}\r\n\r\n.boom::after {\r\n    background-color: red;\r\n}\r\n\r\n.miss::before {\r\n    content: \"\";\r\n    position: absolute;\r\n    animation: hit 0.2s ease-out forwards;\r\n    border: 1vmin solid white;\r\n    border-radius: 100%;\r\n    width: 2vmin;\r\n    height: 2vmin;\r\n}\r\n\r\n.boom {\r\n    animation: boom 0.2s ease-out forwards;\r\n}\r\n\r\n@keyframes hit {\r\n    0% {\r\n        opacity: 1;\r\n        transform: scale(0);\r\n    }\r\n\r\n    100% {\r\n        opacity: 0;\r\n        transform: scale(4);\r\n    }\r\n}\r\n\r\n@keyframes boom {\r\n    0% {\r\n        background-color: red;\r\n    }\r\n\r\n    100% {\r\n        background-color: hsl(0, 0%, 80%);\r\n    }\r\n}\r\n\r\n.player {\r\n    margin: 2vmin;\r\n}\r\n\r\n.connected,\r\n.ready {\r\n    font-weight: normal;\r\n    opacity: 0.25;\r\n    text-decoration: line-through;\r\n}\r\n\r\n.connected.active,\r\n.ready.active {\r\n    opacity: 1;\r\n    text-decoration: none;\r\n}\r\n"],"sourceRoot":""}]);
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
/* harmony import */ var _modules_DOMInterface_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/DOMInterface.js */ "./src/modules/DOMInterface.js");

 // import gameboard from "../modules/gameboard";
// import ship from "../modules/ship";

document.addEventListener('DOMContentLoaded', _modules_DOMInterface_js__WEBPACK_IMPORTED_MODULE_1__.DOMInterface); // document.addEventListener('DOMContentLoaded', gameboard);
// document.addEventListener('DOMContentLoaded', ship);

_modules_DOMInterface_js__WEBPACK_IMPORTED_MODULE_1__.DOMInterface.gameStart();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map