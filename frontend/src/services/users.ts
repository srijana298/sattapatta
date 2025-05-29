import api from '../api';
import { Profile } from '../lib/profile';
import { CreateUser, CurrentUser } from '../lib/users';

export interface MentorProfile {
  ratingStats: {
    bayesianRating: number;
    totalReviews: number;
    rawAverage: number;
  };
  reviews: {
    id: number;
    rating: number; 
    comment: string;
    reply?:string;
    createdAt: string;
    updatedAt: string;
    reviewer: {
      id: number;
      fullname: string;
    }
  }[];
  id: number;
  countryOfBirth: string;
  subject: string;
  hourly_rate: number;
  trial_rate: number;
  profilePhotoUrl: string;
  introduction: string;
  experience: string;
  motivation: string;
  status: string;
  skill_category: {
    id: number;
    name: string;
  };
  skills: {
    id: number;
    name: string;
  };
  headline: string;
  has_education: boolean;
  user: CurrentUser;
  availabilities: {
    id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
  }[];
  educations: Profile['educations'];
  has_certificate: boolean;
  certificates: Profile['certificates'];
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const createUser = async <T>(user: T): Promise<CreateUser> => {
  const response = await api.post('/users', user);
  return response.data;
};

export const loginUser = async <T>(user: T): Promise<{ access_token: string }> => {
  const response = await api.post('/users/login', user);
  return response.data;
};

export const verify = async (): Promise<CurrentUser> => {
  const user = await api.get('/users/me');
  return user.data;
};

export const updateAboutMentorProfile = async <T>(payload: T) => {
  await api.put('/mentor/about', payload);
};

export const getPicture = async (): Promise<{ profilePhotoUrl: string }> => {
  const response = await api.get('/mentor/picture');
  return response.data;
};

export const uploadPicture = async (data: FormData): Promise<string> => {
  const response = await api.post('/mentor/picture', data);
  return response.data;
};

export const getMentorProfile = async (): Promise<MentorProfile> => {
  const response = await api.get('/mentor/profile');
  return response.data;
};

export const getAllMentors = async (): Promise<MentorProfile[]> => {
  const response = await api.get('/mentor');
  return response.data;
};

export const getApprovedMentors = async (): Promise<MentorProfile[]> => {
  const response = await api.get('/mentor?status=approved');
  return response.data;
};

export const getMentor = async (id?: string | number): Promise<MentorProfile> => {
  const response = await api.get('/mentor/' + id);
  return response.data;
};
