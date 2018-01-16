import React from 'react';
import { ScrollView } from 'react-native';
import { compose, mapProps, pure } from 'recompose';

import withArticle from '@data/withArticle';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import RelatedContent from '@ui/RelatedContent';
import SecondaryNav, { Link } from '@ui/SecondaryNav';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withArticle,
);

const ArticleSingle = enhance(({
  content: {
    authors = [],
    title = '',
    content = {},
  } = { },
  id,
  isLoading,
}) => (
  <FlexedView>
    <Header titleText="Article" backButton />
    <ScrollView>
      <ContentView
        title={title}
        authors={authors}
        {...content}
      />
      { // Don't render till data is ready. Consider adding placeholder views for the content above.
        !isLoading && <RelatedContent tags={content.tags} excludedIds={[id]} />}
    </ScrollView>
    <MediaQuery maxWidth="md">
      <SecondaryNav>
        <Link icon="share" />
        <Link icon="like" />
      </SecondaryNav>
    </MediaQuery>
  </FlexedView>
));

export default ArticleSingle;
