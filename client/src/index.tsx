import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContainer } from './@routes';
import { store, persistor } from './configureStore';
import LoadingPage from './@components/UI/LoadingPage';

import * as serviceWorker from './serviceWorker';
// All styles
import './@assets/styles/index.scss';
// Open Source typefaces
require('typeface-roboto');
require('typeface-gothic-a1');

const rootEl = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingPage />} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootEl,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
