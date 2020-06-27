import Frames from './utils/frames.js'

export default class Enemy {
  static image;

  constructor() {
    this.width = 80;
    this.height = 72;
    this.scale = 2;
    this.x = width - this.width - 100;
    this.y = height - (this.height * this.scale) - 30;
    this.speed = 5;

    this.frames = [];
    this.frame = 0;
    this.maxFrames = 14;
    this.frameSpeed = 2;
    this.countTick = 0;

    this.frames = Frames.mountFrames(this.width, this.height, 4, this.maxFrames);
  }

  static preload() {
    Enemy.image = loadImage('./game/imgs/enemy01.png');
  }

  tick() {
    this.x -= this.speed;
    this.countTick++;
    if (this.countTick > this.frameSpeed) {
      this.countTick = 0

      this.frame++
      if (this.frame >= this.maxFrames) {
        this.frame = 0;
      }
    }
  }

  drawn() {
    image(Enemy.image, this.x, this.y, this.width * this.scale,
      this.height * this.scale, this.frames[this.frame].x, this.frames[this.frame].y, this.width, this.height);
  }
}