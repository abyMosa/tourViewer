import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import jwt from 'jsonwebtoken';

import ScrollToTop from './components/ScrollToTop';
import DocumentTitle from './components/DocumentTitle';

import { setAuthHeader } from './axios';
import { authSuccess, getUser } from './store/actions/index';
import store from './store/reducers/index';


if (localStorage.jwtToken) {
  let token = localStorage.jwtToken;
  setAuthHeader(token);
  let user = getUser(token);
  // let { exp } = jwt.decode(token) as any;
  // store.dispatch(authSuccess(token, user, exp));
  store.dispatch(authSuccess(token, user));
}


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <DocumentTitle>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </DocumentTitle>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
