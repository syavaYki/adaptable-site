import {
  FilterAPIResponce,
  FilterQueryNames,
  Filters,
  SelectedFilters,
} from '../types/Filters';
import { textBeautifier } from './helperFormater';

export function parseFitersAPI(filter: FilterAPIResponce) {
  const newFilter: Filters = {
    pet_type: filter?.pet_type ? filter.pet_type.map(textBeautifier) : [],
    minAge: filter?.age_min ? filter.age_min : 0,
    maxAge: filter?.age_max ? filter.age_max : 99,
    breed: filter?.breed ? filter.breed.map(textBeautifier) : [],
    sex: ['Male', 'Female', 'Uknown'],
    coloration: filter?.coloration ? filter.coloration.map(textBeautifier) : [],
    weightMin: filter?.weight_min ? filter.weight_min : 0,
    weightMax: filter.weight_max ? filter.weight_max : 999,
    isSterilized: ['Yes', 'No'],
  };

  return newFilter;
}

export function convertFilterToSearchParams(filters: SelectedFilters) {
  const newParams = new URLSearchParams();

  if (filters?.pet_type) {
    if (filters.pet_type.length !== 0) {
      newParams.set(FilterQueryNames.PET_TYPE, filters.pet_type.join(','));
    }
  }

  if (filters.breed) {
    if (filters.breed.length !== 0) {
      newParams.set(FilterQueryNames.BREAD, filters.breed.join(','));
    }
  }

  if (filters.coloration) {
    if (filters.coloration.length !== 0) {
      newParams.set(FilterQueryNames.COLORATION, filters.coloration.join(','));
    }
  }

  if (filters.isSterilized) {
    switch (filters.isSterilized) {
      case 'Yes':
        newParams.set(FilterQueryNames.IS_STERILIZED, 'true');

        break;

      default:
        newParams.set(FilterQueryNames.IS_STERILIZED, 'false');
        break;
    }
  }

  if (filters.sex) {
    switch (filters.sex) {
      case 'Male':
        newParams.set(FilterQueryNames.SEX, 'M');
        break;

      case 'Female':
        newParams.set(FilterQueryNames.SEX, 'F');
        break;

      default:
        newParams.set(FilterQueryNames.SEX, 'U');
        break;
    }
  }

  if (filters.minAge) {
    newParams.set(FilterQueryNames.AGE_MIN, filters.minAge.toString());
  }
  if (filters.maxAge) {
    newParams.set(FilterQueryNames.AGE_MAX, filters.maxAge.toString());
  }
  if (filters.weightMin) {
    newParams.set(FilterQueryNames.WEIGHT_MIN, filters.weightMin.toString());
  }
  if (filters.weightMax) {
    newParams.set(FilterQueryNames.WEIGHT_MAX, filters.weightMax.toString());
  }

  return newParams;
}
