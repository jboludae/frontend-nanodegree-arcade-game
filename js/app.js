
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
var lives = 3; // These are the current lives
var currentLevel = 0; // Current level
var score = 0; // Current score
var levelScore = 0; // Keeps track of the level score
var heroe; // This is the 'heroe' object. Will be chosen and assigned in welcome page
var startPos; // Vector object representing the starting position of heroe.
var heroes; // Array of objects with the 4 different heroes available.
var selector; // Object selector. Will be used to choose heroe in welcome page
var gId = 0; // entities unique id#. gId will increase each time an entity is instantiated
var MIN_BUG_SPEED = 1; // This is starting speed for the bugs
var BUG_INT_SPEED = 290;
var MAX_BUG_SPEED = 600; // This is the max speed for the bugs

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
// ts: tree short
// tu: tree ugly
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
['w','s','s','s','s','s','s','s','s','s','s','g'],
['w','g','g','g','g','g','g','g','s','w','w','g'],
['w','s','s','s','s','s','s','s','s','s','s','g'],
['w','s','g','g','g','g','g','g','g','g','g','g'],
['w','s','s','s','g','s','g','s','g','s','s','g'],
['w','g','s','s','s','s','s','s','s','s','g','g'],
['w','g','g','g','g','g','g','g','g','g','g','g'],
['w','g','w','g','g','g','g','g','g','g','w','g'],
['w','g','g','g','g','g','g','g','g','g','g','g'],
['w','g','w','g','g','g','g','g','g','g','w','g'],
['w','g','g','g','g','g','g','g','g','g','g','g'],
['w','w','w','w','w','w','w','w','w','w','w','w']];

levels[0].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','pp','i','i','xx','i','i','i','i','i','gg','tt'],
['i','tt','tt','tt','tt','tt','tt','tt','i','i','i','tt'],
['i','i','hh','i','i','i','gg','i','i','i','gg','tt'],
['i','i','ts','ts','ts','ts','ts','ts','ts','ts','ts','tt'],
['i','gg','i','i','rr','i','rr','i','rr','i','og','tt'],
['i','tt','bg','i','hh','i','bg','i','i','i','tt','tt'],
['i','i','i','i','ts','tt','tt','tt','ts','i','i','tt'],
['i','i','i','bg','i','vv','i','i','i','i','i','tt'],
['i','i','i','i','rr','el','ts','ts','rr','i','i','tt'],
['i','i','i','i','i','i','i','i','i','i','i','tt'],
['i','og','i','i','i','i','hh','i','i','vv','gg','tt'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];
levels[1].background =
[['w','w','w','w','w','w','w','w','w','w','w','w'],
['w','s','s','s','w','w','w','s','s','s','s','g'],
['w','s','s','s','w','w','w','g','s','s','s','g'],
['w','s','s','s','w','w','w','g','g','g','s','g'],
['w','w','w','s','w','s','g','g','g','g','g','g'],
['w','w','w','s','s','s','s','g','g','g','g','g'],
['w','w','w','s','w','s','s','g','g','g','g','g'],
['w','w','w','g','g','g','s','g','g','g','g','g'],
['w','w','g','g','g','w','g','g','g','g','w','g'],
['w','g','g','g','w','w','g','g','g','w','w','g'],
['w','g','g','w','w','w','g','g','w','w','w','g'],
['w','g','g','g','g','g','g','g','g','g','g','g'],
['w','w','w','w','w','w','w','w','w','w','w','w']];

levels[1].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','pp','i','xx','i','i','i','i','gg','i','i','tt'],
['i','gg','hh','i','i','i','i','i','hh','bg','i','tt'],
['i','i','gg','i','i','i','i','tt','tt','tt','i','tt'],
['i','i','i','gg','i','i','i','rr','i','i','i','tt'],
['i','i','i','vv','gg','i','i','i','i','i','i','tt'],
['i','i','i','i','i','i','i','i','i','i','tt','tt'],
['i','i','i','i','i','i','i','og','vv','i','i','tt'],
['i','i','i','i','i','i','i','vv','bg','rr','i','tt'],
['i','i','i','i','i','i','i','el','rr','i','i','tt'],
['i','vv','i','i','i','i','vv','rr','i','i','i','tt'],
['i','bg','i','i','i','i','i','i','i','i','og','tt'],
['i','i','i','i','i','i','i','i','i','i','i','i'],
];

levels[2].background =
[['w','w','w','w','w','w','w','w','w','w','w','w'],
['w','s','s','s','s','s','s','s','s','s','s','g'],
['w','g','g','g','g','g','g','g','s','w','w','g'],
['w','s','s','s','s','s','s','s','s','s','s','g'],
['w','s','g','g','g','g','g','g','g','g','g','g'],
['w','s','s','s','g','s','g','s','g','s','s','g'],
['w','g','s','s','s','s','s','s','s','s','g','g'],
['w','g','g','g','g','g','g','g','g','g','g','g'],
['w','g','w','g','g','g','g','g','g','g','g','g'],
['w','g','g','g','g','g','g','g','g','g','g','g'],
['w','g','w','g','g','g','g','g','g','g','g','g'],
['w','g','g','g','g','g','g','g','g','g','g','g'],
['w','w','w','w','w','w','w','w','w','w','w','w']];

