import React, { useEffect, useMemo, useState } from 'react';
import style from './CatalogCard.module.scss';
import { Pet } from '../../types/Pet';
import { Button, Heading } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as FavoriteAction from '../../features/favorites';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { updateFavotitesPetsApi } from '../../api/pets';
import { textBeautifier } from '../../utils/helperFormater';

interface Props {
  petData: Pet;
}

export const CatalogCard: React.FC<Props> = ({ petData }) => {
  const { loggedIn } = useAppSelector(state => state.auth);
  const { favorites } = useAppSelector(state => state.favorite);
  const dispatch = useAppDispatch();
  const naviagate = useNavigate();
  const [picture, setPicture] = useState('');

  const inFav = useMemo(
    () => favorites.includes(petData.id),
    [petData, favorites],
  );

  useEffect(() => {
    if (petData.images.length < 1) {
      if (petData.pet_type.toLocaleLowerCase() === 'dog') {
        setPicture('assets/dog-img-placeholder.png');
      } else if (petData.pet_type.toLocaleLowerCase() === 'cat') {
        setPicture('assets/cat-img-placeholder.png');
      } else {
        setPicture('https://placehold.co/400x600?text=Comming+Soon');
      }
    } else {
      setPicture(petData.images[0].file);
    }
  }, [petData]);

  if (!petData) {
    return <></>;
  }

  return (
    <div className={style.container}>
      <div className={style.cardImageContainer}>
        <img
          src={
            picture ? picture : 'https://placehold.co/400x600?text=Comming+Soon'
          }
          alt={`${petData.name}, a ${petData.breed}`}
        />
      </div>

      <div className={style.cardContent}>
        <Heading
          size={4}
          pt={3}
          mb={1}
        >
          {textBeautifier(petData.name)}
        </Heading>

        <div>
          <p>Breed: {textBeautifier(petData.breed)}</p>
          <p>Age: {petData.age}</p>
        </div>
      </div>

      <div className={style.cardActions}>
        <Button
          rounded
          color="primary"
          onClick={() => {
            naviagate(`/pets/${petData.id}`);
          }}
        >
          More Details
        </Button>

        <Button
          rounded
          className="p-3"
          onClick={() => {
            dispatch(FavoriteAction.toggle(petData.id));

            if (loggedIn) {
              updateFavotitesPetsApi(favorites).catch(() =>
                console.error('Error toggling favorites'),
              );
            }
          }}
        >
          <FontAwesomeIcon
            className={classNames({ 'has-text-danger': inFav })}
            icon={faHeart}
            size="2x"
          />
        </Button>
      </div>
    </div>
  );
};
