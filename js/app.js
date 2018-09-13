// Enemies our player must avoid
var Enemy = function(xPos, yPos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xPos; // set initial poistion
    this.y = yPos;
    this.move = 101; // moves 101px right
    this.speed = 200; // initial speed
    this.restartPos = -150; // restarts position
    
  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;
   
    // if enemy reaches 500px at the end of the board
      if (this.x > 500) {
        this.x = this.restartPos; 
        // sets random speed after first render
        this.speed = 150 + Math.floor(Math.random() * this.speed);
         
    } 
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
        this.startX = 202;
        this.startY = 395;
        this.x = this.startX; // starting positions
        this.y = this.startY;
        this.sprite = 'images/char-princess-girl.png';
    }
    
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}
// draws User on the canvas. You can place this inside User class
// can put this in user class
User.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handles users key moves - jumps every 101px x 83px
// can put this inside user class
User.prototype.handleInput = function(moves) {
    // moves left 101px and prevents going off the board
     if (moves == 'left' && this.x > 0) {
         this.x -= 101;
     }   
    // moves up 83px 
    if (moves == 'up') {
        this.y -= 85;
    }
    // moves right 101px and prevents going off the board
    if (moves == 'right' && this.x < 404) {
        this.x += 101;
    }
    // moves down 83px and prevents going off the board
    if (moves == 'down' && this.y < 395) {
        this.y += 85;
    }
    // prevent User from going into the water/blue blocks
    // resets position
    if (this.y < 41.5) {
        setTimeout(() => {
            this.x = this.startX;
            this.y = this.startY; 
        }, 200)
       
        // time and score ++ 
    }
}
// updates position
// can put this insude user class
User.prototype.update = function() {
            //check if user x y position collides with each enemy's 
            
            for (let enemy of allEnemies) {
                if (this.y == enemy.y && this.x < enemy.x + 80 && enemy.x < this.x + 80) {
                   this.reset()
                }
            }
        }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new User();
const enemy1 = new Enemy(101, 55);
const enemy2 = new Enemy(99, 55);
const enemy3 = new Enemy(85, 140);
const enemy4 = new Enemy(75, 140);
const enemy5 = new Enemy(50, 225);
const allEnemies = [];
// push new enemies into allEnemies
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

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
