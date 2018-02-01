import React from 'react';
import { View } from 'react-native';
import { get, without } from 'lodash';
import { compose, withProps } from 'recompose';

import Header from '@ui/Header';
import BackgroundView from '@ui/BackgroundView';
import withGroupFinderResults from '@data/withGroupFinderResults';
import FeedView from '@ui/FeedView';
import { parse, stringify } from '@utils/queryString';
import SideBySideView, { Left, Right } from '@ui/SideBySideView';
import MediaQuery from '@ui/MediaQuery';
import styled from '@ui/styled';

import Map from './Map';
import AdUnit from './AdUnit';
import NoResults from './NoResults';
import GroupCard from './GroupCard';
import Filter from './Filter';

const FlexedSideBySideView = styled({ flex: 1 })(SideBySideView);
const FlexedLeft = styled({ flex: 1 })(Left);

const withSearchProps = withProps(({ location: { search = '' } = {} }) => ({
  query: parse(search),
}));

const enhance = compose(
  withSearchProps,
  withProps(({ query }) => query),
  withGroupFinderResults,
);

const tagPressHandler = ({ query, location, history }) => (value) => {
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

const campusSelectHandler = ({ query, location, history }) => (campus) => {
  const sanitizedValue = campus.toLowerCase();
  const campuses = get(query, 'campuses', []);
  const selected = campuses.indexOf(sanitizedValue) >= 0;

  let queryToReplace = { ...query };
  if (selected) {
    queryToReplace = { ...queryToReplace, campuses: without(campuses, sanitizedValue) };
  } else {
    queryToReplace = { ...queryToReplace, campuses: [...campuses, sanitizedValue] };
  }

  history.replace(`${location.pathname}?${stringify(queryToReplace)}`);
};

const filterUpdateHandler = ({ query, location, history }) => (newQuery) => {
  const queryToReplace = { ...query, ...newQuery };
  history.replace(`${location.pathname}?${stringify(queryToReplace)}`);
};

const Results = enhance(props => (
  <BackgroundView>
    <Header titleText="Group Finder" backButton />
    <FlexedSideBySideView>
      <FlexedLeft>
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
              selectedCampuses={props.query.campuses}
              onTagPress={tagPressHandler(props)}
              onSelectCampus={campusSelectHandler(props)}
            />
          )}
          ListEmptyComponent={NoResults}
          ListFooterComponent={AdUnit}
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
      </FlexedLeft>
      <MediaQuery minWidth="md">
        <Right>
          <Map
            latitude={parseFloat(props.query.latitude)}
            longitude={parseFloat(props.query.longitude)}
            groups={get(props, 'content.results', [])}
          />
        </Right>
      </MediaQuery>
    </FlexedSideBySideView>
  </BackgroundView>
));

export default Results;
