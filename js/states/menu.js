function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
     this.faction = null;
     this.stats = {
        spawn_rate: 0,
        cell_endurance : 0,
        cell_speed: 0        
     };
     //button = game.add.button(game.world.centerX - 95, 400, 'attributeButton', actionOnClic, this, 2, 1, 0);
     this.points = 10;

      // start game button
     this.play_button = this.game.add.button(this.game.width/2,this.game.height/2,"playButton",function(){
         this.gotoChooseSides();     
     },this);
     this.play_button.anchor.setTo(0.5,0.5);    
          
  },
  update: function(){
     
  },
   gotoChooseSides : function(){
      this.play_button.visible = false;
      
      // start with choosing sides.
    this.choose_sides = this.game.add.group();
    this.virus_button = this.game.add.button(this.game.width/2,0,'virusButton',function(){
      this.faction = FACTION.VIRUS;
      this.gotoStatScreen(); 
    },this);
    this.wbc_button = this.game.add.button(0,0,"wbcButton",function(){       
      this.faction = FACTION.WBC;
      this.gotoStatScreen();  
    },this);
      
      this.wbc_button.width = this.game.width/2;
      this.wbc_button.height = this.game.height;
      this.virus_button.width = this.game.width/2;
      this.virus_button.height = this.game.height;      
      //this.wbc_button.anchor.setTo(0.5,0.5);
      //this.virus_button.anchor.setTo(0.5,0.5);
      
      this.choose_sides.add(this.wbc_button);
      this.choose_sides.add(this.virus_button);            
   },
  gotoStatScreen: function(){
    // for the set stats screen   
     this.choose_sides.visible = false;
     
    //this.choose_sides.destroy();
    this.set_stats_screen = this.game.add.group();        
    this.point_text = this.game.add.text(20,20,this.points, {fontSize:"32px",fill:"#fff"});
      
      this.endurance_text = this.game.add.text(149,237,  " "+  this.stats.cell_endurance, {fontSize:"32px",fill:"#fff"});
      this.enduranceWord = this.game.add.text(100, 137, "Endurance", {fontSize: "24px",fill: "#fff"});
      
      this.speed_text = this.game.add.text(349, 237, " "+ this.stats.cell_speed, {fontSize:"32px",fill:"#fff"});
      this.speedWord = this.game.add.text(320, 137, "Speed", {fontSize: "24px",fill: "#fff"});
      
      this.spawn_text = this.game.add.text(549, 237, " "+ this.stats.spawn_rate, {fontSize:"32px",fill:"#fff"});
      this.spawnWord = this.game.add.text(515, 137, "Spawn Rate", {fontSize: "24px",fill: "#fff"});
      
      this.attributeUpFX = this.game.add.audio("AttributeUpSound");
    
       this.enduranceUpButton = this.game.add.button(this.game.width- 700,  this.game.height- 450, 'attributeButton', function(){
          if(this.points !== 0){
	this.stats.cell_endurance++;
	this.points--;
            this.endurance_text.text = this.stats.cell_endurance;
            this.point_text.text = this.points;
          }
           this.attributeUpFX.play();
      }, this);
      this.enduranceUpButton.scale.setTo(4, 4);
     
      this.enduranceDownButton = this.game.add.button(this.game.width- 700, this.game.height-250, 'attributeButton', function(){
        if(this.stats.cell_endurance  !==0){
	this.stats.cell_endurance--;
	this.points++;
           this.endurance_text.text = this.stats.cell_endurance;
            this.point_text.text = this.points;
          }
      }, this);
      this.enduranceDownButton.scale.setTo(4, -4);
     
      this.speedUpButton = this.game.add.button(this.game.width- 500, this.game.height -450, 'attributeButton', function(){
          if(this.points !== 0){
              this.stats.cell_speed++;
              this.points--;
              this.speed_text.text = this.stats.cell_speed;
              this.point_text.text = this.points;
          }
          this.attributeUpFX.play();
      }, this);
          this.speedUpButton.scale.setTo(4, 4);
          
      this.speedDownButton = this.game.add.button(this.game.width- 500, this.game.height- 250, 'attributeButton', function(){
          if(this.stats.cell_speed !==0){
              this.stats.cell_speed--;
              this.points++;
                this.speed_text.text = this.stats.cell_speed;
              this.point_text.text = this.points;
          }
      }, this);
      this.speedDownButton.scale.setTo(4, -4);
      
      this.spawnUpButton = this.game.add.button(this.game.width- 300, this.game.height- 450, 'attributeButton', function(){
          if(this.points !==0){
              this.stats.spawn_rate++;
              this.points--;
              this.spawn_text.text = this.stats.spawn_rate;
              this.point_text.text = this.points;
          }
          this.attributeUpFX.play();
      }, this);
      this.spawnUpButton.scale.setTo(4,4);
      
      this.spawnDownButton = this.game.add.button(this.game.width-300, this.game.height- 250, 'attributeButton', function() {
          if(this.stats.spawn_rate !== 0){
              this.stats.spawn_rate--;
              this.points++;
              this.spawn_text.text = this.stats.spawn_rate;
              this.point_text.text = this.points;
          }
      }, this);
      this.spawnDownButton.scale.setTo(4, -4);
        
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width - 60, this.game.height- 60, 'startButton', function(){
      if( this.points > 0){
             // do a tween on the number of points left.
          var bounce = this.game.add.tween(this.point_text);
          bounce.to({y: this.point_text.height + 10}, 1000, Phaser.Easing.Bounce.Out, true, 0,1,true);
         this.startClick();
      }else{
         this.startClick();        
      }
      
    }, this);
    this.startButton.anchor.setTo(0.5,0.5);
     
    this.set_stats_screen.add(this.startButton);      
  },
   
   
  startClick: function() {         
     // preserve the player stats.
     this.game.JORDAN_PLAYER_STATS = {
        spawn_rate: this.stats.spawn_rate,
        cell_endurance: this.stats.cell_endurance,
        cell_speed: this.stats.cell_speed,
        faction: this.faction
     };
     
          
     //setup enemy statistics ( random )
     var enemy_faction;
     var points_left = 10;
     if( this.faction == FACTION.WBC){
         enemy_faction = FACTION.VIRUS;
     }else{
         enemy_faction = FACTION.WBC;  
     }        
     var spawn_rate  = this.game.rnd.integerInRange(0,points_left);
     points_left -= spawn_rate;
     var cell_speed = this.game.rnd.integerInRange(0,points_left);
     points_left -= cell_speed;
     var cell_endurance = this.game.rnd.integerInRange(0,points_left);
     points_left -= spawn_rate;
     
     this.game.JORDAN_COMPUTER_STATS = {
        spawn_rate: spawn_rate,
        cell_endurance: cell_endurance,
        cell_speed: cell_speed,
        faction:enemy_faction
     };
     
    this.game.state.start('play');
  }
};




