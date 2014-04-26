
var boot_state;
var gameover_state;
var menu_state;
var play_state;
var preload_state;
var game;

window.onload = main;
function main(){
   game.state.add("boot",boot_state);
   game.state.add("gameover",gameover_state);
   game.state.add("menu", menu_state);
   game.state.add("play", play_state);
   game.state.add("preload",preload_state);
   
   game.state.start("boot");
} 
   