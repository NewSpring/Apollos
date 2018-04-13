import { Component } from 'react';
import PropTypes from 'prop-types';
import { get, every } from 'lodash';
import { pick, mapValues, flow } from 'lodash/fp';
import { compose } from 'recompose';

import { withTheme } from '@ui/theme';
import withWindow from './withWindow';
import queryMatcher from './queryMatcher';

const supportedMediaQueryTypes = {
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  minDeviceAspectRatio: PropTypes.string,
  maxDeviceAspectRatio: PropTypes.string,
};

// <MediaQuery maxWidth="md" minWidth="sm">I render on screens sm to md</MediaQuery>
// <MediaQuery maxWidth="xs">I render only on xs screens</MediaQuery>
// <MediaQuery minWidth="md">I render on screens md or above</MediaQuery>
class MediaQuery extends Component {
  static propTypes = {
    ...supportedMediaQueryTypes,
    children: PropTypes.node,

    // These props are passed in through HOCs (withTheme and withWindow)
    breakpoints: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
    }),
    window: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }).isRequired,
  };

  static defaultProps = {
    ...mapValues(supportedMediaQueryTypes, () => null),
    breakpoints: {},
  };

  get shouldBeVisible() {
    const mediaQuery = flow(
      pick(Object.keys(supportedMediaQueryTypes)),
      mapValues(breakpoint => get(this.props.breakpoints, breakpoint)),
    )(this.props);

    const { window: { width, height } } = this.props; // destructuring just to make below line clean
    return every(mediaQuery, queryMatcher({ width, height }));
  }

  render() {
    return this.shouldBeVisible ? this.props.children : null;
  }
}

export default compose(
  withTheme(({ theme: { breakpoints } = {} } = {}) => ({ breakpoints })),
  withWindow,
)(MediaQuery);
