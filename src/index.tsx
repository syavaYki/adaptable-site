import React from 'react';
import './index.css';
import './bulma/my-bulma-project.css';

import { createRoot } from 'react-dom/client';
import { Root } from './modules/Root';
import { Provider } from 'react-redux';
import store from './app/store';
import { accessLocalStorage } from './utils/accessLocalStorage';
import { LocalAccessKeys } from './types/LocalAccessKeys';

const showUrgentNotice = accessLocalStorage.get(LocalAccessKeys.NOTICE_SHOW);

if (showUrgentNotice === undefined) {
  accessLocalStorage.set(LocalAccessKeys.NOTICE_SHOW, true);
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
