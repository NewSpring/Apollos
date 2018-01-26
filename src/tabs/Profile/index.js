import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
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

import Topics from './Topics';
import Likes from './Likes';

const CurrentUserAvatar = withUser(UserAvatarView);
const DesktopCurrentUserAvatar = styled({ height: '100vh' })(CurrentUserAvatar);

const tabRoutes = [{ title: 'Likes', key: 'likes' }, { title: 'Topics', key: 'topics' }];

class Profile extends PureComponent {
  renderLikes = () => (
    <ScrollView>
      <MediaQuery maxWidth="md"><CurrentUserAvatar /></MediaQuery>
      <Likes />
    </ScrollView>
  );

  render() {
    return (
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
            <TabView
              routes={tabRoutes}
              renderScene={SceneMap({
                likes: this.renderLikes,
                topics: Topics,
              })}
            />
          </Left>
          <MediaQuery minWidth="md">
            <Right>
              <DesktopCurrentUserAvatar />
            </Right>
          </MediaQuery>
        </SideBySideView>
      </FlexedView>
    );
  }
}

export default Profile;
