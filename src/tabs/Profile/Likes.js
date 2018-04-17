import React from 'react';
import { compose, pure, withProps } from 'recompose';
import { View } from 'react-native';
import styled from '@ui/styled';
import { withProfileLikes, withRecentLikes } from '@data/likes';
import { RelatedContentWithoutData } from '@ui/RelatedContent';
import { H7, H5 } from '@ui/typography';
import ThumbnailCard from '@ui/ThumbnailCard';
import FeedView from '@ui/FeedView';
import MediaQuery from '@ui/MediaQuery';
import withUser from '@data/withUser';
import UserAvatarView from '@ui/UserAvatarView';
import Card, { CardContent } from '@ui/Card';
import PaddedView from '@ui/PaddedView';

const CurrentUserAvatar = withUser(UserAvatarView);

const asHeaderText = styled({
  textAlign: 'center',
});

const RecentLikesHeaderText = asHeaderText(H7);
const YourLikesHeaderText = asHeaderText(H5);

const LikedContent = compose(
  styled({ backgroundColor: 'transparent', paddingTop: 0 }),
)(RelatedContentWithoutData);

const RecentLikes = withRecentLikes(props => (
  <View>
    <PaddedView>
      <RecentLikesHeaderText>
        Check out some of the latest things from NewSpring
      </RecentLikesHeaderText>
    </PaddedView>
    <LikedContent
      sectionTitle={null}
      {...props}
    />
  </View>
));

const YourLikesHeader = () => (
  <View>
    <MediaQuery maxWidth="md"><CurrentUserAvatar allowProfileImageChange /></MediaQuery>
    <PaddedView><YourLikesHeaderText>Your Likes</YourLikesHeaderText></PaddedView>
  </View>
);

const EmptyList = () => (
  <Card>
    <CardContent>
      <PaddedView>
        <RecentLikesHeaderText>
          {'You don\'t seem to have any likes yet '}😲
        </RecentLikesHeaderText>
      </PaddedView>
    </CardContent>
  </Card>
);

const Likes = compose(
  pure,
  withProfileLikes,
  withProps(({ content = [], error }) => ({
    numColumns: 1,
    ItemComponent: ThumbnailCard,
    ListHeaderComponent: YourLikesHeader,
    ListEmptyComponent: EmptyList,
    ListFooterComponent: !error && (content || []).length < 5 ? RecentLikes : null,
  })),
  styled({ paddingVertical: 0 }),
)(FeedView);

export default Likes;
