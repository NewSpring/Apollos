import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Touchable from '@ui/Touchable';
import { matchPath } from './';

export const goBackTo = ({ to, history, replace = false }) => {
  let foundMatchingEntry = false;
  let distance = -1;
  if (to && history.entries) {
    const routeToPopTo = history.entries.findIndex(location =>
      matchPath(location.pathname, to),
    );
    if (routeToPopTo >= 0 && routeToPopTo < history.index) {
      foundMatchingEntry = true;
      distance = routeToPopTo - history.index;
    }
  }

  if (foundMatchingEntry || !replace) {
    history.go(distance);
  } else {
    history.replace(to);
  }
};

export default class Link extends Component {
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
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
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

    if (pop) {
      return goBackTo({ to, history });
    } else if (replace && to) {
      return history.replace(to);
    }

    return history.push(to);
  }

  render() {
    const {
      component: Comp,
      to,
      replace,
      pop,
      ...rest
    } = this.props;

    return <Comp {...rest} onPress={this.handlePress} />;
  }
}
