import React from 'react';
import { StoreProvider } from 'think-react-store';
import * as store from '../stores';

export default function BasicLayout(props: any) {
  return (
    <StoreProvider store={store}>
      {props.children}
    </StoreProvider>
  );
}