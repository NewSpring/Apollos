import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import { get } from 'lodash';

import withSeriesContent from '@data/withSeriesContent';
import { withIsLoading } from '@ui/isLoading';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import ContentView, { HTMLView } from '@ui/ContentView';
import Button from '@ui/Button';
import { H6 } from '@ui/typography';
import Icon from '@ui/Icon';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import { withTheme, withThemeMixin } from '@ui/theme';
import styled from '@ui/styled';
import HorizontalTileFeed from '@ui/HorizontalTileFeed';
import RelatedContent from '@ui/RelatedContent';
import { withRouter } from '@ui/NativeWebRouter';
import withCachedContent from '@data/withCachedContent';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSeriesContent,
  withCachedContent,
  withRouter,
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

const ShareLink = withSeriesContent(Share);

const StyledButton = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit,
}))(Button);

const SeriesSingle = enhance(({
  content: {
    content: {
      isLiked,
      video,
      isLight = true,
      description,
      tags,
      colors,
      ...otherContentProps
    } = {},
    children,
  } = { },
  id,
  history,
  isLoading,
  theme,
}) => (
  <BackgroundView>
    <Header
      titleText="Series"
      backButton
      barStyle={isLight ? 'dark-content' : 'light-content'}
    />
    <ScrollView>
      <ContentView
        isLoading={isLoading}
        imageOverlayColor={(colors && colors.length) ? `#${get(colors, '[0].value')}` : null}
        {...otherContentProps}
      >
        {(video && video.embedUrl) ? (
          <StyledButton onPress={() => history.push(`/series/${id}/trailer`)} type={'ghost'} bordered>
            <Icon name="play" size={theme.helpers.rem(0.875)} fill={theme.colors.text.primary} />
            <H6>{' '}Watch The Trailer</H6>{/* NOTE: empty string pads the text from the icon */}
          </StyledButton>
        ) : null}
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
      <ShareLink id={id} />
      <Like id={id} isLiked={isLiked} />
    </SecondaryNav>
  </BackgroundView>
));
export default SeriesSingle;
