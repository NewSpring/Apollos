import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import withStory from '@data/withStory';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { ByLine, Title, HTMLView } from '@ui/ContentView';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import RelatedContent from '@ui/RelatedContent';
import withCachedContent from '@data/withCachedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStory,
  withCachedContent,
);

const ShareLink = withStory(Share);

const StorySingle = enhance(
  ({
    content: {
      authors = [],
      title = '',
      content: {
        isLiked, body, tags, ...otherContentProps
      } = {},
    } = {},
    id,
    isLoading,
  }) => (
    <BackgroundView>
      <Header titleText="Story" backButton />
      <ScrollView>
        <ContentView isLoading={isLoading} {...otherContentProps}>
          <Title>{startCase(toLower(title))}</Title>
          <ByLine authors={authors} />
          <HTMLView>{body}</HTMLView>
        </ContentView>
        <RelatedContent tags={tags} excludedIds={[id]} />
      </ScrollView>
      <SecondaryNav isLoading={isLoading} fullWidth>
        <ShareLink id={id} />
        <Like id={id} isLiked={isLiked} />
      </SecondaryNav>
    </BackgroundView>
  ),
);
export default StorySingle;
