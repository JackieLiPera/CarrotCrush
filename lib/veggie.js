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
    this.width = 50;
    this.height = 50;
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];
  }
}

export default Veggie;
