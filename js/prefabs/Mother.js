var Mother = function(game, x, y, frame,player) {   
   var image;
   if( player.faction == FACTION.VIRUS){
      image = "VirusMother";
   }else{
      image = "WBCMother";
   }      
  Phaser.Sprite.call(this,game,x,y,image,frame);  
   this.anchor.setTo(0.5,0.5);
     
  //this.anchor.setTo(0.5, 0.5);
  //this.animations.add('flap');
  //this.animations.play('flap', 12, true);

  //this.name = 'Mother';
  //this.alive = false;
  //this.visible = false;  
   this.player = player;   
   this.current_count = 0;
   this.target_count = 60;  // 60 frames per second.. therefore , every 60 frames spawn a unit.
   this.target_count -= 2*this.player.stats.spawn_rate;
   this.total_endurance = 200;
   this.endurance = this.total_endurance;
   this.prev_endurance = 0;
   
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = true;   
  this.body.immovable = true;
  //this.body.checkCollision = false;
  this.events.onKilled.add(this.onKilled, this);  
      
   //this.healthText = this.game.add.text(this.x,this.y - 16,"Health: " + this.endurance,{textSize:"6px", fill:"#fff"});
   //this.spawnText = this.game.add.text(this.x,this.y,"Rate: " + this.player.stats.spawn_rate,{textSize:"6px", fill:"#fff"});   
   
   // health segments
   this.health_group = this.game.add.group();
   var num_segments = this.endurance/10;   
   var x_pos = this.x;
   var y_pos = this.y;   
   var count = 0;
   for( var i = 0;i < num_segments; ++i){
      this.health_group.create(x_pos,y_pos,"healthSegment");
      x_pos += 8;
      count++;
      if( count >= 10){
         count = 0;
         y_pos += 8;         
         x_pos = this.x;
      }
   }   
  
  
   
};

Mother.prototype = Object.create(Phaser.Sprite.prototype);
Mother.prototype.constructor = Mother;

Mother.prototype.draw_health_bar = function(){
   var num_segments = this.endurance/10;   
   var x_pos = this.x;
   var y_pos = this.y;   
   var count = 0;
   var segment;
   for( var i = 0;i < num_segments; ++i){
      segment = this.health_group.getFirstDead();
      segment.revive();
      segment.setTo(x_pos, y_pos);
      x_pos += 8;
      count++;
      if( count >= 10){
         count = 0;
         y_pos += 8;    
         x_pos = this.x;
      }      
   }
};
Mother.prototype.update = function() {     
   if( this.current_count >= this.target_count ){
      // spawn unit.  
      console.log("spawning cell?");
      this.current_count = 0;
      
      var scale = 0.6;
      var new_cell = this.player.cells.getFirstExists(false);
      if( !new_cell){
         new_cell = new Cell(this.game,
                              0,0,
                              this.player.cells,
                              this.player.faction,
                              this.player.stats.cell_endurance,
                              this.player.stats.cell_speed);
         new_cell.target = this;
         new_cell.scale.x = scale;
         new_cell.scale.y = scale;
         new_cell.body.setSize(new_cell.body.width*scale, new_cell.body.height*scale);
         this.player.cells.add(new_cell);                     
         window.cell_count += 1;
      }
      //new_cell.body.x = this.mother.x + this.mother.body.width/2;
      //new_cell.body.y = this.mother.y + this.mother.body.height/2;
      new_cell.reset(this.x, this.y );         
      new_cell.revive();                  
   }else{
      this.current_count++;  
   }   
         
};

Mother.prototype.damage = function(amount){
 this.endurance -= amount;
 //this.healthText.text = "Health: " + this.endurance;
 this.draw_health_bar();
 if( this.endurance <= 0){
   this.kill();  
 }
}
Mother.prototype.revived = function() { 
};

Mother.prototype.onKilled = function() {
  this.exists = true;
  this.visible = true;
  this.animations.stop();
  //var duration = 90 / this.y * 300;
  //this.game.add.tween(this).to({angle: 90}, duration).start();
  console.log('Mother killed');
  console.log('Mother alive:', this.alive);
};