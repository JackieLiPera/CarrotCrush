import Veggie from './veggie';

const icons = {
  carrot: './images/carrot.ico',
  tomato: './images/tomato.png',
  cucumber: './images/cucumber.jpg',
  potato: './images/potato.png',
  raddish: './images/raddish.png',
  broccoli: './images/broccoli.png'
}

class Board {
  constructor(ctx) {
    this.icons = icons;
    this.ctx = ctx;
    this.grid = new Array(6).fill(new Array(6))
    this.populate = this.populate.bind(this);
    this.findTrios = this.findTrios.bind(this);
    this.populate()
    this.findTrios();
  }

  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new Veggie();
      }

      return this.grid;
    }
  }

  findTrios() {
    let trios = [];

    //horizontal check
    for (let i = 0; i < this.grid.length; i++) {
      let vegCount = 1;
      for (let j = 0; j < this.grid.length; j++) {
          let checked = false;

          if (i === this.grid.length - 1) {
            checked = true;
          } else {
              if (this.grid[i][j].type === this.grid[i+1][j].type &&
                this.grid[i][j].type !== -1) {
                vegCount += 1;
              } else {
                checked = true;
              }
          }

          if (checked) {
              if (vegCount >= 3) {
                  trios.push({ column: i+1-vegCount, row:j,
                              length: vegCount, horizontal: true });
              }
              vegCount = 1;
          }
      }
    }

    //vertical check
    for (let i = 0 ; i < this.grid.length; i++) {
      let vegCount = 1;
      for (let j = 0; j < this.grid.length; j++) {
        let checked = false;

        if (j === this.grid.length - 1) {
          checked = true;
        } else {
          if (this.grid[i][j].type === this.grid[i][j + 1].type &&
            this.grid[i][j].type !== -1) {
            vegCount += 1;
          } else {
            checked = true;
          }
        }

        if (checked) {
          if (vegCount >= 3) {
            trios.push({ column: i, row: j + 1 - vegCount,
                          length: vegCount, horizontal: false });
          }

          vegCount = 1;
        }
      }
    }

    return trios;
  }

  // reorganizeBoard() {
  //   let numTrios = (this.grid.findTrios()).length;
  //   while (numTrios > 1) {
  //     this.grid.removeTrios();
  //     this.grid.reshuffle();
  //     this.grid.findTrios();
  //   };
  //
  //   return this.grid;
  // }
  //
  // numValidMoves() {
  //
  // }


  draw(ctx) {
    let img = new Image();
    let xpos = 0;
    let ypos = 0;

    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid.length; j++) {
        let veggieType = this.grid[i][j].type;
        let source =  this.icons[veggieType];
        let image = img.src = source;
        xpos += 50;
        ypos += 50;
        img.addEventListener('load', function() {
          ctx.drawImage(img, 0, 0, 50, 50);
        }, false);
      }
    }
  }

}

export default Board;
