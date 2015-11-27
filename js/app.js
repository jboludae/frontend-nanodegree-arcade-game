
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
var BUG_SPEED = 150; // This is the reference speed for the bugs

// Three levels are kept in a dictionary of objects: 0, 1, 2
// Each level object contains an array:
// levels[number].background contains the background elements: grass, water, stone
// levels[number].stuff contains the interactive stuff: gems, trees, bugs, etc.
// Each character of these arrays will be assigned to an entity 'class'.
// This allows us to create new levels in an easy way.

//Background character codes:
// w: water
// s: stone
// g: grass

//Stuff character codes:
// i: nothing, free space
// gg: green gem
// bg: blue gem
// og: orange gem
// hh: horizontal enemy
// vv: vertical enemy
// rr: rock
// tt: tree tall
// pp: princess
// xx: player
// el: extra life

var levels = {
    0: {},
    1: {},
    2: {},
};
levels[0].background =
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

levels[0].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','i','i','og','xx','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','i','vv','i','i','i','gg','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','tt','bg','i','hh','i','bg','i','i','i','tt','i'],
['i','i','i','i','tt','tt','i','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','i','i','i','gg','i','i','i','i','i','i','i'],
['i','i','i','i','i','el','i','i','i','i','i','i'],
['i','og','pp','i','i','i','hh','og','i','vv','i','i'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];

levels[1].background =
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

levels[1].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','hh','i','og','xx','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','i','i','i','i','i','gg','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','tt','bg','i','i','i','bg','i','i','i','tt','i'],
['i','i','i','i','tt','tt','i','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','i','i','i','i'],
['i','i','i','i','gg','i','i','i','i','i','i','i'],
['i','tt','i','i','i','el','i','i','i','pp','i','i'],
['i','og','i','i','i','i','i','og','i','vv','i','i'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];

levels[2].background =
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

levels[2].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','i','i','og','xx','i','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','i','tt','tt','tt','i','gg','i','i','i','i','i'],
['i','i','i','tt','i','hh','i','i','i','i','i','i'],
['i','gg','i','i','i','i','i','i','i','i','i','i'],
['i','tt','bg','i','hh','i','bg','i','i','i','tt','i'],
['i','i','i','i','tt','tt','i','i','i','i','i','i'],
['i','i','i','bg','i','i','i','i','hh','i','i','i'],
['i','i','i','i','gg','i','i','i','i','i','i','i'],
['i','i','i','i','i','el','i','i','i','i','i','i'],
['i','og','pp','hh','i','i','i','og','i','vv','i','i'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];

/*---------HELPER FUNCTIONS-----------------------*/

// loopLevelArr will help us to automatically create
// a list of entities for each of the levels.
// Given an "arr" with characters and a dest array. It will loop
// through arr and push the adequate objects to the dest array.
// It will be called before starting each of the levels.

function loopLevelArr(arr,dest){
    arr.forEach(function(row, rowIndex){
        row.forEach(function(element, colIndex){
            var location = new Vector(colIndex * 101, -20+rowIndex * 83);
            // var location translates from position in a matrix to
            // positions in canvas. I have adjusted the numbers by trial and error.
            switch (element){
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
                case 'hh':
                    dest.push(new Bug(location,BUG_SPEED,"horizontal"));
                    break;
                case 'vv':
                    dest.push(new Bug(location,BUG_SPEED,"vertical"));
                    break;
                case 'rr':
                    break;
                case 'tt':
                    dest.push(new TreeTall(location));
                    break;
                case 'pp':
                    dest.push(new Princess(location));
                    break;
                // As player is already initialized, all we do here is to set
                // the starting position
                case 'xx':
                    startPos = new Vector;
                    startPos.setX(location.getX());
                    startPos.setY(location.getY());
                    break;
                case 'el':
                    dest.push(new ExtraLife(location));
                    break;
                default:
                    break;
            };
        });
    });
};

/* Generate heroes automatically generates an array of heroes
* that will be displayed in the welcome page. The result of
* this functio will be assigne to global variable heroes. */

