import Animation from './animation.js';

export default class Enemy {
  static image;

  constructor() {
    this.width = 80;
    this.height = 72;
    this.scale = 2;
    this.x = width - this.width - 100;
    this.y = height - (this.height * this.scale) - 30;
    this.speed = 5;

    this.maxFrames = 14;
    this.frameSpeed = 2;

    this.animation = new Animation();
    this.animation.add(
      'run', Enemy.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    )
  }

  static preload() {
    Enemy.image = loadImage('./game/imgs/enemy01.png');
  }

  tick() {
    this.x -= this.speed;
  }

  drawn() {
    // stroke('red');
    // noFill();
    // rect(this.x, this.y, this.width * this.scale, this.height * this.scale);

    this.animation.play('run', this.x, this.y, this.scale);
  }
}