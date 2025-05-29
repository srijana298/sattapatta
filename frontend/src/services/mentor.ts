import api from '../api';
import { Profile } from '../lib/profile';

export const createMentor = async (mentorData: Profile) => {
  const response = await api.post('/mentor', mentorData);
  return response.data;
};

export const updateStatus = async (id: string | number, status: string) => {
  const response = await api.put(`/mentor/${id}/update-status`, { status });
  return response.data;
}


export const createRating = async ({
  mentorId,
  comment,
  rating,
}: {
  mentorId: number;
  comment: string;
  rating: number;
}) => {
  const response = await api.post(`/mentor/ratings`, {
    comment,
    mentorId,
    rating,
  });
  return response.data;
}