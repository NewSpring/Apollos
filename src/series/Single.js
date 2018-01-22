import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';

import withSeriesContent from '@data/withSeriesContent';
import { withIsLoading } from '@ui/isLoading';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView, { HTMLView } from '@ui/ContentView';
import Button from '@ui/Button';
import { H6 } from '@ui/typography';
import Icon from '@ui/Icon';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';
import RelatedContent from '@ui/RelatedContent';

import CardStack from '@ui/CardStack';
import { Route } from '@ui/NativeWebRouter';
import SeriesTrailer from './SeriesTrailer';

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
  withTheme(),
  withIsLoading,
);

const StyledButton = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(Button);

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
  theme,
}) => (
  <FlexedView>
    <Header
      titleText="Series"
      backButton
      barStyle={isLight ? 'dark-content' : 'light-content'}
    />
    <ScrollView>
      <ContentView imageOverlayColor={(!isLoading && colors !== 'undefined') ? `#${colors[0].value}` : ''} {...otherContentProps}>
        <StyledButton type={'ghost'} bordered pill>
          <Icon name="play" size={theme.helpers.rem(0.875)} fill={theme.colors.text.primary} />
          <H6>{' '}Watch The Trailer</H6>{/* NOTE: empty string pads the text from the icon */}
        </StyledButton>
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

    <CardStack direction="vertical">
      <Route exact path="/series/:id/trailer" component={SeriesTrailer} />
    </CardStack>
  </FlexedView>
));
export default SeriesSingle;
