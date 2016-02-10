var test = require('tape');
var subject = require('../../src/systems/srs');

test('systems.src.createBoard()', function(t) {
    t.plan(1);

    t.deepEqual(subject.createBoard(), [
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    t.end();
});

test('systems.srs.createPiece()', function(t) {
    t.plan(7);

    'IJLOSTZ'.split('').forEach(function(shape) {
        t.deepEqual(subject.createPiece(shape), {
            shape: shape,
            x: 3,
            y: -2,
            rotation: 0
        }, 'returns expected ' + shape + ' shape');
    });

    t.end();
});

test('systems.src.rotateLeft() without obstruction', function(t) {
    var board = subject.createBoard();

    function testcase(opts) {
        var previous = subject.createPiece(opts.shape);

        opts.expectedRotations.forEach(function(rotation) {
            var rotated = subject.rotateLeft(previous, board);
            t.equal(rotated.rotation, rotation);
            previous = rotated;
        });
    }

    [
        { shape: 'I', expectedRotations: [3, 2, 1, 0] },
        { shape: 'J', expectedRotations: [3, 2, 1, 0] },
        { shape: 'L', expectedRotations: [3, 2, 1, 0] },
        { shape: 'O', expectedRotations: [0] },
        { shape: 'S', expectedRotations: [3, 2, 1, 0] },
        { shape: 'T', expectedRotations: [3, 2, 1, 0] },
        { shape: 'Z', expectedRotations: [3, 2, 1, 0] }
    ].forEach(testcase);

    t.end();
});

test('systems.src.rotateRight() without obstruction', function(t) {
    var board = subject.createBoard();

    function testcase(opts) {
        var previous = subject.createPiece(opts.shape);

        opts.expectedRotations.forEach(function(rotation) {
            var rotated = subject.rotateRight(previous, board);
            t.equal(rotated.rotation, rotation);
            previous = rotated;
        });
    }

    [
        { shape: 'I', expectedRotations: [1, 2, 3, 0] },
        { shape: 'J', expectedRotations: [1, 2, 3, 0] },
        { shape: 'L', expectedRotations: [1, 2, 3, 0] },
        { shape: 'O', expectedRotations: [0] },
        { shape: 'S', expectedRotations: [1, 2, 3, 0] },
        { shape: 'T', expectedRotations: [1, 2, 3, 0] },
        { shape: 'Z', expectedRotations: [1, 2, 3, 0] }
    ].forEach(testcase);

    t.end();
});

test('systems.src.shiftLeft() without obstruction', function(t) {
    var board = subject.createBoard();

    function testcase(opts) {
        var previous = subject.createPiece(opts.shape);
        previous.y = 0;

        opts.expectedShifts.forEach(function(shift) {
            var shifted = subject.shiftLeft(previous, board);
            t.equal(shifted.x, shift);
            previous = shifted;
        });
    }

    [
        { shape: 'I', expectedShifts: [2, 1, 0, 0] },
        { shape: 'J', expectedShifts: [2, 1, 0, 0] },
        { shape: 'L', expectedShifts: [2, 1, 0, 0] },
        { shape: 'O', expectedShifts: [2, 1, 0, -1, -1] },
        { shape: 'S', expectedShifts: [2, 1, 0, 0] },
        { shape: 'T', expectedShifts: [2, 1, 0, 0] },
        { shape: 'Z', expectedShifts: [2, 1, 0, 0] }
    ].forEach(testcase);

    t.end();
});

test('systems.src.shiftRight() without obstruction', function(t) {
    var board = subject.createBoard();

    function testcase(opts) {
        var previous = subject.createPiece(opts.shape);
        previous.y = 0;

        opts.expectedShifts.forEach(function(shift) {
            var shifted = subject.shiftRight(previous, board);
            t.equal(shifted.x, shift);
            previous = shifted;
        });
    }

    [
        { shape: 'I', expectedShifts: [4, 5, 6, 6] },
        { shape: 'J', expectedShifts: [4, 5, 6, 7, 7] },
        { shape: 'L', expectedShifts: [4, 5, 6, 7, 7] },
        { shape: 'O', expectedShifts: [4, 5, 6, 7, 7] },
        { shape: 'S', expectedShifts: [4, 5, 6, 7, 7] },
        { shape: 'T', expectedShifts: [4, 5, 6, 7, 7] },
        { shape: 'Z', expectedShifts: [4, 5, 6, 7, 7] }
    ].forEach(testcase);

    t.end();
});

test('systems.src.applyPiece()', function(t) {
    var board = subject.createBoard();
    var piece = subject.createPiece('O');
    piece.y = 0;
    var actual = subject.applyPiece(piece, board);

    t.deepEqual(actual, [
        [0, 0, 0, 0, 'O', 'O', 0, 0, 0, 0],
        [0, 0, 0, 0, 'O', 'O', 0, 0, 0, 0],
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], 'applies legal piece to an empty board');

    t.notEqual(actual, board, 'does not mutate board');

    t.end();
});

test('systems.src.findCompletedRows()', function(t) {
    var board = [
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
    ];

    t.deepEqual(subject.findCompletedRows(board), [18, 19],
                'finds indexes of rows that are complete');

    t.deepEqual(subject.findCompletedRows(subject.createBoard()), [],
                'returns empty list when no rows are complete');

    t.end();
});
