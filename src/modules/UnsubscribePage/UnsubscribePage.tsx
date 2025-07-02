import React, { useState } from 'react';
import { Button, Container, Heading, Section } from 'react-bulma-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { unsubscribeApi } from '../../api/subscribe';
import { ModalSuccess } from '../../components/ModalSuccess';
import { ModalError } from '../../components/ModalError';
import { AxiosError } from 'axios';
import { ModalLoader } from '../../components/ModalLoader';

export const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleUnsubscribe() {
    setLoading(true);
    setError('');

    const token = searchParams.get('token');
    if (!token) {
      setError('Invalid Token, please check your email and try again.');
      return;
    }

    unsubscribeApi(token)
      .then(() => {
        setSuccess('You have been successfully unsubscribed.');
      })
      .catch((err: AxiosError) => {
        const errorMessage =
          (err?.response?.data as { error?: string })?.error ||
          'An error occurred. Please try again.';
        setError(errorMessage);
        console.error('API call failed:', err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Container className="mt-4">
      {loading && <ModalLoader />}

      <ModalError
        isActive={!!error}
        title="Error"
        body={error}
        onClose={() => {
          navigate('/');
          setError('');
        }}
      />

      <ModalSuccess
        isActive={!!success}
        title="Succsess"
        body={success}
        onClose={() => {
          navigate('/');
          setSuccess('');
        }}
      />

      <Heading textAlign={'center'}>Unsubscribe</Heading>
      <Section>
        <Heading
          subtitle
          size={4}
          className="has-text-danger"
        >
          Are you sure you want to unsubscribe?
        </Heading>

        <Button
          onClick={handleUnsubscribe}
          color={'danger'}
        >
          Unsubscribe
        </Button>
      </Section>
    </Container>
  );
};
