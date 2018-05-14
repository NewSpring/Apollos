import React from 'react';
import { Platform, View } from 'react-native';
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
import Meta from '@ui/Meta';

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
    <Meta
      title="Group Finder - Results"
      description="Who are your people? We know it's important to be connected, but it's hard to build lasting friendships. What if taking one simple step changed everything? At NewSpring, we’re trying to make it easier for you to find people who share your interests. We know that when you get together with people and have fun, you’ll begin to grow into a strong community that serves and grows together. What if you are one step away from saying, “These are my people”?"
      image="https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/groups/groups.2x1_2000_1000_90_a789ae07aae81961.jpg"
    />
    <Header titleText="Group Finder" backButton />
    <FlexedSideBySideView>
      <FlexedLeft>
        <FeedView
          content={get(props, 'content.results', [])}
          isLoading={get(props, 'isLoading', true)}
          numColumns={1}
          fetchMore={props.fetchMore}
          refetch={props.refetch}
          refreshing={props.isLoading}
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
      {Platform.OS === 'web' ? (
        <MediaQuery minWidth="md">
          <Right>
            <Map
              latitude={parseFloat(props.query.latitude)}
              longitude={parseFloat(props.query.longitude)}
              groups={get(props, 'content.results', [])}
            />
          </Right>
        </MediaQuery>
      ) : null}
    </FlexedSideBySideView>
  </BackgroundView>
));

export default Results;
