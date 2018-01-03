import React from 'react';
import { View } from 'react-native';
import { get, without } from 'lodash';
import { compose, withProps } from 'recompose';

import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import withGroupFinderResults from '@data/withGroupFinderResults';
import FeedView from '@ui/FeedView';
import { parse, stringify } from '@utils/queryString';

import GroupCard from './GroupCard';
import Filter from './Filter';

const withSearchProps = withProps(({ location: { search = '' } = {} }) => ({
  query: parse(search),
}));

const enhance = compose(
  withSearchProps,
  withProps(({ query }) => query),
  withGroupFinderResults,
);

const tagPressHandler = ({ query, location, history }) => ({ value }) => {
  const sanitizedValue = value.toLowerCase();
  let replaceTags = query.tags || [];
  if (replaceTags.indexOf(sanitizedValue) > -1) {
    replaceTags = without(replaceTags, sanitizedValue);
  } else {
    replaceTags.push(sanitizedValue);
  }
  history.replace(`${location.pathname}?${stringify({
    ...query,
    tags: replaceTags,
  })}`);
};

const filterUpdateHandler = ({ query, location, history }) => (newQuery) => {
  const queryToReplace = { ...query, ...newQuery };
  history.replace(`${location.pathname}?${stringify(queryToReplace)}`);
};

const Results = enhance(props => (
  <FlexedView>
    <Header titleText="Group Finder" backButton />
    <FeedView
      content={get(props, 'content.results', [])}
      isLoading={get(props, 'isLoading', true)}
      numColumns={1}
      fetchMore={props.fetchMore}
      refetch={props.refetch}
      renderItem={({ item }) => (
        <GroupCard
          {...item}
          selectedTags={props.query.tags}
          onTagPress={tagPressHandler(props)}
        />
      )}
      ListHeaderComponent={
        <View>
          <Filter
            query={props.query}
            onUpdateFilter={filterUpdateHandler(props)}
            isLoadingResults={get(props, 'isLoading', true)}
            numResults={get(props, 'content.count', 0)}
          />
        </View>
      }
    />
  </FlexedView>
));

export default Results;
