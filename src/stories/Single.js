import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView, { ByLine, Title, HTMLView } from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withStory from '@data/withStory';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStory,
);

const StorySingle = enhance(({
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
  </FlexedView>
));
export default StorySingle;
