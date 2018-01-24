import React from 'react';
import { View, ScrollView } from 'react-native';
import { compose, branch, renderComponent } from 'recompose';
import ActivityIndicator from '@ui/ActivityIndicator';
import { H3 } from '@ui/typography';
import ChangePasswordForm from '@ui/forms/ChangePasswordForm';
import LogoutButton from '@ui/forms/LogoutButton';
import PaddedView from '@ui/PaddedView';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import withUser from '@data/withUser';

import FeedView from '@ui/FeedView';
import { withProfileLikes } from '@data/likes';

import UserAvatarView from '@ui/UserAvatarView';

const LikesFeed = withProfileLikes(FeedView);

const enhance = compose(
  withUser,
);

const Profile = enhance(({
  user = {},
}) => (
  <FlexedView>
    <Header titleText="Profile" />
    <UserAvatarView
      firstName={user.firstName}
      lastName={user.lastName}
      city={user.home && user.home.city}
      photo={user.photo}
    />
    <LikesFeed />
  </FlexedView>
));

export default Profile;
