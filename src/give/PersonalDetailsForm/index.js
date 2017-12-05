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
  };

  static defaultProps = {
    isLoading: true,
    onSubmit() {},
    campuses: [],
  };

  state = {
    campusId: this.props.campuses[0] && this.props.campuses[0].id,
  };

  setCampus = (id, idx) => {
    const { id: campusId } = this.props.campuses[idx];
    this.setState({ campusId }, () => {
      // this.props.onChange(this.value);
    });
  }

  handleSubmit = () => {
    console.log(this);
    this.props.onSubmit();
  }

  render() {
    console.log(this.props);
    if (this.props.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <TextInput
          ref={(r) => { this.firstName = r; }}
        />
        <TextInput
          ref={(r) => { this.lastName = r; }}
        />
        <TextInput
          ref={(r) => { this.email = r; }}
        />

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
);

export default enhance(PersonalDetailsForm);
