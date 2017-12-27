import React from 'react';
import PropTypes from 'prop-types';
import Placeholder from 'rn-placeholder';
import { compose, getContext } from 'recompose';

import styled from '@ui/styled';
import { withTheme } from '@ui/theme';
import { UIText } from '@ui/typography';

const StyledText = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit / 4,
  width: '100%',
}))(UIText);

const enhance = compose(
  getContext({ isLoading: PropTypes.bool }),
  withTheme(),
);

const Paragraph = enhance(({
  isLoading,
  theme,
  children,
  ...props
}) => (
  <Placeholder.Paragraph
    width={'100%'}
    lineNumber={3}
    textSize={theme.helpers.rem(1.4)}
    onReady={!isLoading}
  >
    <StyledText {...props}>{children}</StyledText>
  </Placeholder.Paragraph>
));

export default Paragraph;
