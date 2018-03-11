import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Touchable from '@ui/Touchable';
import WebBrowser from '@ui/WebBrowser';

import { matchPath } from './';

export const goBackTo = ({ to, history, replace = false }) => {
  let foundMatchingEntry = false;
  let distance = -1;

  if (get(history, 'location.pathname') === to) return true;
  if (to && history.entries) {
    const routeToPopTo = history.entries.findIndex(location => matchPath(location.pathname, to));
    if (routeToPopTo >= 0 && routeToPopTo < history.index) {
      foundMatchingEntry = true;
      distance = routeToPopTo - history.index;
    }
  }

  if (foundMatchingEntry || !replace) {
    return history.go(distance);
  }
  return history.replace(to);
};

export default class Link extends PureComponent {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        entries: PropTypes.array,
        index: PropTypes.number,
        go: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static propTypes = {
    onPress: PropTypes.func,
    component: PropTypes.func,
    replace: PropTypes.bool,
    pop: PropTypes.bool,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  };

  static defaultProps = {
    onPress() {},
    component: Touchable,
    replace: false,
    to: null,
    pop: false,
  };

  handlePress = (event) => {
    if (this.props.onPress) this.props.onPress(event);

    const { history } = this.context.router;
    const { to, replace, pop } = this.props;

    if (!to && !pop) return null;

    // handle web links
    if (to && to.indexOf('http') > -1) {
      return WebBrowser.openBrowserAsync(to);
    }

    if (pop) {
      return goBackTo({ to, history, replace });
    } else if (replace && to) {
      return history.replace(to);
    }

    return history.push(to);
  };

  render() {
    const {
      component: Comp, to, replace, pop, ...rest
    } = this.props;

    return <Comp {...rest} onPress={this.handlePress} />;
  }
}
