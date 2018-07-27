const DEFAULT = {
  TYPE: [
    "carrot",
    "blueberry",
    "kiwi",
    "pineapple",
    "strawberry",
    "banana"]
}

class Fruit {
  constructor() {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];
  }
}

export default Fruit;
