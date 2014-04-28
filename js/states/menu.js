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
      this.attributeUpFX = this.game.add.audio("AttributeUpSound");
      this.attributeDownFX = this.game.add.audio("AttributeDownSound");
      this.menuSoundFX = this.game.add.audio("MenuClick");
      this.incorrectFX = this.game.add.audio("RemainingPoints");
      this.menuMusicFX = this.game.add.audio("MenuMusic",1,true);            
      this.createFactionChooseScreen();
      this.createStatChooseScreen();
      this.createCreditScreen();
      this.createStartScreen();
     
      this.hideFactionChooseScreen();
      this.hideStatChooseScreen();
      this.hideCreditScreen(); 
      this.hideStartScreen();
      this.menuMusicFX.play("",1,true);     
                    
      // first screen to start is
      this.showStartScreen();    
  },
   showStartScreen: function(){
      this.start_screen_background.visible = true;
      this.play_button.visible = true;
      this.credit_button.visible = true;
   },
   hideStartScreen: function(){
      this.start_screen_background.visible = false;
      this.play_button.visible = false;
      this.credit_button.visible =false;
   },
   createStartScreen: function(){
       this.start_screen_background = this.game.add.image(0,0,"start_screen_background");               
      
        this.play_button = this.game.add.button(this.game.width/2,this.game.height/2,"playButton",function(){
         this.hideStartScreen();         
         this.showFactionChooseScreen();   
         this.menuSoundFX.play();
         },this);               
      this.play_button.anchor.setTo(0.5,0.5);                              
            
      this.credit_button  = this.game.add.button(this.game.width/2, this.game.height/2 + 60,"creditButton", function(){
         this.hideStartScreen();
         this.showCreditScreen();
      },this);
      this.credit_button.anchor.setTo(0.5,0.5);
   },
   createFactionChooseScreen: function(){
      // background images.
       this.VirusBackgroundImage = this.add.image(400, 0,"VirusBackground");
       this.BodyBackgroundImage = this.add.image(0,0,"HumanSkeleton");
      
      // buttons
       this.virus_button = this.game.add.button(650,0,'virusButton',function(){
           this.faction = FACTION.VIRUS;
           this.menuSoundFX.play();
           this.hideFactionChooseScreen();
           this.showStatChooseScreen();
       },this);      
       this.wbc_button = this.game.add.button(0,0,"wbcButton",function(){       
           this.faction = FACTION.WBC;
           this.menuSoundFX.play();
           this.hideFactionChooseScreen();
           this.showStatChooseScreen();
       },this);
      this.wbc_button.width = 150;
      this.wbc_button.height = 100;
      this.virus_button.width = 150;
      this.virus_button.height = 100;      
      
      // add to groups.
      this.choose_sides = this.game.add.group();        
      this.choose_sides.add(this.wbc_button);
      this.choose_sides.add(this.virus_button);              
   },
   createStatChooseScreen: function(){
      this.VirusBackgroundImage.visible = false;
      this.BodyBackgroundImage.visible = false;
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
      
    
       this.enduranceUpButton = this.game.add.button(this.game.width- 700,  this.game.height- 450, 'attributeButton', function(){
          if(this.points !== 0){
              this.attributeUpFX.play();
	           this.stats.cell_endurance++;
	           this.points--;
              this.endurance_text.text = this.stats.cell_endurance;
              this.point_text.text = this.points;
          }else{
              this.incorrectFX.play();
          }
      }, this);
      this.enduranceUpButton.scale.setTo(4, 4);
     
      this.enduranceDownButton = this.game.add.button(this.game.width- 700, this.game.height-250, 'attributeButton', function(){
        if(this.stats.cell_endurance  !==0){
              this.attributeDownFX.play();
              this.stats.cell_endurance--;
              this.points++;
              this.endurance_text.text = this.stats.cell_endurance;
              this.point_text.text = this.points;
          }else{
              this.incorrectFX.play();
          }
      }, this);
      this.enduranceDownButton.scale.setTo(4, -4);
     
        
      this.speedUpButton = this.game.add.button(this.game.width- 500, this.game.height -450, 'attributeButton', function(){
          if(this.points !== 0){
              this.attributeUpFX.play();
              this.stats.cell_speed++;
              this.points--;
              this.speed_text.text = this.stats.cell_speed;
              this.point_text.text = this.points;
          }else{
              this.incorrectFX.play();
          }
      }, this);
          this.speedUpButton.scale.setTo(4, 4);
          
      this.speedDownButton = this.game.add.button(this.game.width- 500, this.game.height- 250, 'attributeButton', function(){
          if(this.stats.cell_speed !==0){
              this.attributeDownFX.play();
              this.stats.cell_speed--;
              this.points++;
                this.speed_text.text = this.stats.cell_speed;
              this.point_text.text = this.points;
          }else{
              this.incorrectFX.play();
          }
      }, this);
      this.speedDownButton.scale.setTo(4, -4);
          
      this.spawnUpButton = this.game.add.button(this.game.width- 300, this.game.height- 450, 'attributeButton', function(){
          if(this.points !==0){
              this.attributeUpFX.play();
              this.stats.spawn_rate++;
              this.points--;
              this.spawn_text.text = this.stats.spawn_rate;
              this.point_text.text = this.points;
          }else{
            this.incorrectFX.play();
          }
      }, this);
      this.spawnUpButton.scale.setTo(4,4);
      
      this.spawnDownButton = this.game.add.button(this.game.width-300, this.game.height- 250, 'attributeButton', function() {
          if(this.stats.spawn_rate !== 0){
              this.attributeDownFX.play();
              this.stats.spawn_rate--;
              this.points++;
              this.spawn_text.text = this.stats.spawn_rate;
              this.point_text.text = this.points;
          }else{
              this.incorrectFX.play();
          }
      }, this);
      this.spawnDownButton.scale.setTo(4, -4);
        
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width - 60, this.game.height- 60, 'startButton', function(){
      if( this.points > 0){
          this.incorrectFX.play();
             // do a tween on the number of points left.
          var bounce = this.game.add.tween(this.point_text);
          bounce.to({y: this.point_text.height + 10}, 1000, Phaser.Easing.Bounce.Out, true, 0,1,true);
         this.startClick();
      }else{
          this.menuSoundFX.play();
         this.startClick();        
      }
      
    }, this);
    this.startButton.anchor.setTo(0.5,0.5);                       
    this.set_stats_screen.add(this.startButton);      
   },
   createCreditScreen: function(){
      this.back_button = this.game.add.button(5, this.game.height - 60, "backButton",function(){
         this.hideCreditScreen();
         this.showStartScreen();
      },this);
            
      this.credit_text_group = this.game.add.group();      
      var text_string;
      text_string = this.game.add.text(40,100,"Credits",{fontSize:"8px",fill:"#fff"});
      this.credit_text_group.add(text_string);
      text_string = this.game.add.text(40,125,"Programmer : Jordan Yu",{fontSize:"8px",fill:"#fff"});
      this.credit_text_group.add(text_string);
      text_string = this.game.add.text(40,150,"Programmer,Artwork : Morgan Killinger",{fontSize:"8px",fill:"#fff"});
      this.credit_text_group.add(text_string);
      text_string = this.game.add.text(40,175,"Title Screen Artwork : Hannah Mathews",{fontSize:"8px",fill:"#fff"});
      this.credit_text_group.add(text_string);
      text_string = this.game.add.text(40,200,"Manager, Artwork : Ryan Stad",{fontSize:"8px",fill:"#fff"});
      this.credit_text_group.add(text_string);
      text_string = this.game.add.text(40,225,"Idea Generation : Graham Killinger",{fontSize:"8px",fill:"#fff"});
      this.credit_text_group.add(text_string);            
   },
   showFactionChooseScreen: function(){
      this.choose_sides.visible = true;
      this.virus_button.visible = true;
      this.wbc_button.visible = true;
      this.VirusBackgroundImage.visible = true;
      this.BodyBackgroundImage.visible = true;
   },
   showStatChooseScreen: function(){
      this.set_stats_screen.visible = true;      
      this.point_text.visible=true;      
      this.endurance_text.visible =true;
      this.enduranceWord.visible =true;      
      this.speed_text.visible = true;
      this.speedWord.visible = true;      
      this.spawn_text.visible = true;
      this.spawnWord.visible = true;
      this.enduranceUpButton.visible =true;
      this.enduranceDownButton.visible = true;
      this.speedDownButton.visible = true;
      this.speedUpButton.visible = true;
      this.spawnDownButton.visible = true;
      this.spawnUpButton.visible = true;
      this.startButton.visible = true;            
   },
   showCreditScreen: function(){
      this.back_button.visible = true;
      this.credit_text_group.visible = true;
   },
   hideFactionChooseScreen: function(){
      this.choose_sides.visible = false;
      this.virus_button.visible = false;
      this.wbc_button.visible = false;
      this.VirusBackgroundImage.visible = false;
      this.BodyBackgroundImage.visible = false;
   },
   hideStatChooseScreen: function(){
      this.set_stats_screen.visible = false;      
      this.point_text.visible=false;      
      this.endurance_text.visible =false;
      this.enduranceWord.visible =false;      
      this.speed_text.visible = false;
      this.speedWord.visible = false;      
      this.spawn_text.visible = false;
      this.spawnWord.visible = false;
      this.enduranceUpButton.visible =false;
      this.enduranceDownButton.visible = false;
      this.speedDownButton.visible = false;
      this.speedUpButton.visible = false;
      this.spawnDownButton.visible = false;
      this.spawnUpButton.visible = false;
      this.startButton.visible = false;
   },
   hideCreditScreen: function(){
      this.back_button.visible = false;
      this.credit_text_group.visible = false;
   },
  update: function(){
     
  },        
  startClick: function() { 
      this.menuMusicFX.stop();
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