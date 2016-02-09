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

    function testcase(opts) {
        t.deepEqual(subject.createPiece.appy(null, opts.input),
                    opts.expected,
                    'returns expected ' + opts.input[0] + ' shape');
    }

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
