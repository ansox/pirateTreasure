import Animation from './animation.js';

export default class Enemy {
  static image;
  static imageHit;
  static STATE_RUN = 'run';
  static STATE_HIT = 'hit';

  constructor() {
    this.width = 80;
    this.height = 72;
    this.scale = 2;
    this.x = width - this.width - 100;
    this.y = height - (this.height * this.scale) - 30;
    this.speed = 5;

    this.state = Enemy.STATE_RUN;

    this.maxFrames = 14;
    this.frameSpeed = 2;
    this.maxFramesHit = 6;
    this.frameSpeed = 1;

    this.animation = new Animation();
    this.animation.add(
      'run', Enemy.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    )
    this.animation.add(
      'hit', Enemy.imageHit,
      this.width, this.height,
      4, this.maxFramesHit, this.maxFramesHit, false
    )
  }

  static preload() {
    Enemy.image = loadImage('./game/imgs/enemy01.png');
    Enemy.imageHit = loadImage('./game/imgs/enemy01-hit.png');
  }

  hit() {
    console.log('ferido');
    this.state = Enemy.STATE_HIT;
  }

  tick() {
    if (this.state === Enemy.STATE_RUN) {
      this.x -= this.speed;
    } else {
      if (this.state === Enemy.STATE_HIT) {
        if (this.animation.isEnded('hit')) {
          this.x = width + this.width;
          this.animation.restart('hit');
          this.state = Enemy.STATE_RUN;
        }
      }
    }
  }

  drawn() {
    // stroke('red');
    // noFill();
    // rect(this.x, this.y, this.width * this.scale, this.height * this.scale);

    if (this.state === Enemy.STATE_RUN) {
      this.animation.play('run', this.x, this.y, this.scale);
    } else if (this.state === Enemy.STATE_HIT) {
      this.animation.play('hit', this.x, this.y, this.scale);
    }

  }
}