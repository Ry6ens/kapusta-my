import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosGetBalance, axiosAddBalance } from 'api/balance';

export const getBalance = createAsyncThunk(
  'balance/get',
  async (_, { rejectWithValue }) => {
    try {
      const data = await axiosGetBalance();
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const addBalance = createAsyncThunk(
  'balance/add',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosAddBalance(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
