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
        
       
       this.player = new Player(this.game,FACTION.WBC,true); 
       this.computer= new Player(this.game,FACTION.VIRUS,false);
       // creates the this.grid, and this.grid_group properties
       //this.nodegrid = new NodeGrid(this.game);
       //this.nodegrid.is_up = true;
                     
		  this.startText = this.game.add.text(16, 16, 'Playing Game', { fontSize: '32px', fill: '#FFF' });
		  console.log("Starting play");

		  // add keyboard controls
		  this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		  //this.flapKey.onDown.addOnce(this.startGame, this);
		  //this.flapKey.onDown.add(this.bird.flap, this.bird);

		  // add mouse/touch controls
		  //this.game.input.onDown.addOnce(this.startGame, this);
		  //this.game.input.onDown.add(this.bird.flap, this.bird);

		  // keep the spacebar from propogating up to the browser
		  this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	 },
	 update: function() {       
       this.game.physics.arcade.collide(this.player.mother,this.player.cells,this.mother_hit,null,this);
	 },
    mother_hit: function(mother, cell){
       console.log("mother hit");
       mother.reset(this.game.world.randomX, this.game.world.randomY);
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
	 deathHandler: function(bird, enemy) {

    }       
};
