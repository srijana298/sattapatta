import { useQuery } from 'react-query';
import { getAllCategories } from '../services/categories';
import { getAllMentors } from '../services/users';

export const useCategories = () => {
  return useQuery({
    queryKey: 'get_categories',
    queryFn: getAllCategories
  });
};

export const useMentors = () => {
  return useQuery({
    queryFn: getAllMentors,
    queryKey: 'get_mentors',
  });
}
