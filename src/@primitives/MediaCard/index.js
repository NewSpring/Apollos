import React from 'react';
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  compose,
  pure,
  setPropTypes,
  defaultProps,
} from 'recompose';
import { startCase, toLower } from 'lodash';

import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';
import { H4 } from '@primitives/typography';
import Icon from '@primitives/Icon';
import rem from '@utils/remUnit';

import Category from './Category';

const enhance = compose(
  pure,
  withTheme(),
  defaultProps({
    isLight: false,
  }),
  setPropTypes({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    cardColor: PropTypes.string,
    isLight: PropTypes.bool,
    style: View.propTypes.style,
  }),
);

const getFontColor = (isLight, theme) => {
  let fontColor = theme.lightPrimaryColor;

  if (isLight) {
    fontColor = theme.baseFontColor;
  }

  return fontColor;
};

const CardWrapper = styled(({ theme }) => ({
  marginHorizontal: theme.baseUnit / 2,
  marginVertical: theme.baseUnit / 4,
}))(View);

const StyledCard = styled(({ theme, cardColor }) => ({
  width: '100%',
  minHeight: 400,
  maxWidth: 420,
  backgroundColor: !cardColor ? theme.lightPrimaryColor : cardColor,
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
  width: undefined,
  height: undefined,
  flex: 1,
  resizeMode: 'cover',
  borderTopRightRadius: theme.cardBorderRadius,
  borderTopLeftRadius: theme.cardBorderRadius,
}))(Image);

const CardTitle = styled(({ theme, fontColor }) => ({
  flex: 0,
  paddingTop: theme.baseUnit,
  paddingHorizontal: theme.baseUnit,
  color: fontColor,
}))(H4);

const Footer = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const LikeButton = styled(({ theme }) => ({
  paddingTop: theme.baseUnit / 2,
  paddingHorizontal: theme.baseUnit,
  paddingBottom: theme.baseUnit,
}))(TouchableOpacity);

const MediaCard = enhance(({
  image: imagePath,
  title,
  category,
  isLight,
  style: styleProp = {},
  theme,
  ...otherProps
}) => (
  <CardWrapper>
    <StyledCard
      style={styleProp}
      {...otherProps}
    >
      <OverflowFix>
        <StyledImage source={{ uri: imagePath }} />

        <CardTitle fontColor={getFontColor(isLight, theme)}>{startCase(toLower(title))}</CardTitle>

        <Footer>
          <Category type={category} fontColor={getFontColor(isLight, theme)} />
          <LikeButton>
            <Icon
              name={'like'}
              size={rem(1.2, theme)}
              fill={getFontColor(isLight, theme)}
            />
          </LikeButton>
        </Footer>
      </OverflowFix>
    </StyledCard>
  </CardWrapper>
));

export default MediaCard;
