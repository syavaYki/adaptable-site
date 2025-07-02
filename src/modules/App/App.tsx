import React, { useEffect, useState } from 'react';
import style from './App.module.scss';
import '../../styles/main.scss';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bulma-components';
import classNames from 'classnames';
import { Header } from '../../components/Header';

import '../../styles/main.scss';
import { FooterElem } from '../../components/FooterElem';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPetsData } from '../../api/pets';
import { ModalLoader } from '../../components/ModalLoader';
import { ModalError } from '../../components/ModalError';
import * as PetActions from '../../features/pets';
import * as FavActions from '../../features/favorites';
import { AIAgent } from '../../components/AIAgent/AIAgent';
import { Breadcrumbs } from '../../components/Breadcrumbs';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { visible: mobileMenuVisible } = useAppSelector(
    state => state.menuVisible,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    getPetsData()
      .then(res => {
        if (res?.data) {
          dispatch(PetActions.actions.setPets(res.data));
        }
      })
      .catch(e => {
        setError(e?.message ? e.message : 'Error Occured');
      })
      .finally(() => setLoading(false));

    setLoading(true);

    dispatch(FavActions.init());
  }, []);

  if (error) {
    return (
      <ModalError
        title="Error"
        body={error}
        onClose={() => setError('')}
      />
    );
  }

  if (loading) {
    return <ModalLoader />;
  }

  return (
    <Container
      className={classNames(
        'p-0 is-flex is-flex-direction-column has-background-white',
        style.app,
        {
          [style.menu_visible]: mobileMenuVisible,
        },
      )}
    >
      <Header />

      <Breadcrumbs />

      {!mobileMenuVisible && (
        <Container className={'is-flex'}>
          <Outlet />
        </Container>
      )}

      <div className="mt-3">{!mobileMenuVisible && <FooterElem />}</div>

      <ScrollToTop />
      <AIAgent />
    </Container>
  );
}

export default App;
