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
    this.virus_button = this.game.add.button(0,0,'virusButton',function(){
      this.faction = FACTION.VIRUS;
      this.gotoStatScreen(); 
    },this);
    this.wbc_button = this.game.add.button(this.game.width/2,0,"wbcButton",function(){       
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
   this.point_text = this.game.add.text(20,20,this.available_points,{fontSize:"32px",fill:"#fff"}); 
                       
    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width - 60, this.game.height- 60, 'startButton', function(){
      if( this.available_points > 0){
         // do a tween on the number of points left.
      }else{
         this.startClick();        
      }
      
    }, this);
    this.startButton.anchor.setTo(0.5,0.5);
     
    this.set_stats_screen.add(this.startButton);      
  },
   
   
  startClick: function() {         
     this.game.JORDAN_PLAYER_STATS = {
        spawn_rate: this.stats.spawn_rate,
        cell_endurance: this.stats.cell_endurance,
        cell_speed: this.stats.cell_speed,
        faction: this.faction
     };
     
     var enemy_faction;
     if( this.faction == FACTION.WBC){
         enemy_faction = FACTION.VIRUS;
     }else{
         enemy_faction = FACTION.WBC;  
     }
     
     this.game.JORDAN_COMPUTER_STATS = {
        spawn_rate: 0,
        cell_endurance: 10,
        cell_speed: 10,
        faction:enemy_faction
     };
     
    this.game.state.start('play');
  }
};
