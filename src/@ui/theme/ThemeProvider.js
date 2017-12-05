import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import createTheme, { THEME_PROPS } from './createTheme';


export default class ThemeProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.shape(THEME_PROPS),
  };

  static defaultProps = {
    children: null,
    theme: createTheme(),
  };

  static childContextTypes = {
    theme: PropTypes.shape(THEME_PROPS),
  };

  getChildContext = () => ({
    theme: this.props.theme,
  })

  render() {
    return Children.only(this.props.children);
  }
}
