import Bomb from './bomb.js';
import Game from './game.js';
import Animation from './animation.js';

export default class Player {
  static image;
  static imageJump;

  constructor() {
    this.height = 58;
    this.width = 58;
    this.scale = 2;
    this.x = 40;
    this.y = height - (this.height * this.scale) - 30;
    this.maxFrames = 14;
    this.frameSpeed = 1;
    this.maxFramesJump = 4;
    this.frameSpeedJump = 3;
    this.yInitial = this.y;
    this.isJump = false;
    this.bombLimit = 2;

    this.gravity = 3;
    this.jumpSpeed = 0;
    this.jumpHeight = -35;

    this.animation = new Animation();
    this.animation.add('run', Player.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    )

    this.animation.add('jump', Player.imageJump,
      this.width, this.height,
      2, this.maxFramesJump, this.frameSpeedJump
    )
  }

  static preload() {
    Player.image = loadImage('./game/imgs/player.png');
    Player.imageJump = loadImage('./game/imgs/playerJump.png');
  }

  tick() {
    this.y = this.y + this.jumpSpeed;
    this.jumpSpeed += this.gravity;

    if (this.y > this.yInitial) {
      this.y = this.yInitial;
      this.isJump = false;
    }
  }

  jump() {
    this.jumpSpeed = this.jumpHeight;
    this.isJump = true;
  }

  bomb() {
    if (!this.isJump) {
      if (Game.bombs.length < this.bombLimit) {
        const bomb = new Bomb(this.x);
        Game.bombs.push(bomb);
      }
    }
  }

  drawn() {
    // stroke('red');
    // noFill();
    // rect(this.x, this.y, this.width * this.scale, this.height * this.scale);

    if (this.isJump) {
      this.animation.play('jump', this.x, this.y, this.scale)
    }
    else {
      this.animation.play('run', this.x, this.y, this.scale);
    }

  }
}