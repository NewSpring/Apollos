import React, { PureComponent } from 'react';
import { Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import ScreenOrientation from '@utils/orientation';
import Video from '@ui/VideoPlayer';
import FlexedView from '@ui/FlexedView';

class VideoPlayer extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    ...Video.propTypes,
  };

  componentWillMount() {
    if (Platform.OS === 'web') return; // don't care about this stuff on web
    Dimensions.addEventListener('change', this.handleOrientationSwitch);
  }

  componentWillUnmount() {
    if (Platform.OS === 'web') return; // don't care about this stuff on web
    Dimensions.removeEventListener('change', this.handleOrientationSwitch);
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  handleOrientationSwitch = ({ window: { width, height } }) => {
    const isLandscape = width > height;
    if (this.isLandscape !== isLandscape) {
      if (isLandscape) {
        this.goFullscreen();
      } else {
        this.exitFullscreen();
      }
    }
    this.isLandscape = isLandscape;
  }

  goFullscreen = () => {
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
    this.video.presentFullscreenPlayer();
    this.video.playAsync();
  }

  exitFullscreen = () => {
    this.video.dismissFullscreenPlayer();
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    const { src, ...otherProps } = this.props;
    return (
      <FlexedView>
        <Video
          videoRef={(r) => { this.video = r; }}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          source={{ uri: src }}
          useNativeControls={false}
          {...otherProps}
        />
      </FlexedView>
    );
  }
}

export default VideoPlayer;
