import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import withStudy from '@data/withStudy';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { Title, HTMLView } from '@ui/ContentView';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import { withThemeMixin } from '@ui/theme';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';
import RelatedContent from '@ui/RelatedContent';
import withCachedContent from '@data/withCachedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStudy,
  withCachedContent,
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

const ShareLink = withStudy(Share);

const Study = enhance(
  ({
    id,
    content: {
      title,
      content: {
        isLiked, isLight = true, description, tags, colors, ...otherContentProps
      } = {},
      children,
    } = {},
    isLoading,
  }) => (
    <BackgroundView>
      <Header titleText={title} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
      <ScrollView>
        <ContentView
          isLoading={isLoading}
          imageOverlayColor={!isLoading && colors && colors.length ? `#${colors[0].value}` : ''}
          {...otherContentProps}
        >
          <Title>{startCase(toLower(title))}</Title>
          <HTMLView>{description}</HTMLView>
        </ContentView>
        <HorizontalTileFeed content={children} isLoading={isLoading} />
        {// Don't render till data is ready. Consider adding placeholder views for the content above.
        !isLoading && <RelatedContent tags={tags} excludedIds={[id]} />}
      </ScrollView>
      <SecondaryNav isLoading={isLoading}>
        <ShareLink id={id} />
        <Like id={id} isLiked={isLiked} />
      </SecondaryNav>
    </BackgroundView>
  ),
);

export default Study;
