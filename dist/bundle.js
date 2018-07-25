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
/* harmony import */ var _veggie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./veggie */ "./lib/veggie.js");


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
        this.grid[i][j] = new _veggie__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
  const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"]();
  new _game_view__WEBPACK_IMPORTED_MODULE_1__["default"](game, ctx).start();
});

window.findtrios = findTrios;


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
  constructor() {
    this.points = 0;
    this.maxPoints = 1000;
    this.maxMoves = 10;
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.won = null;
  }

  play() {
    this.board.populate();
  }

  won() {
    if (this.points >= this.maxPoints) {
      this.woon = true;
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


class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  start() {
    this.board.draw(this.ctx)
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/veggie.js":
/*!***********************!*\
  !*** ./lib/veggie.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DEFAULT = {
  TYPE: [
    "carrot",
    "tomato",
    "broccoli",
    "cucumber",
    "raddish",
    "potato"]
}

class Veggie {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Veggie);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map