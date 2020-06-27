import Scenario from './scenario.js';
import Player from './player.js';
import Enemy from './enemy.js';
import Bomb from './bomb.js';
import EnemySprites from './enemySprites.js';

export default class Game {
  static bombs = [];
  static enemy;

  constructor() {
  }

  preloadEnemies(enemyList) {
    this.enemyList = enemyList;
    this.enemyList.list.forEach(enemy => {
      EnemySprites.add(enemy);
    })
  }

  preload() {
    loadJSON('./game/json/enemies.json', this.preloadEnemies.bind(this));

    Scenario.preload();
    Player.preload();
    Bomb.preload();
  }

  setup() {
    createCanvas(windowWidth, windowHeight);
    this.scenario = new Scenario(2);
    this.player = new Player();
    Game.enemy = new Enemy(this.enemyList.list[3], 6);
    collideDebug(true);
  }

  keyPressed(key) {
    if (key === ' ') {
      this.player.jump();
    }

    if (key === 'z' || key === 'Z') {
      this.player.bomb();
    }
  }

  drawn() {
    this.scenario.tick();
    this.scenario.drawn();

    this.player.tick();
    this.player.drawn();

    Game.enemy.tick();
    Game.enemy.drawn();

    Game.bombs.forEach(bomb => {
      bomb.tick();
      bomb.drawn();
    })

    if (Game.enemy.x < - Game.enemy.width) {
      Game.enemy.x = width + Game.enemy.width;
    }
  }
}