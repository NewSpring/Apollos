import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import withUser from '@data/withUser';
// import withTopics from '@data/withTopics';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import TabView, { SceneMap } from '@ui/TabView';
import UserAvatarView from '@ui/UserAvatarView';

import Topics from './Topics';
import Likes from './Likes';

const CurrentUserAvatar = withUser(UserAvatarView);

const tabRoutes = [{ title: 'Likes', key: 'likes' }, { title: 'Topics', key: 'topics' }];

class Profile extends PureComponent {
  renderLikes = () => (
    <ScrollView>
      <CurrentUserAvatar />
      <Likes />
    </ScrollView>
  );

  render() {
    return (
      <FlexedView>
        <Header titleText="Profile" style={{ zIndex: 2 }} />
        <TabView
          routes={tabRoutes}
          renderScene={SceneMap({
            likes: this.renderLikes,
            topics: Topics,
          })}
        />
      </FlexedView>
    );
  }
}

export default Profile;
