import createReducer from 'utils/createReducer';

const defaultState = () => ({
  isLogin: false,
  user: {},
  loginErrorMsg: '',
  notices: [],
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

const logout = state => ({
  ...state,
  isLogin: false,
  user: {},
});

const getNoticesSuccess = (state, action) => ({
  ...state,
  notices: action.payload,
});

export default createReducer(defaultState, {
  APP_LOGIN_SUCCESS: loginSuccess,
  APP_LOGIN_ERROR: loginError,
  APP_RESET_LOGIN_ERROR_MSG: resetLoginErrorMsg,
  APP_LOGOUT: logout,
  APP_GET_NOTICES_SUCCESS: getNoticesSuccess,
});
