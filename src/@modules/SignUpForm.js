import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import FormInput from '@primitives/FormInput';
import withUser from '@data/withUser';

// TODO: Use @primitives
export class SignUpForm extends Component {
  static propTypes = {
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onSignup: PropTypes.func,
  };

  static defaultProps = {
    email: '',
    onSignup() {},
  };

  state = {
    email: this.props.email,
    password: '',
    firstName: this.props.firstName,
    lastName: this.props.lastName,
  };

  handleSubmit = () => {
    const {
      email,
      password,
      firstName,
      lastName,
    } = this.state;
    const {
      onSignup,
    } = this.props;

    onSignup({
      email,
      password,
      firstName,
      lastName,
    });
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
        <FormInput
          label="First Name"
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <FormInput
          label="Last Name"
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
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
  mapProps(props => ({ ...props, onSignup: props.register })),
);
export default enhance(SignUpForm);
