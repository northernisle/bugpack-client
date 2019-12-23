import { AUTH_USER_SET, AUTH_USER_GET, AUTH_USER_REMOVE } from '../actions/actionTypes';
import { updateToken } from '../../utils/configs/axiosConfig';

const processAuthUser = (state = {
  pending: false,
  token: null,
  user: null,
  error: null
}, action, sideEffect) => {
  switch (action.status) {

    case 'pending':
      return Object.assign({}, state, { pending: true });

    case 'success':
      const { response } = action;

      !!sideEffect && sideEffect();
      updateToken(response?.token);

      return {
        pending: false,
        token: response?.token ?? null,
        user: response?.user ?? null,
        error: null
      };

    case 'error':
      return {
        pending: false,
        token: null,
        user: null,
        error: action.error
      };

    default:
      return state;
  }
}

const authUser = (authUser = null, action) => {
  switch (action.type) {

    case AUTH_USER_SET:
      return processAuthUser(authUser, action, () => {
        window.localStorage.setItem('authUser', JSON.stringify(action?.response));
      });

    case AUTH_USER_GET:
      return authUser ?? JSON.parse(window.localStorage.getItem('authUser'));

    case AUTH_USER_REMOVE:
      return processAuthUser(authUser, action, () => {
        window.localStorage.removeItem('authUser');
      });

    default:
      return authUser;
  }
}

export default authUser;