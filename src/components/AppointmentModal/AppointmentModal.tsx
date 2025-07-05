import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bulma-components';
import { AppointmentFormData } from '../../types/AppointmentFormData';
import {
  editAppointmentForm,
  submitAppointmentForm,
} from '../../api/appointment';
import { AxiosError } from 'axios';
import { useAppSelector } from '../../app/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  isEdit?: boolean;
  curData?: AppointmentFormData;
};

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  add_info: '',
};

export const AppointmentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  curData,
  isEdit = false,
}) => {
  const { loggedIn } = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState<AppointmentFormData>(initialForm);
  const [error, setError] = useState('');

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }

    if (isEdit && curData) {
      setFormData(curData);
    }

    if (loggedIn) {
      setFormData(prev => ({
        ...prev,
        email: loggedIn.email,
        name: loggedIn.first_name + ' ' + loggedIn.last_name,
      }));
    }
  }, [isOpen, curData, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      handleAppointmentEdit(formData);
      return;
    } else {
      handleAppointmentSubmit(formData);
    }
  };

  const handleSuccesClosing = () => {
    setFormData(initialForm);
    setError('');
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  const handleCancelClosing = () => {
    setFormData(initialForm);
    setError('');
    onClose();
  };

  const handleAppointmentSubmit = (formData: AppointmentFormData): void => {
    submitAppointmentForm(formData)
      .then(res => {
        if (res?.status === 201) {
          handleSuccesClosing();
        } else {
          throw new Error('uknown error');
        }
      })
      .catch((e: AxiosError) => {
        if (e?.response?.data) {
          const erros = Object.values(e.response.data).join('\n');
          setError(`Failed to submit appointment form: ${erros}`);
        } else {
          setError(`Failed to submit appointment form: ${e.message}`);
        }
      });
  };

  const handleAppointmentEdit = (formData: AppointmentFormData): void => {
    editAppointmentForm(formData)
      .then(res => {
        if (res?.status === 200) {
          handleSuccesClosing();
        } else {
          throw new Error('uknown error');
        }
      })
      .catch((e: AxiosError) => {
        if (e?.response?.data) {
          const erros = Object.values(e.response.data).join('\n');
          setError(`Failed to edit appointment form: ${erros}`);
        } else {
          setError(`Failed to edit appointment form: ${e.message}`);
        }
      });
  };

  return (
    <div>
      <Modal
        show={isOpen}
        onClose={onClose}
      >
        <Modal.Card>
          <Modal.Card.Header>
            <Modal.Card.Title>
              Schedule an Appointment to meet new friend.
            </Modal.Card.Title>
          </Modal.Card.Header>

          <Modal.Card.Body>
            {error && (
              <div className="notification is-focatoin is-danger is-light">
                <button
                  className="delete"
                  onClick={() => setError('')}
                ></button>
                {error}
              </div>
            )}

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
                    ref={nameInputRef}
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
                    disabled={isEdit}
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

              <div className="field">
                <label className="label">Additional Comments</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Additional Comments"
                    name="add_info"
                    value={formData.add_info}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="field">
                  <label className="label">Preferred Date</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      placeholder="Enter your Preferred Date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Preferred Time</label>
                  <div className="control">
                    <input
                      className="input"
                      type="time"
                      placeholder="Enter your Preferred Time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
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
                  onClick={() => handleCancelClosing()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal.Card.Footer>
        </Modal.Card>
      </Modal>
    </div>
  );
};
