// Enemies our player must avoid
var Enemy = function(x,y,speed,acceleration) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.startSpeed = speed;
    this.acceleration = acceleration;
    this.startX = x;
    this.startY = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var width = document.querySelector("canvas").width;
    if (this.x > width){
        this.x = this.startX;
        this.speed = this.startSpeed;
    }
    this.x += this.speed*dt;
    this.speed *= this.acceleration;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/char-boy.png';
    var startX = 202;
    var startY = 322;
    this.x = startX;
    this.y = startY;
};

Player.prototype.update = function(dt){

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt){

};

Player.prototype.handleInput = function(code){
    if (code === 'left' && this.x > 0){
        this.x -= 101;
    }else if (code === 'up' && this.y > 0){
        this.y -= 83;
    }else if (code === 'right' && this.x < 505){
        this.x += 101;
    }else if (code === "down" && this.y < 405){
        this.y += 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy(-101,143,20,1.01), new Enemy(-101,60,20,1), new Enemy(-101,226,20,1)];

player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* The following collection of arrays provide several "maps" that will be
loaded by the engine as we progress through the levels */

var mapLevels =
[["w","w","w","w","w","w"],
["s","s","s","s","s","s"],
["s","s","s","s","s","s"],
["s","s","s","s","s","s"],
["g","g","s","g","s","g"],
["g","g","g","g","g","g"]];









