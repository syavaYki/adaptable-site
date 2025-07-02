export interface AdoptionFormData {
  userId?: number | undefined;
  petId: number;
  applicationDate?: string;
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
