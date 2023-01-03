import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  axiosSignUp,
  axiosLogIn,
  axiosGoogleLogIn,
  axiosRefresh,
  axiosLogOut,
  axiosUserDelete,
  axiosUserUpdateAvatar,
  axiosUserUpdateAccount,
} from 'api/auth';

export const signUp = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosSignUp(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;

      return rejectWithValue({ data, status });
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosLogIn(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const googleLogIn = createAsyncThunk(
  'auth/googlelogin',
  async (tokenResponse, { rejectWithValue }) => {
    try {
      const data = await axiosGoogleLogIn(tokenResponse);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (sid, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { refreshToken },
      } = getState();
      const data = await axiosRefresh(sid, refreshToken);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!auth.sid) {
        return false;
      }
    },
  }
);

export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { accessToken },
      } = getState();
      const data = await axiosLogOut(accessToken);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Delete user account
export const userDelete = createAsyncThunk(
  'auth/deleteUserAccount',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosUserDelete(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Update avatar
export const userUpdateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosUserUpdateAvatar(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

// Update account
export const userUpdateAccount = createAsyncThunk(
  'user/updateAccount',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosUserUpdateAccount(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
