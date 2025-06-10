const Point = require('./Point');
const Snake = require('./Snake');

class SnakeBuilder {
  constructor() {
    this.startX = 4;
    this.startY = 5;
    this.length = 3;
    this.direction = null;
  }

  setPosition(x, y) {
    this.startX = x;
    this.startY = y;
    return this;
  }

  setLength(length) {
    this.length = length;
    return this;
  }

  setDirection(direction) {
    this.direction = direction;
    return this;
  }

  build() {
    if (!this.direction) throw new Error("Direction must be set");
    const body = [];
    let x = this.startX;
    let y = this.startY;
    for (let i = 0; i < this.length; i++) {
      body.push(new Point(x, y));
      x -= this.direction.dx;
      y -= this.direction.dy;
    }
    return new Snake(body, this.direction);
  }
}

module.exports = SnakeBuilder;