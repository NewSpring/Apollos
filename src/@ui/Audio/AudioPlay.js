import React, { PureComponent } from 'react';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import onlyPropTypes from '@utils/onlyPropTypes';

export class AudioPlay extends PureComponent {
  static propTypes = {
    play: PropTypes.func.isRequired,
  };

  render() {
    const {
      play,
      ...otherProps
    } = this.props;

    return (
      <TouchableHighlight
        onPress={play}
        {...otherProps}
      />
    );
  }
}

const enhance = compose(
  getContext({
    play: PropTypes.func,
  }),
  onlyPropTypes,
);

export default enhance(AudioPlay);
