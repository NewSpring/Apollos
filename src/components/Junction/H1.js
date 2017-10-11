import React, { PureComponent } from 'react';
import {
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class H1 extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  static contextTypes = {
    theme: PropTypes.shape({
      primaryColor: PropTypes.string,
      secondaryColor: PropTypes.string,
    }),
  };

  render() {
    return (
      <Text style={{ color: this.context.theme.primaryColor }}>
        {this.props.children}
      </Text>
    );
  }
}
