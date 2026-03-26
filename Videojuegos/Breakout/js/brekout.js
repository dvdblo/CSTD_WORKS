// Breakout

// David Blanco
// A01786713

// This program contains the main game "Breakout"

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

// Context of the Canvas
let ctx;

// A variable to store the game object
let game;

// Variable to store the time at the previous frame
let oldTime = 0;

let playerSpeed = 0.5;

// Class for the main character in the game
class Player extends GameObject {
    constructor(position, width, height, color, sheetCols) {
        super(position, width, height, color, "player", sheetCols);
        this.velocity = new Vector(0, 0);

        //Posible motion of the player
        this.motion = {
            left: {
                axis: "x",
                sign: -1,
            },
            right: {
                axis: "x",
                sign: 1,
            },
        }

        // Keys pressed to move the player
        this.keys = [];
    }

    //Updates the position and velocity of the player
    update(deltaTime) {

        // Restart the velocity
        this.velocity.x = 0;
        this.velocity.y = 0;

        // Modify the velocity according to the directions pressed
        for (const direction of this.keys) {
            const axis = this.motion[direction].axis;
            const sign = this.motion[direction].sign;
            this.velocity[axis] += sign;
        }

        //Normalize the velocity to avoid greater speed on diagonals
        this.velocity = this.velocity.normalize().times(playerSpeed);

        //Updates the position according to the frame time
        this.position = this.position.plus(this.velocity.times(deltaTime));

        //Detects collisions with the canvas
        this.clampWithinCanvas();
    }

    //Detects collisions with the canvas
    clampWithinCanvas() {

        // Left border
        if (this.position.x - this.halfSize.x < 0) {
            this.position.x = this.halfSize.x;
        }

        // Right border
        if (this.position.x + this.halfSize.x > canvasWidth) {
            this.position.x = canvasWidth - this.halfSize.x;
        }
    }
}

class Ball extends GameObject{
    constructor(position, radius) {
        super(position, radius*2, radius*2);
        this.radius = radius;
        this.velocity = new Vector(0, 0);
        this.serveC = true;  //Controls if serve is avilable
    }
    
    //Updates the position and velocity of the ball
    update(deltaTime) {

        this.position = this.position.plus(this.velocity.times(deltaTime));

        //Detects collisions with the canvas
        this.checkWallBounce();
    }

    //Detects collisions with the canvas
    checkWallBounce() {

        //Left border (bounces)
        if (this.position.x - this.radius < 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }

        //Right border (bounces)
        if (this.position.x + this.radius > canvasWidth) {
            this.position.x = canvasWidth - this.radius;
            this.velocity.x *= -1;
        }

        //Top border (bounces)
        if (this.position.y - this.radius < 0) {
            this.position.y = this.radius;
            this.velocity.y *= -1;
        }

        //Bottom border (-1 life)
        if (this.position.y + this.radius > canvasHeight) {
            game.lifes--;
            this.serveC = true;   //Enables the serve
            this.reset();         //Resets the ball to original conditions
        }
    }

    //Resets the ball to original conditions
    reset() {
        this.position = new Vector(canvasWidth/2, canvasHeight/2);
        this.velocity = new Vector(0,0);
    }

    //Function to start the movement of the ball
    serve() {
        let angle = Math.random() * (Math.PI / 6) + Math.PI / 6;  //Random angle from 30° to 60°
        this.velocity.x = Math.cos(angle)*0.3;
        this.velocity.y = Math.sin(angle)*-0.3;

        //Allows angle form 120° to 150°
        if(Math.random() > 0.5) {
            this.velocity.x *= -1;
        }
    }
}

//Class to keep track of all the events and objects in the game
class Game {
    constructor() {
        this.points = 0;
        this.lifes = 3;
        this.exit = false;
        this.createEventListeners();
        this.initObjects();
    }

