   var NODE_SEND_DIRECTIONS = {
      LEFT: 0,
      RIGHT: 1,
      BOTH: 2,
      NUMBER_OF_DIRECTIONS: 3
   };

var Node = function(game, x, y, frame,col,row,group) {      
  Phaser.Sprite.call(this, game, x, y, 'Node', frame);
  this.col = col;
  this.row = row;  
  this.group = group;
  this.send_direction = NODE_SEND_DIRECTIONS.BOTH;  
  this.frame = this.send_direction;  
   
   //this.anchor.setTo(0.5,0.5);
   if( this.group.is_up === false ) {
      this.scale.y *= -1;   
   }
  
  this.inputEnabled = true;    
  function listener( sprite, pointer){
     this.send_direction  = (this.send_direction +1 ) % NODE_SEND_DIRECTIONS.NUMBER_OF_DIRECTIONS;
     this.frame = this.send_direction;     
  }
  this.events.onInputDown.add(listener,this);
   
   game.physics.arcade.enable(this);   
   this.body.immovable = true;
  //this.enableBody = true;
   //this.immovable = true;
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

Node.prototype.getNeighbourFromSendDirection = function(direction){
   var neighbour = null;
   // differs depending on if going top->bottom or bottom-->top.
   var dirs =  ["NW","NE"];
   if( this.is_up ){
      dirs = ["SW,SE"];
   }

   // determine the direction to send.
   if( this.send_direction == NODE_SEND_DIRECTIONS.BOTH) {
      if( Math.random()*5 >= 5 ){
         neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.LEFT]);         
      }else{
         neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.RIGHT]);                 
      }
   } else {
      neighbour = this.getNeighbour(dirs[this.send_direction]);
   }
   
   // make sure a valid direction node is returned.
   if( neighbour == null){
      neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.LEFT]);
      if( neighbour == null){
         neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.RIGHT]);
      }
   }
   
   if( neighbour == null){
      console.log("SOMETHING IS VERY VERY WRONG WITH NODE SEND DIRECTION");
   }
   return neighbour;   
};

Node.prototype.getNeighbour = function(direction){
   var row = this.row;
   var col = this.col;
   var stride = 6;
   if( direction === "NE"){
      row -=1;      
   }else if(direction === "SE") {
      col += 1      
   }else if (direction === "SW"){
      row +=1;   
   }else if (direction === "NW"){
      col -=1;      
   }
   if( row < 0 || row >= stride ){ return null;}
   if( col < 0 || col >= stride ) {return null;}
   return this.group.grid[row*stride + col];   
};