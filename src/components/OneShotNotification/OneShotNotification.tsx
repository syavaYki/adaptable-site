import React from 'react';

import { accessLocalStorage } from '../../utils/accessLocalStorage';
import { LocalAccessKeys } from '../../types/LocalAccessKeys';
import { PromoModal } from './PromoModal';

export const OneShotNotification: React.FC = () => {
  const [noticeShow, setNoticeShow] = React.useState(
    accessLocalStorage.get(LocalAccessKeys.URGENT_NOTICE_SHOW),
  );

  function handleOnClose() {
    accessLocalStorage.set(LocalAccessKeys.URGENT_NOTICE_SHOW, false);
    setNoticeShow(false);
  }

  return <>{noticeShow && <PromoModal onClose={handleOnClose} />}</>;
};
