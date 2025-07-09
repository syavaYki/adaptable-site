import React, { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { ModalError } from '../ModalError';
import { ModalLoader } from '../ModalLoader';
import { Heading } from 'react-bulma-components';
import { ModalChoice } from '../ModalChoice';
import { ModalSuccess } from '../ModalSuccess';
import { AdoptionFormInfo } from '../AdoptionFormInfo';
import {
  AdoptionFormData,
  AdoptionFormDataResponse,
} from '../../types/AdoptionForm';
import {
  deleteAdoptionForm,
  getAllAdoptionForms,
} from '../../api/adoptionForms';
import { PetAdoptionFormModal } from '../PetAdoptionFormModal';

function parseResponse(data: AdoptionFormDataResponse): AdoptionFormData {
  return {
    id: data.id,
    pet: data.pet,
    user: data.user,
    applicationDate: data.application_date,
    firstName: data.first_name,
    lastName: data.last_name,
    address: data.address,
    phone: data.phone,
    email: data.email,
    occupation: data.occupation,
    employerName: data.employer_name,
    employerPhone: data.employer_phone,
    livingSituation: data.living_situation,
    householdSetting: data.household_setting,
    householdMembers: data.household_members,
    fencedYard: data.fenced_yard,
    hoursAlone: data.hours_alone,
  };
}

export const AdoptionAcountList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [adoptions, setAdoptions] = useState<AdoptionFormDataResponse[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [choiceVisible, setChoiceVisible] = useState(false);
  const [curAdoption, setCurAdoption] = useState<null | number>(null);
  const [curEddingtionAdoption, setCurEddingtionAdoption] =
    useState<boolean>(false);
  useEffect(() => {
    fetchAdoptions();
  }, []);

  function fetchAdoptions() {
    setLoading(true);

    getAllAdoptionForms()
      .then(res => {
        if (res?.data) {
          setAdoptions(res.data);
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
    if (!curAdoption) return;

    const adoptionToDel = adoptions.find(ap => ap.id === curAdoption);
    setLoading(true);

    if (adoptionToDel) {
      deleteAdoptionForm(adoptionToDel.id)
        .then(() => {
          setAdoptions(prev => prev.filter(ap => ap.id !== curAdoption));
        })
        .catch(e => {
          setError(`Error deleting adoption form: ${e.message}`);
        });

      fetchAdoptions();
    }
    setLoading(false);
  };

  const handleEdit = (id: number) => {
    setCurAdoption(id);
    setCurEddingtionAdoption(true);
    setIsModalVisible(true);
    fetchAdoptions();
  };

  async function handleChoice(result: boolean) {
    if (result) {
      handleDelete();
    }
    setChoiceVisible(false);
  }

  const currentForm = useMemo(() => {
    const form = adoptions.find(ap => ap.id === curAdoption);
    if (form) {
      return parseResponse(form);
    }
    return;
  }, [adoptions, curAdoption]);

  return (
    <>
      <PetAdoptionFormModal
        petId={1}
        isActive={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        isEdit={curEddingtionAdoption}
        curData={currentForm}
      />

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
        title="Are you sure you want to withdraw an application?"
        body=""
        isActive={choiceVisible}
        onAction={handleChoice}
      />
      {adoptions.length === 0 && (
        <div>
          <Heading
            size={5}
            textColor="info"
          >
            You haven&#39;t submitted any adoption applications yet. Your new
            best friend might be waiting for you right now!
          </Heading>

          <p>
            Take a look at the wonderful pets in our shelter who are looking for
            a loving home.
          </p>
        </div>
      )}
      {adoptions.map(form => {
        return (
          <AdoptionFormInfo
            key={form.id}
            data={form}
            onDelete={(id: number) => {
              setCurAdoption(id);
              setChoiceVisible(true);
            }}
            onEdit={handleEdit}
          />
        );
      })}
    </>
  );
};
