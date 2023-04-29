import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { BrowserRouter } from 'react-router-dom';
import * as nearAPI from "near-api-js";


import App from './components/app/App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Initializing contract
async function initContract() {
  const nearConfig = {
    networkId: "testnet",
    // keyStore: new keyStores.BrowserLocalStorageKeyStore(), // first create a key store 
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  };

  // Initializing connection to the NEAR TestNet
  const near = await nearAPI.connect({
    deps: {
      keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
    },
    ...nearConfig,
  });

  // Needed to access wallet
  const walletConnection = new nearAPI.WalletConnection(near,"");

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
      
    };
  }

  // Initializing our contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read-only – they don't modify the state, but usually return some value
    // viewMethods: ["getWinners", "getGameDetails", "getPlayersDetails", "getProfileDetails", "getActiveGames", "getCreatedGames", "getCompletedGames"],
    // Change methods can modify the state, but you don't receive the returned value when called
    // changeMethods: ["createNewGame", "joinGame", "rollDice", "claimWinnings"],
    // Sender is the account ID to initialize transactions.
    // getAccountId() will return empty string if user is still unauthorized
    sender: walletConnection.getAccountId(),
  });

  return { currentUser, nearConfig, walletConnection };
}

window.nearInitPromise = initContract().then(({ currentUser, nearConfig, walletConnection }) => {
  ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App currentUser={currentUser} nearConfig={nearConfig} wallet={walletConnection} />
    </BrowserRouter>
  </Provider>,
    document.getElementById('root')
  );
});
// ReactDOM.render(
//   <Provider store={store}>
//   <BrowserRouter>
//       <App />
//   </BrowserRouter>
// </Provider>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
