let scores = 0;
// Enemies our player must avoid
var Enemy = function(xPos, yPos) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xPos; // set initial poistion
    this.y = yPos;
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
   
    // resets position if enemy reaches 500px at the end of the board
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
        this.startX = 202; // starting positions
        this.startY = 395;
        this.x = this.startX; // pass into new variables so there are no conflicts
        this.y = this.startY;
        this.sprite = 'images/char-princess-girl.png';
    }
    
    reset() {
        // resets player at starting position
        this.x = this.startX;
        this.y = this.startY;
        // removes star animation css property as a reset
        setTimeout(() => { 
            document.getElementById("stars").style.animation = "";
        }, 400) 
    }
    
    score() {
        // plays win sound
        winSound.play();
        // adds 1 point and animation  
        scores++;
        document.getElementById("score").innerHTML = scores;
        document.getElementById("stars").style.animation = "win 0.5s linear";
        
      if (scores === 1) {
            // appends score reset button
            const btn = document.createElement('button');
            const text = document.createTextNode('reset');      
            btn.appendChild(text);                              
            document.getElementById('reset_button').appendChild(btn); 
            btn.onclick = function() {
                // resets score and button
                scores = 0;
                document.getElementById("score").innerHTML = scores;
                document.getElementById('reset_button').innerHTML = '';
            }
      }
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
    // plays jump sound only with these keys
   if (moves == 'left' || moves == 'up' || moves == 'right' || moves == 'down') {
        jumpSound.play();
    }
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
    // prevent User from going into/beyond the blue blocks
    // resets and adds star score animation
    if (this.y < 41.5) {
        this.score(); 
        setTimeout(() => {
            this.reset();
        }, 100) 
    }
}
// updates position
// can put this inside user class
User.prototype.update = function() {
    //check if user x y position collides with each enemy's 
    for (let enemy of allEnemies) {
        // if User and Enemy's y coordinates match
        // if '' x falls between own x plus 80px 
        if (this.y == enemy.y && this.x < enemy.x + 80 && enemy.x < this.x + 80) {
            // resets
            setTimeout(() => {
                this.reset();
                // plays lose sound
                loseSound.play();
                // sets lose animation
                document.getElementById("stars").style.animation = "lose 0.5s linear";
            }, 100) 
        }
    }
}

// sound constructor from https://www.w3schools.com/graphics/game_sound.asp
class sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
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
// instantiate sounds - from freesounds.com
const jumpSound = new sound('sounds/167045__drminky__slime-jump.wav');
const winSound = new sound('sounds/350875__cabled-mess__coin-c-07.wav');
const loseSound = new sound('sounds/233343__otisjames__squitch.wav');
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
