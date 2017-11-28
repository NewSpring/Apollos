import React from 'react';
import { Platform, View, Image, Text } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@primitives/styled';

const enhance = compose(
  pure,
  setPropTypes({
    image: PropTypes.string,
    title: PropTypes.string,
    mediaType: PropTypes.string,
    style: View.propTypes.style,
  }),
);

const StyledCard = styled(({ theme }) => ({
  backgroundColor: theme.lightPrimaryColor,
  borderRadius: theme.cardBorderRadius,
  ...Platform.select({
    ios: {
      shadowColor: theme.lightTertiaryColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
    },
  }),
}))(View);

const OverflowFix = styled(({ theme }) => ({
  flex: 1,
  borderRadius: theme.cardBorderRadius,
  overflow: 'hidden',
}))(View);

const StyledImage = styled(({ theme }) => ({
  flex: 1,
  borderTopRightRadius: theme.cardBorderRadius,
  borderTopLeftRadius: theme.cardBorderRadius,
  // backgroundColor: 'salmon',
}))(Image);

const MediaCard = enhance(({
  image: imagePath,
  title,
  mediaType,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledCard
    style={styleProp}
    {...otherProps}
  >
    <OverflowFix>
      <StyledImage
        source={{ uri: imagePath }}
      />
      <Text>{title}</Text>
      <Text>{mediaType}</Text>
    </OverflowFix>
  </StyledCard>
));

export default MediaCard;
