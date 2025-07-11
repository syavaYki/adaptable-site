import React from 'react';
import { Appointment } from '../../types/Appointment';
import { Button } from 'react-bulma-components';
import { formattedDate, formattedTime } from '../../utils/helperFormater';

type Props = {
  data: Appointment;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};
export const AppointmentInfo: React.FC<Props> = ({
  data,
  onDelete,
  onEdit,
}) => {
  const { id, name, phone, date, time, add_info, is_active } = data;

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Appointment Status</p>
        <span
          className="card-header-icon"
          aria-label="status"
        >
          <span className={`tag ${is_active ? 'is-success' : 'is-danger'}`}>
            {is_active ? 'Active' : 'Inactive'}
          </span>
        </span>
      </header>
      <div className="card-content">
        <div className="content">
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Appointment:</strong> {formattedDate(date, time)} at{' '}
            {formattedTime(date, time)}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          {add_info && (
            <p>
              <strong>Additional Info:</strong> {add_info}
            </p>
          )}
        </div>
      </div>
      <footer className="card-footer">
        <Button
          className="card-footer-item m-1"
          onClick={() => onEdit(id)}
        >
          Edit
        </Button>

        <Button
          className="card-footer-item m-1"
          onClick={() => onDelete(id)}
        >
          Cancel Appointment
        </Button>
      </footer>
    </div>
  );
};
