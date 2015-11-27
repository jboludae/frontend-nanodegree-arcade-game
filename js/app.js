
/*---------GLOBAL VARIABLES-----------------------*/
// We define some global variables that will define the 'state' of the game
// The event listener for key presses and the main() function in engine.js
// will react differently depending on the stage of the game.
// Note that none of this variables can be true simultaneously.
var welcomePage = true; // welcome page is displayed
var runningGame = false; // game runs at current level
var levelWon = false; // level won page is displayed
var gameWon = false; // victory page is displayed
var gameLost = false; // game over page is displayed

// We implement some variables to track game parameters:
var lives = 2; // These are the current lives
var currentLevel = 0; // Current level
var score = 0; // Current score
var heroe; // This is the 'heroe' object. Will be chosen and assigned in welcome page
var startPos; // Vector object representing the starting position of heroe.
var heroes; // Array of objects with the 4 different heroes available.
var selector; // Object selector. Will be used to choose heroe in welcome page
var gId = 0; // entities unique id#. gId will increase each time an entity is instantiated

/*---------GLOBAL CONSTANTS-----------------------*/
// Global
var LEVELS = {
    0: {},
    1: {},
    2: {},
};
LEVELS[0].background =
[['w','w','w','w','w','w','w','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','g','s','g','s','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','w','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','w','w','w','w','w','w','w','w','w','w','w']];

LEVELS[0].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','i','i','og','x','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','i','v','i','i','i','gg','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','tt','bg','i','h','i','bg','i','i','i','tt','i'],
['i','i','i','i','tt','tt','i','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','i','i','i','gg','i','i','i','i','i','i','i'],
['i','i','i','i','i','el','i','i','i','i','i','i'],
['i','og','pp','i','i','i','h','og','i','v','i','i'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];

LEVELS[1].background =
[['w','w','w','w','w','w','w','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','g','s','g','s','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','w','w','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','w','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','w','w','w','w','w','w','w','w','w','w','w']];

LEVELS[1].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','h','i','og','x','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','i','i','i','i','i','gg','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','tt','bg','i','i','i','bg','i','i','i','tt','i'],
['i','i','i','i','tt','tt','i','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','i','i','i','gg','i','i','i','i','i','i','i'],
['i','tt','i','i','i','el','i','i','i','pp','i','i'],
['i','og','i','i','i','i','i','og','i','v','i','i'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];

LEVELS[2].background =
[['w','w','w','w','w','w','w','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','s','s','s','s','s','s','w','w','w','w','w'],
['w','g','s','g','s','g','g','g','g','w','w','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','w','g','g','w','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','g','g','g','g','g','g','g','g','g','w','w'],
['w','g','g','g','g','g','g','g','g','g','g','w'],
['w','w','w','w','w','w','w','w','w','w','w','w']];

LEVELS[2].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','i','i','og','x','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','i','tt','tt','tt','i','gg','i','i','i','i','i'],
['i','i','i','tt','i','h','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','tt','bg','i','h','i','bg','i','i','i','tt','i'],
['i','i','i','i','tt','tt','i','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','h','i','i','i'],
['i','i','i','i','gg','i','i','i','i','i','i','i'],
['i','i','i','i','i','el','i','i','i','i','i','i'],
['i','og','pp','h','i','i','i','og','i','v','i','i'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];

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
    var displayPositions = [new Vector(80, 60),
    new Vector(197, 60),
    new Vector(314, 60),
    new Vector(431, 60)]

    // We populate an array with the available players
    var avaPlayers = [];
    avaImages.forEach(function(image){
        player = new Player(image);
        avaPlayers.push(player);
    });
    // We set their display positions
    for (var i = 0; i < avaPlayers.length; i++){
        avaPlayers[i].pos = displayPositions[i];
    }
    return avaPlayers;
};

/* We now create a "hero selector" that will allow us
*select our hero in the welcome page*/




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

Vector.prototype.subs = function(other){
    this.x = this.x - other.getX();
    this.y = this.y - other.getY();
}

