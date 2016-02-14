var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

function KeyboardInputter() {
    var keyState = {};

    window.addEventListener('keydown', function(e) {
        keyState[e.keyCode] = true;
    });

    window.addEventListener('keyup', function(e) {
        keyState[e.keyCode] = false;
    });

    function isPressed(keyCode) {
        return function() {
            return keyState[keyCode] === true;
        };
    }

    return {
        leftPressed:  isPressed(LEFT),
        upPressed:    isPressed(UP),
        rightPressed: isPressed(RIGHT),
        downPressed:  isPressed(DOWN)
    };
}

module.exports = KeyboardInputter;
