import * as PIXI from "pixi.js";
import { Game } from "./Game";
import { Bullet } from "./Bullet";

export class Enemy_bullet extends Bullet {
  constructor(texture: PIXI.Texture, game: Game, x: number, y: number) {
    super(texture, game, x, y);

    this.pivot.y = -30;
  }

  public update() {
    this.y += 8;

    if (this.y > 2000) {
      this.alpha -= 0.001;
      this.game.removeBullet(this);
    }
  }
}
