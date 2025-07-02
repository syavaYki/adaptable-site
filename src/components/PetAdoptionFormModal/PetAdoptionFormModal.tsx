import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { AdoptionFormData } from '../../types/AdoptionFormData';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

type Props = {
  petId: number;
  isActive: boolean;
  onSubmit: (formData: AdoptionFormData) => void;
  onClose: () => void;
};
export const PetAdoptionFormModal: React.FC<Props> = ({
  petId,
  isActive,
  onSubmit,
  onClose,
}) => {
  const { loggedIn } = useAppSelector(state => state.auth);
  const initialFormData: AdoptionFormData = useMemo(() => {
    return {
      applicationDate: getTodayDate(),
      userId: loggedIn?.id ? loggedIn.id : null,
      petId: petId,
      firstName: loggedIn?.first_name ? loggedIn.first_name : '',
      lastName: loggedIn?.last_name ? loggedIn.last_name : '',
      address: '',
      phone: '',
      email: loggedIn?.email ? loggedIn.email : '',
      occupation: '',
      employerName: '',
      employerPhone: '',
      livingSituation: 'own',
      householdSetting: 'suburban',
      householdMembers: '',
      fencedYard: 'yes',
      hoursAlone: 0,
    };
  }, [getTodayDate, loggedIn]);

  const [isModalOpen, setIsModalOpen] = useState(isActive);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setIsModalOpen(isActive);
  }, [isActive]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
    setFormData(initialFormData);
    onSubmit(formData);
  };

  return (
    <>
      <div className={`modal ${isModalOpen ? 'is-active' : ''}`}>
        <div
          className="modal-background"
          onClick={() => setIsModalOpen(false)}
        ></div>

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Pet Adoption Application</p>

            <button
              className="delete"
              aria-label="close"
              onClick={() => setIsModalOpen(false)}
            ></button>
          </header>

          <section className="modal-card-body">
            <form
              id="adoption-form"
              onSubmit={handleSubmit}
            >
              <div className="field">
                <label className="label">Application Date</label>

                <div className="control">
                  <input
                    className="input"
                    type="date"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h2 className="title is-5 mt-5">❤️ Adopter Information</h2>
              <div className="box">
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div
                      className="field"
                      style={{ display: 'none' }}
                    >
                      <div className="control">
                        <input
                          className="input"
                          name="petId"
                          value={formData.petId}
                        />
                      </div>
                    </div>

                    <div
                      className="field"
                      style={{ display: 'none' }}
                    >
                      <div className="control">
                        <input
                          className="input"
                          name="userId"
                          value={formData.userId}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">First Name</label>
                      <div className="control">
                        <input
                          className="input"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Last Name</label>
                      <div className="control">
                        <input
                          className="input"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Address</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-body">
                    <div className="field">
                      <label className="label">Phone</label>
                      <div className="control">
                        <input
                          className="input"
                          type="tel"
                          name="phone"
                          value={formData.phone}
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
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Employment Information --- */}
              <h2 className="title is-5 mt-5">💼 Employment Information</h2>
              <div className="box">
                <div className="field">
                  <label className="label">Occupation</label>
                  <div className="control">
                    <input
                      className="input"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Name of Employer</label>
                  <div className="control">
                    <input
                      className="input"
                      name="employerName"
                      value={formData.employerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Employer&apos;s Phone</label>
                  <div className="control">
                    <input
                      className="input"
                      type="tel"
                      name="employerPhone"
                      value={formData.employerPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* --- Living Information --- */}
              <h2 className="title is-5 mt-5">🏠 Living Information</h2>
              <div className="box">
                <div className="field">
                  <label className="label">Do you:</label>
                  <div className="control">
                    <label className="radio pr-3">
                      <input
                        type="radio"
                        name="livingSituation"
                        value="own"
                        checked={formData.livingSituation === 'own'}
                        onChange={handleChange}
                      />
                      Own
                    </label>

                    <label className="radio pr-3">
                      <input
                        type="radio"
                        name="livingSituation"
                        value="rent"
                        checked={formData.livingSituation === 'rent'}
                        onChange={handleChange}
                      />
                      Rent
                    </label>

                    <label className="radio pr-3">
                      <input
                        type="radio"
                        name="livingSituation"
                        value="other"
                        checked={formData.livingSituation === 'other'}
                        onChange={handleChange}
                      />
                      Other
                    </label>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Household Setting</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        name="householdSetting"
                        value={formData.householdSetting}
                        onChange={handleChange}
                      >
                        <option value="suburban">Suburban</option>

                        <option value="urban">Urban</option>

                        <option value="rural">Rural</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">
                    Please list all people living in the household (names and
                    ages)
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="householdMembers"
                      value={formData.householdMembers}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Do you have a fenced yard?</label>
                  <div className="control">
                    <label className="radio pr-3">
                      <input
                        type="radio"
                        name="fencedYard"
                        value="yes"
                        checked={formData.fencedYard === 'yes'}
                        onChange={handleChange}
                      />
                      Yes
                    </label>

                    <label className="radio pr-3">
                      <input
                        type="radio"
                        name="fencedYard"
                        value="no"
                        checked={formData.fencedYard === 'no'}
                        onChange={handleChange}
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="field">
                  <label className="label">
                    How many hours per day will the pet be left alone?
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      name="hoursAlone"
                      value={formData.hoursAlone}
                      onChange={handleChange}
                      required
                      min="0"
                      max="24"
                    />
                  </div>
                </div>
              </div>
            </form>
          </section>
          <footer className="modal-card-foot is-flex is-justify-content-space-between">
            <button
              className="button is-success "
              type="submit"
              form="adoption-form"
            >
              Submit Application
            </button>

            <button
              className="button is-danger "
              onClick={() => {
                onClose();
                setIsModalOpen(false);
              }}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};
