import * as PIXI from "pixi.js";
import { Game } from "./Game";
import { Bullet } from "./Bullet";

export class Player extends PIXI.Sprite {
  private xspeed: number = 0;
  private yspeed: number = 0;
  private health: number = 3;
  private game: Game;

  public power_up: boolean = false;

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game;
    this.x = game.screenWidth / 2;
    this.y = 1200;

    this.scale.set(3, 3);

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));
  }

  private shoot() {
    this.game.addBullet(this.x + 80, this.y + 35);
  }

  private onKeyDown(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        this.shoot();
        break;
      case "A":
      case "ARROWLEFT":
        this.xspeed = -7;
        break;
      case "D":
      case "ARROWRIGHT":
        this.xspeed = 7;
        break;
      case "W":
      case "ARROWUP":
        this.yspeed = -7;
        break;
      case "S":
      case "ARROWDOWN":
        this.yspeed = 7;
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    switch (e.key.toUpperCase()) {
      case " ":
        break;
      case "A":
      case "D":
      case "ARROWLEFT":
      case "ARROWRIGHT":
        this.xspeed = 0;
        break;
      case "W":
      case "S":
      case "ARROWUP":
      case "ARROWDOWN":
        this.yspeed = 0;
        break;
    }
  }

  public powerUp() {
    this.power_up = true;
    console.log(this.power_up);
  }

  public damage() {
    this.health -= 1;
    console.log("you got hit");
  }

  public update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
}
