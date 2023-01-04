import { createSlice } from '@reduxjs/toolkit';

import {
  getExpensesCategories,
  getIncomeCategories,
  getTransactionsByMonth,
  addTransaction,
  deleteTransaction,
  getExpensesTransByDate,
  getIncomeTransByDate,
  getChartData,
} from './transaction-operations';

const initialState = {
  expensesCategories: [],
  incomeCategories: [],
  monthlySum: [],
  transactions: [],
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

    // Get transactions by month
    builder
      .addCase(getTransactionsByMonth.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionsByMonth.fulfilled, (state, { payload }) => {
        state.balance = payload.balance;
        state.monthlySum = payload.monthlySum;
        state.transactions = payload.transitions;
        state.loading = false;
      })
      .addCase(getTransactionsByMonth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Add transaction
    builder
      .addCase(addTransaction.pending, state => {
        state.message = '';
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.message = payload.transitionName;
        state.loading = false;
      })
      .addCase(addTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Delete transaction
    builder
      .addCase(deleteTransaction.pending, state => {
        state.message = '';
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.message = payload.message;
        state.loading = false;
      })
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Get expenses transaction by date
    builder
      .addCase(getExpensesTransByDate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpensesTransByDate.fulfilled, (state, { payload }) => {
        state.balance = payload.balance;
        state.monthlySum = payload.monthlySum;
        state.transactions = payload.transitionByDate;
        state.loading = false;
      })
      .addCase(getExpensesTransByDate.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Get income transaction by date
    builder
      .addCase(getIncomeTransByDate.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIncomeTransByDate.fulfilled, (state, { payload }) => {
        state.balance = payload.balance;
        state.monthlySum = payload.monthlySum;
        state.transactions = payload.transitionByDate;
        state.loading = false;
      })
      .addCase(getIncomeTransByDate.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });

    // Get chart data
    builder
      .addCase(getChartData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChartData.fulfilled, (state, { payload }) => {
        state.chartData = payload;
        state.loading = false;
      })
      .addCase(getChartData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.data.message;
      });
  },
});

export default transactions.reducer;

export const { addDate } = transactions.actions;
export const { addCalendarDate } = transactions.actions;
