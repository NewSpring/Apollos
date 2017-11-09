import { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { compose } from 'recompose';

import withTheme from '../withTheme';
import withWindow from './withWindow';

export { withWindow };
export { default as enhancer } from './enhancer';

// <MediaQuery max="md" min="sm">I render on screens sm to md</MediaQuery>
// <MediaQuery max="xs">I render only on xs screens</MediaQuery>
// <MeediaQuery min="md">I render on screens md or above</MediaQuery>
class MediaQuery extends Component {
  static propTypes = {
    min: PropTypes.string,
    max: PropTypes.string,
    children: PropTypes.node,

    // These props are passed in through HOCs (withTheme and withWindow)
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

    const passesMinWidthRule = minSelector && width > minSelector;
    const passesMaxWidthRule = maxSelector && width < maxSelector;
    return passesMaxWidthRule && passesMinWidthRule;
  }

  render() {
    return this.shouldBeVisible ? this.props.children : null;
  }
}

export default compose(
  withTheme(({ theme: { breakpoints } }) => ({ breakpoints })),
  withWindow,
)(MediaQuery);
