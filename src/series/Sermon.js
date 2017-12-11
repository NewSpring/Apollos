import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import HTMLView from '@ui/HTMLView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withSermon from '@data/withSermon';
import { H2, H4 } from '@ui/typography';
import { withThemeMixin } from '@ui/theme';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSermon,
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

const Sermon = enhance(({
  content: {
    title,
    parent: { title: parentTitle, content: { isLight = true } = {} } = {},
    content: {
      speaker,
      description,
    } = {},
  } = {},
}) => (
  <FlexedView>
    <Header titleText={parentTitle} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
    <ScrollView>
      <H2>{title}</H2>
      <H4>{speaker}</H4>
      <HTMLView>{description}</HTMLView>
    </ScrollView>
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </FlexedView>
));

export default Sermon;
