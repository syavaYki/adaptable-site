export interface AdoptionFormData {
  id?: number;
  petId: number;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email: string;
  occupation?: string;
  employerName?: string;
  employerPhone?: string;
  livingSituation?: string;
  householdSetting?: string;
  householdMembers?: string;
  fencedYard?: string;
  hoursAlone?: number;
}

export interface AdoptionFormDataResponse extends AdoptionFormData {
  id: number;
  user: number;
  pet: number;
  application_date: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  occupation: string;
  employer_name: string;
  employer_phone: string;
  living_situation: string;
  household_setting: string;
  household_members: string;
  fenced_yard: string;
  hours_alone: number;
  status: 'pending' | 'approved' | 'rejected';
}
