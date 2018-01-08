import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { compose, setPropTypes } from 'recompose';
import Placeholder from 'rn-placeholder';

import withScripture from '@data/withScripture';
import { H4, H7 } from '@ui/typography';

import ScriptureHTMLView from './ScriptureHTMLView';

const enhance = compose(
  setPropTypes({ query: PropTypes.string }),
);

export const ItemWithoutData = enhance(({ query, content: { html = '' } = {}, isLoading }) => (
  <View>
    <Text> {/* wrapping text element provides unified baseline */}
      <H4>{query}</H4>{' '}<H7>ESV</H7>
    </Text>
    <Placeholder.Paragraph
      lineNumber={5}
      onReady={!isLoading}
      lastLineWidth="60%"
      firstLineWidth="40%"
    >
      <ScriptureHTMLView>{html}</ScriptureHTMLView>
    </Placeholder.Paragraph>
  </View>
));

const withData = compose(
  withScripture,
  setPropTypes({ // provided by withScripture HOC
    content: PropTypes.shape({ html: PropTypes.string }),
    isLoading: PropTypes.bool,
  }),
);

export default withData(ItemWithoutData);
