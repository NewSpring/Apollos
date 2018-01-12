import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';

import withStory from '@data/withStory';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import RelatedContent from '@ui/RelatedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStory,
);

const StorySingle = enhance(({
  content: {
    authors = [],
    title = '',
    content = {},
  } = { },
  id,
}) => (
  <FlexedView>
    <Header titleText="News" backButton />
    <ScrollView>
      <ContentView
        title={title}
        authors={authors}
        {...content}
      />
      <RelatedContent tags={content.tags} excludedIds={[id]} />
    </ScrollView>
    <MediaQuery maxWidth="md">
      <SecondaryNav>
        <Link icon="share" />
        <Link icon="like" />
      </SecondaryNav>
    </MediaQuery>
  </FlexedView>
));
export default StorySingle;
