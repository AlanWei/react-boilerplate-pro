import createReducer from 'utils/createReducer';

const defaultState = () => ({
  isLogin: false,
  user: {},
  loginErrorMsg: '',
});

const loginSuccess = (state, action) => ({
  ...state,
  isLogin: true,
  user: action.payload,
});

const loginError = (state, action) => ({
  ...state,
  isLogin: false,
  loginErrorMsg: action.payload.response.data.error,
});

const resetLoginErrorMsg = state => ({
  ...state,
  loginErrorMsg: '',
});

export default createReducer(defaultState, {
  APP_LOGIN_SUCCESS: loginSuccess,
  APP_LOGIN_ERROR: loginError,
  APP_RESET_LOGIN_ERROR_MSG: resetLoginErrorMsg,
});
