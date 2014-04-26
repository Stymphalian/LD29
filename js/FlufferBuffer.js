function FlufferBuffer(){
   var platforms;
   var player;
   var cursor;
   var stars;   
   var score = 0;
   var scoreText;
   
   var game = new Phaser.Game(800,600,Phaser.AUTO, '',{
      preload: preload,
      create: create,
      update: update
   });
   
   function preload(){
      game.load.image("sky", "resources/dump/sky.png");
      game.load.image("ground", "resources/dump/platform.png");
      game.load.image("star", "resources/dump/star.png");
      game.load.spritesheet("dude", "resources/dump/dude.png",32,48);
   }
   
   function create(){
      game.physics.startSystem(Phaser.Physics.ARCADE);
      
      game.add.sprite(0,0,"sky");
      platforms = game.add.group();
      platforms.enableBody = true;
      var ground = platforms.create(0,game.world.height - 64,"ground");
      ground.scale.setTo(2,2);
      ground.body.immovable = true;
      
      var ledge = platforms.create(400,400,"ground");
      ledge.body.immovable = true;
      ledge = platforms.create(-150,250,"ground");
      ledge.body.immovable = true;
      
      player = game.add.sprite(32,game.world.height - 150, "dude");
      game.physics.arcade.enable(player);
      
      player.body.bounce.y = 0.2;
      player.body.gravity.y = 300;
      player.body.collideWorldBounds = true;
      
      player.animations.add("left", [0,1,2,3],10,true);
      player.animations.add("right",[5,6,7,8],10, true);
      
      cursors = game.input.keyboard.createCursorKeys();
      
         
      stars = game.add.group();
      stars.enableBody = true;
      var star;
      for( var i = 0; i < 12; ++i){
         star = stars.create(i*70,0,"star");
         star.body.gravity.y = 40;
         star.body.gravity.x = Math.random()*5;
         
         star.body.bounce.y = 0.3 + Math.random()*0.2;
         star.body.bounce.x = 0.3 + Math.random()*0.2;
      }
      
      
      scoreText = game.add.text(16,16,"score: 0", {fontSize: '32px', fill: "#000"});
   }
   
   function update(){
      game.physics.arcade.collide(player,platforms);
      game.physics.arcade.collide(stars,platforms);
      
      game.physics.arcade.overlap(player,stars,function(player,star){
         star.kill();
         score += 10;
         scoreText.text = "Score: " + score;         
      },null,this);
      
      
      player.body.velocity.x = 0;
      if(cursors.left.isDown){
         player.body.velocity.x = -150;
         player.animations.play("left");
      }else if( cursors.right.isDown){
         player.body.velocity.x = 150;
         player.animations.play("right");         
      }else{
         player.animations.stop();
         player.frame =4;         
      }
      
      //if( cursors.up.isDown && player.body.touching.down){
      if( cursors.up.isDown){
         player.body.velocity.y = -350;
      }
      
   }   
}