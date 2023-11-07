/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.game = exports.Game = void 0;
const collorPalette_1 = __webpack_require__(/*! ./collorPalette */ "./src/collorPalette.ts");
class Game {
    constructor() {
        this.squares = Array.from(document.querySelectorAll(".game-squares"));
        this.emptySquares = [];
        this.arrowCLickFunctionality = {
            ArrowUp() { },
            ArrowDown() { },
            ArrowLeft() { },
            ArrowRight() { },
        };
    }
    start() {
        this.correctingValues();
        this.pushEmptySquares();
        this.newValue();
        this.checkEmptySquares();
        this.colorInSquare();
        this.arrowsClickCapture();
    }
    arrowsClickCapture() {
        document.onkeydown = (e) => {
            if (Object.keys(this.arrowCLickFunctionality).includes(e.key)) {
                this.arrowCLickFunctionality[e.key]();
            }
        };
    }
    correctingValues() { }
    newValue() {
        const theChosenSquare = this.emptySquares[Math.floor(Math.random() * this.emptySquares.length)];
        if (Math.floor(Math.random() * 10) === 1) {
            theChosenSquare.innerHTML = "4";
        }
        else {
            theChosenSquare.innerHTML = "2";
        }
    }
    pushEmptySquares() {
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].innerHTML === "") {
                this.emptySquares.push(this.squares[i]);
            }
        }
    }
    checkEmptySquares() {
        for (let i = 0; i < this.emptySquares.length; i++) {
            if (this.emptySquares[i].innerHTML !== "") {
                this.emptySquares.splice(i, 1);
            }
        }
    }
    colorInSquare() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].style.backgroundColor = collorPalette_1.colorPalette[Number(this.squares[i].innerHTML)];
        }
    }
}
exports.Game = Game;
exports.game = new Game();


/***/ }),

/***/ "./src/collorPalette.ts":
/*!******************************!*\
  !*** ./src/collorPalette.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.colorPalette = void 0;
exports.colorPalette = {
    2: "#eee",
    4: "#ddd",
    8: "#c97f6b",
    16: "#a65f4c",
    32: "#8c362d",
    64: "#750f05",
    128: "#d1c690",
    256: "#bdad60",
    512: "#9c8922",
    1024: "#73620a",
    2048: "#73620a",
};


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
/******/ 			// no module.id needed
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
app_1.game.start();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map