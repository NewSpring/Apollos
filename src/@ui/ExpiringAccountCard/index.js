import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import moment from 'moment';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card from '@ui/Card';
import PaddedView from '@ui/PaddedView';
import { H5, H6, UIText } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import Spacer from '@ui/Spacer';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    date: PropTypes.string,
    iconSize: PropTypes.number,
    dateFormat: PropTypes.string,
    status: PropTypes.string,
    details: PropTypes.arrayOf(PropTypes.shape({})),
    error: PropTypes.string,
    isScheduled: PropTypes.bool,
  }),
  defaultProps({
    isLoading: false,
    date: null,
    iconSize: null,
    dateFormat: 'MMM D YYYY',
    status: null,
    details: [],
    error: null,
    isScheduled: false,
  }),
  withIsLoading,
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
    iconFill: theme.colors.alert,
  })),
  pure,
);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.alert,
}))(H6);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const TransactionCard = enhance(({
  isLoading,
  iconSize,
  name,
  expirationDate,
  dateFormat,
  onPress,
  iconFill,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <PaddedView>
      <Row>
        <Icon name="circle-outline-x-mark" size={iconSize} fill={iconFill} />
        <Spacer byWidth />
        <H5>{moment(expirationDate, 'MM/YY').format(dateFormat)}</H5>
      </Row>
      <Spacer />
      <UIText>{`Your saved payment ${name} is expiring soon.`}</UIText>
      <Spacer />
      <TouchableWithoutFeedback
        onPress={onPress}
      >
        <Row>
          <StyledH6>{'Update it Now'}</StyledH6>
          <Icon name="arrow-next" size={iconSize} fill={iconFill} />
        </Row>
      </TouchableWithoutFeedback>
    </PaddedView>
  </Card>
));

export default TransactionCard;
