import React from 'react';
import { compose, pure, withProps } from 'recompose';
import { View } from 'react-native';
import styled from '@ui/styled';
import { withProfileLikes, withRecentLikes } from '@data/likes';
import { RelatedContentWithoutData } from '@ui/RelatedContent';
import { H7, H5 } from '@ui/typography';
import ThumbnailCard from '@ui/ThumbnailCard';
import FeedView from '@ui/FeedView';

const asHeaderText = styled(({ theme }) => ({
  textAlign: 'center',
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit,
}));

const RecentLikesHeaderText = asHeaderText(H7);
const YourLikesHeaderText = asHeaderText(H5);

const LikedContent = compose(
  styled({ backgroundColor: 'transparent', paddingTop: 0 }),
)(RelatedContentWithoutData);

const RecentLikes = withRecentLikes(props => (
  <View>
    <RecentLikesHeaderText>
      Check out some of the latest things from NewSpring
    </RecentLikesHeaderText>
    <LikedContent
      sectionTitle={null}
      {...props}
    />
  </View>
));

const YourLikesHeader = () => (
  <YourLikesHeaderText>Your Likes</YourLikesHeaderText>
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
)(FeedView);

export default Likes;
