import Animation from './animation.js';
import EnemySprites from './enemySprites.js';
import Game from './game.js';
import Bomb from './bomb.js';

export default class Enemy {
  static STATE_RUN = 'run';
  static STATE_HIT = 'hit';
  static STATE_ATACK = 'atack';

  constructor(enemyData, speed) {
    this.id = enemyData.id;
    this.width = enemyData.width;
    this.height = enemyData.height;
    this.scale = 2;
    this.x = width - this.width - 100;
    this.y = height - (this.height * this.scale) - 30;
    this.speed = speed;

    this.state = Enemy.STATE_RUN;

    this.maxFrames = enemyData.maxFrames;
    this.frameSpeed = enemyData.frameSpeed;
    this.colFrames = enemyData.colFrames;
    this.maxFramesHit = enemyData.maxFramesHit;
    this.frameSpeedHit = enemyData.frameSpeedHit;
    this.colFramesHit = enemyData.colFramesHit;
    this.maxFramesAtack = enemyData.maxFramesAtack;
    this.frameSpeedAtack = enemyData.frameSpeedAtack;
    this.colFramesAtack = enemyData.colFramesAtack;
    this.eatAtack = enemyData.eatAtack;

    this.animation = new Animation();
    this.animation.add(
      'run', EnemySprites.sprites[this.id].image,
      this.width, this.height,
      this.colFrames, this.maxFrames, this.frameSpeed
    );
    this.animation.add(
      'hit', EnemySprites.sprites[this.id].imageHit,
      this.width, this.height,
      this.colFramesHit, this.maxFramesHit, this.frameSpeedHit, false
    );
    this.animation.add(
      'atack', EnemySprites.sprites[this.id].imageAtack,
      this.width, this.height,
      this.colFramesAtack, this.maxFramesAtack, this.frameSpeedAtack, false
    )
  }

  hit(state) {
    this.state = state;
  }

  tick() {
    if (this.state === Enemy.STATE_RUN) {
      this.x -= this.speed;
    } else if (this.state === Enemy.STATE_HIT) {
      if (this.animation.isEnded('hit')) {
        this.x = 0 - width;
        this.animation.restart('hit');
        this.state = Enemy.STATE_RUN;
      }
    } else if (this.state === Enemy.STATE_ATACK) {
      if (this.animation.isEnded('atack')) {
        this.animation.restart('atack');
        this.state = Enemy.STATE_RUN;
      }
    }

    for (let bomb of Game.bombs) {
      if (this.isColliding(bomb)) {
        if (bomb.grounded) {
          this.hit(Enemy.STATE_ATACK);
          bomb.state = this.eatAtack ? Bomb.STATE_EAT : Bomb.STATE_ATACK;
        }
        else {
          this.hit(Enemy.STATE_HIT);
          bomb.state = Bomb.STATE_EXPLOSTION;
        }
      }
    }
  }

  isColliding(bomb) {
    const collision = collideRectRect(
      this.x, this.y, this.width, this.height,
      bomb.x, bomb.y, bomb.width, bomb.height
    )

    return collision;
  }

  drawn() {
    // stroke('red');
    // noFill();
    // rect(this.x, this.y, this.width * this.scale, this.height * this.scale);

    if (this.state === Enemy.STATE_RUN) {
      this.animation.play('run', this.x, this.y, this.scale);
    } else if (this.state === Enemy.STATE_HIT) {
      this.animation.play('hit', this.x, this.y, this.scale);
    } else if (this.state === Enemy.STATE_ATACK) {
      this.animation.play('atack', this.x, this.y, this.scale);
    }

  }
}