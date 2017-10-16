import { Component } from 'react';
import { Font } from 'expo';
// import { FONT_DIRECTORY } from '../constants';
// const FONTS = require(FONT_DIRECTORY);
import FONTS from '../../assets/fonts';

export default class FontLoader extends Component {
  constructor() {
    super();

    this.loadFonts();
  }

  loadFonts() {
    // const FONTS = require(FONT_DIRECTORY);
    FONTS.forEach((font) => {
      Font.loadAsync({
        [font]: require(`../../assets/fonts/${font}`),
      });
    });
  }

  render() {
    return this.props.children;
  }
}
