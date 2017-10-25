import { Component } from 'react';
import { Font } from 'expo';
import PropTypes from 'prop-types';
import FONTS from '../../assets/fonts';

export default class FontLoader extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  constructor() {
    super();

    this.loadFonts();
  }

  state = {
    isLoading: true,
  };

  async loadFonts() {
    try {
      await Promise.all(FONTS.map(({ name, asset }) => (
        Font.loadAsync({
          [name]: asset,
        })
      )));

      this.setState({
        isLoading: false,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? null : this.props.children;
  }
}
