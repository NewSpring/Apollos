import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { compose, mapProps, setPropTypes, onlyUpdateForPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import Icon from '@primitives/Icon';
import { Link, withRouter, matchLocationToPath } from '@modules/NativeWebRouter';
import withTheme from '@primitives/withTheme';
import MediaQuery, { enhancer as mediaQuery } from '@primitives/MediaQuery';
import styled from '@primitives/styled';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  largeButton: {
    height: 80,
  },
});

// Styled View to wrap icon and label
const LinkContainer = compose(
  styled(styles.container),
  mediaQuery(({ md }) => ({ minWidth: md }), styled(styles.largeButton)),
)(View);

const StyledLinkText = styled({})(Text);

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
  withTheme(({ theme: { primaryColor, lightPrimaryColor } = {}, isActive }) => ({
    color: isActive ? primaryColor : lightPrimaryColor,
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
