import { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_THEME } from './constants';

export default class ThemeProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.shape({
      primaryColor: PropTypes.string,
      secondaryColor: PropTypes.string,
    }),
  };

  static defaultProps = {
    children: null,
    theme: DEFAULT_THEME,
  };

  static childContextTypes = {
    theme: PropTypes.shape({
      primaryColor: PropTypes.string,
      secondaryColor: PropTypes.string,
    }),
  };

  getChildContext = () => ({
    theme: this.props.theme,
  })

  render() {
    return Children.only(this.props.children);
  }
}
