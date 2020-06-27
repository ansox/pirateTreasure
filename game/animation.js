import Frames from './utils/frames.js'

export default class Animation {
  constructor() {
    this.animations = {};
  }

  add(id, spriteSheet, width, height, cols, totalFrames, speed) {
    this.animations[id] = {
      spriteSheet,
      width,
      height,
      frames: Frames.mountFrames(width, height, cols, totalFrames),
      totalFrames,
      frameActual: 0,
      speed,
      countTick: 0
    }
  }

  next(animation) {
    animation.countTick++;

    if (animation.countTick > animation.speed) {
      animation.countTick = 0

      animation.frameActual++
      if (animation.frameActual >= animation.totalFrames) {
        animation.frameActual = 0;
      }
    }
  }

  play(id, x, y, scale) {
    const animation = this.animations[id];

    image(
      animation.spriteSheet,
      x, y,
      animation.width * scale, animation.height * scale,
      animation.frames[animation.frameActual].x, animation.frames[animation.frameActual].y,
      animation.width, animation.height
    );

    this.next(animation);
  }
}