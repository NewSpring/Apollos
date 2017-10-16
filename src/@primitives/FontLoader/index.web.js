import { Component } from 'react';
import PropTypes from 'prop-types';
import { FONT_DIRECTORY } from '../constants';

export default class FontLoader extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  constructor() {
    super();
    import(FONT_DIRECTORY);
  }

  render() {
    return this.props.children;
  }
}
