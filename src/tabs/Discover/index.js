import React from 'react';
import { compose, withState } from 'recompose';
import { Text as TextInput } from '@ui/inputs';
import { UIText } from '@ui/typography';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import Icon from '@ui/Icon';

import Feed from './Feed';
import Results from './Results';

const enhance = compose(
  withState('term', 'setSearchTerm'),
);

const Discover = enhance(({
  term = '',
  setSearchTerm,
}) => (
  <FlexedView>
    <Header>
      <FlexedView>
        <TextInput
          value={term}
          onChangeText={setSearchTerm}
          wrapperStyle={{ marginVertical: 0 }}
          prefix={<Icon name="search" size={24} />}
          suffix={(term && term.length) ? (
            <UIText onPress={() => setSearchTerm('')}>Cancel</UIText>
          ) : null}
          placeholder="Type your search here"
        />
      </FlexedView>
    </Header>
    {(term && term.length) ? <Results term={term} /> : <Feed />}
  </FlexedView>
));

export default Discover;
