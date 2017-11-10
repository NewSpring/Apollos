import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Icon from '@primitives/Icon';
import NavLink from '@modules/NativeWebRouter/NavLink';
import withTheme from '@primitives/withTheme';

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

class FooterNavLink extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    to: NavLink.propTypes.to,
    style: NavLink.propTypes.style,
    activeStyle: NavLink.propTypes.activeStyle,
    color: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    to: null,
    icon: null,
    style: null,
    activeStyle: null,
    color: undefined,
  };

  render() {
    return (
      <NavLink to={this.props.to} style={this.props.style} activeStyle={this.props.activeStyle}>
        <View style={styles.container}>
          {this.props.icon ? <Icon name={this.props.icon} fill={this.props.color} /> : null}
          {this.props.label ? <Text style={styles.text}>{this.props.label}</Text> : null}
        </View>
      </NavLink>
    );
  }
}

export default compose(
  withTheme(({ lightPrimaryColor }) => ({ color: lightPrimaryColor })),
)(FooterNavLink);
