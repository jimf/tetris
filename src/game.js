function Game(canvas, options) {
    var self = this;

    this.canvas = canvas;
    this.height = options.height;
    this.width = this.height / 2;

    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.drawingContext = canvas.getContext('2d');
}

Game.prototype.start = function start() {
    var tick = this.tick.bind(this);
    var ticker = function() {
        tick();
        requestAnimationFrame(ticker);
    };

    ticker();
};

Game.prototype.tick = function tick() {
    this.update();
    this.draw();
};

Game.prototype.update = function update() {};

Game.prototype.draw = function draw() {};

module.exports = Game;
