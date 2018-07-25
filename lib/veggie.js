const DEFAULT = {
  TYPE: [
    "carrot",
    "tomato",
    "broccoli",
    "cucumber",
    "raddish",
    "potato"]
}

class Veggie {
  constructor() {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];
  }
}

module.export = Veggie;
