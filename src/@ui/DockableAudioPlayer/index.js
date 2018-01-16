import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, View, Animated, StyleSheet, Easing } from 'react-native';
import { compose, withProps, mapProps } from 'recompose';
import { get, findIndex } from 'lodash';
import Audio from '@ui/Audio';
import { withMediaPlayerActions, withNowPlaying, withPlaylist } from '@data/mediaPlayer';
import FlexedView from '@ui/FlexedView';
import SafeAreaView from '@ui/SafeAreaView';
import Touchable from '@ui/Touchable';
import styled from '@ui/styled';
import MiniControls from './MiniControls';
import FullScreenControls from './FullScreenControls';

const MINI_CONTROL_HEIGHT = 50;

const FullScreenContainer = styled(() => ({
  height: Dimensions.get('window').height,
  backgroundColor: 'red',
}))(View);

const Spacer = styled({ height: MINI_CONTROL_HEIGHT })(View);

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
    playPrevTrack: () => {
      const tracks = get(content, 'content.tracks', []);
      if (!tracks.length) return;

      const currentTrack = get(nowPlaying, 'currentTrack.file');
      const currentTrackIndex = findIndex(tracks, track => track.file === currentTrack);
      let nextTrackIndex = (currentTrackIndex - 1);
      if (nextTrackIndex < 0) nextTrackIndex = tracks.length - 1;
      setNowPlaying({ albumId: nowPlaying.albumId, currentTrack: tracks[nextTrackIndex] });
    },
  })),
);

const trackType = PropTypes.shape({
  title: PropTypes.string,
  file: PropTypes.string,
  duration: PropTypes.string,
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
    playPrevTrack: PropTypes.func,
    artist: PropTypes.string,
  };

  static defaultProps = {
    artist: 'NewSpring',
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
      bounciness: 2,
    }).start();
  }

  contract = () => {
    Animated.spring(this.positionerDriver, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 2,
    }).start();
  }

  renderMiniControls() {
    return (
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
    );
  }

  renderPlayer() {
    const { height } = Dimensions.get('window');
    const translateY = this.positionerDriver.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    });
    const transform = [{ translateY }];

    return (
      <Animated.View style={[StyleSheet.absoluteFill, { transform }]}>
        <Audio
          source={this.props.currentTrack.file}
          isPlaying={this.props.isPlaying}
          onPlaybackReachedEnd={this.props.playNextTrack}
          style={StyleSheet.absoluteFill}
        >
          <FullScreenControls
            isPlaying={this.props.isPlaying}
            play={this.props.play}
            pause={this.props.pause}
            next={this.props.playNextTrack}
            prev={this.props.playPrevTrack}
            trackName={this.props.currentTrack.title}
            trackByLine={`${this.props.artist} - ${this.props.title}`}
            albumArt={this.props.images}
            color={this.primaryColor}
            handleClose={this.contract}
            duration={this.props.currentTrack.duration}
          />
        </Audio>
      </Animated.View>
    );
  }

  render() {
    return (
      <FlexedView>
        <FlexedView>{this.props.children}</FlexedView>
        {this.props.currentTrack ? this.renderMiniControls() : null}
        {this.props.currentTrack ? this.renderPlayer() : null}
      </FlexedView>
    );
  }
}

export default enhance(DockableMediaPlayer);
