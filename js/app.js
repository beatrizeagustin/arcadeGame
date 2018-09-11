// Enemies our player must avoid
var Enemy = function(xPosition, yPosition) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.xPosition = xPosition;
    this.yPosition = yPosition;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
 
     
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class User {
    constructor() {
        this.startx = 202;
        this.starty = 404;
        this.x = this.startx;
        this.y = this.starty;
        this.sprite = 'images/char-boy.png';
    }
}
//Draws User on the canvas
User.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handles users key moves - jumps every 101px x 83px
User.prototype.handleInput = function(moves) {
    // moves left 101px and prevents going off the board
     if (moves == 'left' && this.x > 0) {
         this.x -= 101;
     }   
    // moves up 83px 
    if (moves == 'up') {
        this.y -= 83;
    }
    // moves right 101px and prevents going off the board
    if (moves == 'right' && this.x < 404) {
        this.x += 101;
    }
    // moves down 83px and prevents going off the board
    if (moves == 'down' && this.y < 404) {
        this.y += 83;
    }
    // prevent User from going into the water/blue blocks
    if (this.y < 41) {
        this.x = this.startx;
        this.y = this.starty;
    }
}
// updates position
User.prototype.update = function(x, y) {
            this.x = x;
            this.y = y;
            //check if user x y position collides with each enemy's 
            for (let enemy of allEnemies) {
                if (this.x && this.y === enemy.xPosition && enemy.yPosition) {
                    // reset
                }
            }
        }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new User(202, 405);
const enemies = new Enemy();
const allEnemies = [];
// push new enemies into allEnemies
allEnemies.push(enemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
