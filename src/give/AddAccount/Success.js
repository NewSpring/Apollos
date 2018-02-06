import React from 'react';
// import moment from 'moment';
// import PropTypes from 'prop-types';
import PaddedView from '@ui/PaddedView';
import styled from '@ui/styled';
// import { Link } from '@ui/NativeWebRouter';
// import { H5, H3, H7 } from '@ui/typography';
import { H3 } from '@ui/typography';
import Icon from '@ui/Icon';

const CenteredView = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

// TODO
// const ScheduleThanks = ({ total, start }) => {
//   return (
//     <H7>
//       Thank you for your contribution of {total}{' '}
//       starting on {moment(start).format('MMM D, YYYY') }{' '}
//       to NewSpring Church.
//     </H7>
//   );
// };

// ScheduleThanks.propTypes = {
//   total: PropTypes.string,
//   start: PropTypes.instanceOf(Date),
// };

// const OneTimeThanks = ({ total, email }) => {
//   return (
//     <H7>
//       Thank you for your contribution of {total} to NewSpring Church.
//       We will email a receipt to {email}
//     </H7>
//   );
// };

// OneTimeThanks.propTypes = {
//   total: PropTypes.string,
//   email: PropTypes.string,
// };

// const ContactLink = () => (
//   <Link to="https://rock.newspring.cc/workflows/152?Topic=Stewardship">contact us</Link>
// );

// const ContactUs = () => (
//   <H7>
//     If you have any questions please call our Finance Team at 864-965-9990 or
//     <ContactLink />
//     and someone will be happy to assist you.
//   </H7>
// );

const Success = () => (
  <CenteredView>
    <Icon name="check" />
    <H3>Success!</H3>
  </CenteredView>
);

export default Success;
