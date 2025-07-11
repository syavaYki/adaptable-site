import React from 'react';
import { Button } from 'react-bulma-components';
import { AdoptionFormDataResponse } from '../../types/AdoptionFormData';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: AdoptionFormDataResponse;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};
export const AdoptionFormInfo: React.FC<Props> = ({
  data,
  onDelete,
  onEdit,
}) => {
  const navigate = useNavigate();
  const { id, pet, application_date, status } = data;

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Adoption Application Status</p>
        <span
          className="card-header-icon"
          aria-label="status"
        >
          <span
            className={classNames('tag', {
              'is-warning': status === 'pending',
              'is-success': status === 'approved',
              'is-danger': status === 'rejected',
            })}
          >
            {status.toLocaleUpperCase()}
          </span>
        </span>
      </header>
      <div className="card-content">
        <div className="content">
          <p>
            <strong>Aplication Submited:</strong> {application_date}
          </p>

          <div className="is-flex is-align-items-center">
            <p className="p-0 m-0 pr-3">
              <strong>Pet:</strong> {}
            </p>
            <Button
              size={'small'}
              onClick={() => navigate(`/pets/${pet}`)}
            >
              See details
            </Button>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <Button
          className="card-footer-item m-1"
          onClick={() => onEdit(id)}
        >
          Edit Application
        </Button>

        <Button
          className="card-footer-item m-1"
          onClick={() => onDelete(id)}
        >
          Withdraw Aplication
        </Button>
      </footer>
    </div>
  );
};
