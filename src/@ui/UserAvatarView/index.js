import React from 'react';
import PropTypes from 'prop-types';
import { Platform, View, StyleSheet } from 'react-native';
import { compose, pure, setPropTypes, withState } from 'recompose';
import { withTheme, withThemeMixin } from '@ui/theme';
import { H4, BodyText } from '@ui/typography';
import Avatar from '@ui/Avatar';
import BlurView from '@ui/BlurView';
import PaddedView from '@ui/PaddedView';
import ConnectedImage from '@ui/ConnectedImage';
import Touchable from '@ui/Touchable';
import UploadProfileImageForm from '@ui/forms/UploadProfileImageForm';
import styled from '@ui/styled';

const Container = styled(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  backgroundColor: theme.colors.darkSecondary,
}))(View);
const Content = styled({ alignItems: 'center', justifyContent: 'center' })(PaddedView);

const copyStyles = styled({ backgroundColor: 'transparent', textAlign: 'center' });
const Name = copyStyles(H4);
const City = copyStyles(BodyText);

const StyledAvatar = withTheme(({ theme }) => ({
  containerStyle: {
    marginRight: 0,
    marginBottom: theme.sizing.baseUnit / 2,
    ...Platform.select({
      web: {
        // make more responsive on web
        width: '20vw',
        height: 0,
        paddingTop: '100%',
        borderRadius: '50%',
      },
    }),
  },
}))(Avatar);

const BlurredImage = styled({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFillObject,
})(ConnectedImage);

const enhance = compose(
  pure,
  setPropTypes({
    user: PropTypes.shape({
      photo: ConnectedImage.propTypes.source,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      home: PropTypes.shape({
        city: PropTypes.string,
      }),
    }),
    isLoading: PropTypes.bool,
    refetch: PropTypes.func,
    onPhotoPress: PropTypes.func,
    blurIntensity: PropTypes.number,
    allowProfileImageChange: PropTypes.bool,
    ...View.propTypes,
  }),
  withThemeMixin({ type: 'dark' }),
  withState('isUploadingFile', 'setIsUploadingFile', false),
);

const UserAvatarView = enhance(
  ({
    user: {
      photo, firstName, lastName, home = {},
    } = {},
    isLoading,
    refetch,
    onPhotoPress,
    blurIntensity = 100,
    allowProfileImageChange = false,
    setIsUploadingFile,
    isUploadingFile,
    ...viewProps
  }) => {
    let ImageContainer = Touchable;
    if (allowProfileImageChange) ImageContainer = UploadProfileImageForm;
    // todo: handle file select stuff

    return (
      <Container {...viewProps}>
        <BlurView intensity={blurIntensity} tint="dark" style={StyleSheet.absoluteFill}>
          {photo ? (
            <BlurredImage source={photo} resizeMode="cover" isLoading={isUploadingFile} />
          ) : null}
        </BlurView>
        <Content>
          <ImageContainer
            onPress={onPhotoPress}
            disabled={!allowProfileImageChange && !onPhotoPress}
            webWrapperStyle={{ alignItems: 'center' }}
            onUploadStarted={() => setIsUploadingFile(true)}
            onUploadEnded={() => setIsUploadingFile(false)}
          >
            <StyledAvatar source={photo} size="large" isLoading={isUploadingFile} />
          </ImageContainer>
          <Name>
            {firstName} {lastName}
          </Name>
          {home ? <City>{home.city}</City> : null}
        </Content>
      </Container>
    );
  },
);

export default UserAvatarView;
