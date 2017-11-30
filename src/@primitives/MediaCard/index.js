import React from 'react';
import {
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
import Icon from '@primitives/Icon';
import rem from '@utils/remUnit';

import Category from './Category';
import {
  CardWrapper,
  Card,
  OverflowFix,
  CardTitle,
  Footer,
} from './styles';

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


const StyledImage = styled(({ theme }) => ({
  width: undefined,
  height: undefined,
  flex: 1,
  resizeMode: 'cover',
  borderTopRightRadius: theme.cardBorderRadius,
  borderTopLeftRadius: theme.cardBorderRadius,
}))(Image);

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
    <Card
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
    </Card>
  </CardWrapper>
));

export default MediaCard;
