import React from 'react';
import classNames from 'classnames';
import { Button, Columns, Heading } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import style from './HomeBanner1.module.scss';
import { VALID_ROUTES } from '../../types/validRoutes';

export const HomeBanner1 = () => {
  const navigate = useNavigate();
  return (
    <div className={style.bunnerFirst}>
      <div
        className={classNames(
          'is-flex is-flex-direction-column is-justify-content-space-between p-6',
          style.bunnerFirst__txt_container,
        )}
      >
        <Heading
          className={classNames(
            'is-size-4-mobile is-size-1-desktop is-size-3-touch has-text-weight-extrabold has-text-white',
            style.bunnerFirst__txt,
          )}
        >
          Find your new best friend. Give a pet a forever home.
        </Heading>

        <Columns>
          <Columns.Column>
            <Button
              rounded
              size="large"
              onClick={() => {
                navigate(`/${VALID_ROUTES.CATALOG}`);
              }}
            >
              Adopt
            </Button>
          </Columns.Column>

          <Columns.Column>
            <Button
              rounded
              size="large"
              onClick={() => {
                navigate(`/${VALID_ROUTES.HOW_TO_HELP}`);
              }}
            >
              Suport the cause
            </Button>
          </Columns.Column>
        </Columns>
      </div>
    </div>
  );
};
