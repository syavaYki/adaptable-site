import React, { useState } from 'react';
import {
  Box,
  Button,
  Columns,
  Container,
  Heading,
} from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import { AxiosError, AxiosResponse } from 'axios';
import { ModalLoader } from '../../components/ModalLoader';
import { ModalError } from '../../components/ModalError';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Email and Passord are mandatory fields');
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords you entered doesn't match");
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors

    register(email, password, firstName, lastName)
      .then((res: AxiosResponse) => {
        if (res.status === 201) {
          navigate('/login');
        } else {
          throw Error('Errow with registration');
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
          setError('Error during registration');
        }
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <ModalLoader />;
  }

  if (error) {
    return (
      <ModalError
        title="Error"
        body={error}
        onClose={() => setError('')}
      />
    );
  }

  return (
    <Container className="mt-6">
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
              id="register-form"
            >
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
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
                Register
              </Button>
            </form>
          </Box>
        </Columns.Column>
      </Columns>
    </Container>
  );
};
