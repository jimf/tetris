/**
 * Super Rotation System, or SRS, is the current Tetris Guideline standard for
 * how tetrominoes behave, in a broad sense. SRS represents where and how
 * tetrominoes spawn, how they rotate, and what wall kicks they may perform.
 */

var __ = require('ramda/src/__');
var add = require('ramda/src/add');
var always = require('ramda/src/always');
var compose = require('ramda/src/compose');
var curry = require('ramda/src/curry');
var dec = require('ramda/src/dec');
var evolve = require('ramda/src/evolve');
var identity = require('ramda/src/identity');
var ifElse = require('ramda/src/ifElse');
var inc = require('ramda/src/inc');
var modulo = require('ramda/src/modulo');
var range = require('ramda/src/range');
var times = require('ramda/src/times');

/**
 * Normalization offset between board and piece.
 */
var OFFSET = 4;

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
    return range(0, 10).map(function() {
        return 0;
    });
}

/**
 * Create a new 10x20 board.
 *
 * @return {int[][]}
 */
function createBoard() {
    return times(createRow, 20);
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
    return 0 <= x && x < 10 && 0 <= y && y < 20;
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
    return !rotations[piece.shape][piece.rotation].some(function(block) {
        var blockX = block[0] + piece.x;
        var blockY = block[1] + piece.y;

        return !isWithinBounds(blockX, blockY) ||
            board[blockY][blockX] !== 0;
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
 * Given a piece and a board, return a new piece that is shifted one position
 * to the left if able. Otherwise return the original piece.
 *
 * @param {object} piece Tetromino piece
 * @param {object} board Game board
 * @return {object} Shifted piece
 */
function shiftLeft(piece, board) {
    return compose(
        ifElse(
            isValidPosition(__, board),
            identity,
            always(piece)
        ),
        evolve({ x: dec })
    )(piece);
}

module.exports = {
    createBoard: createBoard,
    createPiece: createPiece,
    isValidPosition: isValidPosition,
    rotateLeft: rotateLeft,
    rotateRight: rotateRight,
    shiftLeft: shiftLeft
};
