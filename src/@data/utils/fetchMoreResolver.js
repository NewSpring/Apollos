import get from 'lodash/get';
import set from 'lodash/fp/set';


export default function fetchMoreResolver({ collectionName, mapTo, data } = {}) {
  let isRefetching;

  return () => {
    const skip = (get(data, collectionName) || []).length;

    // Short-circuit the refetch if it's already running
    if (isRefetching) return;
    isRefetching = true;

    data.fetchMore({
      variables: { ...data.variables, skip },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        isRefetching = false;
        if (!fetchMoreResult) return previousResult;

        return set(mapTo || collectionName,
          [
            ...(get(previousResult, collectionName) || []),
            ...(get(fetchMoreResult, collectionName) || []),
          ],
          { ...previousResult },
        );
      },
    });
  };
}
