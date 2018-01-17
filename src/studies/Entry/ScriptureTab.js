import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';

import PaddedView from '@ui/PaddedView';
import Scripture from '@ui/Scripture';

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

const ScriptureTab = enhance(({ scripture }) => (
  <PaddedView>
    <Scripture references={bibleData(scripture)} />
  </PaddedView>
));

export default ScriptureTab;
