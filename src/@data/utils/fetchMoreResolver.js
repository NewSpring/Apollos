// TODO: Test this, make it more flexible
export default function fetchMoreResolver({ collectionName, mapTo, data } = {}) {
  return () => {
    data.fetchMore({
      variables: { ...data.variables, skip: data[collectionName].length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) return previousResult;
        return {
          [mapTo || collectionName]: [
            ...previousResult[collectionName],
            ...fetchMoreResult.data[collectionName],
          ],
        };
      },
    });
  };
}
