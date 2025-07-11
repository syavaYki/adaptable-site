import classNames from 'classnames';
import React from 'react';

import styles from './PromoModal.module.scss';

type Props = {
  onClose: () => void;
};

export const PromoModal: React.FC<Props> = ({ onClose }) => {
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
            This is how you save $20.
          </h1>

          <p className={styles.promotional_modal__description}>
            Sign up for email and save on your first purchase. Plus, get access
            to exclusive promotions, personalized wine recommendations, and
            expert advice.
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
                className="input is-medium"
                type="email"
                placeholder="Your email address"
              />
            </div>
            <div className="control">
              <button
                className={classNames(
                  'button',
                  'is-medium',
                  styles.promotional_modal__submit_button,
                )}
              >
                Submit
              </button>
            </div>
          </div>

          <p className={styles.promotional_modal__legaltext}>
            By hitting submit you agree to receive marketing emails from
            Wine.com, agree to our{' '}
            <a
              href="#"
              className={styles.promotional_modal__legal_link}
            >
              Terms of Service
            </a>{' '}
            and certify that you are of legal drinking age. View{' '}
            <a
              href="#"
              className={styles.promotional_modal__legal_link}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
