const Veggie = ('./veggie');

const board = {
  x: 250,
  y: 113,
  columns: 8,
  rows: 8,
  tilewidth: 40,
  tileheight: 40,
  tiles: [],
  selectedveggie: { selected: false, column: 0, row: 0 }
};

const veggies =
[[255, 128, 128],
[128, 255, 128],
[128, 128, 255],
[255, 255, 128],
[255, 128, 255],
[128, 255, 255],
[255, 255, 255]];


class Board {
  constructor() {
    this.board = board;
  }

  populate() {
    const autoBoard = this.board.map (row => row.map((space) => {
      return space.push(new Veggie)
    }));
  }

}

// console.log()

module.exports = Board;
