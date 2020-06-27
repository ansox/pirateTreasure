import Game from './game.js';
import Animation from './animation.js';

export default class Bomb {
  static image;

  constructor(x) {
    this.width = 96;
    this.height = 108;
    this.scale = 2;
    this.x = x;
    this.y = height - (this.height * this.scale) + 5;
    this.initalY = this.y;

    this.maxFrames = 10;
    this.frameSpeed = 3;
    this.speed = 3;

    this.distance = 15;
    this.gravity = 2;
    this.forceSpeed = -35;

    this.animation = new Animation();
    this.animation.add(
      'bomb', Bomb.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    )
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

    this.animation.play('bomb', this.x, this.y, this.scale);
  }

  isColliding(enemy) {
    const collision = collideRectRect(
      this.x, this.y, this.width, this.height,
      enemy.x, enemy.y, enemy.width, enemy.height
    )

    return collision;
  }
}
