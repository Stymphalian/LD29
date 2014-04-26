function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.choose_sides = this.game.add.group();
     
        
    this.set_stats = this.game.add.group();     
     
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);
     
    this.set_stats.add(this.startButton);
     
         
     
    this.menu_text = this.game.add.text(this.game.width/2,0,"Menu Screen",{fontSize:"32px", fill:"#FFF"});
    this.menu_text.anchor.setTo(0.5,0.5);
    //this.startText = this.game.add.text(16, 16, 'Playing Game', { fontSize: '32px', fill: '#FFF' });
  },
  update: function(){
     
  },
  startClick: function() {
     // choose side
     // distribute stats page.     
    this.game.state.start('play');
  }
};
