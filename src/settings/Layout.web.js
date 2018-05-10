import React from 'react';
import PropTypes from 'prop-types';
import BackgroundView from '@ui/BackgroundView';
import { ResponsiveSideBySideView as SideBySideView, Right, Left } from '@ui/SideBySideView';
import withUser from '@data/withUser';
import UserAvatarView from '@ui/UserAvatarView';
import MediaQuery from '@ui/MediaQuery';
import styled from '@ui/styled';

export { ProfileDetails, ProfileAddress, ChangePassword } from './forms';

const CurrentUserAvatar = withUser(UserAvatarView);
const DesktopCurrentUserAvatar = styled({ height: '100%' })(CurrentUserAvatar);
const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const Layout = ({ children }) => (
  <BackgroundView>
    <FlexedSideBySideView>
      <FlexedLeft>{children}</FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <DesktopCurrentUserAvatar allowProfileImageChange />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
