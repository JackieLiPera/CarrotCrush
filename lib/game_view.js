class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.populate = this.game.initialize();
  }

  start() {
    
  }
}

module.exports = GameView;
