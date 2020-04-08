import React from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from '../src';
import * as store from './Contexts';
import DemoClass from './DemoClass';
import DemoFunc from './DemoFunc';
import DemoConnect from './DemoConnect';
import log from '../middlewares/log';
import loading from '../middlewares/loading';
import cache from '../middlewares/cache';

var mountNode = document.getElementById("app");
ReactDOM.render(
  <StoreProvider 
    store={store} 
    middleware={[cache]}
    cache={['user', 'order']}
  >
    <DemoClass />
    <DemoFunc />
    <DemoConnect />
  </StoreProvider>,
mountNode);
