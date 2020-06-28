import Game from "./game.js";

export default class UI {
  static healthBar;
  static heart;

  constructor() {
    this.barWidth = 154;
    this.barHeight = 62;

    this.lifeWidth = 22;
    this.lifeHeight = 19;

    this.scale = 1.5;
  }

  static preload() {
    UI.healthBar = loadImage('./game/imgs/healthBar.png');
    UI.heart = loadImage('./game/imgs/heart.png');
  }

  tick() {

  }

  draw() {
    image(UI.healthBar, 0, 0, this.barWidth * this.scale, this.barHeight * this.scale);

    let col = 40;
    const row = 21;
    const colDistance = 25;

    for (let i = 0; i < Game.player.lifes; i++) {
      image(UI.heart,
        col * this.scale, row * this.scale,
        this.lifeWidth * this.scale, this.lifeHeight * this.scale
      );

      col += colDistance;
    }
  }
}