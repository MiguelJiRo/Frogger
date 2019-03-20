// Especifica lo que se debe pintar al cargar el juego
var startGame = function() {
 	Game.setBoard(0,new TitleScreen("Frogger", 
                                  "Press space to start playing",
                                  playGame));
}

var playGame = function() 
{
	
 	Game.setBoard(0,new Fondo());
 	var board = new GameBoard();    
  board.add(new Water());
  board.add(new Frog());
  board.add(new Spawner());   
  Game.setBoard(1,board);
}

var winGame = function() {
	Game.setBoard(1,new TitleScreen("You win", 
                                  "Press space to play again",
                                  playGame));
}

var loseGame = function() {
	Game.setBoard(1,new TitleScreen("You lose", 
                                  "Press space to play again",
                                  playGame));
}

// Indica que se llame al método de inicialización una vez
// se haya terminado de cargar la página HTML
// y este después de realizar la inicialización llamará a
// startGame
window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});