/*-------------------ENTITY SUPERCLASS-----------------*/
/* Entities are objects that can interact with the player.
* These include enemies, gems, extra lives, water, the princess,
* and obstacles.
* They all have:
* position: a Vector object
* type: a string indicating the kind of interaction you can expect
* with the entity
* a size: a vector. Indicates the size of the entity
* They also have two methods:
* .update: updates the entity. In the superclass it will be empty.
* .render: renders the entity.
*/
var Entity = function(pos, sprite, type){
    this.pos = pos;
    this.sprite = sprite;
    this.type = type;
    this.size = new Vector(71, 53);
    this.id = gId;
    gId+=1;
};
Entity.prototype.update = function(){};
Entity.prototype.render = function(){
    if (this.sprite){
        ctx.drawImage(Resources.get(this.sprite), this.pos.getX(), this.pos.getY());
    };
};

/*-------------------BUG SUBCLASS-----------------*/

/* In addition to all ENTITY properties, a BUG has:
* a speed: an integer
* a direction: a string indicating direction of movement: "horizontal" or "vertical"
*/

var Bug = function(pos,speed, direction) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Entity.call(this,pos, 'images/enemy-bug.png', 'enemy');
    this.speed = speed;
    this.direction = direction;
};

Bug.prototype = Object.create(Entity.prototype);
Bug.prototype.construction = Bug;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Bug.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var distance = this.speed * dt;
    var distanceVector;
    var self = this;
    if (this.direction === "vertical"){
        distanceVector = new Vector(0, distance);
    }else if(this.direction === "horizontal"){
        distanceVector = new Vector(distance, 0);
    }
    this.pos.sum(distanceVector);
    LEVELS[currentLevel].objects.forEach(function(thing){
        if (thing.id !== self.id)
            if (thing.type === "obstacle" || thing.type === "enemy" || thing.type === "princess"){
                if (touch(self,thing)){
                    self.pos.subs(distanceVector);
                    self.speed = -self.speed;
                }
            };
    });
};

/*---------WATER CLASS-----------------------*/
var Water = function(pos){
    Entity.call(this,pos, null, 'enemy');
};
Water.prototype = Object.create(Entity.prototype);
Water.prototype.constructor = Water;

/*---------COLLECTIBLE CLASS-----------------------*/
var Collectible = function(pos, sprite, type, lifeEffect, scoreIncrease,collected){
    Entity.call(this, pos, sprite, type);
    this.lifeEffect = lifeEffect;
    this.scoreIncrease = scoreIncrease;
    this.collected = false; // by default
    this.gemPosition = 0; // by default. This will be changed when player collects gem
}
Collectible.prototype = Object.create(Entity.prototype);
Collectible.prototype.constructor = Collectible;
Collectible.prototype.render = function(){
    if (this.collected === false){
        ctx.save();
        ctx.translate(this.pos.getX()+22, this.pos.getY()+54);
        ctx.scale(0.55,0.55);
        ctx.drawImage(Resources.get(this.sprite), 0, 0);
        ctx.restore();
    }else{
        ctx.save();
        ctx.translate(this.pos.getX()+72, this.pos.getY()+84+this.gemPosition);
        ctx.scale(0.35,0.35);
        ctx.drawImage(Resources.get(this.sprite), 0, 0);
        ctx.restore();
    };
};

var GreenGem = function(pos){
    Collectible.call(this, pos,'images/gemGreen.png','gem',0,100);
};
GreenGem.prototype = Object.create(Collectible.prototype);
GreenGem.prototype.constructor = GreenGem;

var BlueGem = function(pos){
    Collectible.call(this, pos,'images/gemBlue.png','gem',0,300);
};
BlueGem.prototype = Object.create(Collectible.prototype);
BlueGem.prototype.constructor = BlueGem;

var OrangeGem = function(pos){
    Collectible.call(this, pos,'images/gemOrange.png','gem',0,100);
};
OrangeGem.prototype = Object.create(Collectible.prototype);
OrangeGem.prototype.constructor = OrangeGem;

var ExtraLife = function(pos){
    Collectible.call(this, pos,'images/Heart.png','life',0,1);
};
ExtraLife.prototype = Object.create(Collectible.prototype);
ExtraLife.prototype.constructor = ExtraLife;

/*---------PRINCESS CLASS-----------------------*/

