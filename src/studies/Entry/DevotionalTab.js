import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import { startCase, toLower } from 'lodash';
import { ScrollView } from 'react-native';

import ContentView, { Title, HTMLView } from '@ui/ContentView';
import scriptures from '@utils/scriptures';
import { H4 } from '@ui/typography';
import styled from '@ui/styled';

import EntryList from './EntryList';

const ScriptureLink = styled(({ theme }) => ({
  color: theme.colors.primary,
  textAlign: 'center',
  textDecorationLine: 'underline',
}))(H4);

const enhance = compose(
  pure,
  setPropTypes({
    title: PropTypes.string,
    body: PropTypes.string,
    scripture: PropTypes.array,
    route: PropTypes.shape({
      jumpTo: PropTypes.func.isRequired,
    }).isRequired,
  }),
);

const titleCase = text => (startCase(toLower(text)));

const DevotionalTab = enhance(({
  title,
  body,
  scripture = [],
  otherContentProps,
  entryData,
  isLoading,
  route: { jumpTo },
}) => (
  <ScrollView>
    <ContentView isLoading={isLoading} {...otherContentProps} >
      <Title>{titleCase(title)}</Title>
      {(scripture && scripture.length) ? (
        <ScriptureLink onPress={() => jumpTo('scripture')}>
          {scriptures.list({ scripture })}
        </ScriptureLink>
      ) : null}
      <HTMLView>{body}</HTMLView>
    </ContentView>
    {entryData && entryData.length ? <EntryList entries={entryData} isLoading={isLoading} /> : null}
  </ScrollView>
));

export default DevotionalTab;
