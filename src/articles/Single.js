import React from 'react';
import { ScrollView } from 'react-native';
import { compose, mapProps, pure } from 'recompose';

import withArticle from '@data/withArticle';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { Title, ByLine, HTMLView } from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import RelatedContent from '@ui/RelatedContent';
import SecondaryNav, { Link, Share } from '@ui/SecondaryNav';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withArticle,
);

const ShareLink = withArticle(Share);

const ArticleSingle = enhance(({
  content: {
    authors = [],
    title = '',
    content: {
      body,
      tags,
      ...otherContentProps
    } = {},
  } = { },
  id,
  isLoading,
}) => (
  <BackgroundView>
    <Header titleText="Article" backButton />
    <ScrollView>
      <ContentView {...otherContentProps}>
        <Title>{title}</Title>
        <ByLine authors={authors} />
        <HTMLView>{body}</HTMLView>
      </ContentView>
      { // Don't render till data is ready. Consider adding placeholder views for the content above.
        !isLoading && <RelatedContent tags={tags} excludedIds={[id]} />}
    </ScrollView>
    <MediaQuery maxWidth="md">
      <SecondaryNav>
        <ShareLink id={id} />
        <Link icon="like" />
      </SecondaryNav>
    </MediaQuery>
  </BackgroundView>
));

export default ArticleSingle;
