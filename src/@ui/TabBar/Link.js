import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import { compose, mapProps, setPropTypes, onlyUpdateForPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import Icon from '@ui/Icon';
import { Link, withRouter, matchLocationToPath } from '@ui/NativeWebRouter';
import { withTheme } from '@ui/theme';
import MediaQuery, { enhancer as mediaQuery } from '@ui/MediaQuery';
import styled from '@ui/styled';
import { H7 } from '@ui/typography';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    ...Platform.select({
      web: {
        transform: [{ translateZ: [0] }], // web optimization for flexing viewport causing repaint 💥
      },
    }),
  },
  largeButton: {
    height: 75,
    /* Current design spec requires text smaller than we have components for. This is the easiest
     * fix until a designer can create a navbar that fits within branding guidelines.
     */
    ...(Platform.OS !== 'web' ? { transform: [{ scale: 0.9 }] } : { transform: [{ scale3d: [0.9, 0.9, 1] }] }),
  },
});

// Styled View to wrap icon and label
const LinkContainer = compose(
  mediaQuery(({ md }) => ({ minWidth: md }), styled(styles.largeButton, 'TabBar.Link.Container@large')),
  styled(styles.container, 'TabBar.Link.Container'),
)(View);

const StyledLinkText = styled({}, 'TabBar.Link.Text')(H7);

// Determine if link should be considered "active"
const withActiveRoute = compose(
  withRouter,
  mapProps(({
    match, location, history, ...ownProps
  }) => ({
    isActive: matchLocationToPath(ownProps.to, location),
    ...ownProps,
  })),
);

// Get color from active route
const determineColorFromActiveRoute =
  withTheme(({ color, theme: { colors: { primary, lightPrimary } } = {}, isActive }) => ({
    color: color || (isActive ? primary : lightPrimary),
  }));

const enhance = compose(
  withActiveRoute,
  determineColorFromActiveRoute,
  onlyUpdateForPropTypes,
  setPropTypes({
    label: PropTypes.string,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    to: Link.propTypes.to,
    color: PropTypes.string,
    onPress: PropTypes.func,
  }),
);

const TabBarLink = enhance(({
  label = null,
  icon = null,
  iconSize,
  color = null,
  isActive,
  staticContext,
  ...linkProps
}) => {
  const dynamicLinkStyle = { color };
  return (
    <Link {...linkProps}>
      <LinkContainer>
        {icon ? <Icon name={icon} size={iconSize} fill={color} /> : null}
        <MediaQuery minWidth="md">
          {label ? <StyledLinkText style={dynamicLinkStyle}>{label}</StyledLinkText> : null}
        </MediaQuery>
      </LinkContainer>
    </Link>
  );
});

export default TabBarLink;
