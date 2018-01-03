import get from 'lodash/get';
import set from 'lodash/set';

// TODO: Test this
export default function fetchMoreResolver({ collectionName, mapTo, data } = {}) {
  return () => {
    // console.log(get(data, collectionName, []).length);
    data.fetchMore({
      variables: { ...data.variables, skip: get(data, collectionName, []).length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // console.log({ previousResult, fetchMoreResult });
        if (!fetchMoreResult) return previousResult;
        // console.log(set({ ...previousResult },
        //   mapTo || collectionName,
        //   [
        //     ...get(previousResult, collectionName),
        //     ...get(fetchMoreResult, collectionName),
        //   ],
        // ));
        return set({ ...previousResult },
          mapTo || collectionName,
          [
            ...get(previousResult, collectionName),
            ...get(fetchMoreResult, collectionName),
          ],
        );
      },
    });
  };
}
