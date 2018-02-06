import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { H7 } from '@ui/typography';

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
      <H7>
        Your {isScheduled ? 'scheduled ' : ''}contribution of <H7>{`$${get(details, '0.amount', 0).toFixed(2)} `}</H7>
        to <H7>{`${get(details, '0.account.name')} `}</H7>
        {details.length > 1 ? details[1].toFixed(2) : null}
        {' '}was successful.
      </H7>
    );
  }
  if (didFail) {
    return (
      <H7>
        Your {isScheduled ? 'scheduled ' : ''}contribution to
        <H7>{` ${get(details, '0.account.name')} `}</H7>
        {details.length > 1
          ? <H7>and<H7>{` ${get(details, '1.name')} `}</H7></H7> : null}
        {' '}was unsuccessful.
        {error !== null && error !== ''
          ? ` Unfortunately, ${error}.` : ''}
      </H7>
    );
  }
  if (isPending) {
    return (
      <H7>
        Your {isScheduled ? 'scheduled ' : ''}contribution to
        <H7>{` ${get(details, '0.account.name')} `}</H7>
        {details.length > 1
          ? <H7>and<H7>{` ${get(details, '1.name')} `}</H7></H7> : null}
        {' '}is <H7>pending</H7>.
      </H7>
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
