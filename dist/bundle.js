/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/carrotcrush.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fruit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fruit */ "./lib/fruit.js");
/* harmony import */ var _empty_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty_space */ "./lib/empty_space.js");




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
        this.grid[i][j] = new _fruit__WEBPACK_IMPORTED_MODULE_0__["default"]([i, j]);
      }
    }

    while (this.findAndRemoveStreaks()) {

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

  moveFruit(fromMove, toMove) {
    if (this.isValidMove(fromMove, toMove)) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];

      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;
      debugger
      if (!this.findAndRemoveStreaks()) {
        this.grid[toMove[0]][toMove[1]] = secondVeg;
        this.grid[fromMove[0]][fromMove[1]] = firstVeg;
      }
    } else {
        alert('Invalid move')
    }
  }

  findAndRemoveStreaks() {
    let foundStreak = false;
    let vertStreak = this.verticalCheck();
    let horzStreak = this.horizontalCheck();
    debugger
    while (vertStreak || horzStreak) {
      if (vertStreak) this.eliminateStreak(vertStreak);
      if (horzStreak) this.eliminateStreak(horzStreak);
      vertStreak = this.verticalCheck();
      horzStreak = this.horizontalCheck();
      foundStreak = true;
    }
    debugger
    return foundStreak;
  }

  verticalCheck() {
    let vertStreak = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 3; j < this.grid[0].length; j++) {
        const streakLength = vertStreak.length;
        const currFruit = this.grid[i][j];
        if (streakLength === 0 && currFruit.type !== 'empty') {
          vertStreak.push([i, j]);
        } else {
          const lastPos = vertStreak[streakLength - 1];
          const lastFruitType = this.grid[lastPos[0]][lastPos[1]].type;
          if (lastFruitType === currFruit.type) {
            vertStreak.push([i, j]);
          } else if (streakLength >= 3) {
            this.score += 50;
            return vertStreak;
          } else {
            vertStreak = [];
          }
        }
      }
      if (vertStreak.length >= 3) {
        this.score += 50;
        return vertStreak;
      } else {
        vertStreak = [];
      }
    }

    $(".player-score").text(this.score);
  }

  horizontalCheck() {
    let horzStreak = [];
    for (let j = 3; j < this.grid[0].length; j++) {
      for (let i = 0; i < this.grid.length; i++) {
        const streakLength = horzStreak.length;
        const currFruit = this.grid[i][j];

        if (streakLength === 0 && currFruit.type !== 'empty') {
          horzStreak.push([i, j]);
        } else {
          const lastPos = horzStreak[streakLength - 1];
          const lastFruitType = this.grid[lastPos[0]][lastPos[1]].type;
          if (lastFruitType === currFruit.type) {
            horzStreak.push([i, j]);
          } else if (streakLength >= 3) {
            this.score += 50;
            return horzStreak;
          } else {
            horzStreak = [];
          }
        }
      }
      if (horzStreak.length >= 3) {
        this.score += 50;

        return horzStreak;
      } else {
        horzStreak = [];
      }
    }
    $(".player-score").text(this.score);
  }

  eliminateStreak(streak) {
    debugger
    for (let i = 0; i < streak.length; i++) {
      const pos = streak[i]
      this.grid[pos[0]][pos[1]] = new _empty_space__WEBPACK_IMPORTED_MODULE_1__["default"]([pos[0], pos[1]]);
    }
    debugger
    this.shift();
  }

  shift() {
    debugger
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 3; j < this.grid[i].length; j++) {
        let column = this.grid[i];
        let currentItem = this.grid[i][j];

        if (currentItem.type === 'empty') {
          for (let k = j; k - 1 >= 0; k--) {
            const shiftingFruit = this.grid[i][k - 1];
            shiftingFruit.falling = true;
            shiftingFruit.lastYpos = [i, (k - 1)];
            shiftingFruit.setPos([i, k]);
            this.grid[i][k] = shiftingFruit;
          }
        }
      }
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
    }
  }
}


/* harmony default export */ __webpack_exports__["default"] = (Board);


/***/ }),

/***/ "./lib/carrotcrush.js":
/*!****************************!*\
  !*** ./lib/carrotcrush.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  const ctx = canvasEl.getContext("2d");
  new _game_view__WEBPACK_IMPORTED_MODULE_1__["default"](ctx).start();
});


/***/ }),

