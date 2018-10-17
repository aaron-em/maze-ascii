const mappings = {
  unicode: new Map([
    [[0, 0, 0, 0], '◆'],

    [[1, 0, 0, 0], '╵'],
    [[0, 1, 0, 0], '╴'],
    [[0, 0, 1, 0], '╶'],
    [[0, 0, 0, 1], '╷'],

    [[1, 1, 0, 0], '┘'],
    [[1, 0, 1, 0], '└'],
    [[0, 1, 0, 1], '┐'],
    [[0, 0, 1, 1], '┌'],

    [[1, 1, 1, 0], '┴'],
    [[0, 1, 1, 1], '┬'],
    [[1, 1, 0, 1], '┤'],
    [[1, 0, 1, 1], '├'],

    [[1, 0, 0, 1], '│'],
    [[0, 1, 1, 0], '─'],
    [[1, 1, 1, 1], '┼']
  ].map(e => [e[0].join(), e[1]])),

  ascii: new Map([
    [[0, 0, 0, 0], '+'],

    [[1, 0, 0, 0], '+'],
    [[0, 1, 0, 0], '+'],
    [[0, 0, 1, 0], '+'],
    [[0, 0, 0, 1], '+'],

    [[1, 1, 0, 0], '+'],
    [[1, 0, 1, 0], '+'],
    [[0, 1, 0, 1], '+'],
    [[0, 0, 1, 1], '+'],

    [[1, 1, 1, 0], '+'],
    [[0, 1, 1, 1], '+'],
    [[1, 1, 0, 1], '+'],
    [[1, 0, 1, 1], '+'],

    [[1, 0, 0, 1], '|'],
    [[0, 1, 1, 0], '-'],
    [[1, 1, 1, 1], '+']
  ].map(e => [e[0].join(), e[1]]))
};

module.exports = function refine(sourceGrid, mapTo = 'unicode') {
  const grid = JSON.parse(JSON.stringify(sourceGrid));

  const height = grid.length;
  const width = grid[0].length;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (grid[y][x] === ' ') {
        // eslint-disable-next-line no-continue
        continue;
      };

      const neighbors = [
        (grid[y - 1] && grid[y - 1][x] !== ' '), // top
        (grid[y][x - 1] && grid[y][x - 1] !== ' '), // left
        (grid[y][x + 1] && grid[y][x + 1] !== ' '), // right
        (grid[y + 1] && grid[y + 1][x] !== ' ')  // bottom
      ];

      grid[y][x] = mappings[mapTo]
        .get(neighbors.map(b => !!b + 0).join());
    };
  };

  return grid;
};
