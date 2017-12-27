import { graphql } from 'react-apollo';
import { get } from 'lodash';
import fetchMoreResolver from '@data/utils/fetchMoreResolver';
import groupsQuery from './groupsQuery';

const getDay = (schedule: String) => {
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
    canFetchMore: get(data, 'content.results.length') < get(data, 'content.count'),
    fetchMore: fetchMoreResolver({
      collectionName: 'content',
      data,
    }),
  }),
  options: (ownProps = {}) => ({
    ssr: false,
    variables: {
      tags: ownProps.tags && ownProps.tags.split(',').filter(x => x),
      query: ownProps.q || '',
      latitude: ownProps.latitude || null,
      longitude: ownProps.longitude || null,
      zip: ownProps.zip !== 'none' ? ownProps.zip : '',
      limit: 10,
      offset: 0,
      campus: ownProps.campus !== 'none' ? ownProps.campus : '',
      campuses:
        ownProps.campuses && ownProps.campuses.length
          ? ownProps.campuses.split(',').filter(x => x)
          : [],
      schedules:
        ownProps.schedules && ownProps.schedules.length
          ? ownProps.schedules.split(',').filter(x => x).map(x => getDay(x))
          : [],
    },
  }),
});