function generateHeroes(){
    // We build an array with our hero images
    var avaImages = ['images/char-boy.png',
    'images/char-pink-girl.png',
    'images/char-horn-girl.png',
    'images/char-cat-girl.png']

    // We build an array with the display positions in the welcome screen
    var displayPositions = [new Vector(80, 60),
    new Vector(197, 60),
    new Vector(314, 60),
    new Vector(431, 60)]

    // We populate an array with heroes
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

/*-------------------VECTOR CLASS-----------------*/
/* We first initialize a helper class that will
* help us keep track of positions the position of
* every entity in the game.
*/

var Vector = function(x,y){
    this.x = x;
    this.y = y;
}

/* This two functions help us retrieve the x
and y values of a vector*/

Vector.prototype.getX = function(){
    return this.x;
}
Vector.prototype.getY = function(){
    return this.y;
}

/* This two functions help us set the x
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
* They all have at least the following properties:
* position: a Vector object
* sprite: string indicating the image to load
* type: a string indicating the kind of interaction you can expect
* size: a vector object. Indicates the size of the entity.
* id: this will allow us identify objects.
*/

var Entity = function(pos, sprite, type){
    this.pos = pos;
    this.sprite = sprite;
    this.type = type;
    this.size = new Vector(71, 53);
    this.id = gId;
    gId+=1; // We increase gId every time we instantiate an entity
};

/* Entities also have at least two methods:
* .update: updates the entity. In the superclass it will be empty: not
* all entities move. For example water and trees.
* .render: renders the entity on the canvas*/
Entity.prototype.update = function(){};
Entity.prototype.render = function(){
    if (this.sprite){
        ctx.drawImage(Resources.get(this.sprite), this.pos.getX(), this.pos.getY());
    };
};

/*-------------------BUG SUBCLASS-----------------*/
/* You must avoid bugs as they have the 'enemy' type.
* In addition to all ENTITY properties, a bug has:
* a speed: an integer
* a direction: string "horizontal" or "vertical"*/
var Bug = function(pos,speed, direction) {
    Entity.call(this,pos, 'images/enemy-bug.png', 'enemy'); // Bug is an Entity subclass
    this.speed = speed;
    this.direction = direction;
    this.displayDirection = true; // enemies will be displayed facing forward at start
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
    // We convert distance to vector so
    if (this.direction === "vertical"){
        distanceVector = new Vector(0, distance); // "vertical" enemies will move vertically
    }else if(this.direction === "horizontal"){
        distanceVector = new Vector(distance, 0); // "horizontal" enemies will move horizontally
    }
    this.pos.sum(distanceVector);
    // Every time we updat a bug position it will check for obstacles
    this.checkCollision(distanceVector);
};
// checkCollision allows a bug to check if it has collided into an enemy, obstacle or
// princess
Bug.prototype.checkCollision = function(distanceVector){
    self = this;
    levels[currentLevel].objects.forEach(function(thing){
        if (thing.id !== self.id)
            if (thing.type === "obstacle" || thing.type === "enemy" || thing.type === "princess"){
                if (touch(self,thing)){
                    self.pos.subs(distanceVector);
                    self.speed = - self.speed;
                    console.log(self.id + " direction " + self.displayDirection);
                    self.displayDirection = self.displayDirection ? false : true; // this will toggle the display direction
                    console.log(self.id + " direction changed to " + self.displayDirection);
                }
            };
    });
};
// We override the render function so bugs are displayed correctly.

Bug.prototype.render = function(){
    if (this.direction === "horizontal"){
        if (this.displayDirection){
            ctx.drawImage(Resources.get(this.sprite), this.pos.getX(), this.pos.getY());
        }else{
            // We have to write a bunch of transformations so the sprite is displayed
            // in the oposite direction when it hits an obstacle
            ctx.save();
            ctx.translate(this.pos.getX()+101,this.pos.getY());
            ctx.scale(-1,1);
            ctx.drawImage(Resources.get(this.sprite),0,0);
            ctx.restore();
        };
    }else if(this.direction === "vertical"){
        if (this.displayDirection){
            ctx.save();
            ctx.translate(this.pos.getX()+161,this.pos.getY()+62.5);
            ctx.rotate(Math.PI/2);
            ctx.drawImage(Resources.get(this.sprite), 0,0);
            ctx.restore();
        }else{
            ctx.save();
            ctx.translate(this.pos.getX()-61,this.pos.getY()+162.5);
            ctx.rotate(Math.PI+Math.PI/2);
            ctx.drawImage(Resources.get(this.sprite), 0,0);
            ctx.restore();
        };
    };
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
    levels[currentLevel].objects.forEach(function(thing){
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
        levels[currentLevel].objects = levels[currentLevel].objects.concat(copy);
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
            levels[currentLevel].objects = [];
            loopLevelArr(levels[currentLevel].background,levels[0].objects);
            loopLevelArr(levels[currentLevel].stuff,levels[0].objects);
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
            levels[currentLevel].objects = [];
            loopLevelArr(levels[currentLevel].background,levels[currentLevel].objects);
            loopLevelArr(levels[currentLevel].stuff,levels[currentLevel].objects);
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

