   var FACTION  = {
      VIRUS:0,
      WBC:1      
   };   
var Player = function(game,faction,is_player) {      
  Phaser.Group.call(this, game);  

  this.spawn_rate = 1000; // 1 cell/second
  this.recharge_timer = 25000 // 25 seconds
  this.cell_endurance = 0;
  this.cell_speed = 0;  
  this.faction = faction;
  this.is_player = is_player;

   var mother_pos = 0;
   var is_up = false;
   if( this.faction == FACTION.VIRUS){      
         is_up =false;
        mother_pos = 0;
   }else if( this.faction == FACTION.WBC ){
        is_up = true;
        mother_pos = 6*6 -1; // hardcoded stuf.
   }   
   
  // creates the this.grid, and this.grid_group properties
  this.nodegrid = new NodeGrid(this.game,is_up);      
  this.cells = this.game.add.group();
         
   // faction specific code
   
   
   this.mother = new Mother(this.game,this.nodegrid.grid[mother_pos].x,this.nodegrid.grid[mother_pos].y,0);   
   //this.mother = new Mother(this.game,100,100,0);   
   this.game.add.existing(this.mother);
   // player/ computer specific properties
   if( this.is_player){
      this.nodegrid.visible= true;
   }else {
      this.nodegrid.visible = false;
   }
   
   
   
   if( this.is_player == true){
      for( var i = 0; i < 10; ++i){
         this.cells.add(new Cell(this.game,
                                 this.game.world.randomX,       
                                 this.game.world.randomY,
                                 this.cells));
         
      }      
      this.cells.setAll('target',this.mother);
      this.cells.setAll('scale.x',0.1);
      this.cells.setAll("scale.y", 0.1);         
   }
   
  //this.anchor.setTo(0.5, 0.5);
  //this.animations.add('flap');
  //this.animations.play('flap', 12, true);

  //this.flapSound = this.game.add.audio('flap');

  //this.name = 'Player';
  //this.alive = false;
   //this.visible = false;  

  // enable physics on the Player
  // and disable gravity on the Player
  // until the game is started
  //this.game.physics.arcade.enableBody(this);
  //this.body.allowGravity = false;
  //this.body.collideWorldBounds = true;

  //this.events.onKilled.add(this.onKilled, this);  
};

Player.prototype = Object.create(Phaser.Group.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

};