var CellWall = function(game, x, y,frame) {        
  Phaser.Sprite.call(this, game, x, y,"CellWall", frame);     
  //this.game.physics.arcade.enable(this);   
  //this.game.physics.p2.enable(this);   
  //this.game.physics.ninja.enable(this);   
  this.game.physics.ninja.enableCircle(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  //this.body.allowRotation = true;   
  //this.anchor.setTo(0,5,0.5);   
  //this.rotation = 45;
  //this.body.x += 50;
  //this.x +=50;
};

CellWall.prototype = Object.create(Phaser.Sprite.prototype);
CellWall.prototype.constructor = CellWall;

CellWall.prototype.update = function() {  
};

CellWall.prototype.onKilled = function() {  
};
   