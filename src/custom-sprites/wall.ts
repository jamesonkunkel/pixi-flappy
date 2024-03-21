import * as PIXI from "pixi.js";

class Wall extends PIXI.Sprite {
  constructor(app: PIXI.Application, height: number) {
    // Create a graphics object to draw the rectangle
    const graphics = new PIXI.Graphics();

    graphics.rect(0, 0, 20, height);
    graphics.fill("0xff0000");

    // Generate a texture from the graphics object
    const texture = app.renderer.generateTexture(graphics);

    // Call the super constructor with the generated texture
    super(texture);
  }
}

export default Wall;
