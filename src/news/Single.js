import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import FlexedRootView from '@ui/FlexedRootView';
import Header from '@ui/Header';
import ContentView, { Title, ByLine, HTMLView } from '@ui/ContentView';
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
    content: {
      body,
      ...otherContentProps
    } = {},
  } = { },
}) => (
  <FlexedRootView>
    <Header titleText="News" backButton />
    <ScrollView>
      <ContentView {...otherContentProps}>
        <Title>{startCase(toLower(title))}</Title>
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
  </FlexedRootView>
));

export default NewsSingle;
