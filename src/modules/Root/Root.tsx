import React from 'react';
import { ApolloProvider } from '@apollo/client';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from '../HomePage';
import { CatalogPage } from '../CatalogPage';
import App from '../App/App';
import client from '../../lib/apollos';
import { ProtectedRoute } from '../../components/ProtectedRoute/ProtectedRoute';
import { VALID_ROUTES } from '../../types/validRoutes';
import { FavoritePage } from '../FavoritePage';
import { PetInfoPage } from '../PetInfoPage';
import { LogInPage } from '../LogInPage';
import { RegisterPage } from '../RegisterPage';
import { AccountPage } from '../AccountPage';
import { HowToHelpPage } from '../HowToHelpPage';
import { ResetPasswordPage } from '../ResetPasswordPage';
import { UnsubscribePage } from '../UnsubscribePage';

export const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              index
              element={<HomePage />}
            />

            <Route
              path={VALID_ROUTES.HOME}
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

            <Route
              path={VALID_ROUTES.CATALOG}
              element={<CatalogPage />}
            />

            <Route
              path={VALID_ROUTES.FAVORITES}
              element={<FavoritePage />}
            />

            <Route
              path={VALID_ROUTES.LOGIN}
              element={<LogInPage />}
            />

            <Route
              path={VALID_ROUTES.REGISTER}
              element={<RegisterPage />}
            />

            <Route
              path={VALID_ROUTES.PASSWORD_RESET}
              element={<ResetPasswordPage />}
            />

            <Route
              path={VALID_ROUTES.UNSUBSCRIBE}
              element={<UnsubscribePage />}
            />

            <Route
              path={VALID_ROUTES.HOW_TO_HELP}
              element={<HowToHelpPage />}
            />

            <Route
              path="/pets/:id"
              element={<PetInfoPage />}
            />

            <Route
              path="/pets/"
              element={<CatalogPage />}
            />

            <Route element={<ProtectedRoute />}>
              <Route path={VALID_ROUTES.ACCOUNT}>
                <Route
                  index
                  element={<AccountPage />}
                />
              </Route>
            </Route>
          </Route>

          <Route
            path="*"
            element={<p>PAGE NOT FOUND</p>}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};
