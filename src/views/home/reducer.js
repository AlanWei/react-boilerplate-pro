import createReducer from 'utils/createReducer';

const defaultState = () => ({
  message: '',
});

const getMessageSuccess = (state, action) => ({
  ...state,
  message: action.payload.data,
});

export default createReducer(defaultState, {
  HOME_GET_MESSAGE_SUCCESS: getMessageSuccess,
});
