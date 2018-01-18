import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import { withRouter } from '../NativeWebRouter';

import Transitioner from './Transitioner';

class Stack extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({}),
    location: PropTypes.shape({}),
    match: PropTypes.shape({}),
  };

  static defaultProps = {
    children: null,
    history: null,
    location: null,
    match: null,
  }

  state = {
    width: 0,
    height: 0,
  };

  onLayout = ({ nativeEvent: { layout: { height, width } } }) => {
    this.setState({ height, width });
  };

  render() {
    const { height, width } = this.state;

    return (
      <View style={StyleSheet.absoluteFill} onLayout={this.onLayout}>
        <Transitioner
          history={this.props.history}
          location={this.props.location}
          match={this.props.match}
          height={height}
          width={width}
        >
          {this.props.children}
        </Transitioner>
      </View>
    );
  }
}

const enhance = compose(
  mapProps(ownProps => ({ ownProps })),
  withRouter,
  mapProps(({ ownProps, ...routerProps }) => ({
    ...routerProps,
    ...ownProps,
  })),
);

export default enhance(Stack);
