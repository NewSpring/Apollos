import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

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
