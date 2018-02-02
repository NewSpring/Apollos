import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { startCase, toLower } from 'lodash';

import Placeholder from '@ui/Placeholder';
import { withIsLoading } from '@ui/isLoading';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import { H4, H6, H7 } from '@ui/typography';
import { CardContent, CardActions } from '@ui/Card';
import CategoryLabel from '@ui/CategoryLabel';
import relativeTime from '@utils/relativeTime';

const enhance = compose(
  setPropTypes({
    title: PropTypes.string,
    number: PropTypes.number,
    showDetails: PropTypes.bool,
    byLine: PropTypes.string,
    date: PropTypes.string,
    style: PropTypes.any, // eslint-disable-line
    isLoading: PropTypes.bool,
  }),
  defaultProps({
    showDetails: false,
  }),
  withIsLoading,
  withThemeMixin(({ theme }) => ({
    type: 'light',
    colors: {
      background: {
        inactive: theme.colors.lightSecondary, // TODO: sort out correct inactive color value.
      },
    },
  })),
  withTheme(),
  pure,
);

const TileSpacer = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit / 2,
}))(View);

const Tile = styled(({ theme }) => ({
  height: '100%',
  aspectRatio: 1,
  borderRadius: theme.sizing.borderRadius,
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

const OverflowFix = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
}))(View);

const WebAspectRatioFix = styled({
  justifyContent: 'center',
  ...StyleSheet.absoluteFillObject,
})(View);

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
  children,
  ...otherProps
}) => ( // collablse={false} fixes a very obscure bug on Android
  <TileSpacer collapsable={false}>
    <Tile style={styleProp} {...otherProps}>
      <OverflowFix>
        <WebAspectRatioFix>
          {typeof number === 'undefined' ? null : (
            <TileNumber size={number.toString().length}>
              <Placeholder.Media
                /* placeholder size is calculated the same as TileNumber width and height but
                * slightly bigger to cover it's corners completely
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

          {typeof title === 'undefined' ? null : (
            <CardContent>
              <H4>{startCase(toLower(title))}</H4>
            </CardContent>
          )}

          {showDetails ? (
            <CardActions>
              <CategoryLabel
                label={startCase(toLower(byLine))}
                icon={'video'}
                isLoading={isLoading}
                withFlex
              />
              {typeof date === 'undefined' ? null : (
                <H7>{relativeTime(date)}</H7>
              )}
            </CardActions>
          ) : null }

          {children}
        </WebAspectRatioFix>
      </OverflowFix>
    </Tile>
  </TileSpacer>
));

export default CardTile;
