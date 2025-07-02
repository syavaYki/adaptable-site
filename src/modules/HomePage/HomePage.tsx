import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Container, Section } from 'react-bulma-components';
import { SubscribeNews } from '../../components/SubscribeNews';
import { OneShotNotification } from '../../components/OneShotNotification';
import { HomeBanner1 } from '../../components/HomeBanner1';
import { CatalogSlider } from '../../components/CatalogSlider';
import { Pet } from '../../types/Pet';
import { filterPetBy, getRandomSampleFromArray } from '../../utils/helperPet';
import { HomeBanner2 } from '../../components/HomeBanner2';
import { getFilterPets } from '../../api/pets';
import { AxiosError } from 'axios';

export const HomePage = () => {
  const [dogs, setDogs] = useState<Pet[]>([]);
  const [cats, setCats] = useState<Pet[]>([]);

  useEffect(() => {
    getFilterPets('pet_type=dog')
      .then(res => {
        setDogs(
          getRandomSampleFromArray(
            filterPetBy(res.data, 'pet_type' as keyof Pet, 'dog'),
            10,
          ),
        );
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });

    getFilterPets('pet_type=cat')
      .then(res => {
        setCats(
          getRandomSampleFromArray(
            filterPetBy(res.data, 'pet_type' as keyof Pet, 'cat'),
            10,
          ),
        );
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  }, []);

  return (
    <Container
      className="is-flex is-flex-direction-column mb-5"
      style={{ gap: '1.5rem' }}
    >
      <OneShotNotification />

      <Section className="p-2">
        <HomeBanner1 />
      </Section>

      <Section className="p-2">
        <CatalogSlider
          title="Our Dogs"
          pets={dogs}
        />
      </Section>

      <Section className="p-2">
        <CatalogSlider
          title="Our Cats"
          pets={cats}
        />
      </Section>

      <Section>
        <HomeBanner2 />
      </Section>

      <Section className="p-2">
        <SubscribeNews />
      </Section>
    </Container>
  );
};
