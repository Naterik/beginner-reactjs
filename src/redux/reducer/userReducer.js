import { FETCH_USER_LOGIN_SUCCESS, REFRESH_TOKEN, USER_LOGOUT } from '../action/userAction';

const INITIAL_STATE = {
  account: {
    access_token: '',
    refresh_token: '',
    username: '',
    role: '',
    email: '',
    image: '',
  },
  isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  console.log('action:', action.payload);
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          role: action?.payload?.DT?.role,
          email: action?.payload?.DT?.email,
          image: action?.payload?.DT?.image,
        },
        isAuthenticated: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        account: {
          access_token: '',
          refresh_token: '',
          username: '',
          role: '',
          email: '',
          image: '',
        },
        isAuthenticated: false,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        account: {
          ...state.account,
          access_token: action.payload.access_token,
        },
      };
    default:
      return state;
  }
};
export default userReducer;
