type Div = HTMLDivElement;

// É uma forma de fazer com que a chave tenha o índice que você quer
import { colorPalette } from "./collorPalette";

export class Game {
    squares: Div[] = Array.from(document.querySelectorAll(".game-squares")) as Div[]; // Transforma em array os quadrados do jogo

    emptySquares: Div[] = [];

    arrowCLickFunctionality: { [key: string]: () => void } = {
        ArrowUp() {},
        ArrowDown() {},
        ArrowLeft() {},
        ArrowRight() {},
    };

    start() {
        this.correctingValues();
        this.pushEmptySquares();
        this.newValue();
        this.checkEmptySquares();
        this.colorInSquare();
        this.arrowsClickCapture();
    }

    // Responsável por capturar os clicks das setas
    arrowsClickCapture() {
        document.onkeydown = (e) => {
            // Checa se os nomes das chaves do arrowCLickFunctionality incluem a tecla que foi apertada
            if (Object.keys(this.arrowCLickFunctionality).includes(e.key)) {
                this.arrowCLickFunctionality[e.key]();
            }
        };
    }

    correctingValues() {}

    // Adiciona um novo valor em algum quadrado
    newValue() {
        const theChosenSquare =
            this.emptySquares[Math.floor(Math.random() * this.emptySquares.length)];

        if (Math.floor(Math.random() * 10) === 1) {
            theChosenSquare.innerHTML = "4";
        } else {
            theChosenSquare.innerHTML = "2";
        }
    }

    // Adiciona os quadrados que estão vazio no array
    pushEmptySquares() {
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].innerHTML === "") {
                this.emptySquares.push(this.squares[i]);
            }
        }
    }

    // Checa se os quadrados que estão no array foram preenchidos
    checkEmptySquares() {
        for (let i = 0; i < this.emptySquares.length; i++) {
            if (this.emptySquares[i].innerHTML !== "") {
                this.emptySquares.splice(i, 1);
            }
        }
    }

    // Função responsável por dar a cor ao quadrado a partir do número escrito nele
    colorInSquare() {
        for (let i = 0; i < this.squares.length; i++) {
            // O backgroundColor do quadrado = a cor correspondente ao número do quadrado
            this.squares[i].style.backgroundColor = colorPalette[Number(this.squares[i].innerHTML)];
        }
    }
}

export const game = new Game();
