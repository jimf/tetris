var add = require('ramda/src/add');
var assoc = require('ramda/src/assoc');
var compose = require('ramda/src/compose');
var evolve = require('ramda/src/evolve');
var type = require('union-type');
var next = require('./rng');

var actions = type({
    setCurrentPiece: [Object],
    setNextPiece: [Object],
    setLastFallTime: [Number],
    updateBoard: [Object],
    incrementLines: [Number]
});

var update = actions.caseOn({
    setCurrentPiece: assoc('currentPiece'),
    setNextPiece: assoc('nextPiece'),
    setLastFallTime: assoc('lastFallTime'),
    updateBoard: assoc('board'),
    incrementLines: evolve({ lines: add })
});

function Game(options) {
    this.update = this.update.bind(this);

    this.renderer = options.renderer;
    this.inputter = options.inputter;
    this.system = options.system;

    this.state = {
        score: 0,
        lines: 0,
        board: this.system.createBoard(),
        currentPiece: null,
        nextPiece: null,
        lastFallTime: null
    };
}

Game.prototype.update = function() {
    var state = this.state;
    var sys = this.system;

    if (this.state.currentPiece === null) {
        state = update(actions.setCurrentPiece(sys.createPiece(next())), state);
        state = update(actions.setNextPiece(sys.createPiece(next())), state);
        state = update(actions.setLastFallTime(Date.now()), state);
    }

    if (Date.now() - state.lastFallTime > sys.fallFrequency(state.lines)) {

    }

    this.state = state;
    return this.state;
};

Game.prototype.start = function start() {
    this.renderer.start(this.update);
};

module.exports = Game;