    //Initializes all the object in the game
    initObjects() {

        //Background
        this.background = new GameObject(new Vector(canvasWidth / 2, canvasHeight / 2), canvasWidth, canvasHeight);
        this.background.setSprite("../assets/fondos/fondo9.jpg");

        //Player
        this.player = new Player(new Vector(canvasWidth / 2, canvasHeight / 1.25), 100, 36, "red");
        this.player.setSprite("../assets/sprites/jugadorBreakout2.png", new Rect(0, 0, 174, 54));

        //Ball
        this.ball = new Ball(new Vector(canvasWidth/2, canvasHeight/2), 10);
        this.ball.setSprite("../assets/sprites/ball2.png");

        //Bricks
        //properties of the bricks
        const sx = 60;
        const sy = 20;
        //Number of total bricks
        const col = 13;
        const row = 8;
        //Number of bricks with their difficulty
        const brickG = col*row;
        const brickY = col*(Math.floor(row/2));
        const brickO= col*(Math.floor(row/4));
        const brickR = col*(Math.floor(row/8));
        //To save the bricks
        this.bricks = [];
        //Initializes the bricks (if there are multiple bricks in the same position, when the ball touch them, it eliminates the brick that was initialized first)
        for (let i=0; i<brickR; i++) { //Red ones
            this.addBox(i, sx, sy, col, row, 4);
        }
        for (let i=0; i<brickO; i++) {  //Orange ones
            this.addBox(i, sx, sy, col, row, 3);
        }
        for (let i=0; i<brickY; i++) {  //Yellow ones
            this.addBox(i, sx, sy, col, row, 2);
        }
        for (let i=0; i<brickG; i++) {  //Green ones
            this.addBox(i, sx, sy, col, row, 1);
        }
        
        //Texts
        this.pointsText = new TextLabel(canvasWidth/2 - 78, canvasHeight/1.4, "280px monospace", "rgb(167, 229, 251)", 0.7);
        this.lifesText = new TextLabel(canvasWidth/2 -156, canvasHeight/1.05, "70px monospace", "rgb(255, 145, 197)", 1, "rgb(131, 33, 79)", 70, 0.7);
        this.gameOver = new TextLabel(canvasWidth/2 -350, canvasHeight/4, "140px monospace", "rgb(255, 79, 123)", 1, "rgb(144, 54, 75)", 140, 0.7);
        this.gameWin = new TextLabel(canvasWidth/2 -273, canvasHeight/4, "140px monospace", "rgb(233, 255, 229)", 1, "rgb(28, 191, 34)", 140, 0.7);
        this.restartText = new TextLabel(canvasWidth/2 -334, canvasHeight/2-60, "60px monospace", "rgb(233, 255, 229)", 1, "rgb(231, 212, 0)", 60, 0.7);
    }

    //Draws the objects of the game
    draw(ctx) {

        //Background
        this.background.draw(ctx);

        //Points
        if(this.points > 9 && this.points < 100) {  //Adjusts the position for more that one character
            this.pointsText.x = canvasWidth/2 - 156;
        } else if(this.points > 99) {
            this.pointsText.x = canvasWidth/2 - 234;
        }
        this.pointsText.draw(ctx, this.points);

        //Lifes
        this.lifesText.draw(ctx, `Lifes: ${this.lifes}`);

        //Bricks (as mention before, because ball eliminates the bricks initialized first, we need to draw the green ones (at the end of the list) first, and the red ones at the end)
        for (let i = this.bricks.length - 1; i >= 0; i--) {
            this.bricks[i].draw(ctx);
        }

        //Player
        this.player.draw(ctx);

        //Ball
        this.ball.draw(ctx);

        //If lifes = 0, draws the Game over label
        if(this.lifes <= 0) {
            this.pause = true; //Stops the controls
            this.gameOver.draw(ctx, "GAME OVER");
            this.restartText.draw(ctx, 'Press "r" to restart');
        }

        //If there are no more bricks, draws the Win label
        if(this.bricks.length == 0) {
            this.pause = true;  //Stops the controls
            this.ball.velocity.x = 0; //Stops the ball
            this.ball.velocity.y = 0;
            this.gameWin.draw(ctx, "YOU WIN");
            this.restartText.draw(ctx, 'Press "r" to restart');
        }

        
    }

    //Updates the properties of the objects and game
    update(deltaTime) {

        //If exit is true, it returns to the main loop function to restart the game
        if(this.exit) {
            return 100;
        }

        //Player
        this.player.update(deltaTime);

        //Ball
        this.ball.update(deltaTime);

        //Bricks
        for (let brick of this.bricks) {

            //Controls the collisions between ball and bricks
            let cont = boxOverlap(this.ball, brick);

            if(cont == "top") {
                this.ball.position.y = brick.position.y - brick.halfSize.y - this.ball.halfSize.y;  //Gets the ball out of the brick
                this.ball.velocity.y *= -1;  //Ball bounce
                this.points++;  //Add a point
                brick.destroy = true;  //Enable the destruction of the brick
                
            } else if(cont == "bottom") {
                this.ball.position.y = brick.position.y + brick.halfSize.y + this.ball.halfSize.y;
                this.ball.velocity.y *= -1;
                this.points++;
                brick.destroy = true;

            } else if(cont == "left") {
                this.ball.position.x = brick.position.x - brick.halfSize.x - this.ball.halfSize.x;
                this.ball.velocity.x *= -1;
                this.points++;
                brick.destroy = true;

            } else if(cont == "right") {
                this.ball.position.x = brick.position.x + brick.halfSize.x + this.ball.halfSize.x;
                this.ball.velocity.x *= -1;
                this.points++;
                brick.destroy = true;

            }
        }
        //It maintains only the bricks without the destrution enabled
        this.bricks = this.bricks.filter(brick => !brick.destroy);

        //Ball bounce with blayer
        let contBall = boxOverlap(this.ball, this.player);

        if(contBall == "top") {
            //To change the direction of the ball according to where it touches the player
            let distance = this.ball.position.x - this.player.position.x;
            let norm = distance / this.player.halfSize.x;
            let angleMax = Math.PI / 3;
            let angleBounce = norm * angleMax;

            this.ball.velocity.x = Math.sin(angleBounce)*0.3;
            this.ball.velocity.y = -Math.cos(angleBounce)*0.3;

            //Gets the ball out of the player
            this.ball.position.y = this.player.position.y - this.player.halfSize.y - this.ball.halfSize.y;
            
        } else if(contBall == "bottom") { //Bounces
            this.ball.position.y = this.player.position.y + this.player.halfSize.y + this.ball.halfSize.y;
            this.ball.velocity.y *= -1;

        } else if(contBall == "left") {  //Bounces
            this.ball.position.x = this.player.position.x - this.player.halfSize.x - this.ball.halfSize.x;
            this.ball.velocity.x *= -1;
        } else if(contBall == "right") { //Bounces
            this.ball.position.x = this.player.position.x + this.player.halfSize.x + this.ball.halfSize.x;
            this.ball.velocity.x *= -1;
        }
    }

