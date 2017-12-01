import { mapProps, withContext, compose } from 'recompose';
import { THEME_PROPS } from '@primitives/constants';
import withTheme from '@primitives/withTheme';

// HOC to help with extending theme.
// Use to over-ride theme context for child components
// Does not change or modify props of the component you're enhancing
const withThemeProvider = themeInput => compose(
  mapProps(props => ({ ownProps: props })),
  withTheme(),
  withContext({ theme: THEME_PROPS }, ({ theme, ownProps }) => {
    let composedTheme = Object.assign({}, theme, ownProps.theme || {});

    let themeInputAsObject = themeInput;
    if (typeof themeInput === 'function') themeInputAsObject = themeInput({ ...ownProps, theme: composedTheme });

    composedTheme = Object.assign({}, composedTheme, themeInputAsObject);

    return ({
      theme: composedTheme,
    });
  }),
  mapProps(({ ownProps }) => ownProps),
);

export default withThemeProvider;
