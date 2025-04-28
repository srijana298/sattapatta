import { useQuery } from 'react-query';
import { getAllCategories } from '../services/categories';

export const useCategories = () => {
  return useQuery({
    queryFn: getAllCategories,
    queryKey: ['categories']
  });
};
