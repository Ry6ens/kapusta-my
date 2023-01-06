import { createSlice } from '@reduxjs/toolkit';

import {
  signUp,
  logIn,
  googleLogIn,
  refresh,
  logOut,
  userDelete,
  userUpdateAvatar,
  userUpdateAccount,
} from './auth-operations';

const initialState = {
  user: {},
  todaySummary: {},
  accessToken: '',
  refreshToken: '',
  message: '',
  sid: '',
  isLogin: false,
  loading: false,
  isRefreshing: false,
  error: null,
};

const accessAuth = (state, { accessToken, refreshToken, sid, userData }) => {
  state.user = userData;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.sid = sid;
  state.loading = false;
  state.isLogin = true;
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearNewUser: state => {
      state.newUser = {};
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // SignUp by email
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, _) => {
        state.loading = false;
        state.isLogin = false;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // LogIn
    builder
      .addCase(logIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        accessAuth(state, payload);
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Google LogIn
    builder
      .addCase(googleLogIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        accessAuth(state, payload);
      })
      .addCase(googleLogIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Refresh token
    builder
      .addCase(refresh.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.loading = false;
        accessAuth(state, payload);
        state.sid = payload.newSid;
        state.accessToken = payload.newAccessToken;
        state.refreshToken = payload.newRefreshToken;
      })
      .addCase(refresh.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // LogOut
    builder
      .addCase(logOut.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOut.fulfilled, () => ({ ...initialState }))
      .addCase(logOut.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Delete user
    builder
      .addCase(userDelete.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDelete.fulfilled, (state, { payload }) => {
        state.message = payload.message;
        state.loading = false;
      })
      .addCase(userDelete.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Update avatar
    builder
      .addCase(userUpdateAvatar.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdateAvatar.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.avatarUrl = payload.avatarUrl;
      })
      .addCase(userUpdateAvatar.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Update account
    builder
      .addCase(userUpdateAccount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdateAccount.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(userUpdateAccount.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });
  },
});

export default auth.reducer;
export const { clearNewUser, clearError } = auth.actions;
