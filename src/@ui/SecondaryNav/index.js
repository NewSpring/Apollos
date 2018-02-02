import React from 'react';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import TabBar, { Link } from '@ui/TabBar';
import { share } from '@utils/content';

export { Link };

export const Share = withProps(({ content }) => ({
  icon: 'share',
  onPress: () => share(content),
}))(Link);

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
