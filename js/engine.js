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
    canvas.style.border = "1px solid black";
    canvas.style.borderRadius = "5px";
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
        if (runningGame === true){
            var now = Date.now(),
            dt = (now - lastTime) / 1000.0;
            /*Save the current transformation state
            * and scale everything 0.5 times. This will allow
            *us to have smaller graphics without having to scale
            *images*/
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
            displayWelcome();
        }else if(levelWon === true){
            displayWelcome();
        }else if(gameWon === true){
            displayWelcome();
        }else if(gameLost === true){
            displayWelcome();
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
        initializeSelector();
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
    ctx.fillText("", 303, 440);
    ctx.font = "40px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText("Press SPACE to start", 303, 515);
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
        checkGameWon();
    }

    function checkCollisions(){
        heroe.checkCollisions(currentLevel);
    }

    function checkGameWon(){
        if (player.y < 20){
            player.x = 404;
            player.y = 644;
            score = score + 50
            console.log(score)
        }
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        LEVELS[currentLevel].objects.forEach(function(thing) {
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
        /* We inititialize a base map. We will use mapLEVELS to feed this map
        and charToImages to code characters to actual images */
        var baseMap = [];
        LEVELS[currentLevel].background.forEach(function(row){
            var line = [];
            row.forEach(function(char){
                var element = charToImages[char];
                line.push(element);
            });
            baseMap.push(line);
        });


        var numRows = LEVELS[currentLevel].background.length,
            numCols = LEVELS[currentLevel].background[0].length,
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
        ctx.fillText("Score: "+score, 850, 100);
        ctx.fillText("Lives: "+lives, 240, 100);
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
        LEVELS[currentLevel].objects.forEach(function(thing) {
            thing.render();
        });
        heroe.render()
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/treeShort.png',
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

