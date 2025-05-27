import { useQuery } from 'react-query';
import { getAllCategories } from '../services/categories';
import { getAllMentors, getMentor } from '../services/users';

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

export const useMentor = (id?: string) => {
  return useQuery({
    queryKey: ['get_mentor', id],
    queryFn: () => getMentor(id),
    enabled: !!id,
  });
}
