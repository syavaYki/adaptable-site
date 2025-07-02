export interface Pet {
  id: number;
  name: string;
  pet_type: string;
  age: number;
  breed: string;
  sex: string;
  coloration: string;
  weight: number;
  is_sterilized: string;
  description: string;
  date_created: Date;
  images: Image[];
}

export interface ApiPet {
  id: number;
  name: string;
  pet_type: string;
  age: number;
  breed: string;
  sex: string;
  coloration: string;
  weight: number;
  is_sterilized: boolean;
  description: string;
  date_created: Date;
  images: Image[];
  owner: number[] | null;
}

type Image = {
  file: string;
};
