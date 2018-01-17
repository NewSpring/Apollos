import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { compose, withProps, mapProps } from 'recompose';
import { get, findIndex } from 'lodash';
import { shuffle } from 'shuffle-seed';
import Audio from '@ui/Audio';
import { withMediaPlayerActions, withNowPlaying, withPlaylist } from '@data/mediaPlayer';
import FlexedView from '@ui/FlexedView';
import Touchable from '@ui/Touchable';
import MiniControls from './MiniControls';
import FullScreenControls from './FullScreenControls';

const MINI_CONTROL_HEIGHT = 50;

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
      let tracks = get(content, 'content.tracks', []);
      if (!tracks.length) return;
      if (nowPlaying.isShuffling) tracks = shuffle(tracks, nowPlaying.isShuffling);

      const currentTrack = get(nowPlaying, 'currentTrack.file');
      const currentTrackIndex = findIndex(tracks, track => track.file === currentTrack);
      const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;

      setNowPlaying({ albumId: nowPlaying.albumId, currentTrack: tracks[nextTrackIndex] });
    },
    playPrevTrack: () => {
      let tracks = get(content, 'content.tracks', []);
      if (!tracks.length) return;
      if (nowPlaying.isShuffling) tracks = shuffle(tracks, nowPlaying.isShuffling);

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
    isRepeating: PropTypes.bool,
    isShuffling: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    repeat: PropTypes.func,
    shuffle: PropTypes.func,
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

  handleEndReached = async (sound) => {
    if (!this.props.isRepeating) return this.props.playNextTrack();
    return sound.replayAsync();
  }

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
          onPlaybackReachedEnd={this.handleEndReached}
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
            isRepeating={this.props.isRepeating}
            isShuffling={this.props.isShuffling}
            handleRepeat={this.props.repeat}
            handleShuffle={this.props.shuffle}
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
