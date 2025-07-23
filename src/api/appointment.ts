import { AppointmentFormData } from '../types/AppointmentFormData';
import { LocalAccessKeys } from '../types/LocalAccessKeys';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import api from './api';

export const getAllAppointments = () => {
  return api.get(`/api/v1/adoption/appointment/`, {
    headers: {
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};

export const submitAppointmentForm = (formData: AppointmentFormData) => {
  return api.post(
    `/api/v1/adoption/appointment/`,
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      add_info: formData.add_info,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const editAppointmentForm = (formData: AppointmentFormData) => {
  return api.put(
    `/api/v1/adoption/appointment/${formData.id}/`,
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      add_info: formData.add_info,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
      },
    },
  );
};

export const deleteAppointmentForm = (id: number) => {
  return api.delete(`/api/v1/adoption/appointment/${id}/`, {
    headers: {
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};
