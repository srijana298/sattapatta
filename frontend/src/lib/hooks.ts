import { useQuery } from 'react-query';
import { getAllCategories } from '../services/categories';
import { getAllMentors, getMentor } from '../services/users';
import { getBookings } from '../services/bookings';
import { getAllConversations } from '../services/conversation';

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

export const useMentor = (id?: string | number) => {
  return useQuery({
    queryKey: ['get_mentor', id],
    queryFn: () => getMentor(id),
    enabled: !!id,
  });
}

export const useMentorBookings= () => {
  return useQuery({
    queryKey: 'get_bookings',
    queryFn: () => getBookings()
  });
}

export const useConversations = () => {
  return useQuery({
    queryFn: getAllConversations,
    queryKey: 'getAllConversations'
  });
}
