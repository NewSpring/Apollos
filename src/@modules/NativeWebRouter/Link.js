import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
} from 'react-native';

export default class Link extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  static propTypes = {
    onPress: PropTypes.func,
    component: PropTypes.func,
    replace: PropTypes.bool,
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
  };

  handlePress = (event) => {
    this.props.onPress(event);

    const { history } = this.context.router;
    const { to, replace } = this.props;

    if (replace && to) {
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
      ...rest
    } = this.props;

    return <Comp {...rest} onPress={this.handlePress} />;
  }
}
