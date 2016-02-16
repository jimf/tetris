/**
 * Super Rotation System, or SRS, is the current Tetris Guideline standard for
 * how tetrominoes behave, in a broad sense. SRS represents where and how
 * tetrominoes spawn, how they rotate, and what wall kicks they may perform.
 */

var __ = require('ramda/src/__');
var add = require('ramda/src/add');
var always = require('ramda/src/always');
var compose = require('ramda/src/compose');
var concat = require('ramda/src/concat');
var curry = require('ramda/src/curry');
var dec = require('ramda/src/dec');
var evolve = require('ramda/src/evolve');
var head = require('ramda/src/head');
var identical = require('ramda/src/identical');
var identity = require('ramda/src/identity');
var ifElse = require('ramda/src/ifElse');
var inc = require('ramda/src/inc');
var modulo = require('ramda/src/modulo');
var prop = require('ramda/src/prop');
var range = require('ramda/src/range');
var remove = require('ramda/src/remove');
var repeat = require('ramda/src/repeat');
var times = require('ramda/src/times');
var update = require('ramda/src/update');

/**
 * Normalization offset between board and piece.
 */
var OFFSET = 4;

var BOARD_WIDTH = 10;
var BOARD_HEIGHT = 20;

/**
 * All rotation states of all 7 tetrominoes. Based on the following 4x4 grid:
 *
 *  ABCD
 *  EFGH
 *  IJKL
 *  MNOP  (P is never used)
 */
var A = [0, 0],
    B = [1, 0],
    C = [2, 0],
    D = [3, 0],
    E = [0, 1],
    F = [1, 1],
    G = [2, 1],
    H = [3, 1],
    I = [0, 2],
    J = [1, 2],
    K = [2, 2],
    L = [3, 2],
    M = [0, 3],
    N = [1, 3],
    O = [2, 3];

var rotations = {
    I: [
        [E, F, G, H],
        [C, G, K, O],
        [I, J, K, L],
        [B, F, J, N]
    ],
    J: [
        [A, E, F, G],
        [B, C, F, J],
        [E, F, G, K],
        [B, F, I, J]
    ],
    L: [
        [C, E, F, G],
        [B, F, J, K],
        [E, F, G, I],
        [A, B, F, J]
    ],
    O: [
        [B, C, F, G]
    ],
    S: [
        [B, C, E, F],
        [B, F, G, K],
        [F, G, I, J],
        [A, E, F, J]
    ],
    T: [
        [B, E, F, G],
        [B, F, G, J],
        [E, F, G, J],
        [B, E, F, J]
    ],
    Z: [
        [A, B, F, G],
        [C, F, G, J],
        [E, F, J, K],
        [B, E, F, I]
    ]
};

// var rotations = {
//     I: [
//         ['....',
//          'OOOO',
//          '....',
//          '....'],

//         ['..O.',
//          '..O.',
//          '..O.',
//          '..O.'],

//         ['....',
//          '....',
//          'OOOO',
//          '....'],

//         ['.O..',
//          '.O..',
//          '.O..',
//          '.O..']
//     ],
//     J: [
//         ['O..',
//          'OOO',
//          '...'],

//         ['.OO',
//          '.O.',
//          '.O.'],

//         ['...',
//          'OOO',
//          '..O'],

//         ['.O.',
//          '.O.',
//          'OO.']
//     ],
//     L: [
//         [C, E, F, G],
//         [B, F, J, K],
//         [E, F, G, I],
//         [A, B, F, J]
//     ],
//     O: [
//         [B, C, F, G]
//     ],
//     S: [
//         [B, C, E, F],
//         [B, F, G, K],
//         [F, G, I, J],
//         [A, E, F, J]
//     ],
//     T: [
//         [B, E, F, G],
//         [B, F, G, J],
//         [E, F, G, J],
//         [B, E, F, J]
//     ],
//     Z: [
//         [A, B, F, G],
//         [C, F, G, J],
//         [E, F, J, K],
//         [B, E, F, I]
//     ]
// };

/**
 * Return a new empty row.
 *
 * @return {int[]}
 */
function createRow() {
    return repeat(0, BOARD_WIDTH);
}

/**
 * Create a new 10x20 board.
 *
 * @return {int[][]}
 */
function createBoard() {
    return times(createRow, BOARD_HEIGHT);
}

/**
 * Create a new tetromino in it's starting position above the visible playing
 * field.
 *
 * @param {string} shape Tetromino shape (I, J, L, O, S, T, Z)
 * @return {object}
 */
function createPiece(shape) {
    return {
        shape: shape,
        x: OFFSET - 1,
        y: -2,
        rotation: 0
    };
}

/**
 * Verify the given x,y coordinates are legal for an SRS board.
 *
 * @param {number} x X coord
 * @param {number} y Y coord
 * @return {boolean}
 */
