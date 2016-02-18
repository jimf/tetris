var test = require('tape');
var times = require('ramda/src/times');
var subject = require('../src/rng');

test('rng: next shape', function(t) {
    var results = {};

    function getNext() {
        results[subject()] = true;
    }

    times(getNext, 7);

    var actual = Object.keys(results);
    actual.sort();

    t.deepEqual(actual, 'IJLOSTZ'.split(''),
                'deals all 7 tetrominoes before generating a new bag');

    t.end();
});
