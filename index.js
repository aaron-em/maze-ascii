const generateMaze = require('generate-maze');

const refine = require('./lib/refine');

function repeatChar(char, count) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    out.push(char);
  }
  return out;
}

module.exports = function mazeAscii(width, height, optionsBag) {
  const options = {
    ...{
      refine: 'unicode',
      returnAsString: true
    },
    ...optionsBag
  };
  const maze = generateMaze(width, height);
  const renderWidth = 2 * width + 1;
  const renderHeight = 2 * height + 1;
  let render = [];

  // Fill the render with hash
  for (let i = 0; i < renderHeight; i += 1) {
    render.push(repeatChar('#', renderWidth));
  }

  // Open paths
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const renderY = y * 2 + 1;
      const renderX = x * 2 + 1;
      const cell = maze[y][x];

      render[renderY][renderX] = ' ';

      if (!cell.top) {
        render[renderY - 1][renderX] = ' ';
      }

      if (!cell.right) {
        render[renderY][renderX + 1] = ' ';
      }

      if (!cell.left) {
        render[renderY][renderX - 1] = ' ';
      }

      if (!cell.bottom) {
        render[renderY + 1][renderX] = ' ';
      }
    }
  }

  // Refine hash into lines
  if (options.refine) {
    render = refine(render, options.refine);
  }

  return options.returnAsString
    ? render.map(row => row.join('')).join('\n')
    : render;
};
