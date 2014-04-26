
var boot_state = Boot;
var gameover_state = Gameover;
var menu_state = Menu;
var play_state = Play;
var preload_state = Preload;


window.onload = main;
function main(){
   //var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO,"");   
   var game = new Phaser.Game(800,600, Phaser.AUTO,"");   
   
   game.state.add("boot",boot_state);
   game.state.add("preload",preload_state);
   game.state.add("menu", menu_state);
   game.state.add("play", play_state);
   game.state.add("gameover",gameover_state);
   
   game.state.start("boot");
} 
   