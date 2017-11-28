import React from 'react';
import { Platform, View, Image } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import styled from '@primitives/styled';
import { H4 } from '@primitives/typography';

import Category from './Category';

const enhance = compose(
  pure,
  setPropTypes({
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    image: PropTypes.string,
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

/*
 * Overflow on iOS, when declared on the same element as a shadow, clips the shadow so it must live
 * on a child wrapper. https://github.com/facebook/react-native/issues/449
 */
const OverflowFix = styled(({ theme }) => ({
  flex: 1,
  borderRadius: theme.cardBorderRadius,
  overflow: 'hidden',
}))(View);

const StyledImage = styled(({ theme }) => ({
  flex: 1,
  borderTopRightRadius: theme.cardBorderRadius,
  borderTopLeftRadius: theme.cardBorderRadius,
}))(Image);

const CardTitle = styled(({ theme }) => ({
  paddingTop: theme.baseUnit,
  paddingHorizontal: theme.baseUnit,
  paddingBottom: theme.baseUnit / 2,
}))(H4);

const MediaCard = enhance(({
  image: imagePath,
  title,
  category,
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
      <CardTitle>{title}</CardTitle>
      <Category type={category} />
    </OverflowFix>
  </StyledCard>
));

export default MediaCard;
