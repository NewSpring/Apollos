import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import {
  Router,
} from 'react-router';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';

export default class NativeWebRouter extends Component {
  static propTypes = {
    web: PropTypes.shape({
      basename: PropTypes.string,
      forceRefresh: PropTypes.bool,
      getUserConfirmation: PropTypes.func,
      keyLength: PropTypes.number,
    }),
    native: PropTypes.shape({
      initialEntries: PropTypes.array,
      initialIndex: PropTypes.number,
      getUserConfirmation: PropTypes.func,
      keyLength: PropTypes.number,
    }),
    children: PropTypes.node,
  };

  static defaultProps = {
    web: {},
    native: {},
    children: null,
  }

  createHistory = () => (Platform.OS === 'web' ? createBrowserHistory(this.props.web) : createMemoryHistory(this.props.native));

  history = this.createHistory();

  render() {
    return (
      <Router
        history={this.history}
      >
        {this.props.children}
      </Router>
    );
  }
}

