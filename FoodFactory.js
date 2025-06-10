const Point = require('./Point');

class FoodFactory {
  constructor(gridWidth, gridHeight) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
  }

  generateFood(snake) {
    let freeCells = [];
    for (let x = 0; x < this.gridWidth; x++) {
      for (let y = 0; y < this.gridHeight; y++) {
        const point = new Point(x, y);
        if (!snake.contains(point)) freeCells.push(point);
      }
    }
    if (freeCells.length === 0) return null;
    const idx = Math.floor(Math.random() * freeCells.length);
    return freeCells[idx];
  }
}

module.exports = FoodFactory;