var Mother = function(game, x, y, frame) {   
  Phaser.Sprite.call(this, game, x, y, 'Mother', frame);  
   
  var spawn_rate = 60; // 1 cell per second
  var spawn_bar = 0;  
  //this.anchor.setTo(0.5, 0.5);
  //this.animations.add('flap');
  //this.animations.play('flap', 12, true);

  //this.name = 'Mother';
  //this.alive = false;
  //this.visible = false;  

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = true;
  this.immovable = true;
  this.events.onKilled.add(this.onKilled, this);  
};

Mother.prototype = Object.create(Phaser.Sprite.prototype);
Mother.prototype.constructor = Mother;

Mother.prototype.update = function() {     
};

Mother.prototype.revived = function() { 
};

Mother.prototype.onKilled = function() {
  this.exists = true;
  this.visible = true;
  this.animations.stop();
  //var duration = 90 / this.y * 300;
  //this.game.add.tween(this).to({angle: 90}, duration).start();
  console.log('Mother killed');
  console.log('Mother alive:', this.alive);
};