export interface AppointmentResponce {
  id: number;
  user: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  add_info: string;
  is_active: boolean;
}

export interface AppointmentFormData {
  id?: number;
  user: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  add_info: string;
}
