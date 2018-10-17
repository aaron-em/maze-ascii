const assert = require('assert');

const refine = require('./refine');

function toCellArray(source) {
  const splitRows = a => a.map(r => r.split(''));
  if (Array.isArray(source)) {
    return splitRows(source);
  };

  return splitRows(source.split(/\n/));
};

function fromCellArray(source) {
  return source.map(r => r.join('')).join('\n');
};

describe('grid refiner', () => {
  it('should correctly handle all types of intersections', () => {
    const sample = toCellArray([
      '###########',
      '#  # #    #',
      '##   # # ##',
      '#  # #    #',
      '###########'
    ]);

    const refined = fromCellArray(refine(sample));

    const expected = [
      '┌──┬─┬────┐',
      '│  ╵ │    │',
      '├╴   │ ◆ ╶┤',
      '│  ╷ │    │',
      '└──┴─┴────┘'
    ].join('\n');

    assert.equal(refined, expected);
  });

  it('should refine to Unicode by default', () => {
    const sample = toCellArray('###\n# #\n###');
    const expected = '┌─┐\n│ │\n└─┘';
    assert.equal(fromCellArray(refine(sample)), expected);
  });

  it('should refine to ASCII if requested', () => {
    const sample = toCellArray('###\n# #\n###');
    const expected = '+-+\n| |\n+-+';
    assert.equal(fromCellArray(refine(sample, 'ascii')), expected);
  });
});
