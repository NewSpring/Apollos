import React, { Component } from 'react';
import {
  Router,
} from 'react-router';
import PropTypes from 'prop-types';
import createHistory from './createHistory';

export default class NativeWebRouter extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    web: PropTypes.shape({
      basename: PropTypes.string,
      forceRefresh: PropTypes.bool,
      getUserConfirmation: PropTypes.func,
      keyLength: PropTypes.number,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    native: PropTypes.shape({
      initialEntries: PropTypes.array,
      initialIndex: PropTypes.number,
      getUserConfirmation: PropTypes.func,
      keyLength: PropTypes.number,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    history: PropTypes.any,
    children: PropTypes.node,
  };

  static defaultProps = {
    web: {},
    native: {},
    history: createHistory(this.props),
    children: null,
  }

  render() {
    return (
      <Router
        history={this.props.history}
      >
        {this.props.children}
      </Router>
    );
  }
}

