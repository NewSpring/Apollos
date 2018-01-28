import React from 'react';
import PropTypes from 'prop-types';
import FlexedView from '@ui/FlexedView';
import SideBySideView, { Right, Left } from '@ui/SideBySideView';
import withUser from '@data/withUser';
import UserAvatarView from '@ui/UserAvatarView';
import MediaQuery from '@ui/MediaQuery';
import styled from '@ui/styled';

export { ProfileDetails, ProfileAddress, ChangePassword } from './forms';

const CurrentUserAvatar = withUser(UserAvatarView);
const DesktopCurrentUserAvatar = styled({ height: '100vh' })(CurrentUserAvatar);

const Layout = ({ children }) => (
  <FlexedView>
    <SideBySideView>
      <Left>
        {children}
      </Left>
      <MediaQuery minWidth="md">
        <Right>
          <DesktopCurrentUserAvatar
            allowProfileImageChange
          />
        </Right>
      </MediaQuery>
    </SideBySideView>
  </FlexedView>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
