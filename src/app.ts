type Div = HTMLDivElement;
type Direction = "up" | "down" | "right" | "left";

const horizontalDirection = ["right", "left"];
const verticalDirection = ["up", "down"];

// É uma forma de fazer com que a chave tenha o índice que você quer
import { colorPalette } from "./collorPalette";

export class Game {
    squares: Div[] = Array.from(document.querySelectorAll(".game-squares")) as Div[]; // Transforma em array os quadrados do jogo

    emptySquares: Div[] = [];

    jogadas: string[][] = [];

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
        this.jogadas.push(this.returnInnerText(this.squares));
        this.arrowsClickCapture();
        this.mouseClickCapture();
        this.undo();
    }

    // Responsável por capturar os clicks das setas
    arrowsClickCapture() {
        document.onkeydown = (e) => {
            // Checa se os nomes das chaves do arrowCLickFunctionality incluem a tecla que foi apertada
            if (Object.keys(this.arrowCLickComands).includes(e.key)) {
                this.arrowCLickComands[`${e.key}`]();
            }
        };
    }

    // Responsável por capturar os clicks dos quadrados
    mouseClickCapture() {
        for (let i = 0; i < this.squares.length; i++) {
            this.squares[i].oncontextmenu = (e) => {
                e.preventDefault();
                const target = e.target as Div;
                target.innerText = "";

                this.correctingValues(false);
            };
            this.squares[i].onclick = (e) => {
                this.mouseClickFunctionality(e.target as Div);
            };
        }
    }

    // Responsável por
    mouseClickFunctionality(target: EventTarget) {
        const element = target as Div;
        if (target) {
            const input = document.createElement("input");
            element.appendChild(input);
            input.focus();

            // onchange é quando você dá enter ou tab, se você quer para quando é adicionado qualquer caractere é usado o oninput
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
        const button = document.querySelector(".desfazer") as HTMLButtonElement;

        button.onclick = () => {
            if (this.jogadas.length === 1) return;
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
        if (newValue) this.newValue();
        this.colorInSquare();
        this.squareFontColor();
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
        this.emptySquares = [];
        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].innerText === "") {
                this.emptySquares.push(this.squares[i]);
            }
        }
    }

    // Limpa o array de quadrados

    // Função responsável por dar a cor ao quadrado a partir do número escrito nele
    colorInSquare() {
        for (let i = 0; i < this.squares.length; i++) {
            // O backgroundColor do quadrado = a cor correspondente ao número do quadrado
            let square = this.squares[i].innerHTML;
            if (!square) square = "0";
            this.squares[i].style.backgroundColor = colorPalette[Number(this.squares[i].innerHTML)];
        }
    }

    squareFontColor() {
        for (let i = 0; i < this.squares.length; i++) {
            const square = this.squares[i].innerText;
            if (Number(square) > 4) this.squares[i].style.color = "#fff";
            else this.squares[i].style.color = "#000";
        }
    }

    returnInnerText(squares: Div[]): string[] {
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

        const opa = this.returnInnerText(this.squares).every((val, i) => {
            return val === this.jogadas[this.jogadas.length - 1][i];
        });

        if (!opa) {
            this.correctingValues();
            this.jogadas.push(this.returnInnerText(this.squares));
        }
    }
}

export const game = new Game();
