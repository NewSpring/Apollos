import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { startCase, toLower } from 'lodash';

import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';
import Icon from '@primitives/Icon';
import rem from '@utils/remUnit';
import CategoryLabel from '@primitives/CategoryLabel';

import CardImage from './CardImage';
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
    images: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
        description: PropTypes.string,
      })),
      PropTypes.string,
    ]),
    category: PropTypes.string.isRequired,
    isLight: PropTypes.bool.isRequired,
    color: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    style: View.propTypes.style,
  }),
);

const LikeButton = styled(({ theme }) => ({
  paddingTop: theme.baseUnit / 2,
  paddingHorizontal: theme.baseUnit,
  paddingBottom: theme.baseUnit,
}))(TouchableOpacity);

const FeedItemCard = enhance(({
  images,
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
        <CardImage source={images} overlayColor={backgroundColor} />
        <CardTitle color={fontColor}>{startCase(toLower(title))}</CardTitle>
        <Footer>
          <CategoryLabel type={startCase(toLower(category))} color={fontColor} />
          <LikeButton>
            <Icon name={'like'} size={rem(1.2, theme)} fill={fontColor} />
          </LikeButton>
        </Footer>
      </OverflowFix>
    </Card>
  </CardWrapper>
));

export default FeedItemCard;
