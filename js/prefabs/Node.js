var Node = function(game, x, y, frame,col,row,group) {
  Phaser.Sprite.call(this, game, x, y, 'Node', frame);
  this.col = col;
  this.row = row;  
  this.group = group
  //this.anchor.setTo(0.5, 0.5);
  //this.animations.add('flap');
  //this.animations.play('flap', 12, true);

  //this.flapSound = this.game.add.audio('flap');

  //this.name = 'Node';
  //this.alive = false;
   //this.visible = false;  

  // enable physics on the Node
  // and disable gravity on the Node
  // until the game is started
  //this.game.physics.arcade.enableBody(this);
  //this.body.allowGravity = false;
  //this.body.collideWorldBounds = true;

  //this.events.onKilled.add(this.onKilled, this);  
};

Node.prototype = Object.create(Phaser.Sprite.prototype);
Node.prototype.constructor = Node;

Node.prototype.update = function() {
  //// check to see if our angle is less than 90
  //// if it is rotate the Node towards the ground by 2.5 degrees
  //if(this.angle < 90 && this.alive) {
  //  this.angle += 2.5;
  //} 
//
//  if(!this.alive) {
//    this.body.velocity.x = 0;
//  }
};

Node.prototype.flap = function() {
  //if(!!this.alive) {
  //  this.flapSound.play();
  //  //cause our Node to "jump" upward
  //  this.body.velocity.y = -400;
  //  // rotate the Node to -40 degrees
  //  this.game.add.tween(this).to({angle: -40}, 100).start();
  //}
};

Node.prototype.revived = function() { 
};

Node.prototype.onKilled = function() {
  //this.exists = true;
  //this.visible = true;
  //this.animations.stop();
  //var duration = 90 / this.y * 300;
  //this.game.add.tween(this).to({angle: 90}, duration).start();
  //console.log('killed');
  //console.log('alive:', this.alive);
};