import * as PIXI from "pixi.js";

// import custom sprites
import Ball from "./custom-sprites/ball";
import Wall from "./custom-sprites/wall";

// Create the application helper and add its render target to the page
const app = new PIXI.Application();
await app.init({ width: 640, height: 360, backgroundColor: 0x1099bb });

document.body.appendChild(app.canvas);
document.addEventListener("keydown", handleKeyDown);

const gameOverScreen = new PIXI.Text({ text: "Game Over" });
gameOverScreen.anchor.set(0.5);
gameOverScreen.position.set(app.screen.width / 2, app.screen.height / 2);
gameOverScreen.visible = false;
app.stage.addChild(gameOverScreen);

const mainBall = new Ball(app);
mainBall.x = 20;
mainBall.y = app.screen.height / 2;

// Add main ball to stage
app.stage.addChild(mainBall);

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0;
let acceleration = 0.0;

app.ticker.add((ticker) => {
  elapsed += ticker.deltaTime;

  if (Math.round(elapsed) % 20 === 0 && mainBall.isFalling) {
    mainBall.y += 3 + acceleration;
    acceleration += 2;
  }

  if (!mainBall.isFalling) {
    mainBall.isFalling = true;
    acceleration = 0;
  }

  // Move existing walls and remove those that are off-screen
  for (const child of app.stage.children) {
    if (child instanceof Wall) {
      child.x -= 1;

      // Remove the wall if off-screen
      if (child.x + child.width < 0) {
        app.stage.removeChild(child);
      }

      //   Monitor collision between ball and all walls
      if (checkCollision(mainBall, child)) {
        gameOverScreen.visible = true;
        app.ticker.stop();
      }
    }
  }

  // Generate a new wall every 2 seconds
  if (Math.round(elapsed) % 120 === 0) {
    generateNewWall();
  }
});

function generateNewWall() {
  const isUpper = Math.random() > 0.5;

  // generate random integer between 100 and 200
  const randomHeight = Math.floor(Math.random() * (200 - 100 + 1) + 100);

  const newWall = new Wall(app, randomHeight);
  newWall.x = app.screen.width;

  if (isUpper) {
    newWall.y = 0;
  } else {
    newWall.y = app.screen.height - randomHeight;
  }

  app.stage.addChild(newWall);
}

function checkCollision(sprite1: PIXI.Container, sprite2: PIXI.Container) {
  const rect1 = sprite1.getBounds();
  const rect2 = sprite2.getBounds();
  return (
    rect1.x + rect1.width > rect2.x &&
    rect1.x < rect2.x + rect2.width &&
    rect1.y + rect1.height > rect2.y &&
    rect1.y < rect2.y + rect2.height
  );
}

// Add an event listener for keydown events

// Function to handle keydown events
function handleKeyDown(event: KeyboardEvent) {
  if (event.keyCode === 32) {
    mainBall.y -= 10;
    mainBall.isFalling = false;
  }
}
