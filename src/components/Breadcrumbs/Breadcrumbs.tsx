import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { textBeautifier } from '../../utils/helperFormater';

export const Breadcrumbs = () => {
  const { pets } = useAppSelector(state => state.pet);
  const location = useLocation();
  let curLocation = '';
  const locationArr = location.pathname
    .split('/')
    .filter(crumb => crumb !== '');

  return (
    <nav
      className={classNames('breadcrumb has-succeeds-separator p-0 m-0', {
        'is-hidden': locationArr.length === 0,
      })}
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <a
            href="/"
            className={classNames(
              'has-text-primary px-2 mx-2',
              style.crumb,
              style.custom_hover,
            )}
          >
            Home
          </a>
        </li>

        {locationArr.map((crumb: string, index: number) => {
          curLocation = curLocation + `/${crumb}`;
          const crumbName = crumb;

          return (
            <li
              key={crumb}
              className={classNames({
                'is-active': locationArr.length - 1 === index,
              })}
            >
              <a
                href={curLocation}
                className={classNames(
                  'has-text-primary px-2 mx-2',
                  style.crumb,
                  style.custom_hover,
                )}
              >
                {locationArr[locationArr.length - 2].toLocaleLowerCase() ===
                  'pets' && locationArr.length - 1 === index
                  ? textBeautifier(
                      pets.find(pet => pet.id === parseInt(crumbName))?.name ||
                        'Pet',
                    ) || crumbName
                  : textBeautifier(crumbName)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
