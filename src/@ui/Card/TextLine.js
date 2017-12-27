import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
import { compose, getContext } from 'recompose';
import { UIText } from '@ui/typography';

import styled from '@ui/styled';
import { withTheme } from '@ui/theme';

const Wrapper = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit / 4,
  width: '100%',
}))(View);

const enhance = compose(
  getContext({ isLoading: PropTypes.bool }),
  withTheme(),
);

const TextLine = enhance(({
  isLoading,
  theme,
  Type = UIText,
  children,
  ...props
}) => (
  <Wrapper>
    <Placeholder.Line
      width={'100%'}
      textSize={theme.helpers.rem(1.4)}
      onReady={!isLoading}
    >
      <Type {...props}>{children}</Type>
    </Placeholder.Line>
  </Wrapper>
));

export default TextLine;
