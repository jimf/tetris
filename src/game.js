function Game(options) {
    this.renderer = options.renderer;
    this.inputter = options.inputter;
    this.system = options.system;

    this.state = {
        score: 0,
        level: 1,
        board: this.system.createBoard(),
        currentPiece: null,
        nextPiece: null,
        lastFallTime: null
    };
}

Game.prototype.start = function start() {
    this.renderer.start();
};

module.exports = Game;
