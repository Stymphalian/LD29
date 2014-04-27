   var NODE_SEND_DIRECTIONS = {
      LEFT: 0,
      RIGHT: 1,
      BOTH: 2,
      NUMBER_OF_DIRECTIONS: 3
   };

   var COMPASS_DIRECTIONS = {
      N: 0,
      NE:1,
      E:2,
      SE:3,
      S:4,
      SW:5,
      W:6,
      NW:7           
   };

var Node = function(game, x, y, frame,col,row,group) {      
   var image = "Node";
   if( group.is_up === false){
      var image = "NodeVirus";      
   }
      
  Phaser.Sprite.call(this, game, x, y, image, frame);
  this.col = col;
  this.row = row;  
  this.group = group;
  this.send_direction = NODE_SEND_DIRECTIONS.BOTH;  
  this.frame = this.send_direction;  
   
   game.physics.arcade.enable(this);   
   this.body.immovable = true;   
      
   if( this.group.is_up === false ) {
      this.y += 32;
      this.body.y += 32;
   }
  
  this.inputEnabled = true;    
  function listener( sprite, pointer){
     this.send_direction  = (this.send_direction +1 ) % NODE_SEND_DIRECTIONS.NUMBER_OF_DIRECTIONS;
     this.frame = this.send_direction;     
  }
  this.events.onInputDown.add(listener,this);
   
   
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
   var dirs =  [COMPASS_DIRECTIONS.NW,COMPASS_DIRECTIONS.NE];
   if( this.group.is_up == false ){
      dirs = [COMPASS_DIRECTIONS.SW,COMPASS_DIRECTIONS.SE];
   }

   // determine the direction to send.
   if( this.send_direction == NODE_SEND_DIRECTIONS.BOTH) {
      if( this.game.rnd.integerInRange(1,10) < 5){
         neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.LEFT]);         
      }else{
         neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.RIGHT]);                 
      }
   } else {
      neighbour = this.getNeighbour(dirs[this.send_direction]);
   }
   
   // make sure a valid direction node is returned.
   if( neighbour === null){
      neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.LEFT]);
      if( neighbour === null){
         neighbour = this.getNeighbour(dirs[NODE_SEND_DIRECTIONS.RIGHT]);
      }
   }
   
   if( neighbour === null){
      // this case only happens on the mother cell nodes.
      //console.log("SOMETHING IS VERY VERY WRONG WITH NODE SEND DIRECTION");
   }
   return neighbour;   
};

Node.prototype.getNeighbour = function(direction){
   var row = this.row;
   var col = this.col;
   var stride = 6;
   if( direction ===  COMPASS_DIRECTIONS.NE){
      row -=1;      
   }else if(direction === COMPASS_DIRECTIONS.SE) {
      col += 1      
   }else if (direction === COMPASS_DIRECTIONS.SW){
      row +=1;   
   }else if (direction === COMPASS_DIRECTIONS.NW){
      col -=1;      
   }
   if( row < 0 || row >= stride ){ return null;}
   if( col < 0 || col >= stride ){return null;}
   return this.group.grid[row*stride + col];   
};