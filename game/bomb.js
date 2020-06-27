import Frames from './utils/frames.js';

export default class Bomb {
  static image;

  constructor() {
    this.width = 96;
    this.height = 108;
    this.scale = 2;
    this.x = 240;
    this.y = height - (this.height * this.scale) + 5;

    this.frames = [];
    this.frame = 0;
    this.maxFrames = 10;
    this.frameSpeed = 3;
    this.countTick = 0;

    this.frames = Frames.mountFrames(this.width, this.height, 4, this.maxFrames);

    console.table(this.frames);

  }

  static preload() {
    Bomb.image = loadImage('./game/imgs/bomb.png');
  }

  tick() {
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
    image(Bomb.image, this.x, this.y,
      this.width * this.scale, this.height * this.scale,
      this.frames[this.frame].x, this.frames[this.frame].y,
      this.width, this.height);
  }
}
