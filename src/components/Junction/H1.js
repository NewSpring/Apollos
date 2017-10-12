import React, { PureComponent } from 'react';
import {
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import withTheme from './withTheme';

class H1 extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.shape({
      primaryColor: PropTypes.string,
    }),
  };

  static defaultProps = {
    children: null,
    theme: {},
  };

  render() {
    return (
      <Text style={{ color: this.props.theme.primaryColor }}>
        {this.props.children}
      </Text>
    );
  }
}

export default withTheme(H1);
