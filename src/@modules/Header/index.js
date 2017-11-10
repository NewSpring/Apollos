import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import createStyleSheet from '@primitives/stylesheet';

const styles = createStyleSheet(({ primaryColor }) => ({
  container: {
    height: 60,
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
}));

export default class Header extends PureComponent {
  static propTypes = {
    titleText: PropTypes.string,
  };

  static defaultProps = {
    titleText: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.titleText}</Text>
      </View>
    );
  }
}
