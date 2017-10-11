import React, { PureComponent } from 'react';
import {
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import withTheme from './withTheme';

class H1 extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    primaryColor: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    primaryColor: 'red',
  };

  render() {
    return (
      <Text style={{ color: this.props.primaryColor }}>
        {this.props.children}
      </Text>
    );
  }
}

export default withTheme()(H1);
