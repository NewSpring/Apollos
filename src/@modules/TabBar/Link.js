import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from '../../@primitives/Icon';
import NavLink from '../NativeWebRouter/NavLink';

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
    icon: PropTypes.string,
    to: NavLink.propTypes.to,
    style: NavLink.propTypes.style,
    activeStyle: NavLink.propTypes.activeStyle,
  };

  static defaultProps = {
    label: '',
    to: null,
    icon: null,
    style: null,
    activeStyle: null,
  };

  render() {
    const {
      to,
      style,
      activeStyle,
    } = this.props;

    return (
      <NavLink to={to} style={style} activeStyle={activeStyle}>
        <View style={styles.container}>
          {this.props.icon ? <Icon name={this.props.icon} fill="white" /> : null}
          {this.props.label ? <Text style={styles.text}>{this.props.label}</Text> : null}
        </View>
      </NavLink>
    );
  }
}
