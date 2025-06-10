const Point = require('./Point');

class Snake {
  constructor(body, direction) {
    this.body = body;
    this.direction = direction;
    this.growOnNextMove = false;
  }

  get head() {
    return this.body[0];
  }

  advance(nextHead) {
    this.body.unshift(nextHead);
    if (this.growOnNextMove) {
      this.growOnNextMove = false;
    } else {
      this.body.pop();
    }
  }

  grow() {
    this.growOnNextMove = true;
  }

  hasCollision(point) {
    
    return this.body.slice(1).some(segment => segment.equals(point));
  }

  contains(point) {
    return this.body.some(segment => segment.equals(point));
  }
}

module.exports = Snake;