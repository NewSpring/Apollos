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

const CurrentUserAvatar = withUser(UserAvatarView);

const asHeaderText = styled({
  textAlign: 'center',
});

const TextWrapper = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit,
}))(View);

const RecentLikesHeaderText = asHeaderText(H7);
const YourLikesHeaderText = asHeaderText(H5);

const LikedContent = compose(
  styled({ backgroundColor: 'transparent', paddingTop: 0 }),
)(RelatedContentWithoutData);

const RecentLikes = withRecentLikes(props => (
  <View>
    <TextWrapper>
      <RecentLikesHeaderText>
        Check out some of the latest things from NewSpring
      </RecentLikesHeaderText>
    </TextWrapper>
    <LikedContent
      sectionTitle={null}
      {...props}
    />
  </View>
));

const YourLikesHeader = () => (
  <View>
    <MediaQuery maxWidth="md"><CurrentUserAvatar allowProfileImageChange /></MediaQuery>
    <TextWrapper><YourLikesHeaderText>Your Likes</YourLikesHeaderText></TextWrapper>
  </View>
);

const Likes = compose(
  pure,
  withProfileLikes,
  withProps(({ content = [], isLoading }) => ({
    numColumns: 1,
    ItemComponent: ThumbnailCard,
    ListHeaderComponent: (content.length || isLoading) ? YourLikesHeader : null,
    ListFooterComponent: content.length < 5 ? RecentLikes : null,
  })),
  styled({ paddingVertical: 0 }),
)(FeedView);

export default Likes;
