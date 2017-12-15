import createTheme, { getDynamicThemePart } from './createTheme';
import * as defaultTheme from './defaultTheme';

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
  });

  it('has helper functions and allows for custom helper functions', () => {
    const custom = { myFunc: () => () => 'yay!' };
    const theme = createTheme({ helpers: custom });
    expect(theme.helpers.rem(1)).toEqual(18);
    expect(theme.helpers.myFunc()).toEqual('yay!');
  });

  it('allows adding in custom theme properties', () => {
    const custom = {
      overrides: { MyComponent: { some: 'style' } },
    };
    const theme = createTheme(custom);
    expect(theme).toEqual(expect.objectContaining(custom));
  });


  it('switches to a dark theme', () => {
    const theme = createTheme({ type: 'dark' });
    expect(theme).toEqual(expect.objectContaining({
      colors: expect.objectContaining({
        background: expect.objectContaining({
          default: defaultTheme.colors.darkPrimary,
        }),
      }),
    }));
  });

  describe('getDynamicThemePart', () => {
    it('parses types in theme object', () => {
      const result = getDynamicThemePart({ types: defaultTheme.types }, defaultTheme);
      expect(result.types).toEqual(expect.objectContaining({
        light: expect.objectContaining({
          colors: expect.objectContaining({
            text: expect.objectContaining({
              primary: expect.any(String),
            }),
          }),
        }),
      }));
    });
  });
});
