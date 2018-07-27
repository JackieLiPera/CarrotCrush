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
  null: './images/emptyspace.png'
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
    this.fromMove = null;
    this.toMove = null;
    this.x1 = null;
    this.y1 = null;
    this.x2 = null;
    this.y2 = null;
    // this.swap = this.swap.bind(this);
  }

  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new Fruit();
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
    if (this.isValidMove(fromMove, toMove) === true) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];
      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;

      this.fromMove = fromMove;
      this.toMove = toMove;
      this.x1 = (fromMove[0] * 80);
      this.y1 = (fromMove[1] * 80);
      this.x2 = (toMove[0] * 80);
      this.y2 = (toMove[1] * 80);
      requestAnimationFrame(Animation.swap(this.x1, this.x2, this.y1, this.y2, this.ctx, this));



      if (this.checkForStreak() === true) {
        this.renderWithCheck(this.ctx);
      } else {
        this.grid[toMove[0]][toMove[1]] = secondVeg;
        this.grid[fromMove[0]][fromMove[1]] = firstVeg;
      }
    } else {
        // Animation.shake(this.ctx, this);
        alert('Invalid move') // change this - create a shake animation?
    }
  }


  checkForStreak() {
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

  verticalCheck(grid) {
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
            return reversedStreak;
          }
        }
      }
    }
  }

  eliminateStreak(streak) {
    for (let i = 0; i < streak.length; i++) {
      let row = streak[i]
      this.grid[row[0]].splice(row[1], 1);
      this.grid[row[0]].unshift(new Fruit());
    }

    this.renderWithCheck(this.ctx);
  }

  renderWithCheck(ctx) {
    let images = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        let img = new Image();
        let FruitType = this.grid[i][j].type;
        let source =  this.icons[FruitType];
        img.xpos = (i * 80);
        img.ypos = (j * 80);
        img.src = source;
        images.push(img)
      }
    }

    let numImages = 0;
    images.forEach( (image) => {
      image.onload = () => {
        ctx.save();
        ctx.clearRect(image.xpos, image.ypos, 80, 80);
        ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
        ctx.restore();

        numImages++;
        if (numImages === 36) {
          this.checkBoardForStreaks();
        }
      };
    });
  }

  redraw(ctx) {
    let images = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        let img = new Image();
        let FruitType = this.grid[i][j].type;
        let source =  this.icons[FruitType];
        img.xpos = (i * 80);
        img.ypos = (j * 80);
        img.src = source;
        images.push(img)
      }
    }

    images.forEach( (image) => {
      image.onload = () => {
        ctx.save();
        ctx.clearRect(image.xpos, image.ypos, 80, 80);
        ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
        ctx.restore();
      };
    });
  }

}


export default Board;
