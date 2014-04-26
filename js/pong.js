function pong(){
   var game;
   var ball;
   var player;
   var enemy;
   
   var player_score;
   var enemy_score;   
   var player_score_text;
   var enemy_score_text;
   var start_text;
   var cursors;
   var start_key;
   var reset;

   
   var is_running = false;
   var is_reset = false;
   
   // create the game object.
   game = new Phaser.Game(800,600,Phaser.AUTO,"",{
      preload: preload,
      create:create,
      update:update
   });
   
   function reset_after_score(){
      // resets the position, and velocities of all the game objects
      ball.x = game.world.width/2 - ball.width/2;
      ball.y = game.world.height/2 - ball.height/2;
      enemy.x = game.world.width/2 - enemy.width/2;
      enemy.y = 100;      
      player.x = game.world.width/2 - player.width/2;
      player.y = game.world.height - 100;

      ball.body.velocity.x = 0;
      ball.body.velocity.y = 0;
      player.body.velocity.x = 0;
      enemy.body.velocity.x = 0;         
   }
   
   function restart(){
      console.log("Restarting the game");
      is_reset = false;
      start_text.text = "";
      ball.body.velocity.y = -100;
      ball.body.velocity.x = 0 + Math.random()*120;
      var what = Math.random();
      if( Math.random() < 1 ){
         ball.body.velocity.x *= -1;  
      }
   }
   
   function reset_game(){
      is_running = false;
      score_reset = false;

      player_score = 0;
      enemy_score = 0;
      player_score_text.text = "";
      enemy_score_text.text = "";
      start_text.text = "Hit the 'SPACE' key to start the game...";
            
      // resets all positioning, and velocities of the objects.
      ball.x = game.world.width/2 - ball.width/2;
      ball.y = game.world.height/2 - ball.height/2;
      enemy.x = game.world.width/2 - enemy.width/2;
      enemy.y = 100;      
      player.x = game.world.width/2 - player.width/2;
      player.y = game.world.height - 100;

      ball.body.velocity.x = 0;
      ball.body.velocity.y = 0;
      player.body.velocity.x = 0;
      enemy.body.velocity.x = 0;         
      console.log("Reset button was pressed");            
   }
   
   function start_game(){
      console.log("starting the game");
      is_running = true;
      
      start_text.text = "";
      player_score_text.text = "Player: " + player_score;
      enemy_score_text.text = "Enemy: " + enemy_score;      
      
      ball.body.velocity.y = -100;
      ball.body.velocity.x = 40 + Math.random()*140;            
      var what = Math.random();
      if( what < 0.5 ){
         ball.body.velocity.x *= -1;
      }
   }
      
   
   function preload(){
      game.load.image("ball","resources/ball.png");
      game.load.image("player", "resources/player.png");
      game.load.image("enemy", "resources/enemy.png");
      game.load.spritesheet("button", "resources/button.png",80,60);
   }
   function create(){      
      // star the physics system
      game.physics.startSystem(Phaser.Physics.ARCADE);      
      
      // Create all the game objects
      player_score = 0;
      enemy_score = 0; 
      ball = game.add.sprite(game.world.width/2 - game.cache.getImage("ball").width/2, game.world.height/2,"ball");
      enemy = game.add.sprite(game.world.width/2- game.cache.getImage("enemy").width/2,
                              100 - game.cache.getImage("enemy").height/2, "enemy");
      player = game.add.sprite(game.world.width/2- game.cache.getImage("player").width/2,game.world.height -100, "player");      
      player_score_text = game.add.text( 20, game.world.height/2,"",{fontSize: '32px', fill : '#fff'});
      enemy_score_text = game.add.text(game.world.width - 180, game.world.height/2,"",{fontSize: '32px', fill : '#fff'});
      start_text = game.add.text(game.world.width/2- 200, game.world.height/2,"Hit the 'SPACE' key to begin...",{fontSize: '32px', fill : '#fff'});
      
      cursors = game.input.keyboard.createCursorKeys();  
      start_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      reset = game.add.button(5,5,"button",reset_game,this,0,1,2,3);
      
      
      // enable pyhsics on the object
      game.physics.arcade.enable(player);
      game.physics.arcade.enable(enemy);
      game.physics.arcade.enable(ball);
      enemy.body.collideWorldBounds = true;      
      player.body.collideWorldBounds = true;   
      ball.body.collideWorldBounds = true;
      
      enemy.body.immovable = true;      
      player.body.immovable = true;      
      
            
      ball.body.bounce.y = 1.2;
      ball.body.bounce.x = 1.2;
      //ball.body.maxVelocity = 1;
      //ball.body.gravity = 0;
      
   }   
   function update(){ 
      if(  is_running && is_reset){
         // We are only in here, if someone just scored and
         // we are waiting for the player to press 'SPACE'
         // so that we can continue the game.
         if(start_key.isDown){
            restart();
         }         
      } else if( is_running){
         game.physics.arcade.collide(player,ball);
         game.physics.arcade.collide(enemy,ball);
         
         // have the enemy track the ball. Restrict the max velocity
         // so that eventually the player can score.
         enemy.body.velocity.x = ball.body.velocity.x;
         if( ball.body.velocity.x  > 120 ){
            enemy.body.velocity.x = 100;
         }else if( ball.body.velocity.x < -120 ){
            enemy.body.velocity.x = -100;
         }

         // receive input from the player
         //player.body.velocity.x = 0;         
         if( cursors.left.isDown){
            player.body.velocity.x = -200;  
         }else if( cursors.right.isDown){
            player.body.velocity.x = 200;  
         }else{
            player.body.velocity.x = 0;  
            player.body.velocity.x = ball.body.velocity.x;
         }         
         
         
         // restrict the ball from moving too fast.
         if(ball.body.velocity.y > 300 ){
            ball.body.velocity.y = 300;  
         }
         if(ball.body.velocity.x > 300){
            ball.body.velocity.x = 300;  
         }
         
         // Check for a score by one of the players.
         function set_score_text(){
            player_score_text.text = "Player: " + player_score;
            enemy_score_text.text = "Enemy: " + enemy_score;            
            start_text.text = "Press 'SPACE' to begin...";
            is_reset = true;
            reset_after_score();
         }         
         if( ball.y < ball.height){
            // top is the enemy goal
            player_score += 1;
            set_score_text();            
         }else if( ball.y >= game.world.height - ball.height ){
            enemy_score += 1;
            set_score_text();            
         }               
         
      }else{
         if(start_key.isDown){
            start_game();  
         }
      }
   }   
}