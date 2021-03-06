   var FACTION  = {
      VIRUS:0,
      WBC:1      
   };   

// stats object
//{spawn_rat, cell_endurance, cell_speed}
var Player = function(game,faction,is_player,stats) {      
  Phaser.Group.call(this, game);  

  this.spawn_rate = stats.spawn_rate; // 1 cell/second
  this.recharge_timer = 25000 // 25 seconds
  this.cell_endurance = stats.cell_endurance;
  this.cell_speed = stats.cell_speed;  
  this.faction = faction;
  this.is_player = is_player;
  this.stats = {};
   
   var mother_pos = 0;
   var is_up = false;
   if( this.faction == FACTION.VIRUS){      
        is_up =false;      
   }else if( this.faction == FACTION.WBC ){
        is_up = true;    
   }   
   
  // creates the this.grid, and this.grid_group properties
  this.nodegrid = new NodeGrid(this.game,is_up); // group    
  this.cells = this.game.add.group();
  //this.cells.enableBody = true;
  //this.cells.physicsBodyType = Phaser.Physics.ARCADE;
   
   
   // faction specific code   
   if( this.faction == FACTION.VIRUS){      
      mother_pos = 0;         
      this.nodegrid.y -= this.nodegrid.grid[0].height;
   }else if( this.faction == FACTION.WBC ){
      mother_pos = this.nodegrid.grid.length -1; // hardcoded stuf.   
   }
            
   // player/ computer specific properties
   if( this.is_player){
      this.nodegrid.visible = true;
      this.stats = this.game.JORDAN_PLAYER_STATS;
   }else {
      this.nodegrid.visible = false;
      this.stats = this.game.JORDAN_COMPUTER_STATS;
   }
   
   
   // TODO: HACKS OF UTTER DESTRUCTION.... gdamit.. realated to the re-positioning 
   // code in Node.js line 36,37
   var mother_pos_y = this.nodegrid.grid[mother_pos].y;      
   if( is_up === false){            
      mother_pos_y -= 32;//this.mother.height;      
   }
   this.mother = new Mother(this.game,
                           this.nodegrid.grid[mother_pos].x,
                           mother_pos_y,
                           0,this);   
   //this.mother = new Mother(this.game,100,100,0);   
   this.game.add.existing(this.mother);
      
   var scale;
   var new_cell;
   
   //for( var i = 0; i < 10; ++i){      
   //   scale = 0.3;
   //   new_cell = new Cell(this.game,
   //                           this.game.world.randomX,
   //                           this.game.world.randomY,
   //                           //this.cells,
   //                           undefined,
   //                           this.faction,
   //                           this.stats.cell_endurance,
   //                           this.stats.cell_speed);
   //   new_cell.target = this.mother;
   //   new_cell.scale.x = scale;
   //   new_cell.scale.y = scale;
   //   new_cell.body.setSize(new_cell.body.width*scale, new_cell.body.height*scale);      
   //   this.cells.add(new_cell);      
   //}      
   //this.cells.setAll('target',this.mother);
   //this.cells.setAll('scale.x',0.3);
   //this.cells.setAll("scale.y", 0.3);            
   
   
   //this.cellGenerator = this.game.time.events.loop(Phaser.Timer.SECOND,function(){
   //   var scale = 0.3;
   //   var new_cell = this.cells.getFirstExists(false);
   //   if( !new_cell){
   //      new_cell = new Cell(this.game,
   //                           0,0,
   //                           this.cells,
   //                           this.faction,
   //                           this.stats.cell_endurance,
   //                           this.stats.cell_speed);
   //      new_cell.target = this.mother;
   //      new_cell.scale.x = scale;
   //      new_cell.scale.y = scale;
   //      new_cell.body.setSize(new_cell.body.width*scale, new_cell.body.height*scale);
   //      this.cells.add(new_cell);                     
   //      window.cell_count += 1;
   //   }
   //   //new_cell.body.x = this.mother.x + this.mother.body.width/2;
   //   //new_cell.body.y = this.mother.y + this.mother.body.height/2;
   //   new_cell.reset(this.mother.x + this.mother.body.width/2, this.mother.y + this.mother.body.height/2);         
   //   new_cell.revive();
   //}, this);
   //this.cellGenerator.timer.start();     
};
Player.prototype = Object.create(Phaser.Group.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

};