class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  copy() {
    return new Point(this.x, this.y);
  }
}

module.exports = Point;