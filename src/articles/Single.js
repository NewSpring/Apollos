import React from 'react';
import { ScrollView } from 'react-native';
import { compose, mapProps, pure } from 'recompose';

import withArticle from '@data/withArticle';
import withCachedContent from '@data/withCachedContent';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { Title, ByLine, HTMLView } from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import RelatedContent from '@ui/RelatedContent';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withArticle,
  withCachedContent,
);

const ShareLink = withArticle(Share);

const ArticleSingle = enhance(
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
      <Header titleText="Article" backButton />
      <ScrollView>
        <ContentView isLoading={isLoading} {...otherContentProps}>
          <Title>{title}</Title>
          <ByLine authors={authors} />
          <HTMLView>{body}</HTMLView>
        </ContentView>
        {// Don't render till data is ready.
        // Consider adding placeholder views for the content above.
        !isLoading && <RelatedContent tags={tags} excludedIds={[id]} />}
      </ScrollView>
      <MediaQuery maxWidth="md">
        <SecondaryNav isLoading={isLoading}>
          <ShareLink id={id} />
          <Like id={id} isLiked={isLiked} />
        </SecondaryNav>
      </MediaQuery>
    </BackgroundView>
  ),
);

export default ArticleSingle;
