import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import withCheckout from '@data/withCheckout';
import Picker from '@primitives/Picker';
import ActivityIndicator from '@primitives/ActivityIndicator';

export class BillingAddressForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    countries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    })),
    countryId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    states: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    })),
    stateId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
    zipCode: PropTypes.string,
  };

  static defaultProps = {
    isLoading: true,
    onSubmit() {},
    countries: [],
    states: [],
    street1: '',
    street2: '',
    countryId: 'US',
    city: '',
    stateId: 'SC',
    zipCode: '',
  };

  state = {
    street1: '',
    street2: '',
    countryId: 'US',
    city: '',
    stateId: 'SC',
    zipCode: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      street1: nextProps.street1,
      street2: nextProps.street2,
      countryId: nextProps.countryId,
      city: nextProps.city,
      stateId: nextProps.stateId,
      zipCode: nextProps.zipCode,
    });
  }

  get value() {
    return {
      street1: this.state.street1,
      street2: this.state.street2,
      countryId: this.state.countryId,
      city: this.state.city,
      stateId: this.state.stateId,
      zipCode: this.state.zipCode,
    };
  }

  setCountry = (id, idx) => {
    const { id: countryId } = this.props.countries[idx];
    this.setState({ countryId });
  }

  setUSOrCanadianState = (id, idx) => {
    const { id: stateId } = this.props.states[idx];
    this.setState({ stateId });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.value);
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    const isUSOrCanada = this.state.countryId === 'US' || this.state.countryId === 'CA';
    return (
      <View>
        <Text>{'Street Address'}</Text>
        <TextInput
          onChangeText={(street1) => { this.setState({ street1 }); }}
          value={this.state.street1}
        />
        <Text>{'Street Address (optional)'}</Text>
        <TextInput
          onChangeText={(street2) => { this.setState({ street2 }); }}
          value={this.state.street2}
        />
        <Text>{'Country'}</Text>
        <Picker
          onValueChange={this.setCountry}
          selectedValue={this.state.countryId}
        >
          {this.props.countries.map(({ label, id }) => (
            <Picker.Item label={label} value={id} key={id} />
          ))}
        </Picker>
        <Text>{'City'}</Text>
        <TextInput
          onChangeText={(city) => { this.setState({ city }); }}
          value={this.state.city}
        />

        {isUSOrCanada &&
          <View>
            <Text>{'State/Territory'}</Text>
            <Picker
              onValueChange={this.setUSOrCanadianState}
              selectedValue={this.state.stateId}
            >
              {this.props.states.map(({ label, id }) => (
                <Picker.Item label={label} value={id} key={id} />
              ))}
            </Picker>
          </View>
        }

        <Text>{'Zip/Postal'}</Text>
        <TextInput
          onChangeText={(zipCode) => { this.setState({ zipCode }); }}
          value={this.state.zipCode}
        />
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
);

export default enhance(BillingAddressForm);
