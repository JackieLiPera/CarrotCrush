import Veggie from './veggie';

const icons = {
  carrot: './images/carrot.ico',
  tomato: './images/tomato.png',
  cucumber: './images/cucumber.png',
  potato: './images/potato.png',
  raddish: './images/raddish.png',
  broccoli: './images/broccoli.png'
}

class Board {
  constructor(ctx) {
    this.icons = icons;
    this.ctx = ctx;
    this.grid = new Array(6);
      for (let i = 0; i < this.grid.length; i ++) {
        this.grid[i] = (new Array(6))
      }
    this.populate()
    this.populate = this.populate.bind(this);
    this.moveVeggie = this.moveVeggie.bind(this);
    this.isValidMove = this.isValidMove.bind(this);
    this.draw = this.draw.bind(this);
  }


  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new Veggie();
      }
    }
    return this.grid
  }

  draw(ctx) {
    let images = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        let img = new Image();
        let veggieType = this.grid[i][j].type;
        let source =  this.icons[veggieType];
        img.xpos = (i * 80);
        img.ypos = (j * 80);
        img.src = source;
        images.push(img)
      }

    }

    images.forEach( (image) => {
      image.onload = function() {
        ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
      }
    });


  }

  moveVeggie(fromMove, toMove) {
    if (this.isValidMove(fromMove, toMove) === true) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];

      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;
      this.draw(this.ctx);
    } else {
      console.log('Invalid move')
      this.shake();
    }
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

}


export default Board;
