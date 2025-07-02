import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bulma-components';

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

type Props = {
  petName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (val: FormData) => void;
};

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
};

export const AppointmentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  petName,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialForm);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialForm);
    onClose();
  };

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
    >
      <Modal.Card>
        <Modal.Card.Header>
          <Modal.Card.Title>
            Schedule an Appointment to meet {petName}
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <form
            onSubmit={handleSubmit}
            id="appointment-form"
          >
            <div className="field">
              <label className="label">Full Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control">
                <input
                  className="input"
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field is-grouped">
              <div className="field">
                <label className="label">Preferred Date</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your Preferred Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Preferred Time</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your Preferred Time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Card.Body>

        <Modal.Card.Footer>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-primary"
                form="appointment-form"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="control">
              <button
                className="button is-primary"
                onClick={() => onClose()}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Card.Footer>
      </Modal.Card>
    </Modal>
  );
};
