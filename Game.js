const SnakeBuilder = require('./SnakeBuilder');
const FoodFactory = require('./FoodFactory');
const MoveStrategy = require('./MoveStrategy');
const { Direction } = require('./Direction');
const { MenuState, RunningState, GameOverState } = require('./GameState');

class Game {
  constructor(gridWidth = 10, gridHeight = 10) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.menuState = new MenuState();
    this.runningState = new RunningState();
    this.gameOverState = new GameOverState();
    this.moveStrategy = new MoveStrategy();
    this.foodFactory = new FoodFactory(gridWidth, gridHeight);
    this.state = null;
    this.score = 0;
    this.restart();
  }

  restart() {
    this.direction = Direction.RIGHT;
    this.snake = new SnakeBuilder()
      .setPosition(Math.floor(this.gridWidth / 2), Math.floor(this.gridHeight / 2))
      .setLength(3)
      .setDirection(this.direction)
      .build();
    this.food = this.foodFactory.generateFood(this.snake);
    this.score = 0;
  }

  setState(state) {
    this.state = state;
    state.enter(this);
  }

  handleInput(input) {
    this.state.handleInput(this, input);
  }

  update() {
    this.state.update(this);
  }

  render() {
    this.state.render(this);
  }
}

module.exports = Game;