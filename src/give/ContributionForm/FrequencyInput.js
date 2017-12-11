import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Picker from '@ui/Picker';

// NOTE: Id's are resolved to frequencies for
// NMI at withGive
const FREQUENCY_IDS = [
  { label: 'one time', id: 'once' },
  { label: 'every week', id: 'weekly' },
  { label: 'every two weeks', id: 'biweekly' },
  { label: 'once a month', id: 'monthly' },
];

export default class FrequencyInput extends Component {
  static propTypes = {
    scheduleFrequencies: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    scheduleFrequencies: FREQUENCY_IDS,
    onChange() {},
  };

  state = {
    frequencyId: (this.props.scheduleFrequencies[0] && this.props.scheduleFrequencies[0].id) || '',
  };

  get value() {
    return {
      frequencyId: this.state.frequencyId,
    };
  }

  setFrequency = (frequencyId) => {
    this.setState({ frequencyId }, () => {
      this.props.onChange(this.value);
    });
  }

  render() {
    return (
      <View>
        <Text>{'frequency'}</Text>
        <Picker
          onValueChange={this.setFrequency}
          selectedValue={this.state.frequencyId}
        >
          {this.props.scheduleFrequencies.map(({ label, id }) => (
            <Picker.Item label={label} value={id} key={id} />
          ))}
        </Picker>
      </View>
    );
  }
}
