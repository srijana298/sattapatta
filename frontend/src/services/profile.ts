import api from '../api';
import { AboutProfile } from '../lib/profile';

export const updateAboutProfile = async (payload: AboutProfile) => {
  await api.put('/mentors/about', payload);
};
