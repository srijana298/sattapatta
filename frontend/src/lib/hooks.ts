import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAllCategories } from '../services/categories';
import { getAllMentors, getApprovedMentors, getMentor } from '../services/users';
import { getBooking, getBookings } from '../services/bookings';
import { getAllConversations } from '../services/conversation';
import {
  getEducations,
  getCertificates,
  updateEducations,
  updateCertificates,
  deleteCertificate,
  updateAvailability,
  getAvailability
} from '../services/mentor';

export const useCategories = () => {
  return useQuery({
    queryKey: 'get_categories',
    queryFn: getAllCategories
  });
};

export const useMentors = () => {
  return useQuery({
    queryFn: getAllMentors,
    queryKey: 'get_mentors'
  });
};

export const useApprovedMentors = () => {
  return useQuery({
    queryFn: () => getApprovedMentors(),
    queryKey: 'get_approved_mentors'
  });
};

export const useMentor = (id?: string | number) => {
  return useQuery({
    queryKey: ['get_mentor', id],
    queryFn: () => getMentor(id),
    enabled: !!id
  });
};

export const useMentorBookings = () => {
  return useQuery({
    queryKey: 'get_bookings',
    queryFn: () => getBookings()
  });
};

export const useBookingsByMentorId = (mentorId?: number) => {
  return useQuery({
    queryKey: ['get_bookings_by_mentor', mentorId],
    queryFn: () => getBookingsByMentorId(mentorId!),
    enabled: !!mentorId
  });
};

export const useBooking = (id?: string | number) => {
  return useQuery({
    queryKey: ['get_booking', id],
    queryFn: () => getBooking(id),
    enabled: !!id
  });
};

export const useConversations = () => {
  return useQuery({
    queryFn: getAllConversations,
    queryKey: 'getAllConversations'
  });
};

// Education hooks
export const useEducations = () => {
  return useQuery({
    queryKey: 'get_educations',
    queryFn: getEducations
  });
};

export const useUpdateEducations = () => {
  const queryClient = useQueryClient();
  return useMutation(updateEducations, {
    onSuccess: () => {
      queryClient.invalidateQueries('get_mentor');
      queryClient.invalidateQueries('get_educations');
    }
  });
};

// Certificate hooks
export const useCertificates = () => {
  return useQuery({
    queryKey: 'get_certificates',
    queryFn: getCertificates
  });
};

export const useUpdateCertificates = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCertificates, {
    onSuccess: () => {
      queryClient.invalidateQueries('get_mentor');
      queryClient.invalidateQueries('get_certificates');
    }
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCertificate, {
    onSuccess: () => {
      queryClient.invalidateQueries('get_mentor');
      queryClient.invalidateQueries('get_certificates');
    }
  });
};

// Availability hooks
export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation(updateAvailability, {
    onSuccess: () => {
      queryClient.invalidateQueries('get_mentor');
      queryClient.invalidateQueries('get_availability');
    }
  });
};

export const useAvailability = () => {
  return useQuery({
    queryKey: 'get_availability',
    queryFn: getAvailability
  });
};
