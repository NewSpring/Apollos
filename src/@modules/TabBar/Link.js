import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import Icon from '@primitives/Icon';
import NavLink from '@modules/NativeWebRouter/NavLink';
import withTheme from '@primitives/withTheme';
import MediaQuery, { enhancer as mediaQuery } from '@primitives/MediaQuery';
import styled from '@primitives/styled';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  activeStyle: {
    // todo
  },
  largeButton: {
    height: 80,
  },
});

class FooterNavLink extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    to: NavLink.propTypes.to,
    style: NavLink.propTypes.style,
    color: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    to: null,
    icon: null,
    style: null,
    color: undefined,
  };

  render() {
    return (
      <NavLink
        to={this.props.to}
        style={[styles.container, this.props.style]}
        activeStyle={[styles.container, this.props.style, styles.activeStyle]}
      >
        {this.props.icon ? <Icon name={this.props.icon} fill={this.props.color} /> : null}
        <MediaQuery minWidth="md">{this.props.label ? <Text style={{ color: this.props.color }}>{this.props.label}</Text> : null}</MediaQuery>
      </NavLink>
    );
  }
}

export default compose(
  withTheme(({ theme: { lightPrimaryColor } }) => ({ color: lightPrimaryColor })),
  mediaQuery(({ md }) => ({ minWidth: md }), styled(styles.largeButton)),
)(FooterNavLink);
