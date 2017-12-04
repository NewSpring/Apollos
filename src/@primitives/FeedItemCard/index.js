import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { startCase, toLower } from 'lodash';

import ConnectedImage from '@primitives/ConnectedImage';
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
  withTheme(({ theme, isLight }) => ({
    fontColor: isLight ? theme.baseFontColor : theme.lightPrimaryColor,
    theme,
  })),
  setPropTypes({
    title: PropTypes.string.isRequired,
    images: PropTypes.any,
    category: PropTypes.string.isRequired,
    isLight: PropTypes.bool.isRequired,
    color: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    style: View.propTypes.style,
  }),
);

const StyledImage = styled(({ theme }) => ({
  width: undefined,
  height: undefined,
  flex: 1,
  resizeMode: 'cover',
  borderTopRightRadius: theme.cardBorderRadius,
  borderTopLeftRadius: theme.cardBorderRadius,
}))(ConnectedImage);

const LikeButton = styled(({ theme }) => ({
  paddingTop: theme.baseUnit / 2,
  paddingHorizontal: theme.baseUnit,
  paddingBottom: theme.baseUnit,
}))(TouchableOpacity);

const FeedItemCard = enhance(({
  images: imageSource,
  title,
  category,
  fontColor,
  backgroundColor,
  theme,
  ...otherProps
}) => (
  <CardWrapper>
    <Card cardColor={backgroundColor} {...otherProps}>
      <OverflowFix>
        <StyledImage source={imageSource} />

        <CardTitle color={fontColor}>{startCase(toLower(title))}</CardTitle>

        <Footer>
          <Category type={startCase(toLower(category))} color={fontColor} />
          <LikeButton>
            <Icon name={'like'} size={rem(1.2, theme)} fill={fontColor} />
          </LikeButton>
        </Footer>
      </OverflowFix>
    </Card>
  </CardWrapper>
));

export default FeedItemCard;
