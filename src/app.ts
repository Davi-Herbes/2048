type Div = HTMLDivElement;
type Direction = "up" | "down" | "right" | "left";

const horizontalDirection = ["right", "left"];
const verticalDirection = ["up", "down"];

// É uma forma de fazer com que a chave tenha o índice que você quer
import { colorPalette } from "./collorPalette";

export class Game {
    squares: Div[] = Array.from(document.querySelectorAll(".game-squares")) as Div[]; // Transforma em array os quadrados do jogo

    emptySquares: Div[] = [];

    arrowCLickComands: { [key: string]: () => void } = {
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

    transformingValues: { [key: string]: (linhas: number[][]) => void } = {
        up: (linhas) => {
            console.log(this.emptySquares.length);

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

    start() {
        this.correctingValues();
        this.arrowsClickCapture();
    }

    // Responsável por capturar os clicks das setas
    arrowsClickCapture() {
        document.onkeydown = (e) => {
            // Checa se os nomes das chaves do arrowCLickFunctionality incluem a tecla que foi apertada
            if (Object.keys(this.arrowCLickComands).includes(e.key)) {
                this.arrowCLickComands[e.key]();
            }
        };
    }

    correctingValues() {
        this.pushEmptySquares();
        this.checkEmptySquares();
        this.newValue();
        this.colorInSquare();
    }

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
            if (this.squares[i].innerHTML === "" && !this.emptySquares.includes(this.squares[i])) {
                this.emptySquares.push(this.squares[i]);
            }
        }
    }

    // Checa se os quadrados que estão no array foram preenchidos
    checkEmptySquares() {
        for (let i = 0; i < this.emptySquares.length; i++) {
            if (this.emptySquares[i].innerText !== "") {
                this.emptySquares.splice(i, 1);
            }
        }
    }

    // Função responsável por dar a cor ao quadrado a partir do número escrito nele
    colorInSquare() {
        for (let i = 0; i < this.squares.length; i++) {
            // O backgroundColor do quadrado = a cor correspondente ao número do quadrado
            let square = this.squares[i].innerHTML;
            if (!square) square = "0";
            this.squares[i].style.backgroundColor = colorPalette[Number(this.squares[i].innerHTML)];
        }
    }

    arrowCLickFunctionality(direction: Direction) {
        const linhas: number[][] = [];

        // A função desse for é ir em cada linha e criar um array que contém os novos valores dessa nova linha e no final colocar no array linhas as novas linhas geradas
        for (let i = 0; i < 4; i++) {
            const linha: number[] = [];

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
                console.log(linha);
            }

            if (direction === "down" || direction === "right") linha.reverse();

            const novaLinha: number[] = [];

            let numeroAnterior = linha[0]; // O número anterior vai ser o primeiro da linha
            // Se a linha só tiver um número, ele já coloca o primeiro número na novaLinha
            if (linha.length === 1) {
                novaLinha.push(numeroAnterior);
            } else {
                for (let indice = 1; indice < linha.length; indice++) {
                    const numeroAtual = linha[indice];

                    // O número anterior vai ser 0 no caso em que os dois números anteriores eram iguais, então o numeroAnterior passa a ser o numeroAtual
                    if (numeroAnterior === 0) {
                        numeroAnterior = numeroAtual;
                        if (indice === linha.length - 1) {
                            novaLinha.push(numeroAtual);
                        }
                    } else if (numeroAnterior === numeroAtual) {
                        novaLinha.push(numeroAnterior + numeroAtual); // Se o número anterior e o atual forem iguais, será colocado a soma deles e vai zerar o numeroAnterior
                        numeroAnterior = 0;
                    } else if (numeroAnterior !== numeroAtual) {
                        novaLinha.push(numeroAnterior); // Se forem diferentes, o numeroAnterior vai ser adicionado e o numeroAnterior passa a ser o numeroAtual
                        numeroAnterior = numeroAtual;

                        // Se for o último laço, o numeroAtual também será adicionado
                        if (indice === linha.length - 1) {
                            novaLinha.push(numeroAtual);
                        }
                    }
                }
            }
            linhas.push(novaLinha);
        }

        // A função desse for é passar em cada quadrado e colocar o valor novo que ele deve receber

        this.transformingValues[direction](linhas);

        this.correctingValues();
    }
}

export const game = new Game();
