import React from 'react';
import { compose, mapProps, pure, withProps } from 'recompose';
import { get } from 'lodash';

import withStudyEntry from '@data/withStudyEntry';
import BackgroundView from '@ui/BackgroundView';
import Header from '@ui/Header';
import SecondaryNav, { Like, Share } from '@ui/SecondaryNav';
import TabView, { SceneMap } from '@ui/TabView';
import { withThemeMixin } from '@ui/theme';
import withCachedContent, { withCachedParentContent } from '@data/withCachedContent';

import ScriptureTab from './ScriptureTab';
import DevotionalTab from './DevotionalTab';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStudyEntry,
  withCachedContent,
  withCachedParentContent,
  withProps(({ content }) => {
    let colors = get(content, 'content.colors');
    if (!colors || !colors.length) colors = get(content, 'parent.content.colors');
    if (!colors) colors = [];
    return { colors };
  }),
  withThemeMixin(({ colors }) => {
    const theme = { };
    if (colors && colors.length) {
      const primary = `#${colors[0].value}`;
      theme.colors = {
        background: {
          primary,
        },
      };
    }
    return theme;
  }),
);

const ShareLink = withStudyEntry(Share);

const Study = enhance(({
  id,
  content: {
    title,
    parent = {},
    content: {
      isLiked,
      body,
      scripture = [],
      ...otherContentProps
    } = {},
  } = {},
  isLoading,
}) => {
  const hasScripture = isLoading || scripture.length;
  const tabRoutes = [{ title: 'Devotional', key: 'devotional' }];
  if (hasScripture) tabRoutes.push({ title: 'Scripture', key: 'scripture' });

  const {
    title: parentTitle,
    content: { isLight = false } = {},
    children = [],
  } = parent || {};

  return (
    <BackgroundView>
      <Header titleText={parentTitle || 'Devotional'} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
      <TabView
        barStyle={isLight ? 'dark-content' : 'light-content'}
        routes={tabRoutes}
        renderScene={SceneMap({
          devotional: withProps({
            title,
            body,
            otherContentProps,
            entryData: children,
            isLoading,
          })(DevotionalTab),
          scripture: withProps({
            scripture,
            entryData: children,
            isLoading,
          })(ScriptureTab),
        })}
      />
      <SecondaryNav>
        <ShareLink id={id} />
        <Like id={id} isLiked={isLiked} />
      </SecondaryNav>
    </BackgroundView>
  );
});

export default Study;
