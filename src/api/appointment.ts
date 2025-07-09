import { AppointmentFormData, AppointmentResponce } from '../types/Appointment';
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
  const dataSet: Omit<AppointmentResponce, 'id' | 'is_active'> = {
    user: formData.user,
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    date: formData.date,
    time: formData.time,
    add_info: formData.add_info,
  };

  return api.post(`/api/v1/adoption/appointment/`, dataSet, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};

export const editAppointmentForm = (formData: AppointmentFormData) => {
  const dataSet: Omit<AppointmentResponce, 'id' | 'is_active'> = {
    user: formData.user,
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    date: formData.date,
    time: formData.time,
    add_info: formData.add_info,
  };

  return api.put(`/api/v1/adoption/appointment/${formData.id}/`, dataSet, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};

export const deleteAppointmentForm = (id: number) => {
  return api.delete(`/api/v1/adoption/appointment/${id}/`, {
    headers: {
      Authorization: `Token ${accessLocalStorage.get(LocalAccessKeys.LOGGEDIN)?.token}`,
    },
  });
};
