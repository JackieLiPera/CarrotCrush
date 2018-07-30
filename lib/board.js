import Fruit from './fruit';
import EmptySpace from './empty_space';
import Utility from './utility';
import Animation from './animation';

const icons = {
  carrot: './images/carrot.png',
  blueberry: './images/blueberry.png',
  pineapple: './images/pineapple-icon.png',
  banana: './images/banana.png',
  strawberry: './images/strawberry-icon.png',
  kiwi: './images/kiwi-icon.png',
  empty: './images/emptyspace.png'
}

class Board {
  constructor(ctx) {
    this.grid = new Array(6);
    for (let i = 0; i < this.grid.length; i ++) {
      this.grid[i] = (new Array(6))
    }
    this.populate();

    this.icons = icons;
    this.ctx = ctx;
    this.score = 0;
    this.draw = this.draw.bind(this);
    this.shift = this.shift.bind(this);
  }

  populate() { // returns populated grid
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new Fruit();
      }
    }
    return this.grid;
  }

  isValidMove(fromMove, toMove) { // returns a boolean
    let xPos1 = fromMove[0];
    let xPos2 = toMove[0];
    let yPos1 = fromMove[1];
    let yPos2 = toMove[1];

    if ((xPos1 === 0) && (xPos2 !== 0 && xPos2 !== 1)) {
      return false;
    } else if ((xPos1 === this.grid.length) && (xPos2 !== xPos1 - 1) && (xPos2 !== this.grid.length)) {
      return false;
    } else if ((yPos1 === 0) && (yPos2 !== yPos1 + 1) && (yPos2 !== 0)) {
      return false;
    } else if ((yPos1 === this.grid.length) && (yPos2 !== yPos1 - 1) && (yPos2 !== this.grid.length)) {
      return false;
    } else if ((xPos2 < (xPos1 - 1)) || (xPos2 > xPos1 + 1)) {
      return false;
    } else if ((yPos2 < yPos1 - 1) || (yPos2 > yPos1 + 1)) {
      return false;
    } else {
      return true;
    }
  }

  moveFruit(fromMove, toMove) { //
    if (this.isValidMove(fromMove, toMove) === true) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];

      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;


      let checkBoardForStreaks = this.checkBoardForStreaks();
      if (this.foundStreak() === true) {
        this.draw(this.ctx).then(checkBoardForStreaks);
      } else {
        this.grid[toMove[0]][toMove[1]] = secondVeg;
        this.grid[fromMove[0]][fromMove[1]] = firstVeg;
      }
    } else {
        alert('Invalid move')
    }
  }

  foundStreak() { // returns a boolean
    let check1 = this.verticalCheck(this.grid);
    let transGrid = Utility.transpose(this.grid);
    let check2 = this.horizontalCheck(transGrid);

    if (check1 || check2) {
      return true;
    } else {
      return false;
    }
  }

  checkBoardForStreaks() {
    let streak;
    if (this.verticalCheck(this.grid)) {
      streak = this.verticalCheck(this.grid);
      this.eliminateStreak(streak);
    }

    let transGrid = Utility.transpose(this.grid);
    if (this.horizontalCheck(transGrid)) {
      streak = this.horizontalCheck(transGrid);
      this.eliminateStreak(streak);
    }
  }

  verticalCheck(grid) { // returns positions of a single streak
    let currentStreak = [];

    for (let i = 0 ; i < grid.length; i++) {
      for (let j = 1; j < grid.length; j++) {
        let checked = false;

        if (currentStreak.length === 0) {
          currentStreak.push([i, (j - 1)]);
        }

        if (grid[i][j].type === grid[i][(j - 1)].type){
          currentStreak.push([i, j]);
        } else {
          if (grid[i][j].type !== grid[i][(j - 1)].type) {

            if (currentStreak.length >= 3) {
              this.score += 50;
              $(".player-score").text(this.score);
              this.animationState = 1;
              return currentStreak;
            }

            currentStreak = [];
            checked = false;
          }
        }

        if (j === grid.length - 1) {
          if (currentStreak.length >= 3) {
            this.score += 50;
            $(".player-score").text(this.score);
            this.animationState = 1;
            return currentStreak;
          }
        }
      }
    }
  }

  horizontalCheck(grid) {
    let currentStreak = [];

    for (let i = 0 ; i < grid.length; i++) {
      for (let j = 1; j < grid.length; j++) {
        let checked = false;

        if (currentStreak.length === 0) {
          currentStreak.push([i, (j - 1)]);
        }
        if (grid[i][j].type === grid[i][(j - 1)].type){
          currentStreak.push([i, j]);
        } else {
          if (grid[i][j].type !== grid[i][(j - 1)].type) {

            if (currentStreak.length >= 3) {
              let reversedStreak = currentStreak.map ((pos) => {
                return [pos[1], pos[0]];
              });

              this.score += 50;
              $(".player-score").text(this.score);
              this.animationState = 2;
              return reversedStreak;
            }

            currentStreak = [];
            checked = false;
          }
        }

        if (j === grid.length - 1) {
          checked = true;
        }

        if (checked) {
          if (currentStreak.length >= 3) {
            let reversedStreak = currentStreak.map ((pos) => {
              return [pos[1], pos[0]]
            });

            this.score += 50;
            $(".player-score").text(this.score);
            this.animationState = 2;
            return reversedStreak;
          }
        }
      }
    }
  }

  eliminateStreak(streak) {
    for (let i = 0; i < streak.length; i++) {
      let pos = streak[i]
      this.grid[pos[0]].splice(pos[1], 1, new EmptySpace());
    }

    let shift = this.shift(streak);
    this.draw(this.ctx).then(shift);
  }

  shift(streak) {

    let col = streak[0][0];
    let row = streak[streak.length - 1][1];
    let base = (row * 80);

    let shiftedCol = this.grid[col];
    let pos;
    for (let i = 1; i < shiftedCol.length; i++) {
      if (shiftedCol[i].type === 'empty' && shiftedCol[i - 1].type !== 'empty') {
        pos = [(col), (i - 1)];
      }
    }

    let y = (pos[1] * 80);
    for (let i = 0; i < streak.length; i++) {
      Animation.shift(col, y, base, this.ctx, this);

      this.grid[col].unshift(new Fruit());
    }
  }

  async draw(ctx) {
    let images = [];
      for(let i = 0; i < this.grid.length; i++) {
        for(let j = 0; j < this.grid[i].length; j++) {
          let img = new Image();

          let fruitType = this.grid[i][j].type;
          let source = this.icons[fruitType];

          img.xpos = (i * 80);
          img.ypos = (j * 80);
          img.src = source;
          images.push(img)
        }
      }

      images.forEach( (image) => {
        image.onload = () => {
          this.ctx.save();
          this.ctx.clearRect(image.xpos, image.ypos, 80, 80);
          this.ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
          this.ctx.restore();
        };
      }
    );
  }

}


export default Board;
