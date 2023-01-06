import instance from './auth';

//Get user balance
export const axiosGetBalance = async () => {
  const { data } = await instance.get('api/balance');
  return data;
};

// Add user balance
export const axiosAddBalance = async userData => {
  const { data } = await instance.post('api/balance/add', userData);
  return data;
};
