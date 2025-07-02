import { Pet } from '../types/Pet';

export function filterPetBy(pets: Pet[], filterName: keyof Pet, value: string) {
  if (pets.length === 0) {
    return [];
  }
  if (!Object.keys(pets[0]).includes(filterName)) {
    return pets;
  }

  const filteredPets = pets.filter(pet => pet[filterName] === value);

  return filteredPets;
}

export function searchPets(pets: Pet[], query: string) {
  if (!query || !pets) {
    return [];
  }

  const filted = pets.filter(pet => {
    const bulkTxt = Object.values(pet).join(' ').toLocaleLowerCase();
    return bulkTxt.includes(query.toLocaleLowerCase());
  });

  return filted;
}

// export function getAvaliableFilters(data: Pet[]): Filters {
//   if (!data.length) {
//     return {
//       pet_type: [],
//       minAge: 0,
//       maxAge: 99,
//       breed: [],
//       sex: ['Male', 'Female', 'Unknown'],
//       coloration: [],
//       weightMin: 0,
//       weightMax: 999,
//       isSterilized: ['Yes', 'No', 'Unknown'],
//     };
//   }
//   return {
//     pet_type: Array.from(
//       new Set(data.map(itm => capitalizeFirstLetter(itm.pet_type))),
//     ),
//     minAge: Math.min(...data.map(itm => itm.age)),
//     maxAge: Math.max(...data.map(itm => itm.age)),
//     breed: Array.from(
//       new Set(data.map(itm => capitalizeFirstLetter(itm.breed))),
//     ),
//     sex: ['Male', 'Female', 'Unknown'],
//     coloration: Array.from(
//       new Set(data.map(itm => capitalizeFirstLetter(itm.coloration))),
//     ),
//     weightMin: Math.min(...data.map(itm => itm.weight)),
//     weightMax: Math.max(...data.map(itm => itm.weight)),
//     isSterilized: ['Yes', 'No', 'Unknown'],
//   };
// }

export function getRandomSampleFromArray<T>(inputArray: T[], quantity: number) {
  if (inputArray.length <= quantity) {
    return [...inputArray];
  } else {
    const shuffled = [...inputArray];

    let currentIndex = shuffled.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffled[currentIndex], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[currentIndex],
      ];
    }

    return shuffled.slice(0, quantity);
  }
}
