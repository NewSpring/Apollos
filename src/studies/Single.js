import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';

import withStudy from '@data/withStudy';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import { withThemeMixin } from '@ui/theme';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';
import RelatedContent from '@ui/RelatedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStudy,
  withThemeMixin(({ content: { content = {} } = {} } = {}) => {
    const theme = {
      type: content.isLight ? 'light' : 'dark',
    };
    if (content.colors && content.colors.length) {
      const primary = `#${content.colors[0].value}`;
      theme.colors = {
        background: {
          default: primary,
          primary,
        },
      };
    }
    return theme;
  }),
);

const Study = enhance(({
  content: {
    title,
    content: {
      isLight = true,
      images = [],
      description,
      tags,
    } = {},
    children,
    id,
  } = { },
  isLoading,
}) => (
  <FlexedView>
    <Header
      titleText={title}
      backButton
      barStyle={isLight ? 'dark-content' : 'light-content'}
    />
    <ScrollView>
      <ContentView images={images} body={description} />
      <HorizontalTileFeed content={children} isLoading={isLoading} />
      {/* there has to be a more elegant way to handle the conditiion below */
        !isLoading && <RelatedContent tags={tags} excludedIds={[id]} />}
    </ScrollView>
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </FlexedView>
));

export default Study;
