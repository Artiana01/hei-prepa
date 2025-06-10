
class GameState {
  enter(game) {}
  handleInput(game, input) {}
  update(game) {}
  render(game) {}
}

// Menu 
class MenuState extends GameState {
  enter(game) {
    console.clear();
    console.log("=== SNAKE GAME ===");
    console.log("Appuyez sur Entrée pour commencer...");
  }
  handleInput(game, input) {
    game.setState(game.runningState);
  }
}

//  Jeu en cours
const { parseDirection } = require('./Direction');
class RunningState extends GameState {
  handleInput(game, input) {
    const newDir = parseDirection(input, game.direction);
    if (!isOpposite(game.direction, newDir)) {
      game.direction = newDir;
    }
  }
  update(game) {
    const nextHead = game.moveStrategy.computeNextPosition(game.snake, game.direction);

    // Collision mur
    if (
      nextHead.x < 0 || nextHead.x >= game.gridWidth ||
      nextHead.y < 0 || nextHead.y >= game.gridHeight
    ) {
      game.setState(game.gameOverState);
      return;
    }
    // Collision avec coprs
    if (game.snake.hasCollision(nextHead)) {
      game.setState(game.gameOverState);
      return;
    }

    // Mange
    if (game.food && nextHead.equals(game.food)) {
      game.snake.grow();
      game.score += 1;
      game.food = game.foodFactory.generateFood(game.snake);
    }

    game.snake.advance(nextHead);
  }
  render(game) {
    renderBoard(game.gridWidth, game.gridHeight, game.snake, game.food);
    console.log("Score :", game.score);
    console.log("Direction :", game.direction.name);
    console.log("Entrez une direction (WASD) puis Entrée, ou juste Entrée pour continuer.");
  }
}


class GameOverState extends GameState {
  enter(game) {
    console.clear();
    console.log("=== GAME OVER ===");
    console.log("Score :", game.score);
    console.log("Appuyez sur Entrée pour revenir au menu.");
  }
  handleInput(game, input) {
    game.restart();
    game.setState(game.menuState);
  }
}

function isOpposite(dir1, dir2) {
  return (
    (dir1 === undefined || dir2 === undefined) ? false :
    (dir1.dx === -dir2.dx && dir1.dy === -dir2.dy)
  );
}

function renderBoard(width, height, snake, food) {
  let grid = Array.from({ length: height }, () => Array(width).fill('.'));
  if (food) grid[food.y][food.x] = '@';
  snake.body.forEach((segment, idx) => {
    grid[segment.y][segment.x] = idx === 0 ? '*' : '#';
  });
  let display = grid.map(row => row.join(' ')).join('\n');
  console.clear();
  console.log(display);
}

module.exports = {
  GameState,
  MenuState,
  RunningState,
  GameOverState
};