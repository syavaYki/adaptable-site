import React, { useEffect, useState } from 'react';
import { AppointmentResponce } from '../../types/Appointment';
import { AppointmentInfo } from '../AppointmentInfo';
import {
  deleteAppointmentForm,
  getAllAppointments,
} from '../../api/appointment';
import { AxiosError } from 'axios';
import { ModalError } from '../ModalError';
import { ModalLoader } from '../ModalLoader';
import { Button, Heading } from 'react-bulma-components';
import { AppointmentModal } from '../AppointmentModal';
import { ModalChoice } from '../ModalChoice';
import { ModalSuccess } from '../ModalSuccess';

export const AppointmentAccountList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [appointments, setAppointments] = useState<AppointmentResponce[]>([]);
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    useState(false);
  const [choiceVisible, setChoiceVisible] = useState(false);
  const [curAppointmentId, setCurAppointmentId] = useState<null | number>(null);
  const [curEddingtionApt, setCurEditingApt] = useState<boolean>(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  function fetchAppointments() {
    setLoading(true);

    getAllAppointments()
      .then(res => {
        if (res?.data) {
          // setAppointments(
          //   res.data.filter(
          //     (ad: AppointmentResponce) => ad.email === loggedIn?.email,
          //   ),
          // );
          setAppointments(res.data);
        }
      })
      .catch((e: AxiosError) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleDelete = () => {
    if (!curAppointmentId) return;

    const apptToDel = appointments.find(ap => ap.id === curAppointmentId);
    setLoading(true);

    if (apptToDel) {
      deleteAppointmentForm(apptToDel.id)
        .then(() => {
          setAppointments(prev =>
            prev.filter(ap => ap.id !== curAppointmentId),
          );
        })
        .catch(e => {
          setError(`Error deleting appointment: ${e.message}`);
        });

      fetchAppointments();
    }
    setLoading(false);
  };

  const handleEdit = (id: number) => {
    setCurAppointmentId(id);
    setCurEditingApt(true);
    setIsAppointmentModalVisible(true);
  };

  const handleAppointmentSubmitSuccess = () => {
    fetchAppointments();
    setCurEditingApt(false);
    setSuccess(
      'Appointment request submitted, someone will contact you to confirm appoitment.',
    );
  };

  async function handleChoice(result: boolean) {
    if (result) {
      handleDelete();
    }
    setChoiceVisible(false);
  }

  return (
    <>
      <AppointmentModal
        isOpen={isAppointmentModalVisible}
        onClose={() => setIsAppointmentModalVisible(false)}
        onSuccess={handleAppointmentSubmitSuccess}
        isEdit={curEddingtionApt}
        curData={appointments.find(ap => ap.id === curAppointmentId)}
      />

      {appointments.length === 0 && (
        <div>
          <Heading
            size={5}
            textColor="info"
          >
            No appointments found. Find the animal you like and schedule
            appointment on Pet page
          </Heading>

          <Button
            onClick={() => {
              setIsAppointmentModalVisible(true);
            }}
          >
            Schedule New Appointment
          </Button>
        </div>
      )}

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
      {loading && <ModalLoader />}

      <ModalChoice
        title="Are you sure you want to cancel an appointment?"
        body=""
        isActive={choiceVisible}
        onAction={handleChoice}
      />

      {appointments.map(appointment => {
        return (
          <AppointmentInfo
            key={appointment.id}
            data={appointment}
            onDelete={(id: number) => {
              setCurAppointmentId(id);
              setChoiceVisible(true);
            }}
            onEdit={handleEdit}
          />
        );
      })}
    </>
  );
};
