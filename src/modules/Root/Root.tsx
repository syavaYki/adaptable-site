import React from 'react';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { HomePage } from '../HomePage';
import { CatalogPage } from '../CatalogPage';
import App from '../App/App';
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
import { PartnerWithUsPage } from '../PartnerWithUsPage';

export const Root = () => {
  return (
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

          <Route path={VALID_ROUTES.CATALOG}>
            <Route
              index
              element={<CatalogPage />}
            />

            <Route
              path=":id"
              element={<PetInfoPage />}
            />
          </Route>

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
            path={VALID_ROUTES.PARTNER_WITH_US}
            element={<PartnerWithUsPage />}
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
  );
};
