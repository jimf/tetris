var _ = require('lodash');

function Block(options) {
    return _.pick(options, 'color', 'size', 'x', 'y');
}

module.exports = Block;
