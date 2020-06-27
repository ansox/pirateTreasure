import Frames from './utils/frames.js';
import Game from './game.js';

export default class Bomb {
  static image;

  constructor(x) {
    this.width = 96;
    this.height = 108;
    this.scale = 2;
    this.x = x;
    this.y = height - (this.height * this.scale) + 5;
    this.initalY = this.y;

    this.frames = [];
    this.frame = 0;
    this.maxFrames = 10;
    this.frameSpeed = 3;
    this.countTick = 0;
    this.speed = 3;

    this.distance = 15;
    this.gravity = 2;
    this.forceSpeed = -35;


    this.frames = Frames.mountFrames(this.width, this.height, 4, this.maxFrames);
  }

  static preload() {
    Bomb.image = loadImage('./game/imgs/bomb.png');
  }

  tick() {
    this.y = this.y + this.forceSpeed;
    this.forceSpeed += this.gravity;

    if (this.y > this.initalY) {
      this.y = this.initalY;
      this.distance = -4;
    }

    this.x += this.distance;

    this.countTick++;
    if (this.countTick > this.frameSpeed) {
      this.countTick = 0

      this.frame++
      if (this.frame >= this.maxFrames) {
        this.frame = 0;
      }
    }

    if (this.isColliding(Game.enemy)) {
      console.log('boommm');

    }

    Game.bombs.forEach(bomb => {
      if (bomb.x < - bomb.width) {
        Game.bombs = Game.bombs.filter(item => item != bomb)
      }
    })
  }

  drawn() {
    // stroke('red');
    // noFill();
    // rect(this.x, this.y, this.width * this.scale, this.height * this.scale);

    image(Bomb.image, this.x, this.y,
      this.width * this.scale, this.height * this.scale,
      this.frames[this.frame].x, this.frames[this.frame].y,
      this.width, this.height);
  }

  isColliding(enemy) {
    const collision = collideRectRect(
      this.x, this.y, this.width, this.height,
      enemy.x, enemy.y, enemy.width, enemy.height
    )

    return collision;
  }
}
