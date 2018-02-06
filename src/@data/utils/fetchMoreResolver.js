import get from 'lodash/get';
import set from 'lodash/fp/set';

// TODO: Test this
export default function fetchMoreResolver({ collectionName, mapTo, data } = {}) {
  return () => {
    data.fetchMore({
      variables: { ...data.variables, skip: (get(data, collectionName) || []).length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return set(mapTo || collectionName,
          [
            ...get(previousResult, collectionName),
            ...get(fetchMoreResult, collectionName),
          ],
          { ...previousResult },
        );
      },
    });
  };
}
