import get from 'lodash/get';
import set from 'lodash/fp/set';

// TODO: this should be passed in and managed via state
let fetchLock;

export default function fetchMoreResolver({
  collectionName,
  // NOTE: not sure if mapTo is ever used
  // mapTo,
  data,
} = {}) {
  return () => {
    // Short-circuit the fetchMore if it's already running
    if (fetchLock) {
      return;
    }

    // lock to make sure this function doesn't run again until this thread is done
    fetchLock = true;

    // set the new offset to the number of items in the list
    const skip = (get(data, collectionName) || []).length;

    data.fetchMore({
      variables: { ...data.variables, skip },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // NOTE: not sure what this is doing
        // if (!fetchMoreResult) return previousResult;

        // combine previous data and fetchMore data
        const newResult = set(
          // NOTE: not sure if mapTo is ever used
          // mapTo || collectionName,
          collectionName,
          [
            ...(get(previousResult, collectionName) || []),
            ...(get(fetchMoreResult, collectionName) || []),
          ],
          { ...previousResult },
        );
        // TODO: the only problem with this may be if another call gets
        // made in between the unlock and the return. Not sure how to fix.
        fetchLock = false;
        return newResult;
      },
    });
  };
}
