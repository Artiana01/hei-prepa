const Point = require('./Point');

class MoveStrategy {
  computeNextPosition(snake, direction) {
    const head = snake.head;
    return new Point(head.x + direction.dx, head.y + direction.dy);
  }
}

module.exports = MoveStrategy;