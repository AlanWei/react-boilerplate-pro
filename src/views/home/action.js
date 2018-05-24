import createAsyncAction from 'utils/createAsyncAction';

function getMessage() {
  return createAsyncAction('HOME_GET_MESSAGE', () => (
    Promise.resolve({
      data: 'React is awesome!',
    })
  ));
}

export default {
  getMessage,
};
