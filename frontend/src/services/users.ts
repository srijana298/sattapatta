import api from '../api';
import { CurrentUser } from '../lib/users';

export const createUser = async <T>(user: T) => {
  const response = await api.post('/users', user);
  return response.data;
};

export const loginUser = async <T>(user: T): Promise<{ access_token: string }> => {
  const response = await api.post('/users/login', user);
  return response.data;
};

export const verify = async (): Promise<CurrentUser> => {
  const user = await api.get('/users/me');
  return user.data;
};
