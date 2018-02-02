import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { Title, ByLine, HTMLView } from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link, Share } from '@ui/SecondaryNav';
import withNewsStory from '@data/withNewsStory';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withNewsStory,
);

const ShareLink = withNewsStory(Share);

const NewsSingle = enhance(({
  id,
  content: {
    authors = [],
    title = '',
    content: {
      body,
      ...otherContentProps
    } = {},
  } = { },
}) => (
  <BackgroundView>
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
        <ShareLink id={id} />
        <Link icon="like" />
      </SecondaryNav>
    </MediaQuery>
  </BackgroundView>
));

export default NewsSingle;
