const wordGame = require('./wordgame.js');

async function main() {
    
   var game = new wordGame.game("kaadvarrs");
   
   await game.setValidator("./wordlist.txt");

   game.submitWord("aardvark");

   game.submitWord("aardvark");

   game.submitWord("aa");

   game.submitWord("aardvarks");

   game.submitWord("kaadvarr");

   console.log(game.getScoreAtPosition(0));

   console.log(game.getWordEntryAtPosition(0));
}

main(); 