import instance from './auth';

export const UserGetBalance = async userData => {
  const { data } = await instance.post('api/transitions/report/category', userData);
  return data;
};

// Add balance
export const axiosUserAddBalance = async userData => {
  const { data } = await instance.post('api/balances/update', userData);
  return data;
};

export const UserGetExpenses = async userData => {
  const { data } = await instance.post(
    'api/transitions/report/category/expenses',
    userData
  );
  return data;
};
