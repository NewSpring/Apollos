import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Link from '../NativeWebRouter/Link';

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

export default class FooterNavLink extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    to: Link.propTypes.to,
  };

  static defaultProps = {
    label: '',
    to: null,
  };

  render() {
    return (
      <Link to={this.props.to}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.label}</Text>
        </View>
      </Link>
    );
  }
}
