import { AxiosResponse } from 'axios';
import api from './api';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import { LocalAccessKeys } from '../types/LocalAccessKeys';
import { getUserMe } from './users';

export const getPetsData = (): Promise<AxiosResponse> => {
  return api.get(`api/v1/pets/`);
};

export const getPetsAvailableFilters = (): Promise<AxiosResponse> => {
  return api.get(`api/v1/pets/filters/`);
};

export const getPetById = (id: string): Promise<AxiosResponse> => {
  return api.get(`api/v1/pets/${id}/`);
};

export const setPetFavorite = (petId: number) => {
  return api.post(`/api/v1/pets/favorite/${petId}/`, null, {
    headers: {
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};

export const deletPetFavorite = (petId: number) => {
  return api.delete(`/api/v1/pets/favorite/${petId}/`, {
    headers: {
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};

export const clearPetFavorites = async () => {
  try {
    const res = await getUserMe();
    const userFavs = res?.data?.favorites as number[];

    if (userFavs) {
      userFavs.forEach(async itm => {
        try {
          await deletPetFavorite(itm);
        } catch {
          console.error('Error deleting user favorite');
        }
      });
    }
  } catch {
    console.error('Error geting user information');
  }
};

export const updateFavotitesPetsApi = async (ids: number[]) => {
  ids.forEach(async itm => {
    try {
      await setPetFavorite(itm);
    } catch (e) {
      console.error('Error adding user favorite');
    }
  });
};

export const getFilterPets = async (filter: URLSearchParams | string) => {
  return api.get(`api/v1/pets/?${filter.toString()}`);
};
