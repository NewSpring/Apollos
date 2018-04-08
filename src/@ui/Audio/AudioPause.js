import React, { PureComponent } from 'react';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import onlyPropTypes from '@utils/onlyPropTypes';

export class AudioPause extends PureComponent {
  static propTypes = {
    pause: PropTypes.func.isRequired,
  };

  render() {
    const {
      pause,
      ...otherProps
    } = this.props;

    return (
      <TouchableHighlight
        onPress={pause}
        {...otherProps}
      />
    );
  }
}

const enhance = compose(
  getContext({
    pause: PropTypes.func,
  }),
  onlyPropTypes,
);

export default enhance(AudioPause);
