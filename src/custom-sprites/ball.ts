import * as PIXI from "pixi.js";

class Ball extends PIXI.Sprite {
  isFalling: boolean;

  constructor(app: PIXI.Application) {
    // Create a graphics object to draw the circle
    const graphics = new PIXI.Graphics();
    graphics.circle(0, 0, 20); // Draw a circle at position (0, 0) with radius 20
    graphics.fill(0x00ff00); // End the fill

    // Generate a texture from the graphics object
    const texture = app.renderer.generateTexture(graphics);

    // Call the super constructor with the generated texture
    super(texture);

    this.isFalling = true;
  }
}

export default Ball;
