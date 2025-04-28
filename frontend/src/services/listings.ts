import api from '../api';
import { CreateListingInput } from '../lib/listings';

export const createListing = async (listing: CreateListingInput) => {
  return await api.post('/listings', listing);
};
export const getAllListings = async (query?: string): Promise<CreateListingInput[]> => {
  const res = await api.get('/listings', { params: { query } });
  return res.data;
};

export const getMyListings = async (): Promise<CreateListingInput[]> => {
  const res = await api.get('/listings?me');
  return res.data;
};

export const getPopularData = async (): Promise<{
  popularCategories: {
    name: string;
  }[];
  popularSkills: {
    name: string;
  }[];
}> => {
  const res = await api.get('/listings/popular-data');
  return res.data;
};

export const getPopularRequestedSkills = async (): Promise<
  {
    id: string;
    name: string;
  }[]
> => {
  const res = await api.get('/listings/skills');
  return res.data;
};

export const getMatches = async (): Promise<
  {
    listingA: CreateListingInput;
    listingB: CreateListingInput;
  }[]
> => {
  const res = await api.get('/listings/matches');
  return res.data;
};
