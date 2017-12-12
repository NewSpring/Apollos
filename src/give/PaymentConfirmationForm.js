import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import get from 'lodash/get';
import withGive from '@data/withGive';
import withCheckout from '@data/withCheckout';
import ActivityIndicator from '@ui/ActivityIndicator';

export class PaymentConfirmationForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    campus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    contributions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.number,
    })),
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    isLoading: true,
    campus: '',
    contributions: [],
    onSubmit() {},
  };

  get total() {
    return this.props.contributions
      .reduce((runningTotal, c) => (runningTotal + c.amount), 0);
  }

  render() {
    if (this.props.isLoading) return <ActivityIndicator />;

    return (
      <View>
        <Text>{'Review Contribution'}</Text>
        <Text>{`Campus: ${this.props.campus}`}</Text>

        {this.props.contributions.map(contribution => (
          <Text key={contribution.name}>{`${contribution.name} - ${contribution.amount}`}</Text>
        ))}

        <Text>{this.total}</Text>

        <TouchableHighlight
          onPress={this.props.onSubmit}
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
  withGive,
  mapProps(props => ({
    ...props,
    contributions: get(props, 'contributions.contributions', []),
    campusId: get(props, 'contributions.campusId'),
  })),
  withCheckout,
  mapProps((props) => {
    const campus = props.campuses && props.campuses
      .find(c => (c.id === props.campusId));

    return ({
      campus: campus && campus.label,
      ...props,
    });
  }),
);

export default enhance(PaymentConfirmationForm);
