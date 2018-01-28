import React from 'react';
import { View } from 'react-native';
import { shouldUpdate } from 'recompose';
import withUser from '@data/withUser';
// import withTopics from '@data/withTopics';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import TabView, { SceneMap } from '@ui/TabView';
import UserAvatarView from '@ui/UserAvatarView';
import MediaQuery from '@ui/MediaQuery';
import SideBySideView, { Left, Right } from '@ui/SideBySideView';
import styled from '@ui/styled';
import Icon from '@ui/Icon';
import { Link } from '@ui/NativeWebRouter';
import { H2 } from '@ui/typography';

import Topics from './Topics';
import Likes from './Likes';

const CurrentUserAvatar = withUser(UserAvatarView);
const DesktopCurrentUserAvatar = styled({ height: '100vh' })(CurrentUserAvatar);

const tabRoutes = [{ title: 'Likes', key: 'likes' }, { title: 'Topics', key: 'topics' }];

const enhance = shouldUpdate(() => false);

const Profile = enhance(() => (
  <FlexedView>
    <Header
      titleText="Profile"
      right={
        <Link to="/settings">
          <View><Icon name="settings" size={24} /></View>
        </Link>
      }
    />
    <SideBySideView style={{ flex: 1 }}>
      <Left>
        <MediaQuery minWidth="md">
          {/* Todo: replace this with a better <Header> component */}
          <PaddedView>
            <SideBySideView>
              <H2>Profile</H2>
              <Link to="/settings">
                <View><Icon name="settings" size={48} /></View>
              </Link>
            </SideBySideView>
          </PaddedView>
        </MediaQuery>
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
          <DesktopCurrentUserAvatar allowProfileImageChange />
        </Right>
      </MediaQuery>
    </SideBySideView>
  </FlexedView>
));

export default Profile;
