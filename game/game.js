import Scenario from './scenario.js';
import Player from './player.js';
import Enemy from './enemy.js';
import Bomb from './bomb.js';
import EnemySprites from './enemySprites.js';
import UI from './ui.js';
import GameOver from './gameover.js';
import StartGame from './startGame.js';

export default class Game {
  static bombs = [];
  static enemy;
  static player;

  static STATE_START = 'start';
  static STATE_PLAYING = 'playing';
  static STATE_GAMEOVER = 'game_over';

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
    GameOver.preload();
    StartGame.preload();
  }

  setup() {
    createCanvas(windowWidth, windowHeight);

    this.start();
    this.state = Game.STATE_START;

    this.scenario = new Scenario(2);
  }

  start() {
    Game.player = new Player();
    this.startGame = new StartGame();
    this.gameOver = new GameOver();

    this.enemies = this.enemyList.list.map(enemyData => {
      return new Enemy(enemyData, 5)
    });

    Game.enemy = this.getEnemy();

    this.ui = new UI();

    this.bombs = [];
  }

  keyPressed(key) {
    if (this.state === Game.STATE_PLAYING) {
      if (key === ' ') {
        Game.player.jump();
      }

      if (key === 'z' || key === 'Z') {
        Game.player.bomb();
      }
    }

    if (this.state === Game.STATE_GAMEOVER) {
      if (key === ' ') {
        clear();
        this.start();
        this.state = Game.STATE_PLAYING;

      }
    }

    if (this.state === Game.STATE_START) {
      if (key === ' ') {
        clear();
        this.start();
        this.state = Game.STATE_PLAYING;
      }
    }

  }

  drawn() {
    if (this.state === Game.STATE_PLAYING) {
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
        Game.player.points += 10;
        Game.enemy = this.getEnemy();
        Game.enemy.x = width + Game.enemy.width;
        Game.enemy.speed = parseInt(random(10, 20))
      }

      this.ui.tick();
      this.ui.draw();

      if (Game.player.lifes <= 0) {
        this.state = Game.STATE_GAMEOVER;
      }
    }

    if (this.state === Game.STATE_GAMEOVER) {
      this.scenario.drawn();

      this.gameOver.tick();
      this.gameOver.drawn();
    }

    if (this.state === Game.STATE_START) {
      this.scenario.tick();
      this.scenario.drawn();

      this.startGame.tick();
      this.startGame.draw();
    }
  }

  getEnemy() {
    return this.enemies[parseInt(random(4))];
  }
}