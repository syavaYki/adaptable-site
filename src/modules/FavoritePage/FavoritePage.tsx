import React, { useMemo } from 'react';
import { CatalogList } from '../../components/CatalogList';
import { Button } from 'react-bulma-components';
import style from './Favorite.module.scss';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as FavoriteAction from '../../features/favorites';
import { clearPetFavorites } from '../../api/pets';

export const FavoritePage = () => {
  const { loggedIn } = useAppSelector(state => state.auth);
  const { favorites } = useAppSelector(state => state.favorite);
  const dispatch = useAppDispatch();
  const { pets } = useAppSelector(state => state.pet);

  const cards = useMemo(() => {
    return pets.filter(pet => favorites.includes(pet.id));
  }, [pets, favorites]);
  return (
    <div className={style.container}>
      {cards.length > 0 ? (
        <div
          className="is-flex is-flex-direction-column is-align-items-center"
          style={{ width: '100%' }}
        >
          <CatalogList pets={cards} />

          <Button
            size="large"
            color="danger"
            colorVariant="light"
            className="is-flex-grow-1 m-5"
            onClick={() => {
              dispatch(FavoriteAction.clear());

              if (loggedIn) {
                clearPetFavorites().catch(() =>
                  console.error('Error clearing puser pets favorites'),
                );
              }
            }}
          >
            Clear Favorites
          </Button>
        </div>
      ) : (
        <div className={style.imageContainer}>
          <img
            src="assets\Favorite-banner.png"
            alt="No favorite banner"
          />
        </div>
      )}
    </div>
  );
};
