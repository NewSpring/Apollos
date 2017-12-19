import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView, { Title, HTMLView } from '@ui/ContentView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withStudy from '@data/withStudy';
import { withThemeMixin } from '@ui/theme';

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
      ...otherContentProps
    } = {},
  } = { },
}) => (
  <FlexedView>
    <Header titleText={title} backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
    <ScrollView>
      <ContentView {...otherContentProps}>
        <Title>{title}</Title>
        <HTMLView>{description}</HTMLView>
      </ContentView>
    </ScrollView>
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </FlexedView>
));

export default Study;
