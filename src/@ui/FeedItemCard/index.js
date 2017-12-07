import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { startCase, toLower } from 'lodash';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import Icon from '@ui/Icon';
import CategoryLabel from '@ui/CategoryLabel';

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
    fontColor: isLight ? theme.colors.text.primary : theme.colors.common.lightPrimary,
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
    style: PropTypes.any, // eslint-disable-line
  }),
);

const LikeButton = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit / 2,
  paddingHorizontal: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit,
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
            <Icon name={'like'} size={theme.typography.rem(1.2)} fill={fontColor} />
          </LikeButton>
        </Footer>
      </OverflowFix>
    </Card>
  </CardWrapper>
));

export default FeedItemCard;
