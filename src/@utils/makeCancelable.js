const makeCancelable = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => hasCanceled ? reject({isCancelled: true}) : resolve(val), // eslint-disable-line
      error => hasCanceled ? reject({isCancelled: true}) : reject(error), // eslint-disable-line
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
