import * as PIXI from "pixi.js";
import { Game } from "./Game";

export class Enemy extends PIXI.Sprite {
  public speed: number = 0;
  public game: Game;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;
  }

  public update() {
    this.x -= this.speed;
  }
}
