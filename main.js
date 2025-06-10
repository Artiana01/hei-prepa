const readline = require('readline');
const Game = require('./Game');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const game = new Game(10, 10);
game.setState(game.menuState);

function promptInput() {
  rl.question('> ', (input) => {
    game.handleInput(input);
    if (game.state === game.menuState || game.state === game.gameOverState) {
      promptInput();
    } else {
      nextTick();
    }
  });
}

function nextTick() {
  game.update();
  game.render();
  if (game.state === game.runningState) {
    rl.question('> ', (input2) => {
      game.handleInput(input2);
      setTimeout(() => nextTick(), 200);
    });
  } else {
    promptInput();
  }
}


promptInput();