levels[2].stuff =
[['i','i','i','i','i','i','i','i','i','i','i','i'],
['i','pp','i','i','i','xx','i','i','i','i','gg','tt'],
['i','tt','tt','tt','tt','tt','tt','tt','i','i','i','tt'],
['i','i','hh','i','i','i','gg','i','i','i','gg','tt'],
['i','ts','ts','i','ts','ts','ts','ts','ts','ts','ts','tt'],
['i','gg','hh','i','i','i','i','i','i','i','og','tt'],
['i','tt','tt','tt','tt','tt','tt','tt','tt','tt','i','tt'],
['i','i','i','i','ts','tt','tt','tt','ts','rr','i','tt'],
['i','og','i','bg','i','vv','i','i','rr','i','i','tt'],
['i','i','i','i','rr','el','ts','rr','i','i','i','tt'],
['i','i','i','i','i','i','rr','i','i','i','i','tt'],
['i','vv','i','i','i','i','hh','i','vv','vv','gg','tt'],
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
                    dest.push(new Bug(location,MIN_BUG_SPEED,"horizontal"));
                    break;
                case 'vv':
                    dest.push(new Bug(location,MIN_BUG_SPEED,"vertical"));
                    break;
                case 'rr':
                    dest.push(new StoneBlock(location));
                    break;
                case 'tt':
                    dest.push(new TreeTall(location));
                    break;
                case 'ts':
                    dest.push(new TreeShort(location));
                    break;
                case 'tu':
                    dest.push(new TreeUgly(location));
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
    // Bugs get angrier with time. They start slow, grow exponentially up to BUG_INT_SPEED
    // and then their speed increases linearly up to MAX_BUG_SPEED
    if (this.speed > 0){
        this.speed = this.speed < BUG_INT_SPEED ? this.speed += dt*100 : this.speed = this.speed < MAX_BUG_SPEED ? this.speed += dt*9:this.speed;
    }else{
        this.speed = this.speed > -BUG_INT_SPEED ? this.speed -= dt*100 : this.speed = this.speed > -MAX_BUG_SPEED ? this.speed -= dt*9: this.speed;
    }
    var distanceVector;
    // We convert distance to a vector object:
    if (this.direction === "vertical"){
        distanceVector = new Vector(0, distance); // "vertical" enemies will move vertically
    }else if(this.direction === "horizontal"){
        distanceVector = new Vector(distance, 0); // "horizontal" enemies will move horizontally
    }
    this.pos.sum(distanceVector);
    // Every time we update a bug position it will check for obstacles
    this.checkCollision(distanceVector);
};
// checkCollision allows a bug to check if it has collided into an enemy, obstacle or
// princess and adjust its behavious appropieately. It is called by the 'update' method.
Bug.prototype.checkCollision = function(distanceVector){
    self = this; // we pass this to a variable so it can be used within forEach
    levels[currentLevel].objects.forEach(function(thing){
        if (thing.id !== self.id)
            if (thing.type === 'obstacle' || thing.type === 'enemy' || thing.type === 'princess'){
                if (touch(self,thing)){
                    self.pos.subs(distanceVector); // This moves the bug back so it does not get trapped in obstacles
                    self.speed = - self.speed; // We invert the speed when but toches obstacle
                    self.displayDirection = self.displayDirection ? false : true;
                    // this will toggle the display direction each time a bug bumps into an obstacle
                }
            };
    });
};

// We override the render function for bugs so they are displayed correctly.
Bug.prototype.render = function(){
    if (this.direction === "horizontal"){
        if (this.displayDirection){
            // If bug is "horizontal" and displayDirection
            ctx.drawImage(Resources.get(this.sprite), this.pos.getX(), this.pos.getY());
        }else{
            // We have to write a bunch of transformations so the sprite is displayed
            // facing west when it hits an obstacle to its right.
            ctx.save(); // we save the transformation state so it can be restored
            ctx.translate(this.pos.getX()+101,this.pos.getY());
            ctx.scale(-1,1);
            ctx.drawImage(Resources.get(this.sprite),0,0);
            ctx.restore();// we restore transformation state after drawing bug
        };
    }else if(this.direction === "vertical"){
        if (this.displayDirection){
            // If bug is vertical we have to display it facing downwards
            ctx.save();
            ctx.translate(this.pos.getX()+161,this.pos.getY()+62.5);
            ctx.rotate(Math.PI/2); // arguments of Math.PI function are radians
            ctx.drawImage(Resources.get(this.sprite), 0,0);
            ctx.restore();
        }else{
            ctx.save();
            ctx.translate(this.pos.getX()-62.5,this.pos.getY()+161);
            ctx.rotate(Math.PI+Math.PI/2);
            ctx.drawImage(Resources.get(this.sprite), 0,0);
            ctx.restore();
        };
    };
};

