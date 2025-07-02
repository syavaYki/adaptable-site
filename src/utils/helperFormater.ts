import { ApiPet } from '../types/Pet';

export function textBeautifier(text: string): string {
  // 1. Remove all non-alphanumeric characters except spaces.
  const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '');

  // 2. Remove unnecessary spaces (leading, trailing, and multiple).
  const trimmedText = cleanedText.trim().replace(/\s+/g, ' ');

  // 3. Format to sentence case.
  if (trimmedText.length === 0) {
    return '';
  }
  const firstLetter = trimmedText.charAt(0).toUpperCase();
  const restOfSentence = trimmedText.slice(1).toLowerCase();

  return firstLetter + restOfSentence;
}

export function petInfoFormater(petInfo: ApiPet) {
  let sex, is_sterilized;
  if (petInfo.sex === 'M') {
    sex = 'Male';
  } else if (petInfo.sex === 'F') {
    sex = 'Female';
  } else {
    sex = 'Unknown';
  }

  if (petInfo.is_sterilized === true) {
    is_sterilized = 'Yes';
  } else {
    is_sterilized = 'No';
  }

  const cleanData = {
    ...petInfo,
    breed: textBeautifier(petInfo.breed),
    sex,
    is_sterilized,
    coloration: textBeautifier(petInfo.coloration),
    pet_type: textBeautifier(petInfo.pet_type),
  };

  return cleanData;
}
