import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import styled from '@ui/styled';
import { BodyCopy } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.oneOfType([
      /*
       * There is no way to type check against none text nodes but expect problems if you try to
       * pass something other than a string or text elements (this includes children of children).
       */
      PropTypes.string,
      PropTypes.node,
    ]),
  }),
);

const Block = styled(({ theme }) => ({
  alignSelf: 'stretch',
  marginVertical: theme.sizing.baseUnit * 2,
  paddingVertical: theme.sizing.baseUnit * 1.5,
  paddingHorizontal: theme.sizing.baseUnit,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderColor: theme.colors.text.tertiary,
}))(View);

const Quote = styled({
  textAlign: 'center',
})(BodyCopy);

const BlockQuote = enhance(({
  children,
}) => (
  <Block>
    <Quote italic>{children}</Quote>
  </Block>
));

export default BlockQuote;
