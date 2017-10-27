import React, { PureComponent } from 'react';
import getContext from 'recompose/getContext';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Seeker from '../../@primitives/Seeker';

export class VideoSeeker extends PureComponent {
  static propTypes = {
    seek: PropTypes.func.isRequired,
    seekingHandler: PropTypes.func,
    progress: PropTypes.number,
    component: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    seekingHandler() {},
    progress: 0,
    component: Seeker,
  };

  render() {
    const {
      seek,
      seekingHandler,
      progress,
      component: Component,
      ...otherProps
    } = this.props;

    return (
      <Component
        progress={progress}
        onSeek={seek}
        onSeeking={seekingHandler}
        {...otherProps}
      />
    );
  }
}

const enhance = compose(
  getContext({
    seek: PropTypes.func,
    progress: PropTypes.number,
    seekingHandler: PropTypes.func,
  }),
);

export default enhance(VideoSeeker);
