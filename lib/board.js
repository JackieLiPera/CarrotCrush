const Veggie = ('./veggie');

class Board {
  constructor(size = 6) {
    const board = {
      let x = new Array(6)
      for (var i = 0; i < 10; i++) {
        x[i] = new Array(6);
      }
    }

    this.numVeggies = 36;
    this.board = board;
  }

  populate() {
    board.map ((space) => {
      space.push(new Veggie())
    });
  }
}


module.exports = Board;
