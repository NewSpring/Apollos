import React from 'react';
import { compose, withProps } from 'recompose';
import { View, Linking } from 'react-native';
import FeedView, { defaultFeedItemRenderer } from '@ui/FeedView';
import { H6, H5, BodyCopy } from '@ui/typography';
import Card, { CardContent } from '@ui/Card';
import FeedItemCard from '@ui/FeedItemCard';
import ThumbnailCard from '@ui/ThumbnailCard';
import { withRecentLikes } from '@data/likes';
import withPromotions from '@data/withPromotions';
import styled from '@ui/styled';

const FeaturedCard = defaultFeedItemRenderer(FeedItemCard);

const BodyLink = styled(({ theme }) => ({ color: theme.colors.primary }))(BodyCopy);

const RecentLikes = compose(
  withRecentLikes,
  withProps({
    numColumns: 1,
    ItemComponent: ThumbnailCard,
  }),
)(FeedView);

const Title = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit / 2,
  paddingTop: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(H6);

const SecondaryTitle = styled(({ theme }) => ({
  textAlign: 'center',
  paddingHorizontal: theme.sizing.baseUnit / 2,
  paddingTop: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(H5);

const FooterCard = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
}))(Card);

const enhance = compose(
  withPromotions,
);

const Feed = enhance(({
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
    <RecentLikes
      ListHeaderComponent={(
        <View>
          <Title>Recommended by NewSpring</Title>
          {featuredCards}
          <SecondaryTitle>Recently Liked by others</SecondaryTitle>
        </View>
      )}
      ListFooterComponent={(
        <FooterCard>
          <CardContent>
            <BodyCopy>
              Are you looking for{' '}
              <BodyCopy>
                {open.map((x, i) => {
                  let delimeter = ', ';
                  if (open[i].id === open[open.length - 1].id) {
                    delimeter = '';
                  } else if (open[i].id === open[open.length - 2].id) {
                    delimeter = ' or ';
                  }

                  return (
                    <BodyCopy key={x.id}>
                      <BodyLink onPress={() => Linking.openURL(x.meta.urlTitle)}>
                        {x.title}
                      </BodyLink>
                      {delimeter}
                    </BodyCopy>
                  );
                })}?
              </BodyCopy>
            </BodyCopy>
          </CardContent>
        </FooterCard>
      )}
    />
  );
});

export default Feed;
