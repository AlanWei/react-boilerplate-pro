function createAsyncSideEffect(status, action, transforms, onError) {
  const expectedStatus = `_${status.toUpperCase()}`;

  return dispatch => (
    action(dispatch)
      .then((resultAction) => {
        if (resultAction.type.indexOf(expectedStatus) === -1) {
          return resultAction;
        }

        return transforms.reduce(
          (transformed, fn) => fn(dispatch, transformed),
          resultAction,
        );
      })
      .catch((err) => {
        if (typeof onError === 'function') {
          return onError(err);
        }
        throw err;
      })
  );
}

export default createAsyncSideEffect;
