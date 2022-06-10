import * as PIXI from "pixi.js";
import { Bullet } from "./Bullet";
import { Player } from "./player";
import { Enemy } from "./Enemy";

import background from "./images/background.webp";
import player from "./images/ship.png";
import bullet from "./images/bullet.png";

export class Game {
  // Game eigenschappen
  public pixi: PIXI.Application;
  public loader: PIXI.Loader;
  private background: PIXI.TilingSprite;
  private playerTextures: PIXI.Texture[] = [];

  private player: Player;
  private bullets: Bullet[] = [];

  screenWidth: number = 2400;
  screenHeight: number = 1500;

  // Game functies
  constructor() {
    console.log("game loading..");

    // Maak een pixi canvas
    this.pixi = new PIXI.Application({ width: this.screenWidth, height: this.screenHeight });
    document.body.appendChild(this.pixi.view);

    // Preload alle afbeeldingen
    this.loader = new PIXI.Loader();
    this.loader.add("bgTexture", background).add("playerTexture", player).add("bulletTexture", bullet);
    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    // <<! Maak sprites als de afbeeldingen zijn geladen !>>
    // Eerst word de background ready gemaakt als tilingsprite
    this.background = new PIXI.TilingSprite(this.loader.resources["bgTexture"].texture!, this.screenWidth, this.screenHeight);
    this.background.tileScale.set(2, 2);
    this.pixi.stage.addChild(this.background);

    // Sla de player sprite sheet op
    for (let i = 0; i < 26; i++) {
      const player = PIXI.Texture.from(`player.json ${i + 1}.png`);
      this.playerTextures.push(player);
    }

    this.createPlayer();
    this.pixi.ticker.add((delta) => this.update(delta));
  }

  private update(delta: number) {
    // Update background, player
    this.background.tilePosition.y += 3;
    this.player.update();

    for (let bullet of this.bullets) {
      bullet.update();
    }
  }

  private createPlayer() {
    this.player = new Player(this.loader.resources["playerTexture"].texture!, this);
    this.pixi.stage.addChild(this.player);
  }

  public addBullet(x: number, y: number) {
    let b = new Bullet(this.loader.resources["bulletTexture"].texture!, this, x, y);
    this.bullets.push(b);
    this.pixi.stage.addChild(b);
  }

  public removeBullet(bullet: Bullet) {
    this.bullets = this.bullets.filter((b: Bullet) => b != bullet);
    bullet.destroy();
  }

  private collision(bullet: Bullet, enemy: Enemy) {
    const bounds1 = bullet.getBounds();
    const bounds2 = enemy.getBounds();

    return bounds1.x < bounds2.x + bounds2.width && bounds1.x + bounds1.width > bounds2.x && bounds1.y < bounds2.y + bounds2.height && bounds1.y + bounds1.height > bounds2.y;
  }
}

let g = new Game();
