export default class Scenario {
  static backImage;
  static layers = [];

  constructor(speed) {
    this.speed = speed;
    this.x1 = 0;
    this.x2 = width;
    this.layers = [];

    Scenario.layers = Scenario.layers.map(layer => ({
      ...layer,
      x2: width
    }))
  }

  static preload() {
    Scenario.layers.push({
      image: loadImage('./game/imgs/forest01.png'),
      x1: 0,
      x2: width,
      speed: 1
    });
    Scenario.layers.push({
      image: loadImage('./game/imgs/forest02.png'),
      x1: 0,
      x2: width,
      speed: 2
    });
    Scenario.layers.push({
      image: loadImage('./game/imgs/forest03.png'),
      x1: 0,
      x2: width,
      speed: 3
    });
    Scenario.layers.push({
      image: loadImage('./game/imgs/forest04.png'),
      x1: 0,
      x2: width,
      speed: 4
    });
    // Scenario.layers.push(loadImage('./game/imgs/forest05.png'));

  }

  tick() {
    Scenario.layers.forEach(layer => {
      layer.x1 -= layer.speed;
      layer.x2 -= layer.speed;

      if (layer.x1 <= -width) {
        layer.x1 = width;
      }

      if (layer.x2 <= -width) {
        layer.x2 = width;
      }
    })

  }

  drawn() {
    Scenario.layers.forEach(layer => {
      image(layer.image, layer.x1, 0, width, height);
      image(layer.image, layer.x2, 0, width, height);
    })
  }
}