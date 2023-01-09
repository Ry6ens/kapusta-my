import { createSlice } from '@reduxjs/toolkit';

import {
  getExpensesCategories,
  getIncomeCategories,
  addTransaction,
  deleteTransaction,
  getExpensesTransactionsByDate,
  getIncomeTransactionsByDate,
  getTransactionsByMonth,
  getSummary,
} from './transaction-operations';

const initialState = {
  expensesCategories: [],
  incomeCategories: [],
  transactions: [],
  summary: [],
  chartData: [],
  currentDate: '',
  message: '',
  loading: false,
  error: null,
};

const transactions = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addDate: (state, { payload }) => {
      state.currentDate = payload;
    },
    filterTransactionsByCategory: (state, { payload }) => {
      state.chartData = payload;
    },
    clearChart: (state, _) => {
      state.chartData = [];
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
        state.transactions.transactions.push(payload.transaction);
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
        state.transactions.transactions = state.transactions.transactions.filter(
          el => el._id !== payload._id
        );
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

    // Get transactions by month
    builder
      .addCase(getTransactionsByMonth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsByMonth.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.transactions = payload;
      })
      .addCase(getTransactionsByMonth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Get summary
    builder
      .addCase(getSummary.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSummary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.summary = payload;
      })
      .addCase(getSummary.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });
  },
});

export default transactions.reducer;

export const { addDate, filterTransactionsByCategory, clearChart } = transactions.actions;
