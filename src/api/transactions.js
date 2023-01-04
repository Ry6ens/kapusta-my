import instance from './auth';

// Get expenses categories
export const axiosGetExpensesCategories = async () => {
  const { data } = await instance.get('api/transaction/expenses-categories');
  return data;
};

// Get income categories
export const axiosGetIncomeCategories = async () => {
  const { data } = await instance.get('api/transaction/income-categories');
  return data;
};

// Add transaction
export const axiosAddTransaction = async userData => {
  const { data } = await instance.post('api/transaction/add', userData);
  return data;
};

// Delete transaction
export const axiosDeleteTransaction = async userData => {
  const { data } = await instance.delete(`api/transaction/delete/${userData}`);
  return data;
};

//Get expenses transactions by date
export const axiosGetExpensesTransactionsByDate = async userData => {
  const { data } = await instance.post('api/transaction/expenses/date', userData);
  return data;
};

//Get income transactions by date
export const axiosGetIncomeTransactionsByDate = async userData => {
  const { data } = await instance.post('api/transaction/income/date', userData);
  return data;
};
