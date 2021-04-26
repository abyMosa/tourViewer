import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ScrollToTop from './components/ScrollToTop';
import DocumentTitle from './components/DocumentTitle';

import { setAuthHeader } from './axios';
import { authSuccess, getUser } from './store/actions/index';
import store from './store/reducers/index';


if (localStorage.jwtToken) {
  let token = localStorage.jwtToken;
  setAuthHeader(token);
  let user = getUser(token);
  store.dispatch(authSuccess(token, user));
}


ReactDOM.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <DocumentTitle>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </DocumentTitle>
    </Provider>
    {/* </React.StrictMode> */}
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
