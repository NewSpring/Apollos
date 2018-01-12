import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Placeholder from 'rn-placeholder';
import { times } from 'lodash';
import styled from '@ui/styled';
import { Line } from './Line';

const ParagraphLine = styled(({ theme }) => ({
  height: theme.helpers.rem(1),
  marginVertical: (theme.helpers.rem(1) - theme.helpers.verticalRhythm(1, 0.5)) / 2,
}), 'Placeholder.Paragraph.line')(Line);

export const Paragraph = ({
  lineNumber = 3,
  width = '100%',
  lastLineWidth = '75%',
  firstLineWidth = '85%',
  lineStyle,
  style,
}) => (
  <View style={style}>
    {times(lineNumber, (i) => {
      let lineWidth = width;
      if (i === 0 && firstLineWidth) lineWidth = firstLineWidth;
      if (i === lineNumber - 1 && lastLineWidth) lineWidth = lastLineWidth;
      return (<ParagraphLine key={i} width={lineWidth} style={lineStyle} />);
    })}
  </View>
);

Paragraph.propTypes = {
  lineNumber: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  firstLineWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineStyle: PropTypes.any, // eslint-disable-line
  style: PropTypes.any, // eslint-disable-line
};

export default Placeholder.connect(Paragraph);
