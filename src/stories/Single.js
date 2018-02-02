import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import withStory from '@data/withStory';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { ByLine, Title, HTMLView } from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link, Share } from '@ui/SecondaryNav';
import RelatedContent from '@ui/RelatedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStory,
);

const ShareLink = withStory(Share);

const StorySingle = enhance(({
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
    <Header titleText="News" backButton />
    <ScrollView>
      <ContentView {...otherContentProps}>
        <Title>{startCase(toLower(title))}</Title>
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
export default StorySingle;
