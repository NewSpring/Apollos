import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
<<<<<<< HEAD:src/@primitives/FeedItemCard/index.js
import { compose, pure, setPropTypes } from 'recompose';
=======
import {
  compose,
  pure,
  setPropTypes,
} from 'recompose';
>>>>>>> origin/40-media-card-component:src/@primitives/MediaCard/index.js
import { startCase, toLower } from 'lodash';
import ConnectedImage from '@primitives/ConnectedImage';
import { withThemeProvider } from '@primitives/ThemeProvider';
import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';
import Icon from '@primitives/Icon';
import rem from '@utils/remUnit';
import { getThemeOverrides } from '@utils/content';

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
  withThemeProvider(getThemeOverrides),
  withTheme(),
  setPropTypes({
    title: PropTypes.string.isRequired,
    images: PropTypes.any,
    category: PropTypes.string.isRequired,
    isLight: PropTypes.bool.isRequired,
    colors: PropTypes.array,
    fontColor: PropTypes.string,
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
  theme,
  ...otherProps
}) => (
  <CardWrapper>
    <Card {...otherProps}>
      <OverflowFix>
        <StyledImage source={imageSource} />

        <CardTitle>{startCase(toLower(title))}</CardTitle>

        <Footer>
          <Category type={category} />
          <LikeButton>
            <Icon name={'like'} size={rem(1.2, theme)} />
          </LikeButton>
        </Footer>
      </OverflowFix>
    </Card>
  </CardWrapper>
));

export default FeedItemCard;
