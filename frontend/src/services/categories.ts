import api from '../api';
import { Category } from '../lib/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await api.post('/categories', category);
  return response.data;
};
