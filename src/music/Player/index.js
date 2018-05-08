import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { compose, withProps, withPropsOnChange } from 'recompose';
import { get, findIndex } from 'lodash';
import { shuffle } from 'shuffle-seed';
import Audio from '@ui/Audio';
import { withMediaPlayerActions, withNowPlaying } from '@data/mediaPlayer';
import BackgroundView from '@ui/BackgroundView';
import CardStack from '@ui/CardStack';
import { asModal } from '@ui/ModalView';
import { withRouter, Link, Route } from '@ui/NativeWebRouter';
import ConnectedImage from '@ui/ConnectedImage';
import MiniControls from './MiniControls';
import FullScreenControls from './FullScreenControls';
import TrackContextual from '../TrackContextual';
import Playlist from '../Playlist';

const PlayerTrackContextual = withProps({
  pathForAlbumId: id => `/player/list/${id}`,
})(TrackContextual);

const enhance = compose(
  withRouter,
  withMediaPlayerActions,
  withNowPlaying,
  withPropsOnChange(
    ['nowPlaying', 'playlist', 'setNowPlaying', 'children'],
    ({ nowPlaying, setNowPlaying, ...otherProps }) => ({
      ...otherProps,
      ...(nowPlaying || {}),
      ...get(nowPlaying, 'playlist', {}),

      // todo: these props should probably be moved to the data HOC "withMediaPlayerActions"
      playNextTrack: () => {
        const playlist = get(nowPlaying, 'playlist', {});
        let tracks = get(playlist, 'tracks', []);
        if (!tracks.length) return;
        if (nowPlaying.isShuffling) tracks = shuffle(tracks, nowPlaying.isShuffling);

        const currentTrack = get(nowPlaying, 'currentTrack.file');
        const currentTrackIndex = findIndex(tracks, track => track.file === currentTrack);
        const nextTrackIndex = (currentTrackIndex + 1) % tracks.length;

        setNowPlaying({ id: nowPlaying.id, currentTrack: tracks[nextTrackIndex] });
      },
      playPrevTrack: () => {
        const playlist = get(nowPlaying, 'playlist', {});
        let tracks = get(playlist, 'tracks', []);
        if (!tracks.length) return;
        if (nowPlaying.isShuffling) tracks = shuffle(tracks, nowPlaying.isShuffling);

        const currentTrack = get(nowPlaying, 'currentTrack.file');
        const currentTrackIndex = findIndex(tracks, track => track.file === currentTrack);
        let nextTrackIndex = currentTrackIndex - 1;
        if (nextTrackIndex < 0) nextTrackIndex = tracks.length - 1;

        setNowPlaying({ id: nowPlaying.id, currentTrack: tracks[nextTrackIndex] });
      },
    }),
  ),
);

const trackType = PropTypes.shape({
  title: PropTypes.string,
  file: PropTypes.string,
  duration: PropTypes.string,
});

export class DockableMediaPlayer extends PureComponent {
  // eslint-disable-line
  static propTypes = {
    id: PropTypes.string,
    playerPath: PropTypes.string,
    play: PropTypes.func,
    pause: PropTypes.func,
    stop: PropTypes.func,
    isPlaying: PropTypes.bool,
    currentTrack: trackType,
    playlist: PropTypes.shape({
      title: PropTypes.string.isRequired,
      images: ConnectedImage.propTypes.source.isRequired,
      colors: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
      tracks: PropTypes.arrayOf(trackType),
    }),
    title: PropTypes.string,
    images: PropTypes.any, // eslint-disable-line
    colors: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })), // eslint-disable-line
    isLight: PropTypes.bool,
    children: PropTypes.node,
    playNextTrack: PropTypes.func,
    playPrevTrack: PropTypes.func,
    artist: PropTypes.string,
    isRepeating: PropTypes.bool,
    isShuffling: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
    repeat: PropTypes.func,
    shuffle: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  };

  static defaultProps = {
    artist: 'NewSpring',
    playerPath: '/player',
    play() {},
    pause() {},
    stop() {},
  };

  constructor(props) {
    super(props);

    this.previousLocation = null;
    this.miniControlHeight = 50;
    this.state = {
      showMiniControls: true,
    };
  }

  componentWillMount() {
    if (!this.previousLocation) this.previousLocation = this.props.location;
  }

  componentWillReceiveProps(nextProps) {
    const isPlayingChanged = this.props.isPlaying !== nextProps.isPlaying;
    const hasTrack = !!nextProps.currentTrack;

    if (isPlayingChanged && hasTrack) {
      this.setState({
        showMiniControls: true,
      });
    } else if (isPlayingChanged && !hasTrack) {
      this.setState({
        showMiniControls: false,
      });
    }
  }

  get primaryColor() {
    const { colors } = this.props;
    if (!colors || !colors.length) return null;
    return `#${colors[0].value}`;
  }

  handleEndReached = async (sound) => {
    if (!this.props.isRepeating) return this.props.playNextTrack();
    return sound.replayAsync();
  };

  handleMiniPlayerDismiss = () => {
    this.props.stop();
  };

  handlePlayerError = () => {
    this.props.pause(); // todo: show some UI indication, this is likely a network error
  };

  renderMiniControls() {
    let miniControls = null;
    if (this.state.showMiniControls && this.props.currentTrack) {
      miniControls = (
        <Link to={this.props.playerPath}>
          <View>
            <MiniControls
              isPlaying={this.props.isPlaying}
              play={this.props.play}
              pause={this.props.pause}
              dismiss={this.handleMiniPlayerDismiss}
              trackName={this.props.currentTrack.title}
              trackByLine={this.props.title}
              albumArt={this.props.images}
              height={this.miniControlHeight}
            />
          </View>
        </Link>
      );
    }

    return miniControls;
  }

  renderPlayer = () => (
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
      isLight={this.props.isLight}
      handleClose={this.contract}
      duration={this.props.currentTrack.duration}
      isRepeating={this.props.isRepeating}
      isShuffling={this.props.isShuffling}
      handleRepeat={this.props.repeat}
      handleShuffle={this.props.shuffle}
      trackInfoLink={`player/${this.props.id}/${this.props.currentTrack.title}`}
      playlist={this.props.playlist}
    />
  );

  render() {
    return (
      <Audio
        source={this.props.currentTrack && this.props.currentTrack.file}
        isPlaying={this.props.isPlaying}
        onPlaybackReachedEnd={this.handleEndReached}
        onError={this.handlePlayerError}
        style={StyleSheet.absoluteFill}
      >
        <CardStack direction="vertical">
          <Route exact path={'/player'} render={this.renderPlayer} />
          <Route exact path={'/player/list/:id'} component={asModal(Playlist)} />
          <Route exact path={'/player/:id/:track'} component={PlayerTrackContextual} />
          <Route cardStackKey="app">
            <BackgroundView>
              {this.props.children}
              {this.renderMiniControls()}
            </BackgroundView>
          </Route>
        </CardStack>
      </Audio>
    );
  }
}

export default enhance(DockableMediaPlayer);
