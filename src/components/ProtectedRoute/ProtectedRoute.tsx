import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as authActions, logout } from '../../features/authentication';
type Props = {
  redirectPath?: string;
};

export const ProtectedRoute: React.FC<Props> = ({ redirectPath = 'login' }) => {
  const { loggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (loggedIn === undefined) {
      dispatch(authActions.init());
    }
  }, [location]);

  if (!loggedIn) {
    dispatch(logout());

    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }
  return <Outlet />;
};
