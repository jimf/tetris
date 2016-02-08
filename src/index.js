var Game = require('./game');

var game = new Game(document.getElementById('game'), {
    height: window.innerHeight - 40
});

game.start();
window.game = game;
