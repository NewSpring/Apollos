import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import moment from 'moment';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card from '@ui/Card';
import PaddedView from '@ui/PaddedView';
import { H6, BodyText } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import Spacer from '@ui/Spacer';
import Touchable from '@ui/Touchable';

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
    iconSize: otherProps.iconSize || theme.helpers.rem(1.6),
    iconFill: theme.colors.alert,
  })),
  pure,
);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.alert,
}))(H6);

const DateText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const StyledBodyText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(BodyText);

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
    <Touchable onPress={onPress}>
      <PaddedView>
        <Row>
          <Icon name="circle-outline-x-mark" size={iconSize} fill={iconFill} />
          <Spacer byWidth />
          <DateText>{moment(expirationDate, 'MM/YY').format(dateFormat)}</DateText>
        </Row>
        <Spacer />
        <StyledBodyText>
          Your saved payment <StyledBodyText bold>{name}</StyledBodyText> is expiring soon.
        </StyledBodyText>
        <Spacer />
        <Row>
          <StyledH6>{'Update it Now'}</StyledH6>
          <Icon name="arrow-next" size={iconSize} fill={iconFill} />
        </Row>
      </PaddedView>
    </Touchable>
  </Card>
));

export default TransactionCard;
