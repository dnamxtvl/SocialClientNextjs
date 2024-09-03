import React from 'react';
import { ItemMessageMe } from './ItemMessageMe';
import { ItemMessagePartner } from './ItemMessagePartner';

const ItemMessageMeMemo = React.memo(({ index, item, onDataFromMessageDetail }) => {
  const handleDataFromMessagePartnerMemo = (data: any) => {
    onDataFromMessageDetail(data);
  }

  return (
    <ItemMessageMe
      key={index}
      profile={item.profile}
      messagesMe={item.message}
      onData={handleDataFromMessagePartnerMemo}
    />
  );
});

const ItemMessagePartnerMemo = React.memo(({ index, item, onDataFromMessageDetail }) => {
  const handleDataFromMessagePartnerMemo = (data: any) => {
    onDataFromMessageDetail(data);
  }

  return (
    <ItemMessagePartner
      key={index}
      profile={item.profile}
      messagePartners={item.message}
      onData={handleDataFromMessagePartnerMemo}
    />
  );
});

export { ItemMessageMeMemo, ItemMessagePartnerMemo };
