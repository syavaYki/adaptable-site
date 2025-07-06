import React, { useEffect, useState } from 'react';
import {
  Box,
  Columns,
  Container,
  Content,
  Heading,
  Tag,
} from 'react-bulma-components';
import { getUserData } from '../../api/users';
import { AxiosError } from 'axios';
import { ModalError } from '../../components/ModalError';
import { ModalLoader } from '../../components/ModalLoader';
import { User } from '../../types/User';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/authentication';
import { AppointmentAccountList } from '../../components/AppointmentAccountList/AppointmentAccountList';
import { AdoptionAcountList } from '../../components/AdoptionAcountList';

export const AccountPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [user, setUser] = useState<
    Omit<User, 'id' | 'is_superuser' | 'favorites' | 'is_active'> | undefined
  >();

  useEffect(() => {
    setLoading(true);
    setError('');
    getUserData()
      .then(res => {
        if (res?.data) {
          const user = res.data;
          setUser({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            is_staff: user.is_staff,
            date_joined: user.date_joined,
          });
        }
      })
      .catch((e: AxiosError) => {
        if (e.status === 401) {
          dispatch(logout());
          navigate('/login');
        } else {
          setError(e.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    setLoading(true);
  }, []);

  return (
    <>
      {!!error && (
        <ModalError
          title="Error"
          body={error}
          onClose={() => setError('')}
        />
      )}

      {loading && <ModalLoader />}
      <Container className="mt-6">
        <Columns centered>
          <Columns.Column size="half">
            <Box>
              <Heading size={3}>My Account</Heading>
              <hr />
              <Content>
                <Columns>
                  <Columns.Column>
                    <div>
                      <strong>First Name:</strong>
                      <br />
                      {user?.first_name}
                    </div>
                  </Columns.Column>
                  <Columns.Column>
                    <div>
                      <strong>Last Name:</strong>
                      <br />
                      {user?.last_name}
                    </div>
                  </Columns.Column>
                </Columns>

                <div>
                  <strong>User since:</strong>
                  <br />
                  {user?.date_joined.slice(0, 10)}
                </div>

                <div>
                  <strong>Email:</strong>
                  <br />
                  {user?.email}
                </div>

                <div>
                  <strong>Account Type:</strong>
                  <br />

                  {user?.is_staff ? (
                    <Tag
                      color="success"
                      className="mt-1"
                    >
                      Staff Member
                    </Tag>
                  ) : (
                    <Tag
                      color="info"
                      className="mt-1"
                    >
                      User
                    </Tag>
                  )}
                </div>
              </Content>
            </Box>
          </Columns.Column>

          <Columns.Column>
            <Box>
              <Heading>Your Adoption Application:</Heading>
              <AdoptionAcountList />
            </Box>

            <Box>
              <Heading>Your appointments:</Heading>

              <AppointmentAccountList />
            </Box>
          </Columns.Column>
        </Columns>
      </Container>
    </>
  );
};