/*---------WATER CLASS-----------------------*/
var Water = function(pos){
    Entity.call(this,pos, null, 'enemy'); // type 'enemy' so player will die if it touches it
};
Water.prototype = Object.create(Entity.prototype);
Water.prototype.constructor = Water;

/*---------COLLECTIBLE CLASS-----------------------*/
/* This is a superclass for collectible items, which include gems and extra lives
* In addition to the Entity properties, they also have:
* lifeEffect: integer. Will increase the # of lives of our heroe
* scoreIncrease: integer. Will increase our score
* collected: boolean. Will change to true once the heroe collects the item
* gemPosition: integer. Our heroe will stack gems on its side. This number defines
* the position in the stack and will be defined when the gem is collected
*/
var Collectible = function(pos, sprite, type, lifeEffect, scoreIncrease,collected){
    Entity.call(this, pos, sprite, type);
    this.lifeEffect = lifeEffect;
    this.scoreIncrease = scoreIncrease;
    this.collected = false; // When element is collected, this.collected will be changed to true
    this.gemPosition = 0; // 0 by default. This will be defined when collected
}
Collectible.prototype = Object.create(Entity.prototype);
Collectible.prototype.constructor = Collectible;
Collectible.prototype.render = function(){
    if (this.collected === false){
        // We make a bunch of transformations so gems are displayed smaller
        ctx.save();
        ctx.translate(this.pos.getX()+22, this.pos.getY()+54);
        ctx.scale(0.55,0.55);
        ctx.drawImage(Resources.get(this.sprite), 0, 0);
        ctx.restore();
    }else{
        // If gem has been collected it will be displayed stacked besides our heroe
        ctx.save();
        ctx.translate(this.pos.getX()+72, this.pos.getY()+84+this.gemPosition);
        ctx.scale(0.35,0.35);
        ctx.drawImage(Resources.get(this.sprite), 0, 0);
        ctx.restore();
    };
};

// We create classes for green, blue and orange gems. Each one will
// have a different sprite and a different effect on score. They will
// have no effect on the # of lives.
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
    Collectible.call(this, pos,'images/gemOrange.png','gem',0,500);
};
OrangeGem.prototype = Object.create(Collectible.prototype);
OrangeGem.prototype.constructor = OrangeGem;

// We create the ExtraLife class. Will increase #lives in 1 and have no effect on score.
var ExtraLife = function(pos){
    Collectible.call(this, pos,'images/Heart.png','life',0,1);
};
ExtraLife.prototype = Object.create(Collectible.prototype);
ExtraLife.prototype.constructor = ExtraLife;

/*---------PRINCESS CLASS-----------------------*/
// We define princess class and give it type "princess"
var Princess = function(pos){
    Entity.call(this,pos,'images/char-princess-girl.png', 'princess');
};
Princess.prototype = Object.create(Entity.prototype);
Princess.prototype.constructor = Princess;

/*---------OBSTACLE CLASSES-----------------------*/
// Now the obstacle superclass, which will have type 'obstacle'
var Obstacle = function(pos,sprite){
    Entity.call(this,pos,sprite,'obstacle');
}
Obstacle.prototype = Object.create(Entity.prototype);
Obstacle.prototype.constructor = Obstacle;

// We create 4 different kinds of obstacles with different images
var TreeTall = function(pos){
    Obstacle.call(this,pos,'images/treeTall.png');
}
TreeTall.prototype = Object.create(Obstacle.prototype);
TreeTall.prototype.constructor = TreeTall;

var StoneBlock = function(pos){
    Obstacle.call(this,pos,'images/Rock.png');
}
StoneBlock.prototype = Object.create(Obstacle.prototype);
StoneBlock.prototype.constructor = StoneBlock;

var TreeShort = function(pos){
    Obstacle.call(this,pos,'images/treeShort.png');
}
TreeShort.prototype = Object.create(Obstacle.prototype);
TreeShort.prototype.constructor = TreeShort;

var TreeUgly = function(pos){
    Obstacle.call(this,pos,'images/treeUgly.png');
}
TreeUgly.prototype = Object.create(Obstacle.prototype);
TreeUgly.prototype.constructor = TreeUgly;

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

