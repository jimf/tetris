var shuffle = require('lodash.shuffle');
var bag = [];

function resetBag() {
    bag = shuffle('IJLOSTZ'.split(''));
}

function nextShape() {
    return bag.pop();
}

module.exports = function() {
    if (!bag.length) {
        resetBag();
    }

    return nextShape();
};
