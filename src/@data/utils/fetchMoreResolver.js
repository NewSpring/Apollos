import get from 'lodash/get';
import set from 'lodash/fp/set';

// TODO: this should be passed in and managed via state
console.log('defining fetchLock');
let fetchLock;

export default function fetchMoreResolver({
  collectionName,
  // TODO: not sure what this is doing
  // mapTo,
  data,
} = {}) {
  const i = Date.now();

  return () => {
    console.log(`${i} calling fetchMore(${collectionName})`);
    console.log(`${i} fetchLock`, fetchLock);
    // Short-circuit the fetchMore if it's already running
    if (fetchLock) {
      console.log(`${i} short circuiting fetchMore...`);
      return;
    }
    fetchLock = true;
    console.log(`${i} fetchLock ON`);

    const skip = (get(data, collectionName) || []).length;
    console.log(`${i} skipping ${skip} items...`);

    data.fetchMore({
      variables: { ...data.variables, skip },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // NOTE: not sure what this is doing
        // fetchLock = false;
        // console.log('fetchLock OFF');
        // if (!fetchMoreResult) {
        // console.log('returning previous data...');
        // console.log(previousResult);
        // return previousResult;
        // }
        console.log(`${i} previousResult`, previousResult);
        console.log(`${i} fetchMoreResult`, fetchMoreResult);

        // combine previous data and fetchMore data
        const newResult = set(
          // NOTE: not sure what this is doing
          // mapTo || collectionName,
          collectionName,
          [
            ...(get(previousResult, collectionName) || []),
            ...(get(fetchMoreResult, collectionName) || []),
          ],
          { ...previousResult },
        );
        console.log(`${i} newResult`, newResult);
        // NOTE: the only problem with this may be if another call gets
        // made in between the unlock
        fetchLock = false;
        return newResult;
      },
    });
  };
}
