import * as PIXI from "pixi.js";
import { Game } from "./Game";

export class Enemy extends PIXI.Sprite {
  private speed: number = 0;
  private game: Game;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
  }

  public update() {
    this.x -= this.speed;
    if (this.x < -100) this.resetPosition();
  }
}
