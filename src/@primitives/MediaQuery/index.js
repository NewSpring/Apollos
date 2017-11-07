import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { compose } from 'recompose';

import withTheme from '../withTheme';
import withWindow from './withWindow';

export { withWindow };
export { default as branch, renderOnLargerScreens } from './branch';

// <MediaQuery max="md" min="sm">I render on screens sm to md</MediaQuery>
// <MediaQuery max="xs">I render only on xs screens</MediaQuery>
// <MeediaQuery min="md">I render on screens md or above</MediaQuery>
class MediaQuery extends Component {
  static propTypes = {
    min: PropTypes.string,
    max: PropTypes.string,
    breakpoints: PropTypes.shape({
      xs: PropTypes.number.isRequired,
      sm: PropTypes.number.isRequired,
      md: PropTypes.number.isRequired,
      lg: PropTypes.number.isRequired,
    }).isRequired,
    window: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }).isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    min: null,
    max: null,
    children: null,
  };

  get shouldBeVisible() {
    const {
      breakpoints, min, max, window: { width },
    } = this.props;
    const minSelector = get(breakpoints, min, 0);
    const maxSelector = get(breakpoints, max, 0);
    return (minSelector ? width > minSelector : true) &&
      (maxSelector ? width < maxSelector : true);
  }

  render() {
    return this.shouldBeVisible ? this.props.children : null;
  }
}

export default compose(
  withTheme(({ theme: { breakpoints } }) => ({ breakpoints })),
  withWindow,
)(MediaQuery);
