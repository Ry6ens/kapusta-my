import { createSlice } from '@reduxjs/toolkit';

import {
  getExpensesCategories,
  getIncomeCategories,
  addTransaction,
  deleteTransaction,
  getExpensesTransactionsByDate,
  getIncomeTransactionsByDate,
} from './transaction-operations';

const initialState = {
  expensesCategories: [],
  incomeCategories: [],
  transactions: [],
  monthlySum: [],
  currentDate: '',
  message: '',
  loading: false,
  error: null,
  calendarDate: null,
  chartData: [],
};

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addDate: (state, { payload }) => {
      state.currentDate = payload;
    },
    addCalendarDate: (state, { payload }) => {
      state.calendarDate = payload;
    },
  },
  extraReducers: builder => {
    // Get expenses categories
    builder
      .addCase(getExpensesCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpensesCategories.fulfilled, (state, { payload }) => {
        state.expensesCategories = payload;
        state.loading = false;
      })
      .addCase(getExpensesCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Get income categories
    builder
      .addCase(getIncomeCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIncomeCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.incomeCategories = payload;
      })
      .addCase(getIncomeCategories.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Add transaction
    builder
      .addCase(addTransaction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions.push(payload);
      })
      .addCase(addTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Delete transaction
    builder
      .addCase(deleteTransaction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions = state.transactions.filter(el => el._id !== payload._id);
      })
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Get expenses transactions by date
    builder
      .addCase(getExpensesTransactionsByDate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpensesTransactionsByDate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions = payload;
      })
      .addCase(getExpensesTransactionsByDate.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Get income transactions by date
    builder
      .addCase(getIncomeTransactionsByDate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIncomeTransactionsByDate.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions = payload;
      })
      .addCase(getIncomeTransactionsByDate.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });
  },
});

export default transactions.reducer;

export const { addDate } = transactions.actions;
export const { addCalendarDate } = transactions.actions;
