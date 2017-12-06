import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
} from 'react-native';
import { matchPath } from './';

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
    component: TouchableWithoutFeedback,
    replace: false,
    to: null,
    pop: false,
  };

  handlePress = (event) => {
    this.props.onPress(event);

    const { history } = this.context.router;
    const { to, replace, pop } = this.props;

    if (pop) {
      let distance = -1;
      if (to && history.entries) {
        const routeToPopTo = history.entries.findIndex(location =>
          matchPath(location.pathname, to),
        );
        if (routeToPopTo && routeToPopTo < history.index) {
          distance = routeToPopTo - history.index;
        }
      }
      history.go(distance);
    } else if (replace && to) {
      history.replace(to);
    } else {
      history.push(to);
    }
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
