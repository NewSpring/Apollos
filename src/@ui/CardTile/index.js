import React from 'react';
import { Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';


import styled from '@ui/styled';
import { H6, UIText } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes({
    number: PropTypes.number.isRequired,
    style: PropTypes.any, // eslint-disable-line
  }),
  defaultProps({
    number: 1,
  }),
);

const Tile = styled(({ theme }) => ({
  justifyContent: 'center',
  width: '80%',
  aspectRatio: 1,
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

const CardTile = enhance(({
  number,
  style: styleProp = {},
  ...otherProps
}) => (
  <Tile style={styleProp} {...otherProps}>
    <TileNumber size={number.toString().length}>
      <View>
        <H6>{number}</H6>
      </View>
    </TileNumber>
    <UIText>Boom</UIText>
  </Tile>
));

export default CardTile;