/***/ "./lib/empty_space.js":
/*!****************************!*\
  !*** ./lib/empty_space.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class EmptySpace {
  constructor(pos) {
    this.type = 'empty';
    this.pos = pos;
    this.vel = 0;
    this.falling = false;
    this.ypos = (pos[1] * 80);
    this.xpos = (pos[0] * 80);
  }

  createImage() {
    let img = new Image();
    img.src = './images/emptyspace.png';
    img.xpos = this.xpos;
    img.ypos = this.ypos;
    return img;
  }

  draw(ctx) {
    let image = this.createImage();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
  }

  move() {
    // this.ypos += this.vel;
    // if (this.falling) {
    //   if (this.ypos === (this.pos[1] * 80)) {
    //     this.vel = 0;
    //   } else {
    //     this.vel = (((this.pos[1] * 80) - this.ypos) / 60);
    //   }
    // } else {
    //   this.vel = 0;
    // }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (EmptySpace);


/***/ }),

/***/ "./lib/fruit.js":
/*!**********************!*\
  !*** ./lib/fruit.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DEFAULT = {
  TYPE: [
    "carrot",
    "blueberry",
    "kiwi",
    "pineapple",
    "strawberry",
    "banana"]
}

const ICONS = {
  carrot: './images/carrot.png',
  blueberry: './images/blueberry.png',
  pineapple: './images/pineapple-icon.png',
  banana: './images/banana.png',
  strawberry: './images/strawberry-icon.png',
  kiwi: './images/kiwi-icon.png'
}


class Fruit {
  constructor(pos) {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];;
    this.pos = pos;
    this.vel = 0;
    this.falling = false;
    this.xpos = pos[0] * 80;
    this.ypos = (pos[1] - 3) * 80;
    this.lastYpos = (pos[1] - 3) * 80;
    this.move = this.move.bind(this);
  }

  setPos(pos) {
    this.pos = pos;
    this.xpos = pos[0] * 80;
    this.ypos = (pos[1] - 3) * 80;
  }

  createImage() {
    let img = new Image();
    img.src = ICONS[this.type];
    img.xpos = this.xpos;
    img.ypos = this.ypos;
    return img;
  }


  draw(ctx) {
    let image = this.createImage();
    ctx.save();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
    ctx.restore();
  }

  move() {
    this.lastYpos += this.vel;
    
    if (this.falling) {
      if (this.lastYpos === this.ypos) {
        this.vel = 0;
      } else {
        this.vel = ((this.ypos - this.lastYpos) / 60);
      }
    } else {
      this.vel = 0;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Fruit);


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");


class Game {
  constructor(board) {
    this.objectiveScore = 1000;
    this.movesLeft = 5;
    this.board = board;
    this.prevMove = null;

    this.getMove = this.getMove.bind(this);
    this.handleMove = this.handleMove.bind(this);

    $("#canvas").on('click', this.handleMove);
    $(".target-score").text(`Target: ${this.objectiveScore}`);
    $(".moves-left").text(`${this.movesLeft}`);
  }

  play() {}

  checkWon() {
    if (this.movesLeft > 0 && this.board.score >= this.objectiveScore ) {
      alert('yerr')
    } else if (this.movesLeft === 0 && this.board.score !== this.objectiveScore) {
      alert('naa boi')
    } else if (this.movesLeft === 0 && this.board.score === this.objectiveScore) {
      alert('yerr')
    } else {
      return null;
    }
  }

  getMove(e) {
    let y = e.offsetX;
    let x = e.offsetY;

    let pos = [];
    if (y > 0 && y < 80) {
      pos.push(0)
    } else if (y >= 80 && y < 160) {
      pos.push(1);
    } else if (y >= 160 && y < 240) {
      pos.push(2);
    } else if (y >= 240 && y < 320) {
      pos.push(3);
    } else if (y >= 320 && y < 400) {
      pos.push(4);
    } else {
      pos.push(5);
    };

    if (x > 0 && x < 80) {
      pos.push(3)
    } else if (x >= 80 && x < 160) {
      pos.push(4);
    } else if (x >= 160 && x < 240) {
      pos.push(5);
    } else if (x >= 240 && x < 320) {
      pos.push(6);
    } else if (x >= 320 && x < 400) {
      pos.push(7);
    } else {
      pos.push(8);
    };

    return pos;
  }

  handleMove (e) {
    if (this.prevMove) {
      let fromMove = this.prevMove;
      let toMove = this.getMove(e);

      this.board.moveFruit(fromMove, toMove);
      this.movesLeft -= 1;
      $(".moves-left").text(`${this.movesLeft}`);
      this.prevMove = false;
      this.checkWon();
    } else {
      this.prevMove = this.getMove(e);
    }
  }

}


/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./lib/game.js");



class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
    this.game = new _game__WEBPACK_IMPORTED_MODULE_1__["default"](this.board);
  }

  start() {
    this.board.draw();
    this.game.play();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map