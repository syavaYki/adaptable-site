import { createSlice } from '@reduxjs/toolkit';
import { accessLocalStorage } from '../utils/accessLocalStorage';
import { LocalAccessKeys } from '../types/LocalAccessKeys';
import { ApiPet, Pet } from '../types/Pet';
import { searchPets } from '../utils/helperPet';
import { petInfoFormater } from '../utils/helperFormater';

type Initial = {
  pets: Pet[];
  filteredPets: Pet[];
};
const initialValue: Initial = {
  pets: [],
  filteredPets: [],
};

const PetSlice = createSlice({
  name: 'pet',
  initialState: initialValue,
  reducers: {
    setPets(state, action: { payload: ApiPet[] }) {
      const processedPets = action.payload.map(petInfoFormater);

      state.pets = processedPets;
      state.filteredPets = processedPets;
      accessLocalStorage.set(LocalAccessKeys.PETS, action.payload);
    },

    search(state, action: { payload: string }) {
      if (action.payload) {
        const temp = searchPets(state.pets, action.payload);
        state.filteredPets = temp;
      } else {
        state.filteredPets = state.pets;
      }
    },

    sortFiltered(state, action: { payload: string }) {
      if (action.payload === 'acc') {
        state.filteredPets = state.filteredPets
          .slice()
          .toSorted((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === 'dec') {
        state.filteredPets = state.filteredPets
          .slice()
          .toSorted((a, b) => b.name.localeCompare(a.name));
      }
    },

    setFilteredPets(state, action: { payload: ApiPet[] }) {
      state.filteredPets = action.payload.map(petInfoFormater);
    },
  },
});

export default PetSlice.reducer;
export const { actions } = PetSlice;
