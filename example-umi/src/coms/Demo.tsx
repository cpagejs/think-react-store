import React from 'react';
import { useStoreHook } from 'think-react-store';

export default () => {
  const { order: { id } } = useStoreHook();
  console.log(id);
  
  
  return (
    <div>
      demo---{id}
    </div>
  );
}