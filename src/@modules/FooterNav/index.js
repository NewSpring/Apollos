import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import FooterNavLink from './FooterNavLink';

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'green',
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default class FooterNav extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  static Link = FooterNavLink;

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}
