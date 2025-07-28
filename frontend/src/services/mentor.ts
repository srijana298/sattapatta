import api from '../api';
import { Profile } from '../lib/profile';

export const createMentor = async (mentorData: Profile) => {
  const response = await api.post('/mentor', mentorData);
  return response.data;
};

export const updateStatus = async (id: string | number, status: string) => {
  const response = await api.put(`/mentor/${id}/update-status`, { status });
  return response.data;
};

export const createRating = async ({
  mentorId,
  comment,
  rating
}: {
  mentorId: number;
  comment: string;
  rating: number;
}) => {
  const response = await api.post(`/mentor/ratings`, {
    comment,
    mentorId,
    rating
  });
  return response.data;
};

// Education API methods
export const getEducations = async () => {
  const response = await api.get('/mentor/educations');
  return response.data;
};

export const updateEducations = async (educationData: {
  has_education: boolean;
  educations: Array<{
    university: string;
    degree: string;
    degree_type: string;
    start_year: string;
    end_year: string;
    id?: number;
  }>;
}) => {
  const response = await api.post('/mentor/educations', educationData);
  return response.data;
};

// Certificate API methods
export const getCertificates = async () => {
  const response = await api.get('/mentor/certificates');
  return response.data;
};

export const updateCertificates = async (certificateData: {
  hasTeachingCertificate: boolean;
  certificates: Array<{
    subject: string;
    name: string;
    description: string;
    issuedBy: string;
    start_year: string;
    end_year: string;
    id?: number;
  }>;
}) => {
  const response = await api.put('/mentor/certificates', certificateData);
  return response.data;
};

export const deleteCertificate = async (id: number) => {
  const response = await api.delete(`/mentor/certificates/${id}`);
  return response.data;
};

export const getAvailability = async () => {
  const response = await api.get('/mentor/availability');
  return response.data;
};

export const updateAvailability = async (
  availabilities: Array<{
    id?: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
  }>
) => {
  const response = await api.put('/mentor/availability', { availabilities });
  return response.data;
};
