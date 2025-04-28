import api from '../api';
import { Skill } from '../lib/skills';

export const getAllSkills = async (): Promise<Skill[]> => {
  const response = await api.get('/skills');
  return response.data;
};

export const createSkill = async (skill: Skill): Promise<Skill> => {
  const response = await api.post('/skills', skill);
  return response.data;
};
