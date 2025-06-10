const Direction = Object.freeze({
  UP:    { dx: 0, dy: -1, name: 'UP' },
  DOWN:  { dx: 0, dy: 1,  name: 'DOWN' },
  LEFT:  { dx: -1, dy: 0, name: 'LEFT' },
  RIGHT: { dx: 1, dy: 0,  name: 'RIGHT' }
});

function parseDirection(input, current) {
  switch ((input || '').toUpperCase()) {
    case 'W': return Direction.UP;
    case 'S': return Direction.DOWN;
    case 'A': return Direction.LEFT;
    case 'D': return Direction.RIGHT;
    default: return current;
  }
}

module.exports = { Direction, parseDirection };