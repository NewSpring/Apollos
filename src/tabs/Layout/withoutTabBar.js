import React, { PureComponent } from 'react';
import {
  getContext,
  compose,
} from 'recompose';
import PropTypes from 'prop-types';

const withHideTabBar = compose(
  getContext({
    setHideTabBar: PropTypes.func,
  }),
);

export default Component => withHideTabBar(class withoutTabBar extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    setHideTabBar: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    setHideTabBar() {},
  };

  componentWillMount() {
    this.props.setHideTabBar(true);
  }

  componentWillUnmount() {
    this.props.setHideTabBar(false);
  }

  render() {
    return (<Component {...this.props} />);
  }
});
