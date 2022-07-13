import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient,InMemoryCache,ApolloProvider } from "@apollo/client";
let persistor = persistStore(store);


export const Client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ApolloProvider client={Client}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <App/>
           </BrowserRouter>
         </PersistGate>
          
        </Provider>
      </ApolloProvider>
  </React.StrictMode>
);