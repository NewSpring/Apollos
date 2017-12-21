import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, renderNothing } from 'recompose';
import Placeholder from 'rn-placeholder';

import { withTheme } from '@ui/theme';
import styled from '@ui/styled';
import { H4, H6, H7 } from '@ui/typography';
import CategoryLabel from '@ui/CategoryLabel';
import relativeTime from '@utils/relativeTime';

const enhance = compose(
  pure,
  withTheme(),
  setPropTypes({
    number: PropTypes.number,
    title: PropTypes.string,
    byLine: PropTypes.string,
    date: PropTypes.string,
    style: PropTypes.any, // eslint-disable-line
    isLoading: PropTypes.bool,
  }),
);

const Tile = styled(({ theme }) => ({
  width: '100%',
  aspectRatio: 1,
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.colors.lightTertiary, // TODO: sort out correct theme var for this color
  ...Platform.select({
    web: {
      position: 'relative',
      // height: '80vw',
      height: '0',
      paddingTop: '100%',
    },
  }),
}))(View);

const WebAspectRatioFix = styled(({ theme }) => ({
  justifyContent: 'center',
  paddingHorizontal: theme.sizing.baseUnit,
  ...StyleSheet.absoluteFillObject,
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
    <WebAspectRatioFix>
      {typeof number !== 'undefined' ? (
        <TileNumber size={number.toString().length}>
          <Placeholder.Media
            /* placeholder size is calculated the same as TileNumber width and height but slightly
             * bigger to cover it's corners completely
             */// eslint-disable-next-line max-len
            size={theme.helpers.rem(1.25 * (number.toString().length < 2 ? 2 : number.toString().length))}
            onReady={!isLoading}
          >
            <View>
              <H6>{number}</H6>
            </View>
          </Placeholder.Media>
        </TileNumber>
      ) : renderNothing()}

      <Placeholder.Line
        width={'75%'}
        textSize={theme.helpers.rem(1.4)}
        animate={'fade'}
        onReady={!isLoading}
      >
        <H4>{title}</H4>
      </Placeholder.Line>

      <CategoryLabel
        label={byLine}
        icon={'video'}
        isLoading={isLoading}
      >
        <Placeholder.Line
          width={'10%'}
          textSize={theme.helpers.rem(1)}
          onReady={!isLoading}
        >
          <H7>{relativeTime(date)}</H7>
        </Placeholder.Line>
      </CategoryLabel>
    </WebAspectRatioFix>
  </Tile>
));

export default CardTile;
