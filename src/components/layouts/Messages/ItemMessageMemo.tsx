import React from 'react';
import { ItemMessageMe } from './ItemMessageMe';
import { ItemMessagePartner } from './ItemMessagePartner';

const ItemMessageMeMemo = React.memo(({ index, item, profilePartner }) => {
  return (
    <ItemMessageMe
      key={index}
      profile={profilePartner}
      messagesMe={item.message}
    />
  );
});

const ItemMessagePartnerMemo = React.memo(({ index, item }) => {
  return (
    <ItemMessagePartner
      key={index}
      profile={item.profile}
      messagePartners={item.message}
    />
  );
});

export { ItemMessageMeMemo, ItemMessagePartnerMemo };
