import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';

import withSeriesContent from '@data/withSeriesContent';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView, { HTMLView } from '@ui/ContentView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import { withThemeMixin } from '@ui/theme';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';
import RelatedContent from '@ui/RelatedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSeriesContent,
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

const SeriesSingle = enhance(({
  content: {
    content: {
      video,
      isLight = true,
      description,
      tags,
      colors,
      ...otherContentProps
    } = {},
    children,
    id,
  } = { },
  isLoading,
}) => (
  <FlexedView>
    <Header
      titleText="Series"
      backButton
      barStyle={isLight ? 'dark-content' : 'light-content'}
    />
    <ScrollView>
      <ContentView imageOverlayColor={(!isLoading && colors !== 'undefined') ? `#${colors[0].value}` : false} {...otherContentProps}>
        <HTMLView>{description}</HTMLView>
      </ContentView>
      <HorizontalTileFeed
        content={children}
        isLoading={isLoading}
        showTileMeta
      />
      { // Don't render till data is ready. Consider adding placeholder views for the content above.
        !isLoading && <RelatedContent tags={tags} excludedIds={[id]} />}
    </ScrollView>
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </FlexedView>
));
export default SeriesSingle;
