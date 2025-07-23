import classNames from 'classnames';
import React from 'react';
import { Button, Columns, Heading } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import style from './HomeBanner1.module.scss';

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
            'is-size-4-mobile is-size-1-desktop is-size-3-touch has-text-weight-extrabold ',
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
                navigate('/catalog');
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
                navigate('/donate');
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
