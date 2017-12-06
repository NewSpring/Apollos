import React from 'react';
import { ScrollView } from 'react-native';
import { compose, mapProps, pure } from 'recompose';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withArticle from '@data/withArticle';

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
}) => (
  <FlexedView>
    <Header titleText="Article" backButton />
    <ScrollView>
      <ContentView
        title={title}
        authors={authors}
        {...content}
      />
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
