import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bulma-components';

type Props = {
  title: string;
  body: string;
  isActive: boolean;
  onAction?: (result: boolean) => void;
};
export const ModalChoice: React.FC<Props> = ({
  title = 'Error',
  body = 'We encounter error',
  isActive = true,
  onAction: onClose,
}) => {
  const [isActiveState, setIsActiveState] = useState(isActive);
  useEffect(() => setIsActiveState(isActive), [isActive]);

  function handleClose(res: boolean) {
    if (onClose) {
      onClose(res);
    }
    setIsActiveState(false);
  }

  return (
    <div
      className={classNames('modal', {
        'is-active': isActiveState,
      })}
    >
      <div className="modal-background"></div>
      <div className="modal-card ">
        <header className="modal-card-head has-background-danger">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => handleClose(false)}
          ></button>
        </header>
        <section className="modal-card-body py-3 is-multiline">{body}</section>
        <footer className="modal-card-foot is-flex-direction-row-reverse py-3">
          <div className="buttons">
            <Button
              rounded
              color={'danger'}
              colorVariant={'light'}
              style={{ minWidth: '100px' }}
              onClick={() => handleClose(true)}
            >
              Yes
            </Button>
            <Button
              rounded
              color={'success'}
              colorVariant={'light'}
              style={{ minWidth: '100px' }}
              onClick={() => handleClose(false)}
            >
              No
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
};
