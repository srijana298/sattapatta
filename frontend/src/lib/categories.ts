import { Skill } from './skills';

export interface Category {
  id: number;
  name: string;
  skills: Skill[];
}
