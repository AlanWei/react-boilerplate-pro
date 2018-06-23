import Cookie from 'js-cookie';
import api from 'utils/api';
import createAsyncAction from 'utils/createAsyncAction';

const getNotices = () => (
  createAsyncAction('APP_GET_NOTICES', () => (
    api.get('/notices')
  ))
);

const deleteNotice = (id) => {
  const action = createAsyncAction('APP_DELETE_NOTICE', () => (
    api.delete(`/notices/${id}`)
  ));

  return dispatch => (
    action(dispatch)
      .then((callbackAction) => {
        if (callbackAction.type === 'APP_DELETE_NOTICE_SUCCESS') {
          return getNotices()(dispatch);
        }
        return null;
      })
  );
};

const login = (username, password) => (
  createAsyncAction('APP_LOGIN', () => (
    api.post('/login', {
      username,
      password,
    })
  ))
);

const resetLoginErrorMsg = () => ({
  type: 'APP_RESET_LOGIN_ERROR_MSG',
});

const loginUser = (username, password) => {
  const action = login(username, password);

  return dispatch => (
    action(dispatch)
      .then(((callbackAction) => {
        if (callbackAction.type === 'APP_LOGIN_SUCCESS') {
          Cookie.set('user', JSON.stringify(callbackAction.payload));
          return getNotices()(dispatch);
        }
        if (callbackAction.type === 'APP_LOGIN_ERROR') {
          return setTimeout(() => dispatch(resetLoginErrorMsg()), 1500);
        }
        return null;
      }))
  );
};

const logout = () => {
  Cookie.remove('user');

  return ({
    type: 'APP_LOGOUT',
  });
};

const updateNotification = notification => ({
  type: 'APP_UPDATE_NOTIFICATION',
  payload: notification,
});

const resetNotification = () => ({
  type: 'APP_RESET_NOTIFICATION',
});

export default {
  login,
  loginUser,
  resetLoginErrorMsg,
  logout,
  getNotices,
  deleteNotice,
  updateNotification,
  resetNotification,
};
