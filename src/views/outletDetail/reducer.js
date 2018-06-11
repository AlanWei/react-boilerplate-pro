import createReducer from 'utils/createReducer';

const defaultState = () => ({
  outlet: {},
});

const getSuccess = (state, action) => ({
  ...state,
  outlet: action.payload,
});

export default createReducer(defaultState, {
  OUTLETDETAIL_GET_SUCCESS: getSuccess,
});
