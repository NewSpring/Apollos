import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

import WebView from './WebView';

const enhance = compose(
  pure,
  setPropTypes({
    src: PropTypes.string,
  }),
);

const buildSourceObject = source => ({ uri: source });

const EmbeddedVideoPlayer = enhance(({
  src,
  ...otherProps
}) => (
  <WebView
    source={buildSourceObject(src)}
    mediaPlaybackRequiresUserAction={false}
    allowsInlineMediaPlayback
    bounces={false}
    scrollEnabled={false}
    {...otherProps}
  />
));

export default EmbeddedVideoPlayer;
