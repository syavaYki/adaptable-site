import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPetById } from '../../api/pets';
import { Pet } from '../../types/Pet';
import { ModalError } from '../../components/ModalError';
import { ModalLoader } from '../../components/ModalLoader';
import { AxiosError } from 'axios';
import {
  Box,
  Button,
  Columns,
  Container,
  Content,
  Heading,
} from 'react-bulma-components';
import style from './PetInfoPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaw,
  faWeightScale,
  faPalette,
  faCheckCircle,
  faTimesCircle,
  faHeart,
  faMars,
  faVenus,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { AppointmentModal } from '../../components/AppointmentModal';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import * as FavoriteAction from '../../features/favorites';
import { updateFavotitesPetsApi } from '../../api/pets';
import { PetInfoSwiper } from '../../components/PetInfoSwiper';
import { ModalSuccess } from '../../components/ModalSuccess';
import { PetAdoptionFormModal } from '../../components/PetAdoptionFormModal';
import { textBeautifier } from '../../utils/helperFormater';
import { VALID_ROUTES } from '../../types/validRoutes';

export const PetInfoPage = () => {
  const { favorites } = useAppSelector(state => state.favorite);
  const { loggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isAdoptionFormModalOpen, setIsAdoptionFormModalOpen] = useState(false);

  const inFav = useMemo(
    () => pet?.id !== undefined && favorites.includes(pet.id),
    [pet, favorites],
  );

  const id = useMemo(() => {
    return location.pathname.split('/').slice(-1)[0];
  }, [location]);

  useEffect(() => {
    setLoading(true);

    getPetById(id)
      .then(res => {
        const petData = res?.data as Pet;
        setPet(petData);
      })
      .catch((e: AxiosError) => {
        setError(`Failed to fetch pet details: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleShowingModal = (caller: 'form' | 'appointment') => {
    if (!loggedIn) {
      navigate(`/${VALID_ROUTES.LOGIN}`, {
        state: {
          from: {
            pathname: location.pathname,
          },
        },
      });

      return;
    }

    if (caller === 'form') {
      setIsAdoptionFormModalOpen(true);
      return;
    }

    if (caller === 'appointment') {
      setIsAppointmentModalOpen(true);
      return;
    }
  };

  const handleAppointmentSubmitSuccess = () => {
    setSuccess(
      'Appointment request submitted, someone will contact you to confirm appoitment.',
    );
  };

  const handleAdoptionFormSubmitSuccess = () => {
    setSuccess(
      'Appointment request submitted, someone will contact you to confirm appoitment.',
    );
  };

  if (loading) {
    return <ModalLoader />;
  }

  if (!pet) {
    return <p>Pet not found.</p>;
  }

  return (
    <Container>
      <ModalError
        isActive={!!error}
        title="Error"
        body={error}
        onClose={() => setError('')}
      />

      <ModalSuccess
        isActive={!!success}
        title="Succsess"
        body={success}
        onClose={() => setSuccess('')}
      />

      {loggedIn && (
        <>
          <PetAdoptionFormModal
            petId={pet.id}
            isActive={isAdoptionFormModalOpen}
            onClose={() => setIsAdoptionFormModalOpen(false)}
            onSuccess={handleAdoptionFormSubmitSuccess}
          />

          <AppointmentModal
            isOpen={isAppointmentModalOpen}
            onClose={() => setIsAppointmentModalOpen(false)}
            onSuccess={handleAppointmentSubmitSuccess}
          />
        </>
      )}

      <div className={style.pageContainer}>
        <Columns>
          <Columns.Column size="half">
            <div>
              <PetInfoSwiper
                images={pet?.images?.map(img => img.file)}
                petType={pet.pet_type}
              />
            </div>
          </Columns.Column>

          <Columns.Column size="half">
            <Content>
              <div className="is-flex is-justify-content-space-between is-align-items-center">
                <div>
                  <Heading size={1}>{textBeautifier(pet.name)}</Heading>

                  <Heading
                    subtitle
                    size={4}
                    className="is-flex is-flex-direction-column"
                  >
                    <span className="pb-1">{textBeautifier(pet.pet_type)}</span>

                    <div className="pb-3">
                      <span>Breed: </span>

                      <span>{textBeautifier(pet.breed)}</span>
                    </div>

                    <span className={style.sexIndicator}>
                      <p className="p-0 m-0 pr-3">Sex: </p>

                      {pet.sex === 'M' && (
                        <>
                          <span>Male</span>
                          <FontAwesomeIcon
                            icon={faMars}
                            className="ml-2"
                          />
                        </>
                      )}

                      {pet.sex === 'F' && (
                        <>
                          <span>Female</span>
                          <FontAwesomeIcon
                            icon={faVenus}
                            className="ml-2"
                          />
                        </>
                      )}

                      {pet.sex === 'U' && (
                        <>
                          <span>Uknown</span>
                          <FontAwesomeIcon
                            icon={faCircleQuestion}
                            className="ml-2"
                          />
                        </>
                      )}
                    </span>
                  </Heading>
                </div>

                <div>
                  <Button
                    rounded
                    className="p-5"
                    onClick={() => {
                      dispatch(FavoriteAction.toggle(pet.id));

                      if (loggedIn) {
                        updateFavotitesPetsApi(favorites).catch(() =>
                          console.error('Error toggling favorites'),
                        );
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      className={classNames({ 'has-text-danger': inFav })}
                      icon={faHeart}
                      size="2x"
                    />
                  </Button>
                </div>
              </div>
              <hr />

              <Box className={style.detailsBox}>
                <div className={style.detailItem}>
                  <FontAwesomeIcon
                    icon={faPaw}
                    className="mr-2"
                  />
                  <strong>Age:</strong> {pet.age} years
                </div>
                <div className={style.detailItem}>
                  <FontAwesomeIcon
                    icon={faWeightScale}
                    className="mr-2"
                  />
                  <strong>Weight:</strong> {pet.weight} kg
                </div>
                <div className={style.detailItem}>
                  <FontAwesomeIcon
                    icon={faPalette}
                    className="mr-2"
                  />
                  <strong>Color:</strong> {pet.coloration}
                </div>
                <div className={style.detailItem}>
                  {pet.is_sterilized ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="has-text-success mr-2"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="has-text-danger mr-2"
                    />
                  )}
                  <strong>Sterilized:</strong>{' '}
                  {pet.is_sterilized ? 'Yes' : 'No'}
                </div>
              </Box>

              <Heading
                size={5}
                className="mt-5"
              >
                About Me
              </Heading>
              <p>{pet.description}</p>

              <div className={style.actionButtons}>
                <Button
                  color="primary"
                  size="large"
                  onClick={() => handleShowingModal('form')}
                >
                  Apply to Adopt Me
                </Button>

                <Button
                  color="light"
                  size="large"
                  onClick={() => handleShowingModal('appointment')}
                >
                  Schedule Appointment to see me
                </Button>
              </div>
            </Content>
          </Columns.Column>
        </Columns>
      </div>
    </Container>
  );
};
