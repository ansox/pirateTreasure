import Animation from "./animation.js";
import Treasure from "./treasure.js";

export default class Coin extends Treasure {
  static image;

  constructor(x, y) {
    super(x, y);

    this.width = 16;
    this.height = 16;
    this.maxFrames = 4;
    this.frameSpeed = 6;
    this.particleColor = 'rgb(217, 170, 122)'

    this.mask = {
      marginX: 0,
      marginY: 0,
      width: 16,
      height: 16
    }

    this.animation = new Animation();
    this.animation.add('coin', Coin.image,
      this.width, this.height,
      4, this.maxFrames, this.frameSpeed
    );

  }

  static preload() {
    Coin.image = loadImage('./game/imgs/coins.png');
  }

  drawn() {
    this.animation.play('coin', this.x, this.y, 3);
  }
}