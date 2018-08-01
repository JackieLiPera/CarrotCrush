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
    let check1 = this.verticalCheck(this.grid);
    let transGrid = Utility.transpose(this.grid);
    let check2 = this.horizontalCheck(transGrid);

    return (check1 || check2);
  }

  getStreak() {
    if (this.verticalCheck(this.grid)) {
      let vertStreak = this.verticalCheck(this.grid);
      this.eliminateStreak(vertStreak);
      vertStreak = [];
    }

    if (this.horizontalCheck(this.grid)) {
      let horzStreak = this.horizontalCheck(this.grid);
      this.eliminateStreak(horzStreak);
    }
  }

  verticalCheck(grid) {
    let currentVertStreak = [];

    for (let i = 0 ; i < grid.length; i++) {
      for (let j = 4; j < grid[i].length; j++) {
        if (currentVertStreak.length === 0 && this.grid[i][(j -1)].type != 'empty') {
          currentVertStreak.push([i, (j - 4)]);
        }

        if (grid[i][j].type === grid[i][(j - 1)].type){
          currentVertStreak.push([i, (j - 3)]);
        } else {
            if (currentVertStreak.length >= 3) {
              this.score += 50;
              $(".player-score").text(this.score);
              return currentVertStreak;
            } else {
              currentVertStreak = [];
            }
        }

        if (j === grid[i].length - 1) {
          if (currentVertStreak.length >= 3) {
            this.score += 50;
            $(".player-score").text(this.score);
            return currentVertStreak;
          } else {
            currentVertStreak = [];
          }
        }
      }
    }
    return false;
  }

  horizontalCheck(grid) {
    let currentHorzStreak = [];
    for (let j = 3; j < 9; j++) {
      for (let i = 1; i < 6; i++) {

        if (currentHorzStreak.length === 0 && grid[(i - 1)][j].type != 'empty') {
          currentHorzStreak.push([(i - 1), (j - 3)]);
        }
        if (grid[i][j].type === grid[(i - 1)][j].type){
          currentHorzStreak.push([i, (j - 3)]);
        } else {
            if (currentHorzStreak.length >= 3) {
              this.score += 50;
              $(".player-score").text(this.score);
              return currentHorzStreak;
            } else {
              currentHorzStreak = [];
            }
        }

        if (i === grid.length - 1) {
          if (currentHorzStreak.length >= 3) {
            this.score += 50;
            $(".player-score").text(this.score);
            return currentHorzStreak;
          } else {
            currentHorzStreak = [];
          }
        }
      }
    }
    return false;
  }

  eliminateStreak(streak) {
    for (let i = 0; i < streak.length; i++) {
      let pos = streak[i]
      this.grid[pos[0]].splice((pos[1] + 3), 1, new EmptySpace([pos[0], (pos[1])]));
    }

    this.shift();
  }

  shift() {
    let leadPos;
    let bottomPos;
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j].type === 'empty') {
          let falling = [];
          for (let k = 0; k < j; k++) {
            let fallingFruit = this.grid[i][k];
            fallingFruit.falling = true;
            fallingFruit.move();
            debugger
            falling.push(fallingFruit);
          }

          let last = falling[falling.length - 1];
          last.lead = true;
          leadPos = ((last.pos[1] * 80) + 80);
        } else if (this.grid[i][j].type === 'empty' && this.grid[i][j + 1].type != 'empty'){
          let bottom = this.grid[i][j + 1];
          bottomPos = (bottom.pos[1] * 80);
        }
      }
    }

  }

  draw() {
    this.ctx.clearRect(0, 0, this.ctx.height, this.ctx.width);
    requestAnimationFrame(this.draw);

    let imageCount = 0;
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 3; j < this.grid[i].length; j++) {
        let item = this.grid[i][j];
        item.draw(this.ctx);
        // if (item.type != 'empty') {
        //   debugger
        //   item.move();
        // }

        imageCount++;
      }
    }

    if (imageCount >= 36) {
      this.getStreak();
    }
  }
}


export default Board;
