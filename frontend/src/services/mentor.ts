import api from '../api';
import { Profile } from '../lib/profile';

export const createMentor = async (mentorData: Profile) => {
  const response = await api.post('/mentor', mentorData);
  return response.data;
};
