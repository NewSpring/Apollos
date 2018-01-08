import React from 'react';
import PropTypes from 'prop-types';
import { compose, mapProps, pure, withProps } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import PaddedView from '@ui/PaddedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withStudyEntry from '@data/withStudyEntry';
import TabView, { SceneMap } from '@ui/TabView';
import { withThemeMixin } from '@ui/theme';
import Scripture from '@ui/Scripture';

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

const DevotionalTab = props => (
  <ScrollView>
    <ContentView {...props} />
  </ScrollView>
);

const ScriptureTab = ({ scripture }) => (
  <ScrollView>
    <PaddedView>
      <Scripture references={scripture.map(({ book, passage }) => `${book} ${passage}`)} />
    </PaddedView>
  </ScrollView>
);

ScriptureTab.propTypes = {
  scripture: PropTypes.arrayOf(PropTypes.shape({
    book: PropTypes.string, passage: PropTypes.string,
  })),
};

const Study = enhance(({
  content: {
    title,
    parent: { title: parentTitle, content: { isLight = true } = {} } = {},
    content: {
      images = [],
      body,
      scripture = [],
    } = {},
  } = {},
  isLoading,
}) => {
  const hasScripture = isLoading || scripture.length;
  const tabRoutes = [{ title: 'Devotional', key: 'devotional' }];
  if (hasScripture) tabRoutes.push({ title: 'Scripture', key: 'scripture' });

  return (
    <FlexedView>
      <Header titleText={parentTitle} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
      <TabView
        barStyle={isLight ? 'dark-content' : 'light-content'}
        routes={tabRoutes}
        renderScene={SceneMap({
          devotional: withProps({ title, images, body })(DevotionalTab),
          scripture: withProps({ scripture })(ScriptureTab),
        })}
      />
      <SecondaryNav>
        <Link icon="share" />
        <Link icon="like" />
      </SecondaryNav>
    </FlexedView>
  );
});

export default Study;
