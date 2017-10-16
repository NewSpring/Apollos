import { Component } from 'react';
import PropTypes from 'prop-types';

export default class FontLoader extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  constructor() {
    super();
    require('../../assets/fonts');
  }

  render() {
    return this.props.children;
  }
}
