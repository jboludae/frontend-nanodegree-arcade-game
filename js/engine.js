/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

(function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    // We draw the canvas
    canvas.width = 606;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     * it will keep track of the game state via if-else statements
     * and direct us to the appropriate functions.*/

    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
         /*
         * We will modify the behaviour of the main() function depending on the state
         * of the game.
         */
        if (runningGame === true){
            var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
            /* We now save the current transformation state
            * and scale everything by 0.5. This will allow
            * us to have smaller graphics */
            ctx.save();
            ctx.scale(0.5,0.5);
            /* Call our update/render functions, pass along the time delta to
             * our update function since it may be used for smooth animation.
             */
            update(dt);
            render();
            /* Set our lastTime variable which is used to determine the time delta
             * for the next time this function is called.
             */
            lastTime = now;
            /* We restore the context so it will not re-scale in an
            *infinite loop*/
            ctx.restore();
        }else if(welcomePage === true){
            displayWelcome(); // We display the welcome page
        }else if(levelWon === true){
            displayLevelWon(); // We display a current score
        }else if(gameWon === true){
            displayGameWon(); // We display end page. You beat the game
        }else if(gameLost === true){
            displayGameOver(); // Game is over
        }
        /* Use the browser's requestAnimationFrame function to call this
        * function again as soon as the browser is able to draw another frame.
        */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop and initializing a selector for the welcome page.
     */
    function init() {
        selector = new Selector; // We initialize a selector
        heroes = generateHeroes(); // generates a list of available heroes
        lastTime = Date.now();
        main();
    }

    function displayWelcome() {
    // We first clean the background of the whole canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // We first clean the background of the whole canvas
    selector.render();
    heroes.forEach(function(character){
        character.render();
    })

    // We display welcome text and instructions
    ctx.font = "28px Helvetica";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Use arrow keys to choose your hero", 303, 50);
    ctx.textAlign = "center";
    ctx.fillText("YOUR MISSION:", 303, 280);
    ctx.fillText("Bring gems to the princess.", 303, 320);
    ctx.fillText("Avoid water.", 303, 360);
    ctx.fillText("Avoid the bastards.", 303, 400);
    ctx.fillText("Be fast.", 303, 440);
    ctx.font = "40px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Press SPACE to start", 303, 515);
    }

    function displayLevelWon() {
    // We first clean the background of the whole canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // We display welcome text and instructions
    ctx.font = "28px Helvetica";
    ctx.fillStyle = "white";
    ctx.shadowColor = "black"
    ctx.shadowBlur = 8;
    ctx.font = "40px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Congratulations!!", 303, 300);
    ctx.fillText("Level "+currentLevel+" score is: "+levelScore, 303, 375);
    ctx.fillText("Total score is: " + score, 303, 450);
    ctx.fillText("Press SPACE to start", 303, 525);
    ctx.shadowColor = null;
    ctx.shadowBlur = 0;
    }
    function displayGameWon() {
    // We first clean the background of the whole canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // We display welcome text and instructions
    ctx.font = "28px Helvetica";
    ctx.fillStyle = "white";
    ctx.shadowColor = "black"
    ctx.shadowBlur = 8;
    ctx.font = "40px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("The princess got it gems!!", 303, 350);
    ctx.fillText("Your final score is: "+score, 303, 425);
    ctx.fillText("Press SPACE to start again", 303, 500);
    ctx.shadowColor = null;
    ctx.shadowBlur = 0;
    }

    function displayGameOver() {
    // We first clean the background of the whole canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // We display welcome text and instructions
    ctx.font = "28px Helvetica";
    ctx.fillStyle = "white";
    ctx.shadowColor = "black"
    ctx.shadowBlur = 8;
    ctx.font = "40px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!", 303, 350);
    ctx.fillText("Press SPACE to start again", 303, 425);
    ctx.shadowColor = null;
    ctx.shadowBlur = 0;
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data.
     */
    function update(dt) {
        updateEntities(dt);// We update the position of entities
        heroe.checkCollisions(currentLevel);// We check collisions
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods.
     */
    function updateEntities(dt) {
        levels[currentLevel].objects.forEach(function(thing) {
            thing.update(dt);
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var charToImages = {
            "w": 'images/water-block.png',
            "s": 'images/stone-block.png',
            "r": 'images/Rock.png',
            "g": "images/grass-block.png"
        }
        /* We inititialize a base map. We will use maplevels to feed this map
        and charToImages to code characters to actual images */
        var baseMap = [];
        levels[currentLevel].background.forEach(function(row){
            var line = [];
            row.forEach(function(char){
                var element = charToImages[char];
                line.push(element);
            });
            baseMap.push(line);
        });


        var numRows = levels[currentLevel].background.length,
            numCols = levels[currentLevel].background[0].length,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                var image = baseMap[row][col];
                ctx.drawImage(Resources.get(image), col * 101, row * 83);
            }
        }
        // We draw the score in the top right of the screen
        ctx.font = "56px Helvetica";
        ctx.fillStyle = "white";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 8;
        ctx.fillText("Level score: "+levelScore, 950, 100);
        ctx.fillText("Lives: "+lives, 140, 100);
        ctx.fillText("Level: "+ (currentLevel+1), 140, 1085);
        ctx.shadowBlur = 0;
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        levels[currentLevel].objects.forEach(function(thing) {
            if (thing.type !== 'enemy'){thing.render()};
        });
        // This is a trick to draw bugs after all other elements
        // damages performance cause we have to loop two times over
        // same list. If I went back in time, would have put bugs in a
        // different list.
        levels[currentLevel].objects.forEach(function(thing) {
            if (thing.type === 'enemy'){
                thing.render();
            }
        });
        heroe.render() // Finally, we render the heroe
    }

    /* We load here all images that will be needed
     */
    Resources.load([
        'images/stone-block.png',
        'images/treeShort.png',
        'images/Rock.png',
        'images/treeTall.png',
        'images/treeUgly.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-horn-girl.png',
        'images/char-cat-girl.png',
        'images/char-princess-girl.png',
        'images/selector.png',
        'images/gemGreen.png',
        'images/gemBlue.png',
        'images/gemOrange.png',
        'images/Heart.png',
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);

