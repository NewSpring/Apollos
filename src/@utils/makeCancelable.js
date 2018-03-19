const makeCancelable = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)), // eslint-disable-line
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error)), // eslint-disable-line
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export default makeCancelable;
