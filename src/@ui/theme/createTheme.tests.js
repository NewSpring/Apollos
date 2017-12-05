import createTheme from './createTheme';

describe('createTheme', () => {
  it('has a colors', () => {
    const theme = createTheme();
    expect(theme).toHaveProperty('colors');
  });

  it('has a custom colors', () => {
    const customColors = { primary: 'red', otherColor: 'green' };
    const theme = createTheme({ colors: customColors });
    expect(theme.colors).toEqual(expect.objectContaining(customColors));
  });

  it('has typography', () => {
    const theme = createTheme();
    expect(theme).toHaveProperty('typography');
  });

  it('has custom typography', () => {
    const custom = { baseFontSize: '24', otherProp: true };
    const theme = createTheme({ typography: custom });
    expect(theme.typography).toEqual(expect.objectContaining(custom));
    expect(theme.typography.rem(1)).toEqual(24);
  });

  it('allows adding in custom theme properties', () => {
    const custom = {
      overrides: { MyComponent: { some: 'style' } },
    };
    const theme = createTheme(custom);
    expect(theme).toEqual(expect.objectContaining(custom));
  });
});
