import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { startCase, toLower } from 'lodash';

import withStudy from '@data/withStudy';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { Title, HTMLView } from '@ui/ContentView';
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
  <BackgroundView>
    <Header
      titleText={title}
      backButton
      barStyle={isLight ? 'dark-content' : 'light-content'}
    />
    <ScrollView>
      <ContentView imageOverlayColor={(!isLoading && colors !== 'undefined') ? `#${colors[0].value}` : ''} {...otherContentProps}>
        <Title>{startCase(toLower(title))}</Title>
        <HTMLView>{description}</HTMLView>
      </ContentView>
      <HorizontalTileFeed content={children} isLoading={isLoading} />
      { // Don't render till data is ready. Consider adding placeholder views for the content above.
        !isLoading && <RelatedContent tags={tags} excludedIds={[id]} />}
    </ScrollView>
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </BackgroundView>
));

export default Study;