// This handleInput function will be called by event listener when game is running
Player.prototype.handleInput = function(code){
    // We save the last position of heroe in a vector
    var lastHeroePos = new Vector;
    lastHeroePos.setX(this.pos.getX());
    lastHeroePos.setY(this.pos.getY());
    if (code === 'left' && this.pos.getX() > 0){
        this.pos.setX(this.pos.getX()-101);
    }else if (code === 'up' && this.pos.getY() > 0){
        this.pos.setY(this.pos.getY()-83);
    }else if (code === 'right' && this.pos.getX() < 1108){
        this.pos.setX(this.pos.getX()+101);
    }else if (code === 'down' && this.pos.getY() < 902){
        this.pos.setY(this.pos.getY()+83);
    };
    // If hero bumps into obstacle the checkCollisions function
    // returns true.
    if (this.checkObstacles(currentLevel)){
        this.pos.setX(lastHeroePos.getX());// We make hero jump back to last position
        this.pos.setY(lastHeroePos.getY());
    }

};

Player.prototype.checkCollisions = function(currentLevel){
    // We create an empty list of collected gems
    var collecteGems=[];
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
                    // if all lives are gone, we switch the state of game
                    // to gameLost
                        gameLost = true;
                        runningGame = false;
                    }else{
                        startNewLevel();
                    }
                    break;
                case 'gem':
                    thing.pos = self.pos;
                    if (thing.collected === false){
                        thing.gemPosition = self.gemStack;
                        self.gemStack -= 10;
                        levelScore += thing.scoreIncrease;
                        collecteGems.push(thing);// collecteGems will be stored in an array
                    }
                    thing.collected = true; // we change the state of the gem
                    break;
                case 'life':
                    lives = lives + 1;
                    thing.pos.setX(100000); // we set position off-screen so cannot be collected again
                    break;
                case 'princess':
                    levelScore += 1000; // score is increased in 1000 when princess is visited
                    score += levelScore; // we update the level score
                    if (currentLevel<2){
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
    //This is a trick. Collected gems will be put at the end of the object list
    // that way, they will be drawn last and the stack of gems will display
    // in the correct order.
    if (runningGame){
        levels[currentLevel].objects = levels[currentLevel].objects.concat(collecteGems);
    };
};

Player.prototype.checkObstacles = function(currentLevel){
    var result = false;
    // We need to pass the "this" variable to the functions
    // in forEach. To do this we create the self variable.
    var self = this;
    levels[currentLevel].objects.forEach(function(thing){
        if (touch(self, thing)){
            switch (thing.type){
                case 'obstacle':
                    result = true; // Special case. This function will return true if object hit is an obstacle
                    break;
                    // TO GRADER: A return statement does not work here? It is not clear
                    // to me how this would work within a forEach function. Any hint?
                    // also, do we need a break statement?
            }
        }
    });
    return result;
};

/* This helper function returns true if two objects are touching
* each other and false otherwise*/
function touch(objectA, objectB){
    // Elements are squares in our games
    // We first have to get the positions of the sides
    // of the elements.
    var aX = objectA.pos.getX();
    var aY = objectA.pos.getY();
    var aXPlus = aX + objectA.size.getX();
    var aYPlus = aY + objectA.size.getY();

    var bX = objectB.pos.getX();
    var bY = objectB.pos.getY();
    var bXPlus = bX + objectB.size.getX();
    var bYPlus = bY + objectB.size.getY();
    // We now compare the positions of the sides
    // in order to find out if elements are touching
    // or not.
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
// This class will only be useful at the welcome page
var Selector = function(){
    this.sprite = 'images/selector.png';
    // Heroe index defines both the heroe choice and the position in screen
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
                this.pos.setX(xPos - 117); // We modify position of selector
                this.heroeIndex--; // We decrease hero index
            };
            break;
        case 'right':
            if (this.heroeIndex<heroes.length-1){
                this.pos.setX(xPos + 117);
                this.heroeIndex++;
            };
            break;
        case 'space':
            // Once spaces is pressed:
            heroe = heroes[this.heroeIndex]; // heroe is chosen
            startNewLevel();
            // Finally we change the state of the game
            welcomePage = false;
            runningGame = true;
            break;
        default:
            break;
    }
}
 // This function will be called by event listener when
 // levelWon = True and "SPACE" is pressed
function startNewLevel(){
    levelScore = 0;
    heroe.gemStack = 0; // The gem stack is reset to 0
    // we load the level objects on the .object object
    levels[currentLevel].objects = [];
    loopLevelArr(levels[currentLevel].background,levels[currentLevel].objects);
    loopLevelArr(levels[currentLevel].stuff,levels[currentLevel].objects);
    // we set the starting position of heroe
    heroe.pos.setX(startPos.getX());
    heroe.pos.setY(startPos.getY());
    // We change the state of the game
    levelWon = false;
    runningGame = true;
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method.
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
            startNewLevel();
        }
    }else if(gameWon === true || gameLost === true){
        if (code === 'space'){
            location.reload(); // Page will reload when you press space
        }
    }
});

