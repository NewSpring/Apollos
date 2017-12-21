import React from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { H4, H6, H7, UIText } from '@ui/typography';
import Placeholder from 'rn-placeholder';
import Icon from '@ui/Icon';

const enhance = compose(
  pure,
  withTheme(),
  setPropTypes({
    number: PropTypes.number.isRequired,
    title: PropTypes.string,
    byLine: PropTypes.string,
    date: PropTypes.string,
    style: PropTypes.any, // eslint-disable-line
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    number: 1,
    title: 'Sermon Title',
    byLine: 'Marty McFly',
    date: '3mo',
    isLoading: false,
  }),
);

const Tile = styled(({ theme }) => ({
  width: '80%',
  aspectRatio: 1,
  justifyContent: 'center',
  paddingHorizontal: theme.sizing.baseUnit,
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.colors.lightTertiary, // TODO: sort out correct theme var for this color
  ...Platform.select({
    web: {
      position: 'relative',
      height: '0',
      paddingTop: '80%',
    },
  }),
}))(View);

const TileNumber = styled(({ theme, size }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  /* `width` and `height` are set in rem to scale with font size and are calculated based on the
   * number of characters in the string. This makes everything fluid but gets obnoxious with 5+
   * digit numbers.
   */
  width: theme.helpers.rem(1 * (size < 2 ? 2 : size)),
  height: theme.helpers.rem(1 * (size < 2 ? 2 : size)),
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: theme.sizing.borderRadius,
  borderBottomRightRadius: theme.sizing.borderRadius,
  backgroundColor: theme.colors.background.default,
}))(View);

const ByLineWrapper = styled(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: theme.sizing.baseUnit / 2,
}))(View);

const PlaceholderWrapper = styled(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.sizing.baseUnit / 2,
}))(View);

const CardTile = enhance(({
  number,
  title,
  byLine,
  date,
  style: styleProp = {},
  isLoading,
  theme,
  ...otherProps
}) => (
  <Tile style={styleProp} {...otherProps}>
    <TileNumber size={number.toString().length}>
      <View>
        <H6>{number}</H6>
      </View>
    </TileNumber>

    <Placeholder.Line
      width={'75%'}
      textSize={theme.helpers.rem(1.4)}
      onReady={!isLoading}
    >
      <H4>{title}</H4>
    </Placeholder.Line>

    <ByLineWrapper>
      <Icon
        name={'video'}
        size={theme.helpers.rem(1)}
        fill={theme.colors.text.primary}
        isLoading={isLoading}
      />
      <PlaceholderWrapper>
        <Placeholder.Line
          width={'40%'}
          textSize={theme.helpers.rem(1)}
          onReady={!isLoading}
        >
          <H7>{byLine}</H7>
        </Placeholder.Line>
      </PlaceholderWrapper>
      <Placeholder.Line
        width={'10%'}
        textSize={theme.helpers.rem(1)}
        onReady={!isLoading}
      >
        <H7>{date}</H7>
      </Placeholder.Line>
    </ByLineWrapper>
  </Tile>
));

export default CardTile;