var Princess = function(pos){
    Entity.call(this,pos,'images/char-princess-girl.png', 'princess');
};
Princess.prototype = Object.create(Entity.prototype);
Princess.prototype.constructor = Princess;

/*---------OBSTACLE CLASSES-----------------------*/

var Obstacle = function(pos,sprite){
    Entity.call(this,pos,sprite,'obstacle');
}
Obstacle.prototype = Object.create(Entity.prototype);
Obstacle.prototype.constructor = Obstacle;

var TreeTall = function(pos){
    Obstacle.call(this,pos,'images/treeTall.png');
}
TreeTall.prototype = Object.create(Obstacle.prototype);
TreeTall.prototype.constructor = TreeTall;

/*---------PLAYER CLASS-----------------------*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(image,pos){
    this.sprite = image;
    this.pos = pos;
    this.size = new Vector(81, 63);
    this.type = "player";
    this.gemStack = 0; // This will describe the height of the gem stack
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.pos.getX(), this.pos.getY());
};
var lastHeroePos = new Vector;
Player.prototype.handleInput = function(code){
    lastHeroePos.setX(this.pos.getX());
    lastHeroePos.setY(this.pos.getY());
    if (code === 'left' && this.pos.getX() > 0){
        this.pos.setX(this.pos.getX()-101);
    }else if (code === 'up' && this.pos.getY() > 0){
        this.pos.setY(this.pos.getY()-83);
    }else if (code === 'right' && this.pos.getX() < 1108){
        this.pos.setX(this.pos.getX()+101);
    }else if (code === "down" && this.pos.getY() < 902){
        this.pos.setY(this.pos.getY()+83);
    };
    if (this.checkCollisions(currentLevel)){
        this.pos.setX(lastHeroePos.getX());
        this.pos.setY(lastHeroePos.getY());
    }

};

Player.prototype.checkCollisions = function(currentLevel){
    // we create a copy of the level objects list
    var copy=[];
    var result = false;
    // We need to pass the "this" variable to the functions
    // in forEach. To do this we create the self variable.
    var self = this;
    LEVELS[currentLevel].objects.forEach(function(thing){
        if (touch(self, thing)){
            switch (thing.type){
                // If player touches enemy, we remove a live
                // and return the player to its starting position.
                case 'enemy':
                    lives--;
                    if (lives < 1){
                        gameLost = true;
                        runningGame = false;
                    }
                    self.pos.setX(startPos.getX());
                    self.pos.setY(startPos.getY());
                    break;
                case 'gem':
                    thing.pos = self.pos;
                    if (thing.collected === false){
                        thing.gemPosition = self.gemStack;
                        self.gemStack -= 10;
                        score += thing.scoreIncrease;
                        copy.push(thing);
                    }
                    thing.collected = true;
                    break;
                case 'life':
                    lives = lives + 1;
                    thing.pos.setX(100000);
                    break;
                case 'obstacle':
                    result = true;
                    break;
                case 'princess':
                    currentLevel++;
                    heroe.gemStack = 0;
                    if (currentLevel<3){
                        levelWon = true;
                        runningGame = false;
                    }else{
                        gameWon = true;
                        runningGame = false;
                    }
                    break;
                default:
                    break;
            }
        }
    });
    //This is a trick. Collected elements will be put at the end of the object list
    // That way they are drawn in the proper order.
    if (runningGame){
        LEVELS[currentLevel].objects = LEVELS[currentLevel].objects.concat(copy);
    };
    return result;
};

/* This helper function returns true if two objects are touching
* each other and false otherwise*/
function touch(objectA, objectB){
    var aX = objectA.pos.getX();
    var aY = objectA.pos.getY();
    var aXPlus = aX + objectA.size.getX();
    var aYPlus = aY + objectA.size.getY();

    var bX = objectB.pos.getX();
    var bY = objectB.pos.getY();
    var bXPlus = bX + objectB.size.getX();
    var bYPlus = bY + objectB.size.getY();

    if (aX >= bX && aX <= bXPlus){
        if (aY >= bY && aY <= bYPlus){
            return true;
        } else if (aYPlus >= bY && aYPlus <= bYPlus){
            return true;
        }
    }else if (aXPlus >= bX && aXPlus <= bXPlus){
        if (aY >= bY && aY <= bYPlus){
            return true;
        } else if (aYPlus >= bY && aYPlus <= bYPlus){
            return true;
        }
    }else{
        return false;
    }
}

