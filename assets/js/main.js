class Game {
    constructor() {
        this.emptySquares = Array.from(document.querySelectorAll(".game-squares"))
    }

    start() {
        this.correctingValues()
        this.newValue()
    }

    correctingValues() {}

    newValue() {
        this.emptySquares[Math.floor(Math.random() * this.emptySquares.length)].innerHTML = 2
    }

}

const game = new Game()

game.start()