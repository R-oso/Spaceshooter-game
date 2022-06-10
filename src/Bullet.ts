import * as PIXI from "pixi.js";
import { Game } from "./Game";

export class Bullet extends PIXI.Sprite {
  private game: Game;

  constructor(texture: PIXI.Texture, game: Game, x: number, y: number) {
    super(texture);
    this.game = game;
    this.anchor.set(0.5);
    this.scale.set(1.5, 2);
    // this.pivot.x = 20;
    this.pivot.y = 30;
    this.x = x + 20;
    this.y = y + 20;
  }

  public setOpacity() {
    this.alpha -= 0.008;
  }

  public update() {
    this.y -= 8;
    this.setOpacity();

    if (this.y < 100) {
      this.alpha -= 0.001;
      this.game.removeBullet(this);
    }
  }
}
