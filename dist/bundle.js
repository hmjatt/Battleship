/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOMInterface.js":
/*!*************************************!*\
  !*** ./src/modules/DOMInterface.js ***!
  \*************************************/
/***/ (() => {

//Catche DOM
// function component() {
// 	const element = document.createElement('div');
// 	element.innerHTML = 'Webpack setup successful';
// 	return element;
//   }
//   document.body.appendChild(component());
console.log("it works");

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((module) => {

// import ship from "./ship";
var userSquares = [];
var computerSquares = [];
var gridArray = [];
var width = 10;
var shipArray = [{
  name: 'destroyer',
  directions: [[0, 1], [0, width]]
}, {
  name: 'submarine',
  directions: [[0, 1, 2], [0, width, width * 2]]
}, {
  name: 'cruiser',
  directions: [[0, 1, 2], [0, width, width * 2]]
}, {
  name: 'battleship',
  directions: [[0, 1, 2, 3], [0, width, width * 2, width * 3]]
}, {
  name: 'carrier',
  directions: [[0, 1, 2, 3, 4], [0, width, width * 2, width * 3, width * 4]]
}];
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
  gameGrid: function gameGrid() {
    for (var i = 0; i < width * width; i++) {
      gridArray.push(i);
    }

    return gridArray;
  },
  // place ships on gameGrid
  placeShips: function placeShips(ship) {
    var randomDirection = Math.floor(Math.random() * ship.directions.length);
    var current = ship.directions[randomDirection];
    var direction;
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    var randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - ship.directions[0].length * direction)); // const isTaken = current.some((index) =>
    //     computerSquares[randomStart + index].classList.contains("taken")
    // );
    // const isAtRightEdge = current.some(
    //     (index) => (randomStart + index) % width === width - 1
    // );
    // const isAtLeftEdge = current.some(
    //     (index) => (randomStart + index) % width === 0
    // );
    // if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
    //     current.forEach((index) =>
    //         computerSquares[randomStart + index].classList.add(
    //             "taken",
    //             ship.name
    //         )
    //     );
    // else this.placeShips(ship);
  },
  generateShips: function generateShips() {
    this.gameGrid();
    this.placeShips(shipArray[0]);
    this.placeShips(shipArray[1]);
    this.placeShips(shipArray[2]);
    this.placeShips(shipArray[3]);
    this.placeShips(shipArray[4]);
    return gridArray;
  }
};
module.exports = gameboard;

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((module) => {

var ship = {
  // width variable representing numbers of elements in gameboard
  // ships need to spaced out
  width: 10,
  shipArray: [],

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
  ships: function ships() {
    this.shipArray = [{
      name: "destroyer",
      directions: [[0, 1], [0, this.width]]
    }, {
      name: "submarine",
      directions: [[0, 1, 2], [0, this.width, this.width * 2]]
    }, {
      name: "cruiser",
      directions: [[0, 1, 2], [0, this.width, this.width * 2]]
    }, {
      name: "battleship",
      directions: [[0, 1, 2, 3], [0, this.width, this.width * 2, this.width * 3]]
    }, {
      name: "carrier",
      directions: [[0, 1, 2, 3, 4], [0, this.width, this.width * 2, this.width * 3, this.width * 4]]
    }];
    return this.shipArray;
  }
};
module.exports = ship;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/public/style/styles.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/public/style/styles.css ***!
  \***************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
___CSS_LOADER_EXPORT___.push([module.id, "/* body {\r\n\tmargin: 0;\r\n\tbackground-color: #F3F3F3;\r\n\toverflow-x: hidden;\r\n}\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n\tfont-family: 'Montserrat', sans-serif;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.splash-container {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\theight: 66vh;\r\n}\r\n\r\n.splash-title {\r\n\tfont-family: 'Bangers', cursive;\r\n\tfont-size: 10rem;\r\n}\r\n\r\n.splash-battleship-image {\r\n\tposition: absolute;\r\n\tbottom: 5vh;\r\n\tleft: 20vw;\r\n\twidth: 100%;\r\n\ttransform: rotateY(180deg);\r\n\tpointer-events: none;\r\n\topacity: .25;\r\n}\r\n\r\n.btn {\r\n\tfont-size: inherit;\r\n\tbackground-color: hsl(30, 100%, 50%);\r\n\tpadding: .5em 1em;\r\n\toutline: none;\r\n\tborder: none;\r\n\ttext-decoration: none;\r\n\tcursor: pointer;\r\n\tborder-radius: .2em;\r\n\tcolor: #333;\r\n}\r\n\r\n.btn:hover,\r\n.btn:focus {\r\n\tbackground-color: hsl(30, 100%, 40%);\r\n}\r\n\r\n.splash-btn {\r\n\tfont-size: 2rem;\r\n\tmargin-left: 2rem;\r\n}\r\n\r\n.splash-btn:first-child {\r\n\tmargin-left: 0;\r\n}\r\n\r\n.container {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\twidth: 100%;\r\n}\r\n\r\n.battleship-grid {\r\n\tmargin: 2vmin;\r\n\tdisplay: grid;\r\n\tbackground-color: hsl(200, 100%, 50%);\r\n\tgrid-template-rows: repeat(10, 4.6vmin);\r\n\tgrid-template-columns: repeat(10, 4.6vmin);\r\n}\r\n\r\n.grid-computer>.taken,\r\n.grid-computer>.boom {\r\n\tbackground-color: hsl(200, 100%, 50%) !important;\r\n\tborder-radius: 0 !important;\r\n}\r\n\r\n.taken,\r\n.ship {\r\n\tposition: relative;\r\n\tbackground-color: hsl(0, 0%, 80%);\r\n}\r\n\r\n.taken.start.vertical,\r\n.taken.start.vertical::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-top-right-radius: 50%;\r\n}\r\n\r\n.taken.end.vertical,\r\n.taken.end.vertical::before {\r\n\tborder-bottom-left-radius: 50%;\r\n\tborder-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.start.horizontal,\r\n.taken.start.horizontal::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-bottom-left-radius: 50%;\r\n}\r\n\r\n.taken.end.horizontal,\r\n.taken.end.horizontal::before {\r\n\tborder-top-right-radius: 50%;\r\n\tborder-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.vertical::before,\r\n.taken.horizontal::before {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tborder: .3vmin solid white;\r\n\ttop: -1px;\r\n\tbottom: -1px;\r\n\tleft: -1px;\r\n\tright: -1px;\r\n}\r\n\r\n.taken.horizontal::before {\r\n\tanimation: ripplesY 3s linear infinite;\r\n\tborder-left: none;\r\n\tborder-right: none;\r\n}\r\n\r\n.taken.vertical::before {\r\n\tanimation: ripplesX 3s linear infinite;\r\n\tborder-top: none;\r\n\tborder-bottom: none;\r\n}\r\n\r\n@keyframes ripplesX {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleX(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleX(1.5);\r\n\t}\r\n}\r\n\r\n@keyframes ripplesY {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleY(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleY(1.5);\r\n\t}\r\n}\r\n\r\n.grid-display {\r\n\tdisplay: flex;\r\n}\r\n\r\n.ship>div {\r\n\twidth: 4.6vmin;\r\n\theight: 4.6vmin;\r\n}\r\n\r\n.ship {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tmargin: 1vmin;\r\n\twidth: calc(4.6vmin * var(--width, 1));\r\n\theight: calc(4.6vmin * var(--height, 1));\r\n\tborder-radius: 2.3vmin;\r\n}\r\n\r\n.battleship-grid div {\r\n\tborder: 1px solid hsla(0, 0%, 100%, .2);\r\n}\r\n\r\n.destroyer-container {\r\n\t--width: 2;\r\n}\r\n\r\n.destroyer-container-vertical {\r\n\t--height: 2;\r\n\t--width: 1;\r\n}\r\n\r\n.submarine-container,\r\n.cruiser-container {\r\n\t--width: 3;\r\n}\r\n\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical {\r\n\t--height: 3;\r\n\t--width: 1;\r\n}\r\n\r\n.battleship-container {\r\n\t--width: 4;\r\n}\r\n\r\n.battleship-container-vertical {\r\n\t--height: 4;\r\n\t--width: 1;\r\n}\r\n\r\n.carrier-container {\r\n\t--width: 5;\r\n}\r\n\r\n.carrier-container-vertical {\r\n\t--height: 5;\r\n\t--width: 1;\r\n}\r\n\r\n.hidden-info {\r\n\tfont-size: 1.5rem;\r\n\talign-items: center;\r\n\tflex-direction: column;\r\n}\r\n\r\n.info-text {\r\n\tmargin: 1rem;\r\n}\r\n\r\n.miss,\r\n.boom {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n}\r\n\r\n.boom::after,\r\n.miss::after {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tborder-radius: 100%;\r\n\twidth: 2vmin;\r\n\theight: 2vmin;\r\n}\r\n\r\n.miss::after {\r\n\tbackground-color: white;\r\n}\r\n\r\n.boom::after {\r\n\tbackground-color: red;\r\n}\r\n\r\n.miss::before {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tanimation: hit .2s ease-out forwards;\r\n\tborder: 1vmin solid white;\r\n\tborder-radius: 100%;\r\n\twidth: 2vmin;\r\n\theight: 2vmin;\r\n}\r\n\r\n.boom {\r\n\tanimation: boom .2s ease-out forwards;\r\n}\r\n\r\n@keyframes hit {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scale(0);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scale(4);\r\n\t}\r\n}\r\n\r\n@keyframes boom {\r\n\t0% {\r\n\t\tbackground-color: red;\r\n\t}\r\n\r\n\t100% {\r\n\t\tbackground-color: hsl(0, 0%, 80%);\r\n\t}\r\n}\r\n\r\n.player {\r\n\tmargin: 2vmin;\r\n}\r\n\r\n.connected,\r\n.ready {\r\n\tfont-weight: normal;\r\n\topacity: .25;\r\n\ttext-decoration: line-through;\r\n}\r\n\r\n.connected.active,\r\n.ready.active {\r\n\topacity: 1;\r\n\ttext-decoration: none;\r\n} */\r\n", "",{"version":3,"sources":["webpack://./src/public/style/styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;GAgTG","sourcesContent":["/* body {\r\n\tmargin: 0;\r\n\tbackground-color: #F3F3F3;\r\n\toverflow-x: hidden;\r\n}\r\n\r\n*,\r\n*::before,\r\n*::after {\r\n\tfont-family: 'Montserrat', sans-serif;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.splash-container {\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n\theight: 66vh;\r\n}\r\n\r\n.splash-title {\r\n\tfont-family: 'Bangers', cursive;\r\n\tfont-size: 10rem;\r\n}\r\n\r\n.splash-battleship-image {\r\n\tposition: absolute;\r\n\tbottom: 5vh;\r\n\tleft: 20vw;\r\n\twidth: 100%;\r\n\ttransform: rotateY(180deg);\r\n\tpointer-events: none;\r\n\topacity: .25;\r\n}\r\n\r\n.btn {\r\n\tfont-size: inherit;\r\n\tbackground-color: hsl(30, 100%, 50%);\r\n\tpadding: .5em 1em;\r\n\toutline: none;\r\n\tborder: none;\r\n\ttext-decoration: none;\r\n\tcursor: pointer;\r\n\tborder-radius: .2em;\r\n\tcolor: #333;\r\n}\r\n\r\n.btn:hover,\r\n.btn:focus {\r\n\tbackground-color: hsl(30, 100%, 40%);\r\n}\r\n\r\n.splash-btn {\r\n\tfont-size: 2rem;\r\n\tmargin-left: 2rem;\r\n}\r\n\r\n.splash-btn:first-child {\r\n\tmargin-left: 0;\r\n}\r\n\r\n.container {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\twidth: 100%;\r\n}\r\n\r\n.battleship-grid {\r\n\tmargin: 2vmin;\r\n\tdisplay: grid;\r\n\tbackground-color: hsl(200, 100%, 50%);\r\n\tgrid-template-rows: repeat(10, 4.6vmin);\r\n\tgrid-template-columns: repeat(10, 4.6vmin);\r\n}\r\n\r\n.grid-computer>.taken,\r\n.grid-computer>.boom {\r\n\tbackground-color: hsl(200, 100%, 50%) !important;\r\n\tborder-radius: 0 !important;\r\n}\r\n\r\n.taken,\r\n.ship {\r\n\tposition: relative;\r\n\tbackground-color: hsl(0, 0%, 80%);\r\n}\r\n\r\n.taken.start.vertical,\r\n.taken.start.vertical::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-top-right-radius: 50%;\r\n}\r\n\r\n.taken.end.vertical,\r\n.taken.end.vertical::before {\r\n\tborder-bottom-left-radius: 50%;\r\n\tborder-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.start.horizontal,\r\n.taken.start.horizontal::before {\r\n\tborder-top-left-radius: 50%;\r\n\tborder-bottom-left-radius: 50%;\r\n}\r\n\r\n.taken.end.horizontal,\r\n.taken.end.horizontal::before {\r\n\tborder-top-right-radius: 50%;\r\n\tborder-bottom-right-radius: 50%;\r\n}\r\n\r\n.taken.vertical::before,\r\n.taken.horizontal::before {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tborder: .3vmin solid white;\r\n\ttop: -1px;\r\n\tbottom: -1px;\r\n\tleft: -1px;\r\n\tright: -1px;\r\n}\r\n\r\n.taken.horizontal::before {\r\n\tanimation: ripplesY 3s linear infinite;\r\n\tborder-left: none;\r\n\tborder-right: none;\r\n}\r\n\r\n.taken.vertical::before {\r\n\tanimation: ripplesX 3s linear infinite;\r\n\tborder-top: none;\r\n\tborder-bottom: none;\r\n}\r\n\r\n@keyframes ripplesX {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleX(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleX(1.5);\r\n\t}\r\n}\r\n\r\n@keyframes ripplesY {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scaleY(1);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scaleY(1.5);\r\n\t}\r\n}\r\n\r\n.grid-display {\r\n\tdisplay: flex;\r\n}\r\n\r\n.ship>div {\r\n\twidth: 4.6vmin;\r\n\theight: 4.6vmin;\r\n}\r\n\r\n.ship {\r\n\tdisplay: flex;\r\n\tflex-wrap: wrap;\r\n\tmargin: 1vmin;\r\n\twidth: calc(4.6vmin * var(--width, 1));\r\n\theight: calc(4.6vmin * var(--height, 1));\r\n\tborder-radius: 2.3vmin;\r\n}\r\n\r\n.battleship-grid div {\r\n\tborder: 1px solid hsla(0, 0%, 100%, .2);\r\n}\r\n\r\n.destroyer-container {\r\n\t--width: 2;\r\n}\r\n\r\n.destroyer-container-vertical {\r\n\t--height: 2;\r\n\t--width: 1;\r\n}\r\n\r\n.submarine-container,\r\n.cruiser-container {\r\n\t--width: 3;\r\n}\r\n\r\n.submarine-container-vertical,\r\n.cruiser-container-vertical {\r\n\t--height: 3;\r\n\t--width: 1;\r\n}\r\n\r\n.battleship-container {\r\n\t--width: 4;\r\n}\r\n\r\n.battleship-container-vertical {\r\n\t--height: 4;\r\n\t--width: 1;\r\n}\r\n\r\n.carrier-container {\r\n\t--width: 5;\r\n}\r\n\r\n.carrier-container-vertical {\r\n\t--height: 5;\r\n\t--width: 1;\r\n}\r\n\r\n.hidden-info {\r\n\tfont-size: 1.5rem;\r\n\talign-items: center;\r\n\tflex-direction: column;\r\n}\r\n\r\n.info-text {\r\n\tmargin: 1rem;\r\n}\r\n\r\n.miss,\r\n.boom {\r\n\tdisplay: flex;\r\n\tjustify-content: center;\r\n\talign-items: center;\r\n}\r\n\r\n.boom::after,\r\n.miss::after {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tborder-radius: 100%;\r\n\twidth: 2vmin;\r\n\theight: 2vmin;\r\n}\r\n\r\n.miss::after {\r\n\tbackground-color: white;\r\n}\r\n\r\n.boom::after {\r\n\tbackground-color: red;\r\n}\r\n\r\n.miss::before {\r\n\tcontent: '';\r\n\tposition: absolute;\r\n\tanimation: hit .2s ease-out forwards;\r\n\tborder: 1vmin solid white;\r\n\tborder-radius: 100%;\r\n\twidth: 2vmin;\r\n\theight: 2vmin;\r\n}\r\n\r\n.boom {\r\n\tanimation: boom .2s ease-out forwards;\r\n}\r\n\r\n@keyframes hit {\r\n\t0% {\r\n\t\topacity: 1;\r\n\t\ttransform: scale(0);\r\n\t}\r\n\r\n\t100% {\r\n\t\topacity: 0;\r\n\t\ttransform: scale(4);\r\n\t}\r\n}\r\n\r\n@keyframes boom {\r\n\t0% {\r\n\t\tbackground-color: red;\r\n\t}\r\n\r\n\t100% {\r\n\t\tbackground-color: hsl(0, 0%, 80%);\r\n\t}\r\n}\r\n\r\n.player {\r\n\tmargin: 2vmin;\r\n}\r\n\r\n.connected,\r\n.ready {\r\n\tfont-weight: normal;\r\n\topacity: .25;\r\n\ttext-decoration: line-through;\r\n}\r\n\r\n.connected.active,\r\n.ready.active {\r\n\topacity: 1;\r\n\ttext-decoration: none;\r\n} */\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


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

"use strict";


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

"use strict";
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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*****************************!*\
  !*** ./src/public/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/styles.css */ "./src/public/style/styles.css");
/* harmony import */ var _modules_DOMInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/DOMInterface */ "./src/modules/DOMInterface.js");
/* harmony import */ var _modules_DOMInterface__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_DOMInterface__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules/gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_gameboard__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/ship */ "./src/modules/ship.js");
/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_ship__WEBPACK_IMPORTED_MODULE_3__);



 // document.addEventListener('DOMContentLoaded', DOMInterface);

document.addEventListener('DOMContentLoaded', (_modules_gameboard__WEBPACK_IMPORTED_MODULE_2___default()));
document.addEventListener('DOMContentLoaded', (_modules_ship__WEBPACK_IMPORTED_MODULE_3___default()));
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map