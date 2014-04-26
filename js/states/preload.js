function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
     
     this.load.image("startButton", "resources/start-button.png");
     this.load.image("play_background", "resources/SkinLayerBackground.png");
     this.load.image("virus","resources/VirusCell.png");
     this.load.image("whitebloodcell_angry","resources/WBCellAngry.png");
     this.load.image("whitebloodcell_happy","resources/WBCellHappy.png");
     this.load.spritesheet("depthcharge","resources/DepthCharge.png",128,128,4);
     this.load.image("gameover","resources/gameover.png");
     this.load.image("Node", "resources/WBCellHappy.png");
         
//
//    this.load.audio('flap', 'assets/flap.wav');
//    this.load.audio('pipeHit', 'assets/pipe-hit.wav');
//    this.load.audio('groundHit', 'assets/ground-hit.wav');
//    this.load.audio('score', 'assets/score.wav');
//    this.load.audio('ouch', 'assets/ouch.wav');
//

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};
