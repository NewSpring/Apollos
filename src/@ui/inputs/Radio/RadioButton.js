import React, { PureComponent } from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, getContext } from 'recompose';
import isString from 'lodash/isString';
import { H6 } from '@ui/typography';
import styled from '@ui/styled';
import RadioButtonIndicator from './RadioButtonIndicator';

const Row = styled(({ theme }) => ({
  padding: theme.sizing.baseUnit / 2,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.background.accent,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}))(View);

class RadioButton extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    currentValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    Label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.func,
    ]),
    onSelectValue: PropTypes.func,
    RadioButtonIndicator: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    Label: '',
    onSelectValue() {},
    RadioButtonIndicator,
  };

  handleOnPress = () => {
    this.props.onSelectValue(this.props.value);
  };

  render() {
    const Indicator = this.props.RadioButtonIndicator;
    return (
      <TouchableWithoutFeedback
        onPress={this.handleOnPress}
      >
        <Row>
          <Indicator
            isSelected={this.props.currentValue === this.props.value}
          />
          {isString(this.props.Label) ?
            (<H6>{this.props.Label}</H6>) : (<this.props.Label />)
          }
        </Row>
      </TouchableWithoutFeedback>
    );
  }
}

const enhance = compose(
  getContext({
    onSelectValue: PropTypes.func,
    currentValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
);

export default enhance(RadioButton);