    //Function to initialize the bricks
    addBox(i, sx, sy, cols, rows, sprite) {

        //Size
        const sizeX = sx;
        const sizeY = sy;

        //Separation between bricks
        const gapX = 0;
        const gapY = 0;

        //Column of the brick
        const col = i % cols;
        //Row of the brick
        const row = Math.floor(i / cols) % rows;
        //To center the group of bricks
        const adjustment = (canvasWidth - (sizeX + gapX)*cols) / 2;
        //Position
        const posX = (col * (sizeX + gapX) + sizeX/2 + gapX) + adjustment;
        const posY = row * (sizeY + gapY) + sizeY*2 + gapY;
        //Creates the object
        const box = new GameObject(new Vector(posX, posY), sizeX, sizeY, "grey");
        //Puts the correct sprite
        switch(sprite) {
            case 1:
                box.setSprite("../assets/sprites/cuadrosV.png");
                break;
            case 2:
                box.setSprite("../assets/sprites/cuadrosA.png");
                break;
            case 3:
                box.setSprite("../assets/sprites/cuadrosN.png");
                break;
            case 4:
                box.setSprite("../assets/sprites/cuadrosR.png");
                break;
            default: 
                box.setSprite("../assets/sprites/cuadrosR.png");
                break;
        }
        //Inserts the brick into the list
        this.bricks.push(box);
    }

    //Creates the event listeners that will be active in parallel
    createEventListeners() {
        //Disables the pause
        this.pause = false;

        //Keydown events
        window.addEventListener('keydown', (event) => {

            //"r" to reset the game
            if(event.key == "r" || event.key == "R") {
                this.exit = true; //Enables the exit to reset the game
                return;  //Impedes to listen to the other events
            }

            //Impedes to listen to the other events
            if(this.pause) return;

            //To move the player left or right
            if (event.key == 'a' || event.key == "A" || event.key == "ArrowLeft") {
                this.addKey('left');
            } else if (event.key == 'd' || event.key == "D" || event.key == "ArrowRight") {
                this.addKey('right');
            }

            //To start the ball movement
            if(event.code == "Space" && this.ball.serveC) {
                this.ball.serve();
                this.ball.serveC = false;  //Disables the function
            }

        });

        //Keyup events
        window.addEventListener('keyup', (event) => {

            //Only the characteristics that depends on the time a key is pressed
            if (event.key == 'a' || event.key == "A" || event.key == "ArrowLeft") {
                this.delKey('left');
            } else if (event.key == 'd' || event.key == "D" || event.key == "ArrowRight") {
                this.delKey('right');
            }
        });
    }

    //Adds the key to execute the movement
    addKey(direction) {
        if (!this.player.keys.includes(direction)) {
            this.player.keys.push(direction);
        }
    }

    //Adds the key to stop the movement
    delKey(direction) {
        if (this.player.keys.includes(direction)) {
            this.player.keys.splice(this.player.keys.indexOf(direction), 1);
        }
    }
}


//Starting function that will be called from the HTML page
function main() {

    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');

    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Create the game object
    game = new Game();

    //Calls the game
    drawScene(0);
}


// Main loop function to be called once per frame
function drawScene(newTime) {

    // Compute the time elapsed since the last frame, in milliseconds
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    //Stores the condition of the game
    let exit = game.update(deltaTime);  //Updates the game

    //Draws the game
    game.draw(ctx);

    //Detects if exit was activated
    if(exit == 100) {
        game = new Game();  //Creates a new game to restart the last one
    }

    //Actualizes the frame time
    oldTime = newTime;

    //Call the loop again
    requestAnimationFrame(drawScene); 
}