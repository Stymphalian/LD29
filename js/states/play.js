//var Bird = require('../prefabs/bird');
//var Ground = require('../prefabs/ground');
//var Pipe = require('../prefabs/pipe');
//var PipeGroup = require('../prefabs/pipeGroup');
//var Scoreboard = require('../prefabs/scoreboard');

function Play() {
}
Play.prototype = {
	 create: function() {
		  // start the phaser arcade physics engine
		  this.game.physics.startSystem(Phaser.Physics.ARCADE);
		  this.background = this.game.add.sprite(0,0,"play_background");
              
       this.player = new Player(this.game,this.game.JORDAN_PLAYER_STATS.faction,true,this.game.JORDAN_PLAYER_STATS); 
       this.computer= new Player(this.game,this.game.JORDAN_COMPUTER_STATS.faction,false,this.game.JORDAN_COMPUTER_STATS);
       
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
	 },
	 update: function() {             
       // player cells overlapping player nodes
       this.game.physics.arcade.overlap(this.player.cells,this.player.nodegrid,this.node_hit,null,this);
       
       // computer cell overlapping computer nodes.
       //this.game.physics.arcade.overlap(this.computer.cells,this.computer.nodegrid,this.node_hit,null,this);
       
       // player cells colliding with computer cells
       //this.game.physics.arcade.collide(this.player.cells,this.computer.cells,this.cell_hit_cell,null,this);
       //this.game.physics.arcade.overlap(this.player.mother,this.player.cells,this.mother_hit,null,this);
       
       // player cells colliding with computer mother
       //this.game.physics.arcade.collide(this.player.mother,this.computer.cells,this.mother_hit,null,this); 
       
       // computer cells colliding with player mother
       //this.game.physics.arcade.collide(this.computer.mother,this.player.cells,this.mother_hit,null,this);               
	 },
   cell_hit_cell: function(player_cell, computer_cell){
      player_cell.kill();
      computer_cell.kill();         
   },
    mother_hit: function(mother, cell){
       console.log("mother hit");
       cell.kill();
       //mother.reset(this.game.world.randomX, this.game.world.randomY);
    },
   node_hit : function(cell, node){      
      // this litterly gets called tens of thousands of times per game....
      if( cell.target === node){ return;}
      var next_target = node.getNeighbourFromSendDirection();  
      if( next_target == null){
         console.log("why null?");         
      }
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
	 deathHandler: function(bird, computer) {

    }       
};
