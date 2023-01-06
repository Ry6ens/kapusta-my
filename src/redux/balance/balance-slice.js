import { createSlice } from '@reduxjs/toolkit';

import { getBalance, addBalance } from './balance-operations';
import { addTransaction } from 'redux/transaction/transaction-operations';

const initialState = {
  balance: 0,
  message: '',
  loading: false,
  error: null,
};

const balance = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Get user balance
    builder
      .addCase(getBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBalance.fulfilled, (state, { payload }) => {
        state.balance = payload;
        state.loading = false;
      })
      .addCase(getBalance.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Add user balance
    builder
      .addCase(addBalance.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBalance.fulfilled, (state, { payload }) => {
        state.balance = payload;
        state.loading = false;
      })
      .addCase(addBalance.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Add balance from transaction
    builder
      .addCase(addTransaction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.balance = payload.newBalance;
      })
      .addCase(addTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });
  },
});

export default balance.reducer;
