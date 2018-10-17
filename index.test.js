const assert = require('assert');

const mazeAscii = require('./index');

describe('mazeAscii', () => {
  describe('defaults', () => {
    it('should generate and refine a render', () => {
      const possibles = [
        '┌───┐\n│   │\n│ ╶─┤\n│   │\n└───┘',
        '┌─┬─┐\n│ │ │\n│ ╵ │\n│   │\n└───┘',
        '┌───┐\n│   │\n│ ╷ │\n│ │ │\n└─┴─┘',
        '┌───┐\n│   │\n├─╴ │\n│   │\n└───┘'
      ];
      const map = mazeAscii(2, 2);
      assert.ok(possibles.includes(map));
    });
  });

  describe('unrefined', () => {
    it('should not refine if asked not to', () => {
      assert.equal('###\n# #\n###', mazeAscii(1, 1, { refine: false }));
    });

    it('should not stringify if asked not to', () => {
      assert.deepEqual(
        '###\n# #\n###'
          .split(/\n/)
          .map(r => r.split('')),
        mazeAscii(1, 1, {
          refine: false,
          returnAsString: false
        }));
    });
  });
});
