var colorMap = {
    I: 'cyan',
    J: 'blue',
    L: 'orange',
    O: 'yellow',
    S: 'green',
    T: 'purple',
    Z: 'red'
};

function CanvasRenderer(canvasEl, options) {
    this.canvasEl = canvasEl;
    this.height = options.height;
    this.width = this.height / 2;

    this.canvasEl.height = this.height;
    this.canvasEl.width = this.width;

    this.drawingContext = canvasEl.getContext('2d');
}

CanvasRenderer.prototype.start = function start() {
    var tick = this.tick.bind(this);
    var ticker = function() {
        tick();
        requestAnimationFrame(ticker);
    };

    ticker();
};

CanvasRenderer.prototype.tick = function tick() {
    this.update();
    this.draw();
};

CanvasRenderer.prototype.update = function update() {};

CanvasRenderer.prototype.draw = function draw() {
    this.drawingContext.clearRect(0, 0, this.width, this.height);
    this.drawBoard([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'OOOOOOOOOO'.split(''),
        'OOOOOOOOOO'.split('')
    ]);
    this.drawGrid();
};

CanvasRenderer.prototype.drawGrid = function drawGrid() {
    var xStep = this.width / 10;
    var yStep = this.height / 20;

    for (var x = 0; x < this.width; x += xStep) {
        this.drawingContext.moveTo(x, 0);
        this.drawingContext.lineTo(x, this.height);
    }

    for (var y = 0; y < this.height; y += yStep) {
        this.drawingContext.moveTo(0, y);
        this.drawingContext.lineTo(this.width, y);
    }

    this.drawingContext.strokeStyle = '#b2aaea';
    this.drawingContext.stroke();
};

CanvasRenderer.prototype.drawBoard = function drawBoard(board) {
    var size = this.width / 10;

    board.forEach(function(row, y) {
        row.forEach(function(block, x) {
            if (block === 0) { return; }
            this.drawingContext.fillStyle = colorMap[block];
            this.drawingContext.fillRect(x * size, y * size, size, size);
        }, this);
    }, this);
};

module.exports = CanvasRenderer;
