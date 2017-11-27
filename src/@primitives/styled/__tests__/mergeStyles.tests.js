import mergeStyles from '../mergeStyles';

describe('the mergeStyles function', () => {
  it('merges two style objects into one array', () => {
    const styleOne = { a: '1' };
    const styleTwo = { b: '2' };
    const merged = mergeStyles(styleOne, styleTwo);
    expect(merged).toEqual({ a: '1', b: '2' });
  });
  it('maintains expected order', () => {
    const merged = mergeStyles(1, 2, 3);
    expect(merged).toEqual([1, 2, 3]);
  });
  it('handles null styles', () => {
    const merged = mergeStyles(43, null);
    expect(merged).toEqual(43);
  });
  it('merges mixed array of objects and objects to one style object', () => {
    const styleOne = [{ c: '2' }, { a: '1' }];
    const styleTwo = { b: '1' };
    const merged = mergeStyles(styleOne, styleTwo);
    expect(merged).toEqual({ c: '2', a: '1', b: '1' });
  });
  it('merges mixed types and maintains correct style order', () => {
    const styleOne = [{ a: '1' }, { a: '2' }];
    const styleTwo = { a: '3' };
    const merged = mergeStyles(styleOne, styleTwo);
    expect(merged).toEqual({ a: '3' });
  });
  it('results in a flat array of styles', () => {
    const styleOne = [[[1, 2]], { a: '1' }, [3, 4]];
    const styleTwo = [{ b: '2' }, [[5, 6]]];
    const merged = mergeStyles(styleOne, styleTwo);
    expect(merged).toEqual(
      [1, 2, { a: '1' }, 3, 4, { b: '2' }, 5, 6],
    );
  });
  it('handles triple nested arrays', () => {
    const styleOne = [[[{ a: '1' }, { a: '2' }]]];
    const styleTwo = [[[{ b: '1' }, { b: '2' }]]];
    const merged = mergeStyles(styleOne, styleTwo);
    expect(merged).toEqual({ a: '2', b: '2' });
  });
});
