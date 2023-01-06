import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  axiosGetExpensesCategories,
  axiosGetIncomeCategories,
  axiosAddTransaction,
  axiosDeleteTransaction,
  axiosGetExpensesTransactionsByDate,
  axiosGetIncomeTransactionsByDate,
  axiosGetTransactionsByMonth,
  axiosGetSummary,
} from 'api/transactions';

export const getExpensesCategories = createAsyncThunk(
  'transaction/getExpenCateg',
  async (_, { rejectWithValue }) => {
    try {
      const data = await axiosGetExpensesCategories();
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getIncomeCategories = createAsyncThunk(
  'transaction/getIncomCateg',
  async (_, { rejectWithValue }) => {
    try {
      const data = await axiosGetIncomeCategories();
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transaction/add',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosAddTransaction(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosDeleteTransaction(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getExpensesTransactionsByDate = createAsyncThunk(
  'transaction/getExpenByDate',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosGetExpensesTransactionsByDate(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getIncomeTransactionsByDate = createAsyncThunk(
  'transaction/getIncomByDate',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosGetIncomeTransactionsByDate(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getTransactionsByMonth = createAsyncThunk(
  'transaction/getByMonth',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosGetTransactionsByMonth(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getSummary = createAsyncThunk(
  'transaction/getSummary',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosGetSummary(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
