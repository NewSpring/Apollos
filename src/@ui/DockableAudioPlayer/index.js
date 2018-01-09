import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, mapProps } from 'recompose';
import { get, findIndex } from 'lodash';
import Audio from '@ui/Audio';
import { withMediaPlayerActions, withNowPlaying, withPlaylist } from '@data/mediaPlayer';
import FlexedView from '@ui/FlexedView';
import MiniControls from './MiniControls';

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

  renderPlayer() {
    return (
      <Audio
        source={this.props.currentTrack.file}
        isPlaying={this.props.isPlaying}
        onPlaybackReachedEnd={this.props.playNextTrack}
      >
        <MiniControls
          isPlaying={this.props.isPlaying}
          play={this.props.play}
          pause={this.props.pause}
          skip={this.props.playNextTrack}
          trackName={this.props.currentTrack.title}
          trackByLine={this.props.title}
          albumArt={this.props.images}
        />
      </Audio>
    );
  }

  render() {
    return (
      <FlexedView>
        <FlexedView>{this.props.children}</FlexedView>
        {this.props.currentTrack ? this.renderPlayer() : null}
      </FlexedView>
    );
  }
}

export default enhance(DockableMediaPlayer);
