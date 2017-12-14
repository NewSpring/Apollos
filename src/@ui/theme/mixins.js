import { compose, mapProps, withContext } from 'recompose';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import withTheme from './withTheme';
import createTheme, { THEME_PROPS } from './createTheme';

const withThemeMixin = themeInput => compose(
  mapProps(props => ({ ownProps: props })),
  withTheme(),
  withContext({
    theme: PropTypes.shape(THEME_PROPS),
    themeInput: PropTypes.shape(THEME_PROPS),
  }, ({ theme, themeInput: originalThemeInput, ownProps }) => {
    let themeInputAsObject = themeInput;
    if (typeof themeInput === 'function') themeInputAsObject = themeInput({ ...ownProps, theme });
    themeInputAsObject = merge(originalThemeInput, themeInputAsObject);

    const themeWithMixin = createTheme(themeInputAsObject);

    return ({
      theme: themeWithMixin,
      themeInput: themeInputAsObject,
    });
  }),
  mapProps(({ ownProps }) => ownProps),
);

const ThemeMixin = withThemeMixin(({ mixin = {} } = {}) => mixin)(({ children }) => children);

export { withThemeMixin, ThemeMixin };
