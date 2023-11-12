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
const horizontalDirection = ["right", "left"];
const verticalDirection = ["up", "down"];
const collorPalette_1 = __webpack_require__(/*! ./collorPalette */ "./src/collorPalette.ts");
class Game {
    constructor() {
        this.squares = Array.from(document.querySelectorAll(".game-squares"));
        this.emptySquares = [];
        this.jogadas = [];
        this.arrowCLickComands = {
            ArrowUp: () => {
                this.arrowCLickFunctionality("up");
            },
            ArrowDown: () => {
                this.arrowCLickFunctionality("down");
            },
            ArrowLeft: () => {
                this.arrowCLickFunctionality("left");
            },
            ArrowRight: () => {
                this.arrowCLickFunctionality("right");
            },
        };
        this.transformingValues = {
            up: (linhas) => {
                let x = 0;
                for (let i = 0; i < this.squares.length; i += 4) {
                    this.squares[i].innerText = `${linhas[0][x] || ""}`;
                    this.squares[i + 1].innerText = `${linhas[1][x] || ""}`;
                    this.squares[i + 2].innerText = `${linhas[2][x] || ""}`;
                    this.squares[i + 3].innerText = `${linhas[3][x] || ""}`;
                    x++;
                }
            },
            down: (linhas) => {
                let x = 0;
                for (let i = this.squares.length - 1; i >= 0; i -= 4) {
                    this.squares[i].innerText = `${linhas[3][x] || ""}`;
                    this.squares[i - 1].innerText = `${linhas[2][x] || ""}`;
                    this.squares[i - 2].innerText = `${linhas[1][x] || ""}`;
                    this.squares[i - 3].innerText = `${linhas[0][x] || ""}`;
                    x++;
                }
            },
            right: (linhas) => {
                let x = 0;
                for (let i = 0; i < this.squares.length; i += 4) {
                    this.squares[i].innerText = `${linhas[x][3] || ""}`;
                    this.squares[i + 1].innerText = `${linhas[x][2] || ""}`;
                    this.squares[i + 2].innerText = `${linhas[x][1] || ""}`;
                    this.squares[i + 3].innerText = `${linhas[x][0] || ""}`;
                    x++;
                }
            },
            left: (linhas) => {
                let x = 0;
                for (let i = 0; i < this.squares.length; i += 4) {
                    this.squares[i].innerText = `${linhas[x][0] || ""}`;
                    this.squares[i + 1].innerText = `${linhas[x][1] || ""}`;
                    this.squares[i + 2].innerText = `${linhas[x][2] || ""}`;
                    this.squares[i + 3].innerText = `${linhas[x][3] || ""}`;
                    x++;
                }
            },
        };
    }
    start() {
        this.correctingValues();
        this.jogadas.push(this.returnInnerText(this.squares));
        this.arrowsClickCapture();
        this.mouseClickCapture();
        this.undo();
    }
    arrowsClickCapture() {
        document.onkeydown = (e) => {
            if (Object.keys(this.arrowCLickComands).includes(e.key)) {
                this.arrowCLickComands[`${e.key}`]();
            }
        };
    }
    mouseClickCapture() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].oncontextmenu = (e) => {
                e.preventDefault();
                const target = e.target;
                target.innerText = "";
                this.correctingValues(false);
            };
            this.squares[i].onclick = (e) => {
                this.mouseClickFunctionality(e.target);
            };
        }
    }
    mouseClickFunctionality(target) {
        const element = target;
        if (target) {
            const input = document.createElement("input");
            element.appendChild(input);
            input.focus();
            input.onchange = () => {
                element.removeChild(input);
                element.innerHTML = input.value;
                this.colorInSquare();
                this.squareFontColor();
                this.jogadas.push(this.returnInnerText(this.squares));
            };
        }
    }
    undo() {
        const button = document.querySelector(".desfazer");
        button.onclick = () => {
            if (this.jogadas.length === 1)
                return;
            this.jogadas.pop();
            const jogada = this.jogadas[this.jogadas.length - 1];
            for (let i = 0; i < jogada.length; i++) {
                this.squares[i].innerText = jogada[i];
            }
            this.correctingValues(false);
        };
    }
    correctingValues(newValue = true) {
        this.pushEmptySquares();
        if (newValue)
            this.newValue();
        this.colorInSquare();
        this.squareFontColor();
    }
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
        this.emptySquares = [];
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].innerText === "") {
                this.emptySquares.push(this.squares[i]);
            }
        }
    }
    colorInSquare() {
        for (let i = 0; i < this.squares.length; i++) {
            let square = this.squares[i].innerHTML;
            if (!square)
                square = "0";
            this.squares[i].style.backgroundColor = collorPalette_1.colorPalette[Number(this.squares[i].innerHTML)];
        }
    }
    squareFontColor() {
        for (let i = 0; i < this.squares.length; i++) {
            const square = this.squares[i].innerText;
            if (Number(square) > 4)
                this.squares[i].style.color = "#fff";
            else
                this.squares[i].style.color = "#000";
        }
    }
    returnInnerText(squares) {
        const texts = [];
        for (let i = 0; i < squares.length; i++) {
            const square = squares[i];
            texts.push(square.innerText);
        }
        return texts;
    }
    endGame() {
        alert("ACABOU");
    }
    arrowCLickFunctionality(direction) {
        const linhas = [];
        for (let i = 0; i < 4; i++) {
            const linha = [];
            if (verticalDirection.includes(direction)) {
                for (let indice = i; indice < i + 13; indice += 4) {
                    if (this.squares[indice].innerText !== "") {
                        linha.push(Number(this.squares[indice].innerText));
                    }
                }
            }
            if (horizontalDirection.includes(direction)) {
                for (let indice = i * 4; indice < i * 4 + 4; indice++) {
                    if (this.squares[indice].innerText !== "") {
                        linha.push(Number(this.squares[indice].innerText));
                    }
                }
            }
            if (direction === "down" || direction === "right")
                linha.reverse();
            const novaLinha = [];
            let numeroAnterior = linha[0];
            if (linha.length === 1) {
                novaLinha.push(numeroAnterior);
            }
            else {
                for (let indice = 1; indice < linha.length; indice++) {
                    const numeroAtual = linha[indice];
                    if (numeroAnterior === 0) {
                        numeroAnterior = numeroAtual;
                        if (indice === linha.length - 1) {
                            novaLinha.push(numeroAtual);
                        }
                    }
                    else if (numeroAnterior === numeroAtual) {
                        novaLinha.push(numeroAnterior + numeroAtual);
                        numeroAnterior = 0;
                    }
                    else if (numeroAnterior !== numeroAtual) {
                        novaLinha.push(numeroAnterior);
                        numeroAnterior = numeroAtual;
                        if (indice === linha.length - 1) {
                            novaLinha.push(numeroAtual);
                        }
                    }
                }
            }
            linhas.push(novaLinha);
        }
        this.transformingValues[direction](linhas);
        const opa = this.returnInnerText(this.squares).every((val, i) => {
            return val === this.jogadas[this.jogadas.length - 1][i];
        });
        if (!opa) {
            this.correctingValues();
            this.jogadas.push(this.returnInnerText(this.squares));
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
    0: "#aaa",
    2: "#eee",
    4: "#ddd",
    8: "#fc6b5d",
    16: "#de5347",
    32: "#961f0b",
    64: "#ab0000",
    128: "#d1c690",
    256: "#bdad60",
    512: "#9c8922",
    1024: "#73620a",
    2048: "#73620a",
    3000: "#f00",
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