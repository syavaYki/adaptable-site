import { AxiosResponse } from 'axios';
import api from './api';
import { getLocalToken } from '../utils/heplerApi';
import { AdoptionFormData } from '../types/AdoptionFormData';
import { AppointmentFormData } from '../types/AppointmentFormData';

export const getUserData = (): Promise<AxiosResponse> => {
  return api.get(`api/v1/users/me/`, {
    headers: {
      Authorization: getLocalToken(),
    },
  });
};

export const getUserMe = (): Promise<AxiosResponse> => {
  return api.get(`api/v1/users/me/`, {
    headers: {
      Authorization: getLocalToken(),
    },
  });
};

export const submitAdotptionForm = (formData: AdoptionFormData) => {
  return api.post(`api/v1/users/adoptionForm/`, {
    formData,
  });
};

export const submitAppointmentForm = (formData: AppointmentFormData) => {
  return api.post(`api/v1/users/appointmentForm/`, {
    formData,
  });
};
