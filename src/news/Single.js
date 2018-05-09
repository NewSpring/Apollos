import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { Title, ByLine, HTMLView } from '@ui/ContentView';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import withNewsStory from '@data/withNewsStory';
import withCachedContent from '@data/withCachedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withNewsStory,
  withCachedContent,
);

const ShareLink = withNewsStory(Share);

const NewsSingle = enhance(
  ({
    id,
    content: {
      authors = [],
      title = '',
      content: { isLiked, body, ...otherContentProps } = {},
    } = {},
    isLoading,
  }) => (
    <BackgroundView>
      <Header titleText="News" backButton />
      <ScrollView>
        <ContentView isLoading={isLoading} {...otherContentProps}>
          <Title>{startCase(toLower(title))}</Title>
          <ByLine authors={authors} />
          <HTMLView>{body}</HTMLView>
        </ContentView>
      </ScrollView>
      <SecondaryNav isLoading={isLoading} fullWidth>
        <ShareLink id={id} />
        <Like id={id} isLiked={isLiked} />
      </SecondaryNav>
    </BackgroundView>
  ),
);

export default NewsSingle;
