import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { startCase, toLower } from 'lodash';

import { withTheme } from '@ui/theme';
import Icon from '@ui/Icon';
// import Card from '@ui/CardWrapper';
import CategoryLabel from '@ui/CategoryLabel';
import Card, { CardContent, CardActions } from '@ui/Card';
import { H4 } from '@ui/typography';
import styled from '@ui/styled';

import CardImage from './CardImage';
import LikeButton from './LikeButton';

const StyledCardContent = styled({ paddingBottom: 0 })(CardContent);

const enhance = compose(
  pure,
  defaultProps({
    isLight: true,
  }),
  withTheme(({ theme, isLight }) => ({
    fontColor: (isLight || typeof isLight === 'undefined') ?
      theme.colors.text.primary :
      theme.colors.lightPrimary,
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
    isLoading: PropTypes.bool,
    isLiked: PropTypes.bool,
    isLight: PropTypes.bool,
    color: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    style: PropTypes.any, // eslint-disable-line
  }),
);

const FeedItemCard = enhance(({
  images,
  title,
  category,
  isLoading,
  isLiked,
  fontColor,
  backgroundColor,
  theme,
  id,
  style = {},
  ...otherProps
}) => (
  <Card isLoading={isLoading} style={[{ backgroundColor }, style]} {...otherProps}>
    <CardImage source={images} overlayColor={backgroundColor} />
    <StyledCardContent>
      <H4 style={{ color: fontColor }}>{startCase(toLower(title))}</H4>
    </StyledCardContent>
    <CardActions>
      <CategoryLabel
        label={startCase(toLower(category))}
        color={fontColor}
        isLoading={isLoading}
      />
      <LikeButton id={id}>
        <Icon
          name={isLiked ? 'like-solid' : 'like'}
          size={theme.helpers.rem(1.2)}
          fill={fontColor}
          isLoading={isLoading}
        />
      </LikeButton>
    </CardActions>
  </Card>
));

export default FeedItemCard;
