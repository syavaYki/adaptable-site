export interface Filters {
  pet_type?: string[];
  minAge?: number | undefined | null;
  maxAge?: number | undefined | null;
  breed?: string[];
  sex?: ['Male', 'Female', 'Uknown'];
  coloration?: string[];
  weightMin?: number | undefined | null;
  weightMax?: number | undefined | null;
  isSterilized?: ['Yes', 'No'];
}

export interface FilterAPIResponce {
  pet_type: string[];
  breed: string[];
  coloration: string[];
  is_sterilized: boolean[];
  age_max: number;
  age_min: number;
  sex: string[];
  weight_max: number;
  weight_min: number;
}

export interface SelectedFilters {
  pet_type?: string[];
  minAge?: number;
  maxAge?: number;
  breed?: string[];
  sex?: 'Male' | 'Female' | 'Unknown' | undefined;
  coloration?: string[];
  weightMin?: number;
  weightMax?: number;
  isSterilized?: 'Yes' | 'No' | undefined;
}

export enum FilterQueryNames {
  AGE_MIN = 'age__gte',
  AGE_MAX = 'age__lte',
  WEIGHT_MIN = 'weight__gte',
  WEIGHT_MAX = 'weight__lte',
  BREAD = 'breed',
  PET_TYPE = 'pet_type',
  COLORATION = 'coloration',
  SEX = 'sex',
  IS_STERILIZED = 'is_sterilized',
  SEARCH = 'search',
}
