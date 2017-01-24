import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from './Routes';

render(
  <AppContainer>
    <Routes/>
  </AppContainer>
, document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./index.js', () => {
    const App = require('./index.js').default;
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