/*---------SELECTOR CLASS-----------------------*/

var Selector = function(){
    this.sprite = 'images/selector.png';
    this.heroeIndex = 1;
    this.pos = new Vector(197,60);
}

Selector.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.pos.getX(), this.pos.getY());
};

Selector.prototype.handleInput = function(code){
    var xPos = this.pos.getX();
    switch(code){
        case 'left':
            if (this.heroeIndex>0){
                this.pos.setX(xPos - 117);
                this.heroeIndex--;
            };
            break;
        case 'right':
            if (this.heroeIndex<heroes.length-1){
                this.pos.setX(xPos + 117);
                this.heroeIndex++;
            };
            break;
        case 'space':
            heroe = heroes[this.heroeIndex];
            LEVELS[currentLevel].objects = [];
            loopLevelArr(LEVELS[currentLevel].background,LEVELS[0].objects);
            loopLevelArr(LEVELS[currentLevel].stuff,LEVELS[0].objects);
            // We set the starting position of the heroe
            heroe.pos.setX(startPos.getX());
            heroe.pos.setY(startPos.getY());
            // Having selected the heroe, we change the state of the game
            welcomePage = false;
            runningGame = true;
            break;
        default:
            break;
    }
}
// We initialize a new selector, this is called in the init()
// function
function initializeSelector(){
    selector = new Selector;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// The event listener for key presses behaves differently depending
// on the "state" of the game
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
    };
    var code = allowedKeys[e.keyCode];
    if (welcomePage === true){
        selector.handleInput(code);
    }else if(runningGame === true){
        heroe.handleInput(code);
    }else if(levelWon === true){
        if (code === 'space'){
            currentLevel++;
            LEVELS[currentLevel].objects = [];
            loopLevelArr(LEVELS[currentLevel].background,LEVELS[currentLevel].objects);
            loopLevelArr(LEVELS[currentLevel].stuff,LEVELS[currentLevel].objects);
            heroe.pos.setX(startPos.getX());
            heroe.pos.setY(startPos.getY());
            levelWon = false;
            runningGame = true;
        }
    }else if(gameWon === true || gameLost === true){
        if (code === 'space'){
            location.reload();
        }
    }
});

/* The following collection of arrays provide several "maps" that will be
loaded by the engine as we progress through the LEVELS */




// We now loop through both lists and automatically generate
// the list of objects that will be displayed in the map


// i: nothing, free space
// gg: green gem
// bg: blue gem
// og: orange gem
// h: horizontal enemy
// v: vertical enemy
// r: rock
// tt: tree tall
// pp: princess
// x: player
// el: extra life

// We define a helper function that will allow us to automatically
// create a list of objects. Given an "arr" with characters and
// a dest array. It will loop through arr and push the adequate
// objects to the dest array

function loopLevelArr(arr,dest){
    for (row = 0; row < arr.length; row++){
        for (col = 0; col < arr.length; col++){
            var location = new Vector(col * 101, -20+row * 83);
            switch (arr[row][col]){
                case 'w':
                    dest.push(new Water(location));
                    break;
                case 'i':
                    break;
                case 'gg':
                    dest.push(new GreenGem(location));
                    break;
                case 'bg':
                    dest.push(new BlueGem(location));
                    break;
                case 'og':
                    dest.push(new OrangeGem(location));
                    break;
                case 'h':
                    dest.push(new Bug(location,120,"horizontal"));
                    break;
                case 'v':
                    dest.push(new Bug(location,120,"vertical"));
                    break;
                case 'r':
                    break;
                case 'tt':
                    dest.push(new TreeTall(location));
                    break;
                case 'pp':
                    dest.push(new Princess(location));
                    break;
                // As player is already initialized, all we do here is to set
                // the starting position
                case 'x':
                    startPos = new Vector;
                    startPos.setX(location.getX());
                    startPos.setY(location.getY());
                    break;
                case 'el':
                    dest.push(new ExtraLife(location));
                    break;
                default:
                    break;
            }
        }
    }
}
