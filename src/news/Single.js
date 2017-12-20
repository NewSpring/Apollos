import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withNewsStory from '@data/withNewsStory';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withNewsStory,
);

const NewsSingle = enhance(({
  content: {
    authors = [],
    title = '',
    content = {},
  } = { },
}) => (
  <FlexedView>
    <Header titleText="News" backButton />
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

export default NewsSingle;
