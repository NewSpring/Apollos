import React from 'react';
import PropTypes from 'prop-types';
import TabBar, { Link } from '../TabBar';

export { Link };

const SecondaryNav = ({
  backButton = false,
  backButtonIcon = 'arrow-back',
  onBackPress,
  children,
}) => (
  <TabBar>
    {backButton ? (
      <Link pop icon={backButtonIcon} onPress={onBackPress} />
    ) : null}
    {children}
  </TabBar>
);

SecondaryNav.propTypes = {
  backButton: PropTypes.bool,
  backButtonIcon: PropTypes.string,
  children: PropTypes.node,
  onBackPress: PropTypes.func,
};

export default SecondaryNav;
