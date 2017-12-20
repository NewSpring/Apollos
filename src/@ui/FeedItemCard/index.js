import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { startCase, toLower } from 'lodash';
import Placeholder from 'rn-placeholder';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import Icon from '@ui/Icon';
import Card from '@ui/CardWrapper';
import CategoryLabel from '@ui/CategoryLabel';

import CardImage from './CardImage';
import {
  CardWrapper,
  CardTitle,
  Footer,
} from './styles';

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

const LikeButton = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit / 2,
}))(TouchableOpacity);

const FeedItemCard = enhance(({
  images,
  title,
  category,
  isLoading: loadingState,
  isLiked,
  fontColor,
  backgroundColor,
  theme,
  ...otherProps
}) => (
  <CardWrapper>
    <Card backgroundColor={backgroundColor} {...otherProps}>
      <CardImage source={images} overlayColor={backgroundColor} />
      <Footer>
        <Placeholder.Line
          width={'100%'}
          textSize={theme.helpers.rem(1.4)}
          onReady={!loadingState}
        >
          <CardTitle color={fontColor}>{startCase(toLower(title))}</CardTitle>
        </Placeholder.Line>
        <CategoryLabel
          type={startCase(toLower(category))}
          color={fontColor}
          isLoading={loadingState}
        />
        <LikeButton>
          <Icon
            name={isLiked ? 'like-solid' : 'like'}
            size={theme.helpers.rem(1.2)}
            fill={fontColor}
            isLoading={loadingState}
          />
        </LikeButton>
      </Footer>
    </Card>
  </CardWrapper>
));

export default FeedItemCard;
