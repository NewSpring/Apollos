import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';

export default function withWindow(ComponentToWrap) {
  return class WithWindow extends PureComponent {
    state = {
      window: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      },
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', this.dimensionTracker);
    }

    dimensionTracker = Dimensions.addEventListener('change', ({ window }) => {
      this.setState({ window });
    })

    render() {
      return <ComponentToWrap {...this.state} {...this.props} />;
    }
  };
}

