import instance from './auth';

export const UserGetExpenses = async userData => {
  const { data } = await instance.post(
    'api/transitions/report/category/expenses',
    userData
  );
  return data;
};
