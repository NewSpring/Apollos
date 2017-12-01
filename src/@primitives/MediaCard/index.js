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

// Set font color based on isLight prop
const determineFontColorFromProp =
  withTheme(({ theme: { baseFontColor, lightPrimaryColor } = {}, isLight }) => ({
    fontColor: isLight ? baseFontColor : lightPrimaryColor,
  }));

const enhance = compose(
  pure,
  determineFontColorFromProp,
  setPropTypes({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    // isLight is currently only required because without it fontColor wouldn't be set. There is
    // also no way to set a default based off of a theme value.
    isLight: PropTypes.bool.isRequired,
    cardColor: PropTypes.string,
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
  fontColor,
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

        <CardTitle color={fontColor}>{startCase(toLower(title))}</CardTitle>

        <Footer>
          <Category type={category} color={fontColor} />
          <LikeButton>
            <Icon
              name={'like'}
              size={rem(1.2, theme)}
              fill={fontColor}
            />
          </LikeButton>
        </Footer>
      </OverflowFix>
    </Card>
  </CardWrapper>
));

export default MediaCard;
