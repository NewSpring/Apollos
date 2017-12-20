import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import FormInput from '@ui/FormInput';
import withUser from '@data/withUser';

// TODO: Use @primitives
export class ChangePasswordForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit() {},
  };

  state = {
    email: '',
  };

  handleSubmit = () => {
    const {
      email,
    } = this.state;
    const {
      onSubmit,
    } = this.props;

    onSubmit({
      email,
    });
  };

  render() {
    return (
      <View>
        <FormInput
          label="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />

        <TouchableWithoutFeedback
          onPress={this.handleSubmit}
        >
          <View
            style={{
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          >
            <Text>{'Enter'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const enhance = compose(
  withUser,
  mapProps(props => ({ ...props, onSubmit: props.forgotPassword })),
);
export default enhance(ChangePasswordForm);
