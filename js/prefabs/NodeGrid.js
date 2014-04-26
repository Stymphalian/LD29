var NodeGrid = function(game, parent) {
  Phaser.Group.call(this, game, parent);      
   this.grid= [];   
       
   var x_increment = 75; //150/2
   var y_increment = 50;
   var x_pos, y_pos;
   var x_start, y_start;
   var new_node;
   
   x_start = 375;
   y_start = 25;
   x_pos = 0;
   y_pos = 0;
       
   for(var row = 0; row < 6; ++row){
      x_pos = x_start;
      y_pos = y_start;
      for( var col = 0; col < 6; ++col){            
         console.log("x_pos:" + x_pos  + ", y_pos:" + y_pos);
         new_node = new Node(this.game,x_pos,y_pos,0,col,row,this);
         this.grid.push(new_node);
         this.add(new_node);
         x_pos += x_increment;
         y_pos += y_increment;
      }			
      x_start -= x_increment;
      y_start += y_increment;
   }                    
  //this.topPipe = new Pipe(this.game, 0, 0, 0);
  //this.bottomPipe = new Pipe(this.game, 0, 440, 1);
  //this.add(this.topPipe);
  //this.add(this.bottomPipe);
  //this.hasScored = false;

  //this.setAll('body.velocity.x', -200);
};

NodeGrid.prototype = Object.create(Phaser.Group.prototype);
NodeGrid.prototype.constructor = NodeGrid;

NodeGrid.prototype.update = function() {
  //this.checkWorldBounds(); 
};

NodeGrid.prototype.checkWorldBounds = function() {
//  if(!this.topPipe.inWorld) {
//    this.exists = false;
//  }
};


NodeGrid.prototype.reset = function(x, y) {
  
};


NodeGrid.prototype.stop = function() {
  //this.setAll('body.velocity.x', 0);
};
