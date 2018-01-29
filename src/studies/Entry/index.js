import React from 'react';
import { compose, mapProps, pure, withProps } from 'recompose';

import withStudyEntry from '@data/withStudyEntry';
import FlexedRootView from '@ui/FlexedRootView';
import Header from '@ui/Header';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import TabView, { SceneMap } from '@ui/TabView';
import { withThemeMixin } from '@ui/theme';

import ScriptureTab from './ScriptureTab';
import DevotionalTab from './DevotionalTab';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStudyEntry,
  withThemeMixin(({ content: { parent: { content = {} } = {} } = {} } = {}) => {
    const theme = { };
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

const Study = enhance(({
  content: {
    title,
    parent: {
      title: parentTitle,
      content: { isLight = true } = {},
      children,
    } = {},
    content: {
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

  return (
    <FlexedRootView>
      <Header titleText={parentTitle} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
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
        <Link icon="share" />
        <Link icon="like" />
      </SecondaryNav>
    </FlexedRootView>
  );
});

export default Study;
