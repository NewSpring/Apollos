import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { Platform, View } from 'react-native';
import { startCase, toLower } from 'lodash';
import moment from 'moment';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card, { CardContent } from '@ui/Card';
import SideBySideView from '@ui/SideBySideView';
import FlexedView from '@ui/FlexedView';
import { H5, H6, UIText } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import Spacer from '@ui/Spacer';

const enhance = compose(
  setPropTypes({
    isLoading: PropTypes.bool,
    iconSize: PropTypes.number,
    fundName: PropTypes.string,
    contributorName: PropTypes.string,
    amount: PropTypes.number,
    dateFormat: PropTypes.string,
    date: PropTypes.string.isRequired,
  }),
  defaultProps({
    isLoading: false,
    fundName: '',
    contributorName: '',
    amount: 0,
    dateFormat: 'MMM DD, YYYY',
  }),
  withIsLoading,
  withTheme(({ theme, ...otherProps }) => ({
    iconSize: otherProps.iconSize || theme.helpers.rem(1),
  })),
  pure,
);

const HorizontalLayout = styled({
  alignItems: 'center',
  minHeight: 110, // kind of the best middle ground for various title lengths.
})(SideBySideView);

const LeftColumn = styled({
  flex: 1.66,
})(CardContent);

const RightColumn = styled(({ theme }) => ({
  paddingRight: theme.sizing.baseUnit,
  alignItems: 'flex-end',
  justifyContent: 'center',
  ...Platform.select({
    web: {
      position: 'relative',
    },
  }),
}))(FlexedView);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const ItalicText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
  fontStyle: 'italic',
}))(UIText);

const Row = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const StyledIcon = withTheme(({ theme }) => ({
  fill: theme.colors.primary,
}))(Icon);

const StyledCashAmountIndicator = withTheme(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(CashAmountIndicator);

const HistoricalContributionCard = enhance(({
  isLoading,
  iconSize,
  fundName,
  contributorName,
  amount,
  dateFormat,
  date,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <HorizontalLayout>
      <LeftColumn>
        <H5>{startCase(toLower(fundName))}</H5>
        <StyledH6>{startCase(toLower(contributorName))}</StyledH6>
        <Spacer />
        <ItalicText>{moment(date).utc().format(dateFormat)}</ItalicText>
      </LeftColumn>

      <RightColumn>
        <Row>
          <StyledCashAmountIndicator amount={amount} size={4} />
          <Spacer byWidth />
          <StyledIcon name="arrow-next" size={iconSize} />
        </Row>
      </RightColumn>
    </HorizontalLayout>
  </Card>
));

export default HistoricalContributionCard;