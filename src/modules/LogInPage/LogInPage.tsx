import React, { useState } from 'react';
import {
  Box,
  Button,
  Columns,
  Container,
  Heading,
} from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import { sendRestoreToken, userLogin } from '../../api/auth';
import { AxiosError, AxiosResponse } from 'axios';
import { ModalLoader } from '../../components/ModalLoader';
import { ModalError } from '../../components/ModalError';
import { useDispatch } from 'react-redux';
import { actions as AuthAction } from '../../features/authentication';
import * as FavotiteAcion from '../../features/favorites';
import { updateFavotitesPetsApi } from '../../api/pets';
import { useAppSelector } from '../../app/hooks';
import { getUserMe } from '../../api/users';
import { ModalResetPassword } from '../../components/ModalResetPassword';
import { ModalSuccess } from '../../components/ModalSuccess';

export const LogInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites } = useAppSelector(state => state.favorite);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordResetShow, setPasswordResetShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and Passord are mandatory fields');
      return;
    }
    setLoading(true);
    setError('');
    userLogin(email, password)
      .then(async (res: AxiosResponse) => {
        const userData = res.data;

        if (res.status === 200 && userData) {
          dispatch(AuthAction.login(userData));
          const me = await getUserMe();

          if (me?.data?.favorites.length > 0) {
            const combFavs = Array.from(
              new Set([...favorites, ...(me?.data?.favorites || [])]),
            );

            updateFavotitesPetsApi(combFavs).catch(() =>
              console.error('Error updating favorites'),
            );

            dispatch(FavotiteAcion.set(combFavs));
          }

          navigate('/account');
        } else {
          throw Error('Errow with login');
        }
      })
      .catch((e: AxiosError) => {
        const data = e?.response?.data;
        if (
          data &&
          typeof data === 'object' &&
          Object.values(data).length > 0
        ) {
          setError(String(Object.values(data)[0]));
        } else {
          setError('Error during login');
        }
      })
      .finally(() => setLoading(false));
  };

  const handleResetToken = (email: string) => {
    setLoading(true);
    setError('');
    sendRestoreToken(email)
      .then(res => {
        if (res.status === 201) {
          setSuccess(`Please check you email for reset link`);
        } else {
          throw Error('Error sending restore token');
        }
      })
      .catch((e: AxiosError) => {
        const message = Object.values((e?.response?.data as object) || {})[0];
        setError(
          `Error sending restore token to ${email}. Try again later. Error: ${message[0] || e.message}`,
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container className="mt-6">
      {loading && <ModalLoader />}

      <ModalError
        title="Error"
        isActive={error.length > 0}
        body={error}
        onClose={() => setError('')}
      />

      <ModalResetPassword
        isActive={passwordResetShow}
        onClose={() => {
          setPasswordResetShow(false);
        }}
        onSubmit={email => {
          handleResetToken(email);
          setPasswordResetShow(false);
        }}
      />

      <ModalSuccess
        isActive={!!success}
        title="Succsess"
        body={success}
        onClose={() => setSuccess('')}
      />

      <Columns centered>
        <Columns.Column size="one-third">
          <Box>
            <Heading
              size={3}
              className="has-text-centered"
            >
              Login
            </Heading>

            <form
              onSubmit={handleSubmit}
              id="login-form"
            >
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                        return;
                      }
                    }}
                    required
                  />
                </div>
              </div>

              <Button
                color="primary"
                fullwidth
                type="submit"
                className="my-4"
                onClick={handleSubmit}
              >
                Log In
              </Button>

              <a
                onClick={() => {
                  setPasswordResetShow(true);
                }}
              >
                Reset the password
              </a>
            </form>
          </Box>
        </Columns.Column>
      </Columns>
    </Container>
  );
};
