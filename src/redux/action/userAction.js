export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const userLogin = data => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const refreshToken = data => {
  return {
    type: REFRESH_TOKEN,
    payload: data,
  };
};
