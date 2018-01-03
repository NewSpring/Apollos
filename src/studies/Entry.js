import React from 'react';
import { compose, mapProps, pure, withProps } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withStudyEntry from '@data/withStudyEntry';
import TabView, { SceneMap } from '@ui/TabView';
import { withThemeMixin } from '@ui/theme';

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

const Devotional = props => (
  <ScrollView>
    <ContentView {...props} />
  </ScrollView>
);

const Scripture = () => (
  <ScrollView />
);

const tabRoutes = [{ title: 'Devotional', key: 'devotional' }, { title: 'Scripture', key: 'scripture' }];

const Study = enhance(({
  content: {
    title,
    parent: { title: parentTitle, content: { isLight = true } = {} } = {},
    content: {
      images = [],
      body,
    } = {},
  } = {},
}) => (
  <FlexedView>
    <Header titleText={parentTitle} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
    <TabView
      barStyle={isLight ? 'dark-content' : 'light-content'}
      routes={tabRoutes}
      renderScene={SceneMap({
        devotional: withProps({ title, images, body })(Devotional),
        scripture: Scripture,
      })}
    />
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </FlexedView>
));

export default Study;
