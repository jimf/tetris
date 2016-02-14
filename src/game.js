function Game(options) {
    this.renderer = options.renderer;
    this.inputter = options.inputter;
}

Game.prototype.start = function start() {
    this.renderer.start();
};

module.exports = Game;
