function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    // add our start button with a callback
     this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
     this.startButton.anchor.setTo(0.5,0.5);
     
     this.menu_text = this.game.add.text(this.game.width/2,0,"Menu Screen",{fontSize:"32px", fill:"#FFF"});
     this.menu_text.anchor.setTo(0.5,0.5);
     //this.startText = this.game.add.text(16, 16, 'Playing Game', { fontSize: '32px', fill: '#FFF' });
  },
  startClick: function() {    
    this.game.state.start('play');
  }
};
