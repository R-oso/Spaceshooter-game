import * as PIXI from "pixi.js";
import { Bullet } from "./Bullet";
import { Enemy_bullet } from "./Enemy_bullet";
import { Player } from "./player";
import { Cargo_ship } from "./Cargo_ship";
import { Shooting_ship } from "./Shooting_ship";
import { Explosion } from "./Explosion";

import background from "./images/background.webp";
import player from "./images/ship.png";
import bullet from "./images/bullet.png";
import cargo_ship from "./images/cargo_ship.png";
import shooting_ship from "./images/shooting_ship.png";

export class Game {
  // Game eigenschappen
  public pixi: PIXI.Application;
  public loader: PIXI.Loader;
  private background: PIXI.TilingSprite;
  private playerTextures: PIXI.Texture[] = [];

  private player: Player;
  private bullets: Bullet[] = [];
  private enemy_bullets: Enemy_bullet[] = [];
  private cargo_ships: Cargo_ship[] = [];
  private shooting_ships: Shooting_ship[] = [];
  private explosionTextures: PIXI.Texture[] = [];

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
    this.loader.add("bgTexture", background).add("playerTexture", player).add("bulletTexture", bullet).add("cargoTexture", cargo_ship).add("shootingTexture", shooting_ship).add("spriteSheet", "explosion.json");
    this.loader.load(() => this.loadCompleted());
  }

  loadCompleted() {
    // <<! Maak sprites als de afbeeldingen zijn geladen !>>
    // Eerst word de background ready gemaakt als tilingsprite
    this.background = new PIXI.TilingSprite(this.loader.resources["bgTexture"].texture!, this.screenWidth, this.screenHeight);
    this.background.tileScale.set(2, 2);
    this.pixi.stage.addChild(this.background);

    // Create de bestuurbare player
    this.createPlayer();

    // Create de cargo ships
    this.createCargoships();

    // Create de shooting ships
    this.createShootingships();

    // Create de eplosion frames
    this.createExplosionFrames();

    this.pixi.ticker.add((delta) => this.update(delta));
  }

  private update(delta: number) {
    // Update background, player
    this.background.tilePosition.y += 3;
    this.player.update();

    // Update functie in bullet
    for (let bullet of this.bullets) {
      bullet.update();
    }

    // Update functie in cargo_ship
    for (let cargo_ship of this.cargo_ships) {
      cargo_ship.update();
    }

    // Update functie in shooting_ship
    for (let shooting_ship of this.shooting_ships) {
      shooting_ship.update();
    }

    // Check collisions
    this.checkCollisions();
    this.playerDamage();
  }

  private createPlayer() {
    this.player = new Player(this.loader.resources["playerTexture"].texture!, this);
    this.pixi.stage.addChild(this.player);
  }

  private createCargoships() {
    for (let i = 0; i < 4; i++) {
      let c = new Cargo_ship(this.loader.resources["cargoTexture"].texture!, this);
      this.cargo_ships.push(c);
      this.pixi.stage.addChild(c);
    }
  }

  private createShootingships() {
    for (let i = 0; i < 5; i++) {
      let s = new Shooting_ship(this.loader.resources["shootingTexture"].texture!, this);
      this.shooting_ships.push(s);
      this.pixi.stage.addChild(s);
    }
  }

  public addBullet(x: number, y: number) {
    let b = new Bullet(this.loader.resources["bulletTexture"].texture!, this, x, y);
    this.bullets.push(b);
    this.pixi.stage.addChild(b);
  }

  public addEnemyBullet(x: number, y: number) {
    let b = new Enemy_bullet(this.loader.resources["bulletTexture"].texture!, this, x, y);
    this.enemy_bullets.push(b);
    this.pixi.stage.addChild(b);
  }

  public removeBullet(bullet: Bullet) {
    this.bullets = this.bullets.filter((b: Bullet) => b != bullet);
    bullet.destroy();
  }

  private checkCollisions() {
    for (let bullet of this.bullets) {
      for (let cargo_ship of this.cargo_ships) {
        if (this.collision(bullet, cargo_ship)) {
          this.createExplosion(bullet.x, bullet.y);
          console.log("hit");
          this.player.powerUp();
          this.removeBullet(bullet);
          cargo_ship.resetPosition();
          break;
        }
      }
    }
  }

  private playerDamage() {
    for (let cargo_ship of this.cargo_ships) {
      if (this.collision(this.player, cargo_ship)) {
        this.player.damage();
        break;
      }
    }
  }

  private collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
    const bounds1 = sprite1.getBounds();
    const bounds2 = sprite2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width && bounds1.x + bounds1.width > bounds2.x && bounds1.y < bounds2.y + bounds2.height && bounds1.y + bounds1.height > bounds2.y;
  }

  private createExplosionFrames() {
    for (let i = 0; i < 26; i++) {
      const texture = PIXI.Texture.from(`Explosion_Sequence_A ${i + 1}.png`);
      this.explosionTextures.push(texture);
    }
  }

  public createExplosion(x: number, y: number) {
    const explosion = new Explosion(this.explosionTextures, x, y);
    console.log(explosion);
    this.pixi.stage.addChild(explosion);
  }
}

let g = new Game();
