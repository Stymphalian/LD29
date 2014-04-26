function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'resources/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};
