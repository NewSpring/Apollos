import { compose, mapProps } from 'recompose';
import { StyleSheet } from 'react-native';
import Placeholder from 'rn-placeholder';
import styled from '@ui/styled';
import { Line } from './Line';

export const Typography = compose(
  mapProps(({ style, ...otherProps }) => ({
    flattenedStyles: StyleSheet.flatten(style),
    ...otherProps,
  })),
  styled(({ flattenedStyles: { fontSize, lineHeight } = {} }) => {
    const styles = { };
    if (fontSize && lineHeight) {
      styles.height = fontSize;
      styles.marginVertical = (lineHeight - fontSize) / 2;
    }
    return styles;
  }, 'Placeholder.Typography'),
)(Line);

export default Placeholder.connect(Typography);
