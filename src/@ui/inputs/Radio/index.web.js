import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

export default class Radio extends Component {
  static propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  static Button = RadioButton;

  getChildContext() {
    return {
      name: this.props.name,
    };
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}
