import React from 'react';
import { compose, pure, setPropTypes, withProps } from 'recompose';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import styled from '@ui/styled';
import { withThemeMixin } from '@ui/theme';
import { BodyCopy } from '@ui/typography';

const enhance = compose(
  pure,
  setPropTypes({
    children: PropTypes.node,
  }),
);

const Block = compose(
  styled(({ theme }) => ({
    alignSelf: 'stretch',
    marginVertical: theme.sizing.baseUnit * 2,
    paddingVertical: theme.sizing.baseUnit * 1.5,
    paddingHorizontal: theme.sizing.baseUnit,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.text.tertiary,
  })),
  // Forced <BodyCopy> to inherit QuoteText styles.
  // This is necessary for HTMLView to properly style <blockquote>'s 😥
  withThemeMixin(({ theme }) => ({
    overrides: {
      BodyCopy: {
        fontFamily: theme.typography.fontFamilySerif.regular.italic,
        textAlign: 'center',
      },
    },
  })),
)(View);

const BlockQuote = enhance(({
  children,
}) => (
  <Block>
    {typeof children === 'string' ? <BodyCopy>{children}</BodyCopy> : children}
  </Block>
));

export default BlockQuote;
