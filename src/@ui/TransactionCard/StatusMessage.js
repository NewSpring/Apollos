import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { UIText } from '@ui/typography';

// TODO: Missing is expiring soon message
function StatusMessage(props = {}) {
  const {
    status,
    details,
    isScheduled,
    error,
  } = props;
  const didPass = status === null || status === 'Success' || status === 'Complete';
  const didFail = status === 'Failed';
  const isPending = status === 'Pending';

  if (didPass) {
    return (
      <UIText>
        Your {isScheduled ? 'scheduled ' : ''}contribution of <UIText>{`$${get(details, '0.amount', 0).toFixed(2)} `}</UIText>
        to <UIText>{`${get(details, '0.account.name')} `}</UIText>
        {details.length > 1 ? details[1].toFixed(2) : null}
        {' '}was successful.
      </UIText>
    );
  }
  if (didFail) {
    return (
      <UIText>
        Your {isScheduled ? 'scheduled ' : ''}contribution to
        <UIText>{` ${get(details, '0.account.name')} `}</UIText>
        {details.length > 1
          ? <UIText>and<UIText>{` ${get(details, '1.name')} `}</UIText></UIText> : null}
        {' '}was unsuccessful.
        {error !== null && error !== ''
          ? ` Unfortunately, ${error}.` : ''}
      </UIText>
    );
  }
  if (isPending) {
    return (
      <UIText>
        Your {isScheduled ? 'scheduled ' : ''}contribution to
        <UIText>{` ${get(details, '0.account.name')} `}</UIText>
        {details.length > 1
          ? <UIText>and<UIText>{` ${get(details, '1.name')} `}</UIText></UIText> : null}
        {' '}is <UIText>pending</UIText>.
      </UIText>
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
