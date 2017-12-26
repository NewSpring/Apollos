import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { pure, compose } from 'recompose';
import { Link } from '@ui/NativeWebRouter';
import { H6 } from '@ui/typography';
import styled from '@ui/styled';
import LinearGradient from '@ui/LinearGradient';
import NavItemImage from './NavItemImage';

const CardView = styled(({ theme }) => ({
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
}), 'TileNav.NavItem')(View);

const NavItemText = styled(({ theme }) => ({
  position: 'absolute',
  bottom: theme.sizing.baseUnit,
  left: theme.sizing.baseUnit,
  backgroundColor: 'transparent',
  color: theme.colors.lightPrimary,
}), 'TileNav.NavItem.Text')(H6);

const enhance = compose(
  pure,
);

const NavItem = enhance(({
  image,
  link,
  text,
}) => (
  <Link to={link}>
    <CardView>
      <NavItemImage source={image} />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        locations={[0.3, 1]}
        style={StyleSheet.absoluteFill}
      >
        <NavItemText>{text}</NavItemText>
      </LinearGradient>
    </CardView>
  </Link>
));

NavItem.propTypes = {
  image: NavItemImage.propTypes.source,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavItem;
