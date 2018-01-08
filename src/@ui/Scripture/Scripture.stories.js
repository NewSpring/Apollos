import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import PaddedView from '@ui/PaddedView';
import { storiesOf } from '@storybook/react-native';

import Scripture from './';
import { ItemWithoutData } from './Item';

const references = [
  'Psalm 1',
  'Matthew 4:13-17',
  'Matthew 11:15-19',
  'Matthew 13:14-15',
  'Matthew 21:4-5',
  'Psalm 119',
  'Proverbs 24:23-24',
  'Jeremiah 23:33-40',
  'Psalm 105:1-4',
];

const ScriptureStory = ({ reference }) => ( // eslint-disable-line
  <ScrollView style={StyleSheet.absoluteFill}>
    <PaddedView>
      <Scripture references={[reference]} />
    </PaddedView>
  </ScrollView>
);

const stories = storiesOf('Scripture', module);

references.forEach(reference => (
  stories.add(reference, () => <ScriptureStory reference={reference} />)
));

stories.add('Loading State', () => (
  <PaddedView>
    <ItemWithoutData query="Genesis 1:1-10" isLoading />
  </PaddedView>
));
