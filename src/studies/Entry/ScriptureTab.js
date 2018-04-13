import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { ScrollView } from 'react-native';

import PaddedView from '@ui/PaddedView';
import Scripture from '@ui/Scripture';
import EntryList from './EntryList';

const enhance = compose(
  pure,
  setPropTypes({
    scripture: PropTypes.arrayOf(
      PropTypes.shape({
        book: PropTypes.string,
        passage: PropTypes.string,
      }),
    ).isRequired,
  }),
);

const bibleData = scripture => (
  scripture.map(({ book, passage }) => `${book} ${passage}`)
);

const ScriptureTab = enhance(({ scripture, entryData, isLoading }) => (
  <ScrollView>
    <PaddedView>
      <Scripture references={bibleData(scripture)} />
    </PaddedView>
    {entryData && entryData.length ? <EntryList entries={entryData} isLoading={isLoading} /> : null}
  </ScrollView>
));

export default ScriptureTab;
