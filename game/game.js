import Scenario from './scenario.js';
import Player from './player.js';
import Enemy from './enemy.js';
import Bomb from './bomb.js';

export default class Game {
  constructor() {
  }

  preload() {
    Scenario.preload();
    Player.preload();
    Enemy.preload();
    Bomb.preload();
  }

  setup() {
    createCanvas(windowWidth, windowHeight);
    this.scenario = new Scenario(2);
    this.player = new Player();
    this.enemy = new Enemy();
    this.bomb = new Bomb();
  }

  keyPressed(key) {
    if (key === ' ') {
      this.player.jump();
    }
  }

  drawn() {
    this.scenario.tick();
    this.scenario.drawn();

    this.player.tick();
    this.player.drawn();

    this.enemy.tick();
    this.enemy.drawn();

    this.bomb.tick();
    this.bomb.drawn();

    if (this.enemy.x < - this.enemy.width) {
      this.enemy.x = width + this.enemy.width;
    }
  }
}