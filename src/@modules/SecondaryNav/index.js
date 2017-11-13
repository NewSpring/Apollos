import React from 'react';
import PropTypes from 'prop-types';
import TabBar, { Link } from '../TabBar';

export { Link };

const SecondaryNav = ({ backButton = true, children }) => (
  <TabBar>
    {backButton ? (
      <Link pop icon="arrow-back" />
    ) : null}
    {children}
  </TabBar>
);

SecondaryNav.propTypes = {
  backButton: PropTypes.bool,
  children: PropTypes.node,
};

export default SecondaryNav;
