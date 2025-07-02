import React from 'react';
import { Pet } from '../../types/Pet';
import { CatalogCard } from '../CatalogCard';
import { Heading } from 'react-bulma-components';

interface Props {
  pets: Pet[];
}
export const CatalogList: React.FC<Props> = ({ pets }) => {
  if (pets.length === 0) {
    return <Heading>No pets found</Heading>;
  }

  return (
    <div
      className="grid is-col-min-11 is-gap-2 my-auto"
      style={{ width: '100%' }}
    >
      {pets.map((itm, indx) => {
        return (
          <div
            key={indx}
            className="cell is-flex is-justify-content-center"
          >
            <CatalogCard petData={itm} />
          </div>
        );
      })}
    </div>
  );
};
