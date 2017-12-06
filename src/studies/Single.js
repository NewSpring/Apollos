import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import MediaQuery from '@ui/MediaQuery';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withStudy from '@data/withStudy';
import { withThemeMixin } from '@ui/theme';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withStudy,
  withThemeMixin(({ content: { content = {} } = {} } = {}) => {
    const theme = {
      colors: {
        palette: content.isLight ? 'light' : 'dark',
      },
    };
    if (content.colors && content.colors.length) {
      const primary = `#${content.colors[0].value}`;
      // theme.colors.common = { primary };
      theme.colors.background = { default: primary };
    }
    return theme;
  }),
);

const Study = enhance(({
  content: {
    content: {
      images = [],
      description,
    } = {},
  } = { },
}) => (
  <FlexedView>
    <Header titleText="News" backButton />
    <ScrollView>
      <ContentView images={images} body={description} />
    </ScrollView>
    <MediaQuery maxWidth="md">
      <SecondaryNav>
        <Link icon="share" />
        <Link icon="like" />
      </SecondaryNav>
    </MediaQuery>
  </FlexedView>
));

export default Study;
