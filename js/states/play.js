//var Bird = require('../prefabs/bird');
//var Ground = require('../prefabs/ground');
//var Pipe = require('../prefabs/pipe');
//var PipeGroup = require('../prefabs/pipeGroup');
//var Scoreboard = require('../prefabs/scoreboard');

function Play() {
}
Play.prototype = {
	 create: function() {
       window.cell_count = 0;
		  // start the phaser arcade physics engine
		  this.game.physics.startSystem(Phaser.Physics.ARCADE);
//       this.game.physics.startSystem(Phaser.Physics.P2JS);
//       this.game.physics.startSystem(Phaser.Physics.NINJA);
//       this.game.physics.ninja.gravity = 0;
       
       
		 this.background = this.game.add.sprite(0,0,"play_background");

              
       this.player = new Player(this.game,this.game.JORDAN_PLAYER_STATS.faction,true,this.game.JORDAN_PLAYER_STATS); 
       this.computer= new Player(this.game,this.game.JORDAN_COMPUTER_STATS.faction,false,this.game.JORDAN_COMPUTER_STATS);
              
       // add wall into the screen to make a more 'tunnel' liek appearance.
//       this.place_walls();       
             
		  this.startText = this.game.add.text(16, 16, 'Playing Game', { fontSize: '32px', fill: '#FFF' });
		  console.log("Starting play");

		  // add keyboard controls
        this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        this.flapKey.onDown.add(function(){                      
           this.player.nodegrid.visible = !this.player.nodegrid.visible;
           this.computer.nodegrid.visible = !this.computer.nodegrid.visible;             
        }, this);
       //this.player.nodegrid.visible = true;
       //this.computer.nodegrid.visible = true; 
		  //this.flapKey.onDown.addOnce(this.startGame, this);
		  //this.flapKey.onDown.add(this.bird.flap, this.bird);

		  // add mouse/touch controls
		  //this.game.input.onDown.addOnce(this.startGame, this);
		  //this.game.input.onDown.add(this.bird.flap, this.bird);

		  // keep the spacebar from propogating up to the browser
		  this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
       
       this.cell_count_text = this.game.add.text(50,50,"Count " + window.cell_count,{fontSize:"28px",fill:"#000"});
         
         this.CellCollisionFX = this.game.add.audio("CellCollision",.1);
         this.BattleMusicFX = this.game.add.audio("BattleMusic", .6,true);
         this.BattleMusicFX.play("",.6,true);       
       
         this.is_muted = false;
         this.mute_button = this.game.add.button(this.game.width- 50,50,"muteButton", function(){            
            if( this.is_muted === true){
            //   this.BattleMusicFX.stop();
               this.BattleMusicFX.pause();
               this.mute_button.frame = 1;
               this.is_muted = false;
            }else{
               //this.BattleMusicFX.play("",0.6,true);   
               this.BattleMusicFX.resume();
               this.mute_button.frame = 0;
               this.is_muted = true;
            }            
         },this);         
	 },
   place_walls : function(){
      this.walls = this.game.add.group();      
            
      var x_increment = 75; //150/2
      var y_increment = 50;
      var x_pos, y_pos;
      var x_start, y_start;
      var new_node;   
      x_start = 375;
      y_start = 25;
      x_pos = 0;
      y_pos = 0;

      //this.enableBody = true;
      //this.physicsBodyType = Phaser.Physics.ARCADE;
      //this.immovable = true;
      //this.game.physics.arcade.enableBody(this);

      for(var row = 0; row < 6; ++row){
         x_pos = x_start;
         y_pos = y_start;
         for( var col = 0; col < 6; ++col){                        
            new_node = new CellWall(this.game,x_pos + x_increment,y_pos,0);            
            this.walls.add(new_node);
            x_pos += x_increment;
            y_pos += y_increment;
         }			
         x_start -= x_increment;
         y_start += y_increment;
      }
      
      this.walls.forEach(function(wall){
         wall.anchor.setTo(0.5,0.5);         
         wall.angle = 45;         
      });
      
   },
	 update: function() {        
       // player cells overlapping player nodes
       this.game.physics.arcade.overlap(this.player.cells,this.player.nodegrid,this.node_hit,null,this);
       
       // computer cell overlapping computer nodes.
       this.game.physics.arcade.overlap(this.computer.cells,this.computer.nodegrid,this.node_hit,null,this);
       
       // player cells colliding with computer cells
       this.game.physics.arcade.collide(this.player.cells,this.computer.cells,this.cell_hit_cell,null,this);
       //this.game.physics.arcade.overlap(this.player.mother,this.player.cells,this.mother_hit,null,this);
       
       // player cells colliding with computer mother
       this.game.physics.arcade.collide(this.player.mother,this.computer.cells,this.mother_hit,null,this); 
       
       // computer cells colliding with player mother
       this.game.physics.arcade.collide(this.computer.mother,this.player.cells,this.mother_hit,null,this);               
       
       this.cell_count_text.text = "Count "  + window.cell_count;
	 },
    
   cell_hit_cell: function(player_cell, computer_cell){
      if( this.is_muted == false){
       this.CellCollisionFX.play();         
      }

      var temp = player_cell.endurance;
      player_cell.damage(computer_cell.endurance);
      computer_cell.damage(temp);   
   },
    mother_hit: function(mother, cell){
       if( this.is_muted == false){
         this.CellCollisionFX.play();          
       }
       console.log("mother hit");
       
       mother.damage(cell.endurance); 
       cell.kill();
       if( mother.endurance <= 0){
           this.BattleMusicFX.stop();
         this.deathHandler(mother.player);
       }
       //mother.reset(this.game.world.randomX, this.game.world.randomY);
    },
   node_hit : function(cell, node){      
      // this litterly gets called tens of thousands of times per game....
      if( cell.prev_target === node){ return;}
      var next_target = node.getNeighbourFromSendDirection();  
      if( next_target === null){
         console.log("why null?");         
      }      
      
      // TODO FIND BETTER WAY!!!!!!
      cell.prev_target = node;
      cell.target = next_target;
   },
	 shutdown: function() {
		  this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);  
		  this.background.destroy();
        this.player.destroy();
        this.computer.destroy();
	 },
	 startGame: function() {
		  this.game.state.start("gameover");
	 },
	 checkScore: function(pipeGroup) {

	 },
	 deathHandler: function(player){
       this.game.JORDAN_GAME_END = {
         faction: this.player.faction,
          is_victorious: false
       };
       
       if( player.is_player){          
          // show lose screen
         console.log("You lose");   
          this.game.JORDAN_GAME_END.is_victorious = false;
       }else{
         //show victory screen  
          console.log("You win");   
          this.game.JORDAN_GAME_END.is_victorious = true;
       }
       this.game.state.start("gameover");
    },
   render: function(){            
      return;
      for( var i = 0;i < this.computer.nodegrid.grid.length; ++i){
       this.game.debug.body(this.computer.nodegrid.grid[i]);
      }
      for( var i = 0;i < this.player.nodegrid.grid.length; ++i){
       this.game.debug.body(this.player.nodegrid.grid[i]);
      }
      
      //this.walls.forEachExists(function(wall){
      //   this.game.debug.body(wall);
      //},this);       
   }
};
