var Game = require('./game');
var CanvasRenderer = require('./renderers/canvas');
var KeyboardInputter = require('./inputters/keyboard');

var game = new Game({
    renderer: new CanvasRenderer(document.getElementById('game'), {
        height: window.innerHeight - 40
    }),
    inputter: new KeyboardInputter()
});

game.start();
window.game = game;
