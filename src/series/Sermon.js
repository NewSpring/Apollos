import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { Title, SubHeading, HTMLView } from '@ui/ContentView';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import withSermon from '@data/withSermon';
import { withThemeMixin } from '@ui/theme';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';
import withCachedContent, { withCachedParentContent } from '@data/withCachedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSermon,
  withCachedContent,
  withCachedParentContent,
  withThemeMixin(({ content: { parent: { content = {} } = {} } = {} } = {}) => {
    const theme = {};
    if (content.colors && content.colors.length) {
      const primary = `#${content.colors[0].value}`;
      theme.colors = {
        background: {
          primary,
        },
      };
    }
    return theme;
  }),
);

const ShareLink = withSermon(Share);

const Sermon = enhance(
  ({
    id,
    content: {
      title,
      parent: {
        title: parentTitle,
        content: { isLight = true, images: seriesImages, colors: seriesColors } = {},
        children,
      } = {},
      content: {
        isLiked, speaker, description, ...otherContentProps
      } = {},
    } = {},
    isLoading,
  }) => (
    <BackgroundView>
      <Header
        titleText={parentTitle}
        backButton
        barStyle={isLight ? 'dark-content' : 'light-content'}
      />
      <ScrollView>
        <ContentView
          isLoading={isLoading}
          title={title}
          seriesImages={seriesImages}
          seriesColors={seriesColors}
          contentId={id}
          {...otherContentProps}
        >
          <Title>{startCase(toLower(title))}</Title>
          <SubHeading>{startCase(toLower(speaker))}</SubHeading>
          <HTMLView>{description}</HTMLView>
        </ContentView>
        <HorizontalTileFeed content={children} isLoading={isLoading} showTileMeta />
      </ScrollView>
      <SecondaryNav isLoading={isLoading} fullWidth>
        <ShareLink id={id} />
        <Like id={id} isLiked={isLiked} />
      </SecondaryNav>
    </BackgroundView>
  ),
);

export default Sermon;
