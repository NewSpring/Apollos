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
import { H5, H6, BodyText } from '@ui/typography';
import Icon from '@ui/Icon';
import { withTheme } from '@ui/theme';
import CashAmountIndicator from '@ui/CashAmountIndicator';
import MediaQuery from '@ui/MediaQuery';
import Spacer from '@ui/Spacer';
import Avatar from '@ui/Avatar';

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
})(View);

const RightColumn = styled({
  alignItems: 'flex-end',
  justifyContent: 'center',
  ...Platform.select({
    web: {
      position: 'relative',
    },
  }),
})(FlexedView);

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const DateText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(BodyText);

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

const AvatarWrapper = styled(({ theme }) => ({
  paddingRight: theme.sizing.baseUnit / 3,
}))(View);

const HistoricalContributionCard = enhance(({
  isLoading,
  iconSize,
  fundName,
  contributorName,
  amount,
  dateFormat,
  date,
  profileImageUrl,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <CardContent>
      <HorizontalLayout>
        <MediaQuery minWidth="md">
          {profileImageUrl ? (
            <AvatarWrapper><Avatar size="small" source={profileImageUrl} /></AvatarWrapper>
          ) : null}
        </MediaQuery>

        <LeftColumn>
          <H5>{startCase(toLower(fundName))}</H5>
          <StyledH6>{startCase(toLower(contributorName))}</StyledH6>
          <Spacer />
          <DateText italic>{moment(date).utc().format(dateFormat)}</DateText>
        </LeftColumn>

        <RightColumn>
          <Row>
            <StyledCashAmountIndicator amount={amount} size={4} />
            <Spacer byWidth />
            <StyledIcon name="arrow-next" size={iconSize} />
          </Row>
        </RightColumn>
      </HorizontalLayout>
    </CardContent>
  </Card>
));

export default HistoricalContributionCard;
