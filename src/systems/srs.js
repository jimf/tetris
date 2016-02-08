/**
 * All rotation states of all 7 tetrominoes. Based on the following 4x4 grid:
 *
 *  ABCD
 *  EFGH
 *  IJKL
 *  MNOP  (P is never used)
 */
// var A = [0, 0],
//     B = [1, 0],
//     C = [2, 0],
//     D = [3, 0],
//     E = [0, 1],
//     F = [1, 1],
//     G = [2, 1],
//     H = [3, 1],
//     I = [0, 2],
//     J = [1, 2],
//     K = [2, 2],
//     L = [3, 2],
//     M = [0, 3],
//     N = [1, 3],
//     O = [2, 3];

var rotations = {
    // I: [
    //     [E, F, G, H],
    //     [C, G, K, O],
    //     [I, J, K, L],
    //     [B, F, J, N]
    // ],
    I: [
        ['....',
         'OOOO',
         '....',
         '....'],

        ['..O.',
         '..O.',
         '..O.',
         '..O.'],

        ['....',
         '....',
         'OOOO',
         '....'],

        ['.O..',
         '.O..',
         '.O..',
         '.O..']
    ],
    // J: [
    //     [A, E, F, G],
    //     [B, C, F, J],
    //     [E, F, G, K],
    //     [B, F, I, J]
    // ],
    J: [
        ['O..',
         'OOO',
         '...'],

        ['.OO',
         '.O.',
         '.O.'],

        ['...',
         'OOO',
         '..O'],

        ['.O.',
         '.O.',
         'OO.']
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
