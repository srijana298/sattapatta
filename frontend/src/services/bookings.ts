import api from '../api';

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
