import api from '../api';
import { MentorProfile } from './users';

interface Mentor {
  id: number;
  fullname: string;
  mentor_profile: MentorProfile;
}

interface Mentee {
  id: number;
}

interface Booking {
  id: number;
  mentor: Mentor;
  mentee: Mentee;
  start_date: string; // Format: YYYY-MM-DD
  end_time: string; // Format: HH:mm
  status: 'pending' | 'confirmed' | 'cancelled' | string; // Extend as needed
  createdAt: string;
  updatedAt: string;
}

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get('/bookings');
  return response.data;
};

export const createBooking = async ({
  mentorId,
  start_date,
  end_time
}: {
  mentorId: number;
  start_date: string;
  end_time: string;
}) => {
  const response = await api.post('/bookings', {
    mentorId,
    start_date,
    end_time
  });
  return response.data;
};
