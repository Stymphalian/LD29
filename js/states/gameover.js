function Gameover() {
}
Gameover.prototype = {
  create: function() {
    // start the phaser arcade physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
     
   // add keyboard controls
    this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.flapKey.onDown.addOnce(this.startGame, this);
    //this.flapKey.onDown.add(this.bird.flap, this.bird);
    

    // add mouse/touch controls
    this.game.input.onDown.addOnce(this.startGame, this);
    //this.game.input.onDown.add(this.bird.flap, this.bird);
    
    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
     
     
     //this.game.add.text(36,36,"Gameover Text",{fontSize: "48px", fill:"#FFF"});    
     console.log("ending play");
     
     this.gameover_image = this.game.add.sprite(this.game.width/2, this.game.height/2,"gameover");        
     this.gameover_image.anchor.setTo(0.5,0.5);
  },
  update: function() {
    
  },
  shutdown: function() {
     this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
     this.gameover_image.destroy();
  },
  startGame: function() {
   this.game.state.start("menu");
  }  
};
