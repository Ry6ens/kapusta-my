import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/',
  // baseURL: 'https://kapusta-server-my.herokuapp.com/',
});

const token = {
  set(accessToken) {
    instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  },
  unset() {
    instance.defaults.headers.Authorization = '';
  },
};

export const axiosSignUp = async userData => {
  const { data } = await instance.post('api/auth/signup', userData);
  token.set(data.accessToken);
  return data;
};

export const axiosLogIn = async userData => {
  const { data } = await instance.post('api/auth/login', userData);
  token.set(data.accessToken);

  return data;
};

export const axiosGoogleLogIn = async tokenResponse => {
  const { data } = await instance.post('api/auth/google', tokenResponse);
  token.set(data.accessToken);
  return data;
};

export const axiosRefresh = async (sid, refreshToken) => {
  token.set(refreshToken);
  const { data } = await instance.post('api/auth/refresh', sid);
  token.set(data.newAccessToken);
  return data;
};

export const axiosLogOut = async accessToken => {
  token.set(accessToken);
  const { data } = await instance.post('api/auth/logout');
  token.unset();
  return data;
};

// Delete user account
export const axiosUserDelete = async userId => {
  const { data } = await instance.delete(`api/auth/${userId}`);
  return data;
};

// Update user avatar
export const axiosUserUpdateAvatar = async userData => {
  const { data } = await instance.patch(
    'api/auth/updateAvatar',
    { avatar: userData },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};

// Update user account
export const axiosUserUpdateAccount = async userData => {
  const { data } = await instance.patch('api/auth/update', userData);
  return data;
};

export default instance;
