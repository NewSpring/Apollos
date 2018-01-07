import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { startCase, toLower } from 'lodash';

import Placeholder from '@ui/Placeholder';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import { H4, H6, H7 } from '@ui/typography';
import CategoryLabel from '@ui/CategoryLabel';
import relativeTime from '@utils/relativeTime';

const enhance = compose(
  pure,
  setPropTypes({
    title: PropTypes.string.isRequired,
    number: PropTypes.number,
    showDetails: PropTypes.bool,
    byLine: PropTypes.string,
    date: PropTypes.string,
    style: PropTypes.any, // eslint-disable-line
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    showDetails: true,
  }),
  withTheme(),
  withThemeMixin({ type: 'light' }),
);

const TileSpacer = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit / 2,
  ...Platform.select({
    web: {
      paddingVertical: theme.sizing.baseUnit / 2,
    },
  }),
}))(View);

const Tile = styled(({ theme }) => ({
  height: '100%',
  aspectRatio: 1,
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
  backgroundColor: theme.colors.lightTertiary, // TODO: sort out correct theme var for this color
  ...Platform.select({
    web: {
      position: 'relative',
      width: '25vw',
      minWidth: '250px',
      maxWidth: '320px',
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
  backgroundColor: theme.colors.white,
}))(View);

const CardTile = enhance(({
  number,
  title,
  showDetails,
  byLine,
  date,
  style: styleProp = {},
  isLoading,
  theme,
  ...otherProps
}) => (
  <TileSpacer>
    <Tile style={styleProp} {...otherProps}>
      <WebAspectRatioFix>
        {typeof number === 'undefined' ? null : (
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
        )}

        <Placeholder.Line
          width={'75%'}
          textSize={theme.helpers.rem(1.4)}
          onReady={!isLoading}
        >
          <H4>{startCase(toLower(title))}</H4>
        </Placeholder.Line>

        {showDetails ? (
          <CategoryLabel
            label={startCase(toLower(byLine))}
            icon={'video'}
            isLoading={isLoading}
          >
            {typeof date === 'undefined' ? null : (
              <Placeholder.Line
                width={'10%'}
                textSize={theme.helpers.rem(1)}
                onReady={!isLoading}
              >
                <H7>{relativeTime(date)}</H7>
              </Placeholder.Line>
            )}
          </CategoryLabel>
        ) : null }
      </WebAspectRatioFix>
    </Tile>
  </TileSpacer>
));

export default CardTile;
