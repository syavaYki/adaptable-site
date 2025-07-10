import classNames from 'classnames';
import React, { useState } from 'react';

import styles from './PromoModal.module.scss';
import { subscribeApi } from '../../../api/subscribe';
import { AxiosError } from 'axios';

type Props = {
  onClose: () => void;
};

export const PromoModal: React.FC<Props> = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    subscribeApi(email)
      .then()
      .catch((e: AxiosError) => {
        const data = e?.response?.data as Record<string, string[]> | undefined;
        const alreadyExist =
          data &&
          Object.values(data)[0][0] === 'This subscription already exists.';

        if (!alreadyExist) {
          console.error('Something went wrong with new subscription!');
        }
      })
      .finally(() => onClose());
  };

  return (
    <div className={classNames('modal is-active', styles.promotional_modal)}>
      <div
        className="modal-background"
        onClick={onClose}
      ></div>

      <div className={classNames('modal-content', styles.modal_content)}>
        <button
          className="delete"
          onClick={() => {
            onClose();
          }}
        ></button>
        <div className={classNames('box', styles.box)}>
          <h1 className={styles.promotional_modal__title}>
            Find Your New Best Friend!
          </h1>

          <p className={styles.promotional_modal__description}>
            Get the latest news, adoption stories, and new arrivals delivered
            straight to your inbox. Sign up for the Adaptable newsletter and
            never miss an update.
          </p>

          <div
            className={classNames(
              'field',
              'is-grouped',
              styles.promotional_modal__form_group,
            )}
          >
            <div
              className={classNames(
                'control',
                'is-expanded',
                styles.promotional_modal__input_control,
              )}
            >
              <input
                type="email"
                className="input"
                placeholder="your.email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="control">
              <button
                className={classNames(
                  'button',
                  'is-medium',
                  styles.promotional_modal__submit_button,
                )}
                onClick={e => handleSubmit(e)}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
