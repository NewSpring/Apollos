import React, { PureComponent } from 'react';
import {
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import withTheme from '@primitives/withTheme';

class H1 extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    primaryColor: PropTypes.string,
    primaryFont: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    primaryColor: 'black',
    primaryFont: 'Arial',
  };

  render() {
    return (
      <Text style={{ color: this.props.primaryColor, fontFamily: this.props.primaryFont }}>
        {this.props.children}
      </Text>
    );
  }
}

export default withTheme()(H1);
