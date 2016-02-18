var test = require('tape');
var Game = require('../src/game');

test('game: initial state', function(t) {
    var dummySystem = { createBoard: function() { return '<new board>'; } };
    var subject = new Game({ system: dummySystem });

    t.deepEqual(subject.state, {
        score: 0,
        lines: 0,
        board: dummySystem.createBoard(),
        currentPiece: null,
        nextPiece: null,
        lastFallTime: null
    });

    t.end();
});
