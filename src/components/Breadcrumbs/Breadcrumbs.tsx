import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Breadcrumbs.module.scss';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';

function beautifyText(inputText: string) {
  // Return an empty string if input is not a valid string
  if (typeof inputText !== 'string' || inputText.length === 0) {
    return '';
  }

  // 1. Capitalize the first letter and make the rest of the letters lowercase.
  let formattedText =
    inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();

  // 2. Replace specified special characters with a space using a regular expression.
  // The [\\-=+] part matches any character inside the brackets.
  // The 'g' flag ensures all occurrences are replaced, not just the first.
  // This regex will not affect numbers.
  formattedText = formattedText.replace(/[\\+=-]/g, ' ');

  return formattedText;
}

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
                {locationArr[locationArr.length - 2] === 'pet' &&
                locationArr.length - 1 === index
                  ? pets.find(pet => pet.id === parseInt(crumbName))?.name ||
                    crumbName
                  : beautifyText(crumbName)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
