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
export class LoginForm extends Component {
  static propTypes = {
    email: PropTypes.string,
    onLogin: PropTypes.func,
  };

  static defaultProps = {
    email: '',
    onLogin() {},
  };

  state = {
    email: this.props.email,
    password: '',
  };

  handleSubmit = () => {
    const {
      email,
      password,
    } = this.state;
    const {
      onLogin,
    } = this.props;

    onLogin({ email, password });
  };

  render() {
    return (
      <View>
        <FormInput
          label="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          keyboardType="email-address"
        />
        <FormInput
          label="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
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
  mapProps(props => ({ ...props, onLogin: props.login })),
);
export default enhance(LoginForm);
