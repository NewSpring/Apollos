import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { get } from 'lodash';
import { compose, setPropTypes } from 'recompose';
import ConnectedImage from '@ui/ConnectedImage';
import styled from '@ui/styled';
import { withTheme } from '@ui/theme';

export { default as AvatarList } from './List';

const Container = styled(({ theme, themeSize }) => ({
  width: themeSize,
  height: themeSize,
  backgroundColor: theme.colors.background.inactive,
  borderRadius: themeSize / 2,
  marginRight: themeSize / 4,
  marginBottom: themeSize / 4,
  overflow: 'hidden',
}), 'Avatar')(View);

const Image = styled(({ themeSize }) => ({
  width: '100%',
  height: '100%',
  borderRadius: themeSize / 2,
}))(ConnectedImage);

const enhance = compose(
  setPropTypes({
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    ...ConnectedImage.propTypes,
  }),
  withTheme(({ theme, size }) => ({
    themeSize: get(theme.sizing.avatar, size, theme.sizing.avatar.small),
  })),
);

const Avatar = enhance(({ themeSize, ...imageProps }) => (
  <Container themeSize={themeSize}>
    <Image {...imageProps} themeSize={themeSize} />
  </Container>
));

export default Avatar;
