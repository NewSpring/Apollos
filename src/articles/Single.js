import React from 'react';
import { ScrollView, Image } from 'react-native';
import { compose, mapProps, pure } from 'recompose';
import { H1, H7 } from '@ui/typography';
import FlexedView from '@ui/FlexedView';
import ContentView from '@ui/ContentView';
import withArticle from '@data/withArticle';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withArticle,
);

const image = ({ images = [] } = {}) => images && images[0] && `https:${images[0].url}`;

const ArticleSingle = enhance(({
  content: {
    authors = [],
    title = '',
    content = {},
  } = { },
}) => console.log({ content }) || (
  <FlexedView>
    <ScrollView>
      {image(content) ? <Image style={{ width: '100%', height: 200 }} source={{ uri: image(content) }} /> : null}
      <H1>{title}</H1>
      {authors && authors.length ? <H7>By: {authors.join(', ')}</H7> : null}
      <ContentView body={content.body} />
    </ScrollView>
  </FlexedView>
));

export default ArticleSingle;
