import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView, { Title, HTMLView } from '@ui/ContentView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withStudyEntry from '@data/withStudyEntry';
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

const Study = enhance(({
  content: {
    title,
    parent: { title: parentTitle, content: { isLight = true } = {} } = {},
    content: {
      body,
      ...otherContentProps
    } = {},
  } = {},
}) => (
  <FlexedView>
    <Header titleText={parentTitle} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
    <ScrollView>
      <ContentView {...otherContentProps}>
        <Title>{title}</Title>
        <HTMLView>{body}</HTMLView>
      </ContentView>
    </ScrollView>
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </FlexedView>
));

export default Study;
