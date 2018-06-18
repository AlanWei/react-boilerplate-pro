import Cookie from 'js-cookie';
import isNil from 'lodash/isNil';
import appAction from '../action';

const initClient = (dispatch) => {
  const isLogin = !isNil(Cookie.get('user'));

  const commonActions = [];

  if (isLogin) {
    commonActions.push(dispatch({
      type: 'APP_LOGIN_SUCCESS',
      payload: JSON.parse(Cookie.get('user')),
    }));
    commonActions.push(dispatch(appAction.getNotices()));
  }

  return commonActions;
};

export default initClient;
