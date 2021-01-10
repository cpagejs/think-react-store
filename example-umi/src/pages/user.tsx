import React from 'react';
import { useStoreHook } from 'think-react-store';

export default () => {
  const { user } = useStoreHook();
  return (
    <div>
      user id---{user.id}
      <br/>
      user name---{user.name}
    </div>
  );
}