import Frames from './utils/frames.js'
import Bomb from './bomb.js';
import Game from './game.js';

export default class Player {
  static image;
  static imageJump;

  constructor() {
    this.height = 58;
    this.width = 58;
    this.scale = 2;
    this.x = 40;
    this.y = height - (this.height * this.scale) - 30;
    this.frameActual = 0;
    this.maxFrames = 14;
    this.frameSpeed = 1;
    this.countTick = 0;
    this.maxFramesJump = 4;
    this.yInitial = this.y;
    this.isJump = false;

    this.gravity = 3;
    this.jumpSpeed = 0;
    this.jumpHeight = -35;
    this.jumpFrameActual = 0

    this.frames = Frames.mountFrames(this.width, this.height, 4, this.maxFrames);
    this.framesJump = Frames.mountFrames(this.width, this.height, 2, this.maxFramesJump);
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

    this.countTick++;

    if (this.isJump) {
      if (this.countTick > 3) {
        this.countTick = 0

        this.jumpFrameActual++
        if (this.jumpFrameActual >= this.maxFramesJump) {
          this.jumpFrameActual = 0;
        }
      }
    }
    else {
      if (this.countTick > this.frameSpeed) {
        this.countTick = 0

        this.frameActual++
        if (this.frameActual >= this.maxFrames) {
          this.frameActual = 0;
        }
      }
    }
  }

  jump() {
    this.jumpSpeed = this.jumpHeight;
    this.isJump = true;
  }

  bomb() {
    const bomb = new Bomb(this.x);
    Game.bombs.push(bomb);
    console.log('bomb');
  }

  drawn() {
    stroke('red');
    noFill();
    rect(this.x, this.y, this.width * this.scale, this.height * this.scale);

    if (!this.isJump) {
      image(Player.image, this.x, this.y, this.width * this.scale,
        this.height * this.scale, this.frames[this.frameActual].x, this.frames[this.frameActual].y, this.width, this.height);
    }
    else {
      image(Player.imageJump, this.x, this.y, this.width * this.scale,
        this.height * this.scale, this.framesJump[this.jumpFrameActual].x,
        this.framesJump[this.jumpFrameActual].y, this.width, this.height);
    }
  }
}