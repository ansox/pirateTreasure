export default class AudioCenter {
  static music;
  static jump;
  static coin;
  static explosion;
  static bomb;
  static atack;

  constructor() {
    this.audio = {};
    this.audio['music'] = AudioCenter.music;
    this.audio['jump'] = AudioCenter.jump;
    this.audio['coin'] = AudioCenter.coin;
    this.audio['explosion'] = AudioCenter.explosion;
    this.audio['bomb'] = AudioCenter.bomb;
    this.audio['atack'] = AudioCenter.atack;
  }

  static preload() {
    AudioCenter.music = loadSound('./game/audio/music.ogg');
    AudioCenter.jump = loadSound('./game/audio/jump.mp3');
    AudioCenter.coin = loadSound('./game/audio/coin.wav');
    AudioCenter.explosion = loadSound('./game/audio/explosion.wav');
    AudioCenter.bomb = loadSound('./game/audio/bomb.ogg');
    AudioCenter.atack = loadSound('./game/audio/atack.ogg');
  }

  loop(id) {
    this.audio[id].setVolume(0.5);
    this.audio[id].loop();
  }

  play(id) {
    this.audio[id].setVolume(1);

    this.audio[id].play();
  }

  stop(id) {
    this.audio[id].stop();
  }

  rate(id, speed) {
    this.audio[id].rate(speed)
    this.audio[id].play()
  }
}