import React from 'react';
import { get, without } from 'lodash';
import { compose, withProps } from 'recompose';

import Header from '@ui/Header';
import FlexedView from '@ui/FlexedView';
import withGroupFinderResults from '@data/withGroupFinderResults';
import FeedView from '@ui/FeedView';
import { parse, stringify } from '@utils/queryString';

import GroupCard from './GroupCard';

const FeedViewWithResults = compose(
  withGroupFinderResults,
  withProps(({ content }) => ({
    content: get(content, 'results', []),
  })),
)(FeedView);

const withSearchProps = withProps(({ location: { search = '' } = {} }) => ({
  query: parse(search),
}));

const enhance = compose(
  withSearchProps,
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

const Results = enhance(props => (
  <FlexedView>
    <Header titleText="Group Finder" backButton />
    <FeedViewWithResults
      {...props.query}
      numColumns={1}
      renderItem={({ item }) => (
        <GroupCard
          {...item}
          selectedTags={props.query.tags}
          onTagPress={tagPressHandler(props)}
        />
      )}
    />
  </FlexedView>
));

export default Results;
