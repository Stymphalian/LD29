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
          
     this.load.image("play_background", "resources/SkinLayerBackground.png");
     this.load.image("virus","resources/VirusCell.png");
     this.load.image("whitebloodcell_angry","resources/WBCellAngry.png");
     this.load.image("whitebloodcell_happy","resources/WBCellHappy.png");
     this.load.spritesheet("depthcharge","resources/DepthCharge.png",128,128,4);
     this.load.image("gameover","resources/gameover.png");
     this.load.spritesheet("Node", "resources/node_direction.png",32,32,3);
     this.load.spritesheet("NodeVirus", "resources/node_direction_virus.png",32,32,3);
     this.load.image("healthSegment", "resources/healthSegment.png");
     
     this.load.image("WBCMother","resources/WBCellHappy.png");         
     this.load.image("VirusMother","resources/VirusCell.png");         
     
     
     this.load.image("playButton", "resources/playButton.png");
     this.load.image("virusButton", "resources/virusButton.png");
     this.load.image("wbcButton", "resources/wbcButton.png");     
     this.load.image("startButton", "resources/start-button.png");
     this.load.image("attributeButton", "resources/attributeButton.png");
     this.load.image("CellWall", "resources/cell_wall.png");     
      this.load.image("VirusBackground","resources/VirusBackground.png");
     this.load.audio("AttributeUpSound", "resources/AttributeUpSound.wav");
      this.load.audio("AttributeDownSound","resources/AttributeDownSound.wav");
      
      this.load.audio("MenuClick","resources/MenuClick.wav");
      this.load.audio("CellCollision","resources/CellCollision.wav");
      this.load.audio("NodeSwitch","resources/NodeSwitch.wav");
      this.load.audio("RemainingPoints","resources/RemainingPoints.wav");
      this.load.audio("MenuMusic","resources/MenuMusic.wav");
      this.load.audio("BattleMusic","resources/BattleMusic.wav");
          
     this.load.image("start_screen_background", "resources/TitlePage.png");
     this.load.image("virus_win_background","resources/VirusVictory.png");
     this.load.image("virus_lose_background","resources/VirusLose.png");
     this.load.image("wbc_win_background", "resources/BodyVictory.png");
     this.load.image("wbc_lose_background","resources/BodyLose.png");
     
     this.load.spritesheet("muteButton","resources/SpeakerSpritesheet.png",28,28,2);

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
