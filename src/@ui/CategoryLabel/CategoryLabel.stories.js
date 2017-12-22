import React, { Component } from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CategoryLabel from './';

storiesOf('@ui/CategoryLabel', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <CategoryLabel type={'Default'} />
      </View>
    );
  })
  .add('Series', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <CategoryLabel type={'Series'} />
      </View>
    );
  })
  .add('Albums', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    };

    return (
      <View style={centered}>
        <CategoryLabel type={'Albums'} />
      </View>
    );
  })
  .add('isLoading', () => React.createElement(class CardImageLoading extends Component {
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
      const centered = {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      };

      return (
        <View style={centered}>
          <CategoryLabel type={'Default'} isLoading={this.state.isLoading} />
        </View>
      );
    }
  }));
