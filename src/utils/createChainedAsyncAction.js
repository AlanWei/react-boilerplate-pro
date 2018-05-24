import isArray from 'lodash/isArray';

function createChainedAsyncAction(firstAction, handlers) {
  if (!isArray(handlers)) {
    throw new Error('[createChainedAsyncAction] handlers should be an array');
  }

  return dispatch => (
    firstAction(dispatch)
      .then((resultAction) => {
        for (let i = 0; i < handlers.length; i += 1) {
          const { status, callback } = handlers[i];
          const expectedStatus = `_${status.toUpperCase()}`;

          if (resultAction.type.indexOf(expectedStatus) !== -1) {
            return callback(resultAction.payload)(dispatch);
          }
        }

        return resultAction;
      })
  );
}

export default createChainedAsyncAction;
