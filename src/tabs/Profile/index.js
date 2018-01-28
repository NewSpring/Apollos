import React from 'react';
import { shouldUpdate } from 'recompose';
import withUser from '@data/withUser';
// import withTopics from '@data/withTopics';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import TabView, { SceneMap } from '@ui/TabView';
import UserAvatarView from '@ui/UserAvatarView';
import MediaQuery from '@ui/MediaQuery';
import SideBySideView, { Left, Right } from '@ui/SideBySideView';
import styled from '@ui/styled';
import Icon from '@ui/Icon';
import { Link } from '@ui/NativeWebRouter';
import { H7 } from '@ui/typography';

import Topics from './Topics';
import Likes from './Likes';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);

const CurrentUserAvatar = withUser(UserAvatarView);
const DesktopCurrentUserAvatar = styled({ height: '100vh' })(CurrentUserAvatar);

const tabRoutes = [{ title: 'Likes', key: 'likes' }, { title: 'Topics', key: 'topics' }];

const enhance = shouldUpdate(() => false);

const Profile = enhance(() => (
  <FlexedView>
    <FlexedSideBySideView>
      <Left>
        <Header
          webEnabled
          titleText="Profile"
          right={
            <Link to="/settings">
              <SideBySideView stretched={false}>
                <Icon name="settings" size={24} />
                <MediaQuery minWidth="md"><H7>Settings</H7></MediaQuery>
              </SideBySideView>
            </Link>
          }
        />
        <TabView
          routes={tabRoutes}
          renderScene={SceneMap({
            likes: Likes, // this.renderLikes,
            topics: Topics,
          })}
        />
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
));

export default Profile;
