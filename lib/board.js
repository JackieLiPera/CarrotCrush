import Fruit from './fruit';
import EmptySpace from './empty_space';
import Utility from './utility';
import Animation from './animation';

class Board {
  constructor(ctx) {
    this.grid = new Array(6);
    for (let i = 0; i < this.grid.length; i ++) {
      this.grid[i] = (new Array(9))
    }
    this.populate();
    this.ctx = ctx;
    this.score = 0;
    this.shift = this.shift.bind(this);
    this.draw = this.draw.bind(this);
    this.falling = [];
    $(".player-score").text(this.score);
  }

  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let pos = [i, j]
        this.grid[i][j] = new Fruit([i, (j - 3)]);
      }
    }
    return this.grid;
  }

  isValidMove(fromMove, toMove) {
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

  moveFruit(fromMove, toMove) {
    if (this.isValidMove(fromMove, toMove)) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];

      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;

      if (this.foundStreak()) {
        this.getStreak();
      } else {
        this.grid[toMove[0]][toMove[1]] = secondVeg;
        this.grid[fromMove[0]][fromMove[1]] = firstVeg;
      }
    } else {
        alert('Invalid move')
    }
  }

  foundStreak() {
    let check1 = this.verticalCheck();
    let check2 = this.horizontalCheck();

    return (check1 || check2);
  }

  getStreak() {
    let vertStreak = this.verticalCheck();
    if (vertStreak) {
      this.eliminateStreak(vertStreak);
    }

    let horzStreak = this.horizontalCheck();
    if (horzStreak) {
      this.eliminateStreak(horzStreak);
    }
  }

  verticalCheck() {
    let currentVertStreak = [];

    for (let i = 0 ; i < this.grid.length; i++) {
      for (let j = 4; j < this.grid[i].length; j++) {
        if (currentVertStreak.length === 0 && this.grid[i][(j - 1)].type !== 'empty') {
          currentVertStreak.push([i, (j - 4)]);
        }

        if (this.grid[i][j].type === this.grid[i][(j - 1)].type){
          currentVertStreak.push([i, (j - 3)]);
        } else {
            if (currentVertStreak.length >= 3) {
              this.score += 50;
              return currentVertStreak;
            } else {
              currentVertStreak = [];
            }
        }

        if (j === this.grid[i].length - 1) {
          if (currentVertStreak.length >= 3) {
            this.score += 50;
            return currentVertStreak;
          } else {
            currentVertStreak = [];
          }
        }
      }
    }
  }

  horizontalCheck() {
    let currentHorzStreak = [];
    for (let j = 3; j < this.grid[0].length; j++) {
      for (let i = 1; i < this.grid.length; i++) {
        if (currentHorzStreak.length === 0 && this.grid[(i - 1)][j].type !== 'empty') {
          currentHorzStreak.push([(i - 1), (j - 3)]);
        }

        if (this.grid[i][j].type === this.grid[(i - 1)][j].type){
          currentHorzStreak.push([i, (j - 3)]);
        } else {
          if (currentHorzStreak.length >= 3) {
            this.score += 50;
            return currentHorzStreak;
          } else {
            currentHorzStreak = [];
          }
        }

        if (i === this.grid[0].length - 1) {
          if (currentHorzStreak.length >= 3) {
            this.score += 50;
            return currentHorzStreak;
          } else {
            currentHorzStreak = [];
          }
        }
      }
    }
  }

  eliminateStreak(streak) {
    // debugger
    for (let i = 0; i < streak.length; i++) {
      let pos = streak[i]
      this.grid[pos[0]].splice((pos[1] + 3), 1, new EmptySpace([pos[0], (pos[1])]));
    }

    this.shift();
  }

  shift() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length - 1; j++) {
        let column = this.grid[i];
        let currentItem = this.grid[i][j];


        if (currentItem.type === 'empty') {
          Utility.removeA(column, currentItem);
          let newFruit = new Fruit([i, j - 3]);
          column.unshift(newFruit);

          for (let k = 0; k <= j; k++) {
            let fallingFruit = column[k];
            fallingFruit.pos = ([i, (k - 3)]);
            if (!this.falling.includes(fallingFruit)) {
              this.falling.unshift(fallingFruit);
            }
          }
        }
      }
    }

    if (this.falling.length > 0) {
      this.falling.forEach ((item) => {
        item.falling = true;
      });
    }
  }


  draw() {
    this.ctx.clearRect(0, 0, this.ctx.height, this.ctx.width);
    requestAnimationFrame(this.draw);

    let items = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 3; j < this.grid[i].length; j++) {
        let item = this.grid[i][j];
        item.draw(this.ctx);

        items.push(item);
      }
    }

    if (items.length >= 36) {
      items.forEach ((item) => {
        item.move();
      });

      this.getStreak();
    }
  }
}


export default Board;
