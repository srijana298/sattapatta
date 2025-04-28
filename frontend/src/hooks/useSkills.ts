import { useQuery } from 'react-query';
import { getAllSkills } from '../services/skills';

export const useSkills = () => {
  return useQuery({
    queryFn: getAllSkills,
    queryKey: ['skills']
  });
};
