import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { startCase, toLower } from 'lodash';

import { withThemeMixin, withTheme } from '@ui/theme';
import Icon from '@ui/Icon';
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
  withThemeMixin(({ isLight }) => ({
    type: isLight ? 'light' : 'dark',
  })),
  withTheme(),
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
  backgroundColor,
  theme,
  id,
  ...otherProps
}) => (
  <Card isLoading={isLoading} cardColor={backgroundColor} {...otherProps}>
    <CardImage source={images} overlayColor={backgroundColor} />
    <StyledCardContent>
      <H4>{startCase(toLower(title))}</H4>
    </StyledCardContent>
    <CardActions>
      <CategoryLabel
        label={startCase(toLower(category))}
        isLoading={isLoading}
        withFlex
      />
      <LikeButton id={id}>
        <Icon
          name={isLiked ? 'like-solid' : 'like'}
          size={theme.helpers.rem(1.2)}
          fill={theme.colors.text.primary}
          isLoading={isLoading}
        />
      </LikeButton>
    </CardActions>
  </Card>
));

export default FeedItemCard;
