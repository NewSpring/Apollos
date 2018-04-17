import React from 'react';
import { compose, withProps } from 'recompose';
import { View } from 'react-native';
import FeedView, { defaultFeedItemRenderer } from '@ui/FeedView';
import { H5, BodyText } from '@ui/typography';
import { ButtonLink } from '@ui/Button';
import Card, { CardContent } from '@ui/Card';
import FeedItemCard from '@ui/FeedItemCard';
import ThumbnailCard from '@ui/ThumbnailCard';
import { withRecentLikes } from '@data/likes';
import withPromotions from '@data/withPromotions';
import styled from '@ui/styled';
import WebBrowser from '@ui/WebBrowser';

import ItemLink from './ItemLink';

const FeaturedCard = defaultFeedItemRenderer(FeedItemCard, ItemLink);

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
  textAlign: 'center',
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
          {featuredCards.length ? (
            <View>
              <Title>Recommended by NewSpring</Title>
              {featuredCards}
            </View>
          ) : null}
          <Title>Recently Liked by others</Title>
        </View>
      )}
      ListFooterComponent={open.length ? (
        <FooterCard>
          <CardContent>
            <BodyText>
              Are you looking for{' '}
              <BodyText>
                {open.map((x, i) => {
                  let delimeter = ', ';
                  if (open[i].id === open[open.length - 1].id) {
                    delimeter = '';
                  } else if (open[i].id === open[open.length - 2].id) {
                    delimeter = ' or ';
                  }

                  return (
                    <BodyText key={x.id}>
                      <ButtonLink onPress={() => WebBrowser.openBrowserAsync(x.meta.urlTitle)}>
                        {x.title}
                      </ButtonLink>
                      {delimeter}
                    </BodyText>
                  );
                })}?
              </BodyText>
            </BodyText>
          </CardContent>
        </FooterCard>
      ) : null}
    />
  );
});

export default Feed;
