import * as PIXI from "pixi.js";
import { Game } from "./Game";
import { Enemy } from "./Enemy";

export class Cargo_ship extends Enemy {
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture, game);

    this.scale.set(2.3, 2.3);
    this.x = Math.floor(Math.random() * (-600 - 400)) + -400;
    this.y = Math.random() * game.pixi.screen.bottom;
    this.speed = Math.random() * -6 + -1;
  }

  resetPosition() {
    // Random number between 200 and 400 (Min and Max)
    this.x = Math.floor(Math.random() * (-400 - -200)) + -200;
  }

  public update() {
    this.x -= this.speed;
    if (this.x >= 3000) this.resetPosition();
  }
}
