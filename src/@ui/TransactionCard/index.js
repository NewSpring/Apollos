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
import { H5, H6 } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import StatusMessage from './StatusMessage';

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
  })),
  pure,
);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.link,
}))(H6);

// const StyledH1 = styled(({ theme }) => ({
//   color: theme.colors.text.primary,
// }))(H1);

// const ItalicText = styled(({ theme }) => ({
//   color: theme.colors.text.secondary,
//   fontStyle: 'italic',
// }))(UIText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const Spacer = styled(({ theme }) => ({
  height: theme.sizing.baseUnit,
}))(View);

const TransactionCard = enhance(({
  isLoading,
  iconSize,
  date,
  dateFormat,
  onPress,
  status,
  details,
  isScheduled,
  error,
  ...otherProps
}) => {
  console.log({ status, details });
  return (
    <Card isLoading={isLoading} {...otherProps}>
      <PaddedView>
        <Row>
          <Icon name="ArrowNext" size={iconSize} />
          <H5>{moment(date).format(dateFormat)}</H5>
        </Row>
        <Spacer />
        <StatusMessage
          status={status}
          details={details}
          isScheduled={isScheduled}
          error={error}
        />
        <TouchableWithoutFeedback
          onPress={onPress}
        >
          <Row>
            <StyledH6>{'View Contribution'}</StyledH6>
            <Icon name="ArrowNext" size={iconSize} />
          </Row>
        </TouchableWithoutFeedback>
      </PaddedView>
    </Card>
  );
});

export default TransactionCard;
