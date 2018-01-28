import React from 'react';
import PropTypes from 'prop-types';
import FlexedView from '@ui/FlexedView';
import { ResponsiveSideBySideView as SideBySideView, Right, Left } from '@ui/SideBySideView';
import withUser from '@data/withUser';
import UserAvatarView from '@ui/UserAvatarView';
import MediaQuery from '@ui/MediaQuery';
import styled from '@ui/styled';

export { ProfileDetails, ProfileAddress, ChangePassword } from './forms';

const CurrentUserAvatar = withUser(UserAvatarView);
const DesktopCurrentUserAvatar = styled({ height: '100vh' })(CurrentUserAvatar);
const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);

const Layout = ({ children }) => (
  <FlexedView>
    <FlexedSideBySideView>
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
    </FlexedSideBySideView>
  </FlexedView>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
