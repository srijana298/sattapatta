import { useQuery } from 'react-query';
import { getAllListings } from '../services/listings';

export const useListings = (query?: string) => {
  return useQuery({
    queryFn: () => getAllListings(query),
    queryKey: ['listings', query]
  });
};
