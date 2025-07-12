import {
  FETCH_USER_LOGIN_SUCCESS,
  REFRESH_TOKEN,
  UPDATE_PROFILE,
  USER_LOGOUT,
} from '../action/userAction';

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
    case UPDATE_PROFILE:
      return {
        ...state,
        account: {
          ...state.account,
          username: action?.payload?.DT?.username,
          image: action?.payload?.DT?.image,
        },
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
