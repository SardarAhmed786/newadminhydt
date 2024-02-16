/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./app.scss"
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import { hooks as walletConnectV2Hooks, walletConnectV2 } from './connectors/walletConnectV2.js'
import { hooks as metaMaskHooks, metaMask } from './connectors/metaMask'
import { createRoot } from 'react-dom/client'
const domNode = document.getElementById('root');
const root = createRoot(domNode);

const connectors = [
  [walletConnectV2, walletConnectV2Hooks],
  [metaMask, metaMaskHooks]
]
root.render(
  <Provider store={store}>
    <Web3ReactProvider connectors={connectors}>
      <App />
    </Web3ReactProvider>
  </Provider>,
);


