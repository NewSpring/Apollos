import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Animated, StyleSheet } from 'react-native';
import { compose, withProps, mapProps } from 'recompose';
import { get, findIndex } from 'lodash';
import Audio from '@ui/Audio';
import { withMediaPlayerActions, withNowPlaying, withPlaylist } from '@data/mediaPlayer';
import FlexedView from '@ui/FlexedView';
import SafeAreaView from '@ui/SafeAreaView';
import Touchable from '@ui/Touchable';
import styled from '@ui/styled';
import { withTheme } from '@ui/theme';
import MiniControls from './MiniControls';

const MINI_CONTROL_HEIGHT = 50;

const FullScreenContainer = styled(() => ({
  height: Dimensions.get('window').height,
  backgroundColor: 'red',
}))(View);

const Spacer = styled({ height: MINI_CONTROL_HEIGHT })(View);

const animatedStyles = StyleSheet.create({
  positioner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const BackgroundAnimator = compose(
  withTheme(),
  mapProps(({ driver, color, theme, children }) => ({
    style: {
      backgroundColor: driver.interpolate({
        inputRange: [0, 1],
        outputRange: [
          theme.colors.background.default,
          color || theme.colors.background.default,
        ],
      }),
    },
    children,
  })),
)(Animated.View);

const enhance = compose(
  withMediaPlayerActions,
  withNowPlaying,
  withProps(({ nowPlaying }) => ({ id: nowPlaying && nowPlaying.albumId })),
  withPlaylist,
  mapProps(({
    nowPlaying, content, setNowPlaying, ...otherProps
  }) => ({
    ...otherProps,
    title: get(content, 'title'),
    ...(nowPlaying || {}),
    ...get(content, 'content', {}),
    playNextTrack: () => {
      const tracks = get(content, 'content.tracks', []);
      if (!tracks.length) return;

      const currentTrack = get(nowPlaying, 'currentTrack.file');
      const currentTrackIndex = findIndex(tracks, track => track.file === currentTrack);
      const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
      setNowPlaying({ albumId: nowPlaying.albumId, currentTrack: tracks[nextTrackIndex] });
    },
  })),
);

const trackType = PropTypes.shape({
  title: PropTypes.string,
  file: PropTypes.string,
});

export class DockableMediaPlayer extends PureComponent { // eslint-disable-line
  static propTypes = {
    play: PropTypes.func,
    pause: PropTypes.func,
    isPlaying: PropTypes.bool,
    currentTrack: trackType,
    title: PropTypes.string,
    images: PropTypes.any, // eslint-disable-line
    colors: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })), // eslint-disable-line
    children: PropTypes.node,
    playNextTrack: PropTypes.func,
  };

  get primaryColor() {
    const { colors } = this.props;
    if (!colors || !colors.length) return null;
    return `#${colors[0].value}`;
  }

  positionerDriver = new Animated.Value(0);

  expand = () => {
    Animated.spring(this.positionerDriver, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  contract = () => {
    Animated.spring(this.positionerDriver, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  renderPlayer() {
    const { height } = Dimensions.get('window');
    const translateY = this.positionerDriver.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    });
    const transform = [{ translateY }];

    return (
      <Animated.View style={[animatedStyles.positioner, { transform }]}>
        <Audio
          source={this.props.currentTrack.file}
          isPlaying={this.props.isPlaying}
          onPlaybackReachedEnd={this.props.playNextTrack}
        >
          <BackgroundAnimator driver={this.positionerDriver} color={this.primaryColor}>
            <SafeAreaView>
              <Touchable onPress={this.expand}>
                <MiniControls
                  isPlaying={this.props.isPlaying}
                  play={this.props.play}
                  pause={this.props.pause}
                  skip={this.props.playNextTrack}
                  trackName={this.props.currentTrack.title}
                  trackByLine={this.props.title}
                  albumArt={this.props.images}
                  height={MINI_CONTROL_HEIGHT}
                />
              </Touchable>
              <FullScreenContainer />
            </SafeAreaView>
          </BackgroundAnimator>
        </Audio>
      </Animated.View>
    );
  }

  render() {
    return (
      <FlexedView>
        <FlexedView>{this.props.children}</FlexedView>
        {this.props.currentTrack ? <SafeAreaView><Spacer /></SafeAreaView> : null}
        {this.props.currentTrack ? this.renderPlayer() : null}
      </FlexedView>
    );
  }
}

export default enhance(DockableMediaPlayer);
