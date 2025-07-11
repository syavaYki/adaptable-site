import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  isActive: boolean;
  onSubmit: (email: string) => void;
  onClose?: () => void;
};

export const ModalResetPassword: React.FC<Props> = ({
  isActive = true,
  onSubmit,
  onClose,
}) => {
  const title = 'Password Reset';
  const body =
    'Please enter your email address and we will send you a link to reset your password.';
  const [isActiveState, setIsActiveState] = useState(isActive);
  const [email, setEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);

  useEffect(() => setIsActiveState(isActive), [isActive]);

  function handleClose() {
    if (onClose) {
      onClose();
    }
    setIsActiveState(false);
  }

  function handleSubmit(email: string) {
    if (isValidEmail(email)) {
      onSubmit(email);
      handleClose();
    }
    setEmail('');
  }

  function isValidEmail(email: string) {
    const emailRegex = new RegExp(
      '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@' +
        '((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    );
    return emailRegex.test(String(email).toLowerCase());
  }

  return (
    <div
      className={classNames('modal', {
        'is-active': isActiveState,
      })}
    >
      <div className="modal-background"></div>
      <div className="modal-card ">
        <header className="modal-card-head has-background-info">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => handleClose()}
          ></button>
        </header>
        <section className="modal-card-body py-3 is-multiline">
          <span>{body}</span>
          <div className="field has-addons has-addons-centered mt-4">
            <div className="control has-icons-left has-icons-right is-expanded">
              <input
                className={classNames('input', {
                  'is-danger': !emailIsValid,
                })}
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => {
                  if (e.target.value === '') {
                    setEmailIsValid(true);
                  } else {
                    setEmailIsValid(isValidEmail(e.target.value));
                  }
                  setEmail(e.target.value);
                }}
              />

              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>

              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>

              {!emailIsValid && (
                <p className="help is-danger">This email is invalid</p>
              )}
            </div>
          </div>
        </section>
        <footer className="modal-card-foot is-flex is-justify-content-flex-end">
          <button
            className="button is-rounded is-info mr-5"
            onClick={() => handleSubmit(email)}
          >
            Submit
          </button>
          <button
            className="button is-rounded is-warning"
            onClick={() => handleClose()}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};
