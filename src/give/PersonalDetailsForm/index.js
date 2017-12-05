import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import get from 'lodash/get';
import withCheckout from '@data/withCheckout';
import Picker from '@primitives/Picker';
import ActivityIndicator from '@primitives/ActivityIndicator';
// import { H3, BodyCopy as P } from '@primitives/typography';

export class PersonalDetailsForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    campuses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    })),
    campusId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  };

  static defaultProps = {
    isLoading: true,
    onSubmit() {},
    campuses: [],
    campusId: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  state = {
    firstName: '',
    lastName: '',
    email: '',
    campusId: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.firstName,
      lastName: nextProps.lastName,
      email: nextProps.email,
      campusId: nextProps.campusId,
    });
  }

  get value() {
    return {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      campusId: this.state.campusId,
    };
  }

  setCampus = (id, idx) => {
    const { id: campusId } = this.props.campuses[idx];
    this.setState({ campusId });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.value);
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <Text>{'First Name'}</Text>
        <TextInput
          onChangeText={(firstName) => { this.setState({ firstName }); }}
          value={this.state.firstName}
        />
        <Text>{'Last Name'}</Text>
        <TextInput
          onChangeText={(lastName) => { this.setState({ lastName }); }}
          value={this.state.lastName}
        />
        <Text>{'Email'}</Text>
        <TextInput
          onChangeText={(email) => { this.setState({ email }); }}
          value={this.state.email}
        />

        <Text>{'Campus'}</Text>
        <Picker
          onValueChange={this.setCampus}
          selectedValue={this.state.campusId}
        >
          {this.props.campuses.map(({ label, id }) => (
            <Picker.Item label={label} value={id} key={id} />
          ))}
        </Picker>

        <TouchableHighlight
          onPress={this.handleSubmit}
        >
          <View style={{ padding: 10 }}>
            <Text>{'Next'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const enhance = compose(
  withCheckout,
  mapProps(props => ({
    firstName: get(props, 'person.firstName', ''),
    lastName: get(props, 'person.lastName', ''),
    email: get(props, 'person.email', ''),
    campusId: get(props, 'person.campus.id') || get(props, 'campuses.0.id'),
    ...props,
  })),
);

export default enhance(PersonalDetailsForm);
