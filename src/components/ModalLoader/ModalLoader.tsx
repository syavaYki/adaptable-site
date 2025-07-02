import React from 'react';
import classNames from 'classnames';
import style from './ModalLoader.module.scss';
import { Loader } from '../Loader';

type Prop = {
  isActive?: boolean;
};
export const ModalLoader: React.FC<Prop> = ({ isActive = true }) => {
  return (
    <div
      className={classNames('modal', {
        'is-active': isActive,
      })}
    >
      <div className="modal-background"></div>
      <div className={classNames('modal-content', style.content)}>
        <Loader />
      </div>
    </div>
  );
};
