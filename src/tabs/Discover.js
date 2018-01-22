import React from 'react';
import { compose, withProps } from 'recompose';
import { View } from 'react-native';
import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import FeedView, { defaultFeedItemRenderer } from '@ui/FeedView';
import FeedItemCard from '@ui/FeedItemCard';
import ThumbnailCard from '@ui/ThumbnailCard';
import withRecentLikes from '@data/withRecentLikes';
import withPromotions from '@data/withPromotions';

const FeaturedCard = defaultFeedItemRenderer(FeedItemCard);

const RecentLikes = compose(
  withRecentLikes,
  withProps({
    numColumns: 1,
    ItemComponent: ThumbnailCard,
  }),
)(FeedView);

const enhance = compose(
  withPromotions,
);

const Discover = enhance(({
  content = [],
}) => {
  const featured = (content && content
    .filter(x => (x.status.toLowerCase() === 'featured'))) || [];

  const open = (content && content
    .filter(x => (x.status.toLowerCase() === 'open'))) || [];

  const featuredCards = featured.map(item => (
    <FeaturedCard key={item.id} item={item} />
  ));

  return (
    <FlexedView>
      <Header titleText="Discover" />
      <RecentLikes
        ListHeaderComponent={(
          <View>
            {featuredCards}
          </View>
        )}
      />
    </FlexedView>
  );
});

export default Discover;
