import * as PIXI from "pixi.js";
import pixiTimeout from "pixi-timeout";
import { Game } from "./Game";
import { Enemy } from "./Enemy";

export class Shooting_ship extends Enemy {
  constructor(texture: PIXI.Texture, game: Game) {
    super(texture, game);

    this.scale.set(2.0, 2.0);
    this.x = Math.floor(Math.random() * (-900 - 700)) + -700;
    this.y = Math.floor(Math.random() * (300 - 100)) + -100;
    this.speed = Math.random() * -4 + -2;

    setTimeout(this.shoot, 5000);
  }

  private changeSpeed() {
    if (this.x >= 2500) {
      this.speed = Math.random() * +6 + +1;
    } else {
      this.speed = Math.random() * -6 + -1;
    }
  }

  public shoot() {
    this.game.addEnemyBullet(this.x + 80, this.y + 35);
  }

  public update() {
    // if(this.speed > )
    this.x -= this.speed;
    if (this.x >= 2500 || this.x <= -1000) this.changeSpeed();
  }
}
