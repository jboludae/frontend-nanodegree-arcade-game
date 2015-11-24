/*---------AVAILABLE HEROES-----------------------*/

/* We first take care of displaying the heroes in the
* "Welcome page". The idea is to display all heroes available.
* The player can choose one of them and then press SPACE.
* this function will be used by our "RESET" function */



function generateHeroes(){
    // We initialize an array with our hero images
    var avaImages = ['images/char-boy.png',
    'images/char-pink-girl.png',
    'images/char-horn-girl.png',
    'images/char-cat-girl.png']

    // We initialize an array with the display positions
    var displayPositions = [new Vector(80, 40),
    new Vector(197, 40),
    new Vector(314, 40),
    new Vector(431, 40)]

    // We populate an array with the available players
    var avaPlayers = [];
    avaImages.forEach(function(image){
        player = new Player(image);
        avaPlayers.push(player);
    });
    // We set their display positions
    for (var i = 0; i < avaPlayers.length; i++){
        avaPlayers[i].pos.setX(displayPositions[i].getX());
        avaPlayers[i].pos.setY(displayPositions[i].getY());
    }
    return avaPlayers;
};




/*-------------------VECTOR CLASS-----------------*/
/* We first initialize a helper class that will
* help us keep track of positions
* keep in mind that to go from square to square
* X has to vary in 101 units and Y has to vary
* in 83 units */

var Vector = function(x,y){
    this.x = x;
    this.y = y;
}

/* This two function help us retrieve the x
and y values of a vector*/

Vector.prototype.getX = function(){
    return this.x;
}
Vector.prototype.getY = function(){
    return this.y;
}

/* This two function help us set the x
and y values of a vector*/

Vector.prototype.setX = function(x){
    this.x = x;
}
Vector.prototype.setY = function(y){
    this.y = y;
}

/* This function multiplies a vector by
a given factor */
Vector.prototype.scale = function(factor){
    this.x = this.x * factor;
    this.y = this.y * factor;
}

Vector.prototype.sum = function(other){
    this.x = this.x + other.getX();
    this.y = this.y + other.getY();
}


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
    var width = 2*document.querySelector("canvas").width;
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

var Player = function(image){
    this.sprite = image;
    var startPos = new Vector(402, 652);
    this.pos = startPos;
    // var startX = 404;
    // var startY = 644;
    // this.x = startX;
    // this.y = startY;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.pos.getX(), this.pos.getY());
};

Player.prototype.handleInput = function(code){
    if (code === 'left' && this.pos.getX() > 0){
        this.pos.setX(this.pos.getX()-101);
    }else if (code === 'up' && this.pos.getY() > 0){
        this.pos.setY(this.pos.getY()-83);
    }else if (code === 'right' && this.pos.getX() < 1108){
        this.pos.setX(this.pos.getX()+101);
    }else if (code === "down" && this.pos.getY() < 902){
        this.pos.setY(this.pos.getY()+83);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy(-101,143,20,1.01), new Enemy(-101,60,20,1), new Enemy(-101,226,20,1)];

player = new Player('images/char-pink-girl.png');



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
[["w","w","w","w","w","w","w","w","w","w","w","w","w","w"],
["s","s","s","s","s","s","s","w","w","w","w","w","w","w"],
["s","s","s","s","s","s","s","w","w","w","w","w","w","w"],
["s","s","s","s","s","s","s","w","w","w","w","w","w","w"],
["g","g","s","g","s","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"],
["g","g","g","g","g","g","g","w","w","w","w","w","w","w"]];









