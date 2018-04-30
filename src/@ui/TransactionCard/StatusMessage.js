import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { BodyText } from '@ui/typography';
import styled from '@ui/styled';

const StyledText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(BodyText);

const ContributionAmountNameText = ({ amount = 0, account: { name = '' } = {} }) => (
  <StyledText>
    <StyledText bold>{amount.toFixed(2)}</StyledText>
    {' to '}
    <StyledText bold>{name}</StyledText>
  </StyledText>
);

ContributionAmountNameText.propTypes = {
  amount: PropTypes.number,
  account: PropTypes.shape({ name: PropTypes.string }),
};

// TODO: Missing is expiring soon message
function StatusMessage(props = {}) {
  const {
    status, details, isScheduled, error,
  } = props;
  const didPass = status === null || status === 'Success' || status === 'Complete';
  const didFail = status === 'Failed';
  const isPending = status === 'Pending' || status === 'Pendingsettlement';

  if (didPass) {
    return (
      <StyledText>
        Your {isScheduled ? 'scheduled ' : ''}
        {'contribution of '}
        <ContributionAmountNameText {...get(details, '0')} />
        {details.length > 1 ? (
          <StyledText>
            {' and '}
            <ContributionAmountNameText {...get(details, '1')} />
          </StyledText>
        ) : null}
        {' was successful.'}
      </StyledText>
    );
  }
  if (didFail) {
    return (
      <StyledText>
        Your {isScheduled ? 'scheduled ' : ''}contribution to
        <StyledText bold>{` ${get(details, '0.account.name')} `}</StyledText>
        {details.length > 1 ? (
          <StyledText>
            and<StyledText bold>{` ${get(details, '1.account.name')} `}</StyledText>
          </StyledText>
        ) : null}{' '}
        was unsuccessful.
        {error !== null && error !== '' ? ` Unfortunately, ${error}.` : ''}
      </StyledText>
    );
  }
  if (isPending) {
    return (
      <StyledText>
        Your {isScheduled ? 'scheduled ' : ''}contribution to
        <StyledText bold>{` ${get(details, '0.account.name')} `}</StyledText>
        {details.length > 1 ? (
          <StyledText>
            and<StyledText bold>{` ${get(details, '1.account.name')} `}</StyledText>
          </StyledText>
        ) : null}{' '}
        is <StyledText>pending</StyledText>.
      </StyledText>
    );
  }
  return null;
}

StatusMessage.propTypes = {
  status: PropTypes.string,
  details: PropTypes.arrayOf(PropTypes.shape({})),
  error: PropTypes.string,
  isScheduled: PropTypes.bool,
};

StatusMessage.defaultProps = {
  status: null,
  details: [],
  error: null,
  isScheduled: false,
};

export default StatusMessage;
