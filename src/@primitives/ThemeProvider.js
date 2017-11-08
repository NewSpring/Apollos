import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_THEME, THEME_PROPS } from './constants';


export default class ThemeProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.shape(THEME_PROPS),
  };

  static defaultProps = {
    children: null,
    theme: DEFAULT_THEME,
  };

  static childContextTypes = {
    theme: PropTypes.shape(THEME_PROPS),
  };

  getChildContext = () => ({
    theme: Object.assign({}, DEFAULT_THEME, this.props.theme),
  })

  render() {
    return Children.only(this.props.children);
  }
}
