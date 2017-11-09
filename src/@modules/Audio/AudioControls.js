import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import Play from '../../@primitives/icons/Play';
import Pause from '../../@primitives/icons/Pause';
import onlyPropTypes from '../../@utils/onlyPropTypes';

export class AudioControls extends PureComponent {
  static propTypes = {
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
  };

  render() {
    const {
      onPlay,
      onPause,
      isPlaying,
      ...otherProps
    } = this.props;
    return (
      <TouchableOpacity
        onPress={isPlaying ? onPause : onPlay}
        {...otherProps}
      >
        <View>
          {isPlaying ? <Pause /> : <Play />}
        </View>
      </TouchableOpacity>
    );
  }
}

const enhance = compose(
  onlyPropTypes,
);

export default enhance(AudioControls);
