import React, { Component } from 'react';

import { storiesOf } from '@storybook/react-native';
import { kebabCase } from 'lodash';

import Icon from './';
import * as icons from './icons';

const stories = storiesOf('Icon', module);

Object.keys(icons).forEach((iconName) => {
  stories.add(iconName, () => <Icon name={kebabCase(iconName)} />);
});

stories.add('isLoading', () => React.createElement(class CardImageLoading extends Component {
  constructor() {
    super();
    this.state = { isLoading: true };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 4000);
  }

  render() {
    return (
      <Icon name={'umbrella'} isLoading={this.state.isLoading} />
    );
  }
}));
