import React from 'react';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback } from 'react-native';
import { withMediaPlayerActions } from '@data/mediaPlayer';

import WebView from './WebView';

const enhance = compose(
  pure,
  withMediaPlayerActions,
  setPropTypes({
    src: PropTypes.string,
  }),
);

const buildSourceObject = source => ({ uri: source });

const EmbeddedVideoPlayer = enhance(({
  src,
  pause: pauseAppAudio,
  ...otherProps
}) => (
  <TouchableWithoutFeedback onPress={pauseAppAudio} style={{ flex: 1 }}>
    <WebView
      source={buildSourceObject(src)}
      mediaPlaybackRequiresUserAction={false}
      allowsInlineMediaPlayback
      bounces={false}
      scrollEnabled={false}
      {...otherProps}
    />
  </TouchableWithoutFeedback>
));

export default EmbeddedVideoPlayer;