function isWithinBounds(x, y) {
    return 0 <= x && x < BOARD_WIDTH && -2 <= y && y < BOARD_HEIGHT;
}

/**
 * Given a piece and rotation cell, return the adjusted x coordinate in
 * relation to an SRS board.
 *
 * @param {object} piece Tetromino piece
 * @return {number}
 */
function adjustX(piece, cell) {
    return cell[0] + piece.x;
}

/**
 * Given a piece and rotation cell, return the adjusted y coordinate in
 * relation to an SRS board.
 *
 * @param {object} piece Tetromino piece
 * @return {number}
 */
function adjustY(piece, cell) {
    return cell[1] + piece.y;
}

/**
 * Return whether the board positions corresponding with the given piece are
 * currently legal and unoccupied on the given board.
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {boolean}
 */
var isValidPosition = curry(function isValidPosition(piece, board) {
    return !rotations[piece.shape][piece.rotation].some(function(cell) {
        var boardX = adjustX(piece, cell);
        var boardY = adjustY(piece, cell);

        return !isWithinBounds(boardX, boardY) ||
            board[boardY][boardX] !== 0;
    });
});

/**
 * Given a piece and a board, return a new piece that is rotated 90 degrees
 * counter-clockwise.
 *
 * TODO: wall jumps
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Rotated piece
 */
function rotateLeft(piece, board) {
    return evolve({
        rotation: compose(modulo(__, rotations[piece.shape].length),
                          add(rotations[piece.shape].length),
                          dec)
    }, piece);
}

/**
 * Given a piece and a board, return a new piece that is rotated 90 degrees
 * clockwise
 *
 * TODO: wall jumps
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Rotated piece
 */
function rotateRight(piece, board) {
    return evolve({
        rotation: compose(modulo(__, rotations[piece.shape].length),
                          inc)
    }, piece);
}

/**
 * Given a piece and a board, return a new piece that is shifted based on the
 * given function.
 *
 * @param {function} fn Incrementing/decrementing function
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Shifted piece
 */
var shiftWith = curry(function shift(fn, property, piece, board) {
    return compose(
        ifElse(
            isValidPosition(__, board),
            identity,
            always(piece)
        ),
        evolve({ [property]: fn })
    )(piece);
});

/**
 * Given a piece and a board, return a new piece that is shifted one position
 * to the left if able. Otherwise return the original piece.
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Shifted piece
 */
var shiftLeft = shiftWith(dec, 'x');

/**
 * Given a piece and a board, return a new piece that is shifted one position
 * down if able. Otherwise return the original piece.
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Shifted piece
 */
var shiftRight = shiftWith(inc, 'x');

/**
 * Given a piece and a board, return a new piece that is shifted one position
 * to the left if able. Otherwise return the original piece.
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Shifted piece
 */
var shiftDown = shiftWith(inc, 'y');

function dropPiece(piece, board) {
    var lastPiece = piece;
    var nextPiece = piece;

    do {
        lastPiece = nextPiece;
        nextPiece = evolve({ y: inc }, lastPiece);
    } while (isValidPosition(nextPiece, board));

    return lastPiece;
}

/**
 * Given a piece and a board, return a new board with the piece applied.
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Game board
 */
function applyPiece(piece, board) {
    return rotations[piece.shape][piece.rotation]
        .reduce(function(result, cell) {
            var boardX = adjustX(piece, cell);
            var boardY = adjustY(piece, cell);

            return update(
                boardY,
                update(boardX, piece.shape, result[boardY]),
                result
            );
        }, board);
}

/**
 * Return whether a given row is complete.
 *
 * @param {mixed[]} row Row to test
 * @return {boolean}
 */
function isRowComplete(row) {
    return !row.some(identical(0));
}

/**
 * Return list of indexes of rows that have been completed.
 *
 * @param {object} board Game board
 * @return {number[]}
 */
function findCompletedRows(board) {
    return board.reduce(function(result, row, index) {
        if (isRowComplete(row)) {
            result.push(index);
        }
        return result;
    }, []);
}

function clearCompletedRows(board) {
    var completedRows = findCompletedRows(board);

    if (completedRows.length === 0) { return board; }

    return compose(
        concat(times(createRow, completedRows.length)),
        remove(head(completedRows), completedRows.length)
    )(board);
}

module.exports = {
    applyPiece: applyPiece,
    clearCompletedRows: clearCompletedRows,
    createBoard: createBoard,
    createPiece: createPiece,
    dropPiece: dropPiece,
    findCompletedRows: findCompletedRows,
    isValidPosition: isValidPosition,
    rotateLeft: rotateLeft,
    rotateRight: rotateRight,
    shiftLeft: shiftLeft,
    shiftRight: shiftRight,
    shiftDown: shiftDown
};
