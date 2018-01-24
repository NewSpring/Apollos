import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { compose, setPropTypes } from 'recompose';
import { withThemeMixin } from '@ui/theme';
import { H4, BodyCopy } from '@ui/typography';
import Avatar from '@ui/Avatar';
import BlurView from '@ui/BlurView';
import PaddedView from '@ui/PaddedView';
import ConnectedImage from '@ui/ConnectedImage';
import Touchable from '@ui/Touchable';
import styled from '@ui/styled';

const Container = styled({ alignItems: 'center' })(View);
const Content = styled({ alignItems: 'center' })(PaddedView);

const copyStyles = styled({ backgroundColor: 'transparent', textAlign: 'center' });
const Name = copyStyles(H4);
const City = copyStyles(BodyCopy);

const StyledAvatar = styled(({ theme }) => ({
  marginRight: 0, marginBottom: theme.sizing.baseUnit / 2,
}))(Avatar);

const enhance = compose(
  setPropTypes({
    photo: ConnectedImage.propTypes.source,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    city: PropTypes.string,
    onPhotoPress: PropTypes.func,
    blurIntensity: PropTypes.number,
    ...View.propTypes,
  }),
  withThemeMixin({ type: 'dark' }),
);

const UserAvatarView = enhance(({
  photo,
  firstName,
  lastName,
  city,
  onPhotoPress,
  blurIntensity = 100,
  ...viewProps
}) => (
  <Container {...viewProps}>
    <BlurView intensity={blurIntensity} tint="dark" style={StyleSheet.absoluteFill}>
      <ConnectedImage source={photo} style={StyleSheet.absoluteFill} />
    </BlurView>
    <Content>
      <Touchable onPress={onPhotoPress} disabled={!onPhotoPress}>
        <StyledAvatar source={photo} size="large" />
      </Touchable>
      <Name>{firstName} {lastName}</Name>
      <City>{city}</City>
    </Content>
  </Container>
));

export default UserAvatarView;
