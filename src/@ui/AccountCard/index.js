import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes, defaultProps } from 'recompose';
import { Platform } from 'react-native';
import { startCase, toLower } from 'lodash';

import { withIsLoading } from '@ui/isLoading';
import styled from '@ui/styled';
import Card, { CardContent } from '@ui/Card';
import SideBySideView from '@ui/SideBySideView';
import FlexedView from '@ui/FlexedView';
import { H5 } from '@ui/typography';
import CategoryLabel from '@ui/CategoryLabel';
import Icon from '@ui/Icon';
import last4 from '@utils/last4';
import { withTheme } from '@ui/theme';

const enhance = compose(
  setPropTypes({
    title: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    accountNumber: PropTypes.number,
    accountType: PropTypes.number,
    iconSize: PropTypes.number,
  }),
  defaultProps({
    isLoading: false,
    accountNumber: '',
    accountType: 'creditCard',
    iconSize: undefined,
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

const AccountCard = enhance(({
  title,
  isLoading,
  accountNumber,
  accountType,
  iconSize,
  ...otherProps
}) => (
  <Card isLoading={isLoading} {...otherProps}>
    <HorizontalLayout>
      <LeftColumn>
        <H5>{startCase(toLower(title))}</H5>
        <CategoryLabel
          label={last4(accountNumber)}
          icon={accountType === 'bankAccount' ? 'bank' : 'credit'}
          isLoading={isLoading}
        />
      </LeftColumn>

      <RightColumn>
        <Icon name="ArrowNext" size={iconSize} />
      </RightColumn>
    </HorizontalLayout>
  </Card>
));

export default AccountCard;
