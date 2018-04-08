import get from 'lodash/get';
import set from 'lodash/fp/set';
import isEqual from 'lodash/isEqual';

// NOTE: This can be improved by creating a class
const runningRefetches = [];
function isRefetching(props) {
  return runningRefetches.find(refetchProps => isEqual(props, refetchProps));
}

function registerRefetch(props) {
  runningRefetches.push(props);
}

function markRefetchAsComplete(props) {
  const refetchIndex = runningRefetches.findIndex(refetchProps => isEqual(props, refetchProps));
  runningRefetches.splice(refetchIndex, 1);
}

// TODO: Test this
export default function fetchMoreResolver({ collectionName, mapTo, data } = {}) {
  return () => {
    const skip = (get(data, collectionName) || []).length;
    const refetchProps = {
      collectionName,
      mapTo,
      data,
      skip,
    };
    // Short-circuit the refetch if it's already running
    if (isRefetching(refetchProps)) return;
    registerRefetch(refetchProps);

    data.fetchMore({
      variables: { ...data.variables, skip },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        markRefetchAsComplete(refetchProps);
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
