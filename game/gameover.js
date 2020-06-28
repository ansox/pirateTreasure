import Game from "./game.js";

export default class GameOver {
  static image;
  static font;

  constructor() {
    this.width = 400;
    this.height = 400;
    this.x = (width / 2) - (this.width / 2);
    this.y = (height / 2) - (this.height / 2);

    this.countTick = 0;
    this.maxTick = 15;
    this.showText = true;
  }

  static preload() {
    GameOver.image = loadImage('./game/imgs/board.png');
    GameOver.font = loadFont('./game/fonts/PressStart2P-Regular.ttf');
  }

  tick() {
    this.countTick++;
    if (this.countTick > this.maxTick) {
      this.countTick = 0;
      this.showText = !this.showText;
    }
  }

  drawn() {
    image(GameOver.image, this.x, this.y, this.width, this.height);

    textFont(GameOver.font);
    textSize(25);
    textAlign(CENTER);
    fill('#41424c')
    text(`Points: ${Game.player.points}`, width * 0.50, (height / 2) + 20)
    if (this.showText) {
      fill('#000')
      text('Press "Space" to restart', width / 2, (height / 2) + 200)
    }
  }
}