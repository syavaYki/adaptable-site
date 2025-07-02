import React from 'react';
import { Heading } from 'react-bulma-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './CatalogSlider.scss';
import { Pet } from '../../types/Pet';
import { CatalogCard } from '../CatalogCard';

interface Props {
  title: string;
  pets: Pet[];
}

export const CatalogSlider: React.FC<Props> = ({ title, pets }) => {
  return (
    <div>
      <Heading>{title}</Heading>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView="auto"
        navigation
      >
        {pets.map(pet => {
          return (
            <SwiperSlide key={pet.id}>
              <CatalogCard petData={pet} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
