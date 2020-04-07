import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from '../src';
import * as store from './Contexts';
import DemoClass from './DemoClass';
import DemoFunc from './DemoFunc';
import DemoConnect from './DemoConnect';
import log from '../middlewares/log';
import loading from '../middlewares/loading';

var mountNode = document.getElementById("app");
ReactDOM.render(
  <StoreProvider 
    store={store} 
    middleware={[loading]}
    cache={['user']}
  >
    <DemoClass />
    <DemoFunc />
    <DemoConnect />
  </StoreProvider>,
mountNode);
