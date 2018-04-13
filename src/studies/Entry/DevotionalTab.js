import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { startCase, toLower } from 'lodash';
import { ScrollView } from 'react-native';

import ContentView, { Title, HTMLView } from '@ui/ContentView';
import EntryList from './EntryList';

const enhance = compose(
  pure,
  setPropTypes({
    title: PropTypes.string,
    body: PropTypes.string,
  }),
);

const titleCase = text => (startCase(toLower(text)));

const DevotionalTab = enhance(({
  title,
  body,
  otherContentProps,
  entryData,
  isLoading,
}) => (
  <ScrollView>
    <ContentView isLoading={isLoading} {...otherContentProps} >
      <Title>{titleCase(title)}</Title>
      <HTMLView>{body}</HTMLView>
    </ContentView>
    {entryData && entryData.length ? <EntryList entries={entryData} isLoading={isLoading} /> : null}
  </ScrollView>
));

export default DevotionalTab;
