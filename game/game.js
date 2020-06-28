import Scenario from './scenario.js';
import Player from './player.js';
import Enemy from './enemy.js';
import Bomb from './bomb.js';
import EnemySprites from './enemySprites.js';
import UI from './ui.js';

export default class Game {
  static bombs = [];
  static enemy;
  static player;

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
    UI.preload();
  }

  setup() {
    createCanvas(windowWidth, windowHeight);
    this.scenario = new Scenario(2);
    Game.player = new Player();


    this.enemies = this.enemyList.list.map(enemyData => {
      return new Enemy(enemyData, 5)
    });

    Game.enemy = this.enemies[parseInt(random(4))];

    this.ui = new UI();
    collideDebug(true);
  }

  keyPressed(key) {
    if (key === ' ') {
      Game.player.jump();
    }

    if (key === 'z' || key === 'Z') {
      Game.player.bomb();
    }
  }

  drawn() {
    this.scenario.tick();
    this.scenario.drawn();

    Game.player.tick();
    Game.player.drawn();

    Game.enemy.tick();
    Game.enemy.drawn();

    Game.bombs.forEach(bomb => {
      bomb.tick();
      bomb.drawn();
    })

    if (Game.enemy.x < - Game.enemy.width) {
      Game.enemy = this.enemies[parseInt(random(4))];
      Game.enemy.x = width + Game.enemy.width;
      Game.enemy.speed = parseInt(random(5, 15))
    }

    this.ui.tick();
    this.ui.draw();

    if (Game.player.lifes <= 0) {
      noLoop();
    }
  }
}