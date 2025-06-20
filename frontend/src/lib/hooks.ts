import { useQuery } from 'react-query';
import { getAllCategories } from '../services/categories';
import { getAllMentors, getApprovedMentors, getMentor } from '../services/users';
import { getBooking, getBookings } from '../services/bookings';
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

export const useApprovedMentors = () => {
  return useQuery({
    queryFn: () => getApprovedMentors(),
    queryKey: 'get_approved_mentors',   
  });
};

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

export const useBooking = (id?: string | number) => {
  return useQuery({
    queryKey: ['get_booking', id],
    queryFn: () => getBooking(id),
    enabled: !!id,
  });
}

export const useConversations = () => {
  return useQuery({
    queryFn: getAllConversations,
    queryKey: 'getAllConversations'
  });
}
