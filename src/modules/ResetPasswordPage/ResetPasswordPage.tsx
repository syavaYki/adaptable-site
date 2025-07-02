import React, { useState } from 'react';
import {
  Box,
  Button,
  Columns,
  Container,
  Heading,
} from 'react-bulma-components';
import { useSearchParams } from 'react-router-dom';
import { ModalLoader } from '../../components/ModalLoader';
import { ModalError } from '../../components/ModalError';
import { ModalSuccess } from '../../components/ModalSuccess';
import { AxiosError, AxiosResponse } from 'axios';
import { updatePassword } from '../../api/auth';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords you entered doesn't match");
      return;
    }

    if (!searchParams.get('token')) {
      setError('Invalid Token, please check your email.');
      return;
    }

    setLoading(true);
    setError('');

    updatePassword(password, searchParams.get('token') as string)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setSuccess('Password successfully updated');
        } else {
          throw Error('Errow with registration');
        }
      })
      .catch((e: AxiosError) => {
        const errorMessage = Object.values(e?.response?.data as object)[0][0];

        setError(`Error with updating password. ${errorMessage}`);
      })
      .finally(() => setLoading(false));
  };

  if (!searchParams.get('token')) {
    return (
      <Container className="is-flex is-justify-content-center is-align-items-center">
        <Heading textColor="danger">
          Invalid Token, please reset password again.
        </Heading>
      </Container>
    );
  }
  return (
    <Container className="pt-5">
      {loading && <ModalLoader />}

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

      <Columns breakpoint="mobile">
        <Columns.Column
          desktop={{ size: 3 }}
          mobile={{ size: 1 }}
        ></Columns.Column>

        <Columns.Column
          desktop={{ size: 6 }}
          mobile={{ size: 10 }}
        >
          <Box>
            <form
              onSubmit={handleSubmit}
              id="reset-form"
            >
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
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Confirm Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    placeholder="Please consfirm your password"
                    name="passwordConsfirm"
                    value={passwordConfirm}
                    onChange={e => setPasswordConfirm(e.target.value)}
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
                Reset Password
              </Button>
            </form>
          </Box>
        </Columns.Column>

        <Columns.Column
          desktop={{ size: 3 }}
          mobile={{ size: 1 }}
        ></Columns.Column>
      </Columns>
    </Container>
  );
};
