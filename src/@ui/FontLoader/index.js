import {
  StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppLoading } from 'expo';
import FONTS from 'assets/fonts';
import * as Font from './Font';

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

  componentWillMount() {
    // NOTE: This is an experimental feature but is currently
    // shadowing what expo does to get fontFamilies working

    // eslint-disable-next-line no-console
    console.disableYellowBox = true;
    StyleSheet.setStyleAttributePreprocessor('fontFamily', Font.processFontFamily);
    // eslint-disable-next-line no-console
    console.disableYellowBox = false;
  }

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
      throw err;
    }
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <AppLoading /> : this.props.children;
  }
}
