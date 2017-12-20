import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import withUser from '@data/withUser';

// TODO: Use @primitives
export class LogoutButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onLogout: PropTypes.func,
  };

  static defaultProps = {
    text: 'logout',
    onLogout() {},
  };

  render() {
    return (
      <View>
        <TouchableWithoutFeedback
          onPress={this.props.onLogout}
        >
          <View
            style={{
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          >
            <Text>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const enhance = compose(
  withUser,
  mapProps(props => ({ ...props, onLogout: props.logout })),
);
export default enhance(LogoutButton);
