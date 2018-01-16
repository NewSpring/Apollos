import { createElement } from 'react-native-web';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  iframe: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  noScroll: {
    overflow: 'hidden',
  },
});


const WebView = ({
  source,
  onLoad,
  scrollEnabled,
  allowFullScreen = true,
  style = {},
}) => (
  createElement('iframe', {
    src: source.uri,
    allowFullScreen,
    frameBorder: '0',
    seamless: true,
    scrolling: scrollEnabled,
    style: [
      !scrollEnabled ? styles.noScroll : {},
      styles.iframe,
      style,
    ],
    onLoad,
  })
);

WebView.propTypes = {
  source: PropTypes.shape({ uri: PropTypes.string }),
  onLoad: PropTypes.func,
  scrollEnabled: PropTypes.bool,
  allowsInlineMediaPlayback: PropTypes.bool,
  allowFullScreen: PropTypes.bool,
  style: PropTypes.any, // eslint-disable-line
};

export default WebView;
