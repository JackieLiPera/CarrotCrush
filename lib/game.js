const Board = require('./board');

class Game {
  constructor() {
    this.veggies = [];
    this.points = 0;
    this.maxPoints = 1000;
    this.maxmoves = 10;
  }

  populateBoard(){

  }

  shuffleBoard() {

  }

  moveVeggie(fromPos, toPos) {

  }

  isValidMove(fromPos, toPos) {

  }

  draw(ctx) {

  }

}

Game.DIM_X = 600;
Game.DIM_Y = 600;
Game.NumVeggies = 36;
Game.NumMoves = 10;


module.exports = Game;
