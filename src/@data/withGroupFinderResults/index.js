import { graphql } from 'react-apollo';
import { get } from 'lodash';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import groupsQuery from './groupsQuery';

const getDay = (schedule) => {
  switch (schedule) {
    case 'sunday':
      return 0;
    case 'monday':
      return 1;
    case 'tuesday':
      return 2;
    case 'wednesday':
      return 3;
    case 'thursday':
      return 4;
    case 'friday':
      return 5;
    case 'saturday':
      return 6;
    default:
      return '';
  }
};

export default graphql(groupsQuery, {
  props: ({ data } = {}) => ({
    content: data.content,
    isLoading: data.loading,
    refetch: data.refetch,
    canFetchMore: get(data, 'content.results.length') < get(data, 'content.count'),
    // fetchMore: () => {},
    // TODO: Not sure if this is working as expected, there's still an error onEndReached
    fetchMore: fetchMoreResolver({
      collectionName: 'content.results',
      data,
    }),
  }),
  options: (ownProps = {}) => ({
    ssr: false,
    variables: {
      tags: ownProps.tags || [],
      query: ownProps.q || '',
      latitude: ownProps.latitude || null,
      longitude: ownProps.longitude || null,
      zip: ownProps.zip || null,
      limit: 10,
      skip: 0,
      campus: ownProps.campus || null,
      campuses: ownProps.campuses || [],
      schedules: ownProps.schedules && ownProps.schedules.length
        ? ownProps.schedules.filter(x => x).map(x => getDay(x))
        : [],
    },
  }),
});

