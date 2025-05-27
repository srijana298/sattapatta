export type Certificate = {
  subject: string;
  name: string;
  description: string;
  issuedBy: string;
  start_year: string;
  end_year: string;
};

export type Education = {
  university: string;
  degree: string;
  degree_type: string;
  start_year: string;
  end_year: string;
};

export type Availability = {
  day_of_week: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
};

export type Mentor = {
  id: string;
  fullname: string;
  email: string;
  countryOfBirth: string;
  category: number;
  skill: number;
  profile_picture: string;
  has_certificate: boolean;
  certificates?: Certificate[];
  has_education: boolean;
  educations?: Education[];
  introduction: string;
  experience: string;
  motivation: string;
  headline: string;
  hourly_rate: number;
  trial_rate: number;
  availability: Availability[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export const categoryOptions = [
  { id: 1, name: 'Academic' },
  { id: 2, name: 'Professional' },
  { id: 3, name: 'Creative' },
  { id: 4, name: 'Technical' },
  { id: 5, name: 'Personal Development' }
];

export const skillOptions = [
  { id: 1, name: 'Mathematics' },
  { id: 2, name: 'Physics' },
  { id: 3, name: 'Programming' },
  { id: 4, name: 'Design' },
  { id: 5, name: 'Marketing' },
  { id: 6, name: 'Language' },
  { id: 7, name: 'Business' },
  { id: 8, name: 'Music' },
  { id: 9, name: 'Art' },
  { id: 10, name: 'Personal Finance' }
];