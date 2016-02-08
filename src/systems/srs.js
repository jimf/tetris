/**
 * Super Rotation System, or SRS, is the current Tetris Guideline standard for
 * how tetrominoes behave, in a broad sense. SRS represents where and how
 * tetrominoes spawn, how they rotate, and what wall kicks they may perform.
 */

var range = require('ramda/src/range');

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
 * Create a new 10x20 board.
 *
 * @return {int[][]}
 */
function createBoard() {
    return range(0, 20).map(function() {
        return range(0, 10).map(function() {
            return 0;
        });
    });
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
        x: 3,
        y: -2,
        rotation: 0
    };
}

module.exports = {
    createBoard: createBoard,
    createPiece: createPiece
};
