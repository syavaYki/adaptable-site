import { AdoptionFormData } from '../types/AdoptionForm';
import { LocalAccessKeys } from '../types/LocalAccessKeys';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import api from './api';

export const getAllAdoptionForms = () => {
  return api.get(`/api/v1/adoption/adoption_form/`, {
    headers: {
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};

export const submitAdoptionForm = (formData: AdoptionFormData) => {
  return api.post(
    `/api/v1/adoption/adoption_form/`,
    {
      pet: formData.pet,
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      occupation: formData.occupation,
      employer_name: formData.employerName,
      employer_phone: formData.employerPhone,
      living_situation: formData.livingSituation,
      household_setting: formData.householdSetting,
      household_members: formData.householdMembers,
      fenced_yard: formData.fencedYard,
      hours_alone: formData.hoursAlone,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
      },
    },
  );
};

export const editAdoptionForm = (formData: AdoptionFormData) => {
  return api.put(
    `/api/v1/adoption/adoption_form/${formData.id}/`,
    {
      pet: formData.pet,
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      occupation: formData.occupation,
      employer_name: formData.employerName,
      employer_phone: formData.employerPhone,
      living_situation: formData.livingSituation,
      household_setting: formData.householdSetting,
      household_members: formData.householdMembers,
      fenced_yard: formData.fencedYard,
      hours_alone: formData.hoursAlone,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
      },
    },
  );
};

export const deleteAdoptionForm = (id: number) => {
  return api.delete(`/api/v1/adoption/adoption_form/${id}/`, {
    headers: {
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};
