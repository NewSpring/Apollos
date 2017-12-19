import React from 'react';
import { ScrollView } from 'react-native';
import { compose, mapProps, pure } from 'recompose';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView, { Title, ByLine, HTMLView } from '@ui/ContentView';
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
    content: {
      body,
      ...otherContentProps
    } = {},
  } = { },
}) => (
  <FlexedView>
    <Header titleText="Article" backButton />
    <ScrollView>
      <ContentView {...otherContentProps}>
        <Title>{title}</Title>
        <ByLine authors={authors} />
        <HTMLView>{body}</HTMLView>
      </ContentView>
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
